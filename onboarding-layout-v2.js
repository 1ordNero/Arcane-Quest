(()=>{
'use strict';
const MARGIN=10,GAP=14;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function prepare(card){
 if(!card||card.querySelector('.aq-ob-copy-scroll'))return;
 const actions=card.querySelector('.aq-ob-actions'),paragraphs=[...card.querySelectorAll(':scope > p')];
 if(!actions||!paragraphs.length)return;
 const scroller=document.createElement('div');scroller.className='aq-ob-copy-scroll';
 paragraphs.forEach(p=>scroller.appendChild(p));actions.before(scroller);
}
function place(){
 const layer=document.getElementById('aq-onboarding'),card=layer?.querySelector('.aq-ob-card'),focus=layer?.querySelector('.aq-ob-focus');
 if(!layer||!card)return;prepare(card);
 const vw=innerWidth,vh=innerHeight,cw=Math.min(430,vw-MARGIN*2);card.classList.remove('aq-ob-center');card.style.transform='none';card.style.bottom='auto';card.style.width=`${cw}px`;card.style.maxHeight=`${Math.max(260,vh-MARGIN*2)}px`;
 if(!focus||focus.hidden){card.style.left=`${Math.max(MARGIN,(vw-cw)/2)}px`;card.style.top=`${MARGIN}px`;return}
 const fr=focus.getBoundingClientRect(),targetCenter=fr.top+fr.height/2,topHalf=targetCenter<vh/2,desiredHeight=Math.min(card.scrollHeight,Math.round(vh*.62)),freeAbove=fr.top-MARGIN-GAP,freeBelow=vh-fr.bottom-MARGIN-GAP;
 card.style.left=`${clamp(fr.left+fr.width/2-cw/2,MARGIN,Math.max(MARGIN,vw-cw-MARGIN))}px`;
 if(freeBelow>=Math.min(desiredHeight,250)){card.style.top=`${fr.bottom+GAP}px`;card.style.maxHeight=`${Math.max(220,freeBelow)}px`;return}
 if(freeAbove>=Math.min(desiredHeight,250)){const h=Math.min(desiredHeight,freeAbove);card.style.top=`${Math.max(MARGIN,fr.top-GAP-h)}px`;card.style.maxHeight=`${Math.max(220,h)}px`;return}
 card.style.left=`${MARGIN}px`;card.style.width=`${vw-MARGIN*2}px`;card.style.maxHeight=`${Math.max(280,Math.min(Math.round(vh*.62),560))}px`;card.style.top=topHalf?`${Math.max(MARGIN,vh-MARGIN-Math.min(card.scrollHeight,Math.round(vh*.62)))}px`:`${MARGIN}px`;
}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>requestAnimationFrame(()=>{queued=false;place()}))}
new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.id==='aq-onboarding'||n.querySelector?.('#aq-onboarding')))))schedule()}).observe(document.documentElement,{childList:true,subtree:true});
addEventListener('resize',schedule,{passive:true});addEventListener('orientationchange',schedule,{passive:true});window.Arcane?.on?.('afterRenderSettled',schedule);setTimeout(schedule,120);setTimeout(schedule,420);
const style=document.createElement('style');style.textContent=`
.aq-ob-card{display:flex!important;flex-direction:column!important;overflow:hidden!important;overscroll-behavior:contain!important;max-height:calc(100dvh - 20px)!important}
.aq-ob-card .aq-ob-progress,.aq-ob-card .aq-ob-eyebrow,.aq-ob-card h2{flex:0 0 auto}
.aq-ob-copy-scroll{min-height:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior:contain!important;padding-right:4px!important;scrollbar-width:thin;scrollbar-color:#a875ff66 transparent}
.aq-ob-copy-scroll::-webkit-scrollbar{width:4px}.aq-ob-copy-scroll::-webkit-scrollbar-thumb{background:#a875ff66;border-radius:99px}
.aq-ob-copy-scroll>p:first-child{margin-top:0!important}.aq-ob-copy-scroll>p:last-child{margin-bottom:0!important}
.aq-ob-actions{position:relative!important;bottom:auto!important;flex:0 0 auto!important;margin-top:12px!important;padding-top:10px!important;background:linear-gradient(180deg,#17101f00,#17101f 22%)!important;z-index:3}
.aq-ob-focus{pointer-events:none!important}
@media(max-width:520px){.aq-ob-card{border-radius:18px!important;max-height:min(68dvh,540px)!important}.aq-ob-card h2{font-size:19px!important}.aq-ob-copy-scroll{max-height:36dvh!important}.aq-ob-actions button{min-height:44px!important}}
@media(max-height:700px){.aq-ob-card{max-height:60dvh!important}.aq-ob-copy-scroll{max-height:30dvh!important}.aq-ob-card h2{font-size:18px!important;margin-bottom:6px!important}}
`;document.head.appendChild(style);queueMicrotask(schedule);
})();