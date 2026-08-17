(()=>{
'use strict';
function state(){try{return typeof S!=='undefined'&&S?S:null}catch{return null}}
function activity(){const s=state();if(!s)return null;if(s.quest||s.autoMiniBattle||s.bountyCombat4)return'quest';if(s.dungeonV1)return'dungeon';if(s.arenaV2?.fight)return'arena';return null}
function label(x){return x==='quest'?'eine Quest':x==='dungeon'?'die Katakomben':x==='arena'?'ein Arena-Kampf':'eine andere Aktivität'}
function blocked(target){const a=activity();if(!a||a===target)return false;window.toast?.(`Nicht verfügbar: ${label(a)} ist bereits aktiv. Schließe diese Aktivität zuerst ab.`);return true}
function navigationTarget(name){const n=String(name).toLowerCase();if(['dungeon','catacombs','katakomben'].includes(n))return'dungeon';if(n==='arena')return'arena';return null}
function guardStart(name,target){const base=window[name];if(typeof base!=='function'||base.__arcaneActivityGuard)return;const guarded=function(){const resolved=typeof target==='function'?target.apply(this,arguments):target;if(resolved&&blocked(resolved))return;return base.apply(this,arguments)};Object.defineProperty(guarded,'__arcaneActivityGuard',{value:true});window[name]=guarded}
window.getActiveMajorActivity=activity;window.isMajorActivityBlocked=blocked;
window.Arcane?.navigation?.addGuard?.(({screen})=>{const target=navigationTarget(screen);return !target||!blocked(target)});
guardStart('startCombat',kind=>kind==='arena'?'arena':kind==='dungeon'?'dungeon':null);guardStart('qStart','quest');guardStart('startAutoMiniBoss','quest');guardStart('d1Start','dungeon');guardStart('arenaV2Start','arena');
function decorate(){const a=activity();if(!a)return;document.querySelectorAll('button').forEach(btn=>{const txt=(btn.textContent||'').toLowerCase(),oc=(btn.getAttribute('onclick')||'').toLowerCase();let target=null;if(txt.includes('katakomb')||oc.includes('d1start')||oc.includes("tab('dungeon")||oc.includes("startcombat('dungeon"))target='dungeon';else if(txt.includes('arena')||oc.includes('arenav2start')||oc.includes("tab('arena")||oc.includes("startcombat('arena"))target='arena';else if(oc.includes('qstart(')||oc.includes('startautominiboss'))target='quest';if(target&&target!==a){btn.disabled=true;btn.setAttribute('aria-disabled','true');btn.title=`Nicht verfügbar, solange ${label(a)} aktiv ist.`}})}
window.Arcane?.on?.('afterRenderSettled',decorate);window.Arcane?.on?.('bootReady',decorate);decorate();
})();