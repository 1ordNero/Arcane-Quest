(()=>{
'use strict';
const BASE='assets/icons/skills/';
const ASSETS={
 Krieger:{
  shieldbash:'skill_warrior_shieldbash.webp',
  heavy:'skill_warrior_heavy_strike.webp',
  wall:'skill_warrior_shieldwall.webp',
  execute:'skill_warrior_execute.webp',
  rage:'skill_warrior_battle_rage.webp',
  charge:'skill_warrior_charge.webp'
 },
 Magier:{
  spark:'skill_mage_arcane_strike.webp',
  meteor:'skill_mage_arcane_meteor.webp',
  ward:'skill_mage_rune_shield.webp',
  burn:'skill_mage_starburn.webp',
  focus:'skill_mage_arcane_focus.webp',
  lance:'skill_mage_mana_lance.webp'
 },
 Druide:{
  shift:'skill_druid_shapeshift.webp',
  claw:'skill_druid_wild_claw.webp',
  bark:'skill_druid_barkskin.webp'
 }
};
function markup(src,name){return `<img class="arc-skill-icon" src="${src}" alt="${name||''}" loading="lazy" decoding="async">`}
function bind(){
 const data=window.SKILL_DATA||{};
 Object.entries(ASSETS).forEach(([cls,map])=>{
  (data[cls]||[]).forEach(skill=>{
   const file=map[skill.id];
   if(!file)return;
   const src=BASE+file;
   skill.iconAsset=src;
   skill.icon=markup(src,skill.name);
  });
 });
}
bind();
Object.values(ASSETS).flatMap(x=>Object.values(x)).forEach(file=>{const img=new Image();img.src=BASE+file;});
const css=document.createElement('style');
css.textContent=`
.arc-skill-icon{display:block;width:100%;height:100%;object-fit:cover;border-radius:9px}
.sk-rotation>button>span{width:38px;height:38px;margin:4px auto;overflow:hidden;border-radius:10px;border:1px solid #ffffff18;background:#0c0812;display:block}
.sk-list>button>span{width:42px;height:42px;display:block;overflow:hidden;border-radius:10px;border:1px solid #ffffff18;background:#0c0812}
.sk-rotation>button>span>.arc-skill-icon,.sk-list>button>span>.arc-skill-icon{width:100%;height:100%}
`;
document.head.appendChild(css);
window.Arcane=window.Arcane||{};
Arcane.skillIcons={assets:ASSETS,bind};
})();
