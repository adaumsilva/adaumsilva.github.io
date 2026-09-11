(() => {
 'use strict';
 document.querySelectorAll('.project-gallery').forEach(gallery=>{
  const thumbs=[...gallery.querySelectorAll('.gallery-thumbnails button')],main=gallery.querySelector('.gallery-stage img'),caption=gallery.querySelector('.gallery-caption'),count=gallery.querySelector('.gallery-count');
  const stage=gallery.querySelector('.gallery-stage'),dialog=gallery.querySelector('dialog'),full=dialog.querySelector('img'),fullCaption=gallery.querySelector('.lightbox-caption');let index=0,startX=null,startY=null,swipeUntil=0;
  function select(next){
   index=(next+thumbs.length)%thumbs.length;const current=thumbs[index];
   main.src=current.dataset.image;main.alt=current.dataset.caption;caption.textContent=current.dataset.caption;
   count.textContent=`${String(index+1).padStart(2,'0')} / ${String(thumbs.length).padStart(2,'0')}`;
   thumbs.forEach((t,i)=>t.setAttribute('aria-pressed',String(i===index)));
   if(dialog.open){full.src=current.dataset.image;full.alt=current.dataset.caption;fullCaption.textContent=`${index+1} / ${thumbs.length} · ${current.dataset.caption}`;}
  }
  thumbs.forEach((t,i)=>t.addEventListener('click',()=>select(i)));
  gallery.querySelectorAll('.gallery-prev,.lightbox-prev').forEach(b=>b.addEventListener('click',()=>select(index-1)));
  gallery.querySelectorAll('.gallery-next,.lightbox-next').forEach(b=>b.addEventListener('click',()=>select(index+1)));
  stage.addEventListener('click',()=>{if(performance.now()<swipeUntil)return;dialog.showModal();select(index);gallery.querySelector('.lightbox-close').focus();});
  gallery.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>stage.focus());
  gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();select(index+1);}if(event.key==='ArrowLeft'){event.preventDefault();select(index-1);}});
  stage.addEventListener('touchstart',event=>{startX=event.touches[0]?.clientX??null;startY=event.touches[0]?.clientY??null;},{passive:true});
  stage.addEventListener('touchend',event=>{if(startX===null)return;const dx=event.changedTouches[0].clientX-startX,dy=event.changedTouches[0].clientY-startY;startX=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.2){swipeUntil=performance.now()+400;select(index+(dx<0?1:-1));}},{passive:true});
 });
})();
