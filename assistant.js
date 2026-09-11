/* Portfolio assistant UI. Two front-ends — the "Ask Adam" section under the hero and the
   floating dialog — share one retrieval index built from knowledge.json (see retrieval.js).
   Answers are extractive: only reviewed passages are shown, each linked to its source. */
(() => {
 'use strict';
 const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const LOAD_ERROR = 'The sources couldn’t load. Please check your connection and try again. You can also open the résumé directly.';
 let index = null, loading = null;

 async function loadKnowledge() {
  if (index) return index;
  if (!loading) loading = (async () => {
   const response = await fetch(new URL('knowledge.json', document.baseURI), { credentials: 'same-origin' });
   if (!response.ok) throw Error('Source data unavailable');
   const data = await response.json();
   if (!Array.isArray(data.records) || !data.records.length) throw Error('Source data is empty');
   index = PortfolioRetrieval.create(data.records);
   return index;
  })().catch(error => { loading = null; throw error; });
  return loading;
 }

 function addText(tag, text, className) {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
 }
 function jumpTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (target.tagName === 'DETAILS') target.open = true;
  target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
 }
 // All citations stay within the reviewed static content; never use user-supplied URLs.
 function sourceLink(record, beforeJump) {
  const link = document.createElement('a');
  link.textContent = record.source + ' ↗';
  if (/^#[a-z0-9-]+$/.test(record.href)) {
   link.href = record.href;
   link.addEventListener('click', event => { event.preventDefault(); if (beforeJump) beforeJump(); jumpTo(record.href); });
  } else if (/^resume\.pdf#page=[1-4]$/.test(record.href)) {
   link.href = record.href; link.target = '_blank'; link.rel = 'noopener';
  } else return null;
  return link;
 }
 function renderPassages(answer, beforeJump) {
  const fragment = document.createDocumentFragment();
  answer.results.forEach(record => {
   const link = sourceLink(record, beforeJump);
   if (!link) return;
   const passage = document.createElement('article');
   passage.className = 'answer-passage';
   passage.append(addText('h4', record.title), addText('p', record.text), link);
   fragment.append(passage);
  });
  return fragment;
 }
 const statusFor = answer => answer.status === 'found'
  ? `${answer.results.length} source ${answer.results.length === 1 ? 'passage' : 'passages'} found.`
  : 'No supporting information found.';
 const clean = value => String(value || '').trim().slice(0, 400);

 /* ---------- Inline "Ask Adam" section ---------- */
 const section = document.querySelector('#ask');
 if (section) {
  const form = section.querySelector('#ask-form'), input = section.querySelector('#ask-query'), send = section.querySelector('#ask-send');
  const log = section.querySelector('#ask-log'), status = section.querySelector('#ask-status');
  const idleStatus = status.textContent;
  const MAX_RESULTS = 4;
  let head = null;
  function ensureHead() {
   if (head) return head;
   head = document.createElement('div');
   head.className = 'ask-log-head';
   const clear = addText('button', 'Clear results ×', 'ask-clear');
   clear.type = 'button';
   clear.addEventListener('click', () => { log.replaceChildren(); head = null; log.hidden = true; status.textContent = idleStatus; input.focus(); });
   head.append(addText('span', 'ANSWERS · NEWEST FIRST', 'mono'), clear);
   log.prepend(head);
   return head;
  }
  async function ask(query) {
   query = clean(query);
   if (!query || send.disabled) return;
   send.disabled = true;
   section.setAttribute('aria-busy', 'true');
   status.textContent = 'SEARCHING THE PORTFOLIO AND RÉSUMÉ…';
   input.value = '';
   log.hidden = false;
   ensureHead();
   const result = document.createElement('article');
   result.className = 'ask-result ask-enter';
   result.tabIndex = -1;
   const question = addText('p', 'Q /', 'ask-result-q mono');
   question.append(addText('span', query));
   const thinking = addText('div', '', 'ask-thinking');
   thinking.append(addText('span', 'Reading the sources'), document.createElement('i'), document.createElement('i'), document.createElement('i'));
   result.append(question, thinking);
   head.after(result);
   [...log.querySelectorAll('.ask-result')].forEach((item, i) => { item.classList.toggle('is-past', i > 0); if (i >= MAX_RESULTS) item.remove(); });
   // A brief beat so the answer visibly arrives instead of popping in mid-keystroke.
   const beat = new Promise(resolve => setTimeout(resolve, reduceMotion.matches ? 0 : 320));
   try {
    const [engine] = await Promise.all([loadKnowledge(), beat]);
    const answer = engine.search(query);
    const passages = document.createElement('div');
    passages.className = 'ask-passages';
    passages.append(renderPassages(answer));
    thinking.replaceWith(addText('p', answer.message, 'ask-result-msg'), passages);
    status.textContent = statusFor(answer).toUpperCase();
   } catch {
    thinking.replaceWith(addText('p', LOAD_ERROR, 'ask-result-msg'));
    status.textContent = 'SEARCH UNAVAILABLE · YOU CAN RETRY';
   } finally {
    send.disabled = false;
    section.removeAttribute('aria-busy');
    // Keep the search bar pinned under the header with the answer flowing beneath it.
    const rect = result.getBoundingClientRect();
    if (rect.bottom > window.innerHeight || rect.top < 0) form.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
   }
  }
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  section.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
  // "/" focuses the search bar from anywhere on the page, like a search-first app.
  document.addEventListener('keydown', event => {
   if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
   const active = document.activeElement, typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
   if (typing || document.querySelector('dialog[open]')) return;
   event.preventDefault();
   input.focus();
   input.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
  });
  input.addEventListener('focus', () => { loadKnowledge().catch(() => { status.textContent = 'THE SOURCES COULDN’T LOAD · PLEASE TRY AGAIN'; }); }, { once: true });
 }

 /* ---------- Floating dialog ---------- */
 const openButton = document.querySelector('#assistant-open'), dialog = document.querySelector('#assistant-dialog');
 if (openButton && dialog) {
  const closeButton = dialog.querySelector('#assistant-close'), form = dialog.querySelector('#assistant-form'), input = dialog.querySelector('#assistant-query');
  const log = dialog.querySelector('#assistant-log'), status = dialog.querySelector('#assistant-status'), send = dialog.querySelector('#assistant-send');
  const close = () => dialog.close();
  openButton.addEventListener('click', () => {
   dialog.showModal();
   openButton.setAttribute('aria-expanded', 'true');
   input.focus();
   loadKnowledge().catch(() => { status.textContent = 'The sources couldn’t load. Please try searching again.'; });
  });
  closeButton.addEventListener('click', close);
  dialog.addEventListener('close', () => { openButton.setAttribute('aria-expanded', 'false'); openButton.focus(); });
  dialog.addEventListener('click', event => {
   if (event.target !== dialog) return;
   const r = dialog.getBoundingClientRect();
   if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
  });
  async function ask(query) {
   query = clean(query);
   if (!query || send.disabled) return;
   send.disabled = true;
   status.textContent = 'Searching the portfolio and résumé…';
   const question = addText('p', query, 'assistant-question');
   log.append(question);
   input.value = '';
   try {
    const engine = await loadKnowledge(), answer = engine.search(query), box = document.createElement('div');
    box.className = 'assistant-answer';
    box.append(addText('p', answer.message), renderPassages(answer, close));
    log.append(box);
    status.textContent = statusFor(answer);
   } catch {
    log.append(addText('p', LOAD_ERROR, 'assistant-answer'));
    status.textContent = 'Search unavailable. You can retry.';
   } finally {
    send.disabled = false;
    question.scrollIntoView({ block: 'start', behavior: 'auto' });
    input.focus();
   }
  }
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  dialog.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
  // The floating button duplicates the section while the section is on screen; tuck it away.
  if (section && 'IntersectionObserver' in window) {
   new IntersectionObserver(entries => entries.forEach(entry => {
    openButton.classList.toggle('is-hidden', entry.isIntersecting && !dialog.open);
   }), { threshold: .3 }).observe(section);
  }
 }
})();
