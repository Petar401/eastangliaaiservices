# 04 · Accessibility and UK compliance

**Method:** axe-core (WCAG 2.0/2.1/2.2 A and AA rules) run in a real browser on all 22 pages at 1366×768 and 390×844, on the live site before the fixes and on the fixed copy afterwards; Lighthouse accessibility audits; code review of focus styles, skip links and reduced-motion handling. An automated pass finds roughly a third to a half of WCAG issues, so a manual screen-reader and keyboard walk-through is still worth doing (`06-action-plan.md`).

**Result:** before, 8 of 22 pages had at least one serious axe violation. After, 21 of 22 pages have none; the homepage has one remaining rule (dimmed demo text), which is a design decision.

| ID | Severity | Finding | Status |
|---|---|---|---|
| A11Y-01 | High | Service cards hid their content from screen readers | **Fixed** |
| A11Y-02 | High | FAQ links on the tool pages were unreadable (2.21:1) | **Fixed** |
| A11Y-03 | Medium | Blog reference links distinguished by colour alone | **Fixed** |
| A11Y-04 | Medium | Carousel dots were 11 px tap targets | **Fixed** |
| A11Y-05 | Medium | Chat button's visible text not in its accessible name | **Fixed** |
| A11Y-06 | Medium | Comparison table not scrollable by keyboard | **Fixed** |
| A11Y-07 | Low | Decorative marquee read out by screen readers | **Fixed** |
| A11Y-08 | Medium | Dimmed demo text fails contrast (2.7–3.4:1) | Recommended |
| A11Y-09 | Medium | 44% of homepage text is under 12 px on mobile | Recommended |
| A11Y-10 | Medium | Cookie banner covers the hero buttons on phones | Recommended (draft below) |
| A11Y-11 | Low | Inactive carousel dots are almost invisible | Recommended |
| COMP-01 | High | Privacy policy says GA4 loads only after Accept; it loads before | Recommended (draft below, your approval needed) |
| COMP-02 | Medium | Company number and registered office missing from most footers | Recommended (draft below) |
| COMP-03 | Medium | ICO registration number not shown | Needs my input |
| COMP-04 | Low | Cookie policy date predates the latest tag change | Recommended |

---

## Accessibility

### A11Y-01 · Service cards hid their content (High, Fixed)

**Evidence:** `index.html:157-175`: seven cards were `<div … tabindex="0" role="button" aria-label="AI Agent Development — see live demo">`, each containing a real `<button>`. axe: `nested-interactive`, 7 nodes.

**Why it matters:** a button's children are presentational to assistive technology, so a screen-reader user heard only the label. The heading, description and example for every service, the core sales content, was not available to them. Keyboard users also had two tab stops per card.

**Fix (commit `c66511c`):** removed `role`, `tabindex` and `aria-label` from the card. The arrow button inside is the control; clicking anywhere on the card still works.

### A11Y-02 · FAQ links unreadable (High, Fixed)

**Evidence:** `.faq-a > a` on `ai-readiness.html`, `loss-calculator.html` and `ai-policy-generator.html` had no link style, so rendered `#0000ee` on `#010108`: 2.21:1 (WCAG AA needs 4.5:1).

**Fix (commit `41525cf`):** `.faq-a a{color:var(--neon);…}`, the same style as the consent text on those pages.

### A11Y-03 · Reference links (Medium, Fixed)

**Evidence:** `.refs a` in five blog posts: neon on grey text, 2.41:1 against the surrounding text and no underline. axe: `link-in-text-block`, 3–5 nodes per post.

**Fix (commit `75f46c3`):** links are underlined.

### A11Y-04 · Carousel dots (Medium, Fixed)

**Evidence:** `assets/home.css:353`: `.blog-dot{width:11px;height:11px}`. WCAG 2.2 SC 2.5.8 requires 24×24 px.

**Fix (commit `1374038`):** each button is 24×24 px with the same 11 px diamond drawn inside. Before and after screenshots are pixel-equivalent.

### A11Y-05 · Chat button name (Medium, Fixed)

**Evidence:** `#chat-toggle` has `aria-label="Open AI chat assistant"` but contained the text "1". axe: `label-content-name-mismatch`.

**Fix (commit `329b6ac`):** the badge is drawn with CSS and is `aria-hidden`.

### A11Y-06 · Comparison table (Medium, Fixed)

**Evidence:** `.table-scroll` in the GPT-6 post overflows on phones and had no focusable content. axe: `scrollable-region-focusable`.

**Fix (commit `75f46c3`):** now a focusable `<section>` with an `aria-label`.

### A11Y-07 · Marquee (Low, Fixed)

**Evidence:** `index.html:199`: "AUTOMATE ◆ INNOVATE ◆ SCALE" repeated six times with no `aria-hidden`.

**Fix (commit `329b6ac`):** `aria-hidden="true"`. axe still reports its 1.24:1 contrast on mobile; purely decorative text is exempt from SC 1.4.3.

### A11Y-08 · Dimmed demo text (Medium, Recommended)

**Evidence:** `assets/home.css:127-132`. Demo steps use `opacity:.35` (pending) and `.65` (done) over 9.6–10.6 px text, giving 2.71:1 to 3.37:1. This is why the homepage scores 97 rather than 100.

**Why not fixed:** the dimming is the visual language of the demo. It is your call.

**Draft:** keeps the effect and passes for completed steps:

```css
.flow-step{opacity:.6;}
.flow-step.done{opacity:.9;}
.fs-detail{color:#9aa3b8;}
```

### A11Y-09 · Small text (Medium, Recommended)

**Evidence:** Lighthouse mobile, homepage: "44.51% legible text". Labels use `.6rem`–`.68rem` monospace (9.6–10.9 px), for example `assets/home.css:132` and the cookie banner (`assets/consent.css:14`).

**Why it matters:** many of your prospects are business owners reading on a phone. The site's own "Larger text" toggle helps only those who find it.

**Draft:** raise the smallest sizes on phones only:

```css
@media (max-width:680px){
  .fs-detail,.fs-name,.service-num,.price-desc,.demo-stat-label{font-size:.75rem;}
}
```

### A11Y-10 · Cookie banner on phones (Medium, Recommended)

**Evidence:** at 390×844 the banner is 374×307 px starting at y=529; "Book a Free Strategy Call" ends at y=570 and "Free AI Readiness Test" sits below it. Both hero buttons are covered until the visitor chooses. Screenshot: `audit/img/cookie-banner-mobile-390x844.png`.

**Why not fixed:** shortening it changes consent wording, which is legal text.

**Draft banner text (30 words instead of 62; the cookie names stay in the Cookie Policy):**

> We use analytics cookies (Google Analytics, Microsoft Clarity) and a Google Preferred Source button only if you accept. The Google tag runs without cookies until then. See our Cookie Policy.

Buttons unchanged: Accept · Reject Non-Essential · Cookie Settings.

### A11Y-11 · Inactive dots (Low, Recommended)

**Evidence:** `clip-path` on `.blog-dot` clips its own 1 px border, so inactive dots show only four corner pixels (unchanged by A11Y-04). **Fix:** replace the border with `background:rgba(0,255,231,.35)` on the inactive state.

### Checked and found sound

| Area | Result |
|---|---|
| Language | `lang="en-GB"` on all 23 pages |
| Headings | One H1 per page; no skipped levels |
| Images | Every `<img>` has descriptive `alt`; decorative SVGs are `aria-hidden` |
| Forms | Every input has a `<label for>`; errors are announced via `role="status"` / `aria-live` |
| Skip link | Present on every page, visible on focus |
| Focus | `:focus-visible` outlines on buttons, cards, carousel and switches |
| Reduced motion | OS preference respected before first paint (`index.html:52-57`); 3D hero and hex grid stop; a manual toggle exists |
| Zoom | No horizontal scroll at 390 px; viewport does not block zoom |
| Keyboard | Menu, demos, carousel, chat and accessibility panel all operable (code review; not a full manual pass) |

---

## UK GDPR and PECR

### COMP-01 · Privacy policy does not match how GA4 loads (High, Recommended, your approval needed)

**Evidence:**
- `privacy.html:224`: "Only after you click **Accept**, we also load Google Analytics 4…"
- `privacy.html:201`: "Google — Google Analytics 4 and the Preferred Source button (only after you accept cookies)"
- Live behaviour (13 Nov 2026, `about.html`, no choice made, 7 seconds): one request to `www.googletagmanager.com/gtag/js?id=G-F6TTH896D0`; **no cookies, no localStorage, no analytics hit observed**. After Reject: nothing further.
- `cookies.html:158` already describes this correctly ("The Google tag is present on every page but runs in Google Consent Mode with analytics storage denied").

**Why it matters:** no cookie is set before consent, so the PECR storage rule is respected. But the visitor's browser does contact Google (IP address, user agent, page URL) before any choice, and the privacy policy says otherwise. An inaccurate privacy notice is a transparency failure under UK GDPR Articles 5(1)(a) and 13, and it is the kind of mismatch a complaint or a scanner will pick up. Regulators have not settled their view of consent-mode pings before consent; the cautious option is to load the tag only after Accept (PERF-03, option 2).

**You chose to keep the tag and correct the wording. Draft replacements:**

`privacy.html:224`, replace the first two sentences with:

> We set a small number of strictly necessary items (your cookie choice and accessibility preferences). Every page also loads the Google tag in Google Consent Mode with all storage denied: until you click **Accept** it sets no cookies and stores nothing on your device, but your browser does request the tag from Google, which means Google receives your IP address and browser details. After you click **Accept**, Google Analytics 4 sets cookies (`_ga`, `_ga_F6TTH896D0`) to measure aggregate traffic.

`privacy.html:201`, replace the list item with:

> **Google** — the Google tag is requested on every page without cookies; Google Analytics 4 cookies and the Preferred Source button are used only after you accept cookies

Also add one sentence to the analytics paragraph: "We also record anonymous events such as form submissions and clicks on phone, email and call-to-action links; these contain no information you type." This covers the events added in CRO-04.

Update "Last updated" on `privacy.html` and `cookies.html` to the date you publish.

### COMP-02 · Company details in footers (Medium, Recommended)

**Evidence:** the company number (17381169) and registered office appear on `index.html`, `about.html`, `privacy.html` and `terms.html` only; the other 18 pages have phone and email but neither.

**Why it matters:** the Companies (Trading Disclosures) Regulations 2015 require the registered name, number, place of registration and registered office to be on the website. Having them on the homepage and legal pages meets the rule. Showing them in every footer is the common practice, helps NAP consistency for local search, and reassures a visitor who lands on a location or tool page from Google.

**Draft footer line for the 18 pages:**

> East Anglia AI Services Ltd · Registered in England & Wales No. 17381169 · Registered office: 44 Amderley Drive, Norwich, NR4 6HZ

Say yes and I will add it. Note that the registered office is a residential address; a registered-office service would keep it off every page.

### COMP-03 · ICO registration (Medium, Needs my input)

**Evidence:** no ICO registration number on the site; the 9 November review records that it was left out on purpose.

**Why it matters:** a company that processes personal data (enquiries, tool answers, analytics) normally must pay the ICO data protection fee (£52 a year for a micro-organisation at the current published rate; check ico.org.uk) unless exempt. Showing the number is optional. Being registered is not. Please confirm it is paid.

### COMP-04 · Cookie policy date (Low, Recommended)

**Evidence:** `cookies.html:149` "Last updated: 5 September 2026"; the tag behaviour changed on 10 November (commit `422f879`). Update with COMP-01.

### Checked and found sound

| Area | Result |
|---|---|
| Cookies before consent | None. Verified live on all 22 pages |
| Reject | Sets no cookies; clears `_ga*`, `_clck`, `_clsk` |
| Clarity, Preferred Source | Load only after Accept (verified: no request before) |
| Banner | Accept and Reject have equal prominence; no pre-ticked choice; choice can be changed on `/cookies.html` |
| Privacy policy | Controller identity, lawful bases, retention (24 months for enquiries), processors, international transfers, rights and ICO complaint route are all present |
| Cookie policy, terms, contact policy | Present and linked from every footer |
| Form wording | Contact form: "We'll only use these details to respond to your enquiry — no spam, no marketing lists" with a privacy link (`index.html:626`). Tool gates carry the equivalent line |
| Data minimisation | Phone is optional on every form. Tool gates require name, email and company |
| ARIA chat | Rule-based and local; nothing typed leaves the browser |
