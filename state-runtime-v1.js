(()=>{
const storage=window.ARCANE_STORAGE;
const SAVE_KEY=storage?.keys?.save||'arcaneBeta';
const BACKUP_KEY=storage?.keys?.backup||'arcaneBetaBackup';
const VERSION=3;
function validObject(v){return !!v&&typeof v==='object'&&!Array.isArray(v)}
function parse(raw){return storage?.parse?storage.parse(raw):(()=>{if(!raw)return null;try{const v=JSON.parse(raw);return validObject(v)?v:null}catch{return null}})()}
function migrate(s){
 let v=Math.max(0,Number(s.saveVersion)||0);
 if(v<1){s.saveVersion=1;v=1}
 if(v<2){
  s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};
  s.saveMeta.createdAt=Number(s.saveMeta.createdAt)||Date.now();
  s.saveVersion=2;v=2;
 }
 if(v<3){
  s.reincarnation=validObject(s.reincarnation)?s.reincarnation:{};
  s.reincarnation.count=Math.max(0,Number(s.reincarnation.count)||0);
  s.reincarnation.bestLevel=Math.max(1,Number(s.reincarnation.bestLevel)||Number(s.lvl)||1);
  s.reincarnation.lifetimeSouls=Math.max(0,Number(s.reincarnation.lifetimeSouls)||Number(s.souls)||0);
  s.reincarnation.lastAt=Math.max(0,Number(s.reincarnation.lastAt)||0);
  s.saveVersion=3;v=3;
 }
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
 if(!validObject(s.reincarnation))s.reincarnation={};
 s.invCap=Math.max(1,Number(s.invCap)||15);
 s.bankCap=Math.max(1,Number(s.bankCap)||100);
 s.maxAl=Math.max(1,Number(s.maxAl)||100);
 s.al=Math.max(0,Math.min(s.maxAl,Number(s.al)||0));
 s.maxHp=Math.max(1,Number(s.maxHp)||120);
 s.hp=Math.max(0,Math.min(s.maxHp,Number(s.hp)||s.maxHp));
 s.gold=Math.max(0,Number(s.gold)||0);
 s.xp=Math.max(0,Number(s.xp)||0);
 s.lvl=Math.max(1,Number(s.lvl)||1);
 s.forgeDust=Math.max(0,Number(s.forgeDust)||0);
 s.essence=Math.max(0,Number(s.essence)||0);
 s.souls=Math.max(0,Number(s.souls)||0);
 s.keys=Math.max(0,Number(s.keys)||0);
 s.reincarnation.count=Math.max(0,Number(s.reincarnation.count)||0);
 s.reincarnation.bestLevel=Math.max(s.lvl,Number(s.reincarnation.bestLevel)||1);
 s.reincarnation.lifetimeSouls=Math.max(s.souls,Number(s.reincarnation.lifetimeSouls)||0);
 s.reincarnation.lastAt=Math.max(0,Number(s.reincarnation.lastAt)||0);
 s.saveVersion=VERSION;
 s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};
 return s;
}
function persist(){
 if(window.__ARCANE_INTENTIONAL_RESET)return true;
 window.Arcane?.emit?.('beforeSave',S);
 normalize(S);
 S.saveMeta.updatedAt=Date.now();
 let ok=false;
 if(storage?.writeObject)ok=storage.writeObject(S,{backup:true});
 else try{const next=JSON.stringify(S),previous=localStorage.getItem(SAVE_KEY);if(previous&&previous!==next&&parse(previous))localStorage.setItem(BACKUP_KEY,previous);localStorage.setItem(SAVE_KEY,next);ok=true}catch(err){console.error('[Arcane Save] Speichern fehlgeschlagen',err)}
 if(ok)window.Arcane?.emit?.('afterSave',S);
 return ok;
}
function restoreBackup(){const b=storage?.read?storage.read(BACKUP_KEY):parse(localStorage.getItem(BACKUP_KEY));if(!b)return false;normalize(b);const ok=storage?.writeObject?storage.writeObject(b,{backup:false}):(()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(b));return true}catch{return false}})();if(ok)location.reload();return ok}
function exportSave(){normalize(S);return JSON.stringify(S)}
function installCharacterCommit(){
 if(typeof window.cgConfirmHero!=='function'||typeof window.getCharacterDraft!=='function')return;
 const classes=new Set(['Krieger','Magier','Hexenmeister','Druide']);
 const stories=new Set(['Tavernen-Stammgast','Gefallener Adeliger','Runenschmied-Lehrling','Schatten-Ausreißer']);
 window.cgConfirmHero=function(){
  const d=window.getCharacterDraft?.()||{};
  const name=String(d.name||'').trim().slice(0,24);
  if(!name)return alert('Bitte gib deinem Helden einen Namen.');
  const chosen={name,race:'Mensch',gender:d.gender==='female'?'female':'male',cls:classes.has(d.cls)?d.cls:'Krieger',bg:stories.has(d.bg)?d.bg:'Tavernen-Stammgast',screen:'home'};
  Object.assign(S,chosen);
  if(!persist())return alert('Der Spielstand konnte nicht gespeichert werden. Bitte versuche es erneut.');
  try{localStorage.setItem(storage?.keys?.created||'arcaneCharacterCreated','1')}catch(err){console.error('[Arcane Save] character flag failed',err);return alert('Der Charakter konnte nicht abgeschlossen werden. Bitte versuche es erneut.')}
  document.getElementById('character-gate')?.remove();
  location.reload();
 };
}
normalize(S);
window.ARCANE_STATE={key:SAVE_KEY,backupKey:BACKUP_KEY,version:VERSION,normalize,migrate,persist,restoreBackup,exportSave};
window.save=persist;
installCharacterCommit();
window.addEventListener('pagehide',persist);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist()});
})();