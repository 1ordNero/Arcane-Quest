(()=>{
function compactDungeon(){
 if(S.screen!=='dungeon'||S.dungeonV1)return;
 const main=document.querySelector('main');if(!main)return;
 const hero=main.querySelector('.d1 .hero');if(!hero)return;
 hero.classList.add('compact-dungeon-entry');
 hero.innerHTML=`<div class="compact-dungeon-title"><span>🏰</span><div><h1>Die ersten Katakomben</h1><p>10 Räume · 1 Schlüssel · Boss</p></div></div><div class="compact-dungeon-action"><span>🗝️ ${S.keys||0} verfügbar</span><button onclick="d1Start()">Katakomben betreten</button></div>`;
 main.querySelectorAll('.d-beta-back').forEach(x=>x.remove());
}
function compactCity(){
 if(S.screen!=='city')return;
 const root=document.querySelector('.cv2');if(!root)return;
 const head=root.querySelector('.cv2-head');
 if(head){
   let status=root.querySelector('.compact-city-status');
   if(!status){status=document.createElement('div');status.className='compact-city-status';status.innerHTML=`<b>Stadt</b><span>🪙 ${S.gold} &nbsp; 🎒 ${(S.items||[]).length}/${S.invCap||15}</span>`;head.replaceWith(status)}
 }
}
function compactArena(){
 if(S.screen!=='arena')return;
 const root=document.querySelector('.av2');if(!root)return;
 const overview=root.querySelector('.av3-overview');
 if(overview){
   const rank=overview.querySelector('.av3-rank');
   if(rank){rank.classList.add('compact-arena-rank');overview.replaceWith(rank)}
 }
 root.querySelectorAll('.av3-section').forEach(sec=>{
   const h=sec.querySelector('h2');if(h){sec.innerHTML=`<h2>${h.textContent}</h2>`;sec.classList.add('compact-section')}
 });
 const stamina=root.querySelector('.arena-stamina');
 if(stamina){
   const remaining=Number(S.arenaStamina)||0;
   stamina.querySelector('span')?.remove();
   if(remaining<=0){
     stamina.classList.add('compact-exhausted');
     const stances=root.querySelector('.av2-stances');if(stances){stances.classList.add('disabled-stances');stances.querySelectorAll('button').forEach(b=>b.disabled=true)}
   }
 }
}
function compact(){compactDungeon();compactCity();compactArena()}
const prev=window.render;if(prev)window.render=function(){const r=prev.apply(this,arguments);queueMicrotask(compact);return r};
const css=document.createElement('style');css.textContent=`
/* Shared compact content rhythm */
main{padding-top:12px!important}.compact-dungeon-entry{padding:16px!important;border-radius:16px!important}.compact-dungeon-title{display:flex;align-items:center;gap:11px}.compact-dungeon-title>span{font-size:32px}.compact-dungeon-title h1{font-size:22px!important;margin:0!important}.compact-dungeon-title p{font-size:12px;margin:3px 0 0;color:var(--muted)}.compact-dungeon-action{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px}.compact-dungeon-action>span{font-size:11px;color:var(--muted)}.compact-dungeon-action button{min-height:44px!important;padding:9px 14px!important;font-size:13px!important}.d-beta-back{display:none!important}
.compact-city-status{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 10px;padding:4px 2px}.compact-city-status>b{font-size:21px}.compact-city-status>span{font-size:11px;color:var(--muted);background:#ffffff07;padding:6px 9px;border-radius:999px}.cv2-grid{margin-top:0!important}.cux-building{min-height:70px!important;padding:10px 12px!important}.cux-building small{line-height:1.25!important}.cux-building .cux-unlock{margin-top:2px!important}
.compact-arena-rank{margin:0 0 10px!important;padding:10px 12px!important;border-radius:13px!important;background:#ffffff06}.compact-section{margin:12px 2px 6px!important;display:block!important}.compact-section h2{font-size:18px!important;margin:0!important}.arena-stamina{margin:0 0 10px!important;padding:9px 11px!important}.arena-stamina.compact-exhausted{padding:10px 11px!important}.disabled-stances{opacity:.45;pointer-events:none}.av2-stances button{min-height:54px!important}.av2-stances{gap:6px!important}
@media(max-width:699px){
 .tabs button img{top:-34px!important}.tabs .hero-tab img,.tabs button[data-screen="char"] img{top:-42px!important}
 .tabs .nav-art{bottom:52px!important}.tabs .hero-tab .nav-art,.tabs .hero-nav-art{bottom:48px!important}
 .compact-dungeon-action{align-items:stretch;flex-direction:column}.compact-dungeon-action button{width:100%}
}
`;document.head.appendChild(css);compact();
})();