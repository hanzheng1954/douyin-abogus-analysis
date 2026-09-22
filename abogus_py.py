#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""abogus_py.py — 纯 Python 复现 rerun_sign.js --fixed-entropy 的 a_bogus。

流程严格镜像 node_signer.js + rerun_sign.js：
  1. 装配全局 shims（固定熵 LCG / 固定 Date / 浏览器对象）
  2. 跑 bdms 模块级引导序列（vm_boot.py，39 个 J() + 13 个别名）
  3. 调 window.bdms.init({aid,pageId,paths,boe,ddrt,ic})
  4. new XMLHttpRequest(); xhr.open(GET, url); xhr.send(null) → 读 a_bogus
用法：
  python3 abogus_py.py                # 打印 a_bogus
  python3 abogus_py.py --trace out    # 同时写调用轨迹（与 abogus_probe.js 对比）
  python3 abogus_py.py --phase        # 只跑到指定阶段
"""
import os
import sys
import math

DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, DIR)

import abogus_vm as V
from abogus_vm import (JSObj, JSArray, JSFunction, JSError, DWrapper, getprop, setprop,
                       call_fn, js_str, js_num, js_bool, to_int32, num_to_str, strict_eq,
                       MISSING, Trace)
import abogus_env as E
from vm_boot import BOOT

QUERY = ('device_platform=webapp&aid=6383&channel=channel_pc_web&pc_client_type=1&version_code=170400'
         '&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN'
         '&browser_platform=Win32&browser_name=Chrome&browser_version=138.0.0.0&aweme_id=7000000000000000000')
COOKIE = 'ttwid=1%7C' + 'a' * 43 + '; msToken=' + 'b' * 107 + '; odin_tt=' + 'c' * 32
INIT_CFG = {
    'aid': 6383.0, 'pageId': 6241.0,
    'paths': ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire',
              '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'],
    'boe': False, 'ddrt': 8.5, 'ic': 8.5,
}


class GlobalObj(JSObj):
    """window / globalThis 代理：读写落到 globs 字典。"""
    _tag = 'Window'

    def __init__(self, store):
        JSObj.__init__(self)
        self.store = store

    def own_get(self, k):
        return self.store.get(k, MISSING)

    def own_set(self, k, v):
        self.store[k] = v

    def own_keys(self):
        return list(self.store.keys())


DATE_PROTO = V.Builtin()


class JSDate(E.JSDate):
    pass


def build_env(vm):
    store = {}
    E.install_builtins(store, vm)
    proxy = GlobalObj(store)
    store['window'] = proxy
    store['globalThis'] = proxy
    store['global'] = proxy

    # ---- Math / crypto / Date / performance ----
    store['Math'] = E.JSObject_math(vm)
    store['Date'] = _make_date()
    store['performance'] = JSObj()
    store['performance'].props['now'] = JSFunction('now', lambda t, a: float(E.FIXED_NOW))
    store['performance'].props['timing'] = JSObj(props={'navigationStart': 0.0})
    store['performance'].props['mark'] = JSFunction('mark', lambda t, a: None)
    store['performance'].props['measure'] = JSFunction('measure', lambda t, a: None)
    store['performance'].props['getEntriesByType'] = JSFunction('getEntriesByType', lambda t, a: JSArray([]))
    store['crypto'] = JSObj()
    store['crypto'].props['getRandomValues'] = JSFunction('getRandomValues', lambda t, a: _crypto_fill(vm, a[0]))

    # ---- navigator ----
    nav = JSObj(tag='Navigator')
    nav.props.update({'userAgent': E.UA, 'platform': 'Win32', 'language': 'zh-CN',
                      'languages': JSArray(['zh-CN', 'zh', 'en']), 'cookieEnabled': True,
                      'onLine': True, 'hardwareConcurrency': 8.0, 'deviceMemory': 8.0,
                      'maxTouchPoints': 0.0, 'vendor': 'Google Inc.', 'webdriver': False,
                      'sendBeacon': JSFunction('sendBeacon', lambda t, a: True),
                      'mediaDevices': JSObj(), 'permissions': JSObj(), 'userAgentData': JSObj()})
    nav.props['mediaDevices'].props['enumerateDevices'] = JSFunction('enumerateDevices', lambda t, a: JSArray([]))
    nav.props['permissions'].props['query'] = JSFunction('query', lambda t, a: JSObj(props={'state': 'prompt'}))
    store['navigator'] = nav

    # ---- location ----
    loc = JSObj(tag='Location')
    loc.props.update({'href': 'https://www.douyin.com/', 'origin': 'https://www.douyin.com',
                      'protocol': 'https:', 'host': 'www.douyin.com', 'hostname': 'www.douyin.com',
                      'pathname': '/', 'search': '', 'hash': '', 'port': '',
                      'assign': JSFunction('assign', lambda t, a: None),
                      'reload': JSFunction('reload', lambda t, a: None),
                      'replace': JSFunction('replace', lambda t, a: None),
                      'toString': JSFunction('toString', lambda t, a: 'https://www.douyin.com/')})
    store['location'] = loc

    # ---- document ----
    doc = JSObj(tag='HTMLDocument')
    doc.props.update({'cookie': COOKIE, 'title': '', 'referrer': '', 'URL': 'https://www.douyin.com/',
                      'charset': 'utf-8', 'readyState': 'complete', 'hidden': False,
                      'visibilityState': 'visible'})
    doc.props['createElement'] = JSFunction('createElement', lambda t, a: _create_element(js_str(a[0])))
    doc.props['addEventListener'] = JSFunction('addEventListener', lambda t, a: None)
    doc.props['removeEventListener'] = JSFunction('removeEventListener', lambda t, a: None)
    doc.props['querySelector'] = JSFunction('querySelector', lambda t, a: None)
    doc.props['querySelectorAll'] = JSFunction('querySelectorAll', lambda t, a: JSArray([]))
    doc.props['createEvent'] = JSFunction('createEvent', lambda t, a: JSObj(props={'initEvent': JSFunction('initEvent', lambda t2, a2: None)}))
    doc.props['documentElement'] = JSObj(props={'style': JSObj()})
    doc.props['body'] = JSObj(props={'style': JSObj()})
    doc.props['head'] = JSObj()
    store['document'] = doc

    # ---- screen / history / storage ----
    scr = JSObj(tag='Screen')
    scr.props.update({'width': 1440.0, 'height': 900.0, 'availWidth': 1440.0, 'availHeight': 900.0,
                      'colorDepth': 24.0, 'pixelDepth': 24.0,
                      'orientation': JSObj(props={'angle': 0.0, 'type': 'landscape-primary'})})
    store['screen'] = scr
    hist = JSObj(tag='History')
    hist.props.update({'state': None, 'length': 1.0,
                       'pushState': JSFunction('pushState', lambda t, a: None),
                       'replaceState': JSFunction('replaceState', lambda t, a: None)})
    store['history'] = hist
    for nm in ('localStorage', 'sessionStorage'):
        st = JSObj(tag='Storage')
        st.props.update({'getItem': JSFunction('getItem', lambda t, a: None),
                         'setItem': JSFunction('setItem', lambda t, a: None),
                         'removeItem': JSFunction('removeItem', lambda t, a: None),
                         'clear': JSFunction('clear', lambda t, a: None),
                         'key': JSFunction('key', lambda t, a: None)})
        store[nm] = st

    # ---- 其他浏览器 API ----
    store['addEventListener'] = JSFunction('addEventListener', lambda t, a: None)
    store['removeEventListener'] = JSFunction('removeEventListener', lambda t, a: None)
    store['requestAnimationFrame'] = JSFunction('requestAnimationFrame', lambda t, a: 0.0)
    store['cancelAnimationFrame'] = JSFunction('cancelAnimationFrame', lambda t, a: None)
    store['matchMedia'] = JSFunction('matchMedia', lambda t, a: JSObj(props={'matches': False}))
    store['getComputedStyle'] = JSFunction('getComputedStyle', lambda t, a: JSObj(props={'getPropertyValue': JSFunction('getPropertyValue', lambda t2, a2: '')}))
    store['MutationObserver'] = JSFunction('MutationObserver', lambda t, a: JSObj(props={'observe': JSFunction('observe', lambda t2, a2: None)}))
    store['IntersectionObserver'] = JSFunction('IntersectionObserver', lambda t, a: JSObj(props={'observe': JSFunction('observe', lambda t2, a2: None)}))
    store['WebSocket'] = JSFunction('WebSocket', lambda t, a: JSObj())
    store['Notification'] = JSFunction('Notification', lambda t, a: JSObj())
    store['indexedDB'] = JSObj(props={'open': JSFunction('open', lambda t, a: JSObj())})
    store['Blob'] = JSFunction('Blob', lambda t, a: JSObj())
    store['FormData'] = JSFunction('FormData', lambda t, a: JSObj())
    store['Worker'] = JSFunction('Worker', lambda t, a: JSObj())
    store['Event'] = JSFunction('Event', lambda t, a: JSObj(props={'type': a[0] if a else ''}))
    store['Image'] = JSFunction('Image', lambda t, a: JSObj())
    store['EventSource'] = JSFunction('EventSource', lambda t, a: JSObj())
    store['setTimeout'] = JSFunction('setTimeout', lambda t, a: 0.0)
    store['setInterval'] = JSFunction('setInterval', lambda t, a: 0.0)
    store['clearTimeout'] = JSFunction('clearTimeout', lambda t, a: None)
    store['clearInterval'] = JSFunction('clearInterval', lambda t, a: None)
    store['queueMicrotask'] = JSFunction('queueMicrotask', lambda t, a: None)
    store['console'] = JSObj(props={k: JSFunction(k, lambda t, a: None) for k in ('log', 'error', 'warn', 'info', 'debug', 'trace')})
    store['fetch'] = JSFunction('fetch', lambda t, a: JSObj(props={'ok': True, 'status': 200.0}))
    store['Request'] = JSFunction('Request', lambda t, a: JSObj(props={'url': a[0] if a else ''}))
    store['Headers'] = JSFunction('Headers', lambda t, a: JSObj())
    store['Response'] = JSFunction('Response', lambda t, a: JSObj())

    # ---- URL / URLSearchParams ----
    store['URL'] = JSFunction('URL', None)
    store['URL'].impl = lambda t, a: E.JSURL(js_str(a[0]), a[1] if len(a) > 1 else None)
    store['URLSearchParams'] = JSFunction('URLSearchParams', lambda t, a: E.JSURLSearchParams(js_str(a[0]) if a else ''))
    _install_url_protos(store)

    # ---- 编解码 ----
    store['encodeURIComponent'] = JSFunction('encodeURIComponent', lambda t, a: _enc_uri_component(js_str(a[0])))
    store['decodeURIComponent'] = JSFunction('decodeURIComponent', lambda t, a: _dec_uri_component(js_str(a[0])))
    store['encodeURI'] = JSFunction('encodeURI', lambda t, a: js_str(a[0]))
    store['decodeURI'] = JSFunction('decodeURI', lambda t, a: js_str(a[0]))
    store['escape'] = JSFunction('escape', lambda t, a: js_str(a[0]))
    store['unescape'] = JSFunction('unescape', lambda t, a: js_str(a[0]))
    store['atob'] = JSFunction('atob', lambda t, a: _atob(js_str(a[0])))
    store['btoa'] = JSFunction('btoa', lambda t, a: _btoa(js_str(a[0])))
    store['parseInt'] = JSFunction('parseInt', lambda t, a: _parse_int(js_str(a[0]), to_int32(a[1]) if len(a) > 1 and a[1] is not None else 0))
    store['parseFloat'] = JSFunction('parseFloat', lambda t, a: _parse_float(js_str(a[0])))
    store['isNaN'] = JSFunction('isNaN', lambda t, a: V.is_nan(js_num(a[0])))
    store['isFinite'] = JSFunction('isFinite', lambda t, a: not (V.is_nan(js_num(a[0])) or math.isinf(js_num(a[0]))))
    store['Infinity'] = float('inf')
    store['NaN'] = float('nan')
    store['undefined'] = None

    # 带原型链的 XHR
    store['XMLHttpRequest'] = _make_xhr_class()

    vm.rnd = E.RandomSource(12345)
    return store, proxy


def _install_url_protos(store):
    usp = V.Builtin()

    def append(t, a):
        t.pairs.append([js_str(a[0]), js_str(a[1])])

    def has(t, a):
        return any(p[0] == js_str(a[0]) for p in t.pairs)

    def get(t, a):
        k = js_str(a[0])
        for p in t.pairs:
            if p[0] == k:
                return p[1]
        return None

    def getall(t, a):
        k = js_str(a[0])
        return JSArray([p[1] for p in t.pairs if p[0] == k])

    def setk(t, a):
        k = js_str(a[0]); v = js_str(a[1])
        found = False
        out = []
        for p in t.pairs:
            if p[0] == k:
                if not found:
                    out.append([k, v]); found = True
            else:
                out.append(p)
        if not found:
            out.append([k, v])
        t.pairs = out

    def tostr(t, a):
        import urllib.parse as up
        return '&'.join(up.quote(p[0], safe='') + '=' + up.quote(p[1], safe='') for p in t.pairs)

    usp.props.update({'append': JSFunction('append', append), 'has': JSFunction('has', has),
                      'get': JSFunction('get', get), 'getAll': JSFunction('getAll', getall),
                      'set': JSFunction('set', setk), 'toString': JSFunction('toString', tostr),
                      'delete': JSFunction('delete', lambda t, a: None)})
    E.JSURLSearchParams.__bases__ = (JSObj,)
    _orig_usp_init = E.JSURLSearchParams.__init__

    def usp_init(self, qs=''):
        _orig_usp_init(self, qs)
        self.proto = usp
    E.JSURLSearchParams.__init__ = usp_init

    url_proto = V.Builtin()
    url_proto.props['toString'] = JSFunction('toString', lambda t, a: t._u)
    url_proto.props['toJSON'] = JSFunction('toJSON', lambda t, a: t._u)
    E.JSURL.__bases__ = (JSObj,)
    _orig_url_init = E.JSURL.__init__

    def url_init(self, href, base=None):
        _orig_url_init(self, href, base)
        self.proto = url_proto
    E.JSURL.__init__ = url_init


def _make_xhr_class():
    proto = V.Builtin()
    proto._tag = 'FakeXHR'

    def ctor(t, a):
        inst = E.FakeXHRInstance(proto)
        return inst

    def open_m(t, a):
        t.props['_method'] = js_str(a[0]).upper()
        t.props['_url'] = js_str(a[1])
        return None

    def send_m(t, a):
        t.props['_body'] = a[0] if a else None
        t.props['readyState'] = 4.0
        t.props['_status'] = 200.0
        t.props['responseText'] = '{}'
        cb = getprop(t, 'onreadystatechange')
        if isinstance(cb, (JSFunction, DWrapper)):
            call_fn(cb, t, [])
        cb = getprop(t, 'onload')
        if isinstance(cb, (JSFunction, DWrapper)):
            call_fn(cb, t, [])
        return None

    proto.props.update({
        'open': JSFunction('open', open_m),
        'send': JSFunction('send', send_m),
        'setRequestHeader': JSFunction('setRequestHeader', lambda t, a: t.props['_headers'].props.__setitem__(js_str(a[0]), js_str(a[1]))),
        'addEventListener': JSFunction('addEventListener', lambda t, a: None),
        'removeEventListener': JSFunction('removeEventListener', lambda t, a: None),
        'overrideMimeType': JSFunction('overrideMimeType', lambda t, a: None),
        'abort': JSFunction('abort', lambda t, a: None),
        'getResponseHeader': JSFunction('getResponseHeader', lambda t, a: None),
        'getAllResponseHeaders': JSFunction('getAllResponseHeaders', lambda t, a: ''),
    })
    cls = JSFunction('XMLHttpRequest', ctor)
    cls.props['prototype'] = proto
    proto.props['constructor'] = cls
    return cls


def _make_date():
    def ctor(t, a):
        if not a:
            return E.JSDate(float(E.FIXED_NOW))
        if isinstance(a[0], str):
            return E.JSDate(float(E.FIXED_NOW))
        return E.JSDate(js_num(a[0]))
    c = JSFunction('Date', ctor)
    DATE_PROTO.props.update({
        'getTime': JSFunction('getTime', lambda t, a: float(t.t)),
        'valueOf': JSFunction('valueOf', lambda t, a: float(t.t)),
        'toString': JSFunction('toString', lambda t, a: 'Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)'),
        'toISOString': JSFunction('toISOString', lambda t, a: '1970-01-01T00:00:00.000Z'),
        'getFullYear': JSFunction('getFullYear', lambda t, a: 1970.0),
        'getMonth': JSFunction('getMonth', lambda t, a: 0.0),
        'getDate': JSFunction('getDate', lambda t, a: 1.0),
    })
    c.props['prototype'] = DATE_PROTO
    c.props['now'] = JSFunction('now', lambda t, a: float(E.FIXED_NOW))
    c.props['parse'] = JSFunction('parse', lambda t, a: float(E.FIXED_NOW))
    E.JSDate.proto_cls = DATE_PROTO
    _orig = E.JSDate.__init__

    def init(self, t):
        _orig(self, t)
        self.proto = DATE_PROTO
    E.JSDate.__init__ = init
    return c


def _crypto_fill(vm, arr):
    n = len(arr.items) if isinstance(arr, JSArray) else 0
    for i in range(n):
        arr.items[i] = float(int(math.floor(vm.rnd.random() * 256)))
    return arr


def _create_element(tag):
    o = JSObj(tag='HTMLElement')
    o.props.update({'tagName': tag.upper(), 'style': JSObj(), 'width': 0.0, 'height': 0.0,
                    'setAttribute': JSFunction('setAttribute', lambda t, a: None),
                    'getAttribute': JSFunction('getAttribute', lambda t, a: None),
                    'appendChild': JSFunction('appendChild', lambda t, a: a[0] if a else None),
                    'removeChild': JSFunction('removeChild', lambda t, a: a[0] if a else None),
                    'addEventListener': JSFunction('addEventListener', lambda t, a: None),
                    'removeEventListener': JSFunction('removeEventListener', lambda t, a: None),
                    'getContext': JSFunction('getContext', lambda t, a: None)})
    return o


_URI_SAFE = set('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.!~*\'()')


def _enc_uri_component(s):
    out = []
    for ch in s:
        if ch in _URI_SAFE:
            out.append(ch)
        else:
            b = ch.encode('utf-8', 'surrogatepass')
            for x in b:
                out.append('%%%02X' % x)
    return ''.join(out)


def _dec_uri_component(s):
    import urllib.parse as up
    try:
        return up.unquote(s, encoding='utf-8', errors='strict')
    except Exception:
        raise JSError('URIError', 'URI malformed')


def _atob(s):
    if s == 'ZS5t':
        return ''
    import base64
    return base64.b64decode(s + '=' * (-len(s) % 4)).decode('latin-1')


def _btoa(s):
    import base64
    return base64.b64encode(s.encode('latin-1')).decode('ascii')


def _parse_int(s, radix):
    s = s.lstrip()
    sign = 1
    if s[:1] in '+-':
        if s[0] == '-':
            sign = -1
        s = s[1:]
    if radix == 0:
        radix = 16 if s[:2].lower() == '0x' else 10
    if radix == 16 and s[:2].lower() == '0x':
        s = s[2:]
    digs = '0123456789abcdefghijklmnopqrstuvwxyz'[:radix]
    out = ''
    for ch in s.lower():
        if ch in digs:
            out += ch
        else:
            break
    return float(sign * int(out, radix)) if out else float('nan')


def _parse_float(s):
    s = s.strip()
    import re as _re
    m = _re.match(r'^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?', s)
    if not m:
        return float('nan')
    return float(m.group(0))


def run(trace_on=False, stop_phase=None, limit=None):
    vm = V.VM({})
    store, proxy = build_env(vm)
    vm.globs = store
    tr = Trace(trace_on)
    vm.trace = tr
    ns = {}
    ns['gr'] = E.SM3Class()
    ns['jr'] = _make_jr(ns)
    bdms_mod = JSObj()
    bdms_mod.props['getReferer'] = JSFunction('Or', lambda t, a: '')
    store['bdms'] = bdms_mod
    store['__ac_referer'] = None

    for entry in BOOT:
        if entry[0] == 'alias':
            ns[entry[1]] = ns.get(entry[2])
        else:
            spec = {str(slot): (kind, name) for slot, kind, name in entry[2]}
            st = V.StateObj(ns, spec)
            vm.X(entry[1], None, [], st)
    if stop_phase == 'boot':
        return {'trace': tr, 'ns': ns, 'vm': vm, 'store': store}

    hr = ns.get('hr')
    cfg = JSObj()
    for k, v in INIT_CFG.items():
        cfg.props[k] = JSArray(list(v)) if isinstance(v, list) else v
    bdms_mod.props['init'] = hr
    if not isinstance(hr, (JSFunction, DWrapper)):
        raise SystemExit('hr 不是函数：%r' % (hr,))
    call_fn(hr, bdms_mod, [cfg])
    if stop_phase == 'init':
        return {'trace': tr, 'ns': ns, 'vm': vm, 'store': store, 'cfg': cfg}

    xhr = construct_xhr(store)
    m = getprop(xhr, 'open')
    call_fn(m, xhr, ['GET', 'https://www.douyin.com/aweme/v1/web/aweme/detail/?' + QUERY])
    if stop_phase == 'open':
        return {'trace': tr, 'ns': ns, 'vm': vm, 'store': store, 'xhr': xhr}
    m = getprop(xhr, 'send')
    call_fn(m, xhr, [None])
    url = xhr.props.get('_url', '')
    bogus = None
    if 'a_bogus=' in url:
        bogus = url.split('a_bogus=', 1)[1].split('&', 1)[0]
    return {'trace': tr, 'ns': ns, 'vm': vm, 'store': store, 'xhr': xhr, 'url': url, 'bogus': bogus}


def construct_xhr(store):
    cls = store['XMLHttpRequest']
    proto = getprop(cls, 'prototype')
    return E.FakeXHRInstance(proto)


def _make_jr(ns):
    def jr(this, a):
        thr = js_num(a[0]) if a else 0.001
        payload = a[1] if len(a) > 1 else None
        vr = ns.get('vr')
        if not isinstance(vr, JSObj):
            raise JSError('TypeError', "Cannot read properties of undefined (reading 'slU')")
        e = 'https://mon.zijieapi.com'
        sl = getprop(vr, 'slU')
        if js_bool(sl):
            e = js_str(sl)
        if ns.get('__rnd__') is None:
            pass
        return None
    return JSFunction('jr', jr)


def main():
    args = sys.argv[1:]
    trace_on = '--trace' in args
    stop = None
    for i, x in enumerate(args):
        if x == '--stop' and i + 1 < len(args):
            stop = args[i + 1]
    r = run(trace_on=trace_on, stop_phase=stop)
    if trace_on:
        tf = os.path.join(DIR, 'py_trace.txt')
        open(tf, 'w', encoding='utf-8').write('\n'.join(r['trace'].lines))
        print('trace →', tf, len(r['trace'].lines), 'lines', file=sys.stderr)
    if 'bogus' in r:
        print('URL:', r['url'][:160])
        print('A_BOGUS:', r['bogus'])
        print('len:', len(r['bogus']) if r['bogus'] else 0)


if __name__ == '__main__':
    main()
