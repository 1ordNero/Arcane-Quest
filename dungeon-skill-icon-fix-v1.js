(()=>{
'use strict';
function escAttr(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]))}
function apply(){
 const d=window.S?.dungeonV1||window.S?.dungeonV1;
 const feedback=d?.feedback;
 const box=document.querySelector('.dv7-action');
 if(!box)return;
 box.querySelector('.dv7-skill-feedback-icon')?.remove();
 if(!feedback?.iconAsset)return;
 const img=document.createElement('img');
 img.className='dv7-skill-feedback-icon';
 img.src=feedback.iconAsset;
 img.alt=feedback.title||'Skill';
 img.decoding='async';
 img.loading='eager';
 img.onerror=()=>img.remove();
 box.prepend(img);
 box.classList.add('has-skill-icon');
}
window.Arcane?.on?.('afterRenderSettled',apply);
window.Arcane?.on?.('bootReady',apply);
const obs=new MutationObserver(()=>requestAnimationFrame(apply));
obs.observe(document.documentElement,{childList:true,subtree:true});
const css=document.createElement('style');css.textContent=`
.dv7-action.has-skill-icon{display:grid!important;grid-template-columns:52px 1fr!important;grid-template-rows:auto auto!important;column-gap:10px!important;align-items:center!important;text-align:left!important}
.dv7-action .dv7-skill-feedback-icon{grid-row:1/3!important;width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;max-width:48px!important;max-height:48px!important;object-fit:cover!important;border-radius:10px!important;border:1px solid #a875ff55!important;background:#0d0912!important;box-shadow:0 0 14px #8f62df33!important}
.dv7-action.has-skill-icon>b{grid-column:2!important;font-size:11px!important}.dv7-action.has-skill-icon>span{grid-column:2!important}
`;document.head.appendChild(css);
})();