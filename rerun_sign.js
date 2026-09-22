// 重跑签名：用 node_signer.js 直接产出 a_bogus，验证长度/字符集/非确定性
// 用法: node rerun_sign.js [--fixed-entropy]
const path = require('path');
// Node 21+ 的 crypto/performance/navigator 是「只有 getter」的全局，直接赋值会被静默忽略
function installGlobal(name, value) {
  try { Object.defineProperty(globalThis, name, { value, writable: true, configurable: true, enumerable: false }); }
  catch (e) { global[name] = value; }
}

const FIXED = process.argv.includes('--fixed-entropy');

if (FIXED) {
  let seed = 12345;
  Math.random = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const T = 1788091256878;
  const RealDate = Date;
  global.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } };
  installGlobal('crypto', { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } });
}

require(path.join(__dirname, 'node_signer.js'));

// 合成会话：仓库不带真实 session.json（含 cookie），这里只验证「能产出 + 形态」
// 可用 DJ_COOKIE=<cookie 串> 注入自备会话，做敏感度实验
global.document.cookie = process.env.DJ_COOKIE !== undefined
  ? process.env.DJ_COOKIE
  : 'ttwid=1%7C' + 'a'.repeat(43) + '; msToken=' + 'b'.repeat(107) + '; odin_tt=' + 'c'.repeat(32);
try {
  global.window.bdms.init({
    aid: 6383, pageId: 6241,
    paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire',
            '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'],
    boe: false, ddrt: 8.5, ic: 8.5,
  });
} catch (e) { console.log('init 异常:', e.message); }

const QUERY = ('device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=1&version_code=170400'
  + '&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN'
  + '&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&aweme_id=7000000000000000000')
  + (process.env.DJ_QUERY_EXTRA || '');

function gen(tag) {
  const xhr = new global.XMLHttpRequest();
  xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + QUERY);
  xhr.send(null);
  const url = xhr._url || '';
  const m = url.match(/a_bogus=([^&]*)/);
  if (!m) { console.log(`[${tag}] 未追加 a_bogus | url=${url.slice(0, 120)}`); return null; }
  const v = decodeURIComponent(m[1]);
  console.log(`[${tag}] a_bogus len=${v.length} 形态=${/^[A-Za-z0-9+/\-_=]+$/.test(v) ? 'base64-ish' : '其他'} 前缀=${v.slice(0, 24)}…`);
  if (process.argv.includes('--full')) console.log(`[${tag}] full=${v}`);
  return v;
}

const a = gen(FIXED ? '固定熵#1' : '随机熵#1');
const b = gen(FIXED ? '固定熵#2' : '随机熵#2');
if (a && b) console.log(FIXED ? (a === b ? '固定熵下两次一致 ✅（进程内可复现）' : '固定熵下仍不同 ❌')
                             : (a !== b ? '随机熵下两次不同 ✅（符合非确定性结论）' : '随机熵下两次相同（可疑）'));
process.exit(0);
