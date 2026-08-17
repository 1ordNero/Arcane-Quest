(()=>{
'use strict';
function merchantTabs(){if(S?.screen!=='merchant')return;const tabs=document.querySelector('.mb2-tabs');if(!tabs)return;tabs.querySelectorAll('button').forEach(b=>{if(/^Bank\b/i.test((b.textContent||'').trim()))b.remove()});tabs.style.gridTemplateColumns='repeat(2,minmax(0,1fr))'}
function apply(){merchantTabs()}
window.Arcane?.on?.('afterRenderSettled',apply);window.Arcane?.on?.('bootReady',apply);apply();
})();