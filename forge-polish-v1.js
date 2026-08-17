(()=>{
'use strict';
function polish(){const root=document.querySelector('.fv4');if(!root)return;root.classList.add('aq-forge-polished');const tabs=root.querySelector('.fv4-tabs');if(tabs)tabs.setAttribute('aria-label','Schmiedebereiche');root.querySelectorAll('img[src$="ui_salvage.webp"]').forEach(img=>img.src='assets/icons/ui/ui_forge_salvage.webp')}
window.Arcane?.on?.('afterRenderSettled',polish);window.Arcane?.on?.('bootReady',polish);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',polish,{once:true});else queueMicrotask(polish);
const css=document.createElement('style');css.textContent=`
.fv4.aq-forge-polished{isolation:isolate}.aq-forge-polished .fv4-workbench{backdrop-filter:blur(6px)}.aq-forge-polished .fv4-strip{scrollbar-width:none}.aq-forge-polished .fv4-strip::-webkit-scrollbar{display:none}.aq-forge-polished .fv4-mini,.aq-forge-polished .fv4-tabs button,.aq-forge-polished .fv4-action{transition:transform .14s ease,filter .14s ease,border-color .14s ease}.aq-forge-polished .fv4-mini:active,.aq-forge-polished .fv4-tabs button:active,.aq-forge-polished .fv4-action:active{transform:scale(.985)}
`;document.head.appendChild(css);
})();