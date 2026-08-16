(()=>{
const ROOT='assets/icons/catacombs/';
const VERSION='2026-08-16-hq6';
const ROOMS=Object.freeze({
 'Flüsternde Galerie':'room_whispering_gallery.webp','Knochenwache':'room_bone_guard.webp','Versiegelte Nische':'room_sealed_niche.webp','Schattenbestie':'room_shadow_beast.webp','Grabritter':'room_grave_knight.webp','Schrein der Stille':'room_shrine_of_silence.webp','Archiv der Toten':'room_archive_of_dead.webp','Gruftweberin':'room_crypt_weaver.webp','Schatzkammer':'room_treasure_new.webp','Hüter der Katakomben':'room_catacomb_keeper.webp'
});
const path=file=>`${ROOT}${file}?v=${VERSION}`;
const roomName=text=>Object.keys(ROOMS).find(name=>(text||'').includes(name))||'';
Object.values(ROOMS).forEach(file=>{const i=new Image();i.decoding='async';i.src=path(file)});
function apply(){
 document.querySelectorAll('.dv7-room').forEach(room=>{
  const h2=room.querySelector('h2');if(!h2)return;
  const name=roomName(h2.textContent||'');if(!name)return;
  room.classList.add('catacomb-room-hq');
  const src=path(ROOMS[name]),host=room.querySelector('.dv7-icon');
  if(host){
   host.classList.add('catacomb-art-host');
   host.replaceChildren();
   const img=document.createElement('img');img.className='gai-room catacomb-room-art';img.src=src;img.alt=name;img.dataset.catacombIcon=name;host.appendChild(img);
  }else{
   room.querySelectorAll('.gai-room-inline,.catacomb-room-art').forEach(el=>el.remove());
   const img=document.createElement('img');img.className='gai-room-inline catacomb-room-art';img.src=src;img.alt=name;img.dataset.catacombIcon=name;h2.insertAdjacentElement('beforebegin',img);
  }
 });
}
window.CATACOMB_ICON_ASSETS=Object.freeze(Object.fromEntries(Object.entries(ROOMS).map(([name,file])=>[name,path(file)])));
const previousRender=window.render;
if(previousRender)window.render=function(){const result=previousRender.apply(this,arguments);apply();return result};
const css=document.createElement('style');css.textContent=`
.dv7-room.catacomb-room-hq{padding:12px 15px 14px!important;border-radius:19px!important;text-align:center!important}.catacomb-room-hq .dv7-risk{margin:0 0 7px!important;padding:9px 11px!important;text-align:left!important;border-radius:12px!important}
.catacomb-room-hq .catacomb-art-host{width:156px!important;height:156px!important;min-width:156px!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:4px auto 1px!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}.catacomb-room-hq .catacomb-room-art{display:block!important;width:156px!important;height:156px!important;max-width:156px!important;max-height:156px!important;margin:4px auto 1px!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}.catacomb-room-hq .catacomb-art-host .catacomb-room-art{margin:0!important}
.catacomb-room-hq h2{font-size:26px!important;line-height:1.06!important;margin:3px 0 7px!important;text-align:center!important}.catacomb-room-hq h2+p{max-width:560px!important;margin:0 auto 10px!important;line-height:1.35!important;text-align:center!important}.catacomb-room-hq>button{width:100%!important;min-height:50px!important;margin-top:2px!important;font-size:17px!important;border-radius:15px!important}.catacomb-room-hq .dv7-choices{margin-top:8px!important;text-align:left!important}
@media(max-width:520px){.dv7-room.catacomb-room-hq{padding:9px 12px 11px!important}.catacomb-room-hq .catacomb-art-host{width:136px!important;height:136px!important;min-width:136px!important;margin:1px auto 0!important}.catacomb-room-hq .catacomb-room-art{width:136px!important;height:136px!important;max-width:136px!important;max-height:136px!important;margin:1px auto 0!important}.catacomb-room-hq h2{font-size:23px!important;margin:2px 0 5px!important}.catacomb-room-hq h2+p{font-size:10px!important;line-height:1.3!important;margin-bottom:7px!important}.catacomb-room-hq>button{min-height:46px!important;font-size:15px!important}.catacomb-room-hq .dv7-risk{padding:7px 9px!important;margin-bottom:6px!important}}
@media(max-width:520px) and (max-height:820px){.catacomb-room-hq .catacomb-art-host{width:118px!important;height:118px!important;min-width:118px!important}.catacomb-room-hq .catacomb-room-art{width:118px!important;height:118px!important;max-width:118px!important;max-height:118px!important}.catacomb-room-hq h2{font-size:21px!important}.catacomb-room-hq h2+p{font-size:9.5px!important;margin-bottom:6px!important}.catacomb-room-hq>button{min-height:44px!important;font-size:14px!important}}
`;document.head.appendChild(css);apply();
})();