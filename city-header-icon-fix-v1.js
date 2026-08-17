(()=>{
'use strict';
const UI='assets/icons/ui/';
function ensureImage(host,file,cls,alt){
 if(!host)return;
 const src=UI+file,current=host.querySelector(':scope > img');
 if(current&&String(current.getAttribute('src')||'').split('?')[0]===src){current.className=cls;return}
 const image=document.createElement('img');image.src=src;image.alt=alt||'';image.className=cls;image.decoding='async';host.replaceChildren(image);
}
function cityForge(){
 if(S?.screen!=='city')return;
 document.querySelectorAll('.cv2-grid>button').forEach(btn=>{
  const name=(btn.querySelector('b')?.textContent||'').trim();
  if(name==='Ahnenschmiede')ensureImage(btn.querySelector(':scope > span:first-child'),'location_forge.webp','aq-icon aq-icon-city aq-city-forge','Ahnenschmiede');
 });
}
function headerInventory(){
 if(!['city','merchant','bank','forge'].includes(S?.screen))return;
 const bag=document.querySelector('.ds-bag');if(!bag)return;
 let image=bag.querySelector(':scope > img.ds-inventory-icon');
 if(!image){image=document.createElement('img');image.className='ds-inventory-icon';image.alt='Inventar';image.decoding='async';bag.prepend(image)}
 const src=UI+'ui_inventory.webp';if(String(image.getAttribute('src')||'').split('?')[0]!==src)image.src=src;
}
function forgeName(){
 if(S?.screen!=='forge')return;
 document.querySelectorAll('.ds-screen b,.cux-top b').forEach(el=>{if((el.textContent||'').trim()==='Ahnen-Schmiede')el.textContent='Ahnenschmiede'});
}
function apply(){cityForge();headerInventory();forgeName()}
window.Arcane?.on?.('afterRenderSettled',apply);window.Arcane?.on?.('bootReady',apply);
const style=document.createElement('style');style.textContent=`.ds-bag:before{content:none!important}.ds-inventory-icon{display:block!important;width:22px!important;height:22px!important;object-fit:contain!important}.aq-city-forge{display:block!important;width:42px!important;height:42px!important;object-fit:contain!important}@media(max-width:520px){.ds-inventory-icon{width:19px!important;height:19px!important}.aq-city-forge{width:38px!important;height:38px!important}}`;document.head.appendChild(style);queueMicrotask(apply);
})();