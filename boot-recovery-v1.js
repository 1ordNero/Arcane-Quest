(()=>{
const KEY='arcaneBeta',BACKUP='arcaneBetaBackup';
function parse(raw){if(!raw)return null;try{const v=JSON.parse(raw);return v&&typeof v==='object'&&!Array.isArray(v)?v:null}catch{return null}}
const fresh=new URLSearchParams(location.search).get('fresh')==='1';
if(fresh){try{localStorage.removeItem(KEY);localStorage.removeItem(BACKUP);localStorage.removeItem('arcaneCharacterCreated');for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i);if(k&&/^arcaneBetaCorrupt-/i.test(k))localStorage.removeItem(k)}}catch{}window.__ARCANE_BOOT_RECOVERY={restored:false,source:'intentional-reset'};return}
const raw=localStorage.getItem(KEY),current=parse(raw);
if(current)return;
const backupRaw=localStorage.getItem(BACKUP),backup=parse(backupRaw);
if(raw){try{localStorage.setItem(`arcaneBetaCorrupt-${Date.now()}`,raw)}catch{}}
if(backup){localStorage.setItem(KEY,JSON.stringify(backup));window.__ARCANE_BOOT_RECOVERY={restored:true,source:'backup'};}
else{localStorage.removeItem(KEY);window.__ARCANE_BOOT_RECOVERY={restored:false,source:raw?'corrupt':'none'};}
})();