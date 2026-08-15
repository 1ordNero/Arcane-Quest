(()=>{
const SAVE_KEY='arcaneBeta';
const VERSION=1;
function normalize(s){
 if(!s||typeof s!=='object')return s;
 s.saveVersion=Number(s.saveVersion)||VERSION;
 if(!Array.isArray(s.items))s.items=[];
 if(!s.eq||typeof s.eq!=='object'||Array.isArray(s.eq))s.eq={};
 if(!Array.isArray(s.log))s.log=[];
 if(!Array.isArray(s.skills))s.skills=[];
 s.invCap=Math.max(1,Number(s.invCap)||15);
 s.maxAl=Math.max(1,Number(s.maxAl)||100);
 s.al=Math.max(0,Math.min(s.maxAl,Number(s.al)||0));
 s.maxHp=Math.max(1,Number(s.maxHp)||120);
 s.hp=Math.max(0,Math.min(s.maxHp,Number(s.hp)||s.maxHp));
 s.gold=Math.max(0,Number(s.gold)||0);
 s.xp=Math.max(0,Number(s.xp)||0);
 s.lvl=Math.max(1,Number(s.lvl)||1);
 return s;
}
function persist(){normalize(S);localStorage.setItem(SAVE_KEY,JSON.stringify(S));}
normalize(S);
window.ARCANE_STATE={key:SAVE_KEY,version:VERSION,normalize,persist};
window.save=persist;
})();