/* =====================================================================
   Let's Art Barbershop — interactions
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Embers (rising sparks) ---------- */
  function buildEmbers() {
    var box = document.querySelector('.embers');
    if (!box) return;
    var n = window.innerWidth < 600 ? 14 : 22;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      e.style.left = Math.random() * 100 + '%';
      var dur = 9 + Math.random() * 12;
      e.style.animationDuration = dur + 's';
      e.style.animationDelay = (-Math.random() * dur) + 's';
      var s = 2 + Math.random() * 2.5;
      e.style.width = e.style.height = s + 'px';
      e.style.opacity = String(0.4 + Math.random() * 0.5);
      box.appendChild(e);
    }
  }

  /* ---------- 2. Reveal on scroll ---------- */
  function setupReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. Topbar scrolled state + parallax + dock ---------- */
  function setupScroll() {
    var topbar = document.querySelector('.topbar');
    var dock = document.querySelector('.dock');
    var hero = document.querySelector('.hero');
    var logo = document.querySelector('.hero-logo');
    var glows = document.querySelectorAll('.glow');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        if (topbar) topbar.classList.toggle('scrolled', y > 60);
        if (dock) dock.classList.toggle('show', y > 420);
        /* hero parallax */
        if (logo && y < window.innerHeight) {
          logo.style.transform = 'translateY(' + (y * 0.22) + 'px) scale(' + (1 - Math.min(y / 2600, 0.12)) + ')';
          logo.style.opacity = String(Math.max(1 - y / 520, 0));
        }
        /* background drift with scroll */
        for (var i = 0; i < glows.length; i++) {
          glows[i].style.marginTop = (y * (0.04 + i * 0.02)) + 'px';
        }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 4. Animated counters ---------- */
  function setupCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var dec = (el.getAttribute('data-dec') === '1');
        var dur = 1100, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = target * eased;
          el.textContent = dec ? v.toFixed(1).replace('.', ',') : Math.round(v);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = dec ? target.toFixed(1).replace('.', ',') : target;
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Language toggle (PL / EN) ---------- */
  function setupLang() {
    var btns = document.querySelectorAll('.lang button');
    var saved = null;
    try { saved = localStorage.getItem('lab_lang'); } catch (e) {}
    function apply(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-pl]').forEach(function (el) {
        var txt = el.getAttribute('data-' + lang);
        if (txt != null) el.textContent = txt;
      });
      document.querySelectorAll('[data-pl-aria]').forEach(function (el) {
        var t = el.getAttribute('data-' + lang + '-aria');
        if (t != null) el.setAttribute('aria-label', t);
      });
      btns.forEach(function (b) { b.classList.toggle('active', b.dataset.lang === lang); });
      try { localStorage.setItem('lab_lang', lang); } catch (e) {}
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.lang); });
    });
    apply(saved === 'en' ? 'en' : 'pl');
  }

  /* ---------- 6. Highlight today's hours ---------- */
  function highlightToday() {
    var today = new Date().getDay(); // 0 = Sunday
    var row = document.querySelector('.hours-row[data-day="' + today + '"]');
    if (row) row.classList.add('today');
  }

  /* ---------- init ---------- */
  function init() {
    highlightToday();
    buildEmbers();
    setupReveal();
    setupScroll();
    setupCounters();
    setupLang();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
