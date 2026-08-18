(()=>{
'use strict';
const arenaDoneBase=window.arenaV2Done;
const dungeonAttackBase=window.d1Attack;
const dungeonDefendBase=window.d1Defend;
const bountyAttackBase=window.bc4Attack;
const bountyDefendBase=window.bc4Defend;

function resetResource(){
 if(!S.skillSystem)return;
 S.skillSystem.resource=S.skillSystem.maxResource||100;
 S.skillSystem.rotation=0;
 save?.();
}
function legacyDamageMultiplier(){return 1+(Number(window.REINCARNATION_SYSTEM?.bonuses?.(S)?.damagePct)||0)}
function baseDamage(st){const raw=(st.damage||4)+(st.str+st.agi+st.int)/5+Math.random()*8;return Math.max(2,Math.round(raw*legacyDamageMultiplier()))}
function skillLabel(skill){return skill?.name||'Fertigkeit'}
function skillFeedback(skill,text,good=true){return{good,title:skillLabel(skill),text,iconAsset:skill?.iconAsset||null}}
function arenaLeague(){return window.Arcane?.arenaSystem?.league?.()||'Bronze'}
function metrics(f){return f.metrics||(f.metrics={dealt:0,taken:0,crits:0,dodges:0,counters:0})}
function deal(f,amount){const n=Math.max(0,Math.min(Number(amount)||0,Number(f.ehp)||0));f.ehp=Math.max(0,(Number(f.ehp)||0)-n);metrics(f).dealt+=n;return n}
function take(f,amount){const n=Math.max(0,Math.min(Number(amount)||0,Number(f.php)||0));f.php=Math.max(0,(Number(f.php)||0)-n);metrics(f).taken+=n;return n}

function startArena(id){
 const arena=S.arenaV2,opponent=arena?.opponents?.find(x=>x.id===id);
 if(!arena||!opponent)return;
 resetResource();
 const buildApi=window.ARCANE_ARENA_BUILDS;
 const archetype=buildApi?.prepareMatch?.(opponent,arena.stance)||buildApi?.ensureOpponent?.(opponent)||null;
 const st=window.getFinalStats?.()||{str:S.str||8,agi:S.agi||8,int:S.int||8,hp:S.maxHp||120,damage:0,armor:0,crit:0,dodge:0};
 const max=Math.max(1,Math.round(st.hp||S.maxHp||120));
 const buildState=archetype?{archetype:opponent.archetype,counter:arena.stance===archetype.counter,opening:false,enraged:false}:null;
 const matchup=buildState?(buildState.counter?`Guter Konter: ${archetype.counterName} ist stark gegen ${archetype.name}.`:`${archetype.name}: Empfohlener Konter wäre ${archetype.counterName}.`):null;
 arena.fight={o:opponent,stance:arena.stance,php:max,pmax:max,ehp:opponent.hp,emax:opponent.hp,round:0,log:[`${opponent.name} betritt die Arena. Deine vorbereitete Skillrotation beginnt.`,...(matchup?[matchup]:[])],done:false,result:null,skillDriven:true,skillStatuses:{},arenaBuildV1:buildState,metrics:{dealt:0,taken:0,crits:0,dodges:0,counters:0}};
 save?.();render?.();setTimeout(arenaStep,450);
}
function arenaStep(){
 const f=S.arenaV2?.fight;if(!f||f.done||!f.skillDriven)return;
 const st=window.getFinalStats?.()||{str:S.str||8,agi:S.agi||8,int:S.int||8,damage:0,armor:0,crit:0,dodge:0};
 f.round++;
 const dot=window.tickSkillStatuses?.(f)||0;
 if(dot){const actual=deal(f,dot);f.log.push(`Status-Effekt verursacht ${actual} Schaden.`);if(f.ehp<=0)return finishArena(true)}
 const skill=window.getNextCombatSkill?.({enemyPct:f.ehp/f.emax*100})||null;
 const action=window.applyCombatSkill?.(baseDamage(st),skill,{enemyPct:f.ehp/f.emax*100})||{damage:baseDamage(st),name:'Angriff'};
 const critChance=(st.crit||0)+(f.stance==='aggressive'?15:0);
 let damage=Number(action.damage)||0;
 if(f.stance==='defensive')damage=Math.round(damage*.9);
 if(action.heal){const heal=Math.max(5,Math.round(f.pmax*.1));f.php=Math.min(f.pmax,f.php+heal);f.log.push(`${skillLabel(skill)}: +${heal} HP.`)}
 else if(action.guard||action.dodge){f.guard=action.guard?.55:0;f.skillDodge=action.dodge?22:0;damage=Math.round(damage*.35);f.log.push(`${skillLabel(skill)}: Verteidigung vorbereitet.`)}
 else if(Math.random()*100<critChance){damage=Math.round(damage*1.65);metrics(f).crits++;f.log.push(`${skillLabel(skill)} kritisch: ${damage} Schaden.`)}
 else f.log.push(`${skillLabel(skill)}: ${damage} Schaden.`);
 if(damage>0)deal(f,damage);
 if(action.status&&f.ehp>0&&window.applySkillStatus){applySkillStatus(f,action.status,Math.max(2,Math.round(damage*.12)));f.log.push(`${action.status} wurde angewendet.`)}
 if(action.lifesteal&&damage>0){const heal=Math.max(1,Math.round(damage*.25));f.php=Math.min(f.pmax,f.php+heal);f.log.push(`Seelenentzug heilt ${heal} HP.`)}
 if(f.ehp<=0)return finishArena(true);
 let enemyDamage=Math.max(2,Math.round(5+f.o.power/35+Math.random()*7));
 const dodgeChance=(st.dodge||0)+(f.stance==='counter'?15:0)+(f.skillDodge||0);
 if(Math.random()*100<dodgeChance){metrics(f).dodges++;f.log.push(`Du weichst ${f.o.name}s Angriff aus.`);if(f.stance==='counter'){const counter=Math.max(2,Math.round((action.damage||5)*.4));metrics(f).counters++;const actual=deal(f,counter);f.log.push(`Konter verursacht ${actual} Schaden.`);if(f.ehp<=0)return finishArena(true)}}
 else{const armor=(st.armor||0)*(f.stance==='defensive'?1.2:f.stance==='aggressive'?.9:1);enemyDamage=Math.max(1,Math.round(enemyDamage-armor*.12));if(f.guard)enemyDamage=Math.max(1,Math.round(enemyDamage*f.guard));const actual=take(f,enemyDamage);f.log.push(`${f.o.name} trifft dich für ${actual}.`)}
 f.guard=0;f.skillDodge=0;
 if(f.php<=0)return finishArena(false);
 f.log=f.log.slice(-9);save?.();render?.();setTimeout(arenaStep,700);
}
function finishArena(win){
 const f=S.arenaV2?.fight;if(!f||f.done)return;
 f.done=true;f.result=win?'win':'loss';f.beforeLeague=arenaLeague();
 if(win){S.arena=(S.arena||0)+f.o.reward;S.arenaV2.coins=(S.arenaV2.coins||0)+f.o.coins;S.wins=(S.wins||0)+1;f.log.push(`Sieg: +${f.o.reward} Ruhm · +${f.o.coins} Ruhmesmünzen.`)}
 else{const loss=f.o.kind==='hard'?4:2;S.arena=Math.max(0,(S.arena||0)-loss);f.loss=loss;f.log.push(`Niederlage: −${loss} Ruhm.`)}
 f.afterLeague=arenaLeague();save?.();render?.();
}
window.arenaV2Start=startArena;
window.arenaV2Done=function(){resetResource();return arenaDoneBase?.()};

window.d1Attack=function(kind){
 const d=S.dungeonV1,e=d?.enemy;if(!d||!e||e.phase!=='attack')return dungeonAttackBase?.(kind);
 if(!d.skillCombatStarted){resetResource();d.skillCombatStarted=true}
 const dot=window.tickSkillStatuses?.(e)||0;if(dot){e.hp=Math.max(0,e.hp-dot);d.autoLog=d.autoLog||[];d.autoLog.unshift(`Status-Effekt: ${dot} zusätzlicher Schaden.`)}
 const before=e.hp;if(before<=0)return dungeonAttackBase?.('safe');
 const skill=window.getNextCombatSkill?.({enemyPct:e.hp/e.max*100})||null;
 let useKind=kind;if(skill?.type==='attack')useKind=(skill.mult||1)>=1.35?'heavy':(skill.mult||1)<1?'safe':'normal';else useKind='safe';
 if(skill?.type==='defense')d.pendingSkillGuard=skill.effect==='dodge'?'dodge':'guard';
 dungeonAttackBase?.(useKind);if(!d.enemy)return;
 if(skill&&e.hp>0){const dealt=Math.max(0,before-e.hp),action=window.applyCombatSkill?.(Math.max(1,dealt||5),skill,{enemyPct:e.hp/e.max*100})||null;if(skill.type==='attack'&&dealt>0&&action){const desired=Math.max(dealt,Math.round((Number(action.damage)||dealt)*legacyDamageMultiplier())),extra=Math.max(0,desired-dealt);if(extra)e.hp=Math.max(0,e.hp-extra);d.feedback=skillFeedback(skill,`Skillrotation: ${desired} Schaden.`);if(action.status&&window.applySkillStatus){applySkillStatus(e,action.status,Math.max(2,Math.round(desired*.1)));d.feedback.text+=` ${action.status} für 3 Runden.`}if(action.lifesteal){const heal=Math.max(1,Math.round(desired*.25));d.hp=Math.min(d.maxHp,d.hp+heal);d.feedback.text+=` +${heal} HP.`}}else if(action?.heal){const heal=Math.max(5,Math.round(d.maxHp*.1));d.hp=Math.min(d.maxHp,d.hp+heal);d.feedback=skillFeedback(skill,`Lebensquell stellt ${heal} HP wieder her.`)}else if(skill.type==='buff')d.feedback=skillFeedback(skill,'Die Skillrotation verstärkt den folgenden Angriff.');else if(skill.type==='defense')d.feedback=skillFeedback(skill,'Die Skillrotation bereitet die nächste Verteidigung vor.');d.autoLog=d.autoLog||[];d.autoLog.unshift(`${skill.name} wird aus der vorbereiteten Rotation eingesetzt.`);d.autoLog=d.autoLog.slice(0,10)}
 save?.();render?.();
};
window.d1Defend=function(kind){const d=S.dungeonV1;if(d?.pendingSkillGuard){kind=d.pendingSkillGuard==='dodge'?'dodge':'block';d.autoLog=d.autoLog||[];d.autoLog.unshift(`Vorbereiteter Skill verbessert ${kind==='dodge'?'Ausweichen':'Blocken'}.`);delete d.pendingSkillGuard}return dungeonDefendBase?.(kind)};

if(bountyAttackBase)window.bc4Attack=function(id){
 const c=S.bountyCombat4;if(!c||c.phase!=='attack'||c.feedback)return bountyAttackBase?.(id);
 if(!c.skillCombatStarted){resetResource();c.skillCombatStarted=true;c.skillStatuses=c.skillStatuses||{}}
 const dot=window.tickSkillStatuses?.(c)||0;if(dot){c.bossHp=Math.max(0,c.bossHp-dot);if(c.bossHp<=0){c.feedback={title:'Kopfgeld erfüllt',body:`Ein Schaden-über-Zeit-Effekt verursacht ${dot} Schaden. Der Knochenhauer fällt.`,tone:'great',end:'win'};save?.();render?.();return}}
 const before=c.bossHp,playerBefore=c.playerHp,skill=window.getNextCombatSkill?.({enemyPct:c.bossHp/118*100})||null;
 const preview=skill&&window.applyCombatSkill?.(Math.max(4,Math.round(before*.06)),skill,{enemyPct:c.bossHp/118*100});if(preview?.guard||preview?.dodge)c.pendingRotationDefense=preview.dodge?'dodge':'guard';
 bountyAttackBase(id);const n=S.bountyCombat4;if(!n||!skill)return;
 const dealt=Math.max(0,before-n.bossHp),action=window.applyCombatSkill?.(Math.max(1,dealt||5),skill,{enemyPct:n.bossHp/118*100})||null;
 if(action?.heal){const max=window.getFinalStats?.().hp||S.maxHp||120,heal=Math.max(5,Math.round(max*.1));n.playerHp=Math.min(max,n.playerHp+heal);if(n.feedback)n.feedback.body=`${skillLabel(skill)} stellt ${heal} HP wieder her. `+n.feedback.body}
 else if(skill.type==='attack'&&dealt>0&&action){const desired=Math.max(dealt,Math.round((Number(action.damage)||dealt)*legacyDamageMultiplier())),extra=Math.max(0,desired-dealt);if(extra)n.bossHp=Math.max(0,n.bossHp-extra);if(action.status&&window.applySkillStatus&&n.bossHp>0)applySkillStatus(n,action.status,Math.max(2,Math.round(desired*.1)));if(action.lifesteal){const max=window.getFinalStats?.().hp||S.maxHp||120,heal=Math.max(1,Math.round(desired*.25));n.playerHp=Math.min(max,n.playerHp+heal)}if(n.feedback){n.feedback.title=skillLabel(skill);n.feedback.iconAsset=skill.iconAsset||null;n.feedback.body=`Vorbereitete Rotation: ${skill.name} verursacht insgesamt ${desired} Schaden. `+n.feedback.body}if(n.bossHp<=0)n.feedback={title:'Kopfgeld erfüllt',body:`${skillLabel(skill)} beendet den Kampf.`,tone:'great',end:'win',iconAsset:skill.iconAsset||null}}
 else if(skill.type==='buff'&&n.feedback){n.feedback.title=skillLabel(skill);n.feedback.iconAsset=skill.iconAsset||null;n.feedback.body='Die Rotation aktiviert den Buff für diesen Angriff. '+n.feedback.body}
 else if(skill.type==='defense'&&n.feedback){n.feedback.title=skillLabel(skill);n.feedback.iconAsset=skill.iconAsset||null;n.feedback.body='Die Rotation bereitet deine nächste Verteidigung vor. '+n.feedback.body}
 if(playerBefore!==n.playerHp&&n.feedback)n.feedback.body+=` Aktuelle HP: ${n.playerHp}.`;save?.();render?.();
};
if(bountyDefendBase)window.bc4Defend=function(id){const c=S.bountyCombat4;if(c?.pendingRotationDefense){id=c.pendingRotationDefense==='dodge'?'dodge':'block';delete c.pendingRotationDefense}return bountyDefendBase(id)};
})();