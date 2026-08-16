const BUILD=new URL(self.location.href).searchParams.get('build')||'dev';
const SHELL_CACHE='arcane-quest-shell-'+BUILD.replace(/[^a-z0-9._-]/gi,'_');
const IMAGE_CACHE='arcane-quest-images-v1';
const SHELL=['./','./index.html','./manifest.webmanifest'];
const isCode=url=>/\.(?:js|css|html|webmanifest)$/i.test(url.pathname);
const isImage=url=>/\.(?:webp|png|jpe?g|gif|svg)$/i.test(url.pathname);
async function put(cacheName,req,res){if(res&&res.ok){const c=await caches.open(cacheName);await c.put(req,res.clone())}return res}
async function networkFirst(req,fallback){try{return await put(SHELL_CACHE,req,await fetch(req,{cache:'no-store'}))}catch(_){return (await caches.match(req))||(fallback?await caches.match(fallback):undefined)||Response.error()}}
async function imageCacheFirst(req){const c=await caches.open(IMAGE_CACHE);const hit=await c.match(req);if(hit)return hit;try{return await put(IMAGE_CACHE,req,await fetch(req,{cache:'reload'}))}catch(_){return Response.error()}}
async function purgeImages(){await caches.delete(IMAGE_CACHE)}
self.addEventListener('install',event=>{event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL.map(url=>new Request(url,{cache:'reload'})))))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('arcane-quest-shell-')&&k!==SHELL_CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting();if(event.data==='PURGE_IMAGES')event.waitUntil(purgeImages());if(event.data==='PURGE_ASSETS')event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))))});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(networkFirst(req,'./index.html'));return}
 if(isImage(url)){event.respondWith(imageCacheFirst(req));return}
 if(isCode(url)){event.respondWith(networkFirst(req));return}
 event.respondWith(networkFirst(req));
});