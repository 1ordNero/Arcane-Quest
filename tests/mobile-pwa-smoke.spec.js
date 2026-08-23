const { test, expect } = require('@playwright/test');

const viewports = [
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 430, height: 932 }
];

async function gotoFresh(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
}

async function seedCharacter(page) {
  await page.addInitScript(() => {
    const save = {
      saveVersion: 4,
      name: 'Smoke',
      race: 'Mensch',
      gender: 'male',
      cls: 'Krieger',
      bg: 'Tavernen-Stammgast',
      screen: 'home',
      lvl: 1,
      xp: 0,
      gold: 0,
      hp: 120,
      maxHp: 120,
      al: 100,
      maxAl: 100,
      items: [],
      eq: {},
      log: [],
      skills: [],
      bank: [],
      invCap: 15,
      bankCap: 100,
      keys: 0,
      souls: 0,
      forgeDust: 0,
      essence: 0,
      legendaryEssence: 0,
      ancestorRelics: 0,
      onboarding: {
        version: 6,
        completed: { home: Date.now(), char: Date.now() },
        progress: {},
        dismissed: {}
      }
    };
    localStorage.setItem('arcaneBeta', JSON.stringify(save));
    localStorage.setItem('arcaneCharacterCreated', '1');
  });
}

test('app boots without a blank screen', async ({ page }) => {
  await gotoFresh(page);

  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('#app, #character-gate').first()).toBeVisible();

  const visibleText = (await page.locator('body').innerText()).trim();
  expect(visibleText.length).toBeGreaterThan(20);
});

for (const viewport of viewports) {
  test(`no horizontal scrollbar at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await gotoFresh(page);

    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
    expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  });
}

test('fresh start shows the character creation surface', async ({ page }) => {
  await gotoFresh(page);

  await expect(page.locator('#character-gate')).toBeVisible();
  await expect(page.locator('#character-gate button').first()).toBeVisible();
});

test('manifest and service worker entry points are present', async ({ page, request }) => {
  await gotoFresh(page);

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestHref).toBeTruthy();

  const manifest = await request.get(new URL(manifestHref, page.url()).toString());
  expect(manifest.ok()).toBeTruthy();
  const manifestJson = await manifest.json();
  expect(manifestJson.name).toBeTruthy();
  expect(manifestJson.display).toBe('standalone');
  expect(Array.isArray(manifestJson.icons)).toBeTruthy();
  expect(manifestJson.icons.length).toBeGreaterThan(0);

  const sw = await request.get(new URL('sw.js', page.url()).toString());
  expect(sw.ok()).toBeTruthy();
  await expect
    .poll(() => page.evaluate(() => Boolean('serviceWorker' in navigator)))
    .toBeTruthy();
});

test('seeded character can use footer navigation', async ({ page }) => {
  await seedCharacter(page);
  await gotoFresh(page);

  const footer = page.locator('nav.aq-footer, nav.tabs').first();
  await expect(footer).toBeVisible();

  const heroNav = page.locator('.aq-nav[data-screen="char"], button[onclick*="char"]').first();
  await expect(heroNav).toBeVisible();
  await heroNav.click();

  await expect(page.locator('main')).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.Arcane?.state?.screen?.() || null))
    .toBe('char');
});

test('seeded character survives reload without returning to character creation', async ({ page }) => {
  await gotoFresh(page);
  await page.evaluate(() => {
    const save = {
      saveVersion: 4,
      name: 'Reload Smoke',
      race: 'Mensch',
      gender: 'male',
      cls: 'Krieger',
      bg: 'Tavernen-Stammgast',
      screen: 'home',
      lvl: 3,
      xp: 80,
      gold: 25,
      hp: 120,
      maxHp: 120,
      al: 100,
      maxAl: 100,
      items: [],
      eq: {},
      log: [],
      skills: [],
      bank: [],
      invCap: 15,
      bankCap: 100,
      keys: 0,
      souls: 0,
      forgeDust: 0,
      essence: 0,
      legendaryEssence: 0,
      ancestorRelics: 0,
      onboarding: {
        version: 6,
        completed: { home: Date.now(), char: Date.now() },
        progress: {},
        dismissed: {}
      }
    };
    localStorage.setItem('arcaneBeta', JSON.stringify(save));
    localStorage.setItem('arcaneCharacterCreated', '1');
  });

  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});

  await expect(page.locator('#character-gate')).toHaveCount(0);
  await expect(page.locator('nav.aq-footer, nav.tabs').first()).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.Arcane?.state?.get?.()?.name || window.S?.name || null))
    .toBe('Reload Smoke');
});

test('corrupt primary save recovers from backup on boot', async ({ page }) => {
  await page.addInitScript(() => {
    const backup = {
      saveVersion: 4,
      name: 'Backup Smoke',
      race: 'Mensch',
      gender: 'female',
      cls: 'Magier',
      bg: 'Runenschmied-Lehrling',
      screen: 'char',
      lvl: 4,
      xp: 12,
      gold: 77,
      hp: 110,
      maxHp: 120,
      al: 88,
      maxAl: 100,
      items: [{ name: 'Backup Ring', slot: 'Ring', power: 3, rarity: 'magic' }],
      eq: {},
      log: [],
      skills: [],
      bank: [],
      invCap: 15,
      bankCap: 100,
      keys: 0,
      souls: 0,
      forgeDust: 0,
      essence: 0,
      legendaryEssence: 0,
      ancestorRelics: 0,
      onboarding: {
        version: 6,
        completed: { home: Date.now(), char: Date.now() },
        progress: {},
        dismissed: {}
      }
    };
    localStorage.setItem('arcaneBeta', '{"broken":');
    localStorage.setItem('arcaneBetaBackup', JSON.stringify(backup));
    localStorage.setItem('arcaneCharacterCreated', '1');
  });

  await gotoFresh(page);

  await expect(page.locator('#character-gate')).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => ({
      name: window.Arcane?.state?.get?.()?.name || null,
      screen: window.Arcane?.state?.screen?.() || null,
      restored: window.__ARCANE_BOOT_RECOVERY?.restored || false
    })))
    .toEqual(expect.objectContaining({
      name: 'Backup Smoke',
      screen: 'char',
      restored: true
    }));
});

test('sunken crypt reward sync creates only one real item across renders', async ({ page }) => {
  await seedCharacter(page);
  await gotoFresh(page);

  await page.evaluate(() => {
    const state = window.Arcane.state.get();
    let nextId = 1;
    window.createLoot = (kind, rarity, level) => ({
      id: `smoke-loot-${nextId++}`,
      name: `Smoke ${kind} Loot`,
      slot: 'Ring',
      rarity,
      power: level
    });
    state.items = [{ name: 'Kryptenfund', slot: 'Beute', power: 4, rarity: 'magic' }];
    state.questResult = {
      name: 'Die versunkene Krypta',
      icon: '',
      cat: 'RAUBZUG · RISIKO',
      gold: 150,
      xp: 85,
      item: 'Kryptenfund'
    };
    window.render();
  });

  await expect
    .poll(() => page.evaluate(() => Boolean(window.Arcane.state.get().questResult?._catacombEconomyV1)))
    .toBeTruthy();

  const countAfterSync = await page.evaluate(() => window.Arcane.state.get().items.length);
  expect(countAfterSync).toBeLessThanOrEqual(1);

  for (let i = 0; i < 3; i += 1) {
    await page.evaluate(() => window.render());
  }

  await expect
    .poll(() => page.evaluate(() => ({
      count: window.Arcane.state.get().items.length,
      placeholderCount: window.Arcane.state.get().items.filter(item => item.name === 'Kryptenfund').length,
      resultItem: window.Arcane.state.get().questResult?.item
    })))
    .toEqual(expect.objectContaining({
      count: countAfterSync,
      placeholderCount: 0
    }));
});

test('miniboss combat shows the class resource as a bar', async ({ page }) => {
  await seedCharacter(page);
  await gotoFresh(page);

  await page.evaluate(() => {
    const state = window.Arcane.state.get();
    state.skillSystem = {
      cls: state.cls,
      maxResource: 100,
      resource: 45,
      rotation: 0,
      loadout: []
    };
    state.autoMiniBattle = {
      name: 'Knochenwache',
      hp: 70,
      maxHp: 70,
      playerHp: 120,
      maxPlayerHp: 120,
      round: 1,
      autoLog: [],
      busy: true,
      skillStatuses: {}
    };
    state.screen = 'home';
    window.render();
  });

  await expect(page.locator('.tam4')).toBeVisible();
  await expect(page.locator('.tam4-resource')).toHaveCount(0);
  await expect(page.locator('.tam4 .acr-resource')).toBeVisible();
  await expect(page.locator('.tam4 .acr-track')).toBeVisible();
});
