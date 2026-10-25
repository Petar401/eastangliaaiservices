# Fix Plan — eastangliaaiservices.co.uk

Companion to `CODE-REVIEW-FINDINGS.md`. This is a plan only — **nothing in
this document has been applied**. Findings are grouped by how safe they are
to act on, not just by severity, because the priority here is not breaking a
site that's live and performing well in Google Search Console.

**Standing rule for every item below:** anything that touches SEO-visible
output — metadata, `sitemap.xml`, `robots.txt`, canonical URLs, JSON-LD,
redirects — is called out explicitly. None of the fixes below change any of
that surface, but double-check against a fresh read of the file before
shipping regardless, since this plan may age.

---

## Batch 1 — Safe to do now (mechanical, low-risk, independently testable)

### Fix B3 — AI Readiness strength/gap overlap
**File:** `ai-readiness.html:572`
Change the gap filter's boundary so a score of exactly 2 no longer qualifies
as both a strength and a gap:
```diff
- const gaps=idx.filter(x=>x.v<=2).sort((a,b)=>a.v-b.v).slice(0,3);
+ const gaps=idx.filter(x=>x.v<2).sort((a,b)=>a.v-b.v).slice(0,3);
```
Leaves `strengths` (`v>=2`) untouched — a score of 2/3 stays a legitimate
strength, it just stops being *also* listed as a gap. One line. Test by
manually stepping through the quiz picking mostly "2nd from top" answers and
confirming no dimension appears in both "Where You're Strong" and "Your
Biggest Opportunities".

### Fix B2 (documentation option) — correct the chat-history claim
**Files:** `privacy.html` §4 & §8, `cookies.html` §2 (line 147) & §5,
`index.html`'s privacy-modal and cookies-modal (~lines 1071, 1088)
Simplest, lowest-risk correction: remove the specific claim that chat is
"stored in localStorage" / drop the `eaais_chat_history` line item, and
replace with accurate wording, e.g. "ARIA runs entirely in your browser;
conversation content is not sent to our servers and is cleared when you
leave or reload the page." Pure text edit, 3 files, zero behavioral risk.
*(See Batch 3 for the alternative — actually building persistence — if the
business would rather keep that UX promise than remove it.)*

### Fix I4 (partial) — guard the WebGL hero init
**File:** `index.html`, inside `initHeroScene()` (~line 1176)
Wrap the renderer creation so a device without WebGL fails quietly instead
of throwing to the console with no fallback:
```js
function initHeroScene(){
  const cv=document.getElementById('hero-canvas');
  let ren;
  try{
    ren=new THREE.WebGLRenderer({canvas:cv,antialias:false,alpha:true});
  }catch(e){
    cv.style.display='none';
    return;
  }
  ... // rest unchanged
```
Low risk: the rest of the page already doesn't depend on this function
succeeding (confirmed during review — reveal-on-scroll, demo tabs, chat,
contact form and the a11y panel are all wired up independently before this
runs). Test in a normal browser to confirm the hero still animates as
before — this only changes the failure path.

### Fix I7 — remove the dead `messages` array
**File:** `index.html` (~lines 1253, 1259)
If Batch 1's B2 fix is applied (chat stays memory-only, policy corrected to
match), delete the now-pointless bookkeeping:
```diff
- let chatOpen=false,messages=[],loading=false;
+ let chatOpen=false,loading=false;
```
and drop the `messages.push(...)` line inside `addMsg()`. Skip this fix
entirely if you instead go with Batch 3's "implement real persistence"
option for B2 — that option repurposes this array rather than deleting it.

### Fix I6 — add a CI safety net
**New file:** `.github/workflows/*.yml`
Add a workflow that runs on push/PR: an HTML validator (e.g.
`w3c/html-validator` or `html5validator/action`) and a link checker (e.g.
`lycheeverse/lychee-action`) over the `*.html` files. Purely additive — a
new CI file, zero changes to any existing page — so there's no regression
risk to the live site. This is the one fix that actively prevents repeats
of B1/I2/I3 (it would have caught the cookie-modal drift automatically).

### Cheap interim mitigation for I2 / I3 (duplication drift)
**Files:** `index.html`'s legal modals; `sitemap.xml`, `blog/index.html`,
`llms.txt`
Until the structural fixes in Batch 3 are scheduled, add a one-line HTML
comment at the top of each duplicated block naming its sibling copies, e.g.:
```html
<!-- Kept in sync with /cookies.html — update both when either changes -->
```
Zero behavioral change, costs nothing, and reduces the chance of a repeat
of B1 the next time someone edits one copy and forgets the other.

---

## Batch 2 — Do next (needs a careful, verifiable pass before shipping)

### Fix B1 — resync the homepage's Cookie Policy modal
**File:** `index.html:1081-1095`
Replace the embedded modal's text with an exact copy of the current
`cookies.html` content (§1-§6, including the Clarity/NID disclosure and the
"5 September 2026" date), keeping the modal's existing HTML structure
(`.modal-sec` wrappers) since `terms.html`/`privacy.html`/`contactpolicy.html`
modals already follow that pattern correctly. This is mechanical but
content-sensitive — copy the *current* live text, don't paraphrase, since
this is a compliance-facing document. After editing, diff the modal text
against `cookies.html` side by side to confirm they say the same thing.
**Not** SEO-sensitive (modal content isn't indexed differently), but it is
legal-accuracy-sensitive — get a second pair of eyes on the final wording
before shipping if possible.

### Fix V2 — add Subresource Integrity to the Three.js script
**File:** `index.html:43`
Generate the correct hash for the exact pinned version before editing
anything:
```bash
curl -s https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```
(cdnjs also publishes the hash directly on the library's page — cross-check
against that rather than trusting a single computed value.) Then:
```diff
- <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
+ <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
+   integrity="sha384-<hash>" crossorigin="anonymous"></script>
```
Test immediately after: load the homepage and confirm the 3D hero still
renders. A mismatched hash will make the browser silently refuse to execute
the script — the hero canvas would go blank with no visible error to a
normal visitor, so this specifically needs a manual check, not just a
"deploy and hope."

---

## Batch 3 — Needs a product/design decision first (not just "safe to apply")

These aren't riskier to *code* than the above — they're flagged separately
because they change behavior or duplicate-content strategy in a way that's
a judgment call, not a mechanical correction. Pick an option and come back
for implementation.

### B1/I2, structural option — stop duplicating legal content at all
Instead of periodically resyncing `index.html`'s 4 embedded modals against
their standalone pages (Batch 2's fix, which only solves the drift *once*),
consider changing the footer links to navigate straight to `/privacy.html`
etc. — the same pattern the fallback `href` on those links already uses —
and dropping the modal markup entirely. This removes the duplication
permanently instead of re-syncing it, at the cost of a page navigation
instead of an in-page modal. Worth doing, but it's a UX change someone
should sign off on, not a silent drop-in.

### I3, structural option — single source of truth for the blog list
Generating `sitemap.xml`, `blog/index.html`'s cards, and `llms.txt` from one
source would need actual tooling (a small script + a GitHub Action step),
which this project has deliberately avoided so far (no build step, no
`package.json`). Worth doing once there are more than 5 posts; not urgent
today given Batch 1's cheap interim mitigation.

### B2, alternative option — actually implement chat persistence
If the business would rather keep the "your chat is saved" promise than
remove it (Batch 1's fix), implement real `localStorage` persistence
instead: save `messages` to `eaais_chat_history` on every `addMsg()` call,
restore it on load, and expire entries older than 30 days to match what
`cookies.html` already promises. More surface area than the doc fix (needs
to handle `JSON.parse` failures, storage quota errors, and interaction with
the reject-cookies flow in `consent.js`), so test explicitly: accept
consent → chat → reload → history restored; reject consent → confirm
behavior matches whatever policy you settle on for that case.

### V1 — Content-Security-Policy meta tag
Adding a CSP is genuinely valuable here (several pages run large inline
`<script>` blocks) but is the single highest-risk item in this whole plan —
a too-strict policy silently breaks GA4, Clarity, the Preferred Source
button, Google Fonts, Three.js, or the Web3Forms submission, and some of
those failures (e.g. analytics not firing) are easy to ship without
noticing. Recommended approach:
1. Draft the policy allowing exactly the site's real sources: `script-src`
   (self, cdnjs.cloudflare.com, www.googletagmanager.com, www.clarity.ms,
   news.google.com), `style-src` (self, fonts.googleapis.com, 'unsafe-inline'
   — the site relies on inline `<style>` blocks throughout), `font-src`
   (fonts.gstatic.com), `connect-src` (api.web3forms.com, plus the
   analytics endpoints), `img-src`, `frame-src` as needed.
2. Ship it as `Content-Security-Policy-Report-Only` first (still a meta
   tag) on one page, watch the browser console for violations across a
   full manual pass (load page, accept cookies, submit a form, open chat),
   fix the policy, *then* switch to enforcing.
3. Only after a clean report-only pass on one page, roll to all 15.
Don't apply this one in a single mechanical pass across every page — the
report-only step is what keeps it from becoming a self-inflicted outage.

### I5 — non-standard `toolname`/`tooldescription` attributes
**Caution, read before touching:** the spec-valid fix would be renaming
these to `data-toolname` etc. — but if the WebMCP tooling these attributes
exist for (mentioned in the codebase's own commit history) reads the
literal attribute names `toolname`/`tooldescription`/`toolparamdescription`,
renaming them would silently break the exact feature they were added for,
with no visible error. **Confirm what the consuming WebMCP spec/tooling
actually expects before changing anything here.** If the literal names are
required, leave as-is and accept the non-standard-HTML status quo
(harmless at runtime, just fails strict validation) rather than "fixing"
it into brokenness.

### I1 — de-duplicate the Web3Forms key
Introduce a small shared file (mirroring the existing `assets/consent.js`
pattern), e.g. `assets/forms-config.js` exporting `window.EAAIS_WEB3FORMS_KEY`,
and include it via `<script defer src="/assets/forms-config.js">` on the 4
form pages instead of a hardcoded `const` in each. Low risk, but touches 4
files' worth of `<script>` ordering, so test each of the 4 forms' submit
flow after the change, not just one.
Separately — and this can't be done from inside the repo — confirm
domain-restriction is enabled on the Web3Forms account dashboard, which is
the actual control against key misuse, independent of whether the key
value itself is duplicated in source.

### V3 — decide on WebMCP form-abuse posture
No code change proposed here by default — this looks like a deliberate AEO
choice. If the team wants a guard beyond the existing honeypot (e.g. a
simple client-side rate limit, or a note for whoever monitors the Web3Forms
inbox to watch for agent-driven submission patterns), that's a product
decision to make explicitly, not something to silently bolt on.

### I8 — per-page social share images
Content/design task: produce a unique OG image per tool page and per blog
post (the blog posts already have bespoke hero `.jpg` files at
`/blog/*.jpg` that could double as the OG image with a crop/resize — the
3 tool pages would need new images made). Out of scope for a code fix,
flagging so it's on the list.

---

## Suggested order of operations

1. Batch 1 in full — all mechanical, all independently testable, no
   SEO-sensitive surface touched.
2. Batch 2 — B1 (resync) and V2 (SRI), each verified manually as described
   before considering them done.
3. Batch 3 — bring each item to whoever owns product/content decisions;
   implement only the options actually chosen.
