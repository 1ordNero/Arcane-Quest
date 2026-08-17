(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const GATES=Object.freeze({
  merchant:{level:3,label:'Händler',icon:'assets/icons/ui/location_merchant.webp',returnScreen:'city'},
  forge:{level:5,label:'Ahnenschmiede',icon:'assets/icons/ui/location_forge.webp',returnScreen:'city'},
  arena:{level:5,label:'Arena',icon:'assets/icons/ui_nav_arena.webp',returnScreen:'home'}
});
const level=()=>Number(S?.lvl||1);
const allowed=screen=>level()>=(GATES[screen]?.level||1);
function deny(screen){const gate=GATES[screen];if(!gate)return false;const message=`${gate.label} wird ab Stufe ${gate.level} freigeschaltet.`;if(typeof window.aqDialog==='function')aqDialog({icon:'🔒',eyebrow:'Noch gesperrt',title:gate.label,message,confirmText:'Verstanden'});else toast?.(message);return false}
function lockedView(screen){const gate=GATES[screen]||GATES.forge;return `<section class="pg1-locked"><div class="pg1-lock-card"><img src="${gate.icon}" alt="" decoding="async"><small>${gate.label.toUpperCase()}</small><h1>Noch nicht freigeschaltet</h1><p>${gate.label} steht dir ab Stufe ${gate.level} zur Verfügung.</p><b>Erreiche Stufe ${gate.level}</b><button onclick="tab('${gate.returnScreen}')">Zurück</button></div></section>`}
function guardAction(name,screen){const fn=window[name];if(typeof fn!=='function'||fn.__progressionGuard)return;const wrapped=function(){if(!allowed(screen))return deny(screen);return fn.apply(this,arguments)};Object.defineProperty(wrapped,'__progressionGuard',{value:true});window[name]=wrapped}
function guardView(name,screen){const fn=window[name];if(typeof fn!=='function'||fn.__progressionGuard)return;const wrapped=function(){return allowed(screen)?fn.apply(this,arguments):lockedView(screen)};Object.defineProperty(wrapped,'__progressionGuard',{value:true});window[name]=wrapped}
function guardArenaSystem(){const system=Arcane.arenaSystem;if(!system)return;for(const key of ['start','setStance','done']){const fn=system[key];if(typeof fn!=='function'||fn.__progressionGuard)continue;const wrapped=function(){if(!allowed('arena'))return deny('arena');return fn.apply(this,arguments)};Object.defineProperty(wrapped,'__progressionGuard',{value:true});system[key]=wrapped}}
function guardLegacyCombat(){const fn=window.startCombat;if(typeof fn!=='function'||fn.__progressionArenaGuard)return;const wrapped=function(kind){if(kind==='arena'&&!allowed('arena'))return deny('arena');return fn.apply(this,arguments)};Object.defineProperty(wrapped,'__progressionArenaGuard',{value:true});window.startCombat=wrapped}
function install(){
  guardView('merchantView','merchant');
  guardView('forgeView','forge');
  guardView('arena','arena');
  ['merchantBuy','merchantSell','merchantRefresh','merchantItemOpen','merchantItemClose','cityMode'].forEach(n=>guardAction(n,'merchant'));
  ['fv4Tab','fv4Select','fv4ToggleAll','fv4Salvage','fv4SalvageAll','fv4Legendary','fv4Upgrade','fa1Select','fa1Lock','fa1Reroll','fa1Improve'].forEach(n=>guardAction(n,'forge'));
  ['arenaV2Stance','arenaV2Start','arenaV2Done'].forEach(n=>guardAction(n,'arena'));
  guardArenaSystem();guardLegacyCombat();
}
Arcane.navigation?.addGuard?.(({screen})=>{const gate=GATES[screen];if(!gate||allowed(screen))return true;deny(screen);return false});
Arcane.on?.('bootReady',install);
Arcane.on?.('afterRender',()=>{install();const screen=S?.screen;if(!GATES[screen]||allowed(screen))return;const main=document.querySelector('main');if(main&&!main.querySelector('.pg1-locked'))main.innerHTML=lockedView(screen)});
const css=document.createElement('style');css.textContent=`.pg1-locked{display:grid;place-items:center;min-height:55vh}.pg1-lock-card{width:min(420px,100%);padding:24px 18px;text-align:center;border:1px solid #ffffff12;border-radius:20px;background:linear-gradient(145deg,#24182f,#120d18);box-shadow:0 18px 50px #0006}.pg1-lock-card img{display:block;width:92px;height:92px;object-fit:contain;margin:0 auto 8px}.pg1-lock-card small{display:block;font-size:8px;letter-spacing:1.3px;color:#b993e7}.pg1-lock-card h1{font-size:22px;margin:4px 0 7px}.pg1-lock-card p{margin:0;color:var(--muted);font-size:11px;line-height:1.45}.pg1-lock-card>b{display:block;margin:12px 0;color:var(--gold);font-size:12px}.pg1-lock-card button{width:100%;min-height:46px}`;document.head.appendChild(css);queueMicrotask(install);
})();