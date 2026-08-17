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
const byName=new Map();
function esc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function indexSkills(){
 const data=window.SKILL_DATA||{};
 byName.clear();
 Object.entries(ASSETS).forEach(([cls,map])=>{
  (data[cls]||[]).forEach(skill=>{
   const file=map[skill.id];
   if(file){skill.iconAsset=BASE+file;byName.set(skill.name,skill.iconAsset);}
  });
 });
}
function iconMarkup(src,name){return `<img class="arc-skill-icon" src="${src}" alt="${name||''}" loading="lazy" decoding="async">`}
function injectHtml(html){
 if(typeof html!=='string')return html;
 if(!byName.size)indexSkills();
 byName.forEach((src,name)=>{
  const re=new RegExp(`(<button[^>]*>[\\s\\S]*?<span[^>]*>)[\\s\\S]*?(<\\/span>[\\s\\S]*?<b>${esc(name)}<\\/b>)`,'g');
  html=html.replace(re,`$1${iconMarkup(src,name)}$2`);
 });
 return html;
}
function iconImg(src,name){
 const img=document.createElement('img');
 img.className='arc-skill-icon';img.src=src;img.alt=name||'';img.loading='lazy';img.decoding='async';
 return img;
}
function apply(root=document){
 if(!byName.size)indexSkills();
 root.querySelectorAll?.('.sk-rotation>button,.sk-list>button').forEach(btn=>{
  const name=btn.querySelector('b')?.textContent?.trim();
  const src=byName.get(name);
  const holder=btn.querySelector('span');
  if(src&&holder&&!holder.querySelector('.arc-skill-icon'))holder.replaceChildren(iconImg(src,name));
 });
}
indexSkills();
Object.values(ASSETS).flatMap(x=>Object.values(x)).forEach(file=>{const img=new Image();img.src=BASE+file;});
const css=document.createElement('style');
css.textContent=`.arc-skill-icon{display:block;width:100%;height:100%;object-fit:cover;border-radius:9px}.sk-rotation>button>span:has(.arc-skill-icon){width:38px;height:38px;margin:4px auto;overflow:hidden;border-radius:10px;border:1px solid #ffffff18;background:#0c0812}.sk-list>button>span:has(.arc-skill-icon){width:42px;height:42px;display:block;overflow:hidden;border-radius:10px;border:1px solid #ffffff18;background:#0c0812}`;
document.head.appendChild(css);
if(typeof window.char==='function'){
 const previousChar=window.char;
 window.char=function(){return injectHtml(previousChar.apply(this,arguments))};
}
apply();
new MutationObserver(muts=>{for(const m of muts){for(const n of m.addedNodes){if(n.nodeType===1)apply(n);}}}).observe(document.body,{childList:true,subtree:true});
window.Arcane=window.Arcane||{};
Arcane.skillIcons={assets:ASSETS,apply,injectHtml};
})();
