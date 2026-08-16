(()=>{
'use strict';

const root=window.Arcane=window.Arcane||{};

function screenHtml(){
  if(S.screen==='home')return home();
  if(S.screen==='char')return char();
  if(S.screen==='inv')return inv();
  if(S.screen==='forge')return forgeView();
  if(S.screen==='arena')return arena();
  if(S.screen==='combat')return combat();
  return home();
}

function footerHtml(){
  return [['home','🍺','Taverne'],['char','🧙','Held'],['inv','🎒','Rucksack'],['forge','🔨','Schmiede'],['arena','⚔️','Arena']]
    .map(x=>`<button class="${S.screen===x[0]?'active':''}" onclick="tab('${x[0]}')">${x[1]}<br>${x[2]}</button>`)
    .join('');
}

function renderShell(){
  save();
  const app=document.getElementById('app');
  if(!app)return;
  app.innerHTML=`<header><div class="top"><div class="brand">🍺 Arcane Tavern & Quest <span class="small">BETA</span></div><div class="stats"><span class="pill">Lv ${S.lvl}</span><span class="pill gold">🪙 ${S.gold}</span><span class="pill">⚡ ${S.al}/${S.maxAl}</span><span class="pill">🜂 ${S.souls}</span></div></div></header><main>${screenHtml()}</main><nav class="tabs">${footerHtml()}</nav>`;
}

root.shell={render:renderShell,screenHtml,footerHtml};
window.render=renderShell;
})();
