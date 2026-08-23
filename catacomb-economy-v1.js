(()=>{
'use strict';
const KEY_CHANCE={raid:.12,event:.25,bounty:.45,risk:.60,mini:.20};
const ITEM_KEEP={event:.20,bounty:.25,risk:.30,mini:.40};
const QUEST_KIND={
 'Schatten im alten Forst':'raid',
 'Das flüsternde Siegel':'event',
 'Der Knochenhauer':'bounty',
 'Die versunkene Krypta':'risk',
 'Knochenwache':'mini'
};
let processing=false;
function normalizeKeys(){S.keys=Math.max(0,Number(S.keys)||0)}
function retireBeta(){if('betaDungeonUnlocked' in S)delete S.betaDungeonUnlocked;if('betaDungeonAccessGranted' in S)delete S.betaDungeonAccessGranted}
function introKey(){retireBeta();normalizeKeys();if((Number(S.lvl)||1)<10||S.catacombKeyIntroGranted)return false;S.catacombKeyIntroGranted=true;if(S.keys<1)S.keys=1;return true}
function ensureState(){let changed=introKey();if(!Number.isFinite(Number(S.catacombKeyPity))){S.catacombKeyPity=0;changed=true}if(changed)save?.()}
function fixDungeonItem(it){if(!it)return it;const lvl=Math.max(1,Number(S.lvl)||1);it.itemLevel=lvl;it.level=lvl;it.source=it.source||'catacombs';return it}
function dungeonKeepChance(d,kind){if(!d)return 1;if(kind==='bounty'&&d.enemy?.boss)return .68;if(kind!=='risk')return 1;if(d.state==='treasure')return .50;if(d.enemy?.elite)return .46;if(d.state==='event')return .31;if(d.state==='combat')return .33;return .40}
function wrapDungeonLoot(){const base=window.generateLoot;if(typeof base!=='function'||base.__catacombEconomy)return;function wrapped(kind='general'){const d=S.dungeonV1;if(d&&Math.random()>dungeonKeepChance(d,kind))return null;const it=base.apply(this,arguments);return d?fixDungeonItem(it):it}wrapped.__catacombEconomy=true;wrapped.__base=base;window.generateLoot=wrapped}
function migrateActiveRun(){const d=S.dungeonV1;if(!d?.loot?.length)return false;let changed=false;for(const it of d.loot){const lvl=Math.max(1,Number(S.lvl)||1);if(!it.itemLevel||Number(it.itemLevel)<=1){it.itemLevel=lvl;it.level=lvl;changed=true}}return changed}
function patchStart(){
 const base=window.d1Start;
 if(typeof base!=='function'||base.__catacombEconomy)return;
 const guarded=function(){
   retireBeta();introKey();normalizeKeys();
   if(S.dungeonV1)return base.apply(this,arguments);
   if((Number(S.lvl)||1)<10){toast?.('Die Katakomben werden ab Stufe 10 freigeschaltet.');return}
   if(S.keys<1){toast?.('Du benötigst einen Katakomben-Schlüssel. Verdiene Schlüssel durch Quests.');return}
   const keysBefore=S.keys;
   window.CATACOMB_PRELOAD_ALL?.();
   const out=base.apply(this,arguments);
   if(S.dungeonV1){
     const expected=Math.max(0,keysBefore-1);
     if(Number(S.keys)!==expected)S.keys=expected;
     S.dungeonV1.entryKeyConsumed=true;
     S.dungeonV1.entryKeyCost=1;
     S.dungeonV1.startedAt=Number(S.dungeonV1.startedAt)||Date.now();
     save?.(true);
   }
   return out;
 };
 guarded.__catacombEconomy=true;guarded.__base=base;window.d1Start=guarded;if(window.d7Start===base)window.d7Start=guarded;
}
function removeQuestItem(name){if(!name)return false;const ix=(S.items||[]).findIndex(it=>it?.name===name);if(ix<0)return false;S.items.splice(ix,1);return true}
function processQuestResult(){const r=S.questResult;if(!r||r._catacombEconomyV1||processing)return false;const kind=QUEST_KIND[r.name];if(!kind)return false;processing=true;r._catacombEconomyV1=true;let changed=false;if(r.item&&ITEM_KEEP[kind]!=null&&Math.random()>ITEM_KEEP[kind]){removeQuestItem(r.item);r.item=null;r.itemId=null;r.itemSlot=null;r.itemRarity=null;r.itemStats=null;changed=true}if((Number(S.lvl)||1)>=10){S.catacombKeyPity=Math.max(0,Number(S.catacombKeyPity)||0)+1;const guaranteed=S.catacombKeyPity>=4;if(guaranteed||Math.random()<(KEY_CHANCE[kind]||0)){S.keys=Math.max(0,Number(S.keys)||0)+1;S.catacombKeyPity=0;r.keys=1;changed=true;log?.(`Katakomben-Schlüssel erhalten (${S.keys}).`)}}if(changed||kind)save?.();processing=false;return changed}
function decorateResult(){const r=S.questResult,grid=document.querySelector('.reward-card .reward-grid');if(!r?.keys||!grid||grid.querySelector('.ce1-keyreward'))return;grid.insertAdjacentHTML('beforeend',`<span class="ce1-keyreward"><b>+${r.keys}</b><small>Katakomben-Schlüssel</small></span>`)}
function removeLegacyHeaderCounter(){document.querySelector('.ce1-key-chip')?.remove()}
function tick(){ensureState();patchStart();wrapDungeonLoot();const changed=migrateActiveRun();const q=processQuestResult();decorateResult();removeLegacyHeaderCounter();if(changed)save?.();if(q)requestAnimationFrame(()=>{decorateResult();removeLegacyHeaderCounter()})}
window.ARCANE_CATACOMB_KEYS=Object.freeze({cap:null,unlimited:true,keyChance:{...KEY_CHANCE},itemKeep:{...ITEM_KEEP}});
window.Arcane?.on?.('afterRenderSettled',tick);window.Arcane?.on?.('bootReady',tick);
const css=document.createElement('style');css.textContent=`.ce1-keyreward b{color:var(--gold)}`;document.head.appendChild(css);
ensureState();patchStart();wrapDungeonLoot();if(migrateActiveRun())save?.();queueMicrotask(tick);
})();
