# 06 · Prioritised action plan

Ordered by impact against effort. IDs refer to the findings in reports 01–05.

## Fixed now (on the branch, awaiting your review)

| # | Commit | Fix | Finding |
|---|---|---|---|
| 1 | `9505eb6` | Preload fonts on 22 pages; layout shift 0.167–0.200 → 0.000 | PERF-01 |
| 2 | `41525cf` | Readable FAQ links on the three tool pages | A11Y-02 |
| 3 | `75f46c3` | Underlined blog reference links; keyboard-scrollable table | A11Y-03, A11Y-06 |
| 4 | `c66511c` | Service cards no longer hide their content from screen readers | A11Y-01 |
| 5 | `329b6ac` | Chat button accessible name; decorative marquee hidden | A11Y-05, A11Y-07 |
| 6 | `1374038` | Carousel dots enlarged to 24 px tap targets | A11Y-04 |
| 7 | `b0d240d` | Closing homepage button goes to the enquiry form | CRO-03 |
| 8 | `728db31` | Homepage social titles match the page title | SEO-06 |
| 9 | `5ce2cf4` | AI training hero served as WebP | PERF-02 |
| 10 | `9f02a52` | GA4 conversion events | CRO-04 |
| 11 | `48979a0` | Consent documentation corrected; `.gitignore` added | Code quality |
| 12 | `18a0cfb` | Internal documents excluded from the published site | SEC-01, SEO-01 |

## Next 7 days

| # | Action | Finding | Who | Effort |
|---|---|---|---|---|
| 1 | Review and merge the pull request; confirm `/docs/WEBSITE-CODE-REVIEW-2026-11-09.html` then returns 404 | SEC-01 | You | 15 min |
| 2 | Submit each of the four forms once from your own browser and confirm the emails arrive | CRO-09 | You | 10 min |
| 3 | Approve the privacy and cookie wording so the policy matches how the Google tag loads | COMP-01 | You approve, I apply | 10 min |
| 4 | Approve the hero size change (compare the two screenshots) | CRO-01 | You approve, I apply | 5 min |
| 5 | Approve the shorter cookie banner text | CRO-02, A11Y-10 | You approve, I apply | 5 min |
| 6 | Web3Forms dashboard: restrict the key to the domain, enable hCaptcha or Turnstile, set a quota alert | SEC-04 | You | 15 min |
| 7 | GA4: mark key events, add custom dimensions, link Search Console, add a failed-form alert | CRO-04 | You | 15 min |
| 8 | Search Console and Bing: confirm verification, request indexing of the main pages, resubmit the sitemap | SEO-07, SEO-08 | You | 20 min |
| 9 | Decide on the "Outcome" lines: attribute, source or relabel as illustrative | SEO-09 | You decide, I apply | 15 min |
| 10 | Confirm the ICO data protection fee is paid | COMP-03 | You | 5 min |

## Next 30 days

| # | Action | Finding | Who | Effort |
|---|---|---|---|---|
| 11 | Put Cloudflare in front of the domain: security headers and long cache lifetimes | SEC-02, PERF-04 | You (DNS), I supply the rules | 1–2 h |
| 12 | Homepage direct-answer paragraph | SEO-05 | You approve the draft, I apply | 10 min |
| 13 | Change the header button to "Book a Free Call"; point report-page buttons at the form | CRO-07, CRO-08 | You approve, I apply | 20 min |
| 14 | Add the company details line to the 18 footers that lack it | COMP-02 | You approve, I apply | 20 min |
| 15 | Essex landing page | SEO-03 | You supply local detail, I build | Half a day |
| 16 | Workflow automation service page | SEO-04 | You approve the outline, I build | Half a day |
| 17 | Add a calendar booking link | CRO-06 | You choose the provider, I add it | 1 h |
| 18 | First Google review and first case study | SEO-02, CRO-05 | You (needs a client) | Ongoing |
| 19 | Complete the Google Business Profile checklist; list on Bing Places, Apple Business Connect, Norfolk Chamber | Local SEO | You | 2–3 h |
| 20 | Demo text contrast and minimum mobile text size | A11Y-08, A11Y-09 | You approve, I apply | 30 min |
| 21 | Manual screen-reader and keyboard walk-through of the homepage and one tool | Accessibility | Me or a tester | 2 h |

## Later (next quarter)

| # | Action | Finding | Effort |
|---|---|---|---|
| 22 | Pricing page; AI agents and AI chatbots service pages; FAQ page | SEO-04, SEO-10 | 2–3 days |
| 23 | Sector pages, starting with the sector of your first client | SEO-10 | 1 day each |
| 24 | Further town pages only where the content would be unique | SEO-03 | 1 day each |
| 25 | Move inline `onclick` handlers into script files, then tighten the CSP | SEC-03 | 1 day |
| 26 | One shared stylesheet for the inner pages | PERF-09 | 1 day |
| 27 | Responsive hero images (`srcset`) | PERF-05 | 2 h |
| 28 | Start homepage demos only when scrolled into view | PERF-06 | 1 h |
| 29 | Delete the stale IndexNow key and unreferenced files; add `security.txt`; pin Actions by SHA | SEC-05–07, PERF-08 | 1 h |
| 30 | Decide whether the Google tag should wait for consent or interaction | PERF-03 | 1 h |
| 31 | Monthly: ask ChatGPT, Perplexity, Gemini and Claude "who offers AI automation for small businesses in Norwich?" and record whether EAAIS is named | AEO | 30 min a month |
| 32 | Quarterly: review the GPT-6 vs Claude post for accuracy | E-E-A-T | 1 h |
