// MITM v3: 详细记录 J(132) 状态 + URLSearchParams hook 关联输出
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = process.env.CHROME_PATH || '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const raw = fs.readFileSync(__dirname + '/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');

const pJ = 'function J(t,r,e,n){';
const rJ = 'function J(t, r, e, n) { if (132===t||150===t||131===t||135===t||133===t||10===t) { var _st={}; for (var _k=0;_k<24;_k++) { try { var _v=n[_k]; _st[_k] = _v===undefined ? "<undef>" : _v; } catch(_e) { _st[_k]="<thr:"+_e.message+">"; } } var _ar=[]; for (var _j=0;_j<e.length&&_j<3;_j++) { var _x=e[_j]; _ar.push(typeof _x==="string"?_x.slice(0,200):(_x&&_x.url?_x.url.slice(0,200):typeof _x)); } console.log("JIN2".concat(t), "ARGS", JSON.stringify(_ar), "THIS", typeof r, "STATE", JSON.stringify(_st).slice(0,4000)); }';
const pX = 'X(z[t],r,e,n)}function D(t,r){';
const rX = '(function(){var _rr;try{_rr=X(z[t],r,e,n);}catch(_ee){console.log("JERR2".concat(t),_ee.message);throw _ee;}if(132===t||150===t||131===t||135===t){console.log("JRET2".concat(t),"OUT",typeof _rr==="string"?_rr.slice(0,340):String(_rr).slice(0,100));}return _rr;})()}function D(t,r){';

if (!raw.includes(pJ) || !raw.includes(pX)) { console.log('NEEDLE MISSING', raw.includes(pJ), raw.includes(pX)); process.exit(1); }
const patched = raw.replace(pJ, rJ).replace(pX, rX);
console.log('patched size:', patched.length);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  await ctx.addInitScript(fs.readFileSync(__dirname + '/init_hooks.js', 'utf-8'));
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => { const x = m.text(); if (/^(JIN2|JRET2|JERR2)/.test(x)) logs.push(x); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: patched }));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(6000);
  for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 2500); await page.waitForTimeout(2000); }
  await page.waitForTimeout(3000);
  const appends = await page.evaluate(() => (window.__trace || []).filter(x => x.k === 'USP.append'));
  fs.writeFileSync(__dirname + '/mitm3_log.txt', logs.join('\n'));
  fs.writeFileSync(__dirname + '/mitm3_appends.json', JSON.stringify(appends, null, 2));
  console.log('J logs:', logs.length, '| appends:', appends.length);
  for (const l of logs.slice(0, 8)) console.log(l.slice(0, 1600));
  console.log('--- append sample ---');
  if (appends[0]) console.log(JSON.stringify(appends[0]).slice(0, 800));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
