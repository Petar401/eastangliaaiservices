# 05 · Conversion, UX and analytics

**Summary:** the forms work and fail safely, and the site now measures conversions. The biggest lead-generation problems are visual: on a typical laptop the hero heading fills the whole first screen and pushes every button below the fold, and on phones the cookie banner covers the buttons. Neither was changed, because both alter design or legal wording; drafts and screenshots are provided.

| ID | Severity | Finding | Status |
|---|---|---|---|
| CRO-01 | High | Desktop: no call to action above the fold | Recommended (CSS and screenshots below) |
| CRO-02 | High | Mobile: cookie banner covers both hero buttons | Recommended (see A11Y-10) |
| CRO-03 | High | Closing "Book a Free Strategy Call" opened an email client | **Fixed** |
| CRO-04 | High | No conversion tracking of any kind | **Fixed** (GA4 set-up steps for you below) |
| CRO-05 | High | No trust signals: reviews, case studies, logos, accreditations | Needs my input |
| CRO-06 | Medium | "Book a call" leads to a general form, not a calendar | Needs my input |
| CRO-07 | Medium | The navigation's highlighted button is "Talk to ARIA" | Recommended |
| CRO-08 | Medium | Report-page follow-up buttons are `mailto:` links | Recommended |
| CRO-09 | Medium | Live lead delivery could not be tested from the audit environment | Needs my input |
| CRO-10 | Low | Mobile number only; no local landline | Recommended |
| CRO-11 | Low | Tool descriptions lead with benefit, not what you get | Recommended |

---

## CRO-01 · Nothing to click above the fold on desktop (High, Recommended)

**Evidence** (1366×768, a common laptop size; measured in the browser):

| Element | Bottom edge | Visible on load? |
|---|---|---|
| H1 "Automate the Future — AI Automation for East Anglian Businesses" | 948 px | Cut off after "the Future" |
| Supporting sentence | 1,049 px | No |
| "Book a Free Strategy Call" | 1,132 px | No (364 px below the fold) |

Cause: `assets/home.css:33` sets `.hero-title{font-size:clamp(2.8rem,11vw,9rem)}`, which is 144 px at this width. The part of the H1 that says what you do and where ("AI Automation for East Anglian Businesses") is off-screen, and the cookie banner overlaps what is left.

Screenshot: `audit/img/hero-current-1366x768.png`.

**Why it matters:** a first-time visitor sees a slogan, no description of the service, no location and no button. Visitors who do not scroll leave.

**Draft fix** (one rule; phones and tall monitors keep the current size):

```css
@media (min-width:681px) and (max-height:900px){
  .hero-title{font-size:clamp(2.8rem,5.6vw,4.9rem);max-width:820px;}
}
```

Measured with this rule applied: H1 ends at 459 px, the sentence at 560 px, the buttons at 643 px. Everything is visible. Screenshot: `audit/img/hero-proposed-1366x768.png`.

Not applied because it visibly changes the hero. Say "apply CRO-01" and I will commit it.

## CRO-02 · Cookie banner covers the hero buttons on phones (High, Recommended)

See A11Y-10 for evidence and the shorter banner draft. On a 390×844 phone the banner occupies y=529–836 and the primary button sits at y≈520–570. The first thing a mobile visitor can tap is Accept or Reject, not "Book a Free Strategy Call".

## CRO-03 · Closing button opened an email client (High, Fixed)

**Evidence:** `index.html:653`: `<a href="mailto:info@eastangliaaiservices.co.uk" class="btn-primary">Book a Free Strategy Call</a>`. The same label everywhere else links to `#contact`.

**Why it matters:** on a device with no mail app configured, the click does nothing. On others it opens a blank email. It is the last and strongest prompt on the page.

**Fix (commit `b0d240d`):** links to `#contact`.

## CRO-04 · No conversion tracking (High, Fixed)

**Evidence:** no `gtag('event', …)` call existed anywhere. GA4 received page views only, so you could not tell which page, button or tool produces enquiries.

**Fix (commit `9f02a52`):**

| Event | Fires when | Parameters |
|---|---|---|
| `form_submit` | Web3Forms confirms a lead from the contact form or any tool | `form_id`: `contact`, `ai_readiness`, `loss_calculator`, `ai_policy_generator` |
| `form_submit_failed` | Web3Forms rejects a submission or the network fails | `form_id` |
| `readiness_form_complete` | The readiness report is unlocked and the lead delivered | `score`, `level` |
| `call_click` | Any `tel:` link is clicked | `link_location` |
| `email_click` | Any `mailto:` link is clicked | `link_location` |
| `cta_click` | Any primary or navigation call-to-action button is clicked | `cta_text`, `cta_target`, `link_location` |

Nothing the visitor types is sent. The events use the existing Google tag, so they respect Consent Mode. Tested locally: all six fire with the expected parameters.

**For you to do in GA4 (10 minutes, after merging):**
1. Admin → Events → mark `form_submit`, `readiness_form_complete` and `call_click` as **key events**.
2. Admin → Custom definitions → add event-scoped dimensions `form_id`, `link_location`, `cta_text`.
3. Admin → Product links → link Search Console.
4. Create an alert on `form_submit_failed` > 0: it means a lead was lost (quota, spam filter or outage).

## CRO-05 · No trust signals (High, Needs my input)

**Evidence:** no testimonial, review count, client name, logo, accreditation, insurance statement or guarantee appears on any page.

**What is already good:** founder name and photo, phone and email in the contact section, company number, Norwich base, published prices, on-site visits, "fixed written quote".

**Strategy, with no invented content:**
1. **Now:** move existing true signals up the page. Under the hero buttons add one line: "Norwich-based · Fixed written quotes · On-site across East Anglia · Company No. 17381169".
2. **First client:** ask for a Google review on sign-off and permission to quote it. Offer a discounted pilot in exchange for a named case study if needed.
3. **Memberships:** Norfolk Chamber, FSB or a Cyber Essentials certificate give you a legitimate badge.
4. **Never:** stock "as seen in" logos, unnamed quotes or star ratings without a public source.

## CRO-06 · No calendar booking (Medium, Needs my input)

**Evidence:** every "Book a Free Strategy Call" button leads to the enquiry form (name, email, message). The visitor then waits for a reply to arrange a time.

**Fix:** add a booking link (Google Calendar appointment schedule is free with Workspace; Cal.com and Calendly have free tiers) as the primary action, keeping the form as the alternative. It needs a CSP entry for the provider; tell me which one.

## CRO-07 · Navigation button (Medium, Recommended)

**Evidence:** the only highlighted button in the header is "Talk to ARIA" (`index.html`, `.nav-cta`), which opens a rule-based chat that answers from a fixed list. The header has nine other links.

**Why it matters:** the most prominent, always-visible button does not lead to a lead.

**Draft:** label "Book a Free Call", linking to `#contact`. ARIA stays available from its floating button. Optionally group AI Readiness, Loss Calculator and AI Policy under one "Free tools" menu to shorten the bar.

## CRO-08 · Report-page buttons (Medium, Recommended)

**Evidence:** after a visitor unlocks a report, the follow-up button is a `mailto:` link: `ai-readiness.html:386`, `loss-calculator.html:361`, `ai-policy-generator.html:346`.

**Why it matters:** this is your warmest moment (they have just seen their score or their annual loss) and it has the same weakness as CRO-03.

**Draft:** link to `/#contact` (or the booking link from CRO-06). These visitors' details are already with you, so also follow up directly.

## CRO-09 · Live delivery untested (Medium, Needs my input)

**Evidence:** four TEST submissions were attempted on the live site with your approval. All four were refused before reaching Web3Forms: its Cloudflare layer returns 403 to the audit machine's datacentre IP. **No email was sent.** The site handled it correctly: the contact form showed "Network error — please email … or call 07466 951175", and each tool showed its report with the warning "we couldn't notify our team automatically".

With the endpoint intercepted, all eight paths passed (4 forms × success and failure): browser validation blocks empty and malformed input, success messages appear, the form resets, and failures are reported to the visitor.

**For you:** submit each of the four forms once from your own browser and confirm four emails arrive. Check the Web3Forms dashboard quota while you are there.

## CRO-10 · Phone number (Low, Recommended)

**Evidence:** the only number is a mobile, 07466 951175. A Norwich landline (01603) or a virtual geographic number forwarding to the mobile reinforces the local claim, on the site and on Google Business Profile.

## CRO-11 · Tool introductions (Low, Recommended)

**Evidence:** the tool pages open with 29–36 words of benefit copy. The readiness page does not say, before the visitor starts, that name, email and company are requested before the report is shown (`ai-readiness.html:316-346`).

**Why it matters:** a gate that appears after ten questions feels like a bait and switch to some visitors and causes drop-off at the last step. Saying so up front ("10 questions, then tell us where to send your report") filters in the people who will complete it. You can measure this now: `cta_click` on "Start the Assessment" versus `readiness_form_complete`.

---

## Call-to-action hierarchy (as found)

| Position | Button | Target | Assessment |
|---|---|---|---|
| Header | Talk to ARIA | Opens chat | Weak (CRO-07) |
| Hero, primary | Book a Free Strategy Call | `#contact` | Right action, below the fold on desktop (CRO-01) |
| Hero, primary | Free AI Readiness Test | `/ai-readiness.html` | Good low-commitment second option |
| Hero, secondary | See Live Demos / Our Services | Anchors | Fine |
| Services | Book a Free Strategy Call | `#contact` | Good |
| Pricing | Get a Fixed Quote | `#contact` | Good |
| Tool promos × 3 | Take the Free Test / Calculate / Generate | Tool pages | Good |
| Contact | Call · Email · Chat cards, then form | | Good; phone and email are visible |
| Closing | Book a Free Strategy Call | `#contact` | Fixed (CRO-03) |
| Inner pages | Book a Free Strategy Call | `/#contact` | Consistent |

## Forms and friction

| Form | Required | Optional | Assessment |
|---|---|---|---|
| Contact | Name, email, message | Phone, company | Appropriate |
| Tool gates × 3 | Name, email, company | Phone | Reasonable for B2B; state it before the quiz starts (CRO-11) |

## Analytics set-up as found

| Item | Status |
|---|---|
| GA4 `G-F6TTH896D0` | On every page; Consent Mode v2 defaults all denied; `anonymize_ip` set |
| Microsoft Clarity `ydpebg25fy` | Loads after Accept only |
| Conversion events | None before; six now (CRO-04) |
| Search Console / Bing verification | Not determinable from the repo (SEO-08) |
| GA4 ↔ Search Console link | Unverified (no dashboard access) |
