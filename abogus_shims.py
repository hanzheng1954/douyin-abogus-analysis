# -*- coding: utf-8 -*-
# abogus.py 第二部分：shims + 装配 + 驱动
import math

_seed = 12345
def lcg_rand():
    global _seed
    _seed = (_seed * 1103515245 + 12345) & 0x7FFFFFFF
    return _seed / 0x7FFFFFFF

FIXED_NOW = 1788091256878

class MathObj:
    def random(self): return lcg_rand()

class DateObj:
    _jsTag = 'Object'
    def now(self): return FIXED_NOW

class PerfObj:
    def now(self): return FIXED_NOW

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'

def make_globs():
    g = {}
    g['Math'] = MathObj()
    g['Date'] = DateObj()
    g['performance'] = PerfObj()
    nav = JSObject()
    nav['userAgent'] = UA; nav['platform'] = 'Win32'; nav['language'] = 'zh-CN'
    nav['languages'] = JSArray(['zh-CN', 'zh', 'en'])
    nav['cookieEnabled'] = True; nav['onLine'] = True; nav['hardwareConcurrency'] = 8
    nav['deviceMemory'] = 8; nav['maxTouchPoints'] = 0; nav['vendor'] = 'Google Inc.'
    nav['webdriver'] = False
    nav['sendBeacon'] = jsfn('sendBeacon', lambda t, a: True)
    nav['mediaDevices'] = JSObject()
    nav['permissions'] = JSObject()
    nav['userAgentData'] = JSObject()
    nav._jsTag = 'Object'
    g['navigator'] = nav
    doc = JSObject()
    doc['cookie'] = ''; doc['title'] = ''; doc['referrer'] = ''; doc['URL'] = 'https://www.douyin.com/'
    doc['charset'] = 'utf-8'; doc['readyState'] = 'complete'; doc['hidden'] = False
    doc['visibilityState'] = 'visible'
    doc['createElement'] = jsfn('createElement', lambda t, a: JSObject(style=JSObject(), width=0, height=0))
    doc['addEventListener'] = jsfn('addEventListener', lambda t, a: None)
    doc['removeEventListener'] = jsfn('removeEventListener', lambda t, a: None)
    doc['querySelector'] = jsfn('querySelector', lambda t, a: None)
    doc['querySelectorAll'] = jsfn('querySelectorAll', lambda t, a: JSArray())
    doc['documentElement'] = JSObject(style=JSObject())
    doc['body'] = JSObject(style=JSObject())
    doc['head'] = JSObject()
    doc._jsTag = 'Object'
    g['document'] = doc
    loc = JSObject()
    loc['href'] = 'https://www.douyin.com/'; loc['origin'] = 'https://www.douyin.com'
    loc['protocol'] = 'https:'; loc['host'] = 'www.douyin.com'; loc['hostname'] = 'www.douyin.com'
    loc['pathname'] = '/'; loc['search'] = ''; loc['hash'] = ''; loc['port'] = ''
    loc['assign'] = jsfn('assign', lambda t, a: None)
    loc['reload'] = jsfn('reload', lambda t, a: None)
    loc._jsTag = 'Object'
    g['location'] = loc
    hist = JSObject()
    hist['state'] = None; hist['length'] = 1
    hist['pushState'] = jsfn('pushState', lambda t, a: None)
    hist['replaceState'] = jsfn('replaceState', lambda t, a: None)
    hist._jsTag = 'Object'
    g['history'] = hist
    scr = JSObject()
    scr['width'] = 1440; scr['height'] = 900; scr['availWidth'] = 1440; scr['availHeight'] = 900
    scr['colorDepth'] = 24; scr['pixelDepth'] = 24
    scr['orientation'] = JSObject(angle=0, type='landscape-primary')
    scr._jsTag = 'Object'
    g['screen'] = scr
    g['localStorage'] = JSObject()
    g['sessionStorage'] = JSObject()
    g['indexedDB'] = JSObject()
    g['console'] = JSObject()
    g['window'] = g
    g['globalThis'] = g
    objc = JSObject()
    objc['keys'] = jsfn('keys', lambda t, a: JSArray(list(a[0].keys())))
    objc['values'] = jsfn('values', lambda t, a: JSArray(list(a[0].values())))
    objc['getOwnPropertyDescriptor'] = jsfn('gOPD', lambda t, a: JSObject(value=None, writable=True, enumerable=True, configurable=True))
    objc['defineProperty'] = jsfn('defineProperty', lambda t, a: a[0])
    objc['assign'] = jsfn('assign', lambda t, a: a[0])
    g['Object'] = objc
    objproto = JSObject()
    objproto['toString'] = jsfn('toString', lambda t, a: obj_tostring_call(a[0]))
    g['Object']['prototype'] = objproto
    strc = JSObject()
    strc['fromCharCode'] = jsfn('fromCharCode', lambda t, a: ''.join(chr(int(x) & 0xFFFF) for x in a))
    g['String'] = strc
    arrc = JSObject()
    arrc['isArray'] = jsfn('isArray', lambda t, a: isinstance(a[0], JSArray))
    g['Array'] = arrc
    g['Array']['prototype'] = JSObject()
    for k, f in ARR_PROTO.items(): g['Array']['prototype'][k] = f
    g['RegExp'] = jsfn('RegExp', lambda t, a: JSRegex(str(a[0]), str(a[1]) if len(a) > 1 else ''))
    g['URL'] = jsfn('URL', lambda t, a: JSURL(a[0], a[1] if len(a) > 1 else None))
    g['Error'] = jsfn('Error', lambda t, a: Exception(str(a[0])))
    g['XMLHttpRequest'] = JSFunction('XMLHttpRequest', lambda t, a: FakeXHR())
    g['Image'] = JSFunction('Image', lambda t, a: JSObject())
    g['crypto'] = JSObject()
    g['crypto']['getRandomValues'] = jsfn('getRandomValues', lambda t, a: _crypto_fill(a[0]))
    g['WebSocket'] = JSFunction('WebSocket', lambda t, a: JSObject())
    g['TypeError'] = JSFunction('TypeError', lambda t, a: Exception('TypeError'))
    g['SyntaxError'] = JSFunction('SyntaxError', lambda t, a: Exception('SyntaxError'))
    g['ReferenceError'] = JSFunction('ReferenceError', lambda t, a: Exception('ReferenceError'))
    g['isNaN'] = jsfn('isNaN', lambda t, a: isinstance(a[0], float) and math.isnan(a[0]))
    g['Infinity'] = float('inf')
    g['NaN'] = float('nan')
    g['undefined'] = None
    g['JSON'] = JSObject()
    g['JSON']['parse'] = jsfn('parse', lambda t, a: a[0])
    g['JSON']['stringify'] = jsfn('stringify', lambda t, a: str(a[0]))
    g['encodeURIComponent'] = jsfn('encodeURIComponent', lambda t, a: str(a[0]))
    g['decodeURIComponent'] = jsfn('decodeURIComponent', lambda t, a: str(a[0]))
    g['String']['prototype'] = JSObject()
    for _k, _f in STR_PROTO.items(): g['String']['prototype'][_k] = _f
    g['Promise'] = JSFunction('Promise', lambda t, a: JSObject())
    g['setTimeout'] = jsfn('setTimeout', lambda t, a: 0)
    g['setInterval'] = jsfn('setInterval', lambda t, a: 0)
    g['clearTimeout'] = jsfn('clearTimeout', lambda t, a: None)
    g['clearInterval'] = jsfn('clearInterval', lambda t, a: None)
    g['atob'] = jsfn('atob', lambda t, a: str(a[0]))
    g['btoa'] = jsfn('btoa', lambda t, a: str(a[0]))
    g['queueMicrotask'] = jsfn('queueMicrotask', lambda t, a: None)
    g['MutationObserver'] = JSFunction('MutationObserver', lambda t, a: JSObject())
    g['Notification'] = JSFunction('Notification', lambda t, a: JSObject())
    g['requestAnimationFrame'] = jsfn('raf', lambda t, a: None)
    return g

def _crypto_fill(arr):
    for i in range(len(arr)): arr[i] = int(lcg_rand() * 256)
    return arr

class JSURL:
    _jsTag = 'Object'
    def __init__(self, url, base=None):
        self.href = str(url)
        qs = ''
        if '?' in self.href:
            rest = self.href.split('?', 1)[1]
            qs = rest
        path = self.href.split('?', 1)[0]
        self.pathname = path.split('//', 1)[-1].split('/', 1)[-1]
        if not self.pathname.startswith('/'): self.pathname = '/' + self.pathname
        self._sp = JSURLSearchParams(qs)
    @property
    def searchParams(self): return self._sp

class JSURLSearchParams:
    _jsTag = 'Object'
    def __init__(self, qs=''):
        self.pairs = []
        if qs:
            for part in qs.split('&'):
                if not part: continue
                if '=' in part:
                    k, v = part.split('=', 1)
                else:
                    k, v = part, ''
                self.pairs.append([k, v])
    def has(self, k): return any(p[0] == k for p in self.pairs)
    def append(self, k, v): self.pairs.append([str(k), str(v)])
    def toString(self):
        return '&'.join(p[0] + '=' + p[1] for p in self.pairs)

class FakeXHR:
    _jsTag = 'Object'
    def __init__(self):
        self._url = ''; self._method = 'GET'; self._headers = {}
        self.readyState = 0; self._status = 0; self.responseText = ''
        self.onreadystatechange = None; self.onload = None; self.onerror = None
        self.upload = JSObject()
        self.bdmsInvokeList = JSArray()
        self._body = None
    def open(self, method, url, *a):
        self._method = str(method).upper(); self._url = str(url)
    def setRequestHeader(self, k, v): self._headers[str(k)] = str(v)
    def send(self, body):
        self._body = body
        self.readyState = 4; self._status = 200; self.responseText = '{}'
        if self.onreadystatechange: self.onreadystatechange()
        if self.onload: self.onload()
    def addEventListener(self, *a): pass
    def removeEventListener(self, *a): pass
    def overrideMimeType(self, *a): pass
    def abort(self): pass
    def getResponseHeader(self, k): return None
    def getAllResponseHeaders(self): return ''
    @property
    def status(self): return self._status

def obj_tostring_call(obj):
    if obj is None: return '[object Undefined]'
    if isinstance(obj, bool): return '[object Boolean]'
    if isinstance(obj, (int, float)): return '[object Number]'
    if isinstance(obj, str): return '[object String]'
    if isinstance(obj, JSArray): return '[object Array]'
    if isinstance(obj, JSFunction): return '[object Function]'
    if isinstance(obj, SM3Engine): return '[object Object]'
    if hasattr(obj, '_jsTag'): return '[object ' + obj._jsTag + ']'
    return '[object Object]'
