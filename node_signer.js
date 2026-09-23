// Node 版 bdms 签名器：shim + 补丁加载 + 假 XHR 驱动
const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';

// ===== 浏览器 shims =====
// ⚠️ Node 21+ 的 globalThis 上 navigator / crypto / performance 是「只有 getter」的属性，
//    直接 `global.navigator = {...}` 会被静默忽略（实测 Node 24：navigator.userAgent 仍是 "Node.js/24"）。
//    因此统一用 defineProperty 安装，保证 shim 真正生效。
function installGlobal(name, value, enumerable = false) {
  try {
    Object.defineProperty(globalThis, name, { value, writable: true, configurable: true, enumerable });
  } catch (e) {
    global[name] = value;
  }
}
global.window = global;
installGlobal('navigator', { [Symbol.toStringTag]: 'Navigator', userAgent: UA, platform: 'Win32', language: 'zh-CN', languages: ['zh-CN','zh','en'], cookieEnabled: true, onLine: true, hardwareConcurrency: 8, deviceMemory: 8, maxTouchPoints: 0, vendor: 'Google Inc.', webdriver: false, sendBeacon: () => true, mediaDevices: { enumerateDevices: async () => [] }, permissions: { query: async () => ({ state: 'prompt' }) } });
global.location = { [Symbol.toStringTag]: 'Location', href: 'https://www.douyin.com/', origin: 'https://www.douyin.com', protocol: 'https:', host: 'www.douyin.com', hostname: 'www.douyin.com', pathname: '/', search: '', hash: '', port: '', assign(){}, reload(){} };
const docShim = {
  [Symbol.toStringTag]: 'HTMLDocument',
  cookie: '', title: '', referrer: '', URL: 'https://www.douyin.com/', charset: 'utf-8', readyState: 'complete', hidden: false, visibilityState: 'visible',
  createElement: (tag) => ({ tagName: (tag||'').toUpperCase(), style: {}, setAttribute(){}, getAttribute(){ return null; }, appendChild(){}, removeChild(){}, addEventListener(){}, removeEventListener(){}, getContext: () => null, width: 0, height: 0 }),
  addEventListener(){}, removeEventListener(){}, querySelector: () => null, querySelectorAll: () => [],
  documentElement: { style: {}, getAttribute(){ return null; } }, body: { style: {}, appendChild(){}, getAttribute(){ return null; } }, head: { appendChild(){} },
  createEvent: () => ({ initEvent(){} }),
};
global.document = docShim;
installGlobal('performance', { [Symbol.toStringTag]: 'Performance', now: () => Date.now(), timing: { navigationStart: 0 }, getEntriesByType: () => [], mark(){}, measure(){} });
global.screen = { [Symbol.toStringTag]: 'Screen', width: 1440, height: 900, availWidth: 1440, availHeight: 900, colorDepth: 24, pixelDepth: 24, orientation: { angle: 0, type: 'landscape-primary' } };
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){}, clear(){}, key(){ return null; } };
global.sessionStorage = { getItem(){ return null; }, setItem(){}, removeItem(){}, clear(){} };
global.addEventListener = () => {}; global.removeEventListener = () => {};
global.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} });
global.getComputedStyle = () => ({ getPropertyValue(){ return ''; } });
global.MutationObserver = class { observe(){} disconnect(){} takeRecords(){ return []; } };
global.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
global.history = { [Symbol.toStringTag]: 'History', pushState(){}, replaceState(){}, state: null, length: 1 };
global.WebSocket = class { constructor(){} send(){} close(){} addEventListener(){} };
global.Notification = class { static requestPermission(){ return Promise.resolve('denied'); } static permission = 'denied'; };
global.indexedDB = { open(){ return { onsuccess: null, onerror: null, onupgradeneeded: null, result: null, error: null }; } };
global.Event = class { constructor(t){ this.type = t; } };
global.CustomEvent = class extends Event {};
global.Blob = class { constructor(parts, opts){ this.parts = parts; this.type = opts && opts.type; } };
global.FormData = class { append(){} };
global.Worker = class {};
installGlobal('crypto', global.crypto || { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } });

// 假 XHR：记录 bdms 对它的修改
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

// ===== 加载 patched bdms（含 VM 表 dump 补丁）=====
let src = fs.readFileSync(__dirname + '/bdms_patched.js', 'utf-8');
// 操作码0调用失败日志
src = src.replace('var m=n.apply(d,e);', 'var m;try{m=n.apply(d,e);}catch(_xe){console.log("OPCALL0FAIL",typeof n,n&&n.name,_xe.message);throw _xe;}');
fs.writeFileSync(__dirname + '/bdms_node.js', src);

// ===== 伪装 Error.stack：bdms 会用 new Error().stack 检测 Node（程序 704）=====
// 注意：V8 里 stack 是每个 Error **实例自带**的属性（Error.prototype 上没有），
//      所以必须替换 Error 构造器本身，光改 prototype 不生效（实测无效）。
// 浏览器的 stack 不含 localhost/IP/`Module._compile` 这些帧，这里给出浏览器形态的文本。
(function () {
  const RealError = Error;
  function BrowserError(...args) {
    const e = new RealError(...args);
    Object.defineProperty(e, 'stack', {
      value: 'Error\n    at https://www.douyin.com/aweme/v1/web/aweme/detail/:1:1',
      writable: true, configurable: true, enumerable: false,
    });
    return e;
  }
  BrowserError.prototype = RealError.prototype;
  BrowserError.captureStackTrace = undefined;
  BrowserError.prepareStackTrace = undefined;
  try { Object.defineProperty(globalThis, 'Error', { value: BrowserError, writable: true, configurable: true }); }
  catch (e) { globalThis.Error = BrowserError; }
})();

try { eval(src); } catch (e) { console.log('LOAD ERR:', String(e).slice(0, 300)); }
console.log('bdms:', !!global.window.bdms, '| z:', Array.isArray(global.__z) ? global.__z.length : 'none');

// ===== 伪装成浏览器：隐藏 Node 专有全局 =====
// bdms 的 VM 程序 742 会检测 Node 运行环境（typeof global / process、process.title === 'node'），
// 命中后环境校验和变成 Node 的 55，而真实浏览器是 39（实测两侧因此差 16 个字符）。
// 放在文件末尾执行，避免影响上面的 `global.xxx = ...` shim 赋值。
// 需要保留 Node 全局（例如自写脚本要用 process）时设 DSH_KEEP_NODE_GLOBALS=1。
if (process.env.DSH_KEEP_NODE_GLOBALS !== '1') {
  for (const _hidden of ['global', 'process']) {
    try { Object.defineProperty(globalThis, _hidden, { value: undefined, writable: true, configurable: true }); } catch (e) {}
  }
}
