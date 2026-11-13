/*!
 * EAAIS consent + GA4/Clarity/Preferred-Source gate
 * - Injects the cookie banner into every page.
 * - GA4 (gtag.js) is inlined in each page head with consent denied by default;
 *   this script loads Microsoft Clarity and the Google Preferred
 *   Source button script ONLY after the visitor clicks Accept.
 * - Clears _ga, _clck and _clsk cookies on Reject.
 * - Google Consent Mode v2 (advanced): the Google tag itself loads on every
 *   page with every signal defaulting to "denied", so before Accept it sets
 *   no cookies but does send cookieless pings to Google. The analytics signal
 *   is updated to "granted" only on Accept. Ad signals stay denied because
 *   the site runs no advertising tags.
 * - Public API: window.EAAISConsent.{accept,reject,reopen,status}
 */
(function () {
  var STORAGE_KEY = 'eaais_cookie_consent';
  var GA_ID = 'G-F6TTH896D0';
  var CLARITY_ID = 'ydpebg25fy';
  var HOSTNAME = (location.hostname || '').replace(/^www\./, '');

  // The Google tag (gtag.js) and Consent Mode v2 defaults (all denied) are
  // inlined in every page's <head> so Google can detect the tag. Here we only
  // update consent on the visitor's choice.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function setConsent(granted) {
    window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
    if (typeof window.clarity === 'function') window.clarity('consent', granted);
  }

  function read() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* private mode */ }
  }

  function loadClarity() {
    if (window.__eaaisClarityLoaded) return;
    window.__eaaisClarityLoaded = true;
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID + '?ref=bwt';
    document.head.appendChild(s);
    window.clarity('consent', true);
  }

  function loadPreferredSource() {
    if (window.__eaaisPrefSrcLoaded) return;
    window.__eaaisPrefSrcLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://news.google.com/swg/js/v1/publisher.js';
    document.head.appendChild(s);
  }

  function expire(name, domain) {
    var suffix = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = name + suffix + (domain ? '; domain=' + domain : '');
  }
  function clearGACookies() {
    var domains = ['.' + HOSTNAME, HOSTNAME, ''];
    var names = ['_ga', '_gid', '_gat', '_ga_' + GA_ID.replace('G-', '')];
    // Also sweep any other _ga_* variants that may be present.
    (document.cookie || '').split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (/^_ga(_.+)?$/.test(name) && names.indexOf(name) === -1) names.push(name);
    });
    names.forEach(function (n) { domains.forEach(function (d) { expire(n, d); }); });
  }
  function clearClarityCookies() {
    var domains = ['.' + HOSTNAME, HOSTNAME, ''];
    var names = ['_clck', '_clsk'];
    names.forEach(function (n) { domains.forEach(function (d) { expire(n, d); }); });
  }

  function makeBanner() {
    if (document.getElementById('eaais-cookie-banner')) return;
    var wrap = document.createElement('div');
    wrap.id = 'eaais-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.innerHTML =
      '<p class="eaais-cookie-text">We use essential storage plus Google Analytics 4 (cookieless until you accept), optional Microsoft Clarity and a Google Preferred Source button (cookies <code>_ga</code>, <code>_ga_F6TTH896D0</code>, <code>_clck</code>, <code>_clsk</code>, and Google\'s own <code>NID</code> cookie) to measure aggregate traffic and session behaviour, and let you mark us as a preferred source in Google Search. Analytics cookies are only set if you accept. See our <a href="/cookies.html">Cookie Policy</a>.</p>' +
      '<div class="eaais-cookie-actions">' +
        '<button type="button" class="eaais-cookie-btn primary" data-eaais="accept">Accept</button>' +
        '<button type="button" class="eaais-cookie-btn" data-eaais="reject">Reject Non-Essential</button>' +
        '<a class="eaais-cookie-btn" href="/cookies.html">Cookie Settings</a>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.querySelector('[data-eaais="accept"]').addEventListener('click', accept);
    wrap.querySelector('[data-eaais="reject"]').addEventListener('click', reject);
  }
  function show() { makeBanner(); var b = document.getElementById('eaais-cookie-banner'); if (b) b.classList.add('show'); }
  function hide() { var b = document.getElementById('eaais-cookie-banner'); if (b) b.classList.remove('show'); }

  function accept() { write('accepted'); setConsent(true); loadClarity(); loadPreferredSource(); hide(); }
  function reject() { write('rejected'); setConsent(false); clearGACookies(); clearClarityCookies(); hide(); }
  function reopen() { makeBanner(); show(); }
  function status() { return read(); }

  window.EAAISConsent = { accept: accept, reject: reject, reopen: reopen, status: status };

  // Conversion events for GA4. Only an event name, a form or link identifier
  // and the page path are sent, never anything the visitor typed. Events go
  // through the same Google tag as page views, so they follow the visitor's
  // consent choice via Consent Mode.
  function track(name, params) {
    try { window.gtag('event', name, params || {}); } catch (e) { /* analytics must never break the page */ }
  }
  window.EAAISTrack = track;
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a[href],button') : null;
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var where = location.pathname;
    if (href.indexOf('tel:') === 0) { track('call_click', { link_location: where }); return; }
    if (href.indexOf('mailto:') === 0) { track('email_click', { link_location: where }); return; }
    if (/(^|\s)(btn-primary|nav-cta|m-cta)(\s|$)/.test(el.className || '')) {
      track('cta_click', {
        cta_text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
        cta_target: href || 'button',
        link_location: where
      });
    }
  }, true);

  function boot() {
    makeBanner();
    var v = read();
    if (v === 'accepted') { setConsent(true); loadClarity(); loadPreferredSource(); }
    else if (v === 'rejected') { clearGACookies(); clearClarityCookies(); }
    else setTimeout(show, 1200);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
