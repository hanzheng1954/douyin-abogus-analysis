// douyin_4k.js —— 一条命令解析 4K/最高画质
// 用法: node douyin_4k.js <短链或长链或aweme_id>
// 输出: 源分辨率 / 各档位表 / 最高画质直链(H265优先) / 无水印直链
// 需要: node + playwright-core（浏览器抓会话）+ 本目录的 node_signer.js
// 注意: 用你自己的住宅/家用网络跑；数据中心 IP 会被风控拦截
const { chromium } = require('playwright-core');
const fs = require('fs');
const { execSync } = require('child_process');
const EXE = '/home/exedev/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

async function resolveId(input) {
  if (/^\d+$/.test(input)) return input;
  if (!/^https?:\/\//.test(input)) input = 'https://' + input;
  const out = execSync('curl -sIL -A "' + UA + '" "' + input + '"', { timeout: 30000 }).toString();
  const m = out.match(/\/video\/(\d+)/);
  if (m) return m[1];
  throw new Error('无法解析链接，请直接给 aweme_id');
}

(async () => {
  const id = await resolveId(process.argv[2]);
  console.log('aweme_id:', id);

  // 1) 抓会话（浏览器热 cookie）
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-blink-features=AutomationControlled','--no-sandbox','--disable-dev-shm-usage','--lang=zh-CN'] });
  const ctx = await browser.newContext({ userAgent: UA, locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN','zh','en'] }); Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] }); window.chrome = { runtime: {} }; });
  const page = await ctx.newPage();
  const appends = [];
  await page.addInitScript(fs.readFileSync(__dirname + '/init_hooks.js', 'utf-8'));
  await page.goto('https://www.douyin.com/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(6000);
  const trace = await page.evaluate(() => window.__trace || []);
  const cookies = await ctx.cookies();
  await browser.close();
  const cookieStr = cookies.map(c => c.name + '=' + c.value).join('; ');
  const sample = (trace.filter(x => x.k === 'USP.append')[0] || {}).query || '';
  const params = {};
  for (const part of sample.split('&')) { const i = part.indexOf('='); if (i > 0) params[part.slice(0, i)] = part.slice(i + 1); }

  // 2) Node 签名器
  require(__dirname + '/node_signer.js');
  global.document.cookie = cookieStr;
  try { global.window.bdms.init({ aid: 6383, pageId: 6241, paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire', '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'], boe: false, ddrt: 8.5, ic: 8.5 }); } catch (e) {}
  const query = 'device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN&browser_platform=Linux+x86_64&browser_name=Chrome&browser_version=138.0.0.0&browser_online=true&engine_name=Blink&engine_version=138.0.0.0&os_name=Windows&os_version=10&cpu_core_num=2&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=100&webid=' + params.webid + '&uifid=' + params.uifid + '&aweme_id=' + id;
  const xhr = new global.XMLHttpRequest();
  xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + query);
  xhr.send(null);
  const bogus = decodeURIComponent(xhr._url.split('a_bogus=')[1].split('&')[0]);

  // 3) 请求
  const url = 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + query + '&a_bogus=' + encodeURIComponent(bogus);
  execSync('curl -sS -o /tmp/d4k.json -H "User-Agent: ' + UA + '" -H "Cookie: ' + cookieStr + '" -H "Referer: https://www.douyin.com/" "' + url + '"', { timeout: 40000 });
  const j = JSON.parse(fs.readFileSync('/tmp/d4k.json', 'utf-8'));
  const a = j.aweme_detail;
  const v = a.video;
  console.log('\n标题:', a.desc);
  console.log('源分辨率:', v.width + 'x' + v.height, '| H265源:', !!v.play_addr_265, '| 时长秒:', Math.round(v.duration / 1000));
  console.log('\n=== 档位表 ===');
  for (const b of v.bit_rate) {
    const u = (b.play_addr.url_list || [])[0];
    const u265 = b.play_addr_h265 ? (b.play_addr_h265.url_list || [])[0] : null;
    const is4k = /4k/i.test(b.gear_name) || (u && /definition=2160p|definition=4k/i.test(u));
    console.log('  ' + b.gear_name.padEnd(22) + (Math.round(b.bit_rate / 1000) + 'kbps').padEnd(10) + ' H265:' + (u265 ? 'YES' : '-') + (is4k ? '  <<< 4K' : ''));
  }
  // 4) 最高画质直链
  const best = v.bit_rate.slice().sort((x, y) => y.bit_rate - x.bit_rate)[0];
  const bestUrl = (best.play_addr_h265 && best.play_addr_h265.url_list[0]) || best.play_addr.url_list[0];
  console.log('\n=== 最高画质直链 (' + best.gear_name + ') ===');
  console.log(bestUrl);
  console.log('\n=== 无水印直链 ===');
  console.log(v.download_addr.url_list[0]);
  console.log('\n注意: CDN 链接带 dy_q/ft 签名，有时效（数小时），过期重跑本脚本即可');
  process.exit(0);
})().catch(e => { console.error('失败:', e.message); process.exit(1); });
