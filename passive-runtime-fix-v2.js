(()=>{
'use strict';
const COST=Object.freeze({raid:12,event:18,bounty:24,risk:28,mini:16});
const active=()=>S?.bg==='Tavernen-Stammgast';
const discounted=raw=>Math.max(1,Math.round(Number(raw||0)*.85));
window.getEffectiveQuestCost=(id,raw=COST[id])=>active()&&raw?discounted(raw):raw;
window.getQuestRawCost=id=>COST[id]||null;
const baseQStart=window.qStart;
if(typeof baseQStart==='function')window.qStart=function(id,e){
 const raw=COST[id];if(!active()||!raw)return baseQStart.call(this,id,e);
 const before=Number(S.al)||0,cost=discounted(raw),saved=raw-cost;
 if(before<cost){toast?.(`Nicht genug Abenteuerlust. Benötigt: ${cost} AL.`);return}
 /* Legacy quest/bounty starters still validate/subtract their raw cost. Credit only the
    discount for the duration of that synchronous call, so the final balance equals
    before - effective cost without replacing their gameplay logic. */
 S.al=before+saved;
 const beforeQuest=S.quest,beforeBounty=S.bountyCombat4;
 let out;
 try{out=baseQStart.call(this,id,e)}finally{
   const started=id==='bounty'?S.bountyCombat4!==beforeBounty:S.quest!==beforeQuest;
   if(!started)S.al=before;
 }
 const started=id==='bounty'?S.bountyCombat4!==beforeBounty:S.quest!==beforeQuest;
 if(started&&saved>0)queueMicrotask(()=>window.showPersonalStoryFeedback?.(`${saved} Abenteuerlust gespart`));
 return out;
};
})();