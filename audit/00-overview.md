# 00 · Overview and baseline

**Site:** https://eastangliaaiservices.co.uk · **Audit date:** 13 November 2026
**Commit audited:** `dcb62cc` (`main`, identical to what is live: the live `index.html` ETag size matches the repo file byte for byte)
**Branch with fixes:** `claude/elegant-dijkstra-4z49xi` (draft pull request; nothing merged or deployed)

This is the third review of the site this month. Two earlier reports in `docs/` (7 and 9 November) already fixed lead loss, XSS, fonts, titles and descriptions, and added the About and location pages. This audit builds on those and, for the first time, tests the **live** site (the earlier reviews could not reach it).

## How to read these reports

Every finding has an ID, a severity, evidence, why it matters, the exact fix and a status:

- **Fixed**: committed on the branch, one commit per fix.
- **Recommended**: safe to do, but it changes copy, design or legal text, so a ready-to-paste draft is given instead.
- **Needs my input**: depends on a decision, a real asset (testimonial, credential) or an external service only you can access.
- **Unverified**: could not be tested from the audit environment; the reason is stated.

## Architecture

| Item | Finding |
|---|---|
| Framework | None. Hand-written static HTML, CSS and JavaScript |
| Build tool / package manager | None. No `package.json`, no dependencies, no build step |
| Hosting | GitHub Pages from `main` (Jekyll, legacy branch build) with custom domain in `CNAME`. Vercel builds pull-request previews only |
| Routing | One file per URL. `/about` and `/about.html` both return 200 (GitHub Pages behaviour); canonical tags point to the `.html` form |
| Content sources | The HTML files themselves. Blog lists are hand-maintained in four files and checked by CI |
| Forms / API routes | No server code. Four forms post from the browser to Web3Forms (`api.web3forms.com/submit`): the contact form and the gates on the three free tools |
| Environment variables | None in the site. One GitHub Actions secret (`INDEXNOW_KEY`) |
| Third-party scripts | Google tag / GA4 (every page, before consent, cookieless); Microsoft Clarity and Google Preferred Source (after Accept only); Three.js r128 from cdnjs with SRI (homepage, desktop only) |
| CI | html-validate, lychee link check, blog-list sync check, IndexNow submission |

### Shared assets

| File | Size | Purpose |
|---|---|---|
| `assets/home.css` | 44 KB | Homepage styles |
| `assets/home.js` | 28 KB | Homepage scripts (hero, demos, ARIA chat, contact form) |
| `assets/consent.js` | 6 KB | Cookie banner and consent-gated analytics, on every page |
| `assets/fonts.css` + `assets/fonts/` | 4 KB + 12 woff2 files | Self-hosted Syne and Space Mono |

Every page other than the homepage carries its own inline `<style>` block.

## Pages and routes (23 HTML files)

| URL | Type | Indexable | In sitemap |
|---|---|---|---|
| `/` | Home | Yes | Yes |
| `/about.html` | About / founder | Yes | Yes |
| `/ai-training.html` | Service | Yes | Yes |
| `/ai-voice-agents.html` | Service | Yes | Yes |
| `/ai-consultant-norwich.html` | Location | Yes | Yes |
| `/ai-consultant-ipswich.html` | Location | Yes | Yes |
| `/ai-automation-cambridge.html` | Location | Yes | Yes |
| `/ai-readiness.html` | Free tool (lead form) | Yes | Yes |
| `/loss-calculator.html` | Free tool (lead form) | Yes | Yes |
| `/ai-policy-generator.html` | Free tool (lead form) | Yes | Yes |
| `/blog/` | Blog index | Yes | Yes |
| `/blog/*.html` × 6 | Articles | Yes | Yes |
| `/privacy.html`, `/terms.html` | Legal | Yes | No (deliberate) |
| `/cookies.html`, `/contactpolicy.html` | Legal | No (`noindex`) | No |
| `/404.html` | Error page | No (`noindex`) | No |

Also served: `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `site.webmanifest`, two IndexNow key files.

**Not intended but live before this audit:** every Markdown file in the repo was being rendered as a public page, for example `/docs/WEBSITE-CODE-REVIEW-2026-11-09.html`. See SEC-01.

## Baseline (before any change)

### Build and validation

| Check | Result |
|---|---|
| Build | Not applicable (no build step). A local Jekyll 3.10 build of the repo completes in 0.02 s |
| `npx html-validate@9 "**/*.html"` | 0 errors, 0 warnings (5.2 s) |
| Internal links and anchors (all 23 pages) | 0 broken |
| `npm audit` | Not applicable: no dependencies |
| Secrets scan | None found. The Web3Forms access key in `index.html:598` and the three tool pages is public by design |
| Console errors on live pages | None on any page before consent |

### Lighthouse, live site (lab run from a US datacentre, 13 Nov 2026)

| Page | Mode | Perf | A11y | Best practice | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 92 | 97 | 96 | 100 | 1.3 s | 354 ms | 0.000 |
| Home | Desktop | 100 | 97 | 100 | 100 | 0.5 s | 25 ms | 0.000 |
| About | Mobile | 98 | 100 | 100 | 100 | 1.0 s | 166 ms | 0.000 |
| About | Desktop | 93 | 100 | 100 | 100 | 0.5 s | 0 ms | **0.167** |
| AI readiness | Mobile | 97 | 96 | 100 | 100 | 1.1 s | 188 ms | 0.000 |
| AI readiness | Desktop | 100 | 96 | 100 | 100 | 0.6 s | 0 ms | 0.039 |
| AI training | Mobile | 98 | 100 | 100 | 100 | 2.1 s | 91 ms | 0.000 |
| AI training | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 ms | 0.048 |
| AI voice agents | Mobile | 97 | 100 | 100 | 100 | 1.3 s | 202 ms | 0.000 |
| Norwich | Mobile | 93 | 100 | 100 | 100 | 1.3 s | 315 ms | 0.000 |
| Norwich | Desktop | 98 | 100 | 100 | 100 | 0.4 s | 0 ms | 0.089 |
| Loss calculator | Mobile | 96 | 96 | 100 | 100 | 1.1 s | 245 ms | 0.000 |
| Blog post (local LLMs) | Mobile | 99 | 96 | 100 | 100 | 1.7 s | 115 ms | 0.000 |

Layout shift is timing-dependent: the same pages run against a local copy with Lighthouse's throttling showed CLS of 0.200 (AI training, mobile) and 0.116 (Norwich, mobile). Both sets are in `07-before-after.md`.

### Page weight (transfer size, live)

| Page | Total | Requests | Largest item |
|---|---|---|---|
| Home (desktop) | 420 KB | 16 | Three.js 119 KB, Google tag 181 KB |
| Home (mobile) | 302 KB | 15 | Google tag 181 KB |
| Typical inner page | 272–297 KB | 13–14 | Google tag 181 KB (about 65% of the page) |
| AI training | 406 KB | 15 | Google tag 181 KB, hero JPEG 111 KB |

### Live infrastructure

| Check | Result |
|---|---|
| TLS | TLS 1.3, HTTP/2, Let's Encrypt certificate, expires 10 Feb 2027 (GitHub renews automatically) |
| `www` → apex | 301 to `https://eastangliaaiservices.co.uk/` in one hop |
| `/blog` → `/blog/` | 301 in one hop |
| Unknown URL | Proper 404 status with the custom 404 page |
| `http://` → `https://` | **Unverified**: the audit proxy does not carry plain HTTP. Confirm "Enforce HTTPS" is ticked in the repository's Pages settings |
| Security headers | None served (no HSTS, no frame protection, no `nosniff`). See SEC-02 |
| Caching | `Cache-Control: max-age=600` on everything, fonts included. See PERF-04 |

## What the audit could not reach

- **Web3Forms delivery.** Its Cloudflare layer answers 403 to this datacentre's IP, so no TEST email was sent. Validation, success and failure states were tested with the endpoint intercepted, and the live failure path was observed for real. One manual test from your own browser is needed (`08-needs-from-me.md`).
- **craftwork.digital** (competitor): connection refused through the audit proxy (502). brainpool.ai's homepage is behind a Cloudflare challenge; its `llms.txt` and `robots.txt` were readable.
- **Clarity and Preferred Source after Accept.** Their sub-hosts are not on the audit allow-list, so post-consent CSP behaviour for those two is unverified. No CSP violation appeared in the console.
- **Search Console, GA4, Web3Forms, Google Business Profile dashboards.** No access.
- **Field Core Web Vitals.** Lighthouse is a lab test; INP needs real-user data from Search Console.
