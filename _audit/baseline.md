# Phase 0 — Baseline (pre-upgrade reference)

> Captured 2026-06-19, before the "quick wins" branch (`claude/loving-hypatia-ke7pah`).
> Every later change is compared against this. Environment note: this branch was built in a
> sandbox **without headless Chrome or outbound network to the live site**, so a full Lighthouse
> run + Playwright screenshot diff could not be executed here. They must be run by the owner on a
> Cloudflare Pages preview before deploy (see TODO.md). This file records the structural + byte
> baseline that *was* measurable.

## Repo at baseline
| File | Bytes |
|------|------:|
| index.html | 107,224 |
| robots.txt | 79 |
| sitemap.xml | 277 |
| CNAME | 26 |

Single hand-coded `index.html` (924 lines): embedded CSS (`<style>`) + JS (`<script>`), Three.js r128
hero, ARIA chatbot. No build system. Host: GitHub Pages (CNAME → eastangliaaiservices.co.uk).

## Sections / anchors (must all still exist after upgrade)
`#about`, `#regions`, `#services`, `#demos`, `#process`, `#contact`, `.cta-section`, footer.
JS entry points: `goToDemo()`, `switchDemo()`, `openChat()`, `toggleChat()`, `openModal()`,
`runLeadDemo/Invoice/Support/Forecast/Pipeline/Ops`, cookie consent, scroll reveal.

## External requests at baseline
- `cdnjs.cloudflare.com` — three.min.js r128 (**render-blocking `<script>` in `<head>`**)
- `fonts.googleapis.com` / `fonts.gstatic.com` — Syne + Space Mono

## Known issues from the prior SEO audits (the baseline state we are fixing)
- Meta description ~200 chars (too long).
- `og-image.png` referenced but **404** (file absent); no favicon set → `/favicon.ico` 404.
- `og:image:width/height` missing.
- JSON-LD `sameAs` **empty**.
- `#regions` section orphaned (not linked from nav/footer).
- Footer "Services" column: five anchors all point to `#services`.
- Headings join words across `<br>` ("engineered for"+"East Anglia" → "forEast Anglia") for parsers.
- CTA section had no stable `id`.
- Three.js render-blocking; animation loop never pauses (runs off-screen / when tab hidden).
- Dead `#api-setup` / `#api-key-*` CSS + Privacy text implying the chatbot needs an Anthropic API key.
- No security headers (GitHub Pages can't set them).

## How to capture the full numeric baseline (owner / CI)
```
npx lighthouse https://eastangliaaiservices.co.uk/ --preset=desktop --output=json --output-path=_audit/lh-desktop.json
npx lighthouse https://eastangliaaiservices.co.uk/ --form-factor=mobile --output=json --output-path=_audit/lh-mobile.json
```
Record LCP, INP, CLS, TBT, total JS/CSS bytes. Compare the Cloudflare Pages preview of this branch
against the live site; targets: LCP < 2.5s mobile, INP < 200ms, CLS < 0.1, Perf ≥ baseline.
