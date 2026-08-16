(()=>{
function normalizeSlot(slot){return slot==='Ring 1'||slot==='Ring 2'?'Ring':slot}
const RETIRED=new Set(['Gürtel','Schulter','Schultern']);
function migrate(){S.eq=S.eq||{};S.items=S.items||[];let changed=false;
const candidates=[];
for(const key of ['Ring','Ring 1','Ring 2']){const it=S.eq[key];if(it)candidates.push(it);if(key!=='Ring'&&Object.prototype.hasOwnProperty.call(S.eq,key)){delete S.eq[key];changed=true}}
if(candidates.length){if(!S.eq.Ring){const keep=candidates.shift();keep.slot='Ring';S.eq.Ring=keep;changed=true}else candidates.splice(candidates.indexOf(S.eq.Ring),1);for(const it of candidates){if(it&&it!==S.eq.Ring){it.slot='Ring';S.items.push(it);changed=true}}}
for(const key of ['Gürtel','Schulter','Schultern']){const retired=S.eq[key];if(retired){delete S.eq[key];retired.slot='Beute';S.items.push(retired);changed=true}}
for(const it of S.items){if(!it)continue;if(it.slot==='Ring 1'||it.slot==='Ring 2'){it.slot='Ring';changed=true}else if(RETIRED.has(it.slot)){it.slot='Beute';changed=true}}
if(S.heroSlotFilter==='Ring 1'||S.heroSlotFilter==='Ring 2'){S.heroSlotFilter='Ring';changed=true}else if(RETIRED.has(S.heroSlotFilter)){delete S.heroSlotFilter;changed=true}
if(changed){window.syncEquipmentStats?.();save?.()}return changed}
const oldEquip=window.heroEquip;if(typeof oldEquip==='function')window.heroEquip=function(id){const it=(S.items||[]).find(x=>x.id===id);if(!it||!['Ring','Ring 1','Ring 2'].includes(it.slot))return oldEquip.apply(this,arguments);S.eq=S.eq||{};const ix=S.items.findIndex(x=>x.id===id);if(ix<0)return;const old=S.eq.Ring||S.eq['Ring 1']||S.eq['Ring 2'];S.items.splice(ix,1);if(old&&old!==it){old.slot='Ring';S.items.push(old)}it.slot='Ring';S.eq.Ring=it;delete S.eq['Ring 1'];delete S.eq['Ring 2'];S.heroOpenItem=it.id;window.syncEquipmentStats?.();save?.();render?.()};
const oldSlotOpen=window.heroSlotOpen;if(typeof oldSlotOpen==='function')window.heroSlotOpen=function(slot){if(RETIRED.has(slot))return;return oldSlotOpen.call(this,normalizeSlot(slot))};
function findSlot(root,label){return [...root.querySelectorAll('.he4-slot')].find(btn=>btn.querySelector('small')?.textContent.trim()===label)||null}
function cleanHero(){if(S?.screen!=='char')return;migrate();const root=document.querySelector('.he4');if(!root)return;
root.querySelectorAll('.he4-slot').forEach(btn=>{const label=btn.querySelector('small'),text=label?.textContent.trim();if(text==='Ring 2'||RETIRED.has(text))btn.remove();else if(text==='Ring 1'&&label)label.textContent='Ring'});
root.querySelectorAll('.he4-item small,.he4-detail small').forEach(el=>{el.textContent=el.textContent.replace(/^Ring 1\b/,'Ring').replace(/^Ring 2\b/,'Ring')});
const paper=root.querySelector('.he4-paper');if(paper&&!paper.classList.contains('he4-portrait-layout')){
 const avatar=paper.querySelector('.avatar');const lower=root.querySelector('.he4-lower');
 const slots={head:findSlot(root,'Kopf'),chest:findSlot(root,'Brust'),legs:findSlot(root,'Beine'),boots:findSlot(root,'Stiefel'),main:findSlot(root,'Haupthand'),off:findSlot(root,'Zweithand'),amulet:findSlot(root,'Amulett'),ring:findSlot(root,'Ring')};
 const left=document.createElement('div');left.className='he4-side he4-side-left';const right=document.createElement('div');right.className='he4-side he4-side-right';
 [slots.head,slots.chest,slots.legs,slots.boots].filter(Boolean).forEach(x=>left.appendChild(x));[slots.main,slots.off,slots.amulet,slots.ring].filter(Boolean).forEach(x=>right.appendChild(x));
 paper.replaceChildren(left,avatar,right);paper.classList.add('he4-portrait-layout');if(lower)lower.remove();
 }
const title=[...root.querySelectorAll('.he4-title small')].find(x=>/Slots belegt/i.test(x.textContent));if(title){const valid=new Set(['Kopf','Brust','Beine','Stiefel','Haupthand','Zweithand','Nebenhand','Amulett','Ring']);const occupied=Object.entries(S.eq||{}).filter(([k,v])=>v&&valid.has(k)).length;title.textContent=`${occupied}/8 Slots belegt`}}
const oldRender=window.render;if(typeof oldRender==='function')window.render=function(){const r=oldRender.apply(this,arguments);queueMicrotask(cleanHero);return r};
const oldChar=window.char;if(typeof oldChar==='function')window.char=function(){migrate();return oldChar.apply(this,arguments)};
const css=document.createElement('style');css.textContent=`.he4-paper.he4-portrait-layout{display:grid!important;grid-template-columns:74px minmax(120px,1fr) 74px!important;grid-template-areas:none!important;gap:8px!important;align-items:stretch!important}.he4-portrait-layout .he4-side{display:grid!important;grid-template-rows:repeat(4,1fr)!important;gap:6px!important;min-width:0}.he4-portrait-layout .avatar{grid-area:auto!important;min-height:266px!important}.he4-portrait-layout .he4-slot{height:auto!important;min-height:58px!important}.he4-lower{display:none!important}@media(max-width:430px){.he4-paper.he4-portrait-layout{grid-template-columns:68px minmax(100px,1fr) 68px!important;gap:5px!important}.he4-portrait-layout .he4-side{gap:5px!important}.he4-portrait-layout .he4-slot{min-height:54px!important}.he4-portrait-layout .avatar{min-height:236px!important}}`;document.head.appendChild(css);migrate();queueMicrotask(cleanHero)
})();