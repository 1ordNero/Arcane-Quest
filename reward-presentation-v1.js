(()=>{
'use strict';
const RARITY={common:['GEWÖHNLICH','#aaa'],magic:['MAGISCH','#64b5ff'],rare:['SELTEN','#c879ff'],mythic:['MYTHISCH','#ff805f'],legendary:['LEGENDÄR','#ffd84d']};
const FALLBACK_ITEM_ASSET='assets/icons/ui/ui_items.webp';
const esc=value=>String(value??'').replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));

function removeLegacyItemTile(result,card){
 if(!result?.item)return;
 const grid=card.querySelector('.reward-grid');
 if(!grid)return;
 [...grid.children].forEach(tile=>{
  const text=(tile.textContent||'').trim();
  if(text.includes(result.item)||text.includes('🎁'))tile.remove();
 });
}
function rewardItem(result){
 const items=Array.isArray(S?.items)?S.items:[];
 if(result?.itemId){const byId=items.find(item=>item?.id===result.itemId);if(byId)return byId}
 const byName=[...items].reverse().find(item=>item?.name===result?.item);
 return byName||{name:result?.item,rarity:result?.itemRarity,slot:result?.itemSlot};
}
function rewardAsset(result){
 if(!result?.item)return null;
 const item=rewardItem(result);
 return window.getItemAsset?.(item,item?.slot)||FALLBACK_ITEM_ASSET;
}
function normalizeImages(card){
 const crest=card.querySelector('.reward-icon');
 if(crest){
  crest.classList.add('rp-crest');
  const image=crest.querySelector('img');
  if(image){image.classList.add('rp-crest-img');image.removeAttribute('width');image.removeAttribute('height')}
 }
 card.querySelectorAll('.reward-grid img').forEach(image=>image.classList.add('rp-reward-inline-img'));
}
function groupOutcomes(card){
 const outcomes=[...card.querySelectorAll(':scope > .event-result,:scope > .cv1-result')];
 if(!outcomes.length)return;
 let group=card.querySelector(':scope > .rp-outcomes');
 if(!group){
  group=document.createElement('div');
  group.className='rp-outcomes';
  const anchor=card.querySelector(':scope > .rp-loot,:scope > .reward-grid');
  anchor?.insertAdjacentElement('beforebegin',group);
 }
 outcomes.forEach(outcome=>group.appendChild(outcome));
}
function createLootCard(result,card){
 if(!result?.item||card.querySelector(':scope > .rp-loot'))return;
 const item=rewardItem(result);
 const rarityKey=item?.rarity||result.itemRarity||'common';
 const rarity=RARITY[rarityKey]||RARITY.common;
 const asset=rewardAsset(result);
 const loot=document.createElement('div');
 loot.className=`rp-loot ${rarityKey}`;
 loot.style.setProperty('--rp-rarity',rarity[1]);
 loot.innerHTML=`<div class="rp-rays"></div><div class="rp-item-art"><img class="rp-loot-img" src="${asset}" alt="${esc(result.item)}" decoding="async"></div><small>${rarity[0]}</small><b>${esc(result.item)}</b>${result.itemStats?`<span>${esc(result.itemStats)}</span>`:''}`;
 card.querySelector('.reward-grid')?.insertAdjacentElement('beforebegin',loot);
}
function enhanceLevelUp(result,card){
 if(!result?.levels)return;
 const level=card.querySelector('.level-up');
 if(!level||level.classList.contains('rp-level'))return;
 level.classList.add('rp-level');
 level.innerHTML=`<small>NEUE MACHT ERLANGT</small><b>STUFE ${Number(S.lvl)||''}</b><span>Attribute und maximale Lebenspunkte wurden erhöht.</span>`;
}
function animateOnce(result,card){
 if(card.dataset.rpAnimated)return;
 card.dataset.rpAnimated='1';
 if(matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 card.animate([{opacity:.4,transform:'translateY(14px) scale(.98)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.16,.9,.25,1)'});
 if(['legendary','mythic'].includes(result?.itemRarity))navigator.vibrate?.([20,40,30]);
}
function enhance(){
 const result=S?.questResult;
 const card=document.querySelector('.reward-card');
 if(!result||!card)return;
 card.classList.add('rp-card');
 removeLegacyItemTile(result,card);
 createLootCard(result,card);
 groupOutcomes(card);
 enhanceLevelUp(result,card);
 normalizeImages(card);
 animateOnce(result,card);
}

window.Arcane?.on?.('afterRenderSettled',enhance);
new MutationObserver(()=>queueMicrotask(enhance)).observe(document.body,{subtree:true,childList:true});

const style=document.createElement('style');
style.textContent=`
.reward-overlay{position:fixed!important;inset:0!important;z-index:2147483060!important;display:grid!important;place-items:center!important;padding:10px!important;overflow:hidden!important;backdrop-filter:blur(8px)!important;background:radial-gradient(circle at 50% 34%,#6d3aa51c,#050307ed 60%)!important}
.reward-card.rp-card{position:relative!important;width:min(430px,100%)!important;max-width:430px!important;max-height:calc(100dvh - 20px - env(safe-area-inset-bottom))!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain;padding:14px 16px 15px!important;border:1px solid #ffffff18!important;border-radius:20px!important;background:linear-gradient(155deg,#2a1c38,#15101c 55%,#0e0a13)!important;box-shadow:0 28px 90px #000d,0 1px 0 #fff2 inset!important}
.rp-card:before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(130deg,#fff08,transparent 24%,transparent 70%,#a875ff08)}
.rp-card>.eyebrow{margin-top:2px!important;font-size:9px!important;letter-spacing:1.4px!important}.rp-card>h2{margin:4px 0 1px!important;font-size:24px!important;line-height:1.08!important}.rp-card>h2+small{display:block!important;margin:0 0 8px!important;font-size:9px!important;color:#b98cff!important;letter-spacing:.08em!important}
.reward-card .reward-icon,.rp-crest{width:98px!important;height:98px!important;min-width:98px!important;min-height:98px!important;max-width:98px!important;max-height:98px!important;margin:0 auto 2px!important;display:grid!important;place-items:center!important;overflow:visible!important;filter:drop-shadow(0 0 16px #a875ff66);animation:rpFloat 2.8s ease-in-out infinite}
.reward-card .reward-icon>img,.reward-card .rp-crest-img{display:block!important;width:94px!important;height:94px!important;max-width:94px!important;max-height:94px!important;object-fit:contain!important;margin:0!important}
.rp-outcomes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:7px 0 9px}.rp-outcomes>:only-child{grid-column:1/-1}.rp-outcomes .event-result,.rp-outcomes .cv1-result{margin:0!important;min-height:64px!important;padding:8px 9px!important;border-radius:11px!important;display:flex!important;flex-direction:column!important;justify-content:center!important}.rp-outcomes b{font-size:10px!important}.rp-outcomes small,.rp-outcomes span{font-size:8px!important;line-height:1.35!important;margin-top:3px!important}
.rp-loot{position:relative;margin:9px auto 9px;padding:10px 10px 9px;border-radius:17px;overflow:hidden;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--rp-rarity) 20%,transparent),#09060e 72%);border:1px solid color-mix(in srgb,var(--rp-rarity) 52%,transparent);box-shadow:0 0 32px color-mix(in srgb,var(--rp-rarity) 14%,transparent) inset}.rp-loot>*:not(.rp-rays){position:relative;z-index:2}.rp-item-art{width:126px!important;height:126px!important;margin:-2px auto 0!important;display:grid!important;place-items:center!important;overflow:visible!important;filter:drop-shadow(0 8px 16px #000b) drop-shadow(0 0 14px var(--rp-rarity))}.rp-item-art img{display:block!important;width:126px!important;height:126px!important;max-width:126px!important;max-height:126px!important;object-fit:contain!important;transform:scale(1.1)!important}.rp-loot small,.rp-loot b,.rp-loot span{display:block}.rp-loot small{font-size:8px;letter-spacing:1.4px;color:var(--rp-rarity);font-weight:900}.rp-loot b{font-size:16px;line-height:1.15;margin-top:2px}.rp-loot span{font-size:9px;color:#cfc2d7;margin-top:4px}.rp-rays{position:absolute;inset:-70%;background:repeating-conic-gradient(from 0deg,transparent 0 13deg,var(--rp-rarity) 14deg 15deg,transparent 16deg 30deg);opacity:.08;animation:rpSpin 18s linear infinite}
.reward-grid{gap:7px!important;margin:7px 0!important}.reward-grid span{padding:8px 5px!important;background:#ffffff06!important;border:1px solid #ffffff09!important;box-shadow:0 1px 0 #fff08 inset}.reward-grid b{font-size:14px!important}.reward-grid small{font-size:8px!important}.reward-card .reward-grid img,.rp-reward-inline-img{display:inline-block!important;width:22px!important;height:22px!important;max-width:22px!important;max-height:22px!important;object-fit:contain!important;vertical-align:middle!important}
.rp-level{padding:9px!important;background:linear-gradient(135deg,#f4c15d12,#a875ff12)!important;border:1px solid #f4c15d35!important}.rp-level small,.rp-level b,.rp-level span{display:block}.rp-level small{font-size:8px;letter-spacing:1.3px;color:#e9c872}.rp-level b{font-size:17px;color:#ffe29a;margin:2px}.rp-level span{font-size:8px;color:#cfc2d7}.rp-card>button{position:sticky!important;bottom:-1px!important;z-index:5!important;width:100%!important;min-height:48px!important;margin-top:8px!important;background:linear-gradient(135deg,#8e5ee7,#b47cff)!important;box-shadow:0 9px 22px #6e38c83b!important}
@keyframes rpSpin{to{transform:rotate(360deg)}}@keyframes rpFloat{50%{transform:translateY(-3px)}}
@media(max-width:430px){.reward-overlay{place-items:end center!important;padding:8px 8px max(8px,env(safe-area-inset-bottom))!important}.reward-card.rp-card{max-height:calc(100dvh - 16px - env(safe-area-inset-bottom))!important;padding:12px 13px 13px!important}.reward-card .reward-icon,.rp-crest{width:88px!important;height:88px!important;min-width:88px!important;min-height:88px!important;max-width:88px!important;max-height:88px!important}.reward-card .reward-icon>img,.reward-card .rp-crest-img{width:84px!important;height:84px!important;max-width:84px!important;max-height:84px!important}.rp-card>h2{font-size:22px!important}.rp-item-art,.rp-item-art img{width:116px!important;height:116px!important;max-width:116px!important;max-height:116px!important}}
@media(max-width:360px),(max-height:720px){.rp-outcomes{grid-template-columns:1fr}.rp-outcomes>:only-child{grid-column:auto}.reward-card .reward-icon,.rp-crest{width:76px!important;height:76px!important;min-width:76px!important;min-height:76px!important;max-width:76px!important;max-height:76px!important}.reward-card .reward-icon>img,.reward-card .rp-crest-img{width:72px!important;height:72px!important;max-width:72px!important;max-height:72px!important}.rp-item-art,.rp-item-art img{width:100px!important;height:100px!important;max-width:100px!important;max-height:100px!important}}
@media(prefers-reduced-motion:reduce){.rp-rays,.rp-crest{animation:none!important}}
`;
document.head.appendChild(style);
queueMicrotask(enhance);
})();