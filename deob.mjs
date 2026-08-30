import { webcrack } from 'webcrack';
import fs from 'fs';
for (const [inp, out] of [['capture/048_bytetos.com_obj_rc-client-security_c-webmssdk_1.0.0.20_webmssdk.es5.js.js','out_webmssdk.js'],['capture/050_ytetos.com_obj_rc-client-security_web_glue_1.0.0.64-fix.01_sdk-glue.js.js','out_sdkglue.js']]) {
  const code = fs.readFileSync(inp, 'utf-8');
  try {
    const res = await webcrack(code);
    fs.writeFileSync(out, res.code);
    console.log(inp, '->', out, res.code.length, 'chars');
  } catch (e) { console.log(inp, 'FAILED:', e.message); }
}
