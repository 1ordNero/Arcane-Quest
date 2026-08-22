const {test,expect}=require('@playwright/test');

const baseState={
  screen:'home',name:'Releaseheld',race:'Mensch',gender:'female',cls:'Krieger',bg:'Runenschmied-Lehrling',
  lvl:10,xp:0,gold:120,al:100,maxAl:100,hp:220,maxHp:220,str:18,agi:14,int:10,
  items:[{id:'starter',name:'Rostiges Schwert',slot:'Haupthand',power:4,rarity:'common'}],eq:{},bank:[],
  invCap:15,bankCap:100,forgeDust:0,essence:0,legendaryEssence:0,ancestorRelics:0,souls:0,keys:1,
  quests:0,wins:0,arena:0,skills:['Hieb','Schildwall','Mächtiger Schlag'],combat:null,log:[]
};

function monitor(page){
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  return errors;
}

async function seed(page,overrides={}){
  await page.goto('/?fresh=1');
  await page.waitForURL(url=>!url.searchParams.has('fresh'));
  await expect(page.locator('#character-gate')).toBeVisible();
  await page.evaluate(state=>{
    localStorage.clear();
    localStorage.setItem('arcaneBeta',JSON.stringify(state));
    localStorage.setItem('arcaneCharacterCreated','1');
  },{...baseState,...overrides});
  await page.goto('/');
  await expect.poll(()=>page.evaluate(()=>window.ARCANE_BUILD)).toBe('v0.15.23');
  await expect(page.locator('#character-gate')).toHaveCount(0);
}

test('fresh install creates and restores a supported hero',async({page})=>{
  const errors=monitor(page);
  await page.goto('/?fresh=1');
  await page.waitForURL(url=>!url.searchParams.has('fresh'));
  await expect(page.locator('#character-gate')).toBeVisible();
  await page.locator('.cg-actions button').last().click();
  await page.getByRole('button',{name:/Magier/}).click();
  await page.locator('.cg-actions button').last().click();
  await page.locator('.cg-input').fill('Lyra');
  await page.locator('.cg-actions button').last().click();
  await page.getByRole('button',{name:/Gefallener Adeliger/}).click();
  await page.locator('.cg-actions button').last().click();
  await Promise.all([
    page.waitForNavigation({waitUntil:'domcontentloaded'}),
    page.getByRole('button',{name:'Charakter bestätigen'}).click()
  ]);
  await expect(page.locator('#character-gate')).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>({name:Arcane.state.get().name,cls:Arcane.state.get().cls,bg:Arcane.state.get().bg}))).toEqual({name:'Lyra',cls:'Magier',bg:'Gefallener Adeliger'});
  expect(errors).toEqual([]);
});

test('quest costs and rewards are applied exactly once',async({page})=>{
  const errors=monitor(page);
  await seed(page);
  await page.evaluate(()=>qStart('raid'));
  await expect.poll(()=>page.evaluate(()=>Arcane.state.get().al)).toBe(88);
  await expect.poll(()=>page.evaluate(()=>!!Arcane.state.get().quest)).toBe(true);
  await page.evaluate(()=>Arcane.quests.finish());
  const once=await page.evaluate(()=>{const s=Arcane.state.get();return{gold:s.gold,xp:s.xp,quests:s.quests,active:!!s.quest}});
  expect(once.quests).toBe(1);
  expect(once.active).toBe(false);
  expect(once.gold).toBeGreaterThan(120);
  await page.evaluate(()=>Arcane.quests.finish());
  const twice=await page.evaluate(()=>{const s=Arcane.state.get();return{gold:s.gold,xp:s.xp,quests:s.quests}});
  expect(twice).toEqual({gold:once.gold,xp:once.xp,quests:once.quests});
  expect(errors).toEqual([]);
});

test('sunken crypt creates at most one real item per completion',async({page})=>{
  const errors=monitor(page);
  await page.addInitScript(()=>{Math.random=()=>0.1});
  await seed(page,{lvl:12,items:[],eq:{},invCap:15});
  await page.evaluate(()=>qStart('risk'));
  await page.evaluate(()=>Arcane.quests.finish());
  await expect.poll(()=>page.evaluate(()=>Arcane.state.get().questResult?.lootSyncVersion)).toBe(1);
  await page.waitForTimeout(300);
  const reward=await page.evaluate(()=>{
    const s=Arcane.state.get(),all=[...(s.items||[]),...Object.values(s.eq||{}).filter(Boolean)];
    return{placeholder:all.filter(item=>item?.name==='Kryptenfund').length,riskItems:all.filter(item=>item?.source==='risk').length,resultId:s.questResult?.itemId};
  });
  expect(reward.placeholder).toBe(0);
  expect(reward.riskItems).toBe(1);
  expect(reward.resultId).toBeTruthy();
  expect(errors).toEqual([]);
});

test('sunken crypt discard also removes auto-equipped quest loot',async({page})=>{
  const errors=monitor(page);
  await page.addInitScript(()=>{Math.random=()=>0.9});
  await seed(page,{lvl:12,items:[],eq:{},invCap:15});
  await page.evaluate(()=>qStart('risk'));
  await page.evaluate(()=>Arcane.quests.finish());
  await expect.poll(()=>page.evaluate(()=>Arcane.state.get().questResult?._catacombEconomyV1)).toBe(true);
  const reward=await page.evaluate(()=>{
    const s=Arcane.state.get(),all=[...(s.items||[]),...Object.values(s.eq||{}).filter(Boolean)];
    return{riskItems:all.filter(item=>item?.source==='risk').length,resultItem:s.questResult?.item||null};
  });
  expect(reward).toEqual({riskItems:0,resultItem:null});
  expect(errors).toEqual([]);
});

test('dungeon run consumes one key and survives reload',async({page})=>{
  const errors=monitor(page);
  await seed(page,{keys:1,lvl:10});
  await page.evaluate(()=>catacombSelectPath(1));
  await expect.poll(()=>page.evaluate(()=>{const s=Arcane.state.get();return{keys:s.keys,room:s.dungeonV1?.room,screen:s.screen}})).toEqual({keys:0,room:0,screen:'dungeon'});
  await page.evaluate(()=>save(true));
  await expect.poll(()=>page.evaluate(()=>{const s=ARCANE_STORAGE.read();return{keys:s.keys,room:s.dungeonV1?.room,screen:s.screen,intro:s.catacombKeyIntroGranted}})).toEqual({keys:0,room:0,screen:'dungeon',intro:true});
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>{const s=Arcane.state.get();return{keys:s.keys,room:s.dungeonV1?.room,screen:s.screen}})).toEqual({keys:0,room:0,screen:'dungeon'});
  expect(errors).toEqual([]);
});

test('interrupted arena fight does not duplicate stamina costs',async({page})=>{
  const errors=monitor(page);
  await seed(page,{lvl:10,screen:'arena',arenaStamina:5,arenaStaminaMax:5,arenaStaminaDay:new Date().toISOString().slice(0,10)});
  const opponent=await page.evaluate(()=>Arcane.state.get().arenaV2.opponents[0].id);
  await page.evaluate(id=>arenaV2Start(id),opponent);
  await expect.poll(()=>page.evaluate(()=>Arcane.state.get().arenaStamina)).toBe(4);
  await page.evaluate(()=>save(true));
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>Arcane.state.get().arenaStamina)).toBe(4);
  await expect.poll(()=>page.evaluate(()=>!!Arcane.state.get().arenaV2?.fight)).toBe(true);
  expect(errors).toEqual([]);
});

test('reincarnation resets transient progress and preserves legendary gear',async({page})=>{
  const errors=monitor(page);
  const legendary={id:'legend-1',name:'Ahnenklinge',slot:'Haupthand',power:50,rarity:'legendary'};
  await seed(page,{lvl:50,keys:4,gold:999,quests:40,wins:30,items:[legendary,{id:'rare-1',name:'Runenstab',slot:'Haupthand',power:20,rarity:'rare'}]});
  expect(await page.evaluate(()=>Arcane.reincarnation.perform())).toBe(true);
  await expect.poll(()=>page.evaluate(()=>{const s=Arcane.state.get(),all=[...(s.items||[]),...Object.values(s.eq||{})];return{lvl:s.lvl,keys:s.keys,souls:s.souls,count:s.reincarnation.count,legendary:all.some(i=>i?.id==='legend-1'),rare:all.some(i=>i?.id==='rare-1')}})).toEqual({lvl:1,keys:0,souls:16,count:1,legendary:true,rare:false});
  expect(errors).toEqual([]);
});

test('corrupt primary save recovers the valid backup',async({page})=>{
  const errors=monitor(page);
  await page.goto('/?fresh=1');
  await page.waitForURL(url=>!url.searchParams.has('fresh'));
  await page.evaluate(state=>{
    localStorage.clear();
    localStorage.setItem('arcaneBeta','{invalid-json');
    localStorage.setItem('arcaneBetaBackup',JSON.stringify({...state,name:'Geretteter Held',gold:777}));
    localStorage.setItem('arcaneCharacterCreated','1');
  },baseState);
  await page.reload();
  await expect.poll(()=>page.evaluate(()=>({name:Arcane.state.get().name,gold:Arcane.state.get().gold,recovery:window.__ARCANE_BOOT_RECOVERY}))).toEqual({name:'Geretteter Held',gold:777,recovery:{restored:true,source:'backup'}});
  expect(errors).toEqual([]);
});

test('mobile release shell stays inside the viewport',async({page})=>{
  const errors=monitor(page);
  await seed(page,{lvl:5});
  const layout=await page.evaluate(()=>{
    const nav=document.querySelector('nav.aq-footer,nav.tabs');
    const rect=nav?.getBoundingClientRect();
    return{horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,navVisible:!!rect&&rect.bottom<=innerHeight+1&&rect.top<innerHeight};
  });
  expect(layout).toEqual({horizontalOverflow:false,navVisible:true});
  expect(errors).toEqual([]);
});
