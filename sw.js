const CACHE='arcane-quest-shell-v8';
const SHELL=['./','./index.html','./manifest.webmanifest'];
const isCode=url=>/\.(?:js|css|html|webmanifest)$/i.test(url.pathname);
const isImage=url=>/\.(?:webp|png|jpe?g|gif|svg)$/i.test(url.pathname);
async function put(req,res){if(res&&res.ok){const c=await caches.open(CACHE);await c.put(req,res.clone())}return res}
async function networkFirst(req,fallback){try{return await put(req,await fetch(req,{cache:'no-store'}))}catch(_){return (await caches.match(req))||(fallback?await caches.match(fallback):undefined)||Response.error()}}
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('arcane-quest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting();if(event.data==='PURGE_ASSETS')event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k))))) });
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(networkFirst(req,'./index.html'));return}
 if(isCode(url)||isImage(url)){event.respondWith(networkFirst(req));return}
 event.respondWith(networkFirst(req));
});