/* East Anglia AI Services — shared site behaviour, loaded with `defer` on every page:
 * mobile menu, header sub-menus, accessibility options and the enquiry form. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- Accessibility preferences ----
   * Pages apply saved choices inline before first paint; this repeats the
   * check so pages without that inline snippet behave the same. */
  var KEYS = { motion: 'eaais_a11y_motion', contrast: 'eaais_a11y_contrast', text: 'eaais_a11y_text' };
  var CLS = { motion: 'reduce-motion', contrast: 'high-contrast', text: 'large-text' };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  function drop(k) { try { localStorage.removeItem(k); } catch (e) { /* private mode */ } }
  function systemReduced() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  if (!root.classList.contains('reduce-motion') && !root.classList.contains('motion-ok')) {
    var m = get(KEYS.motion);
    var reduce = m === null ? systemReduced() : m === '1';
    root.classList.add(reduce ? 'reduce-motion' : 'motion-ok');
    if (get(KEYS.contrast) === '1') root.classList.add('high-contrast');
    if (get(KEYS.text) === '1') root.classList.add('large-text');
  }

  function applyPref(opt, on, persist) {
    root.classList.toggle(CLS[opt], on);
    if (opt === 'motion') {
      root.classList.toggle('motion-ok', !on);
      // The homepage registers these hooks for its animated backdrop.
      if (on) { if (window.__heroStop) window.__heroStop(); if (window.__hexStop) window.__hexStop(); }
      else { if (window.__heroStart) window.__heroStart(); if (window.__hexStart) window.__hexStart(); }
    }
    var btn = document.querySelector('.a11y-switch[data-opt="' + opt + '"]');
    if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (persist) set(KEYS[opt], on ? '1' : '0');
  }

  function buildA11y() {
    if (document.getElementById('a11y-wrapper')) return;
    var wrap = document.createElement('div');
    wrap.id = 'a11y-wrapper';
    wrap.innerHTML =
      '<div id="a11y-panel" role="dialog" aria-label="Accessibility options" aria-hidden="true">' +
        '<p class="a11y-title">Accessibility</p>' +
        '<p class="a11y-intro">Adjust the site to suit you. Choices are saved on this device.</p>' +
        '<div class="a11y-opt"><span id="a11y-motion-lbl">Reduce motion</span><button type="button" class="a11y-switch" data-opt="motion" aria-pressed="false" aria-labelledby="a11y-motion-lbl"></button></div>' +
        '<div class="a11y-opt"><span id="a11y-contrast-lbl">Higher contrast</span><button type="button" class="a11y-switch" data-opt="contrast" aria-pressed="false" aria-labelledby="a11y-contrast-lbl"></button></div>' +
        '<div class="a11y-opt"><span id="a11y-text-lbl">Larger text</span><button type="button" class="a11y-switch" data-opt="text" aria-pressed="false" aria-labelledby="a11y-text-lbl"></button></div>' +
        '<button type="button" class="a11y-reset" id="a11y-reset">Reset to defaults</button>' +
      '</div>' +
      '<button type="button" id="a11y-toggle" aria-label="Accessibility options" aria-expanded="false" aria-controls="a11y-panel">' +
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm8.5 4.74a1 1 0 0 0-1.22-.71l-4.79 1.28a8 8 0 0 1-5 0L4.72 6.03a1 1 0 1 0-.52 1.94l4.8 1.28V14l-1.9 6.04a1 1 0 0 0 1.9.6L10.8 15h2.4l1.8 5.64a1 1 0 0 0 1.9-.6L15 14V9.25l4.8-1.28a1 1 0 0 0 .7-1.23Z"/></svg>' +
      '</button>';
    document.body.appendChild(wrap);

    var panel = wrap.querySelector('#a11y-panel');
    var toggle = wrap.querySelector('#a11y-toggle');
    function setOpen(open) {
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
    ['motion', 'contrast', 'text'].forEach(function (opt) {
      var btn = wrap.querySelector('.a11y-switch[data-opt="' + opt + '"]');
      btn.setAttribute('aria-pressed', root.classList.contains(CLS[opt]) ? 'true' : 'false');
      btn.addEventListener('click', function () { applyPref(opt, !root.classList.contains(CLS[opt]), true); });
    });
    wrap.querySelector('#a11y-reset').addEventListener('click', function () {
      ['contrast', 'text'].forEach(function (opt) { applyPref(opt, false, false); drop(KEYS[opt]); });
      drop(KEYS.motion);
      applyPref('motion', systemReduced(), false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !wrap.contains(e.target)) setOpen(false);
    });
  }

  /* ---- Header: mobile menu and sub-menus ---- */
  function initNav() {
    var burger = document.getElementById('hamburger');
    var panel = document.getElementById('navPanel');
    function setMenu(open) {
      if (!burger || !panel) return;
      panel.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
      root.classList.toggle('nav-open', open);
    }
    function closeSubs(except) {
      document.querySelectorAll('.has-sub.open').forEach(function (li) {
        if (li === except) return;
        li.classList.remove('open');
        var b = li.querySelector('.sub-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
    if (burger && panel) {
      burger.addEventListener('click', function () { setMenu(!panel.classList.contains('open')); });
      // Following a link (including same-page anchors) closes the menu.
      panel.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) setMenu(false); });
      window.addEventListener('resize', function () { if (window.innerWidth > 960 && panel.classList.contains('open')) setMenu(false); });
    }
    document.querySelectorAll('.sub-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var li = btn.parentNode;
        var open = !li.classList.contains('open');
        closeSubs(li);
        li.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function (e) { if (!(e.target.closest && e.target.closest('.has-sub'))) closeSubs(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeSubs();
      if (panel && panel.classList.contains('open')) { setMenu(false); burger.focus(); }
    });
    window.EAAISNav = { close: function () { setMenu(false); } };
  }

  /* ---- Enquiry form (Web3Forms, sent without leaving the page) ---- */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form || !window.fetch) return; // without fetch the form posts normally
    var status = document.getElementById('formStatus');
    var btn = document.getElementById('cfSubmit');
    var formId = form.getAttribute('data-form-id') || 'contact';
    function say(text, cls) {
      status.textContent = text;
      status.className = 'form-status ' + cls + ' show';
      if (status.scrollIntoView) status.scrollIntoView({ block: 'nearest', behavior: root.classList.contains('reduce-motion') ? 'auto' : 'smooth' });
    }
    function track(name) { if (window.EAAISTrack) window.EAAISTrack(name, { form_id: formId }); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      btn.disabled = true;
      var orig = btn.textContent;
      btn.textContent = 'Sending…';
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (r) {
          if (r.ok && r.data && r.data.success) {
            say("Thanks — your message is on its way. We'll be in touch within 1 business day.", 'ok');
            form.reset();
            track('form_submit');
          } else {
            say((r.data && r.data.message) ? r.data.message : 'Something went wrong. Please email info@eastangliaaiservices.co.uk instead.', 'err');
            track('form_submit_failed');
          }
        })
        .catch(function () {
          say('Network error — please email info@eastangliaaiservices.co.uk or call 07466 951175.', 'err');
        })
        .then(function () { btn.disabled = false; btn.textContent = orig; });
    });
  }

  function boot() { initNav(); buildA11y(); initForm(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
