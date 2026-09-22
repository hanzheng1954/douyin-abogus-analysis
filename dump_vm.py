#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""bdms VM 表解码器（纯 Python 重实现，可脱离浏览器/Node 复现 vm_*.json）

来源：bdms 内 J(t,r,e,n) 的非惰性初始化分支，反混淆后等价于
    1. atob(blob) -> 二进制
    2. key = 解码后字节[4..8) 之和 % 256
    3. 字节 8 起逐字节 XOR：b[i] ^ ((key + key%10*i) % 256)
    4. raw deflate 解压 -> 字节流
    5. 读 1001 个字符串（码点 varint），再读 796 个程序 [bytecode, arity, flags, exTable]

用法:
    python3 dump_vm.py [bdms.js] [--out-dir DIR] [--diff]
    默认输入 capture/293_..._bdms_1.0.1.19_fix.js.js，默认输出 out-dir=rebuilt_vm
"""
import argparse, base64, json, os, re, sys, zlib

BASE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_INPUT = os.path.join(
    BASE, 'capture',
    '293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js')


class Reader:
    """复刻 bdms 的两个读取原语 W（varint）与 K（码点串）"""

    def __init__(self, data):
        self.d = data
        self.i = 0

    def varint(self):
        r, e = 0, 0
        while True:
            n = self.d[self.i]; self.i += 1
            r |= (n & 127) << e
            e += 7
            if not (n & 128):
                # 32 位有符号回绕（对应 JS 的 r|-1<<e）
                if e < 32 and (n & 64):
                    r |= -1 << e
                return r

    def string(self):
        r, out = -1, []
        while True:
            n = self.d[self.i]; self.i += 1
            if 128 <= n < 192:
                r = (r << 6) + (n & 63)
                continue
            if r >= 0:
                out.append(r)
            if n < 128:
                r = n
            elif n < 224:
                r = n & 31
            elif n < 240:
                r = n & 15
            elif n < 248:
                r = n & 7
            else:
                break
        return ''.join(chr(c) for c in out)


def extract_blob(js_text):
    """取文件里最长的一段 base64 —— 即程序表 blob（38KB 级）"""
    runs = re.findall(r'[A-Za-z0-9+/=]{2000,}', js_text)
    if not runs:
        raise SystemExit('未找到 VM 表 blob（文件格式可能已变）')
    return max(runs, key=len)


def decode(blob):
    raw = base64.b64decode(blob)
    key = sum(raw[4:8]) % 256
    body = bytes((b ^ ((key + (key % 10) * i) % 256)) & 0xFF for i, b in enumerate(raw[8:]))
    for wbits in (-15, 15, 31):
        try:
            stream = zlib.decompress(body, wbits)
            break
        except zlib.error:
            continue
    else:
        raise SystemExit('deflate 解压失败（XOR key 或头部长度可能已变）')

    r = Reader(stream)
    Z = [r.string() for _ in range(r.varint())]
    progs = []
    for _ in range(r.varint()):
        arity = r.varint()
        flags = bool(r.varint())
        ex = [[r.varint(), r.varint(), r.varint(), r.varint()] for _ in range(r.varint())]
        bc = [r.varint() for _ in range(r.varint())]
        progs.append([bc, arity, flags, ex])
    return key, raw[:8].hex(), Z, progs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('input', nargs='?', default=DEFAULT_INPUT)
    ap.add_argument('--out-dir', default=os.path.join(BASE, 'rebuilt_vm'))
    ap.add_argument('--diff', action='store_true', help='与仓库内 vm_*.json 对拍')
    args = ap.parse_args()

    text = open(args.input, encoding='utf-8', errors='replace').read()
    blob = extract_blob(text)
    key, header, Z, progs = decode(blob)

    m = re.search(r'/\* V ([\d.]+[-\w.]*) \*/', text)
    print(f"输入      {os.path.relpath(args.input, BASE)}")
    print(f"版本头    {m.group(1) if m else '?'} | blob {len(blob)}B | 头部 {header} | XOR key {key} (0x{key:02X})")
    print(f"解码结果  字符串 {len(Z)} | 程序 {len(progs)}")
    idx = [{'i': i, 'arity': p[1], 'flags': p[2], 'bcLen': len(p[0]), 'exLen': len(p[3])}
           for i, p in enumerate(progs)]

    os.makedirs(args.out_dir, exist_ok=True)
    for name, obj in (('vm_Z.json', Z), ('vm_z_full.json', progs), ('vm_z_index.json', idx)):
        with open(os.path.join(args.out_dir, name), 'w', encoding='utf-8') as fh:
            json.dump(obj, fh, ensure_ascii=False)
    print(f"已写出    {os.path.relpath(args.out_dir, BASE)}/vm_Z.json vm_z_full.json vm_z_index.json")

    if args.diff:
        ok = True
        for name, obj in (('vm_Z.json', Z), ('vm_z_full.json', progs), ('vm_z_index.json', idx)):
            p = os.path.join(BASE, name)
            if not os.path.exists(p):
                print(f"  {name}: 仓库内无此文件，跳过"); continue
            old = json.load(open(p, encoding='utf-8'))
            same = old == obj
            ok &= same
            print(f"  {name}: {'一致 ✅' if same else '不一致 ❌'} （仓库 {len(old)} 项 / 重建 {len(obj)} 项）")
            if not same and name == 'vm_z_index.json':
                for a, b in zip(old, obj):
                    if a != b:
                        print(f"    首个差异: 仓库 {a} / 重建 {b}")
                        break
        return 0 if ok else 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
