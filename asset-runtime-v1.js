(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const BUILD=window.ARCANE_BUILD||document.querySelector('meta[name="build"]')?.content||'dev';
const REFRESH_KEY='arcaneAssetRefreshToken';
const cache=new Map();
let refreshToken=sessionStorage.getItem(REFRESH_KEY)||'';
const params=new URLSearchParams(location.search);
if(params.get('refreshAssets')==='1'){
  refreshToken=String(Date.now());
  sessionStorage.setItem(REFRESH_KEY,refreshToken);
  params.delete('refreshAssets');
  const q=params.toString();
  history.replaceState(null,'',location.pathname+(q?'?'+q:'')+location.hash);
}
function networkUrl(src){
  const u=new URL(src,location.href);
  u.searchParams.set('assetBuild',BUILD);
  if(refreshToken)u.searchParams.set('assetRefresh',refreshToken);
  return u.href;
}
async function resolve(src){
  if(!src)return '';
  src=String(src);
  if(cache.has(src))return cache.get(src);
  const url=networkUrl(src);
  cache.set(src,Promise.resolve(url));
  return url;
}
async function bind(img,src){
  if(!img||!src)return img;
  src=String(src);
  if(img.dataset.arcaneAssetSource===src&&img.dataset.arcaneAssetBuild===BUILD)return img;
  const seq=String((Number(img.dataset.arcaneAssetSeq)||0)+1);img.dataset.arcaneAssetSeq=seq;
  const url=await resolve(src);
  if(!img.isConnected||img.dataset.arcaneAssetSeq!==seq)return img;
  if(img.getAttribute('src')!==url)img.src=url;
  img.dataset.arcaneAssetSource=src;
  img.dataset.arcaneAssetBuild=BUILD;
  return img;
}
function hydrate(root=document.getElementById('app')){
  if(!root)return;
  root.querySelectorAll('img').forEach(img=>{
    let src=img.dataset.arcaneAssetSource||img.getAttribute('src')||'';
    if(!src)return;
    try{const u=new URL(src,location.href);u.searchParams.delete('assetBuild');u.searchParams.delete('assetRefresh');src=u.origin===location.origin?u.pathname.replace(location.pathname.replace(/[^/]*$/,''),'').replace(/^\//,'')+u.search:''}catch{}
    if(/(?:^|\/)assets\//.test(src))bind(img,src);
  });
}
function preloadOne(src){return new Promise(resolveDone=>{
  if(!src)return resolveDone();
  const img=new Image();
  img.decoding='async';
  img.onload=img.onerror=()=>resolveDone();
  img.src=networkUrl(src);
})}
async function preload(srcs){return Promise.allSettled([...new Set((srcs||[]).filter(Boolean))].map(preloadOne))}
function criticalAssets(){
  const ui=window.UI_ICON_ASSETS||{};
  const out=[ui.hp,ui.gold,ui.xp,ui.attack,ui.defense];
  if(typeof S!=='undefined'){
    if(S.screen==='home')out.push(ui.questStandard,ui.questEvent,ui.questRisk,ui.questBounty,ui.questMiniboss);
    if(S.screen==='city')out.push(ui.locationBank,ui.locationForge,ui.locationMerchant);
    if(S.screen==='arena')out.push(ui.stanceAggressive,ui.stanceDefensive,ui.stanceCounter,...(ui.challengers||[]));
    if(S.screen==='char'&&window.getHeroPortrait)out.push(getHeroPortrait({cls:S.cls,gender:S.gender}));
  }
  return out.filter(Boolean);
}
function backgroundList(){
  const deferred=window.__ARCANE_DEFERRED_PRELOADS||[];
  const ui=window.UI_ICON_ASSETS||{};
  return [...new Set([...deferred,...Object.values(ui).flat().filter(v=>typeof v==='string')])];
}
function scheduleBackground(){
  const pending=backgroundList();let index=0;
  const run=deadline=>{
    let count=0;
    while(index<pending.length&&count<4&&(!deadline||deadline.timeRemaining()>5||deadline.didTimeout)){
      preloadOne(pending[index++]);count++;
    }
    if(index<pending.length){if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:1800});else setTimeout(()=>run(null),250)}
  };
  setTimeout(()=>{'requestIdleCallback'in window?requestIdleCallback(run,{timeout:1800}):run(null)},900);
}
async function purgeImageCaches(){
  if(navigator.serviceWorker?.controller)navigator.serviceWorker.controller.postMessage('PURGE_IMAGES');
  if('caches'in window){
    for(const key of await caches.keys()){
      const c=await caches.open(key);const reqs=await c.keys();
      await Promise.all(reqs.filter(r=>/\.(?:webp|png|jpe?g|gif|svg)$/i.test(new URL(r.url).pathname)).map(r=>c.delete(r)));
    }
  }
}
async function forceRefresh(){
  sessionStorage.setItem(REFRESH_KEY,String(Date.now()));
  await purgeImageCaches().catch(()=>{});
  location.reload();
}
const API=Arcane.assets=Object.assign(Arcane.assets||{},{build:BUILD,resolve,bind,hydrate,preload,forceRefresh,purgeImageCaches,get refreshToken(){return refreshToken}});
window.arcaneRefreshAssets=forceRefresh;
Arcane.on?.('afterRenderSettled',()=>hydrate());
Arcane.on?.('bootReady',()=>hydrate());
queueMicrotask(()=>hydrate());
preload(criticalAssets()).finally(()=>window.dispatchEvent(new CustomEvent('arcane:critical-assets-ready')));
scheduleBackground();
if(refreshToken)queueMicrotask(()=>sessionStorage.removeItem(REFRESH_KEY));
})();