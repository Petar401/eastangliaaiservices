# SEO & GEO/AEO Audit Report — East Anglia AI Services

**Domain:** eastangliaaiservices.co.uk  
**Audit date:** 30 August 2026  
**Auditor:** Automated source-code analysis (no live-crawl data available)  
**Scope:** All 7 pages, sitemap, robots.txt, structured data, content, technical factors

---

## Executive Summary

East Anglia AI Services has a well-built static HTML site with **strong foundations** in structured data, local SEO targeting, and content quality. The site already outperforms many small-business competitors on schema markup, FAQ rich-result eligibility, and geographic keyword coverage.

However, there are significant gaps in **analytics and measurement** (zero tracking installed), **technical performance** (render-blocking resources, no modern image formats), and **GEO/AEO readiness** (AI answer engine optimisation is partially addressed through FAQ schema but lacks dedicated authority-building content patterns). Several quick wins could meaningfully improve search visibility and AI-engine citation potential.

### Overall Scores (out of 10)

| Category | Score | Notes |
|----------|-------|-------|
| On-Page SEO | **8/10** | Strong meta tags, headings, alt text. Minor gaps on blog index. |
| Technical SEO | **6/10** | No analytics, render-blocking JS, no modern image formats, missing preconnect hints. |
| Local SEO | **7.5/10** | Excellent geographic targeting in content and schema. No Google Business Profile. No street address. |
| Content & E-E-A-T | **7.5/10** | Deep, well-cited articles. Author bylines present. Lacks case studies, testimonials, credentials. |
| GEO / AEO | **6.5/10** | FAQ schema on blogs is strong. Missing dedicated "What is" definitions, comparison tables, and concise answer blocks for AI extraction. |
| Accessibility | **8/10** | Skip links, ARIA attributes, accessibility panel. Minor contrast and keyboard-nav issues. |
| Mobile | **8.5/10** | Responsive breakpoints, fluid typography, reduced particles on mobile. |

---

## 1. On-Page SEO

### 1.1 Title Tags

| Page | Title | Length | Verdict |
|------|-------|--------|---------|
| Homepage | "AI Automation for UK Businesses \| East Anglia AI Services -- Norfolk, Suffolk, Cambridgeshire, Essex" | ~97 chars | Too long -- Google truncates at ~60 chars. The counties will be cut off in SERPs. |
| AI Readiness | "Free AI Readiness Assessment for UK Businesses \| East Anglia AI Services" | ~73 chars | Slightly long but acceptable. Key terms front-loaded. |
| Blog Index | "Blog \| AI Automation Insights for East Anglian Business -- East Anglia AI Services" | ~82 chars | Too long. |
| Blog posts | Each unique, descriptive | 60-90 chars | Some are long but generally well-structured. |

**Recommendation:** Trim all titles to under 60 characters. Move secondary geographic terms to meta descriptions instead.

### 1.2 Meta Descriptions

All pages have unique, descriptive meta descriptions with geographic and service keywords. These are well-written and include calls to action.

**Gap:** Blog index page is missing `<meta name="keywords">` and `twitter:description`.

### 1.3 Heading Hierarchy

- Homepage: Single `<h1>` ("Automate the Future -- East Anglia's AI Automation Agency") followed by 8 `<h2>` sections. Proper hierarchy.
- Blog posts: Single `<h1>`, proper `<h2>`/`<h3>` nesting, FAQ sections use `<h2>` → `<h3>`.
- **Issue:** AI Readiness page hero title is NOT in an `<h1>` tag -- uses a CSS class `.ar-title` on a generic element. This weakens heading signals for that page.

### 1.4 Image Alt Text

All images have descriptive, keyword-rich alt text including geographic terms. Examples:

- "Neon signpost showing dim BUY, RENT and SUBSCRIBE paths beside a brighter CONSULT route leading to a glowing brain, representing AI consultancy across East Anglia"
- "On-premise server rack connected to a neural-network brain, representing a private local LLM for an East Anglia business"

All images include explicit `width="1200" height="675"` attributes for CLS prevention.

### 1.5 Canonical URLs

Present and correct on all 7 pages with absolute URLs. No issues found.

### 1.6 Open Graph & Twitter Cards

Present on all pages with correct `og:type` differentiation (website vs. article). Blog posts include `article:published_time`, `article:author`, and `article:section`.

**Issue:** The `og:image` on homepage and AI readiness page references `/og-image.png` which does **not exist** in the repository. This means social shares will have no preview image.

---

## 2. Technical SEO

### 2.1 Site Architecture

- **Platform:** Static HTML/CSS/JS on GitHub Pages with custom domain via CNAME
- **Pages:** 7 total (homepage, AI readiness assessment, blog index, 4 blog articles)
- **Sitemap:** Present at `/sitemap.xml` with all 7 pages, correct priorities and lastmod dates
- **Robots.txt:** Allows all crawlers, references sitemap

### 2.2 Performance Issues

| Issue | Impact | Priority |
|-------|--------|----------|
| **Three.js (r128) loaded without `defer`/`async`** | Render-blocking ~600KB script for decorative particle animation | HIGH |
| **Google Fonts loaded render-blocking** | No `<link rel="preconnect">` for fonts.googleapis.com or fonts.gstatic.com | MEDIUM |
| **No modern image formats** | All images are JPEG only. No WebP/AVIF with `<picture>` fallbacks. Blog images range 44KB-213KB. | MEDIUM |
| **No `fetchpriority="high"` on LCP images** | Blog hero images are likely LCP elements but lack priority hints | MEDIUM |
| **No `<link rel="preload">` for critical resources** | Fonts and hero images could be preloaded | LOW |
| **No `<link rel="preconnect">`** | Missing for fonts.googleapis.com, fonts.gstatic.com, cdnjs.cloudflare.com | MEDIUM |
| **CSS duplicated across all pages** | Identical base styles repeated in every HTML file. No shared stylesheet for cross-page caching. | LOW |
| **Three.js particle animation** | 2,200 particles (600 on mobile) with continuous GPU rendering. Respects `prefers-reduced-motion`. | LOW |

### 2.3 Analytics & Measurement — CRITICAL GAP

**No analytics of any kind are installed.** No Google Analytics, GA4, Google Tag Manager, Search Console verification tag, Plausible, Fathom, Hotjar, Microsoft Clarity, or any tracking pixel.

The cookie policy states: "We do not currently load third-party advertising or analytics cookies."

**Impact:** Zero visibility into:
- Organic search traffic and keyword rankings
- User behaviour, bounce rates, conversion paths
- Which pages/content drive enquiries
- Whether the contact form is generating leads
- Blog post performance and engagement

**This is the single highest-priority recommendation in this audit.**

### 2.4 Missing og-image.png

The `og:image` meta tag on the homepage and AI readiness page references `/og-image.png`, but this file does not exist in the repository. Social shares on Facebook, LinkedIn, Slack, and other platforms will show no preview image.

### 2.5 Web Manifest

The `site.webmanifest` is missing the `start_url` property.

---

## 3. Local SEO

### 3.1 NAP Consistency (Name, Address, Phone)

| Element | Value | Consistent? |
|---------|-------|-------------|
| Name | East Anglia AI Services Ltd | Yes -- consistent across all pages and schema |
| Address | "East Anglia" region, "GB" country | Partial -- no street address |
| Phone | +447466951175 / 07466 951175 | Yes -- consistent across pages, schema, modals |
| Email | info@eastangliaaiservices.co.uk | Yes -- consistent throughout |

**Issue:** No specific street/office address is provided. This limits eligibility for Google's Local Pack (map results). Even a registered office address or co-working space would help.

### 3.2 Geographic Targeting

**Strengths:**
- 162+ geographic keyword mentions across all pages
- `areaServed` in JSON-LD schema lists 12 specific locations (4 counties + 8 cities/towns)
- Dedicated "Regions we serve" homepage section with cards for Norfolk, Suffolk, Cambridgeshire, Essex
- Blog post URLs include "east-anglia" in every slug
- Meta keywords include city-level terms (Norwich, Ipswich, Cambridge, Colchester, Peterborough, etc.)

**Gaps:**
- No individual service-area pages (e.g., `/ai-services-norfolk/`, `/ai-automation-cambridge/`)
- No Google Business Profile referenced or linked
- No Google Maps embed showing service area
- No local citations or directory listings referenced

### 3.3 Structured Data for Local

The homepage uses `ProfessionalService` schema with:
- Full NAP data
- `makesOffer` with 6 service descriptions
- `areaServed` array of 12 locations
- `sameAs` links to Facebook, LinkedIn, TikTok

**Gap:** No `Review`/`AggregateRating` schema (no reviews/testimonials exist on the site).

### 3.4 Social Profiles

- Facebook: linked
- LinkedIn: linked (personal profile, not company page)
- TikTok: linked

**Gap:** LinkedIn links to a personal profile rather than a company page. No Twitter/X profile. No YouTube channel.

---

## 4. Content & E-E-A-T Analysis

### 4.1 Content Depth

| Page | Word Count | Verdict |
|------|-----------|---------|
| Homepage | ~3,000+ words | Comprehensive -- covers services, demos, process, about, regions, contact |
| AI Readiness Assessment | Interactive tool | Unique, valuable lead-generation content |
| Blog: AI Consultant vs Buy/Rent | ~2,800 words | Excellent depth with citations |
| Blog: Local LLMs | ~2,400 words | Strong technical content |
| Blog: AI Growth Small Business | ~2,000 words | Solid with practical examples |
| Blog: Voice Agents | ~1,600 words | Good but could be expanded |

### 4.2 E-E-A-T Signals

| Signal | Present? | Details |
|--------|----------|---------|
| **Experience** | Partial | Service descriptions mention specific tools (Xero, HubSpot, Slack, etc.) but no case studies or project examples |
| **Expertise** | Partial | Blog content demonstrates technical knowledge. Author byline (Petar Petkov) with LinkedIn link. No credentials, certifications, or bio page. |
| **Authoritativeness** | Weak | No industry awards, certifications, partnerships, press mentions, or backlink-worthy assets beyond blog posts |
| **Trustworthiness** | Moderate | Legal modals (Terms, Privacy, Cookie, Contact Data policies) present. "Ltd" company status. No reviews, testimonials, or trust badges. |

### 4.3 Content Gaps

- **No case studies or portfolio** -- prospective clients cannot see evidence of past work
- **No testimonials or reviews** -- no social proof on the site
- **No team/about page** -- the about section is brief, no team bios or photos
- **No dedicated service pages** -- all 6 services are described on the homepage only; no deep-dive pages for individual services
- **No pricing or packages page** -- common question for prospects
- **No glossary/resource hub** -- missed opportunity for informational keyword capture
- **4 blog posts only** -- good start but needs consistent publishing schedule

---

## 5. GEO / AEO (Generative Engine Optimisation / Answer Engine Optimisation)

GEO/AEO measures how well the site is optimised to be cited by AI answer engines (Google AI Overviews, Bing Copilot, ChatGPT Browse, Perplexity, etc.).

### 5.1 What's Working

- **FAQ schema on all 4 blog posts** — 16 question-answer pairs with `FAQPage` JSON-LD. These are well-phrased in natural, conversational language matching how users query AI assistants.
- **Conversational headings** — Blog headings use question-like phrasing ("Why 'the best AI model' is a moving target", "What an LLM actually is, without the mysticism")
- **Self-contained answer paragraphs** — Blog content provides complete, extractable answers within individual sections
- **Authoritative citations** — References to Stanford, McKinsey, Goldman Sachs, FSB, ICO, ONS add citation-worthiness
- **Pull quotes** — `.pull` class creates extractable key statements

### 5.2 What's Missing

| Gap | Why It Matters for AI Engines |
|-----|-------------------------------|
| **No "What is [X]?" definition blocks** | AI engines preferentially cite concise definitions near the top of relevant content. The site lacks clear definitional content for terms like "AI automation", "AI agent", "workflow automation". |
| **No comparison tables** | AI engines extract structured comparisons (e.g., "Cloud LLM vs Local LLM", "AI Agent vs Chatbot"). The blog discusses comparisons in prose but doesn't present them as scannable tables. |
| **No "How to" structured content** | Step-by-step guides (e.g., "How to choose an AI solution for your business") are heavily cited by AI engines. |
| **No statistics/data callouts** | Key statistics mentioned inline in articles could be marked up as distinct, extractable data points. |
| **No topical authority cluster** | The 4 blog posts are standalone. A hub-and-spoke model (pillar page + supporting articles) would signal topical depth to AI engines. |
| **No author expertise page** | AI engines weight E-E-A-T signals. A dedicated author bio page with credentials, experience, and links to published work would strengthen citation likelihood. |
| **Homepage is not AI-extractable** | The homepage content is rich but buried in interactive sections, modals, and JS-dependent elements. AI crawlers may not access all of it. |
| **No speakable schema** | `speakable` schema markup identifies content suitable for voice assistants and audio readout. |

### 5.3 GEO/AEO Readiness by Page

| Page | AI-Citability | Notes |
|------|--------------|-------|
| Homepage | Low | Content is JS-heavy, spread across sections. AI engines may only see partial content. |
| AI Readiness | Low | Interactive JS tool -- AI engines cannot extract quiz content. |
| Blog posts | Medium-High | FAQ schema + conversational headings + citations. Strongest GEO assets. |
| Blog index | Low | Listing page with minimal extractable content. |

---

## 6. Accessibility & UX

### 6.1 Strengths
- Skip-to-content links on every page
- 122+ ARIA attributes across the site
- Dedicated accessibility panel with reduce-motion, higher-contrast, and larger-text toggles
- Proper semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`)
- `prefers-reduced-motion` respected for Three.js canvas
- Cookie banner with `role="dialog"` and `aria-label`
- Form elements with proper `<label>` associations

### 6.2 Issues
- **`--dim` colour contrast:** `#6b7280` on `#010108` gives ~4.1:1 ratio -- fails WCAG AA for text smaller than 18px (many dim elements use 0.56rem-0.72rem)
- **Footer legal links:** Use `onclick` handlers without `href` attributes or `role="button"` -- not keyboard-navigable
- **Custom cursor:** `body { cursor: none }` on desktop hides the native cursor, which can disorient users. Only reversed by the reduce-motion toggle.

---

## 7. Prioritised Recommendations

### CRITICAL (Do immediately)

1. **Install analytics** — At minimum, set up Google Analytics 4 and Google Search Console. Consider privacy-friendly alternatives like Plausible or Fathom if cookie-free tracking is preferred. Without analytics, you cannot measure any SEO progress.

2. **Create a Google Business Profile** — Register "East Anglia AI Services" on Google Business Profile. Even without a physical office, you can set up a service-area business covering Norfolk, Suffolk, Cambridgeshire, and Essex. This unlocks Local Pack visibility and Google Maps presence.

3. **Add the missing `og-image.png`** — Create a branded 1200x630px Open Graph image and add it to the repository root. Social shares currently show no preview image.

### HIGH PRIORITY (Next 2-4 weeks)

4. **Shorten title tags** — Trim all page titles to under 60 characters. Keep primary keywords front-loaded. Move county names to meta descriptions.

5. **Fix render-blocking resources:**
   - Add `defer` attribute to the Three.js `<script>` tag
   - Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to all pages

6. **Add `<h1>` to AI Readiness page** — Wrap the hero title in a proper `<h1>` element instead of relying on CSS class only.

7. **Fix blog index page** — Add missing `<meta name="keywords">` and `twitter:description` tags.

8. **Convert images to WebP** — Serve WebP versions with JPEG fallbacks using `<picture>` elements. The largest image (213KB JPEG) could be reduced to ~50-80KB as WebP.

9. **Add `fetchpriority="high"` to hero images** — On blog article pages, add `fetchpriority="high"` to the above-the-fold hero image for faster LCP.

### MEDIUM PRIORITY (Next 1-3 months)

10. **Create dedicated service pages** — Build individual pages for each of the 6 services (e.g., `/services/ai-agent-development/`, `/services/workflow-automation/`). Each page should target specific service + location keyword combinations and include FAQ schema.

11. **Create location-specific landing pages** — Build pages targeting key locations (e.g., `/ai-services-norfolk/`, `/ai-automation-cambridge/`) to capture local search intent.

12. **Add case studies / portfolio** — Create at least 2-3 case studies showing real project outcomes. Even anonymised examples with metrics strengthen E-E-A-T signals dramatically.

13. **Add testimonials with Review schema** — Collect client testimonials and add `Review` or `AggregateRating` schema markup. Display them prominently on the homepage and relevant service pages.

14. **Create an author bio page** — Build a dedicated page for Petar Petkov with professional bio, credentials, experience, and links to published work. Link to it from blog bylines. This strengthens E-E-A-T for AI engines.

15. **Build a content cluster strategy:**
    - Create a pillar page: "The Complete Guide to AI Automation for UK Small Businesses"
    - Write supporting articles targeting long-tail queries:
      - "How much does AI automation cost for a small business?"
      - "AI automation vs hiring: what's better for SMEs?"
      - "How to prepare your business data for AI"
      - "AI compliance and data protection for UK businesses"
      - "What is an AI agent and how can it help my business?"
    - Interlink all related content

16. **Establish a consistent blog publishing schedule** — Aim for 2-4 posts per month. Topics should target informational keywords your prospects are searching.

### LOW PRIORITY (Ongoing / Nice-to-have)

17. **Add `speakable` schema** — Mark up key content sections with `speakable` schema for voice assistant optimisation.

18. **Fix accessibility issues:**
    - Increase `--dim` colour to meet WCAG AA contrast (minimum #9ca3af for small text on #010108)
    - Add `href="#"` or `role="button" tabindex="0"` to footer legal links
    - Consider making custom cursor opt-in rather than default

19. **Add `start_url` to `site.webmanifest`** — Include `"start_url": "/"` for PWA completeness.

20. **Create a shared CSS file** — Extract common styles to a single stylesheet for cross-page caching.

21. **Add comparison tables to blog content** — Convert prose comparisons to structured HTML tables (e.g., "Cloud vs Local LLM" comparison). AI engines preferentially extract tabular data.

22. **Create a LinkedIn company page** — The current `sameAs` links to a personal LinkedIn profile. A company page strengthens business entity signals.

23. **Add `<link rel="preload">` for critical fonts** — Preload the primary font weight to reduce FOIT/FOUT.

---

## 8. GEO/AEO-Specific Action Items

These recommendations specifically target AI answer engine visibility:

### Content Patterns to Add

1. **Definition blocks** — On service pages and blog posts, lead with a clear, concise definition:
   > **What is AI workflow automation?** AI workflow automation uses artificial intelligence to handle repetitive business processes — from invoice processing to customer follow-ups — without manual intervention. For East Anglian SMEs, this typically means connecting existing tools like Xero, HubSpot, and Outlook through intelligent AI agents.

2. **Comparison tables** — Create structured tables that AI engines can extract:
   - Cloud LLM vs Local LLM (for the existing blog post)
   - AI chatbot vs AI voice agent
   - DIY AI tools vs professional AI consultancy

3. **"People also ask" targeting** — Write content explicitly answering common related queries:
   - "Is AI automation worth it for small businesses?"
   - "How long does it take to implement AI automation?"
   - "Do I need technical knowledge to use AI agents?"
   - "Can AI replace my customer service team?"

4. **Statistics callouts** — Format key data points as distinct, extractable blocks rather than burying them in paragraphs.

5. **Step-by-step guides** — Create numbered "How to" content with `HowTo` schema markup.

### Schema Additions

6. **Add `HowTo` schema** — For process/methodology content.
7. **Add `speakable` schema** — For voice-assistant-ready content sections.
8. **Add `Review` / `AggregateRating` schema** — When testimonials are added.
9. **Consider `Course` or `LearningResource` schema** — For the AI Readiness Assessment tool.

### Authority Building

10. **Earn citations from local business directories** — Register on Yell, FreeIndex, Bark, and county-specific business directories.
11. **Contribute guest posts** — Write for local business publications, chambers of commerce newsletters, or tech blogs to build backlinks and author authority.
12. **Create linkable assets** — Develop free tools, templates, or data reports that others will link to (e.g., "2026 AI Adoption Survey: East Anglian Businesses").

---

## 9. Summary of Findings

### What's Done Well
- Comprehensive JSON-LD structured data on all pages (ProfessionalService, BlogPosting, FAQPage)
- Strong geographic keyword targeting across content, meta tags, and schema
- Deep, well-written blog content with authoritative citations
- Proper canonical URLs, Open Graph, and Twitter Card implementation
- Excellent accessibility infrastructure (skip links, ARIA, accessibility panel)
- Good CLS prevention with explicit image dimensions
- Responsive design with proper breakpoints and fluid typography
- Blog FAQ schema creates rich-result eligibility

### What Needs Attention
- **Zero analytics** — cannot measure anything without GA4/GSC
- **No Google Business Profile** — missing from local search entirely
- **Missing og-image.png** — broken social sharing previews
- **Render-blocking resources** — Three.js and fonts delay page load
- **No WebP/AVIF images** — serving only JPEG
- **No dedicated service or location pages** — missed keyword opportunities
- **No case studies, testimonials, or reviews** — weak E-E-A-T trust signals
- **Limited GEO/AEO content patterns** — no definition blocks, comparison tables, or how-to guides
- **Only 4 blog posts** — needs consistent publishing cadence
- **Title tags too long** — will be truncated in search results

---

*This audit was conducted via source-code analysis. A live-site audit using tools like Google PageSpeed Insights, Lighthouse, Screaming Frog, Ahrefs, or Semrush would provide additional data on page speed metrics, backlink profile, keyword rankings, and competitor analysis.*
