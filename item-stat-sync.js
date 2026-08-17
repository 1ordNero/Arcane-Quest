(()=>{
'use strict';
function syncEquipmentStats(){
  if(typeof S==='undefined'||!S||typeof window.getFinalStats!=='function')return false;
  const f=getFinalStats(),rb=(typeof RACES!=='undefined'&&RACES?.[S.race]?.bonus)||{};
  S.str=Number(f.str||0)-(Number(rb.str)||0);
  S.agi=Number(f.agi||0)-(Number(rb.agi)||0);
  S.int=Number(f.int||0)-(Number(rb.int)||0);
  S.maxHp=Math.max(1,Number(f.hp)||120);
  S.hp=Math.max(0,Math.min(Number(S.hp)||S.maxHp,S.maxHp));
  return true;
}
const oldEquip=window.equipItem,oldUnequip=window.unequipItem;
if(typeof oldEquip==='function')window.equipItem=function(id){const result=oldEquip.apply(this,arguments);syncEquipmentStats();return result};
if(typeof oldUnequip==='function')window.unequipItem=function(slot){const result=oldUnequip.apply(this,arguments);syncEquipmentStats();return result};
window.syncEquipmentStats=syncEquipmentStats;
if(syncEquipmentStats())save?.();
})();