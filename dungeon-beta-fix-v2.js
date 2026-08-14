(()=>{
/* Final render layer: dungeon-v1 keeps a private view() reference, so later
   beta overrides of window.dungeonV1 were not visible on screen. */
const previousRender=window.render;
window.render=function(){
  previousRender();
  if(S.screen==='dungeon'){
    const main=document.querySelector('main');
    if(main&&typeof window.dungeonV1==='function') main.innerHTML=window.dungeonV1();
  }
};
// Ensure persisted beta saves are immediately usable.
S.betaDungeonUnlocked=true;
if((Number(S.keys)||0)<1&&!S.dungeonV1)S.keys=5;
save();
if(S.screen==='dungeon')render();
})();