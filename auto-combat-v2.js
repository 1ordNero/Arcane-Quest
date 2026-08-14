(()=>{
let miniOpen=false;
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
function fs(){return window.getFinalStats?getFinalStats():{hp:S.maxHp||120}}
window.toggleMiniBossCard=function(){miniOpen=!miniOpen;render()};

// Tavern cleanup + collapsed miniboss card
const prevHome=window.home;
window.home=function(){
  if(S.autoMiniBattle)return prevHome();
  let h=prevHome();
  h=h.replace(/<div class="d1-home">[\s\S]*?<\/div>/g,'');
  h=h.replace(/<article class="quest-card" onclick="event\.stopPropagation\(\)">[\s\S]*?<\/article>/,()=>{
    const xp=38+(S.lvl||1)*2;
    return `<article class="quest-card ${miniOpen?'open':''}" onclick="toggleMiniBossCard()"><div class="quest-summary"><div class="q-icon">⚔️</div><div class="q-main"><div class="q-title"><b>Knochenwache</b><span class="q-cat">MINIBOSS · AUTO</span></div><p>Kurzer automatischer Kampf mit geringerem Risiko und weniger Beute als der Knochenhauer.</p><div class="q-meta"><span>⏱ kurz</span><span>⚡ 16</span><span>✦ ~${xp} XP</span></div></div><span class="chev">${miniOpen?'⌃':'⌄'}</span></div>${miniOpen?`<div class="quest-expand"><p>Der Kampf läuft automatisch. Lebensbalken und Kampfprotokoll bleiben sichtbar.</p><div class="detail-grid"><span><b>kurz</b><small>Dauer</small></span><span><b>16</b><small>AL</small></span><span><b>45–90</b><small>Gold</small></span><span><b>niedriger</b><small>Loot</small></span></div><button class="start-q" onclick="startAutoMiniBoss();event.stopPropagation()">Automatischen Kampf starten · ⚡ 16</button></div>`:''}</article>`;
  });
  return h;
};

function lootSummary(d){return `<div class="ac2-lootline"><span>🪙 ${d.gold||0}</span><span>✦ ${d.xp||0} XP</span><span>🎁 ${(d.loot||[]).length}</span></div>`}
function restView(d){return `<div class="d1-room ac2-special"><div class="d1-icon">🕯️</div><div class="small">RUHERAUM · RAUM 6 / 10</div><h2>Schrein der Stille</h2><p>Der Schrein ist sicher. Stelle 25 % deiner maximalen HP wieder her, bevor du tiefer gehst.</p><div class="ac2-hpnote">❤️ ${d.hp}/${d.maxHp}</div><button onclick="d1V2Rest()">25 % HP wiederherstellen</button></div>`}
function treasureView(d){return `<div class="d1-room ac2-special"><div class="d1-icon">💎</div><div class="small">SCHATZRAUM · RAUM 9 / 10</div><h2>Schatzkammer</h2><p>Eine garantierte Zwischenbelohnung wartet hier. Danach folgt der Hüter der Katakomben.</p>${lootSummary(d)}<button onclick="d1V2Treasure()">Schatz öffnen</button></div>`}

// Dungeon repair and combat hierarchy: HP bars first, combat log underneath
const prevDungeon=window.dungeonV1;
window.dungeonV1=function(){
  let h=prevDungeon(),d=S.dungeonV1;
  if(!d)return h;
  if(d.state==='v2rest'){
    const start=h.indexOf('<div class="d1-room">');
    if(start>=0){const end=h.lastIndexOf('</section>');if(end>start)h=h.slice(0,start)+restView(d)+h.slice(end)}
  }
  if(d.state==='v2treasure'){
    const start=h.indexOf('<div class="d1-room">');
    if(start>=0){const end=h.lastIndexOf('</section>');if(end>start)h=h.slice(0,start)+treasureView(d)+h.slice(end)}
  }
  if(d.state==='combat'&&d.enemy){
    const bars=h.match(/<div class="d1-hp">[\s\S]*?<\/div><div class="d1-hp enemy">[\s\S]*?<\/div>/)?.[0];
    const panel=h.match(/<div class="auto-combat-panel">[\s\S]*?<\/div><\/div>/)?.[0];
    if(bars){h=h.replace(bars,'');const roomPos=h.indexOf('<div class="d1-room">');if(roomPos>=0){const ins=roomPos+'<div class="d1-room">'.length;h=h.slice(0,ins)+`<div class="ac2-combat-focus">${bars}${panel||''}</div>`+h.slice(ins)}if(panel)h=h.replace(panel,'')}
  }
  return h;
};

const prevRender=window.render;
window.render=function(){prevRender();if(S.screen==='home')document.querySelectorAll('.d1-home').forEach(x=>x.remove())};

const st=document.createElement('style');st.textContent=`
.d1-home{display:none!important}.ac2-special{margin-top:8px}.ac2-hpnote{margin:8px 0;padding:7px;border-radius:9px;background:#ffffff08;font-size:10px}.ac2-lootline{display:flex;justify-content:center;gap:8px;margin:8px 0;font-size:9px;color:var(--gold)}
.ac2-combat-focus{margin:-4px -4px 10px;padding:10px;border-radius:12px;background:#120d18;border:1px solid #ffffff12}.ac2-combat-focus .d1-hp{margin:8px 0}.ac2-combat-focus .d1-hp span{font-size:10px;font-weight:800}.ac2-combat-focus .d1-hp i{height:11px}.ac2-combat-focus .auto-combat-panel{margin-top:10px}.auto-combat-panel{order:2}.auto-log{font-size:9px;line-height:1.55}.quest-card .quest-expand{animation:none}
`;
document.head.appendChild(st);
if(S.screen==='home'||S.screen==='dungeon')render();
})();