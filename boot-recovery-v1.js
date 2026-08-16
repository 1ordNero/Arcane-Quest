(()=>{
const storage=window.ARCANE_STORAGE;
if(!storage){console.error('[Arcane Boot] storage core unavailable');return}
const params=new URLSearchParams(location.search),fresh=params.get('fresh')==='1';
if(fresh){window.__ARCANE_INTENTIONAL_RESET=true;storage.clearGameData();window.__ARCANE_BOOT_RECOVERY={restored:false,source:'intentional-reset'};const clean=new URL(location.href);clean.search='';clean.searchParams.set('newCharacter','1');clean.searchParams.set('_',Date.now());location.replace(clean.href);return}
window.__ARCANE_BOOT_RECOVERY=storage.recover();
})();