(()=>{
const KEY='arcaneBeta',BACKUP='arcaneBetaBackup';
function parse(raw){if(!raw)return null;try{const v=JSON.parse(raw);return v&&typeof v==='object'&&!Array.isArray(v)?v:null}catch{return null}}
const params=new URLSearchParams(location.search),fresh=params.get('fresh')==='1';
if(fresh){try{localStorage.clear();localStorage.removeItem(KEY);localStorage.removeItem(BACKUP);localStorage.removeItem('arcaneCharacterCreated');localStorage.removeItem('arcaneLast');sessionStorage.clear()}catch{}window.__ARCANE_INTENTIONAL_RESET=true;window.__ARCANE_BOOT_RECOVERY={restored:false,source:'intentional-reset'};const clean=new URL(location.href);clean.search='';clean.searchParams.set('newCharacter','1');clean.searchParams.set('_',Date.now());location.replace(clean.href);return}
const raw=localStorage.getItem(KEY),current=parse(raw);
if(current)return;
const backupRaw=localStorage.getItem(BACKUP),backup=parse(backupRaw);
if(raw){try{localStorage.setItem(`arcaneBetaCorrupt-${Date.now()}`,raw)}catch{}}
if(backup){localStorage.setItem(KEY,JSON.stringify(backup));window.__ARCANE_BOOT_RECOVERY={restored:true,source:'backup'};}
else{localStorage.removeItem(KEY);window.__ARCANE_BOOT_RECOVERY={restored:false,source:raw?'corrupt':'none'};}
})();