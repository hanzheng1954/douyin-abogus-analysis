// MITM v5: dump 程序238 状态（安全序列化，限深度）
const { chromium } = require('playwright-core');
const fs = require('fs');
const EXE = '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

const raw = fs.readFileSync('/home/exedev/gan/douyin-re/capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js', 'utf-8');
const pX = 'function X(t,r,e,n){var o,i,u,s,c,a,f,l,p=-1,v=[],h=[];';
const rX = 'function X(t,r,e,n){if(t[0].length===238&&typeof XMLHttpRequest!=="undefined"&&r instanceof XMLHttpRequest){function _sf(v,d){if(d>2)return"...";if(v===null)return"null";var ty=typeof v;if(ty==="string")return v.length>150?v.slice(0,150)+"...":v;if(ty==="number"||ty==="boolean"||ty==="undefined")return String(v);if(ty==="function")return"<fn>";if(ty==="object"){try{var ks=Object.keys(v).slice(0,12),o={};for(var i=0;i<ks.length;i++){try{o[ks[i]]=_sf(v[ks[i]],d+1);}catch(_e){}}return JSON.stringify(o);}catch(_e){return"<obj>";}}return String(v);}var _st={};for(var _sk=0;_sk<16;_sk++){try{_st[_sk]=_sf(n[_sk],0);}catch(_se){_st[_sk]="<thr>";}}console.log("XSTSEND","THIS",JSON.stringify({url:r._url,method:r._method}),"ARGS",JSON.stringify(Array.prototype.slice.call(e,0,2).map(function(x){return typeof x==="string"?x.slice(0,120):typeof x;})),"STATE",JSON.stringify(_st));}var o,i,u,s,c,a,f,l,p=-1,v=[],h=[];';
if (!raw.includes(pX)) { console.log('X NEEDLE MISSING'); process.exit(1); }
const patched = raw.replace(pX, rX);
console.log('patched:', patched.length);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  await ctx.addInitScript(fs.readFileSync('/home/exedev/gan/douyin-re/init_hooks.js', 'utf-8'));
  const page = await ctx.newPage();
  page.on('crash', () => console.log('PAGE CRASHED'));
  const logs = [];
  page.on('console', m => { const x = m.text(); if (/^XSTSEND/.test(x)) logs.push(x); });
  await page.route('**/bdms_1.0.1.19_fix.js*', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: patched }));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(6000);
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 2500).catch(() => {}); await page.waitForTimeout(2000); }
  await page.waitForTimeout(2000);
  const appends = await page.evaluate(() => (window.__trace || []).filter(x => x.k === 'USP.append')).catch(() => []);
  fs.writeFileSync('/home/exedev/gan/douyin-re/mitm5_log.txt', logs.join('\n'));
  console.log('XSTSEND logs:', logs.length, '| appends:', appends.length);
  for (const l of logs.slice(0, 2)) console.log(l.slice(0, 3000));
  await browser.close();
})().catch(e => { console.error('FATAL', String(e).slice(0, 300)); process.exit(1); });
