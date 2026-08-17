(()=>{
const handled=new Set(JSON.parse(localStorage.getItem('arcaneLootHandled')||'[]'));
function saveHandled(){localStorage.setItem('arcaneLootHandled',JSON.stringify([...handled].slice(-50)))}
function rarityFor(kind){const r=Math.random()*100;if(kind==='risk'){if(r<4)return'legendary';if(r<12)return'mythic';if(r<42)return'rare';return'magic'}if(kind==='event'){if(r<2)return'legendary';if(r<7)return'mythic';if(r<28)return'rare';return'magic'}return r<18?'rare':'magic'}
function sync(){const r=S.questResult;if(!r||!window.createLoot)return;const key=`${r.name}|${r.gold}|${r.xp}|${r.item||''}`;if(handled.has(key))return;let kind=null,placeholder=null;if(r.name==='Das flüsternde Siegel'&&r.item){kind='event';placeholder='Arkane Siegelfragmente'}else if(r.name==='Die versunkene Krypta'&&r.item){kind='risk';placeholder='Kryptenfund'}if(!kind)return;const ix=(S.items||[]).findIndex(x=>x?.name===placeholder);if(ix>=0)S.items.splice(ix,1);if(S.items.length<S.invCap){const loot=createLoot(kind,rarityFor(kind),S.lvl);S.items.push(loot);r.item=loot.name;r.itemRarity=loot.rarity;r.itemStats=window.itemBonusText?itemBonusText(loot):'';log(`${loot.name} gefunden (${loot.rarity}).`)}else{r.item=null;log('Inventar voll – Questbeute konnte nicht aufgenommen werden.')}handled.add(key);saveHandled();save();render()}
window.Arcane?.on?.('afterRenderSettled',sync);
setTimeout(sync,0);
})();