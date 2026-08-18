(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const canonicalArena=typeof window.arena==='function'?window.arena:null;
Arcane.views=Arcane.views||{};if(canonicalArena)Arcane.views.arena=canonicalArena;
function renderer(){return Arcane.views?.arena||canonicalArena||window.arena}
function repair(){
 if(typeof S==='undefined'||S?.screen!=='arena')return;
 const main=document.querySelector('#app>main');if(!main)return;
 if(main.querySelector('.av2,.pg1-locked'))return;
 const fn=renderer();if(typeof fn!=='function')return;
 try{const html=fn();if(typeof html==='string'&&html.includes('av2')){main.innerHTML=html;requestAnimationFrame(()=>{Arcane.emit?.('arenaRepaired',{screen:'arena'});Arcane.emit?.('afterRenderSettled',{state:S,screen:'arena',repaired:true})})}}catch(error){console.error('[Arcane] arena render repair failed',error)}
}
Arcane.on?.('afterRender',repair);Arcane.on?.('afterRenderSettled',repair);Arcane.on?.('bootReady',repair);Arcane.on?.('screenChange',repair);queueMicrotask(repair);
})();