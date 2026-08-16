(()=>{
const D=()=>window.S?.dungeonV1;
const BUILD=()=>window.ARCANE_ITEM_BUILDS;
const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));
const POWERS={
 ward:{id:'lastlight',icon:'✥',name:'Letztes Licht',text:'Unter 45% HP heilt dich der Beginn eines Kampfes einmalig um 18% deiner maximalen HP.'},
 shadow:{id:'ambush',icon:'☾',name:'Schattenhinterhalt',text:'Gegner beginnen Kämpfe mit 12% weniger Lebenspunkten.'},
 arcane:{id:'wardbreak',icon:'◇',name:'Runenbruch',text:'Gegnerische Schilde starten mit 35% weniger Stärke.'},
 reaver:{id:'execution',icon:'†',name:'Bluturteil',text:'Sinkt ein Gegner unter 15% HP, wird er einmalig auf 1 HP verwundet.'}
};
function affinity(it){return BUILD()?.infer?.(it)||it?.affinity||'ward'}
function eligible(it){return !!it&&['mythic','legendary'].includes(it.rarity)}
function ensureItem(it){if(!eligible(it))return false;const a=affinity(it),p=POWERS[a];if(!p)return false;if(!it.keystone||!POWERS[Object.keys(POWERS).find(k=>POWERS[k].id===it.keystone.id)]){it.keystone={...p,affinity:a};return true}return false}
function normalize(){let changed=false;[...(S.items||[]),...Object.values(S.eq||{})].filter(Boolean).forEach(it=>{if(ensureItem(it))changed=true});if(changed)save?.()}
function equippedPowers(){return Object.values(S.eq||{}).filter(eligible).map(it=>{ensureItem(it);return it.keystone}).filter(Boolean)}
function has(id){return equippedPowers().some(p=>p.id===id)}
function state(d){d.keystoneV1=d.keystoneV1||{starts:{},exec:{}};return d.keystoneV1}
function applyCombat(d){if(!d||d.state!=='combat'||!d.enemy)return false;const k=String(d.room),ks=state(d),e=d.enemy;let changed=false;if(!ks.starts[k]){ks.starts[k]=true;if(has('lastlight')&&d.hp/d.maxHp<.45){const heal=Math.max(1,Math.round(d.maxHp*.18));d.hp=Math.min(d.maxHp,d.hp+heal);toast?.(`✥ Letztes Licht: +${heal} HP.`);changed=true}if(has('ambush')&&!e.keystoneAmbush){const cut=Math.max(1,Math.round(e.max*.12));e.hp=Math.max(1,e.hp-cut);e.keystoneAmbush=true;toast?.(`☾ Schattenhinterhalt: ${e.name} verliert ${cut} HP.`);changed=true}if(has('wardbreak')&&e.shield>0&&!e.keystoneWardbreak){const cut=Math.max(1,Math.round(e.maxShield*.35));e.shield=Math.max(0,e.shield-cut);e.keystoneWardbreak=true;toast?.(`◇ Runenbruch: −${cut} Schild.`);changed=true}}
 if(has('execution')&&!ks.exec[k]&&e.hp>1&&e.hp/e.max<=.15){ks.exec[k]=true;e.hp=1;toast?.(`† Bluturteil: ${e.name} ist zur Hinrichtung verwundet.`);changed=true}return changed}
let busy=false;
function apply(){normalize();const d=D();if(!d||busy)return;const changed=applyCombat(d);decorate();if(changed){busy=true;save?.();render?.();queueMicrotask(()=>busy=false)}}
function allItems(){return [...(S.items||[]),...Object.values(S.eq||{})].filter(Boolean)}
function itemForName(name){return allItems().find(x=>x.name===name)}
function decorate(){if(S?.screen!=='char')return;const root=document.querySelector('.ip3');if(!root)return;root.querySelectorAll('.ip3-item,.ip3-eq.has').forEach(el=>{if(el.querySelector('.ik1-mark'))return;const it=itemForName((el.querySelector('b')?.textContent||'').trim());if(!eligible(it))return;ensureItem(it);const m=document.createElement('span');m.className='ik1-mark';m.title=it.keystone.text;m.textContent=`${it.keystone.icon} ${it.rarity==='legendary'?'Legendär':'Mythisch'}`;el.appendChild(m)});const detail=root.querySelector('.ip3-detail');if(detail&&!detail.querySelector('.ik1-detail')){const it=itemForName((detail.querySelector('h3')?.textContent||'').trim());if(eligible(it)){ensureItem(it);const d=document.createElement('div');d.className='ik1-detail';d.innerHTML=`<b>${it.keystone.icon} ${esc(it.keystone.name)}</b><span>${esc(it.keystone.text)}</span>`;detail.querySelector('div:nth-child(2)')?.appendChild(d)}}}
const oldGen=window.generateLoot;if(typeof oldGen==='function')window.generateLoot=function(){const it=oldGen.apply(this,arguments);ensureItem(it);return it};
const oldCreate=window.createLoot;if(typeof oldCreate==='function')window.createLoot=function(){const it=oldCreate.apply(this,arguments);ensureItem(it);return it};
const r0=window.render;if(typeof r0==='function')window.render=function(){const x=r0.apply(this,arguments);queueMicrotask(apply);return x};
new MutationObserver(()=>queueMicrotask(apply)).observe(document.body,{subtree:true,childList:true});
window.ARCANE_KEYSTONES={powers:POWERS,equipped:equippedPowers,ensureItem};
const st=document.createElement('style');st.textContent=`.ik1-mark{display:block!important;width:max-content;max-width:100%;margin:2px auto 0;padding:2px 5px;border-radius:999px;background:#ff70430d;border:1px solid #ff9a6a2d;color:#ffc09f;font-size:6px!important;line-height:1!important;white-space:nowrap}.ip3-eq .ik1-mark{grid-column:2;justify-self:start;margin:1px 0 0!important}.ik1-detail{margin-top:5px;padding:6px 7px;border-radius:8px;background:linear-gradient(135deg,#ff70430b,#a875ff0b);border:1px solid #ff8b6330}.ik1-detail b,.ik1-detail span{display:block}.ik1-detail b{font-size:8px;color:#ffc09f}.ik1-detail span{font-size:7px;color:#cdbfce;line-height:1.4;margin-top:2px}`;document.head.appendChild(st);normalize();queueMicrotask(apply)
})();