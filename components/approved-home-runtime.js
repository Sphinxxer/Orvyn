import { whatsappHref, whatsappNumber } from "../data/whatsapp";
export default function initializeHome(gsap, Motion) {
const disposers=[]; function listen(type,fn,options){window.addEventListener(type,fn,options);disposers.push(()=>window.removeEventListener(type,fn,options));}
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');

 document.querySelectorAll('[data-whatsapp],[data-service]').forEach(a=>{a.href=a.dataset.whatsapp==='hero'?`https://wa.me/${whatsappNumber}?${new URLSearchParams({text:'Hello, Get A CRO Audit'})}`:a.classList.contains('whatsapp-float')?`https://wa.me/${whatsappNumber}?${new URLSearchParams({text:'He, I would like to get in touch'})}`:whatsappHref();a.dataset.analyticsEvent='whatsapp_enquiry_clicked';a.dataset.analyticsPlacement=a.dataset.whatsapp||'home';});
 document.querySelectorAll('a[target="_blank"]').forEach(a=>{const note=document.createElement('span');note.className='sr-only';note.textContent=' (opens in a new tab)';a.append(note)});
 let heroTimeline;const media=gsap.matchMedia();
 media.add({desktop:'(min-width:701px)',mobile:'(max-width:700px)',reduce:'(prefers-reduced-motion:reduce)'},ctx=>{
   if(ctx.conditions.reduce)return;
   heroTimeline=gsap.timeline({defaults:{ease:'power3.out',duration:.85}})
    .from('.hero-copy h1',{y:12,opacity:.8,clearProps:'transform,opacity'},0)
    .from('.hero-copy > p',{y:8,opacity:.8,clearProps:'transform,opacity'},.12)
    .from('.hero-copy .actions',{y:8,opacity:.85,clearProps:'transform,opacity'},.22)
    .from('.desktop-screen',{x:ctx.conditions.desktop?18:0,y:12,scale:.985,opacity:.85,clearProps:'transform,opacity'},.06)
    .from('.phone-screen',{y:20,rotation:1.5,opacity:.85,clearProps:'transform,opacity'},.18)
    .from('.hero-mascot',{y:16,rotation:-5,scale:.94,transformOrigin:'50% 90%',clearProps:'transform,opacity'},.32);
   return()=>{heroTimeline=null};
 });
 const running=new WeakMap();
 document.querySelectorAll('a,button').forEach(control=>{
  if(control.dataset.whatsapp==='hero')return;
  const run=(keyframes,options)=>{running.get(control)?.stop();const animation=Motion.animate(control,keyframes,options);running.set(control,animation)};
  const release=()=>run(reduced.matches?{opacity:1}:{scale:1,opacity:1},{type:reduced.matches?'tween':'spring',duration:.25,bounce:.08});
  control.addEventListener('pointerdown',()=>run(reduced.matches?{opacity:.72}:{scale:.96,opacity:.85},{duration:.08,ease:'easeOut'}));
  control.addEventListener('pointerup',release);control.addEventListener('pointercancel',release);control.addEventListener('pointerleave',release);control.addEventListener('blur',release);
  control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){run(reduced.matches?{opacity:.72}:{scale:.96,opacity:.85},{duration:.08})}});control.addEventListener('keyup',e=>{if(e.key==='Enter'||e.key===' ')release()});
 });
 listen('orvyn-home-cleanup',()=>{media.revert();document.querySelectorAll('a,button').forEach(c=>running.get(c)?.stop())},{once:true});
})();



// A single GSAP interaction owns the hero CTA, including touch and keyboard feedback.
(()=>{
 const button=document.querySelector('[data-whatsapp="hero"]');
 const icon=button.querySelector('.audit-button-icon'),arrow=icon.querySelector('.arrow');
 const media=gsap.matchMedia();
 media.add({motion:'(prefers-reduced-motion:no-preference)',fine:'(hover:hover) and (pointer:fine)'},context=>{
  let hovered=false,focused=false;
  const animate=()=>{
   const active=hovered||focused,duration=context.conditions.motion?.32:0;
   gsap.to(button,{y:active?-2:0,boxShadow:active?'0 8px 18px rgba(35,39,32,0.14)':'0 2px 4px rgba(35,39,32,0.08)',duration,ease:'power3.out',overwrite:'auto'});
   gsap.to(icon,{rotation:active?0:-4,duration,ease:'power3.out',overwrite:'auto'});
   gsap.to(arrow,{x:active?2:0,y:active?-2:0,duration,ease:'power3.out',overwrite:'auto'});
  };
  const enter=()=>{if(context.conditions.fine){hovered=true;animate()}};
  const leave=()=>{hovered=false;release();animate()};
  const focus=()=>{focused=true;animate()},blur=()=>{focused=false;release();animate()};
  const press=()=>gsap.to(button,{scale:context.conditions.motion?.975:1,duration:.12,overwrite:'auto'});
  const release=()=>gsap.to(button,{scale:1,duration:context.conditions.motion?.28:0,ease:'power3.out',overwrite:'auto'});
  const keydown=e=>{if(e.key==='Enter')press()},keyup=e=>{if(e.key==='Enter')release()};
  const handlers={pointerenter:enter,pointerleave:leave,pointerdown:press,pointerup:release,pointercancel:release,focus,blur,keydown,keyup};
  Object.entries(handlers).forEach(([type,fn])=>button.addEventListener(type,fn));
  return()=>{Object.entries(handlers).forEach(([type,fn])=>button.removeEventListener(type,fn));gsap.killTweensOf([button,icon,arrow])};
 });
 listen('orvyn-home-cleanup',()=>media.revert(),{once:true});
})();

// Continuous client strip: duplicate artwork stays out of the reading order.
(()=>{
 const section=document.querySelector('.clients'),track=section.querySelector('.client-names');
 const media=gsap.matchMedia();
 media.add('(prefers-reduced-motion:no-preference)',()=>{
  let visible=false;
  const tween=gsap.to(track,{xPercent:-50,duration:30,ease:'none',repeat:-1,paused:true});
  const sync=()=>{if(!visible||document.hidden)tween.pause();else tween.play()};
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()});observer.observe(section);
  document.addEventListener('visibilitychange',sync);
  return()=>{observer.disconnect();tween.kill();gsap.set(track,{clearProps:'transform'});document.removeEventListener('visibilitychange',sync)};
 });
 listen('orvyn-home-cleanup',()=>media.revert(),{once:true});
})();

// Manual presentation on desktop; controlled automatic advance on phones.
(()=>{
 const section=document.querySelector('.showcase'),track=section.querySelector('.showcase-track'),slides=[...track.children],prev=section.querySelector('.showcase-prev'),next=section.querySelector('.showcase-next'),status=section.querySelector('.showcase-status');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:700px)');
 let frame,timer,visible=false,userPaused=false;
 const geometry=()=>({step:slides[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap),visible:mobile.matches?1:innerWidth<=1100?2:3});
 function update(){const{step,visible:count}=geometry();const index=Math.min(slides.length-count,Math.max(0,Math.round(track.scrollLeft/step)));prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;status.textContent=count===1?`Project ${index+1} of ${slides.length}`:`Projects ${index+1}–${Math.min(index+count,slides.length)} of ${slides.length}`;}
 function sync(){clearTimeout(timer);timer=null;const eligible=mobile.matches&&!reduced.matches;track.setAttribute('aria-label',eligible&&!userPaused?'Project showcase. Advances automatically; swipe or use an arrow button to take manual control.':'Project showcase. Use arrow buttons or swipe to browse.');status.setAttribute('aria-live',eligible&&!userPaused?'off':'polite');if(eligible&&!userPaused&&visible&&!document.hidden){timer=setTimeout(()=>{const{step}=geometry();const current=Math.round(track.scrollLeft/step);track.scrollTo({left:((current+1)%slides.length)*step,behavior:'smooth'});sync()},3000)}}
 function pause(){userPaused=true;sync()}
 function move(direction){pause();const{step}=geometry();track.scrollBy({left:direction*step,behavior:reduced.matches?'instant':'smooth'})}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 let pointerStart;track.addEventListener('pointerdown',event=>{pointerStart={x:event.clientX,y:event.clientY}},{passive:true});track.addEventListener('pointermove',event=>{if(!pointerStart)return;const dx=Math.abs(event.clientX-pointerStart.x),dy=Math.abs(event.clientY-pointerStart.y);if(dx>12&&dx>dy){pause();pointerStart=null}},{passive:true});track.addEventListener('pointerup',()=>{pointerStart=null},{passive:true});track.addEventListener('pointercancel',()=>{pointerStart=null},{passive:true});track.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY))pause()},{passive:true});
 let touchStart;track.addEventListener('touchstart',event=>{const t=event.touches[0];if(t)touchStart={x:t.clientX,y:t.clientY}},{passive:true});track.addEventListener('touchmove',event=>{const t=event.touches[0];if(!t||!touchStart)return;const dx=Math.abs(t.clientX-touchStart.x),dy=Math.abs(t.clientY-touchStart.y);if(dx>12&&dx>dy){pause();touchStart=null}},{passive:true});track.addEventListener('touchend',()=>{touchStart=null},{passive:true});
 section.addEventListener('focusin',pause);
 track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)},{passive:true});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}else if(event.key==='Home'||event.key==='End'){event.preventDefault();pause();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:reduced.matches?'instant':'smooth'})}});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.25;sync()},{threshold:.25});observer.observe(track);
 document.addEventListener('visibilitychange',sync);listen('resize',()=>{update();sync()});mobile.addEventListener('change',sync);reduced.addEventListener('change',sync);listen('orvyn-home-cleanup',()=>{clearTimeout(timer);cancelAnimationFrame(frame);observer.disconnect()});listen('pageshow',event=>{if(event.persisted){observer.observe(track);sync()}});update();sync();
})();

// Service choices arrive in reading order; every card is readable without JavaScript.
(()=>{
 const media=gsap.matchMedia();let observer;
 media.add('(prefers-reduced-motion:no-preference)',()=>{
  const cards=[...document.querySelectorAll('.service-card')];
  observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const card=entry.target,index=cards.indexOf(card);gsap.fromTo(card,{y:16,opacity:.8},{y:0,opacity:1,duration:.85,delay:innerWidth>700?index*.1:0,ease:'power2.out',clearProps:'transform,opacity'});observer.unobserve(card)})},{threshold:.18,rootMargin:'0px 0px -24px 0px'});
  cards.forEach(card=>observer.observe(card));return()=>{observer.disconnect();gsap.set(cards,{clearProps:'transform,opacity'})};
 });
 listen('orvyn-home-cleanup',()=>media.revert(),{once:true});
})();


// Reveal evidence as it enters view; all content starts readable without animation.
(()=>{
 const media=gsap.matchMedia();
 media.add('(prefers-reduced-motion:no-preference)',()=>{
  const targets=[...document.querySelectorAll('.trust-artifact,.trust-reasons article,.closing-inner')];
  const animated=new Set();
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    observer.unobserve(entry.target);
    const target=entry.target;animated.add(target);
    if(target.matches('.trust-artifact')) {
     const image=target.querySelector('img');animated.add(image);
     gsap.fromTo(image,{clipPath:'inset(0% 0% 9% 0%)',scale:1.025},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:1.05,ease:'power3.out',clearProps:'clipPath,transform'});
    } else if(target.matches('.closing-inner')) {
     const mascot=target.querySelector('img');animated.add(mascot);
     gsap.timeline({defaults:{ease:'power3.out'}})
      .fromTo(mascot,{y:16,rotation:-5},{y:0,rotation:2,duration:.7})
      .to(mascot,{rotation:0,duration:.5,clearProps:'transform'});
    } else {
     gsap.fromTo(target,{x:10,opacity:.8},{x:0,opacity:1,duration:.8,ease:'power3.out',clearProps:'transform,opacity'});
    }
   });
  },{threshold:.18,rootMargin:'0px 0px -20px 0px'});
  targets.forEach(target=>observer.observe(target));
  return()=>{observer.disconnect();animated.forEach(target=>{gsap.killTweensOf(target);gsap.set(target,{clearProps:'transform,opacity,clipPath'})})};
 });
 listen('orvyn-home-cleanup',()=>media.revert(),{once:true});
})();

(()=>{const button=document.querySelector('.whatsapp-float');const update=()=>{const footer=document.querySelector('.site-footer');const show=scrollY>innerHeight&&footer.getBoundingClientRect().top>=innerHeight;button.classList.toggle('is-visible',show);button.inert=!show};listen('scroll',update,{passive:true});listen('resize',update);listen('pageshow',update);update()})();

return ()=>{window.dispatchEvent(new Event("orvyn-home-cleanup"));disposers.forEach(dispose=>dispose());};
}
