const {test,expect}=require('@playwright/test');

const savedHero={
  screen:'home',name:'Offlineheld',race:'Mensch',gender:'male',cls:'Krieger',bg:'Tavernen-Stammgast',
  lvl:7,xp:12,gold:321,al:80,maxAl:100,hp:180,maxHp:180,str:15,agi:11,int:8,
  items:[],eq:{},bank:[],invCap:15,bankCap:100,skills:[],log:[],keys:1,souls:0
};

async function clearPwa(page){
  await page.evaluate(async()=>{
    for(const registration of await navigator.serviceWorker.getRegistrations())await registration.unregister();
    for(const key of await caches.keys())await caches.delete(key);
    localStorage.clear();
  });
}

async function waitForActiveWorker(page){
  await page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.ready;
    if(registration.active)return;
    await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
  });
}

test.afterEach(async({page,context})=>{
  await context.setOffline(false);
  await clearPwa(page).catch(()=>{});
  await page.close();
});

test('manifest exposes an installable portrait game shell',async({page})=>{
  await page.goto('/');
  const response=await page.request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  const manifest=await response.json();
  expect(manifest).toMatchObject({display:'standalone',orientation:'portrait-primary',start_url:'./',scope:'./'});
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({sizes:'192x192',type:'image/webp'}),
    expect.objectContaining({sizes:'512x512',type:'image/webp'})
  ]));
});

test('installed build restores a save while fully offline',async({page,context})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await clearPwa(page);
  await page.evaluate(state=>{
    localStorage.setItem('arcaneBeta',JSON.stringify(state));
    localStorage.setItem('arcaneCharacterCreated','1');
  },savedHero);
  await page.reload();
  await waitForActiveWorker(page);
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
  const build=await page.evaluate(()=>window.ARCANE_BUILD);
  await expect.poll(()=>page.evaluate(()=>caches.keys())).toContain(`arcane-quest-shell-${build}`);
  await context.setOffline(true);
  await page.reload({waitUntil:'domcontentloaded'});
  await expect.poll(()=>page.evaluate(()=>({name:Arcane.state.get().name,gold:Arcane.state.get().gold,build:ARCANE_BUILD}))).toEqual({name:'Offlineheld',gold:321,build});
  await expect(page.locator('nav.aq-footer,nav.tabs')).toBeVisible();
  expect(errors).toEqual([]);
});

test('installing the current build removes obsolete build caches',async({page})=>{
  await page.goto('/');
  await clearPwa(page);
  await page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.register('./sw.js?build=v0.15.20',{scope:'./',updateViaCache:'none'});
    await new Promise((resolve,reject)=>{
      const timeout=setTimeout(()=>reject(new Error('old service worker activation timed out')),10_000);
      const check=()=>{if(registration.active){clearTimeout(timeout);resolve()}else setTimeout(check,50)};
      check();
    });
  });
  await expect.poll(()=>page.evaluate(()=>caches.keys())).toContain('arcane-quest-shell-v0.15.20');
  await page.reload();
  const build=await page.evaluate(()=>window.ARCANE_BUILD);
  await expect.poll(async()=>{
    const names=await page.evaluate(()=>caches.keys());
    return{current:names.includes(`arcane-quest-shell-${build}`),old:names.includes('arcane-quest-shell-v0.15.20')};
  },{timeout:15_000}).toEqual({current:true,old:false});
});
