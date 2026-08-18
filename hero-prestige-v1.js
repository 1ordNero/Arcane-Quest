(()=>{
'use strict';
const SOULSTONE='assets/icons/ui/ui_soulstone.webp';
const TITLES=[
 'Erster Lebenszyklus',
 'Wiedergeborener',
 'Seelenwanderer',
 'Ahnenberührter',
 'Runenträger',
 'Vermächtniswahrer',
 'Seelenfürst',
 'Ahnenchampion',
 'Ewiggezeichneter',
 'Zyklusbrecher'
];
function count(state=S){return Math.max(0,Number(state?.reincarnation?.count)||0)}
function titleFor(value){const n=Math.max(0,Number(value)||0);return TITLES[n]||`Unsterblicher · Zyklus ${n}`}
function decorate(){
 if(S?.screen!=='char')return;
 const identity=document.querySelector('.he4-head>div:nth-child(2)');
 if(!identity)return;
 const n=count(),title=titleFor(n),key=`${n}:${title}`;
 let prestige=identity.querySelector(':scope>.hpv-prestige');
 if(!prestige){prestige=document.createElement('div');prestige.className='hpv-prestige';identity.appendChild(prestige)}
 if(prestige.dataset.key===key)return;
 prestige.dataset.key=key;
 prestige.innerHTML=`<img src="${SOULSTONE}" alt="" decoding="async"><span><b>${title}</b><small>${n===0?'Noch keine Reinkarnation':`Reinkarnation ${n}`}</small></span>`;
}
window.Arcane?.on?.('afterRenderSettled',decorate);
window.Arcane?.on?.('bootReady',decorate);
window.ARCANE_HERO_PRESTIGE=Object.freeze({titleFor,count});
const style=document.createElement('style');style.textContent=`
.hpv-prestige{display:inline-flex;align-items:center;gap:5px;margin-top:4px;padding:3px 7px 3px 4px;border:1px solid #a875ff35;border-radius:999px;background:linear-gradient(90deg,#a875ff12,#f4c15d0b);width:max-content;max-width:100%}.hpv-prestige>img{width:20px;height:20px;object-fit:contain;flex:0 0 20px}.hpv-prestige>span{min-width:0}.hpv-prestige b,.hpv-prestige small{display:block!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hpv-prestige b{font-size:8px;color:#e8d6ff;letter-spacing:.02em}.hpv-prestige small{font-size:6.5px!important;color:#b99ccc!important;margin-top:1px}@media(max-width:430px){.hpv-prestige{margin-top:3px}.hpv-prestige>img{width:18px;height:18px;flex-basis:18px}.hpv-prestige b{font-size:7.5px}}
`;document.head.appendChild(style);queueMicrotask(decorate);
})();