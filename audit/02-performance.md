# 02 · Performance

**Summary:** the site is fast. Live Lighthouse performance was 92–100 before any change. The one Core Web Vitals failure (layout shift) is fixed. What remains is mostly the cost of the Google tag and GitHub Pages' short cache lifetime, neither of which can be changed in the repo alone.

| ID | Severity | Finding | Status |
|---|---|---|---|
| PERF-01 | High | Layout shift from late-loading fonts (CLS up to 0.200) | **Fixed** |
| PERF-02 | Medium | AI training hero served as a 111 KB JPEG | **Fixed** |
| PERF-03 | Medium | Google tag is about 65% of every inner page's weight | Needs my input |
| PERF-04 | Medium | Everything is cached for only 10 minutes | Needs my input |
| PERF-05 | Low | Hero images are 2400 px wide for a 374 px slot on phones | Recommended |
| PERF-06 | Low | Homepage runs all demo animations at load | Recommended |
| PERF-07 | Low | Two small render-blocking stylesheets | Recommended |
| PERF-08 | Low | Unreferenced files in the published site | Recommended |
| PERF-09 | Low | Each page repeats its own inline CSS | Recommended (later) |

---

## PERF-01 · Layout shift from late-loading fonts (High, Fixed)

**Evidence (before):** Lighthouse CLS of 0.167 on About (desktop, live), 0.200 on AI training (mobile, local throttled), 0.116 on Norwich (mobile, local throttled). Google's "good" threshold is 0.1. The shifted elements were `div.founder`, `img.hero-img` and `div.article-body`, each pushed down when the heading above re-flowed.

**Root cause:** only the homepage preloaded a font. On the other 22 pages the browser discovered the fonts after downloading `fonts.css`, painted headings in a fallback font, then swapped to Syne (a much wider face) and moved everything below.

**Fix (commit `9505eb6`):** three `<link rel="preload">` tags (Syne 800, Syne 400, Space Mono 400) on every non-home page, matching the homepage pattern.

**After:** CLS 0.000 on About, AI training, AI readiness, voice agents, loss calculator and the blog post; 0.002 on Norwich.

## PERF-02 · AI training hero served as JPEG (Medium, Fixed)

**Evidence:** `ai-training.html:185` loaded `/blog/ai-training-east-anglia.jpg` (111 KB) directly, while the 55 KB WebP of the same image already existed and is used by the blog post.

**Fix (commit `5ce2cf4`):** wrapped in `<picture>` with the WebP source, as the blog posts do. Page weight 438 KB → 386 KB; mobile LCP 2.5 s → 2.2 s (local throttled).

## PERF-03 · Google tag weight (Medium, Needs my input)

**Evidence:** `https://www.googletagmanager.com/gtag/js?id=G-F6TTH896D0` transfers 181 KB on every page, of which Lighthouse reports about 90 KB unused, with roughly 70 ms of main-thread time. A typical inner page is 272–297 KB in total. It is the largest single cause of the 170–350 ms Total Blocking Time on mobile.

**Why it matters:** since commit `422f879` the tag loads for every visitor, including those who never accept cookies.

**Options:**
1. **Keep as is** (your current decision). Accept the weight in exchange for Google detecting the tag and consent-mode modelling.
2. **Load it after Accept only.** Inner pages drop to roughly 90–115 KB. Loses tag detection and modelled data.
3. **Load it after first interaction or 3 seconds.** Keeps detection for engaged visits and removes it from the critical path. I can implement this if you want it.

## PERF-04 · Ten-minute cache lifetime (Medium, Needs my input)

**Evidence:** every response, including `/assets/fonts/*.woff2` and `/assets/home.css`, carries `cache-control: max-age=600`. The `Cache-Control` rule for fonts in `vercel.json` does not apply on GitHub Pages.

**Why it matters:** a returning visitor after ten minutes re-validates every file. Fonts and images never change and should be cached for a year.

**Fix:** same as SEC-02. With Cloudflare in front, add a Cache Rule: `/assets/fonts/*`, `/blog/*.webp|jpg`, `/img/*` → Edge and Browser TTL one year; `/assets/*.css|js` → one day (file names are not versioned, so do not go longer).

## PERF-05 · Oversized hero images on phones (Low, Recommended)

**Evidence:** Lighthouse: "larger than it needs to be (2400x1350) for its displayed dimensions (374x210)", about 108 KB wasted on `ai-training-east-anglia.jpg`; the founder photo is 553×646 for a 178×208 slot (23 KB wasted).

**Fix:** export 800 px-wide WebP versions and add `srcset`/`sizes`:

```html
<source type="image/webp"
        srcset="/blog/ai-training-east-anglia-800.webp 800w, /blog/ai-training-east-anglia.webp 2400w"
        sizes="(max-width: 900px) 100vw, 860px">
```

Not done because it needs new image files generated from your originals.

## PERF-06 · Homepage animations start at load (Low, Recommended)

**Evidence:** `assets/home.js:78` calls `runLeadDemo()` immediately, and the hex grid starts a 1.2 s interval at load, although the demo section is several screens down. Home mobile TBT: 354 ms live.

**Fix:** start each demo from the existing `IntersectionObserver` when `#demos` scrolls into view. Behaviour for the visitor is identical.

## PERF-07 · Render-blocking stylesheets (Low, Recommended)

**Evidence:** Lighthouse lists `/assets/consent.css` (1.8 KB) and `/assets/fonts.css` (3.9 KB) as render-blocking, estimated 150–300 ms on throttled mobile.

**Fix:** load `consent.css` with `media="print" onload="this.media='all'"` (the banner only appears after 1.2 s). Leave `fonts.css` blocking: deferring it would bring the layout shift back.

## PERF-08 · Unreferenced published files (Low, Recommended)

**Evidence:** not referenced by any page, stylesheet, manifest or sitemap: `blog/*.svg` × 6 (47 KB), `favicon-16.png`, `favicon-32.png`.

**Fix:** delete them, or keep the SVGs outside the published folder if they are source artwork.

## PERF-09 · Repeated inline CSS (Low, Recommended later)

**Evidence:** 21 of the 23 pages have their own `<style>` block (roughly 8–12 KB of near-identical rules, for example the `.hero-img` rule appears in 12 files).

**Fix:** extract one shared `assets/site.css`. It makes later changes one edit instead of 22 and lets browsers cache it, but only pays off once PERF-04 is solved.

---

## Checked and found sound

| Area | Result |
|---|---|
| Compression | gzip served by GitHub Pages for HTML, CSS, JS |
| Font loading | Self-hosted woff2, `font-display: swap`, subset by `unicode-range` (latin-ext files are only fetched if needed) |
| Images | Explicit `width`/`height` on every `<img>`; WebP with JPEG fallback; hero images use `fetchpriority="high"` |
| Three.js | Lazy-loaded after `load`, desktop only, skipped for Save-Data and reduced motion, paused when the tab is hidden |
| Code splitting | Homepage CSS/JS are separate cacheable files; no framework bundle |
| Horizontal overflow | None on any page at 390 px or 1366 px |
