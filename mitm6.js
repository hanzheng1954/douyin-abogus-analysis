// MITM v6: 抓 bdms.init 的真实参数
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
const raw = fs.readFileSync('/home/exedev/gan/douyin-re/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');
const p = 'init:function(){return hr}';
const r = 'init:function(){return function(){try{console.log("BDMSINIT",JSON.stringify(Array.prototype.slice.call(arguments).map(function(a){if(typeof a==="string")return a.slice(0,500);try{return JSON.stringify(a).slice(0,800);}catch(e){return String(a).slice(0,200);}})));}catch(_e){}return hr.apply(this,arguments);}}';
if (!raw.includes(p)) { console.log('MISSING'); process.exit(1); }
const patched = raw.replace(p, r);
(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => { if (m.text().startsWith('BDMSINIT')) logs.push(m.text()); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: patched }));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(8000);
  for (let i = 0; i < 3; i++) { await page.mouse.wheel(0, 2500).catch(() => {}); await page.waitForTimeout(2000); }
  fs.writeFileSync('/home/exedev/gan/douyin-re/mitm6_log.txt', logs.join('\n'));
  console.log('BDMSINIT count:', logs.length);
  for (const l of logs.slice(0, 4)) console.log(l.slice(0, 1200));
  await browser.close();
})().catch(e => { console.error('FATAL', String(e).slice(0, 200)); process.exit(1); });
