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
const allAssets=Object.values(ASSETS).flat().filter(x=>typeof x==='string');
window.Arcane?.assets?.preload(allAssets);
const norm=s=>String(s||'').split('?')[0];
function bind(image,src){window.Arcane?.assets?.bind?.(image,src)}
function ensure(host,src,cls,alt=''){
 if(!host||!src)return;
 const current=host.querySelector(':scope > img');
 if(current&&(current.dataset.arcaneAssetSource===src||norm(current.getAttribute('src'))===norm(src))){current.className=cls;bind(current,src);return}
 const image=document.createElement('img');image.src=src;image.className=cls;image.alt=alt;image.decoding='async';image.dataset.arcaneAssetSource=src;
 host.replaceChildren(image);bind(image,src);
}
function questSrc(text=''){
 return /Knochenwache|MINIBOSS|AUTO/i.test(text)?ASSETS.questMiniboss:
 /Knochenhauer|Kopfgeld/i.test(text)?ASSETS.questBounty:
 /versunkene Krypta|Risiko|Krypta/i.test(text)?ASSETS.questRisk:
 /flüsternde Siegel|Ereignis|Event/i.test(text)?ASSETS.questEvent:ASSETS.questStandard;
}
function quests(){
 document.querySelectorAll('.quest-card').forEach(card=>{const text=card.querySelector('.q-title b')?.textContent||card.textContent||'';ensure(card.querySelector('.q-icon'),questSrc(text),'aq-icon aq-icon-quest',text.trim())});
 document.querySelectorAll('.active-quest,.global-q,.reward-card').forEach(box=>{const host=box.querySelector('.q-icon,.reward-icon');if(host)ensure(host,questSrc(box.textContent||''),'aq-icon aq-icon-quest',(box.textContent||'').trim())});
}
function city(){
 document.querySelectorAll('.cv2-grid>button').forEach(btn=>{const text=btn.textContent||'';const src=/Händler/i.test(text)?ASSETS.merchant:/Schmiede/i.test(text)?ASSETS.forge:/Bank/i.test(text)?ASSETS.bank:ASSETS.trainer;ensure(btn.querySelector(':scope > span:first-child'),src,'aq-icon aq-icon-city',text.trim())});
}
function stripEmoji(host){for(const n of host?.childNodes||[])if(n.nodeType===Node.TEXT_NODE)n.nodeValue=n.nodeValue.replace(/[⚔️🛡️↩️🏹🔮]+/gu,'').trimStart()}
function arena(){
 const stance={Aggressiv:ASSETS.aggressive,Defensiv:ASSETS.defensive,Konter:ASSETS.counter};
 document.querySelectorAll('.av2-stances button').forEach(btn=>{const name=Object.keys(stance).find(n=>(btn.textContent||'').includes(n));const host=btn.querySelector('b');if(!name||!host)return;stripEmoji(host);let image=host.querySelector(':scope > img');if(!image||image.dataset.arcaneAssetSource!==stance[name]){image?.remove();image=document.createElement('img');image.src=stance[name];image.alt=name;image.dataset.arcaneAssetSource=stance[name];host.prepend(image)}image.className='aq-icon aq-icon-stance';bind(image,stance[name])});
 document.querySelectorAll('.av2-ophead').forEach((row,i)=>ensure(row.querySelector(':scope > span'),ASSETS.challengers[i%4],'aq-icon aq-icon-challenger','Herausforderer'));
}
function hydrate(){quests();city();arena();window.Arcane?.assets?.hydrate?.()}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;hydrate()})}
window.Arcane?.on?.('afterRenderSettled',schedule);
window.Arcane?.on?.('bootReady',schedule);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
const style=document.createElement('style');style.textContent=`
.aq-icon{position:static!important;inset:auto!important;display:block!important;float:none!important;transform:none!important;margin:0!important;padding:0!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center!important;background:none!important;border:0!important;box-shadow:none!important;pointer-events:none!important}
.quest-card .q-icon,.active-quest .q-icon{position:relative!important;display:grid!important;place-items:center!important;width:64px!important;height:64px!important;min-width:64px!important;min-height:64px!important;flex:0 0 64px!important;overflow:hidden!important;background:#ffffff06!important;border-radius:12px!important}
.quest-card .q-icon>.aq-icon-quest,.active-quest .q-icon>.aq-icon-quest{width:52px!important;height:52px!important}
.cv2-grid>button>span:first-child{position:relative!important;display:grid!important;place-items:center!important;width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;overflow:hidden!important;align-self:center!important}
.cv2-grid>button>span:first-child>.aq-icon-city{width:42px!important;height:42px!important}
.av2-stances button b{display:flex!important;align-items:center!important;gap:8px!important;min-width:0!important}
.av2-stances button b>.aq-icon-stance{width:38px!important;height:38px!important;flex:0 0 38px!important}
.av2-ophead>span{position:relative!important;display:grid!important;place-items:center!important;width:52px!important;height:52px!important;min-width:52px!important;min-height:52px!important;overflow:hidden!important}
.av2-ophead>span>.aq-icon-challenger{width:48px!important;height:48px!important}
@media(max-width:520px){.quest-card .q-icon,.active-quest .q-icon{width:58px!important;height:58px!important;min-width:58px!important;min-height:58px!important;flex-basis:58px!important}.quest-card .q-icon>.aq-icon-quest,.active-quest .q-icon>.aq-icon-quest{width:48px!important;height:48px!important}.cv2-grid>button>span:first-child{width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important}.cv2-grid>button>span:first-child>.aq-icon-city{width:38px!important;height:38px!important}.av2-stances button b>.aq-icon-stance{width:34px!important;height:34px!important;flex-basis:34px!important}}
`;document.head.appendChild(style);
})();
