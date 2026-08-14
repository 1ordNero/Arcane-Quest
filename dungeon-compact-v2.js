(()=>{
function esc(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]))}
function cleanupLegacyDungeonUI(root=document.querySelector('main')){
  if(!root||S.screen!=='dungeon')return;
  root.querySelectorAll('.dux-run,.d1-bank,.d2-loot,.d2-warning,.dux-exit,.dv2-risk').forEach(x=>x.remove());
}
function buildCompactDungeon(){
  if(S.screen!=='dungeon'||!S.dungeonV1)return;
  cleanupLegacyDungeonUI();
  const section=document.querySelector('main .d1, main .dux3');
  if(!section)return;
  const d=S.dungeonV1;

  /* Remove previous compact copy before rebuilding, so every render has exactly one status/loot block. */
  section.querySelectorAll('.dc2-status,.dc2-loot').forEach(x=>x.remove());

  const top=section.querySelector('.d1-top');
  if(top){
    const roomTitle=top.querySelector('b')?.textContent?.trim()||'Katakomben';
    top.classList.add('dc2-top');
    top.innerHTML=`<div><small>RAUM ${(d.room||0)+1}/10</small><b>${esc(roomTitle)}</b></div><button onclick="d1Leave()">Verlassen</button>`;
  }

  const track=section.querySelector('.d1-track');
  if(track){
    track.classList.add('dc2-track');
    [...track.children].forEach((el,i)=>{el.textContent='';el.title=`Raum ${i+1}`});
  }

  const room=section.querySelector('.d1-room');
  if(room)room.classList.add('dc2-room');

  const status=document.createElement('div');
  status.className='dc2-status';
  const pct=Math.max(0,Math.min(100,((d.room||0)+1)/10*100));
  status.innerHTML=`<div class="dc2-status-row"><b>Raum ${(d.room||0)+1}/10</b><span>❤️ ${d.hp}/${d.maxHp}</span><span>🪙 ${d.gold||0}</span><span>✦ ${d.xp||0} XP</span></div><i><u style="width:${pct}%"></u></i>`;

  const loot=document.createElement('div');
  loot.className='dc2-loot';
  const items=d.loot||[];
  loot.innerHTML=`<div class="dc2-loot-head"><div><b>Ungesicherte Beute</b><small>🪙 ${d.gold||0} · ✦ ${d.xp||0} XP · 🎁 ${items.length} Item${items.length===1?'':'s'}</small></div><button onclick="d1Leave()">Beute sichern & verlassen</button></div>${items.length?`<div class="dc2-items">${items.map(it=>`<span><b>${esc(it.name||'Beute')}</b><small>${esc(it.slot||'Item')} · Macht ${Number(it.power)||0}</small></span>`).join('')}</div>`:''}<small class="dc2-warning">Bei Niederlage geht diese Beute verloren.</small>`;

  if(top)top.before(status); else section.prepend(status);
  if(room){
    if(track&&track.nextElementSibling!==room)track.after(room);
    room.after(loot);
  }else section.appendChild(loot);
  cleanupLegacyDungeonUI();
}

const prev=window.render;
if(prev)window.render=function(){const r=prev.apply(this,arguments);queueMicrotask(buildCompactDungeon);setTimeout(buildCompactDungeon,0);return r};

const css=document.createElement('style');css.textContent=`
/* Hard-disable legacy duplicate dungeon blocks. The compact v2 blocks are the single source of truth. */
body[data-screen="dungeon"] .d2-loot,body[data-screen="dungeon"] .d2-warning,body[data-screen="dungeon"] .dux-exit,body[data-screen="dungeon"] .dv2-risk,body[data-screen="dungeon"] .dux-run,body[data-screen="dungeon"] .d1-bank{display:none!important}
.dc2-status{display:block!important;padding:8px 10px;margin:0 0 8px;border-radius:12px;background:#17111f;border:1px solid #ffffff0d}.dc2-status-row{display:grid;grid-template-columns:1.2fr repeat(3,auto);gap:9px;align-items:center}.dc2-status-row b{font-size:12px}.dc2-status-row span{font-size:10px;color:var(--muted);white-space:nowrap}.dc2-status>i{display:block;height:5px;margin-top:7px;background:#ffffff0d;border-radius:99px;overflow:hidden}.dc2-status>i>u{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));text-decoration:none}.dc2-top{padding:9px 10px!important;margin:0 0 6px!important;border-radius:12px!important;background:#1b1425!important}.dc2-top small,.dc2-top b{display:block}.dc2-top small{font-size:8px!important;color:var(--muted)}.dc2-top b{font-size:14px!important}.dc2-top button{font-size:9px!important;min-height:34px!important;padding:6px 9px!important}.dc2-track{display:flex!important;gap:5px!important;margin:0 2px 8px!important}.dc2-track i{flex:1!important;height:5px!important;min-height:5px!important;padding:0!important;border-radius:99px!important;background:#ffffff12!important;opacity:1!important;border:0!important}.dc2-track i.done{background:#71d59a99!important}.dc2-track i.now{background:var(--gold)!important;box-shadow:0 0 8px #f4c15d55!important}.dc2-room{margin:0!important;padding:13px!important;border-radius:14px!important}.dc2-room .d1-icon{font-size:29px!important}.dc2-room .small{font-size:8px!important}.dc2-room h2{font-size:18px!important;margin:3px 0!important}.dc2-room p{font-size:11px!important;line-height:1.4!important;margin:6px 0 9px!important}.dc2-room button{min-height:42px!important;font-size:12px!important}.dc2-loot{display:block!important;margin:8px 0 0;padding:10px;border-radius:12px;background:#17111f;border:1px solid #ffffff0d}.dc2-loot-head{display:flex;justify-content:space-between;align-items:center;gap:10px}.dc2-loot-head b,.dc2-loot-head small{display:block}.dc2-loot-head b{font-size:11px}.dc2-loot-head small{font-size:9px;color:var(--muted);margin-top:2px}.dc2-loot-head button{min-height:36px!important;padding:7px 9px!important;font-size:10px!important;background:#ffffff0b!important;box-shadow:none!important}.dc2-items{display:grid;gap:5px;margin-top:7px}.dc2-items span{padding:7px 8px;border-radius:9px;background:#ffffff05;border-left:2px solid #64b5ff}.dc2-items b,.dc2-items small{display:block}.dc2-items b{font-size:10px}.dc2-items small{font-size:8px;color:var(--muted)}.dc2-warning{display:block;margin-top:7px;font-size:8px;color:#d99aa4}
@media(max-width:430px){.dc2-status-row{grid-template-columns:1fr auto auto;gap:7px}.dc2-status-row span:nth-of-type(3){display:none}.dc2-loot-head{align-items:stretch;flex-direction:column}.dc2-loot-head button{width:100%}}
`;document.head.appendChild(css);
buildCompactDungeon();
})();