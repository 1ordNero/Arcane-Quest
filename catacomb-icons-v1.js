(()=>{
const ROOT='assets/icons/catacombs/';
const VERSION='2026-08-16-hq5';
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
.dv7-head{padding:16px 18px!important;border-radius:20px!important}.dv7-head>div{gap:3px!important}.dv7-head small{letter-spacing:.03em!important}.dv7-head b{font-size:26px!important;line-height:1.12!important}.dv7-head>span{margin-top:10px!important}.dv7-head>button{min-height:52px!important;margin-top:12px!important}.dv7-head>i{margin-top:12px!important}
.dv7-track{margin:12px 2px 16px!important;gap:10px!important}.dv7-track>i{height:8px!important;border-radius:999px!important}
.dv7-room.catacomb-room-hq{padding:16px 18px 18px!important;border-radius:22px!important;text-align:center!important}.catacomb-room-hq .dv7-risk{margin:0 0 10px!important;padding:12px 14px!important;text-align:left!important;border-radius:16px!important}
.catacomb-room-hq .catacomb-art-host{width:172px!important;height:172px!important;min-width:172px!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:8px auto 4px!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}.catacomb-room-hq .catacomb-room-art{display:block!important;width:172px!important;height:172px!important;max-width:172px!important;max-height:172px!important;margin:8px auto 4px!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}.catacomb-room-hq .catacomb-art-host .catacomb-room-art{margin:0!important}
.catacomb-room-hq h2{font-size:30px!important;line-height:1.08!important;margin:6px 0 10px!important;text-align:center!important}.catacomb-room-hq h2+p{max-width:560px!important;margin:0 auto 14px!important;line-height:1.45!important;text-align:center!important}.catacomb-room-hq>button{width:100%!important;min-height:58px!important;margin-top:4px!important;font-size:20px!important;border-radius:17px!important}.catacomb-room-hq .dv7-choices{margin-top:12px!important;text-align:left!important}
@media(max-width:420px){.dv7-head{padding:14px 16px!important}.dv7-head b{font-size:24px!important}.dv7-room.catacomb-room-hq{padding:14px 16px 16px!important}.catacomb-room-hq .catacomb-art-host{width:158px!important;height:158px!important;min-width:158px!important}.catacomb-room-hq .catacomb-room-art{width:158px!important;height:158px!important;max-width:158px!important;max-height:158px!important}.catacomb-room-hq h2{font-size:28px!important}}
`;document.head.appendChild(css);apply();
})();