(()=>{
const fs=()=>window.getFinalStats?getFinalStats():{str:S.str||8,agi:S.agi||8,int:S.int||8,hp:S.maxHp||120,armor:0,damage:0,crit:0,dodge:0,block:0};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function pushLog(target,text){if(!target||!text)return;target.autoLog=target.autoLog||[];if(target.autoLog[0]===text)return;target.autoLog.unshift(text);target.autoLog=target.autoLog.slice(0,8)}

// ---------- Dungeon: all combat encounters resolve automatically ----------
function dungeonStep(){const d=S.dungeonV1;if(!d||d.state!=='combat'||!d.enemy)return;const e=d.enemy;if(d.autoBusy)return;d.autoBusy=true;
  if(e.phase==='attack'){
    const kind=e.boss&&e.shield<=0&&Math.random()<.45?'heavy':Math.random()<.25?'safe':'normal';
    window.d1Attack?.(kind);
  }else{
    const t=e.telegraph||{};let kind='brace';
    const b=Number(t.block||0)+(fs().block||0),dg=Number(t.dodge||0)+(fs().dodge||0);
    if(b>=dg&&b>0)kind='block';else if(dg>b&&dg>0)kind='dodge';
    window.d1Defend?.(kind);
  }
  setTimeout(()=>{const cur=S.dungeonV1;if(cur?.feedback)pushLog(cur,`${cur.feedback.title}: ${cur.feedback.text}`);if(cur)cur.autoBusy=false;save();render()},120);
}

const oldDungeonView=window.dungeonV1;
window.dungeonV1=function(){let h=oldDungeonView();const d=S.dungeonV1;if(!d||d.state!=='combat'||!d.enemy)return h;const e=d.enemy,logs=(d.autoLog||[]).map(x=>`<div>• ${x}</div>`).join('')||'<div>Der Kampf beginnt automatisch …</div>';
  h=h.replace('<section class="d1">','<section class="d1 auto-dungeon">');
  const panel=`<div class="auto-combat-panel"><div class="auto-label">⚙ AUTOMATISCHER KAMPF</div><b>${e.name} wird automatisch bekämpft</b><p>Dein Held nutzt Angriff, Blocken, Ausweichen und Standhalten anhand seiner Werte und des angekündigten Angriffs.</p><div class="auto-log">${logs}</div></div>`;
  h=h.replace(/(<div class="d1-bank">[\s\S]*?<\/div>)/,`$1${panel}`);
  return h;
};

// ---------- Knochenhauer: premium bounty, highest AL and rewards, auto battle ----------
const oldQStart=window.qStart;
window.qStart=function(id,e){
  if(id==='bounty'){
    if(e)e.stopPropagation();
    if(S.quest||S.bountyCombat4||S.autoMiniBattle)return;
    if(S.al<36)return toast('Nicht genug Abenteuerlust. Benötigt: 36 AL.');
    S.al-=12; // bounty module deducts its original 24 => total 36
    save();
    return oldQStart(id,e);
  }
  return oldQStart(id,e);
};

let bountySeen='';
function bountyStep(){const c=S.bountyCombat4;if(!c)return;if(c.autoBusy)return;c.autoBusy=true;
  if(c.feedback){
    const txt=`${c.feedback.title}: ${c.feedback.body}`;pushLog(c,txt);
    setTimeout(()=>{window.bc4Next?.();const n=S.bountyCombat4;if(n)n.autoBusy=false;save();render()},850);return;
  }
  if(c.phase==='attack'){
    let action='quick';
    if(c.focus>=2&&c.charges?.class>0&&Math.random()<.5)action='class';
    else if(c.charges?.heavy>0&&c.exposed)action='heavy';
    else if(c.charges?.quick<=0&&c.charges?.heavy>0)action='heavy';
    if(action==='quick'&&c.charges?.quick<=0&&window.bc5Basic){window.bc5Basic()}else window.bc4Attack?.(action);
  }else{
    const m=c.enemy||{},s=fs();const opts=[['block',55+(s.block||0)+(m.block||0)],['dodge',53+(s.dodge||0)+(m.dodge||0)],['brace',70+Math.floor((s.armor||0)*.8)+(m.brace||0)]].filter(([k])=>(c.charges?.[k]||0)>0).sort((a,b)=>b[1]-a[1]);
    if(opts.length)window.bc4Defend?.(opts[0][0]);
  }
  setTimeout(()=>{const n=S.bountyCombat4;if(n?.feedback)pushLog(n,`${n.feedback.title}: ${n.feedback.body}`);if(n)n.autoBusy=false;save();render()},120);
}

// Premium reward boost after Knochenhauer completion
let lastBossResult='';
function boostBossReward(){const r=S.questResult;if(!r||r.name!=='Der Knochenhauer')return;const key=`${r.gold}|${r.xp}|${r.cat}`;if(lastBossResult===key||r.premiumBoosted)return;r.premiumBoosted=true;const goldBonus=120,xpBonus=35;S.gold+=goldBonus;gainXP(xpBonus);r.gold+=goldBonus;r.xp+=xpBonus;r.cat=(r.cat||'KOPFGELD')+' · PREMIUM';log(`Premium-Kopfgeldbonus: +${goldBonus} Gold · +${xpBonus} XP.`);lastBossResult=key;save()}

// ---------- New short automatic miniboss quest ----------
function startMini(){if(S.quest||S.bountyCombat4||S.autoMiniBattle)return toast('Es kann nur ein Auftrag gleichzeitig laufen.');if(S.al<16)return toast('Nicht genug Abenteuerlust. Benötigt: 16 AL.');const s=fs();S.al-=16;S.autoMiniBattle={name:'Knochenwache',icon:'⚔️',hp:Math.max(65,55+S.lvl*5),maxHp:Math.max(65,55+S.lvl*5),playerHp:s.hp,maxPlayerHp:s.hp,round:1,log:['Die Knochenwache erhebt sich. Der Kampf beginnt automatisch.'],busy:false};S.screen='home';save();render()}
function miniStep(){const c=S.autoMiniBattle;if(!c||c.busy)return;c.busy=true;const s=fs();let hit=clamp(72+Math.floor((Math.max(s.str,s.agi,s.int)-8)*1.4),55,90),heroDmg=0;if(Math.random()*100<hit){heroDmg=Math.max(4,Math.floor(5+(s.damage||0)+Math.max(s.str,s.agi,s.int)*.45+Math.random()*5));if(Math.random()*100<(s.crit||0)+5)heroDmg=Math.floor(heroDmg*1.5);c.hp=Math.max(0,c.hp-heroDmg);pushLog(c,`Runde ${c.round}: ${S.name} trifft für ${heroDmg} Schaden.`)}else pushLog(c,`Runde ${c.round}: ${S.name} verfehlt.`);
  if(c.hp<=0){const gold=Math.floor(45+Math.random()*46),xp=38+S.lvl*2;S.gold+=gold;const levels=gainXP(xp);let item=null;if(Math.random()<.35&&S.items.length<S.invCap&&window.createLoot){item=createLoot('event',Math.random()<.2?'rare':'common',S.lvl);S.items.push(item)}S.quests++;S.autoMiniBattle=null;S.questResult={name:'Knochenwache',icon:'⚔️',cat:'MINIBOSS · AUTOMATISCH',gold,xp,levels,material:0,item:item?.name||null,itemRarity:item?.rarity||null,itemStats:item&&window.itemBonusText?itemBonusText(item):null};log(`Miniboss besiegt: +${gold} Gold · +${xp} XP.`);save();render();return}
  const armor=Math.min(.5,(s.armor||0)*.018),enemyHit=68,blocked=Math.random()*100<clamp(45+(s.block||0)+(s.dodge||0)*.5,25,80);let dmg=blocked?Math.max(1,Math.floor((7+S.lvl+Math.random()*5)*(1-armor)*.45)):Math.max(2,Math.floor((7+S.lvl+Math.random()*5)*(1-armor)));c.playerHp=Math.max(0,c.playerHp-dmg);pushLog(c,`Knochenwache greift an: ${blocked?'teilweise abgewehrt · ':''}${dmg} Schaden.`);if(c.playerHp<=0){S.hp=Math.max(1,Math.floor(s.hp*.4));S.autoMiniBattle=null;log('Die Knochenwache zwingt dich zum Rückzug.');toast('Miniboss verloren. Keine Belohnung.');save();render();return}c.round++;c.busy=false;save();render()}
window.startAutoMiniBoss=startMini;

function miniView(c){const hp=Math.round(c.hp/c.maxHp*100),pp=Math.round(c.playerHp/c.maxPlayerHp*100);return `<section class="auto-mini"><div class="auto-head"><div><small>MINIBOSS · AUTOMATISCH · RUNDE ${c.round}</small><h1>⚔️ ${c.name}</h1></div><span>⚡ 16 AL</span></div><div class="auto-bars"><div><b>${c.name}</b><em>${c.hp}/${c.maxHp}</em><i><u style="width:${hp}%"></u></i></div><div><b>${S.name}</b><em>${c.playerHp}/${c.maxPlayerHp}</em><i><u style="width:${pp}%"></u></i></div></div><div class="auto-combat-panel"><div class="auto-label">⚙ KAMPF LÄUFT</div><p>Der Kampf läuft vollständig automatisch. Deine Stats und Ausrüstung bestimmen Treffer, Schaden und Verteidigung.</p><div class="auto-log">${(c.autoLog||c.log||[]).map(x=>`<div>• ${x}</div>`).join('')}</div></div></section>`}

const oldHome=window.home;
window.home=function(){if(S.autoMiniBattle)return miniView(S.autoMiniBattle);let h=oldHome();
  h=h.replace(/⚡ 24/g,'⚡ 36').replace(/Quest starten · ⚡ 24/g,'Quest starten · ⚡ 36').replace(/Benötigt: 24 AL/g,'Benötigt: 36 AL');
  h=h.replace(/(<div class="quest-list">)/,`$1<article class="quest-card" onclick="event.stopPropagation()"><div class="quest-summary"><div class="q-icon">⚔️</div><div class="q-main"><div class="q-title"><b>Knochenwache</b><span class="q-cat">MINIBOSS · AUTO</span></div><p>Kurzer automatischer Kampf mit geringerem Risiko und weniger Beute als der Knochenhauer.</p><div class="q-meta"><span>⏱ kurz</span><span>⚡ 16</span><span>✦ ~${38+S.lvl*2} XP</span></div></div><span class="chev">›</span></div><div class="quest-expand" style="display:block"><p>Der Kampf läuft automatisch mit sichtbaren Lebensbalken und Kampfprotokoll. Ideal für eine schnelle Kampfrunde zwischen normalen Quests.</p><div class="detail-grid"><span><b>kurz</b><small>Dauer</small></span><span><b>16</b><small>AL</small></span><span><b>45–90</b><small>Gold</small></span><span><b>niedriger</b><small>Loot</small></span></div><button class="start-q" onclick="startAutoMiniBoss();event.stopPropagation()">Automatischen Kampf starten · ⚡ 16</button></div></article>`);
  return h};

const oldRender=window.render;window.render=function(){oldRender();boostBossReward()};
setInterval(()=>{if(S.dungeonV1?.state==='combat')dungeonStep();if(S.bountyCombat4)bountyStep();if(S.autoMiniBattle)miniStep()},1050);

const style=document.createElement('style');style.textContent=`
.auto-dungeon .d1-actions{display:none!important}.auto-dungeon .d1-tele{opacity:.75}.auto-combat-panel{margin:8px 0;padding:10px;background:#0d0a12;border:1px solid #ffffff12;border-radius:12px}.auto-combat-panel .auto-label{font-size:8px;letter-spacing:1px;color:var(--gold);font-weight:900}.auto-combat-panel>b{display:block;font-size:11px;margin:3px 0}.auto-combat-panel>p{font-size:8px;color:var(--muted);margin:2px 0 8px}.auto-log{background:#08060b;border-radius:9px;padding:8px;min-height:54px;max-height:130px;overflow:auto;font-size:8px;color:#d8cde0;line-height:1.5}.auto-mini{max-width:700px;margin:auto}.auto-head{display:flex;justify-content:space-between;align-items:center;background:var(--panel);padding:12px;border-radius:14px}.auto-head small{font-size:8px;color:var(--muted)}.auto-head h1{font-size:18px;margin:2px 0}.auto-head>span{font-size:10px;color:var(--gold)}.auto-bars{margin:9px 0;background:var(--panel);padding:10px;border-radius:13px}.auto-bars>div{margin:6px 0}.auto-bars b,.auto-bars em{font-size:9px;font-style:normal}.auto-bars em{float:right;color:var(--muted)}.auto-bars i{clear:both;display:block;height:8px;background:#ffffff0b;border-radius:99px;overflow:hidden;margin-top:3px}.auto-bars u{display:block;height:100%;background:var(--danger);text-decoration:none}.auto-bars>div:last-child u{background:var(--ok)}
`;
document.head.appendChild(style);
})();