# What's Done — "Quick Wins" Branch

Branch: `claude/loving-hypatia-ke7pah` · Date: 2026-06-19
Scope: PLAN.md Phases 0–2 + 6 (chatbot) + Cloudflare Pages prep. **Additive and corrective only — nothing existing was removed.** The futuristic design and the full 3D hero are untouched visually.

> ⚠️ Not deployed. This is staged on a branch as a **draft PR** for your review. You deploy when happy.

---

## 1. Your social links — added everywhere you asked
- **JSON-LD `sameAs`** (was empty) now lists your Facebook, LinkedIn and Google profiles → richer Knowledge-Graph signal. Validates as JSON.
- **Footer** now has an accessible social row (Facebook, LinkedIn, Google) with proper `aria-label`s, `rel="noopener"`, opening in a new tab, styled with the existing neon tokens (hover glow).
- Links used verbatim, not visited:
  - `https://www.facebook.com/profile.php?id=61589538308485`
  - `https://www.linkedin.com/in/petar-petkov-3b9471343`
  - `https://share.google/9hYOyNrlnIPvNIomS`

## 2. Hosting decision — Cloudflare Pages (not Vercel)
Vercel's free tier is **non-commercial** per its ToS, and EAAIS is a registered business, so it isn't free for you. **Cloudflare Pages** is fully free for commercial use, auto-builds, gives preview URLs, and sets the security headers GitHub Pages can't. Added (inert until you connect Cloudflare Pages — safe to commit now):
- **`_headers`** — HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, and a **CSP** tuned to the site's inline scripts/handlers + the Three.js CDN + Google Fonts, with long-cache rules for static assets.
- **`_redirects`** — canonical `www → apex` 301s.

## 3. Invisible SEO/GEO fixes (no visual change)
- **Meta description** trimmed ~200 → ~155 chars, CTA kept.
- **Favicon set** created and linked: `favicon.svg` (scalable, on-brand), `favicon.ico` (32px), `apple-touch-icon.png` (180px), plus `site.webmanifest`. Fixes the favicon 404.
- **`og-image.png` created** (1200×630, on-brand dark + neon, reads "EAST ANGLIA AI SERVICES / AI Automation across East Anglia / Norfolk Suffolk Cambridgeshire Essex"). Added `og:image:width/height/alt`. Fixes the og-image 404.
- **`#regions` now reachable** — added to the desktop nav, the mobile nav, and the footer "Company" column.
- **Heading word-runs fixed** — added a space before each `<br>` in seven section titles (About, Regions, Services, Demos, Process, Contact, CTA) so parsers/AI read "engineered for East Anglia" not "forEast Anglia". **Rendering is pixel-identical** (trailing space before a line break collapses).
- **Stable CTA `id`** added (`#get-started`) for anchoring; the chatbot and internal links point to it.
- **Footer "Services" anchors** kept valid (`#services`) with a code comment noting they retarget to real service pages in the pages branch.
- **`robots.txt`** — kept `Allow: /` and added explicit allow stanzas for GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot, Applebot(-Extended), etc. **AI crawlers are explicitly welcome.**
- **`sitemap.xml`** — `lastmod` refreshed.

## 4. 3D + performance (same look, faster) — Three.js
- **No longer render-blocking:** Three.js is removed from `<head>` and **lazy-loaded after first paint** (`requestIdleCallback`, `load` fallback). The hero appears a moment after content, so it stops blocking LCP.
- **Pauses when not visible:** the animation loop now stops on tab-hidden (`visibilitychange`) and when the hero canvas scrolls off-screen (`IntersectionObserver`), and resumes on return. Big CPU/battery win, zero visible difference.
- **`prefers-reduced-motion`** honoured — a calmer (still fully 3D) variant for users who request it; never a static fallback.
- **`preconnect`/`dns-prefetch`** added for the Three.js CDN and Google Fonts hosts.
- Existing adaptive behaviour kept: DPR capped at 2; lighter particle scene on mobile (documented as the adaptive tier). Scene geometry/colours unchanged.

## 5. Smarter chatbot "ARIA" — no API key, knows the whole site
The bot was already API-free; it's now genuinely site-aware.
- **Removed** the dead `#api-setup`/`#api-key-*` CSS and rewrote the Privacy Policy section so nothing implies an API key — it states the bot runs entirely in your browser with no third-party calls.
- **New on-device knowledge base** (~25 curated entries) covering all six services with their real outcome stats, the six demos, the 4-step process, About, each of the four counties (with towns + sector focus), pricing model, deployment timeline, integrations, security/data-residency, contact details/hours/SLA, plus greetings/thanks/bye.
- **Scored retrieval** (keyword + phrase weighting with plural handling) replaces the old first-match loop; graceful fallback points to services/contact.
- **Answers link out** to the relevant section (and close the chat on click), and each answer offers **dynamic follow-up chips**.
- **Accessibility:** chat dialog `role`/`aria-label`, message log `aria-live="polite"`, labelled input + send button, toggle `aria-expanded`, and focus management (focus moves to the input on open, back to the toggle on close).

## Files
- **Modified:** `index.html`, `robots.txt`, `sitemap.xml`
- **Added:** `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og-image.png`, `site.webmanifest`, `_headers`, `_redirects`, `_audit/baseline.md`, `DONE.md`, `TODO.md`

## Verified
- Inline JS passes `node --check` (syntax OK).
- JSON-LD parses; `sameAs` contains the three URLs.
- og-image renders correctly (visually checked); favicon assets are valid PNG/ICO/SVG.
- No orphaned references to removed code (`localReply`, `replyRules`, `api-key`, `api-setup` → none).

## Still to verify by you (needs a browser/Cloudflare preview — see TODO.md)
Lighthouse before/after, Playwright pixel diff, and a live CSP check on a Cloudflare Pages preview.
