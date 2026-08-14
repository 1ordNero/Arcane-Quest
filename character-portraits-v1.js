(()=>{
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