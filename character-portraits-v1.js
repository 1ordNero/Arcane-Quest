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
})();