// 从 bdms_patched.js（经 node_signer 加载）把运行时 VM 表 dump 成 JSON，用于与 dump_vm.py 交叉对拍
const fs = require('fs');
const PROC = process;   // node_signer 加载后会隐藏 global/process
const path = require('path');
const dir = __dirname;
require(path.join(dir, 'node_signer.js'));

const Z = globalThis.__Z, z = globalThis.__z;
if (!Array.isArray(Z) || !Array.isArray(z)) {
  console.error('未拿到 __Z/__z —— patched bdms 的 dump 钩子可能已变');
  PROC.exit(1);
}
const out = path.join(dir, 'rebuilt_vm_node');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'vm_Z.json'), JSON.stringify(Z));
fs.writeFileSync(path.join(out, 'vm_z_full.json'), JSON.stringify(z));
fs.writeFileSync(path.join(out, 'vm_z_index.json'), JSON.stringify(
  z.map((p, i) => ({ i, arity: p[1], flags: p[2], bcLen: p[0].length, exLen: p[3].length }))));

const key = { 'Z[220]': Z[220], 'Z[247]': String(Z[247]).slice(0, 12), 'Z[262]': Z[262], 'Z[214]': Z[214], 'Z[218]': Z[218] };
const progs = {};
for (const id of [103, 105, 106, 107, 132, 150]) progs[id] = z[id][0].length;
console.log('node 运行时 dump: Z=' + Z.length + ' 程序=' + z.length);
console.log('关键串', JSON.stringify(key));
console.log('关键程序 bcLen', JSON.stringify(progs));
console.log('写出 -> rebuilt_vm_node/');
PROC.exit(0);
