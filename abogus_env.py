#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""abogus_env.py — 与 node_signer.js / rerun_sign.js 逐项对齐的浏览器环境 shims（纯 Python）。

固定熵：Math.random 与 crypto.getRandomValues 共用同一条 LCG（seed=12345），
Date/performance.now 固定为 T=1788091256878，与 rerun_sign.js --fixed-entropy 一致。
"""
import math
import abogus_vm as V
from abogus_vm import (JSObj, JSArray, JSFunction, Builtin, DWrapper, JSError, OBJECT_PROTO,
                       ARRAY_PROTO, STRING_PROTO, NUMBER_PROTO, BOOL_PROTO, REGEXP_PROTO, FUNC_PROTO,
                       getprop, setprop, call_fn, js_str, js_num, js_bool, to_int32,
                       num_to_str, strict_eq, loose_eq, js_typeof, js_add, MISSING, js_key)

FIXED_NOW = 1788091256878
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36')


class RandomSource(object):
    """rerun_sign.js 的 LCG：seed=(seed*1103515245+12345) & 0x7fffffff; return seed/0x7fffffff"""
    def __init__(self, seed=12345, log=None):
        self.seed = seed
        self.n = 0
        self.log = log

    def random(self):
        self.seed = (self.seed * 1103515245 + 12345) & 0x7FFFFFFF
        self.n += 1
        r = self.seed / 0x7FFFFFFF
        if self.log is not None:
            self.log.append(r)
        return r


class JSErrorObj(JSObj):
    _tag = 'Object'

    def __init__(self, kind, msg, stack=None):
        JSObj.__init__(self)
        self.kind = kind
        self.msg = msg
        self.props['name'] = kind
        self.props['message'] = msg
        self.props['stack'] = stack if stack is not None else (kind + ': ' + msg)

    def __repr__(self):
        return '<%s: %s>' % (self.kind, self.msg)


# ---------------------------------------------------------------- SM3（gr）

def _rotl32(x, n):
    x &= 0xFFFFFFFF
    n &= 31
    if n == 0:
        return x
    return ((x << n) | (x >> (32 - n))) & 0xFFFFFFFF


class SM3Engine(JSObj):
    """bdms 里的 gr 类：reg/chunk/size + reset/write/sum/_compress/_fill。"""
    _tag = 'Object'

    def __init__(self):
        JSObj.__init__(self)
        self.reg = [0] * 8
        self.chunk = []
        self.size = 0
        self.reset()

    def reset(self):
        self.reg = [1937774191, 1226093241, 388252375, 3666478592,
                    2842636476, 372324522, 3817729613, 2969243214]
        self.chunk = []
        self.size = 0

    @staticmethod
    def _str_bytes(t):
        # encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, fromCharCode("0x"+$1)) → UTF-8 字节
        return list(t.encode('utf-8'))

    def write(self, t):
        if isinstance(t, str):
            r = self._str_bytes(t)
        elif isinstance(t, JSArray):
            r = [x for x in t.items]
        else:
            r = [x for x in t]
        self.size += len(r)
        e = 64 - len(self.chunk)
        if len(r) < e:
            self.chunk = self.chunk + r
        else:
            self.chunk = self.chunk + r[:e]
            while len(self.chunk) >= 64:
                self._compress(self.chunk)
                if e < len(r):
                    self.chunk = r[e:min(e + 64, len(r))]
                else:
                    self.chunk = []
                e += 64

    def sum(self, t=None, fmt=None):
        if js_bool(t):
            self.reset()
            self.write(t)
        self._fill()
        for e in range(0, len(self.chunk), 64):
            self._compress(self.chunk[e:e + 64])
        out = None
        if fmt == 'hex':
            out = ''
            for e in range(8):
                s = '%x' % (self.reg[e] & 0xFFFFFFFF)
                out += s if len(s) >= 8 else '0' * (8 - len(s)) + s
        else:
            out = JSArray([0.0] * 32)
            for e in range(8):
                s = self.reg[e] & 0xFFFFFFFF
                out.items[e * 4 + 3] = float(s & 255)
                s >>= 8
                out.items[e * 4 + 2] = float(s & 255)
                s >>= 8
                out.items[e * 4 + 1] = float(s & 255)
                s >>= 8
                out.items[e * 4] = float(s & 255)
        self.reset()
        return out

    def _compress(self, t):
        if len(t) < 64:
            return
        W = [0] * 132
        for e in range(16):
            x = (t[e * 4] << 24) | (t[e * 4 + 1] << 16) | (t[e * 4 + 2] << 8) | t[e * 4 + 3]
            W[e] = x & 0xFFFFFFFF
        for n in range(16, 68):
            o = W[n - 16] ^ W[n - 9] ^ _rotl32(W[n - 3], 15)
            o = (o ^ _rotl32(o, 15) ^ _rotl32(o, 23)) & 0xFFFFFFFF
            W[n] = (o ^ _rotl32(W[n - 13], 7) ^ W[n - 6]) & 0xFFFFFFFF
        for n in range(64):
            W[n + 68] = (W[n] ^ W[n + 4]) & 0xFFFFFFFF
        e = list(self.reg)
        for n in range(64):
            tj = 2043430169 if n < 16 else 2055708042
            o = (_rotl32(e[0], 12) + e[4] + _rotl32(tj, n)) & 0xFFFFFFFF
            o = _rotl32(o, 7)
            i = (o ^ _rotl32(e[0], 12)) & 0xFFFFFFFF
            if n < 16:
                u = (e[0] ^ e[1] ^ e[2]) & 0xFFFFFFFF
                s = (e[4] ^ e[5] ^ e[6]) & 0xFFFFFFFF
            else:
                u = ((e[0] & e[1]) | (e[0] & e[2]) | (e[1] & e[2])) & 0xFFFFFFFF
                s = ((e[4] & e[5]) | ((~e[4]) & e[6])) & 0xFFFFFFFF
            u = (u + e[3] + i + W[n + 68]) & 0xFFFFFFFF
            s = (s + e[7] + o + W[n]) & 0xFFFFFFFF
            e[3] = e[2]
            e[2] = _rotl32(e[1], 9)
            e[1] = e[0]
            e[0] = u
            e[7] = e[6]
            e[6] = _rotl32(e[5], 19)
            e[5] = e[4]
            e[4] = (s ^ _rotl32(s, 9) ^ _rotl32(s, 17)) & 0xFFFFFFFF
        for c in range(8):
            self.reg[c] = (self.reg[c] ^ e[c]) & 0xFFFFFFFF

    def _fill(self):
        t = self.size * 8
        self.chunk.append(128)
        r = len(self.chunk) % 64
        if 64 - r < 8:
            r -= 64
        while r < 56:
            self.chunk.append(0)
            r += 1
        for e in range(4):
            n = int(math.floor(t / 4294967296.0))
            self.chunk.append((n >> ((3 - e) * 8)) & 255)
        for e in range(4):
            self.chunk.append((t >> ((3 - e) * 8)) & 255)


class SM3Class(JSFunction):
    def __init__(self):
        JSFunction.__init__(self, 't', None)
        proto = JSObj(tag='Object')
        proto.props['constructor'] = self
        proto.props['reset'] = JSFunction('reset', lambda th, a: th.reset())
        proto.props['write'] = JSFunction('write', lambda th, a: th.write(a[0]))
        proto.props['sum'] = JSFunction('sum', lambda th, a: th.sum(a[0] if a else None, a[1] if len(a) > 1 else None))
        proto.props['_compress'] = JSFunction('_compress', lambda th, a: th._compress(a[0]))
        proto.props['_fill'] = JSFunction('_fill', lambda th, a: th._fill())
        self.props['prototype'] = proto

    def call(self, this, args):
        return SM3Engine()

    def construct(self, args):
        return SM3Engine()


# ---------------------------------------------------------------- 其他原生 shim

class JSRegExp(JSObj):
    _tag = 'RegExp'

    def __init__(self, pattern, flags=''):
        JSObj.__init__(self, proto=REGEXP_PROTO, tag='RegExp')
        self.source = pattern
        self.flags = flags
        self.fre = _compile_js(pattern, flags)
        self.lastIndex = 0.0
        self.props['source'] = pattern
        self.props['global'] = 'g' in flags
        self.props['ignoreCase'] = 'i' in flags
        self.props['lastIndex'] = 0.0


def _compile_js(pattern, flags):
    import re
    p = pattern
    f = 0
    if 'i' in flags:
        f |= re.I
    if 'm' in flags:
        f |= re.M
    if 's' in flags:
        f |= re.S
    try:
        return re.compile(p, f)
    except re.error:
        try:
            return re.compile(p.replace('\\/', '/'), f)
        except re.error:
            return None


class JSDate(JSObj):
    _tag = 'Date'

    def __init__(self, t):
        JSObj.__init__(self, tag='Date')
        self.t = t


class JSURL(JSObj):
    _tag = 'URL'

    def __init__(self, href, base=None):
        JSObj.__init__(self, tag='URL')
        import urllib.parse as up
        try:
            if base is not None and not _has_scheme(href):
                b = base.href if isinstance(base, JSURL) else js_str(base)
                self._u = up.urljoin(b, href)
            else:
                self._u = href
            sp = up.urlsplit(self._u)
            if not sp.scheme:
                raise ValueError('Invalid URL')
            self.scheme = sp.scheme
            self.netloc = sp.netloc
            self.path = sp.path
            self.query = sp.query
            self.fragment = sp.fragment
            self._sp = JSURLSearchParams(sp.query)
        except Exception:
            raise JSError('TypeError', 'Invalid URL')

    def own_get(self, k):
        if k == 'href':
            u = self._u
            return u
        if k == 'origin':
            return '%s://%s' % (self.scheme, self.netloc)
        if k == 'protocol':
            return self.scheme + ':'
        if k == 'host':
            return self.netloc
        if k == 'hostname':
            return self.netloc.split(':')[0]
        if k == 'port':
            parts = self.netloc.split(':')
            return parts[1] if len(parts) > 1 else ''
        if k == 'pathname':
            return self.path if self.path else '/'
        if k == 'search':
            return ('?' + self.query) if self.query else ''
        if k == 'hash':
            return ('#' + self.fragment) if self.fragment else ''
        if k == 'searchParams':
            return self._sp
        return MISSING


def _has_scheme(s):
    return bool(re.match(r'^[A-Za-z][A-Za-z0-9+.\-]*:', s))


class JSURLSearchParams(JSObj):
    _tag = 'URLSearchParams'

    def __init__(self, qs=''):
        JSObj.__init__(self, tag='URLSearchParams')
        self.pairs = []
        if qs:
            for part in qs.split('&'):
                if not part:
                    continue
                if '=' in part:
                    k, v = part.split('=', 1)
                else:
                    k, v = part, ''
                self.pairs.append([k, v])


class FakeXHRInstance(JSObj):
    _tag = 'FakeXHR'

    def __init__(self, proto):
        JSObj.__init__(self, proto=proto, tag='FakeXHR')
        self.props['_url'] = ''
        self.props['_method'] = 'GET'
        self.props['_headers'] = JSObj()
        self.props['readyState'] = 0.0
        self.props['_status'] = 0.0
        self.props['responseText'] = ''
        self.props['onreadystatechange'] = None
        self.props['onload'] = None
        self.props['onerror'] = None
        self.props['_body'] = None


# ---------------------------------------------------------------- JS 内置原型

def _fn(name, impl, length=0):
    return JSFunction(name, impl, length)


def install_builtins(globs, vm):
    import re

    # ---- String ----
    def s_charCodeAt(s, a):
        i = to_int32(a[0]) if a else 0
        return float(ord(s[i])) if 0 <= i < len(s) else float('nan')

    def s_charAt(s, a):
        i = to_int32(a[0]) if a else 0
        return s[i] if 0 <= i < len(s) else ''

    def s_indexOf(s, a):
        return float(s.find(js_str(a[0])))

    def s_lastIndexOf(s, a):
        return float(s.rfind(js_str(a[0])))

    def s_split(s, a):
        if not a or a[0] is None:
            return JSArray([s])
        sep = a[0]
        lim = to_int32(a[1]) if len(a) > 1 and a[1] is not None else -1
        if isinstance(sep, JSRegExp):
            parts = sep.fre.split(s) if sep.fre else [s]
            return JSArray(parts if lim < 0 else parts[:lim])
        seps = js_str(sep)
        if seps == '':
            parts = list(s)
        else:
            parts = s.split(seps)
        return JSArray(parts if lim < 0 else parts[:lim])

    def s_slice(s, a):
        n = len(s)
        st = to_int32(a[0]) if a else 0
        en = to_int32(a[1]) if len(a) > 1 and a[1] is not None else n
        st = max(n + st, 0) if st < 0 else min(st, n)
        en = max(n + en, 0) if en < 0 else min(en, n)
        return s[st:en] if en > st else ''

    def s_substring(s, a):
        n = len(s)
        st = max(0, min(to_int32(a[0]) if a else 0, n))
        en = max(0, min(to_int32(a[1]) if len(a) > 1 and a[1] is not None else n, n))
        if st > en:
            st, en = en, st
        return s[st:en]

    def s_substr(s, a):
        n = len(s)
        st = to_int32(a[0]) if a else 0
        if st < 0:
            st = max(n + st, 0)
        ln = to_int32(a[1]) if len(a) > 1 and a[1] is not None else n - st
        return s[st:st + max(ln, 0)]

    def s_replace(s, a):
        pat = a[0]
        rep = a[1] if len(a) > 1 else None
        if isinstance(pat, JSRegExp):
            if pat.fre is None:
                return s
            cnt = 0 if 'g' in pat.flags else 1
            if isinstance(rep, (JSFunction, DWrapper)):
                def _sub(m):
                    gs = [m.group(0)] + list(m.groups())
                    return js_str(call_fn(rep, None, [JSObj() if False else m.group(0)] + [g if g is not None else None for g in m.groups()]))
                return pat.fre.sub(_sub, s, count=cnt)
            rs = js_str(rep)
            rs = rs.replace('$&', '\\g<0>')
            return pat.fre.sub(rs, s, count=cnt)
        if isinstance(rep, (JSFunction, DWrapper)):
            return s.replace(js_str(pat), js_str(call_fn(rep, None, [pat])))
        return s.replace(js_str(pat), js_str(rep))

    STRING_PROTO.props.update({
        'charCodeAt': _fn('charCodeAt', s_charCodeAt), 'charAt': _fn('charAt', s_charAt),
        'indexOf': _fn('indexOf', s_indexOf), 'lastIndexOf': _fn('lastIndexOf', s_lastIndexOf),
        'split': _fn('split', s_split), 'slice': _fn('slice', s_slice),
        'substring': _fn('substring', s_substring), 'substr': _fn('substr', s_substr),
        'replace': _fn('replace', s_replace),
        'trim': _fn('trim', lambda s, a: s.strip()),
        'trimEnd': _fn('trimEnd', lambda s, a: s.rstrip()),
        'trimStart': _fn('trimStart', lambda s, a: s.lstrip()),
        'toUpperCase': _fn('toUpperCase', lambda s, a: s.upper()),
        'toLowerCase': _fn('toLowerCase', lambda s, a: s.lower()),
        'concat': _fn('concat', lambda s, a: s + ''.join(js_str(x) for x in a)),
        'toString': _fn('toString', lambda s, a: s),
        'valueOf': _fn('valueOf', lambda s, a: s),
        'includes': _fn('includes', lambda s, a: js_str(a[0]) in s),
        'startsWith': _fn('startsWith', lambda s, a: s.startswith(js_str(a[0]))),
        'endsWith': _fn('endsWith', lambda s, a: s.endswith(js_str(a[0]))),
        'padStart': _fn('padStart', lambda s, a: s.rjust(to_int32(a[0]), js_str(a[1]) if len(a) > 1 else ' ')),
        'padEnd': _fn('padEnd', lambda s, a: s.ljust(to_int32(a[0]), js_str(a[1]) if len(a) > 1 else ' ')),
        'repeat': _fn('repeat', lambda s, a: s * to_int32(a[0])),
        'match': _fn('match', lambda s, a: _s_match(s, a)),
        'search': _fn('search', lambda s, a: float(a[0].fre.search(s).start()) if isinstance(a[0], JSRegExp) and a[0].fre and a[0].fre.search(s) else -1.0),
    })

    NUMBER_PROTO.props.update({
        'toString': _fn('toString', lambda n, a: _num_radix(n, to_int32(a[0]) if a and a[0] is not None else 10)),
        'toFixed': _fn('toFixed', lambda n, a: ('%.' + str(to_int32(a[0]) if a else 0) + 'f') % float(n)),
        'valueOf': _fn('valueOf', lambda n, a: float(n)),
    })
    BOOL_PROTO.props.update({'toString': _fn('toString', lambda b, a: 'true' if b else 'false'),
                             'valueOf': _fn('valueOf', lambda b, a: b)})

    def _s_match(s, a):
        pat = a[0]
        if not isinstance(pat, JSRegExp):
            pat = JSRegExp(js_str(pat), '')
        if pat.fre is None:
            return None
        if 'g' in pat.flags:
            return JSArray(pat.fre.findall(s))
        m = pat.fre.search(s)
        if not m:
            return None
        return JSArray([m.group(0)] + [g if g is not None else None for g in m.groups()])

    def _num_radix(n, radix):
        f = float(n)
        if radix == 10:
            return num_to_str(f)
        if not f.is_integer():
            return num_to_str(f)
        i = int(f)
        digs = '0123456789abcdefghijklmnopqrstuvwxyz'
        if i == 0:
            return '0'
        neg = i < 0
        i = abs(i)
        out = ''
        while i:
            out = digs[i % radix] + out
            i //= radix
        return ('-' if neg else '') + out

    # ---- Array ----
    def a_push(arr, a):
        arr.items.extend(a)
        return float(len(arr.items))

    def a_pop(arr, a):
        return arr.items.pop() if arr.items else None

    def a_shift(arr, a):
        return arr.items.pop(0) if arr.items else None

    def a_unshift(arr, a):
        for i, x in enumerate(a):
            arr.items.insert(i, x)
        return float(len(arr.items))

    def a_slice(arr, a):
        n = len(arr.items)
        st = to_int32(a[0]) if a else 0
        en = to_int32(a[1]) if len(a) > 1 and a[1] is not None else n
        st = max(n + st, 0) if st < 0 else min(st, n)
        en = max(n + en, 0) if en < 0 else min(en, n)
        return JSArray(arr.items[st:en] if en > st else [])

    def a_splice(arr, a):
        n = len(arr.items)
        st = to_int32(a[0]) if a else 0
        st = max(n + st, 0) if st < 0 else min(st, n)
        dc = to_int32(a[1]) if len(a) > 1 else n - st
        dc = max(0, min(dc, n - st))
        removed = arr.items[st:st + dc]
        arr.items[st:st + dc] = list(a[2:])
        return JSArray(removed)

    def a_map(arr, a):
        f = a[0]
        return JSArray([call_fn(f, None, [x, float(i), arr]) for i, x in enumerate(arr.items)])

    def a_forEach(arr, a):
        f = a[0]
        for i, x in enumerate(list(arr.items)):
            call_fn(f, None, [x, float(i), arr])
        return None

    def a_filter(arr, a):
        f = a[0]
        return JSArray([x for i, x in enumerate(arr.items) if js_bool(call_fn(f, None, [x, float(i), arr]))])

    def a_some(arr, a):
        f = a[0]
        for i, x in enumerate(arr.items):
            if js_bool(call_fn(f, None, [x, float(i), arr])):
                return True
        return False

    def a_every(arr, a):
        f = a[0]
        for i, x in enumerate(arr.items):
            if not js_bool(call_fn(f, None, [x, float(i), arr])):
                return False
        return True

    def a_reduce(arr, a):
        f = a[0]
        items = list(arr.items)
        if len(a) > 1:
            acc = a[1]
        elif items:
            acc = items.pop(0)
        else:
            raise JSError('TypeError', 'Reduce of empty array with no initial value')
        for i, x in enumerate(items):
            acc = call_fn(f, None, [acc, x, float(i), arr])
        return acc

    def a_join(arr, a):
        sep = js_str(a[0]) if a and a[0] is not None else ','
        return sep.join('' if x is None else js_str(x) for x in arr.items)

    def a_concat(arr, a):
        out = list(arr.items)
        for x in a:
            if isinstance(x, JSArray):
                out.extend(x.items)
            else:
                out.append(x)
        return JSArray(out)

    def a_indexOf(arr, a):
        tgt = a[0]
        for i, x in enumerate(arr.items):
            if strict_eq(x, tgt):
                return float(i)
        return -1.0

    def a_includes(arr, a):
        tgt = a[0]
        for x in arr.items:
            if strict_eq(x, tgt) or (isinstance(x, float) and isinstance(tgt, float) and V.is_nan(x) and V.is_nan(tgt)):
                return True
        return False

    def a_reverse(arr, a):
        arr.items.reverse()
        return arr

    def a_sort(arr, a):
        f = a[0] if a else None
        if f is None:
            arr.items.sort(key=lambda x: js_str(x))
        else:
            import functools
            arr.items.sort(key=functools.cmp_to_key(lambda x, y: to_int32(call_fn(f, None, [x, y]))))
        return arr

    ARRAY_PROTO.props.update({
        'push': _fn('push', a_push), 'pop': _fn('pop', a_pop), 'shift': _fn('shift', a_shift),
        'unshift': _fn('unshift', a_unshift), 'slice': _fn('slice', a_slice), 'splice': _fn('splice', a_splice),
        'map': _fn('map', a_map), 'forEach': _fn('forEach', a_forEach), 'filter': _fn('filter', a_filter),
        'some': _fn('some', a_some), 'every': _fn('every', a_every), 'reduce': _fn('reduce', a_reduce),
        'join': _fn('join', a_join), 'concat': _fn('concat', a_concat), 'indexOf': _fn('indexOf', a_indexOf),
        'includes': _fn('includes', a_includes), 'reverse': _fn('reverse', a_reverse), 'sort': _fn('sort', a_sort),
        'toString': _fn('toString', a_join), 'find': _fn('find', lambda arr, a: next((x for i, x in enumerate(arr.items) if js_bool(call_fn(a[0], None, [x, float(i), arr]))), None)),
    })

    # ---- Object ----
    def o_defineProperty(t, a):
        tgt, key, desc = a[0], js_key(a[1]), a[2]
        if not isinstance(tgt, JSObj):
            raise JSError('TypeError', 'Object.defineProperty called on non-object')
        dv = getprop(desc, 'value')
        dg = getprop(desc, 'get')
        ds = getprop(desc, 'set')
        if dg is not None or ds is not None:
            V._define_accessor(tgt, key, dg, ds)
        else:
            setprop(tgt, key, dv)
        return tgt

    def o_keys(t, a):
        o = a[0]
        if isinstance(o, JSArray):
            return JSArray([str(i) for i in range(len(o.items))])
        if isinstance(o, JSObj):
            return JSArray([k for k in o.own_keys()])
        if isinstance(o, str):
            return JSArray([str(i) for i in range(len(o))])
        return JSArray([])

    def o_gopd(t, a):
        o, k = a[0], js_key(a[1])
        d = JSObj()
        if not isinstance(o, JSObj):
            return None
        if k in o.accessors:
            d.props['get'] = o.accessors[k][0]
            d.props['set'] = o.accessors[k][1]
            d.props['enumerable'] = True
            d.props['configurable'] = True
            return d
        if k in o.props:
            d.props['value'] = o.props[k]
            d.props['writable'] = True
            d.props['enumerable'] = True
            d.props['configurable'] = True
            return d
        return None

    obj_ctor = JSFunction('Object', lambda t, a: (a[0] if a and isinstance(a[0], JSObj) else JSObj()))
    OBJECT_PROTO.props['toString'] = _fn('toString', lambda t, a: '[object %s]' % _tag_of(t))
    OBJECT_PROTO.props['valueOf'] = _fn('valueOf', lambda t, a: t)
    OBJECT_PROTO.props['hasOwnProperty'] = _fn('hasOwnProperty', lambda t, a: isinstance(t, JSObj) and (js_key(a[0]) in t.props or js_key(a[0]) in t.accessors))
    OBJECT_PROTO.props['constructor'] = obj_ctor
    obj_ctor.props['prototype'] = OBJECT_PROTO
    obj_ctor.props['defineProperty'] = _fn('defineProperty', o_defineProperty)
    obj_ctor.props['keys'] = _fn('keys', o_keys)
    obj_ctor.props['getOwnPropertyDescriptor'] = _fn('getOwnPropertyDescriptor', o_gopd)
    obj_ctor.props['getOwnPropertyNames'] = _fn('getOwnPropertyNames', o_keys)
    obj_ctor.props['create'] = _fn('create', lambda t, a: JSObj(proto=a[0] if a and isinstance(a[0], JSObj) else None))
    obj_ctor.props['setPrototypeOf'] = _fn('setPrototypeOf', lambda t, a: _set_proto(a[0], a[1]))
    obj_ctor.props['getPrototypeOf'] = _fn('getPrototypeOf', lambda t, a: a[0].proto if isinstance(a[0], JSObj) else None)
    obj_ctor.props['assign'] = _fn('assign', lambda t, a: _obj_assign(a[0], a[1:]))
    obj_ctor.props['values'] = _fn('values', lambda t, a: JSArray([getprop(a[0], k) for k in (a[0].own_keys() if isinstance(a[0], JSObj) else [])]))
    obj_ctor.props['entries'] = _fn('entries', lambda t, a: JSArray([JSArray([k, getprop(a[0], k)]) for k in (a[0].own_keys() if isinstance(a[0], JSObj) else [])]))
    obj_ctor.props['freeze'] = _fn('freeze', lambda t, a: a[0])
    obj_ctor.props['prototype'] = OBJECT_PROTO

    def _set_proto(o, p):
        if isinstance(o, JSObj):
            o.proto = p if isinstance(p, JSObj) else None
        return o

    def _obj_assign(tgt, srcs):
        for s in srcs:
            if isinstance(s, JSObj):
                for k in s.own_keys():
                    setprop(tgt, k, getprop(s, k))
        return tgt

    def _tag_of(o):
        if o is None:
            return 'Undefined'
        if isinstance(o, bool):
            return 'Boolean'
        if isinstance(o, (int, float)):
            return 'Number'
        if isinstance(o, str):
            return 'String'
        if isinstance(o, JSArray):
            return 'Array'
        if isinstance(o, (JSFunction, DWrapper)):
            return 'Function'
        return getattr(o, '_tag', 'Object')

    # ---- Function.prototype ----
    FUNC_PROTO.props['call'] = _fn('call', lambda t, a: call_fn(t, a[0] if a else None, a[1:]))
    FUNC_PROTO.props['apply'] = _fn('apply', lambda t, a: call_fn(t, a[0] if a else None, list((a[1].items if isinstance(a[1], JSArray) else []) if len(a) > 1 and a[1] is not None else [])))
    FUNC_PROTO.props['bind'] = _fn('bind', lambda t, a: _bind(t, a))
    FUNC_PROTO.props['toString'] = _fn('toString', lambda t, a: 'function %s() { [native code] }' % getattr(t, 'name', ''))

    def _bind(f, a):
        this_arg = a[0] if a else None
        bound = a[1:]

        def impl(this, args):
            return call_fn(f, this_arg, list(bound) + list(args))
        return JSFunction('bound ' + getattr(f, 'name', ''), impl)

    # ---- RegExp ----
    def re_test(r, a):
        s = js_str(a[0])
        if r.fre is None:
            return False
        if 'g' in r.flags:
            m = r.fre.search(s, int(r.lastIndex))
            if m:
                r.lastIndex = float(m.end())
            else:
                r.lastIndex = 0.0
            return bool(m)
        return bool(r.fre.search(s))

    def re_exec(r, a):
        s = js_str(a[0])
        if r.fre is None:
            return None
        m = r.fre.search(s)
        if not m:
            return None
        out = JSArray([m.group(0)] + [g if g is not None else None for g in m.groups()])
        out.props['index'] = float(m.start())
        out.props['input'] = s
        return out

    REGEXP_PROTO.props['test'] = _fn('test', re_test)
    REGEXP_PROTO.props['exec'] = _fn('exec', re_exec)
    REGEXP_PROTO.props['toString'] = _fn('toString', lambda r, a: '/%s/%s' % (r.source, r.flags))

    regexp_ctor = JSFunction('RegExp', lambda t, a: JSRegExp(js_str(a[0]), js_str(a[1]) if len(a) > 1 and a[1] is not None else ''))
    regexp_ctor.props['prototype'] = REGEXP_PROTO

    # ---- 全局对象装配 ----
    g = globs
    g['Object'] = obj_ctor
    g['String'] = _make_string_ctor()
    g['Array'] = _make_array_ctor()
    g['RegExp'] = regexp_ctor
    g['Math'] = JSObject_math(vm)
    g['Number'] = JSFunction('Number', lambda t, a: js_num(a[0]) if a else 0.0)
    g['Boolean'] = JSFunction('Boolean', lambda t, a: js_bool(a[0]) if a else False)
    g['JSON'] = _make_json()
    g['Symbol'] = _make_symbol()
    g['Error'] = _make_error_ctor('Error')
    g['TypeError'] = _make_error_ctor('TypeError')
    g['ReferenceError'] = _make_error_ctor('ReferenceError')
    g['SyntaxError'] = _make_error_ctor('SyntaxError')
    g['RangeError'] = _make_error_ctor('RangeError')
    g['URIError'] = _make_error_ctor('URIError')
    return g


def _make_string_ctor():
    def impl(t, a):
        return '' if not a else js_str(a[0])
    c = JSFunction('String', impl)
    c.props['prototype'] = STRING_PROTO
    c.props['fromCharCode'] = JSFunction('fromCharCode', lambda t, a: ''.join(chr(to_int32(x) & 0xFFFF) for x in a))
    c.props['fromCodePoint'] = JSFunction('fromCodePoint', lambda t, a: ''.join(chr(to_int32(x)) for x in a))
    return c


def _make_array_ctor():
    def impl(t, a):
        if not a:
            return JSArray([])
        if isinstance(a[0], (int, float)) and not isinstance(a[0], bool):
            return JSArray([None] * to_int32(a[0]))
        return JSArray(list(a))
    c = JSFunction('Array', impl)
    c.props['prototype'] = ARRAY_PROTO
    c.props['isArray'] = JSFunction('isArray', lambda t, a: isinstance(a[0], JSArray) if a else False)
    c.props['from'] = JSFunction('from', lambda t, a: JSArray(list(a[0].items) if isinstance(a[0], JSArray) else list(a[0])))
    return c


class JSObject_math(JSObj):
    _tag = 'Math'

    def __init__(self, vm):
        JSObj.__init__(self)
        self.vm = vm
        self.props['random'] = JSFunction('random', lambda t, a: self.vm.rnd.random())
        self.props['floor'] = JSFunction('floor', lambda t, a: float(math.floor(js_num(a[0]))))
        self.props['ceil'] = JSFunction('ceil', lambda t, a: float(math.ceil(js_num(a[0]))))
        self.props['round'] = JSFunction('round', lambda t, a: float(math.floor(js_num(a[0]) + 0.5)))
        self.props['abs'] = JSFunction('abs', lambda t, a: abs(js_num(a[0])))
        self.props['max'] = JSFunction('max', lambda t, a: max([js_num(x) for x in a]) if a else float('-inf'))
        self.props['min'] = JSFunction('min', lambda t, a: min([js_num(x) for x in a]) if a else float('inf'))
        self.props['pow'] = JSFunction('pow', lambda t, a: js_num(a[0]) ** js_num(a[1]))
        self.props['sqrt'] = JSFunction('sqrt', lambda t, a: math.sqrt(js_num(a[0])))
        self.props['log'] = JSFunction('log', lambda t, a: math.log(js_num(a[0])))
        self.props['exp'] = JSFunction('exp', lambda t, a: math.exp(js_num(a[0])))
        self.props['sin'] = JSFunction('sin', lambda t, a: math.sin(js_num(a[0])))
        self.props['cos'] = JSFunction('cos', lambda t, a: math.cos(js_num(a[0])))
        self.props['PI'] = math.pi
        self.props['E'] = math.e


def _make_json():
    j = JSObj()
    j._tag = 'JSON'

    def stringify(t, a):
        return _json_str(a[0])
    j.props['stringify'] = JSFunction('stringify', stringify)
    j.props['parse'] = JSFunction('parse', lambda t, a: _json_parse(js_str(a[0])))
    return j


def _json_str(v, depth=0):
    import json as _j
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return num_to_str(float(v)) if not (isinstance(v, float) and (V.is_nan(v) or math.isinf(v))) else 'null'
    if isinstance(v, str):
        return _j.dumps(v, ensure_ascii=False)
    if isinstance(v, JSArray):
        return '[' + ','.join(_json_str(x, depth + 1) for x in v.items) + ']'
    if isinstance(v, JSObj):
        parts = []
        for k in v.props:
            val = getprop(v, k)
            if isinstance(val, (JSFunction, DWrapper)) or val is None and False:
                continue
            if isinstance(val, (JSFunction, DWrapper)):
                continue
            parts.append(_j.dumps(k, ensure_ascii=False) + ':' + _json_str(val, depth + 1))
        return '{' + ','.join(parts) + '}'
    return 'null'


def _json_parse(s):
    import json as _j
    v = _j.loads(s)
    return _py_to_js(v)


def _py_to_js(v):
    if isinstance(v, dict):
        o = JSObj()
        for k, x in v.items():
            o.props[k] = _py_to_js(x)
        return o
    if isinstance(v, list):
        return JSArray([_py_to_js(x) for x in v])
    if isinstance(v, bool) or v is None or isinstance(v, str):
        return v
    if isinstance(v, (int, float)):
        return float(v)
    return None


def _make_symbol():
    s = JSFunction('Symbol', lambda t, a: 'Symbol(' + js_str(a[0]) + ')' if a else 'Symbol()')
    for k in ('iterator', 'asyncIterator', 'toPrimitive', 'toStringTag', 'hasInstance', 'species', 'unscopables'):
        s.props[k] = 'Symbol(' + k + ')'
    return s


def _make_error_ctor(kind):
    def impl(t, a):
        msg = js_str(a[0]) if a and a[0] is not None else ''
        return JSErrorObj(kind, msg, stack='%s: %s' % (kind, msg))
    c = JSFunction(kind, impl)
    c.props['prototype'] = JSObj(tag='Object')
    return c
