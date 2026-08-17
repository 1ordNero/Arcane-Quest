(()=>{
'use strict';
const ROOT='assets/icons/ui/';
const MAP={
  'Händler':'location_merchant.webp',
  'Ahnenschmiede':'location_forge.webp',
  'Schmiede':'location_forge.webp',
  'Bank':'location_bank.webp',
  'Ahnenschrein':'location_shrine.webp',
  'Schrein':'location_shrine.webp'
};
const normalized=src=>{try{const u=new URL(src||'',location.href);return u.pathname.replace(/^.*\/assets\//,'assets/')}catch{return String(src||'').split('?')[0]}};
function apply(){
  if(S?.screen!=='city')return;
  document.querySelectorAll('.cv2-grid>button').forEach(btn=>{
    const label=btn.querySelector('b')?.textContent?.trim();
    const file=MAP[label];if(!file)return;
    const expected=ROOT+file;
    let wrap=btn.querySelector(':scope > .cv2-icon')||btn.querySelector(':scope > span:first-child');
    if(!wrap){wrap=document.createElement('span');wrap.className='cv2-icon';btn.prepend(wrap)}
    let img=wrap.querySelector(':scope > img');
    if(!img){img=document.createElement('img');wrap.replaceChildren(img)}
    img.alt=label;img.decoding='async';img.loading='lazy';img.dataset.arcaneAssetSource=expected;
    if(normalized(img.getAttribute('src'))!==expected)img.src=expected;
    window.Arcane?.assets?.bind?.(img,expected);
  });
}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}
window.Arcane?.on?.('afterRenderSettled',schedule);window.Arcane?.on?.('bootReady',schedule);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();