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
      queueMicrotask(()=>{
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

root.version='core-v3';
root.on=on;
root.emit=emit;
root.state=root.state||{};
root.state.get=getState;
root.state.screen=getScreen;
root.lifecycle=root.lifecycle||{};
root.lifecycle.installRender=installRenderLifecycle;
installRenderLifecycle();

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
  hookCounts:Object.fromEntries(hookNames.map(name=>[name,hooks[name].size]))
});
})();