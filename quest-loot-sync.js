(()=>{
'use strict';
const VERSION=1;
function rarityFor(kind){const roll=Math.random()*100;if(kind==='risk'){if(roll<4)return'legendary';if(roll<12)return'mythic';if(roll<42)return'rare';return'magic'}if(kind==='event'){if(roll<2)return'legendary';if(roll<7)return'mythic';if(roll<28)return'rare';return'magic'}return roll<18?'rare':'magic'}
function questLootKind(result){if(result?.name==='Das flüsternde Siegel'&&result.item)return['event','Arkane Siegelfragmente'];if(result?.name==='Die versunkene Krypta'&&result.item)return['risk','Kryptenfund'];return null}
function removePlaceholder(name){const index=(S.items||[]).findIndex(item=>item?.name===name);if(index>=0)S.items.splice(index,1)}
function assignRewardItem(result,item){result.item=item.name;result.itemId=item.id;result.itemSlot=item.slot;result.itemRarity=item.rarity;result.itemStats=window.itemBonusText?itemBonusText(item):''}
function sync(){
 const result=S.questResult;
 if(!result||!window.createLoot||Number(result.lootSyncVersion)>=VERSION)return;
 const config=questLootKind(result);
 if(!config)return;
 result.lootSyncVersion=VERSION;
 const [kind,placeholder]=config;
 removePlaceholder(placeholder);
 if(S.items.length<S.invCap){
  const loot=createLoot(kind,rarityFor(kind),S.lvl);
  S.items.push(loot);
  assignRewardItem(result,loot);
  log(`${loot.name} gefunden (${loot.rarity}).`);
 }else{
  result.item=null;
  result.itemId=null;
  result.itemSlot=null;
  log('Inventar voll – Questbeute konnte nicht aufgenommen werden.');
 }
 save();
 render();
}
window.Arcane?.on?.('afterRenderSettled',sync);
setTimeout(sync,0);
})();
