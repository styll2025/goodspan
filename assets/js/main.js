/* The Good Span: page routing, mobile menu */
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[data-dead]');
  if (a) e.preventDefault();
});
function route() {
  var h = location.hash || '#/home';
  var parts = h.replace(/^#\/?/, '').split('/');
  var slug = parts[0] || 'home', anchor = parts[1];
  var page = document.getElementById('page-' + slug);
  if (!page) { page = document.getElementById('page-home'); slug = 'home'; }
  document.querySelectorAll('main').forEach(function (m) { m.hidden = m !== page; });
  document.title = slug === 'home' ? 'The Good Span. More years that matter.' : page.dataset.title + ' · The Good Span';
  var target = anchor ? page.querySelector('#' + CSS.escape(anchor)) : null;
  if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

(function(){
  function show(h){
    var parts=(h||'#/home').replace(/^#\/?/,'').split('/');
    var slug=parts[0]||'home', anchor=parts[1];
    var page=document.getElementById('page-'+slug);
    if(!page){page=document.getElementById('page-home');slug='home';}
    document.querySelectorAll('main').forEach(function(m){m.hidden=m!==page;});
    page.querySelectorAll('img').forEach(function(i){i.loading='eager';});
    var target=anchor?page.querySelector('#'+CSS.escape(anchor)):null;
    if(target) target.scrollIntoView(); else window.scrollTo(0,0);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');
    if(!a||a.hasAttribute('data-dead'))return;
    var h=a.getAttribute('href'); e.preventDefault();
    if(h==='#')return;
    try{history.replaceState(null,'',h);}catch(err){}
    show(h);
  },true);
})();

(function () {
  function closeAll() {
    document.querySelectorAll('.tgs-burger[aria-expanded="true"]').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu');
      var m = document.getElementById(b.getAttribute('aria-controls')); if (m) m.classList.remove('is-open');
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.tgs-burger');
    if (b) {
      var open = b.getAttribute('aria-expanded') !== 'true';
      closeAll();
      if (open) {
        b.setAttribute('aria-expanded', 'true'); b.setAttribute('aria-label', 'Close menu');
        var m = document.getElementById(b.getAttribute('aria-controls')); if (m) m.classList.add('is-open');
      }
      return;
    }
    if (e.target.closest('.tgs-menu a')) closeAll();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  window.addEventListener('hashchange', closeAll);
  window.addEventListener('resize', function () { if (innerWidth > 1100) closeAll(); });
})();

/* Membership interest pop-up.
   Paste your Google Apps Script web app URL below. While it is empty, the pop-up works in preview mode:
   it shows every step but does not send anything. */
var INTEREST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzhYXNj7269278GSDccQ7tGHyM-v3_bEnIMnj26jx4cR2T_QmxpqyUrxTZXFKfEj9qR/exec';
(function () {
  var modal = document.getElementById('interest-modal');
  if (!modal) return;
  var panel = modal.querySelector('.tgs-modal__panel');
  var form = modal.querySelector('form');
  var email = modal.querySelector('#im-email');
  var consent = modal.querySelector('input[name="consent"]');
  var submit = modal.querySelector('[data-submit]');
  var SUMMARY = { 'Core': '€129/month · cancel anytime', 'Concierge': '€249/month · cancel anytime' };
  var OPTION_LABEL = { 'six-month': 'Six-month commitment (€19/month)', 'trial': 'One-month trial (€25)' };
  var state = { tier: '' }, lastFocus = null;

  function $(sel) { return modal.querySelectorAll(sel); }
  function show(step) {
    $('[data-step]').forEach(function (s) { s.hidden = s.getAttribute('data-step') !== step; });
    modal.classList.toggle('tgs-modal--choose', step === 'email' && state.tier === 'Self');
    panel.setAttribute('aria-labelledby', 'im-title-' + step);
    panel.scrollTop = 0;
    var first = step === 'thanks' ? modal.querySelector('#im-title-thanks') : (state.tier === 'Self' ? modal.querySelector('input[name=option]:checked') : email);
    if (first) setTimeout(function () { first.focus(); }, 30);
  }
  function setTier() {
    var self = state.tier === 'Self';
    $('[data-tier-name]').forEach(function (n) { n.textContent = state.tier; });
    var pill = modal.querySelector('[data-tier-pill]');
    pill.textContent = state.tier; pill.className = 'tgs-pill tgs-pill--' + state.tier.toLowerCase();
    modal.querySelector('[data-summary]').textContent = self ? '' : SUMMARY[state.tier];
    modal.querySelector('[data-self-options]').hidden = !self;
    modal.querySelector('[data-title]').innerHTML = self ? 'How would you like to start?'
      : 'Thank you for your interest in <span data-tier-name>' + state.tier + '</span>.';
    modal.querySelector('[data-intro]').textContent = self
      ? 'Memberships open soon. Choose an option and leave your email, and we’ll let you know as soon as you can join.'
      : 'Memberships open soon. Leave your email and we’ll come back to you as soon as you can join.';
  }
  function resetForm() {
    form.reset(); email.removeAttribute('aria-invalid');
    $('.tgs-form__error').forEach(function (e) { e.hidden = true; });
    submit.disabled = false; submit.textContent = 'Register my interest';
  }
  function open(tier, option) {
    lastFocus = document.activeElement;
    state.tier = tier;
    resetForm();
    var radio = modal.querySelector('input[name=option][value="' + (option || 'six-month') + '"]');
    if (radio) radio.checked = true;
    setTier();
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show('email');
  }
  function close() {
    modal.hidden = true;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function valid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-interest]');
    if (trigger) { e.preventDefault(); open(trigger.getAttribute('data-interest'), trigger.getAttribute('data-option')); return; }
    if (modal.hidden) return;
    if (e.target.closest('[data-close]')) { e.preventDefault(); close(); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(panel.querySelectorAll('button, a[href], input:not([tabindex="-1"]), [tabindex="0"]'),
      function (el) { return el.offsetParent !== null && !el.disabled && !(el.type === 'radio' && !el.checked); });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  email.addEventListener('input', function () {
    if (email.getAttribute('aria-invalid') === 'true' && valid(email.value.trim())) {
      email.removeAttribute('aria-invalid'); modal.querySelector('#im-email-error').hidden = true;
    }
  });
  consent.addEventListener('change', function () { if (consent.checked) modal.querySelector('#im-consent-error').hidden = true; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = email.value.trim(), ok = true;
    if (!valid(v)) { email.setAttribute('aria-invalid', 'true'); modal.querySelector('#im-email-error').hidden = false; ok = false; }
    if (!consent.checked) { modal.querySelector('#im-consent-error').hidden = false; ok = false; }
    if (!ok) { (valid(v) ? consent : email).focus(); return; }
    modal.querySelector('[data-send-error]').hidden = true;

    var data = new URLSearchParams({
      email: v,
      tier: state.tier,
      option: state.tier === 'Self' ? OPTION_LABEL[(form.querySelector('input[name=option]:checked') || {}).value] || '' : '',
      consent: 'yes',
      page: location.pathname + location.hash,
      language: navigator.language || '',
      website: form.website.value
    });
    function done() { modal.querySelector('[data-email-echo]').textContent = v; setTier(); show('thanks'); }
    if (!INTEREST_ENDPOINT) { console.info('[interest] preview mode, not sent:', Object.fromEntries(data)); done(); return; }
    submit.disabled = true; submit.textContent = 'Sending…';
    fetch(INTEREST_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data })
      .then(done)
      .catch(function () {
        submit.disabled = false; submit.textContent = 'Register my interest';
        modal.querySelector('[data-send-error]').hidden = false;
      });
  });
})();

/* Newsletter sign-up: sends to the same Google Apps Script web app as the membership pop-up (form=newsletter). */
(function () {
  function valid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  document.addEventListener('input', function (e) {
    var input = e.target.closest('.tgs-news__input');
    if (input && input.getAttribute('aria-invalid') === 'true' && valid(input.value.trim())) {
      input.removeAttribute('aria-invalid'); input.form.querySelector('[data-news-email-error]').hidden = true;
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('.tgs-news__form input[name=consent]') && e.target.checked) e.target.form.querySelector('[data-news-consent-error]').hidden = true;
  });
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.tgs-news__form');
    if (!form) return;
    e.preventDefault();
    var email = form.email, consent = form.consent, v = email.value.trim(), ok = true;
    var errEmail = form.querySelector('[data-news-email-error]'), errConsent = form.querySelector('[data-news-consent-error]'), errSend = form.querySelector('[data-news-send-error]');
    if (!valid(v)) { email.setAttribute('aria-invalid', 'true'); errEmail.hidden = false; ok = false; }
    if (!consent.checked) { errConsent.hidden = false; ok = false; }
    if (!ok) { (valid(v) ? consent : email).focus(); return; }
    errSend.hidden = true;
    var btn = form.querySelector('.tgs-news__submit');
    var data = new URLSearchParams({ form: 'newsletter', email: v, consent: 'yes', page: location.pathname + location.hash,
                                     language: navigator.language || '', website: form.website.value });
    function done() {
      var box = form.parentNode.querySelector('[data-news-done]');
      box.querySelector('[data-news-echo]').textContent = v;
      form.hidden = true; box.hidden = false; box.focus();
    }
    var endpoint = (typeof INTEREST_ENDPOINT !== 'undefined') ? INTEREST_ENDPOINT : '';
    if (!endpoint) { console.info('[newsletter] preview mode, not sent:', Object.fromEntries(data)); done(); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data })
      .then(done)
      .catch(function () { btn.disabled = false; btn.textContent = 'Subscribe'; errSend.hidden = false; });
  });
})();

/* ---- Cookie consent (Google Analytics only) ----
   Paste your Google Analytics 4 measurement ID below, e.g. 'G-XXXXXXXXXX'.
   Analytics only loads after the visitor clicks Accept. Nothing loads while the ID is empty. */
var GA4_MEASUREMENT_ID = '';
(function () {
  var KEY = 'tgs-consent', VERSION = 2, MAX_AGE_DAYS = 365;
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var gaLoaded = false;

  // Google Consent Mode v2: denied until the visitor accepts. Advertising stays denied: the site runs no ads.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (!c || c.v !== VERSION) return null;
      if ((Date.now() - c.t) / 864e5 > MAX_AGE_DAYS) return null;   // ask again after a year
      return c;
    } catch (e) { return null; }
  }
  function apply(c) {
    gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied' });
    if (c.analytics && GA4_MEASUREMENT_ID && !gaLoaded) {
      gaLoaded = true;
      var s = document.createElement('script'); s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config', GA4_MEASUREMENT_ID);
    }
  }
  function decide(accepted) {
    var before = read(), c = { analytics: accepted, v: VERSION, t: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    banner.hidden = true; manageWin.hidden = true; document.documentElement.style.overflow = '';
    if (before && before.analytics && !accepted && gaLoaded) { location.reload(); return; }   // switch Analytics off
    apply(c);
  }
  var manageWin = document.getElementById('cookie-manage');
  var analyticsSwitch = manageWin.querySelector('#ck-analytics');
  var stateLabel = manageWin.querySelector('[data-ck-state]');
  var lastFocus = null;
  function syncLabel() { stateLabel.textContent = analyticsSwitch.checked ? 'On' : 'Off'; }
  analyticsSwitch.addEventListener('change', syncLabel);
  function open(manage) {
    if (!manage) { banner.hidden = false; setTimeout(function () { var f = banner.querySelector('[data-ck="manage"]'); if (f) f.focus(); }, 30); return; }
    lastFocus = document.activeElement;
    var c = read(); analyticsSwitch.checked = !!(c && c.analytics); syncLabel();
    manageWin.hidden = false; document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { analyticsSwitch.focus(); }, 30);
  }
  function closeManage() {
    manageWin.hidden = true; document.documentElement.style.overflow = '';
    if (!read()) banner.hidden = false;          // no choice made yet: keep asking
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // Pages change via the address (#/memberships …): report them as page views.
  window.addEventListener('hashchange', function () {
    if (gaLoaded) gtag('event', 'page_view', { page_location: location.href, page_title: document.title });
  });
  banner.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ck]'); if (!b) return;
    var a = b.getAttribute('data-ck');
    if (a === 'accept') decide(true);
    else if (a === 'reject') decide(false);
    else if (a === 'manage') { banner.hidden = true; open(true); }
  });
  manageWin.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ckm]'); if (!b) return;
    if (b.getAttribute('data-ckm') === 'save') decide(analyticsSwitch.checked); else closeManage();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!manageWin.hidden) closeManage(); else if (!banner.hidden) decide(false);
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); open(true); }
  });

  var existing = read();
  if (existing) apply(existing); else open(false);
})();
