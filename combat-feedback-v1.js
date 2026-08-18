(()=>{
'use strict';
const esc=value=>String(value??'').replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));
function stats(){try{return window.getFinalStats?getFinalStats():{armor:0,crit:0,dodge:0,block:0,damage:0}}catch{return{armor:0,crit:0,dodge:0,block:0,damage:0}}}
function item(label,value,detail=''){return `<div class="cf1-item"><small>${esc(label)}</small><b>${esc(value)}</b>${detail?`<span>${esc(detail)}</span>`:''}</div>`}
function panel(title,items,tip){return `<section class="cf1"><div class="cf1-head"><small>KAMPFANALYSE</small><b>${esc(title)}</b></div><div class="cf1-grid">${items.join('')}</div>${tip?`<div class="cf1-tip"><b>Analyse</b><span>${esc(tip)}</span></div>`:''}</section>`}
function count(log,re){return (log||[]).filter(entry=>re.test(String(entry))).length}
function sum(log,re){return (log||[]).reduce((total,entry)=>{const match=String(entry).match(re);return total+(match?Number(match[1])||0:0)},0)}
function arenaMetrics(fight){
 const stored=fight.metrics||{};
 const log=fight.log||[];
 return{
  dealt:Number.isFinite(Number(stored.dealt))?Number(stored.dealt):Math.max(0,(Number(fight.emax)||0)-(Number(fight.ehp)||0)),
  taken:Number.isFinite(Number(stored.taken))?Number(stored.taken):Math.max(0,(Number(fight.pmax)||0)-(Number(fight.php)||0)),
  crits:Number.isFinite(Number(stored.crits))?Number(stored.crits):count(log,/Kritischer Treffer/i),
  dodges:Number.isFinite(Number(stored.dodges))?Number(stored.dodges):count(log,/weichst .* Angriff aus/i),
  counters:Number.isFinite(Number(stored.counters))?Number(stored.counters):count(log,/Konter:/i)
 };
}
function arenaTip(fight,metrics,hpPct,stanceName){
 const countered=!!fight.arenaBuildV1?.counter;
 if(fight.result==='loss'){
  if(metrics.taken>fight.pmax*.65)return'Deine Defensive war der Engpass. Mehr Rüstung, Ausweichen, Block oder eine passendere Haltung erhöhen die Überlebenschance.';
  if(metrics.dealt<fight.emax*.75)return'Dein verursachter Schaden reichte nicht aus. Prüfe Waffenwert, Kernattribute, Krit und Skillrotation.';
  return'Der Kampf war knapp. Ein gezielter Ausrüstungs- oder Haltungswechsel kann bereits den Ausschlag geben.';
 }
 if(countered)return`${stanceName} war gegen den gegnerischen Build wirksam. Du hast ${hpPct} % HP behalten${metrics.dodges+metrics.counters?` und ${metrics.dodges+metrics.counters} Angriff${metrics.dodges+metrics.counters===1?'':'e'} vermieden oder gekontert`:''}.`;
 if(hpPct<35)return`Du hast gewonnen, aber nur ${hpPct} % HP behalten. Mehr Defensive würde diesen Gegner zuverlässiger machen.`;
 if(metrics.crits+metrics.dodges+metrics.counters>0)return`Deine Spezialwerte haben den Kampf geprägt: ${metrics.crits} kritische Treffer und ${metrics.dodges+metrics.counters} Ausweich-/Konteraktion${metrics.dodges+metrics.counters===1?'':'en'}.`;
 return`Solider Sieg über Grundwerte. ${stanceName} hat funktioniert; Krit, Ausweichen oder Block könnten dein Buildprofil noch deutlicher machen.`;
}
function arenaFeedback(){
 const fight=S.arenaV2?.fight;
 if(!fight?.done)return;
 const host=document.querySelector('.av2-reward');
 if(!host||host.querySelector('.cf1'))return;
 const metrics=arenaMetrics(fight),hpPct=Math.max(0,Math.round((Number(fight.php)||0)/(Number(fight.pmax)||1)*100));
 const stanceName=window.Arcane?.arenaSystem?.STANCES?.[fight.stance]?.name||fight.stance||'—';
 const actions=metrics.dodges+metrics.counters;
 const items=[item('Verursachter Schaden',metrics.dealt,`${fight.round||0} Runden`),item('Erlittener Schaden',metrics.taken,`${hpPct}% HP übrig`),item('Kritische Treffer',metrics.crits),item('Ausweichen / Konter',actions,`Haltung: ${stanceName}`)];
 host.querySelector('button')?.insertAdjacentHTML('beforebegin',panel(fight.result==='win'?'Warum du gewonnen hast':'Warum du verloren hast',items,arenaTip(fight,metrics,hpPct,stanceName)));
}
function bountyFeedback(){const c=S.bountyCombat4;if(!c?.feedback?.end)return;const host=document.querySelector('.bc4-feedback');if(!host||host.querySelector('.cf1'))return;const st=stats(),win=c.feedback.end==='win',hpPct=Math.max(0,Math.round((c.playerHp/(st.hp||1))*100));let tip;if(!win){if(c.mistakes>=3)tip='Mehrere Fehlentscheidungen haben die Wertung und Überlebenschance gedrückt. Nutze die angekündigten Angriffstypen gezielter.';else if(c.damageTaken>(st.hp||1)*.65)tip='Der eingehende Schaden war zu hoch. Rüstung und passende Verteidigungsreaktionen sind hier wichtiger.';else tip='Der Kampf war knapp. Fokusfenster und Verwundbarkeit konsequenter auszunutzen dürfte reichen.'}else if(c.perfect>=2)tip='Perfekte Verteidigungen haben Fokus und Schadensfenster erzeugt. Genau darauf ist dieser Kampf ausgelegt.';else if(c.mistakes===0)tip='Sauberer Kampf ohne Fehlentscheidung. Für eine höhere Wertung helfen mehr perfekte Verteidigungen.';else tip='Sieg trotz Fehlern. Weniger Fehlentscheidungen erhöhen Wertung, Gold und Beutequalität.';host.querySelector('button')?.insertAdjacentHTML('beforebegin',panel(win?'Kampfwertung erklärt':'Niederlage erklärt',[item('Restleben',`${hpPct}%`,`${c.playerHp}/${st.hp||c.playerHp} HP`),item('Schaden erhalten',c.damageTaken||0),item('Perfekte Abwehr',c.perfect||0,'erzeugt Fokus'),item('Fehler',c.mistakes||0,`${c.round||0} Runden`)],tip))}
function dungeonFeedback(){const d=S.dungeonV1;if(!d||!['cleared','complete','feedback'].includes(d.state)||!d.feedback)return;const host=document.querySelector('.dv7-result');if(!host||host.querySelector('.cf1'))return;const st=stats(),hpPct=Math.max(0,Math.round((d.hp/(d.maxHp||1))*100));let tip;if(!d.feedback.good)tip='Fehlgeschlagene Ereignisproben kosten mit zunehmender Tiefe mehr HP. Wähle häufiger dein stärkstes Attribut.';else if(d.state==='complete'&&hpPct<35)tip='Der Boss wurde knapp besiegt. Mehr Rüstung, Ausweichen oder Block erhöhen die Zuverlässigkeit des gesamten Runs.';else if(hpPct<45)tip='Du verlierst im Run viel Leben. Der Schrein und defensive Ausrüstung werden mit zunehmender Tiefe wichtiger.';else if((st.armor||0)+(st.dodge||0)+(st.block||0)>0)tip='Deine Defensive hält den Run stabil. Du kannst bei guter Ausrüstung eher auf riskantere Räume setzen.';else tip='Der Run basiert aktuell vor allem auf Rohwerten. Defensive Sekundärwerte machen spätere Räume verlässlicher.';host.querySelector('button')?.insertAdjacentHTML('beforebegin',panel(d.state==='complete'?'Expedition ausgewertet':'Raum ausgewertet',[item('Restleben',`${hpPct}%`,`${d.hp}/${d.maxHp} HP`),item('Run-Gold',d.gold||0,'noch ungesichert'),item('Run-XP',d.xp||0,'noch ungesichert'),item('Beute',(d.loot||[]).length,`Raum ${Math.min(10,(d.room||0)+1)}/10`)],tip))}
let prevMini=null;
function rememberMini(){if(S.autoMiniBattle)prevMini={...S.autoMiniBattle,autoLog:[...(S.autoMiniBattle.autoLog||[])]}}
function miniFeedback(){if(S.autoMiniBattle){rememberMini();return}if(!prevMini)return;const r=S.questResult;if(!r||!/Knochenwache|MINIBOSS/i.test(`${r.name||''} ${r.cat||''}`)){prevMini=null;return}const host=document.querySelector('.reward-card');if(!host||host.querySelector('.cf1'))return;const dealt=Math.max(0,(Number(prevMini.maxHp)||0)-(Number(prevMini.hp)||0)),taken=Math.max(0,(Number(prevMini.maxPlayerHp)||0)-(Number(prevMini.playerHp)||0)),hpPct=Math.max(0,Math.round((Number(prevMini.playerHp)||0)/(Number(prevMini.maxPlayerHp)||1)*100));const tip=hpPct<35?'Der Miniboss wurde knapp gewonnen. Mehr defensive Werte würden den automatischen Kampf zuverlässiger machen.':'Der automatische Kampf war stabil. Diese Aktivität eignet sich als risikoärmere Alternative zum Knochenhauer.';host.querySelector('button')?.insertAdjacentHTML('beforebegin',panel('Automatischen Kampf ausgewertet',[item('Schaden',dealt),item('Erlittener Schaden',taken),item('Restleben',`${hpPct}%`),item('Runden',prevMini.round||'—')],tip));prevMini=null}
function apply(){arenaFeedback();bountyFeedback();dungeonFeedback();miniFeedback()}
window.Arcane?.on?.('beforeRender',rememberMini);window.Arcane?.on?.('afterRenderSettled',apply);
const css=document.createElement('style');css.textContent=`.cf1{margin:9px 0;padding:10px 2px 0;border-top:1px solid #ffffff12;text-align:left;background:transparent}.cf1-head small,.cf1-head b{display:block}.cf1-head small{font-size:8px;letter-spacing:.8px;color:var(--gold)}.cf1-head b{font-size:12px;margin-top:1px}.cf1-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px;margin-top:7px}.cf1-item{min-width:0;padding:6px 0;border-bottom:1px solid #ffffff0b;background:transparent}.cf1-item small,.cf1-item b,.cf1-item span{display:block}.cf1-item small{font-size:8px;color:var(--muted)}.cf1-item b{font-size:12px;margin:1px 0}.cf1-item span{font-size:8px;color:#cfc2d7}.cf1-tip{margin-top:8px;padding:8px 9px;border-radius:8px;background:#a875ff0d;border-left:2px solid var(--accent)}.cf1-tip b,.cf1-tip span{display:block}.cf1-tip b{font-size:8px;color:#c9a9ff}.cf1-tip span{font-size:9px;line-height:1.35;color:#d8ccdf}.av2-reward .cf1{margin-top:8px}.dv7-result .cf1{max-width:520px;margin:11px auto;text-align:left}.bc4-feedback .cf1{text-align:left}@media(max-width:430px){.cf1-grid{gap:0 10px}.cf1-item{padding:5px 0}.cf1-item b{font-size:11px}.cf1-tip{padding:7px 8px}}`;document.head.appendChild(css);rememberMini();queueMicrotask(apply);
})();