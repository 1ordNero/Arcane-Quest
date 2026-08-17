(()=>{
'use strict';
const MIN_LEVEL=5;
const Arcane=window.Arcane=window.Arcane||{};
const allowed=()=>Number(S?.lvl||1)>=MIN_LEVEL;
const deny=()=>{toast?.(`Die Ahnenschmiede wird ab Stufe ${MIN_LEVEL} freigeschaltet.`);return false};
const lockedView=()=>`<section class="fv4 fv4-locked"><div class="fv4-lock-card"><img src="assets/icons/ui/location_forge.webp" alt="" decoding="async"><small>AHNENSCHMIEDE</small><h1>Noch nicht freigeschaltet</h1><p>Die Ahnenschmiede steht dir ab Stufe ${MIN_LEVEL} zur Verfügung.</p><b>Erreiche Stufe ${MIN_LEVEL}</b><button onclick="tab('city')">Zurück zur Stadt</button></div></section>`;
function guardAction(name){const fn=window[name];if(typeof fn!=='function'||fn.__forgeLevelGuard)return;const wrapped=function(){if(!allowed())return deny();return fn.apply(this,arguments)};Object.defineProperty(wrapped,'__forgeLevelGuard',{value:true});window[name]=wrapped}
function install(){if(typeof window.forgeView==='function'&&!window.forgeView.__forgeLevelGuard){const base=window.forgeView;const wrapped=function(){return allowed()?base.apply(this,arguments):lockedView()};Object.defineProperty(wrapped,'__forgeLevelGuard',{value:true});window.forgeView=wrapped}
['fv4Tab','fv4Select','fv4ToggleAll','fv4Salvage','fv4SalvageAll','fv4Legendary','fv4Upgrade','fa1Select','fa1Lock','fa1Reroll','fa1Improve'].forEach(guardAction)}
Arcane.navigation?.addGuard?.(({screen})=>{if(screen!=='forge'||allowed())return true;deny();return false});
Arcane.on?.('bootReady',install);Arcane.on?.('afterRender',()=>{install();if(S?.screen==='forge'&&!allowed()){const root=document.querySelector('.fv4');if(root&&!root.classList.contains('fv4-locked')){document.querySelector('main').innerHTML=lockedView()}}});
const css=document.createElement('style');css.textContent=`.fv4-locked{display:grid;place-items:center;min-height:55vh}.fv4-lock-card{width:min(420px,100%);padding:24px 18px;text-align:center;border:1px solid #ffffff12;border-radius:20px;background:linear-gradient(145deg,#24182f,#120d18);box-shadow:0 18px 50px #0006}.fv4-lock-card img{display:block;width:92px;height:92px;object-fit:contain;margin:0 auto 8px}.fv4-lock-card small{display:block;font-size:8px;letter-spacing:1.3px;color:#b993e7}.fv4-lock-card h1{font-size:22px;margin:4px 0 7px}.fv4-lock-card p{margin:0;color:var(--muted);font-size:11px;line-height:1.45}.fv4-lock-card>b{display:block;margin:12px 0;color:var(--gold);font-size:12px}.fv4-lock-card button{width:100%;min-height:46px}`;document.head.appendChild(css);queueMicrotask(install);
})();