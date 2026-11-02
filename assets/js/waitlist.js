/* The Good Span · waitlist add-on ("Interested in practising your Good Span?")
   Sends sign-ups to the same Google Apps Script web app as the site's other forms (form=waitlist),
   saved in the "Waitlist" tab. It uses the site's INTEREST_ENDPOINT if defined, otherwise the URL below.
   Any button or link with data-wl-open opens the form; add data-wl-level="Core" (Self, Core, Concierge)
   to open it with that level already selected. */
(function () {
  var FALLBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzhYXNj7269278GSDccQ7tGHyM-v3_bEnIMnj26jx4cR2T_QmxpqyUrxTZXFKfEj9qR/exec';
  var BUTTON_TEXT = 'Keep me informed when memberships open';
  var modal = document.getElementById('tgs-wl-modal');
  if (!modal) return;
  if (modal.parentNode !== document.body) document.body.appendChild(modal);   // keep the pop-up above everything
  var panel = modal.querySelector('.tgs-wl-modal__panel');
  var form = modal.querySelector('[data-wl-step="form"]');
  var thanks = modal.querySelector('[data-wl-step="thanks"]');
  var email = form.querySelector('input[name="email"]');
  var consent = form.querySelector('input[name="consent"]');
  var submit = form.querySelector('[data-wl-submit]');
  var radios = form.querySelectorAll('input[name="level"]');
  var lastFocus = null;

  function err(name, show) { var e = form.querySelector('[data-wl-err="' + name + '"]'); if (e) e.hidden = !show; }
  function valid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function chosen() { return form.querySelector('input[name="level"]:checked'); }
  function sync() { radios.forEach(function (r) { r.closest('.tgs-wl-opt').classList.toggle('is-checked', r.checked); }); }
  function endpoint() { return (typeof INTEREST_ENDPOINT !== 'undefined' && INTEREST_ENDPOINT) ? INTEREST_ENDPOINT : FALLBACK_ENDPOINT; }

  function open(level) {
    lastFocus = document.activeElement;
    form.reset(); email.removeAttribute('aria-invalid');
    ['level', 'email', 'consent', 'send'].forEach(function (n) { err(n, false); });
    submit.disabled = false; submit.textContent = BUTTON_TEXT;
    if (level) radios.forEach(function (r) { if (r.value === level) r.checked = true; });
    sync();
    form.hidden = false; thanks.hidden = true;
    modal.hidden = false; document.documentElement.style.overflow = 'hidden'; panel.scrollTop = 0;
    setTimeout(function () { (chosen() || radios[0]).focus(); }, 30);
  }
  function close() {
    modal.hidden = true; document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-wl-open]');
    if (t) { e.preventDefault(); open(t.getAttribute('data-wl-level')); return; }
    if (!modal.hidden && e.target.closest('[data-wl-close]')) { e.preventDefault(); close(); }
  });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].filter.call(panel.querySelectorAll('button, a[href], input:not([tabindex="-1"])'), function (el) {
      if (el.disabled || !el.closest('[data-wl-step]') && !el.matches('.tgs-wl-modal__close')) return false;
      var step = el.closest('[data-wl-step]'); if (step && step.hidden) return false;
      if (el.type === 'radio') return chosen() ? el.checked : el === radios[0];
      return true;
    });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  radios.forEach(function (r) {
    r.addEventListener('focus', function () { r.closest('.tgs-wl-opt').classList.add('is-focus'); });
    r.addEventListener('blur', function () { r.closest('.tgs-wl-opt').classList.remove('is-focus'); });
  });
  form.addEventListener('change', function (e) {
    if (e.target.name === 'level') { sync(); err('level', false); }
    if (e.target.name === 'consent' && consent.checked) err('consent', false);
  });
  email.addEventListener('input', function () {
    if (email.getAttribute('aria-invalid') === 'true' && valid(email.value.trim())) { email.removeAttribute('aria-invalid'); err('email', false); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var level = chosen(), v = email.value.trim(), ok = true;
    if (!level) { err('level', true); ok = false; }
    if (!valid(v)) { email.setAttribute('aria-invalid', 'true'); err('email', true); ok = false; }
    if (!consent.checked) { err('consent', true); ok = false; }
    if (!ok) { (!level ? radios[0] : !valid(v) ? email : consent).focus(); return; }
    err('send', false);
    var data = new URLSearchParams({ form: 'waitlist', level: level.value, email: v, consent: 'yes',
      page: location.pathname + location.hash, language: navigator.language || '', website: form.website.value });
    function done() {
      form.hidden = true; thanks.hidden = false; panel.scrollTop = 0;
      setTimeout(function () { thanks.querySelector('.tgs-wl-thanks__title').focus(); }, 30);
    }
    var url = endpoint();
    if (!url) { console.info('[waitlist] preview mode, not sent:', Object.fromEntries(data)); done(); return; }
    submit.disabled = true; submit.textContent = 'Sending…';
    fetch(url, { method: 'POST', mode: 'no-cors', body: data })
      .then(done)
      .catch(function () { submit.disabled = false; submit.textContent = BUTTON_TEXT; err('send', true); });
  });
})();
