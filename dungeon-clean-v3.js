(()=>{
function cleanDungeon(){
 if(S.screen!=='dungeon'||!S.dungeonV1)return;
 const root=document.querySelector('main .d1,main .dux3'); if(!root)return;
 const d=S.dungeonV1;
 // Remove all legacy/duplicate summary and loot blocks. One compact run header remains.
 root.querySelectorAll('.dux-run,.d1-bank,.d2-loot,.d2-warning,.dux-exit,.dv2-risk,.dc2-loot,.dc2-status').forEach(x=>x.remove());
 root.querySelectorAll('.d1-top').forEach(x=>x.remove());
 root.querySelectorAll('.d1-track').forEach(x=>x.classList.add('dc3-track'));
 const room=root.querySelector('.d1-room'); if(!room)return;
 let head=root.querySelector('.dc3-head'); if(head)head.remove();
 head=document.createElement('div'); head.className='dc3-head';
 const pct=Math.max(0,Math.min(100,((d.room||0)+1)/10*100));
 head.innerHTML=`<div class="dc3-row"><div><small>KATAKOMBEN · RAUM ${(d.room||0)+1}/10</small><b>❤️ ${d.hp}/${d.maxHp}</b></div><div class="dc3-rewards">🪙 ${d.gold||0} · ✦ ${d.xp||0} XP · 🎁 ${(d.loot||[]).length}</div><button onclick="dungeonLeaveConfirm()">Verlassen</button></div><i><u style="width:${pct}%"></u></i>`;
 root.prepend(head);
 // Room card already contains room number/name; suppress repeated room number there.
 const small=room.querySelector(':scope > .small'); if(small)small.style.display='none';
 // Only show unsecured loot once, and only after something was actually earned.
 const hasLoot=(d.gold||0)>0||(d.xp||0)>0||(d.loot||[]).length>0;
 if(hasLoot && d.state!=='combat'){
   const loot=document.createElement('div'); loot.className='dc3-loot';
   const items=d.loot||[];
   loot.innerHTML=`<div><b>Ungesicherte Beute</b><small>🪙 ${d.gold||0} · ✦ ${d.xp||0} XP${items.length?` · 🎁 ${items.length}`:''}</small></div><button onclick="dungeonLeaveConfirm()">Sichern & raus</button>`;
   room.after(loot);
 }
 root.querySelectorAll('.dc3-loot').forEach((x,i)=>{if(i>0)x.remove()});
}
const prev=window.render;if(prev)window.render=function(){const r=prev.apply(this,arguments);queueMicrotask(cleanDungeon);setTimeout(cleanDungeon,0);return r};
const css=document.createElement('style');css.textContent=`
body[data-screen="dungeon"] .dux-run,body[data-screen="dungeon"] .d1-bank,body[data-screen="dungeon"] .d2-loot,body[data-screen="dungeon"] .d2-warning,body[data-screen="dungeon"] .dux-exit,body[data-screen="dungeon"] .dv2-risk,body[data-screen="dungeon"] .dc2-status,body[data-screen="dungeon"] .dc2-loot,body[data-screen="dungeon"] .d1-top{display:none!important}.dc3-head{margin:0 0 9px;padding:10px 11px;background:#191221;border:1px solid #ffffff0d;border-radius:13px}.dc3-row{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center}.dc3-row small,.dc3-row b{display:block}.dc3-row small{font-size:9px;color:var(--muted);letter-spacing:.03em}.dc3-row b{font-size:12px;margin-top:2px}.dc3-rewards{font-size:10px;color:var(--muted);white-space:nowrap}.dc3-row button{min-height:34px!important;padding:6px 10px!important;font-size:9px!important;background:#ffffff0b!important;box-shadow:none!important}.dc3-head>i{display:block;height:5px;background:#ffffff0d;border-radius:99px;overflow:hidden;margin-top:8px}.dc3-head>i>u{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));text-decoration:none}.dc3-track{display:flex!important;gap:5px!important;margin:0 1px 9px!important}.dc3-track i{flex:1!important;height:5px!important;min-height:5px!important;padding:0!important;border:0!important;border-radius:99px!important;font-size:0!important;background:#ffffff12!important;opacity:1!important}.dc3-track i.done{background:#71d59a99!important}.dc3-track i.now{background:var(--gold)!important;box-shadow:0 0 8px #f4c15d44!important}.dc3-loot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:8px;padding:10px 11px;border-radius:12px;background:#191221;border:1px solid #ffffff0d}.dc3-loot b,.dc3-loot small{display:block}.dc3-loot b{font-size:11px}.dc3-loot small{font-size:9px;color:var(--muted);margin-top:2px}.dc3-loot button{min-height:36px!important;padding:7px 10px!important;font-size:9px!important;background:#ffffff0b!important;box-shadow:none!important}@media(max-width:430px){.dc3-row{grid-template-columns:1fr auto}.dc3-rewards{grid-row:2;grid-column:1/-1;font-size:9px}.dc3-loot{align-items:stretch;flex-direction:column}.dc3-loot button{width:100%}}
`;document.head.appendChild(css);cleanDungeon();
})();