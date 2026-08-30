#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# abogus.py — 抖音 web a_bogus 纯 Python 复现（bdms VM 移植）
import json, math, sys, re, os

DIR = os.path.dirname(os.path.abspath(__file__))
Z = json.load(open(os.path.join(DIR, 'vm_Z.json')))
ZT = json.load(open(os.path.join(DIR, 'vm_z_full.json')))

class JSObject(dict):
    def get(self, k, *a):
        k = str(k)
        if k in self: return self[k]
        if a: return a[0]
        return None
    def set(self, k, v): self[str(k)] = v; return v

class JSArray(list):
    def __init__(self, *a):
        super().__init__(*a)
        self._props = {}
        self._length = 0
    @property
    def length(self): return self._length
    @length.setter
    def length(self, v):
        self._length = int(v)
        if self._length < len(self): del self[self._length:]

def toi32(x):
    x = int(x) & 0xFFFFFFFF
    return x - 0x100000000 if x >= 0x80000000 else x

def tou32(x): return int(x) & 0xFFFFFFFF

def jsnum(x):
    if isinstance(x, bool): return 1.0 if x else 0.0
    if x is None: return 0.0
    try: return float(x)
    except: return float('nan')

def jsbool(x):
    if x is None: return False
    if isinstance(x, bool): return x
    if isinstance(x, (int, float)): return x != 0 and not (isinstance(x, float) and math.isnan(x))
    if isinstance(x, str): return len(x) > 0
    return True

def jseq(a, b):
    if a is b: return True
    if isinstance(a, float) and isinstance(b, float) and math.isnan(a) and math.isnan(b): return True
    return type(a) == type(b) and a == b

def jseql(a, b):
    if jseq(a, b): return True
    if a is None or b is None: return False
    try:
        na, nb = jsnum(a), jsnum(b)
        if not (math.isnan(na) or math.isnan(nb)): return na == nb
    except: pass
    return str(a) == str(b)

def jsstr(v):
    if v is None: return 'undefined'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, float) and math.isnan(v): return 'NaN'
    if isinstance(v, (int, float)):
        return str(int(v)) if float(v).is_integer() else str(v)
    if isinstance(v, (list, dict)): return str(v)
    return str(v)

def getprop(obj, key):
    if obj is None: return None
    if isinstance(obj, JSArray):
        ks = str(key)
        if ks.isdigit():
            i = int(ks)
            return obj[i] if 0 <= i < len(obj) else None
        if ks == 'length': return len(obj)
        return obj._props.get(ks)
    if isinstance(obj, dict):
        ks = str(key)
        return obj.get(ks)
    if isinstance(obj, str):
        ks = str(key)
        if ks == 'length': return len(obj)
        if ks.isdigit():
            i = int(ks)
            return obj[i] if 0 <= i < len(obj) else None
        return STR_PROTO.get(ks)
    if isinstance(obj, JSArray) is False and isinstance(obj, JSFunction) is False and isinstance(obj, (int, float)):
        return NUM_PROTO.get(str(key))
    if isinstance(obj, JSFunction):
        if str(key) == 'name': return obj.name
        if str(key) == 'prototype': return obj.proto
        return obj.props.get(str(key))
    return getattr(obj, str(key), None)

def setprop(obj, key, val):
    if isinstance(obj, JSArray):
        ks = str(key)
        if ks.isdigit():
            i = int(ks)
            if i >= len(obj): obj.extend([None] * (i + 1 - len(obj)))
            obj[i] = val
        elif ks == 'length': obj.length = val
        else: obj._props[ks] = val
    elif isinstance(obj, dict): obj[str(key)] = val
    else: setattr(obj, str(key), val)
    return val

def jstypeof(v):
    if v is None: return 'undefined'
    if isinstance(v, bool): return 'boolean'
    if isinstance(v, (int, float)): return 'number'
    if isinstance(v, str): return 'string'
    if isinstance(v, JSFunction): return 'function'
    return 'object'

class JSFunction:
    def __init__(self, name, impl):
        self.name = name
        self.impl = impl
        self.props = {}
        self.proto = JSObject()
    def call(self, this, args): return self.impl(this, args)
    def construct(self, args): return self.impl(None, args)

def jsfn(name, impl): return JSFunction(name, impl)

def call_fn(fn, this, args):
    if isinstance(fn, JSFunction): return fn.call(this, args)
    if callable(fn):
        try: return fn(this, *args)
        except TypeError: return fn(*args)
    raise Exception(jsstr(fn) + ' is not a function')

def call_method(obj, name, args):
    m = getprop(obj, name)
    if m is None: raise Exception('undefined is not a function: ' + str(name))
    return call_fn(m, obj, args)

STR_PROTO = {
    'charCodeAt': jsfn('charCodeAt', lambda s, a: ord(s[a[0]]) if 0 <= a[0] < len(s) else float('nan')),
    'charAt': jsfn('charAt', lambda s, a: s[a[0]] if 0 <= a[0] < len(s) else ''),
    'indexOf': jsfn('indexOf', lambda s, a: s.find(str(a[0]))),
    'split': jsfn('split', lambda s, a: JSArray(list(s)) if a[0] == '' else JSArray(s.split(a[0]))),
    'toString': jsfn('toString', lambda s, a: s),
    'slice': jsfn('slice', lambda s, a: s[a[0]:a[1] if len(a) > 1 else None]),
    'concat': jsfn('concat', lambda s, a: s + ''.join(jsstr(x) for x in a)),
    'replace': jsfn('replace', lambda s, a: s.replace(a[0], a[1]) if isinstance(a[0], str) else a[0].sub(a[1], s)),
    'trim': jsfn('trim', lambda s, a: s.strip()),
    'substr': jsfn('substr', lambda s, a: s[a[0]:a[0] + a[1] if len(a) > 1 else None]),
}

NUM_PROTO = {
    'toString': jsfn('toString', lambda n, a: str(int(n))),
}

ARR_PROTO = {
    'push': jsfn('push', lambda arr, a: (arr.extend(a), len(arr))[1]),
    'pop': jsfn('pop', lambda arr, a: arr.pop() if len(arr) else None),
    'slice': jsfn('slice', lambda arr, a: JSArray(arr[a[0]:a[1] if len(a) > 1 else None])),
    'join': jsfn('join', lambda arr, a: str(a[0] if a else ',').join(jsstr(x) for x in arr)),
    'map': jsfn('map', lambda arr, a: JSArray([call_fn(a[0], None, [x, i, arr]) for i, x in enumerate(arr)])),
    'forEach': jsfn('forEach', lambda arr, a: [call_fn(a[0], None, [x, i, arr]) for i, x in enumerate(arr)]),
    'filter': jsfn('filter', lambda arr, a: JSArray([x for x in arr if jsbool(call_fn(a[0], None, [x, 0, arr]))])),
    'concat': jsfn('concat', lambda arr, a: JSArray(list(arr) + list(a[0]) if a and isinstance(a[0], (list, JSArray)) else list(arr))),
    'indexOf': jsfn('indexOf', lambda arr, a: arr.index(a[0]) if a[0] in arr else -1),
}

class JSRegex:
    def __init__(self, pattern, flags=''):
        self.pattern = pattern
        self.flags = flags
        self.re = re.compile(pattern)
    def sub(self, repl, s): return self.re.sub(repl, s)
    def test(self, s): return bool(self.re.search(s))

SM3_IV = [0x7380166F, 0x4914B2B9, 0x172442D7, 0xDA8A0600, 0xA96F30BC, 0x163138AA, 0xE38DEE4D, 0xB0FB0E4E]

def _rotl(x, n): return ((x << n) | (x >> (32 - n))) & 0xFFFFFFFF

def sm3_compress(block, reg):
    W = [0] * 132
    for j in range(16):
        W[j] = (block[4*j] << 24) | (block[4*j+1] << 16) | (block[4*j+2] << 8) | block[4*j+3]
    for j in range(16, 68):
        x = (W[j-16] ^ W[j-9] ^ _rotl(W[j-3], 15)) & 0xFFFFFFFF
        W[j] = (x ^ _rotl(x, 15) ^ _rotl(x, 23) ^ _rotl(W[j-13], 7) ^ W[j-6]) & 0xFFFFFFFF
    for j in range(68, 132): W[j] = W[j-68] ^ W[j-64]
    A, B, C, D, E, F, G, H = reg
    for j in range(64):
        T = 0x79CC4519 if j < 16 else 0x7A879D8A
        SS1 = _rotl((_rotl(A, 12) + E + _rotl(T, j % 32)) & 0xFFFFFFFF, 7)
        SS2 = SS1 ^ _rotl(A, 12)
        if j < 16: FF = A ^ B ^ C; GG = E ^ F ^ G
        else: FF = (A & B) | (A & C) | (B & C); GG = (E & F) | ((~E) & G)
        TT1 = (FF + D + SS2 + W[j+68]) & 0xFFFFFFFF
        TT2 = (GG + H + SS1 + W[j]) & 0xFFFFFFFF
        D = C; C = _rotl(B, 9); B = A; A = TT1
        H = G; G = _rotl(F, 19); F = E; E = (TT2 ^ _rotl(TT2, 9) ^ _rotl(TT2, 17)) & 0xFFFFFFFF
    return [(x + y) & 0xFFFFFFFF for x, y in zip(reg, [A, B, C, D, E, F, G, H])]

class SM3Engine:
    _jsTag = 'Object'
    def __init__(self):
        self.reg = None; self.chunk = []; self.size = 0; self.reset()
    def reset(self):
        self.reg = list(SM3_IV); self.chunk = []; self.size = 0
    def write(self, data):
        if isinstance(data, str): data = list(data.encode('utf-8'))
        data = list(data)
        self.size += len(data)
        e = 64 - len(self.chunk)
        if len(data) < e:
            self.chunk.extend(data)
        else:
            self.chunk.extend(data[:e])
            while len(self.chunk) >= 64:
                self.reg = sm3_compress(self.chunk, self.reg)
                if e < len(data): self.chunk = data[e:min(e + 64, len(data))]
                else: self.chunk = []
                e += 64
    def _fill(self):
        n = self.size % 64
        pad = [0x80] + [0] * ((56 - n - 1) % 64)
        self.write(pad)
        bits = (self.size - len(pad) - 1) * 8
        self.write([(bits >> (56 - 8 * i)) & 0xFF for i in range(8)])
    def sum(self, data, fmt=None):
        if data:
            self.reset(); self.write(data)
        self._fill()
        while len(self.chunk) >= 64:
            self.reg = sm3_compress(self.chunk, self.reg); self.chunk = self.chunk[64:]
        if fmt == 'hex':
            out = ''.join('%08x' % r for r in self.reg)
        else:
            out = []
            for r in self.reg:
                out.append((r >> 24) & 255); out.append((r >> 16) & 255); out.append((r >> 8) & 255); out.append(r & 255)
        self.reset()
        return out

class _FrameReturn(Exception): pass

class VM:
    def __init__(self, globs):
        self.globs = globs
        self.V = {}
        self.Y = {}
    def D(self, pid, state):
        vm = self
        def wrapper(this, *args):
            return vm.X(pid, this, list(args), state)
        w = JSFunction('D' + str(pid), lambda this, a: vm.X(pid, this, list(a), state))
        self.V[id(w)] = (pid, state)
        self.Y[pid] = w
        return w
    def X(self, pid, this, args, state):
        entry = ZT[pid]
        bc = entry[0]; arity = entry[1]; flags = entry[2]
        v = JSArray(); v.length = len(args)
        s = JSArray([state, v])
        for h in range(min(len(args), arity)): s.append(args[h])
        o = bc; i = flags; u = entry[3]
        p = -1; f = 0; l = None
        stack = []; frames = []; c = this; a = 0
        def schain(N, x):
            U = s
            for _ in range(N): U = U[0]
            return U, x
        while True:
            try:
                while True:
                    op = o[a]; a += 1
                    if op == 0:
                        argc = o[a]; a += 1
                        p -= argc
                        e = stack[p+1:p+1+argc]
                        n = stack[p]; p -= 1
                        d = stack[p]; p -= 1
                        target = self.V.get(id(n))
                        if target is not None:
                            frames.append((o, i, u, s, c, a, f, l))
                            pid2, state2 = target
                            entry2 = ZT[pid2]
                            o = entry2[0]; i = entry2[2]; u = entry2[3]
                            s = JSArray([state2, JSArray()])
                            s[1].length = len(e)
                            for x in e: s.append(x)
                            c = d; a = 0; f = 0; l = None
                            stack = []; p = -1
                        else:
                            m = call_fn(n, d, e)
                            p += 1; stack.append(m)
                    elif op == 1:
                        w = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) <= jsnum(w)
                    elif op == 2:
                        w = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) > jsnum(w)
                    elif op == 5:
                        x = o[a]; a += 1; A = Z[x]
                        p += 1; stack.append(self.globs.get(A))
                        p += 1; stack.append(A)
                    elif op == 7: stack.append(JSObject()); p += 1
                    elif op == 8:
                        k = stack[p]; p -= 1; stack[p] = getprop(stack[p], k)
                    elif op == 9: stack.append(True); p += 1
                    elif op == 10: stack.append(None); p += 1
                    elif op == 11:
                        E = stack[p]; p -= 1; stack[p] = toi32(stack[p]) % toi32(E)
                    elif op == 12:
                        w = stack[p]; p -= 1; stack[p] = toi32(stack[p]) & toi32(w)
                    elif op == 14:
                        E = stack[p]; p -= 1; T = stack[p]; p -= 1; S = stack[p]; p -= 1
                        setprop(S, T, E)
                    elif op == 15:
                        x = o[a]; a += 1; E = stack[p]; p -= 1
                        name = Z[x]
                        if i and name not in self.globs: raise Exception(name + ' is not defined')
                        self.globs[name] = E
                    elif op == 16:
                        L = stack[p]; p -= 1; S = stack[p]; p -= 1
                        setprop(S, L, stack[p])
                    elif op == 17:
                        U = o[a]; a += 1
                        if jsbool(stack[p]): p -= 1
                        else: a += U
                    elif op == 18: stack.append(stack[p]); p += 1
                    elif op == 19:
                        w = stack[p]; p -= 1; stack[p] = tou32(stack[p]) >> (toi32(w) & 31)
                    elif op == 20:
                        x = o[a]; a += 1; E = stack[p]; p -= 1; S = stack[p]; p -= 1
                        setprop(S, Z[x], E)
                    elif op == 21:
                        E = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) - jsnum(E)
                    elif op == 22:
                        if f != 0: raise _FrameReturn()
                    elif op == 23:
                        U = o[a]; a += 1; E = stack[p]; p -= 1
                        if jseq(stack[p], E): p -= 1
                        else: a += U
                    elif op == 24: stack[p] = jstypeof(stack[p])
                    elif op == 26: p -= 1
                    elif op == 27: stack.append(False); p += 1
                    elif op == 28: stack.append(float('nan')); p += 1
                    elif op == 29: stack[p] = not jsbool(stack[p])
                    elif op == 30:
                        x = o[a]; a += 1
                        stack[p] = getprop(stack[p], Z[x])
                    elif op == 31:
                        U = o[a]; a += 1
                        if jsbool(stack[p]): p -= 1
                        else: a += U
                    elif op == 32:
                        w = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) < jsnum(w)
                    elif op == 33: stack.append(None); p += 1
                    elif op == 34: stack.append(c); p += 1
                    elif op == 35:
                        w = stack[p]; p -= 1; stack[p] = toi32(stack[p]) >> (toi32(w) & 31)
                    elif op == 36: stack[p] = jsnum(stack[p])
                    elif op == 37: stack[p] = ~toi32(stack[p])
                    elif op == 38: stack.append(o[a]); p += 1; a += 1
                    elif op == 39:
                        F = o[a]; a += 1
                        p = p - F + 1
                        stack[p] = JSArray(stack[p:p+F])
                    elif op == 42:
                        E = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) / jsnum(E)
                    elif op == 43: stack[p] = -jsnum(stack[p])
                    elif op == 45:
                        E = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) * jsnum(E)
                    elif op == 46:
                        x = o[a]; a += 1; stack.append(float(Z[x])); p += 1
                    elif op == 49:
                        f = 3; l = stack[p]; p -= 1
                        raise _FrameReturn()
                    elif op == 51:
                        w = stack[p]; p -= 1; stack[p] = toi32(stack[p]) | toi32(w)
                    elif op == 52:
                        U = o[a]; a += 1; f = 1; l = a + U
                        raise _FrameReturn()
                    elif op == 53: U = o[a]; a += 1; a += U
                    elif op == 54:
                        N = o[a]; x = o[a+1]; a += 2
                        U, slot = schain(N, x)
                        setprop(U, slot, stack[p]); p -= 1
                    elif op == 56:
                        w = stack[p]; p -= 1; stack[p] = toi32(stack[p]) << (toi32(w) & 31)
                    elif op == 57:
                        w = stack[p]; p -= 1; stack[p] = jseq(stack[p], w)
                    elif op == 58:
                        w = stack[p]; p -= 1; stack[p] = jseql(stack[p], w)
                    elif op == 59:
                        r = o[a]; a += 1
                        G = []
                        for _ in range(r): G.append(stack[p]); p -= 1
                        z = stack[p]; p -= 1
                        inst = z.construct(G)
                        p += 1; stack.append(inst)
                    elif op == 60:
                        x = o[a]; a += 1; Y = Z[x]
                        if Y not in self.globs: raise Exception(Y + ' is not defined')
                        p += 1; stack.append(self.globs[Y])
                    elif op == 61:
                        N = o[a]; x = o[a+1]; a += 2
                        U, slot = schain(N, x)
                        p += 1; stack.append(U); p += 1; stack.append(slot)
                    elif op == 63:
                        t2 = o[a]; a += 1
                        p += 1; stack.append(self.D(t2, s))
                    elif op == 64:
                        w = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) >= jsnum(w)
                    elif op == 65: stack.append(float('inf')); p += 1
                    elif op == 67:
                        x = o[a]; a += 1; E = stack[p]; p -= 1
                        setprop(stack[p], Z[x], E)
                    elif op == 68:
                        E = stack[p]; p -= 1; stack[p] = jsnum(stack[p]) + jsnum(E)
                    elif op == 69:
                        x = o[a]; a += 1
                        p += 1; stack.append(jstypeof(self.globs.get(Z[x])))
                    elif op == 70:
                        w = stack[p]; p -= 1; stack[p] = toi32(stack[p]) ^ toi32(w)
                    elif op == 71:
                        U = o[a]; a += 1
                        if jsbool(stack[p]): p -= 1
                        else: a += U
                    elif op == 72:
                        x = o[a]; a += 1
                        if Z[x] not in self.globs: self.globs[Z[x]] = None
                    elif op == 73:
                        p += 1; stack.append(Z[o[a]]); a += 1
                    elif op == 74:
                        N = o[a]; x = o[a+1]; a += 2
                        U, slot = schain(N, x)
                        p += 1; stack.append(getprop(U, slot))
                    elif op == 75: stack.append(None); p += 1
                    else:
                        f = 2; l = stack[p]; p -= 1
                        raise _FrameReturn()
            except _FrameReturn:
                if f == 1:
                    a = l; f = 0
                    continue
                if frames:
                    fr = frames.pop()
                    (o, i, u, s, c, a, f, l) = fr
                    stack.append(l); p += 1
                    f = 0
                    continue
                if f == 3: return l
                if f == 2: raise Exception(jsstr(l))
                return l
            except Exception as ex:
                raise
