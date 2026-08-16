(()=>{
'use strict';
const Arcane=window.Arcane=window.Arcane||{};
const BUILD=document.querySelector('meta[name="build"]')?.content||'dev';
const REFRESH_KEY='arcaneAssetRefreshToken';
const cache=new Map(),objectUrls=new Set();
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
  if(refreshToken)u.searchParams.set('assetRefresh',refreshToken);
  return u.href;
}
async function resolve(src){
  if(!src)return '';
  src=String(src);
  if(cache.has(src))return cache.get(src);
  const promise=(async()=>{
    try{
      const res=await fetch(networkUrl(src),{cache:refreshToken?'reload':'force-cache'});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const blob=await res.blob();
      const url=URL.createObjectURL(blob);objectUrls.add(url);return url;
    }catch(err){console.warn('[Arcane Assets] Fallback',src,err);return networkUrl(src)}
  })();
  cache.set(src,promise);return promise;
}
async function bind(img,src){
  if(!img||!src)return img;
  src=String(src);
  if(img.dataset.arcaneAssetSource===src&&img.src.startsWith('blob:'))return img;
  const seq=String((Number(img.dataset.arcaneAssetSeq)||0)+1);img.dataset.arcaneAssetSeq=seq;
  const url=await resolve(src);
  if(!img.isConnected||img.dataset.arcaneAssetSeq!==seq)return img;
  if(img.getAttribute('src')!==url)img.src=url;
  img.dataset.arcaneAssetSource=src;
  return img;
}
function hydrate(root=document.getElementById('app')){
  if(!root)return;
  root.querySelectorAll('img').forEach(img=>{
    const src=img.dataset.arcaneAssetSource||img.getAttribute('src')||'';
    if(src.startsWith('blob:'))return;
    if(/(?:^|\/)assets\/icons\//.test(src))bind(img,src);
  });
}
async function preload(srcs){return Promise.allSettled([...new Set((srcs||[]).filter(Boolean))].map(resolve))}
async function purgeImageCaches(){
  if(navigator.serviceWorker?.controller)navigator.serviceWorker.controller.postMessage('PURGE_IMAGES');
  if('caches'in window){
    for(const key of await caches.keys()){
      const c=await caches.open(key);const reqs=await c.keys();
      await Promise.all(reqs.filter(r=>/\.(?:webp|png|jpe?g|gif|svg)(?:\?|$)/i.test(new URL(r.url).pathname)).map(r=>c.delete(r)));
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
window.addEventListener('pagehide',()=>objectUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
if(refreshToken)queueMicrotask(()=>sessionStorage.removeItem(REFRESH_KEY));
})();
