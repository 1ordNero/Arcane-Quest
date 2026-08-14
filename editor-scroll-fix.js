(()=>{
const wrap=name=>{const original=window[name];if(typeof original!=='function')return;window[name]=(...args)=>{const step=document.querySelector('.cg-step.on');const top=step?step.scrollTop:window.scrollY;original(...args);requestAnimationFrame(()=>{const next=document.querySelector('.cg-step.on');if(next)next.scrollTop=top;else window.scrollTo(0,top)})}};
['cgRace','cgClass','cgBg','cgPrev','cgNext'].forEach(wrap);
})();