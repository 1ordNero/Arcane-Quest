(()=>{
/* Dungeon gameplay v6: explicit event consequences, depth-scaled failure damage,
   reliable secure-and-leave action, and larger equipment art. */
const EVENT_COPY={
  0:{str:['Kraft','Runen gewaltsam brechen','Erfolg: Gold & XP · Fehlschlag: Lebensverlust'],agi:['Geschick','Zwischen den Runen hindurch','Erfolg: Gold & XP · Fehlschlag: Lebensverlust'],int:['Wissen','Runenmuster entschlüsseln','Erfolg: Gold & XP · Fehlschlag: Lebensverlust']},
  2:{str:['Kraft','Mechanismus aufbrechen','Erfolg: Beutechance · Fehlschlag: Lebensverlust'],agi:['Geschick','Schloss vorsichtig öffnen','Erfolg: Beutechance · Fehlschlag: Lebensverlust'],int:['Wissen','Arkane Sicherung lösen','Erfolg: Beutechance · Fehlschlag: Lebensverlust']},
  6:{str:['Kraft','Versiegelung erzwingen','Erfolg: Gold & Wissen · Fehlschlag: Lebensverlust'],agi:['Geschick','Gefährliche Glyphen umgehen','Erfolg: Gold & Wissen · Fehlschlag: Lebensverlust'],int:['Wissen','Verbotene Runen deuten','Erfolg: Gold & Wissen · Fehlschlag: Lebensverlust']}
};
function d(){return S.dungeonV1}
function finalStats(){return window.getFinalStats?getFinalStats():{str:S.str||8,agi:S.agi||8,int:S.int||8}}
function pct(k){return Math.max(28,Math.min(88,Math.round(52+(Number(finalStats()[k]||8)-8)*2)))}
function failDamage(x){const depth=Math.max(1,Math.min(10,(Number(x.room)||0)+1));const ratio=.055+depth*.015;return Math.max(5,Math.round((x.maxHp||100)*ratio));}
window.d6SecureLeave=function(){const x=d();if(!x)return;const gold=Number(x.gold||0),xp=Number(x.xp||0),items=[...(x.loot||[])];S.gold=Number(S.gold||0)+gold;if(typeof gainXP==='function')gainXP(xp);else S.xp=Number(S.xp||0)+xp;S.items=S.items||[];const cap=Number(S.invCap||15);items.forEach(it=>{if(S.items.length<cap)S.items.push(it)});if(typeof log==='function')log(`Katakomben verlassen: ${gold} Gold · ${xp} XP · ${Math.min(items.length,Math.max(0,cap-(S.items.length-items.length)))} Beute gesichert.`);S.dungeonV1=null;S.screen='home';if(typeof save==='function')save();if(typeof render==='function')render();if(typeof toast==='function')toast(`Beute gesichert: ${gold} Gold · ${xp} XP${items.length?` · ${items.length} Item${items.length===1?'':'s'}`:''}.`);};
const baseEvent=window.d1Event;
window.d1Event=function(stat){const x=d();if(!x||x.state!=='event')return baseEvent&&baseEvent(stat);const chance=pct(stat),roll=Math.floor(Math.random()*100)+1,ok=roll<=chance,crit=roll<=Math.max(5,Math.floor(chance*.1));if(ok){const g=Math.floor(20+(S.lvl||1)*3+(crit?20:0));x.gold=Number(x.gold||0)+g;x.xp=Number(x.xp||0)+12+(S.lvl||1);let item=null;if(Math.random()<(crit?.65:.32)&&window.generateLoot){item=generateLoot('risk');if(item){if(item.rarity==='legendary')item.rarity='mythic';(x.loot||(x.loot=[])).push(item)}}x.feedback={good:true,title:crit?'Kritischer Erfolg':'Erfolg',text:`Die Probe gelingt. +${g} Gold${item?` · ${item.name} gefunden`:''}.`};}else{const dmg=failDamage(x);x.hp=Math.max(0,Number(x.hp||0)-dmg);x.feedback={good:false,title:'Entscheidung fehlgeschlagen',text:`Die falsche Entscheidung kostet dich ${dmg} HP. In Raum ${(x.room||0)+1} sind Fehlschläge gefährlicher als in den oberen Ebenen.`};if(x.hp<=0){if(window.d1V2Lose)return d1V2Lose();}}
x.state='feedback';if(typeof save==='function')save();if(typeof render==='function')render();};
function decorate(){const x=d();if(S.screen==='dungeon'&&!x)return;if(S.screen==='dungeon'&&x?.state==='event'){
 const box=document.querySelector('.dv4-choices');if(box){const copy=EVENT_COPY[x.room]||EVENT_COPY[0];[...box.querySelectorAll('button')].forEach((b,i)=>{const k=['str','agi','int'][i],c=copy[k],small=b.querySelector('small');if(!c||!small)return;small.innerHTML=`${c[1]}<br><strong>${c[2]}</strong><br>${k.toUpperCase()} ${finalStats()[k]} · ${pct(k)}% Erfolg`;});}
 const help=document.querySelector('.dv4-event-help');if(help)help.innerHTML=`Wähle deinen Lösungsweg. <b>Fehlschläge kosten hier ${failDamage(x)} HP.</b> Der Lebensverlust steigt mit der Tiefe der Katakomben.`;
 }
 if(S.screen==='dungeon')document.querySelectorAll('.dv4-loot button,.dv2-risk button').forEach(b=>{if(/sichern|beute/i.test(b.textContent)){b.setAttribute('onclick','d6SecureLeave()');b.textContent='Beute sichern & verlassen';}});
}
const prev=window.render;window.render=function(){const out=prev.apply(this,arguments);queueMicrotask(decorate);return out};
const style=document.createElement('style');style.textContent=`.dv4-choices small strong{color:#f4c15d;font-weight:800}.he4-slot img,.he5-integrated .he4-slot img,.he4-slot .item-asset,.he5-integrated .he4-slot .item-asset{transform:scale(1.2)!important;transform-origin:center!important;max-width:none!important;max-height:none!important}.he4-slot{overflow:hidden}`;document.head.appendChild(style);queueMicrotask(decorate);
})();