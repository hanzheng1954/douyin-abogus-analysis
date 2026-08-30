#!/usr/bin/env python3
# bdms VM 反汇编器 —— 输出带注释的可读伪码
import json, sys

Z = json.load(open('/home/exedev/gan/douyin-re/vm_Z.json'))
z = json.load(open('/home/exedev/gan/douyin-re/vm_z_full.json'))

# 操作码语义表（opcode -> (name, n_operands, desc)）
OPS = {
 0:("CALL",1,"call fn with argc args"),
 1:("LE","a<=b"),
 2:("GT","a>b"),
 3:("FORIN",1,"s[x]=[keys(obj),obj]"),
 4:("FORIN_NEXT",1,"next key"),
 5:("GLOAD",1,"push global Z[x]"),
 6:("NE","a!=b"),
 7:("OBJ","push {}"),
 8:("GET","obj[key]"),
 9:("TRUE","push true"),
 10:("UNDEF","push undefined"),
 11:("MOD","a%=b"),
 12:("AND","a&=b"),
 13:("INSTOF","a instanceof b"),
 14:("SET","obj[key]=val"),
 15:("GSET",1,"globalThis[Z[x]]=val"),
 16:("SET_TOP","obj[key]=top(不弹)"),
 17:("JMP_T",1,"jump if top truthy (不弹)"),
 18:("DUP","push top"),
 19:("USHR","a>>>=b"),
 20:("SET_GK",1,"obj[Z[x]]=val"),
 21:("SUB","a-=b"),
 22:("FRAME_BAR","return if frame-switched"),
 23:("JMP_EQ",1,"jump if a===b"),
 24:("TYPEOF","push typeof"),
 25:("DEL","delete obj[key]"),
 26:("POP","pop"),
 27:("FALSE","push false"),
 28:("NAN","push NaN"),
 29:("NOT","push !a"),
 30:("GET_GK",1,"push obj[Z[x]]"),
 31:("JMP_T_POP",1,"jump if pop truthy"),
 32:("LT","a<b"),
 33:("UNDEF2","push undefined"),
 34:("THIS","push this(c)"),
 35:("SHR","a>>=b"),
 36:("UPLUS","push +a"),
 37:("BNOT","push ~a"),
 38:("LIT",1,"push literal"),
 39:("SLICE",1,"a=v.slice(p,p+F)"),
 40:("PRE_INC","++obj[key]"),
 41:("JMP_F",1,"jump if !pop"),
 42:("DIV","a/=b"),
 43:("NEG","push -a"),
 44:("PRE_DEC","--obj[key]"),
 45:("MUL","a*=b"),
 46:("NUM_G",1,"push +Z[x]"),
 47:("DEF_GET",1,"defineProperty getter Z[x]"),
 48:("DEF_SET",1,"defineProperty setter Z[x]"),
 49:("RET","return top"),
 50:("POST_INC","obj[key]++"),
 51:("OR","a|=b"),
 52:("TRY_JMP",1,"set f=1 l=pc+U"),
 53:("JMP",1,"a+=U"),
 54:("S_WRITE",2,"s-chain[N][x]=pop"),
 55:("IN","a in b"),
 56:("SHL","a<<=b"),
 57:("SEQ","a===b"),
 58:("EQ","a==b"),
 59:("NEW",1,"new fn(...args)"),
 60:("GLB",1,"push globalThis[Z[x]] (checked)"),
 61:("S_ADDR",2,"push s-chain[N], x"),
 62:("NE2","a!=b"),
 63:("MAKE_FN",1,"D(program, s) -> cached fn"),
 64:("GE","a>=b"),
 65:("INF","push Infinity"),
 66:("POST_DEC","obj[key]--"),
 67:("DEF_VAL",1,"defineProperty value Z[x]"),
 68:("ADD","a+=b"),
 69:("TYPEOF_G",1,"push typeof globalThis[Z[x]]"),
 70:("XOR","a^=b"),
 71:("JMP_T2",1,"jump if pop truthy"),
 72:("ENSURE_G",1,"ensure globalThis[Z[x]] exists"),
 73:("PUSH_Z",1,"push Z[x]"),
 74:("S_READ",2,"push s-chain[N][x]"),
 75:("NULL","push null"),
}

def disasm(pid):
    entry = z[pid]
    bc, arity, flags, ext = entry
    print(f"===== PROGRAM {pid} (arity={arity} flags={flags} bcLen={len(bc)}) =====")
    labels = {}
    # 收集跳转目标
    targets = {0}
    i = 0
    n = len(bc)
    while i < n:
        op = bc[i]
        opn = OPS.get(op)
        if opn is None:
            i += 1; continue
        k = opn[1] if len(opn) == 3 else 0
        targets.add(i)
        if op in (17, 23, 31, 41, 53, 71) and i + 1 < n:
            targets.add(i + 1 + bc[i+1])
        if op == 52 and i + 1 < n:
            targets.add(i + 1 + bc[i+1])
        i += 1 + k
    # 反汇编
    i = 0
    while i < n:
        op = bc[i]
        opn = OPS.get(op)
        label = ""
        if i in targets and i != 0:
            label = f"L{i}:"
        if opn is None:
            print(f"  {label:>7} pc={i:<5} ???{op}")
            i += 1
            continue
        name = opn[0]; k = opn[1] if len(opn) == 3 else 0; desc = opn[2] if len(opn) == 3 else opn[1]
        ops = []
        for j in range(k):
            ops.append(bc[i+1+j])
        extra = ""
        if op == 38:
            v = ops[0]
            extra = f" -> {v!r}"
        if op in (5, 15, 20, 30, 46, 47, 48, 60, 67, 69, 72, 73):
            x = ops[0]
            extra = f" Z[{x}]={Z[x]!r}"
        if op == 63:
            extra = f" -> program {ops[0]}"
        if op in (17, 23, 31, 41, 52, 53, 71):
            extra = f" -> L{i+1+ops[0]}"
        if op in (54, 61, 74):
            extra = f" chain={ops[0]} slot={ops[1]}"
        if op in (3, 4):
            extra = f" s-slot={ops[0]}"
        if op == 39:
            extra = f" count={ops[0]}"
        print(f"  {label:>7} pc={i:<5} {name:<11} {extra}   ; {desc}")
        i += 1 + k

for pid in [int(x) for x in sys.argv[1:]]:
    disasm(pid)
    print()
