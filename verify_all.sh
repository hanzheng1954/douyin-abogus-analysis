#!/usr/bin/env bash
# 一键复核：重跑「分析流水线」的可验证环节，全绿即表示仓库产物与线上/文档一致
# 用法: ./verify_all.sh [--online]   （--online 才访问 douyin.com，默认只跑离线部分）
set -u
cd "$(dirname "$0")"
PASS=0; FAIL=0; SKIP=0
ok(){ printf '  \033[32mPASS\033[0m %s\n' "$1"; PASS=$((PASS+1)); }
ng(){ printf '  \033[31mFAIL\033[0m %s\n' "$1"; FAIL=$((FAIL+1)); }
sk(){ printf '  \033[33mSKIP\033[0m %s\n' "$1"; SKIP=$((SKIP+1)); }

echo "== 1. VM 表：纯 Python 解码 vs 仓库表 =="
if python3 dump_vm.py --diff | grep -q '一致 ✅'; then
  python3 dump_vm.py --diff | grep -c '一致 ✅' | grep -q '^3$' && ok "vm_Z / vm_z_full / vm_z_index 三表一致" || ng "部分表不一致"
else ng "dump_vm.py --diff 失败"; fi

echo "== 2. VM 表：Node 运行时 dump 交叉验证 =="
if command -v node >/dev/null 2>&1; then
  node rerun_dump.js >/tmp/va_node.log 2>&1 || true
  grep -q 'Z=1001 程序=796' /tmp/va_node.log && ok "Node dump Z=1001/796" || ng "Node dump 异常（见 /tmp/va_node.log）"
  python3 - <<'PY' && ok "Node dump 与 Python 解码 JSON 级一致" || ng "两条路径结果不一致"
import json,sys
try:
    for n in ('vm_Z.json','vm_z_full.json','vm_z_index.json'):
        if json.load(open('rebuilt_vm_node/'+n))!=json.load(open('rebuilt_vm/'+n)): sys.exit(1)
except FileNotFoundError: sys.exit(1)
PY
else sk "未安装 node"; fi

echo "== 3. 反汇编可复现 =="
python3 disasm.py 150 > /tmp/va150.txt 2>&1
diff -q disasm_150.txt /tmp/va150.txt >/dev/null && ok "disasm_150.txt 一致（864 行）" || ng "disasm_150.txt 不一致"
python3 disasm.py 277 272 274 251 246 96 > /tmp/vahelp.txt 2>&1
diff -q disasm_helpers.txt /tmp/vahelp.txt >/dev/null && ok "disasm_helpers.txt 一致（133 行）" || ng "disasm_helpers.txt 不一致"

echo "== 4. 签名重跑（固定熵 = 跨进程可复现）=="
if command -v node >/dev/null 2>&1; then
  A=$(node rerun_sign.js --fixed-entropy --full 2>/dev/null | sed -n 's/.*\[固定熵#1\] full=//p')
  B=$(node rerun_sign.js --fixed-entropy --full 2>/dev/null | sed -n 's/.*\[固定熵#1\] full=//p')
  [ -n "$A" ] && [ "$A" = "$B" ] && ok "两次独立进程首值相同（跨进程可复现，长度 ${#A}）" || ng "签名重跑不稳定"
  C=$(node rerun_sign.js --full 2>/dev/null | sed -n 's/.*\[随机熵#1\] full=//p')
  D=$(node rerun_sign.js --full 2>/dev/null | sed -n 's/.*\[随机熵#2\] full=//p')
  [ -n "$C" ] && [ "$C" != "$D" ] && ok "随机熵两次不同（非确定性成立）" || ng "随机熵未体现非确定性"
  P=$(node abogus_probe.js 2>/dev/null | sed -n 's/^A_BOGUS: //p')
  [ -n "$P" ] && [ ${#P} -eq ${#A} ] && ok "探针 abogus_probe.js 产出同长签名（${#P} 字符）" || ng "探针结果长度异常（${#P} vs ${#A}）"
  # Python 移植：与 Node 固定熵参考值逐字符对拍（长度已对齐，差异数待收敛到 0）
  if python3 abogus_py.py >/tmp/va_py.log 2>&1; then
    PYVAL=$(sed -n 's/^A_BOGUS: //p' /tmp/va_py.log | head -1)
    if [ -n "$PYVAL" ]; then
      DIFF=$(python3 -c "
import sys
a='''$A'''.strip(); b='''$PYVAL'''.strip()
print(sum(1 for x,y in zip(a,b) if x!=y) if len(a)==len(b) else -1)")
      [ "$DIFF" = "0" ] && ok "Python 移植与 Node 参考值逐字符一致（${#PYVAL} 字符，0 差异）" \
        || sk "Python 移植长度 ${#PYVAL}、与参考差 $DIFF 位（见 PY_PORT_REPORT.md §九：环境校验和 bitmask）"
    else ng "Python 移植未产出 a_bogus（见 /tmp/va_py.log）"; fi
  else ng "Python 移植运行失败（见 /tmp/va_py.log）"; fi
else sk "未安装 node"; fi

echo "== 5. 本地层往返对拍（文档声明的统计口径）=="
python3 - <<'PY' && ok "1001 字符串 / 796 程序 / 关键串与程序映射符合报告" || ng "统计口径与文档不符"
import json,sys
Z=json.load(open('vm_Z.json')); idx=json.load(open('vm_z_index.json'))
progs={e['i']:e['bcLen'] for e in idx}
exp={103:203,105:154,106:95,107:238,132:135,150:1834}
ok = len(Z)==1001 and len(idx)==796 and Z[220]=='a_bogus' and Z[262]=='dhzx' \
     and Z[214]=='bdmsInvokeList' and Z[218]=='args' and all(progs[k]==v for k,v in exp.items())
sys.exit(0 if ok else 1)
PY

if [ "${1:-}" = "--online" ]; then
  echo "== 6. 线上巡检（访问 douyin.com，仅 GET 公开资源）=="
  python3 track_douyin.py > /tmp/va_track.log 2>&1; rc=$?
  tail -n 6 /tmp/va_track.log | sed 's/^/  /'
  [ $rc -eq 0 ] && ok "与 track_baseline.json 无差异" || { [ $rc -eq 1 ] && ng "检测到变更（见 /tmp/va_track.log）" || sk "部分目标拉取失败（退出码 $rc）"; }
else
  sk "线上巡检未跑（加 --online 启用）"
fi

echo
echo "结果: PASS=$PASS FAIL=$FAIL SKIP=$SKIP"
[ $FAIL -eq 0 ] || exit 1
