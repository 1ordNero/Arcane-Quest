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
.arc-skill-icon{object-fit:cover;border-radius:7px;vertical-align:middle}
/* Heldenseite: aktive Skills ca. 25% kleiner als zuvor (38px -> 29px). */
.sk-rotation>button>span{width:29px!important;height:29px!important;margin:3px auto!important;overflow:hidden;border-radius:8px;border:1px solid #ffffff18;background:#0c0812;display:block}
.sk-rotation>button>span>.arc-skill-icon{display:block;width:100%!important;height:100%!important}
/* Auswahl darf etwas größer bleiben, damit die Motive gut erkennbar sind. */
.sk-list>button>span{width:38px!important;height:38px!important;display:block;overflow:hidden;border-radius:9px;border:1px solid #ffffff18;background:#0c0812}
.sk-list>button>span>.arc-skill-icon{display:block;width:100%!important;height:100%!important}
/* Skill-Picker immer als echtes, viewport-zentriertes Overlay anzeigen. */
.modal:has(.sk-sheet){position:fixed!important;inset:0!important;z-index:320!important;display:grid!important;place-items:center!important;padding:16px!important;margin:0!important;background:#08050dcc!important;backdrop-filter:blur(8px);overflow:auto!important}
.modal:has(.sk-sheet)>.sk-sheet{position:relative!important;inset:auto!important;transform:none!important;margin:auto!important;width:min(520px,100%)!important;max-height:min(78vh,680px)!important;overflow:auto!important;border-radius:18px!important;box-shadow:0 24px 70px #000b!important}
/* In Kampftexten Skillgrafiken nur als kleine Inline-Icons verwenden. */
.av2-log .arc-skill-icon,.dv7-room .arc-skill-icon,.dv7-log .arc-skill-icon,.dv7-feedback .arc-skill-icon{display:inline-block!important;width:14px!important;height:14px!important;margin:0 4px 0 0!important;border-radius:4px!important;vertical-align:-3px!important}
`;
document.head.appendChild(css);
window.Arcane=window.Arcane||{};
Arcane.skillIcons={assets:ASSETS,bind};
})();
