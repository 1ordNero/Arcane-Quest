(()=>{
'use strict';
const storage=()=>window.ARCANE_STORAGE||window.Arcane?.storage||null,HANDLED_KEY='arcaneLootHandled';
function readHandled(){const raw=storage()?.readText?.(HANDLED_KEY)??(()=>{try{return localStorage.getItem(HANDLED_KEY)}catch{return null}})();try{const value=JSON.parse(raw||'[]');return Array.isArray(value)?value:[]}catch{return[]}}
const handled=new Set(readHandled());
function saveHandled(){const value=JSON.stringify([...handled].slice(-50));if(storage()?.writeText)storage().writeText(HANDLED_KEY,value);else try{localStorage.setItem(HANDLED_KEY,value)}catch{}}
function rarityFor(kind){const roll=Math.random()*100;if(kind==='risk'){if(roll<4)return'legendary';if(roll<12)return'mythic';if(roll<42)return'rare';return'magic'}if(kind==='event'){if(roll<2)return'legendary';if(roll<7)return'mythic';if(roll<28)return'rare';return'magic'}return roll<18?'rare':'magic'}
function questLootKind(result){if(result?.name==='Das flüsternde Siegel'&&result.item)return['event','Arkane Siegelfragmente'];if(result?.name==='Die versunkene Krypta'&&result.item)return['risk','Kryptenfund'];return null}
function removePlaceholder(name){const index=(S.items||[]).findIndex(item=>item?.name===name);if(index>=0)S.items.splice(index,1)}
function assignRewardItem(result,item){result.item=item.name;result.itemId=item.id;result.itemSlot=item.slot;result.itemRarity=item.rarity;result.itemStats=window.itemBonusText?itemBonusText(item):''}
function sync(){
 const result=S.questResult;
 if(!result||!window.createLoot)return;
 const key=`${result.name}|${result.gold}|${result.xp}|${result.item||''}`;
 if(handled.has(key))return;
 const config=questLootKind(result);
 if(!config)return;
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
 handled.add(key);
 saveHandled();
 save();
 render();
}
window.Arcane?.on?.('afterRenderSettled',sync);
setTimeout(sync,0);
})();
