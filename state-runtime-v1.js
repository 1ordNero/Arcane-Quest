(()=>{
const storage=window.ARCANE_STORAGE;
const SAVE_KEY=storage?.keys?.save||'arcaneBeta';
const BACKUP_KEY=storage?.keys?.backup||'arcaneBetaBackup';
const VERSION=2;
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
 s.hp=Math.max(0,Math.min(s.maxHp,Number(s.hp)||s.maxHp));
 s.gold=Math.max(0,Number(s.gold)||0);
 s.xp=Math.max(0,Number(s.xp)||0);
 s.lvl=Math.max(1,Number(s.lvl)||1);
 s.forgeDust=Math.max(0,Number(s.forgeDust)||0);
 s.essence=Math.max(0,Number(s.essence)||0);
 s.souls=Math.max(0,Number(s.souls)||0);
 s.keys=Math.max(0,Number(s.keys)||0);
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
normalize(S);
window.ARCANE_STATE={key:SAVE_KEY,backupKey:BACKUP_KEY,version:VERSION,normalize,migrate,persist,restoreBackup,exportSave};
window.save=persist;
window.addEventListener('pagehide',persist);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist()});
})();