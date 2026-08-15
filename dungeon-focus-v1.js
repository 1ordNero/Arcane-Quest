(()=>{
function enhance(){if(S.screen!=='dungeon'||!S.dungeonV1)return;const d=S.dungeonV1,root=document.querySelector('main .d1');if(!root)return;
 const room=root.querySelector('.d1-room');if(!room)return;
 if(d.state==='combat'){
  room.classList.add('df-combat');const feed=room.querySelector('.d1-feed');if(feed)feed.classList.add('df-current-action');
  const auto=room.querySelector('.ac2,.ac3,.auto-combat,.combat-log,.log');if(auto)auto.classList.add('df-log');
  if(auto&&!auto.querySelector('.df-log-title')){const h=document.createElement('button');h.className='df-log-title';h.textContent='Kampfdetails anzeigen';h.onclick=()=>{auto.classList.toggle('open');h.textContent=auto.classList.contains('open')?'Kampfdetails ausblenden':'Kampfdetails anzeigen'};auto.prepend(h)}
 }
 if(['feedback','cleared','complete'].includes(d.state)){
  room.classList.add('df-result');const btn=room.querySelector('button');if(btn){btn.textContent=d.state==='complete'?'Expedition abschließen':`Weiter zu Raum ${Math.min(10,(d.room||0)+2)}`}
 }
}
const prev=window.render;if(prev)window.render=function(){const r=prev.apply(this,arguments);queueMicrotask(enhance);setTimeout(enhance,0);return r};
/* Replace the one destructive native confirmation that matters most in the dungeon. */
window.dungeonLeaveConfirm=function(){if(!S.dungeonV1)return;aqConfirm({icon:'🚪',title:'Katakomben verlassen?',message:'Deine bisherige Beute wird gesichert. Der verwendete Schlüssel bleibt verbraucht.',confirmText:'Beute sichern & verlassen',cancelText:'Weiter erkunden'},()=>{const d=S.dungeonV1;if(!d)return;S.gold+=(d.gold||0);if(window.gainXP)gainXP(d.xp||0);for(const it of d.loot||[]){if(S.items.length<S.invCap)S.items.push(it)}S.dungeonV1=null;S.screen='home';save();render()})};
const css=document.createElement('style');css.textContent=`
.df-combat{padding:16px!important}.df-combat h2{font-size:22px!important;margin:3px 0 13px!important}.df-combat .d1-hp{margin:12px 0!important}.df-combat .d1-hp span{font-size:12px!important;font-weight:800}.df-combat .d1-hp i{height:11px!important;margin-top:5px}.df-current-action{margin:12px 0!important;padding:10px 12px!important;border-radius:11px!important}.df-current-action b{font-size:12px!important}.df-current-action small{font-size:10px!important}.df-combat .d1-actions{margin-top:12px!important}.df-combat .d1-actions button{min-height:54px!important;font-size:12px!important}.df-log{max-height:44px!important;overflow:hidden!important;margin-top:10px!important;opacity:.8}.df-log.open{max-height:220px!important;overflow:auto!important}.df-log-title{width:100%;min-height:38px!important;padding:7px!important;background:#ffffff08!important;box-shadow:none!important;font-size:10px!important}.df-result{padding:20px 16px!important}.df-result .d1-icon{font-size:42px!important}.df-result h2{font-size:22px!important}.df-result p{font-size:12px!important}.df-result button{margin-top:8px;width:100%;min-height:50px!important}
`;document.head.appendChild(css);enhance();
})();