(()=>{
function activity(){
  if(!window.S)return null;
  if(S.quest||S.autoMiniBattle||S.bountyCombat4)return 'quest';
  if(S.dungeonV1)return 'dungeon';
  if(S.arenaV2?.fight)return 'arena';
  return null;
}
function label(x){return x==='quest'?'eine Quest':x==='dungeon'?'die Katakomben':x==='arena'?'ein Arena-Kampf':'eine andere Aktivität'}
function blocked(target){const a=activity();if(!a||a===target)return false;if(typeof window.toast==='function')toast(`Nicht verfügbar: ${label(a)} ist bereits aktiv. Schließe diese Aktivität zuerst ab.`);return true}
const baseStartCombat=window.startCombat;
if(baseStartCombat)window.startCombat=function(kind){const target=kind==='arena'?'arena':kind==='dungeon'?'dungeon':null;if(target&&blocked(target))return;return baseStartCombat.apply(this,arguments)};
const baseTab=window.tab;
if(baseTab)window.tab=function(name){const n=String(name).toLowerCase(),target=['dungeon','catacombs','katakomben'].includes(n)?'dungeon':n==='arena'?'arena':null;if(target&&blocked(target))return;return baseTab.apply(this,arguments)};
const baseQStart=window.qStart;
if(baseQStart)window.qStart=function(){if(blocked('quest'))return;return baseQStart.apply(this,arguments)};
const baseMini=window.startAutoMiniBoss;
if(baseMini)window.startAutoMiniBoss=function(){if(blocked('quest'))return;return baseMini.apply(this,arguments)};
const baseD1=window.d1Start;
if(baseD1)window.d1Start=function(){if(blocked('dungeon'))return;return baseD1.apply(this,arguments)};
const baseArena=window.arenaV2Start;
if(baseArena)window.arenaV2Start=function(){if(blocked('arena'))return;return baseArena.apply(this,arguments)};
function decorate(){
  const a=activity();if(!a)return;
  document.querySelectorAll('button').forEach(btn=>{
    const txt=(btn.textContent||'').toLowerCase(),oc=(btn.getAttribute('onclick')||'').toLowerCase();
    let target=null;
    if(txt.includes('katakomb')||oc.includes('d1start')||oc.includes("tab('dungeon")||oc.includes('startcombat(\'dungeon'))target='dungeon';
    else if(txt.includes('arena')||oc.includes('arenav2start')||oc.includes("tab('arena")||oc.includes('startcombat(\'arena'))target='arena';
    else if(oc.includes('qstart(')||oc.includes('startautominiboss'))target='quest';
    if(target&&target!==a){btn.disabled=true;btn.setAttribute('aria-disabled','true');btn.title=`Nicht verfügbar, solange ${label(a)} aktiv ist.`}
  });
}
const baseRender=window.render;
if(baseRender)window.render=function(){const r=baseRender.apply(this,arguments);queueMicrotask(decorate);return r};
new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});
const css=document.createElement('style');css.textContent=`
@media(max-width:699px){
  .tabs{height:72px!important;min-height:72px!important;padding:0 max(5px,env(safe-area-inset-left)) max(3px,env(safe-area-inset-bottom))!important;align-items:flex-end!important;overflow:visible!important}
  .tabs button{position:relative!important;overflow:visible!important;min-height:68px!important;height:68px!important;padding:0 5px 4px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important}
  .tabs .nav-art{position:absolute!important;left:50%!important;bottom:38px!important;transform:translateX(-50%)!important;width:68px!important;height:68px!important;min-height:68px!important;display:grid!important;place-items:center!important;margin:0!important;overflow:visible!important;pointer-events:none!important}
  .tabs .nav-art img{display:block!important;width:66px!important;height:66px!important;max-width:none!important;max-height:none!important;object-fit:contain!important;filter:drop-shadow(0 4px 7px #000a)!important}
  .tabs .hero-tab .nav-art,.tabs .hero-nav-art{width:82px!important;height:82px!important;bottom:34px!important}
  .tabs .hero-tab .nav-art img,.tabs .hero-tab .hero-nav-art img{width:80px!important;height:80px!important;max-width:none!important;max-height:none!important}
  .tabs button img{position:relative!important;top:-18px!important}.tabs .hero-tab img,.tabs button[data-screen="char"] img{top:-24px!important}
  .tabs .nav-label{position:relative!important;z-index:2!important;line-height:1.05!important;margin:0!important;font-size:10px!important}main{padding-bottom:82px!important}
}`;document.head.appendChild(css);decorate();
})();