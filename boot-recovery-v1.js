(()=>{
const KEY='arcaneBeta',BACKUP='arcaneBetaBackup';
function parse(raw){if(!raw)return null;try{const v=JSON.parse(raw);return v&&typeof v==='object'&&!Array.isArray(v)?v:null}catch{return null}}
const raw=localStorage.getItem(KEY),current=parse(raw);
if(current)return;
const backupRaw=localStorage.getItem(BACKUP),backup=parse(backupRaw);
if(raw){try{localStorage.setItem(`arcaneBetaCorrupt-${Date.now()}`,raw)}catch{}}
if(backup){localStorage.setItem(KEY,JSON.stringify(backup));window.__ARCANE_BOOT_RECOVERY={restored:true,source:'backup'};}
else{localStorage.removeItem(KEY);window.__ARCANE_BOOT_RECOVERY={restored:false,source:raw?'corrupt':'none'};}
})();