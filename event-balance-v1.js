(()=>{
'use strict';
const quests=window.Arcane?.quests;
if(!quests?.eventSteps)return;
const BASES=[
 [36,34,35],
 [33,35,37],
 [34,36,35]
];
quests.eventSteps.forEach((step,stepIndex)=>step.choices.forEach((choice,choiceIndex)=>{
 const base=BASES[stepIndex]?.[choiceIndex];
 if(Number.isFinite(base))choice.base=base;
}));
window.Arcane=window.Arcane||{};
Arcane.eventBalance={baseline:'~50% for an early matching build',bases:BASES};
})();