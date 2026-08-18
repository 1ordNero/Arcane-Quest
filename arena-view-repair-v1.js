(()=>{
'use strict';
const system=window.Arcane?.arenaSystem;if(!system)return;
const CHALLENGERS=['arena_challenger_01.webp','arena_challenger_02.webp','arena_challenger_03.webp','arena_challenger_04.webp'];
const RESOURCE={Krieger:{name:'Wut',color:'#d8755c'},Magier:{name:'Mana',color:'#5e9cff'},Druide:{name:'Naturfokus',color:'#65c987'},Waldläufer:{name:'Energie',color:'#d9b95d'},Hexenmeister:{name:'Seelenfragmente',color:'#a875ff'},Totenbeschwörer:{name:'Essenz des Todes',color:'#72c9cf'}};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function repairRenderer(){
 const current=window.arena,rich=current?.__progressionGuardBase||current;
 const ok=fn=>{try{return typeof fn==='function'&&String(fn()).includes('class="av2')}catch{return false}};
 if(ok(current))return;
 if(ok(rich)){window.arena=()=>Number(S?.lvl||1)>=5?rich():`<section class="pg1-locked"><div class="pg1-lock-card"><h1>Arena ab Stufe 5</h1></div></section>`;return}
 const ST=system.STANCES;
 window.arena=function(){const a=system.ensure();if(a.fight){const f=a.fight;return `<section class="av2"><div class="av2-fight"><small>ARENAKAMPF · RUNDE ${f.round}</small><div class="av2-bars"><div><span>${esc(S.name)}</span><b>${f.php}/${f.pmax}</b><i><u style="width:${Math.max(0,f.php/f.pmax*100)}%"></u></i></div><div><span>${esc(f.o.name)}</span><b>${f.ehp}/${f.emax}</b><i><u style="width:${Math.max(0,f.ehp/f.emax*100)}%"></u></i></div></div><div class="av2-log">${f.log.slice().reverse().map(x=>`<p>${esc(x)}</p>`).join('')}</div></div></section>`}return `<section class="av2"><div class="av3-overview"><div class="av3-title"><small>ASYNCHRONE ARENA</small><h1>Arena</h1><p>Wähle Haltung und Herausforderer. Ausrüstung, Attribute und deine Skillrotation entscheiden gemeinsam.</p></div><div class="av3-rank"><b>${system.league()}</b><span>${Number(S.arena)||0} Ruhm</span></div></div><div class="av3-section"><div><small>1 · TAKTIK</small><h2>Kampfhaltung</h2></div></div><div class="av2-stances">${Object.entries(ST).map(([k,v])=>`<button class="${a.stance===k?'sel':''}" onclick="arenaV2Stance('${k}')"><b>${v.icon}<span>${v.name}</span></b></button>`).join('')}</div><div class="av2-stance-detail"><b>${ST[a.stance]?.name||''}</b><span>${ST[a.stance]?.desc||''}</span></div><div class="av3-section"><div><small>2 · HERAUSFORDERER</small><h2>Gegner wählen</h2></div></div><div class="av2-ops">${a.opponents.map(o=>`<button onclick="arenaV2Start('${o.id}')"><div class="av2-ophead"><span>◆</span><div><b>${esc(o.name)}</b><small>Stufe ${o.lvl} · ${o.cls} · Kampfstärke ${o.power}</small></div><em>${system.difficulty(o.kind)}</em></div><div class="av2-power"><span>+${o.reward} Ruhm</span><span>+${o.coins} Münzen</span></div></button>`).join('')}</div></section>`}
}
function opponentAsset(f){const list=S?.arenaV2?.opponents||[],index=list.findIndex(o=>String(o.id)===String(f?.o?.id));return `assets/icons/ui/${CHALLENGERS[(index>=0?index:0)%CHALLENGERS.length]}`}
function heroAsset(){try{return window.getHeroPortrait?.({cls:S.cls,gender:S.gender})||'assets/icons/nav-held.webp'}catch{return'assets/icons/nav-held.webp'}}
function decorateFight(){
 if(typeof S==='undefined'||S?.screen!=='arena')return;
 const f=S.arenaV2?.fight,root=document.querySelector('.av2-fight');if(!f||!root)return;
 root.classList.add('av14-fight');
 const rows=root.querySelectorAll('.av2-bars>div');if(rows.length<2)return;
 const hero=rows[0],enemy=rows[1],heroLabel=hero.querySelector(':scope>span'),enemyLabel=enemy.querySelector(':scope>span');
 if(heroLabel)heroLabel.innerHTML=`<img class="av14-combatant" src="${heroAsset()}" alt="" decoding="async"><span>${esc(S.name)}</span>`;
 if(enemyLabel)enemyLabel.innerHTML=`<img class="av14-combatant" src="${opponentAsset(f)}" alt="" decoding="async"><span>${esc(f.o?.name||'Gegner')}</span>`;
 const ss=S.skillSystem,profile=RESOURCE[S.cls]||{name:'Klassenressource',color:'#a875ff'},max=Math.max(1,Number(ss?.maxResource)||100),value=Math.max(0,Math.min(max,Number(ss?.resource)||0)),pct=Math.round(value/max*100);
 let resource=hero.querySelector('.av14-resource');if(!resource){resource=document.createElement('div');resource.className='av14-resource';hero.appendChild(resource)}
 resource.style.setProperty('--resource-color',profile.color);resource.innerHTML=`<div class="av14-resource-head"><span>${esc(profile.name)}</span><b>${Math.round(value)}/${Math.round(max)}</b></div><i class="av14-resource-track"><u style="width:${pct}%"></u></i>`;
}
repairRenderer();
window.Arcane?.on?.('afterRenderSettled',decorateFight);window.Arcane?.on?.('bootReady',decorateFight);queueMicrotask(decorateFight);
const style=document.createElement('style');style.textContent=`
.av2-fight>.rfix-combat-resource,.av3-fight>.rfix-combat-resource{display:none!important}
.av14-fight .av2-bars>div>span{display:flex!important;align-items:center!important;gap:7px!important;min-width:0!important;font-weight:800!important}
.av14-combatant{width:30px!important;height:30px!important;min-width:30px!important;max-width:30px!important;object-fit:contain!important;filter:drop-shadow(0 3px 5px #0008)}
.av14-fight .av2-bars>div>span>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.av14-resource{grid-column:1/-1!important;display:grid!important;gap:4px!important;margin-top:2px!important;padding:5px 7px!important;border:1px solid color-mix(in srgb,var(--resource-color) 38%,transparent)!important;border-radius:9px!important;background:color-mix(in srgb,var(--resource-color) 8%,#0d0912)!important}
.av14-resource-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;font-size:7.5px!important;color:#d8cde0!important}
.av14-resource-head span{color:var(--resource-color)!important;font-weight:900!important;letter-spacing:.04em!important;text-transform:uppercase!important}
.av14-resource-head b{font-size:8px!important;color:#f2eaf5!important}
.av14-resource-track{display:block!important;grid-column:auto!important;width:100%!important;height:7px!important;border-radius:99px!important;overflow:hidden!important;background:#09070d!important;border:1px solid #ffffff08!important}
.av14-resource-track u{display:block!important;height:100%!important;border-radius:inherit!important;background:linear-gradient(90deg,color-mix(in srgb,var(--resource-color) 75%,#fff 5%),var(--resource-color))!important;box-shadow:0 0 12px color-mix(in srgb,var(--resource-color) 45%,transparent)!important;transition:width .3s ease!important}
@media(max-width:430px){.av14-combatant{width:27px!important;height:27px!important;min-width:27px!important;max-width:27px!important}.av14-resource{padding:4px 6px!important}.av14-resource-track{height:6px!important}}
`;document.head.appendChild(style);
})();