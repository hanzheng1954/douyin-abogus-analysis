// abogus_probe.js — 探测 harness：与 node_signer.js 同款 shims，但把 bdms 的
// VM 入口 X() 包一层日志，导出「程序调用序列 + 参数/返回值 + Math.random 取值」。
// 只读 bdms_patched.js（原文件不改），运行时字符串注入后 eval。
// 用法: node abogus_probe.js [--trace-ops=132,0,103,107]
const fs = require('fs');
// Node 21+ 的 navigator/crypto/performance 是 getter-only 全局，直接赋值会被静默忽略
function installGlobal(name, value) {
  try { Object.defineProperty(globalThis, name, { value, writable: true, configurable: true, enumerable: false }); }
  catch (e) { global[name] = value; }
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

// ===== 固定熵（与 rerun_sign.js 完全一致）=====
let seed = 12345;
const RAW_RANDOM = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
Math.random = RAW_RANDOM;
const T = 1788091256878;
const RealDate = Date;
global.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } };
installGlobal('crypto', { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } });

// ===== 浏览器 shims（与 node_signer.js 逐项一致）=====
global.window = global;
installGlobal('navigator', { userAgent: UA, platform: 'Win32', language: 'zh-CN', languages: ['zh-CN','zh','en'], cookieEnabled: true, onLine: true, hardwareConcurrency: 8, deviceMemory: 8, maxTouchPoints: 0, vendor: 'Google Inc.', webdriver: false, sendBeacon: () => true, mediaDevices: { enumerateDevices: async () => [] }, permissions: { query: async () => ({ state: 'prompt' }) } });
global.location = { href: 'https://www.douyin.com/', origin: 'https://www.douyin.com', protocol: 'https:', host: 'www.douyin.com', hostname: 'www.douyin.com', pathname: '/', search: '', hash: '', port: '', assign(){}, reload(){} };
global.document = {
  cookie: '', title: '', referrer: '', URL: 'https://www.douyin.com/', charset: 'utf-8', readyState: 'complete', hidden: false, visibilityState: 'visible',
  createElement: (tag) => ({ tagName: (tag||'').toUpperCase(), style: {}, setAttribute(){}, getAttribute(){ return null; }, appendChild(){}, removeChild(){}, addEventListener(){}, removeEventListener(){}, getContext: () => null, width: 0, height: 0 }),
  addEventListener(){}, removeEventListener(){}, querySelector: () => null, querySelectorAll: () => [],
  documentElement: { style: {}, getAttribute(){ return null; } }, body: { style: {}, appendChild(){}, getAttribute(){ return null; } }, head: { appendChild(){} },
  createEvent: () => ({ initEvent(){} }),
};
installGlobal('performance', { now: () => Date.now(), timing: { navigationStart: 0 }, getEntriesByType: () => [], mark(){}, measure(){} });
global.screen = { width: 1440, height: 900, availWidth: 1440, availHeight: 900, colorDepth: 24, pixelDepth: 24, orientation: { angle: 0, type: 'landscape-primary' } };
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){}, clear(){}, key(){ return null; } };
global.sessionStorage = { getItem(){ return null; }, setItem(){}, removeItem(){}, clear(){} };
global.addEventListener = () => {}; global.removeEventListener = () => {};
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} });
global.getComputedStyle = () => ({ getPropertyValue(){ return ''; } });
global.MutationObserver = class { observe(){} disconnect(){} takeRecords(){ return []; } };
global.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
global.history = { pushState(){}, replaceState(){}, state: null, length: 1 };
global.WebSocket = class { constructor(){} send(){} close(){} addEventListener(){} };
global.Notification = class { static requestPermission(){ return Promise.resolve('denied'); } static permission = 'denied'; };
global.indexedDB = { open(){ return { onsuccess: null, onerror: null, onupgradeneeded: null, result: null, error: null }; } };
global.Event = class { constructor(t){ this.type = t; } };
global.CustomEvent = class extends Event {};
global.Blob = class { constructor(parts, opts){ this.parts = parts; this.type = opts && opts.type; } };
global.FormData = class { append(){} };
global.Worker = class {};
class FakeXHR {
  constructor() { this._url = ''; this._method = 'GET'; this._headers = {}; this.readyState = 0; this._status = 0; this.responseText = ''; this.onreadystatechange = null; this.onload = null; this.onerror = null; this.upload = {}; }
  open(method, url, async = true) { this._method = String(method).toUpperCase(); this._url = String(url); this._async = async; }
  setRequestHeader(k, v) { this._headers[String(k)] = String(v); }
  send(body) { this._body = body; this.readyState = 4; this._status = 200; this.responseText = '{}'; if (this.onreadystatechange) this.onreadystatechange(); if (this.onload) this.onload(); }
  addEventListener(){} removeEventListener(){} overrideMimeType(){} abort(){}
  getResponseHeader(k) { return null; } getAllResponseHeaders() { return ''; }
  get status() { return 200; }
}
global.XMLHttpRequest = FakeXHR;
global.Request = class { constructor(url, init){ this.url = url; } };
global.Headers = class { append(){} set(){} get(){ return null; } };
global.fetch = async () => ({ ok: true, status: 200, json: async () => ({}), text: async () => '' });
global.Image = class { set src(v){} };

// ===== 参数 =====
const args = process.argv.slice(2);
const traceOpsArg = args.find(a => a.startsWith('--trace-ops='));
const TRACE_OPS = new Set(traceOpsArg ? traceOpsArg.split('=')[1].split(',').filter(Boolean).map(Number) : []);
const out = [];
let depth = 0;
const rndLog = [];

// ===== __TRC：bdms_patched.js 里已经埋好 hook 点 =====
global.__TRC = {
  on: true,
  ids: TRACE_OPS,
  zE: null, zidx: null,
  _stack: [],
  cur() { return this._stack[this._stack.length - 1]; },
  enter(tid, e) {
    this._stack.push(tid);
    if (out.length < 20000) out.push(`${'  '.repeat(depth)}> ${tid} argc=${e ? e.length : 0} ${summ(e)}`);
    depth++;
  },
  exit(tid, l) { depth--; this._stack.pop(); if (out.length < 20000) out.push(`${'  '.repeat(depth)}< ${tid} => ${summ1(l)}`); },
  frame() {}, unframe() {},
  op(cur, pc, op, p, v) { out.push(`  . ${cur}:${pc} op=${op} p=${p}`); },
  call(cur, n, e, m) { out.push(`  . ${cur} native-call ${n && n.name}(${(e||[]).map(summ1).join(',')}) => ${summ1(m)}`); },
  lit(cur, val) { out.push(`  . ${cur} lit ${val}`); },
  gread(cur, s) { out.push(`  . ${cur} gread ${s}`); },
  calld(cur, pid) { out.push(`  . ${cur} D(${pid})`); },
};
function summ1(x) {
  if (x === undefined) return 'undef';
  if (x === null) return 'null';
  const t = typeof x;
  if (t === 'string') return JSON.stringify(x.length > 60 ? x.slice(0, 60) + '…' : x);
  if (t === 'number' || t === 'boolean') return String(x);
  if (t === 'function') return `[fn ${x.name || '?'}]`;
  if (Array.isArray(x)) return `[arr ${x.length}]`;
  if (x instanceof FakeXHR) return '[XHR]';
  return `[obj ${Object.keys(x).slice(0, 6).join('|')}]`;
}
function summ(e) { if (!e) return ''; const a = []; for (let i = 0; i < Math.min(e.length, 6); i++) a.push(summ1(e[i])); return a.join(' , '); }

// ===== 加载（注入 X 入口日志）=====
let src = fs.readFileSync(__dirname + '/bdms_patched.js', 'utf-8');
// 在解释器入口记录 X 调用（_tid 由 __TRC.enter 已给出，这里只记录原始 arguments 快照）
src = src.replace('function X(t, r, e, n) {', 'function X(t, r, e, n) { globalThis.__XARGS = globalThis.__XARGS || []; try { globalThis.__XARGS.push([z.indexOf(t), r, e && e.length]); if (globalThis.__XARGS.length > 5000) globalThis.__XARGS.splice(0, 2500); } catch(_) {}');
src = src.replace('globalThis.__z = z.slice();', 'globalThis.__FLAGS = z.map(function(x){return [x[1], x[2]];}); globalThis.__z = z.slice();');
try { eval(src); } catch (e) { console.log('LOAD ERR:', String(e).slice(0, 400)); }
console.log('bdms:', !!global.window.bdms, '| z:', Array.isArray(global.__z) ? global.__z.length : 'none');

global.__TRC.zE = global.__z; global.__TRC.zidx = global.__z;

// ===== 会话与签名 =====
global.document.cookie = 'ttwid=1%7C' + 'a'.repeat(43) + '; msToken=' + 'b'.repeat(107) + '; odin_tt=' + 'c'.repeat(32);
try {
  global.window.bdms.init({
    aid: 6383, pageId: 6241,
    paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire',
            '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'],
    boe: false, ddrt: 8.5, ic: 8.5,
  });
} catch (e) { console.log('init 异常:', e.message); }
console.log('init2:', !!global.window.bdms);

const QUERY = ('device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=1&version_code=170400'
  + '&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN'
  + '&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&aweme_id=7000000000000000000');

out.push('=== PRE-OPEN ===');
const xhr = new global.XMLHttpRequest();
xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + QUERY);
out.push('=== POST-OPEN ===');
xhr.send(null);
out.push('=== POST-SEND ===');
const url = xhr._url || '';
const m = url.match(/a_bogus=([^&]*)/);
console.log(out.join('\n'));
console.log('URL:', url.slice(0, 160));
if (m) console.log('A_BOGUS:', decodeURIComponent(m[1]));
console.log("XARGS count:", (global.__XARGS || []).length);
console.log("TABLECHK", JSON.stringify({l232: global.__z[232][0].length, b86: global.__z[232][0][86], b87: global.__z[232][0][87], b88: global.__z[232][0][88], b94: global.__z[232][0][94], b95: global.__z[232][0][95], l242: global.__z[242][0].length, l244: global.__z[244][0].length, eq242_244: String(global.__z[242][0])===String(global.__z[244][0])}));
console.log("FLAGS:", JSON.stringify([0,1,2,132,103,105,107,150,280,689].map(function(i){return [i, (global.__FLAGS||[])[i]];})));
console.log("FLAGS-all-strinct:", JSON.stringify((global.__FLAGS||[]).filter(function(f){return f[1]!==true;}).length));
process.exit(0);
