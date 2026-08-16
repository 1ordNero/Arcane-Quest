(()=>{
// Compatibility shim. Activity ownership now lives in beta-navigation-guards-v1.js.
if(typeof window.getActiveMajorActivity==='function')return;
window.getActiveMajorActivity=function(){
  try{
    if(typeof S==='undefined'||!S)return null;
    if(S.quest||S.autoMiniBattle||S.bountyCombat4)return 'quest';
    if(S.dungeonV1)return 'dungeon';
    if(S.arenaV2?.fight)return 'arena';
  }catch{}
  return null;
};
})();