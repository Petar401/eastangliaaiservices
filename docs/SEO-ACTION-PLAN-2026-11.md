# SEO / AEO / GEO Action Plan: eastangliaaiservices.co.uk
Based on: *EAAIS SEO Audit (5 Nov 2026)*, cross-checked against this repository on 7 Nov 2026.
Goal: rank for the money keywords (AI automation / AI consultant / AI training in Norwich, Norfolk, Suffolk, Cambridge and Essex) and get cited by AI answer engines (Google AI Overviews, ChatGPT, Perplexity, Claude).

Legend: ✅ Agree · ⚠️ Partly agree · ❌ Disagree

---

## 1. Verdict on the audit

### ✅ Agree (confirmed in the repo)
| Audit point | What the repo shows |
|---|---|
| Titles too long | Every indexable page is 72–107 chars (home 101, GPT-6 post 107, consultant post 105, ai-training 100). |
| Meta descriptions too long | 178–237 chars on all main pages and posts (policy generator 237). |
| Homepage carries all four legal docs inline | 4 modals (`index.html:1065` onwards), ~1,600 of the homepage's ~4,800 words. The footer already links to `/terms.html` etc., so the modals are duplicate content. |
| No public pricing | 7 `Offer` objects in the homepage schema, none with a price. The £ figures on the page are only demo numbers. |
| No location or service pages | Only the in-page "Regions" block. Services exist only as homepage cards. |
| No proof (reviews, case studies) | None in the HTML or the schema. |
| Weak internal linking | **Worse than the audit says:** 4 of the 6 posts link only to `/` and `/blog/`, with no links to ai-training, the tools or services. Only the AI-training post links to tools. |
| Blog images heavy | 44–213 KB JPG; `ai-consultancy` is 213 KB and `ai-model-comparison` 178 KB. |
| Logo `href="#"` | `index.html:471`. |
| No `geo` in schema | `PostalAddress` only has `addressRegion` and `addressCountry`. |
| Analytics gated by consent | Confirmed: `assets/consent.js` loads GA4 (`G-F6TTH896D0`) and Clarity only after the visitor clicks Accept. |
| Strong technical base / AEO | robots.txt allows the AI bots, llms.txt is good, FAQ, Speakable and Breadcrumb schema are present, 1 H1 per page, canonical tags are set, IndexNow is wired up in `.github/workflows/indexnow.yml`. |

### ⚠️ Partly agree
| Audit point | Correction |
|---|---|
| "Cut homepage to 1,200–1,800 words" | Removing the legal modals is right. A hard word target is not: word count isn't a ranking factor. After removing the modals (~3,200 words remain), only trim duplicated content. |
| `noindex` the policy pages | Fine for `cookies.html` and `contactpolicy.html`. Keep `privacy.html` and `terms.html` indexable: they're trust signals that AI engines and quality raters look for. They don't compete for money keywords. Low priority. |
| `<br>`-joined headings | The rendered text Google sees treats `<br>` as a line break, so this is **Low**, not Medium. Some AI scrapers use raw `textContent` ("engineered forEast"), so add a space before each `<br>`. It's a 5-minute fix. |
| 7 location pages, 600–900 words | Agree on the direction. Start with **3** (Norwich, Ipswich, Cambridge) with genuinely local content: local sectors, travel and on-site details, a local FAQ, a local example. Seven thin or spun pages risk being treated as doorway pages. |
| Sitemap "Warning" for omitting policy pages | Not a problem. Leaving them out is correct. |
| Cloudflare for security headers | Optional. Security headers aren't a ranking factor. Do it only if you also want longer cache times. |
| Keyword difficulty and competitor tables | Unverified estimates (no tool was used). Treat them as hypotheses and confirm with Search Console data after 4–6 weeks. |

### ❌ Disagree
| Audit point | Why |
|---|---|
| "H1 has no keyword" | Wrong. The H1 already contains `— East Anglia's AI Automation Agency` (`index.html:503`). At most, move the keyword phrase first. |
| "Add `font-display: swap`" | Already set: the Google Fonts URL has `&display=swap`. Trimming weights from 6 to 4 is still worthwhile. |
| `loading="lazy"` on blog images | The only image in each post is the **hero, above the fold**. Lazy-loading it would hurt LCP. Use `fetchpriority="high"` instead. |
| `&amp;` in the ai-training title | That's correct HTML encoding, and Google and browsers display "&". The new, shorter title removes it anyway. |
| `WebSite` + `SearchAction` | Google retired the sitelinks search box in Nov 2024. Add `WebSite` without `SearchAction`. |
| `aggregateRating` on own schema | Google ignores self-serving review markup on `LocalBusiness`/`Organization` (no stars). Put reviews on **Google Business Profile**. Only show testimonials on the site as social proof. |

---

## 2. Google Search Console: status and actions

**Found in the repo:** no `google-site-verification` meta tag and no `google*.html` file. Either the property is verified through DNS (Domain property) or it isn't set up. Bing appears linked: Clarity uses `?ref=bwt`, and IndexNow is in place.

Do this in order:
1. **Verify a Domain property** (`eastangliaaiservices.co.uk`) with a DNS TXT record at the domain registrar. This covers http, https and www in one property. Skip it if it's already done.
2. **Submit** `https://eastangliaaiservices.co.uk/sitemap.xml`.
3. **URL Inspection → Test live URL** for `/ai-readiness.html`, `/loss-calculator.html` and `/ai-policy-generator.html`. Check that the JS-rendered tool text appears in the rendered HTML.
4. **Pages report**: check for "Duplicate, Google chose different canonical" on extensionless URLs (`/ai-training` vs `/ai-training.html`). The canonicals should handle this; confirm they do.
5. **Request indexing** for every page after the title and meta rewrite (section 3.1). Re-request when the new pages go live.
6. **Performance report, after 28 days**: filter queries containing *norwich, norfolk, suffolk, ipswich, cambridge, essex, training*. Pages with impressions but CTR under 2% are where to tweak titles first.
7. **Link GSC to GA4** (Admin → Product links) so landing-page queries show up in GA4.
8. **Bing Webmaster Tools**: import from GSC, submit the sitemap. IndexNow already pings Bing on each push to `main`. Check that the `INDEXNOW_KEY` secret is set (see `SEO-INDEXNOW.md`).
9. **GA4 Consent Mode v2**: add `gtag('consent','default',{...denied})` before load and an update on Accept. Without it, GA4 under-reports traffic (Search Console is unaffected).

---

## 3. What to update

### 3.1 Quick wins (this week)

**A. Titles (≤60 chars) and meta descriptions (≤155 chars).** All lengths below are checked.

| Page | New `<title>` | New meta description |
|---|---|---|
| `index.html` | AI Automation Agency East Anglia \| Norfolk, Suffolk \| EAAIS | Custom AI agents, workflow automation and AI training for SMEs in Norfolk, Suffolk, Cambridgeshire and Essex. Live in weeks. Book a free strategy call. |
| `ai-training.html` | AI Staff Training for Businesses in East Anglia \| EAAIS | Hands-on AI training for staff and leaders in Norfolk, Suffolk, Cambridgeshire and Essex. Safe, practical ChatGPT, Claude and Copilot use. Book a session. |
| `ai-readiness.html` | Free AI Readiness Assessment (2-Min Quiz) \| EAAIS | Is your business ready for AI? Take the free 10-question, 2-minute assessment and get a readiness score with tailored next steps. No sign-up needed. |
| `loss-calculator.html` | Missed Call Cost Calculator for UK Businesses \| EAAIS | Estimate what missed calls, slow lead replies and manual admin cost your business each year. Free calculator with an instant breakdown and fixes. |
| `ai-policy-generator.html` | Free AI Use Policy Generator & Template (UK GDPR) \| EAAIS | Create a free AI use policy for your UK business in minutes. Covers approved tools, data handling, human review and UK GDPR. Answer 8 quick questions. |
| `blog/index.html` | AI Automation Blog for East Anglian Businesses \| EAAIS | Plain-English guides on AI automation, voice agents, local LLMs and AI training for small businesses in Norfolk, Suffolk, Cambridgeshire and Essex. |
| ai-consultant post | Buy, Rent or Subscribe to AI? Ask an Expert First \| EAAIS | Rewrite to 140–155 chars |
| ai-growth post | How AI Helps East Anglia's Small Businesses Grow \| EAAIS | 〃 |
| ai-training post | AI Training for Staff: Has Anyone Shown Them? \| EAAIS | 〃 |
| gpt-6 post | GPT-6 Astra vs Claude Fable 5.1 for Business \| EAAIS | 〃 |
| local-llm post | Local LLMs for Business: Private AI in East Anglia \| EAAIS | 〃 |
| voice-agents post | AI Voice Agents for Customer Service in East Anglia \| EAAIS | 〃 |

Also update `og:title`, `twitter:title` and the schema `headline` to match each new title. Leave all URLs unchanged.

**B. Homepage H1.** Keep the visual glitch text, but put the keyword first in the markup, for example `<h1>AI Automation for East Anglian Businesses <span>Automate the Future</span></h1>`.

**C. Remove the 4 legal modals from `index.html`.** Change the footer links to plain links to `/terms.html`, `/privacy.html`, `/cookies.html` and `/contactpolicy.html` (remove the `onclick="openModal…"`). Delete the `<!-- … kept in sync -->` duplicate blocks.

**D. Small fixes**
- Logo: `href="#"` → `href="/"` (`index.html:471`).
- Add a space before each `<br>` in section headings: index, ai-readiness, loss-calculator, ai-policy-generator, blog.
- Blog hero `<img>`: add `fetchpriority="high"` and `decoding="async"`. Convert all 6 JPGs to WebP (`<picture>` with a JPG fallback); target under 80 KB each.
- Google Fonts: drop unused weights (check whether Syne 400 and 600 are used).
- Optional: `noindex, follow` on `cookies.html` and `contactpolicy.html`.

**E. Internal links (high value, the audit understated this)**
Add 2–4 contextual links in the body of each post:
- voice-agents → loss-calculator, homepage voice demo
- local-llm and gpt-6 → ai-policy-generator, ai-readiness
- ai-growth and ai-consultant → ai-readiness, contact, ai-training
- ai-training page → ai-training post, policy generator
- A "Related articles" block (2 posts) at the end of every post.

### 3.2 Schema updates (SEO + AEO/GEO)
In the homepage `ProfessionalService`:
- Add `"@id": "https://eastangliaaiservices.co.uk/#org"`, `logo`, `image`, `url`, `priceRange` (e.g. `"££"`).
- Add `founder` → `Person` (`"@id": "/#petar"`, name, jobTitle, `sameAs` LinkedIn).
- Add `geo` (`GeoCoordinates` of the base town) and the full `PostalAddress` (locality and postcode, if you're happy to publish them). Use the **same NAP** (name, address, phone) everywhere: site, Google Business Profile, directories.
- Add the Google Business Profile URL to `sameAs` once it's claimed.
- On each `Offer`, add `priceSpecification` with a "from" price, once pricing is decided.

Add a separate `WebSite` node (`name`, `url`, `publisher` → `#org`). Don't add `SearchAction`.

On blog posts:
- Point `author` at the `Person` `@id` and add `sameAs`. Point `publisher` at `#org`.
- Set `dateModified` when a post is edited, and show "Last updated" on the page (start with the GPT-6 post).

Note: Google now shows FAQ rich results only for government and health sites, and HowTo rich results were removed. Keep both schemas for AI engines; don't expect rich results from them.

### 3.3 AEO / GEO (getting cited by AI answers)
1. **Answer-first openings**: start each post and service page with a 40–60 word direct answer to the main question, then the detail. AI engines quote these.
2. **Key facts box** on service and location pages: who, where, price-from, timeline, contact. Write them as plain sentences, which are easy to extract.
3. **Cited statistics**: keep the outbound sources (already good), and add the year and source name inline in the text.
4. **About / founder page** (`/about.html`): Petar's background, credentials, photo, LinkedIn, and `Person` schema. This is the biggest E-E-A-T gap.
5. **Update `llms.txt` every time a page is added** (the sitemap comment already reminds you). Consider an `llms-full.txt` with the service descriptions and FAQs in full.
6. **Brand mentions off-site** (the main GEO lever): Google Business Profile, Norfolk and Suffolk Chambers, Clutch and Sortlist, LinkedIn articles, local press. AI engines trust what third parties say about you.
7. Check AI visibility monthly: ask ChatGPT, Perplexity and Google AI Mode "best AI automation company in Norwich" and track whether EAAIS is named.

### 3.4 New content (this quarter, in order)
| # | Page | Target query |
|---|---|---|
| 1 | `/about.html` | brand + E-E-A-T |
| 2 | `/ai-automation-norwich.html` | ai automation norwich, ai consultant norfolk |
| 3 | `/ai-automation-ipswich.html` | ai consultant suffolk / ipswich |
| 4 | `/ai-automation-cambridge.html` | ai automation cambridge |
| 5 | `/ai-voice-agents.html` (service) | ai voice agent uk small business, ai chatbot norfolk |
| 6 | `/workflow-automation.html` (service) | workflow / invoice processing automation uk |
| 7 | Blog: "How much does AI automation cost in the UK?" | pricing intent |
| 8 | 1–2 case studies (with client permission) | proof + conversions |
| 9 | Blog: "How to write an AI use policy (UK GDPR)" → links to generator | ai policy template uk |
| 10 | Blog: AI grants and funding, East of England | grant funding ai |

Then add Colchester and Chelmsford, sector pages and the remaining service pages. For every new page, add it to `sitemap.xml`, `llms.txt`, the nav or footer, and at least 3 internal links.

Add 300+ words of static explainer text ("what it measures, who it's for, how to use the result") to `ai-readiness`, `loss-calculator` and `ai-policy-generator`.

### 3.5 Off-site (ongoing)
- **Google Business Profile**: claim it, choose categories ("Business management consultant" / "Software company"), set the service areas to the 4 counties, ask every client for a review.
- **Citations** with identical NAP: Norfolk Chamber, Suffolk Chamber, Cambridge Network, Clutch, Sortlist, Yell, Bing Places, Apple Business Connect.
- **Cadence**: 2 posts per month. Refresh the GPT-6 post every quarter.

---

## 4. Not verifiable from the repo or this session
- Live HTTP headers, Core Web Vitals and rankings: the live site was blocked from this environment. Run PageSpeed Insights (mobile) on the homepage, and use the GSC Performance and Core Web Vitals reports.
- Whether GSC is already verified through DNS. Check under Search Console → Settings → Ownership verification.
