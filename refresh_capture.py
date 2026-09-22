#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""重新抓取 douyin.com 首页内联运行时与全部风控 SDK，落到带日期的 capture 目录。

只 GET 公开静态资源与首页；不调用业务接口、不带 cookie。
产出：<out>/ 下同名文件 + manifest.json（url/大小/sha256/版本头）
"""
import argparse, hashlib, json, os, re, ssl, sys, urllib.request, urllib.error

BASE = os.path.dirname(os.path.abspath(__file__))
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36')
HOMEPAGE = 'https://www.douyin.com/'

SDK = [
    ('webmssdk_1.0.0.20',        'https://lf-c-flwb.bytetos.com/obj/rc-client-security/c-webmssdk/1.0.0.20/webmssdk.es5.js'),
    ('sdk-glue_1.0.0.64-fix.01', 'https://lf-c-flwb.bytetos.com/obj/rc-client-security/web/glue/1.0.0.64-fix.01/sdk-glue.js'),
    ('bdms_1.0.1.19_fix',        'https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/bdms_1.0.1.19_fix.js'),
    ('verifycenter_1.0.0.413',   'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/verifycenter/1.0.0.413/index.js'),
    ('verifycenter_1.0.0.417',   'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/verifycenter/1.0.0.417/index.js'),
    ('captcha_4.0.28',           'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/sec_sdk_build/4.0.28/captcha/index.js'),
    ('rmc-nocaptcha_1.0.0.51',   'https://lf-cdn-tos.bytescm.com/obj/rc-verifycenter/rmc-nocaptcha/1.0.0.51/setup.js'),
]


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=40, context=ssl.create_default_context()) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, b''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=os.path.join(BASE, 'capture_' + __import__('datetime').date.today().strftime('%Y%m%d')))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)
    manifest = []

    code, html = fetch(HOMEPAGE)
    text = html.decode('utf-8', 'replace')
    blocks = re.findall(r'<script[^>]*>(.*?)</script>', text, re.S)
    for i, b in enumerate(blocks):
        if len(b) < 200:
            continue
        name = f'inline_{i}.js'
        open(os.path.join(args.out, name), 'w', encoding='utf-8').write(b)
        manifest.append({'name': name, 'url': HOMEPAGE + f'#inline{i}', 'http': code,
                         'bytes': len(b), 'sha256': hashlib.sha256(b.encode()).hexdigest()})
    print(f"首页 http={code} bytes={len(html)} 内联块={len(blocks)}")

    for name, url in SDK:
        code, data = fetch(url)
        if not data:
            print(f"{name:<28} http={code} ！！未取到")
            manifest.append({'name': name, 'url': url, 'http': code, 'bytes': 0})
            continue
        ext = '.js'
        payload = data.decode('utf-8', 'replace')
        m = re.search(r'/\* V ([\d.]+[-\w.]*) \*/', payload)
        fn = name + ext
        open(os.path.join(args.out, fn), 'w', encoding='utf-8').write(payload)
        manifest.append({'name': fn, 'url': url, 'http': code, 'bytes': len(data),
                         'sha256': hashlib.sha256(data).hexdigest(),
                         'version_header': m.group(1) if m else None})
        print(f"{name:<28} http={code} {len(data):>8}B sha={hashlib.sha256(data).hexdigest()[:16]}"
              + (f" ver={m.group(1)}" if m else ''))

    json.dump(manifest, open(os.path.join(args.out, 'manifest.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)
    print('manifest ->', os.path.relpath(os.path.join(args.out, 'manifest.json'), BASE))
    return 0


if __name__ == '__main__':
    sys.exit(main())
