// MITM v4: X 解释器入口日志，找 this=XHR 的签名调用
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const raw = fs.readFileSync('/home/exedev/gan/douyin-re/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');

const pX = 'function X(t,r,e,n){var o,i,u,s,c,a,f,l,p=-1,v=[],h=[];';
const rX = 'function X(t,r,e,n){var _ti=null;try{_ti={ctor:r&&r.constructor&&r.constructor.name,isXhr:typeof XMLHttpRequest!=="undefined"&&r instanceof XMLHttpRequest,props:r?Object.getOwnPropertyNames(r).slice(0,16):null};}catch(_te){_ti="E";}if(_ti&&_ti.isXhr){console.log("XHRX",t[0].length,JSON.stringify(_ti),JSON.stringify(Array.prototype.slice.call(e,0,2).map(function(x){return typeof x==="string"?x.slice(0,120):typeof x;})));}var o,i,u,s,c,a,f,l,p=-1,v=[],h=[];';
if (!raw.includes(pX)) { console.log('X NEEDLE MISSING'); process.exit(1); }
const patched = raw.replace(pX, rX);
console.log('patched:', patched.length);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  await ctx.addInitScript(fs.readFileSync('/home/exedev/gan/douyin-re/init_hooks.js', 'utf-8'));
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => { const x = m.text(); if (/^XHRX/.test(x)) logs.push(x); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: patched }));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(6000);
  for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 2500); await page.waitForTimeout(2000); }
  await page.waitForTimeout(3000);
  const appends = await page.evaluate(() => (window.__trace || []).filter(x => x.k === 'USP.append'));
  fs.writeFileSync('/home/exedev/gan/douyin-re/mitm4_log.txt', logs.join('\n'));
  console.log('XHRX logs:', logs.length, '| appends:', appends.length);
  for (const l of logs.slice(0, 6)) console.log(l.slice(0, 500));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
