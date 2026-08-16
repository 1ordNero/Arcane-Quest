(()=>{
const SRC='assets/icons/catacombs/room_grave_knight.webp?v=2026-08-16-room5-fix1';
function apply(){
 document.querySelectorAll('.dv7-room').forEach(room=>{
  const title=room.querySelector('h2')?.textContent||'';
  if(!/Grabritter/i.test(title))return;
  const host=room.querySelector('.dv7-icon');
  if(host){
   let img=host.querySelector('img');
   if(!img){img=document.createElement('img');host.replaceChildren(img)}
   img.className='gai-room catacomb-room-art';
   img.src=SRC;img.alt='Grabritter';
   host.dataset.gai='catacomb_room_grave_knight';
  }else{
   let img=room.querySelector('img.catacomb-room-art,img.gai-room-inline');
   if(!img){img=document.createElement('img');room.querySelector('h2')?.insertAdjacentElement('beforebegin',img)}
   if(img){img.className='gai-room-inline catacomb-room-art';img.src=SRC;img.alt='Grabritter'}
  }
 });
}
const prev=window.render;
if(prev)window.render=function(){const r=prev.apply(this,arguments);apply();queueMicrotask(apply);requestAnimationFrame(apply);return r};
apply();
})();