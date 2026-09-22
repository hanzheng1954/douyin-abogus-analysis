// MITM v2: 补丁 D 创建与调用，观察签名程序
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = process.env.CHROME_PATH || '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const raw = fs.readFileSync(__dirname + '/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');

const p1 = 'function D(t,r){var e=z[t];';
const r1 = 'function D(t,r){var _st={};for(var _k=0;_k<24;_k++){try{_st[_k]=r[_k];}catch(_e){}}if(132===t||150===t||135===t||131===t||133===t||134===t||10===t||160===t){console.log("DIN".concat(t),JSON.stringify(_st));}var e=z[t];';
const p2 = 'var n=function(){return X(e,this,arguments,r)};';
const r2 = 'var n=function(){var _ar=[];for(var _j=0;_j<arguments.length&&_j<3;_j++){var _v=arguments[_j];_ar.push(typeof _v==="string"?_v.slice(0,200):(_v&&_v.url?_v.url.slice(0,200):typeof _v));}var _thisinfo = null; try { _thisinfo = { ctor: this && this.constructor && this.constructor.name, props: this ? Object.getOwnPropertyNames(this).slice(0,14) : null, url: this && (this._url || this.__url || this._bdms_url || (this._p && this._p.url)) }; } catch(_te) { _thisinfo = "E:" + _te.message; } console.log("DCALL".concat(t),JSON.stringify(_ar),"THIS",JSON.stringify(_thisinfo));var _rr;try{_rr=X(e,this,arguments,r);}catch(_ee){console.log("DERR".concat(t),_ee.message);throw _ee;}console.log("DRET".concat(t),"OUT",typeof _rr==="string"?_rr.slice(0,340):String(_rr).slice(0,100));return _rr;};';

if (!raw.includes(p1) || !raw.includes(p2)) { console.log('NEEDLE MISSING'); process.exit(1); }
const patched = raw.replace(p1, r1).replace(p2, r2);
console.log('patched size:', patched.length);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => { const x = m.text(); if (/^(DIN|DCALL|DRET|DERR)/.test(x)) logs.push(x); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: patched }));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(6000);
  for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 2500); await page.waitForTimeout(2000); }
  await page.waitForTimeout(3000);
  fs.writeFileSync(__dirname + '/mitm2_log.txt', logs.join('\n'));
  console.log('logs:', logs.length);
  for (const l of logs.slice(0, 14)) console.log(l.slice(0, 1400));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
