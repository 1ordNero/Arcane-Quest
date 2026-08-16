(()=>{
const BUILD=()=>window.ARCANE_ITEM_BUILDS;
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
const PREFIX=[
 {id:'stalwart',name:'Standhafter',aff:'ward',bonus:{armor:[1,3],hp:[4,10]}},
 {id:'night',name:'Nächtlicher',aff:'shadow',bonus:{agi:[1,2],dodge:[1,3]}},
 {id:'runed',name:'Runischer',aff:'arcane',bonus:{int:[1,2],crit:[1,2]}},
 {id:'bloodforged',name:'Blutgeschmiedeter',aff:'reaver',bonus:{str:[1,2],damage:[1,3]}},
 {id:'keen',name:'Scharfer',bonus:{crit:[1,3]}},
 {id:'vital',name:'Lebensstarker',bonus:{hp:[6,14]}}
];
const SUFFIX=[
 {id:'guardian',name:'des Hüters',aff:'ward',bonus:{block:[1,3],armor:[1,2]}},
 {id:'nightfall',name:'der Nacht',aff:'shadow',bonus:{dodge:[1,3],crit:[1,2]}},
 {id:'echoes',name:'der Echos',aff:'arcane',bonus:{int:[1,2],damage:[1,2]}},
 {id:'bloodmoon',name:'des Blutmonds',aff:'reaver',bonus:{str:[1,2],crit:[1,2]}},
 {id:'giants',name:'der Titanen',bonus:{hp:[8,18],armor:[1,2]}},
 {id:'fang',name:'des Reißzahns',bonus:{damage:[1,3],crit:[1,2]}}
];
function rarityRank(r){return {common:0,rare:1,magic:2,epic:3,mythic:4,legendary:5}[r]??0}
function rollRange(a,b,q){const span=Math.max(0,b-a);return Math.max(1,Math.round(a+span*q))}
function qualityLabel(q){return q>=.93?'Perfekt':q>=.78?'Hervorragend':q>=.58?'Stark':q>=.36?'Solide':'Rau'}
function pick(pool,aff){const weighted=[...pool.filter(x=>x.aff===aff),...pool];return weighted[Math.floor(Math.random()*weighted.length)]}
function applyAffix(it,a,q){if(!a)return;it.bonus=it.bonus||{};for(const[k,[lo,hi]]of Object.entries(a.bonus||{})){const v=rollRange(lo,hi,q);it.bonus[k]=(Number(it.bonus[k])||0)+v}}
function decorateName(it){if(!it||it.affixNameApplied)return;const base=it.baseName||it.name;it.baseName=base;const p=it.affixes?.prefix?.name||'',s=it.affixes?.suffix?.name||'';it.name=`${p?p+' ':''}${base}${s?' '+s:''}`;it.affixNameApplied=true}
function ensure(it,fresh=false){if(!it)return false;if(it.affixV1)return false;const rank=rarityRank(it.rarity),aff=BUILD()?.infer?.(it)||it.affinity||null,q=Math.max(.18,Math.min(1, fresh?(.22+Math.random()*.78):.5));const count=rank<=0?0:rank===1?1:rank<=3?(Math.random()<.28?2:1):2;it.rollQuality=q;it.affixes={};if(count>=1){const p=pick(PREFIX,aff);it.affixes.prefix={id:p.id,name:p.name};applyAffix(it,p,q)}if(count>=2){const s=pick(SUFFIX,aff);it.affixes.suffix={id:s.id,name:s.name};applyAffix(it,s,Math.min(1,q+.05))}it.affixV1=1;if(count)decorateName(it);return true}
function normalize(){let changed=false;[...(S.items||[]),...Object.values(S.eq||{})].filter(Boolean).forEach(it=>{if(ensure(it,false))changed=true});if(changed)save?.()}
function fresh(it){if(!it)return it;ensure(it,true);return it}
const oldGen=window.generateLoot;if(typeof oldGen==='function')window.generateLoot=function(){return fresh(oldGen.apply(this,arguments))};
const oldCreate=window.createLoot;if(typeof oldCreate==='function')window.createLoot=function(){return fresh(oldCreate.apply(this,arguments))};
function allItems(){return [...(S.items||[]),...Object.values(S.eq||{})].filter(Boolean)}
function itemForName(name){return allItems().find(x=>x.name===name)}
function affixText(it){if(!it?.affixV1)return'';const names=[it.affixes?.prefix?.name,it.affixes?.suffix?.name].filter(Boolean).join(' · ');return names?`${names} · Roll ${Math.round((it.rollQuality||.5)*100)}% (${qualityLabel(it.rollQuality||.5)})`:''}
function decorate(){if(S?.screen!=='char')return;const root=document.querySelector('.ip3');if(!root)return;root.querySelectorAll('.ip3-item,.ip3-eq.has').forEach(el=>{if(el.querySelector('.ia1-roll'))return;const it=itemForName((el.querySelector('b')?.textContent||'').trim());if(!it?.affixV1||(!it.affixes?.prefix&&!it.affixes?.suffix))return;const m=document.createElement('span');m.className='ia1-roll';m.textContent=`✦ ${Math.round((it.rollQuality||.5)*100)}%`;m.title=affixText(it);el.appendChild(m)});const detail=root.querySelector('.ip3-detail');if(detail&&!detail.querySelector('.ia1-detail')){const it=itemForName((detail.querySelector('h3')?.textContent||'').trim());if(it?.affixV1&&(it.affixes?.prefix||it.affixes?.suffix)){const d=document.createElement('div');d.className='ia1-detail';d.innerHTML=`<b>Affixe</b><span>${esc(affixText(it))}</span>`;detail.querySelector('div:nth-child(2)')?.appendChild(d)}}}
const r0=window.render;if(typeof r0==='function')window.render=function(){const x=r0.apply(this,arguments);queueMicrotask(decorate);return x};new MutationObserver(()=>queueMicrotask(decorate)).observe(document.body,{subtree:true,childList:true});
window.ARCANE_AFFIXES={prefix:PREFIX,suffix:SUFFIX,ensure,qualityLabel,affixText};
const st=document.createElement('style');st.textContent=`.ia1-roll{display:block!important;width:max-content;max-width:100%;margin:2px auto 0;padding:2px 5px;border-radius:999px;background:#f4c15d0b;border:1px solid #f4c15d25;color:#e7ca86;font-size:6px!important;line-height:1!important;white-space:nowrap}.ip3-eq .ia1-roll{grid-column:2;justify-self:start;margin:1px 0 0!important}.ia1-detail{margin-top:5px;padding:6px 7px;border-radius:8px;background:#f4c15d08;border:1px solid #f4c15d20}.ia1-detail b,.ia1-detail span{display:block}.ia1-detail b{font-size:8px;color:#e7ca86}.ia1-detail span{font-size:7px;color:#cdbfce;line-height:1.4;margin-top:2px}`;document.head.appendChild(st);normalize();queueMicrotask(decorate)
})();