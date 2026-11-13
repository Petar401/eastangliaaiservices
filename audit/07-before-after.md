# 07 · Before and after

"Before" is commit `dcb62cc` (what is live). "After" is the branch `claude/elegant-dijkstra-4z49xi`. The fixes are not deployed, so after-numbers come from a local copy of the branch; before-numbers are given for both the live site and a local copy so the comparison is like for like.

Lighthouse 12, mobile preset (simulated slow 4G, 4× CPU slowdown) and desktop preset, one run each. Single runs vary by a few points; treat differences of 1–3 in the Performance score as noise.

## Lighthouse scores: local before → local after

| Page | Mode | Performance | Accessibility | Best practice | SEO |
|---|---|---|---|---|---|
| Home | Mobile | 89 → 92 | 97 → 97 | 96 → 96 | 100 → 100 |
| Home | Desktop | 100 → 100 | 97 → 97 | 100 → 100 | 100 → 100 |
| About | Mobile | 93 → 96 | 100 → 100 | 100 → 100 | 100 → 100 |
| About | Desktop | 93 → **100** | 100 → 100 | 100 → 100 | 100 → 100 |
| AI readiness | Mobile | 93 → 96 | 96 → **100** | 100 → 100 | 100 → 100 |
| AI readiness | Desktop | 100 → 100 | 96 → **100** | 100 → 100 | 100 → 100 |
| AI training | Mobile | 87 → **98** | 100 → 100 | 100 → 100 | 100 → 100 |
| AI training | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| AI voice agents | Mobile | 96 → 96 | 100 → 100 | 100 → 100 | 100 → 100 |
| AI voice agents | Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Norwich | Mobile | 92 → 97 | 100 → 100 | 100 → 100 | 100 → 100 |
| Norwich | Desktop | 98 → 100 | 100 → 100 | 100 → 100 | 100 → 100 |
| Loss calculator | Mobile | 96 → 95 | 96 → **100** | 100 → 100 | 100 → 100 |
| Loss calculator | Desktop | 100 → 100 | 96 → **100** | 100 → 100 | 100 → 100 |
| Blog post (local LLMs) | Mobile | 93 → 96 | 96 → **100** | 100 → 100 | 100 → 100 |
| Blog post (local LLMs) | Desktop | 100 → 100 | 96 → **100** | 100 → 100 | 100 → 100 |

**Averages across the 16 runs**

| Category | Before | After |
|---|---|---|
| Performance | 95.6 | 97.9 |
| Accessibility | 98.1 | 99.6 |
| Best practice | 99.8 | 99.8 |
| SEO | 100 | 100 |

The homepage stays at 97 for accessibility (dimmed demo text, A11Y-08) and 96 for best practice on mobile (small text, A11Y-09); both need a design decision.

## Core Web Vitals (lab)

| Page | Mode | CLS before | CLS after | LCP before | LCP after | TBT before | TBT after |
|---|---|---|---|---|---|---|---|
| About | Desktop | **0.167** | 0.000 | 0.4 s | 0.4 s | 0 ms | 0 ms |
| About | Mobile | 0.088 | 0.000 | 1.8 s | 1.8 s | 236 ms | 210 ms |
| AI training | Mobile | **0.200** | 0.000 | 2.5 s | 2.2 s | 91 ms | 96 ms |
| Norwich | Mobile | **0.116** | 0.002 | 1.7 s | 1.7 s | 217 ms | 168 ms |
| Norwich | Desktop | 0.086 | 0.002 | 0.4 s | 0.4 s | 0 ms | 0 ms |
| Loss calculator | Mobile | 0.074 | 0.000 | 1.8 s | 1.8 s | 113 ms | 236 ms |
| AI readiness | Mobile | 0.050 | 0.000 | 1.8 s | 1.8 s | 256 ms | 185 ms |
| Blog post | Mobile | 0.051 | 0.000 | 2.1 s | 2.1 s | 262 ms | 201 ms |
| AI voice agents | Mobile | 0.060 | 0.000 | 1.7 s | 1.7 s | 172 ms | 206 ms |
| Home | Mobile | 0.000 | 0.000 | 2.6 s | 2.6 s | 263 ms | 177 ms |

Bold values exceed Google's 0.1 "good" threshold. TBT differences are run-to-run variation: no script that affects it was changed. INP cannot be measured in the lab.

## Lighthouse, live site before (for reference)

| Page | Mode | Perf | A11y | Best practice | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 92 | 97 | 96 | 100 | 1.3 s | 354 ms | 0.000 |
| Home | Desktop | 100 | 97 | 100 | 100 | 0.5 s | 25 ms | 0.000 |
| About | Mobile | 98 | 100 | 100 | 100 | 1.0 s | 166 ms | 0.000 |
| About | Desktop | 93 | 100 | 100 | 100 | 0.5 s | 0 ms | 0.167 |
| AI readiness | Mobile | 97 | 96 | 100 | 100 | 1.1 s | 188 ms | 0.000 |
| AI readiness | Desktop | 100 | 96 | 100 | 100 | 0.6 s | 0 ms | 0.039 |
| AI training | Mobile | 98 | 100 | 100 | 100 | 2.1 s | 91 ms | 0.000 |
| AI training | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 ms | 0.048 |
| AI voice agents | Mobile | 97 | 100 | 100 | 100 | 1.3 s | 202 ms | 0.000 |
| AI voice agents | Desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 ms | 0.039 |
| Norwich | Mobile | 93 | 100 | 100 | 100 | 1.3 s | 315 ms | 0.000 |
| Norwich | Desktop | 98 | 100 | 100 | 100 | 0.4 s | 0 ms | 0.089 |
| Loss calculator | Mobile | 96 | 96 | 100 | 100 | 1.1 s | 245 ms | 0.000 |
| Loss calculator | Desktop | 100 | 96 | 100 | 100 | 0.4 s | 0 ms | 0.040 |
| Blog post | Mobile | 99 | 96 | 100 | 100 | 1.7 s | 115 ms | 0.000 |
| Blog post | Desktop | 100 | 96 | 100 | 100 | 0.4 s | 0 ms | 0.032 |

Layout shift from font loading depends on network timing, which is why the live mobile runs show 0.000 while desktop and the throttled local runs show the shift. The fix removes the cause in every case.

## Accessibility (axe-core, WCAG 2.2 AA, 22 pages × 2 viewports)

| Measure | Before (live) | After (branch) |
|---|---|---|
| Page views with a serious violation | 16 of 44 | 2 of 44 (homepage only) |
| Pages with a serious violation | 8 of 22 | 1 of 22 |
| `nested-interactive` | 7 nodes | 0 |
| `color-contrast` on tool pages | 5 links | 0 |
| `link-in-text-block` | 17 links in 4 posts | 0 |
| `label-content-name-mismatch` | 1 | 0 |
| `scrollable-region-focusable` | 1 | 0 |
| Tap targets under 24 px (non-inline) | 6 carousel dots | 0 |
| `color-contrast` on homepage demo text | 6–7 nodes | 6–7 nodes (design decision, A11Y-08) |

## Other checks

| Check | Before | After |
|---|---|---|
| html-validate | 0 errors | 0 errors |
| Broken internal links or anchors | 0 | 0 |
| Console errors before consent | 0 | 0 |
| Cookies before consent | 0 | 0 |
| Horizontal overflow at 390 px | None | None |
| Forms: 8 intercepted paths (4 forms × success, failure) | 8 pass | 8 pass |
| Conversion events sent to GA4 | 0 | 6 event types |
| Internal documents published on the domain | 5 URLs confirmed | 0 in a local Pages build (confirm live after merge) |
| Homepage `og:title` matches `<title>` | No | Yes |
| AI training page weight | 438 KB | 386 KB |
| "Book a Free Strategy Call" buttons that open an email client (homepage) | 1 | 0 |

## Not changed by this branch

| Measure | Value | Blocker |
|---|---|---|
| Security headers in production | None | Hosting (SEC-02) |
| Cache lifetime | 10 minutes | Hosting (PERF-04) |
| Hero buttons above the fold at 1366×768 | No (button at 1,132 px) | Your approval (CRO-01); 643 px with the proposed rule |
| Hero buttons clear of the cookie banner on phones | No | Your approval (CRO-02) |
| Privacy policy matches tag behaviour | No | Your approval (COMP-01) |
