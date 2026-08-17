(()=>{
'use strict';
const base=window.qStart;if(typeof base!=='function')return;
window.qStart=function(id,e){
 if(id!=='bounty'||S?.bg!=='Tavernen-Stammgast')return base.call(this,id,e);
 const raw=window.getQuestRawCost?.('bounty')||24,cost=window.getEffectiveQuestCost?.('bounty',raw)||raw,saved=raw-cost,before=Number(S.al)||0;
 if(before<cost){toast?.(`Nicht genug Abenteuerlust. Benötigt: ${cost} AL.`);return}
 S.al=before+saved;
 const old=S.bountyCombat4;let out;
 try{out=base.call(this,id,e)}finally{if(S.bountyCombat4===old)S.al=before}
 if(S.bountyCombat4!==old&&saved>0)queueMicrotask(()=>window.showPersonalStoryFeedback?.(`${saved} Abenteuerlust gespart`));
 return out;
};
})();