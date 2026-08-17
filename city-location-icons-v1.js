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
function apply(){
  if(S?.screen!=='city')return;
  document.querySelectorAll('.cv2-grid>button').forEach(btn=>{
    const label=btn.querySelector('b')?.textContent?.trim();
    const file=MAP[label];
    if(!file)return;
    let wrap=btn.querySelector('.cv2-icon');
    if(!wrap){wrap=document.createElement('span');wrap.className='cv2-icon';btn.prepend(wrap)}
    let img=wrap.querySelector('img');
    if(!img){img=document.createElement('img');wrap.replaceChildren(img)}
    const expected=ROOT+file;
    if(img.getAttribute('src')!==expected)img.setAttribute('src',expected);
    img.alt=label;
    img.decoding='async';
  });
}
let pending=false;
function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;apply()})}
window.Arcane?.on?.('afterRenderSettled',schedule);
window.Arcane?.on?.('bootReady',schedule);
new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();