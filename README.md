# East Anglia AI Services

> AI Automation Agency — Norfolk · Suffolk · Cambridgeshire · Essex

Source for [eastangliaaiservices.co.uk](https://eastangliaaiservices.co.uk): a multi-page static website (plain HTML/CSS/JS, no build step) with a Three.js hero, an in-browser assistant (ARIA), free lead-generation tools and a blog.

## 🚀 Features

- **3D Interactive Hero** — Three.js particle/neural scene, lazy-loaded on desktop only (skipped on phones, Save-Data and reduced motion)
- **ARIA Chatbot** — rule-based assistant that runs entirely in the browser; no API key, no chat data leaves the device
- **Free tools** — [AI Readiness Assessment](ai-readiness.html), [Business Loss Calculator](loss-calculator.html) and [AI Policy Generator](ai-policy-generator.html); reports are generated client-side and the visitor's details are emailed to us via Web3Forms
- **Location & service pages** — Norwich, Ipswich, Cambridge, AI training, AI voice agents
- **Blog** — `blog/` (posts are listed in `sitemap.xml`, `blog/index.html`, `llms.txt` and `llms-full.txt`; CI checks they stay in sync)
- **Accessibility** — panel for reduced motion, higher contrast and larger text; skip links; respects the OS reduced-motion setting
- **Consent-first analytics** — the Google tag (GA4) is on every page in Google Consent Mode v2 with all storage denied, so it sets no cookies until the visitor clicks Accept (it does send cookieless pings before then); Microsoft Clarity and the Google Preferred Source button load only after Accept (`assets/consent.js`)

## 📁 Structure

| Path | What it is |
|---|---|
| `index.html` | Homepage markup |
| `assets/home.css`, `assets/home.js` | Homepage styles and scripts (hero, demos, ARIA, contact form, carousel) |
| `assets/consent.js` | Cookie banner + consent-gated analytics, used on every page |
| `assets/site.css`, `assets/site.js` | Shared header, mobile menu, footer, buttons, enquiry form, accessibility options and cookie banner styles, used on every page |
| `assets/fonts.css`, `assets/fonts/` | Self-hosted Syne and Space Mono (OFL) — no requests to Google Fonts |
| `*.html` | Other pages; each carries its own inline styles |
| `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` | SEO / AI-crawler files |
| `*.txt` (32-char hex names) | IndexNow ownership key files |
| `docs/` | SEO plans and the website code review |

## 🌐 Deployment

The site is served from the `main` branch root on **GitHub Pages** with the custom domain in `CNAME` (`eastangliaaiservices.co.uk`). Pull requests also get a Vercel preview deployment.

GitHub Actions:

- **HTML Validate & Link Check** (`html-check.yml`) — html-validate (config in `.htmlvalidate.json`) and lychee link checking
- **Blog post list sync check** (`blog-list-check.yml`) — fails if a blog post is missing from any of the hand-maintained lists
- **IndexNow Submit** (`indexnow.yml`) — pings search engines on push to `main` (see `SEO-INDEXNOW.md`)

Security: every page sends a `Content-Security-Policy` and `Referrer-Policy` via `<meta>` tags (GitHub Pages cannot set response headers). If you add a new third-party script, add its host to the CSP on every page.

## 🛠️ Tech Stack

- Pure HTML/CSS/JS — no build step
- **Three.js** r128 from cdnjs (with Subresource Integrity)
- **Web3Forms** — form submissions
- **Syne + Space Mono** — self-hosted web fonts

## 📍 About

East Anglia AI Services specialises in AI automation solutions for businesses across East Anglia. We build custom AI agents, workflow automation, AI voice agents, predictive intelligence systems and LLM integrations, and run hands-on AI training for business teams.

---

© 2026 East Anglia AI Services Ltd
