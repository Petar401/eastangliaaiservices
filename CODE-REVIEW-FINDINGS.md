# Code Review Findings — eastangliaaiservices.co.uk

**Scope:** Full read of all 45 tracked files (15 HTML pages, `assets/consent.js` +
`consent.css`, `robots.txt`, `sitemap.xml`, `llms.txt`, and
`.github/workflows/indexnow.yml`). Every internal link and image reference was
verified against the actual files in the repo.

**Method:** Static analysis only. No source files were changed, no outbound
network calls were made (no live-site testing, no external link fetching,
no dependency-CVE lookups) — this is a read of the committed code exactly as
it stands.

**Headline:** this is a small, clean, well-built static site — no framework,
no backend, no build step. Most of what follows is honest, modest findings
for that kind of codebase, not alarm bells. Three concrete bugs stood out;
the rest are defense-in-depth and hygiene items. See `FIX-PLAN.md` for what
to do about each one, in priority order.

| ID | Severity | Category | Summary |
|----|----------|----------|---------|
| [B1](#b1-cookie-policy-modal-on-the-homepage-is-stale-and-inaccurate) | High | Bug | Homepage's embedded Cookie Policy modal is stale and factually wrong |
| [B2](#b2-privacycookie-policy-describes-chat-history-storage-that-doesnt-exist) | Medium | Bug | Legal pages claim ARIA chat history is saved to localStorage; it isn't |
| [B3](#b3-ai-readiness-report-can-list-the-same-answer-as-both-a-strength-and-a-gap) | Medium | Bug | AI Readiness report logic can contradict itself |
| [V1](#v1-no-content-security-policy-or-other-security-headers) | Low | Vulnerability | No CSP / security headers on any page |
| [V2](#v2-no-subresource-integrity-on-the-pinned-threejs-script) | Low | Vulnerability | No SRI pin on the one static-versioned CDN script |
| [V3](#v3-webmcp-tool-annotations-on-all-4-forms) | Info | Vulnerability | Forms are machine-invokable by AI agents, unrated for abuse |
| [I1](#i1-web3forms-key-duplicated-in-4-files) | Low | Improvement | Web3Forms key duplicated in 4 files |
| [I2](#i2-legal-content-duplicated-between-standalone-pages-and-embedded-modals) | Low | Improvement | Legal content duplicated between pages and modals (root cause of B1) |
| [I3](#i3-blog-listing-duplicated-in-three-places) | Low | Improvement | Blog listing hand-duplicated in 3 files |
| [I4](#i4-threejs-is-outdated-and-unguarded) | Low | Improvement | Three.js r128 (~2021), no try/catch around WebGL init |
| [I5](#i5-non-standard-html-attributes-on-form-fields) | Low | Improvement | `toolname`/`tooldescription` aren't spec-valid HTML attributes |
| [I6](#i6-zero-automated-safety-net) | Low | Improvement | No CI check would catch any of the above automatically |
| [I7](#i7-dead-message-history-array-in-the-chat-widget) | Low | Improvement | Vestigial `messages` array in the chat widget |
| [I8](#i8-shared-social-share-image-across-all-pages) | Low | Improvement | One `og-image.png` reused for every page's social preview |

---

## Bugs

### B1. Cookie Policy modal on the homepage is stale and inaccurate

**Files:** `index.html:1081-1095` (the embedded `cookies-modal`) vs.
`cookies.html` (the standalone page, last updated 5 September 2026)

`index.html` has its own copy of the Cookie Policy, shown when a visitor
clicks **"Cookie Policy"** in the footer (as opposed to **"Cookie Settings"**,
which correctly reopens the live consent banner via `EAAISConsent.reopen()`).
That embedded copy still says **"Last updated: May 2026"** and states:

> "Google Analytics 4 is the only third-party service that sets cookies on
> this site, and only after you click **Accept**."

This is no longer true. `assets/consent.js` (`loadClarity()`,
`loadPreferredSource()`) also loads Microsoft Clarity and the Google
Preferred Source button after consent, and the site's own cookie banner text
(in `consent.js`) and the standalone `/cookies.html` both correctly disclose
`_clck`, `_clsk`, and the Google `NID` cookie. Only the modal embedded in
`index.html` was never updated when `cookies.html` was revised.

**Why it matters:** a visitor who reads the policy from the homepage footer
— the site's most-visited page — gets an incomplete, inaccurate cookie
disclosure, while the standalone page and the banner itself are correct.
Under UK GDPR/PECR, a cookie notice is expected to accurately describe what
is actually set. This is also the concrete case where the general
duplication risk described in [I2](#i2-legal-content-duplicated-between-standalone-pages-and-embedded-modals)
has already caused real drift. (See also [B2](#b2-privacycookie-policy-describes-chat-history-storage-that-doesnt-exist),
a second instance of the same legal pages carrying inaccurate claims.)

### B2. Privacy/Cookie policy describes chat-history storage that doesn't exist

**Files:** `index.html` (privacy-modal ~line 1071, cookies-modal ~line 1088),
`privacy.html` (§4, §8), `cookies.html` (§2, line 147)

All three documents state that the ARIA chatbot's conversation history is
persisted to the browser, e.g. (`cookies.html:147`):

> `eaais_chat_history` — stores your ARIA chat locally so messages persist
> if you reload. Stored in localStorage. Retention: 30 days...

But the actual chat implementation in `index.html` only keeps messages in an
in-memory variable:

```js
let chatOpen=false,messages=[],loading=false;
...
messages.push({role:role==='ai'?'assistant':'user',content:text});
```

`messages` is never written to `localStorage`, and nothing reads a
`eaais_chat_history` key back on load. A repo-wide search confirms the
string `eaais_chat_history` appears only in `cookies.html` and `index.html`
— never in any `.js` file. In practice, chat history is lost on every page
reload, contrary to what three legal-facing documents claim.

**Why it matters:** this is the safe direction (less data retained than
disclosed), but it's still an inaccurate statement in a UK GDPR–facing
document, and it's a real gap between documented and actual behaviour that
a visitor could reasonably rely on ("my conversation will still be here if
I reload").

### B3. AI Readiness report can list the same answer as both a strength and a gap

**File:** `ai-readiness.html:570-572`

```js
const strengths=idx.filter(x=>x.v>=2).sort((a,b)=>b.v-a.v).slice(0,3);
const gaps=idx.filter(x=>x.v<=2).sort((a,b)=>a.v-b.v).slice(0,3);
```

Each answer scores 0-3. A dimension scored exactly **2** satisfies both
`v>=2` (counted as a strength) and `v<=2` (counted as a gap). With ties,
`Array.prototype.sort` is stable, so the same dimensions can end up in both
lists.

**Concrete failure scenario:** a visitor who answers roughly "average" on
most questions — a very plausible real answer pattern for an SME midway
through its AI adoption — ends up with several dimensions scored 2/3. The
generated report can then show, side by side:

> **Strategy & Goals — 2/3** — "You know what you want AI to achieve — that
> clarity is the single biggest predictor of a successful project."
>
> **Strategy & Goals — 2/3** — "Without a clear goal, AI projects drift.
> Start by naming 2–3 outcomes you'd pay for..."

Since this tool exists specifically to impress a prospective client with a
polished, credible instant report, a self-contradictory report undermines
exactly what it's for. The `loss-calculator.html` and
`ai-policy-generator.html` tools don't share this pattern (verified) — it's
isolated to this one boundary condition in `ai-readiness.html`.

---

## Vulnerabilities

*Given the architecture (static site, no backend, no auth, no session
cookies, no server to compromise), there is no exploitable attack surface
in the traditional sense. These are defense-in-depth and hygiene items.*

### V1. No Content-Security-Policy or other security headers

**Files:** all 15 HTML pages

No page sets a Content-Security-Policy, X-Frame-Options, Referrer-Policy or
Permissions-Policy, whether via HTTP header or `<meta http-equiv>` tag.
GitHub Pages doesn't allow custom HTTP response headers, but a `<meta
http-equiv="Content-Security-Policy">` tag is available and would still add
value — several pages run substantial inline `<script>` blocks and load
third-party scripts (Three.js, Google Fonts, GA4, Clarity, Google's
Preferred Source button). A CSP would reduce the blast radius of any future
injection and provide clickjacking protection (`frame-ancestors`) that
`X-Frame-Options` can't provide via meta tag alone.

### V2. No Subresource Integrity on the pinned Three.js script

**File:** `index.html:43`

```html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

This is a version-pinned, static file — a good SRI candidate — but has no
`integrity=`/`crossorigin=` attributes. If that specific file on cdnjs were
ever tampered with, the browser would execute it without any integrity
check. (The GA4/Clarity/Preferred-Source scripts are dynamically injected
by `consent.js` and can't practically use SRI, so this applies specifically
to Three.js.)

### V3. WebMCP tool annotations on all 4 forms

**Files:** `index.html`, `ai-readiness.html`, `loss-calculator.html`,
`ai-policy-generator.html` (each form's `toolname`/`tooldescription`/
`toolparamdescription` attributes)

All 4 lead-generation forms (main contact form + the 3 gated-report forms)
carry non-standard attributes that describe them as machine-invokable
"tools" to AI browsing agents, e.g.:

```html
<form ... toolname="unlock_ai_readiness_report"
  tooldescription="Reveal the visitor's personalised AI Readiness Report
  after they've completed the quiz, by submitting their name, business
  email, and company...">
```

This reads as a deliberate choice — consistent with `llms.txt` and a
`robots.txt` that explicitly allows GPTBot, ClaudeBot, PerplexityBot and
others — not an oversight. Flagging it because it's a newer, less-audited
surface: the only submission guard on any of these forms is a client-side
honeypot field, and an AI agent acting on a user's behalf could in
principle submit these forms (consuming Web3Forms quota, generating an
email to the business) without a human ever seeing the gated report first.
Worth a conscious decision rather than silence, not necessarily a change.

---

## Improvements

### I1. Web3Forms key duplicated in 4 files

**Files:** `index.html`, `ai-readiness.html`, `loss-calculator.html`,
`ai-policy-generator.html`

The same Web3Forms access key (`3be4d006-0b53-4f45-a1ce-eb6d337e4dac`) is
hardcoded identically in all 4 forms. This is normal for Web3Forms' public,
client-exposed key model — not a leak — but the 4x duplication means
rotating the key later means editing 4 files, and there's no way from the
repo alone to confirm whether domain-restriction is enabled on the Web3Forms
account dashboard (the real protection against key misuse).

### I2. Legal content duplicated between standalone pages and embedded modals

**Files:** `index.html` (4 embedded modals) vs. `privacy.html`, `terms.html`,
`cookies.html`, `contactpolicy.html`

`index.html` embeds full copies of all four legal documents as modals
(opened from the footer), in addition to the standalone pages that every
*other* page links to directly. Only `index.html` carries this duplication
— it's not repeated across all 15 pages. Terms, Privacy and Contact Policy
are currently in sync with their modal copies (dates match); Cookie Policy
already drifted — see [B1](#b1-cookie-policy-modal-on-the-homepage-is-stale-and-inaccurate).
The structural risk remains for the other three.

### I3. Blog listing duplicated in three places

**Files:** `sitemap.xml`, `blog/index.html`, `llms.txt`

The list of blog posts is hand-maintained in three separate files with no
shared source. Publishing a new post means remembering to update all three;
missing one doesn't break anything visibly, but leaves the sitemap, the
on-site blog index, or the AEO summary file quietly out of sync.

### I4. Three.js is outdated and unguarded

**File:** `index.html:43, 1176-1208`

Three.js r128 is roughly a 2021 release, several majors behind current.
Separately, `new THREE.WebGLRenderer(...)` inside `initHeroScene()` has no
`try/catch` — on a device/browser without WebGL support, this throws and
the decorative hero canvas silently fails (console error only). This is
low severity: the code correctly defers `initHeroScene()` to
`DOMContentLoaded` via `document.readyState` check, so a WebGL failure is
contained to the hero background — the rest of the page (reveal-on-scroll,
demo tabs, chat, contact form, accessibility panel) is wired up
independently beforehand and keeps working.

### I5. Non-standard HTML attributes on form fields

**Files:** the same 4 forms as V3

`toolname`, `tooldescription` and `toolparamdescription` are not standard
HTML attributes (the spec-valid convention would be `data-toolname` etc.).
Browsers ignore unknown attributes at runtime, so nothing breaks visibly,
but any strict HTML validator will flag these as invalid.

### I6. Zero automated safety net

**Repo-wide.** The only CI workflow is the IndexNow pinger
(`.github/workflows/indexnow.yml`). There are no tests, no HTML validation,
and no link-checking. A lightweight CI check (an HTML validator and/or link
checker Action) would have caught the stale cookie modal (B1) and would
catch future instances of the same drift (I2, I3) automatically, before
they reach the live, well-ranked site.

### I7. Dead message-history array in the chat widget

**File:** `index.html:1253, 1259`

`messages` is pushed to on every chat turn (`messages.push({role, content})`)
but never read anywhere else in the code. It has no effect on behavior —
just unused bookkeeping, possibly left over from an earlier design. Harmless,
but worth clearing out along with any B2 fix touching this same code.

### I8. Shared social-share image across all pages

**Files:** all 15 pages' `og:image`/`twitter:image` tags

Every page (homepage, all 3 tools, all 5 blog posts, all legal pages) uses
the same `/og-image.png` for social link previews. Not broken — just a
missed opportunity: a link to a specific blog post or tool currently
previews identically to a link to the homepage when shared on social media.
