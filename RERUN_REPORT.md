# 重跑复核报告 — 2026-09-22

环境：Node v24.18.0 / Python 3.12.3，工作目录为仓库根。
目标：把 2026-08-30 冻结的全部分析**从线上重新拉一遍并逐条复核**，给出可复现命令与偏差口径。

## 零、结论速览

| # | 复核项 | 方法 | 结论 |
|---|---|---|---|
| 1 | 线上组件是否换代 | `refresh_capture.py` + sha256 对比 | **未换代**：首页 2 个内联块 + 7 个 SDK 与 8-30 逐字节一致 |
| 2 | VM 表能否独立重建 | 新增 `dump_vm.py`（纯 Python） | ✅ 与仓库 `vm_Z/vm_z_full/vm_z_index` **完全一致** |
| 3 | 两条独立路径是否互证 | `dump_vm.py`（Python 解码）vs `rerun_dump.js`（Node 运行时 dump） | ✅ 三张表 JSON 级完全一致 |
| 4 | 反汇编能否复现 | `disasm.py` 重生成 | ✅ `disasm_150.txt`(864 行)、`disasm_helpers.txt`(133 行) 完全一致 |
| 5 | 程序 id ↔ bcLen 映射 | 重跑 + 索引核对 | ✅ 103:203 / 105:154 / 106:95 / 107:238 / 132:135 / 150:1834（与报告更正一致） |
| 6 | 签名能否重跑产出 | `rerun_sign.js` | ✅ 固定熵 180 字符、跨进程稳定；随机熵两次不同（非确定性成立） |
| 7 | 确定性的真实口径 | 三组对照实验 | ⚠️ 同进程连续签名**不可复现**（须一进程一次）；cookie **无影响**；query 有影响 |
| 8 | SM3 管线 | trace 复核 | ✅ `ret=A[32]` 恰好 5 次，第 5 次输入 `"9B6/i1FccxYTYE=="` 与报告一致 |
| 9 | 钩子链 id | trace 复核 | ✅ `E 105`（open，第 1 行）→ `E 107`（send，第 135 行） |
| 10 | 风控现状 | 单次无签名 detail 请求 | 403 `Blocked by ArgusSecurityPlugin Uifid Not Found`（与报告「需 uifid」一致） |
| 11 | Python 移植 | `python3 abogus_full.py` | ❌ 仍卡异常展开（`abogus_full.py:454`），见 §五 |

## 一、线上重抓（第 1 项）

    python3 refresh_capture.py     # -> capture_20260922/ + manifest.json

| 资源 | http | 大小 | sha256(前16) | vs 8-30 |
|---|---|---|---|---|
| 首页 | 200 | 72914B | 9b56a6acdcb27eb6 | 首页内联块 2 个 |
| inline_0（JSVM 自举） | - | 71725B | 76bee010ec645500 | ✅ 与 `assets/inline_0.js` 一致 |
| inline_1（cookie 读取器） | - | 1090B | eff9c24ff30d0f7f | ✅ 与 `assets/inline_1.js` 一致 |
| webmssdk 1.0.0.20 | 200 | 387196B | 3c138a74319cf36d | ✅ |
| sdk-glue 1.0.0.64-fix.01 | 200 | 100348B | 0ccf4a589b80bdda | ✅ |
| bdms 1.0.1.19-fix.01 | 200 | 147530B | a0e46f84476d63a1 | ✅ |
| verifycenter 1.0.0.413 / 417 | 200 | 60903 / 63592B | d954e0e3… / c93e7b0e… | ✅ |
| captcha 4.0.28 / rmc-nocaptcha 1.0.0.51 | 200 | 84508 / 266559B | b4e97d97… / a7c43cbd… | ✅ |

**含义**：8-30 的全部结论仍然适用于当前线上版本。

**重抓时新增确认的加载链**（原报告未记录）：
- sdk-glue 内嵌版本常量：`bdmsVersion="1.0.1.19-fix.01"`、`captchaVersion="4.0.10"`、`sdkGlueVersion="1.0.0.64-fix.01"`
- sdk-glue 按 `…/rc-client-security/web/stable/<bdmsVersion>/bdms.js` 在**两个 CDN** 加载 bdms：
  `lf-c-flwb.bytetos.com` 与 `lf-headquarters-speed.yhgfb-cn-static.com`（均已实测 200，内容与
  `capture/293_…p-pc-weboff.byteimg.com…bdms_1.0.1.19_fix.js` **sha256 相同** `a0e46f84476d63a1`）
- 另有 `secsdk-lastest.umd.js`（版本串 `25.4.3.1`）由 glue 引用
- 注意口径差：glue 内嵌 `captchaVersion="4.0.10"`，而本次实际出现的是 `sec_sdk_build/4.0.28` 构建路径

## 二、VM 表独立重建（第 2、3 项）

新增 `dump_vm.py`，把原本只在（未入库的）`dump_vm.js` 里的解码链用纯 Python 重实现：

    atob(blob) -> key = Σ bytes[4..8) % 256                        # 实测 key=0xFB
    body[i] = byte[8+i] ^ ((key + key%10 * i) % 256)               # 掩码随下标增长，不是常量 0xFB
    raw deflate 解压 -> Reader.varint()/Reader.string()
    -> 1001 个字符串 + 796 个程序 [bytecode, arity, flags, exTable]

    python3 dump_vm.py --diff     # 对拍仓库表

- 用仓库内 8-30 的 `capture/293_…bdms…` 解码：三张表与仓库文件 **完全一致** ✅
- 用今天新下载的 bdms 解码：同样 **完全一致** ✅
- `node rerun_dump.js`（运行时 `__Z`/`__z` dump）与 Python 解码结果 **JSON 级一致** ✅

> 口径更正：报告原文写「XOR（key=字节4-7和%256=0xFB）」容易被读成「整体异或 0xFB」；
> 实测掩码是 `(key + key%10*i) % 256`，随字节下标变化。已在本文件与 REPORT §三 记录。

## 三、反汇编与程序映射（第 4、5 项）

    python3 disasm.py 150 > a.txt && diff disasm_150.txt a.txt          # 无差异（864 行）
    python3 disasm.py 277 272 274 251 246 96 > b.txt                    # 与 disasm_helpers.txt 无差异（133 行）

`disasm_helpers.txt` 的程序顺序此前未记录在仓库中，本次已补进 README 重跑流程。
关键程序映射重跑后与更正后的 REPORT §三 一致；`disasm.py 105`/`107` 仍分别对应
URLSearchParams/_method/_url 钩子与 `bdmsInvokeList` 读取的 send 路径。

## 四、签名重跑与确定性口径（第 6、7 项）

    node rerun_sign.js --fixed-entropy --full     # 固定熵
    node rerun_sign.js                            # 随机熵

| 实验 | 结果 |
|---|---|
| 固定熵，3 个独立进程的首值 | 完全相同 ✅（跨进程可复现，与报告一致） |
| 固定熵，同一进程连续两次 | 不同 ❌（程序 107 读 `bdmsInvokeList[0]`，前次请求状态参与计算） |
| 随机熵，连续两次 | 不同 ✅（非确定性结论成立） |
| 空 cookie vs 合成 cookie vs 改写 ttwid/msToken | **0 位差异**（cookie 不进入 a_bogus 计算） |
| query 增加 1 个参数 | 约 5–6 位差异 |
| 与 `baseline_bogus.txt` 对比（合成 query） | 180 字符中 6 位不同（位置 32/37/42/43/177/178）→ 来自 query 串不同，而非 cookie |

**产出形态**：180 字符、base64 字母表（含 `-`/`_`），与报告「180 字符 base64」一致。
**对拍纪律**：需要「一进程一次签名」，否则状态残留导致误判。

## 五、Python 移植状态（第 11 项）

    python3 abogus_full.py
    -> abogus_full.py:454  if f == 2: raise Exception(jsstr(l))
    -> Exception: <JSFunction object>      （触发点 vm.X(132, None, [], st132)）

即 REPORT §八 遗留项 2（`y()` 异常展开表）。移植仍未产出可用签名，结论与报告一致。
对拍目标已明确为 `rerun_sign.js --fixed-entropy --full` 的输出（同 query、同固定熵、一进程一次）。

## 六、trace 与风控复核（第 8、9、10 项）

- `grep -c 'ret=A\[32\]' trace_full.txt` → **5**，且第 5 次 `args="9B6/i1FccxYTYE=="`，与 §七 记载一致
- `E 105`（第 1 行，open 钩子）→ `E 107`（第 135 行，send 钩子）→ 钩子 id 更正成立
- 单次无 cookie/无签名 `aweme/v1/web/aweme/detail` 请求：**403** `Blocked by ArgusSecurityPlugin Uifid Not Found`
  （弱校验窗口需真实会话 + 住宅 IP 才能复测，本次环境不具备，未做批量/对抗性请求）

## 七、本次新增/修改文件

    新增  refresh_capture.py   线上重抓（首页 + 7 个 SDK + manifest）
    新增  dump_vm.py           bdms blob 纯 Python 解码 + 与仓库表对拍
    新增  rerun_dump.js        Node 运行时 VM 表 dump（交叉验证）
    新增  rerun_sign.js        签名重跑 + 熵/cookie/query 敏感度实验
    新增  capture_20260922/    本次重抓产物（与 8-30 逐字节一致）
    修改  README.md            重跑全流程 + 新增文件说明
    修改  REPORT.md            §七 复现口径与重跑复核、§八 补实测失败点与对拍方法

## 八、复现命令（一键核对）

    python3 refresh_capture.py
    python3 dump_vm.py --diff
    node rerun_dump.js
    python3 disasm.py 150 > /tmp/a.txt && diff -q disasm_150.txt /tmp/a.txt
    python3 disasm.py 277 272 274 251 246 96 > /tmp/b.txt && diff -q disasm_helpers.txt /tmp/b.txt
    node rerun_sign.js --fixed-entropy --full
    python3 track_douyin.py

## 九、本次未能复现的项（附原因）

| 项 | 原因 |
|---|---|
| `douyin_4k.js` 端到端出直链 | 需 `playwright-core` + Chromium（本环境 `require('playwright-core')` 失败）+ 真实会话；未做任何业务抓取 |
| `mitm2-6.js` / `mitm_trace.js` 重放 | 同上（浏览器依赖 + 需真实页面会话） |
| `trace_full.txt` 原始生成 | 生成器 `drive_trace.js` 与 TRC 注入 harness 按作者意愿未入库；本文件只做**读侧**复核（帧计数、sum 次数） |
| `baseline_bogus.txt` 逐字节复现 | 需作者 `session.json` 的 `appends[0].query`；本次用合成 query，180 字符中 6 位不同（已定位为 query 差异，非 cookie） |
| 弱校验窗口复测 | 需住宅 IP + 热 cookie；无签名/无 cookie 的 detail 请求返回 403 `Blocked by ArgusSecurityPlugin Uifid Not Found` |

补充：`track_douyin.py` 首次跑时曾把 CDN 偶发失败（bdms http=0）误判为内容变更；
现已加 3 次退避重试 + `unreachable` 归类（拉取失败退出码 2 且不刷新基线）。
