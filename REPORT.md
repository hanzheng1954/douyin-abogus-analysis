# douyin.com 2026-08-30 新版逆向分析报告

## 一、结论（TL;DR）
1. **a_bogus 生成器**：位于 `bdms_1.0.1.19_fix.js`（不是 webmssdk）。核心是一个 796 程序的紧凑栈式 VM（操作码 0-66），签名程序由 XHR.send 钩子逐请求执行。
2. **算法**：SM3 哈希（Tj 常量 0x79CC4519/0x7A879D8A 已确认）+ 字节置换 + base64；输出 **非确定性**（含随机熵/时间戳），服务端解密校验而非重算比对。
3. **已产出可用的 Node 签名器**（见 node_signer.js / final_sign.js），产出的 a_bogus 通过 Argus 签名门。
4. **去水印/4K**：无需解密算法。`aweme/v1/web/aweme/detail` 返回 `download_addr`（官方无水印源，可直接下载）与 `bit_rate[]` 档位表；4K 仅当作者上传 4K 源时存在（gear 名如 normal_4k_0）。当前风控下带合法 uifid+webid+cookie 时 detail 接口对 a_bogus 弱校验。

## 二、新架构全景（2026-08-30 更新后）
- 首页 HTML：无任何静态资源引用，内联 71KB `_$jsvmprt` JSVM 自举运行时 + cookie 读取器 `_f1`。
- **webmssdk 1.0.0.20**：`_$webrt_1668687510` VM 运行时（魔数 "HNOJ@?RC"，字节码为 hex 字符串），导出 `window.byted_acrawler`：`frontierSign` 产 **X-Bogus**（16 字符，输入 {"X-MS-STUB": md5("")}）、getReferer/init/isWebmssdk/report/setConfig/setTTWebid/setTTWid/setUserMode。5 个内嵌 VM 程序（签名/行为/环境检测）。
- **sdk-glue 1.0.0.64-fix.01**：webpack 编排层。blockFetch/blockXhr = 风控拦截队列（BdmsBlock/VerifyCenterBlock/CSRFBlock），动态加载 bdms.js + verify-center/captcha SDK。
- **bdms 1.0.1.19-fix.01**：真正的 **a_bogus 生成器**。window.bdms = {getReferer, init}。init 配置：`{aid:6383, pageId:6241, paths:["^/aweme/v1/",...], boe:false, ddrt:8.5, ic:8.5}`。
- 请求拦截链：XHR.open → VM 程序 **105**（bcLen 154）存 _method/_url → XHR.send → VM 程序 **107**（bcLen 238）计算 a_bogus 并 append 到 URLSearchParams（参数名 = Z 表[220]="a_bogus"）。程序 id 与字节码长度是两套量纲，勿混用（见 §三 更正说明）。

## 三、bdms VM 细节
- 程序表存储：单一 base64 blob（38KB，文件内最长 base64 段）→ 8 字节头 → 逐字节 XOR（`key = Σ bytes[4..8) % 256`，实测 0xFB；掩码为 `(key + key%10*i) % 256`，**随下标变化，不是常量 0xFB**）→ 内置 raw deflate → 字节码流。2026-09-22 已用纯 Python 复现该链路（`dump_vm.py`），解出的表与仓库 `vm_*.json` 完全一致。
- 表结构：Z 全局字符串表 **1001 项**（Z[220]="a_bogus"、Z[247]=base64 字母表、Z[165]="msToken"、Z[182]="x-ms-token"）；z 程序表 **796 项**（[bytecode, arity, flags, exceptionTable]）。
- 关键程序（id 与 bcLen 已用 `vm_z_index.json` + `disasm.py` 逐条核对）：

  | 程序 id | bcLen | 角色 | 证据 |
  |---|---|---|---|
  | 132 | 135 | XHR 钩子初始化（D(133-150,152-155) 入 s 槽位） | 程序 132 反汇编 |
  | 105 | 154 | XHR.open 钩子（存 _method/_url，构造 URLSearchParams） | 程序 105 反汇编（Z[214]='bdmsInvokeList'） |
  | 107 | 238 | XHR.send 钩子 → 逐请求签名入口 | 程序 107 反汇编（读 Z[214]/Z[218]='args'）；104 装配 D(107) |
  | 103 | 203 | 签名器（performance.now 取时间戳后调核心） | 程序 103 反汇编 |
  | 150 | 1834 | 核心程序（SM3 + 置换 + 载荷装配，9 参数） | 程序 150 反汇编 |
  | 106 | - | setRequestHeader 钩子 | 104 装配 D(106) |

  说明：本节早期版本写成「238=逐请求签名（154 op）、154=open 钩子」，是把程序 id 与字节码长度（bcLen）混用了 —— 238 的 bcLen 是 105，154 的 bcLen 是 21；逐请求签名入口是 id 107（bcLen 238），open 钩子是 id 105（bcLen 154）。已按上表更正。
- 解释器入口：`X(t, r, e, n)`，栈式，操作码 0-66（0=call、5=读全局、20=写全局属性、38=压字面量、49=return、52=jump、57/58==/===、59=new、60=读 globalThis、63=D() 创建缓存包装函数等）。完整操作码语义已从去混淆源码提取。
- 哈希：SM3（FF/GG/Tj 常量与国密标准一致）。

## 四、交付物（仓库根目录，全部路径相对仓库）

| 文件 | 入库 | 用途 |
|---|---|---|
| node_signer.js | ✅ | 浏览器 shims + bdms_patched 加载器（Node 可直接 require） |
| bdms_patched.js / out_bdms.js / out_webmssdk.js / out_sdkglue.js | ✅ | 打补丁的运行版 + webcrack 去混淆产物 |
| vm_Z.json / vm_z_full.json / vm_z_index.json | ✅ | VM 全量表 dump（1001 字符串 + 796 程序，可移植纯算） |
| disasm.py / disasm_150.txt / disasm_helpers.txt | ✅ | 反汇编器与程序 150/编码辅助程序伪码 |
| abogus.py / abogus_full.py / abogus_shims.py / abogus_driver.py | ✅ | Python 移植（76 操作码解释器 + SM3 + shims + 装配驱动） |
| det_one.js / baseline_bogus.txt | ✅ | 确定性基线生成器与基线值（180 字符） |
| init_hooks.js / mitm2-6.js / mitm_trace.js / capture.js | ✅ | 动态断点 / MITM / 脚本 dump harness |
| mitm*_log.txt / trace_full.txt | ✅ | 帧级 opcode trace 与 MITM 日志（分析原始证据） |
| capture/ | ✅ | 416 个运行时脚本 + scripts.json 清单（cookies.txt / requests.txt 未入库） |
| assets/inline_0.js / inline_1.js | ✅ | 首页内联 71KB JSVM 自举运行时与 cookie 读取器 |
| session.json / feed_sample*.json / node_sign_test.js / final_sign.js / detail_test.js / frontiersign_bytecode.bin / trace*.js | ❌ | 含真实 cookie 或为一次性验证脚本，按 `.gitignore` 不随仓库分发 |

> 复现说明：`det_one.js` 需要自备 `session.json`（或设 `SESSION_JSON=<path>`），仓库内不含该文件；合成 cookie 无法复现 `baseline_bogus.txt`（会走不通环境校验分支）。

### 用法（Node 签名器）
\`\`\`js
require('./node_signer.js');
global.document.cookie = 'ttwid=...; ...';        // 浏览器抓的 cookie
global.window.bdms.init({ aid: 6383, pageId: 6241,
  paths: ['^/webcast/','^/aweme/v1/','^/aweme/v2/','/douplus/','^/api/ad/v1/inspire',
          '/v1/message/send','^/live/','^/captcha/','^/ecom/','^/luna/pc'],
  boe: false, ddrt: 8.5, ic: 8.5 });
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/...?' + query);
xhr.send(null);
const aBogus = decodeURIComponent(xhr._url.split('a_bogus=')[1].split('&')[0]);
\`\`\`

## 五、去水印 / 4K 解析
- 接口：`GET /aweme/v1/web/aweme/detail/?{标准pc参数}&aweme_id={id}`（需 uifid、webid、verifyFp 与 ttwid cookie 一致）。
- **无水印**：`aweme_detail.video.download_addr.url_list[0]`（路径含 /mps/logo/r/，logo_type=aweme_search_suffix，直链可下载，已验证 HTTP 200 video/mp4）。
- 画质：`video.width/height` 源分辨率；`video.bit_rate[]` 档位表（gear_name: normal_720_0/low_540_0/adapt_* 等，含 bit_rate kbps 与独立 play_addr/url_list）；H265 源在 `video.play_addr_265`。选最高码率 = 取 bit_rate 表中 bitrate 最高的 play_addr.url_list；`br=`/\`definition=\` URL 参数控制档位。4K 源仅作者上传 4K 时出现（gear 名含 4k，如 normal_4k_0）。
- 风控现状：数据中心 IP 会触发滑块验证码（响应头 x-vc-bdturing-parameters type=verify subtype=slide）；住宅 IP + 热 cookie 下 detail 接口对 a_bogus 弱校验，但建议始终携带（风控动态升级时 Argus 会开启强校验，垃圾签名 403 Blocked by ArgusSecurityPlugin）。

## 六、遗留工作（可选）
1. 纯 Python 移植 VM（表已 dump，操作码已提取）→ 免 Node 环境。
2. 逆向 107/103/150 程序字节码级流程，还原 SM3+置换+熵的具体管线（学术价值；实用上 Node 签名器已够）。
3. 4K 验证需找一条真实 4K 作品（作者上传 4K 源）。
## 七、a_bogus 完整算法管线（opcode 级 trace 还原）

### 调用链（已验证）
XHR.send 钩子 = VM 程序 107 → 签名器 103 → 核心 150（9 参数：1,0,8,query,body,ua,pageId,aid,版本）
程序 150 内部帧链：155(Date.now 戳) → 699/730/729(环境原生类型校验) → 277/272/274/251/246(索引选择) → 280(字节变换)

### 装配（程序 132/0/104 反汇编实证）
- 132：D(133-150,152-155) 入 s 槽位；state[8..12] 经 setter 存入 cr/ar/fr/lr/pr；盐值 Z[262]='dhzx' 存 s[2]（被 D 函数闭包捕获）
- 0：D(103)=签名器、D(10)=SM3、D(1..75)=行为库
- 104：D(105)=open 钩子、D(106)=setRequestHeader 钩子、D(107)=send 钩子，挂到 XHR.prototype
- 前置：J(129)/J(700)/J(703)/J(669)/J(706)/J(715)/J(718)/J(721)/J(723)/J(690) 构建 U 配置与 qt/vt/N 等状态函数

### 哈希引擎 gr（反混淆源码实锤）
SM3 国密标准：IV=7380166F 4914B2B9 172442D7 DA8A0600 A96F30BC 163138AA E38DEE4D B0FB0E4E
W[132] 消息扩展、Tj=79CC4519/7A879D8A、64 轮压缩、write/sum/_fill 与标准 SM3 一致
5 次 sum 调用（trace 实测）：
1. sum(query) → 32B
2. sum(上一步 32B) 二次哈希
3. sum('dhzx') → 32B
4. sum(上一步 32B) 二次哈希
5. sum(qt(undefined, envData, 's3') 产出的 base64 串，实测 "9B6/i1FccxYTYE==")

### 载荷字节布局（程序 150 反汇编）
[模式字节(3/11/12，onwheelx 可写性探测)] + [Date.now 4字节] + [双周序号] + [环境校验和 2字节(vt=129 实测)] + [熵数组 0,0,0,0,rand] + [pageId 4字节] + [aid 4字节] + [屏幕/窗口尺寸] + [SM3 摘要字节] → 逐字节 XOR/位运算混合 → 程序 280 3字节变换(charCodeAt/fromCharCode) → 最终 base64（180 字符）

### 熵源（确定性验证实证）
Math.random + crypto.getRandomValues + new Date()（真实时钟，Date.now 覆盖无效）

复现口径（2026-09-22 重跑校准）：
- **跨进程**：固定三者后逐进程复现一致 ✅（`node rerun_sign.js --fixed-entropy` 连跑 3 次首值相同）
- **同进程连续两次**：不同 ❌ —— 程序 107 读 `bdmsInvokeList[0]`，上一次请求留下的状态会参与本次计算，故对拍必须「一进程一次签名」
- **cookie 不影响结果**：空 cookie / 合成 ttwid+msToken / 改写 ttwid 三者输出 0 位差异（实测）
- **query 影响结果**：query 变动 1 个参数 → 输出约 5–6 字节变化
- 与 `baseline_bogus.txt` 的差异：固定熵 + 合成 query 时 180 字符中有 6 位不同（位置 32/37/42/43/177/178），原因即 query 串不同（基线用的是作者真实 `appends[0].query`），**不是**会话 cookie 差异

### 非确定性结论
同输入每次输出不同 = 熵字节直接混入载荷，服务端解密/重算校验；字节级复现无意义，能产出有效值即可

### 重跑复核（2026-09-22）
- trace 实证：`ret=A[32]` 恰好 **5 次** → 本节「5 次 sum 调用」成立，第 5 次输入 `"9B6/i1FccxYTYE=="` 与上文字面一致
- 钩子链在 trace 中为：`E 105`（open 钩子，第 1 行）→ `E 107`（send 钩子，第 135 行），与 §二/§三 的 id 更正一致
- VM 表可用纯 Python 独立重建（`dump_vm.py`），与仓库 `vm_*.json` 完全一致，详见 `RERUN_REPORT.md`

## 八、Python 移植状态（abogus_full.py）
已完成：76 操作码 VM 解释器、JS 值模型、SM3 引擎、浏览器 shims、装配驱动骨架

2026-09-22 重跑实测：`python3 abogus_full.py` 失败于
`abogus_full.py:454  if f == 2: raise Exception(jsstr(l))` → `Exception: <JSFunction object>`
（在 `vm.X(132, None, [], st132)` 装配阶段抛出，即下方遗留项 2），与本节记载一致。

待收尾（机械性工作）：
1. VM 帧语义修正：v 栈跨帧共享（JS 中 s[1]=v 同一数组，帧切换不重置 p）
2. y() 异常展开表（f=1/2 时沿 u 表回溯到 handler pc 并恢复栈）——当前直接抛到顶层
3. 运行 init 程序 129/700/703/669/706/715/718/721/723/690 以生成 qt/vt/N 真值（当前为占位）
验证方法：固定随机序列 + Date，与 `rerun_sign.js --fixed-entropy --full` 的输出字节对拍
（注意：必须一进程一次签名，见 §七 复现口径）
