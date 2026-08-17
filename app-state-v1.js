(()=>{
'use strict';
const root=window.Arcane=window.Arcane||{};
const storage=root.storage||window.ARCANE_STORAGE||null;
let offlineSettled=false;
const DEFAULT_STATE=Object.freeze({screen:'home',name:'Aventurier',race:'Mensch',cls:'Krieger',bg:'Tavernen-Stammgast',lvl:1,xp:0,gold:120,al:100,maxAl:100,hp:120,maxHp:120,str:8,agi:8,int:8,items:[{name:'Rostiges Schwert',slot:'Haupthand',power:4,rarity:'common'}],eq:{},invCap:15,forgeDust:0,essence:0,souls:0,reincarnation:{count:0,bestLevel:1,lifetimeSouls:0,lastAt:0},keys:0,quests:0,wins:0,arena:0,skills:['Hieb','Schildwall','Mächtiger Schlag'],combat:null,log:['Willkommen in der Arcane Tavern.']});
function cloneDefault(){return typeof structuredClone==='function'?structuredClone(DEFAULT_STATE):JSON.parse(JSON.stringify(DEFAULT_STATE))}
function fallbackRead(){try{const value=JSON.parse(localStorage.getItem('arcaneBeta')||'null');return value&&typeof value==='object'&&!Array.isArray(value)?value:null}catch{return null}}
function load(){const saved=storage?.read?.()||fallbackRead();return saved||cloneDefault()}
function save(state){if(!state||typeof state!=='object'||Array.isArray(state))return false;if(storage?.writeObject)return storage.writeObject(state);try{localStorage.setItem('arcaneBeta',JSON.stringify(state));return true}catch{return false}}
function readLastActive(){try{return Number(localStorage.getItem(storage?.keys?.last||'arcaneLast'))||0}catch{return 0}}
function writeLastActive(value=Date.now()){try{localStorage.setItem(storage?.keys?.last||'arcaneLast',String(value));return true}catch{return false}}
function settleOffline(){if(offlineSettled||typeof S==='undefined'||!S)return false;offlineSettled=true;const last=readLastActive()||Date.now(),hours=Math.min(12,Math.max(0,(Date.now()-last)/3600000));let changed=false;if(hours>.03){const gold=Math.floor(hours*18),xp=Math.floor(hours*10);S.gold=(Number(S.gold)||0)+gold;if(typeof gainXP==='function')gainXP(xp);if(typeof log==='function')log(`Wachdienst: ${hours.toFixed(1)}h offline → +${gold} Gold, +${xp} XP.`);changed=true}writeLastActive();return changed}
function installLegacyBridges(){window.offline=settleOffline}
root.appState={DEFAULT_STATE,cloneDefault,load,save,readLastActive,writeLastActive,settleOffline,get offlineSettled(){return offlineSettled}};window.ARCANE_APP_STATE=root.appState;installLegacyBridges();
})();