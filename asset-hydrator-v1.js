(()=>{
'use strict';
let pending=false,observer=null;
const qAssets=()=>window.UI_ICON_ASSETS||{};
const iconPath=k=>window.gameIconPath?.(k)||'';
const norm=s=>String(s||'').split('?')[0];
function ensure(host,src,cls,alt=''){
 if(!host||!src)return;
 const current=host.querySelector('img');
 if(current&&norm(current.getAttribute('src'))===norm(src))return;
 host.innerHTML=`<img class="${cls}" src="${src}" alt="${String(alt).replace(/"/g,'&quot;')}">`;
}
function questSrc(text=''){
 const a=qAssets();
 return /Knochenwache|MINIBOSS|AUTO/i.test(text)?a.questMiniboss:
  /Knochenhauer|Kopfgeld/i.test(text)?a.questBounty:
  /versunkene Krypta|Risiko|Krypta/i.test(text)?a.questRisk:
  /flüsternde Siegel|Ereignis|Event/i.test(text)?a.questEvent:a.questStandard;
}
function hydrateQuests(){
 document.querySelectorAll('.quest-card').forEach(card=>{
  const text=card.querySelector('.q-title b')?.textContent||card.textContent||'';
  ensure(card.querySelector('.q-icon'),questSrc(text),'gai-quest',text.trim());
 });
 document.querySelectorAll('.active-quest,.global-q,.reward-card').forEach(box=>{
  const host=box.querySelector('.q-icon,.reward-icon');
  if(host)ensure(host,questSrc(box.textContent||''),'gai-quest',(box.textContent||'').trim());
 });
}
function hydrateChoices(){
 document.querySelectorAll('.dv7-choices button,.event-choices button').forEach(btn=>{
  const t=btn.textContent||'';
  const key=/Kraft|Einschüchtern|aufbrechen|Standhalten|Kampf/i.test(t)?'ui_choice_strength':/Geschick|Verstecken|umgehen|Ausweichen/i.test(t)?'ui_choice_dexterity':'ui_choice_knowledge';
  ensure(btn.querySelector('span'),iconPath(key),'gai-choice',t.trim());
 });
}
function hydrateCity(){
 document.querySelectorAll('.cv2-grid>button').forEach(btn=>{
  const t=btn.textContent||'';
  const key=/Händler/.test(t)?'location_merchant':/Schmiede/.test(t)?'location_forge':/Bank/.test(t)?'location_bank':'city_trainer';
  ensure(btn.querySelector(':scope > span:first-child'),iconPath(key),'gai-city',t.trim());
 });
}
function stripArenaEmoji(host){
 if(!host)return;
 for(const node of host.childNodes){if(node.nodeType===Node.TEXT_NODE)node.nodeValue=node.nodeValue.replace(/[⚔️🛡️↩️]+/gu,'').trimStart()}
}
function hydrateArena(){
 const a=qAssets(),stance={Aggressiv:a.stanceAggressive,Defensiv:a.stanceDefensive,Konter:a.stanceCounter};
 document.querySelectorAll('.av2-stances button').forEach(btn=>{
  const name=Object.keys(stance).find(n=>(btn.textContent||'').includes(n));
  const host=btn.querySelector('b'),src=name?stance[name]:'';
  if(!name||!host||!src)return;
  stripArenaEmoji(host);
  const current=host.querySelector('img');
  if(!current||norm(current.getAttribute('src'))!==norm(src)){
   current?.remove();
   host.insertAdjacentHTML('afterbegin',`<img class="gai-stance" src="${src}" alt="${name}"> `);
  }
 });
 const ops=(typeof S!=='undefined'&&S?.arenaV2?.opponents)||[];
 document.querySelectorAll('.av2-ophead').forEach((row,i)=>{
  const archetype=ops[i]?.archetype,map={ward:0,shadow:1,arcane:2,reaver:3},idx=map[archetype]??(i%4);
  ensure(row.querySelector(':scope > span'),a.challengers?.[idx],'gai-challenger',ops[i]?.name||'Herausforderer');
 });
}
function hydrateHeaders(){
 const entries=[['.cux-city-title>span','assets/icons/nav-stadt.webp'],['.av3-title h1','assets/icons/nav-arena.webp']];
 entries.forEach(([sel,src])=>document.querySelectorAll(sel).forEach(host=>{if(!host.querySelector('img'))host.insertAdjacentHTML('afterbegin',`<img class="ui-inline-icon" src="${src}" alt=""> `)}));
}
function hydrate(){if(!window.gameIconPath||!window.UI_ICON_ASSETS)return;hydrateQuests();hydrateChoices();hydrateCity();hydrateArena();hydrateHeaders()}
function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;hydrate()})}
function startObserver(){
 const root=document.getElementById('app');if(!root||observer)return;
 observer=new MutationObserver(m=>{if(m.some(x=>x.type==='childList'&&x.addedNodes.length))schedule()});
 observer.observe(root,{childList:true,subtree:true});
}
window.Arcane?.on?.('afterRenderSettled',schedule);
window.Arcane?.on?.('bootReady',()=>{startObserver();schedule()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{startObserver();schedule()},{once:true});else{startObserver();schedule()}
})();
