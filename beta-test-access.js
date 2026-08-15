(()=>{
const BETA_KEYS=5;
function grant(){
  S.betaDungeonAccessGranted=true;
  S.betaDungeonUnlocked=true;
  if((Number(S.keys)||0)<1&&!S.dungeonV1)S.keys=BETA_KEYS;
  save();
}
function topup(){
  if(!S.betaDungeonUnlocked)return;
  if((Number(S.keys)||0)<=0&&!S.dungeonV1){S.keys=BETA_KEYS;save()}
}
grant();
/* Beta access now only controls eligibility/keys. Rendering belongs exclusively
   to dungeon-view-v4 so an older dungeon view can no longer be layered over it. */
const realStart=window.d1Start;
window.d1Start=function(){
  grant();
  if(S.dungeonV1){render();return}
  if((Number(S.keys)||0)<1)S.keys=BETA_KEYS;
  const level=S.lvl;
  S.lvl=Math.max(10,Number(S.lvl)||1);
  try{return realStart?.()}finally{S.lvl=level;save()}
};
setInterval(topup,1500);
})();