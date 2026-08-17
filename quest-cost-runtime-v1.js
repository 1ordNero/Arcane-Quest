(()=>{
'use strict';
const COSTS=Object.freeze({raid:12,event:18,bounty:24,risk:28,mini:16});
const effective=raw=>Math.max(1,Math.round(Number(raw||0)*.85));
function getEffectiveQuestCost(id,raw=COSTS[id]){return S?.bg==='Tavernen-Stammgast'&&raw?effective(raw):raw}
window.ARCANE_QUEST_COSTS=COSTS;
window.getEffectiveQuestCost=getEffectiveQuestCost;
window.getQuestRawCost=id=>COSTS[id]||null;
window.Arcane=window.Arcane||{};
window.Arcane.questCosts={raw:COSTS,effective:getEffectiveQuestCost};
})();