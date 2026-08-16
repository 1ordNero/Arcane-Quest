(()=>{
const params=new URLSearchParams(location.search);
if(params.has('fresh')){
  window.__ARCANE_INTENTIONAL_RESET=true;
  try{
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&/^arcane/i.test(k))keys.push(k);
    }
    keys.forEach(k=>localStorage.removeItem(k));
    sessionStorage.clear();
  }catch(e){console.warn('[Fresh Boot] storage cleanup',e)}
}
const CLASS_SLUG={Krieger:'warrior',Magier:'mage',Hexenmeister:'warlock',Druide:'druid'};
window.getHeroPortrait=function(state){
  state=state||{};
  const cls=state.cls||'Krieger';
  const gender=state.gender==='female'?'female':'male';
  const slug=CLASS_SLUG[cls];
  return slug?`assets/characters/human-${slug}-${gender}.webp`:'assets/icons/nav-held.webp';
};
window.HERO_BETA_CLASSES=['Krieger','Magier','Hexenmeister','Druide'];
const portraits=Object.values(CLASS_SLUG).flatMap(slug=>['male','female'].map(g=>`assets/characters/human-${slug}-${g}.webp`));
const preload=()=>portraits.forEach(src=>{const img=new Image();img.decoding='async';img.src=src});
if('requestIdleCallback'in window)requestIdleCallback(preload,{timeout:2500});else setTimeout(preload,800);
})();