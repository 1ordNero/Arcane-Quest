(()=>{
'use strict';
const params=new URLSearchParams(location.search);
if(params.has('fresh')){window.__ARCANE_INTENTIONAL_RESET=true;try{const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&/^arcane/i.test(k))keys.push(k)}keys.forEach(k=>localStorage.removeItem(k));sessionStorage.clear()}catch(e){console.warn('[Fresh Boot] storage cleanup',e)}}
const CLASS_SLUG={Krieger:'warrior',Magier:'mage',Hexenmeister:'warlock',Druide:'druid'};
window.getHeroPortrait=function(state){state=state||{};const cls=state.cls||'Krieger',gender=state.gender==='female'?'female':'male',slug=CLASS_SLUG[cls];return slug?`assets/characters/human-${slug}-${gender}.webp`:'assets/icons/nav-held.webp'};
window.HERO_BETA_CLASSES=['Krieger','Magier','Hexenmeister','Druide'];
function preloadCurrent(){try{if(localStorage.getItem('arcaneCharacterCreated')!=='1')return;const saved=JSON.parse(localStorage.getItem('arcaneBeta')||'null');if(!saved)return;const src=window.getHeroPortrait(saved),img=new Image();img.decoding='async';img.fetchPriority='low';img.src=src}catch{}}
if('requestIdleCallback'in window)requestIdleCallback(preloadCurrent,{timeout:3000});else setTimeout(preloadCurrent,1500);
})();