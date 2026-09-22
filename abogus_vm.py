#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""abogus_vm.py — bdms VM（796 程序）的忠实 Python 解释器 + JS 值模型 + 浏览器 shims。

语义逐行对照 bdms_patched.js 的 X(t,r,e,n) / g() / d() / y() / b() / D()：
  * 帧切换：V 命中时「就地」换帧（h.push([o,i,u,s,c,a,f,l])），栈 v 与指针 p 跨帧共享
  * y() 异常展开：f=1/2/3 三模式 + 异常表四元组 [a,b,c,d]
  * 参数对象：全部程序 flags=true（strict）→ c=r 不做 globalThis 兜底；v[h]=e[h] 平拷贝
  * 全局读写：opcode 5 产生 b(name,strict) 惰性访问器对象（读缺失名 → ReferenceError）
  * opcode 76（默认分支）= throw（f=2）
本文件不联网、不触碰任何抖音接口，纯离线执行 dump 出的字节码。
"""
import json, math, os, re, sys

DIR = os.path.dirname(os.path.abspath(__file__))
Z = json.load(open(os.path.join(DIR, 'vm_Z.json'), encoding='utf-8'))
ZT = json.load(open(os.path.join(DIR, 'vm_z_full.json'), encoding='utf-8'))

MISSING = object()
_DBG = [None, 0, None]


# ================================================================ 基础语义

class JSError(Exception):
    def __init__(self, kind, msg, stack=None):
        super().__init__(kind + ': ' + str(msg))
        self.kind = kind
        self.msg = str(msg)
        self.stack = stack


class JSThrow(Exception):
    """X() 向外真正抛出（y() 走到底、帧栈为空）。"""

    def __init__(self, value):
        super().__init__(js_str(value))
        self.value = value


def is_nan(x):
    return isinstance(x, float) and math.isnan(x)


def js_num(x):
    if x is None:
        return float('nan')
    if isinstance(x, bool):
        return 1.0 if x else 0.0
    if isinstance(x, (int, float)):
        return float(x)
    if isinstance(x, str):
        s = x.strip()
        if s == '':
            return 0.0
        try:
            low = s.lower()
            if low.startswith('0x') or low.startswith('-0x'):
                return float(int(s, 16))
            if low.startswith('0b') or low.startswith('-0b'):
                return float(int(s, 2))
            if low.startswith('0o') or low.startswith('-0o'):
                return float(int(s, 8))
            if s in ('Infinity', '+Infinity'):
                return float('inf')
            if s == '-Infinity':
                return float('-inf')
            return float(s)
        except ValueError:
            return float('nan')
    if isinstance(x, JSObj):
        m = getprop(x, 'valueOf')
        if not isinstance(m, (JSFunction, DWrapper)):
            m = getprop(x, 'toString')
        if isinstance(m, (JSFunction, DWrapper)):
            r = call_fn(m, x, [])
            return js_num(r) if not isinstance(r, JSObj) else float('nan')
        return float('nan')
    return float('nan')


def to_int32(x):
    n = js_num(x)
    if is_nan(n) or math.isinf(n):
        return 0
    i = int(n) & 0xFFFFFFFF
    return i - 0x100000000 if i >= 0x80000000 else i


def to_uint32(x):
    n = js_num(x)
    if is_nan(n) or math.isinf(n):
        return 0
    return int(n) & 0xFFFFFFFF


def js_bool(x):
    if x is None:
        return False
    if isinstance(x, bool):
        return x
    if isinstance(x, (int, float)):
        return not (float(x) == 0 or is_nan(float(x)))
    if isinstance(x, str):
        return len(x) > 0
    return True


def num_to_str(n):
    n = float(n)
    if is_nan(n):
        return 'NaN'
    if n == float('inf'):
        return 'Infinity'
    if n == float('-inf'):
        return '-Infinity'
    if n == 0:
        return '0'
    if n.is_integer() and abs(n) < 1e21:
        return str(int(n))
    r = repr(n)
    if 'e' in r:
        mant, exp = r.split('e')
        ei = int(exp)
        if -6 <= ei < 21:
            return mant + 'e' + ('+' if ei >= 0 else '-') + '%02d' % abs(ei)
    return r


def js_str(x):
    if x is None:
        return 'undefined'
    if isinstance(x, bool):
        return 'true' if x else 'false'
    if isinstance(x, (int, float)):
        return num_to_str(float(x))
    if isinstance(x, str):
        return x
    if isinstance(x, JSError):
        return x.kind + ': ' + x.msg
    if isinstance(x, JSObj):
        return js_str(to_primitive(x, 'string'))
    return str(x)


def to_primitive(x, hint='default'):
    if not isinstance(x, JSObj):
        return x
    order = ('toString', 'valueOf') if hint == 'string' else ('valueOf', 'toString')
    for name in order:
        m = getprop(x, name)
        if isinstance(m, (JSFunction, DWrapper)):
            r = call_fn(m, x, [])
            if not isinstance(r, JSObj):
                return r
    return None


def js_typeof(x):
    if x is None:
        return 'undefined'
    if isinstance(x, bool):
        return 'boolean'
    if isinstance(x, (int, float)):
        return 'number'
    if isinstance(x, str):
        return 'string'
    if isinstance(x, (JSFunction, DWrapper)):
        return 'function'
    return 'object'


def js_key(k):
    if isinstance(k, str):
        return k
    if isinstance(k, bool):
        return 'true' if k else 'false'
    if isinstance(k, (int, float)):
        return num_to_str(float(k))
    if k is None:
        return 'undefined'
    if isinstance(k, JSError):
        return js_str(k)
    return js_str(k)


def strict_eq(a, b):
    ta, tb = js_typeof(a), js_typeof(b)
    if ta != tb:
        return False
    if ta == 'number':
        if is_nan(float(a)) or is_nan(float(b)):
            return False
        return float(a) == float(b)
    if ta == 'boolean':
        return bool(a) == bool(b)
    if ta in ('undefined',):
        return True
    if ta in ('string',):
        return a == b
    return a is b


def loose_eq(a, b):
    if strict_eq(a, b):
        return True
    ta, tb = js_typeof(a), js_typeof(b)
    if a is None or b is None:
        return False
    if ta == 'number' and tb == 'string':
        na, nb = float(a), js_num(b)
        return na == nb
    if ta == 'string' and tb == 'number':
        return js_num(a) == float(b)
    if ta == 'boolean':
        return loose_eq(js_num(a), b)
    if tb == 'boolean':
        return loose_eq(a, js_num(b))
    if ta == 'object' and tb in ('string', 'number'):
        return loose_eq(to_primitive(a), b)
    if tb == 'object' and ta in ('string', 'number'):
        return loose_eq(a, to_primitive(b))
    return False


def relat(a, b, op):
    if isinstance(a, JSObj):
        a = to_primitive(a, 'number')
    if isinstance(b, JSObj):
        b = to_primitive(b, 'number')
    if isinstance(a, str) and isinstance(b, str):
        return {'<': a < b, '<=': a <= b, '>': a > b, '>=': a >= b}[op]
    na, nb = js_num(a), js_num(b)
    if is_nan(na) or is_nan(nb):
        return False
    return {'<': na < nb, '<=': na <= nb, '>': na > nb, '>=': na >= nb}[op]


def js_add(a, b):
    pa, pb = a, b
    if isinstance(pa, JSObj):
        pa = to_primitive(pa, 'default')
    if isinstance(pb, JSObj):
        pb = to_primitive(pb, 'default')
    if isinstance(pa, str) or isinstance(pb, str):
        return js_str(pa) + js_str(pb)
    return js_num(pa) + js_num(pb)


def js_div(a, b):
    na, nb = js_num(a), js_num(b)
    if is_nan(na) or is_nan(nb):
        return float('nan')
    if nb == 0:
        if na == 0:
            return float('nan')
        sign = math.copysign(1.0, na) * math.copysign(1.0, nb)
        return float('inf') * sign
    if math.isinf(na) and math.isinf(nb):
        return float('nan')
    return na / nb


def js_mod(a, b):
    na, nb = js_num(a), js_num(b)
    if nb == 0 or is_nan(na) or is_nan(nb) or math.isinf(na):
        return float('nan')
    r = math.fmod(na, nb)
    return r


# ================================================================ 对象模型

class JSObj(object):
    _tag = 'Object'

    def __init__(self, props=None, proto=None, tag=None):
        self.props = dict(props) if props else {}
        self.accessors = {}
        self.proto = proto
        if tag:
            self._tag = tag

    def own_get(self, k):
        if k in self.accessors:
            g = self.accessors[k][0]
            return None if g is None else call_fn(g, self, [])
        if k in self.props:
            return self.props[k]
        return MISSING

    def own_set(self, k, v):
        if k in self.accessors:
            st = self.accessors[k][1]
            if st is None:
                raise JSError('TypeError', "Cannot set property %s of #<Object> which has only a getter" % k)
            call_fn(st, self, [v])
            return
        self.props[k] = v

    def own_del(self, k):
        self.accessors.pop(k, None)
        self.props.pop(k, None)
        return True

    def own_keys(self):
        ks = []
        for k in self.props:
            if k not in ks:
                ks.append(k)
        for k in self.accessors:
            if k not in ks:
                ks.append(k)
        return ks


class Builtin(JSObj):
    """内置原型命名空间：不参与 for-in 枚举。"""
    def own_keys(self):
        return []


class JSArray(JSObj):
    _tag = 'Array'

    def __init__(self, items=None, proto=None):
        JSObj.__init__(self, proto=(ARRAY_PROTO if proto is None else proto), tag='Array')
        self.items = list(items) if items else []

    def own_get(self, k):
        if k == 'length':
            return float(len(self.items))
        if is_index(k):
            i = int(k)
            return self.items[i] if 0 <= i < len(self.items) else None
        return JSObj.own_get(self, k)

    def own_set(self, k, v):
        if k == 'length':
            n = to_int32(v)
            if n < 0:
                raise JSError('RangeError', 'Invalid array length')
            if n < len(self.items):
                del self.items[n:]
            else:
                self.items.extend([None] * (n - len(self.items)))
            return
        if is_index(k):
            i = int(k)
            if i >= len(self.items):
                self.items.extend([None] * (i + 1 - len(self.items)))
            self.items[i] = v
            return
        JSObj.own_set(self, k, v)

    def own_del(self, k):
        if is_index(k):
            i = int(k)
            if 0 <= i < len(self.items):
                self.items[i] = None
            return True
        return JSObj.own_del(self, k)

    def own_keys(self):
        ks = [str(i) for i in range(len(self.items))]
        for k in JSObj.own_keys(self):
            if k not in ks:
                ks.append(k)
        return ks


def is_index(k):
    if not isinstance(k, str) or not k:
        return False
    if k == '0':
        return True
    return k.isdigit() and k[0] != '0' and int(k) < 4294967295


_FUNC_PROTO = [None]


class JSFunction(JSObj):
    _tag = 'Function'

    def __init__(self, name, impl, length=0):
        JSObj.__init__(self, tag='Function')
        self.proto = _FUNC_PROTO[0]
        self.name = name
        self.impl = impl
        self.length = length
        self.props['length'] = float(length)
        self.props['name'] = name
        pt = JSObj(tag='Object')
        pt.props['constructor'] = self
        self.props['prototype'] = pt

    def call(self, this, args):
        return self.impl(this, args)

    def construct(self, args):
        proto = self.props.get('prototype')
        obj = JSObj(proto=proto if isinstance(proto, JSObj) else OBJECT_PROTO)
        r = self.impl(obj, args)
        return r if isinstance(r, JSObj) else obj


class GlobalRef(JSObj):
    """opcode 5 的结果：b(name, strict) 惰性 globalThis 访问器。"""
    _tag = 'Object'

    def __init__(self, vm, name, strict):
        JSObj.__init__(self)
        self.vm = vm
        self.name = name
        self.strict = strict

    def own_get(self, k):
        if k != self.name:
            return None
        if self.name in self.vm.globs:
            return self.vm.globs[self.name]
        raise JSError('ReferenceError', self.name + ' is not defined')

    def own_set(self, k, v):
        if k != self.name:
            self.vm.globs[k] = v
            return
        if self.strict and self.name not in self.vm.globs:
            raise JSError('ReferenceError', self.name + ' is not defined')
        self.vm.globs[self.name] = v

    def own_keys(self):
        return []


class StateObj(JSObj):
    """模块级 J(pid, undefined, arguments, {...}) 状态对象（槽位走模块变量）。

    spec[slot] = (getter 变量名 or None, setter 变量名 or None) —— 同一槽位可同时有 get/set。
    """
    _tag = 'Object'

    def __init__(self, ns, spec):
        JSObj.__init__(self)
        self.ns = ns
        self.spec = spec

    def own_get(self, k):
        sp = self.spec.get(k)
        if sp is None:
            return MISSING
        gname = sp[0]
        if gname is None:
            return None                     # 只有 setter 时，JS 读该属性得 undefined
        return self.ns.get(gname)

    def own_set(self, k, v):
        sp = self.spec.get(k)
        if sp is None:
            self.props[k] = v
            return
        sname = sp[1]
        if sname is None:
            raise JSError('TypeError', 'Cannot set property ' + k + ' of #<Object> which has only a getter')
        self.ns[sname] = v

    def own_keys(self):
        return []


# ================================================================ 属性访问

STRING_PROTO = Builtin()
NUMBER_PROTO = Builtin()
BOOL_PROTO = Builtin()
ARRAY_PROTO = Builtin()
OBJECT_PROTO = Builtin()
REGEXP_PROTO = Builtin()
FUNC_PROTO = Builtin()
_FUNC_PROTO[0] = FUNC_PROTO

_PLOG = None


def set_prop_log(fn):
    global _PLOG
    _PLOG = fn


def getprop(obj, k):
    k = js_key(k)
    if obj is None:
        raise JSError('TypeError', "Cannot read properties of undefined (reading '%s')" % k)
    if obj is True or obj is False:
        return BOOL_PROTO.own_get(k) if k != 'length' else MISSING
    if isinstance(obj, (int, float)) and not isinstance(obj, bool):
        return NUMBER_PROTO.own_get(k)
    if isinstance(obj, str):
        if k == 'length':
            return float(len(obj))
        if is_index(k):
            i = int(k)
            return obj[i] if 0 <= i < len(obj) else None
        return STRING_PROTO.own_get(k)
    if k == '__proto__':
        return obj.proto
    o = obj
    while o is not None:
        v = o.own_get(k)
        if v is not MISSING:
            return v
        o = o.proto
    if _PLOG:
        _PLOG(obj, k)
    return None


def hasprop(obj, k):
    k = js_key(k)
    if obj is None:
        raise JSError('TypeError', "Cannot use 'in' operator to search for '%s' in undefined" % k)
    if isinstance(obj, str):
        if k == 'length' or is_index(k):
            return True
        return STRING_PROTO.own_get(k) is not MISSING
    if not isinstance(obj, JSObj):
        return False
    o = obj
    while o is not None:
        if o.own_get(k) is not MISSING:
            return True
        o = o.proto
    return False


def setprop(obj, k, v):
    k = js_key(k)
    if obj is None:
        raise JSError('TypeError', "Cannot set properties of undefined (setting '%s')" % k)
    if isinstance(obj, str):
        raise JSError('TypeError', "Cannot create property '%s' on string '%s'" % (k, obj))
    if not isinstance(obj, JSObj):
        raise JSError('TypeError', "Cannot create property '%s' on %s '%s'" % (k, js_typeof(obj), js_str(obj)))
    if k == '__proto__':
        obj.proto = v if isinstance(v, JSObj) else None
        return v
    o = obj
    while o is not None:
        if k in o.accessors or k in o.props:
            o.own_set(k, v)
            return v
        o = o.proto
    obj.own_set(k, v)
    return v


def delprop(obj, k):
    k = js_key(k)
    if not isinstance(obj, JSObj):
        return True
    o = obj
    while o is not None:
        if k in o.props or k in o.accessors:
            return o.own_del(k)
        o = o.proto
    return True


def enum_keys(obj):
    ks = []
    o = obj
    while o is not None:
        for k in o.own_keys():
            if k not in ks:
                ks.append(k)
        o = o.proto
    return ks


# ================================================================ 函数调用

def call_fn(fn, this, args):
    if isinstance(fn, DWrapper):
        return fn.call(this, args)
    if isinstance(fn, JSFunction):
        return fn.call(this, args)
    if callable(fn):
        return fn(this, args)
    raise JSError('TypeError', js_typeof(fn) + ' is not a function')


def construct_fn(fn, args):
    if isinstance(fn, DWrapper):
        return fn.construct(args)
    if isinstance(fn, JSFunction):
        return fn.construct(args)
    raise JSError('TypeError', js_typeof(fn) + ' is not a constructor')


class DWrapper(JSFunction):
    """D(pid, state) 产生的包装函数；hot=True 表示在 V 表中（调用走就地换帧）。"""
    _tag = 'Function'

    def __init__(self, vm, pid, state):
        JSFunction.__init__(self, 'n', None)
        self.vm = vm
        self.pid = pid
        self.state = state
        self.hot = True

    def call(self, this, args):
        return self.vm.X(self.pid, this, list(args), self.state)

    def construct(self, args):
        proto = self.props.get('prototype')
        obj = JSObj(proto=proto if isinstance(proto, JSObj) else OBJECT_PROTO)
        r = self.vm.X(self.pid, obj, list(args), self.state)
        return r if isinstance(r, JSObj) else obj


# ================================================================ 执行上下文

class Ctx(object):
    """一次 X() 调用的执行上下文（对应 JS 闭包里的 o,i,u,s,c,a,f,l,p,v,h）。"""
    __slots__ = ('vm', 'o', 'i', 'u', 's', 'c', 'a', 'f', 'l', 'p', 'v', 'h',
                 'bc', 'extab', 'stack', 'frames', 'pid')

    def __init__(self, vm, pid, this, args, state):
        self.vm = vm
        self.pid = pid
        entry = ZT[pid]
        self.bc = entry[0]
        self.i = entry[2]
        self.extab = entry[3]
        self.o = entry[0]
        self.u = entry[3]
        arity = entry[1]
        n = min(len(args), arity)
        vobj = JSObj()
        vobj.props['length'] = float(len(args))
        s = JSArray([state, vobj])
        for k in range(n):
            s.items.append(args[k])
        for k in range(len(args)):
            vobj.props[str(k)] = args[k]
        self.s = s
        self.c = this
        self.a = 0
        self.f = 0
        self.l = None
        self.p = -1
        self.v = []
        self.h = []
        self.stack = None
        self.frames = None

    # --- 栈操作 ---
    def vget(self, i):
        v = self.v
        return v[i] if 0 <= i < len(v) else None

    def vset(self, i, val):
        v = self.v
        if i < 0:
            raise JSThrow('negative stack index')
        if i < len(v):
            v[i] = val
        else:
            v.extend([None] * (i - len(v)))
            v.append(val)

    def push(self, val):
        self.p += 1
        self.vset(self.p, val)

    def pop(self):
        val = self.vget(self.p)
        self.p -= 1
        return val

    def vslice(self, st, en):
        return [self.vget(x) for x in range(st, en)]

    def sget(self, idx):
        s = self.s
        return s.items[idx] if 0 <= idx < len(s.items) else None

    def sset(self, idx, val):
        s = self.s
        if idx < len(s.items):
            s.items[idx] = val
        else:
            s.items.extend([None] * (idx - len(s.items)))
            s.items.append(val)

    # --- g(t, r, e, n)：就地切帧（调用方保存 8 元组） ---
    def enter_frame(self, pid, this, args, state):
        # 第 9 项 pid 是 Python 侧簿记：JS 里程序身份隐含在 o（字节码数组）里，移植后单独保存
        self.h.append([self.o, self.i, self.u, self.s, self.c, self.a, self.f, self.l, self.pid])
        entry = ZT[pid]
        arity = entry[1]
        n = min(len(args), arity)
        vobj = JSObj()
        vobj.props['length'] = float(len(args))
        s = JSArray([state, vobj])
        for k in range(n):
            s.items.append(args[k])
        for k in range(len(args)):
            vobj.props[str(k)] = args[k]
        self.pid = pid
        self.o = entry[0]
        self.bc = entry[0]
        self.i = entry[2]
        self.u = entry[3]
        self.extab = entry[3]
        self.s = s
        self.c = this
        self.a = 0
        self.f = 0
        self.l = None

    # --- 顶层驱动：do { d() } while (y()) ---
    def run(self, pid, orig_args=None):
        trace = self.vm.trace
        trace.enter(pid, orig_args if orig_args is not None else self.vobj_args())
        while True:
            try:
                self.exec_block()
            except JSError as ex:
                # 对应 JS: try { d() } catch (t) { f = 3; l = t; }
                self.f = 3
                self.l = ex.kind + ': ' + ex.msg
            except JSThrow as ex:
                # 嵌套 X（native apply / new）把 JS 异常抛回本帧的 d()，同样落到 catch
                self.f = 3
                self.l = ex.value
            except RecursionError:
                raise
            if not self.unwind():
                break
        trace.exit(pid, self.l)
        return self.l

    def vobj_args(self):
        vobj = self.s.items[1]
        n = int(vobj.props.get('length', 0.0))
        return [vobj.props.get(str(k)) for k in range(n)]

    # --- y() ---
    def unwind(self):
        t = self.a
        r = self.u
        if _DBG[0] is not None and (_DBG[2] is None or self.pid == _DBG[2]):
            print('UNWIND pid=%s f=%s a=%s l=%r' % (self.pid, self.f, self.a, self.l), file=sys.stderr)
        if self.f == 1:
            for idx in range(len(r) - 1, -1, -1):
                n = r[idx]
                if n[0] < t <= n[3]:
                    if t <= n[2] and n[2] != n[3]:
                        self.a = n[2]
                    else:
                        self.a = self.l
                        self.f = 0
                        self.l = None
                    return True
            raise JSThrow('SyntaxError: Illegal statement')
        if self.f == 2:
            for idx in range(len(r) - 1, -1, -1):
                n = r[idx]
                if n[0] < t <= n[2] and n[2] != n[3]:
                    self.a = n[2]
                    return True
            if self.h:
                g = self.h.pop()
                self.push(self.l)
                (self.o, self.i, self.u, self.s, self.c, self.a, self.f, self.l, self.pid) = g
                return True
            return False
        if self.f == 3:
            for idx in range(len(r) - 1, -1, -1):
                n = r[idx]
                if n[0] < t:
                    if t <= n[1] and n[1] != n[2]:
                        self.a = n[1]
                        self.push(self.l)
                        self.f = 0
                        self.l = None
                        return True
                    if t <= n[2] and n[2] != n[3]:
                        self.a = n[2]
                        return True
            if self.h:
                g = self.h.pop()
                (self.o, self.i, self.u, self.s, self.c, self.a, self.pid) = g[:6] + g[8:]
                return self.unwind()
            raise JSThrow(self.l)
        return True

    # --- d() ---
    def exec_block(self):
        vm = self.vm
        globs = vm.globs
        o = self.o
        Zl = Z
        while True:
            op = o[self.a]
            self.a += 1
            if _DBG[0] is not None and (_DBG[2] is None or self.pid == _DBG[2]):
                _DBG[0] += 1
                if _DBG[0] < _DBG[1]:
                    print('OP pid=%s pc=%s op=%s p=%s f=%s' % (self.pid, self.a - 1, op, self.p, self.f), file=sys.stderr)

            if op == 0:
                argc = o[self.a]; self.a += 1
                self.p -= argc
                e = self.vslice(self.p + 1, self.p + argc + 1)
                n = self.pop()
                d = self.pop()
                if not isinstance(n, (JSFunction, DWrapper)) and not callable(n):
                    self.f = 3
                    self.l = 'TypeError: ' + js_typeof(n) + ' is not a function'
                    return
                if isinstance(n, DWrapper) and n.hot:
                    # 就地换帧：JS 里 g() 改的是闭包变量，d() 的 while 循环下一轮直接读新 o；
                    # Python 里 exec_block 的 o 是局部快照，故此处 return，由 do-while 重新进入。
                    self.enter_frame(n.pid, d, e, n.state)
                    return
                else:
                    # JS: n.apply(d,e) 抛出的异常会被 X 的 do{try{d()}catch(t){f=3;l=t}} 捕获
                    try:
                        m = call_fn(n, d, e)
                    except JSThrow as _ex:
                        self.f = 3
                        self.l = _ex.value
                        return
                    self.push(m)

            elif op == 1:
                w = self.pop(); self.vset(self.p, relat(self.vget(self.p), w, '<='))
            elif op == 2:
                w = self.pop(); self.vset(self.p, relat(self.vget(self.p), w, '>'))
            elif op == 3:
                x = o[self.a]; self.a += 1
                S = self.pop()
                self.sset(x, JSArray([enum_keys(S), S]))
            elif op == 4:
                x = o[self.a]; self.a += 1
                O = self.pop()
                R = self.pop()
                P = self.sget(x)
                j = None
                while True:
                    j = P.items[0].items.pop(0) if P.items[0].items else None
                    if j is None or hasprop(P.items[1], j):
                        break
                if j is not None:
                    setprop(R, O, j)
                    self.push(True)
                else:
                    self.push(False)
            elif op == 5:
                x = o[self.a]; self.a += 1
                A = Zl[x]
                self.push(GlobalRef(vm, A, js_bool(self.i)))
                self.push(A)
            elif op == 6:
                w = self.pop(); self.vset(self.p, not strict_eq(self.vget(self.p), w))
            elif op == 7:
                self.push(JSObj())
            elif op == 8:
                k = self.pop()
                self.vset(self.p, getprop(self.vget(self.p), k))
            elif op == 9:
                self.push(True)
            elif op == 10:
                self.vset(self.p, None)
            elif op == 11:
                E = self.pop()
                self.vset(self.p, js_mod(self.vget(self.p), E))
            elif op == 12:
                w = self.pop()
                self.vset(self.p, float(to_int32(self.vget(self.p)) & to_int32(w)))
            elif op == 13:
                S = self.pop()
                if isinstance(S, (JSFunction, DWrapper)):
                    proto = S.props.get('prototype')
                    v = self.vget(self.p)
                    r = False
                    p2 = v.proto if isinstance(v, JSObj) else None
                    while p2 is not None:
                        if p2 is proto:
                            r = True
                            break
                        p2 = p2.proto
                    self.vset(self.p, r)
                else:
                    self.vset(self.p, False)
            elif op == 14:
                E = self.pop(); T = self.pop(); S = self.pop()
                setprop(S, T, E)
            elif op == 15:
                x = o[self.a]; self.a += 1
                E = self.pop()
                C = Zl[x]
                if js_bool(self.i) and C not in globs:
                    self.f = 3
                    self.l = 'ReferenceError: ' + C + ' is not defined'
                    return
                globs[C] = E
            elif op == 16:
                L = self.pop()
                S = self.pop()
                setprop(S, L, self.vget(self.p))
            elif op == 17:
                U = o[self.a]; self.a += 1
                if js_bool(self.vget(self.p)):
                    self.p -= 1
                else:
                    self.a += U
            elif op == 18:
                self.push(self.vget(self.p))
            elif op == 19:
                w = self.pop()
                self.vset(self.p, float(to_uint32(self.vget(self.p)) >> (to_uint32(w) & 31)))
            elif op == 20:
                x = o[self.a]; self.a += 1
                E = self.pop(); S = self.pop()
                setprop(S, Zl[x], E)
            elif op == 21:
                E = self.pop()
                self.vset(self.p, js_num(self.vget(self.p)) - js_num(E))
            elif op == 22:
                if self.f != 0:
                    return
            elif op == 23:
                U = o[self.a]; self.a += 1
                E = self.pop()
                if strict_eq(self.vget(self.p), E):
                    self.p -= 1
                    self.a += U
            elif op == 24:
                self.vset(self.p, js_typeof(self.vget(self.p)))
            elif op == 25:
                I = self.pop()
                S = self.pop()
                self.push(delprop(S, I))
            elif op == 26:
                self.p -= 1
            elif op == 27:
                self.push(False)
            elif op == 28:
                self.push(float('nan'))
            elif op == 29:
                self.vset(self.p, not js_bool(self.vget(self.p)))
            elif op == 30:
                x = o[self.a]; self.a += 1
                self.vset(self.p, getprop(self.vget(self.p), Zl[x]))
            elif op == 31:
                U = o[self.a]; self.a += 1
                if js_bool(self.vget(self.p)):
                    self.a += U
                else:
                    self.p -= 1
            elif op == 32:
                w = self.pop(); self.vset(self.p, relat(self.vget(self.p), w, '<'))
            elif op == 33:
                self.push(None)
            elif op == 34:
                self.push(self.c)
            elif op == 35:
                w = self.pop()
                self.vset(self.p, float(to_int32(self.vget(self.p)) >> (to_uint32(w) & 31)))
            elif op == 36:
                self.vset(self.p, js_num(self.vget(self.p)))
            elif op == 37:
                self.vset(self.p, float(~to_int32(self.vget(self.p))))
            elif op == 38:
                self.push(float(o[self.a])); self.a += 1
            elif op == 39:
                F = o[self.a]; self.a += 1
                self.p = self.p - F + 1
                self.vset(self.p, JSArray(self.vslice(self.p, self.p + F)))
            elif op == 40:
                M = self.pop()
                S = self.pop()
                cur = js_num(getprop(S, M)) + 1.0
                setprop(S, M, cur)
                self.push(cur)
            elif op == 41:
                U = o[self.a]; self.a += 1
                if not js_bool(self.vget(self.p)):
                    self.a += U
                self.p -= 1
            elif op == 42:
                E = self.pop()
                self.vset(self.p, js_div(self.vget(self.p), E))
            elif op == 43:
                self.vset(self.p, -js_num(self.vget(self.p)))
            elif op == 44:
                B = self.pop()
                S = self.pop()
                cur = js_num(getprop(S, B)) - 1.0
                setprop(S, B, cur)
                self.push(cur)
            elif op == 45:
                E = self.pop()
                self.vset(self.p, js_num(self.vget(self.p)) * js_num(E))
            elif op == 46:
                x = o[self.a]; self.a += 1
                self.push(js_num(Zl[x]))
            elif op == 47:
                x = o[self.a]; self.a += 1
                Q = self.pop()
                tgt = self.vget(self.p)
                _define_accessor(tgt, Zl[x], Q, None)
            elif op == 48:
                x = o[self.a]; self.a += 1
                H = self.pop()
                tgt = self.vget(self.p)
                _define_accessor(tgt, Zl[x], None, H)
            elif op == 49:
                self.f = 3
                self.l = self.pop()
                return
            elif op == 50:
                q = self.pop()
                S = self.pop()
                cur = js_num(getprop(S, q))
                setprop(S, q, cur + 1.0)
                self.push(cur)
            elif op == 51:
                w = self.pop()
                self.vset(self.p, float(to_int32(self.vget(self.p)) | to_int32(w)))
            elif op == 52:
                U = o[self.a]; self.a += 1
                self.f = 1
                self.l = self.a + U
                return
            elif op == 53:
                U = o[self.a]; self.a += 1
                self.a += U
            elif op == 54:
                N = o[self.a]; x = o[self.a + 1]; self.a += 2
                U = self.s
                while N > 0:
                    # JS 是 U = U[0]（普通属性访问，会触发 state 对象上的 getter）；
                    # 旧实现 U.items[0] 只能在 JSArray 上工作，遇到带 accessor 的 state 就会走错链。
                    U = getprop(U, '0')
                    N -= 1
                setprop(U, str(x), self.pop())
            elif op == 55:
                S = self.pop()
                self.vset(self.p, hasprop(S, self.vget(self.p)))
            elif op == 56:
                w = self.pop()
                self.vset(self.p, float(to_int32(to_int32(self.vget(self.p)) << (to_uint32(w) & 31))))
            elif op == 57:
                w = self.pop(); self.vset(self.p, strict_eq(self.vget(self.p), w))
            elif op == 58:
                w = self.pop(); self.vset(self.p, loose_eq(self.vget(self.p), w))
            elif op == 59:
                r = o[self.a]; self.a += 1
                G = [None] * (r + 1)
                while r > 0:
                    G[r] = self.pop()
                    r -= 1
                z = self.pop()
                self.push(construct_fn(z, G[1:]))
            elif op == 60:
                x = o[self.a]; self.a += 1
                Y = Zl[x]
                if Y not in globs:
                    self.f = 3
                    self.l = 'ReferenceError: ' + Y + ' is not defined'
                    return
                self.push(globs[Y])
            elif op == 61:
                N = o[self.a]; x = o[self.a + 1]; self.a += 2
                U = self.s
                while N > 0:
                    # JS 是 U = U[0]（普通属性访问，会触发 state 对象上的 getter）；
                    # 旧实现 U.items[0] 只能在 JSArray 上工作，遇到带 accessor 的 state 就会走错链。
                    U = getprop(U, '0')
                    N -= 1
                self.push(U)
                self.push(str(x))
            elif op == 62:
                w = self.pop(); self.vset(self.p, not loose_eq(self.vget(self.p), w))
            elif op == 63:
                t2 = o[self.a]; self.a += 1
                self.push(vm.D(t2, self.s))
            elif op == 64:
                w = self.pop(); self.vset(self.p, relat(self.vget(self.p), w, '>='))
            elif op == 65:
                self.push(float('inf'))
            elif op == 66:
                J = self.pop()
                S = self.pop()
                cur = js_num(getprop(S, J))
                setprop(S, J, cur - 1.0)
                self.push(cur)
            elif op == 67:
                x = o[self.a]; self.a += 1
                E = self.pop()
                tgt = self.vget(self.p)
                if not isinstance(tgt, JSObj):
                    raise JSError('TypeError', 'Object.defineProperty called on non-object')
                tgt.props[Zl[x]] = E
            elif op == 68:
                E = self.pop()
                self.vset(self.p, js_add(self.vget(self.p), E))
            elif op == 69:
                x = o[self.a]; self.a += 1
                self.push(js_typeof(globs.get(Zl[x])))
            elif op == 70:
                w = self.pop()
                self.vset(self.p, float(to_int32(self.vget(self.p)) ^ to_int32(w)))
            elif op == 71:
                U = o[self.a]; self.a += 1
                if js_bool(self.pop()):
                    self.a += U
            elif op == 72:
                x = o[self.a]; self.a += 1
                W = Zl[x]
                if W not in globs:
                    globs[W] = None
            elif op == 73:
                self.push(Zl[o[self.a]]); self.a += 1
            elif op == 74:
                N = o[self.a]; x = o[self.a + 1]; self.a += 2
                U = self.s
                while N > 0:
                    # JS 是 U = U[0]（普通属性访问，会触发 state 对象上的 getter）；
                    # 旧实现 U.items[0] 只能在 JSArray 上工作，遇到带 accessor 的 state 就会走错链。
                    U = getprop(U, '0')
                    N -= 1
                self.push(getprop(U, str(x)))
            elif op == 75:
                self.push(None)
            else:
                self.f = 2
                self.l = self.pop()
                return


def _define_accessor(tgt, key, getter, setter):
    if not isinstance(tgt, JSObj):
        raise JSError('TypeError', 'Object.defineProperty called on non-object')
    entry = list(tgt.accessors.get(key, [None, None]))
    if getter is not None:
        entry[0] = getter
    if setter is not None:
        entry[1] = setter
    tgt.accessors[key] = tuple(entry)


class Trace(object):
    def __init__(self, on=False, limit=100000):
        self.on = on
        self.lines = []
        self.depth = 0
        self.limit = limit

    def emit(self, s):
        if self.on and len(self.lines) < self.limit:
            self.lines.append(s)

    def enter(self, pid, args):
        self.emit('%s> %d argc=%d %s' % ('  ' * self.depth, pid, len(args), summ_args(args)))
        self.depth += 1

    def exit(self, pid, ret):
        self.depth -= 1
        self.emit('%s< %d => %s' % ('  ' * self.depth, pid, summ1(ret)))


def summ1(x):
    if x is None:
        return 'undef'
    if isinstance(x, bool):
        return 'true' if x else 'false'
    if isinstance(x, (int, float)):
        return num_to_str(float(x))
    if isinstance(x, str):
        return json.dumps(x if len(x) <= 60 else x[:60] + '…', ensure_ascii=False)
    if isinstance(x, JSArray):
        return '[arr %d]' % len(x.items)
    if isinstance(x, (JSFunction, DWrapper)):
        return '[fn %s]' % getattr(x, 'name', '?')
    if isinstance(x, JSObj):
        return '[obj %s]' % '|'.join(list(x.props.keys())[:6])
    return '[%s]' % type(x).__name__


def summ_args(args):
    return ' , '.join(summ1(a) for a in args[:6])


class VM(object):
    def __init__(self, globs, trace=None):
        self.globs = globs
        self.V = {}
        self.Y = {}
        self.trace = trace or Trace(False)
        self.rnd = None

    def D(self, pid, state):
        old = self.Y.get(pid)
        if old is not None:
            old.hot = False
            self.V.pop(id(old), None)
        w = DWrapper(self, pid, state)
        self.Y[pid] = w
        self.V[id(w)] = w
        return w

    def X(self, pid, this, args, state):
        ctx = Ctx(self, pid, this, list(args), state)
        return ctx.run(pid, list(args))
