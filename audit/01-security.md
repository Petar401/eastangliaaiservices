# 01 · Security

**Summary:** no secrets, malware, injection flaws or vulnerable dependencies were found. The two real problems are both about hosting: internal documents were being published (fixed), and GitHub Pages serves no security headers (needs your decision).

| ID | Severity | Finding | Status |
|---|---|---|---|
| SEC-01 | High | Internal audit documents were live, indexable pages | **Fixed** (verify after merge) |
| SEC-02 | High | No security headers in production | Needs my input |
| SEC-03 | Medium | CSP relies on `'unsafe-inline'` and is delivered by `<meta>` | Recommended (later) |
| SEC-04 | Medium | Forms have a honeypot only; the form key is public | Needs my input |
| SEC-05 | Low | Stale IndexNow key file still published | Recommended |
| SEC-06 | Low | No `security.txt` | Recommended |
| SEC-07 | Low | GitHub Actions pinned by tag, not commit | Recommended |
| SEC-08 | Low | Three.js r128 is from 2021 | Recommended (later) |

---

## SEC-01 · Internal audit documents were live, indexable pages (High, Fixed)

**Evidence** (live, 13 Nov 2026):

```
docs/WEBSITE-CODE-REVIEW-2026-11-09.html   200 text/html
docs/SEO-AEO-GEO-AUDIT-2026-11-09.html     200 text/html
SEO-INDEXNOW.html                          200 text/html
README.md                                  200 text/markdown
vercel.json                                200 application/json
```

The rendered page title was "Code Review: eastangliaaiservices.co.uk (whole site) | eastangliaaiservices", with no `noindex`.

**Why it matters:** GitHub Pages renders every Markdown file in the repo. Your security review (which lists weaknesses), your competitor analysis and statements such as "no reviews, no case studies" were public pages on the business domain that Google and AI crawlers can index and quote. The `audit/` folder you asked for would have been published the same way.

**Fix:** new `_config.yml` excluding `docs/`, `audit/`, `README.md`, `SEO-INDEXNOW.md` and `vercel.json` from the Pages build. Verified with a local Jekyll 3.10 build: those paths are absent and `index.html` is byte-identical.

**After merging:** open `https://eastangliaaiservices.co.uk/docs/WEBSITE-CODE-REVIEW-2026-11-09.html` and confirm it returns 404. If any of those URLs are already in Google, use Search Console → Removals.

## SEC-02 · No security headers in production (High, Needs my input)

**Evidence:** `curl -I https://eastangliaaiservices.co.uk/` returns only `server`, `content-type`, `last-modified`, `access-control-allow-origin: *`, `etag`, `expires` and `cache-control`. Lighthouse reports "No HSTS header found" and "No frame control policy found". The headers in `vercel.json` (HSTS, `X-Frame-Options`, `nosniff`, `Permissions-Policy`) apply only to Vercel previews, never to the live site.

**Why it matters:** without HSTS a first visit over `http://` can be intercepted; without frame protection the site can be embedded in another page for clickjacking (`frame-ancestors` cannot be set by a `<meta>` tag). GitHub Pages cannot send custom headers, so this cannot be fixed in the repo.

**Fix, option A (recommended, free):** put Cloudflare in front of the domain and add one Response Header Transform Rule:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Content-Security-Policy: frame-ancestors 'self'
```

This also fixes PERF-04 (cache lifetime).

**Option B:** make Vercel the production host. `vercel.json` already contains these headers, so they would apply immediately. It means changing DNS and retiring GitHub Pages.

## SEC-03 · CSP relies on `'unsafe-inline'` (Medium, Recommended later)

**Evidence:** the `<meta http-equiv="Content-Security-Policy">` on every page (for example `index.html:5`) has `script-src 'self' 'unsafe-inline' …` and `img-src 'self' data: https:`. There are 139 inline `onclick` attributes across the site (48 in `index.html`).

**Why it matters:** with `'unsafe-inline'` the policy does not stop injected script. In practice the risk is low: there is no server, no URL parameter is written into the page, and every place user text reaches the DOM is escaped (`assets/home.js:107`, `esc()` in `ai-policy-generator.html`).

**Fix:** move inline handlers to `addEventListener` in the script files, then drop `'unsafe-inline'` from `script-src` and narrow `img-src` to `'self' data:`. About a day of careful work with a full regression test; not urgent.

## SEC-04 · Forms have a honeypot only (Medium, Needs my input)

**Evidence:** `index.html:598` (hidden `access_key`) and `index.html:601` (`botcheck` honeypot); the same pattern in `ai-readiness.html:321`, `loss-calculator.html:305` and the policy generator. There is no CAPTCHA and, being a static site, no rate limiting.

**Why it matters:** the key is public by design, but anyone can script submissions to flood your inbox or use up the Web3Forms monthly quota, after which genuine leads are rejected. (The tools do warn the visitor when that happens, which was verified.)

**Fix (Web3Forms dashboard, 10 minutes):**
1. Restrict the access key to `eastangliaaiservices.co.uk`.
2. Turn on hCaptcha or Cloudflare Turnstile. If you choose one, tell me and I will add the widget and the CSP entries.
3. Set a quota alert email.

**Observed:** Web3Forms already blocks datacentre traffic at Cloudflare (403 to the audit machine), which reduces casual abuse.

## SEC-05 · Stale IndexNow key file (Low, Recommended)

**Evidence:** `SEO-INDEXNOW.md:13-14` says `58cd3c7b….txt` is "from an earlier setup, left in place" and `295da9ea….txt` is current.

**Fix:** delete `58cd3c7b05f949a6bb317d97886dd339.txt`. An unused ownership key lets whoever holds it submit URLs for your domain. Not done here because I cannot confirm in Bing Webmaster Tools which key is registered.

## SEC-06 · No `security.txt` (Low, Recommended)

**Evidence:** `/.well-known/security.txt` returns 404.

**Draft** (`.well-known/security.txt`; also add `include: [".well-known"]` to `_config.yml` so Jekyll publishes the dot-folder):

```
Contact: mailto:info@eastangliaaiservices.co.uk
Expires: 2027-11-13T00:00:00.000Z
Preferred-Languages: en
Canonical: https://eastangliaaiservices.co.uk/.well-known/security.txt
```

## SEC-07 · Actions pinned by tag (Low, Recommended)

**Evidence:** `.github/workflows/html-check.yml` uses `actions/checkout@v4`, `actions/setup-node@v4`, `lycheeverse/lychee-action@v2`.

**Fix:** pin third-party actions to a commit SHA. Workflows already use `permissions: contents: read`, so exposure is small.

## SEC-08 · Three.js r128 (Low, Recommended later)

**Evidence:** `assets/home.js:15` loads `three.js/r128/three.min.js` from cdnjs with a valid SRI hash and `crossorigin`.

**Why it matters:** SRI means the file cannot be tampered with, and no known vulnerability affects how it is used here. It is simply four years old. Self-hosting a current build would also remove the cdnjs dependency.

---

## Checked and found sound

| Area | Result |
|---|---|
| Hard-coded secrets | None. Scanned all HTML, JS, JSON, YAML and Markdown |
| `.env` handling | No `.env` files. `.gitignore` added on this branch so one cannot be committed by accident |
| Dependencies | None, so nothing to audit or update |
| XSS / injection | All `innerHTML` sinks reviewed (`assets/home.js:85,87,107,108`): author-written strings or escaped user input. No `eval`, `document.write` or URL-parameter injection |
| CORS | `access-control-allow-origin: *` is GitHub Pages' default for public static files; nothing private is served |
| CSRF | Not applicable: no sessions, cookies or server state |
| Source maps / debug endpoints | None. No `console.log`, `debugger`, TODO or FIXME anywhere |
| Third-party scripts | Three.js has SRI. Google's tag cannot use SRI (the file changes) |
| Mixed content | None. No `http://` resource on any page |
| `target="_blank"` | Every instance has `rel="noopener"` |
| TLS | TLS 1.3, valid certificate to 10 Feb 2027 |
