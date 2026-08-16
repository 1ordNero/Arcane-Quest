(()=>{
const ROOT='assets/icons/catacombs/';
const VERSION='2026-08-16-hq2';
const ROOMS=Object.freeze({
 'Flüsternde Galerie':'room_whispering_gallery.webp',
 'Knochenwache':'room_bone_guard.webp',
 'Versiegelte Nische':'room_sealed_niche.webp',
 'Schattenbestie':'room_shadow_beast.webp',
 'Grabritter':'room_grave_knight.webp',
 'Schrein der Stille':'room_shrine_of_silence.webp',
 'Archiv der Toten':'room_archive_of_dead.webp',
 'Gruftweberin':'room_crypt_weaver.webp',
 'Schatzkammer':'room_treasure_new.webp',
 'Hüter der Katakomben':'room_catacomb_keeper.webp'
});
const path=file=>`${ROOT}${file}?v=${VERSION}`;
const roomName=text=>Object.keys(ROOMS).find(name=>(text||'').includes(name))||'';
Object.values(ROOMS).forEach(file=>{const i=new Image();i.decoding='async';i.src=path(file)});
let applying=false;
function apply(){
 if(applying)return;applying=true;
 try{
  document.querySelectorAll('.dv7-room').forEach(room=>{
   const h2=room.querySelector('h2');if(!h2)return;
   const name=roomName(h2.textContent||'');if(!name)return;
   const src=path(ROOMS[name]);
   const host=room.querySelector('.dv7-icon');
   if(host){
    host.querySelectorAll('img').forEach(img=>{if(!img.classList.contains('catacomb-room-art'))img.remove()});
    host.childNodes.forEach(n=>{if(n.nodeType===3)n.remove()});
    let img=host.querySelector('img.catacomb-room-art');
    if(!img){img=document.createElement('img');img.className='gai-room catacomb-room-art';host.replaceChildren(img)}
    if(img.getAttribute('src')!==src)img.src=src;img.alt=name;img.dataset.catacombIcon=name;
   }else{
    room.querySelectorAll('.gai-room-inline,.catacomb-room-art').forEach(el=>el.remove());
    const img=document.createElement('img');img.className='gai-room-inline catacomb-room-art';img.src=src;img.alt=name;img.dataset.catacombIcon=name;
    h2.insertAdjacentElement('beforebegin',img);
   }
  });
 }finally{applying=false}
}
window.CATACOMB_ICON_ASSETS=Object.freeze(Object.fromEntries(Object.entries(ROOMS).map(([name,file])=>[name,path(file)])));
const previousRender=window.render;
if(previousRender)window.render=function(){const result=previousRender.apply(this,arguments);apply();queueMicrotask(apply);requestAnimationFrame(apply);return result};
const root=document.getElementById('app')||document.body;
const observer=new MutationObserver(()=>queueMicrotask(apply));
observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
const css=document.createElement('style');css.textContent=`.catacomb-room-art{object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;box-shadow:none!important}`;document.head.appendChild(css);
apply();queueMicrotask(apply);requestAnimationFrame(apply);
})();