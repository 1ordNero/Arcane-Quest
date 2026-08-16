(()=>{
'use strict';
const VALID=['Kopf','Schulter','Brust','Beine','Stiefel','Amulett','Ring','Haupthand','Zweithand'];
const RETIRED=new Set(['Gürtel','Handschuhe']);
const UI='assets/icons/ui/';
const normalizeSlot=s=>s==='Ring 1'||s==='Ring 2'?'Ring':s==='Schultern'?'Schulter':s==='Nebenhand'?'Zweithand':s;
let sanitizing=false;
function sanitizeEquipment(){
 if(sanitizing||typeof S==='undefined'||!S)return false;
 sanitizing=true;let changed=false;S.items=S.items||[];S.eq=S.eq||{};
 const next={};
 for(const [key,item] of Object.entries(S.eq)){
   if(!item)continue;const slot=normalizeSlot(key);item.slot=normalizeSlot(item.slot||slot);
   if(RETIRED.has(item.slot)||RETIRED.has(slot)){item.slot='Beute';S.items.push(item);changed=true;continue}
   const target=VALID.includes(slot)?slot:(VALID.includes(item.slot)?item.slot:null);
   if(!target){S.items.push(item);changed=true;continue}
   if(!next[target]){item.slot=target;next[target]=item;if(target!==key)changed=true}
   else if(next[target]!==item){item.slot=target;S.items.push(item);changed=true}
 }
 S.eq=next;
 for(const item of S.items){if(!item)continue;const slot=normalizeSlot(item.slot);if(RETIRED.has(slot)){item.slot='Beute';changed=true}else if(slot!==item.slot){item.slot=slot;changed=true}}
 if(RETIRED.has(S.heroSlotFilter)){delete S.heroSlotFilter;changed=true}else if(S.heroSlotFilter){const n=normalizeSlot(S.heroSlotFilter);if(n!==S.heroSlotFilter){S.heroSlotFilter=n;changed=true}}
 sanitizing=false;return changed;
}
function persistCanonical(){if(sanitizeEquipment())window.syncEquipmentStats?.();window.ARCANE_APP_STATE?.save?.(S)}
const priorSave=window.save;
if(typeof priorSave==='function')window.save=function(){const result=priorSave.apply(this,arguments);persistCanonical();return result};
function safeLoot(base,args){let item=null;for(let i=0;i<8;i++){item=base.apply(this,args);if(item&&!RETIRED.has(normalizeSlot(item.slot)))break}if(item){item.slot=normalizeSlot(item.slot);if(RETIRED.has(item.slot))item.slot='Beute'}return item}
const baseCreate=window.createLoot;
if(typeof baseCreate==='function')window.createLoot=function(){return safeLoot(baseCreate,arguments)};
const baseGenerate=window.generateLoot;
if(typeof baseGenerate==='function')window.generateLoot=function(kind='general'){return window.createLoot?window.createLoot(kind,null,S?.lvl||1):safeLoot(baseGenerate,arguments)};
function ensureStatIcon(el,type){
 if(!el)return;const src=UI+(type==='attack'?'stat_attack.webp':'stat_defense.webp');let img=el.querySelector('img.aq-combat-stat-icon');
 if(!img){img=document.createElement('img');img.className='aq-combat-stat-icon';img.alt=type==='attack'?'Angriff':'Verteidigung';el.prepend(img)}
 if(img.getAttribute('src')!==src)img.src=src;
 for(const n of [...el.childNodes])if(n.nodeType===Node.TEXT_NODE)n.nodeValue=n.nodeValue.replace(type==='attack'?/[⚔️⚔]/gu:/[🛡️🛡]/gu,'').trimStart();
}
function fixHero(){
 if(typeof S==='undefined'||S?.screen!=='char')return;sanitizeEquipment();
 document.querySelectorAll('.he4-core b').forEach(el=>{const t=el.textContent||'';if(/Schaden|Angriff|⚔/i.test(t))ensureStatIcon(el,'attack');else if(/Rüstung|Verteidigung|🛡/i.test(t))ensureStatIcon(el,'defense')});
 document.querySelectorAll('.he4-slot').forEach(btn=>{const label=btn.querySelector('small');const t=label?.textContent.trim();if(t==='Gürtel'||t==='Ring 2')btn.remove();else if(t==='Ring 1'&&label)label.textContent='Ring'});
 const count=VALID.filter(slot=>S.eq?.[slot]).length;
 [...document.querySelectorAll('.he4-title small,.ip3-title small')].forEach(el=>{if(/Slots belegt/i.test(el.textContent)||/^\d+\/\d+$/.test(el.textContent.trim()))el.textContent=`${count}/9 Slots belegt`});
}
function fixDungeonBoot(){
 if(typeof S==='undefined'||S?.screen!=='dungeon'||typeof window.dungeonV1!=='function')return;
 const main=document.querySelector('main');if(!main)return;
 if(!main.querySelector('.dv7')){main.innerHTML=window.dungeonV1();requestAnimationFrame(()=>window.Arcane?.emit?.('afterRenderSettled',{state:S,screen:'dungeon'}))}
}
function reconcile(){fixHero();fixDungeonBoot()}
window.Arcane?.on?.('afterRenderSettled',reconcile);
window.Arcane?.on?.('bootReady',()=>{persistCanonical();requestAnimationFrame(()=>{if(S?.screen==='dungeon')window.render?.();reconcile()})});
const css=document.createElement('style');css.textContent=`.aq-combat-stat-icon{display:inline-block!important;width:20px!important;height:20px!important;object-fit:contain!important;vertical-align:middle!important;margin-right:4px!important;position:static!important;transform:none!important}.he4-core b{display:inline-flex!important;align-items:center!important}`;document.head.appendChild(css);
persistCanonical();
})();
