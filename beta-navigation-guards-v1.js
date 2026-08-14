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

/* Compact mobile footer: keep the artwork readable while reclaiming screen height. */
const css=document.createElement('style');css.textContent=`
@media(max-width:699px){
  .tabs{padding-top:3px!important;padding-bottom:max(3px,env(safe-area-inset-bottom))!important;min-height:0!important}
  .tabs button{padding-top:3px!important;padding-bottom:3px!important;min-height:0!important}
  .tabs .nav-art{height:42px!important;min-height:42px!important;margin-bottom:-1px!important}
  .tabs .nav-art img{max-height:42px!important}
  .tabs .nav-label{line-height:1.05!important;margin-top:0!important}
  main{padding-bottom:78px!important}
}
`;
document.head.appendChild(css);decorate();
})();
