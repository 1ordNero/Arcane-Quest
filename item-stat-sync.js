(()=>{
function syncEquipmentStats(){if(!window.getFinalStats||!window.S)return;const f=getFinalStats(),rb=RACES?.[S.race]?.bonus||{};S.str=f.str-(rb.str||0);S.agi=f.agi-(rb.agi||0);S.int=f.int-(rb.int||0);S.maxHp=f.hp;S.hp=Math.min(Number(S.hp)||f.hp,f.hp)}
const oldEquip=window.equipItem,oldUnequip=window.unequipItem;window.equipItem=function(id){oldEquip?.(id);syncEquipmentStats()};window.unequipItem=function(slot){oldUnequip?.(slot);syncEquipmentStats()};window.syncEquipmentStats=syncEquipmentStats;syncEquipmentStats();save();
})();