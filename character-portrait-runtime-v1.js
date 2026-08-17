(()=>{
'use strict';
function state(){try{return typeof S!=='undefined'&&S?S:{}}catch{return {}}}
const norm=s=>String(s||'').split('?')[0];
function patch(){
 const s=state(),src=window.getHeroPortrait?getHeroPortrait({cls:s.cls,gender:s.gender}):'assets/icons/nav-held.webp';
 document.querySelectorAll('img[src*="nav-held.webp"],img[data-hero-portrait]').forEach(img=>{
   const current=img.dataset.arcaneAssetSource||img.getAttribute('src')||'';
   if(norm(current)!==norm(src)){img.setAttribute('src',src);img.dataset.arcaneAssetSource=src}
   img.dataset.heroPortrait='1';img.decoding='async';
   if(!img.alt)img.alt=s.name||'Held';
   window.Arcane?.assets?.bind?.(img,src);
 });
}
const css=document.createElement('style');css.textContent=`.hero-tab .hero-nav-art img[data-hero-portrait]{transform:scale(1.08)!important}`;document.head.appendChild(css);
window.Arcane?.on?.('afterRenderSettled',patch);window.Arcane?.on?.('bootReady',patch);queueMicrotask(patch);
})();