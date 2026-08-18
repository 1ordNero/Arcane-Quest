(()=>{
'use strict';
function itemId(button){
 const direct=button?.dataset?.itemId;if(direct)return direct;
 const match=(button?.getAttribute('onclick')||'').match(/heroItemOpen\(['"]([^'"]+)['"]\)/);
 return match?.[1]||'';
}
function enforce(){
 if(typeof S==='undefined'||S?.screen!=='char')return;
 const root=document.querySelector('.he4');if(!root)return;
 const tabs=[...root.querySelectorAll('.he4-tabs button')];
 const skillTab=tabs.find(button=>/^Skills/i.test((button.textContent||'').trim()));
 skillTab?.remove();
 const inventoryTab=[...root.querySelectorAll('.he4-tabs button')].find(button=>/^Inventar/i.test((button.textContent||'').trim()));
 inventoryTab?.classList.add('hero-inventory-tab');
 root.querySelectorAll('.he7-quickskills,.hc1-skills:not(.hd8-skills),.he4-skills').forEach(el=>el.remove());
 root.querySelectorAll('.hd8-slot.has').forEach(button=>{const id=itemId(button);if(id)button.dataset.itemId=id});
 const canonical=root.querySelector('.hd8-skills');
 if((S.heroView||'equipment')!=='equipment')canonical?.remove();
}
document.addEventListener('click',event=>{
 if(typeof S==='undefined'||S?.screen!=='char')return;
 const button=event.target.closest?.('.hd8-slot.has');if(!button)return;
 const id=itemId(button);if(!id||typeof window.idp1Show!=='function')return;
 event.preventDefault();event.stopImmediatePropagation();window.idp1Show(id,'inventory');
},true);
window.Arcane?.on?.('afterRenderSettled',enforce);window.Arcane?.on?.('bootReady',enforce);queueMicrotask(enforce);
const style=document.createElement('style');style.textContent=`
.he4 .he7-quickskills,.he4 .hc1-skills:not(.hd8-skills),.he4 .he4-skills{display:none!important}
.he4.hd8-root .he4-tabs{grid-template-columns:1fr 1fr!important}
.he4.hd8-root .he4-tabs button.hero-inventory-tab{display:block!important}
.he4 .hd8-vital{min-height:30px!important;padding:2px 3px!important;background:#100d14!important;border-color:#ffffff09!important}
.he4 .hd8-vital:hover,.he4 .hd8-vital:focus{background:#141018!important;border-color:#ffffff16!important}
.he4 .hd8-attrs span{min-height:26px!important;padding:2px!important;background:#100d14!important;border-color:#ffffff08!important}
.he4 .hd8-slot.empty{min-height:48px!important;background:#100d14!important;border-color:#ffffff09!important}
@media(max-width:430px){.he4 .hd8-vital{min-height:28px!important}.he4 .hd8-attrs span{min-height:24px!important}.he4 .hd8-slot.empty{min-height:46px!important}}
`;document.head.appendChild(style);
})();