(()=>{
'use strict';
const VERSION='v0.9.3';
window.ARCANE_APP_VERSION=VERSION;
function apply(){
 const brand=document.querySelector('header .brand');
 if(!brand)return;
 let badge=brand.querySelector('.aq-version');
 if(!badge){badge=document.createElement('span');badge.className='aq-version';brand.appendChild(badge)}
 if(badge.textContent!==VERSION)badge.textContent=VERSION;
}
window.Arcane?.on?.('afterRenderSettled',apply);
window.Arcane?.on?.('bootReady',apply);
const start=()=>apply();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
const css=document.createElement('style');css.textContent=`.aq-version{display:inline-flex;margin-left:7px;padding:2px 5px;border-radius:999px;border:1px solid #ffffff18;background:#ffffff0a;color:var(--muted);font-size:9px;font-weight:700;letter-spacing:.03em;vertical-align:middle;white-space:nowrap}`;document.head.appendChild(css);
})();
