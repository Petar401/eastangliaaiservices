# What's Left — Roadmap after the "Quick Wins" Branch

Everything below is from the original `PLAN.md` and was intentionally **not** done on this branch (to keep it low-risk and reviewable). Ordered roughly by value/effort.

---

## A. Verify & deploy this branch (your gate)
- [ ] Connect the repo to **Cloudflare Pages** (build command: none / static; output dir: `/`). Add `eastangliaaiservices.co.uk` as the **primary** custom domain and `www` as a redirect → apex. Keep `CNAME`.
- [ ] On the Pages **preview URL**, run Lighthouse (mobile + desktop) and compare to `_audit/baseline.md`. Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1, Perf ≥ baseline.
- [ ] Confirm the **CSP** in `_headers` doesn't block anything (3D loads, fonts load, chatbot works). Check at securityheaders.com.
- [ ] Quick visual pass desktop + mobile: hero/services/demos/process/about/regions/contact/footer + chat open. Then deploy when happy.

## B. Assets / polish (small)
- [ ] **SRI hash on the Three.js CDN script** — couldn't be added here (sandbox had no network to fetch/verify the file, and a wrong hash would break the 3D). Add it in CI or locally:
  `curl -s https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js | openssl dgst -sha384 -binary | openssl base64 -A` → put as `integrity="sha384-…"` `crossorigin="anonymous"` on the dynamically-created script in `initHero`/`loadHero`.
- [ ] Optionally self-host the two Google Fonts (one fewer third party) — only if rendering stays identical.
- [ ] The generated `og-image.png` uses a bitmap wordmark; if you want a richer designed version later, replace the file (keep the 1200×630 name/dimensions).

## C. Build system (PLAN.md Phase 3)
- [ ] Introduce **Eleventy (11ty)** that passthrough-copies the current `index.html` **byte-for-byte** and builds new templated pages + the blog around it. Confirm built homepage = current (visual diff = 0).
- [ ] Shared layout/partials (head, nav, footer, schema includes) reusing the existing CSS/design tokens — no restyle.
- [ ] Auto-generate `sitemap.xml` + blog RSS at build.

## D. New crawlable pages (PLAN.md Phase 4) — biggest SEO/GEO unlock
- [ ] `/services/` hub + one page each: AI Agent Development, Workflow Automation, Predictive Intelligence, LLM Integration, Data Pipelines, AI Ops/Monitoring. Front-loaded answer, detail, FAQ, internal links, CTA.
- [ ] `/regions/` hub + Norfolk / Suffolk / Cambridgeshire / Essex pages (reuse the Ipswich invoice, King's Lynn logistics, Cambridgeshire forecasting, Chelmsford LLM examples already on the homepage).
- [ ] Hub-and-spoke internal links; **retarget the footer's five "Services" anchors** to the real pages.
- [ ] Full schema: `Service` on service pages, `FAQPage`, `BreadcrumbList`, `LocalBusiness/ProfessionalService` with `areaServed`. Validate in Rich Results Test.

## E. Blog + weekly pipeline (PLAN.md Phase 5)
- [ ] `/blog/` index + post template (on-brand), markdown posts in `/content/blog/`, `Article` schema, OG/Twitter, reading time, related posts, breadcrumb, RSS.
- [ ] **Monday 08:00 London** scheduled GitHub Action (handle BST/GMT). Document the honest free workflow: each Monday run `/searchfit-seo:create-content` (≈2 min) to write the markdown, then the Action builds/stages it. Note the zero-touch (paid API / SearchFit.ai) option without wiring a paid one.
- [ ] Drafts → review → publish flow.
- [ ] **Google "Preferred Sources" CTA** on blog index/posts: `https://www.google.com/preferences/source?q=https://eastangliaaiservices.co.uk` with Google's official button.

## F. Chatbot — optional future (PLAN.md Phase 6)
- [ ] When 11ty exists, auto-generate `knowledge.json` from all site + blog content so the on-device bot updates itself on every build (replacing the hand-curated KB).
- [ ] Optional later: a free-tier/self-hosted model for a generative (RAG) layer over the same knowledge base.

## G. Security & GEO hardening (PLAN.md Phase 7)
- [ ] Minify HTML/CSS/JS at build; compress images; far-future cache on hashed assets.
- [ ] GEO content pass on new pages/blog: question-format H2s, front-loaded answers/TL;DRs, FAQ clusters, concrete citable stats, comparison/"best AI agency in Norfolk 2026" content, E-E-A-T (author bios, case studies).
- [ ] Re-run Lighthouse on every page.

## H. Off-site (owner action, free — fixes the ~8/100 AI-visibility finding)
- [ ] Google Business Profile; directory listings AI quotes (Clutch, Sortlist, Bark, UK B2B); LinkedIn **company** page; a few genuine reviews.

---

## Open items to confirm
- The Google `share.google/…` link — is it your **Google Business Profile**? If so, also create/claim the GBP for local + AI visibility (item H).
- 3D: a Blender connector isn't reachable from the cloud session. If you want richer hero 3D / imported glTF models later, run the session from the local Claude Code app (where your Blender connector is registered) or enable it for web — the available **Three.js Viewer** can otherwise prototype hero changes in-engine.
