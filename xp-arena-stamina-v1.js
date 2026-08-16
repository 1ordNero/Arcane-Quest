(()=>{
function dayKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function ensureArenaStamina(){
  S.arenaStaminaMax=5;
  const today=dayKey();
  if(S.arenaStaminaDay!==today){S.arenaStaminaDay=today;S.arenaStamina=5;save?.()}
  if(!Number.isFinite(Number(S.arenaStamina)))S.arenaStamina=5;
  S.arenaStamina=Math.max(0,Math.min(5,Number(S.arenaStamina)));
}
function xpRequired(){try{return typeof xpNeed==='function'?xpNeed():Math.floor(80*Math.pow(1.16,(S.lvl||1)-1))}catch(e){return 80}}
function decorateXP(){
  const h=document.querySelector('header');if(!h)return;
  let bar=h.querySelector('.global-xp');if(!bar){bar=document.createElement('div');bar.className='global-xp';h.appendChild(bar)}
  const need=Math.max(1,xpRequired()),xp=Math.max(0,Number(S.xp)||0),pct=Math.max(0,Math.min(100,xp/need*100));
  const signature=`${xp}|${need}|${pct.toFixed(3)}`;
  if(bar.dataset.signature===signature)return;
  bar.dataset.signature=signature;
  bar.innerHTML=`<div class="global-xp-meta"><span>XP</span><b>${xp} / ${need}</b></div><i><u style="width:${pct}%"></u></i>`;
}
function decorateArena(){
  ensureArenaStamina();if(S.screen!=='arena')return;
  const root=document.querySelector('.av2');if(!root)return;
  const remaining=S.arenaStamina;
  let box=root.querySelector('.arena-stamina');
  if(!box){
    box=document.createElement('div');
    const hero=root.querySelector('.av2-hero');hero?hero.insertAdjacentElement('afterend',box):root.prepend(box);
  }
  const signature=String(remaining);
  if(box.dataset.signature!==signature){
    box.dataset.signature=signature;
    box.className=`arena-stamina ${remaining<=0?'empty':''}`;
    box.innerHTML=`<div><small>ARENA-AUSDAUER</small><b>${remaining} / 5 Kämpfe</b><span>${remaining>0?'Jeder Arenakampf verbraucht 1 Ausdauer.':'Dein Held ist erschöpft. Morgen stehen wieder 5 Kämpfe bereit.'}</span></div><div class="arena-stamina-pips">${Array.from({length:5},(_,i)=>`<i class="${i<remaining?'on':''}"></i>`).join('')}</div>`;
  }
  if(remaining<=0)root.querySelectorAll('.av2-ops>button').forEach(b=>{b.disabled=true;b.title='Keine Arena-Ausdauer mehr'});
}
const oldStart=window.arenaV2Start;
if(oldStart)window.arenaV2Start=function(id){
  ensureArenaStamina();
  if(S.arenaStamina<=0){if(typeof toast==='function')toast('Dein Held hat keine Arena-Ausdauer mehr. Morgen stehen wieder 5 Kämpfe bereit.');return}
  S.arenaStamina--;save?.();return oldStart.apply(this,arguments)
};
function syncPresentation(){ensureArenaStamina();decorateXP();decorateArena()}
let scheduled=false;
function scheduleSync(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;syncPresentation()})}
new MutationObserver(scheduleSync).observe(document.documentElement,{childList:true,subtree:true});
const css=document.createElement('style');css.textContent=`
.global-xp{max-width:900px;margin:7px auto 0;padding:0 1px}.global-xp-meta{display:flex;justify-content:space-between;align-items:center;font-size:9px;color:var(--muted);margin-bottom:3px}.global-xp-meta span{font-weight:900;letter-spacing:.7px}.global-xp-meta b{font-size:9px;color:#d8cde0}.global-xp>i{display:block;height:5px;background:#ffffff0d;border-radius:99px;overflow:hidden}.global-xp>i>u{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));text-decoration:none;border-radius:inherit;transition:width .25s ease}.arena-stamina{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:8px 0;padding:10px 12px;border:1px solid #ffffff10;border-radius:13px;background:#1b1425}.arena-stamina small,.arena-stamina b,.arena-stamina span{display:block}.arena-stamina small{font-size:8px;letter-spacing:.7px;color:var(--muted)}.arena-stamina b{font-size:13px;margin:1px 0}.arena-stamina span{font-size:9px;color:var(--muted)}.arena-stamina-pips{display:flex;gap:4px;flex:0 0 auto}.arena-stamina-pips i{width:10px;height:18px;border-radius:4px;background:#ffffff10;border:1px solid #ffffff10}.arena-stamina-pips i.on{background:linear-gradient(180deg,#f4c15d,#a875ff);border-color:#f4c15d55}.arena-stamina.empty{border-color:#e86a7a33}.arena-stamina.empty b{color:#ff9baa}.av2-ops>button:disabled{opacity:.42!important;filter:saturate(.55)}
@media(max-width:430px){.global-xp{margin-top:5px}.arena-stamina{padding:9px 10px}.arena-stamina span{max-width:235px}.arena-stamina-pips i{width:8px;height:16px}}
`;document.head.appendChild(css);syncPresentation();
})();
