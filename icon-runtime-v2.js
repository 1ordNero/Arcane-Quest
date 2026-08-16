(()=>{
'use strict';
const QUEST='assets/icons/quests/';
const UI='assets/icons/ui/';
const GAME='assets/icons/game-v2/';
const ASSETS={
 questStandard:QUEST+'quest_standard.webp',questEvent:QUEST+'quest_event.webp',questRisk:QUEST+'quest_risk.webp',questBounty:QUEST+'quest_bounty.webp',questMiniboss:QUEST+'quest_miniboss.webp',
 merchant:UI+'location_merchant.webp',forge:UI+'location_forge.webp',bank:UI+'location_bank.webp',trainer:GAME+'city_trainer.webp',
 aggressive:UI+'ui_stance_aggressive.webp',defensive:UI+'ui_stance_defensive.webp',counter:UI+'ui_stance_counter.webp',
 challengers:[1,2,3,4].map(n=>UI+`arena_challenger_0${n}.webp`)
};
Object.values(ASSETS).flat().filter(x=>typeof x==='string').forEach(src=>{const i=new Image();i.decoding='async';i.src=src});
const norm=s=>String(s||'').split('?')[0];
function ensure(host,src,cls,alt=''){
 if(!host||!src)return;
 const current=host.querySelector('img');
 if(current&&norm(current.getAttribute('src'))===norm(src)){current.className=cls;return}
 host.replaceChildren(Object.assign(document.createElement('img'),{src,className:cls,alt}));
}
function questSrc(text=''){
 return /Knochenwache|MINIBOSS|AUTO/i.test(text)?ASSETS.questMiniboss:
 /Knochenhauer|Kopfgeld/i.test(text)?ASSETS.questBounty:
 /versunkene Krypta|Risiko|Krypta/i.test(text)?ASSETS.questRisk:
 /flüsternde Siegel|Ereignis|Event/i.test(text)?ASSETS.questEvent:ASSETS.questStandard;
}
function quests(){
 document.querySelectorAll('.quest-card').forEach(card=>{const text=card.querySelector('.q-title b')?.textContent||card.textContent||'';ensure(card.querySelector('.q-icon'),questSrc(text),'gai-quest',text.trim())});
 document.querySelectorAll('.active-quest,.global-q,.reward-card').forEach(box=>{const host=box.querySelector('.q-icon,.reward-icon');if(host)ensure(host,questSrc(box.textContent||''),'gai-quest',(box.textContent||'').trim())});
}
function city(){
 document.querySelectorAll('.cv2-grid>button').forEach(btn=>{const text=btn.textContent||'';const src=/Händler/i.test(text)?ASSETS.merchant:/Schmiede/i.test(text)?ASSETS.forge:/Bank/i.test(text)?ASSETS.bank:ASSETS.trainer;ensure(btn.querySelector(':scope > span:first-child'),src,'gai-city',text.trim())});
}
function stripEmoji(host){for(const n of host?.childNodes||[])if(n.nodeType===Node.TEXT_NODE)n.nodeValue=n.nodeValue.replace(/[⚔️🛡️↩️🏹🔮]+/gu,'').trimStart()}
function arena(){
 const stance={Aggressiv:ASSETS.aggressive,Defensiv:ASSETS.defensive,Konter:ASSETS.counter};
 document.querySelectorAll('.av2-stances button').forEach(btn=>{const name=Object.keys(stance).find(n=>(btn.textContent||'').includes(n));const host=btn.querySelector('b');if(!name||!host)return;stripEmoji(host);const old=host.querySelector('img');if(!old||norm(old.src)!==norm(stance[name])){old?.remove();const i=document.createElement('img');i.src=stance[name];i.className='gai-stance';i.alt=name;host.prepend(i)}});
 document.querySelectorAll('.av2-ophead').forEach((row,i)=>ensure(row.querySelector(':scope > span'),ASSETS.challengers[i%4],'gai-challenger','Herausforderer'));
}
function hydrate(){quests();city();arena()}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;hydrate()})}
window.Arcane?.on?.('afterRenderSettled',schedule);
window.Arcane?.on?.('bootReady',schedule);
const start=()=>{const root=document.getElementById('app');if(root)new MutationObserver(m=>{if(m.some(x=>x.type==='childList'))schedule()}).observe(root,{childList:true,subtree:true});schedule()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
