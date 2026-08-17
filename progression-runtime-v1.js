(()=>{
'use strict';
const MAX_LEVEL=50;
const XP_BASE=80;
const XP_GROWTH=1.10;
const root=window.Arcane=window.Arcane||{};
const stateRef=()=>typeof S!=='undefined'?S:null;
function levelOf(state=stateRef()){return Math.max(1,Math.min(MAX_LEVEL,Math.floor(Number(state?.lvl)||1)))}
function xpForLevel(level){const lvl=Math.max(1,Math.min(MAX_LEVEL-1,Math.floor(Number(level)||1)));return Math.floor(XP_BASE*Math.pow(XP_GROWTH,lvl-1))}
function xpNeedFor(state=stateRef()){const lvl=levelOf(state);return lvl>=MAX_LEVEL?0:xpForLevel(lvl)}
function normalize(state=stateRef()){if(!state)return state;const raw=Math.max(1,Math.floor(Number(state.lvl)||1));if(raw>MAX_LEVEL)state.lvl=MAX_LEVEL;if(Number(state.lvl)>=MAX_LEVEL){state.lvl=MAX_LEVEL;state.xp=0}else state.xp=Math.max(0,Math.floor(Number(state.xp)||0));return state}
function gain(amount,state=stateRef()){if(!state)return 0;normalize(state);if(state.lvl>=MAX_LEVEL){state.xp=0;return 0}const n=Math.max(0,Math.floor(Number(amount)||0));state.xp+=n;let levels=0;while(state.lvl<MAX_LEVEL){const need=xpForLevel(state.lvl);if(state.xp<need)break;state.xp-=need;state.lvl++;levels++;state.maxHp=(Number(state.maxHp)||120)+10;state.hp=state.maxHp;state.str=(Number(state.str)||0)+1;state.agi=(Number(state.agi)||0)+1;state.int=(Number(state.int)||0)+1}if(state.lvl>=MAX_LEVEL){state.lvl=MAX_LEVEL;state.xp=0}return levels}
function progress(state=stateRef()){normalize(state);const lvl=levelOf(state);if(lvl>=MAX_LEVEL)return{level:lvl,maxLevel:MAX_LEVEL,xp:0,need:0,pct:100,capped:true};const need=xpForLevel(lvl),xp=Math.max(0,Number(state?.xp)||0);return{level:lvl,maxLevel:MAX_LEVEL,xp,need,pct:Math.min(100,xp/Math.max(1,need)*100),capped:false}}
const API={maxLevel:MAX_LEVEL,xpBase:XP_BASE,xpGrowth:XP_GROWTH,xpForLevel,xpNeedFor,gain,normalize,progress};
root.progression=API;window.ARCANE_PROGRESSION=API;
window.xpNeed=()=>xpNeedFor();
window.gainXP=n=>gain(n);
root.on?.('beforeSave',()=>normalize());
normalize();
})();