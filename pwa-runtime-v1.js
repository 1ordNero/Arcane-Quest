(()=>{
let reloading=false;
function notify(msg){if(typeof toast==='function')toast(msg);else console.info('[Arcane PWA]',msg)}
function recoveryNotice(){const r=window.__ARCANE_BOOT_RECOVERY;if(!r)return;if(r.restored)queueMicrotask(()=>notify('Ein beschädigter Spielstand wurde aus der letzten Sicherung wiederhergestellt.'));else if(r.source==='corrupt')queueMicrotask(()=>notify('Der beschädigte Spielstand konnte nicht wiederhergestellt werden. Ein neuer Spielstand wurde gestartet.'))}
function resumeState(){
 if(S.quest&&Number(S.quest.ends)&&S.quest.ends<=Date.now()&&typeof render==='function')queueMicrotask(()=>render());
 if(S.dungeonV1&&S.screen!=='dungeon')S.screen='dungeon';
 if(S.bountyCombat4&&S.screen!=='home')S.screen='home';
 if(S.autoMiniBattle&&S.screen!=='home')S.screen='home';
 if(S.arenaV2?.fight&&!S.arenaV2.fight.done&&S.screen!=='arena')S.screen='arena';
 save?.();
}
function register(){
 if(!('serviceWorker'in navigator))return;
 navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(reg=>{
  if(reg.waiting)console.info('[Arcane PWA] Update wartet auf nächsten Start.');
  reg.addEventListener('updatefound',()=>{const w=reg.installing;if(!w)return;w.addEventListener('statechange',()=>{if(w.state==='installed'&&navigator.serviceWorker.controller)console.info('[Arcane PWA] Neue Version installiert; Aktivierung beim nächsten Start.')})});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')reg.update().catch(()=>{})});
 }).catch(err=>console.warn('[Arcane PWA] Service Worker konnte nicht registriert werden.',err));
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)return;reloading=true;location.reload()});
}
window.addEventListener('online',()=>notify('Verbindung wiederhergestellt.'));
window.addEventListener('offline',()=>notify('Offline-Modus: gespeicherte Inhalte bleiben verfügbar.'));
resumeState();recoveryNotice();register();
})();