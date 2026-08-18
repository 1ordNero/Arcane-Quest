(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
function repair(){
 if(typeof S==='undefined'||S?.screen!=='arena')return;
 const main=document.querySelector('#app>main');if(!main)return;
 if(main.querySelector('.av2,.pg1-locked'))return;
 const renderer=window.arena;
 if(typeof renderer!=='function')return;
 try{
  const html=renderer();
  if(typeof html==='string'&&html.includes('av2')){main.innerHTML=html;requestAnimationFrame(()=>Arcane.emit?.('arenaRepaired',{screen:'arena'}));}
 }catch(error){console.error('[Arcane] arena render repair failed',error)}
}
Arcane.on?.('afterRender',repair);Arcane.on?.('afterRenderSettled',repair);Arcane.on?.('bootReady',repair);queueMicrotask(repair);
})();