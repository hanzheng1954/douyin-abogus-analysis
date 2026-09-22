// abogus_scan.js — 全局面扫描：跑一次固定熵签名，收集 VM 访问到的全局名、
// D() 包装的程序 id、字符串表读取项、字面量，用于给 Python 端补 shims。
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
let seed = 12345;
Math.random = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const T = 1788091256878;
const RealDate = Date;
global.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } };
global.crypto = { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } };
global.window = global;
global.navigator = { userAgent: UA, platform: 'Win32', language: 'zh-CN', languages: ['zh-CN','zh','en'], cookieEnabled: true, onLine: true, hardwareConcurrency: 8, deviceMemory: 8, maxTouchPoints: 0, vendor: 'Google Inc.', webdriver: false, sendBeacon: () => true, mediaDevices: { enumerateDevices: async () => [] }, permissions: { query: async () => ({ state: 'prompt' }) } };
global.location = { href: 'https://www.douyin.com/', origin: 'https://www.douyin.com', protocol: 'https:', host: 'www.douyin.com', hostname: 'www.douyin.com', pathname: '/', search: '', hash: '', port: '', assign(){}, reload(){} };
global.document = { cookie: '', title: '', referrer: '', URL: 'https://www.douyin.com/', charset: 'utf-8', readyState: 'complete', hidden: false, visibilityState: 'visible',
  createElement: (tag) => ({ tagName: (tag||'').toUpperCase(), style: {}, setAttribute(){}, getAttribute(){ return null; }, appendChild(){}, removeChild(){}, addEventListener(){}, removeEventListener(){}, getContext: () => null, width: 0, height: 0 }),
  addEventListener(){}, removeEventListener(){}, querySelector: () => null, querySelectorAll: () => [], documentElement: { style: {}, getAttribute(){ return null; } }, body: { style: {}, appendChild(){}, getAttribute(){ return null; } }, head: { appendChild(){} }, createEvent: () => ({ initEvent(){} }) };
global.performance = { now: () => Date.now(), timing: { navigationStart: 0 }, getEntriesByType: () => [], mark(){}, measure(){} };
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

const GRE = new Map();       // 全局读名 -> 次数
const CALD = new Map();      // D(pid) -> 次数
const CALD_ORDER = [];
const LITS = new Map();
const OPS = new Map();       // pid -> Set(op)
let phase = 'load';
const PHASED = new Map();    // phase|name -> 次数
function mark(p) { phase = p; }

global.__TRC = {
  on: true, ids: new Set(Array.from({ length: 796 }, (_, i) => i)), zE: null, zidx: null,
  _stack: [],
  cur() { return this._stack[this._stack.length - 1]; },
  enter(tid) { this._stack.push(tid); },
  exit() { this._stack.pop(); },
  frame() {}, unframe() {},
  op(cur, pc, op) { if (!OPS.has(cur)) OPS.set(cur, new Set()); OPS.get(cur).add(op); },
  call() {},
  lit(cur, v) { const k = typeof v + ':' + String(v).slice(0, 40); LITS.set(k, (LITS.get(k) || 0) + 1); },
  gread(cur, s) {
    const name = String(s).replace(/^[gG]\d+=/, '');
    GRE.set(name, (GRE.get(name) || 0) + 1);
    const k = phase + '|' + name;
    PHASED.set(k, (PHASED.get(k) || 0) + 1);
  },
  calld(cur, pid) { CALD.set(pid, (CALD.get(pid) || 0) + 1); if (CALD_ORDER.length < 4000) CALD_ORDER.push(phase + ':' + pid); },
};
let src = fs.readFileSync(__dirname + '/bdms_patched.js', 'utf-8');
src = src.replace('globalThis.__z = z.slice();', 'globalThis.__FLAGS = z.map(function(x){return [x[1], x[2]];}); globalThis.__z = z.slice();');
// 属性访问扫描（opcode 8 / 30）
function _tk(x){ var t = x === null ? 'null' : (x === undefined ? 'undef' : (typeof x)); if (t==='object'){ if (Array.isArray(x)) t='array'; else if (x && x.constructor) t='obj:'+(x.constructor.name||'?'); } return t; }
globalThis.__PGET = new Map();
src = src.replace(`                  } else {
                    var k = v[p--];
                    v[p] = v[p][k];
                  }`, `                  } else {
                    var k = v[p--];
                    try { globalThis.__PGET.set(_tk(v[p])+'.'+k, (globalThis.__PGET.get(_tk(v[p])+'.'+k)||0)+1); } catch(_){}
                    v[p] = v[p][k];
                  }`);
src = src.replace(`                } else if (t < 31) {
                  x = o[a++];
                  v[p] = v[p][Z[x]];
                }`, `                } else if (t < 31) {
                  x = o[a++];
                  try { globalThis.__PGET.set(_tk(v[p])+'.'+Z[x], (globalThis.__PGET.get(_tk(v[p])+'.'+Z[x])||0)+1); } catch(_){}
                  v[p] = v[p][Z[x]];
                }`);

try { eval(src); } catch (e) { console.log('LOAD ERR:', String(e).slice(0, 300)); }
global.__TRC.zE = global.__z; global.__TRC.zidx = global.__z;
mark('postload');
global.document.cookie = 'ttwid=1%7C' + 'a'.repeat(43) + '; msToken=' + 'b'.repeat(107) + '; odin_tt=' + 'c'.repeat(32);
mark('init');
try {
  global.window.bdms.init({ aid: 6383, pageId: 6241,
    paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire', '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'],
    boe: false, ddrt: 8.5, ic: 8.5 });
} catch (e) { console.log('init 异常:', e.message); }
const QUERY = ('device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=1&version_code=170400'
  + '&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN'
  + '&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&aweme_id=7000000000000000000');
mark('open');
const xhr = new global.XMLHttpRequest();
xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + QUERY);
mark('send');
xhr.send(null);
mark('done');
const url = xhr._url || '';
const m = url.match(/a_bogus=([^&]*)/);
console.log('A_BOGUS:', m ? decodeURIComponent(m[1]) : 'NONE');
console.log('\n=== GLOBAL READS (name count) ===');
console.log([...GRE.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join('\n'));
console.log('\n=== PHASE|NAME ===');
console.log([...PHASED.entries()].map(([k, v]) => `${k} ${v}`).join('\n'));
console.log('\n=== D() pid counts ===');
console.log([...CALD.entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => `${k}:${v}`).join(' '));
console.log('\n=== D() order (first 400) ===');
console.log(CALD_ORDER.slice(0, 400).join(' '));
console.log('\n=== LITERALS (top 60) ===');
console.log([...LITS.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60).map(([k, v]) => `${k} ${v}`).join('\n'));
console.log('\n=== PROPERTY ACCESS (type.key count) ===');
console.log([...globalThis.__PGET.entries()].sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} ${v}`).join('\n'));
console.log('\n=== OPS per pid (used) ===');
console.log([...OPS.entries()].map(([k, v]) => `${k}: ${[...v].sort((a, b) => a - b).join(',')}`).join('\n'));
process.exit(0);
