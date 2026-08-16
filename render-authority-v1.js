(()=>{
'use strict';
function reclaim(){
  const lifecycle=window.Arcane?.lifecycle;
  if(typeof lifecycle?.reclaim!=='function')return false;
  return lifecycle.reclaim();
}
reclaim();
window.Arcane?.on?.('bootReady',reclaim);
queueMicrotask(reclaim);
})();
