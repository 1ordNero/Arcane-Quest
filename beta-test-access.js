(()=>{
const BETA_KEYS=5;
function grant(){
  S.betaDungeonAccessGranted=true;
  S.betaDungeonUnlocked=true;
  if((Number(S.keys)||0)<1)S.keys=BETA_KEYS;
  save();
}
function topup(){
  if(!S.betaDungeonUnlocked)return;
  if((Number(S.keys)||0)<=0&&!S.dungeonV1){S.keys=BETA_KEYS;save()}
}
grant();
const realStart=window.d1Start;
window.d1Start=function(){
  grant();
  if(S.dungeonV1){render();return}
  if((Number(S.keys)||0)<1)S.keys=BETA_KEYS;
  const level=S.lvl;
  S.lvl=Math.max(10,Number(S.lvl)||1);
  try{return realStart()}finally{S.lvl=level;save()}
};
const realDungeon=window.dungeonV1;
window.dungeonV1=function(){
  grant();
  let html=realDungeon();
  if(!S.dungeonV1){
    html=html.replace('AB STUFE 10 · SCHLÜSSEL-SYSTEM','BETA-TEST · DIREKT FREIGESCHALTET')
      .replace('Fünf Räume bilden die erste Expedition. Ereignisse, Kämpfe und Beute greifen ineinander. Ein Schlüssel wird beim Betreten verbraucht.','Fünf Räume bilden die erste Expedition. Während der Beta kannst du sie unabhängig von deiner Stufe testen. Ein Schlüssel wird pro Run verbraucht.')
      .replace(/<button onclick="d1Start\(\)"[^>]*>Katakomben betreten<\/button>/,'<button onclick="d1Start()">Katakomben betreten</button>');
    html=`<div class="d-beta-back"><button onclick="tab('home')">‹ Zur Taverne</button></div>${html}`;
  } else {
    html=`<div class="d-beta-back"><button onclick="d1Leave()">‹ Katakomben verlassen</button></div>${html}`;
  }
  return html;
};
const st=document.createElement('style');
st.textContent=`.d-beta-back{margin:0 0 8px}.d-beta-back button{background:#ffffff0b;box-shadow:none;border:1px solid #ffffff12;padding:8px 11px;font-size:10px}`;
document.head.appendChild(st);
setInterval(topup,1500);
if(S.screen==='dungeon')render();
})();