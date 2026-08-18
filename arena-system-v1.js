(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const NAMES=['Ragna Eisenfaust','Elyra Mondpfeil','Vorun Aschenhand','Thalia Dorn','Kael Runenbrecher','Mira Nachtwind','Brom Steinschild','Seris Flammenblick'];
const CLASSES=['Krieger','Magier','Druide','Waldläufer','Hexenmeister','Totenbeschwörer'];
const STANCES={aggressive:{name:'Aggressiv',icon:'⚔️',desc:'+15 % Krit · −10 % Rüstung'},defensive:{name:'Defensiv',icon:'🛡️',desc:'+20 % Rüstung · −10 % Schaden'},counter:{name:'Konter',icon:'↩️',desc:'+15 % Ausweichen · Konterschaden'}};
const TIERS=[['Bronze',0],['Silber',100],['Gold',250],['Platin',500],['Legende',850]];
const emptyMetrics=()=>({dealt:0,taken:0,crits:0,dodges:0,counters:0});
function stats(){return window.getFinalStats?getFinalStats():{str:S.str||8,agi:S.agi||8,int:S.int||8,hp:S.maxHp||120,armor:0,damage:0,crit:0,dodge:0,block:0}}
function power(st=stats()){return Math.round((st.str+st.agi+st.int)*2+(st.hp||100)*.25+(st.armor||0)*3+(st.damage||0)*5+(st.crit||0)*2+(st.dodge||0)*2+(st.block||0)*2)}
function league(){let rank=TIERS[0][0],glory=Number(S.arena||0);for(const tier of TIERS)if(glory>=tier[1])rank=tier[0];return rank}
function generate(kind,index){const base=power(),mul=kind==='easy'?.78:kind==='equal'?1:1.22,lvl=Math.max(1,(S.lvl||1)+(kind==='easy'?-1:kind==='hard'?2:0)),p=Math.round(base*mul*(.94+Math.random()*.12));return{id:`${Date.now()}${index}`,kind,name:NAMES[Math.floor(Math.random()*NAMES.length)],cls:CLASSES[Math.floor(Math.random()*CLASSES.length)],lvl,power:p,hp:Math.round(85+lvl*15+p*.18),reward:kind==='easy'?8:kind==='equal'?14:22,coins:kind==='easy'?3:kind==='equal'?6:10}}
function freshOpponents(){return[generate('easy',0),generate('equal',1),generate('hard',2)]}
function ensure(){S.arenaV2=S.arenaV2||{opponents:null,stance:'aggressive',fight:null,coins:0};if(!S.arenaV2.opponents||S.arenaV2.opponents.length!==3)S.arenaV2.opponents=freshOpponents();return S.arenaV2}
function difficulty(kind){return kind==='easy'?'Einfach':kind==='equal'?'Ebenbürtig':'Herausforderer'}
function enemyStyle(cls){return cls==='Krieger'?'zäh und defensiv':cls==='Waldläufer'?'schnell und ausweichend':cls==='Magier'?'offensiv und kritisch':'unberechenbar'}
function setStance(key){ensure();if(!STANCES[key])return;S.arenaV2.stance=key;save();render()}
function start(id){const arena=ensure(),opponent=arena.opponents.find(x=>x.id===id);if(!opponent)return;const st=stats(),stance=arena.stance,max=Math.max(1,Math.round(st.hp||S.maxHp||120));arena.fight={o:opponent,stance,php:max,pmax:max,ehp:opponent.hp,emax:opponent.hp,round:0,log:[`${opponent.name} betritt die Arena. Du kämpfst ${STANCES[stance].name.toLowerCase()}.`],metrics:emptyMetrics(),done:false,result:null};save();render();setTimeout(step,500)}
function step(){const f=S.arenaV2?.fight;if(!f||f.done)return;f.metrics=f.metrics||emptyMetrics();const st=stats(),stance=f.stance;f.round++;let dmg=Math.max(2,Math.round((st.damage||4)+(st.str+st.agi+st.int)/5+Math.random()*8));const crit=(st.crit||0)+(stance==='aggressive'?15:0);if(stance==='defensive')dmg=Math.round(dmg*.9);if(Math.random()*100<crit){dmg=Math.round(dmg*1.65);f.metrics.crits++;f.log.push(`Kritischer Treffer: ${dmg} Schaden.`)}else f.log.push(`Du verursachst ${dmg} Schaden.`);f.metrics.dealt+=dmg;f.ehp=Math.max(0,f.ehp-dmg);if(f.ehp<=0)return finish(true);let enemyDamage=Math.max(2,Math.round(5+f.o.power/35+Math.random()*7));const dodge=(st.dodge||0)+(stance==='counter'?15:0);if(Math.random()*100<dodge){f.metrics.dodges++;f.log.push(`Du weichst ${f.o.name}s Angriff aus.`);if(stance==='counter'){const counter=Math.max(2,Math.round(dmg*.45));f.metrics.counters++;f.metrics.dealt+=counter;f.ehp=Math.max(0,f.ehp-counter);f.log.push(`Konter: ${counter} Schaden.`);if(f.ehp<=0)return finish(true)}}else{const armor=(st.armor||0)*(stance==='defensive'?1.2:stance==='aggressive'?.9:1);enemyDamage=Math.max(1,Math.round(enemyDamage-armor*.12));f.metrics.taken+=enemyDamage;f.php=Math.max(0,f.php-enemyDamage);f.log.push(`${f.o.name} trifft dich für ${enemyDamage}.`)}if(f.php<=0)return finish(false);f.log=f.log.slice(-8);save();render();setTimeout(step,650)}
function finish(win){const f=S.arenaV2?.fight;if(!f)return;f.done=true;f.result=win?'win':'loss';f.beforeLeague=league();if(win){S.arena=(S.arena||0)+f.o.reward;S.arenaV2.coins=(S.arenaV2.coins||0)+f.o.coins;S.wins=(S.wins||0)+1;f.afterLeague=league();f.log.push(`Sieg: +${f.o.reward} Ruhm · +${f.o.coins} Ruhmesmünzen.`)}else{const loss=f.o.kind==='hard'?4:2;S.arena=Math.max(0,(S.arena||0)-loss);f.loss=loss;f.afterLeague=league();f.log.push(`Niederlage: −${loss} Ruhm.`)}save();render()}
function done(){ensure();S.arenaV2.fight=null;S.arenaV2.opponents=freshOpponents();save();render()}
const system=Arcane.arenaSystem={STANCES,TIERS,ensure,league,difficulty,enemyStyle,start,setStance,done};
window.arenaV2Stance=setStance;
window.arenaV2Start=start;
window.arenaV2Done=done;
system.ensure();
})();
