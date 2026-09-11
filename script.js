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
    Elements matching FX_SELECTOR get the .fx class (FX_IN_SELECTOR: entrance only, for
    blocks people interact with). Where the browser supports CSS view() timelines,
    style.css animates them on the compositor. Elsewhere updateFx() reproduces the same
    curve: fade/blur in over the bottom 40vh of the viewport, crisp while reading,
    fade/blur out over the 40vh above the fixed header. Keep FX_BAND and the easing in
    step with the animation-range and cubic-bezier values in style.css. */
 const FX_SELECTOR = '.section-heading,.featured,.project-card,.about-intro,.about-details,.experience-list>details,.contributions>a,.toolkit>div:first-child,.tool-row,.certs,.education>div:first-child,.education article,.language-list,.archive>.eyebrow,.archive>a,.contact-title,.ask-heading,.case-lead,.case-body>*';
 const FX_IN_SELECTOR = '.ask-form,.ask-suggestions,.ask-status,.project-gallery';
 const FX_BAND = .4, FX_SHIFT_IN = 56, FX_SHIFT_OUT = 40, FX_BLUR = 14;
 const fxNodes = [...document.querySelectorAll(FX_SELECTOR)];
 fxNodes.forEach(el => el.classList.add('fx'));
 document.querySelectorAll(FX_IN_SELECTOR).forEach(el => { el.classList.add('fx', 'fx--in'); fxNodes.push(el); });
 const cssTimelines = CSS.supports('animation-timeline', 'view()') && CSS.supports('animation-range', 'cover calc(100% - 40vh)');
 const clamp01 = value => Math.min(1, Math.max(0, value));
 const easeInOut = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
 const clearFx = el => { el.style.removeProperty('opacity'); el.style.removeProperty('transform'); el.style.removeProperty('filter'); };
 // The fixed header hides what slides under it, and view() timelines inset their top edge by
 // scroll-padding-top for the same reason; measure the same line so both paths agree.
 const topInset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
 function updateFx() {
  if (cssTimelines) return;
  if (motionPreference.matches) { fxNodes.forEach(clearFx); return; }
  const vh = window.innerHeight, band = vh * FX_BAND, inset = topInset();
  fxNodes.forEach(el => {
   const rect = el.getBoundingClientRect();
   if (rect.bottom <= 0 || rect.top >= vh || rect.height === 0) return;
   if (el.matches(':focus-within')) { clearFx(el); return; }
   const enter = clamp01((vh - rect.top) / band);
   const exit = el.classList.contains('fx--in') ? 0 : clamp01(1 - (rect.bottom - inset) / band);
   let opacity, shift, blur;
   if (enter < 1) { const e = easeInOut(enter); opacity = e; shift = FX_SHIFT_IN * (1 - e); blur = FX_BLUR * (1 - e); }
   else if (exit > 0) { const e = easeInOut(exit); opacity = 1 - e; shift = -FX_SHIFT_OUT * e; blur = FX_BLUR * e; }
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
   // The hero exits on the same curve as the .fx blocks: gone by the time it reaches the header.
   const grid = hero.querySelector('.hero-grid') || hero;
   const fade = enabled ? easeInOut(clamp01(1 - (grid.getBoundingClientRect().bottom - topInset()) / (window.innerHeight * FX_BAND))) : 0;
   hero.style.setProperty('--portrait-shift', enabled ? `${Math.min(y * .12, 65)}px` : '0px');
   hero.style.setProperty('--hero-shift', enabled ? `${-Math.min(y * .065, 35)}px` : '0px');
   hero.style.setProperty('--hero-opacity', String(1 - fade));
   hero.style.setProperty('--hero-blur', `${(FX_BLUR * fade).toFixed(2)}px`);
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
