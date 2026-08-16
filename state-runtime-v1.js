(()=>{
const SAVE_KEY='arcaneBeta';
const BACKUP_KEY='arcaneBetaBackup';
const VERSION=2;
const MAX={items:500,bank:500,log:100,skills:100,name:24,text:256,level:100000,currency:1e12,capacity:10000};
function validObject(v){return !!v&&typeof v==='object'&&!Array.isArray(v)}
function parse(raw){if(!raw||raw.length>5_000_000)return null;try{const v=JSON.parse(raw);return validObject(v)?v:null}catch{return null}}
function finite(v,fallback=0){const n=Number(v);return Number.isFinite(n)?n:fallback}
function clamp(v,min,max,fallback=min){return Math.max(min,Math.min(max,finite(v,fallback)))}
function text(v,max=MAX.text,fallback=''){return typeof v==='string'?v.slice(0,max):fallback}
function list(v,max){return Array.isArray(v)?v.slice(0,max):[]}
function migrate(s){
 let v=Math.max(0,finite(s.saveVersion,0));
 if(v<1){s.saveVersion=1;v=1}
 if(v<2){
  s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};
  s.saveMeta.createdAt=finite(s.saveMeta.createdAt,Date.now());
  s.saveVersion=2;v=2;
 }
 return s;
}
function normalize(s){
 if(!validObject(s))return s;
 migrate(s);
 s.items=list(s.items,MAX.items).filter(validObject);
 s.eq=validObject(s.eq)?s.eq:{};
 s.log=list(s.log,MAX.log).map(v=>text(v,MAX.text));
 s.skills=list(s.skills,MAX.skills).map(v=>text(v,80)).filter(Boolean);
 s.bank=list(s.bank,MAX.bank).filter(validObject);
 s.name=text(s.name,MAX.name,'Aventurier')||'Aventurier';
 s.screen=text(s.screen,40,'home')||'home';
 s.race=text(s.race,40,'Mensch')||'Mensch';
 s.cls=text(s.cls,40,'Krieger')||'Krieger';
 s.bg=text(s.bg,80,'Tavernen-Stammgast')||'Tavernen-Stammgast';
 if(s.city!=null&&!validObject(s.city))s.city={};
 if(s.arenaV2!=null&&!validObject(s.arenaV2))s.arenaV2=null;
 if(s.dungeonV1!=null&&!validObject(s.dungeonV1))s.dungeonV1=null;
 s.invCap=Math.round(clamp(s.invCap,1,MAX.capacity,15));
 s.bankCap=Math.round(clamp(s.bankCap,1,MAX.capacity,100));
 s.maxAl=clamp(s.maxAl,1,MAX.currency,100);
 s.al=clamp(s.al,0,s.maxAl,0);
 s.maxHp=clamp(s.maxHp,1,MAX.currency,120);
 s.hp=clamp(s.hp,0,s.maxHp,s.maxHp);
 s.gold=clamp(s.gold,0,MAX.currency,0);
 s.xp=clamp(s.xp,0,MAX.currency,0);
 s.lvl=Math.round(clamp(s.lvl,1,MAX.level,1));
 s.forgeDust=clamp(s.forgeDust,0,MAX.currency,0);
 s.essence=clamp(s.essence,0,MAX.currency,0);
 s.souls=clamp(s.souls,0,MAX.currency,0);
 s.keys=clamp(s.keys,0,MAX.currency,0);
 s.saveVersion=VERSION;
 s.saveMeta=validObject(s.saveMeta)?s.saveMeta:{};
 return s;
}
function persist(){
 normalize(S);
 S.saveMeta.updatedAt=Date.now();
 const next=JSON.stringify(S);
 try{
  const previous=localStorage.getItem(SAVE_KEY);
  if(previous&&previous!==next&&parse(previous))localStorage.setItem(BACKUP_KEY,previous);
  localStorage.setItem(SAVE_KEY,next);
  return true;
 }catch(err){
  console.error('[Arcane Save] Speichern fehlgeschlagen',err);
  return false;
 }
}
function restoreBackup(){const b=parse(localStorage.getItem(BACKUP_KEY));if(!b)return false;try{localStorage.setItem(SAVE_KEY,JSON.stringify(normalize(b)));location.reload();return true}catch{return false}}
function exportSave(){normalize(S);return JSON.stringify(S)}
normalize(S);
window.ARCANE_STATE={key:SAVE_KEY,backupKey:BACKUP_KEY,version:VERSION,normalize,migrate,persist,restoreBackup,exportSave};
window.save=persist;
window.addEventListener('pagehide',persist);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist()});
})();