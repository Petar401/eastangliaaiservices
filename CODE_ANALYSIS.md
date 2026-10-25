# Site Code Analysis — Issues & Improvement Plan (A → Z)

**Site:** eastangliaaiservices.co.uk (static site, GitHub Pages)
**Pages reviewed:** `index.html`, `ai-readiness.html`, `blog/index.html`, all 4 blog articles, `sitemap.xml`, `robots.txt`, `site.webmanifest`, assets
**Date:** 11 July 2026

## Summary

| Severity | Count | Meaning |
|---|---|---|
| 🔴 Critical | 6 | Broken functionality, single points of failure, or legal/compliance risk |
| 🟠 High | 9 | Real bugs, accessibility failures, significant SEO/performance loss |
| 🟡 Medium | 12 | Quality, consistency and UX problems worth fixing |
| 🟢 Low | 8 | Polish and maintainability |

---

## 🔴 Critical

### C1. `og-image.png` is referenced but does not exist
`index.html:23,27` and `ai-readiness.html:23,27` point `og:image` / `twitter:image` at `https://eastangliaaiservices.co.uk/og-image.png` — **the file is not in the repository**. Every share of the homepage or the AI Readiness page on Facebook, LinkedIn, WhatsApp, Slack or X shows a broken/blank preview. For a business that promotes itself on Facebook/LinkedIn/TikTok this directly hurts click-through.
**Fix:** create a 1200×630 `og-image.png` (brand + tagline) and commit it, or point the tags at an existing image (e.g. a blog JPG) until one exists.

### C2. Three.js is a render-blocking single point of failure for ALL page JavaScript
`index.html:31` loads `three.min.js` (r128, ~600 KB, released 2021) from cdnjs **synchronously in `<head>`** — it blocks first paint. Worse, the main inline script (`index.html:1064-1065`) calls `new THREE.WebGLRenderer(...)` at the top level with no guard. If the CDN is slow, blocked (corporate networks, ad-blockers, China), or down, that line throws and **every function defined after it dies**: hamburger menu, demo tabs, modals, cookie banner, chat, the AJAX contact form. On mobile with the CDN blocked, the site is effectively unusable (menu won't open).
**Fix:** load with `defer`, wrap the Three.js block in `if (window.THREE) { ... }` (or `try/catch`), and move critical UI code (menu, form, modals, cookie banner) **before** / independent of the 3D code. Consider dropping Three.js entirely for a lightweight 2D canvas particle effect — it is decorative only.

### C3. Escape key closes modals but leaves page scroll permanently locked
`index.html:1132` `openModal()` sets `document.body.style.overflow='hidden'`. The Escape handler (`index.html:1135`) removes the `.open` class directly **without resetting `body.style.overflow`**. Anyone who opens Terms/Privacy/Cookies and presses Escape can no longer scroll the page until reload.
**Fix:** make the Escape handler call `closeModal()` (which resets overflow) instead of stripping classes.

### C4. Privacy & Cookie Policies describe a chatbot that doesn't exist — inaccurate UK GDPR disclosures
- Privacy Policy §4 (`index.html:951`): "The ARIA chatbot uses the Anthropic Claude API… Your API key is stored locally in your browser". **False** — ARIA is a local keyword-matcher (`index.html:1156-1173`); no API is called, no key exists. The API-key UI was removed but its CSS remains (`#api-setup`, `#api-key-input`, `index.html:284-292` — dead code).
- Cookie Policy §2 (`index.html:968`): claims `eaais_chat_history` localStorage is used to persist chat "for 30 days". **False** — chat history is never stored anywhere in the code.
- Cookie Policy omits the storage keys that **are** actually used: `eaais_a11y_motion`, `eaais_a11y_contrast`, `eaais_a11y_text`.

Inaccurate privacy disclosures are a compliance risk, not just a typo.
**Fix:** rewrite Privacy §4 / Cookie §2+§5 to describe reality (rule-based on-page assistant, no data leaves the browser; consent + accessibility keys stored). Delete the dead `#api-setup` CSS.

### C5. Company registration details missing from footer
`index.html:918` says "Registered in England & Wales" but shows **no company number and no registered office address**. The Companies Act 2006 (and Company, LLP and Business Names Regulations) require the registered name, number, and registered office on business websites of a Ltd company.
**Fix:** add "East Anglia AI Services Ltd · Company No. XXXXXXXX · Registered office: …" to the footer (and to the Terms modal).

### C6. Keyboard users cannot operate several core controls
- Service cards (`index.html:538-555`): clickable via `onclick` and have a keydown handler (`index.html:1129`), **but no `tabindex="0"` / `role="button"`** — they can never receive focus, so the keydown handler is dead code.
- Footer legal links (`index.html:915,919`) and the "Chat Now" contact card (`index.html:837`) are `<a onclick=…>` **without `href`** — not focusable, invisible to keyboard and screen-reader users. Terms/Privacy/Cookie policies are therefore unreachable without a mouse (a WCAG 2.1.1 failure on legally required content).
**Fix:** use `<button>` or `<a href="#" role="button">` with proper handlers; add `tabindex="0"` + `role="button"` to service cards (the inner arrow `<button>` already works — the simplest fix is to make the whole card a link/button element).

---

## 🟠 High

### H1. Blog carousel puts `aria-hidden="true"` on visible, focusable slides
`index.html:1267` sets `aria-hidden="true"` on every slide except the "current" one — but on desktop **three slides are visible at once**, and hidden slides still contain focusable `<a>` links. This violates WCAG (aria-hidden on focusable content) and hides visible content from screen readers.
**Fix:** drop the `aria-hidden` toggling entirely (the viewport scroll already conveys position), or set `inert` on genuinely off-screen slides only, adjusting for how many are in view.

### H2. Carousel auto-advance has no pause control
The blog carousel auto-rotates every 6 s (`index.html:1248`). It stops on hover/focus and respects reduce-motion, but **touch users have no way to pause it** — WCAG 2.2.2 requires a visible pause/stop mechanism for auto-updating content.
**Fix:** add a small pause/play button next to the dots, or stop auto-advance after first user interaction.

### H3. Modals have no focus management
Modals (`index.html:924-993`) don't move focus into the dialog on open, don't trap Tab, don't restore focus on close, and the overlays lack `role="dialog"` / `aria-modal="true"`. Keyboard/screen-reader users stay "behind" the modal in the page.
**Fix:** add `role="dialog" aria-modal="true" aria-labelledby=…`, focus the close button on open, trap Tab, restore focus on close.

### H4. `ai-readiness.html` is missing the accessibility widget and high-contrast CSS
The page applies saved a11y classes from localStorage (`ai-readiness.html:189-193`) but: (a) there is **no accessibility panel** on the page, so a visitor landing here directly can't change settings; (b) there are **no `html.high-contrast` CSS rules** in the page, so the saved contrast preference silently does nothing.
**Fix:** port the a11y widget + `html.high-contrast` rules from `index.html`.

### H5. Newest blog post missing from homepage; carousel order is wrong
The 5 July post (*consultant vs buy/rent/subscribe*) is absent from the homepage carousel (`index.html:783-815`), and the three shown are ordered 26 June → 22 June → 24 June (not newest-first). The homepage is showing stale content and losing internal links to the newest article.
**Fix:** add the new post as slide 1, order newest-first, update `aria-label`s ("1 of 4" …). Longer-term: generate this section from one source of truth (see M10).

### H6. No `preconnect` for Google Fonts; fonts are render-blocking on every page
All 7 pages load `fonts.googleapis.com` CSS with no `<link rel="preconnect">` to `fonts.googleapis.com` / `fonts.gstatic.com` (checked: 0 occurrences). This typically costs 100–300 ms of first render on mobile.
**Fix:** add both preconnect links (with `crossorigin` for gstatic) before the fonts stylesheet on every page; consider `font-display: swap` is already in the URL (`display=swap` ✓).

### H7. Oversized blog images
`blog/ai-consultancy-east-anglia.jpg` (2400×1350, 212 KB) and `blog/llm-local-llm-east-anglia.jpg` (2400×1350, 160 KB) are double the resolution of their siblings (1200×675) and are displayed in ~370 px cards. No `srcset`, no WebP/AVIF.
**Fix:** resize both to 1200×675 (the `width`/`height` attributes already claim 1200×675 — so the markup currently lies about intrinsic size), and ideally serve WebP with JPG fallback via `<picture>`/`srcset`.

### H8. Demo timers stack and run unseen
All six demo animations run at page load (`index.html:1108-1126`) even though the demos section is far below the fold — including a ~12 s chain of support-chat timeouts. Rapidly switching demo tabs re-runs functions **without cancelling previous timers**, so the support chat can render duplicate/interleaved messages and the lead-flow steps flicker.
**Fix:** only start a demo when its tab is activated (and on first scroll into view via IntersectionObserver); keep timer IDs per demo and clear them at the start of each run.

### H9. Chat message rendering uses `innerHTML` on user input
`addMsg()` (`index.html:1150`) injects user text through `innerHTML` after a markdown-ish regex. It's self-XSS only today (input never persists or reaches a server), but it becomes a real XSS the day the chat is wired to a backend or history storage.
**Fix:** build the bubble with `textContent`, then apply bold/line-break formatting safely (e.g. split on `\n`, create `<strong>` nodes).

---

## 🟡 Medium

### M1. AI-readiness "privacy policy" consent link points to the contact section
`ai-readiness.html:293` — the consent text's "privacy policy" link goes to `/#contact`, not the privacy policy. A user consenting to data processing can't actually read the policy from there.
**Fix:** link to the privacy policy (e.g. `/#` + auto-open the privacy modal via a URL hash handler, or better: give the policies their own static pages — see M9).

### M2. Report logic overlap: a 2/3 answer is both a "strength" and a "gap"
`ai-readiness.html:520-521`: strengths filter `v>=2`, gaps filter `v<=2`. A dimension scored 2/3 can appear under **both** "Where You're Strong" and "Your Biggest Opportunities", which reads as contradictory.
**Fix:** make the buckets exclusive (e.g. strengths `v===3`, then top-up with `v===2`; gaps `v<=1`, then `v===2` only if not already used as a strength).

### M3. Primary CTA is a `mailto:` link
"Book a Free Strategy Call" buttons (`index.html:485,557,899`) open the user's mail client. On mobile/desktop without a configured mail app this is a dead end — and it's the site's #1 conversion action.
**Fix:** point primary CTAs at the contact form (`#contact`) or a booking tool (Calendly etc.); keep `mailto:` as a secondary option.

### M4. Tiny, low-contrast text throughout
Base label/meta sizes of 0.5–0.62 rem (8–10 px) in `--dim: #6b7280` on near-black backgrounds sit around/below WCAG AA contrast for that size and are genuinely hard to read (e.g. `.fc-label`, `.demo-stat-label`, `.footer-copy`, ticker items).
**Fix:** raise the floor to ~0.68 rem and/or lighten `--dim` (the high-contrast mode's `#cfd3e6` shows it's feasible).

### M5. Fabricated-sounding statistics presented as facts
Demo stats ("99.2% accuracy", "£12k monthly saving", "99.97% uptime SLA") and outcome claims in service cards ("ETA accuracy improved from ~70% to ~94%") read as client results. If there are no clients/measurements behind them, this is an ASA/CAP risk and a trust risk for a young consultancy.
**Fix:** label demos "illustrative example" or soften to "typical target" figures; keep real numbers once real case studies exist.

### M6. Legal "Last updated" dates inconsistent
Terms & Privacy say "May 2025" (`index.html:928,947`); Cookie & Contact policies say "May 2026" (`index.html:966,982`). One pair is wrong.

### M7. Nav inconsistency across pages
Homepage nav: Services / Demos / Process / About / Blog / AI Readiness / Contact. Blog index & article navs: only Services / Blog / Contact — the **AI Readiness lead magnet is not linked** from any blog page, and there's no hamburger on blog pages (nav links just shrink on mobile).
**Fix:** use one consistent nav (include AI Readiness) across all pages; add the mobile menu to blog pages.

### M8. No custom 404 page
GitHub Pages will serve its generic 404. A branded `404.html` with links to home/blog/readiness recovers lost visitors.

### M9. Legal policies only exist inside homepage modals
Terms/Privacy/Cookies have no URLs — they can't be linked from the AI-readiness form (see M1), emails, or Web3Forms consent text, and search engines can't index them.
**Fix:** create `privacy.html`, `terms.html`, `cookies.html` (the modal content already exists), keep the modals if desired.

### M10. Massive duplication of shared CSS/JS across 7 pages
Nav, footer, a11y widget, fonts and base styles are copy-pasted into every page (~10–15 KB each, already drifting — see H4). Every change must be made 7×.
**Fix:** extract `assets/site.css` and `assets/site.js` (cacheable across pages), or introduce a tiny static build (Eleventy etc.) with shared partials — this also fixes the stale homepage carousel class of problem (H5).

### M11. `site.webmanifest` missing fields
No `start_url`, `scope` or `description` (`site.webmanifest`). Add `"start_url": "/"`, `"scope": "/"`, a description — and note `favicon-16.png`/`favicon-32.png` exist but are never referenced (fine to link or delete).

### M12. Hero canvas + hex grid + intervals run forever
The fixed full-screen Three.js scene keeps rendering when scrolled far past the hero, and the hex-grid `setInterval` (`index.html:1096`) plus ticker animations never pause — needless battery/GPU drain on mobile.
**Fix:** pause the rAF loop and intervals with an IntersectionObserver on the hero/about sections (the `__heroStart/__heroStop` hooks already exist — wire them to visibility).

---

## 🟢 Low

1. **L1 — No SRI on the cdnjs script.** Add `integrity` + `crossorigin` to `three.min.js` (`index.html:31`) if it's kept.
2. **L2 — `<a href="#">` logo on homepage** (`index.html:454`) adds a history entry; use `href="/"` like the other pages.
3. **L3 — Duplicate media-query blocks** in `index.html` (`@media(max-width:900px)` appears 3×, `@media(max-width:680px)` 2×) — merge for maintainability.
4. **L4 — `meta keywords`** (`index.html:8`, `ai-readiness.html:8`, blog posts) is ignored by search engines — harmless, removable.
5. **L5 — Chat notification badge** appears after 3 s on every visit (`index.html:1175`) — consider showing it once per session (`sessionStorage`) to reduce annoyance.
6. **L6 — Homepage title is ~100 characters** — will truncate in SERPs; front-load the key phrase ("AI Automation for East Anglia SMEs | East Anglia AI Services").
7. **L7 — Emoji icons** (contact 📞 ✉️ 🤖, steps) are announced literally by screen readers where `aria-hidden="true"` is missing (service icons have it; contact icons don't).
8. **L8 — ARIA is marketed as an AI assistant but is keyword-matching.** For an AI consultancy, a visitor probing "ARIA" and getting canned fallbacks undermines the pitch. Either label it honestly ("quick answers") or wire it to a real (server-side) LLM endpoint — never a client-side API key.

---

## Suggested order of work (A → Z roadmap)

**Phase 1 — Stop the bleeding (½ day)**
C1 og-image, C2 defer/guard Three.js, C3 Escape scroll-lock, M6 dates, H6 preconnect, H7 image resize.

**Phase 2 — Compliance & accessibility (1 day)**
C4 rewrite chatbot policy text, C5 company number, C6 keyboard operability, H1 carousel aria-hidden, H2 pause control, H3 modal focus, H4 readiness-page a11y parity, M1 privacy link, M9 policy pages.

**Phase 3 — Correctness & UX (1 day)**
H5 carousel content, H8 demo timers, M2 report buckets, M3 CTA targets, M4 text sizes, M7 nav consistency, M8 404 page.

**Phase 4 — Structure for the future (1–2 days)**
M10 extract shared CSS/JS (or adopt Eleventy), M5 claims review, M12 animation pausing, remaining Low items.
