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
  window.addEventListener('resize', function () { if (innerWidth > 1320) closeAll(); });
})();
