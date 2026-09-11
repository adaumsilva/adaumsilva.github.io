(() => {
 'use strict';
 const header = document.querySelector('.site-header');
 const nav = document.querySelector('#primary-nav');
 const toggle = document.querySelector('.menu-toggle');
 const hero = document.querySelector('.hero');
 const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
 const mobile = window.matchMedia('(max-width: 800px)');

 /* ---------- Mobile navigation (home page only) ---------- */
 const setMenu = (open, restoreFocus = false) => {
  if (!nav || !toggle) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
  if (restoreFocus) toggle.focus();
 };
 if (nav && toggle) {
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false, toggle.getAttribute('aria-expanded') === 'true'); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) setMenu(false); });
  header.addEventListener('focusout', () => requestAnimationFrame(() => { if (!header.contains(document.activeElement)) setMenu(false); }));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
   setMenu(false);
   const target = document.querySelector(link.getAttribute('href'));
   if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
   }
  }));
 }
 mobile.addEventListener('change', () => { setMenu(false); scheduleUpdate(); });

 /* ---------- Scroll-linked blur/fade ----------
    Elements matching FX_SELECTOR get the .fx class. Where the browser supports CSS
    view() timelines, style.css animates them on the compositor. Elsewhere updateFx()
    reproduces the same curve: blur in over the bottom 25vh, crisp while reading, blur
    out over the top 25vh. */
 const FX_SELECTOR = '.section-heading,.featured,.project-card,.about-intro,.about-details,.experience-list>details,.contributions>a,.toolkit>div:first-child,.tool-row,.certs,.education>div:first-child,.education article,.language-list,.archive>.eyebrow,.archive>a,.contact>.eyebrow,.contact-title,.ask-heading,.ask-form,.ask-suggestions,.ask-status,.case-lead,.project-gallery,.case-body>*';
 const fxNodes = [...document.querySelectorAll(FX_SELECTOR)];
 fxNodes.forEach(el => el.classList.add('fx'));
 const cssTimelines = CSS.supports('animation-timeline', 'view()') && CSS.supports('animation-range', 'cover calc(100% - 25vh)');
 const clearFx = el => { el.style.removeProperty('opacity'); el.style.removeProperty('transform'); el.style.removeProperty('filter'); };
 function updateFx() {
  if (cssTimelines) return;
  if (motionPreference.matches) { fxNodes.forEach(clearFx); return; }
  // view() timelines inset the top edge by the page's scroll-padding (the fixed header); match it.
  const vh = window.innerHeight, band = vh * .25, inset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  fxNodes.forEach(el => {
   const rect = el.getBoundingClientRect();
   if (rect.bottom <= 0 || rect.top >= vh || rect.height === 0) return;
   if (el.matches(':focus-within')) { clearFx(el); return; }
   const enter = Math.min(1, Math.max(0, (vh - rect.top) / band));
   const exit = Math.min(1, Math.max(0, 1 - (rect.bottom - inset) / band));
   let opacity, shift, blur;
   if (enter < 1) { const e = 1 - Math.pow(1 - enter, 2.5); opacity = e; shift = 44 * (1 - e); blur = 12 * (1 - e); }
   else if (exit > 0) { const e = exit * exit; opacity = 1 - e; shift = -32 * e; blur = 12 * e; }
   else { clearFx(el); return; }
   el.style.opacity = opacity.toFixed(3);
   el.style.transform = `translateY(${shift.toFixed(1)}px)`;
   el.style.filter = blur > .05 ? `blur(${blur.toFixed(2)}px)` : 'none';
  });
 }

 /* ---------- Header state, hero parallax/exit, and the per-frame loop ---------- */
 let frame = 0;
 function updateScroll() {
  frame = 0;
  const y = window.scrollY;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (header) {
   header.classList.toggle('is-scrolled', y > 16);
   header.style.setProperty('--page-progress', String(Math.min(1, Math.max(0, y / maxScroll))));
  }
  if (hero) {
   const enabled = !motionPreference.matches && !mobile.matches;
   const progress = Math.min(1, Math.max(0, y / Math.max(1, hero.offsetHeight)));
   const fade = Math.max(0, progress - .45) * 1.5;
   hero.style.setProperty('--portrait-shift', enabled ? `${Math.min(y * .12, 65)}px` : '0px');
   hero.style.setProperty('--hero-shift', enabled ? `${-Math.min(y * .065, 35)}px` : '0px');
   hero.style.setProperty('--hero-opacity', enabled ? String(Math.max(0, 1 - fade)) : '1');
   hero.style.setProperty('--hero-blur', enabled ? `${Math.min(10, fade * 12).toFixed(2)}px` : '0px');
  }
  updateFx();
 }
 function scheduleUpdate() { if (!frame) frame = requestAnimationFrame(updateScroll); }
 window.addEventListener('scroll', scheduleUpdate, { passive: true });
 window.addEventListener('resize', scheduleUpdate, { passive: true });
 window.addEventListener('load', scheduleUpdate);
 window.addEventListener('preloader:done', scheduleUpdate);
 document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', scheduleUpdate));
 if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(document.body);
 motionPreference.addEventListener('change', scheduleUpdate);
 scheduleUpdate();

 /* ---------- Active section in the nav, animated counters ---------- */
 if ('IntersectionObserver' in window) {
  if (nav) {
   const links = [...nav.querySelectorAll('a[href^="#"]')];
   const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
     if (entry.isIntersecting) {
      links.forEach(link => {
       if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
       else link.removeAttribute('aria-current');
      });
     }
    });
   }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
   links.forEach(link => { const section = document.querySelector(link.hash); if (section) sectionObserver.observe(section); });
  }
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   countObserver.unobserve(entry.target);
   if (motionPreference.matches) return;
   const el = entry.target, target = Number(el.dataset.count), start = performance.now();
   const render = time => {
    const p = Math.min(1, (time - start) / 1150);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1 && !motionPreference.matches) requestAnimationFrame(render);
    else el.textContent = String(target);
   };
   requestAnimationFrame(render);
  }), { threshold: .8 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
 }
})();
