(()=>{
'use strict';

const root=window.Arcane=window.Arcane||{};
const hookNames=['beforeRender','afterRender','afterRenderSettled','beforeSave','afterSave','screenChange','bootReady'];
const hooks=root.hooks=root.hooks||{};

for(const name of hookNames){
  if(!hooks[name])hooks[name]=new Set();
}

function on(name,handler){
  const bucket=hooks[name];
  if(!bucket)throw new Error(`[Arcane] Unknown hook: ${name}`);
  if(typeof handler!=='function')throw new TypeError('[Arcane] Hook handler must be a function');
  bucket.add(handler);
  return()=>bucket.delete(handler);
}

function emit(name,payload){
  const bucket=hooks[name];
  if(!bucket)return;
  for(const handler of [...bucket]){
    try{handler(payload)}catch(error){console.error(`[Arcane] ${name} hook failed`,error)}
  }
}

function getState(){
  try{return typeof S!=='undefined'?S:null}catch{return null}
}

function getScreen(){return getState()?.screen??null}

function legacyScreenHtml(){
  const screen=getScreen();
  if(screen==='home'&&typeof home==='function')return home();
  if(screen==='char'&&typeof char==='function')return char();
  if(screen==='inv'&&typeof inv==='function')return inv();
  if(screen==='forge'&&typeof forgeView==='function')return forgeView();
  if(screen==='arena'&&typeof arena==='function')return arena();
  if(screen==='combat'&&typeof combat==='function')return combat();
  return typeof home==='function'?home():'';
}

function legacyFooterHtml(){
  const state=getState();
  if(!state)return'';
  return [['home','🍺','Taverne'],['char','🧙','Held'],['inv','🎒','Rucksack'],['forge','🔨','Schmiede'],['arena','⚔️','Arena']]
    .map(x=>`<button class="${state.screen===x[0]?'active':''}" onclick="tab('${x[0]}')">${x[1]}<br>${x[2]}</button>`)
    .join('');
}

function renderShell(){
  const state=getState();
  const app=document.getElementById('app');
  if(!state||!app)return;
  if(typeof save==='function')save();
  app.innerHTML=`<header><div class="top"><div class="brand">🍺 Arcane Tavern & Quest <span class="small">BETA</span></div><div class="stats"><span class="pill">Lv ${state.lvl}</span><span class="pill gold">🪙 ${state.gold}</span><span class="pill">⚡ ${state.al}/${state.maxAl}</span><span class="pill">🜂 ${state.souls}</span></div></div></header><main>${legacyScreenHtml()}</main><nav class="tabs">${legacyFooterHtml()}</nav>`;
}

function installShell(){
  root.shell=root.shell||{};
  root.shell.render=renderShell;
  root.shell.screenHtml=legacyScreenHtml;
  root.shell.footerHtml=legacyFooterHtml;
  window.render=renderShell;
}

function installRenderLifecycle(){
  if(root.lifecycle?.renderInstalled)return true;
  const base=window.render;
  if(typeof base!=='function')return false;
  let lastScreen=getScreen();
  let settledPending=false;
  const wrapped=function(){
    const beforeScreen=getScreen();
    emit('beforeRender',{state:getState(),screen:beforeScreen,args:[...arguments]});
    const result=base.apply(this,arguments);
    const afterScreen=getScreen();
    if(afterScreen!==lastScreen){
      const previous=lastScreen;
      lastScreen=afterScreen;
      emit('screenChange',{state:getState(),screen:afterScreen,previous});
    }
    emit('afterRender',{state:getState(),screen:afterScreen,result});
    if(!settledPending){
      settledPending=true;
      requestAnimationFrame(()=>{
        settledPending=false;
        emit('afterRenderSettled',{state:getState(),screen:getScreen()});
      });
    }
    return result;
  };
  Object.defineProperty(wrapped,'__arcaneLifecycle',{value:true});
  window.render=wrapped;
  root.lifecycle.renderInstalled=true;
  return true;
}

function navigate(screen){
  const state=getState();
  if(!state)return false;
  state.screen=screen;
  if(typeof window.render==='function')window.render();
  return true;
}

function installNavigation(){
  root.navigation=root.navigation||{};
  root.navigation.go=navigate;
  window.tab=navigate;
}

root.version='core-v6';
root.on=on;
root.emit=emit;
root.state=root.state||{};
root.state.get=getState;
root.state.screen=getScreen;
root.lifecycle=root.lifecycle||{};
root.lifecycle.installRender=installRenderLifecycle;
installShell();
installRenderLifecycle();
installNavigation();

const boot=()=>emit('bootReady',{state:getState(),screen:getScreen()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else queueMicrotask(boot);

root.diagnostics=root.diagnostics||{};
root.diagnostics.snapshot=()=>({
  core:root.version,
  screen:getScreen(),
  hasState:!!getState(),
  hasRender:typeof window.render==='function',
  hasSave:typeof window.save==='function',
  renderLifecycle:!!root.lifecycle.renderInstalled,
  shell:!!root.shell?.render,
  navigation:!!root.navigation?.go,
  hookCounts:Object.fromEntries(hookNames.map(name=>[name,hooks[name].size]))
});
})();