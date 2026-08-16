(()=>{
let reloading=false;
const BUILD=document.querySelector('meta[name="build"]')?.content||'v0.9.9';
const STARTUP_WINDOW_MS=8000;
function notify(msg){if(typeof toast==='function')toast(msg);else console.info('[Arcane PWA]',msg)}
function recoveryNotice(){const r=window.__ARCANE_BOOT_RECOVERY;if(!r)return;if(r.restored)queueMicrotask(()=>notify('Ein beschädigter Spielstand wurde aus der letzten Sicherung wiederhergestellt.'));else if(r.source==='corrupt')queueMicrotask(()=>notify('Der beschädigte Spielstand konnte nicht wiederhergestellt werden. Ein neuer Spielstand wurde gestartet.'))}
function resumeArena(){const f=S.arenaV2?.fight;if(!f||f.done)return false;S.screen='arena';const id=f.o?.id;S.arenaV2.fight=null;const stamina=Number(S.arenaStamina);if(Number.isFinite(stamina))S.arenaStamina=Math.min(Number(S.arenaStaminaMax)||5,stamina+1);save?.();queueMicrotask(()=>{if(id&&S.arenaV2?.opponents?.some(o=>o.id===id)&&typeof arenaV2Start==='function'){arenaV2Start(id);return}log?.('Unterbrochener Arenakampf wurde sicher beendet.');render?.()});return true}
function resumeState(){if(S.quest&&Number(S.quest.ends)&&S.quest.ends<=Date.now()&&typeof render==='function')queueMicrotask(()=>render());if(S.dungeonV1&&S.screen!=='dungeon')S.screen='dungeon';if(S.bountyCombat4&&S.screen!=='home')S.screen='home';if(S.autoMiniBattle&&S.screen!=='home')S.screen='home';const arenaRestarted=resumeArena();if(!arenaRestarted)save?.()}
function activateAtStartup(worker){if(worker&&performance.now()<STARTUP_WINDOW_MS)worker.postMessage('SKIP_WAITING')}
function register(){if(!('serviceWorker'in navigator))return;const url=`./sw.js?build=${encodeURIComponent(BUILD)}`;navigator.serviceWorker.register(url,{scope:'./',updateViaCache:'none'}).then(reg=>{
  if(reg.waiting)activateAtStartup(reg.waiting);
  reg.update().catch(()=>{});
  reg.addEventListener('updatefound',()=>{const w=reg.installing;if(!w)return;w.addEventListener('statechange',()=>{if(w.state!=='installed'||!navigator.serviceWorker.controller)return;if(performance.now()<STARTUP_WINDOW_MS)w.postMessage('SKIP_WAITING');else notify('Neue Version verfügbar. Sie wird beim nächsten App-Start aktiviert.')})});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{})});
}).catch(err=>console.warn('[Arcane PWA] Service Worker konnte nicht registriert werden.',err));navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)return;reloading=true;location.reload()})}
window.addEventListener('online',()=>notify('Verbindung wiederhergestellt.'));window.addEventListener('offline',()=>notify('Offline-Modus: gespeicherte Inhalte bleiben verfügbar.'));resumeState();recoveryNotice();register();
})();