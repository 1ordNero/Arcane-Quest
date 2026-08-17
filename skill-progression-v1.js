(()=>{
'use strict';
const MILESTONES=[1,5,10,15,20,25];
function skills(){return window.SKILL_DATA?.[S.cls]||[]}
function earnedCount(){const lvl=Math.max(1,Number(S.lvl)||1);return Math.min(6,1+Math.floor(lvl/5))}
function ensure(){
 const all=skills(),ids=all.map(x=>x.id);if(!ids.length)return null;
 S.skillProgression=S.skillProgression||{};
 let p=S.skillProgression;
 if(p.cls!==S.cls||!Array.isArray(p.unlocked)){
  const entitlement=earnedCount();
  const previous=[...(S.skillSystem?.loadout||[])].filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i).slice(0,entitlement);
  p={cls:S.cls,unlocked:previous.length?previous:[ids[0]],seenLevel:Number(S.lvl)||1};
  S.skillProgression=p;
 }
 p.unlocked=p.unlocked.filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i);
 if(!p.unlocked.length)p.unlocked=[ids[0]];
 const entitlement=earnedCount();
 if(p.unlocked.length>entitlement)p.unlocked=p.unlocked.slice(0,entitlement);
 S.skillSystem=S.skillSystem||{cls:S.cls,loadout:[],resource:100,maxResource:100,rotation:0};
 S.skillSystem.loadout=(S.skillSystem.loadout||[]).filter(id=>p.unlocked.includes(id)).slice(0,4);
 for(const id of p.unlocked){if(S.skillSystem.loadout.length>=Math.min(4,p.unlocked.length))break;if(!S.skillSystem.loadout.includes(id))S.skillSystem.loadout.push(id)}
 return p;
}
function pending(){const p=ensure();return p?Math.max(0,earnedCount()-p.unlocked.length):0}
function unlockedIds(){const p=ensure();return p?[...p.unlocked]:[]}
function unlockedSkills(){const set=new Set(unlockedIds());return skills().filter(x=>set.has(x.id))}
function lockedSkills(){const set=new Set(unlockedIds());return skills().filter(x=>!set.has(x.id))}
function nextMilestone(){const e=earnedCount();return MILESTONES[e]||null}
function unlock(id){
 const p=ensure(),sk=skills().find(x=>x.id===id);if(!p||!sk||p.unlocked.includes(id)||pending()<=0)return false;
 p.unlocked.push(id);
 if((S.skillSystem?.loadout||[]).length<4&&!S.skillSystem.loadout.includes(id))S.skillSystem.loadout.push(id);
 save();return true;
}
window.getUnlockedSkillIds=unlockedIds;
window.getUnlockedSkills=unlockedSkills;
window.getLockedSkills=lockedSkills;
window.getPendingSkillChoices=pending;
window.getNextSkillMilestone=nextMilestone;
window.unlockClassSkill=unlock;
window.getSkillProgression=()=>{const p=ensure();return{unlocked:unlockedSkills(),locked:lockedSkills(),pending:pending(),earned:earnedCount(),nextLevel:nextMilestone(),milestones:[...MILESTONES]}};
const baseSet=window.skillSetSlot;
window.skillSetSlot=function(slot,id){if(!unlockedIds().includes(id)){toast?.('Diese Fertigkeit ist noch nicht freigeschaltet.');return}return baseSet?.(slot,id)};
window.Arcane?.on?.('afterRenderSettled',ensure);
window.Arcane?.on?.('bootReady',ensure);
ensure();
})();