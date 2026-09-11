/* Loading screen. Holds the page (html.is-loading pauses the hero headline and locks
   scroll) until the window load event and web fonts are in, animates a counter toward
   100, then wipes the overlay away. Capped so a slow asset can never trap the visitor. */
(() => {
 'use strict';
 const root = document.documentElement, shell = document.getElementById('preloader');
 const release = () => root.classList.remove('is-loading');
 if (!shell) { release(); return; }
 root.classList.add('is-loading');
 const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let revisit = false;
 try { revisit = sessionStorage.getItem('adam-preloader') === '1'; } catch { /* storage unavailable */ }
 const MIN_MS = reduceMotion ? 0 : revisit ? 250 : 1000, MAX_MS = 4500;
 const count = shell.querySelector('.preloader-count'), bar = shell.querySelector('.preloader-bar>span');
 const start = performance.now();
 let ready = false, shown = 0, done = false, frame = 0;
 const loaded = new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
 });
 // fonts.ready is read after load so it covers the faces the page actually requested.
 loaded.then(() => document.fonts ? document.fonts.ready : null).catch(() => {}).then(() => { ready = true; });
 const cap = setTimeout(() => { ready = true; }, MAX_MS);
 function paint(value) {
  shown = value;
  if (count) count.textContent = String(Math.round(value)).padStart(3, '0');
  if (bar) bar.style.transform = `scaleX(${(value / 100).toFixed(3)})`;
 }
 function tick(now) {
  const elapsed = now - start;
  // Creep toward 90% while assets load; sprint to 100 once everything is in.
  const target = ready ? 100 : Math.min(90, 90 * (1 - Math.exp(-elapsed / 1100)));
  const next = reduceMotion ? target : shown + (target - shown) * (ready ? .22 : .1);
  paint(next);
  if (ready && elapsed >= MIN_MS && next > 99.3) { paint(100); finish(); return; }
  frame = requestAnimationFrame(tick);
 }
 function finish() {
  if (done) return;
  done = true;
  clearTimeout(cap);
  cancelAnimationFrame(frame);
  try { sessionStorage.setItem('adam-preloader', '1'); } catch { /* storage unavailable */ }
  shell.classList.add('is-done');
  release();
  window.dispatchEvent(new CustomEvent('preloader:done'));
  setTimeout(() => shell.remove(), reduceMotion ? 0 : 1000);
 }
 // Pages restored from the back/forward cache are already painted; skip straight through.
 window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
 frame = requestAnimationFrame(tick);
})();
