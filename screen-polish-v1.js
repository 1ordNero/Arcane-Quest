(()=>{
'use strict';
function accessibility(){document.querySelectorAll('button').forEach(b=>{if(!b.getAttribute('type'))b.setAttribute('type','button')});document.querySelectorAll('img[alt=""]').forEach(i=>i.setAttribute('aria-hidden','true'))}
function installDungeonGuard(){if(window.__ARCANE_DUNGEON_LEAVE_GUARD)return;const d7=window.d7Leave,d1=window.d1Leave;if(typeof d7!=='function'&&typeof d1!=='function')return;const blocked=()=>S?.dungeonV1?.state==='combat';const guard=fn=>function(){if(blocked()){toast?.('Rückzug ist während eines Kampfes nicht möglich.');return false}return fn?.apply(this,arguments)};if(typeof d7==='function')window.d7Leave=guard(d7);if(typeof d1==='function')window.d1Leave=guard(d1);window.__ARCANE_DUNGEON_LEAVE_GUARD=true}
function apply(){accessibility();installDungeonGuard()}
window.Arcane?.on?.('afterRenderSettled',apply);window.Arcane?.on?.('bootReady',apply);
const css=document.createElement('style');css.textContent=`button:focus-visible{outline:2px solid var(--gold)!important;outline-offset:2px!important}button:disabled{cursor:not-allowed!important}.gai-inline-img,.gai-stat,.gai-semantic-img{object-fit:contain!important}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}`;document.head.appendChild(css);apply();
})();