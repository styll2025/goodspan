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
  window.addEventListener('resize', function () { if (innerWidth > 1180) closeAll(); });
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
  var state = { tier: '' }, lastFocus = null, sendToken = 0;

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
    sendToken++;
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
    sendToken++;
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
    function failSend() {
      show('email');
      submit.disabled = false; submit.textContent = 'Register my interest';
      modal.querySelector('[data-send-error]').hidden = false;
    }
    /* The sheet usually answers after a few seconds. Confirm straight away, and
       only come back to the form if the sheet actually rejects the sign-up. */
    var token = ++sendToken;
    done();
    if (!INTEREST_ENDPOINT) { console.info('[interest] preview mode, not sent:', Object.fromEntries(data)); return; }
    fetch(INTEREST_ENDPOINT, { method: 'POST', body: data, keepalive: true })
      .then(function (res) { if (!res.ok) throw new Error('status'); return res.json(); })
      .then(function (json) {
        if (token !== sendToken) return;
        if (!json || json.ok !== true) failSend();
      })
      .catch(function () {
        if (token !== sendToken || modal.hidden) return;
        failSend();
      });
  });
})();
