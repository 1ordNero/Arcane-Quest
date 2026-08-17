(()=>{
'use strict';
const BASE='assets/icons/skills/';
const ASSETS={
 Krieger:{shieldbash:'skill_warrior_shieldbash.webp',heavy:'skill_warrior_heavy_strike.webp',wall:'skill_warrior_shieldwall.webp',execute:'skill_warrior_execute.webp',rage:'skill_warrior_battle_rage.webp',charge:'skill_warrior_charge.webp'},
 Magier:{spark:'skill_mage_arcane_strike.webp',meteor:'skill_mage_arcane_meteor.webp',ward:'skill_mage_rune_shield.webp',burn:'skill_mage_starburn.webp',focus:'skill_mage_arcane_focus.webp',lance:'skill_mage_mana_lance.webp'},
 Druide:{shift:'skill_druid_shapeshift.webp',claw:'skill_druid_wild_claw.webp',bark:'skill_druid_barkskin.webp',thorn:'skill_druid_thorn_rip.webp',heal:'skill_druid_life_spring.webp',maul:'skill_druid_bear_maul.webp'},
 Hexenmeister:{curse:'skill_warlock_corruption_curse.webp',drain:'skill_warlock_soul_drain.webp',shade:'skill_warlock_shadow_veil.webp',rot:'skill_warlock_soul_rot.webp',pact:'skill_warlock_dark_pact.webp',lash:'skill_warlock_void_lash.webp'}
};
function markup(src,name){return `<img class="arc-skill-icon" src="${src}" alt="${name||''}" loading="lazy" decoding="async">`}
function bind(){const data=window.SKILL_DATA||{};Object.entries(ASSETS).forEach(([cls,map])=>{(data[cls]||[]).forEach(skill=>{const file=map[skill.id];if(!file)return;const src=BASE+file;skill.iconAsset=src;skill.icon=markup(src,skill.name)})})}
bind();
Object.values(ASSETS).flatMap(x=>Object.values(x)).forEach(file=>{const img=new Image();img.src=BASE+file});
const css=document.createElement('style');css.textContent=`
img.arc-skill-icon{display:block!important;width:24px!important;height:24px!important;max-width:24px!important;max-height:24px!important;min-width:24px!important;min-height:24px!important;object-fit:cover!important;border-radius:6px!important;margin:0 auto!important}
.sk-rotation>button>span{display:grid!important;place-items:center!important;width:28px!important;height:28px!important;min-width:28px!important;min-height:28px!important;margin:3px auto!important;padding:0!important;overflow:hidden!important;border-radius:7px!important;border:1px solid #ffffff18!important;background:#0c0812!important;font-size:0!important;line-height:0!important}
.sk-rotation>button>span>img.arc-skill-icon{width:24px!important;height:24px!important;max-width:24px!important;max-height:24px!important;min-width:24px!important;min-height:24px!important}
.sk-list>button>span{display:grid!important;place-items:center!important;width:36px!important;height:36px!important;min-width:36px!important;min-height:36px!important;padding:0!important;overflow:hidden!important;border-radius:8px!important;border:1px solid #ffffff18!important;background:#0c0812!important;font-size:0!important;line-height:0!important}
.sk-list>button>span>img.arc-skill-icon{width:32px!important;height:32px!important;max-width:32px!important;max-height:32px!important;min-width:32px!important;min-height:32px!important}
.modal:has(> .sk-sheet),.modal.sk-picker-modal{position:fixed!important;top:0!important;right:0!important;bottom:0!important;left:0!important;width:100vw!important;height:100dvh!important;z-index:10000!important;margin:0!important;padding:16px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:rgba(8,5,13,.88)!important;backdrop-filter:blur(8px)!important;overflow:hidden!important}
.modal:has(> .sk-sheet)> .sk-sheet,.sk-picker-modal> .sk-sheet{position:relative!important;top:auto!important;right:auto!important;bottom:auto!important;left:auto!important;transform:none!important;width:min(520px,calc(100vw - 24px))!important;max-width:520px!important;max-height:min(76dvh,640px)!important;margin:0!important;padding:14px!important;overflow-y:auto!important;overscroll-behavior:contain!important;border-radius:18px!important;background:#1b1425!important;box-shadow:0 24px 70px #000c!important}
.av2-log img.arc-skill-icon,.dv7-room img.arc-skill-icon,.dv7-log img.arc-skill-icon,.dv7-feedback img.arc-skill-icon{display:inline-block!important;width:14px!important;height:14px!important;max-width:14px!important;max-height:14px!important;min-width:14px!important;min-height:14px!important;margin:0 4px 0 0!important;border-radius:3px!important;vertical-align:-3px!important}
`;document.head.appendChild(css);
function markPicker(){document.querySelectorAll('.modal').forEach(m=>{if(m.querySelector(':scope > .sk-sheet'))m.classList.add('sk-picker-modal')})}
const obs=new MutationObserver(markPicker);obs.observe(document.documentElement,{childList:true,subtree:true});markPicker();
window.Arcane=window.Arcane||{};Arcane.skillIcons={assets:ASSETS,bind};
})();
