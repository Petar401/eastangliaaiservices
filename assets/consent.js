/*!
 * EAAIS consent + GA4 gate
 * - Injects the cookie banner into every page.
 * - Loads Google Analytics 4 ONLY after the visitor clicks Accept.
 * - Clears _ga* cookies on Reject.
 * - Public API: window.EAAISConsent.{accept,reject,reopen,status}
 */
(function () {
  var STORAGE_KEY = 'eaais_cookie_consent';
  var GA_ID = 'G-F6TTH896D0';
  var HOSTNAME = (location.hostname || '').replace(/^www\./, '');

  function read() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* private mode */ }
  }

  function loadGA() {
    if (window.__eaaisGAloaded) return;
    window.__eaaisGAloaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
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

  function makeBanner() {
    if (document.getElementById('eaais-cookie-banner')) return;
    var wrap = document.createElement('div');
    wrap.id = 'eaais-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie consent');
    wrap.innerHTML =
      '<p class="eaais-cookie-text">We use essential storage plus optional Google Analytics 4 (cookies <code>_ga</code>, <code>_ga_F6TTH896D0</code>) to measure aggregate traffic. Nothing loads until you choose. See our <a href="/cookies.html">Cookie Policy</a>.</p>' +
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

  function accept() { write('accepted'); loadGA(); hide(); }
  function reject() { write('rejected'); clearGACookies(); hide(); }
  function reopen() { makeBanner(); show(); }
  function status() { return read(); }

  window.EAAISConsent = { accept: accept, reject: reject, reopen: reopen, status: status };

  function boot() {
    makeBanner();
    var v = read();
    if (v === 'accepted') loadGA();
    else if (v === 'rejected') clearGACookies();
    else setTimeout(show, 1200);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
