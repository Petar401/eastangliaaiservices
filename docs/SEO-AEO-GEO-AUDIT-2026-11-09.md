# SEO / AEO / GEO Audit: eastangliaaiservices.co.uk
**Date:** 9 Nov 2026 · **Type:** Full site audit (SEO + answer-engine + generative-engine visibility)
**Method:** Every HTML page in this repo was parsed (titles, metas, headings, schema, links, images). Indexation, competitors and third-party mentions were checked by web search. The live site couldn't be fetched from this environment, so HTTP headers and Core Web Vitals aren't covered. No SEO tool (Ahrefs/Semrush) was connected, so the difficulty and demand figures are estimates.
**Follows on from:** `docs/SEO-ACTION-PLAN-2026-11.md` (7 Nov).

---

## Executive summary

On-page SEO is now in **good shape**. Every indexable page has a title under 60 characters, a meta description of 145–155 characters, one H1, a canonical, OG tags and rich JSON-LD. The 7 Nov quick wins are done: the legal modals are gone, the logo links to `/`, blog posts have internal links and WebP images, and the schema has `@id`, `geo` and a `founder` node.

**The biggest strength** is AEO plumbing that most local competitors lack: `llms.txt`, robots.txt that allows the AI crawlers, FAQ, Speakable and Breadcrumb schema, IndexNow, and three free interactive tools.

**The weak spots have moved off-page and into trust.** Overall: **solid foundation, but it can't yet win the money keywords.** The top 3 priorities:

1. **Entity and trust gaps (GEO).** There's no About page. The founder isn't named anywhere in the visible homepage text. A London solicitor called Petar Petkov dominates search for that name, so AI engines may mix the two up. There are no reviews, case studies or prices, and the legal pages are dated "May 2025", before the company was incorporated (4 Aug 2026).
2. **No landing pages for the money queries.** "AI consultant Norwich", "AI automation Ipswich/Cambridge" and "AI voice agent" only hit the homepage. Competitors (AI Consultant Essex, Cloud Agile, edcana, ai-consultant-norwich.co.uk) all have dedicated location or service pages, and most publish prices.
3. **Google's index is stale.** Search results still show the old homepage title ("AI Automation for UK Businesses | … — Norfolk, Suffolk, Cambridgeshire, Essex") and the removed legal modals. Request reindexing in Search Console.

---

## 1. Keyword opportunities

The demand and difficulty figures are estimates. Confirm them with Search Console after 28 days.

| Keyword | Est. Difficulty | Opportunity | Current ranking | Intent | Recommended content |
|---|---|---|---|---|---|
| ai consultant norwich | Moderate | **High** | Not seen top 10 | Commercial | `/ai-consultant-norwich.html` location page |
| ai automation norwich / norfolk | Moderate | **High** | Not seen top 10 (edcana, Osiris rank) | Commercial | Same Norwich page + homepage |
| ai automation agency east anglia | Easy | **High** | Brand/homepage likely | Commercial | Homepage (already targeted) |
| ai training for staff norfolk / suffolk | Easy | **High** | `ai-training.html` | Transactional | Add prices and a "what a session looks like" section |
| ai use policy template uk | Moderate | **High** | `ai-policy-generator.html` | Informational/tool | Supporting blog post "How to write an AI use policy (UK GDPR)" |
| ai consultant ipswich / suffolk | Easy–Moderate | **High** | Not seen (Cloud Agile ranks) | Commercial | `/ai-consultant-ipswich.html` |
| ai automation cambridge | Moderate–Hard | Medium | Not seen | Commercial | `/ai-automation-cambridge.html` |
| ai voice agent uk small business | Moderate | **High** | Blog post only | Commercial | `/ai-voice-agents.html` service page |
| ai receptionist for tradespeople uk | Moderate | Medium | None | Commercial | Section on voice-agents page + blog post |
| missed call cost calculator | Easy | Medium | `loss-calculator.html` | Tool | Add more static explainer text |
| how much does ai automation cost uk | Moderate | **High** | None (FAQ says "scoped individually") | Commercial-info | Pricing guide post + a public "from £" page |
| ai readiness assessment free | Moderate | Medium | `ai-readiness.html` | Tool | Fine; add benchmark stats |
| invoice processing automation uk | Moderate | Medium | None | Commercial | `/workflow-automation.html` |
| chatbot for small business norfolk | Easy | Medium | None | Commercial | Section on the Norwich page + service page |
| local llm for business uk | Moderate | Medium | Blog post | Informational | Refresh the post; link to LLM service |
| ai grants funding east of england sme | Easy | Medium | None | Informational | Blog post (AI Consultant Essex already does this) |
| what is ai automation for small business | Hard | Low | None | Informational | Answer-first section on the homepage |
| ai copilot training uk | Moderate | Medium | `ai-training.html` mentions it | Transactional | H2 on the training page |
| ai consultant colchester / chelmsford | Moderate (competitive) | Low–Med | None | Commercial | Later; Essex is crowded |
| ai automation for accountants uk | Moderate | Medium | None | Commercial | Sector page (edcana does this) |
| ai automation for trades / plumbers | Easy–Moderate | Medium | None | Commercial | Sector page |
| gpt-6 vs claude for business | Moderate | Low (news decays) | Blog post | Informational | Refresh quarterly or retire |

---

## 2. On-page issues

| Page | Issue | Severity | Fix |
|---|---|---|---|
| Google index (homepage) | Indexed snapshot shows the old title and the removed legal modals | **High** | GSC → URL Inspection → Request indexing for `/` and every page changed on 7–9 Nov |
| `index.html` | Founder not named in the visible text (only in JSON-LD). "How EAAIS began" has no person, no date, no credentials | **High** | 2–3 sentences: "Founded in Norwich in 2026 by Petar Petkov, an AI engineer…", with a photo and a link to `/about.html` |
| `terms.html`, `privacy.html` | "Last updated: May 2025", before incorporation (4 Aug 2026). `contactpolicy.html` says May 2026 | **High** (trust/legal) | Set the real dates; keep them consistent |
| `loss-calculator.html:242` | H1 "What is missed calls really costing you?" is ungrammatical, and there's no space before the span, so scrapers read "What ismissed" | **Medium** | `What are <span …>missed calls really costing you?</span>` |
| `ai-readiness.html:257`, `ai-policy-generator.html` | H1 text has no space before `<span>`, so AI scrapers read "businessready", "teamclear" | **Medium** | Add a space before the `<span class="accent">` |
| `index.html` FAQ | "How much does AI automation cost?" answer gives no number. AI engines skip non-answers | **Medium** | Give a "from £X" range, even a broad one |
| Site-wide address | Site says "Amderley Drive, Norwich, NR4 6HZ"; Companies House has **44** Amderley Drive. `geo` points at Norwich city centre (52.6309, 1.2974), not NR4 6HZ | **Medium** | Use one NAP everywhere. If you don't want to publish a home address, use a service-area Google Business Profile and drop `streetAddress` from schema rather than half-publish it |
| Tool pages | No `dateModified` or visible "last updated" | Low | Add both |
| Repo root | ~1.2 MB of unreferenced PNGs (`m_.png` 525 KB, `m_ai_training_html.png`, `d_training.png`, `hero1366.png`, `hero390.png`) are publicly served and can be indexed as images | Low | Delete them or move them out of the published root |
| Blog JPG fallbacks | Still 44–213 KB (WebP is served first, so impact is small) | Low | Recompress the JPGs to under 100 KB |
| `blog/gpt-6-astra-vs-claude-fable-5-1…` | Time-sensitive model comparison; newer model versions have shipped since | Low–Med | Add an "Updated" note quarterly, or retitle it as an evergreen "how to choose an AI model" post |

**Passing:** all titles 49–59 chars; metas 145–155; one H1 per page; canonicals present; `noindex` correctly on 404, cookies and contact policy; alt text on 100% of images; internal links from every post to the tools and the training page; clean `.html` URLs.

---

## 3. AEO / GEO assessment (being cited by AI answers)

| Signal | Status | Notes |
|---|---|---|
| AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot) | ✅ Pass | `robots.txt` |
| `llms.txt` | ✅ Pass | Good summary; lists every page |
| `llms-full.txt` | ❌ Missing | AI Consultant Essex publishes one. Add one with the full service descriptions, FAQs and prices |
| FAQ / Speakable / Breadcrumb / BlogPosting schema | ✅ Pass | |
| Organization entity (`@id`, logo, founder, sameAs) | ⚠️ Warning | `sameAs` has only Facebook, LinkedIn and TikTok. No Companies House, Google Business Profile or directory listings |
| Person entity disambiguation | ❌ Fail | The name "Petar Petkov" returns a London solicitor (gunnercooke, Global Arbitration Review). Without an About page, `Person.description`, `image` and `knowsAbout`, LLMs can't tell the two apart |
| Answer-first content | ⚠️ Warning | Blog FAQs are good. Service content leads with marketing copy ("Intelligence, engineered for East Anglia") rather than a direct 40–60 word answer |
| Proof (reviews, case studies, numbers) | ❌ Fail | None. Competitors cite named results (e.g. "MK Manufacturing… 90% reduction") and press (BBC Essex) |
| Third-party mentions | ❌ Weak | Found: Companies House mirrors, own Facebook page, one Facebook group post. Not on Sortlist, Clutch, The Expert Roster, or Chamber directories |
| NAP consistency | ⚠️ Warning | The Facebook group post graphic shows **info@eastangliaiservices.co.uk** (missing an "a"). Street number differs from Companies House |
| Prices stated anywhere | ❌ Fail | LogicRoad (£495 / £1,450 / from £3,500), AI Consultant Essex (from £500 / £1,500) and ai-consultant-norwich.co.uk (£215 / £890/mo) all publish prices. AI engines answering "how much does an AI consultant cost in Norwich" will quote them, not you |

---

## 4. Content gaps

| Topic | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| About / founder | Fixes E-E-A-T and entity confusion; the most important GEO page | `/about.html` with `Person` + `AboutPage` schema, photo, background, Companies House no. | **High** | Moderate |
| AI consultant Norwich | Home market; edcana, Osiris IT, HelloHorizon and BrightLabs all target it | Location page, 700–1,000 genuinely local words | **High** | Moderate |
| Pricing | Commercial queries plus AI answers; every competitor shows prices | `/pricing.html` or a "from £" box on each service | **High** | Quick win (once decided) |
| AI voice agents service page | Your demo is a differentiator; currently only a blog post | Service page linked to the loss calculator | **High** | Moderate |
| Case study ×1–2 | Proof for both Google and LLMs | Case study page with `Review`/quote (no self-serving `aggregateRating`) | **High** | Moderate (needs a client) |
| AI consultant Ipswich | Suffolk is underserved (Cloud Agile is IT-first) | Location page | Medium | Moderate |
| AI automation Cambridge | Bigger market, harder | Location page | Medium | Moderate |
| How much does AI automation cost in the UK? | High-intent, cite-worthy | Blog guide with ranges and a table | **High** | Moderate |
| How to write an AI use policy (UK GDPR) | Feeds the policy generator | Blog post | Medium | Quick win–Moderate |
| Workflow / invoice automation | Core service, no page | Service page | Medium | Moderate |
| Sector pages (accountants, trades, clinics) | Competitors use them | Landing pages | Low–Med | Substantial |
| AI grants for East of England SMEs | Low competition, cite-worthy | Blog post | Medium | Moderate |

Funnel check: awareness (blog) ✅; consideration (tools) ✅; **decision (pricing, proof, service and location pages) ❌**. That's the gap.

---

## 5. Technical SEO checklist

| Check | Status | Details |
|---|---|---|
| HTTPS / custom domain | Pass | GitHub Pages + `CNAME` |
| robots.txt | Pass | Allows everything, lists the sitemap |
| XML sitemap | Pass | 12 URLs, all current pages; lastmod 2026-11-07 |
| Canonicals | Pass | On all indexable pages |
| noindex usage | Pass | 404, cookies, contactpolicy |
| Structured data | Pass | ProfessionalService, WebSite, FAQPage, HowTo, BlogPosting, SoftwareApplication, BreadcrumbList |
| Duplicate content | Pass | Legal modals removed |
| Index freshness | **Fail** | Google still serves the pre-7-Nov homepage |
| Mobile / viewport | Pass (from code) | Responsive CSS, mobile-lighter homepage, tap targets fixed in #52 |
| Images | Warning | WebP is served; JPG fallbacks are heavy; unused PNGs are in the web root |
| Fonts | Pass | 2 families, `display=swap`, preconnect |
| LCP hint | Pass | `fetchpriority="high"` on the blog heroes |
| Core Web Vitals | Not verified | Run PageSpeed Insights (mobile) and the GSC CWV report |
| Security headers | Warning (not ranking) | GitHub Pages can't set CSP or HSTS. Optional: Cloudflare |
| Extensionless URL duplicates | Not verified | Check the GSC "Duplicate, Google chose different canonical" report for `/ai-training` vs `/ai-training.html` |
| HTML validation | Warning | CI runs html-validate as non-blocking (~88 findings) |
| IndexNow | Pass | Workflow present; confirm the `INDEXNOW_KEY` secret is set |

---

## 6. Competitor comparison

| Dimension | EAAIS | edcana ai (Norwich) | AI Consultant Essex | ai-consultant-norwich.co.uk (HelloHorizon) | Winner |
|---|---|---|---|---|---|
| Location / service pages | 0 / 1 (training) | Sector pages | Many location and service pages | Single local page | AI Consultant Essex |
| Content depth | 6 long posts (1.5–2.8k words), 3 tools | Thin blog, ROI calculator | Blog, tools, `llms-full.txt` | Regular blog | EAAIS / Essex |
| Publishing frequency | ~6 posts in 5 months | Low | High | ~monthly | Essex |
| Public pricing | None | None (on a call) | Yes | Yes | Essex / HelloHorizon |
| Proof | None | Chamber member | Named case studies, BBC Essex, partner certifications | "Trusted by", UEA degree, money-back guarantee | Essex |
| Backlink / mention signals | Very low | Norfolk Chamber | Group network sites, press | Agency site | Essex |
| Technical / schema | Strong | Basic | Strong | Basic | EAAIS ≈ Essex |
| AEO plumbing (`llms.txt`, AI bots) | Yes | No | Yes, plus `llms-full.txt` | No | Essex |

Other local players to watch: **Osiris IT** (Norwich, Cyber Essentials and Microsoft accreditations, AI advisory page), **Applegate AI** (Norwich, voice agents for trades, on The Expert Roster), **BrightLabs** (Norwich page), **Cloud Agile** (Ipswich and Suffolk location pages), **LogicRoad** (Essex, published prices), **Glide AI** (Chelmsford).

---

## 7. Prioritised action plan

### Quick wins (this week)
| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| 1 | GSC: request indexing for `/` and all pages changed since 7 Nov; resubmit the sitemap | High | 15 min | GSC access |
| 2 | Fix the legal-page dates (`terms.html`, `privacy.html` say May 2025) | High (trust) | 10 min | |
| 3 | Name the founder in the homepage "Who we are" text and link the LinkedIn profile | High | 30 min | |
| 4 | Fix the H1s: loss-calculator grammar, plus a space before `<span>` on 3 tool pages | Medium | 10 min | |
| 5 | Fix the misspelt email in the Facebook group post and graphic; align NAP (street number decision) | Medium | 20 min | |
| 6 | Put a number in the homepage FAQ cost answer ("most first projects start from £X") | Medium | 15 min | Pricing decision |
| 7 | Delete the unused root PNGs | Low | 5 min | |
| 8 | Claim **Google Business Profile** (service-area business, 4 counties) and add it to `sameAs` | High | 1 h + verification | |

### Strategic investments (this quarter)
| # | Action | Impact | Effort | Depends on |
|---|---|---|---|---|
| 1 | `/about.html` with `Person` schema (`description`, `image`, `knowsAbout`, `alumniOf`, `sameAs` → LinkedIn, Companies House) to separate you from the London solicitor | High | Half day | Photo, bio |
| 2 | `/pricing.html`, or "from £" on each service, plus `Offer.priceSpecification` | High | Half day | Pricing decision |
| 3 | `/ai-consultant-norwich.html`, then Ipswich, then Cambridge (genuinely local: sectors, on-site travel, local FAQ, local example) | High | 1 day each | |
| 4 | `/ai-voice-agents.html` service page (demo, pricing, FAQ, link to the loss calculator) | High | 1 day | |
| 5 | 1–2 case studies (even a pilot or pro-bono project with permission) | High | Multi-day | Client |
| 6 | `llms-full.txt` (services, prices, FAQs, service area, founder bio) | Medium | 2 h | #1, #2 |
| 7 | Listings with identical NAP: Norfolk Chamber, Suffolk Chamber, Cambridge Network, Sortlist, Clutch, The Expert Roster, Bing Places, Apple Business Connect, Yell | High (GEO) | Multi-day, spread out | GBP first |
| 8 | Blog: "How much does AI automation cost in the UK?", "How to write an AI use policy", "AI grants East of England" | Medium–High | 1 day each | |
| 9 | Earn press or podcast mentions (EDP, Archant / Norfolk Live, BBC Radio Norfolk, Norwich Tech meetups) | High (GEO) | Ongoing | |
| 10 | Monthly AI-visibility check: ask ChatGPT, Perplexity, Gemini and Google AI Mode "best AI automation company in Norwich / Suffolk" and log whether EAAIS is named | Medium | 30 min/month | |
