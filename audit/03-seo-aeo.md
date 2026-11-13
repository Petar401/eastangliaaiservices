# 03 · SEO, local SEO and AI-search readiness (AEO/GEO)

**Summary:** technical SEO is in good order. Lighthouse SEO is 100 on every page tested, and every indexable page has a unique title, one H1, a canonical, valid JSON-LD and `lang="en-GB"`. The earlier "75/100" score predates the 7–9 November work. The gaps now are **coverage** (no Essex page, six services with no page of their own, no sector pages) and **proof** (no reviews or case studies), not markup.

| ID | Severity | Finding | Status |
|---|---|---|---|
| SEO-01 | High | Internal documents were indexable pages on the domain | **Fixed** (see SEC-01) |
| SEO-02 | High | No proof content: zero testimonials, reviews or case studies | Needs my input |
| SEO-03 | Medium | Essex, one of four counties served, has no landing page | Recommended (draft below) |
| SEO-04 | Medium | Six of eight services have no page | Recommended (draft below) |
| SEO-05 | Medium | Homepage has no direct-answer paragraph | Recommended (draft below) |
| SEO-06 | Medium | Homepage social titles were out of date | **Fixed** |
| SEO-07 | Medium | Search and AI caches still hold the pre-November site | Needs my input |
| SEO-08 | Medium | Search Console and Bing verification cannot be confirmed | Needs my input |
| SEO-09 | Medium | "Outcome" figures on service cards are not attributed | Needs my input |
| SEO-10 | Low | No sector pages, pricing page or FAQ page | Recommended |
| SEO-11 | Low | `robots.txt` omits newer AI search crawlers by name | Recommended (draft below) |
| SEO-12 | Low | Minor meta gaps on legal pages | Recommended |
| SEO-13 | Low | `.html` and extensionless URLs both resolve | No action (monitor) |

---

## Technical SEO: page-by-page

All 17 sitemap URLs return 200 on the live site. Title and description lengths are in characters.

| Page | Title | Desc. | H1 | Canonical | Schema | Primary keyword | Intent |
|---|---|---|---|---|---|---|---|
| `/` | 59 | 151 | 1 | ✓ | ProfessionalService, WebSite, FAQPage, HowTo, Person | ai automation agency east anglia | Commercial |
| `/about.html` | 52 | 145 | 1 | ✓ | AboutPage, Person, BreadcrumbList | petar petkov ai consultant (brand) | Navigational |
| `/ai-training.html` | 55 | 154 | 1 | ✓ | Service, FAQPage, BreadcrumbList | ai training for staff norfolk / suffolk | Transactional |
| `/ai-voice-agents.html` | 47 | 154 | 1 | ✓ | Service, FAQPage, BreadcrumbList | ai voice agent small business uk | Commercial |
| `/ai-consultant-norwich.html` | 57 | 141 | 1 | ✓ | Service, FAQPage, BreadcrumbList | ai consultant norwich | Commercial |
| `/ai-consultant-ipswich.html` | 42 | 147 | 1 | ✓ | Service, FAQPage, BreadcrumbList | ai consultant ipswich / suffolk | Commercial |
| `/ai-automation-cambridge.html` | 55 | 149 | 1 | ✓ | Service, FAQPage, BreadcrumbList | ai automation cambridge | Commercial |
| `/ai-readiness.html` | 49 | 150 | 1 | ✓ | SoftwareApplication, FAQPage, WebPage | ai readiness assessment free | Tool |
| `/loss-calculator.html` | 53 | 145 | 1 | ✓ | SoftwareApplication, FAQPage, WebPage | missed call cost calculator | Tool |
| `/ai-policy-generator.html` | 57 | 150 | 1 | ✓ | SoftwareApplication, FAQPage, WebPage | ai use policy template uk | Tool |
| `/blog/` | 54 | 147 | 1 | ✓ | Blog, BreadcrumbList | ai automation blog east anglia | Informational |
| 6 blog posts | 52–59 | 147–155 | 1 | ✓ | BlogPosting, FAQPage, BreadcrumbList | one topic each | Informational |

**Cannibalisation:** none found. The Norwich page and the homepage both mention Norwich, but the homepage targets "East Anglia" and links to the Norwich page with descriptive anchor text. The voice-agents service page and the voice-agents blog post target commercial and informational intent respectively and link to each other.

**Thin pages:** none. Service and location pages carry 870–1,060 words of body text; the three location pages have distinct sectors, funding sources and FAQs.

**Orphans:** none. The least-linked indexable pages are `terms.html` (3 inbound links) and the blog posts (4–7 each).

**Heading order:** H1 → H2 → H3 with no skipped levels on any page.

**Structured data:** 0 JSON-LD parse errors across 23 pages. Prices in schema match the visible pricing section and the ARIA chat answers (£395, £595, £1,200 + £149/month, £1,500, £3,000, £199/month). Address, phone and email match the visible footer.

---

## SEO-02 · No proof content (High, Needs my input)

**Evidence:** no testimonial, review, client name, logo or case study appears in any HTML file. The company was incorporated on 4 August 2026 (`llms-full.txt`).

**Why it matters:** for "AI consultant Norwich" style queries, Google and AI assistants favour businesses that third parties vouch for. Faculty's `llms.txt` cites "hundreds of real-world AI projects" and carries `Review` schema; Brainpool leads with "500+ PhD/MSc-level AI experts, founded 2017". A new local firm cannot match scale, but it can show one named, real result.

**Fix:** nothing can be drafted honestly without real material. `08-needs-from-me.md` lists what to supply. When you have it:
- One case study page per project: client (or anonymised sector and town with permission), the problem, what was built, a measured before/after, a quote.
- Reviews go on **Google Business Profile**, not in schema. Google ignores self-published `aggregateRating` on your own organisation.
- Quote two or three reviews on the homepage as plain text with the reviewer's name and business.

## SEO-03 · No Essex page (Medium, Recommended)

**Evidence:** the title, meta description and schema `areaServed` name Essex, Colchester and Chelmsford (`index.html:42`), and the homepage regions section links Norwich, Ipswich and Cambridge but nothing for Essex (`index.html:149`).

**Why it matters:** searchers in Essex currently land on a generic homepage, while established Essex competitors have dedicated pages.

**Draft brief (do not publish until the local detail is true for you):**

- **URL:** `/ai-consultant-essex.html` (one county page first; split into Colchester and Chelmsford only when each can carry different content)
- **Title (56):** `AI Consultant in Essex | Colchester & Chelmsford | EAAIS`
- **Description (148):** `AI automation and staff training for small businesses in Colchester, Chelmsford and across Essex. Fixed quotes, on-site visits, free 30-minute call.`
- **H1:** `AI consultant for Essex businesses, from Colchester to Chelmsford.`
- **Opening answer (51 words):** `East Anglia AI Services helps small and medium businesses across Essex use AI to cut admin, answer every call and train staff to use AI safely. We are based in Norwich and travel to Colchester, Chelmsford, Braintree and Harlow for on-site work. Projects start from £395, with a fixed written quote.`
- **Sections that must be genuinely local:** sectors you can actually serve there (logistics around Harwich and the A12 corridor, construction, professional services in Chelmsford); travel time and how on-site days work from Norwich; Essex funding or support bodies you have checked exist; three Essex-specific FAQs.
- **Schema:** copy the Norwich page's `Service` + `FAQPage` + `BreadcrumbList`.
- **Then:** add to `sitemap.xml`, `llms.txt`, `llms-full.txt`, the homepage regions card and the footer.

The same template applies to Bury St Edmunds, King's Lynn, Great Yarmouth and Peterborough, but only where you can write 600+ words that would not be true of any other town. Otherwise they risk being treated as doorway pages; mention those towns on the county pages instead.

## SEO-04 · Six services without a page (Medium, Recommended)

**Evidence:** the footer "Services" links for AI Agent Development, Workflow Automation, Predictive Intelligence, LLM Integration and Data Pipelines all point to `#services` (`index.html`, footer). Only AI training and AI voice agents have pages.

**Why it matters:** "workflow automation for small business" and "invoice processing automation" are search queries with no page to rank. An anchor on the homepage cannot have its own title, description or FAQ.

**Priority order and draft titles:**

| Page | Title | Target query |
|---|---|---|
| `/workflow-automation.html` | `Workflow Automation for Small Businesses \| EAAIS` (48) | workflow automation for SMEs |
| `/ai-agents.html` | `Custom AI Agents for UK Small Businesses \| EAAIS` (48) | ai agents for small business |
| `/ai-chatbots.html` (LLM integration) | `AI Chatbots Trained on Your Own Documents \| EAAIS` (49) | ai chatbot for small business norfolk |

Use `ai-voice-agents.html` as the template: 40–60 word answer first, what it does, who it suits, price from, process, five buyer FAQs, link to the relevant free tool. Fold predictive intelligence, data pipelines and AI ops into these three rather than creating thin pages.

## SEO-05 · Homepage direct answer (Medium, Recommended)

**Evidence:** the first paragraph after the homepage H1 is 18 words: "East Anglia's specialist AI automation agency — delivering intelligent systems to businesses across Norfolk, Suffolk, Cambridgeshire & Essex." The service and location pages already open with 42–58 word answers.

**Why it matters:** AI assistants quote the first self-contained paragraph that says who, what, where and how much. "Intelligent systems" answers none of those.

**Draft (55 words), to replace `.hero-sub` or sit directly beneath it:**

> East Anglia AI Services is an AI automation consultancy based in Norwich. We build AI voice agents, workflow automation and custom AI assistants, and train staff to use AI safely, for small and medium businesses across Norfolk, Suffolk, Cambridgeshire and Essex. Projects start from £395 with a fixed written quote after a free 30-minute call.

## SEO-06 · Homepage social titles (Medium, Fixed)

**Evidence:** `index.html:33,38` had `og:title` and `twitter:title` of "AI Automation for UK Businesses | East Anglia AI Services" while `<title>` was "AI Automation Agency East Anglia | Norfolk, Suffolk | EAAIS".

**Fix (commit `728db31`):** both now match the page title.

## SEO-07 · Stale caches (Medium, Needs my input)

**Evidence:** a third-party crawler cache dated 2 November 2026 still returns the old homepage title ("AI Automation for UK Businesses … — Norfolk, Suffolk, Cambridgeshire, Essex"), the old H1 and the four legal pop-ups that were removed on 7 November, including "Last updated: May 2025".

**Fix:** in Search Console, URL Inspection → Request indexing for `/`, `/about.html` and the three location pages; resubmit the sitemap. In Bing Webmaster Tools, submit the same URLs (ChatGPT search and Copilot draw on Bing's index).

## SEO-08 · Verification (Medium, Needs my input)

**Evidence:** no `google-site-verification` or `msvalidate.01` meta tag and no verification file in the repo. Either both are verified by DNS or they are not set up. Clarity's `?ref=bwt` parameter suggests Bing Webmaster Tools exists.

**Fix:** confirm a **Domain property** exists in Search Console (DNS TXT record). If you prefer a tag, send me the two codes and I will add them.

## SEO-09 · Unattributed outcome figures (Medium, Needs my input)

**Evidence:** `index.html:158-176` ends each service card with a line such as "Outcome: 8–12 hours of sales-team admin returned per week", "invoice processing time cut from ~6 minutes to under 30 seconds", "ETA accuracy improved from ~70% to ~94%". The demo panel shows "£12k Monthly saving" (`index.html:221`). No client or source is named.

**Why it matters:** these read as results you achieved. If they are illustrations, the ASA's CAP Code and consumer-protection law expect that to be clear, and AI assistants may repeat them as facts about your company.

**Fix (choose per line):** name the project and get the client's permission; or cite a published source inline; or change "Outcome:" to "Typical aim:" and label the demo "Illustrative figures".

## SEO-10 · Missing page types (Low, Recommended)

| Page | Why | Note |
|---|---|---|
| `/pricing.html` | "how much does an AI consultant cost" has commercial intent; none of the five national competitors reviewed publishes a price | Lift the existing `#pricing` section into a page; keep the section as a summary |
| Sector pages | Manufacturing, agriculture and food, logistics, construction, professional services | Only where you can describe a real workflow in that sector. Start with the sector of your first paying client |
| `/faq.html` | One place for buyer questions, with `FAQPage` schema | Merge the homepage, service and tool FAQs; write questions as a buyer would ask them |
| Case studies | See SEO-02 | Needs real projects |

## SEO-11 · AI crawlers (Low, Recommended)

**Evidence:** `robots.txt` allows everything (`User-agent: *` / `Allow: /`) and names GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai and CCBot. All AI crawlers are therefore already permitted. The named list omits the newer search-specific agents.

**Recommendation: keep allowing.** Optional lines to add for clarity:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot-Extended
Allow: /
```

## SEO-12 · Minor meta gaps (Low, Recommended)

- `privacy.html` and `terms.html` are indexable but have no Open Graph tags.
- `cookies.html` meta description is 200 characters (the page is `noindex`, so no search impact).
- `index.html:21` has a `meta keywords` tag. Google ignores it; it only tells competitors your target terms.
- `sitemap.xml` `lastmod` values should be set to the merge date for the pages this branch changes.

## SEO-13 · Duplicate URL forms (Low, No action)

**Evidence:** `/about` and `/about.html` both return 200, as does `/index.html`. This is how GitHub Pages works and cannot be redirected there. Every page's canonical tag names the `.html` form, which is the correct mitigation. Check Search Console → Pages for "Duplicate, Google chose different canonical" once a month.

---

## AEO / GEO readiness

| Signal | Status | Evidence |
|---|---|---|
| `llms.txt` | ✓ | Lists every page with a one-line summary; links `llms-full.txt` |
| `llms-full.txt` | ✓ | Company facts, people, services with prices, FAQs; dated 9 Nov 2026 |
| AI crawlers allowed | ✓ | `robots.txt`; see SEO-11 |
| Direct-answer opening | ✓ on 6 service/location pages, ✗ on homepage and the three tool pages (29–36 words, benefit-led) | SEO-05 |
| FAQs as buyer questions | ✓ | "How much does AI automation cost for a small business?", "Which areas do you cover?" |
| Entity facts (who, what, where, contact) | ✓ | Organisation, founder, address, phone, company number in schema and `llms-full.txt` |
| Founder disambiguation | ✓ | `llms-full.txt` states he is not the London solicitor of the same name |
| Quotable, sourced statistics | Partly | Blog posts cite sources in reference lists; homepage figures are unattributed (SEO-09) |
| Third-party corroboration | ✗ | SEO-02 |

## Local SEO

**NAP consistency (verified across the repo):** "East Anglia AI Services Ltd", 44 Amderley Drive, Norwich, NR4 6HZ, +44 7466 951175, info@eastangliaaiservices.co.uk. The same in schema (`index.html:42`), `privacy.html:143`, `terms.html:139`, `llms.txt` and `llms-full.txt`. No variant spellings found.

**Google Business Profile readiness checklist** (the profile is already linked from the footer and `sameAs`):

- [ ] Business name exactly "East Anglia AI Services" (no keywords added)
- [ ] Primary category chosen; "Business management consultant" or "Software company" are the closest fits
- [ ] Service-area business set to Norfolk, Suffolk, Cambridgeshire, Essex; decide whether to show the street address (it is a residential address)
- [ ] Phone and website identical to the site
- [ ] Hours Mon–Fri 9:00–17:30, matching the contact section
- [ ] Each service added with the same name and "from" price as the site
- [ ] Ten or more photos: founder, on-site work, screenshots of real builds
- [ ] Booking link set to `https://eastangliaaiservices.co.uk/#contact`
- [ ] Review link created and sent to every client on project sign-off
- [ ] One post a fortnight (reuse blog posts)
- [ ] Same NAP on Bing Places, Apple Business Connect, Norfolk Chamber, Yell

## E-E-A-T

| Element | Status |
|---|---|
| About / founder page | ✓ `about.html` with photo, background and `Person` schema |
| Credentials | Background is described; no certifications, memberships or insurance are stated. Supply any that are real |
| Contact transparency | ✓ Phone, email, company number and registered office published |
| Case studies, reviews | ✗ SEO-02 |
| Author on blog posts | ✓ `BlogPosting` with author and publisher |
| Dated, sourced content | ✓ Blog posts have dates and reference lists. The GPT-6 vs Claude post is time-sensitive and should be reviewed each quarter |

---

## Competitor check (light)

Fetched 13 November 2026. Homepage only, plus `robots.txt` and `llms.txt`.

| Site | Positioning (H1) | Local terms | Phone link | Prices | Schema on homepage | `llms.txt` |
|---|---|---|---|---|---|---|
| brainpool.ai | Homepage blocked by a Cloudflare challenge (**Unverified**); `llms.txt`: "Expert AI consultancy… for mid-sized enterprises… 500+ experts" | None | Unverified | Unverified | Unverified | ✓ 53 KB, plus `llms-full.txt`; names AI bots in robots |
| faculty.ai | "Frontier AI for the frontlines of the world." | None | No | No | Organization, WebSite, Review, Person | ✓ |
| rainbird.ai | "Your agents are clever, but not one of them understands your policy" | None | No | No | None | ✗ (404) |
| mindfoundry.ai | "Machine Learning for Defence & National Security" | None | No | No | VideoObject only | ✗ (404) |
| aiautomation.agency | "AI Automation Agency" (health and wellness start-ups) | None | No | No | None | ✗ (404) |
| craftwork.digital | **Unverified** (connection refused from the audit environment) | | | | | |
| **EAAIS** | "Automate the Future — AI Automation for East Anglian Businesses" | Four counties, three town pages | Yes | Yes, on page and in schema | ProfessionalService, FAQPage, Service, Breadcrumb | ✓ both files |

### Five gaps to exploit as a local SME specialist

1. **Nobody else says a price.** None of the four readable competitors shows a figure. A standalone pricing page with `Offer` schema makes EAAIS the only quotable answer to "how much does AI automation cost for a small business in Norfolk".
2. **Nobody else is local.** No competitor homepage names a county or town or carries `LocalBusiness` data. Each genuine town or sector page ("AI for agricultural suppliers in Norfolk") is a query they will never write for.
3. **They sell to enterprises, governments and regulators.** Their language ("frontier AI", "decision automation for regulated work") excludes a 10-person firm. Keep EAAIS copy in plain trade language and say "small business" early; the direct-answer draft in SEO-05 does this.
4. **None offers a free self-serve tool.** The readiness quiz, loss calculator and policy generator are assets none of them has. Give each a 40–60 word explainer above the tool and promote them from every service page.
5. **You can be reached.** No competitor has a clickable phone number on the homepage. EAAIS has one plus an on-site visit offer. Put the phone number in the top navigation and add a booking link (CRO-06).

Where they are ahead: proof (years trading, named clients, reviews) and depth of `llms.txt`. Brainpool's file gives a paragraph per service; yours gives a line. Extending `llms-full.txt` as new service pages are added closes that.
