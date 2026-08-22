(()=>{
'use strict';
const params=new URLSearchParams(location.search);
const storage=()=>window.ARCANE_STORAGE||window.Arcane?.storage||null;
if(params.has('fresh')){window.__ARCANE_INTENTIONAL_RESET=true;if(!storage()?.clearGameData)try{const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&/^arcane/i.test(k))keys.push(k)}keys.forEach(k=>localStorage.removeItem(k));sessionStorage.clear()}catch(e){console.warn('[Fresh Boot] storage cleanup',e)}else storage().clearGameData()}
const CLASS_SLUG={Krieger:'warrior',Magier:'mage',Hexenmeister:'warlock',Druide:'druid'};
window.getHeroPortrait=function(state){state=state||{};const cls=state.cls||'Krieger',gender=state.gender==='female'?'female':'male',slug=CLASS_SLUG[cls];return slug?`assets/characters/human-${slug}-${gender}.webp`:'assets/icons/nav-held.webp'};
window.HERO_BETA_CLASSES=['Krieger','Magier','Hexenmeister','Druide'];
function preloadCurrent(){try{if(storage()?.readText?.(storage()?.keys?.created||'arcaneCharacterCreated')!=='1')return;const saved=storage()?.read?.();if(!saved)return;const src=window.getHeroPortrait(saved),img=new Image();img.decoding='async';img.fetchPriority='low';img.src=src}catch{}}
if('requestIdleCallback'in window)requestIdleCallback(preloadCurrent,{timeout:3000});else setTimeout(preloadCurrent,1500);
})();
