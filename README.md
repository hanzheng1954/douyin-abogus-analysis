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
    node_signer.js       Node 签名器（可直接 require，已过 Argus 门验证）
    douyin_4k.js         一键 4K/最高画质解析脚本（短链->档位表->直链）
    abogus_full.py       Python 移植：VM 解释器 + SM3 + shims + 装配驱动
    abogus.py            纯 Python VM 核心（76 操作码 + JS 值模型 + SM3）
    abogus_shims.py      浏览器 shims（确定性熵源/Date/FakeXHR）
    abogus_driver.py     装配与驱动（程序132装配 + XHR 钩子）
    disasm.py            VM 反汇编器（输出带注释伪码）
    vm_Z.json            全局字符串表（1001 项，含 a_bogus / dhzx 盐）
    vm_z_full.json       796 个 VM 程序字节码
    vm_z_index.json      程序索引（id/arity/长度）
    gr_class_src.txt     SM3 引擎反混淆源码（与国密标准一致）
    disasm_150.txt       签名核心程序 150 完整反汇编
    disasm_helpers.txt   编码辅助程序反汇编
    trace_full.txt       58K 行帧级 opcode trace（签名全流程）
    baseline_bogus.txt   确定性基线（固定熵源跨进程字节级可复现）
    det_one.js           确定性基线生成器
    init_hooks.js        运行时 hook（URLSearchParams/XHR/Headers）
    mitm2.js mitm3.js mitm4.js mitm5.js mitm6.js  动态断点与 MITM 分析 harness
    capture/             运行时抓取的原始 SDK 脚本
    out_*.js             webcrack 去混淆产物

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
