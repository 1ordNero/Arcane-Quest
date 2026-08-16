(()=>{
const REDUCED=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
let lastScreen='';
let lastRenderAt=0;

function qsa(sel,root=document){return [...root.querySelectorAll(sel)]}
function isPrimary(el){return el.matches('.sp-primary,.sp-combat-action,.start-q,.bc4-action,.dv7-combat button,.av2-fight button,.av2-ops>button')}

function classifyCombatLogs(){
 qsa('.log,.av3-log,.dv7-auto-log,.bc4-log').forEach(log=>{
  log.classList.add('gf-log');
  [...log.children].forEach(line=>{
   const t=(line.textContent||'').toLowerCase();
   line.classList.remove('gf-hit','gf-crit','gf-heal','gf-danger','gf-status');
   if(/krit|critical|perfekt|konter/.test(t)) line.classList.add('gf-crit');
   else if(/heil|regener|leben zurück|hp zurück/.test(t)) line.classList.add('gf-heal');
   else if(/niederlage|besiegt|enrage|wut|schwer verwundet/.test(t)) line.classList.add('gf-danger');
   else if(/gift|blut|brand|betäub|schild|block|ausweich|immun/.test(t)) line.classList.add('gf-status');
   else if(/schaden|trifft|angriff/.test(t)) line.classList.add('gf-hit');
  });
 });
}

function enhanceButtons(){
 qsa('button:not([data-gf])').forEach(btn=>{
  btn.dataset.gf='1';
  btn.classList.add('gf-button');
  if(isPrimary(btn)) btn.classList.add('gf-primary');
  btn.addEventListener('pointerdown',e=>{
   if(btn.disabled)return;
   btn.classList.add('gf-pressed');
   if(navigator.vibrate && e.pointerType==='touch') navigator.vibrate(isPrimary(btn)?12:7);
   if(REDUCED())return;
   const rect=btn.getBoundingClientRect();
   const ripple=document.createElement('i');
   ripple.className='gf-ripple';
   const size=Math.max(rect.width,rect.height)*1.15;
   ripple.style.width=ripple.style.height=`${size}px`;
   ripple.style.left=`${e.clientX-rect.left-size/2}px`;
   ripple.style.top=`${e.clientY-rect.top-size/2}px`;
   btn.appendChild(ripple);
   setTimeout(()=>ripple.remove(),520);
  },{passive:true});
  const release=()=>btn.classList.remove('gf-pressed');
  btn.addEventListener('pointerup',release,{passive:true});
  btn.addEventListener('pointercancel',release,{passive:true});
  btn.addEventListener('pointerleave',release,{passive:true});
 });
}

function markSurfaces(){
 qsa('.card,.quest-card,.sp-focus-card,.sp-location,.sp-economy-row,.sp-forge-row,.sp-dungeon-room,.sp-opponent,.cf1').forEach(x=>x.classList.add('gf-surface'));
 qsa('.sheet').forEach(x=>x.classList.add('gf-sheet'));
 qsa('.notice').forEach(x=>x.classList.add('gf-notice'));
 qsa('.bar').forEach(x=>x.classList.add('gf-bar'));
}

function screenTransition(){
 const current=window.S?.screen||'';
 const main=document.querySelector('main');
 if(!main)return;
 if(current!==lastScreen){
  lastScreen=current;
  main.classList.remove('gf-screen-enter');
  void main.offsetWidth;
  main.classList.add('gf-screen-enter');
 }
}

function activeCombatPresence(){
 const body=document.body;
 const fighting=!!document.querySelector('.bc4-combat,.dv7-combat,.av2-fight,.auto-combat-live,.battle-live');
 body.classList.toggle('gf-combat-active',fighting);
}

function polish(){
 document.body.classList.add('gf-enabled');
 enhanceButtons();
 markSurfaces();
 classifyCombatLogs();
 screenTransition();
 activeCombatPresence();
 lastRenderAt=performance.now();
}

const prev=window.render;
if(typeof prev==='function') window.render=function(){
 const out=prev.apply(this,arguments);
 polish();
 queueMicrotask(polish);
 return out;
};

const observer=new MutationObserver(()=>{
 if(performance.now()-lastRenderAt<16)return;
 requestAnimationFrame(polish);
});
observer.observe(document.documentElement,{subtree:true,childList:true});

const css=document.createElement('style');
css.textContent=`
:root{--gf-edge:#ffffff12;--gf-edge-hot:#c59cff38;--gf-deep:#0b0810;--gf-glow:#a875ff;--gf-gold:#f4c15d}
body.gf-enabled{background:
 radial-gradient(circle at 50% -12%,#37204f 0,#1a1124 24%,#100c16 52%,#0b0910 100%)!important;
 background-attachment:fixed!important;
 text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
body.gf-enabled:before{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1;opacity:.34;background:
 radial-gradient(circle at 15% 18%,#a875ff12 0,transparent 24%),
 radial-gradient(circle at 86% 72%,#f4c15d0a 0,transparent 26%),
 linear-gradient(115deg,transparent 0 46%,#ffffff05 49%,transparent 52%);background-size:auto,auto,190% 190%;animation:gfAmbient 18s ease-in-out infinite alternate}
@keyframes gfAmbient{from{transform:translate3d(-1%,0,0);opacity:.24}to{transform:translate3d(1%,-1%,0);opacity:.4}}

.ds-header{box-shadow:0 8px 28px #0007,0 1px 0 #ffffff08 inset!important}.tabs.aq-footer{box-shadow:0 -10px 34px #0008,0 -1px 0 #ffffff06 inset!important}.tabs.aq-footer .aq-nav{transition:transform .16s ease,color .16s ease,filter .16s ease!important}.tabs.aq-footer .aq-nav:not(:disabled):active{transform:translateY(2px) scale(.97)!important}.tabs.aq-footer .aq-nav.active .aq-nav-art{transform:translateY(-2px)!important}.tabs.aq-footer .aq-nav.active:after{box-shadow:0 0 12px #a875ffaa!important}

.gf-surface{position:relative;isolation:isolate;box-shadow:0 10px 26px #0002!important;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease!important}.gf-surface:before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(140deg,#ffffff08,transparent 28%,transparent 72%,#00000016);z-index:-1}.gf-surface:hover{border-color:#ffffff18!important}.gf-surface:focus-within{border-color:var(--gf-edge-hot)!important;box-shadow:0 12px 30px #00035,0 0 0 1px #a875ff16!important}

.gf-button{position:relative!important;overflow:hidden!important;isolation:isolate;transition:transform .11s ease,filter .16s ease,background .16s ease,border-color .16s ease!important;touch-action:manipulation}.gf-button:not(:disabled):hover{filter:brightness(1.06)}.gf-button.gf-pressed:not(:disabled){transform:translateY(1px) scale(.985)!important;filter:brightness(.96)!important}.gf-primary:not(:disabled){background:linear-gradient(135deg,#8e5ee7,#b47cff)!important;border:1px solid #d6b9ff26!important;box-shadow:0 8px 18px #6e38c82c,0 1px 0 #ffffff24 inset!important}.gf-primary:not(:disabled):hover{box-shadow:0 10px 24px #6e38c83b,0 1px 0 #ffffff2b inset!important}.gf-ripple{position:absolute;display:block;border-radius:50%;pointer-events:none;background:radial-gradient(circle,#ffffff48 0,#ffffff18 38%,transparent 68%);transform:scale(.15);opacity:.9;animation:gfRipple .5s ease-out forwards;z-index:0}.gf-button>*:not(.gf-ripple){position:relative;z-index:1}@keyframes gfRipple{to{transform:scale(1);opacity:0}}

.gf-screen-enter{animation:gfScreen .24s cubic-bezier(.2,.8,.2,1)}@keyframes gfScreen{from{opacity:.45;transform:translateY(5px)}to{opacity:1;transform:none}}
.gf-sheet{box-shadow:0 -22px 70px #000b,0 -1px 0 #ffffff14 inset!important;animation:gfSheet .22s cubic-bezier(.2,.8,.2,1)}@keyframes gfSheet{from{transform:translateY(16px);opacity:.65}to{transform:none;opacity:1}}
.modal{backdrop-filter:blur(6px);animation:gfModal .18s ease-out}@keyframes gfModal{from{background:#0003}to{background:#0009}}

.gf-bar{height:10px!important;background:#060409aa!important;box-shadow:0 1px 0 #ffffff08 inset!important}.gf-bar>i{position:relative;box-shadow:0 0 14px #a875ff44}.gf-bar>i:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,#ffffff2b,transparent);transform:translateX(-100%);animation:gfBarSweep 2.8s ease-in-out infinite}@keyframes gfBarSweep{0%,55%{transform:translateX(-100%)}80%,100%{transform:translateX(100%)}}

.gf-notice{box-shadow:0 8px 20px #0002,0 0 0 1px #f4c15d0b inset!important}.gf-log{border:1px solid #ffffff0a!important;box-shadow:0 8px 20px #00025 inset!important;scrollbar-width:thin;scrollbar-color:#ffffff20 transparent}.gf-log>*{padding-left:8px;border-left:2px solid transparent;transition:background .15s ease,border-color .15s ease}.gf-log .gf-hit{border-left-color:#ffffff18}.gf-log .gf-crit{border-left-color:#f4c15d99;background:#f4c15d09;color:#ffe4a0}.gf-log .gf-heal{border-left-color:#71d59a99;background:#71d59a08;color:#a8ecc2}.gf-log .gf-danger{border-left-color:#e86a7aaa;background:#e86a7a09;color:#ffb2bd}.gf-log .gf-status{border-left-color:#a875ffaa;background:#a875ff08;color:#d8c0ff}

.cf1{background:linear-gradient(180deg,#120d19d9,#0d0912d9)!important}.cf1-head small{letter-spacing:1.05px!important}.cf1-tip{box-shadow:0 0 18px #a875ff0b inset}.ds-chip{box-shadow:0 1px 0 #ffffff08 inset}.ds-gold{background:#f4c15d0b!important;border:1px solid #f4c15d14}.ds-xp i{box-shadow:0 1px 0 #ffffff08 inset}

body.gf-combat-active .ds-header{border-bottom-color:#e86a7a24!important}.gf-combat-active main:before{content:'';position:fixed;inset:56px 0 72px;pointer-events:none;z-index:-1;background:radial-gradient(circle at 50% 34%,#e86a7a08,transparent 42%);animation:gfCombatPulse 2.4s ease-in-out infinite}@keyframes gfCombatPulse{50%{opacity:.55}}

@media(max-width:520px){.gf-surface{box-shadow:0 7px 18px #0002!important}.gf-primary:not(:disabled){box-shadow:0 6px 14px #6e38c82a,0 1px 0 #ffffff22 inset!important}}
@media(hover:none){.gf-surface:hover{border-color:inherit!important}.gf-button:not(:disabled):hover{filter:none}}
@media(prefers-reduced-motion:reduce){body.gf-enabled:before,.gf-screen-enter,.gf-sheet,.modal,.gf-bar>i:after,.gf-ripple,.gf-combat-active main:before{animation:none!important}.gf-button,.gf-surface,.tabs.aq-footer .aq-nav{transition:none!important}}
`;
document.head.appendChild(css);
polish();
})();