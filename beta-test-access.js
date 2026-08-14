(()=>{
const BETA_KEYS=5;
function grant(){
  if(S.betaDungeonAccessGranted)return false;
  S.betaDungeonAccessGranted=true;
  S.betaDungeonUnlocked=true;
  S.keys=Math.max(Number(S.keys)||0,BETA_KEYS);
  if(typeof log==='function')log(`Beta-Testzugang: Katakomben freigeschaltet · ${S.keys} Schlüssel verfügbar.`);
  save();
  return true;
}
function topup(){
  if(!S.betaDungeonUnlocked)return;
  if((Number(S.keys)||0)<=0 && !S.dungeonV1){S.keys=BETA_KEYS;save();if(typeof toast==='function')toast(`Beta-Test: ${BETA_KEYS} neue Katakomben-Schlüssel erhalten.`)}
}
grant();
const oldStart=window.d1Start;
window.d1Start=function(){
  if(S.betaDungeonUnlocked){
    if(S.dungeonV1)return render();
    if((Number(S.keys)||0)<1){S.keys=BETA_KEYS;save()}
    const realLvl=S.lvl;
    if(S.lvl<10)S.lvl=10;
    try{return oldStart()}finally{S.lvl=realLvl;save()}
  }
  return oldStart();
};
const oldDungeon=window.dungeonV1;
window.dungeonV1=function(){
  let html=oldDungeon();
  if(!S.dungeonV1&&S.betaDungeonUnlocked){
    html=html.replace('AB STUFE 10 · SCHLÜSSEL-SYSTEM','BETA-TEST · DIREKT FREIGESCHALTET')
      .replace('Fünf Räume bilden die erste Expedition. Ereignisse, Kämpfe und Beute greifen ineinander. Ein Schlüssel wird beim Betreten verbraucht.','Fünf Räume bilden die erste Expedition. Für den Beta-Test ist der Dungeon unabhängig von deiner Stufe zugänglich. Ein Testschlüssel wird beim Betreten verbraucht.')
      .replace(/<button onclick="d1Start\(\)"[^>]*>Katakomben betreten<\/button>/,'<button onclick="d1Start()">Katakomben betreten</button>');
  }
  return html;
};
const oldHome=window.home;
window.home=function(){
  let html=oldHome();
  if(S.betaDungeonUnlocked)html=html.replace(/<small>🔒 ab Stufe 10<\/small>/g,`<small>🧪 Beta · 🗝️ ${S.keys||0}</small>`);
  return html;
};
setInterval(topup,1500);
if(S.screen==='dungeon')render();
})();