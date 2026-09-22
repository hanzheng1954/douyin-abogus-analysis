#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""gen_boot.py — 从 bdms_patched.js 抽取模块级引导序列（J(pid, undefined, arguments, {state}) 
与 `var X = Y;` 别名语句），生成 vm_boot.py。只读 bdms_patched.js，不修改它。"""
import re, sys, os, json

DIR = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(DIR, 'bdms_patched.js')

lines = open(SRC, encoding='utf-8').read().split('\n')
start = next(i for i, l in enumerate(lines) if l.strip().startswith('J(232, undefined, arguments, {'))
# 结束：最后一个 J(0, ...) 块
end = next(i for i, l in enumerate(lines) if l.strip().startswith('J(0, undefined, arguments, {'))

GET = re.compile(r'^\s*get (\d+)\(\) \{\s*$')
GET1 = re.compile(r'^\s*get (\d+)\(\) \{ return ([\w$]+); \}\s*$')
SET = re.compile(r'^\s*set (\d+)\(t\) \{\s*$')
SET1 = re.compile(r'^\s*set (\d+)\(t\) \{ ([\w$]+) = t; \}\s*$')
VARALIAS = re.compile(r'^\s*var ([\w$]+) = ([\w$]+);\s*$')

boot = []
i = start
while i <= end:
    l = lines[i]
    m = re.match(r'\s*J\((\d+), undefined, arguments, \{\s*$', l)
    if m:
        pid = int(m.group(1))
        spec = []
        i += 1
        while i < len(lines) and lines[i].strip() != '});':
            g = GET1.match(lines[i])
            if g:
                spec.append([int(g.group(1)), 'get', g.group(2)]); i += 1; continue
            if GET.match(lines[i]):
                # get N() {\n return VAR;\n }
                idx = int(GET.match(lines[i]).group(1))
                ret = re.match(r'\s*return ([\w$]+);\s*$', lines[i + 1])
                assert ret, lines[i:i + 3]
                spec.append([idx, 'get', ret.group(1)]); i += 2; continue
            s = SET1.match(lines[i])
            if s:
                spec.append([int(s.group(1)), 'set', s.group(2)]); i += 1; continue
            if SET.match(lines[i]):
                idx = int(SET.match(lines[i]).group(1))
                asg = re.match(r'\s*([\w$]+) = t;\s*$', lines[i + 1])
                assert asg, lines[i:i + 3]
                spec.append([idx, 'set', asg.group(1)]); i += 2; continue
            if lines[i].strip() in ('', '},', '}'):
                i += 1; continue
            raise SystemExit('UNPARSED in J(%d) at line %d: %r' % (pid, i + 1, lines[i]))
        boot.append(['J', pid, spec])
        i += 1
        continue
    a = VARALIAS.match(l)
    if a:
        boot.append(['alias', a.group(1), a.group(2)]); i += 1; continue
    if re.match(r'\s*var [\w$]+;\s*$', l) or l.strip() == '':
        i += 1; continue
    # 函数定义等：跳过整块（顶层 function NAME(...) {...}）
    fm = re.match(r'\s*function ([\w$]+)\(', l)
    if fm:
        depth = 0
        while i < len(lines):
            depth += lines[i].count('{') - lines[i].count('}')
            i += 1
            if depth <= 0:
                break
        continue
    # var X = function ... 之类
    if re.match(r'\s*var ([\w$]+) = function', l):
        depth = 0
        while i < len(lines):
            depth += lines[i].count('{') - lines[i].count('}')
            i += 1
            if depth <= 0:
                break
        continue
    raise SystemExit('UNHANDLED top-level statement at line %d: %r' % (i + 1, l))

out = ['# -*- coding: utf-8 -*-',
       '# 由 gen_boot.py 从 bdms_patched.js 自动生成，勿手改。',
       '# 每项: ("J", pid, [[slot, "get"|"set", 变量名], ...]) 或 ("alias", 左值, 右值)',
       'BOOT = [']
for e in boot:
    out.append('    %r,' % (tuple(e),))
out.append(']')
open(os.path.join(DIR, 'vm_boot.py'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')

jcalls = [e for e in boot if e[0] == 'J']
print('boot entries:', len(boot), '| J calls:', len(jcalls), '| aliases:', len(boot) - len(jcalls))
print('pids:', [e[1] for e in jcalls])
print('lines: %d..%d' % (start + 1, end + 1))
