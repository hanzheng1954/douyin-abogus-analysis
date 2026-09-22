# 纯 Python 移植 abogus 报告（本轮：忠实解释器重写 + 逐点对拍）

> 结论一句话：**没有跑通**。参考值已能稳定复现（Node 侧），Python 侧新建了一条忠实移植路线
> （`abogus_vm.py` / `abogus_env.py` / `abogus_py.py` + 自动生成的 `vm_boot.py`），
> 已修掉 7 处解释器语义错误，目前卡在**引导第 1 个程序 J(232) 的子调用（程序 244）**上，
> 尚未产出任何 a_bogus。

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
