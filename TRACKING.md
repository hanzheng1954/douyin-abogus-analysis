# douyin.com 更新追踪清单（追什么、怎么追、变了要动哪里）

> 基线采样时间 **2026-09-22**（本仓库分析冻结于 2026-08-30）。当日实测：首页内联运行时、
> webmssdk / sdk-glue / bdms 三件套、verifycenter 全部与仓库 `capture/` **字节级一致** ——
> 也就是说 8-30 的分析仍然有效，本次拿到的是第一份「远端指纹基线」。

## 一、优先级速览

| 层 | 追踪对象 | 变化含义 | 变了要改 |
|---|---|---|---|
| **L0** 引导层 | 首页内联 JSVM 运行时 `inline[0]`=71725B/sha `76bee010ec645500`、`inline[1]`=1090B/sha `eff9c24ff30d0f7f`、`_$jsvmprt` 是否存在 | 引导/自举层换代，SDK 加载顺序与全局名可能重排 | `init_hooks.js`、`mitm*.js` 注入点、`assets/` |
| **L1** 组件版本 | webmssdk `1.0.0.20`、sdk-glue `1.0.0.64-fix.01`、bdms `1.0.1.19-fix.01`、verifycenter `1.0.0.413/417`、captcha `4.0.28`、rmc-nocaptcha `1.0.0.51`（URL 内嵌版本，**404 = 已换代**；byteimg 桶名 `tos-cn-i-9r5gewecjs` 也可能换） | 风控 SDK 换代（必修）；验证码 SDK 换代（策略信号） | README 版本对照、`capture/`、URL 清单 |
| **L2** bdms 打包层 | 文件头 `/* V 1.0.1.19-fix.01 */`、装配入口 `function J(t,r,e,n)`、SM3 IV 十进制 `1937774191`、程序表 blob 长度 `38780`、`window.bdms`、`XMLHttpRequest` | 打包格式/装配入口/内核常量变了 → 反混淆与 hook 全链路要重做 | `bdms_patched.js`、`init_hooks.js`、`gr_class_src.txt` |
| **L3** VM 结构层（解码后） | `Z` 表 **1001** 项、程序 **796** 个、最大程序 **150**/**1834B**；Z[220]=`a_bogus`、Z[247]=base64 表、Z[262]=`dhzx`、Z[214]=`bdmsInvokeList`、Z[218]=`args`；程序映射 103:203 / 105:154 / 106:95 / 107:238 / 132:135 / 150:1834 | 表大小变 = 程序集换代；**id↔bcLen 映射变 = 装配图失效**（本次报告 §三 的坑就在这里） | `vm_Z.json`/`vm_z_index.json`/`vm_z_full.json`、REPORT §三、`disasm_150.txt` |
| **L4** 算法内核 | SM3（IV=7380166F…，Tj=79CC4519/7A879D8A）5 次 `sum`、盐 `dhzx`、载荷布局（模式字节 3/11/12 + 时间戳 + 双周序号 + 环境校验和 + 熵 + pageId + aid + 屏幕）,程序 280 三字节变换、输出 **180 字符** base64 | 盐/摘要/布局变 → 移植代码与对拍基线失效；输出长度变是最廉价的外观信号 | `abogus*.py`、`node_signer.js`、`baseline_bogus.txt`、REPORT §七 |
| **L5** 装配与参数面 | `a_bogus` 参数名、`bdms.init` 的 `paths[]`（= 纳入签名的接口范围）、`aid=6383/pageId=6241`、`msToken`/`webid`/`uifid`/`verifyFp`/`ttwid` 组合、webmssdk 的 `X-Bogus` | paths 变 = 新接口被纳入风控；参数名变 = 追加点迁移 | `abogus_driver.py`、`node_signer.js`、README 快速使用 |
| **L6** 风控策略面 | sdk-glue：`blockFetch`/`blockXhr`/`BdmsBlock`/`VerifyCenterBlock`/`CSRFBlock`；`bdmsInvokeList` 调用清单；验证码 SDK 版本；响应 `403 Blocked by ArgusSecurityPlugin`、`x-vc-bdturing-parameters: type=verify subtype=slide` | 强校验开关状态变化 → 弱校验窗口关闭，签名从「建议携带」变「必须有效」 | REPORT §五 风控现状、harness 断言 |
| **L7** 业务接口面（4K/无水印） | `aweme/v1/web/aweme/detail` 的 `download_addr`、`bit_rate[]`+`gear_name`、`play_addr_265`；detail 对 a_bogus 的校验强度 | 字段改名/移除 = 解析脚本失效；校验收紧 = 4K 管线要带有效签名 | `douyin_4k.js`、REPORT §五 |
| **L8** 环境指纹面 | `onwheelx` 可写性探测、原生类型校验（程序 699/730/729）、行为采集热循环；是否新增 canvas/WebGL/audio/字体指纹 | shims 覆盖不足 → 环境校验分支走偏，产出签名不通过 | `abogus_shims.py`、`node_signer.js` shims 段 |

## 二、怎么追（两层，均可无 cookie 执行）

    # L0–L2：远端指纹（只 GET 首页与公开静态资源，秒级）
    python3 track_douyin.py                 # 有变化退出码 1，便于 cron/CI
    python3 track_douyin.py --dump-dir new_capture_$(date +%F)   # 顺带落盘新 SDK 供离线 diff
    python3 track_douyin.py --update        # 确认变化后刷新基线

    # L3–L4：本地结构指纹（重跑一次解码/反汇编后自动对拍）
    node dump_vm.js            # 或用 mitm harness 重新 dump，产出新的 vm_Z.json / vm_z_index.json
    python3 track_douyin.py    # 会直接 diff 出 Z 表项数、关键串、程序 bcLen 映射的变化
    python3 disasm.py 105 107 103 150    # 用新 id 重定位 open/send/签名器/核心

`track_douyin.py` 同时把**本地层**（`vm_Z.json`/`vm_z_index.json`/`baseline_bogus.txt` 的 sha 与统计）纳入快照，
因此「远端没变但本地表变了」和「远端变了」都能被区分出来。

## 三、巡检节奏

| 频率 | 动作 | 成本 |
|---|---|---|
| 每日 | `python3 track_douyin.py`（L0–L2 指纹，无 cookie） | ~2s |
| 每周 | 重跑一次 dump + `disasm.py` 对拍（L3–L4），跑 `det_one.js` 看能否照旧产出 180 字符 | 分钟级 |
| 触发式 | L1/L2 任一变化 → 走下方 playbook；L6 出现 403/滑块 → 记录并复测弱校验窗口（L7） | - |

## 四、变化响应 playbook

1. **落盘**：`python3 track_douyin.py --dump-dir new_capture_$(date +%F)`，把新 SDK 与旧 `capture/` 同名 diff。
2. **定位**：先看 bdms 文件头版本，再跑 dump 流程解 blob → 新 `vm_Z.json`/`vm_z_index.json`。
3. **对表**：`track_douyin.py` 报出 Z 表项数 / 关键串 / 程序 bcLen 映射差异；若有变化，用 `disasm.py` 重定位
   105(open) / 107(send) / 103(签名器) / 150(核心)，更新 REPORT §二/§三 与「装配 D(...)」关系。
4. **验算法**：盐、SM3 常量、载荷布局逐项核对；跑 `det_one.js`（需 `session.json`）确认输出仍是 180 字符；
   变了就更新 REPORT §七 与 `baseline_bogus.txt`（`BASELINE_WRITE=1`）。
5. **验通路**：一次 `detail` 请求确认弱校验窗口是否仍在（住宅 IP + 热 cookie），记录 403/滑块信号。
6. **收尾**：`python3 track_douyin.py --update` 刷新基线并提交，附一段 diff 说明。

> 变更时**先固定证据再改代码**：`capture/` 与 `vm_*.json` 是全部结论的地基，缺了就无法回溯。

## 五、边界

- 追踪器只做 **GET 首页 + 公开静态资源**，不带 cookie、不触碰业务接口，不构成对平台的对抗性访问。
- 仓库对 SDK 代码与日志仅作研究留存；`mitm*_log.txt` 含短时效 `msToken` 明文，公开前建议清理。
