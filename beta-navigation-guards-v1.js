(()=>{
function questActive(){return !!(window.S&&S.quest)}
function blockDungeonDuringQuest(){
  if(!questActive())return false;
  if(typeof window.toast==='function')toast('Die Katakomben können während einer aktiven Quest nicht betreten werden. Schließe zuerst deine Quest ab.');
  return true;
}
const baseStartCombat=window.startCombat;
if(baseStartCombat)window.startCombat=function(kind){if(kind==='dungeon'&&blockDungeonDuringQuest())return;return baseStartCombat.apply(this,arguments)};

/* Later dungeon modules expose their own entry points, so guard common dungeon navigation too. */
const baseTab=window.tab;
if(baseTab)window.tab=function(name){if(['dungeon','catacombs','katakomben'].includes(name)&&blockDungeonDuringQuest())return;return baseTab.apply(this,arguments)};

function decorate(){
  if(!questActive())return;
  document.querySelectorAll('button').forEach(btn=>{
    const txt=(btn.textContent||'').toLowerCase();
    const oc=(btn.getAttribute('onclick')||'').toLowerCase();
    if(txt.includes('katakomb')||oc.includes("dungeon")){
      if(oc.includes('dungeon')||txt.includes('katakomb')){
        btn.disabled=true;
        btn.setAttribute('aria-disabled','true');
        btn.title='Während einer aktiven Quest nicht verfügbar';
      }
    }
  });
}
const baseRender=window.render;
if(baseRender)window.render=function(){const r=baseRender.apply(this,arguments);queueMicrotask(decorate);return r};
new MutationObserver(decorate).observe(document.documentElement,{childList:true,subtree:true});

/* Mobile footer stays unchanged; only the navigation artwork is lifted upward. */
const css=document.createElement('style');css.textContent=`
@media(max-width:699px){
  .tabs{
    height:72px!important;
    min-height:72px!important;
    padding:0 max(5px,env(safe-area-inset-left)) max(3px,env(safe-area-inset-bottom))!important;
    align-items:flex-end!important;
    overflow:visible!important;
  }
  .tabs button{
    position:relative!important;
    overflow:visible!important;
    min-height:68px!important;
    height:68px!important;
    padding:0 5px 4px!important;
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:flex-end!important;
  }
  .tabs .nav-art{
    position:absolute!important;
    left:50%!important;
    bottom:38px!important;
    transform:translateX(-50%)!important;
    width:68px!important;
    height:68px!important;
    min-height:68px!important;
    display:grid!important;
    place-items:center!important;
    margin:0!important;
    overflow:visible!important;
    pointer-events:none!important;
  }
  .tabs .nav-art img{
    display:block!important;
    width:66px!important;
    height:66px!important;
    max-width:none!important;
    max-height:none!important;
    object-fit:contain!important;
    filter:drop-shadow(0 4px 7px #000a)!important;
  }
  .tabs .hero-tab .nav-art,.tabs .hero-nav-art{
    width:82px!important;
    height:82px!important;
    bottom:34px!important;
  }
  .tabs .hero-tab .nav-art img,.tabs .hero-tab .hero-nav-art img{
    width:80px!important;
    height:80px!important;
    max-width:none!important;
    max-height:none!important;
  }
  .tabs .nav-label{
    position:relative!important;
    z-index:2!important;
    line-height:1.05!important;
    margin:0!important;
    font-size:10px!important;
  }
  main{padding-bottom:82px!important}
}
`;
document.head.appendChild(css);decorate();
})();
