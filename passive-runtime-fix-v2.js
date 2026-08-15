(()=>{
const COST={raid:12,event:18,bounty:36,risk:28,mini:16};
const active=()=>S.bg==='Tavernen-Stammgast';
const effective=raw=>Math.max(1,Math.round(raw*.85));
window.getEffectiveQuestCost=(id,raw=COST[id])=>active()&&raw?effective(raw):raw;
window.getQuestRawCost=id=>COST[id]||null;
const baseQStart=window.qStart;
if(baseQStart)window.qStart=function(id,e){if(!active()||!COST[id])return baseQStart(id,e);const before=Number(S.al)||0,cost=effective(COST[id]);if(before<cost){toast?.(`Nicht genug Abenteuerlust. Benötigt: ${cost} AL.`);return}const beforeQuest=S.quest,beforeBounty=S.bountyCombat4;const out=baseQStart(id,e);const started=(id==='bounty'&&S.bountyCombat4!==beforeBounty)||(id!=='bounty'&&S.quest!==beforeQuest);if(started){S.al=Math.max(0,before-cost);save();if(window.showPersonalStoryFeedback)showPersonalStoryFeedback(`${COST[id]-cost} Abenteuerlust gespart`);render()}return out};
const baseMini=window.startAutoMiniBoss;
if(baseMini)window.startAutoMiniBoss=function(){if(!active())return baseMini.apply(this,arguments);const before=Number(S.al)||0,cost=effective(COST.mini);if(before<cost){toast?.(`Nicht genug Abenteuerlust. Benötigt: ${cost} AL.`);return}const old=S.autoMiniBattle,out=baseMini.apply(this,arguments);if(S.autoMiniBattle!==old){S.al=Math.max(0,before-cost);save();if(window.showPersonalStoryFeedback)showPersonalStoryFeedback(`${COST.mini-cost} Abenteuerlust gespart`);render()}return out};
})();