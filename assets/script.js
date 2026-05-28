/* ============================================
   GREEN BOX AGENCY — SITE JS
   greenboxagency.com
   ============================================ */
(function () {
  'use strict';

  /* 1) HEADER SCROLL SHADOW */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 2) MOBILE HAMBURGER TOGGLE */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function openNav() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('open')) return;
      if (navLinks.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* 3) FADE-IN ON SCROLL */
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 4) ACTIVE NAV LINK */
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* 5) CONTACT FORM SUCCESS MESSAGE (Netlify) */
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    form.addEventListener('submit', function () {
      // Allow Netlify to process the submission, then show the message.
      var box = document.querySelector('.form-success');
      if (box) {
        setTimeout(function () {
          box.classList.add('show');
          box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      }
    });
  }

  /* 6) FOOTER YEAR */
  var yr = document.querySelector('[data-year]');
  if (yr) { yr.textContent = new Date().getFullYear(); }

})();
