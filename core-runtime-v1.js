(()=>{
'use strict';

const root=window.Arcane=window.Arcane||{};
const hookNames=['beforeRender','afterRender','beforeSave','afterSave','screenChange','bootReady'];
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

root.version='core-v1';
root.on=on;
root.emit=emit;
root.state=root.state||{};
root.state.get=getState;
root.state.screen=getScreen;
root.diagnostics=root.diagnostics||{};
root.diagnostics.snapshot=()=>({
  core:root.version,
  screen:getScreen(),
  hasState:!!getState(),
  hasRender:typeof window.render==='function',
  hasSave:typeof window.save==='function',
  hookCounts:Object.fromEntries(hookNames.map(name=>[name,hooks[name].size]))
});
})();