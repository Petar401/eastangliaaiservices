# East Anglia AI Services

> AI Automation Agency — Norfolk · Suffolk · Cambridgeshire · Essex

A single-file static agency website built with Three.js, featuring an offline rule-based AI assistant (ARIA).

## Features

- **3D Interactive Hero** — Live neural network, particle field, torus rings & wireframe geometry (Three.js)
- **ARIA Chatbot** — Offline rule-based FAQ assistant. No API key, no backend, no network requests
- **Futuristic Design** — Dark theme with neon cyan accents, glitch text, custom cursor, scanlines
- **Cookie Consent** — GDPR-compliant consent banner with accept/reject options
- **Legal Modals** — Terms, Privacy Policy, Cookie Policy, Contact Policy
- **Fully Responsive** — Works across all devices

## ARIA Chatbot — Offline FAQ

ARIA runs entirely in the browser using a built-in knowledge base. **No API key required.**

To extend ARIA's answers, edit the `KB` array near the bottom of `index.html`. Each intent looks like:

```js
{ id:'pricing', keywords:['price','cost','how much'], response:"Our pricing..." }
```

The matcher scores keyword hits (multi-word phrases weighted higher than single words) and returns the best match, or a fallback message if no intent scores above zero.

## GitHub Pages Deployment

This is a single-file static site. To enable GitHub Pages:

1. Go to **Settings → Pages**
2. Set **Source** to `main` branch, `/ (root)` folder
3. Your site will be live at `https://[username].github.io/eastangliaaiservices`

## Tech Stack

- **Three.js** (r128) — 3D graphics
- **Google Fonts** — Syne + Space Mono
- Pure HTML/CSS/JS — no build step, no dependencies, no API

## Contact

East Anglia AI Services specialises in AI automation solutions for businesses across East Anglia. We build custom AI agents, workflow automation, predictive intelligence systems, and LLM integrations.

- **Email:** info@eastangliaaiservices.co.uk
- **Phone:** 07466 951175
- **Hours:** Mon–Fri, 9:00–17:30

---

© 2026 East Anglia AI Services Ltd
