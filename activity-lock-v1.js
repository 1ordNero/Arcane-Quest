(()=>{
function activeActivity(){
  if(window.S?.quest||window.S?.autoMiniBattle||window.S?.bountyCombat4)return 'quest';
  if(window.S?.dungeonV1)return 'dungeon';
  // The arena remains the active major activity until the reward popup is acknowledged.
  if(window.S?.arenaV2?.fight)return 'arena';
  return null;
}
function label(x){return x==='quest'?'eine Quest':x==='dungeon'?'die Katakomben':x==='arena'?'ein Arena-Kampf':'eine andere Aktivität'}
function blocked(want){const a=activeActivity();if(!a||a===want)return false;if(typeof window.toast==='function')toast(`Nicht möglich: Es läuft bereits ${label(a)}. Schließe diese Aktivität zuerst ab.`);return true}
window.getActiveMajorActivity=activeActivity;

const q=window.qStart;if(q)window.qStart=function(id,e){if(blocked('quest')){e?.stopPropagation?.();return}return q.apply(this,arguments)};
const mini=window.startAutoMiniBoss;if(mini)window.startAutoMiniBoss=function(){if(blocked('quest'))return;return mini.apply(this,arguments)};
const ds=window.d1Start;if(ds)window.d1Start=function(){if(blocked('dungeon'))return;return ds.apply(this,arguments)};
const as=window.arenaV2Start;if(as)window.arenaV2Start=function(id){if(blocked('arena'))return;return as.apply(this,arguments)};

const oldRender=window.render;
window.render=function(){const out=oldRender.apply(this,arguments);const a=activeActivity();if(a){
 document.querySelectorAll('.quest-card .start-q').forEach(b=>{if(a!=='quest'){b.disabled=true;b.title=`Gesperrt: ${label(a)} läuft`}});
 document.querySelectorAll('.d1-entry button,[onclick="d1Start()"],[onclick*="arenaV2Start("]').forEach(b=>{const want=(b.getAttribute('onclick')||'').includes('arenaV2Start')?'arena':'dungeon';if(a!==want){b.disabled=true;b.title=`Gesperrt: ${label(a)} läuft`}});
 }return out};
})();