(()=>{
'use strict';
const root=window.Arcane=window.Arcane||{};
const keys={save:'arcaneBeta',backup:'arcaneBetaBackup',created:'arcaneCharacterCreated',last:'arcaneLast'};
const validObject=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
function parse(raw){if(!raw)return null;try{const v=JSON.parse(raw);return validObject(v)?v:null}catch{return null}}
function read(key=keys.save){try{return parse(localStorage.getItem(key))}catch{return null}}
function writeObject(value,{key=keys.save,backup=true}={}){
 if(!validObject(value))return false;
 try{
  const next=JSON.stringify(value);
  if(key===keys.save&&backup){const prev=localStorage.getItem(keys.save);if(prev&&prev!==next&&parse(prev))localStorage.setItem(keys.backup,prev)}
  localStorage.setItem(key,next);return true;
 }catch(err){console.error('[Arcane Storage] write failed',err);return false}
}
function mergeState(patch,{backup=false}={}){const current=read(keys.save)||{};return writeObject({...current,...patch},{backup})}
function clearGameData(){
 try{for(const key of Object.keys(localStorage)){if(key.toLowerCase().startsWith('arcane'))localStorage.removeItem(key)}sessionStorage.clear();return true}
 catch(err){console.warn('[Arcane Storage] clear failed',err);return false}
}
function recover(){
 const raw=localStorage.getItem(keys.save),current=parse(raw);if(current)return {restored:false,source:'primary'};
 const backup=parse(localStorage.getItem(keys.backup));
 if(raw){try{localStorage.setItem(`arcaneBetaCorrupt-${Date.now()}`,raw)}catch{}}
 if(backup){writeObject(backup,{backup:false});return {restored:true,source:'backup'}}
 try{localStorage.removeItem(keys.save)}catch{}
 return {restored:false,source:raw?'corrupt':'none'};
}
root.storage={keys,parse,read,writeObject,mergeState,clearGameData,recover};
window.ARCANE_STORAGE=root.storage;
const p=new URLSearchParams(location.search);
if(p.get('newCharacter')==='1'){
 window.__ARCANE_INTENTIONAL_RESET=true;window.__ARCANE_FORCE_CHARACTER_CREATE=true;clearGameData();
 try{const u=new URL(location.href);['newCharacter','reset','ts','fresh'].forEach(k=>u.searchParams.delete(k));history.replaceState(null,'',u.pathname+(u.searchParams.toString()?`?${u.searchParams}`:'')+u.hash)}catch(e){console.warn('[Reset boot] url',e)}
}
})();