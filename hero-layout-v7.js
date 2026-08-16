(()=>{
'use strict';
const ORDER=['Kopf','Schulter','Brust','Beine','Stiefel','Amulett','Ring','Haupthand','Zweithand'];
const norm=s=>s==='Ring 1'||s==='Ring 2'?'Ring':s==='Schultern'?'Schulter':s==='Nebenhand'?'Zweithand':s;
function slotName(btn){return norm(btn?.querySelector('small')?.textContent?.trim()||'')}
function makeGroup(cls,names,map){const el=document.createElement('div');el.className=cls;for(const name of names){const btn=map.get(name);if(btn)el.appendChild(btn)}return el}
function cleanHeader(root){if(!root)return;root.classList.add('he7-clean')}
function layout(){
 if(typeof S==='undefined'||S?.screen!=='char')return;
 const root=document.querySelector('.he4');if(!root)return;
 cleanHeader(root);
 if((S.heroView||'equipment')!=='equipment')return;
 const panel=root.querySelector('.he4-panel');if(!panel||panel.querySelector('.he7-shell'))return;
 const paper=panel.querySelector('.he4-paper'),lower=panel.querySelector('.he4-lower');if(!paper)return;
 const buttons=[...paper.querySelectorAll('.he4-slot'),...(lower?[...lower.querySelectorAll('.he4-slot')]:[])];
 const slots=new Map();for(const btn of buttons){const name=slotName(btn);if(ORDER.includes(name)&&!slots.has(name)){const label=btn.querySelector('small');if(label)label.textContent=name;slots.set(name,btn)}}
 const avatar=paper.querySelector('.avatar');if(!avatar)return;
 const shell=document.createElement('div');shell.className='he7-shell';
 const left=makeGroup('he7-side he7-left',['Kopf','Schulter','Brust','Beine','Stiefel'],slots);
 const right=makeGroup('he7-side he7-right',['Amulett','Ring','Haupthand','Zweithand'],slots);
 const center=document.createElement('div');center.className='he7-center';center.appendChild(avatar);
 const core=root.querySelector(':scope > .he4-head .he4-core');
 const stats=root.querySelector(':scope > .he4-stats');
 if(core){core.classList.add('he7-core');center.appendChild(core)}
 if(stats){stats.classList.add('he7-stats');center.appendChild(stats)}
 shell.append(left,center,right);
 paper.remove();lower?.remove();
 const title=panel.querySelector('.he4-title');title?.insertAdjacentElement('afterend',shell);
 const count=ORDER.filter(name=>S.eq?.[name]||(name==='Ring'&&(S.eq?.['Ring 1']||S.eq?.Ring))).length;
 const subtitle=panel.querySelector('.he4-title small');if(subtitle)subtitle.textContent=`${count}/9 Slots belegt`;
 root.classList.add('he7-ready');
}
window.Arcane?.on?.('afterRenderSettled',layout);
window.Arcane?.on?.('bootReady',()=>requestAnimationFrame(layout));
const css=document.createElement('style');css.textContent=`
.he4.he7-clean>.he4-head{grid-template-columns:1fr!important;padding-left:2px!important}.he4.he7-clean>.he4-head>img,.he4.he7-clean>.he4-head>span{display:none!important}.he4.he7-clean>.he4-head .he4-core{display:none!important}.he4.he7-clean>.he4-stats{display:none!important}.he7-ready .he4-panel{padding:12px!important}.he7-ready .he4-title{margin-bottom:10px!important}.he7-shell{display:grid;grid-template-columns:minmax(76px,92px) minmax(150px,1fr) minmax(76px,92px);gap:9px;align-items:stretch}.he7-side{display:flex;flex-direction:column;gap:7px}.he7-side .he4-slot{height:70px!important;min-height:70px!important;border-radius:12px!important;background:linear-gradient(180deg,#ffffff07,#ffffff035)!important}.he7-side .he4-slot>span{font-size:22px!important}.he7-side .he4-slot>small{font-size:7px!important;font-weight:800!important;color:#d6c9df!important}.he7-center{min-width:0;display:flex;flex-direction:column;gap:8px;padding:8px;border:1px solid #ffffff0c;border-radius:15px;background:linear-gradient(180deg,#130d1d,#1d1427)}.he7-center>.avatar{display:grid!important;place-items:center!important;min-height:225px!important;overflow:hidden!important;border-radius:12px!important;background:radial-gradient(circle at 50% 48%,#6b3c7d44 0,#2b173b22 48%,transparent 72%)!important}.he7-center>.avatar img{width:100%!important;height:100%!important;max-height:245px!important;object-fit:contain!important;object-position:center bottom!important}.he7-core{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:5px!important;width:100%!important}.he7-core b{display:flex!important;align-items:center!important;justify-content:center!important;min-height:34px!important;padding:5px!important;border:1px solid #ffffff0b!important;border-radius:9px!important;background:#ffffff06!important;font-size:9px!important}.he7-stats{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:5px!important;margin:0!important;padding:0!important;background:transparent!important}.he7-stats span{min-height:42px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:5px 2px!important;border:1px solid #ffffff08!important;border-radius:9px!important;background:#ffffff045!important}.he7-stats b{font-size:10px!important}.he7-stats small{font-size:6px!important}.he7-ready .he4-detail{margin-top:10px!important}@media(max-width:520px){.he7-shell{grid-template-columns:72px minmax(0,1fr) 72px;gap:6px}.he7-side{gap:6px}.he7-side .he4-slot{height:62px!important;min-height:62px!important}.he7-center{padding:6px;gap:6px}.he7-center>.avatar{min-height:185px!important}.he7-center>.avatar img{max-height:205px!important}.he7-core b{font-size:8px!important;min-height:31px!important}.he7-stats span{min-height:38px!important}.he7-ready .he4-panel{padding:9px!important}}@media(max-width:380px){.he7-shell{grid-template-columns:66px minmax(0,1fr) 66px}.he7-side .he4-slot{height:58px!important;min-height:58px!important}.he7-center>.avatar{min-height:165px!important}}
`;document.head.appendChild(css);
requestAnimationFrame(layout);
})();