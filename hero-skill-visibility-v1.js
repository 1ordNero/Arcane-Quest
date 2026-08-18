(()=>{
'use strict';
function enforce(){
 if(typeof S==='undefined'||S?.screen!=='char')return;
 const root=document.querySelector('.he4');if(!root)return;
 const skillTab=[...root.querySelectorAll('.he4-tabs button')].find(button=>/^Skills/i.test((button.textContent||'').trim()));skillTab?.remove();
 root.querySelectorAll('.he7-quickskills,.hc1-skills:not(.hd8-skills),.he4-skills').forEach(el=>el.closest('.he4-panel')?.classList.contains('hd8-skills')||el.remove());
 const canonical=root.querySelector('.hd8-skills');
 if((S.heroView||'equipment')!=='equipment')canonical?.remove();
}
window.Arcane?.on?.('afterRenderSettled',enforce);window.Arcane?.on?.('bootReady',enforce);queueMicrotask(enforce);
const style=document.createElement('style');style.textContent=`
.he4 .he7-quickskills,.he4 .hc1-skills:not(.hd8-skills),.he4 .he4-skills{display:none!important}
.he4 .hd8-vital{min-height:32px!important;padding:3px 3px!important;background:#100d14!important;border-color:#ffffff09!important}
.he4 .hd8-vital:hover,.he4 .hd8-vital:focus{background:#141018!important;border-color:#ffffff16!important}
.he4 .hd8-attrs span{min-height:28px!important;padding:3px 2px!important;background:#100d14!important;border-color:#ffffff08!important}
.he4 .hd8-slot.empty{min-height:50px!important;background:#100d14!important;border-color:#ffffff09!important}
@media(max-width:430px){.he4 .hd8-vital{min-height:30px!important}.he4 .hd8-attrs span{min-height:26px!important}.he4 .hd8-slot.empty{min-height:48px!important}}
`;document.head.appendChild(style);
})();