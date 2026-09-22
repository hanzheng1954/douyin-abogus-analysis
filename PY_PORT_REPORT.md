# 纯 Python 移植 abogus 报告（忠实解释器 + 逐点对拍）

> 最新状态（本轮续修）：**已能全流程产出 a_bogus** —— boot → bdms.init → XHR.open → send
> 全程无异常，输出 168 字符（目标 180，差 12 字符 = 9 字节），**字节级对拍尚未通过**。
> 本轮又修掉 10 处语义/移植错误（见 §七），其中 4 处是「跑不通 → 跑得通」的关键。

> 历史状态（上一轮）：卡在引导第 1 个程序 J(232) 的子调用（程序 244），未产出任何 a_bogus。

## 零、当前差距（一句话）

    node rerun_sign.js --fixed-entropy --full → 180 字符（参考值，跨进程稳定）
    python3 abogus_py.py                       → 168 字符（已出签名，长度偏短）

长度差 12 base64 字符 = 9 字节载荷；UA、query、cookie、固定时间（1788091256878）两侧已核对一致，
差异最可能来自熵消耗次数或程序 150 载荷装配中的某个字段（下一步定位方案见 §八）。

## 一、参考基准（可复现）

```
$ node rerun_sign.js --fixed-entropy --full
[固定熵#1] full=mvljXtXiE25fKV/SYCaK7G/lc62Arpuysa4dYfxTHxzTLhzbTuPnOTFOnoFusOcLO8pTi9170VMAbxxcp4XspC9kompkuhtWu4ccVufohHxUTTvhHNLkKYtEwJ4FUSTY/AAviBi11UUn2Lc3qNcTA1PBi58z-CG-BrpW6MjXEVHvhTUn7d6=
```
连跑 3 次字节一致（跨进程稳定）。`abogus_probe.js`（注入式探针）复现同一值：
`A_BOGUS: mvljXtXiE25fKV/...7d6=`，`XARGS count: 211`（全程 211 次 VM 程序调用）。

## 二、改动/新增文件

| 文件 | 状态 | 说明 |
|---|---|---|
| `abogus_vm.py` | **新增** | 忠实 VM：76+1 操作码、帧内共享栈、`y()` 三态展开、`b()` 惰性全局访问器、JS 值模型 |
| `abogus_env.py` | **新增** | 与 `node_signer.js` 逐项对齐的 shims（固定熵 LCG、固定 Date、SM3 `gr`、URL/RegExp/Array/String/Object 内置） |
| `abogus_py.py` | **新增** | 驱动：引导序列 → `bdms.init` → `XHR.open/send`，用法 `python3 abogus_py.py [--trace] [--stop boot|init|open]` |
| `gen_boot.py` / `vm_boot.py` | **新增** | 从 `bdms_patched.js` **自动抽取** 39 个模块级 `J(pid, undefined, arguments, {...})` 与 13 个 `var X=Y` 别名（不手抄，避免抄错） |
| `abogus_probe.js` / `abogus_scan.js` | **新增（探针，建议保留）** | Node 侧注入探针：程序调用序列/参数/返回值、全局读、D() 顺序、属性访问面、表指纹校验 |
| `abogus_full.py` / `abogus.py` / `abogus_shims.py` / `abogus_driver.py` | **未改动** | 旧路线，仍停在 `abogus_full.py:454 Exception: <JSFunction object>`，已被新路线取代 |
| 受保护文件 | 未触碰 | `vm_*.json`、`bdms_patched.js`、`node_signer.js`、`rerun_sign.js`、`README/REPORT/TRACKING.md` |

## 三、本轮修掉的 7 个语义错误（每个都跑过验证）

全部对照 `bdms_patched.js` 的 `X()/g()/d()/y()/b()/D()` 逐行核对：

1. **就地换帧不生效**（`abogus_vm.py:818`）——`exec_block()` 把 `self.o` 快照成局部变量 `o`，
   JS 里 `g()` 改的是闭包变量、`d()` 下一轮直接读新 `o`。修法：V 命中换帧后 `return`，
   由 `do{...}while(y())` 重新进入。**修前**：程序 232 反复重放自身字节码（无限递归，60s 超时无输出）；
   **修后**：正确地进入下一层程序。
2. **嵌套 X 抛出的 JS 异常没被本帧 `catch`**（`abogus_vm.py:727`）——JS 的
   `do{try{d()}catch(t){f=3;l=t}}` 会把 `n.apply(d,e)` / `new` 抛出的异常吞进 `f=3`。修法：`run()` 增加 `except JSThrow`。
3. **opcode 59 (`new`) 的实参数组越界**（`abogus_vm.py:1055`）——`G=[undefined]` 后 `G[r]=...` 在
   Python 里报 IndexError（JS 数组自动扩容）。修法：`G=[None]*(r+1)`。
4. **opcode 74 吞掉 TypeError**（`abogus_vm.py:1125`）——原写法 `getprop(U,x) if isinstance(U,JSObj) else None`
   把 JS 的 `undefined[x] → TypeError` 变成 `undefined`，导致异常流（异常表/y()）整条走偏。修法：直接 `getprop(U, str(x))`。
5. `js_key` 未导入（`abogus_env.py`）→ `Object.defineProperty` 直接 NameError。
6. `FUNC_PROTO` 未定义/函数原型链缺失（`abogus_vm.py:469`）→ `.call/.apply/.bind` 拿不到。
7. `abogus_probe.js` 探针注入串被引号打断（已修复，现在可正常复现参考值）。

## 四、当前失败点（精确）

```
$ time python3 abogus_py.py            # 新入口
  File "abogus_vm.py", line 790, in unwind
    raise JSThrow(self.l)
abogus_vm.JSThrow: undefined
```

* **触发条件**：引导序列第 1 个程序 `J(232)`（`vm_boot.py` BOOT[0]）→ 程序 232 pc=94 `CALL` → 程序 244（arity=1，实参 `'400'`）。
* **Node 侧事实**（`abogus_probe.js`）：`> 232 argc=0` → `> 244 argc=1 400` → `< 244 => undef`，正常返回。
* **Python 侧事实**（`_DBG` 逐指令）：`pid=244 pc=0 op=33 → pc=1 op=74(chain=2,slot=8) → pc=4 op=34 → pc=5 op=74(chain=1,slot=2) → pc=8 op=0` 后以 `JSThrow(undefined)` 逃出，
  且 **244 的 `s[0][0][8]` 读从未落到 `StateObj` 上**（打桩 `StateObj.own_get` 无输出），
  而 232 的 prologue 确实写入过该槽位（打桩输出：`STATE[7] <- DWrapper`、`STATE[8] <- DWrapper`，
  对应 `J(232)` 状态槽 7=`q`、8=`N`，即 244 应调用 `N=D(277)`）。
* 差异定位：`abogus_vm.py:818-826`（opcode 0 的 V 路径 vs apply 路径）+ `abogus_vm.py:1125`（链式读）；
  244 的 `S_READ chain=2` 在 Python 里取到的不是 `J(232)` 状态对象，说明 **D-wrapper 的 hot/state 语义**
  （JS：只有最新 wrapper 在 `V` Map 里，过期 wrapper 走 `n.apply` → 新 X、自己的帧栈）仍有偏差。
* 附带证据：`load` 阶段的 `D()` 创建顺序里，242/243/244…252 这一组并不是 232 的 prologue 建的
  （232 只建 233,236-241,253,256-260,272,274,275,277），因此第一个分叉点在**更早的某个程序**里，
  需要按调用序逐帧对拍定位。

## 五、下一步最小动作

1. 用同一份探针做**逐指令对拍**（唯一入口已就绪）：
   * Node：`node abogus_probe.js --trace-ops=232,244`（`__TRC.op` 钩子已埋在 `bdms_patched.js`，输出 `pid:pc op=... p=...`）
   * Python：`_DBG = [0, N, pid]`（`abogus_vm.py` 内已有开关，`/tmp/dbg5.py` 可复用）
   两边对齐 232 pc=85..94 与 244 pc=0..10 的 `p`/`op`/栈值，即可确定是 V 路径判据还是
   `s[0][0][8]` 的状态链取值错。
2. 加一个 `DWrapper.state` 打印（244 入口打印 `type(state)`、`state.items[0]`），确认它拿到的是
   `J(232)` 的帧数组而不是别的模块帧数组——这决定是「wrapper 过期判定」还是「状态链取错」。
3. 引导跑通后按 `--stop init` / `--stop open` 分段验证，再对 `A_BOGUS` 做字符级 diff
   （期望 180 字符、base64ish；差异位数用 `sum(a!=b for a,b in zip(ref,got))`）。

## 六、探针文件去留

* **保留**：`abogus_probe.js`（Node 侧对拍基准，可复现参考值 + 调用序列/全局读/D 顺序）、
  `abogus_scan.js`（环境面清单：全局读 19 个名字、属性访问面、opcode 使用面 —— 移植 shims 的依据）。
* **可删**：`/tmp/dbg*.py`（一次性调试脚本，在 /tmp，不在仓库）；`vm_boot.py` 是可再生产物
  （`python3 gen_boot.py` 重新生成），但建议保留。
* **不要删**：`abogus_vm.py` / `abogus_env.py` / `abogus_py.py` / `gen_boot.py` / `vm_boot.py`。

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

## 八、下一步（定位那 9 字节）

1. **熵消耗计数**：给 Python `RandomSource.next` 与 Node 侧 `Math.random`/`crypto.getRandomValues` 各加计数器，
   跑同一 query 比较总次数与逐次取值 —— 这是当前最可疑的差异源。
2. **载荷 dump 对拍**：在 Node 侧注入探针、Python 侧在程序 150 出口打印，把 base64 前的字节数组逐段对齐
   （模式字节 / 时间戳 / 双周序号 / 校验和 / 熵数组 / pageId / aid / 屏幕 / SM3 摘要），定位少掉或变短的字段。
3. 收敛后跑 `python3 abogus_py.py` 与 `node rerun_sign.js --fixed-entropy --full` 的字符级 diff（目标 0 差异位），
   再把该断言写进 `verify_all.sh`（当前为 SKIP，会显示长度差）。
