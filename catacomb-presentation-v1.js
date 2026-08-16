(()=>{
'use strict';
const ROOT='assets/icons/catacombs/';
const VERSION='2026-08-16-hq12';
const ROOMS=[
 ['Flüsternde Galerie','room_whispering_gallery.webp'],
 ['Knochenwache','room_bone_guard.webp'],
 ['Versiegelte Nische','room_sealed_niche.webp'],
 ['Schattenbestie','room_shadow_beast.webp'],
 ['Grabritter','room_grave_knight.webp'],
 ['Schrein der Stille','room_shrine_of_silence.webp'],
 ['Archiv der Toten','room_archive_of_dead.webp'],
 ['Gruftweberin','room_crypt_weaver.webp'],
 ['Schatzkammer','room_treasure_new.webp'],
 ['Hüter der Katakomben','room_catacomb_keeper.webp']
];
const path=file=>`${ROOT}${file}?v=${VERSION}`;
const assets=Object.freeze(Object.fromEntries(ROOMS.map(([name,file])=>[name,path(file)])));
window.CATACOMB_ICON_ASSETS=assets;
ROOMS.forEach(([,file])=>{const image=new Image();image.decoding='async';image.src=path(file)});
function state(){try{return typeof S!=='undefined'&&S?S:null}catch{return null}}
function apply(){
 const s=state();if(s?.screen!=='dungeon')return;
 const idx=Number(s.dungeonV1?.room);if(!Number.isInteger(idx)||idx<0||idx>=ROOMS.length)return;
 const [name,file]=ROOMS[idx],src=path(file);
 document.querySelectorAll('.dv7-room').forEach(room=>{
   room.classList.add('catacomb-room-hq');
   room.querySelectorAll('.gai-room-inline').forEach(el=>{if(!el.classList.contains('catacomb-room-art'))el.remove()});
   let host=room.querySelector('.dv7-icon');
   if(!host){const h2=room.querySelector('h2');if(!h2)return;host=document.createElement('div');host.className='dv7-icon catacomb-art-host';h2.insertAdjacentElement('beforebegin',host)}
   host.classList.add('catacomb-art-host');
   let image=host.querySelector('.catacomb-room-art');
   if(!image){host.replaceChildren();image=document.createElement('img');image.className='gai-room catacomb-room-art';host.appendChild(image)}
   if(image.getAttribute('src')!==src)image.src=src;
   image.alt=name;image.dataset.catacombIcon=name;host.dataset.gai=`catacomb_room_${idx+1}`;
 });
}
const css=document.createElement('style');css.textContent=`
.dv7-room.catacomb-room-hq{padding:12px 15px 14px!important;border-radius:19px!important;text-align:center!important}.catacomb-room-hq .dv7-risk{margin:0 0 7px!important;padding:9px 11px!important;text-align:left!important;border-radius:12px!important}.catacomb-room-hq .catacomb-art-host{width:156px!important;height:156px!important;min-width:156px!important;display:flex!important;align-items:center!important;justify-content:center!important;margin:4px auto 1px!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}.catacomb-room-hq .catacomb-room-art{display:block!important;width:156px!important;height:156px!important;max-width:156px!important;max-height:156px!important;margin:0!important;padding:0!important;object-fit:contain!important;object-position:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}.catacomb-room-hq h2{font-size:26px!important;line-height:1.06!important;margin:3px 0 7px!important;text-align:center!important}.catacomb-room-hq h2+p{max-width:560px!important;margin:0 auto 10px!important;line-height:1.35!important;text-align:center!important}.catacomb-room-hq>button{width:100%!important;min-height:50px!important;margin-top:2px!important;font-size:17px!important;border-radius:15px!important}.catacomb-room-hq .dv7-choices{margin-top:8px!important;text-align:left!important}
.dv7-choices{display:grid!important;gap:8px!important;margin-top:10px!important}.dv7-choices>button{width:100%!important;min-height:86px!important;padding:10px 14px!important;display:grid!important;grid-template-columns:64px minmax(0,1fr) 58px!important;gap:10px!important;align-items:center!important;text-align:left!important;overflow:hidden!important}.dv7-choices>button>span{width:58px!important;height:58px!important;display:grid!important;place-items:center!important;align-self:center!important;overflow:visible!important;font-size:0!important}.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:54px!important;height:54px!important;max-width:54px!important;max-height:54px!important;object-fit:contain!important;margin:0!important}.dv7-choices>button>div{min-width:0!important;display:flex!important;flex-direction:column!important;justify-content:center!important;gap:2px!important;padding:0!important}.dv7-choices>button>div>b{display:block!important;font-size:16px!important;line-height:1.1!important;margin:0!important;white-space:nowrap!important}.dv7-choices>button>div>small{display:block!important;font-size:12px!important;line-height:1.25!important;color:var(--muted)!important;margin:0!important}.dv7-choices>button>em{position:static!important;justify-self:end!important;align-self:center!important;min-width:52px!important;text-align:right!important;font-size:21px!important;line-height:1!important;font-style:normal!important;color:var(--gold)!important;white-space:nowrap!important;margin:0!important}
@media(max-width:520px){.dv7-room.catacomb-room-hq{padding:9px 12px 11px!important}.catacomb-room-hq .catacomb-art-host{width:136px!important;height:136px!important;min-width:136px!important;margin:1px auto 0!important}.catacomb-room-hq .catacomb-room-art{width:136px!important;height:136px!important;max-width:136px!important;max-height:136px!important}.catacomb-room-hq h2{font-size:23px!important;margin:2px 0 5px!important}.catacomb-room-hq h2+p{font-size:10px!important;line-height:1.3!important;margin-bottom:7px!important}.catacomb-room-hq>button{min-height:46px!important;font-size:15px!important}.catacomb-room-hq .dv7-risk{padding:7px 9px!important;margin-bottom:6px!important}.dv7-choices{gap:7px!important;margin-top:8px!important}.dv7-choices>button{min-height:78px!important;padding:8px 11px!important;grid-template-columns:56px minmax(0,1fr) 52px!important;gap:8px!important;border-radius:14px!important}.dv7-choices>button>span{width:52px!important;height:52px!important}.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:48px!important;height:48px!important;max-width:48px!important;max-height:48px!important}.dv7-choices>button>div>b{font-size:15px!important}.dv7-choices>button>div>small{font-size:11px!important;line-height:1.2!important}.dv7-choices>button>em{min-width:48px!important;font-size:19px!important}}
@media(max-width:380px){.dv7-choices>button{grid-template-columns:50px minmax(0,1fr) 46px!important;padding-inline:9px!important;gap:6px!important}.dv7-choices>button>span{width:46px!important;height:46px!important}.dv7-choices>button>span .gai-choice,.dv7-choices>button>span>img{width:44px!important;height:44px!important;max-width:44px!important;max-height:44px!important}.dv7-choices>button>div>b{font-size:14px!important}.dv7-choices>button>div>small{font-size:10px!important}.dv7-choices>button>em{font-size:18px!important;min-width:44px!important}}
@media(max-width:520px) and (max-height:820px){.catacomb-room-hq .catacomb-art-host{width:118px!important;height:118px!important;min-width:118px!important}.catacomb-room-hq .catacomb-room-art{width:118px!important;height:118px!important;max-width:118px!important;max-height:118px!important}.catacomb-room-hq h2{font-size:21px!important}.catacomb-room-hq h2+p{font-size:9.5px!important;margin-bottom:6px!important}.catacomb-room-hq>button{min-height:44px!important;font-size:14px!important}}
`;document.head.appendChild(css);
if(window.Arcane?.on)Arcane.on('afterRenderSettled',apply);
apply();
})();