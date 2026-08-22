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
      onboarding: { version: 1, completed: {}, progress: {}, dismissed: {} }
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
