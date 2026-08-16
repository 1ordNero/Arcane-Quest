(()=>{
'use strict';
function recoverCombatLock(){
 let d=null;try{d=typeof S!=='undefined'&&S?S.dungeonV1:null}catch{}
 if(!d||d.state!=='combat'||!d.enemy||!d.autoBusy)return;
 const stamp=Number(d.autoBusyAt||0);
 if(!stamp||Date.now()-stamp>1800){
  d.autoBusy=false;
  delete d.autoBusyAt;
  try{window.save?.()}catch{}
 }
}
setInterval(recoverCombatLock,500);
window.addEventListener('pageshow',recoverCombatLock);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')recoverCombatLock()});
if(window.Arcane?.on)Arcane.on('afterRenderSettled',recoverCombatLock);
recoverCombatLock();
})();