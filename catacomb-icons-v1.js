(()=>{
const ROOT='assets/icons/catacombs/';
const VERSION='2026-08-16-hq1';
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
const keyFor=text=>Object.keys(ROOMS).find(name=>(text||'').includes(name))||'';
Object.values(ROOMS).forEach(file=>{const preload=new Image();preload.decoding='async';preload.src=path(file)});
function apply(){
 document.querySelectorAll('.dv7-room').forEach(room=>{
  const title=room.querySelector('h2')?.textContent||'';
  const key=keyFor(title);if(!key)return;
  const src=path(ROOMS[key]);
  const image=room.querySelector('.gai-room,.gai-room-inline');
  if(image&&image.getAttribute('src')!==src){image.src=src;image.alt=key;image.dataset.catacombIcon=key}
 });
}
window.CATACOMB_ICON_ASSETS=Object.freeze(Object.fromEntries(Object.entries(ROOMS).map(([name,file])=>[name,path(file)])));
const previousRender=window.render;
if(previousRender)window.render=function(){const result=previousRender.apply(this,arguments);apply();queueMicrotask(apply);requestAnimationFrame(apply);return result};
apply();queueMicrotask(apply);requestAnimationFrame(apply);
})();