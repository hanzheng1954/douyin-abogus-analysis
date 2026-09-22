#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""douyin.com 风控 SDK 变更追踪器（只读：首页 + 静态 CDN 资源）

用法:
    python3 track_douyin.py                # 对比 track_baseline.json，有变化退出码 1
    python3 track_douyin.py --update       # 把当前实测状态写回 track_baseline.json
    python3 track_douyin.py --dump-dir d   # 额外把下载到的脚本体存到 d/ 供离线 diff
    python3 track_douyin.py --json out.json

只做 GET，不调用任何业务接口、不带 cookie；仅用于公开静态资源与首页的版本巡检。
"""
import argparse, hashlib, json, os, re, ssl, sys, urllib.request, urllib.error

BASE = os.path.dirname(os.path.abspath(__file__))
BASELINE = os.path.join(BASE, 'track_baseline.json')
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36')

HOMEPAGE = 'https://www.douyin.com/'

# 已知 SDK 资源：URL 内嵌版本号，404 = 已换代；命中 = 按 sha256 比对
TARGETS = [
    ('webmssdk',      'https://lf-c-flwb.bytetos.com/obj/rc-client-security/c-webmssdk/1.0.0.20/webmssdk.es5.js',
     'capture/048_bytetos.com_obj_rc-client-security_c-webmssdk_1.0.0.20_webmssdk.es5.js.js'),
    ('sdk-glue',      'https://lf-c-flwb.bytetos.com/obj/rc-client-security/web/glue/1.0.0.64-fix.01/sdk-glue.js',
     'capture/050_ytetos.com_obj_rc-client-security_web_glue_1.0.0.64-fix.01_sdk-glue.js.js'),
    ('bdms',          'https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/bdms_1.0.1.19_fix.js',
     'capture/293_tps___p-pc-weboff.byteimg.com_tos-cn-i-9r5gewecjs_bdms_1.0.1.19_fix.js.js'),
    ('verifycenter-413', 'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/verifycenter/1.0.0.413/index.js',
     'capture/081_hgfb-cn-static.com_obj_rc-verifycenter_verifycenter_1.0.0.413_index.js.js'),
    ('verifycenter-417', 'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/verifycenter/1.0.0.417/index.js',
     'capture/377_hgfb-cn-static.com_obj_rc-verifycenter_verifycenter_1.0.0.417_index.js.js'),
    ('captcha',       'https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/sec_sdk_build/4.0.28/captcha/index.js', None),
    ('rmc-nocaptcha', 'https://lf-cdn-tos.bytescm.com/obj/rc-verifycenter/rmc-nocaptcha/1.0.0.51/setup.js', None),
    # sdk-glue 真正加载 bdms 的 stable 路径（版本号在路径里，换代即 404）
    ('bdms-stable-bytetos', 'https://lf-c-flwb.bytetos.com/obj/rc-client-security/web/stable/1.0.1.19-fix.01/bdms.js', None),
    ('bdms-stable-hgfb',    'https://lf-headquarters-speed.yhgfb-cn-static.com/obj/rc-client-security/web/stable/1.0.1.19-fix.01/bdms.js', None),
    # secsdk（glue 引用的行为采集 SDK）
    ('secsdk', 'https://lf1-cdn-tos.bytegoofy.com/obj/goofy/secsdk/secsdk-lastest.umd.js', None),
]

# 结构/算法指纹：命中布尔值比 hash 更能说明「哪一层变了」
FINGERPRINTS = {
    # 注意：线上 bdms 是打包加密版，'a_bogus'/'dhzx'/'bdmsInvokeList' 等字面量只在解码后出现，
    # 因此线上层只能查「打包痕迹」，深层结构指纹由本地层（vm_Z.json/vm_z_index.json）负责。
    'bdms': [
        ('version_header', r'/\* V ([\d.]+[-\w.]*) \*/'),    # 文件头版本注释，换代第一信号
        ('hook_open_src',  r'function J\(t,r,e,n\)'),        # 装配入口特征（本地 hook 依赖）
        ('sm3_iv_dec',     r'1937774191'),                   # 0x7380166F 十进制写死
        ('window_bdms',    r'window\.bdms'),
        ('xhr_ref',        r'XMLHttpRequest'),
        ('blob_b64_len',   r'[A-Za-z0-9+/=]{2000,}'),        # 程序表 blob（38KB 级），取长度
    ],
    'sdk-glue': [
        ('block_fetch', r'blockFetch'),
        ('block_xhr',   r'blockXhr'),
        ('bdms_block',  r'BdmsBlock'),
        ('csrf_block',  r'CSRFBlock'),
        ('bdms_url',    r'bdms_1\.\d+\.\d+\.\d+_fix\.js'),   # 它引用的 bdms 版本
        # glue 内嵌的版本常量：换代时会直接改这里，比 404 更早暴露
        ('const_bdmsVersion',    r'bdmsVersion\s*=\s*"([^"]+)"'),
        ('const_captchaVersion', r'captchaVersion\s*=\s*"([^"]+)"'),
        ('const_sdkGlueVersion', r'sdkGlueVersion\s*=\s*"([^"]+)"'),
        ('stable_path',          r'/obj/rc-client-security/web/stable/'),
    ],
    'webmssdk': [
        ('acrawler',      r'byted_acrawler'),
        ('frontier_sign', r'frontierSign'),
        ('webrt_magic',   r'HNOJ@\?RC'),                    # VM 魔数，变更 = 换 VM
    ],
}

# 本地层结构指纹：解码后的 VM 表与关键程序映射（变化 = 装配图/移植代码需重做）
LOCAL_FILES = ['vm_Z.json', 'vm_z_index.json', 'vm_z_full.json', 'baseline_bogus.txt']
KEY_PROGRAMS = [103, 105, 106, 107, 132, 150]
KEY_STRINGS = {'Z[220]': 220, 'Z[247]': 247, 'Z[262]': 262, 'Z[214]': 214, 'Z[218]': 218}

VERSION_RE = re.compile(r'\b\d+\.\d+\.\d+\.\d+(?:-fix\.\d+)?\b')


def fetch(url, timeout=30):
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, b''
    except Exception as e:                                    # noqa: BLE001
        return 0, ('ERR:' + str(e)).encode()


def sha(b):
    return hashlib.sha256(b).hexdigest()


def local_structure():
    """本地层：解码后的 VM 表与关键程序映射（重跑 dump_vm.js / disasm.py 后用于对拍）"""
    out = {}
    for f in LOCAL_FILES:
        p = os.path.join(BASE, f)
        if os.path.exists(f):
            b = open(p, 'rb').read()
            out[f] = {'bytes': len(b), 'sha256': sha(b)[:16]}
    zp = os.path.join(BASE, 'vm_Z.json')
    ip = os.path.join(BASE, 'vm_z_index.json')
    if os.path.exists(zp) and os.path.exists(ip):
        Z = json.load(open(zp, encoding='utf-8'))
        idx = json.load(open(ip, encoding='utf-8'))
        out['vm'] = {
            'Z_count': len(Z),
            'program_count': len(idx),
            'key_strings': {k: Z[i] for k, i in KEY_STRINGS.items() if i < len(Z)},
            'key_programs': {str(e['i']): e['bcLen'] for e in idx if e['i'] in KEY_PROGRAMS},
            'max_bcLen_id': max(idx, key=lambda e: e['bcLen'])['i'],
        }
    return out


def snapshot(save_bodies=None):
    state = {'homepage': {}, 'targets': {}}

    status, body = fetch(HOMEPAGE)
    html = body.decode('utf-8', 'replace')
    blocks = re.findall(r'<script[^>]*>(.*?)</script>', html, re.S)
    inline = [{'len': len(s), 'sha256': sha(s.encode()), 'jsvmprt': '_$jsvmprt' in s} for s in blocks]
    state['homepage'] = {
        'status': status,
        'bytes': len(body),
        'sha256': sha(body),
        'inline_scripts': inline,
        'inline_count': len(blocks),
        'has_jsvmprt': any(b['jsvmprt'] for b in inline),
        'static_refs': sorted(set(re.findall(r'src="(https?://[^"]+)"', html))),
        'versions_seen': sorted(set(VERSION_RE.findall(html))),
    }

    for name, url, local in TARGETS:
        code, data = fetch(url)
        entry = {'url': url, 'status': code, 'bytes': len(data)}
        if data and not data.startswith(b'ERR'):
            entry['sha256'] = sha(data)
            entry['versions_seen'] = sorted(set(VERSION_RE.findall(data.decode('utf-8', 'replace'))))[:12]
            fps = {}
            text = data.decode('utf-8', 'replace')
            for label, pat in FINGERPRINTS.get(name, []):
                m = re.search(pat, text)
                if label.endswith('_len'):                       # 取最长匹配的长度（blob 等）
                    runs = re.findall(pat, text)
                    fps[label] = max((len(r) for r in runs), default=0)
                elif m and m.groups():                           # 带捕获组 = 提取版本/常量值
                    fps[label] = m.group(1)
                else:
                    fps[label] = bool(m)
            if fps:
                entry['fingerprints'] = fps
            if save_bodies:
                os.makedirs(save_bodies, exist_ok=True)
                with open(os.path.join(save_bodies, name + '.js'), 'wb') as fh:
                    fh.write(data)
        state['targets'][name] = entry
    state['local'] = local_structure()
    return state


def diff(old, new):
    rows = []
    oh, nh = old.get('homepage', {}), new.get('homepage', {})
    if oh.get('sha256') != nh.get('sha256'):
        rows.append(('homepage', 'sha256', oh.get('sha256', '-')[:16], nh.get('sha256', '-')[:16]))
    if oh.get('inline_count') != nh.get('inline_count'):
        rows.append(('homepage', 'inline_count', oh.get('inline_count'), nh.get('inline_count')))
    old_inline = {i: b for i, b in enumerate(oh.get('inline_scripts', []))}
    for i, b in enumerate(nh.get('inline_scripts', [])):
        prev = old_inline.get(i)
        if not prev:
            rows.append(('homepage', f'inline[{i}] 新增', '-', f"{b['len']}B/{b['sha256'][:12]}"))
        elif prev['sha256'] != b['sha256']:
            rows.append(('homepage', f'inline[{i}] sha256', prev['sha256'][:12], b['sha256'][:12]))
            rows.append(('homepage', f'inline[{i}] len', prev['len'], b['len']))
    for name in sorted(set(old.get('targets', {})) | set(new.get('targets', {}))):
        o = old.get('targets', {}).get(name, {})
        n = new.get('targets', {}).get(name, {})
        if o.get('status') != n.get('status'):
            rows.append((name, 'http', o.get('status', '-'), n.get('status', '-')))
        if o.get('sha256') != n.get('sha256'):
            rows.append((name, 'sha256', (o.get('sha256') or '-')[:12], (n.get('sha256') or '-')[:12]))
        for key in sorted(set(o.get('fingerprints', {})) | set(n.get('fingerprints', {}))):
            ov, nv = o.get('fingerprints', {}).get(key), n.get('fingerprints', {}).get(key)
            if ov != nv:
                rows.append((name, '指纹 ' + key, ov, nv))
        ov, nv = set(o.get('versions_seen') or []), set(n.get('versions_seen') or [])
        if ov or nv:
            for v in sorted(nv - ov):
                rows.append((name, '版本串 +', '-', v))
            for v in sorted(ov - nv):
                rows.append((name, '版本串 -', v, '-'))
    ol, nl = old.get('local', {}), new.get('local', {})
    for f in sorted(set(ol) | set(nl)):
        if isinstance(ol.get(f), dict) and isinstance(nl.get(f), dict) and ol[f].get('sha256') != nl[f].get('sha256'):
            rows.append(('local/' + f, 'sha256', ol[f].get('sha256'), nl[f].get('sha256')))
    ovm, nvm = ol.get('vm', {}), nl.get('vm', {})
    for key in ('Z_count', 'program_count', 'max_bcLen_id'):
        if ovm.get(key) != nvm.get(key):
            rows.append(('local/vm', key, ovm.get(key, '-'), nvm.get(key, '-')))
    for key in sorted(set(ovm.get('key_strings', {})) | set(nvm.get('key_strings', {}))):
        a, b = ovm.get('key_strings', {}).get(key), nvm.get('key_strings', {}).get(key)
        if a != b:
            rows.append(('local/vm', '字符串 ' + key, a, b))
    for key in sorted(set(ovm.get('key_programs', {})) | set(nvm.get('key_programs', {}))):
        a, b = ovm.get('key_programs', {}).get(key), nvm.get('key_programs', {}).get(key)
        if a != b:
            rows.append(('local/vm', f'bcLen 程序 {key}', a, b))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--update', action='store_true', help='把当前实测写回 track_baseline.json')
    ap.add_argument('--dump-dir', help='保存下载到的脚本体，便于离线 diff/反汇编')
    ap.add_argument('--json', help='把本次快照写成 JSON')
    args = ap.parse_args()

    old = {}
    if os.path.exists(BASELINE):
        old = json.load(open(BASELINE, encoding='utf-8'))

    new = snapshot(args.dump_dir)

    print('== 本次巡检 ==')
    hp = new['homepage']
    print(f"首页 http={hp['status']} bytes={hp['bytes']} sha={hp['sha256'][:16]} "
          f"inline={hp['inline_count']} jsvmprt={hp['has_jsvmprt']}")
    for i, b in enumerate(hp['inline_scripts']):
        print(f"  inline[{i}] {b['len']:>7}B sha={b['sha256'][:16]} jsvmprt={b['jsvmprt']}")
    for name, e in new['targets'].items():
        print(f"{name:<18} http={e['status']:>3} bytes={e.get('bytes', 0):>7} sha={(e.get('sha256') or '-')[:16]}")
    loc = new.get('local', {})
    vm = loc.get('vm')
    if vm:
        print(f"本地 VM 表     Z={vm['Z_count']} 程序={vm['program_count']} "
              f"最大程序={vm['max_bcLen_id']}({vm['key_programs'].get(str(vm['max_bcLen_id']), '?')}B) "
              f"关键串={vm['key_strings']}")
        print(f"本地程序映射   {vm['key_programs']}")

    if not old:
        print('\n[!] 无基线，用 --update 建立基线')
        rows = []
    else:
        rows = diff(old, new)
        print('\n== 变化 ==')
        if not rows:
            print('无变化 ✅')
        else:
            for r in rows:
                print(f"  [{r[0]}] {r[1]}: {r[2]} -> {r[3]}")

    if args.json:
        json.dump(new, open(args.json, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    if args.update:
        json.dump(new, open(BASELINE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
        print(f'\n已更新基线 {os.path.relpath(BASELINE, BASE)}')
    return 1 if rows else 0


if __name__ == '__main__':
    sys.exit(main())
