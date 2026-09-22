// 确定性基线：固定 Math.random / Date.now / performance.now 生成基准 a_bogus
const fs = require('fs');
const PROC = process;   // node_signer 会在加载后隐藏 global/process，这里先抓引用
// Node 21+ 的 crypto/performance/navigator 是「只有 getter」的全局，直接赋值会被静默忽略
function installGlobal(name, value) {
  try { Object.defineProperty(globalThis, name, { value, writable: true, configurable: true, enumerable: false }); }
  catch (e) { global[name] = value; }
}


// 固定熵源
let seed = 12345;
Math.random = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const FIXED_NOW = 1788091256878;
Date.now = function () { return FIXED_NOW; };
const RealDate = Date;
Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : [FIXED_NOW])); } static now() { return FIXED_NOW; } };
installGlobal('performance', { now: () => FIXED_NOW, timing: { navigationStart: 0 } });

installGlobal('crypto', { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } });
require(__dirname + '/node_signer.js');

// session.json 含真实 cookie 与签名样本，按 .gitignore 约定不入库（见 README「复现前置」）
const SESS_PATH = PROC.env.SESSION_JSON || (__dirname + '/session.json');
if (!fs.existsSync(SESS_PATH)) {
  console.error('[det_one] 缺少 session.json: ' + SESS_PATH);
  console.error('格式: {"cookies":[{"name":"ttwid","value":"..."}],"appends":[{"query":"..."}]}');
  console.error('可用环境变量 SESSION_JSON=/path/to/session.json 指定其他位置。');
  PROC.exit(2);
}
const sess = JSON.parse(fs.readFileSync(SESS_PATH, 'utf-8'));
const cookieStr = sess.cookies.map(c => c.name + '=' + c.value).join('; ');
globalThis.document.cookie = cookieStr;
try { globalThis.window.bdms.init({ aid: 6383, pageId: 6241, paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire', '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'], boe: false, ddrt: 8.5, ic: 8.5 }); } catch (e) {}

const sample = sess.appends[0];
const xhr = new globalThis.XMLHttpRequest();
xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/social/count?' + sample.query);
xhr.send(null);
const bogus = decodeURIComponent(xhr._url.split('a_bogus=')[1].split('&')[0]);
console.log('BASELINE a_bogus:', bogus);
console.log('len:', bogus.length);
// 默认只打印，避免误覆盖仓库内的参考基线；显式 BASELINE_WRITE=1 才落盘
if (PROC.env.BASELINE_WRITE === '1') {
  fs.writeFileSync(PROC.env.BASELINE_OUT || (__dirname + '/baseline_bogus.txt'), bogus);
  console.log('已写入 baseline_bogus.txt');
} else {
  console.log('（未写盘；如需更新参考基线，设 BASELINE_WRITE=1 重跑）');
}
