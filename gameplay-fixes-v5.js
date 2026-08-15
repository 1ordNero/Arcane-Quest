(()=>{
/* Gameplay fixes v5: dynamic dungeon next-room labels, fixed arena choices,
   and real defense exhaustion for the Knochenhauer bounty. */

// Dungeon: derive the label from the current room at render time. This also
// repairs stale labels left in persisted/legacy feedback markup.
function fixDungeonNextLabel(){
  if(S.screen!=='dungeon'||!S.dungeonV1)return;
  const d=S.dungeonV1;
  if(!['feedback','cleared','complete'].includes(d.state))return;
  document.querySelectorAll('main button').forEach(btn=>{
    if(btn.getAttribute('onclick')!=='d1Next()')return;
    btn.textContent=d.state==='complete'?'Expedition abschließen':`Weiter zu Raum ${Math.min(10,(Number(d.room)||0)+2)}`;
  });
}

// Arena: the three generated opponents are the complete choice set. No manual
// reroll button; after a completed fight arenaV2Done still creates the next set.
function fixArenaChoices(){
  if(S.screen!=='arena')return;
  document.querySelectorAll('.av2-refresh').forEach(x=>x.remove());
}

// Bounty defense exhaustion. v4 automatically replenished all defensive
// charges when the pool reached zero. Disable only that replenishment and add
// an explicit unprotected action when no defense remains.
const oldRefresh=window.bc4Refresh;
// bc4's refresh is private, so normalize state after every public defense/next
// transition and remember whether the defense pool was exhausted.
function defenseEmpty(c){return !!c&&Number(c.charges?.block||0)<=0&&Number(c.charges?.dodge||0)<=0&&Number(c.charges?.brace||0)<=0}
function markDefenseExhaustion(c){
  if(!c)return;
  // v4 refills to exactly 2/2/2. If the previous action consumed the last
  // defense, gameplay-fixes records that fact before the next defense screen.
  if(c._defenseExhausted){c.charges.block=0;c.charges.dodge=0;c.charges.brace=0;}
}
const baseDefend=window.bc4Defend;
if(baseDefend){
  window.bc4Defend=function(id){
    const c=S.bountyCombat4;
    if(!c)return baseDefend(id);
    const before={block:Number(c.charges?.block||0),dodge:Number(c.charges?.dodge||0),brace:Number(c.charges?.brace||0)};
    const last=(before.block+before.dodge+before.brace)===1 && Number(before[id]||0)===1;
    const out=baseDefend(id);
    const n=S.bountyCombat4;
    if(n&&last){n._defenseExhausted=true;n.charges.block=0;n.charges.dodge=0;n.charges.brace=0;save();}
    return out;
  };
}
window.bc5NoDefense=function(){
  const c=S.bountyCombat4;if(!c||c.phase!=='defense'||c.feedback||!c.enemy||!defenseEmpty(c))return;
  const s=window.getFinalStats?getFinalStats():{armor:0};
  const m=c.enemy,phase=c.bossHp/118>.6?1:c.bossHp/118>.3?2:3,phaseMult=phase===3?1.18:phase===2?1.08:1;
  // Full hit: no block/dodge/brace reduction. Armor remains a passive stat.
  const raw=Math.max(1,Math.floor((12+Math.random()*7+(S.lvl||1)*.55)*(m.mult||1)*phaseMult-Math.floor((s.armor||0)*.25)));
  c.turns=(c.turns||0)+1;c.mistakes=(c.mistakes||0)+1;c.damageTaken=(c.damageTaken||0)+raw;c.playerHp=Math.max(0,c.playerHp-raw);
  if(c.playerHp<=0)c.feedback={title:'Niederlage',body:`Keine Verteidigung mehr verfügbar. ${m.name} trifft ungebremst für ${raw} Schaden.`,tone:'bad',end:'lose'};
  else{c.round++;c.phase='attack';c.enemy=null;c.feedback={title:'Ungeschützt getroffen',body:`Alle Verteidigungsladungen sind verbraucht. Du kannst nicht reagieren und erleidest ${raw} Schaden.`,tone:'bad',next:'attack'};}
  save();render();
};

// Add the exhausted-state action to the bounty UI after all earlier home
// decorators have rendered.
function fixBountyDefense(){
  const c=S.bountyCombat4;if(S.screen!=='home'||!c||c.phase!=='defense'||c.feedback)return;
  markDefenseExhaustion(c);
  if(!defenseEmpty(c))return;
  const actions=document.querySelector('.bc4-actions');if(!actions)return;
  actions.querySelectorAll('button').forEach(b=>b.remove());
  const b=document.createElement('button');b.className='bc5-nodef';b.setAttribute('onclick','bc5NoDefense()');
  b.innerHTML='<span>💥</span><b>Keine Verteidigung möglich</b><small>Alle Ladungen verbraucht · voller Treffer</small><em>0 Ladungen</em>';
  actions.appendChild(b);
  const note=document.querySelector('.bc4-note');if(note)note.textContent='Deine Verteidigungsoptionen sind erschöpft. Der nächste Angriff trifft ohne aktive Schadensreduktion; nur passive Rüstung wirkt weiterhin.';
}

const prevRender=window.render;
window.render=function(){const out=prevRender.apply(this,arguments);queueMicrotask(()=>{fixDungeonNextLabel();fixArenaChoices();fixBountyDefense()});return out};
const css=document.createElement('style');css.textContent='.bc5-nodef{width:100%;display:grid!important;grid-template-columns:34px 1fr auto;gap:6px;align-items:center;text-align:left!important;background:#e86a7a14!important;border:1px solid #e86a7a55!important;box-shadow:none!important}.bc5-nodef span{font-size:21px}.bc5-nodef b,.bc5-nodef small,.bc5-nodef em{display:block}.bc5-nodef small,.bc5-nodef em{font-size:8px;color:var(--muted)}.bc5-nodef em{font-style:normal;color:var(--danger)}';document.head.appendChild(css);
queueMicrotask(()=>{fixDungeonNextLabel();fixArenaChoices();fixBountyDefense()});
})();