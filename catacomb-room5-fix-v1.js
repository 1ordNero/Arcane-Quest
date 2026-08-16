(()=>{
const SRC='assets/icons/catacombs/room_grave_knight.webp?v=2026-08-16-room5-fix1';
function recoverCombatLock(){
 const d=window.S?.dungeonV1||((typeof S!=='undefined'&&S)?S.dungeonV1:null);
 if(!d||d.state!=='combat'||!d.enemy)return;
 if(!d.autoBusy)return;
 const now=Date.now();
 const stamp=Number(d.autoBusyAt||0);
 if(!stamp||now-stamp>1800){
  d.autoBusy=false;
  delete d.autoBusyAt;
  try{window.save?.()}catch{}
 }
}
function apply(){
 recoverCombatLock();
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
setInterval(recoverCombatLock,500);
window.addEventListener('pageshow',recoverCombatLock);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')recoverCombatLock()});
apply();
})();