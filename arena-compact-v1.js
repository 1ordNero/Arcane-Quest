(()=>{
'use strict';
function compact(){
  if(typeof S==='undefined'||S?.screen!=='arena')return;
  const root=document.querySelector('.av2');
  const overview=root?.querySelector('.av3-overview');
  if(!root||!overview)return;
  overview.classList.add('ac1-overview');
  overview.querySelector('.av3-title')?.remove();
  const stamina=root.querySelector('.arena-stamina');
  if(stamina&&stamina.parentElement!==overview){overview.appendChild(stamina)}
  const rank=overview.querySelector('.av3-rank');
  if(rank)rank.classList.add('ac1-rank');
}
window.Arcane?.on?.('afterRenderSettled',compact);
window.Arcane?.on?.('bootReady',compact);
const css=document.createElement('style');css.textContent=`
.av3-overview.ac1-overview{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr)!important;gap:8px!important;align-items:stretch!important;padding:8px!important;border-radius:13px!important;background:linear-gradient(135deg,#21172d,#17111f)!important}.ac1-overview>.av3-title{display:none!important}.ac1-rank{display:flex!important;flex-direction:column!important;justify-content:center!important;min-width:0!important;padding:7px 9px!important;border-radius:10px!important;background:#ffffff05!important}.ac1-rank>div:first-child{display:flex!important;align-items:baseline!important;justify-content:flex-start!important;gap:7px!important}.ac1-rank b{font-size:12px!important;line-height:1!important}.ac1-rank span{font-size:8px!important;white-space:nowrap!important}.ac1-rankbar{height:4px!important;margin:5px 0 3px!important}.ac1-rank>small{font-size:7px!important;line-height:1.15!important;white-space:nowrap!important}.ac1-overview>.arena-stamina{margin:0!important;padding:7px 9px!important;min-height:0!important;border-radius:10px!important;background:#ffffff05!important;gap:8px!important}.ac1-overview>.arena-stamina>div:first-child{min-width:0!important}.ac1-overview>.arena-stamina small{font-size:7px!important}.ac1-overview>.arena-stamina b{font-size:11px!important;line-height:1.15!important}.ac1-overview>.arena-stamina span{display:none!important}.ac1-overview .arena-stamina-pips{gap:3px!important;flex:0 0 auto!important}.ac1-overview .arena-stamina-pips i{width:7px!important;height:13px!important;border-radius:3px!important}.av3-section{margin-top:10px!important;margin-bottom:6px!important}.av3-section h2{font-size:16px!important}.av2-stance-detail{margin-top:5px!important;padding:6px 9px!important}.av2-stance-detail b{font-size:10px!important}.av2-stance-detail span{font-size:9px!important}
@media(max-width:430px){.av3-overview.ac1-overview{grid-template-columns:.9fr 1.1fr!important;padding:7px!important;gap:6px!important}.ac1-rank{padding:6px 7px!important}.ac1-rank b{font-size:11px!important}.ac1-rank span{font-size:7px!important}.ac1-rank>small{font-size:6.5px!important}.ac1-overview>.arena-stamina{padding:6px 7px!important}.ac1-overview>.arena-stamina b{font-size:10px!important}.ac1-overview .arena-stamina-pips i{width:6px!important;height:12px!important}.av3-section>span{font-size:8px!important}.av3-section{margin-top:9px!important}}
`;document.head.appendChild(css);queueMicrotask(compact);
})();