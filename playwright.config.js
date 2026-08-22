const {defineConfig,devices}=require('@playwright/test');

module.exports=defineConfig({
  testDir:'./tests/e2e',
  timeout:30_000,
  expect:{timeout:7_000},
  fullyParallel:false,
  workers:1,
  retries:process.env.CI?1:0,
  reporter:process.env.CI?'line':'list',
  use:{
    baseURL:'http://127.0.0.1:4173',
    serviceWorkers:'block',
    trace:'retain-on-failure'
  },
  projects:[
    {name:'mobile-chromium',testIgnore:/pwa-release\.spec\.js/,use:{...devices['Pixel 7']}},
    {name:'mobile-webkit',testIgnore:/pwa-release\.spec\.js/,use:{...devices['iPhone 13']}},
    {name:'pwa-chromium',testMatch:/pwa-release\.spec\.js/,use:{...devices['Pixel 7'],serviceWorkers:'allow'}}
  ],
  webServer:{
    command:'node tools/static-server.cjs',
    url:'http://127.0.0.1:4173',
    reuseExistingServer:!process.env.CI,
    timeout:15_000
  }
});
