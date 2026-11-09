# Code Review: eastangliaaiservices.co.uk (whole site)

**Date:** 9 November 2026 · **Commit reviewed:** `d5923da` (main)
**Scope:** all 22 HTML pages, `assets/consent.js`, `assets/consent.css`, both GitHub workflows, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, IndexNow key files, `CNAME`, `site.webmanifest`, images.

---

## Summary

This is a well-built static site with **no backdoors, malware, or leaked secrets**. Consent handling is above average for a small business site, and SEO/accessibility basics are solid.

The real problems are:

1. **Leads can be lost silently.** The three lead tools never check whether Web3Forms accepted a submission.
2. **The privacy policy is incomplete** compared with what the site actually loads (Clarity session recording, Preferred Source, US transfers).
3. **Two self-XSS issues.** User-typed text reaches `innerHTML` in the policy generator and in the ARIA chat.
4. **The ARIA chatbot contradicts the FAQ** on prices and timelines.

None of these is an emergency, but #1 and #2 should be fixed this week.

---

## 1. Backdoor / malware / secrets sweep: ✅ clean

| Check | Result |
|---|---|
| External `<script src>` | Only `/assets/consent.js` (first-party) on every page |
| Dynamically loaded scripts | Three.js r128 from cdnjs **with SRI hash + `crossorigin`** (`index.html:1146`); GA4, Clarity and Google Preferred Source load **only after Accept** (`assets/consent.js`) |
| `eval`, `new Function`, `atob`, `document.write` | None found |
| Obfuscated / long base64 blobs | None |
| Hidden links or text (`display:none`, off-screen, zero font) | None |
| `<iframe>` | None |
| Outbound domains | All legitimate (gov.uk, ONS, ICO, Stanford, news sites, socials, Companies House) |
| Where visitor data goes | Web3Forms (forms only). GA4, Clarity and Google only after consent. ARIA chat stays in the browser. |
| GitHub workflows | `permissions: contents: read`; the IndexNow key is held in a secret and format-validated; no third-party actions beyond `actions/*` and `lycheeverse/lychee-action` |

**Things that look like secrets but are fine:**
- **Web3Forms `access_key`** (`3be4d006-…`) in `index.html`, `ai-readiness.html`, `loss-calculator.html` and `ai-policy-generator.html`. Web3Forms keys are public by design: they can only send email to you. **To do:** in the Web3Forms dashboard, restrict the key to `eastangliaaiservices.co.uk`, and consider enabling their hCaptcha/spam filter.
- **`58cd3c7b….txt` and `295da9ea….txt`** at the root. These are IndexNow ownership files, public by design. If only one key is in use, delete the other so it can't be reused.

---

## 2. Critical / important issues

| # | File | Line | Issue | Severity |
|---|------|------|-------|----------|
| 1 | `ai-readiness.html`, `loss-calculator.html`, `ai-policy-generator.html` | 560, 512, 662 | Gate forms `await fetch(...)` but **never read the response**. If Web3Forms rejects the submission (rate limit, spam flag, monthly quota, key problem), the visitor still sees the report and you never get the lead. | 🔴 High (business) |
| 2 | `privacy.html` | §2, §8 | The policy only mentions GA4. It does **not** mention Microsoft Clarity (session recording/heatmaps), the Google Preferred Source button (`NID` cookie), Google Fonts, international (US) transfers to Google, Microsoft and Web3Forms, collection of **quiz/calculator answers**, a retention period for tool leads, the ICO registration number, or the lawful basis for following up on tool leads. `cookies.html` and the banner are more complete than the privacy policy. | 🔴 High (UK GDPR) |
| 3 | `ai-policy-generator.html` | 552–621, 676 | `answers.company` and `answers.contact` (free text) are concatenated into HTML and inserted with `insertAdjacentHTML`. That is DOM XSS (self-XSS now, because there is no URL prefill, but one future "prefill from link" feature makes it real). It also corrupts the policy if a name contains `<`, e.g. `A<B Ltd`. | 🟠 Medium |
| 4 | `index.html` | 1232 (`addMsg`) | The visitor's chat message goes into `innerHTML` after a `**bold**` regex. Typing `<img src=x onerror=alert(1)>` executes. Self-XSS only, but trivial to fix. | 🟠 Low–Medium |
| 5 | `index.html` | ARIA `replyRules` | The chatbot contradicts the page: it says pricing "depends" while the FAQ/JSON-LD give "from £395 / £595 / £1,200 + £149/mo / £1,500 / £3,000". It says "deployment within **48 hours**" while the FAQ says "weeks". It lists "**seven** core services", but voice agents makes eight. Inconsistent claims hurt trust and can be a consumer-law (CPRs/DMCC) issue. | 🟠 Medium |
| 6 | All pages | `<head>` | Google Fonts loads from `fonts.googleapis.com` **before consent**, sending the visitor's IP to Google. | 🟡 Low–Medium |

## 3. Suggestions

| # | File | Line | Suggestion | Category |
|---|------|------|------------|----------|
| 7 | `loss-calculator.html` | 448–459 | `type="number"` fields don't enforce `min`/`max` when typed, so `-500` or `99999999` produce negative or absurd "losses". The missed-call and slow-lead figures may also count the same enquiries twice. Clamp the values and add an "estimates may overlap" note. | Correctness |
| 8 | All pages | `<head>` | No Content-Security-Policy, and GitHub Pages can't send security headers. Add a meta CSP and referrer policy (snippet below). Longer term, put Cloudflare (free) in front for HSTS, `X-Frame-Options`, `Permissions-Policy`. | Security |
| 9 | `.github/workflows/html-check.yml` | 34, 48 | html-validate and lychee both have `continue-on-error: true`, so dead links and invalid HTML never fail CI. Triage the ~88 findings, then make both blocking. | Maintainability |
| 10 | `index.html` | hex grid `setInterval` | The 1.2 s interval runs forever, even with the tab hidden or reduced motion on. Pause it like the 3D hero. | Performance |
| 11 | `index.html` | whole file (151 KB) | Large inline CSS and JS on every visit. Move them into `/assets/site.css` and `/assets/home.js` so they get cached; the other pages repeat the same CSS too. | Performance |
| 12 | `og-image.png`, `blog/*.jpg` | — | `og-image.png` is 261 KB and the blog JPG fallbacks are up to 208 KB. Compress them (target < 120 KB for the OG image, < 100 KB for the JPGs). | Performance |
| 13 | `README.md` | Deployment section | Out of date: it says "single-file site" and gives a `github.io` URL, but the site is multi-page with a custom domain (`CNAME`). | Docs |
| 14 | `sitemap.xml`, `blog/index.html`, `llms.txt` | `sitemap.xml:69` | Blog URLs are hand-maintained in three places. Add a tiny CI script that fails when the lists differ. | Maintainability |
| 15 | `index.html` JSON-LD, `privacy.html` | — | A residential street address is published. It's required for a registered office, but a virtual registered-office service would keep your home address off Google. Your call. | Privacy (info) |
| 16 | `index.html` | custom cursor, scanlines | Check that the custom cursor never hides the real cursor for keyboard/low-vision users, and that the a11y panel's "high contrast" also removes the scanlines. | Accessibility |

---

## 4. What looks good ✅

- **Consent:** Google Consent Mode v2 defaults to denied, nothing loads before Accept, cookies are cleared on Reject, `localStorage` is wrapped in try/catch, and there's a public `EAAISConsent.reopen()`.
- **Three.js** is lazy-loaded with SRI, skipped on phones, Save-Data and reduced motion, paused on hidden tabs, and frame-capped.
- **Accessibility:** `lang="en-GB"`, skip links, an accessibility panel (motion/contrast/text) that persists, `aria-live` form status, keyboard handling on cards and carousel, WCAG 2.2 touch-target CSS.
- **Links:** every internal link and `/#anchor` resolves to a real file/ID, and every `target="_blank"` has `rel="noopener"`.
- **SEO:** exactly one `<h1>` per page, a canonical on every indexable page (404 is `noindex`), sensible title and description lengths, OG tags on all marketing pages, WebP with JPG fallback, rich JSON-LD, sitemap, IndexNow automation, `llms.txt`, AI crawlers allowed.
- **Forms:** honeypot field, client-side validation, and visitor names in reports rendered with `textContent` (safe).
- **ARIA** is honestly rule-based and local; nothing leaves the browser, and the privacy policy says so.

---

## 5. How to fix it (copy-paste ready)

### Fix #1: don't lose leads (all 3 tools)
Replace the bare `await fetch(...)` in each gate handler with:
```js
let delivered = false;
try {
  const res = await fetch('https://api.web3forms.com/submit', {method:'POST', headers:{'Accept':'application/json'}, body:fd});
  const data = await res.json().catch(() => ({}));
  delivered = res.ok && data.success === true;
} catch (err) { /* network failure */ }
if (!delivered) {
  status.innerHTML = '';
  status.append('Your report is below, but we couldn\'t notify our team automatically. Please email ',
    Object.assign(document.createElement('a'), {href:'mailto:info@eastangliaaiservices.co.uk', textContent:'info@eastangliaaiservices.co.uk'}),
    ' if you\'d like us to follow up.');
  status.className = 'form-status err show';
}
renderReport(name, company);   // still never block the visitor's report
show('screen-report');
```
Also send yourself a test submission from each tool after deploying, and check the Web3Forms dashboard's monthly quota.

### Fix #3: escape user text in the policy generator
At the top of the script in `ai-policy-generator.html`:
```js
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
```
Then in `buildPolicy()` and `contactPhrase()`:
```js
const company = esc(answers.company || '[Your Company]');
function contactPhrase(){ return answers.contact ? esc(answers.contact) : 'a designated manager'; }
```

### Fix #4: escape user chat text in ARIA (`index.html`, `addMsg`)
```js
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
// inside addMsg:
const safe = role === 'ai' ? text : esc(text);   // bot replies are trusted, author-written HTML
b.innerHTML = safe.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
```

### Fix #5: make ARIA match the FAQ
- **Pricing rule:** "Fixed written quotes after a free call. Typical starting points: AI training from £595, AI Opportunity Review from £395, workflow automation pilot from £1,500, AI voice agent from £1,200 + £149/month, custom AI agent or LLM integration from £3,000 (all ex-VAT)."
- **Timeline rule:** "We can start scoping within 48 hours; most projects go live in a few weeks."
- **Services rule:** change to eight services, and add a rule for `voice`, `phone`, `receptionist`, `calls` that links to `/ai-voice-agents.html`.

### Fix #6: self-host fonts
1. Download Syne (400/700/800) and Space Mono (400/700) as woff2 (e.g. via google-webfonts-helper) into `/assets/fonts/`.
2. Add `@font-face` rules in a shared `/assets/fonts.css` with `font-display: swap`.
3. Remove the `fonts.googleapis.com` / `fonts.gstatic.com` `<link>`s and preconnects from all 22 pages.

### Fix #7: clamp calculator inputs (`loss-calculator.html`, `getValues`)
```js
FIELDS.forEach(f => {
  const n = Number(document.getElementById('in-'+f.id).value) || 0;
  v[f.id] = Math.min(f.max, Math.max(f.min, n));
});
```

### Fix #8: meta CSP + referrer (add to every `<head>`, test before you ship)
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://news.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://news.google.com; frame-src https://news.google.com https://accounts.google.com; base-uri 'self'; form-action 'self' https://api.web3forms.com; object-src 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
```
`'unsafe-inline'` is needed because the site uses inline scripts and `onclick` handlers. Moving those into files later lets you remove it. `frame-ancestors` can't be set via meta, so clickjacking protection needs Cloudflare headers.

**How to test:** open each page with DevTools → Console, accept cookies, use each tool and the contact form, and confirm there are no CSP violations.

### Fix #2: privacy policy additions (`privacy.html`)
Add or extend these sections:
- **Analytics and session recording:** GA4 (Google, 14 months / 2 years per `cookies.html`), and **Microsoft Clarity**, which records anonymised clicks, scrolls and mouse movement. Both run only with consent.
- **Google Preferred Source button:** Google's `NID` cookie, consent-gated.
- **Free tools:** what the readiness quiz, loss calculator and policy generator collect (contact details + answers), why (to send/follow up on the report = legitimate interests, or consent), and how long you keep it (e.g. 24 months if no engagement).
- **Processors and international transfers:** Web3Forms, Google, Microsoft, your email provider; transfers to the US under the UK–US Data Bridge / IDTA.
- **Google Fonts** (or remove this once fonts are self-hosted).
- **ICO registration number** (data protection fee): add the ZA… number.

---

## 6. Prioritised to-do list

**P0: this week**
- [ ] Fix #1: check Web3Forms responses in all 3 tools, then test each tool live
- [ ] Fix #2: update the privacy policy (Clarity, Preferred Source, tools data, transfers, ICO number)
- [ ] Restrict the Web3Forms key to your domain in its dashboard

**P1: this month**
- [ ] Fix #3 and #4: escape user input (policy generator, ARIA)
- [ ] Fix #5: align ARIA answers with the FAQ prices, timelines and services
- [ ] Fix #7: clamp calculator inputs and add an overlap note
- [ ] Triage html-validate and lychee results, then make the CI jobs blocking (#9)
- [ ] Check the lychee CI output for dead outbound links (60 external URLs)

**P2: when time allows**
- [ ] Fix #6: self-host fonts
- [ ] Fix #8: meta CSP, then Cloudflare in front for real security headers
- [ ] Pause the hex-grid interval; split inline CSS/JS into cached files (#10, #11)
- [ ] Compress `og-image.png` and the blog JPGs (#12)
- [ ] Update `README.md` (#13); add a CI check that the sitemap, blog index and llms.txt lists match (#14)
- [ ] Decide on the registered-office address (#15)

---

## 7. Limits of this review

- **Outbound links and live headers were not checked live.** The review sandbox blocks outbound network access. Every internal link and anchor was verified against the files. The 60 external links (government PDFs, news articles, socials) should be checked from the `Link Checker` job in GitHub Actions or with a manual run of `lychee`.
- **html-validate was not run locally.** CI already reports about 88 findings, mostly missing `type="button"` and inline styles. These are cosmetic and not security-relevant.
- **Third-party dashboards** (Web3Forms, GA4, Clarity, Google Business Profile, DNS/registrar) were not accessible. Check that 2FA is on for each one and for GitHub. A compromised GitHub account is the only realistic way someone could plant a backdoor in this site.

---

## Verdict

**Approve with changes.** No backdoors or security emergencies. Fix the silent lead loss and the privacy policy gaps first (P0), then the input-escaping and chatbot consistency items (P1).
