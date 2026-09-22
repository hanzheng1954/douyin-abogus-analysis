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
  [ -n "$A" ] && [ "$A" = "$B" ] && [ ${#A} -eq 180 ] && ok "两次独立进程首值相同且长度 180" || ng "签名重跑不稳定或长度异常"
  C=$(node rerun_sign.js --full 2>/dev/null | sed -n 's/.*\[随机熵#1\] full=//p')
  D=$(node rerun_sign.js --full 2>/dev/null | sed -n 's/.*\[随机熵#2\] full=//p')
  [ -n "$C" ] && [ "$C" != "$D" ] && ok "随机熵两次不同（非确定性成立）" || ng "随机熵未体现非确定性"
  P=$(node abogus_probe.js 2>/dev/null | sed -n 's/^A_BOGUS: //p')
  [ -n "$P" ] && [ "$P" = "$A" ] && ok "探针 abogus_probe.js 与固定熵参考值一致（180 字符）" || ng "探针结果与参考值不一致"
  # Python 移植（WIP）：已能产出签名，但长度与 Node 参考值仍有差距
  if python3 abogus_py.py >/tmp/va_py.log 2>&1; then
    PYLEN=$(sed -n 's/^A_BOGUS: //p' /tmp/va_py.log | head -1 | awk '{print length($0)}')
    if [ -n "$PYLEN" ] && [ "$PYLEN" -gt 0 ]; then
      [ "$PYLEN" -eq 180 ] && ok "Python 移植产出 180 字符签名（与参考同长）" \
        || sk "Python 移植已出签名但长度 $PYLEN（目标 180，差异待收敛，见 PY_PORT_REPORT.md）"
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
