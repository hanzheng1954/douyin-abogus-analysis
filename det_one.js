// 确定性基线：固定 Math.random / Date.now / performance.now 生成基准 a_bogus
const fs = require('fs');

// 固定熵源
let seed = 12345;
Math.random = function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const FIXED_NOW = 1788091256878;
Date.now = function () { return FIXED_NOW; };
const RealDate = Date;
Date = class extends RealDate { constructor(...args) { super(...(args.length ? args : [FIXED_NOW])); } static now() { return FIXED_NOW; } };
global.performance = { now: () => FIXED_NOW, timing: { navigationStart: 0 } };

global.crypto = { getRandomValues: (arr) => { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); return arr; } };
require('/home/exedev/gan/douyin-re/node_signer.js');
const sess = JSON.parse(fs.readFileSync('/home/exedev/gan/douyin-re/session.json', 'utf-8'));
const cookieStr = sess.cookies.map(c => c.name + '=' + c.value).join('; ');
global.document.cookie = cookieStr;
try { global.window.bdms.init({ aid: 6383, pageId: 6241, paths: ['^/webcast/', '^/aweme/v1/', '^/aweme/v2/', '/douplus/', '^/api/ad/v1/inspire', '/v1/message/send', '^/live/', '^/captcha/', '^/ecom/', '^/luna/pc'], boe: false, ddrt: 8.5, ic: 8.5 }); } catch (e) {}

const sample = sess.appends[0];
const xhr = new global.XMLHttpRequest();
xhr.open('GET', 'https://www.douyin.com/aweme/v1/web/social/count?' + sample.query);
xhr.send(null);
const bogus = decodeURIComponent(xhr._url.split('a_bogus=')[1].split('&')[0]);
console.log('BASELINE a_bogus:', bogus);
console.log('len:', bogus.length);
fs.writeFileSync('/home/exedev/gan/douyin-re/baseline_bogus.txt', bogus);
