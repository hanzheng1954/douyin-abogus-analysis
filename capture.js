// 动态抓取 harness：dump douyin.com 运行时全部脚本与请求
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const EXE = process.env.CHROME_PATH || '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const OUT = __dirname + '/capture';
fs.mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

(async () => {
  const browser = await chromium.launch({
    executablePath: EXE,
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=zh-CN'],
  });
  const context = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh', 'en'] });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    window.chrome = { runtime: {} };
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);

  const reqs = [];
  page.on('request', r => reqs.push(r.method() + ' ' + r.url()));
  page.on('response', r => { if (r.status() >= 400) reqs.push('[' + r.status() + '] ' + r.url()); });
  page.on('console', m => reqs.push('[console.' + m.type() + '] ' + m.text().slice(0, 200)));
  page.on('pageerror', e => reqs.push('[pageerror] ' + String(e).slice(0, 200)));

  await cdp.send('Debugger.enable');
  await cdp.send('Network.enable');
  const scriptParsed = [];
  cdp.on('Debugger.scriptParsed', p => scriptParsed.push(p));

  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto err:', e.message));
  await page.waitForTimeout(25000);

  let i = 0;
  const scripts = [];
  for (const p of scriptParsed) {
    try {
      const src = await cdp.send('Debugger.getScriptSource', { scriptId: p.scriptId });
      const name = String(i++).padStart(3, '0') + '_' + (p.url || 'inline').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-70) + '.js';
      fs.writeFileSync(path.join(OUT, name), src.scriptSource);
      scripts.push({ name, url: p.url || '', len: src.scriptSource.length, embedder: p.embedderName || '' });
    } catch (e) {}
  }
  fs.writeFileSync(path.join(OUT, 'requests.txt'), reqs.join('\n'));
  fs.writeFileSync(path.join(OUT, 'scripts.json'), JSON.stringify(scripts, null, 2));
  fs.writeFileSync(path.join(OUT, 'cookies.txt'), (await context.cookies()).map(c => c.name + '=' + c.value + '; domain=' + c.domain).join('\n'));
  console.log('TOTAL requests:', reqs.length, '| scripts dumped:', scripts.length);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
