// MITM：拦截 bdms.js，注入 J 日志，观察签名程序调用
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const raw = fs.readFileSync('/home/exedev/gan/douyin-re/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');
const needle = 'X(z[t],r,e,n)}function D(t,r){';
if (!raw.includes(needle)) { console.log('NEEDLE NOT FOUND'); process.exit(1); }
const inject = `(function(){var _st={};for(var _k=0;_k<24;_k++){try{_st[_k]=n[_k];}catch(_e){}}var _ar=[];for(var _j=0;_j<e.length&&_j<4;_j++){var _v=e[_j];_ar.push(typeof _v==='string'?_v.slice(0,220):(_v&&_v.url?_v.url.slice(0,220):typeof _v));}if(150===t||132===t||131===t||135===t||10===t||133===t||134===t){console.log('JIN',t,'ARGS',JSON.stringify(_ar),'STATE',JSON.stringify(_st));}var _rr;try{_rr=X(z[t],r,e,n);}catch(_ee){console.log('JERR',t,_ee.message);throw _ee;}if(150===t||132===t||131===t||135===t||10===t||133===t||134===t){console.log('JRET',t,'OUT',typeof _rr==='string'?_rr.slice(0,340):String(_rr).slice(0,120));}return _rr;})()}function D(t,r){`;
const patched = raw.replace(needle, inject);
console.log('patched size:', patched.length);
fs.writeFileSync('/home/exedev/gan/douyin-re/bdms_mitm.js', patched);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  const page = await ctx.newPage();
  const jlogs = [];
  page.on('console', m => { const x = m.text(); if (x.startsWith('JIN') || x.startsWith('JRET') || x.startsWith('JERR')) jlogs.push(x); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => {
    route.fulfill({ status: 200, contentType: 'application/javascript', body: patched });
  });
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(6000);
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 2500); await page.waitForTimeout(2000); }
  await page.waitForTimeout(3000);
  fs.writeFileSync('/home/exedev/gan/douyin-re/mitm_log.txt', jlogs.join('\n'));
  console.log('J logs:', jlogs.length);
  const uniq = {};
  for (const l of jlogs) { const p = l.split(' ')[1]; uniq[p] = (uniq[p] || 0) + 1; }
  console.log('programs:', JSON.stringify(uniq));
  for (const l of jlogs.slice(0, 14)) console.log(l.slice(0, 1200));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
