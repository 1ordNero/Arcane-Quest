(()=>{
'use strict';
const VERSION=document.querySelector('meta[name="build"]')?.content||'v0.9.9';
window.ARCANE_APP_VERSION=VERSION;
function ensureCatacombIcons(){if(document.querySelector('script[data-catacomb-icons]'))return;const s=document.createElement('script');s.src='catacomb-icons-v1.js?v=3';s.dataset.catacombIcons='1';document.head.appendChild(s)}
function apply(){
 const top=document.querySelector('header .top')||document.querySelector('header');
 if(!top)return;
 let badge=top.querySelector(':scope > .aq-version');
 if(!badge){badge=document.createElement('span');badge.className='aq-version';badge.textContent=VERSION;top.appendChild(badge);return}
 if(badge.textContent!==VERSION)badge.textContent=VERSION;
}
window.Arcane?.on?.('afterRenderSettled',apply);
window.Arcane?.on?.('bootReady',apply);
let pending=false;
function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}
const start=()=>{ensureCatacombIcons();const app=document.getElementById('app');if(app)new MutationObserver(m=>{if(m.some(x=>x.type==='childList'&&[...x.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('header')||n.querySelector?.('header')))))schedule()}).observe(app,{childList:true,subtree:false});apply()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
const css=document.createElement('style');css.textContent=`header .top{position:relative}.aq-version{position:absolute;left:50%;bottom:-9px;transform:translateX(-50%);z-index:2;display:inline-flex;padding:2px 6px;border-radius:999px;border:1px solid #ffffff18;background:#17111ff2;color:var(--muted);font-size:9px;line-height:1.2;font-weight:800;letter-spacing:.04em;white-space:nowrap;pointer-events:none}`;document.head.appendChild(css);
})();