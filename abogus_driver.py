# -*- coding: utf-8 -*-
# abogus.py 第三部分：装配 + 驱动
import json, sys, os

def obj_tostring_call(obj):
    if obj is None: return '[object Undefined]'
    if isinstance(obj, bool): return '[object Boolean]'
    if isinstance(obj, (int, float)): return '[object Number]'
    if isinstance(obj, str): return '[object String]'
    if isinstance(obj, JSArray): return '[object Array]'
    if isinstance(obj, JSFunction): return '[object Function]'
    if hasattr(obj, '_jsTag'): return '[object ' + obj._jsTag + ']'
    return '[object Object]'

class SM3ClassFn(JSFunction):
    def __init__(self):
        super().__init__('t', None)
    def construct(self, args):
        e = SM3Engine()
        if args: e.write(args[0])
        return e
    def call(self, this, args):
        e = SM3Engine()
        if args: e.write(args[0])
        return e

def build_and_sign(query):
    globs = make_globs()
    vm = VM(globs)
    module = {}

    # ---- nr: 可调用对象 + 属性 ----
    def nr_entropy(this, args):
        r = int(lcg_rand() * 256)
        return JSArray([0, 0, 0, 0, r])
    nr = JSFunction('n', lambda t, a: nr_entropy(t, a))
    nr.props['0'] = jsfn('entropy', lambda t, a: nr_entropy(t, a))
    nr.props['3'] = SM3ClassFn()
    nr.props['4'] = jsfn('vt', lambda t, a: 0)       # 待校准
    nr.props['1'] = jsfn('qt', lambda t, a: False)   # 待校准
    nr.props['6'] = jsfn('N', lambda t, a: False)    # 待校准
    module['nr'] = nr

    def yt_fn(this, args):
        ua = args[0] if args else ''
        return str(ua)
    module['Yt'] = jsfn('Yt', yt_fn)

    # J132 state: getters 0-7, setters 8-12
    class J132State(dict):
        def __init__(self, mod):
            super().__init__()
            self.mod = mod
        def get(self, k, *a):
            k = str(k)
            m = {'0': 'nr', '1': 'qt', '2': 'Ht', '3': 'gr', '4': 'vt', '5': 'vr', '6': 'N', '7': 'Yt'}
            if k in m: return self.mod.get(m[k])
            names = {'8': 'cr', '9': 'ar', '10': 'fr', '11': 'lr', '12': 'pr'}
            if k in names: return self.mod.get(names[k])
            if a: return a[0]
            return None
        def set(self, k, v):
            names = {'8': 'cr', '9': 'ar', '10': 'fr', '11': 'lr', '12': 'pr'}
            self.mod[names[str(k)]] = v
            return v
        def __contains__(self, k): return True

    st132 = J132State(module)
    module['gr'] = SM3ClassFn()
    module['qt'] = None; module['Ht'] = None; module['vt'] = None; module['vr'] = None; module['N'] = None

    # 运行程序 132：创建 D 图 + 盐
    vm.X(132, None, [], st132)
    cr = module.get('cr')
    lr = module.get('lr')
    pr = module.get('pr')
    s132 = vm.V[id(cr)][1] if cr is not None and id(cr) in vm.V else None
    print('s132 slots:', len(s132) if s132 else 'NONE', '| cr:', bool(cr), '| lr:', bool(lr), '| pr:', bool(pr))

    # ---- deep 配置 / U ----
    deep0 = JSObject()
    deep0['14'] = pr
    deep = JSObject()
    deep['0'] = deep0
    deep['3'] = JSObject(inner='')
    deep['5'] = jsfn('hook', lambda t, a: None)
    deep['33'] = jsfn('invoke', lambda t, a: None)
    deep['36'] = jsfn('path', lambda t, a: True)
    deep['18'] = JSObject(pageId=6241, aid=6383)
    deep['12'] = lr
    deep['13'] = cr
    deep['17'] = jsfn('jr', lambda t, a: None)
    U = JSObject()
    U['0'] = deep
    deep['37'] = vm.D(103, U)

    # ---- FakeXHR: open/send 走 105/107 ----
    orig_open = FakeXHR.open
    orig_send = FakeXHR.send
    class HookedXHR(FakeXHR):
        pass
    def hooked_open(self, method, url, *a):
        vm.X(105, self, [str(method), str(url)], U)
    def hooked_send(self, body, *a):
        args = [body]
        vm.X(107, self, args, U)
    HookedXHR.open = hooked_open
    HookedXHR.send = hooked_send
    globs['XMLHttpRequest'] = JSFunction('XMLHttpRequest', lambda t, a: HookedXHR())

    xhr = HookedXHR()
    xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/social/count?' + query)
    xhr.send(None)
    if 'a_bogus=' not in xhr._url:
        raise Exception('no a_bogus: ' + xhr._url[-100:])
    bogus = xhr._url.split('a_bogus=', 1)[1].split('&', 1)[0]
    return bogus

if __name__ == '__main__':
    q = sys.argv[1] if len(sys.argv) > 1 else ''
    print(build_and_sign(q))
