# douyin-abogus-analysis

抖音 Web（www.douyin.com）a_bogus 签名算法完整逆向分析 —— 2026-08-30 版本。

仅用于安全研究与学习，请遵守平台条款，勿用于侵权或大规模对抗性采集。

## 核心结论

| 组件 | 版本 | 职责 |
|---|---|---|
| 首页内联 jsvmprt 运行时 | - | 71KB JSVM 自举运行时，页面无静态资源引用 |
| webmssdk | 1.0.0.20 | byted_acrawler.frontierSign 产 X-Bogus（webrt VM） |
| sdk-glue | 1.0.0.64-fix.01 | fetch/XHR 风控拦截层 |
| bdms | 1.0.1.19-fix.01 | a_bogus 生成器（紧凑栈式 VM，796 程序） |

算法管线（opcode 级 trace 实证）：

    XHR.send 钩子(VM程序107) -> 签名器(103) -> 核心(150)
      |- 环境校验: onwheelx 可写性探测 / 原生类型校验(699/730/729)
      |- SM3(国密标准, 盐 'dhzx') x5 次 sum 调用（query/body/UA指纹 二次哈希）
      |- 载荷: 时间戳+双周序号+环境校验和+熵+pageId+aid+屏幕尺寸
      |- 逐字节 XOR/位运算混合 + 程序280 三字节变换
      |- base64 输出（180 字符，非确定性 = 熵字节混入，服务端解密校验）

## 目录结构

    REPORT.md            完整分析报告（算法管线、装配图、移植状态）
    TRACKING.md          更新追踪清单：追哪 8 层信号、变了要改哪个文件、响应 playbook
    RERUN_REPORT.md      最近一次全量重跑复核报告（逐条结论 + 证据 + 命令）
    track_douyin.py      变更巡检器（只 GET 首页 + 公开静态资源；有变化退出码 1）
    track_baseline.json  巡检基线（2026-09-22 实测指纹：远端 hash + 本地 VM 表统计）
    refresh_capture.py   重抓首页内联运行时 + 7 个风控 SDK -> capture_YYYYMMDD/ + manifest.json
    dump_vm.py           纯 Python 解码 bdms blob（base64->XOR->inflate->表），--diff 与仓库 vm_*.json 对拍
    rerun_dump.js        Node 运行时 dump VM 表（与 dump_vm.py 交叉验证）
    rerun_sign.js        重跑签名：固定熵 / 随机熵 / cookie 与 query 敏感度实验
    capture_20260922/    2026-09-22 重抓产物（与 8-30 capture 逐字节一致）
    node_signer.js       Node 签名器（可直接 require，已过 Argus 门验证）
    bdms_patched.js      打好 VM 表 dump 补丁的 bdms（node_signer.js 的加载目标）
    douyin_4k.js         一键 4K/最高画质解析脚本（短链->档位表->直链）
    abogus_full.py       Python 移植：VM 解释器 + SM3 + shims + 装配驱动
    abogus.py            纯 Python VM 核心（76 操作码 + JS 值模型 + SM3）
    abogus_shims.py      浏览器 shims（确定性熵源/Date/FakeXHR）
    abogus_driver.py     装配与驱动（程序132装配 + XHR 钩子）
    PY_PORT_REPORT.md    Python 忠实移植（abogus_vm/env/py）进度：已修 7 处语义错误、仍未跑通及原因
    abogus_vm.py         忠实解释器（帧内共享栈 / y() 三态展开 / 异常表 / 惰性全局访问器）
    abogus_env.py        与 node_signer.js 对齐的 shims（固定熵 LCG / 固定 Date / SM3 gr / 内置对象）
    abogus_py.py         新移植路线入口（--trace / --stop boot|init|open）
    gen_boot.py vm_boot.py  从 bdms_patched.js 自动抽取模块级引导序列（39 个 J() + 13 别名）
    abogus_probe.js      注入探针：可复现参考 a_bogus（与 rerun_sign 固定熵输出逐字符一致）
    abogus_scan.js       环境面清单（全局读/属性访问/opcode 使用面），移植 shims 的依据
    disasm.py            VM 反汇编器（输出带注释伪码，路径自包含）
    vm_Z.json            全局字符串表（1001 项，含 a_bogus / dhzx 盐）
    vm_z_full.json       796 个 VM 程序字节码
    vm_z_index.json      程序索引（id/arity/bcLen，程序 id 与 bcLen 是两套量纲）
    gr_class_src.txt     SM3 引擎反混淆源码（与国密标准一致；IV/Tj 为十进制字面量）
    disasm_150.txt       签名核心程序 150 完整反汇编
    disasm_helpers.txt   编码辅助程序反汇编
    trace_full.txt       58K 行帧级 opcode trace（签名全流程）
    baseline_bogus.txt   确定性基线（固定熵源跨进程字节级可复现）
    det_one.js           确定性基线生成器（需自备 session.json，见下）
    init_hooks.js        运行时 hook（URLSearchParams/XHR/Headers）
    capture.js           首页脚本抓取 harness（CDP scriptParsed dump）
    mitm2.js mitm3.js mitm4.js mitm5.js mitm6.js mitm_trace.js  动态断点与 MITM 分析 harness
    mitm*_log.txt        MITM 原始日志（含 msToken 明文，属分析证据）
    capture/             运行时抓取的 416 个 SDK 脚本 + scripts.json 清单
    assets/              首页内联 JSVM 自举运行时（inline_0.js 71KB）与 cookie 读取器
    out_*.js             webcrack 去混淆产物

### 版本对照（capture/ 实证）

    webmssdk_1.0.0.20        capture/048_*.js     X-Bogus（webrt VM）
    sdk-glue_1.0.0.64-fix.01 capture/050_*.js     风控拦截编排层
    bdms_1.0.1.19_fix.js     capture/293_*.js     a_bogus 生成器
    verifycenter 1.0.0.413 / 1.0.0.417            滑块验证码 SDK（同目录并存两版）

## 复现前置

1. `session.json` 含真实 cookie 与签名样本，按 `.gitignore` 约定不入库；跑 `det_one.js` 需自备，
   或用 `SESSION_JSON=/path/to/session.json` 指定。合成 cookie 无法复现 `baseline_bogus.txt`。
2. 全部脚本路径自包含（相对脚本目录），无需作者机器的绝对路径；Playwright 浏览器路径可用
   `CHROME_PATH=<chromium 可执行文件>` 覆盖。
3. `disasm.py <程序id> [...]` 可直接运行，仅依赖同目录的 `vm_Z.json` / `vm_z_full.json`。

## 重跑全流程（离线可复现）

    python3 refresh_capture.py          # 1. 重抓首页内联运行时 + 7 个风控 SDK -> capture_YYYYMMDD/
    python3 dump_vm.py --diff           # 2. 纯 Python 解码 bdms blob -> vm_Z/vm_z_full/vm_z_index 并对拍
    node rerun_dump.js                  # 2'. 交叉验证：Node 运行时 dump 的 VM 表（rebuilt_vm_node/）
    python3 disasm.py 150 > /tmp/a.txt  # 3. 反汇编复核（与 disasm_150.txt 一致）
    python3 disasm.py 277 272 274 251 246 96   # 与 disasm_helpers.txt 一致（顺序固定）
    node rerun_sign.js --fixed-entropy --full  # 4. 固定熵出 180 字符 a_bogus（跨进程稳定）
    node rerun_sign.js                  # 4'. 随机熵：两次不同（非确定性）
    python3 track_douyin.py             # 5. 与 track_baseline.json 对拍，有变化退出码 1
    ./verify_all.sh --online            # 一键复跑上面全部可验证环节（PASS/FAIL 汇总）

最近一次全量重跑结果与偏差口径见 [RERUN_REPORT.md](RERUN_REPORT.md)（含「未能复现项及原因」）。

## 快速使用（Node 签名器）

    require('./node_signer.js');
    global.document.cookie = 'ttwid=...; ...';   // 浏览器抓的 cookie
    global.window.bdms.init({ aid: 6383, pageId: 6241, paths: [...], boe: false, ddrt: 8.5, ic: 8.5 });
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/...?' + query);
    xhr.send(null);
    const aBogus = decodeURIComponent(xhr._url.split('a_bogus=')[1].split('&')[0]);

## 4K 解析

    node douyin_4k.js "https://v.douyin.com/xxx"   // 短链/长链/aweme_id 均可

输出源分辨率、档位表（含 4K 档标记）、最高画质直链（H265 优先）、无水印直链。

## 方法论（可复用到其他签名 SDK）

1. CDP Debugger.scriptParsed dump 运行时脚本
2. 运行时 hook（URLSearchParams/XHR）截获签名追加点 + 调用栈定位
3. MITM 改写真 SDK 注入日志（程序级输入输出）
4. blob 解码（base64->XOR->inflate）导出 VM 表
5. 操作码表提取 + 反汇编器 + 帧级 trace
6. 确定性回放（固定熵源）做字节级对拍验证

## 许可

本仓库未附许可证文件（默认保留所有权利），仅用于安全研究与学习；`capture/`、`out_*.js`、
`mitm*_log.txt` 中的 SDK 代码与日志版权归字节跳动及其原始权利人。请勿用于侵权或大规模对抗性采集。
