(()=>{
'use strict';
const root=window.Arcane=window.Arcane||{};
let activeKey=null;
function skillState(){
 const ss=window.S?.skillSystem;
 return ss&&ss.cls===S.cls?ss:null;
}
function reset(){
 const ss=skillState();
 if(!ss)return false;
 ss.maxResource=Math.max(1,Number(ss.maxResource)||100);
 ss.resource=ss.maxResource;
 ss.rotation=0;
 return true;
}
function combatKey(){
 const s=window.S;
 if(!s)return null;
 const arena=s.arenaV2?.fight;
 if(arena&&!arena.done)return `arena:${arena.o?.id||arena.o?.name||'fight'}`;
 const bounty=s.bountyCombat4;
 if(bounty)return `bounty:${bounty.startedAt||bounty.start||bounty.bossMaxHp||118}`;
 const mini=s.autoMiniBattle;
 if(mini)return `mini:${mini.startedAt||mini.name||'Knochenwache'}`;
 const dungeon=s.dungeonV1;
 const enemy=dungeon?.enemy;
 if(enemy&&enemy.hp>0){
  const room=dungeon.room??dungeon.roomIndex??dungeon.step??dungeon.pos??0;
  return `dungeon:${room}:${enemy.id||enemy.name||'enemy'}:${enemy.max||enemy.maxHp||0}`;
 }
 return null;
}
function sync(){
 const key=combatKey();
 if(key===activeKey)return;
 activeKey=key;
 if(reset()){
  try{save?.()}catch{}
 }
}
root.combatResource={reset,sync,get activeKey(){return activeKey}};
root.on?.('bootReady',sync);
root.on?.('beforeRender',sync);
root.on?.('afterRenderSettled',sync);
queueMicrotask(sync);
})();