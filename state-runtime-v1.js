(()=>{
'use strict';
const storage=window.ARCANE_STORAGE;
const SAVE_KEY=storage?.keys?.save||'arcaneBeta';
const BACKUP_KEY=storage?.keys?.backup||'arcaneBetaBackup';
const REINCARNATION_BACKUP_KEY='arcaneReincarnationBackup';
const VERSION=4;
let lastFingerprint='';
const validObject=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
function parse(raw){return storage?.parse?storage.parse(raw):(()=>{if(!raw)return null;try{const v=JSON.parse(raw);return validObject(v)?v:null}catch{return null}})()}
function normalizeReincarnation(s){
  s.reincarnation=validObject(s.reincarnation)?s.reincarnation:{};
  const r=s.reincarnation;
  r.count=Math.max(0,Number(r.count)||0);
  r.bestLevel=Math.max(Number(s.lvl)||1,Number(r.bestLevel)||1);
  r.lifetimeSouls=Math.max(Number(s.souls)||0,Number(r.lifetimeSouls)||0);
  r.lastAt=Math.max(0,Number(r.lastAt)||0);
  r.spentSouls=Math.max(0,Number(r.spentSouls)||0);
  r.legacy=validObject(r.legacy)?r.legacy:{};
  r.history=Array.isArray(r.history)?r.history.filter(validObject).slice(-20):[];
  return r;
}
function migrate(s){
  let v=Math.max(0,Number(s.saveVersion)||0);
  if(v<1){s.saveVersion=1;v=1}
  if(v<2){s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};s.saveMeta.createdAt=Number(s.saveMeta.createdAt)||Date.now();s.saveVersion=2;v=2}
  if(v<3){normalizeReincarnation(s);s.saveVersion=3;v=3}
  if(v<4){normalizeReincarnation(s);s.saveVersion=4;v=4}
  return s;
}
function normalize(s){
  if(!validObject(s))return s;
  migrate(s);
  if(!Array.isArray(s.items))s.items=[];
  if(!validObject(s.eq))s.eq={};
  if(!Array.isArray(s.log))s.log=[];
  if(!Array.isArray(s.skills))s.skills=[];
  if(!Array.isArray(s.bank))s.bank=[];
  if(s.city!=null&&!validObject(s.city))s.city={};
  if(s.arenaV2!=null&&!validObject(s.arenaV2))s.arenaV2=null;
  if(s.dungeonV1!=null&&!validObject(s.dungeonV1))s.dungeonV1=null;
  s.invCap=Math.max(1,Number(s.invCap)||15);
  s.bankCap=Math.max(1,Number(s.bankCap)||100);
  s.maxAl=Math.max(1,Number(s.maxAl)||100);
  s.al=Math.max(0,Math.min(s.maxAl,Number(s.al)||0));
  s.maxHp=Math.max(1,Number(s.maxHp)||120);
  const hp=Number(s.hp);s.hp=Math.max(0,Math.min(s.maxHp,Number.isFinite(hp)?hp:s.maxHp));
  s.gold=Math.max(0,Number(s.gold)||0);
  s.xp=Math.max(0,Number(s.xp)||0);
  s.lvl=Math.max(1,Math.min(50,Number(s.lvl)||1));
  s.forgeDust=Math.max(0,Number(s.forgeDust)||0);
  s.essence=Math.max(0,Number(s.essence)||0);
  s.legendaryEssence=Math.max(0,Number(s.legendaryEssence)||0);
  s.ancestorRelics=Math.max(0,Number(s.ancestorRelics)||0);
  s.souls=Math.max(0,Number(s.souls)||0);
  s.keys=Math.max(0,Number(s.keys)||0);
  normalizeReincarnation(s);
  s.saveVersion=VERSION;
  s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};
  s.saveMeta.createdAt=Number(s.saveMeta.createdAt)||Date.now();
  return s;
}
function fingerprint(state){try{const meta=state?.saveMeta;return JSON.stringify(state,function(key,value){return key==='updatedAt'&&this===meta?undefined:value})}catch(err){console.error('[Arcane Save] Fingerprint fehlgeschlagen',err);return''}}
function persist(force=false){
  if(window.__ARCANE_INTENTIONAL_RESET)return true;
  window.Arcane?.emit?.('beforeSave',S);
  normalize(S);
  const nextFingerprint=fingerprint(S);
  if(!force&&nextFingerprint&&nextFingerprint===lastFingerprint)return true;
  S.saveMeta.updatedAt=Date.now();
  let ok=false;
  if(storage?.writeObject)ok=storage.writeObject(S,{backup:true});
  else try{const next=JSON.stringify(S),previous=localStorage.getItem(SAVE_KEY);if(previous&&previous!==next&&parse(previous))localStorage.setItem(BACKUP_KEY,previous);localStorage.setItem(SAVE_KEY,next);ok=true}catch(err){console.error('[Arcane Save] Speichern fehlgeschlagen',err)}
  if(ok){lastFingerprint=nextFingerprint||fingerprint(S);window.Arcane?.emit?.('afterSave',S)}
  return ok;
}
function restoreObject(value){
  if(!validObject(value))return false;
  normalize(value);
  const ok=storage?.writeObject?storage.writeObject(value,{backup:true}):(()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(value));return true}catch{return false}})();
  if(ok)location.reload();
  return ok;
}
function restoreBackup(){const b=storage?.read?storage.read(BACKUP_KEY):parse(localStorage.getItem(BACKUP_KEY));return restoreObject(b)}
function createRecoverySnapshot(key=REINCARNATION_BACKUP_KEY){
  normalize(S);
  try{return storage?.writeObject?storage.writeObject(S,{key,backup:false}):(localStorage.setItem(key,JSON.stringify(S)),true)}catch(err){console.error('[Arcane Save] Recovery-Snapshot fehlgeschlagen',err);return false}
}
function restoreRecoverySnapshot(key=REINCARNATION_BACKUP_KEY){const value=storage?.read?storage.read(key):parse(localStorage.getItem(key));return restoreObject(value)}
function exportSave(){normalize(S);return JSON.stringify(S)}
function importSave(raw){const value=typeof raw==='string'?parse(raw):raw;if(!validObject(value))return false;return restoreObject(value)}
function installCharacterCommit(){
  if(typeof window.cgConfirmHero!=='function'||typeof window.getCharacterDraft!=='function')return;
  const classes=new Set(window.HERO_BETA_CLASSES||['Krieger','Magier','Hexenmeister','Druide']);
  const stories=new Set(['Tavernen-Stammgast','Gefallener Adeliger','Runenschmied-Lehrling','Schatten-Ausreißer']);
  window.cgConfirmHero=function(){const d=window.getCharacterDraft?.()||{},name=String(d.name||'').trim().slice(0,24);if(!name)return alert('Bitte gib deinem Helden einen Namen.');const chosen={name,race:'Mensch',gender:d.gender==='female'?'female':'male',cls:classes.has(d.cls)?d.cls:'Krieger',bg:stories.has(d.bg)?d.bg:'Tavernen-Stammgast',screen:'home'};Object.assign(S,chosen);if(!persist(true))return alert('Der Spielstand konnte nicht gespeichert werden. Bitte versuche es erneut.');try{localStorage.setItem(storage?.keys?.created||'arcaneCharacterCreated','1')}catch(err){console.error('[Arcane Save] character flag failed',err);return alert('Der Charakter konnte nicht abgeschlossen werden. Bitte versuche es erneut.')}document.getElementById('character-gate')?.remove();location.reload()}
}
normalize(S);lastFingerprint=fingerprint(S);
window.ARCANE_STATE={key:SAVE_KEY,backupKey:BACKUP_KEY,reincarnationBackupKey:REINCARNATION_BACKUP_KEY,version:VERSION,normalize,migrate,persist,restoreBackup,createRecoverySnapshot,restoreRecoverySnapshot,exportSave,importSave,fingerprint};
window.save=persist;
installCharacterCommit();
window.addEventListener('pagehide',()=>persist());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist()});
})();