# 纯 Python 移植 abogus 报告（忠实解释器 + 逐点对拍）

> 最新状态（第二轮续修）：**长度已对齐、熵已对齐，仅剩 13/168 字符差异**。
> `python3 abogus_py.py` 与 `node rerun_sign.js --fixed-entropy --full` 现在都是 168 字符，
> 差异集中在环境校验和（bitmask）派生的一段。

> 历史轨迹：卡在引导 J(232)→244 → 修 10 处后跑通并产出 168 字符 → 本轮再修 2 处关键差异。

## 零、当前差距（一句话）

    node rerun_sign.js --fixed-entropy --full → mvUnDtXiE25fKV/SYCcFyG/lc62Arpuysa4dYfxTHxzTLhzbTuPnOTFOnoFusOcLO8pTi917zfMAbxxcp4XspC9kompkuhtWu5AcVufohHxUTTvhHNLkKYtEwJ4FUSTY/AAviBi11UUn2Lc3qNcTA1PVi5gz5cjvQrZ8kMg=   (168)
    python3 abogus_py.py                       → mvUnDtXiE25fK5/uYCcCHG/lc62ArBLfsaskPfxTHxzTLhzbTuPnOPeOnoFusOcLO8pTi917zflAbxxcp4XspC9kompkuhtWu5AcVufohHxUTTvhHNLkKYtEwJ4FUSTY/AAviBi11UUn2Lc3qNcTA1PVi5gz5cjvQrZ8kMg=   (168)

**长度、熵、SM3 前 4 次调用、尾部大段字节全部一致，仅 13 个字符不同**（位置 13,15,19,20,29,30,31,34,35,36,53,54,74）。
根因已定位到下文 §九：环境校验和 bitmask 不同（Node 129 vs Python 39）。

## 七、本轮续修（10 处，每处都"跑一次 → 变红/变绿"验证）

| # | 位置 | 症状 | 根因与修法 |
|---|---|---|---|
| 1 | `abogus_env.o_defineProperty` | 引导首个程序 244 抛 `TypeError: Cannot call a class as a function`，最终 `JSThrow: undefined` | 描述符没有 `value` 时**不应写回属性**。Babel 的 `Object.defineProperty(C,"prototype",{writable:false})` 被旧实现写成 `prototype = undefined`，于是 `new`/`instanceof` 全错。改为「有 get/set 走访问器；有 value 才写值；只给特性时保持原值」 |
| 2 | `abogus_vm` op 54/61/74 帧链遍历 | 状态链取到错误对象 | JS 是 `U = U[0]`（普通属性访问，会触发 state 上的 getter）；旧实现 `U.items[0]` 只能在 JSArray 上工作。改为 `getprop(U, '0')` |
| 3 | `abogus_vm.unwind`（f=2/f=3 回帧） | 回帧后 trace/判定仍沿用被调程序 | JS 的程序身份隐含在字节码数组里，Python 需单独存：帧元组补第 9 项 `pid`，两处回帧一并恢复 |
| 4 | `abogus_py` StateObj spec 构造 | `state[18]` 恒为 undefined → init 读 `.aid` 报错 | 同一槽位常同时有 get/set（`get 18(){return vr}` / `set 18(t){vr=t}`），dict 推导式被后一条覆盖。改为 `spec[slot]=(getter,setter)` 并同步 `StateObj.own_get/own_set` |
| 5 | `abogus_env` 缺 `import re` | 所有 `new URL(...)` 都报 `Invalid URL` | `_has_scheme` 里 `re.match` NameError 被 `except Exception` 吞掉。补 import，并把宽 except 收窄为 `(ValueError, TypeError, AttributeError)`，避免再掩盖真因 |
| 6 | `abogus_py` 宿主对象原型 | 程序 154 写 `navigator.__proto__.vendorSubs` 报 "Cannot set properties of undefined" | 宿主对象 `proto=None` → `__proto__` 是 undefined。给 navigator/location/document/screen/history/performance/storage/crypto/XHR 各补一个 prototype 对象 |
| 7 | `abogus_env.SM3Class` | 核心 150 调 `obj.sum(...)` 报 "undefined is not a function" | `construct()` 返回的实例没挂到类的 prototype 上，方法找不到。改为实例 `proto = self.props['prototype']` |
| 8 | `abogus_env.SM3Engine.write/_compress` | `unsupported operand type(s) for <<: 'float' and 'int'` | VM 里字节是 JS number（Python float）。write 与 _compress 入口统一 `int(v) & 255` |
| 9 | `abogus_env.JSURL` | 全流程跑通但 URL 上没有 a_bogus | JS 的 `searchParams` 是**活**的：`append()` 必须反映到 `href/search`。旧 shim 的 `_u` 是快照。改为 `query_string()/live_href()` 按 pairs 实时重建，`toString/toJSON` 同步 |
| 10 | `abogus_py` 取值口径 | 与参考值比较时长度/内容对不上 | 提取 a_bogus 时补 `unquote()`，与 `rerun_sign.js` 的 `decodeURIComponent` 对齐 |

## 八、本轮（第二轮）修掉的两处关键差异

| # | 位置 | 症状 | 根因与修法 |
|---|---|---|---|
| 11 | `node_signer.js` / `rerun_sign.js` / `det_one.js` 的全局 shim | Node 参考值与 Python 差 12 字符长度 | **Node 21+ 的 `navigator`/`crypto`/`performance` 是 getter-only 全局**，`global.navigator = {...}` 被静默忽略 —— 实测 `navigator.userAgent` 一直是 `"Node.js/24"`，UA 修正、固定熵 crypto 覆盖**全部没生效**。改为 `Object.defineProperty(globalThis, name, {value, writable:true, configurable:true})` 安装。修好后参考值从 180 → **168 字符，与 Python 同长** |
| 12 | `abogus_env.RandomSource` | 两次运行的熵序列第 2 个值起就不同 | JS 的 LCG 乘法在 **float64** 上做（`seed*1103515245` 超 2^53 会被舍入），Python 整数精确 → 必然分叉。改为 `float(seed)*1103515245.0+12345.0` 后取低 31 位；另在 `abogus_py` 启动前补 2 次抽取，对齐 bdms webpack 模块加载期消耗的 2 次 Math.random（Node 侧用调用栈证实来自模块 8499/3405）|

对齐结果（抽签逐次比对，调用点 pc 完全一致）：

    抽签序号  Node(tid:pc)   Python(帧:pc)   值
     0,1      ?(模块加载)    预先补抽 2 次     ✅
     2,3      107:46         146:46           ✅
     4,5      107:18/5       144:18 / 145:5   ✅
     6,7      107:46 / 107:5 146:46 / 143:5   ✅
     8…35     107:70 ×28     148:70 ×28       ✅
     36       107:196(监控上报 jr 的采样随机) Python 无（非签名路径）

## 九、环境校验和已对齐（Node 侧三处保真修复）

排查链（每一步都用「同一处打桩、两侧对拍」确认）：程序 150 pc=99 → **699** 环境校验和 →
`if (call(state[0][0]))` 首个探测器 → **730**（检查 navigator/document/location/history 的
`Object.prototype.toString` 标签）→ 分支 6 个探测器（730/733/756/744/**742**/737/735），
其中 742 = **Node 环境检测**（`typeof global`、`global.process`、`process.title === 'node'`）。

修掉的三处 Node 侧保真问题（都在 harness，不在 VM 移植里）：

1. **宿主对象缺 `Symbol.toStringTag`** → `Object.prototype.toString.call(document)` 得到 `[object Object]`，
   浏览器是 `[object HTMLDocument]`。已给 navigator/document/location/history/screen/performance 补标签。
2. **Node 专有全局泄漏**：`typeof global`、`process.title === 'node'` 让 742 判成 Node（校验和 55），
   真实浏览器没有这两个全局（39）。已在 `node_signer.js` / `abogus_probe.js` 加载完成后
   `defineProperty(globalThis, name, {value: undefined})` 隐藏（可用 `DSH_KEEP_NODE_GLOBALS=1` 关闭）；
   harness 改用 `globalThis.` 并在文件头 `const PROC = process;` 先抓引用。
3. 隐藏动作必须发生在**签名之前**：探针把签名放在同文件末尾，最初把隐藏块追加到末尾导致仍读到 55，
   移到 `bdms 加载完成` 之后即修复（Node 39 ✅、Python 39 ✅）。

对齐后的硬证据：

| 对拍项 | 结果 |
|---|---|
| 5 次 SM3 sum 输入 | 完全一致（第 5 次都是 `zdg6CfizzToVP/Rb5wowDN2gJlU8bsN4ruqR+sYwEEWLX9IaWN`，148） |
| 熵序列 37 次抽取 | 调用点与数值完全一致 |
| 程序 280 入参 | 一致（`[0,39,14]` 与 `[211]`） |
| a_bogus 长度 | 两侧都是 168 |

## 九之二、剩余差异：9 个字符 / 125 字节中 11 个字节

    node rerun_sign.js --fixed-entropy --full  (修好保真后)  mvUnDtXiE25fKV/SYCcCHG/lc62ArBLfsa4dYfxTHxzTLhzbTuPnOTFOnoFusOcLO8pTi917zflAbxxcp4XspC9kompkuhtWu5AcVufohHxUTTvhHNLkKYtEwJ4FUSTY/AAviBi11UUn2Lc3qNcTA1PVi5gz5cjvQrZ8kgb=
    python3 abogus_py.py                                    mvUnDtXiE25fK5/uYCcCHG/lc62ArBLfsaskPfxTHxzTLhzbTuPnOPeOnoFusOcLO8pTi917zflAbxxcp4XspC9kompkuhtWu5AcVufohHxUTTvhHNLkKYtEwJ4FUSTY/AAviBi11UUn2Lc3qNcTA1PVi5gz5cjvQrZ8kMg=

base64 字符差异位 `[13,15,34,35,36,53,54,165,166]` → 解码后字节差异 `[9,10,11, 25,26,27, 39,40,41, 123,124]`
（四段：三处 3 字节簇 + 末尾 2 字节）。前 9 字节（含模式字节与校验和 39）两侧完全一致，
SM3 摘要有序嵌入的部分也一致 → 差异在**未哈希的原始字段**（时间戳/双周序号/熵数组/屏幕窗口尺寸一类），
且以「3 字节簇」形式出现，很可能是载荷里几个 3 字节编码的数值字段。

**下一步最小动作**：在程序 150 的载荷装配处（把原始字段拼成字节数组那一段，约 pc 900–1300）两侧同时
dump 该数组，逐字节对齐即可定位到具体字段；或者直接对二进制搜索：把两侧的字节簇 09-11/25-27/39-41
与 150 中 `Date.now()`、`pageId`、`aid`、`screen.*`、`window.*` 的入栈值对上。
