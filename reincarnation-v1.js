(()=>{
'use strict';
const UNLOCK_LEVEL=100;
const LEGENDARY_SOUL_COST=50;
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
function meta(state=S){
 state.reincarnation=state.reincarnation&&typeof state.reincarnation==='object'?state.reincarnation:{};
 const r=state.reincarnation;
 r.count=Math.max(0,Number(r.count)||0);
 r.bestLevel=Math.max(Number(state.lvl)||1,Number(r.bestLevel)||1);
 r.lifetimeSouls=Math.max(Number(state.souls)||0,Number(r.lifetimeSouls)||0);
 r.lastAt=Math.max(0,Number(r.lastAt)||0);
 return r;
}
function reward(state=S){
 const lvl=Math.max(1,Number(state.lvl)||1);
 const eligible=lvl>=UNLOCK_LEVEL;
 if(!eligible)return {eligible:false,total:0,base:0,level:0,quests:0,arena:0};
 const base=15;
 const level=Math.min(10,Math.floor(Math.max(0,lvl-UNLOCK_LEVEL)/5));
 const quests=Math.min(5,Math.floor(Math.max(0,Number(state.quests)||0)/25));
 const arena=Math.min(5,Math.floor(Math.max(0,Number(state.wins)||0)/20));
 return {eligible:true,total:base+level+quests+arena,base,level,quests,arena};
}
function preview(state=S){
 const r=meta(state),gain=reward(state),souls=Math.max(0,Number(state.souls)||0),after=souls+gain.total;
 return {unlockLevel:UNLOCK_LEVEL,legendarySoulCost:LEGENDARY_SOUL_COST,currentLevel:Number(state.lvl)||1,reincarnations:r.count,currentSouls:souls,afterSouls:after,gain,legendaryProgress:Math.min(1,after/LEGENDARY_SOUL_COST)};
}
function row(label,value,active=true){return `<div class="rc12-row ${active?'':'muted'}"><span>${label}</span><b>${value}</b></div>`}
function view(state=S){
 const p=preview(state),g=p.gain,missing=Math.max(0,p.unlockLevel-p.currentLevel),pct=Math.min(100,Math.round(p.currentLevel/p.unlockLevel*100));
 return `<section class="rc12" data-reincarnation-preview><div class="rc12-head"><div><small>ARKANE WIEDERGEBURT · VORSCHAU</small><h2>Reinkarnation</h2><p>Ein neuer Lebenszyklus wandelt deinen Fortschritt in dauerhafte <b>Seelensteine</b> um.</p></div><div class="rc12-soul"><span>◆</span><b>${p.currentSouls}</b><small>Seelensteine</small></div></div>${!g.eligible?`<div class="rc12-lock"><div class="rc12-lockline"><b>Freischaltung auf Stufe ${p.unlockLevel}</b><span>Noch ${missing} Stufen</span></div><div class="rc12-progress"><i style="width:${pct}%"></i></div><small>Die Vorschau zeigt bereits die geplanten Regeln. Eine Reinkarnation kann in dieser Version noch nicht ausgelöst werden.</small></div>`:`<div class="rc12-reward"><span>Voraussichtliche Belohnung</span><strong>+${g.total} ◆</strong><small>Danach: ${p.afterSouls} Seelensteine</small></div>`}<div class="rc12-grid"><div class="rc12-panel"><h3>Seelenstein-Berechnung</h3>${row('Basis ab Stufe 100',g.eligible?`+${g.base}`:'—',g.eligible)}${row('Stufenbonus',g.eligible?`+${g.level}`:'—',g.eligible)}${row('Quest-Meilensteine',g.eligible?`+${g.quests}`:'—',g.eligible)}${row('Arena-Siege',g.eligible?`+${g.arena}`:'—',g.eligible)}</div><div class="rc12-panel"><h3>Legendäres Ahnenwerk</h3><div class="rc12-legend"><div><b>${p.afterSouls}/${p.legendarySoulCost} ◆</b><small>Seelenstein-Anteil für ein legendäres Item</small></div><div class="rc12-progress"><i style="width:${Math.round(p.legendaryProgress*100)}%"></i></div></div><small>Die Ahnenschmiede benötigt weiterhin 50 Seelensteine sowie ihre übrigen Materialien.</small></div></div><div class="rc12-rules"><div><h3>Bleibt erhalten</h3><p>Name, Klasse & Herkunft · Seelensteine · Reinkarnationshistorie · legendäre Ausrüstung*</p></div><div><h3>Wird zurückgesetzt</h3><p>Stufe & XP · Gold · aktive Runs · gewöhnliche Fortschrittsressourcen · nicht-legendäre Ausrüstung*</p></div></div><div class="rc12-note"><b>Foundation v1</b><span>* Reset-Regeln sind Vorschau und werden vor Aktivierung des Systems nochmals finalisiert. In v0.12.0 findet kein Reset statt.</span></div></section>`;
}
function mount(){
 if(typeof S==='undefined'||S.screen!=='char')return;
 const main=document.querySelector('main');if(!main||main.querySelector('[data-reincarnation-preview]'))return;
 const host=document.createElement('div');host.innerHTML=view(S);main.appendChild(host.firstElementChild);
}
const API={unlockLevel:UNLOCK_LEVEL,legendarySoulCost:LEGENDARY_SOUL_COST,meta,reward,preview,view};
window.Arcane=window.Arcane||{};Arcane.reincarnation=API;window.REINCARNATION_SYSTEM=API;
Arcane.on?.('beforeSave',()=>meta(S));
Arcane.on?.('afterRenderSettled',mount);
Arcane.on?.('bootReady',mount);
const css=document.createElement('style');css.textContent=`.rc12{max-width:760px;margin:12px auto 0;padding:16px;border-radius:20px;border:1px solid #a875ff35;background:radial-gradient(circle at 88% 0,#8c55c51b,transparent 34%),linear-gradient(145deg,#20172c,#140f1c);box-shadow:0 18px 48px #0005}.rc12-head{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:start}.rc12-head small{font-size:8px;letter-spacing:.12em;color:#b893e8}.rc12-head h2{font-size:22px;margin:3px 0 4px}.rc12-head p{font-size:10px;line-height:1.45;color:var(--muted);margin:0;max-width:460px}.rc12-soul{min-width:86px;text-align:center;padding:10px 9px;border-radius:14px;background:#ffffff07;border:1px solid #d5a3ff22}.rc12-soul>span{display:block;font-size:20px;color:#c78cff;text-shadow:0 0 14px #a875ff}.rc12-soul>b{display:block;font-size:17px;color:#f4c15d}.rc12-soul>small{font-size:7px;color:var(--muted)}.rc12-lock,.rc12-reward{margin-top:14px;padding:12px;border-radius:13px;background:#ffffff06;border:1px solid #ffffff0d}.rc12-lockline{display:flex;justify-content:space-between;gap:8px;font-size:10px}.rc12-lockline span{color:var(--gold)}.rc12-progress{height:6px;margin:8px 0;background:#ffffff0b;border-radius:99px;overflow:hidden}.rc12-progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#8e5be5,#c88cff,#f4c15d)}.rc12-lock>small,.rc12-panel>small{font-size:8px;line-height:1.4;color:var(--muted)}.rc12-reward{display:grid;grid-template-columns:1fr auto;align-items:center}.rc12-reward span{font-size:9px;color:var(--muted)}.rc12-reward strong{grid-row:1/3;grid-column:2;font-size:24px;color:#f4c15d}.rc12-reward small{font-size:8px;color:#cbbbd5}.rc12-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}.rc12-panel{padding:11px;border-radius:13px;background:#0d09127a;border:1px solid #ffffff0b}.rc12-panel h3,.rc12-rules h3{font-size:10px;margin:0 0 8px}.rc12-row{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px solid #ffffff08;font-size:8px}.rc12-row:last-child{border-bottom:0}.rc12-row span{color:var(--muted)}.rc12-row b{color:#f4c15d}.rc12-row.muted{opacity:.45}.rc12-legend b{font-size:11px;color:#d2a0ff}.rc12-legend small{display:block;font-size:7px;color:var(--muted);margin-top:2px}.rc12-rules{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.rc12-rules>div{padding:10px;border-radius:12px;background:#ffffff05}.rc12-rules p{font-size:8px;line-height:1.45;color:var(--muted);margin:0}.rc12-rules>div:first-child{border-left:2px solid #71d59a}.rc12-rules>div:last-child{border-left:2px solid #e86a7a}.rc12-note{display:flex;gap:8px;align-items:flex-start;margin-top:9px;padding:9px;border-radius:10px;background:#a875ff0d;font-size:7px;color:var(--muted)}.rc12-note b{white-space:nowrap;color:#b893e8}@media(max-width:520px){.rc12{margin:10px 20px 0;padding:14px}.rc12-grid,.rc12-rules{grid-template-columns:1fr}.rc12-head{grid-template-columns:1fr 78px}.rc12-soul{min-width:78px}}`;document.head.appendChild(css);
meta(S);mount();
})();