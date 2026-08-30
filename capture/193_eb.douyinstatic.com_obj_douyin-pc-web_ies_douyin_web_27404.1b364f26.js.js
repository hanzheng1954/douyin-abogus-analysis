/*! For license information please see 27404.1b364f26.js.LICENSE.txt */
!function(e,n){"object"==typeof module&&"object"==typeof module.exports?n():"function"==typeof define&&define.amd?define([],n):(e="undefined"!=typeof globalThis?globalThis:e||self)&&n()}(this,function(){"use strict";"object"==typeof window&&(window.openRedirect={version:"1.2.20",webpackPluginVersion:"3.4.22",reportOnly:!1})}),!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).xss={})}(this,function(e){"use strict";var n=function(){return(n=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)};function r(e,n,r){if(r||2==arguments.length)for(var t,o=0,a=n.length;o<a;o++)!t&&o in n||(t||(t=Array.prototype.slice.call(n,0,o)),t[o]=n[o]);return e.concat(t||Array.prototype.slice.call(n))}var t=/[^a-zA-Z0-9\\_:.-]/gim,o=/</g,a=/>/g,i=/&#([a-zA-Z0-9]*);?/gim,s=/&quot;/g,d=/&colon;?/gim,R=/&newline;?/gim,c=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,u=/u\s*r\s*l\s*\(.*/gi,l=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,h=/"/g,f=function(e){return e.replace(o,"&lt;").replace(a,"&gt;")},p={indexOf:function(e,n){var r,t;for(r=0,t=e.length;r<t;r++)if(e[r]===n)return r;return -1},forEach:function(e,n,r){var t,o;for(t=0,o=e.length;t<o;t++)n.call(r,e[t],t,e)},some:function(e,n,r){var t,o;for(t=0,o=e.length;t<o;t++)if(n.call(r,e[t],t,e))return!0;return!1},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},includes:function(e,n){if("string"==typeof e)return -1!==e.indexOf(n);for(var r=0;r<e.length;r++)if(e[r]===n)return!0;return!1},spaceIndex:function(e){var n=/\s|\n|\t/.exec(e);return n?n.index:-1},uniq:function(e){for(var n={},r=[],t=0;t<e.length;t++)n[e[t]]||(r.push(e[t]),n[e[t]]=!0);return r},from:function(e){for(var n=[],r=0;r<e.length;r++)n.push(e[r]);return n},keys:function(e){var n=[];for(var r in e)n.push(r);return n}};function v(e){return null==e}function M(e){var n;return'"'===(n=e)[0]&&'"'===n[n.length-1]||"'"===n[0]&&"'"===n[n.length-1]?e.substr(1,e.length-2):e}function D(e){var n,r,t,o,a,i,s,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",R="",c=0;for(e=function(e){e=e.replace(/rn/g,"n");for(var n="",r=0;r<e.length;r++){var t=e.charCodeAt(r);t<128?n+=String.fromCharCode(t):t>127&&t<2048?n+=String.fromCharCode(t>>6|192)+String.fromCharCode(63&t|128):n+=String.fromCharCode(t>>12|224)+String.fromCharCode(t>>6&63|128)+String.fromCharCode(63&t|128)}return n}(e);c<e.length;)o=(n=e.charCodeAt(c++))>>2,a=(3&n)<<4|(r=e.charCodeAt(c++))>>4,i=(15&r)<<2|(t=e.charCodeAt(c++))>>6,s=63&t,isNaN(r)?i=s=64:isNaN(t)&&(s=64),R=R+d.charAt(o)+d.charAt(a)+d.charAt(i)+d.charAt(s);return R}function g(e){var n,r,t,o,a,i,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",d="",R=0;for(e=e.replace(/[^A-Za-z0-9+/=]/g,"");R<e.length;)n=s.indexOf(e.charAt(R++))<<2|(o=s.indexOf(e.charAt(R++)))>>4,r=(15&o)<<4|(a=s.indexOf(e.charAt(R++)))>>2,t=(3&a)<<6|(i=s.indexOf(e.charAt(R++))),d+=String.fromCharCode(n),64!==a&&(d+=String.fromCharCode(r)),64!==i&&(d+=String.fromCharCode(t));return function(e){for(var n="",r=0,t=0,o=0,a=0;r<e.length;)(t=e.charCodeAt(r))<128?(n+=String.fromCharCode(t),r++):t>191&&t<224?(n+=String.fromCharCode((31&t)<<6|63&(a=e.charCodeAt(r+1))),r+=2):(a=e.charCodeAt(r+1),n+=String.fromCharCode((15&t)<<12|(63&a)<<6|63&(o=e.charCodeAt(r+2))),r+=3);return n}(d)}function _(e,n,r){var t="",o=0,a=!1,i=!1,s=0,d=e.length,R="",c="";e:for(s=0;s<d;s++){var u=e.charAt(s);if(!1===a){if("<"===u){a=s;continue}}else if(!1===i){if("<"===u){t+=r(e.slice(o,s)),a=s,o=s;continue}if(">"===u||s===d-1){t+=r(e.slice(o,a)),R=function(e){var n,r=p.spaceIndex(e);return n=-1===r?e.slice(1,-1):e.slice(1,r+1),"/"===(n=p.trim(n).toLowerCase()).slice(0,1)&&(n=n.slice(1)),"/"===n.slice(-1)&&(n=n.slice(0,-1)),n}(c=e.slice(a,s+1)),t+=n(a,t.length,R,c,"</"===c.slice(0,2)),o=s+1,a=!1;continue}if('"'===u||"'"===u)for(var l=1,h=e.charAt(s-l);""===h.trim()||"="===h;){if("="===h){i=u;continue e}h=e.charAt(s-++l)}}else if(u===i){i=!1;continue}}return o<d&&(t+=r(e.substr(o))),t}function b(e,n){var r=0,o=0,a=[],i=!1,s=e.length;function d(e,r){if(!((e=(e=p.trim(e)).replace(t,"").toLowerCase()).length<1)){var o=n(e,r||"");o&&a.push(o)}}for(var R=0;R<s;R++){var c=e.charAt(R),u=void 0;if(!1!==i||"="!==c){if(!1===i||R!==o){if(/\s|\n|\t/.test(c)){if(e=e.replace(/\s|\n|\t/g," "),!1===i){if(-1===(u=function(e,n){for(;n<e.length;n++){var r=e[n];if(" "!==r)return"="===r?n:-1}return -1}(e,R))){d(p.trim(e.slice(r,R))),i=!1,r=R+1;continue}R=u-1;continue}if(-1===(u=function(e,n){for(;n>0;n--){var r=e[n];if(" "!==r)return"="===r?n:-1}return -1}(e,R-1))){d(i,M(p.trim(e.slice(r,R)))),i=!1,r=R+1;continue}}}else{if(-1===(u=e.indexOf(c,R+1)))break;d(i,p.trim(e.slice(o+1,u))),i=!1,r=(R=u)+1}}else i=e.slice(r,R),r=R+1,o='"'===e.charAt(r)||"'"===e.charAt(r)?r:function(e,n){for(;n<e.length;n++){var r=e[n];if(" "!==r)return"'"===r||'"'===r?n:-1}return -1}(e,R+1)}return r<e.length&&(!1===i?d(e.slice(r)):d(i,M(p.trim(e.slice(r))))),p.trim(a.join(" "))}function H(e,n,r){if(r=function(e){return e=function(e){for(var n="",r=0,t=e.length;r<t;r++)n+=32>e.charCodeAt(r)?" ":e.charAt(r);return p.trim(n)}(e=(e=(e=e.replace(s,'"')).replace(i,function(e,n){return"x"===n[0]||"X"===n[0]?String.fromCharCode(parseInt(n.substr(1),16)):String.fromCharCode(parseInt(n,10))})).replace(d,":").replace(R," "))}(r),"href"===n||"src"===n){if("#"===(r=p.trim(r)))return"#";if("http://"!==r.substr(0,7)&&"https://"!==r.substr(0,8)&&"mailto:"!==r.substr(0,7)&&"tel:"!==r.substr(0,4)&&"data:image/"!==r.substr(0,11)&&"ftp://"!==r.substr(0,6)&&"./"!==r.substr(0,2)&&"../"!==r.substr(0,3)&&"#"!==r[0]&&"/"!==r[0])return""}else if("background"===n){if(c.lastIndex=0,c.test(r))return""}else if("style"===n&&(l.lastIndex=0,l.test(r)||(u.lastIndex=0,u.test(r)&&(c.lastIndex=0,c.test(r)))))return"";return r=function(e){return e=f(e=e.replace(h,"&quot;"))}(r)}var X=function(e){return"string"==typeof e?e.replace(/'/g,'"').replace('=""',"").replace(/\s+/g,"").toLowerCase():""},m=function(){function e(e){var n=function(e){var n={};for(var r in e)n[r]=e[r];return n}(e||{});n.stripIgnoreTag&&(n.onIgnoreTag,n.onIgnoreTag=function(){return""}),n.whiteList={},n.onTag=function(){},n.onTagAttr=function(){},n.onIgnoreTag=function(){},n.onIgnoreTagAttr=function(){},n.safeAttrValue=H,n.escapeHtml=f,this.options=Object.assign(n,e)}return e.prototype.process=function(e){if(!(e=(e=e||"").toString()))return"";var n,r,t,o,a,i,s=this.options,d=s.whiteList,R=s.onTag,c=s.onIgnoreTag,u=s.onTagAttr,l=s.onIgnoreTagAttr,h=s.safeAttrValue,f=s.escapeHtml;s.stripBlankChar&&(e=(n=(n=e.split("")).filter(function(e){var n=e.charCodeAt(0);return!(127===n||n<=31&&10!==n&&13!==n)})).join("")),s.allowCommentTag||(e=function(e){for(var n="",r=0;r<e.length;){var t=e.indexOf("\x3c!--",r);if(-1===t){n+=e.slice(r);break}n+=e.slice(r,t);var o=e.indexOf("--\x3e",t);if(-1===o)break;r=o+3}return n}(e));var v=!1;s.stripIgnoreTagBody&&(r=s.stripIgnoreTagBody,"function"!=typeof(t=c)&&(t=function(){}),o=!Array.isArray(r),a=[],i=!1,c=(v={onIgnoreTag:function(e,n,s){var d;if(d=e,o||-1!==p.indexOf(r,d)){if(s.isClosing){var R="[/removed]",c=s.position+R.length;return a.push([!1!==i?i:s.position,c]),i=!1,R}return i||(i=s.position),"[removed]"}return t(e,n,s)},remove:function(e){var n="",r=0;return p.forEach(a,function(t){n+=e.slice(r,t[0]),r=t[1]}),n+=e.slice(r)}}).onIgnoreTag);var M=_(e,function(e,n,r,t,o){var a={sourcePosition:e,position:n,isClosing:o,isWhite:Object.prototype.hasOwnProperty.call(d,r)},i=R(r,t,a);if(null!=i)return i;if(a.isWhite){if(a.isClosing)return"</".concat(r,">");var s=function(e){var n=p.spaceIndex(e);if(-1===n)return{html:"",closing:"/"===e[e.length-2]};var r="/"===(e=p.trim(e.slice(n+1,-1)))[e.length-1];return r&&(e=p.trim(e.slice(0,-1))),{html:e,closing:r}}(t),v=d[r],M=b(s.html,function(e,n){var t=-1!==p.indexOf(v,e),o=u(r,e,n,t);return null==o?t?(n=h(r,e,n,null))?"".concat(e,'="').concat(n,'"'):e:null==(o=l(r,e,n,t))?void 0:o:o});return t="<".concat(r),M&&(t+=" ".concat(M)),s.closing&&(t+=" /"),t+=">"}return null==(i=c(r,t,a))?f(t):i},f);return v&&(M=v.remove(M)),M},e}(),y=Function("\nvar _checkXSS = function (it) {\n  return it && it.Math == Math && it;\n};\nreturn _checkXSS(typeof globalThis === 'object' && globalThis) ||\n_checkXSS(typeof window === 'object' && window) ||\n_checkXSS(typeof self === 'object' && self) ||\n_checkXSS(typeof global === 'object' && global) ||\nFunction('return this')();\n")(),S=new(function(){function e(){var e=this;this.batchData=[],this.uniqKeys=new Set,this.timeout=2e3,this.lock=!1,this.getSlardarBid=function(){var n,r,t="douyin_web";if(!p.includes(t,"bid"))return t;if(e.config&&e.config.bid)return e.config.bid;if(y&&y._xssBid)return y._xssBid;if(y&&y.slardar&&"function"==typeof y.slardar.config){var o=(y.slardar.config()||{}).bid;if(o)return o}if(y&&y.Slardar&&"function"==typeof y.Slardar.config){var a=(y.Slardar.config()||{}).bid;if(a)return a}return(null===(r=null===(n=null==y?void 0:y.Slardar)||void 0===n?void 0:n._baseParams)||void 0===r?void 0:r.bid)||"argus"},this.getConfigRegion=function(){var n;return p.includes("cn","region")?e.config&&e.config.region?e.config.region:((null===(n=null==y?void 0:y.gfdatav1)||void 0===n?void 0:n.region)||"cn").toLowerCase():"cn"},this.gerReportUrl=function(){var n={cn:g("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boe:g("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),ttp:g("aHR0cHM6Ly9tb24udXMudGlrdG9rdi5jb20vbW9uaXRvcl9icm93c2VyL2NvbGxlY3QvYmF0Y2gvc2VjdXJpdHkvP2JpZD0="),va:g("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),maliva:g("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),sg:g("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boei18n:g("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9")}[e.getConfigRegion()];if(n)return n+e.getSlardarBid()}}return e.prototype.setConfig=function(e){this.config=e},e.prototype.upload=function(){var e=this,n=this.gerReportUrl();!this.lock&&n&&0!==this.batchData.length&&(this.lock=!0,setTimeout(function(){var r=e.batchData.slice(0,100);e.batchData=e.batchData.slice(100),y.fetch(n,{method:"post",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}).catch(function(e){}),e.lock=!1,e.upload()},this.timeout))},e.prototype.generateKey=function(e){return e.collectKey?[e.collectMode,e.collectKey].join("___"):""},e.prototype.push=function(e){this.batchData.push(e),this.upload()},e.prototype.report=function(e){var n=this.generateKey(e);if(y.fetch&&e.collectKey){var r="object"==typeof window?window.location.href:"SSR";e.documentUrl=r;var t={age:Math.floor(Date.now()),type:"xss",url:r,body:e,"user-agent":""};"enforce"===e.disposition&&"SSR"!==r||(t.url=n),"SSR"===r&&(t.url="SSR___".concat(t.url),t.body.ssr=!0),this.push(t)}},e}()),T=function(e){for(var n=0,r=function(r){Array.isArray(e[r])?0===e[r].length?delete e[r]:(e[r]=p.from(p.uniq(e[r])),n+=e[r].length):0===p.keys(e[r]).length?delete e[r]:p.keys(e[r]).forEach(function(t){e[r][t]=p.from(p.uniq(e[r][t])),n+=e[r][t].length})},t=0,o=p.keys(e);t<o.length;t++)r(o[t]);return{count:n,ret:e}};function G(e,n){return S.setConfig(n),new m(n).process(e)}function P(e){var n,r=(n=/\s|\n|\t/.exec(e))?n.index:-1;if(-1===r)return{html:"",closing:"/"===e[e.length-2]};var t="/"===(e=e.slice(r+1,-1).trim())[e.length-1];return t&&(e=e.slice(0,-1).trim()),{html:e,closing:t}}var A=function(e){return -1===(e=(e=(e=(e=e.replace(/&colon;/gi,":")).replace(/&tab;/gi,"")).replace(/&newline;/gi,"")).replace(/(\t|\n|\r)/g,"")).indexOf("&#")?e.trim().toLowerCase():e.trim().replace(/&#(?:(x)([0-9a-f]+)|([0-9]+));?/gi,function(e,n,r,t){return String.fromCharCode(n?parseInt(r,16):parseInt(t))}).replace(/(\t|\n|\r)/g,"").toLowerCase()};function O(e,n){if(void 0===e&&(e=""),"string"!=typeof e)return!0;if(e=A(e),p.includes(e,"base64")&&!function(e){if(""===e||""===e.trim())return!0;try{return!p.includes(e,"data:text/html;base64")}catch(e){return!0}}(e))return n&&n("data:text/html;base64"),!1;var r=["expression(","behavior:","view-source:"];if(p.some(r,function(n){return -1!==e.indexOf(n)}))return p.forEach(r,function(r){-1!==e.indexOf(r)&&n&&n(r)}),!1;var t=["data:application","data:javascript","data:text/html","data:texthtml"];if(p.some(t,function(n){return -1!==e.indexOf(n)}))return p.forEach(t,function(r){-1!==e.indexOf(r)&&n&&n(r)}),!1;if(e.indexOf("javascript:")>0)return n&&n("javascript:"),!1;if(/^javascript:/i.test(e)){var o=e.slice(11).replace(/\s/g,"").trim();return!!p.some(["void","void(0)","void0","false","undefined",";"],function(e){return e===o})||(n&&n("javascript:"),!1)}return!0}var w=function(e,n){var r,t,o="<%= isSaveValidUrl =>";if("string"!=typeof e||(t=Number("<%= urlLimit =>"),void 0!==r&&(t=r),"NaN"!==e.toString()&&-1!==t&&e.length>=t)||O(e,n))return e;try{if(!0===(o=JSON.parse(o))||"true"===o){var a=new URL(e);return a.origin+a.pathname}}catch(e){}return"#"};function V(e,n,t){if(void 0===e&&(e=""),void 0===n&&(n=[]),"string"!=typeof e)return!0;if(!O(e=A(e)))return!1;var o,a={url:(o=e.match(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)||[])[0],scheme:o[1],slash:o[2],host:o[3],port:o[4],path:o[5],query:o[6],hash:o[7]},i=a.scheme,s=a.host;return t?!!t(e):!(!i||!s)&&(!p.includes(["http","https","file"],i)||("object"==typeof window&&window&&(n=r(r([],n,!0),[location.host],!1)),p.some(n,function(e){return!!(e instanceof RegExp&&e.test(s))||e===s})))}var E={a:["target","title","spellcheck","rel"],canvas:[],abbr:["title"],address:[],area:["shape","coords","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:["dir"],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["alt","title","width","height","decoding"],ins:["datetime"],li:[],mark:[],nav:[],ol:["start"],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],delete:[],form:[],strong:[],mask:["maskunits","x","y","width","height","fill"],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],wbr:[],video:["autoplay","controls","loop","preload","height","width"],svg:["viewBox","version","xmlns","fill","width","height","stroke","stroke-width","style"],path:["d","fill","opacity","stroke","p-id","fill-rule","clip-rule","stroke-width","stroke-linecap","stroke-linejoin","fill-opacity","mask"],rect:["x","y","width","height","fill","stroke","rx"],g:[]},x={collect:null,initCollect:function(){this.collect={whiteList:{},filterProtocol:[]}},removeCollect:function(){var e=T(this.collect),n=e.count,r=e.ret;return this.collect=null,{collectKey:0===n?null:JSON.stringify(r),collectMode:"white"}},onIgnoreTagAttr:function(e,n,t){return e&&p.indexOf(["href","src"],n)>-1?x.domainWhiteList&&Array.isArray(x.domainWhiteList)&&x.domainWhiteList.length>0&&!V(t,r([],x.domainWhiteList,!0))?"":"".concat(n,'="').concat(w(t,function(e){var n;null===(n=x.collect)||void 0===n||n.filterProtocol.push(e)}),'"'):e&&(p.indexOf(["style","class","id"],n)>-1||n.indexOf("data-")>-1)?"".concat(n,'="').concat(t,'"'):(x.collect.whiteList[e]=x.collect.whiteList[e]||[],void x.collect.whiteList[e].push(n))},onIgnoreTag:function(e,n){if("style"===e)return n;_(n,function(e,n,r,t){b(P(t).html.replace("/",""),function(e){x.collect.whiteList[r]=x.collect.whiteList[r]||[],x.collect.whiteList[r].push(e)})},f)},whiteList:E,mergeWhiteList:function(e){for(var n,r={},t=0,o=p.keys(E);t<o.length;t++)r[n=o[t]]=p.from(E[n]);for(var a=0,i=p.keys(e);a<i.length;a++)r[n=i[a]]=n in E?E[n].concat(e[n]):p.from(e[n]);return r},setWhiteList:function(e){for(var n=0,r=p.keys(e);n<r.length;n++){var t=r[n];this.whiteList[t]=t in E?E[t].concat(e[t]):p.from(e[t])}}};try{var L={},F="merge";p.includes(F,"override")&&(x.whiteList=L.whiteList),p.includes(F,"merge")&&x.setWhiteList(L.whiteList)}catch(e){}var k=function(e,n){for(var r={},t=0,o=p.keys(e);t<o.length;t++){var a=o[t];Array.isArray(e[a])?r[a]=p.from(e[a]):r[a]=k({},e[a])}for(var i=0,s=p.keys(n);i<s.length;i++)(a=s[i])in e?Array.isArray(e[a])?r[a]=e[a].concat(n[a]):r[a]=k(e[a],n[a]):Array.isArray(n[a])?r[a]=p.from(n[a]):r[a]=k({},n[a]);return r},C={blackList:{a:["folder"],meta:["content"],iframe:["srcdoc"],input:["pattern"],vmlframe:["xmlns"]},blackTags:["script","xml","embed","isindex","object","base","set","handler","animate","payload","import"],blackAttrs:["charset","ns","namespace","formaction","xlink:href","xmlns:xlink","handler","repeat","repeat-start","repeat-end"],blackAttrRegExps:[/^on/],filterList:{param:["value"],video:["poster"],form:["action"]},filterAttrs:["href","src","background","style","dynsrc","lowsrc","content"]};try{var j={};j.blackAttrRegExps&&(j.blackAttrRegExps=j.blackAttrRegExps.map(function(e){return new RegExp(e.toString().slice(1,e.toString().length-1))}));var N="merge";p.includes(N,"override")&&(C=j),p.includes(N,"merge")&&(C=k(C,j))}catch(e){}var W={mode:"black",whiteList:{},blackConfig:C,collect:null,initCollect:function(){W.collect={blackList:{},blackTags:[],blackAttrs:[],blackAttrRegExps:[],filterAttrs:[],filterList:{},filterProtocol:[]}},removeCollect:function(){var e=T(W.collect),n=e.count,r=e.ret;return W.collect=null,{collectKey:0===n?null:JSON.stringify(r),collectMode:"black"}},onIgnoreTag:function(e,n){var r;if(!p.includes(C.blackTags,e))return _(n,function(e,n,r,t,o){if(-1!==r.indexOf("/"))return f(t);if(o)return"</".concat(r,">");var a=P(t),i=b(a.html,function(e,n){var t,o=0;if(C.blackList[r]&&p.includes(C.blackList[r],e)&&(W.collect.blackList[r]=W.collect.blackList[r]||[],W.collect.blackList[r].push(e),o++),C.blackAttrRegExps.length&&C.blackAttrRegExps.some(function(n){return n.test(e)})&&p.forEach(C.blackAttrRegExps,function(n){n.test(e)&&(W.collect.blackAttrRegExps.push("".concat(n.toString(),"->").concat(e)),o++)}),C.blackAttrs.length&&p.includes(C.blackAttrs,e)&&(C.blackAttrs.push(e),o++),!o){if(C.filterList&&C.filterList[r]&&p.includes(C.filterList[r],e)){var a=w(n,function(e){var n;null===(n=W.collect)||void 0===n||n.filterProtocol.push(e)});return a!==n&&(W.collect.filterList[r]=W.collect.filterList[r]||[],W.collect.filterList[r].push(e)),n?"".concat(e,"='").concat(a,"'"):e}return C.filterAttrs&&p.includes(C.filterAttrs,e)?((a=w(n,function(e){var n;null===(n=W.collect)||void 0===n||n.filterProtocol.push(e)}))!==n&&(null===(t=W.collect)||void 0===t||t.filterAttrs.push(e)),n?"".concat(e,"='").concat(a,"'"):e):n?"".concat(e,"='").concat(n,"'"):e}});return t="<".concat(r),i&&(t+=" ".concat(i)),a.closing&&(t+=" /"),t+=">"},f);null===(r=W.collect)||void 0===r||r.blackTags.push(e)}},I=function(e){var n=e.reportOnly,r=void 0===n||n,t=e.block;return r&&"all"===r?"report":("string"==typeof r&&("true"===r&&(r=!0),"false"===r&&(r=!1)),t?"enforce":r?"report":"enforce")},B=function(e){return function(r,t,o){if(!r||"string"!=typeof r)return r;var a=t;e===G&&(a=x).initCollect();var i=e(r,a);if(X(i)===X(r))return r;if(!o)return i;var s=o.logType,d=I(o),R=a.removeCollect();return S.report(n(n({type:s,disposition:d},R),{sourceText:D(r),filterText:D(i)})),"enforce"===d?i:r}},U=B(function(e,n){return void 0===n&&(n={}),n&&n.whiteList||(n.whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","crossorigin","loop","muted","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],figcaption:[],figure:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],summary:[],sup:[],strong:[],strike:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src","height","width"]}),new m(n).process(e)}),z=B(G),K=function(e,n,r){var t=[],o=w(e,function(e){t.push(e)});if(o===e)return e;t=p.from(p.uniq(t));var a=n||r||{};if(!a)return o;var i=a.logType,s=I(r);return S.report({type:i,disposition:s,collectKey:t.join("___"),collectData:JSON.stringify(t),collectMode:"black",sourceText:D(e),filterText:D(o)}),"enforce"===s?o:e},Z=y._xssProject||{},q=y.xssNamespace||{},J="3.0.26",Y={FilterXSS:m,version:J,webpackPluginVersion:"<%= webpackPluginVersion =>",reportOnly:"<%= reportOnly =>",filterXSS:U,_filterXSS:z,filterUrl:K,Config:x,BlackConfig:W,project:Z,setProjectName:function(e){Z[e]=this,y._xssProjectName=e}};q.douyin_web=Y,y.xssNamespace=q,y.Math&&!y.Math.xssNamespace&&(y.Math.xssNamespace=q),Z[J]=Y,y.globalThis=y,y.getFilterXss=function(){return void 0!==this._xssProjectName?this._xssProject[this._xssProjectName]:Y},y.xss=Y,y.isSafeUrl=V,y.isSafeDomain=V,y.isSafeProtocol=O,y._xssProject=Z,y._xssProjectName&&(Z[y._xssProjectName]=Y);var Q=Y.setProjectName.bind(Y);e.BlackConfig=W,e.Config=x,e.FilterXSS=m,e._filterXSS=z,e.filterUrl=K,e.filterXSS=U,e.isSafeDomain=V,e.isSafeProtocol=O,e.isSafeUrl=V,e.project=Z,e.setProjectName=Q,e.setXssNamespace=function(e){var n=e.appId,r=e.bid,t=e.region;q[n]=Y;x.bid=r,x.region=t,x.enabled=!0},e.xssNamespace=q,Object.defineProperty(e,"__esModule",{value:!0})}),(self.webpackChunkdouyin_web=self.webpackChunkdouyin_web||[]).push([["27404"],{980485:function(e,n,r){"use strict";var t=r(101199),o=r(994298);let a=(0,o.A)(function(e){return t.createElement("svg",Object.assign({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,"aria-hidden":!0},e),t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8.5 2c.83 0 1.5.67 1.5 1.5v3A3.5 3.5 0 0 1 6.5 10h-3a1.5 1.5 0 1 1 0-3h3a.5.5 0 0 0 .5-.5v-3C7 2.67 7.67 2 8.5 2ZM16 2c.83 0 1.5.67 1.5 1.5v3c0 .28.22.5.5.5h3a1.5 1.5 0 0 1 0 3h-3a3.5 3.5 0 0 1-3.5-3.5v-3c0-.83.67-1.5 1.5-1.5ZM2 15.5c0-.83.67-1.5 1.5-1.5h3a3.5 3.5 0 0 1 3.5 3.5v3a1.5 1.5 0 0 1-3 0v-3a.5.5 0 0 0-.5-.5h-3A1.5 1.5 0 0 1 2 15.5Zm12 2a3.5 3.5 0 0 1 3.5-3.5h3a1.5 1.5 0 0 1 0 3h-3a.5.5 0 0 0-.5.5v3a1.5 1.5 0 0 1-3 0v-3Z",fill:"currentColor"}))},"minimize");n.Z=a},927797:function(e,n,r){"use strict";r.d(n,{Z:function(){return o}});let t=`
Radeon RX 7900 XT|2202
Radeon RX 7900 XT|1968
RX 6800 XT|1957
Radeon RX 6900 XT (XTXH)|1930
Radeon RX 6900XT|1925
Radeon PRO W6900X|1889
RX 6900 XT|1852
Radeon RX 6900|1814
Radeon RX 7900 XTX|1773
RX6800|1695
FreddyVGA|1603
Radeon PRO W6800|1564
Radeon RX 7900 XTX|1437
Radeon RX 6950 XT|1376
Radeon RX 6800 XT|1358
Radeon RX 6750 XT|1310
Radeon(TM) RX 6850M XT|1294
Radeon RX 6700|1285
Radeon RX 6900 XT|1269
Sapphire Nitro+ RX 6800|1262
Radeon PRO W6800X|1255
Radeon PRO W6800X Duo|1218
Radeon RX 6700|1214
Radeon RX 6800 XT|1183
Sapphire Nitro Radeon RX6650XT|1180
Radeon(TM) RX 6750 XT|1166
Radeon RX 6800|1163
Radeon RX 6900 XT|1162
ASRock RX 6650 XT Phantom Gaming|1161
Radeon Navi23|1139
Radeon RX 6650 XT|1132
Radeon RX 6950 XT|1130
Radeon 6800|1121
Radeon RX 6700 XT|1110
Radeon Pro W6600X|1101
Radeon RX 6700M|1081
Radeon RX 6800M|1078
Radeon RX 5700 XT PJM|1060
Radeon RX 6800|1054
Radeon RX 6600 XT|1037
Radeon RX 6600 XT|1031
ASUS RX 6600XT macOS Edition|1021
Radeon RX 6800M|1016
Radeon Pro Vega II Duo|1015
Radeon RX 5700 Series|961
Radeon RX 6800/6800 XT / 6900 XT|961
Radeon RX 6600 XT|958
Radeon Pro Vega II|956
Radeon RX 6650 XT|951
Navi 10 5700 XT|947
Radeon Pro Vega II|947
Radeon RX 5700 Series|946
Radeon Pro W5700X|934
Radeon RX 6600|929
ASUS Radeon RX 5700 XT|926
Radeon Pro W5700X|917
Radeon Pro 5700 XT|917
Radeon RX 6900 XT|915
Radeon RX 5700 XT|911
Radeon Pro W5700|895
Radeon RX 6600/6600 XT/6600M|889
Radeon RX 6750 XT|883
Radeon RX 6600|874
Radeon RX 5700|855
Radeon RX 5700 XT 50th Anniversary|854
Radeon VII|851
Radeon RX 5700 XT 50th Anniversary|845
Radeon PRO W6800|837
Radeon Pro Vega 64|824
Radeon Navi10|822
Radeon RX 5600 XT|816
Radeon RX 6600M|803
Radeon RX 6800S|791
Radeon Pro 5700 XT|781
Radeon RX Vega 64 8GB|775
Radeon Pro 5700|768
Radeon Vega Frontier Edition|767
Radeon RX Vega|766
Radeon RX Vega 56/64|765
Radeon(TM) RX Vega|756
Radeon Pro Vega 64X|745
Radeon RX 5600 XT|744
Radeon PRO W6600|744
Radeon Vega 64 LC|735
Radeon RX Vega 64.1|732
Radeon RX 6600M|728
Radeon Pro 5700|714
Radeon Vega Frontier Edition|707
Radeon Vega Frontier|704
Radeon Vega FE|701
Radeon RX 5700 XT|691
Radeon Pro Vega 64|673
Radeon Vega 64|667
Radeon VII|663
Radeon Pro WX9100|656
Sapphire Radeon RX Vega 64 8GB|654
Radeon(TM) PRO W6600M|654
Radeon RX 5700 XT 50th Anniversary|652
Radeon RX 5700|640
Radeon Pro W5700|640
Radeon(TM) Pro WX 9100|635
Radeon RX Vega 56|628
Radeon RX Vega 56|623
Radeon Pro 5500 XT|622
Radeon RX 5600 OEM/5600 XT / 5700/5700 XT|621
Radeon RX 5500|618
Radeon RX 5500 XT|617
Radeon Vega Frontier Edition|617
Radeon RX 5500M Series|613
RX xxx|613
Radeon Pro Vega 64X|611
Radeon RX Vega 64|610
Radeon RX 5600 XT|610
Radeon Pro Vega 64|605
Radeon RX 6500 XT|603
Radeon Vega|602
Radeon Pro W5500|601
Radeon RX 5600M|600
Radeon Pro Vega 56|598
Radeon Pro Vega 64|594
Radeon Pro 5600M|593
Radeon Pro Vega 48|592
Radeon Pro Vega II Duo|590
Radeon RX 590 Series|589
Radeon RX Vega 56 8GB|589
Radeon Pro 5600M|589
Radeon Pro WX 9100|588
Radeon Pro 5300|584
Radeon(TM) R9 Fury Series|579
Radeon RX 6800 XT 16GB|567
Radeon Pro 5600M|567
Radeon Pro W5500X|564
Radeon(TM) RX 5500M|559
Radeon HD 7870|556
Radeon Pro W5500|554
Radeon RX 5500M|550
Radeon R9 290X Series|549
66AF:F0|548
Radeon Pro 5500 XT|547
Radeon RX 580 Series|547
Radeon RX 5500XT|547
Radeon(TM) RX 580X|546
Radeon Pro 5500 XT|545
Radeon(TM) Pro W5500M|544
Radeon Pro W5500X|544
Radeon Pro W5500|541
RadeonT RX 5300|537
Radeon(TM) RX 570 Graphics|524
Radeon Pro 5300|522
Radeon(TM) RX 6500M|521
Radeon RX Vega M GL|520
ASUS Radeon RX 570 Series|519
ASUS Radeon RX 580 Series|518
Radeon(TM) RX 580|518
Radeon(TM) Pro V7350x2|518
Radeon(TM) RX 480 Graphics|516
Radeon(TM) RX 570 Graphics|515
Radeon RX 6400|513
Radeon Pro 580X|513
Radeon(TM) R9 390 Series|503
Radeon Pro 5300|500
Radeon RX 580 2048SP|500
Radeon PRO W6400|500
Radeon RX 570 Series|499
Radeon PRO W6800X Duo|497
Radeon Pro 580|494
Radeon RX 5500 XT|493
Radeon RX 6400|487
Radeon Pro 580|485
Radeon(TM) Pro WX 7100 Graphics|485
Radeon(TM) R9 290X|478
Sapphire Radeon RX 580 Pulse|477
Radeon RX 6700/6700 XT / 6800M|476
Radeon(TM) RX 580|475
Radeon RX 6700S|475
Radeon R9 290X|470
Radeon(TM) RX 470 Graphics|469
Radeon R9 FURY / NANO Series|468
Radeon Embedded E9560|467
Kamen Rider Black RX|466
Radeon(TM) E9550|464
Radeon(TM) RX 580 Graphics|463
Radeon RX Vega 56/64|463
Radeon(TM) RX 480|462
Radeon RX 6800 XT|462
Radeon RX 470 Series|461
Radeon RX480|456
66AF:F1|455
Radeon Pro 480/575|455
Radeon Embedded E9560|450
Radeon FURY|450
Radeon RX 5600 OEM/5600 XT / 5700/5700 XT|447
Radeon RX 6600 XT|446
Radeon HD 6800 Series|445
Radeon Pro 570X|444
Radeon(TM) RX 470 Graphics|443
Radeon Pro 575X|443
Radeon RX 470/480/570/570X/580/580X/590|443
Radeon RX 6600|443
Radeon RX Vega M GH Graphics|441
RX 580|440
Radeon RX 570|440
Radeon Pro 570|440
Radeon RX 590|437
Radeon(TM) RX 470 Series|435
Radeon RX 6900 XT|435
Radeon FURY X|434
RX 590|431
Radeon Pro 5500M|430
???|430
Radeon(TM) RX 570|430
Radeon RX 580|429
Radeon HD 8xxx|426
Radeon R9 290|425
Radeon Pro 5500M|420
Radeon Pro 580X|420
Radeon RX 6700 XT|420
Radeon RX 480|419
Radeon R9 290/390|418
Radeon Pro 580X|416
Radeon(TM) Pro Duo|414
Ellesmere Radeon RX 570|411
Radeon R9-290X|411
Radeon Pro 580|411
Radeon R9 200 Series|406
Radeon RX 570|406
Radeon Pro 470/570|404
Radeon RX 6800M|404
Radeon RX 5300M|400
Radeon RX 580 Series (POLARIS10, DRM 3.40.0, 5.11.9-141-tkg-pds, LLVM 11.1.0)|399
Radeon Pro 5300M|399
Radeon R9 285|398
Radeon RX 470|393
Radeon Pro 575|392
Radeon Pro 575X|391
Radeon Pro WX 7100|387
Radeon RX 6700M|386
Radeon RX 470/480/570/570X/580/580X/590|382
Radeon PRO W6600|376
Radeon Polaris|374
Radeon RX 6500 XT|374
Radeon Pro Vega 20|371
Radeon HD 7970|370
Radeon Pro Vega 16|370
Radeon RX 6800|369
Radeon Pro Vega 64 OpenGL Engine|369
Radeon(TM) R9 380 Series|367
Radeon RX 5700XT|366
FirePro W8100|366
Radeon Pro Vega 64|365
Radeon Pro 570|365
Radeon Pro 570X|363
Radeon Pro Vega 64 OpenGL Engine|362
Radeon R9 280x|362
Radeon R9 380|362
Radeon R9 280x|361
Radeon R9 280x|360
Radeon Pro Vega 56|360
R9 280X Dual-X|359
Radeon Pro Vega 56 OpenGL Engine|356
Radeon HD 7970|355
Radeon HD 7970X/8970/R9 280X|354
Radeon R9 285|353
Radeon R9 380X|352
Radeon RX 480|352
Radeon RX 5700 XT Series|350
ASUS Radeon RX 470 Series|350
Radeon Pro Vega 64|349
Radeon R9 200 / HD 7900 Series|346
ASUS Radeon RX 470 Series|346
Radeon Vega 56|346
Radeon RX 580 Series (AMD POLARIS10 / DRM 3.15.0 / 4.12.0-1-amd64, LLVM 4.0.1)|343
Radeon Pro Vega 20|343
R9 380|341
Radeon HD 7970|338
Radeon RX 5700 XT|336
Radeon D700|336
Asus Radeon R9 280|334
Radeon R9 285|334
Radeon R9 M395X|332
Radeon RX 5600 XT|332
PowerColor Radeon R9 280|330
Radeon R9 280|329
FirePro W7100 Graphics Adapter|328
Radeon R9 M295X Mac Edition|327
ASUS Radeon RX 5700|327
Radeon R9 380|326
Radeon Pro Vega 16|325
Radeon R9 290X|325
Radeon RX5600|324
ASUS Radeon RX 5500 XT|323
Radeon R9 280|323
Radeon HD 7950/8950 / R9 280|321
Radeon R9 M395|319
Radeon RX 6800/6800 XT / 6900 XT|318
FirePro D700 (FireGL V)|318
Radeon RX 5500/5500M / Pro 5500M|318
MSI Radeon RX 6600 XT Gaming X|318
FirePro W8000|315
Radeon HD 7950|315
Radeon Pro W5700|315
FirePro W7170M|314
Radeon PRO W6800|314
Radeon RX 5500|313
Radeon RX 580 Special Edition|312
RadeonT RX 5500M|311
Radeon R9 M395 (Bootcamp XG edition by bootcampdrivers.com)|311
Radeon R9 360|309
Radeon Pro WX 7100|307
Radeon Pro WX 7100 Mobile|307
Radeon RX 5700 XT 50th Anniversary|307
R9 xxx|303
Radeon RX 5700XT|302
Radeon PRO W6400|301
Radeon(TM) R9 370 Series|301
Radeon RX 470/480/570/570X/580/580X/590|300
Radeon(TM) PRO W6600M|298
Radeon HD 8950|298
Radeon R9 M395X|297
Radeon R9 M395X|296
RX Vega 64|296
Radeon RX Vega 11 Graphics|295
Radeon Pro 270X|294
Radeon RX 580 2048SP|290
Radeon HD 7950|290
Video Controller (VGA Compatible)|290
Radeon(TM) R7 370 Series Graphics|290
Radeon HD 7950|290
Asus Radeon R9 270X|289
Radeon RX 580X Series|288
Radeon(TM) RX 5500M|285
Radeon R9 270X|285
RX xxx|285
ASUS R7 265 Series|281
Radeon(TM) R9 270|280
731F:C1|280
Radeon R9 M395X|279
Radeon(TM) R7 370 Series|279
Radeon Pro V520 MxGPU|278
Radeon R9 M395|277
FirePro D700|277
Radeon R9 270X|277
Radeon(TM) R9 200 Series|276
Radeon RX 5700|275
Radeong 0.4 on AMD POLARIS10 (DRM 3.8.0 / 4.9.11-1-ARCH, LLVM 3.9.1)|274
Radeon HD 7870 XT|274
Radeon R9 390X|272
Radeon(TM) RX 570 Graphics|272
Radeon HD 7870 GHz Edition|271
Radeon R9 390|270
FirePro D700|269
Radeon R9 M395|268
Radeon R9 270|268
Radeon RX 5700 / 5700 XT|267
ASUS R7 370 Series|267
FirePro W7000|266
Radeon(TM) Pro V7350x2|266
Radeon(TM) RX 470 Series|266
Radeon RX Vega 64 OpenGL Engine|266
Radeon RX 5500M|265
Radeon HD 7950/8950 OEM / R9 280|265
Radeon Vega Frontier Edition OpenGL Engine|265
Radeon 7950 x2|263
Radeon R9 270|263
Radeon VII|263
Radeon HD 7xxx|262
Video Controller (VGA Compatible)|262
Radeon(TM) RX 570|261
Radeon RX 5500 XT|261
Radeon R9 M295X|261
FirePro W7000 (FireGL V) Graphics Adapter|260
Radeon R9 M390|260
Radeon HD 7870 GHz Edition|260
Radeon R9 M390 (Bootcamp edition by bootcampdrivers.com)|260
Radeon R9 370|259
Metal|259
Radeon HD 7870|259
Radeon RX 470/570|258
Radeon(TM) R9 370|257
Radeon(TM) RX 460|257
Radeon RX 560 Series|256
Radeon R9 290|255
Radeon(TM) RX 560 Series|255
Radeon RX 5300M|254
FirePro W7000|254
Radeon R9 290X|253
67EF:E7|253
Radeon HD 7850|253
Radeon(TM) RX 460 Graphics|253
MSI Radeon RX 580|251
Radeon R9 290/390|250
FirePro W8100 (FireGL V)|249
Radeon Pro WX 9100 OpenGL Engine|248
Radeon(TM) RX 560|247
Radeon(TM) RX 560 Series|247
Radeon Pro Vega II Duo|247
Radeon HD 7970M|246
Radeon R9 290|245
Radeon RX 5600M|245
FirePro D300|245
Radeon(TM) RX 5600M Series|244
Radeon RX 590 Series|244
Radeon R7 370 Series|244
Radeon(TM) RX 560|243
FirePro D300|243
Radeon R9 390|243
Radeon RX 470/480/570/570X/580/580X|243
FirePro D300|243
Radeon(TM) R7 370 Series|242
Radeon R9 M390|241
Radeon RX 560X Series|241
FirePro D300|241
Radeon RX 560|240
Radeon R9 M290X|240
Gigabyte Vega 64 macOS Edition|239
Radeon Pro 580|238
Radeon Pro WX 4100|236
Radeon Pro WX 7100 OpenGL Engine|236
Radeon HD - FirePro D300|235
FirePro D500|234
Radeon Pro 580 OpenGL Engine|234
Radeon(TM) E9260|234
Radeon Pro WX 2100|233
FirePro D500|232
FirePro D500|232
Radeon(TM) RX 6500 XT|232
Radeon Pro 580X|231
Radeon HD 7850|231
Radeon Pro 575|231
Radeon Pro Vega 64X|231
ASUS R9 270 Series|230
Radeon Pro 450|230
Radeon(TM) RX 560 Graphics|230
Radeon R9 M290|229
Radeon Pro 560X|228
Radeon Pro 480/575|228
Pitcairn PRO Radeon HD 7850|228
ASUS Radeon RX 5700 XT|227
Radeon HD 7870|227
Radeon(TM) Pro WX 5100 Graphics|226
Radeon R9 370X|225
Radeon(TM) RX 480|224
Radeon HD7970M|224
FirePro S9000 (FireGL V)|223
Radeon RX 550 640SP / RX 560/560X|222
MSI / AMD RX 560 4G|222
Radeon RX 570 OpenGL Engine|222
MSI RX650|222
RX 480|221
MSI / AMD RX 560|221
Baffin AMD Radeon RX 560|221
MSI Baffin RX650|220
Radeon Pro 5700 XT|220
Radeon Pro 570|220
Radeon Pro 575 OpenGL Engine|219
Asus Radeon R9 270X|219
Radeon RX RX 560|218
Radeon RX 560 [Baffin]|218
RX 460|218
Radeon R9 370X|218
Radeon(TM) Pro WX 4100|217
ASUS R9 390 Series|217
Radeon Pro 5600M|217
R9 xxx|217
Radeon HD 7870 Series|217
Radeon Pro RX 560|216
R9 280X Dual-X|215
Radeon Pro 570 OpenGL Engine|214
RX 560|213
Radeon Pro WX 5100|213
FirePro D700|213
Radeon(TM) R9 390 Series|213
Radeon RX 480|212
Radeon RX 560|212
Radeon RX 5500/5500M / Pro 5500M|212
Radeon RX 550 640SP / RX 560/560X|211
Radeon R9 FURY / NANO Series|211
Sapphire Radeon RX 560|211
Radeon RX 460|210
Radeon RX550/550 Series|210
inc. Radeon RX 480|209
Radeon(TM) RX 550|208
Radeon R9 M290X|206
Radeon Pro 560 (Bootcamp XG edition by bootcampdrivers.com)|206
Radeon RX460|206
Radeon RX 550 Series|205
Custom GPU 0405|204
Radeon(TM) RX 460|204
ASUS AMD Radeon R9-990X|204
Radeon Pro 555X|203
Radeon RX 460/560|203
Radeon HD 7970X/8970/R9 280X|202
ASUS Radeon RX 550 Series|201
Radeon HD 8950|201
FirePro D500 (FireGL V)|201
RX 5700XT|200
Radeon 550 Series|200
Radeon HD 8470 + 7660D Dual Graphics|200
Radeon HD 7990|200
Radeon RX 560X|199
Radeon RX Vega|199
Radeon HD 7950 Series|198
Radeon(TM) RX 540|197
Radeon HD 6970|197
Radeon HD 7970/8970 / R9 280X|197
Radeon Navi14|197
Radeon Pro 560|197
Radeon RX 550|197
Radeon R9 285|196
Radeon Pro W5500|195
Radeon Pro Vega 56|195
Radeon Pro 460|195
Radeon RX 470/480|194
Radeon PRO Graphics|194
Radeon(TM) RX550|194
Radeon Pro 560X|193
Radeon Pro 570X|192
66AF:F1|192
Radeon RX Vega M GH|190
Radeon R9 M280X|190
Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X|189
Radeon R9 280,|188
Custom GPU 0405|188
Radeon HD 7790|187
Radeon(TM) RX 480 Graphics|187
Radeon Pro 455|186
Radeon R9 260|186
Radeon RX 580 Series|186
Radeon HD 7950/8950 OEM / R9 280|186
Radeon R9 290X|185
Radeon R9 M290X|184
Radeon(TM) R9 370 Series|184
Radeon Pro 555|184
Radeon R7 260X|184
Radeon HD 6950|183
FirePro W5000|183
Radeon(TM) R9 390X|182
R9 270X Devil|182
Radeon(TM) RX 470 Graphics (AMD POLARIS10 / DRM 3.23.0 / 4.15.0-1-MANJARO, LLVM 5.0.0)|182
Radeon R9 380|182
Radeon(TM) Pro WX 9100|182
Radeon(TM) R7 360 Series|181
Radeon RX 570 Series|181
Radeon(TM) R9 M470X|181
Radeon(TM) R7 360 Series|181
Radeon RX480|180
Radeon R7 200 Series|180
Radeon Pro WX 4150|180
Radeon Pro WX 4100|179
Radeon HD 8xxx|179
ASUS R9 295X2 Series|179
Radeon R9 390X|178
Radeon HD 5870|176
Radeon Pro 560|176
Radeon RX 580 OpenGL Engine|175
Radeon HD 8950|175
FirePro V(FireGL V) Graphics Adapter|175
ASUS Radeon RX 580 Series|174
Radeon Pro WX 4100|174
Radeon Pro 460|173
Radeon HD 2600 XT|173
Radeon Pro WX 4100|172
Radeon HD 8280|172
Radeon Pro 575|171
Radeon Pro 555X|171
Radeon Pro WX 4130/4150|170
Radeon RX Vega M GH Graphics|170
FirePro W5100|170
Radeon(TM) PRO WX 8200|169
Radeon Vega Frontier Edition|169
Radeon Pro 555X|168
FirePro D700|168
Radeon HD 6990|167
Radeon RX 470 OpenGL Engine|167
Radeon HD 7870 XT|167
Radeon RX 580|167
Radeon Polaris|167
FirePro V8800 (FireGL V)|166
Radeon RX 550|165
Radeon HD 6900 Series|165
FirePro W9100 (FireGL V)|164
RX 580|163
Radeon(TM) RX 580X|163
Radeon RX 550|163
Radeon HD 6870|163
Radeon R9 M395X OpenGL Engine|163
Radeon(TM) R9 360|163
Radeon(TM) HD 8490|162
Radeon R9 M295X|162
Radeon HD 7970M|162
Radeon R9 M380|161
FirePro W5100 (FireGL V) Graphics Adapter|161
ASUS HD7850 Series|161
FirePro M6100 FireGL V|161
Radeon Pro 455|160
Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X|160
Radeon R9 M395X|159
Radeon RX 560X|159
Radeon Pro 555|158
RadeonT RX 560X|158
Radeon Pro Vega 48|158
ASUS Radeon RX Vega|158
Radeon Pro WX 9100|158
Radeon Pro Vega 64|157
Powered By QiongB A9999999999|157
Radeon(TM) Pro Duo|157
FirePro D700|157
Radeon Pro WX 7100|156
Radeon RX 460|156
Radeon HD - FirePro D700 OpenGL Engine|156
Radeon R9 M290X|156
Radeon R9 M395 OpenGL Engine|155
Radeon Pro SSG|155
FirePro D300|155
ASUS R9 380 Series|155
Radeon(TM) R9 Series|153
Radeon RX 470/480/570/580|153
FirePro W8000|153
Cezanne|153
Radeon(TM) Graphics|153
FirePro D300|153
Radeon(TM) R9 Fury Series|153
Radeon R9 M395|152
Radeon RX 570|152
Radeon R9 270X Series|152
Radeon Pro 5300M|152
R9 xxx|152
Radeon Pro 555|152
FirePro D500|151
Radeon HD 5850|151
FirePro D300|150
Radeon(TM) R9 290X|150
66AF:F0|149
Radeon(TM) RX 560|149
Radeon R9 M290|148
Radeon Instinct MI25 MxGPU|148
FirePro V7800 (FireGL) Graphics Adapter|148
Radeon(TM) R9 M470|147
Advanced Micro Devices, Inc. [AMD/ATI] Fiji [Radeon R9 FURY / NANO Series]|147
Radeon HD 5870 Series|147
Radeon(TM) E9550|147
Radeon HD 7850|147
Radeon HD 7770|147
Radeon Pro Vega 20|146
Radeon R9 290/390|146
Radeon Pro 450|146
Radeon RX 560X Series|146
Radeon HD 6850|146
Radeon R9 270 1024SP|145
ASUS R9 280X Series|145
Radeon Pro 450|145
Radeon(TM) R9 390 Series|145
FirePro V7900 (FireGL V)|145
Radeon R9 370X|145
Radeon(TM) RX 560 Series|144
ASUS R7 250X|144
Radeon RX 480 OpenGL Engine|144
Radeon R9 290X|144
Radeon RX 550X|144
Radeon(TM) RX 580|144
ASUS Radeon(TM) RX 470 Series|143
Baffin Radeon RX 560|143
Radeon R9 M295X (Bootcamp edition by bootcampdrivers.com)|143
Radeon R9 M295X Mac Edition|143
Radeon R7 Series / HD 9000 Series|142
Advanced Micro Devices [AMD] nee ATI Device|142
Radeon(TM) Pro WX 7100 Graphics|142
Radeon RX 640|142
FirePro D500|141
Radeon HD 7900 Series|141
Radeon R9 290|141
Radeon R7 250X|141
Radeon(TM) RX Vega|140
Radeon 630 Series|140
FirePro W8100 Graphic Adapter|140
Radeon R9 FURY / NANO Series|140
Radeon R9 M390|140
Radeon Pro WX 3100|140
Radeon R9 290|140
Radeon(TM) R9 370|140
FirePro V7900|139
Radeon HD 7970|139
Radeon HD - FirePro D500 OpenGL Engine|139
Radeon HD - FirePro D300 OpenGL Engine|139
Radeon Pro 580|139
Radeon HD 7770|139
Radeon HD - FirePro D500 OpenGL Engine|139
Radeon 540/540X/550/550X / RX 540X/550/550X|138
FirePro S9050|138
Radeon(TM) RX 480 Graphics|138
Radeon(TM) R9 M390X|137
Radeon Vega 64|137
Radeon(TM) Graphics|137
Tonga PRO GL [FirePro W7100]|136
HD7950 Martin Ver.|136
Radeon HD 7990|135
Radeon R9 280x|135
Radeon RX550/550 Series|135
HD7950 MARTIN REV.|134
Radeon RX560|134
Radeon R7 250X Series|134
Radeon R9 M390 OpenGL Engine|134
ASUS R7 250X|134
Radeon HD6870|134
Radeon R9 270X|134
Radeon Pro 5500 XT|134
Radeon(TM) RX 480|133
Radeon R9 270|133
ASUS HD7970 Series|133
Radeon RX 540|133
Radeon 500 Series|132
Radeon HD 5970|132
Radeon HD 7770 GHz Edition|132
Radeon HD 5870|132
Radeon 540X Series|132
Radeon HD 6870 Series|132
Radeon(TM) RX 470 Graphics|132
Radeon HD - FirePro D300 OpenGL Engine|132
Radeon HD 7xxx|131
Radeon HD 5970|131
RadeonT 540X|131
Radeon R7 Graphics + R7 350 Dual Graphics|131
Radeon R9 M295X Mac Edition / R9 380X|131
Firepro M5100|131
Radeon(TM) R9 M375X|131
Radeon R9 280x|130
Radeon(TM) RX 560X|130
Radeon HD 6990|130
Radeon Pro 5500M|130
Radeon Pro WX 5100 OpenGL Engine|129
Radeon R9 M395X (Bootcamp edition by bootcampdrivers.com)|129
Radeon R9 M380|128
FirePro W5170M|128
Radeon R9 280|128
FirePro W5000 (FireGL V)|128
Radeon(TM) RX 5600M Series|128
Radeon RX 560D|128
FirePro D500 (FireGL V)|128
Radeon(TM) Pro WX 5100 Graphics|128
Radeon(TM) RX Vega 11 Graphics|128
Radeon HD 7970|127
Radeon R9 370|127
Radeon HD 7770|127
Radeon R9 M395X|126
Radeon HD 7660D|126
Radeon HD 8970|126
Radeon R9 200 Series|126
Radeon Pro WX 3200 Series|126
Radeon HD 7800 Series|125
Radeon R9 285/380|125
Radeon R9 270X|124
FirePro W2100|124
FirePro W7170M|124
Radeon HD 7870 GHz Edition|123
Radeong 0.4 on AMD TONGA (DRM 3.1.0, LLVM 3.9.0)|123
Radeon RX 460|123
Radeon HD 5970 Series|123
Radeon R9 M380|122
Radeon R9 M395|122
Asus Radeon R9 280|122
Radeon HD 6850 Series|122
Radeon(TM) RX 540|122
Radeon HD 6900 Series|122
Device|122
67DF:C4|121
Radeon HD 6950|121
FirePro D300 (FireGL V)|121
Radeon RX 570|121
Radeon HD 5850 Series|121
Radeon HD 7870 XT|121
Radeon HD 7950|121
FirePro V7800 (FireGL) Graphics Adapter|121
Radeon HD 6850|121
Radeon HD 7950|120
Radeon HD 7870 GHz Edition|120
Radeon R7 370 / R9 270X/370X|120
Radeon HD 6870|120
Radeon Pro V340|120
ASUS Radeon RX 570 Series|119
Radeon(TM) R7 370 Series Graphics|119
Radeon(TM) RX 580 Graphics|119
Radeon(TM) RX 470 Graphics|119
Radeon HD 5870|119
Radeon HD 7950/8950 / R9 280|119
Radeon HD 6790|119
Radeon(TM) RX580|119
ASUS ARES2|119
Radeon(TM) R9 380 Series|118
Radeon HD 7750|118
Radeon Pro 560X|118
Radeon R7 250E|118
Radeon 550 Series|118
Radeon RX 560|118
Radeon Pro WX 5100|117
Radeon R7 370 / R9 270X/370|117
Radeon HD 7800 Series|117
FirePro W5000 (FireGL V) Graphics Adapter|117
Radeon HD 7750 Series|116
Radeon HD 5870|116
Radeon R7 450|115
FirePro R5000|115
Radeon R7 370 Series|115
FirePro W9100|114
Radeon R7 370 / R9 270/370|114
Radeon(TM) 540 Graphics|114
Radeon HD 6510 Series|114
Radeon(TM) R7 370 Series|113
Sapphire Radeon HD6870|113
Firepro M5100|113
Radeon(TM) RX 550|113
Radeon(TM) Pro Duo|113
Radeon 540/540X/550/550X / RX 540X/550/550X|113
Radeon Pro 570|112
Radeon R9 280|112
FirePro D700 (FireGL V)|112
(ATI) FirePro M6000 (FireGL V) Mobility Pro Graphics|112
Renoir|112
Radeon 540X Series (POLARIS12, DRM 3.40.0, 5.10.56-1-MANJARO, LLVM 12.0.1)|112
Radeon HD 6970|112
Radeon HD 8770|112
Radeon Pro WX3200 Graphics|112
Radeon(TM) R9 270|111
Radeon R9 270X|111
Radeon R9 285|111
Radeon HD 7800M Series|111
Radeon(TM) R7 370 Series|111
Radeon HD 7870M Series|111
Radeon Pro 450/550|110
Radeon HD 7000 series|110
Radeon HD 7870|110
Radeon Pro 555X|110
Radeon RX590 GME|109
FirePro S10000|109
Radeon HD 7870M|109
Radeon HD 5800 Series|109
Radeon HD 6970M|108
ASUS HD7770 Series|108
Radeon(TM) R9 M360|108
Radeon(TM) RX 550X|107
Radeon R9 285|107
Radeon HD 6900M Series|107
Radeon HD 7870 GHz Edition|107
FirePro S7000|107
Radeon R9 M370X|106
Radeon Pro WX 4100|106
Radeon HD 6800 Series|106
Radeon HD 7750|106
Radeon Pro 455 OpenGL Engine|106
ASUS R7 370 Series|106
Radeon Pro 560|105
Radeon HD 6870|105
FirePro D300 (FireGL V)|105
Radeon HD 6970M|105
Radeon HD 7850|105
Radeon(TM) R9 200 Series|104
ASUS HD7750 Series|104
Radeon HD 6970M OpenGL Engine|104
Asus Radeon R7 250|104
Radeon R7 370 / R9 270X/370|104
Radeon R9 M395X (Bootcamp XG edition by bootcampdrivers.com)|103
Radeon(TM) RX 560|103
Radeon RX Vega|103
Radeon(TM) Pro W5500M|103
Radeon R9 270|103
Radeon Pro 560X|103
Radeon HD 5850|103
FirePro S7150|103
Radeon(TM) RX 580|103
Radeon(TM) R9 370 Series|103
ASUS Radeon(TM) RX 480 Series|102
Radeon Graphics Processor|102
Radeon R9 M370X|102
FirePro W7100|102
Radeon R9 M370X|101
Radeon Pro 460 OpenGL Engine|101
Radeon RX 580 Series|101
Radeon 500 Series|100
Radeon Pro 555|100
Radeon(TM) Pro WX 4100|100
Asus Radeon R7 260X|100
Radeon(TM) RX Vega 10 Graphics|100
Radeon HD 7790|99
Radeon Pro 450 OpenGL Engine|99
Radeon HD 7790/8770 / R7 360 / R9 260/360|99
FirePro M4000 Mobility Pro Graphics|99
Radeon HD 7970M|99
Radeon R9 M270X|99
Radeon RX 550|98
Radeon HD 6850|98
Radeon(TM) RX 460|98
Radeon(TM) RX Vega11 Graphics|98
Radeon(TM) RX 460 Graphics|98
Radeon Pro 460|97
Radeon HD 7800 Series|97
Matrox C680 PCIe x16|97
Radeon(TM) RX 550|97
Radeon HD 5770|96
Radeon HD 8670D + 7700 Dual Graphics|96
Radeon HD 7790|96
Radeon 630 Series|96
Radeon RX 560 Series|96
Firepro M6100|95
Radeon HD 6700 Series|95
67EF:E7|95
Radeon(TM) Vega 10 Graphics|95
Radeon HD 6900M Series|94
Radeon Pro 455|94
FirePro M4000|94
Radeon R9 260|94
FirePro W7000|94
Radeon Instinct MI25|93
Radeon HD 8870M|93
Radeon(TM) Vega 11 Graphics|93
Radeon Pro 450|93
FirePro W5000|92
Radeon HD 6770|92
Radeon(TM) RX560|92
Radeon(TM) Graphics|91
ASUS Radeon(TM) RX 460 Series|91
Radeon(TM) Vega 8 Graphics|91
Radeon(TM) Graphics|91
FirePro W5100 Graphics Adapter|90
Radeon(TM) Pro WX Series|90
Renoir|90
STRATO XT (6646)|89
Radeon(TM) Pro WX 4150 Graphics|89
Radeon E8870MXM|89
Radeon HD 8970M|89
FirePro M6100 FireGL V|89
Radeon HD 7770|89
FirePro W5100 (FireGL V) Graphics Adapter|89
Radeon HD 6970M|89
Radeon Pro 460|88
Radeon RX Vega 8 Graphics|88
Radeon HD 7700 Series|88
Radeon(TM) R9 M360|88
ASUS R7 265 Series|88
Radeon RX Vega M GL Graphics|88
ASUS Radeon RX 550 Series|88
Radeon R7 360 / R9 360|88
Radeon HD 6950|86
Radeon HD 6790|86
Radeon Pro WX 2100|86
ASUS Radeon RX 560 Series|86
Radeon HD 5750|86
Radeon(TM) RX 640|86
Radeon HD 8870M|85
Radeon R7 260X|85
Radeon Pro WX 7100|85
Radeon(TM) R7 360 Series|85
Radeon Infoshock\u2122 RX 460 Graphics|85
FirePro W5170M|85
Radeon R9 M295X|85
FirePro W8100|85
Radeon HD 6750|85
FirePro W5170M|85
FirePro V5800 (FireGL) Graphics Adapter|84
ASUS R7 250X|84
67E8:00|84
Radeon(TM) RX 550X|84
Radeon(TM) R7 350|84
Radeon(TM) E9260|84
Radeon Sky 500|84
Radeon R9 M270X|83
Radeon(TM) R9 350|83
Radeon(TM) RX Vega 11 Graphics|83
Firepro M6100|83
Radeon R9 360|82
FirePro V7900|82
FirePro V5800 (FireGL V)|82
Radeon HD 8830M|82
Radeon Pro 450|82
Radeon HD 8950|82
6980:00|82
FirePro W5100 (FireGL V)|81
Radeon E8870|81
Radeon HD 7750 Series|81
Radeon HD 7850 / R7 265 / R9 270 1024SP|81
FirePro\u2122 W4190M|80
Radeon HD 5770|80
Radeon(TM) R7 360 Series|80
FirePro M5100 FireGL V|80
Radeon RX 470/480/580|80
Radeon(TM) RX 460 Graphics|79
Radeon HD 6700 Series|79
Mobility Radeon HD 5870|79
Radeon R9 255|79
Radeon 535 Series|79
Radeon R9 M380 OpenGL Engine|78
Radeon(TM) RX 550|78
Radeon R9 M380|78
Radeon R7 250X|78
Saphire Radeon RX 580|78
Radeong 0.4 on AMD BONAIRE (DRM 2.43.0, LLVM 3.8.0)|78
Radeon HD 5000|78
Radeon HD 5770|77
Radeon RX 460|77
FirePro W4300|77
Radeon 530 Series|77
Radeon(TM) 540X|77
Radeon R9 M370X OpenGL Engine|77
FirePro V5900 (FireGL V)|77
Radeon Pro WX 4100|77
SAPPHIRE HD 5770|77
Radeon Pro WX 3100|76
FirePro W5100|76
Radeon(TM) Pro Graphics|76
Radeon Pro WX 3100|76
67FF:C8|76
Radeon(TM) HD8970M|76
Firepro M5100|76
Radeon(TM) R9 M375X|75
Radeon 550X Series|75
Radeon R9 M390|75
Radeon(TM) Vega 9 Graphics|75
FirePro V5900 (FireGL V) Graphics Adapter|74
Radeon HD 8570|74
Radeon(TM) RX 475M|74
Radeon HD 6770|74
Radeon RX 550 Series|74
Radeon RX 550|74
FirePro M4000|74
Radeon RX 460/560D / Pro 450/455/460/560|74
Radeon Pro 560|74
Radeon Vega Series / Radeon Vega Mobile Series|74
Radeon Pro 455|74
Radeon HD 7870M Series|74
Radeon(TM) R7 430|74
Radeon 620 Series|73
Radeon HD 7770 GHz Edition|73
Radeon HD 7770|73
Radeon(TM) R9 360 Series|73
Radeon HD 7770/8760 / R7 250X|73
Radeon(TM) 530|73
15DD Graphics|73
Radeon RX Vega M GL Graphics|73
Radeon(TM) R9 380|72
Radeon(TM) 530 series|72
Radeon R7 200 Series|72
Embedded Radeon E9171|72
Radeon Pro WX3200 Graphics|71
Radeon HD 8800M Series|71
Radeon R9 M375|70
Radeon HD 5770|70
Radeon Pro 555|70
Radeon R7 250E|70
Radeon HD 7750|70
Radeon Pro 555X|70
Radeon(TM) Vega 8 Mobile Graphics|70
Radeon(TM) R9 M380|69
Radeon R7 260X/360|69
Barco MXRT 7600 (WDDM)|69
Radeon(TM) Vega 10 Graphics|69
Radeon HD 7750|69
Radeon R9 M370X|69
Radeon(TM) R2E Graphics|69
Radeon R9\u2122 M370X|68
FirePro V4900 (FireGL V)|68
Radeon(TM) RX Vega11 Graphics|68
Radeon HD 5770|68
Radeon(TM) Renoir Graphics D1|68
Radeon HD 7600 Series|67
Radeon R5 340|67
Radeon(TM) Vega 9 Graphics|67
FirePro W4100 (FireGL V) Graphics Adapter|67
694E:C0|67
694C:C0|67
Radeon R7 250|66
Radeon HD 6750|66
RAVEN (DRM 3.36.0, 5.6.5-AMD, LLVM 9.0.1)|66
FirePro W600|66
Radeon R9 255|66
Radeon RX 470|66
Radeon(TM) R7 250|66
FirePro V5900|65
Radeon(TM) 530|65
Radeon Pro WX Vega M GL Graphics|65
Radeon RX 470/480|65
Radeon HD 5750|65
Radeon R7 260X|65
FirePro V5900 (FireGL V) Graphics Adapter|65
FirePro W4100 Graphics Adapter|65
Radeon HD 6700 Green Edition|65
Radeon R9 M370X|65
Radeon(TM) R7 350X|64
Radeon(TM) R7 350X|64
Radeon HD 7670|64
Radeon R9 M200X Series|64
Radeon R9 M370X|64
Radeon HD 6670|63
Radeon(TM) HD 8350|63
Radeon 530X Series|63
Radeon(TM) R9 360|63
Radeon(TM) Pro WX 4150 Graphics|63
67EF:C5|63
Radeon R7 Graphics + R5 340 Dual Graphics|62
Radeon HD 5670|62
Radeon RX 470/570|62
Radeon 530 Series|62
Radeon R7 250 Series|62
Radeon R7 430|62
Radeon HD 6750 Graphics|62
Radeon(TM) R9 M385X|62
Radeon(TM) Vega 10 Mobile Graphics|62
FirePro V5900 (FireGL V)|61
FirePro V5800 (FireGL V)|61
Radeon(TM) Vega 8 Graphics|61
FirePro V4800 (FireGL V)|61
Radeon HD 7600 Series|61
Radeon(TM) Vega 6 Graphics|61
Radeon(TM) R9 200 Series|61
Radeon HD 8850M|61
Radeon RX460|61
Radeon R7 M460|61
Radeon RX 640 Series|60
Radeon 530|60
Radeon HD 5600/5700|60
Radeon HD 5750 Series|60
Radeon R7 Graphics + R7 200 Dual Graphics|60
Radeon R7 450|60
FirePro V4900|60
Firepro W6150M|60
ASUS R7 250 Series|60
Radeon(TM) RX 560 Graphics|60
Radeon(TM) R7 M370|59
FirePro M4000 Mobility Pro Graphics|59
Radeon R5 430|59
Radeon R9 M275X|59
FirePro V5800 (FireGL) Graphics Adapter|59
Mobility Radeon HD 5870|59
Radeon(TM) R9 M385X|58
Radeon HD 7750M|58
Radeon HD 5670|58
Radeon HD 8850M|58
Radeon HD 7700M Series|58
Radeon HD 8670D + R7 200 Dual Graphics|58
Radeon R7 Series / HD 9000 Series|57
Radeon HD 6730M/6770M|57
Radeon(TM) 625|57
Radeon(TM) R9 M385|57
Radeon HD 5870M|56
Radeon 610 Series|56
FirePro W4100|56
FirePro M6000 Mobility Pro Graphics|56
Radeon RX 540 Series|56
Radeon R7 240|56
Radeon HD 7560D + HD 7700 Dual Graphics|56
Radeon R9 M370X (Bootcamp XG edition by bootcampdrivers.com)|56
FirePro V4900 (ATI FireGL)|55
Radeon(TM) R7 M350|55
FirePro M6000 Mobility Pro Graphics|55
67FF:08|55
Radeon HD 5750|55
Radeon HD 7570|55
Radeon(TM) Vega 11 Graphics|55
Radeon R7 M460|55
Radeon HD 5750 OpenGL Engine|55
Radeon(TM) R7 M370|55
Radeon HD 6730M/6770M/7690M XT|55
Radeon E8860|55
Radeon HD 8790M|54
Radeon HD 6770M|54
Radeon R7 M440|54
Radeon(TM) R7 350|54
Radeon(TM) R7 350X|54
Radeon HD 7870 XT|54
Radeon HD 7800M Series|54
Radeon 520|54
Radeon R7 M370|53
FirePro W4150M FireGL V|53
(ATI) FirePro M4000 (FireGL V) Mobility Pro Graphics|53
Radeon R9 M200X Series|53
Radeon HD 6700M/7700M/7900M Series|53
Radeon(TM) 620|53
Picasso|53
Radeon(TM) RX Vega 10 Graphics|53
67EF:CF|53
Radeon(TM) Vega 3 Graphics|53
Radeon R7 250|53
FirePro W4190M|53
Radeon(TM) Vega 8 Graphics|53
694C:C0|52
Radeon HD 5670 Series|52
Radeon(TM) RX Vega 11 Graphics|52
Radeon HD 6770M OpenGL Engine|52
Radeon(TM) M535DX|52
FirePro V4800 (FireGL V)|52
Radeon R7 350 Series|52
Barco MXRT 5600 (WDDM)|51
Radeon 630|51
FirePro V4900 (FireGL V)|51
FirePro V4900 (FireGL V) Graphics Adapter|51
Radeon(TM) Vega 3 Mobile Graphics|51
Radeon 535 Series|51
Radeon R7 Graphics|51
Radeon HD 5670|51
FirePro W4170M|50
Radeon HD 8700M Series|50
Radeon HD 8670 / R7 250/350|50
Picasso|50
FirePro V4800 (FireGL) Graphics Adapter|50
Mobility Radeon HD 5850|49
OPAL XT/GL (6604)|49
Radeon R5 M335|49
Matrox C900 PCIe x16|49
Radeon HD 7670|49
Radeon HD 6750M|49
Radeon(TM) 535|49
Radeon 540X Series|49
Radeon R9 M275|49
Radeon(TM) RX 640|49
Radeon HD 5700 Series|48
Radeon R5 M230 Series|48
Firepro M6100|48
Radeon(TM) R9 M375|48
Radeon R5 430|48
Radeon(TM) R7 250|47
Radeon R9 M265X|47
Radeon HD 6730M/6770M|47
Radeon HD 8670D|47
Radeon R5 340|47
Radeon 520|47
Radeon(TM) 520|47
FirePro V (FireGL V) Graphics Adapter|47
FirePro M5100 FireGL V|46
Radeon HD 6670|46
Radeon R7 M260X|46
Radeon HD 8550|46
FirePro M4150|46
Radeon HD 6670|46
Radeon HD 7700 Series|46
FirePro M4170|46
Radeon HD 7570|46
Radeon HD 8670D + HD 6670 Dual Graphics|45
699F:C1|45
Radeon R7 Graphics|45
Radeon(TM) R7 M340|45
FirePro W4170M (FireGL V)|45
Radeon(TM) HD 8500M/8700M|45
Radeon R7 M340|44
FirePro M5950|44
Radeon HD 8570D + R7 240 Dual Graphics|44
Radeon HD 6770M|44
Radeon HD 7730M|44
Radeon HD 8790M|44
Radeon HD 7750|44
Radeon HD 8690A|44
Mobility Radeon HD 5730 / 6570M|44
Radeon R9 A375|44
Radeon(TM) R8 M445DX|43
FirePro V (FireGL V) Graphics Adapter|43
Radeon HD 7750/8740 / R7 250E|43
FirePro V3900|43
Radeon HD 7600A Series|43
Radeon(TM) R7 200 Series Graphics|43
Radeon R7 Graphics|43
Radeon HD 6770M|43
Radeon R7 M260 Series|43
Radeon R7 M360|43
Radeon HD 8970M|43
Radeon(TM) Vega 6 Graphics|43
Radeon HD 8570|42
Radeon R7 M440|42
Radeon HD 8670A/8670M/8750M|42
Mobility Radeon HD 5850|42
Radeon HD 8750M|42
Embedded Radeon E9173|42
Radeon(TM) R7 M440|42
Radeon HD 8730M|42
Radeon R7 240 + HD 8570D Dual Graphics|42
FirePro V3900|42
Radeon(TM) 535DX|42
Radeon(TM) 520|42
Radeon(TM) Vega 8 Mobile Graphics|42
Radeon(TM) Vega 8 Graphics|42
Radeon(TM) Vega 2 Graphics|42
Radeon(TM) R9 M375|42
Radeon(TM) R8 M445DX|41
Radeon HD 6750M|41
RadeonT 540X|41
Radeon(TM) 530|41
Radeon HD 7560D + HD 6670 Dual Graphics|41
Radeon R7 240|41
Radeon(TM) R7 M360|41
Radeon R9 M280X|41
Radeon HD 7520G + HD 7600M Dual Graphics|41
Radeon(TM) R7 M445|41
Radeon Vega 8 Mobile|40
Radeon(TM) R9 255|40
Radeon R7 M260X|40
Radeon R8 M535DX|40
Radeon R7 240/340|40
Radeon(TM) R9 M375|40
Radeon(TM) R7 Graphics|40
Radeon(TM) R5 M420|40
Radeon HD 6750M|40
Radeon R9 M265X|40
Radeon R7 M340|40
Radeon HD 6570|40
Radeon HD 7500/7600 Series|39
Radeon R7 430|39
FirePro W2100|39
Radeon HD 7730M|39
Radeon HD 8670D|39
Radeon R5 M255|39
Radeon HD 7560D + HD 6570 Dual Graphics|39
Radeon RX Vega|39
Radeon R7 240 Series|39
Radeon(TM) R7 M445|39
Radeon HD 6800M Series|39
Radeon HD 8690M|39
Radeon HD 7660D + HD 6570 Dual Graphics|39
Radeon R7 M370|39
Radeon(TM) HD 6650M|38
Radeon R5 M435|38
Radeon HD 6500 Series|38
Radeon R7 Graphics|38
FirePro M7820|38
Radeon(TM) R8 M445DX Graphics|38
Radeon HD 5570|38
Radeon HD 8650G + 8750M Dual Graphics|38
Radeon HD 8670A/8670M/8750M|38
Radeon HD 6650M|38
Radeon R7 M260 Series|38
Radeon HD 7660G + 7600M Dual Graphics|38
Radeon HD 7600M Series|38
Radeon HD 7670M|37
Radeon. HD 7670M|37
Radeon(TM) R7 M265|37
Mobility Radeon HD 5000|37
Radeon HD 7500M/7600M Series|37
Radeon R5/R6/R7 Graphics|37
Radeon R7 M270|37
Radeon HD 8650G + HD 7600M Dual Graphics|37
Firepro M5100|37
Radeon HD 7730M|37
Radeon HD 8570D|37
Radeon(TM) HD 7650A Graphics|37
Radeon R7 Graphics|37
Radeon(TM) RX Vega 10 Graphics|37
Radeon HD 7600A Series|36
Radeon R7 M270|36
Radeon HD 7660D + HD 6670 Dual Graphics|36
Radeon HD 7570M/HD 7670M Graphics|36
Radeon 6600M and 6700M Series|36
Radeon R7 Graphics + R7 200 Dual Graphics|36
Radeon HD 7570 Series|36
Radeon HD 8750M|36
Radeon HD 6550D|36
FirePro M5950|36
Radeon HD 7660G + 7600M Dual Graphics|36
Radeon HD 6550D|36
Radeon HD 7600M/7700M Series|36
Radeon(TM) Vega 3 Graphics|36
Radeon(TM) 625|36
Mobility Radeon HD 5570|36
Radeon HD8730|36
Radeon(TM) R9 M380|36
Radeon(TM) R5 240|36
Radeon HD 7650M|35
Radeon HD 7560D|35
Radeon HD 8690M|35
Radeon HD 8650G + 8750M Dual Graphics|35
Radeon HD 8650G + HD 8750M Dual Graphics|35
Radeon HD 8650G + HD 8570M Dual Graphics|35
Radeon HD 6570|35
Radeon HD 7650M|35
Radeon HD 6630M/6650M/6750M/7670M/7690M|35
Radeon HD 6500 Series|35
Radeon(TM) 520|35
Radeon HD 8570D|35
Radeon HD 7600M Series|35
Radeon R7 Graphics|35
Radeon HD 7660G + 8670M Dual Graphics|35
Radeon R7 200 Series|35
Radeon HD 6630M/6650M/6750M/7670M/7690M|35
Radeon R7 M265|35
Radeon HD 8650G + HD 8750M Dual Graphics|35
Radeon HD 8650G + 8670M Dual Graphics|35
Radeon R7 Graphics|34
Radeon HD 6630M Series|34
Radeon(TM) 520|34
Radeon HD 7660D|34
ASUS R7 240 Series|34
Radeon R9 M280X|34
Radeon(TM) R5 340|34
Radeon HD 8550G + 8600/8700M Dual Graphics|34
Radeon R7 Graphics|34
Radeon(TM) HD 8500M/8700M|34
Radeon HD 7660G + HD 7600M Dual Graphics|34
Radeon HD 7670M|34
Radeon(TM) R5 M430|34
Radeon HD 8650G + 8500M Dual Graphics|34
Radeon(TM) R5 340X|34
Radeon(TM) R5 230 series|34
Radeon HD 8550|34
FirePro W2100 (FireGL V)|34
Firepro M4100 FireGL V|34
Radeon HD 6550D|34
Radeon HD 6630M|34
Radeon(TM) R9 M375|34
Radeon HD 5670 OpenGL Engine|33
Radeon HD 5670|33
Radeon R7 Graphics|33
Radeon HD 7660G|33
Radeon HD 5570|33
Radeon HD 7550M/7650M Graphics|33
Radeon HD 7660D|33
Radeon HD 7560D|33
Radeon HD 7560D|33
Radeon R5 M445 Series|33
Radeon R5 M315|33
Radeon HD 8570D|33
Radeon R7 M265|33
Radeon HD 7640G + HD 7500/7600 Dual Graphics|33
Radeon R7 Graphics|33
Radeon HD 8500M Series|33
Mobility Radeon HD 5000|33
Radeon(TM) R7 M360|33
Firepro M4100|33
Radeon(TM) Vega 10 Graphics|32
Radeon HD 7500M/7600M Series|32
Radeon HD 8550G + HD 8600/8700M Dual Graphics|32
Radeon HD 7660G|32
Radeon HD 7350|32
Radeon HD 8470D + HD 6450 Dual Graphics|32
Radeon R7 Graphics|32
Radeon HD 8730M|32
Radeon HD 7640G + HD 7400M Dual Graphics|32
Radeon HD 8690A|32
Radeon HD 8650G + 8600/8700M Dual Graphics|32
Radeon R7|32
Radeon(TM) Vega 11 Graphics|32
Radeon(TM) Vega 8 Graphics|32
Radeon R5 M200 Series|32
Radeon(TM) R5 M335|32
Radeon(TM) R5 M430|32
Radeon HD 8550G + HD 8570M Dual Graphics|32
Radeon HD 7650M Series|32
Radeon R7 250 Series|32
Radeon(TM) R7 M460|32
Radeon HD 6550D|32
Radeon HD 7660G + HD 7600M Dual Graphics|32
Radeon(TM) Vega 3 Graphics|32
Radeon HD 8470D|32
Radeon R8 M365DX|31
Madison [Mobility Radeon HD 5650/5750 / 6530M/6550M]|31
Radeon HD 6630M/6650M/6750M/7670M/7690M|31
Radeon R7 Graphics|31
Radeon E6760|31
Radeon R7 Graphics|31
Radeon(TM) Vega 8 Graphics|31
Radeon(TM) R5 M330|31
Radeon HD 8670A/8670M/8690M|31
Radeon R7 A360|31
Radeon HD 8650G + HD 8600M Dual Graphics|31
Radeon R5 M200 / HD 8500M Series|31
Radeon(TM) R8 M435DX|30
Radeon HD 7640G + HD 7670M Dual Graphics|30
Radeon(TM) Vega 10 Mobile Graphics|30
Radeon R7 Graphics|30
Radeon Pro 450/550|30
Radeon HD 8800M Series|30
Radeon HD 8470D|30
Radeon HD 7660D|30
Radeon HD 8610G + HD 8600M Dual Graphics|30
Radeon HD 7660G + 7670M Dual Graphics|30
Radeon(TM) Vega 8 Mobile Graphics|30
Radeon 610 Series|30
Radeon(TM) R5 M330|30
Radeon HD 7660G|30
Radeon HD 7640G|30
Radeon R8 M365DX|30
Radeon HD 8550G|29
Radeon HD 7540D|29
Radeon HD 7640G|29
Radeon HD 8650G|29
Radeon(TM) R7 Graphics|29
Radeon(TM) RX Vega 11 Graphics|29
Radeon HD 6650M|29
Radeon HD 7660G|29
Radeon 6600M and 6700M Series|29
Radeon HD 7640G + HD 7400M Dual Graphics|29
Radeon(TM) R5 340X|29
Radeon R5 435|29
Radeon HD 6500M/5600/5700 Series|29
Firepro M4100 FireGL V|29
Radeon R7 Graphics|29
Radeon(TM) 535|29
Radeon R7 240 Series|29
Radeon(TM) R7|29
Radeon HD 8550G + 8500M Dual Graphics|28
Radeon(TM) 530|28
Radeon HD 5650 Series|28
Radeon HD 7570M|28
Radeon HD 7570M|28
ASUS R7 240 Series|28
Radeon HD 6570|28
Radeon(TM) Vega 8 Graphics|28
Radeon E8860|28
Radeon(TM) 530 series|28
Radeon(TM) R5 M315|28
Radeon HD 5500 Series|28
Radeon HD 8610G + HD 8670M Dual Graphics|28
Radeon(TM) R6|28
Radeon R9 M275X|28
Radeon HD 8550G + R5 M230 Dual Graphics|28
Radeon HD 8470D|28
Radeon HD 8670D|28
Radeon HD 7620G|28
Radeon(TM) R8 M350DX|28
Radeon HD 8470D|27
Radeon(TM) R8 M445DX|27
Radeon(TM) R7 Graphics|27
Radeon(TM) R5 Graphics|27
Radeon(TM) R7 M340|27
Radeon(TM) R6 Graphics|27
Radeon R6 Graphics|27
Radeon R5 M230 Series|27
Radeon HD 8650G|27
Radeon HD 7480D|27
Radeon(TM) R8 M445DX Graphics|27
Radeon(TM) R6 Graphics|27
Radeon R7 Graphics|27
Radeon R6|27
Radeon R5 M255|27
Radeon(TM) Vega 3 Graphics|27
Radeon 550X|27
Radeon(TM) Vega 3 Graphics|27
Radeon HD 7500/7600 Series|27
Radeon HD 8650G|27
Radeon HD 5500 Series|27
Radeon HD 7610M|27
Radeon Instinct MI25 MxGPU|27
Radeon(TM) HD8530M|27
Radeon R7 M260|27
Radeon(TM) R8 M445DX|27
Radeon R7 Graphics|26
Radeon HD 8500M|26
Radeon(TM) R7 M260DX|26
Radeon HD 8410G|26
Radeon HD 8670A/8670M/8690M|26
Radeon(TM) R7 M360|26
Radeon(TM) R7 M360|26
Radeon HD 8670D|26
Radeon R9 M275|26
Radeon HD 7640G|26
Radeon(TM) R7 Graphics|26
MxGPU|26
Radeon HD 8370D|26
Radeon HD 6620G|25
Radeon HD 7560D|25
Radeon HD 8570 / R5 430 / R7 240/340 / Radeon 520|25
Radeon R4 Graphics|25
Radeon R6 Graphics|25
Radeon R7 Graphics|25
Radeon(TM) 535DX|25
Radeon(TM) 540 Graphics|25
Radeon(TM) R5 M330|25
Radeon HD 6530D|25
Radeon R6 Graphics|25
Radeon HD 8510G|25
Radeon HD 6620G|25
Radeon R7 M360|24
Radeon(TM) R6 Graphics|24
Radeon R7 M260|24
Radeon HD 8610G + HD 8600M Dual Graphics|24
Radeon(TM) R6 Graphics|24
Radeon R5 M200 / HD 8500M Series|24
Radeon R7 Graphics|24
Radeon HD 7600G|24
Radeon R7 Graphics|24
Radeon HD 6620G|24
Radeon R5 M330|24
Radeon(TM) R5 240|24
Radeon(TM) HD 6620G|24
FirePro V3800 (FireGL V)|24
Radeon HD 6520G|24
Radeon R7 Graphics|24
Radeon HD 7520G|24
Radeon(TM) R6 Graphics|24
Radeon(TM) R7 M260|24
Radeon RX 540 Series|24
Radeon(TM) R5 M320|24
Radeon HD 8500M|23
Radeon R5 M230|23
Radeon HD 8670M|23
Radeon HD 8550G + HD 8750M Dual Graphics|23
Radeon HD 8600M Series (HAINAN, DRM 3.40.0, 5.11.13-arch1-1, LLVM 11.1.0)|23
Radeon HD 8550G|23
Radeon R5 M240|23
Radeon R5 M240 Series|23
Radeon HD 7540D|23
Radeon(TM) R5 M430|23
Radeon R5 Graphics|23
Radeon(TM) R5 M430|23
Radeon R6 Graphics|23
Radeon HD 7520G|23
Radeon R7 Graphics|23
Radeon HD 8610G|22
FirePro 3800 (FireGL) Graphics Adapter|22
Radeon HD 7570M/HD 7670M Graphics|22
Radeon HD 7480D|22
Radeon(TM) R7 Graphics|22
Radeon HD 8650G + HD 8600M Dual Graphics|22
Radeon(TM) Vega 6 Graphics|22
Radeon R7 Graphics|22
Radeon R5 Graphics|22
Radeon HD 7660G + HD 8600M Dual Graphics|22
FirePro M2000|22
Radeon R7 Graphics|22
Radeon HD 7870M|22
Radeon R5 M335|22
Radeon R5|22
Radeon HD 8500M Series|22
Radeon(TM) HD 8490|22
Radeon HD 8670M|22
Radeon HD 7660G + HD 7670M Dual Graphics|22
Radeon 7500M/7600M Series|22
Radeon R5 Graphics|21
Radeon(TM) R4 Graphics|21
Radeon HD 8490|21
Radeon HD 8490|21
Radeon R7 Graphics|21
Radeon HD 8570M|21
Radeon(TM) R5 M320|21
Radeon R2|21
Radeon HD 6530D|21
Radeon(TM) HD 6470M|21
MxGPU|21
Radeon HD 7000 series|21
Radeon HD 7470|21
Radeon(TM) R8 M350DX|21
Radeon R7 Graphics|21
Radeon HD 7520G + HD 7400M Dual Graphics|21
Radeon(TM) R5 M335|21
Radeon HD 7400G|21
Radeon HD 7640G + HD 8500M Dual Graphics|21
Radeon HD 7000 series|21
Radeon(TM) R5 Graphics|20
Radeon(TM) R7 M520 (R17M-M1-30)|20
Radeon HD 8470|20
Radeon HD 7480D|20
Radeon HD 6400M/7400M Series|20
Radeon(TM) R3 Graphics|20
Radeon R6 M255DX|20
Radeon HD 8370D|20
Radeon R5 Graphics|20
Radeon R7 Graphics|20
Radeon HD 6410D|20
Radeon(TM) R5 Graphics|20
Radeon R5 M330|20
Radeon R7 M260DX|20
Radeon(TM) R5 Graphics|20
Radeon HD 7480D|20
Radeon HD 6470M|20
Radeon Hybrid (Blocked)|20
Radeon(TM) R7 Graphics|20
Radeon(TM) R6 M340DX|20
Radeon R5 235|20
Radeon HD 7520G|19
Radeon(TM) R6 M255DX|19
Radeon R5 M240|19
Radeon(TM) R3 Graphics|19
Radeon R7E Graphics|19
Radeon R5 M200 Series|19
Radeon HD 7470|19
Radeon HD 7640G + 8500M Dual Graphics|19
Radeon(TM) R5 M330|19
Radeon HD 6470M|19
Radeon R3 Graphics|19
Radeon HD 8400E|19
Radeon HD 7640G + HD 8570M Dual Graphics|19
Radeon HD 8400|19
Radeon HD 8400 / R3 Series|19
Radeon R5 Graphics|19
Radeon(TM) R7 M265|19
Radeon R5 M230|19
Radeon R5 Graphics|19
Radeon HD 7620G|19
Radeon R5 Graphics|19
Radeon(TM) HD 6470M|19
Radeon HD 7480D|18
Radeon R7 Graphics|18
Radeon(TM) R5 Graphics|18
Radeon HD 8550G|18
Radeon HD 8370D|18
Radeon R5 Graphics|18
Radeon(TM) HD 7450|18
Radeon HD 6530D|18
Radeon HD 8570M|18
Radeon R6 Graphics|18
Radeon HD 7650A|18
Radeon HD 8450G|18
Radeon HD 8550G + R5 M230 Dual Graphics|18
Radeon HD 7640G + 7470M Dual Graphics|18
Radeon HD 8370D|18
Radeon HD 7400M Series|18
Radeon HD 8670D + R5 200 Dual Graphics|17
Radeon HD 7500G|17
Radeon HD 7790|17
Radeon HD 7450M|17
Radeon(TM) HD 7450A Graphics|17
Radeon(TM) R5 Graphics|17
Radeon(TM) R6 Graphics|17
Radeon(TM) R4 Graphics|17
Radeon HD 8650G + HD 8500M Dual Graphics|17
Radeon HD 7400M Series|17
Radeon HD 8450G|17
Radeon HD 6520G|17
Radeon HD 8470D|17
Radeon(TM) R5 Graphics|17
Radeon(TM) R4E Graphics|17
Radeon HD 8330|17
Radeon HD 8400|17
Radeon(TM) HD 8510G|17
Radeon(TM) R5 Graphics|17
Radeon HD 8650G|17
Radeon HD 6490M|17
Radeon R7 Graphics|16
Radeon HD 6400 Series|16
Radeon HD 8510G|16
Radeon HD 7400 Series|16
Radeon HD 7400 Series|16
Radeon(TM) HD 8510G|16
Radeon HD 6370D|16
Radeon HD 7420G|16
Radeon HD 7520G + HD 7600M Dual Graphics|16
Radeon R9 260|16
Radeon HD 7640G + 7600M Dual Graphics|16
Radeon HD 7470M|16
Radeon(TM) R2 Graphics|16
RADEON HD 6450|16
Radeon(TM) R1E Graphics|16
Radeon R5 Graphics|16
Radeon HD 7420G|16
Radeon(TM) R4 Graphics|16
Radeon(TM) R4 Graphics|16
Radeon(TM) R4 Graphics|16
Radeon HD 7480D|16
Radeon HD 6490M|15
RADEON HD 6450|15
Radeon(TM) HD 8610G|15
Radeon(TM) HD 8610G|15
Radeon HD 8610G + 8600M Dual Graphics|15
Radeon HD 7350|15
Radeon(TM) HD 6480G|15
Radeon HD 8650G + 8600M Dual Graphics|15
Radeon HD 8570D|15
Radeon HD 6370M|15
Mobility Radeon HD 5000 Series|15
Radeon R2 Graphics|15
Radeon HD 8240 / R3 Series|15
Radeon HD 8650G + R5 M200 Dual Graphics|15
Radeon HD 8400E|15
Radeon(TM) R4 Graphics|15
Radeon R5 Graphics|15
Radeon HD 8610G|15
Radeon HD 8650G + HD 8500M Dual Graphics|15
Radeon(TM) R7 M260|15
ASUS EAH6450 Series|15
Radeon R3 Graphics|15
Radeon(TM) R6 M340DX|15
Radeon R6E Graphics|15
Radeon R5 Graphics|15
Radeon R2 Series|14
Radeon HD 6450/7450/8450/R5 230|14
Radeon HD 8200 / R3 Series|14
Radeon(TM) R3 Graphics|14
Radeon R5 230|14
Radeon(TM) HD 8510G|14
Radeon(TM) R4 Graphics|14
Radeon R5 M435|14
Radeon HD 8240|14
ASUS R5 230 Series|14
FirePro M2000|14
Radeon HD 7500G|14
Radeon HD 7450|14
RADEON HD 6450|14
Radeon HD 8400E|14
RADEON HD 6350|14
Radeon HD 6480G|14
Radeon(TM) R5E Graphics|14
CARRIZO 9874|14
Mobility Radeon HD 5000 Series|14
Radeon HD 6630M|14
Radeon HD 6370M|14
Radeon HD 8400 / R3 Series|14
Radeon(TM) R2 Graphics|14
ASUS EAH6450 Series|14
Radeon HD 7470M|13
Mobility Radeon HD 5470|13
Mobility Radeon HD 5400 Series|13
Radeon(TM) R5E Graphics|13
Radeon(TM) R2 Graphics|13
Radeon HD 6540|13
Radeon HD 7450|13
Radeon HD 5450|13
Radeon HD 8600M Series|13
Radeon HD 8400 / R3 Series|13
Kaveri|13
Radeon(TM) HD 6480G|13
Radeon HD 5400 Series|13
Radeon HD 8330|13
RADEON HD 6350|13
Radeon R4/R5 Graphics|13
Radeon HD 7600G +\u2122 HD Dual Graphics|13
Radeon R3 Graphics|13
ASUS R5 230 Series|13
Radeon(TM) R7 Graphics|13
Radeon HD 7620G|13
Radeon HD 8250|13
Radeon(TM) R7 Graphics|12
Radeon HD 6450/7450/8450 / R5 230|12
Radeon HD 6480G|12
Radeon(TM) R7 Graphics|12
Radeon HD 5450 Series|12
Radeon HD 8400 / R3 Series|12
Radeon(TM) HD 6400 Series|12
Radeon(TM) R4 Graphics|12
RADEON HD5450|12
Radeon R5 Graphics|12
Radeon R5 Graphics|12
Radeon(TM) R6 Graphics|12
Radeon(TM) R4 Graphics|12
Radeon(TM) R2 Graphics|12
Radeon HD 8210|12
Radeon R5 230|12
Radeon R3 Graphics|12
FirePro 2270|12
Radeon(TM) R2E Graphics|12
Radeon HD 8400 / R3 Series|12
Radeon HD 8350G|12
Radeon HD 8400|12
Radeon R2 Graphics|12
Radeon HD 8210 Graphics|12
Radeon E6460|12
Radeon(TM) HD 8280E|12
Radeon R2 Graphics|11
Radeon HD 8450G + HD 8750M Dual Graphics|11
Radeon HD 8330|11
Radeon HD 5470|11
Radeon HD 7600G + 7500M/7600M Dual Graphics|11
Radeon R5 220|11
Radeon HD 8200 / R3 Series|11
Radeon HD 8240|11
Radeon HD 8400 / R3 Series|11
Radeon HD 8200 / R3 Series|11
Radeon HD 5450|11
Radeon(TM) 620|11
Radeon(TM) Vega 8 Mobile Graphics|11
Radeon HD 6530D|11
Radeon(TM) HD 6520G|11
Radeon HD 6300M Series|11
ASUS EAH5450|11
Radeon R5 220|11
Radeon HD 8250|11
Radeon HD 7340|11
Radeon HD 7340M|11
Radeon HD 8210|11
Radeon HD 7700 Series|10
Radeon HD 6380G|10
Radeon HD 5400 Series|10
Radeon HD 8240|10
Radeon HD 7640G + 7670M Dual Graphics|10
Radeon(TM) R6 Graphics|10
ASUS EAH5450 Series|10
Radeon HD 6320|10
Radeon HD 7340G|10
Radeon HD 6410D|10
Radeon HD 7340|10
Radeon HD 6320|10
Radeon(TM) R2 Graphics|10
Radeon HD 8180|9
Mobility Radeon HD 5430|9
Radeon R2 Graphics|9
Radeon R2 Series|9
Radeon HD 8210|9
FirePro 2270|9
Radeon R2E Graphics|9
Radeon HD 7340|9
Radeon HD 6320|9
Radeon HD 7310|9
Radeon HD 6310|9
Radeon R7 Graphics|9
Radeon HD 7310|8
Radeon HD 8250|8
Radeon HD 8180|8
Radeon HD 6630M|8
Radeon HD 6230|8
Radeon HD 6320|8
Radeon HD 6400M Series|8
Radeon HD 7290 Graphics|7
Radeon HD 6290|7
Radeon HD 6310|7
Radeon HD 8180|7
ASUS EAH5450 Series|7
Radeon(TM) R2 Graphics|6
Radeon HD 6310|6
Radeon HD 7500G|6
Radeon HD 8240 / R3 Series|6
Radeon HD 6250|6
Radeon HD 6380G|6
Radeon HD 6300M Series|5
Radeon HD 7310|5
Radeon R3 Graphics|5
Radeon(TM) R6 Graphics|5
Radeon HD 6250|5
Radeon HD 6290|5
Radeon HD 6250|5
Radeon HD 7290 Graphics|4
Radeon HD 5000/6000/7350/8350 Series|3
Radeon RX Vega 56 OpenGL Engine|-1
FirePro V4800 (FireGL) Graphics Adapter|-1
Radeon HD 7670M|-1
Radeon HD 8570D|-1
7340:C5|-1
Radeon HD 8550G|-1
Radeon R5 Graphics|-1
ASUS R7 360 Series|-1
Bonaire [FirePro W5100]|-1
Radeon HD 6380G|-1
Radeon R7 Graphics|-1
FireGL V8650|-1
FirePro S7150|-1
FirePro V3900 (FireGL V)|-1
FirePro V7800 (FireGL V)|-1
FirePro W4100 Graphics Adapter|-1
FirePro W4170M (FireGL V)|-1
Gigabyte Radeon RX 580|-1
Mobility FireGL V5700|-1
Mobility Radeon 4100|-1
Mobility Radeon HD 2400|-1
Mobility Radeon HD 2400 XT|-1
Mobility Radeon HD 2600|-1
Mobility Radeon HD 2600 XT|-1
Mobility Radeon HD 3200|-1
Mobility Radeon HD 3400 Series|-1
Mobility Radeon HD 3430|-1
Mobility Radeon HD 3470|-1
Mobility Radeon HD 3650|-1
Mobility Radeon HD 4200 Series|-1
Mobility Radeon HD 4250|-1
Mobility Radeon HD 4300 Series|-1
Mobility Radeon HD 4500 Series|-1
Mobility Radeon HD 4500/5100 Series|-1
Mobility Radeon HD 4650|-1
Mobility Radeon HD 4670|-1
Mobility Radeon HD 4850|-1
R9 270X Devil|-1
RX 560X|-1
Radeon|-1
Radeon(TM) HD8530M|-1
Radeon 3000|-1
Radeon 3100 Graphics|-1
Radeon HD 2400 PRO|-1
Radeon HD 2400 XT|-1
Radeon HD 2600 Pro|-1
Radeon HD 2600 XT|-1
Radeon HD 2900 GT|-1
Radeon HD 3200 Graphics|-1
Radeon HD 3300|-1
Radeon HD 3450|-1
Radeon HD 3470|-1
Radeon HD 3600 Series|-1
Radeon HD 3650|-1
Radeon HD 3850|-1
Radeon HD 3870|-1
Radeon HD 3870 X2|-1
Radeon HD 4200|-1
Radeon HD 4250|-1
Radeon HD 4290|-1
Radeon HD 4300/4500 Series|-1
Radeon HD 4550|-1
Radeon HD 4600 Series|-1
Radeon HD 4650|-1
Radeon HD 4670|-1
Radeon HD 4830|-1
Radeon HD 4850|-1
Radeon HD 4870|-1
Radeon HD 4890|-1
Radeon HD 5670 640SP Edition|-1
Radeon HD 5800 Series|-1
Radeon HD 5850|-1
Radeon HD 6490M|-1
Radeon HD 6730M/6770M|-1
Radeon HD 6750|-1
Radeon HD 6800M Series|-1
Radeon HD 7540D + HD 6670 Dual Graphics|-1
Radeon HD 7700M Series|-1
Radeon HD 7800 Series|-1
Radeon HD 8350|-1
Radeon HD 8370D|-1
Radeon HD 8600/8700M|-1
Radeon Pro WX Vega M GL Graphics|-1
Radeon R5 200 Series|-1
Radeon R7 A370|-1
Radeon R9 200 Series|-1
Radeon R9 290X/390X|-1
Radeon R9 380X|-1
Radeon RX 480|-1
Radeon RX 550X|-1
Radeon RX 6650M|-1
Radeon RX6600XT|-1
Radeon(TM) R8 M435DX|-1
Radeon(TM) R9 290X|-1
Radeon(TM) RX540|-1
inc. Radeon HD 7970|-1
Radeong 0.4 on AMD CAPE VERDE (DRM 2.43.0, LLVM 3.7.0)|-1
Radeong 0.4 on AMD CAPE VERDE (DRM 3.9.0 / 4.9.0-rc1+, LLVM 4.0.0)|-1
Radeong 0.4 on AMD FIJI (DRM 3.2.0 / 4.7.0-rc5+, LLVM 4.0.0)|-1
Radeong 0.4 on AMD TAHITI (DRM 2.43.0, LLVM 3.9.0)|-1
`;function o(){return t}},272003:function(e,n){"use strict";n.length=function(e){var n=e.length;if(!n)return 0;for(var r=0;--n%4>1&&"="===e.charAt(n);)++r;return Math.ceil(3*e.length)/4-r};for(var r=Array(64),t=Array(123),o=0;o<64;)t[r[o]=o<26?o+65:o<52?o+71:o<62?o-4:o-59|43]=o++;n.encode=function(e,n,t){for(var o=null,a=[],i,s=0,d=0;n<t;){var R=e[n++];switch(d){case 0:a[s++]=r[R>>2],i=(3&R)<<4,d=1;break;case 1:a[s++]=r[i|R>>4],i=(15&R)<<2,d=2;break;case 2:a[s++]=r[i|R>>6],a[s++]=r[63&R],d=0}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,a)),s=0)}return(d&&(a[s++]=r[i],a[s++]=61,1===d&&(a[s++]=61)),o)?(s&&o.push(String.fromCharCode.apply(String,a.slice(0,s))),o.join("")):String.fromCharCode.apply(String,a.slice(0,s))};var a="invalid encoding";n.decode=function(e,n,r){for(var o=r,i,s=0,d=0;d<e.length;){var R=e.charCodeAt(d++);if(61===R&&s>1)break;if(void 0===(R=t[R]))throw Error(a);switch(s){case 0:i=R,s=1;break;case 1:n[r++]=i<<2|(48&R)>>4,i=R,s=2;break;case 2:n[r++]=(15&i)<<4|(60&R)>>2,i=R,s=3;break;case 3:n[r++]=(3&i)<<6|R,s=0}}if(1===s)throw Error(a);return r-o},n.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}},772342:function(e,n,r){"use strict";var t=r(918956),o=r(739010),a=r(123587);n.Z=function(e,n,r){void 0===r&&(r={});var i=r.enable,s=void 0===i||i,d=(0,t.Z)(n);(0,a.Z)(function(){if(!s)return;var n=(0,o.n)(r.target,window);if(!!(null==n?void 0:n.addEventListener)){var t=function(e){return d.current(e)},a=Array.isArray(e)?e:[e];return a.forEach(function(e){n.addEventListener(e,t,{capture:r.capture,once:r.once,passive:r.passive})}),function(){a.forEach(function(e){n.removeEventListener(e,t,{capture:r.capture})})}}},[e,r.capture,r.once,r.passive,s],r.target)}},958487:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){for(var n=0,r=arguments.length,t=Array(r>1?r-1:0),o=1;o<r;o++)t[o-1]=arguments[o];var a=!0,i=!1,s=void 0;try{for(var d,R=t[Symbol.iterator]();!(a=(d=R.next()).done);a=!0){var c=d.value;n+=c.length}}catch(e){i=!0,s=e}finally{try{!a&&R.return&&R.return()}finally{if(i)throw s}}var u=new e(n),l=0,h=!0,f=!1,p=void 0;try{for(var v,M=t[Symbol.iterator]();!(h=(v=M.next()).done);h=!0){var D=v.value;u.set(D,l),l+=D.length}}catch(e){f=!0,p=e}finally{try{!h&&M.return&&M.return()}finally{if(f)throw p}}return u}},838025:function(e,n,r){"use strict";function t(e,n){for(var r=Math.abs(e).toString();r.length<n;)r="0"+r;return(e<0?"-":"")+r}r.d(n,{Z:function(){return t}})},326883:function(e){var n=Object.prototype.hasOwnProperty;e.exports=function(e,r){return null!=e&&n.call(e,r)}},268926:function(e,n,r){var t=r(681919),o=r(511791),a=r(745627),i=Math.ceil,s=Math.max;e.exports=function(e,n,r){n=(r?o(e,n,r):void 0===n)?1:s(a(n),0);var d=null==e?0:e.length;if(!d||n<1)return[];for(var R=0,c=0,u=Array(i(d/n));R<d;)u[c++]=t(e,R,R+=n);return u}},96772:function(e,n,r){var t=r(568558);e.exports=function(e,n,r){var o=(r="function"==typeof r?r:void 0)?r(e,n):void 0;return void 0===o?t(e,n,void 0,r):!!o}},51692:function(e,n,r){var t=r(653129),o=r(79594),a=r(671674),i=r(431356),s=r(511791);e.exports=function(e,n,r){var d=i(e)?t:a;return r&&s(e,n,r)&&(n=void 0),d(e,o(n,3))}},839092:function(e,n,r){"use strict";r.r(n)},742981:function(e,n,r){"use strict";r.d(n,{Z:function(){return D}}),r(932651);var t=r(908219),o=r.n(t),a=r(101199),i=r(426337),s=r(469935),d=r.n(s),R=r(622689),c=r.n(R),u=r(629937),l=r(248767);r(436503);var h=r(158871),f=r(653552),p=r(678503),v=function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>n.indexOf(t)&&(r[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)0>n.indexOf(t[o])&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(r[t[o]]=e[t[o]]);return r};let M=u.U.PREFIX;class D extends i.Z{componentDidMount(){var e;this.foundation.init(),this.handler=o()(this.handleClick,null!==(e=this.props.duration)&&void 0!==e?e:D.defaultProps.duration)}componentWillUnmount(){this.foundation.destroy()}get adapter(){return Object.assign(Object.assign({},super.adapter),{updateVisible:e=>{this.setState({visible:e})},notifyClick:e=>{this.props.onClick&&this.props.onClick(e)},targetIsWindow:e=>e===window,isWindowUndefined:()=>void 0===window,targetScrollToTop:(e,n)=>{e===window?(document.body.scrollTop=n,document.documentElement.scrollTop=n):e.scrollTop=n}})}handleClick(e){this.foundation.onClick(e)}renderDefault(){return a.createElement(h.Z,{theme:"light",icon:a.createElement(f.Z,null)})}render(){let e=this.props,{children:n,className:r,style:t,onClick:o,visibilityHeight:i,target:s}=e,R=v(e,["children","className","style","onClick","visibilityHeight","target"]),{visible:c}=this.state,u=d()(M,r),l=n||this.renderDefault();return c?a.createElement("div",Object.assign({},R,{className:u,style:t,onClick:e=>this.handler(e),"x-semi-prop":"children"}),l):null}constructor(e){super(e),this.state={visible:!1},this.foundation=new l.Z(this.adapter)}}D.__SemiComponentName__="BackTop",D.defaultProps=(0,p.GW)(D.__SemiComponentName__,{visibilityHeight:400,target:()=>window,duration:450}),D.propTypes={target:c().func,visibilityHeight:c().number,duration:c().number,onClick:c().func,style:c().object,className:c().string}},297489:function(e,n,r){"use strict";r.d(n,{X:function(){return o}});var t=r(480333);class o{constructor(e,n,r,o){(0,t._)(this,"duration",1024),(0,t._)(this,"flag",{dependsOn:2,isNonSyncSample:0}),(0,t._)(this,"keyframe",!0),this.originPts=this.pts=this.dts=e,this.data=n,this.size=n.byteLength,this.sampleOffset=o,r&&(this.duration=r)}}},796225:function(e,n,r){"use strict";r.d(n,{Z:function(){return o}});var t=r(480333);r(527553),r(374954),r(591964);class o{recordLoading(e){let n=parseInt(e.get("content-length")||"0"),r=e.get("Accept-Ranges"),t=e.get("Content-Range");if(!n||r||t)return;this._contentLength=n;let o=Math.floor(n/this._speed*1e3);!(o<50)&&(this._dit=performance.now(),this._startTick(n,o))}recordLoaded(){this._cleanTimer();let e=performance.now()-this._dit;this._addSample(Math.floor(this._contentLength/e))}recordChunk(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(!this._timer){this._dit=performance.now(),this._startTickForStream();return}this._totalByteSize+=e,this._contentLength+=e}_startTick(e,n){this._cleanTimer(),this._timer=setInterval(()=>{let n=performance.now()-this._dit;this._addSample(Math.floor(e/n))},n)}_startTickForStream(){this._timer=setInterval(()=>{this._addSample(this._calcSampleSpeed())},3e3)}_calcSampleSpeed(){if(!this._contentLength)return this._dit=performance.now(),0;let e=performance.now()-this._dit,n=Math.floor(this._contentLength/e);return this._contentLength=0,this._dit=performance.now(),n}_addSample(e){this._recentSpeed=1e3*e,this._sampleQueue.length>3&&(this._sampleQueue=[]),this._sampleQueue.push(e),this._calcAvgSpeed(this._sampleQueue)}_calcAvgSpeed(e){let n=e.length,r=e.reduce((e,n)=>e+=n,0)/n;this._speed=1e3*Math.floor(r)}_cleanTimer(){clearTimeout(this._timer),this._timer=0}reset(){this._cleanTimer(),this._totalByteSize=0,this._sampleQueue=[]}destroy(){this._cleanTimer()}get speedInfo(){return{totalByteSize:this._totalByteSize,currentSpeed:this.avgSpeed/8e3,avgSpeed:this.avgSpeed,recentSpeed:this.recentSpeed}}get totalByteSize(){return this._totalByteSize}get avgSpeed(){return!this._speed&&this._addSample(this._calcSampleSpeed()),8*this._speed}get recentSpeed(){return!this._recentSpeed&&this._addSample(this._calcSampleSpeed()),8*this._recentSpeed}constructor(){(0,t._)(this,"_sampleQueue",[]),(0,t._)(this,"_speed",0),(0,t._)(this,"_recentSpeed",0),(0,t._)(this,"_timer",0),(0,t._)(this,"_dit",0),(0,t._)(this,"_contentLength",0),(0,t._)(this,"_totalByteSize",0),(0,t._)(this,"_speedDown",!1)}}},850672:function(e,n,r){"use strict";r.d(n,{Z:function(){return a}});var t=r(390063),o=r.n(t);function a(e){let{value:n,maxLength:r,getValueLength:t}=e;if(!o()(t))return n.slice(0,r);{let e=0,o=n.length;for(;e<o;){let a=e+Math.floor((o-e)/2);t(n.slice(0,a+1))>r?o=a:e=a+1}return n.slice(0,e)}}},226210:function(e,n,r){"use strict";r(932651);var t=r(101199);function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}let a=t.forwardRef(function(e,n){return t.createElement("svg",o({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,ref:n},e),t.createElement("path",{d:"M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z",fill:"currentColor"}),t.createElement("path",{d:"M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z",fill:"currentColor"}),t.createElement("path",{d:"M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z",fill:"currentColor"}))});a.elementType="Icon",n.Z=a},561944:function(e,n,r){"use strict";r.d(n,{v:function(){return t.vp}});var t=r(718711)},731343:function(e,n,r){"use strict";function t(e){for(var n=arguments.length,r=Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];throw Error("number"==typeof e?"[MobX] minified error nr: "+e+(r.length?" "+r.map(String).join(","):"")+". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts":"[MobX] "+e)}r.r(n),r.d(n,{$mobx:function(){return er},FlowCancellationError:function(){return n0},ObservableMap:function(){return rU},ObservableSet:function(){return rZ},Reaction:function(){return nb},_allowStateChanges:function(){return eY},_allowStateChangesInsideComputed:function(){return nC},_allowStateReadsEnd:function(){return ni},_allowStateReadsStart:function(){return na},_autoAction:function(){return nk},_endAction:function(){return eJ},_getAdministration:function(){return tr},_getGlobalState:function(){return nh},_interceptReads:function(){return n4},_isComputingDerivation:function(){return e4},_resetGlobalState:function(){return nf},_startAction:function(){return eq},action:function(){return nF},autorun:function(){return nN},comparer:function(){return ei},computed:function(){return eW},configure:function(){return nq},createAtom:function(){return ea},defineProperty:function(){return rl},entries:function(){return rd},extendObservable:function(){return nJ},flow:function(){return n6},flowResult:function(){return n3},get:function(){return ru},getAtom:function(){return tn},getDebugName:function(){return tt},getDependencyTree:function(){return nY},getObserverTree:function(){return nQ},has:function(){return rc},intercept:function(){return n8},isAction:function(){return nj},isBoxedObservable:function(){return e1},isComputed:function(){return rn},isComputedProp:function(){return rr},isFlow:function(){return n9},isFlowCancellationError:function(){return n1},isObservable:function(){return ro},isObservableArray:function(){return rW},isObservableMap:function(){return rz},isObservableObject:function(){return r5},isObservableProp:function(){return ra},isObservableSet:function(){return rq},keys:function(){return ri},makeAutoObservable:function(){return rO},makeObservable:function(){return rP},observable:function(){return ek},observe:function(){return rf},onBecomeObserved:function(){return nU},onBecomeUnobserved:function(){return nz},onReactionError:function(){return nH},override:function(){return ec},ownKeys:function(){return rh},reaction:function(){return nB},remove:function(){return rR},runInAction:function(){return nC},set:function(){return function e(n,r,o){if(2==arguments.length&&!rq(n)){nM();var a=r;try{for(var i in a)e(n,i,a[i])}finally{nD()}return}r5(n)?n[er].set_(r,o):rz(n)?n.set(r,o):rq(n)?n.add(r):rW(n)?("number"!=typeof r&&(r=parseInt(r,10)),r<0&&t("Invalid index: '"+r+"'"),nM(),r>=n.length&&(n.length=r+1),n[r]=o,nD()):t(8)}},spy:function(){return nG},toJS:function(){return rv},trace:function(){return rM},transaction:function(){return rD},untracked:function(){return nr},values:function(){return rs},when:function(){return rg}}),r(414931),r(76375),r(302356),r(932651),r(490629),r(181365),r(14275),r(759943),r(313036),r(520995),r(374954),r(683656),r(679308),r(527553),r(88856),r(117232),r(808885);var o,a,i,s,d,R,c,u,l,h,f,p,v,M={};function D(){return"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window||"undefined"!=typeof window?window:"undefined"!=typeof self?self:M}var g=Object.assign,_=Object.getOwnPropertyDescriptor,b=Object.defineProperty,H=Object.prototype,X=[];Object.freeze(X);var m={};Object.freeze(m);var y="undefined"!=typeof Proxy,S=Object.toString();function T(){!y&&t("Proxy not available")}function G(e){var n=!1;return function(){if(!n)return n=!0,e.apply(this,arguments)}}var P=function(){};function A(e){return"function"==typeof e}function O(e){switch(typeof e){case"string":case"symbol":case"number":return!0}return!1}function w(e){return null!==e&&"object"==typeof e}function V(e){if(!w(e))return!1;var n=Object.getPrototypeOf(e);if(null==n)return!0;var r=Object.hasOwnProperty.call(n,"constructor")&&n.constructor;return"function"==typeof r&&r.toString()===S}function E(e){var n=null==e?void 0:e.constructor;return!!n&&("GeneratorFunction"===n.name||"GeneratorFunction"===n.displayName||!1)}function x(e,n,r){b(e,n,{enumerable:!1,writable:!0,configurable:!0,value:r})}function L(e,n,r){b(e,n,{enumerable:!1,writable:!1,configurable:!0,value:r})}function F(e,n){var r="isMobX"+e;return n.prototype[r]=!0,function(e){return w(e)&&!0===e[r]}}function k(e){return e instanceof Map}function C(e){return e instanceof Set}var j=void 0!==Object.getOwnPropertySymbols,N="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:j?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames;function W(e){return null===e?null:"object"==typeof e?""+e:e}function I(e,n){return H.hasOwnProperty.call(e,n)}var B=Object.getOwnPropertyDescriptors||function(e){var n={};return N(e).forEach(function(r){n[r]=_(e,r)}),n};function U(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,function(e){var n=function(e,n){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var t=r.call(e,n||"default");if("object"!=typeof t)return t;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==typeof n?n:String(n)}(t.key),t)}}function z(e,n,r){return n&&U(e.prototype,n),r&&U(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function K(){return(K=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function Z(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,q(e,n)}function q(e,n){return(q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e})(e,n)}function J(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Y(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=0,t=Array(n);r<n;r++)t[r]=e[r];return t}function Q(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return Y(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Y(e,n)}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var t=0;return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}}}throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var $=Symbol("mobx-stored-annotations");function ee(e){return Object.assign(function(n,r){en(n,r,e)},e)}function en(e,n,r){!I(e,$)&&x(e,$,K({},e[$]));!function(e){return e.annotationType_===eR}(r)&&(e[$][n]=r)}var er=Symbol("mobx administration"),et=function(){function e(e){void 0===e&&(e="Atom"),this.name_=void 0,this.isPendingUnobservation_=!1,this.isBeingObserved_=!1,this.observers_=new Set,this.diffValue_=0,this.lastAccessedBy_=0,this.lowestObserverState_=d.NOT_TRACKING_,this.onBOL=void 0,this.onBUOL=void 0,this.name_=e}var n=e.prototype;return n.onBO=function(){this.onBOL&&this.onBOL.forEach(function(e){return e()})},n.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(e){return e()})},n.reportObserved=function(){return ng(this)},n.reportChanged=function(){nM(),n_(this),nl.stateVersion=nl.stateVersion<Number.MAX_SAFE_INTEGER?nl.stateVersion+1:Number.MIN_SAFE_INTEGER,nD()},n.toString=function(){return this.name_},e}(),eo=F("Atom",et);function ea(e,n,r){void 0===n&&(n=P),void 0===r&&(r=P);var t=new et(e);return n!==P&&nU(t,n),r!==P&&nz(t,r),t}var ei={identity:function(e,n){return e===n},structural:function(e,n){return ta(e,n)},default:function(e,n){return Object.is?Object.is(e,n):e===n?0!==e||1/e==1/n:e!=e&&n!=n},shallow:function(e,n){return ta(e,n,1)}};function es(e,n,r){if(function(e){return rt(e)}(e))return e;if(Array.isArray(e))return ek.array(e,{name:r});if(V(e))return ek.object(e,void 0,{name:r});if(k(e))return ek.map(e,{name:r});if(C(e))return ek.set(e,{name:r});if("function"==typeof e&&!nj(e)&&!n9(e))return E(e)?n6(e):nk(r,e);return e}function ed(e){return e}var eR="override",ec=ee({annotationType_:eR,make_:function(e,n){return 0},extend_:function(e,n,r,o){t("'"+this.annotationType_+"' can only be used with 'makeObservable'")}});function eu(e,n){return{annotationType_:e,options_:n,make_:el,extend_:eh}}function el(e,n,r,t){if(null!=(o=this.options_)&&o.bound)return null===this.extend_(e,n,r,!1)?0:1;if(t===e.target_)return null===this.extend_(e,n,r,!1)?0:2;if(nj(r.value))return 1;var o,a=ef(e,this,n,r,!1);return b(t,n,a),2}function eh(e,n,r,t){var o=ef(e,this,n,r);return e.defineProperty_(n,o,t)}function ef(e,n,r,t,o){void 0===o&&(o=nl.safeDescriptors),a=0,i=n,s=0,d=t,i.annotationType_,d.value;var a,i,s,d,R,c,u,l,h,f,p,v,M=t.value;return null!=(R=n.options_)&&R.bound&&(M=M.bind(null!=(v=e.proxy_)?v:e.target_)),{value:eK(null!=(c=null==(u=n.options_)?void 0:u.name)?c:r.toString(),M,null!=(l=null==(h=n.options_)?void 0:h.autoAction)&&l,null!=(f=n.options_)&&f.bound?null!=(p=e.proxy_)?p:e.target_:void 0),configurable:!o||e.isPlainObject_,enumerable:!1,writable:!o}}function ep(e,n){return{annotationType_:e,options_:n,make_:ev,extend_:eM}}function ev(e,n,r,t){if(t===e.target_)return null===this.extend_(e,n,r,!1)?0:2;if(null!=(o=this.options_)&&o.bound&&(!I(e.target_,n)||!n9(e.target_[n]))&&null===this.extend_(e,n,r,!1))return 0;if(n9(r.value))return 1;var o,a=eD(e,this,n,r,!1,!1);return b(t,n,a),2}function eM(e,n,r,t){var o,a=eD(e,this,n,r,null==(o=this.options_)?void 0:o.bound);return e.defineProperty_(n,a,t)}function eD(e,n,r,t,o,a){void 0===a&&(a=nl.safeDescriptors),i=0,s=n,d=0,R=t,s.annotationType_,R.value;var i,s,d,R,c,u=t.value;return!n9(u)&&(u=n6(u)),o&&((u=u.bind(null!=(c=e.proxy_)?c:e.target_)).isMobXFlow=!0),{value:u,configurable:!a||e.isPlainObject_,enumerable:!1,writable:!a}}function eg(e,n){return{annotationType_:e,options_:n,make_:e_,extend_:eb}}function e_(e,n,r){return null===this.extend_(e,n,r,!1)?0:1}function eb(e,n,r,t){return function(e,n,r,t){n.annotationType_,t.get}(e,this,n,r),e.defineComputedProperty_(n,K({},this.options_,{get:r.get,set:r.set}),t)}function eH(e,n){return{annotationType_:e,options_:n,make_:eX,extend_:em}}function eX(e,n,r){return null===this.extend_(e,n,r,!1)?0:1}function em(e,n,r,t){var o,a;return function(e,n,r,t){n.annotationType_}(e,this,n,r),e.defineObservableProperty_(n,r.value,null!=(o=null==(a=this.options_)?void 0:a.enhancer)?o:es,t)}var ey=eS();function eS(e){return{annotationType_:"true",options_:e,make_:eT,extend_:eG}}function eT(e,n,r,t){if(r.get)return eW.make_(e,n,r,t);if(r.set){var o,a,i,s,d,R=eK(n.toString(),r.set);return t===e.target_?null===e.defineProperty_(n,{configurable:!nl.safeDescriptors||e.isPlainObject_,set:R})?0:2:(b(t,n,{configurable:!0,set:R}),2)}if(t!==e.target_&&"function"==typeof r.value){if(E(r.value)){;return(null!=(s=this.options_)&&s.autoBind?n6.bound:n6).make_(e,n,r,t)}return(null!=(i=this.options_)&&i.autoBind?nk.bound:nk).make_(e,n,r,t)}var c=(null==(o=this.options_)?void 0:o.deep)===!1?ek.ref:ek;return"function"==typeof r.value&&null!=(a=this.options_)&&a.autoBind&&(r.value=r.value.bind(null!=(d=e.proxy_)?d:e.target_)),c.make_(e,n,r,t)}function eG(e,n,r,t){var o,a,i;if(r.get)return eW.extend_(e,n,r,t);if(r.set)return e.defineProperty_(n,{configurable:!nl.safeDescriptors||e.isPlainObject_,set:eK(n.toString(),r.set)},t);return"function"==typeof r.value&&null!=(o=this.options_)&&o.autoBind&&(r.value=r.value.bind(null!=(i=e.proxy_)?i:e.target_)),((null==(a=this.options_)?void 0:a.deep)===!1?ek.ref:ek).extend_(e,n,r,t)}var eP={deep:!0,name:void 0,defaultDecorator:void 0,proxy:!0};function eA(e){return e||eP}Object.freeze(eP);var eO=eH("observable"),ew=eH("observable.ref",{enhancer:ed}),eV=eH("observable.shallow",{enhancer:function(e,n,r){return null==e||r5(e)||rW(e)||rz(e)||rq(e)?e:Array.isArray(e)?ek.array(e,{name:r,deep:!1}):V(e)?ek.object(e,void 0,{name:r,deep:!1}):k(e)?ek.map(e,{name:r,deep:!1}):C(e)?ek.set(e,{name:r,deep:!1}):void 0}}),eE=eH("observable.struct",{enhancer:function(e,n){return ta(e,n)?n:e}}),ex=ee(eO);function eL(e){return!0===e.deep?es:!1===e.deep?ed:function(e){var n,r;return e&&null!=(n=null==(r=e.options_)?void 0:r.enhancer)?n:es}(e.defaultDecorator)}function eF(e,n,r){if(O(n)){en(e,n,eO);return}return function(e){return rt(e)}(e)?e:V(e)?ek.object(e,n,r):Array.isArray(e)?ek.array(e,n):k(e)?ek.map(e,n):C(e)?ek.set(e,n):"object"==typeof e&&null!==e?e:ek.box(e,n)}g(eF,ex);var ek=g(eF,{box:function(e,n){var r=n||eP;return new e0(e,eL(r),r.name,!0,r.equals)},array:function(e,n){var r=n||eP;return(!1===nl.useProxies||!1===r.proxy?function(e,n,r){return new r4(e,n,r)}:function(e,n,r,t){void 0===r&&(r="ObservableArray"),void 0===t&&(t=!1),T();var o=new rx(r,n,t,!1);L(o.values_,er,o);var a=new Proxy(o.values_,rE);if(o.proxy_=a,e&&e.length){var i=eQ(!0);o.spliceWithArray_(0,0,e),e$(i)}return a})(e,eL(r),r.name)},map:function(e,n){var r=n||eP;return new rU(e,eL(r),r.name)},set:function(e,n){var r=n||eP;return new rZ(e,eL(r),r.name)},object:function(e,n,r){return nJ(!1===nl.useProxies||(null==r?void 0:r.proxy)===!1?r$({},r):function(e,n){var r,t;return T(),null!=(t=(r=(e=r$(e,n))[er]).proxy_)?t:r.proxy_=new Proxy(e,rH)}({},r),e,n)},ref:ee(ew),shallow:ee(eV),deep:ex,struct:ee(eE)}),eC="computed",ej=eg(eC),eN=eg("computed.struct",{equals:ei.structural}),eW=function(e,n){if(O(n))return en(e,n,ej);if(V(e))return ee(eg(eC,e));var r=V(n)?n:{};return r.get=e,r.name||(r.name=e.name||""),new e5(r)};Object.assign(eW,ej),eW.struct=ee(eN);var eI=0,eB=1,eU=null!=(o=null==(a=_(function(){},"name"))?void 0:a.configurable)&&o,ez={value:"action",configurable:!0,writable:!1,enumerable:!1};function eK(e,n,r,t){void 0===r&&(r=!1);function o(){return eZ(e,r,n,t||this,arguments)}return o.isMobxAction=!0,eU&&(ez.value=e,b(o,"name",ez)),o}function eZ(e,n,r,t,o){var a=eq(e,n,t,o);try{return r.apply(t,o)}catch(e){throw a.error_=e,e}finally{eJ(a)}}function eq(e,n,r,t){var o=nl.trackingDerivation,a=!n||!o;nM();var i=nl.allowStateChanges;a&&(nt(),i=eQ(!0));var s={runAsAction_:a,prevDerivation_:o,prevAllowStateChanges_:i,prevAllowStateReads_:na(!0),notifySpy_:!1,startTime_:0,actionId_:eB++,parentActionId_:eI};return eI=s.actionId_,s}function eJ(e){eI!==e.actionId_&&t(30),eI=e.parentActionId_,void 0!==e.error_&&(nl.suppressReactionErrors=!0),e$(e.prevAllowStateChanges_),ni(e.prevAllowStateReads_),nD(),e.runAsAction_&&no(e.prevDerivation_);nl.suppressReactionErrors=!1}function eY(e,n){var r=eQ(e);try{return n()}finally{e$(r)}}function eQ(e){var n=nl.allowStateChanges;return nl.allowStateChanges=e,n}function e$(e){nl.allowStateChanges=e}i=Symbol.toPrimitive;var e0=function(e){function n(n,r,t,o,a){var i;return void 0===t&&(t="ObservableValue"),void 0===o&&(o=!0),void 0===a&&(a=ei.default),(i=e.call(this,t)||this).enhancer=void 0,i.name_=void 0,i.equals=void 0,i.hasUnreportedChange_=!1,i.interceptors_=void 0,i.changeListeners_=void 0,i.value_=void 0,i.dehancer=void 0,i.enhancer=r,i.name_=t,i.equals=a,i.value_=r(n,void 0,t),i}Z(n,e);var r=n.prototype;return r.dehanceValue=function(e){return void 0!==this.dehancer?this.dehancer(e):e},r.set=function(e){if(this.value_,(e=this.prepareNewValue_(e))!==nl.UNCHANGED){(function(){;})();this.setNewValue_(e)}},r.prepareNewValue_=function(e){if(e8(this),rX(this)){var n=ry(this,{object:this,type:rV,newValue:e});if(!n)return nl.UNCHANGED;e=n.newValue}return e=this.enhancer(e,this.value_,this.name_),this.equals(this.value_,e)?nl.UNCHANGED:e},r.setNewValue_=function(e){var n=this.value_;this.value_=e,this.reportChanged(),rS(this)&&rG(this,{type:rV,object:this,newValue:e,oldValue:n})},r.get=function(){return this.reportObserved(),this.dehanceValue(this.value_)},r.intercept_=function(e){return rm(this,e)},r.observe_=function(e,n){return n&&e({observableKind:"value",debugObjectName:this.name_,object:this,type:rV,newValue:this.value_,oldValue:void 0}),rT(this,e)},r.raw=function(){return this.value_},r.toJSON=function(){return this.get()},r.toString=function(){return this.name_+"["+this.value_+"]"},r.valueOf=function(){return W(this.get())},r[i]=function(){return this.valueOf()},n}(et),e1=F("ObservableValue",e0);s=Symbol.toPrimitive;var e5=function(){function e(e){this.dependenciesState_=d.NOT_TRACKING_,this.observing_=[],this.newObserving_=null,this.isBeingObserved_=!1,this.isPendingUnobservation_=!1,this.observers_=new Set,this.diffValue_=0,this.runId_=0,this.lastAccessedBy_=0,this.lowestObserverState_=d.UP_TO_DATE_,this.unboundDepsCount_=0,this.value_=new e2(null),this.name_=void 0,this.triggeredBy_=void 0,this.isComputing_=!1,this.isRunningSetter_=!1,this.derivation=void 0,this.setter_=void 0,this.isTracing_=e6.NONE,this.scope_=void 0,this.equals_=void 0,this.requiresReaction_=void 0,this.keepAlive_=void 0,this.onBOL=void 0,this.onBUOL=void 0,!e.get&&t(31),this.derivation=e.get,this.name_=e.name||"ComputedValue",e.set&&(this.setter_=eK("ComputedValue-setter",e.set)),this.equals_=e.equals||(e.compareStructural||e.struct?ei.structural:ei.default),this.scope_=e.context,this.requiresReaction_=e.requiresReaction,this.keepAlive_=!!e.keepAlive}var n=e.prototype;return n.onBecomeStale_=function(){(function(e){if(e.lowestObserverState_===d.UP_TO_DATE_)e.lowestObserverState_=d.POSSIBLY_STALE_,e.observers_.forEach(function(e){e.dependenciesState_===d.UP_TO_DATE_&&(e.dependenciesState_=d.POSSIBLY_STALE_,e.onBecomeStale_())})})(this)},n.onBO=function(){this.onBOL&&this.onBOL.forEach(function(e){return e()})},n.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(e){return e()})},n.get=function(){if(this.isComputing_&&t(32,this.name_,this.derivation),0!==nl.inBatch||0!==this.observers_.size||this.keepAlive_){if(ng(this),e9(this)){var e=nl.trackingContext;this.keepAlive_&&!e&&(nl.trackingContext=this),this.trackAndCompute()&&function(e){if(e.lowestObserverState_!==d.STALE_)e.lowestObserverState_=d.STALE_,e.observers_.forEach(function(n){n.dependenciesState_===d.POSSIBLY_STALE_?n.dependenciesState_=d.STALE_:n.dependenciesState_===d.UP_TO_DATE_&&(e.lowestObserverState_=d.UP_TO_DATE_)})}(this),nl.trackingContext=e}}else e9(this)&&(this.warnAboutUntrackedRead_(),nM(),this.value_=this.computeValue_(!1),nD());var n=this.value_;if(e3(n))throw n.cause;return n},n.set=function(e){if(this.setter_){this.isRunningSetter_&&t(33,this.name_),this.isRunningSetter_=!0;try{this.setter_.call(this.scope_,e)}finally{this.isRunningSetter_=!1}}else t(34,this.name_)},n.trackAndCompute=function(){var e=this.value_,n=this.dependenciesState_===d.NOT_TRACKING_,r=this.computeValue_(!0),t=n||e3(e)||e3(r)||!this.equals_(e,r);return t&&(this.value_=r),t},n.computeValue_=function(e){this.isComputing_=!0;var n,r=eQ(!1);if(e)n=ne(this,this.derivation,this.scope_);else if(!0===nl.disableErrorBoundaries)n=this.derivation.call(this.scope_);else try{n=this.derivation.call(this.scope_)}catch(e){n=new e2(e)}return e$(r),this.isComputing_=!1,n},n.suspend_=function(){!this.keepAlive_&&(nn(this),this.value_=void 0)},n.observe_=function(e,n){var r=this,t=!0,o=void 0;return nN(function(){var a=r.get();if(!t||n){var i=nt();e({observableKind:"computed",debugObjectName:r.name_,type:rV,object:r,newValue:a,oldValue:o}),no(i)}t=!1,o=a})},n.warnAboutUntrackedRead_=function(){},n.toString=function(){return this.name_+"["+this.derivation.toString()+"]"},n.valueOf=function(){return W(this.get())},n[s]=function(){return this.valueOf()},e}(),e7=F("ComputedValue",e5);(h=d||(d={}))[h.NOT_TRACKING_=-1]="NOT_TRACKING_",h[h.UP_TO_DATE_=0]="UP_TO_DATE_",h[h.POSSIBLY_STALE_=1]="POSSIBLY_STALE_",h[h.STALE_=2]="STALE_";var e6={NONE:0,0:"NONE",LOG:1,1:"LOG",BREAK:2,2:"BREAK"},e2=function(e){this.cause=void 0,this.cause=e};function e3(e){return e instanceof e2}function e9(e){switch(e.dependenciesState_){case d.UP_TO_DATE_:return!1;case d.NOT_TRACKING_:case d.STALE_:return!0;case d.POSSIBLY_STALE_:for(var n=na(!0),r=nt(),t=e.observing_,o=t.length,a=0;a<o;a++){var i=t[a];if(e7(i)){if(nl.disableErrorBoundaries)i.get();else try{i.get()}catch(e){return no(r),ni(n),!0}if(e.dependenciesState_===d.STALE_)return no(r),ni(n),!0}}return ns(e),no(r),ni(n),!1}}function e4(){return null!==nl.trackingDerivation}function e8(e){}function ne(e,n,r){var t,o=na(!0);ns(e),e.newObserving_=Array(e.observing_.length+100),e.unboundDepsCount_=0,e.runId_=++nl.runId;var a=nl.trackingDerivation;if(nl.trackingDerivation=e,nl.inBatch++,!0===nl.disableErrorBoundaries)t=n.call(r);else try{t=n.call(r)}catch(e){t=new e2(e)}return nl.inBatch--,nl.trackingDerivation=a,function(e){for(var n=e.observing_,r=e.observing_=e.newObserving_,t=d.UP_TO_DATE_,o=0,a=e.unboundDepsCount_,i=0;i<a;i++){var s=r[i];0===s.diffValue_&&(s.diffValue_=1,o!==i&&(r[o]=s),o++),s.dependenciesState_>t&&(t=s.dependenciesState_)}for(r.length=o,e.newObserving_=null,a=n.length;a--;){var R=n[a];0===R.diffValue_&&np(R,e),R.diffValue_=0}for(;o--;){var c=r[o];1===c.diffValue_&&(c.diffValue_=0,function(e,n){e.observers_.add(n),e.lowestObserverState_>n.dependenciesState_&&(e.lowestObserverState_=n.dependenciesState_)}(c,e))}t!==d.UP_TO_DATE_&&(e.dependenciesState_=t,e.onBecomeStale_())}(e),ni(o),t}function nn(e){var n=e.observing_;e.observing_=[];for(var r=n.length;r--;)np(n[r],e);e.dependenciesState_=d.NOT_TRACKING_}function nr(e){var n=nt();try{return e()}finally{no(n)}}function nt(){var e=nl.trackingDerivation;return nl.trackingDerivation=null,e}function no(e){nl.trackingDerivation=e}function na(e){var n=nl.allowStateReads;return nl.allowStateReads=e,n}function ni(e){nl.allowStateReads=e}function ns(e){if(e.dependenciesState_!==d.UP_TO_DATE_){e.dependenciesState_=d.UP_TO_DATE_;for(var n=e.observing_,r=n.length;r--;)n[r].lowestObserverState_=d.UP_TO_DATE_}}var nd=["mobxGuid","spyListeners","enforceActions","computedRequiresReaction","reactionRequiresObservable","observableRequiresReaction","allowStateReads","disableErrorBoundaries","runId","UNCHANGED","useProxies"],nR=function(){this.version=6,this.UNCHANGED={},this.trackingDerivation=null,this.trackingContext=null,this.runId=0,this.mobxGuid=0,this.inBatch=0,this.pendingUnobservations=[],this.pendingReactions=[],this.isRunningReactions=!1,this.allowStateChanges=!1,this.allowStateReads=!0,this.enforceActions=!0,this.spyListeners=[],this.globalReactionErrorHandlers=[],this.computedRequiresReaction=!1,this.reactionRequiresObservable=!1,this.observableRequiresReaction=!1,this.disableErrorBoundaries=!1,this.suppressReactionErrors=!1,this.useProxies=!0,this.verifyProxies=!1,this.safeDescriptors=!0,this.stateVersion=Number.MIN_SAFE_INTEGER},nc=!0,nu=!1;var nl=((f=D()).__mobxInstanceCount>0&&!f.__mobxGlobals&&(nc=!1),f.__mobxGlobals&&f.__mobxGlobals.version!==new nR().version&&(nc=!1),nc)?f.__mobxGlobals?(f.__mobxInstanceCount+=1,!f.__mobxGlobals.UNCHANGED&&(f.__mobxGlobals.UNCHANGED={}),f.__mobxGlobals):(f.__mobxInstanceCount=1,f.__mobxGlobals=new nR):(setTimeout(function(){!nu&&t(35)},1),new nR);function nh(){return nl}function nf(){var e=new nR;for(var n in e)-1===nd.indexOf(n)&&(nl[n]=e[n]);nl.allowStateChanges=!nl.enforceActions}function np(e,n){e.observers_.delete(n),0===e.observers_.size&&nv(e)}function nv(e){!1===e.isPendingUnobservation_&&(e.isPendingUnobservation_=!0,nl.pendingUnobservations.push(e))}function nM(){nl.inBatch++}function nD(){if(0==--nl.inBatch){nm();for(var e=nl.pendingUnobservations,n=0;n<e.length;n++){var r=e[n];r.isPendingUnobservation_=!1,0===r.observers_.size&&(r.isBeingObserved_&&(r.isBeingObserved_=!1,r.onBUO()),r instanceof e5&&r.suspend_())}nl.pendingUnobservations=[]}}function ng(e){n=0;var n,r=nl.trackingDerivation;return null!==r?(r.runId_!==e.lastAccessedBy_&&(e.lastAccessedBy_=r.runId_,r.newObserving_[r.unboundDepsCount_++]=e,!e.isBeingObserved_&&nl.trackingContext&&(e.isBeingObserved_=!0,e.onBO())),e.isBeingObserved_):(0===e.observers_.size&&nl.inBatch>0&&nv(e),!1)}function n_(e){if(e.lowestObserverState_!==d.STALE_)e.lowestObserverState_=d.STALE_,e.observers_.forEach(function(e){e.dependenciesState_===d.UP_TO_DATE_&&e.onBecomeStale_(),e.dependenciesState_=d.STALE_})}var nb=function(){function e(e,n,r,t){void 0===e&&(e="Reaction"),this.name_=void 0,this.onInvalidate_=void 0,this.errorHandler_=void 0,this.requiresObservable_=void 0,this.observing_=[],this.newObserving_=[],this.dependenciesState_=d.NOT_TRACKING_,this.diffValue_=0,this.runId_=0,this.unboundDepsCount_=0,this.isDisposed_=!1,this.isScheduled_=!1,this.isTrackPending_=!1,this.isRunning_=!1,this.isTracing_=e6.NONE,this.name_=e,this.onInvalidate_=n,this.errorHandler_=r,this.requiresObservable_=t}var n=e.prototype;return n.onBecomeStale_=function(){this.schedule_()},n.schedule_=function(){!this.isScheduled_&&(this.isScheduled_=!0,nl.pendingReactions.push(this),nm())},n.isScheduled=function(){return this.isScheduled_},n.runReaction_=function(){if(!this.isDisposed_){nM(),this.isScheduled_=!1;var e=nl.trackingContext;if(nl.trackingContext=this,e9(this)){this.isTrackPending_=!0;try{this.onInvalidate_()}catch(e){this.reportExceptionInDerivation_(e)}}nl.trackingContext=e,nD()}},n.track=function(e){if(!this.isDisposed_){nM(),function(){;}();this.isRunning_=!0;var n=nl.trackingContext;nl.trackingContext=this;var r=ne(this,e,void 0);nl.trackingContext=n,this.isRunning_=!1,this.isTrackPending_=!1,this.isDisposed_&&nn(this),e3(r)&&this.reportExceptionInDerivation_(r.cause);nD()}},n.reportExceptionInDerivation_=function(e){var n=this;if(this.errorHandler_){this.errorHandler_(e,this);return}if(nl.disableErrorBoundaries)throw e;nl.suppressReactionErrors;nl.globalReactionErrorHandlers.forEach(function(r){return r(e,n)})},n.dispose=function(){!this.isDisposed_&&(this.isDisposed_=!0,!this.isRunning_&&(nM(),nn(this),nD()))},n.getDisposer_=function(){var e=this.dispose.bind(this);return e[er]=this,e},n.toString=function(){return"Reaction["+this.name_+"]"},n.trace=function(e){void 0===e&&(e=!1),rM(this,e)},e}();function nH(e){return nl.globalReactionErrorHandlers.push(e),function(){var n=nl.globalReactionErrorHandlers.indexOf(e);n>=0&&nl.globalReactionErrorHandlers.splice(n,1)}}var nX=function(e){return e()};function nm(){if(!(nl.inBatch>0)&&!nl.isRunningReactions)nX(ny)}function ny(){nl.isRunningReactions=!0;for(var e=nl.pendingReactions,n=0;e.length>0;){100==++n&&e.splice(0);for(var r=e.splice(0),t=0,o=r.length;t<o;t++)r[t].runReaction_()}nl.isRunningReactions=!1}var nS=F("Reaction",nb);function nT(){return!1}function nG(e){return function(){}}var nP="action",nA="autoAction",nO="<unnamed action>",nw=eu(nP),nV=eu("action.bound",{bound:!0}),nE=eu(nA,{autoAction:!0}),nx=eu("autoAction.bound",{autoAction:!0,bound:!0});function nL(e){return function(n,r){return A(n)?eK(n.name||nO,n,e):A(r)?eK(n,r,e):O(r)?en(n,r,e?nE:nw):O(n)?ee(eu(e?nA:nP,{name:n,autoAction:e})):void 0}}var nF=nL(!1);Object.assign(nF,nw);var nk=nL(!0);function nC(e){return eZ(e.name||nO,!1,e,this,void 0)}function nj(e){return A(e)&&!0===e.isMobxAction}function nN(e,n){void 0===n&&(n=m);var r,t,o,a=null!=(r=null==(t=n)?void 0:t.name)?r:"Autorun";if(!n.scheduler&&!n.delay)o=new nb(a,function(){this.track(d)},n.onError,n.requiresObservable);else{var i=nI(n),s=!1;o=new nb(a,function(){!s&&(s=!0,i(function(){s=!1,!o.isDisposed_&&o.track(d)}))},n.onError,n.requiresObservable)}function d(){e(o)}return o.schedule_(),o.getDisposer_()}Object.assign(nk,nE),nF.bound=ee(nV),nk.bound=ee(nx);var nW=function(e){return e()};function nI(e){return e.scheduler?e.scheduler:e.delay?function(n){return setTimeout(n,e.delay)}:nW}function nB(e,n,r){void 0===r&&(r=m);var t,o,a,i=null!=(t=r.name)?t:"Reaction",s=nF(i,r.onError?function(e,n){return function(){try{return n.apply(this,arguments)}catch(n){e.call(this,n)}}}(r.onError,n):n),d=!r.scheduler&&!r.delay,R=nI(r),c=!0,u=!1,l=r.compareStructural?ei.structural:r.equals||ei.default,h=new nb(i,function(){c||d?f():!u&&(u=!0,R(f))},r.onError,r.requiresObservable);function f(){if(u=!1,!h.isDisposed_){var n=!1;h.track(function(){var r=eY(!1,function(){return e(h)});n=c||!l(o,r),a=o,o=r}),c&&r.fireImmediately?s(o,a,h):!c&&n&&s(o,a,h),c=!1}}return h.schedule_(),h.getDisposer_()}function nU(e,n,r){return nK("onBO",e,n,r)}function nz(e,n,r){return nK("onBUO",e,n,r)}function nK(e,n,r,t){var o="function"==typeof t?tn(n,r):tn(n),a=A(t)?t:r,i=e+"L";return o[i]?o[i].add(a):o[i]=new Set([a]),function(){var e=o[i];e&&(e.delete(a),0===e.size&&delete o[i])}}var nZ="always";function nq(e){!0===e.isolateGlobalState&&!function(){if((nl.pendingReactions.length||nl.inBatch||nl.isRunningReactions)&&t(36),nu=!0,nc){var e=D();0==--e.__mobxInstanceCount&&(e.__mobxGlobals=void 0),nl=new nR}}();var n,r,o=e.useProxies,a=e.enforceActions;if(void 0!==o&&(nl.useProxies=o===nZ||"never"!==o&&"undefined"!=typeof Proxy),"ifavailable"===o&&(nl.verifyProxies=!0),void 0!==a){var i=a===nZ?nZ:"observed"===a;nl.enforceActions=i,nl.allowStateChanges=!0!==i&&i!==nZ}["computedRequiresReaction","reactionRequiresObservable","observableRequiresReaction","disableErrorBoundaries","safeDescriptors"].forEach(function(n){n in e&&(nl[n]=!!e[n])}),nl.allowStateReads=!nl.observableRequiresReaction;if(e.reactionScheduler){;n=e.reactionScheduler,r=nX,nX=function(e){return n(function(){return r(e)})}}}function nJ(e,n,r,t){var o=B(n),a=r$(e,t)[er];nM();try{N(o).forEach(function(e){a.extend_(e,o[e],!r||!(e in r)||r[e])})}finally{nD()}return e}function nY(e,n){return function e(n){var r={name:n.name_};return n.observing_&&n.observing_.length>0&&(r.dependencies=(function(e){return Array.from(new Set(e))})(n.observing_).map(e)),r}(tn(e,n))}function nQ(e,n){return function e(n){var r,t={name:n.name_};if((r=n).observers_&&r.observers_.size>0)t.observers=Array.from(n.observers_).map(e);return t}(tn(e,n))}var n$=0;function n0(){this.message="FLOW_CANCELLED"}function n1(e){return e instanceof n0}n0.prototype=Object.create(Error.prototype);var n5=ep("flow"),n7=ep("flow.bound",{bound:!0}),n6=Object.assign(function(e,n){if(O(n))return en(e,n,n5);var r=e.name||"<unnamed flow>",t=function(){var n,t=arguments,o=++n$,a=nF(r+" - runid: "+o+" - init",e).apply(this,t),i=void 0,s=new Promise(function(e,t){var s=0;function d(e){var n;i=void 0;try{n=nF(r+" - runid: "+o+" - yield "+s++,a.next).call(a,e)}catch(e){return t(e)}c(n)}function R(e){var n;i=void 0;try{n=nF(r+" - runid: "+o+" - yield "+s++,a.throw).call(a,e)}catch(e){return t(e)}c(n)}function c(n){if(A(null==n?void 0:n.then)){n.then(c,t);return}return n.done?e(n.value):(i=Promise.resolve(n.value)).then(d,R)}n=t,d(void 0)});return s.cancel=nF(r+" - runid: "+o+" - cancel",function(){try{i&&n2(i);var e=a.return(void 0),r=Promise.resolve(e.value);r.then(P,P),n2(r),n(new n0)}catch(e){n(e)}}),s};return t.isMobXFlow=!0,t},n5);function n2(e){A(e.cancel)&&e.cancel()}function n3(e){return e}function n9(e){return(null==e?void 0:e.isMobXFlow)===!0}function n4(e,n,r){var t;return rz(e)||rW(e)||e1(e)?t=tr(e):r5(e)&&(t=tr(e,n)),t.dehancer="function"==typeof n?n:r,function(){t.dehancer=void 0}}function n8(e,n,r){return A(r)?function(e,n,r){return tr(e,n).intercept_(r)}(e,n,r):function(e,n){return tr(e).intercept_(n)}(e,n)}n6.bound=ee(n7);function re(e,n){return void 0===n?e7(e):!!(!1!==r5(e)&&e[er].values_.has(n))&&e7(tn(e,n))}function rn(e){return re(e)}function rr(e,n){return re(e,n)}function rt(e,n){if(!e)return!1;if(void 0!==n)return!!r5(e)&&e[er].values_.has(n);return r5(e)||!!e[er]||eo(e)||nS(e)||e7(e)}function ro(e){return rt(e)}function ra(e,n){return rt(e,n)}function ri(e){return r5(e)?e[er].keys_():rz(e)||rq(e)?Array.from(e.keys()):rW(e)?e.map(function(e,n){return n}):void t(5)}function rs(e){return r5(e)?ri(e).map(function(n){return e[n]}):rz(e)?ri(e).map(function(n){return e.get(n)}):rq(e)?Array.from(e.values()):rW(e)?e.slice():void t(6)}function rd(e){return r5(e)?ri(e).map(function(n){return[n,e[n]]}):rz(e)?ri(e).map(function(n){return[n,e.get(n)]}):rq(e)?Array.from(e.entries()):rW(e)?e.map(function(e,n){return[n,e]}):void t(7)}function rR(e,n){r5(e)?e[er].delete_(n):rz(e)?e.delete(n):rq(e)?e.delete(n):rW(e)?("number"!=typeof n&&(n=parseInt(n,10)),e.splice(n,1)):t(9)}function rc(e,n){if(r5(e))return e[er].has_(n);if(rz(e))return e.has(n);if(rq(e))return e.has(n);else if(rW(e))return n>=0&&n<e.length;t(10)}function ru(e,n){if(!!rc(e,n)){if(r5(e))return e[er].get_(n);if(rz(e))return e.get(n);if(rW(e))return e[n];t(11)}}function rl(e,n,r){if(r5(e))return e[er].defineProperty_(n,r);t(39)}function rh(e){if(r5(e))return e[er].ownKeys_();t(38)}function rf(e,n,r,t){return A(r)?function(e,n,r,t){return tr(e,n).observe_(r,t)}(e,n,r,t):function(e,n,r){return tr(e).observe_(n,r)}(e,n,r)}function rp(e,n,r){return e.set(n,r),r}function rv(e,n){return function e(n,r){if(null==n||"object"!=typeof n||n instanceof Date||!rt(n))return n;if(e1(n)||e7(n))return e(n.get(),r);if(r.has(n))return r.get(n);if(rW(n)){var t=rp(r,n,Array(n.length));return n.forEach(function(n,o){t[o]=e(n,r)}),t}if(rq(n)){var o=rp(r,n,new Set);return n.forEach(function(n){o.add(e(n,r))}),o}if(rz(n)){var a=rp(r,n,new Map);return n.forEach(function(n,t){a.set(t,e(n,r))}),a}var i=rp(r,n,{});return rh(n).forEach(function(t){H.propertyIsEnumerable.call(n,t)&&(i[t]=e(n[t],r))}),i}(e,new Map)}function rM(){t("trace() is not available in production builds");for(var e=!1,n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];"boolean"==typeof r[r.length-1]&&(e=r.pop());var a=function(e){switch(e.length){case 0:return nl.trackingDerivation;case 1:return tn(e[0]);case 2:return tn(e[0],e[1])}}(r);if(!a)return t("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");a.isTracing_,e6.NONE,a.isTracing_=e?e6.BREAK:e6.LOG}function rD(e,n){void 0===n&&(n=void 0),nM();try{return e.apply(n)}finally{nD()}}function rg(e,n,r){return 1==arguments.length||n&&"object"==typeof n?function(e,n){if(null!=n&&null!=(r=n.signal)&&r.aborted)return Object.assign(Promise.reject(Error("WHEN_ABORTED")),{cancel:function(){return null}});var r,t,o,a=new Promise(function(r,a){var i,s=r_(e,r,K({},n,{onError:a}));t=function(){s(),a(Error("WHEN_CANCELLED"))},o=function(){s(),a(Error("WHEN_ABORTED"))},null==n||null==(i=n.signal)||null==i.addEventListener||i.addEventListener("abort",o)}).finally(function(){var e;return null==n?void 0:null==(e=n.signal)?void 0:null==e.removeEventListener?void 0:e.removeEventListener("abort",o)});return a.cancel=t,a}(e,n):r_(e,n,r||{})}function r_(e,n,r){if("number"==typeof r.timeout){var t,o=Error("WHEN_TIMEOUT");t=setTimeout(function(){if(!i[er].isDisposed_){if(i(),r.onError)r.onError(o);else throw o}},r.timeout)}r.name="When";var a=eK("When-effect",n),i=nN(function(n){eY(!1,e)&&(n.dispose(),t&&clearTimeout(t),a())},r);return i}function rb(e){return e[er]}var rH={has:function(e,n){return e[er].has_(n)},get:function(e,n){return e[er].get_(n)},set:function(e,n,r){var t;if(!O(n))return!1;return null==(t=e[er].set_(n,r,!0))||t},deleteProperty:function(e,n){var r;if(!O(n))return!1;return null==(r=e[er].delete_(n,!0))||r},defineProperty:function(e,n,r){var t;return null==(t=e[er].defineProperty_(n,r))||t},ownKeys:function(e){return e[er].ownKeys_()},preventExtensions:function(e){t(13)}};function rX(e){return void 0!==e.interceptors_&&e.interceptors_.length>0}function rm(e,n){var r=e.interceptors_||(e.interceptors_=[]);return r.push(n),G(function(){var e=r.indexOf(n);-1!==e&&r.splice(e,1)})}function ry(e,n){var r=nt();try{for(var o=[].concat(e.interceptors_||[]),a=0,i=o.length;a<i&&((n=o[a](n))&&!n.type&&t(14),n);a++);return n}finally{no(r)}}function rS(e){return void 0!==e.changeListeners_&&e.changeListeners_.length>0}function rT(e,n){var r=e.changeListeners_||(e.changeListeners_=[]);return r.push(n),G(function(){var e=r.indexOf(n);-1!==e&&r.splice(e,1)})}function rG(e,n){var r=nt(),t=e.changeListeners_;if(!!t){t=t.slice();for(var o=0,a=t.length;o<a;o++)t[o](n);no(r)}}function rP(e,n,r){var t,o,a=r$(e,r)[er];nM();try{;null!=(o=n)||(t=e,I(t,$)||x(t,$,K({},t[$])),n=t[$]),N(n).forEach(function(e){return a.make_(e,n[e])})}finally{nD()}return e}var rA=Symbol("mobx-keys");function rO(e,n,r){if(V(e))return nJ(e,e,n,r);var t=r$(e,r)[er];if(!e[rA]){var o=Object.getPrototypeOf(e),a=new Set([].concat(N(e),N(o)));a.delete("constructor"),a.delete(er),x(o,rA,a)}nM();try{e[rA].forEach(function(e){return t.make_(e,!n||!(e in n)||n[e])})}finally{nD()}return e}var rw="splice",rV="update",rE={get:function(e,n){var r=e[er];return n===er?r:"length"===n?r.getArrayLength_():"string"!=typeof n||isNaN(n)?I(rL,n)?rL[n]:e[n]:r.get_(parseInt(n))},set:function(e,n,r){var t=e[er];return"length"===n&&t.setArrayLength_(r),"symbol"==typeof n||isNaN(n)?e[n]=r:t.set_(parseInt(n),r),!0},preventExtensions:function(){t(15)}},rx=function(){function e(e,n,r,t){void 0===e&&(e="ObservableArray"),this.owned_=void 0,this.legacyMode_=void 0,this.atom_=void 0,this.values_=[],this.interceptors_=void 0,this.changeListeners_=void 0,this.enhancer_=void 0,this.dehancer=void 0,this.proxy_=void 0,this.lastKnownLength_=0,this.owned_=r,this.legacyMode_=t,this.atom_=new et(e),this.enhancer_=function(e,r){return n(e,r,"ObservableArray[..]")}}var n=e.prototype;return n.dehanceValue_=function(e){return void 0!==this.dehancer?this.dehancer(e):e},n.dehanceValues_=function(e){return void 0!==this.dehancer&&e.length>0?e.map(this.dehancer):e},n.intercept_=function(e){return rm(this,e)},n.observe_=function(e,n){return void 0===n&&(n=!1),n&&e({observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:"splice",index:0,added:this.values_.slice(),addedCount:this.values_.length,removed:[],removedCount:0}),rT(this,e)},n.getArrayLength_=function(){return this.atom_.reportObserved(),this.values_.length},n.setArrayLength_=function(e){("number"!=typeof e||isNaN(e)||e<0)&&t("Out of range: "+e);var n=this.values_.length;if(e!==n)if(e>n){for(var r=Array(e-n),o=0;o<e-n;o++)r[o]=void 0;this.spliceWithArray_(n,0,r)}else this.spliceWithArray_(e,n-e)},n.updateArrayLength_=function(e,n){e!==this.lastKnownLength_&&t(16),this.lastKnownLength_+=n,this.legacyMode_&&n>0&&te(e+n+1)},n.spliceWithArray_=function(e,n,r){var t=this;e8(this.atom_);var o=this.values_.length;if(void 0===e?e=0:e>o?e=o:e<0&&(e=Math.max(0,o+e)),n=1==arguments.length?o-e:null==n?0:Math.max(0,Math.min(n,o-e)),void 0===r&&(r=X),rX(this)){var a=ry(this,{object:this.proxy_,type:rw,index:e,removedCount:n,added:r});if(!a)return X;n=a.removedCount,r=a.added}if(r=0===r.length?r:r.map(function(e){return t.enhancer_(e,void 0)}),this.legacyMode_){var i=r.length-n;this.updateArrayLength_(o,i)}var s=this.spliceItemsIntoValues_(e,n,r);return(0!==n||0!==r.length)&&this.notifyArraySplice_(e,r,s),this.dehanceValues_(s)},n.spliceItemsIntoValues_=function(e,n,r){if(r.length<1e4){var t;return(t=this.values_).splice.apply(t,[e,n].concat(r))}var o=this.values_.slice(e,e+n),a=this.values_.slice(e+n);this.values_.length+=r.length-n;for(var i=0;i<r.length;i++)this.values_[e+i]=r[i];for(var s=0;s<a.length;s++)this.values_[e+r.length+s]=a[s];return o},n.notifyArrayChildUpdate_=function(e,n,r){var t=!this.owned_&&!1,o=rS(this),a=o||t?{observableKind:"array",object:this.proxy_,type:rV,debugObjectName:this.atom_.name_,index:e,newValue:n,oldValue:r}:null;this.atom_.reportChanged(),o&&rG(this,a)},n.notifyArraySplice_=function(e,n,r){var t=!this.owned_&&!1,o=rS(this),a=o||t?{observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:rw,index:e,removed:r,added:n,removedCount:r.length,addedCount:n.length}:null;this.atom_.reportChanged(),o&&rG(this,a)},n.get_=function(e){if(!this.legacyMode_||!(e>=this.values_.length))return this.atom_.reportObserved(),this.dehanceValue_(this.values_[e])},n.set_=function(e,n){var r=this.values_;if(this.legacyMode_&&e>r.length&&t(17,e,r.length),e<r.length){e8(this.atom_);var o=r[e];if(rX(this)){var a=ry(this,{type:rV,object:this.proxy_,index:e,newValue:n});if(!a)return;n=a.newValue}(n=this.enhancer_(n,o))!==o&&(r[e]=n,this.notifyArrayChildUpdate_(e,n,o))}else{for(var i=Array(e+1-r.length),s=0;s<i.length-1;s++)i[s]=void 0;i[i.length-1]=n,this.spliceWithArray_(r.length,0,i)}},e}(),rL={clear:function(){return this.splice(0)},replace:function(e){var n=this[er];return n.spliceWithArray_(0,n.values_.length,e)},toJSON:function(){return this.slice()},splice:function(e,n){for(var r=arguments.length,t=Array(r>2?r-2:0),o=2;o<r;o++)t[o-2]=arguments[o];var a=this[er];switch(arguments.length){case 0:return[];case 1:return a.spliceWithArray_(e);case 2:return a.spliceWithArray_(e,n)}return a.spliceWithArray_(e,n,t)},spliceWithArray:function(e,n,r){return this[er].spliceWithArray_(e,n,r)},push:function(){for(var e=this[er],n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return e.spliceWithArray_(e.values_.length,0,r),e.values_.length},pop:function(){return this.splice(Math.max(this[er].values_.length-1,0),1)[0]},shift:function(){return this.splice(0,1)[0]},unshift:function(){for(var e=this[er],n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return e.spliceWithArray_(0,0,r),e.values_.length},reverse:function(){return nl.trackingDerivation&&t(37,"reverse"),this.replace(this.slice().reverse()),this},sort:function(){nl.trackingDerivation&&t(37,"sort");var e=this.slice();return e.sort.apply(e,arguments),this.replace(e),this},remove:function(e){var n=this[er],r=n.dehanceValues_(n.values_).indexOf(e);return!!(r>-1)&&(this.splice(r,1),!0)}};function rF(e,n){"function"==typeof Array.prototype[e]&&(rL[e]=n(e))}function rk(e){return function(){var n=this[er];n.atom_.reportObserved();var r=n.dehanceValues_(n.values_);return r[e].apply(r,arguments)}}function rC(e){return function(n,r){var t=this,o=this[er];return o.atom_.reportObserved(),o.dehanceValues_(o.values_)[e](function(e,o){return n.call(r,e,o,t)})}}function rj(e){return function(){var n=this,r=this[er];r.atom_.reportObserved();var t=r.dehanceValues_(r.values_),o=arguments[0];return arguments[0]=function(e,r,t){return o(e,r,t,n)},t[e].apply(t,arguments)}}rF("concat",rk),rF("flat",rk),rF("includes",rk),rF("indexOf",rk),rF("join",rk),rF("lastIndexOf",rk),rF("slice",rk),rF("toString",rk),rF("toLocaleString",rk),rF("every",rC),rF("filter",rC),rF("find",rC),rF("findIndex",rC),rF("flatMap",rC),rF("forEach",rC),rF("map",rC),rF("some",rC),rF("reduce",rj),rF("reduceRight",rj);var rN=F("ObservableArrayAdministration",rx);function rW(e){return w(e)&&rN(e[er])}var rI={},rB="delete";R=Symbol.iterator,c=Symbol.toStringTag;var rU=function(){function e(e,n,r){var o=this;void 0===n&&(n=es),void 0===r&&(r="ObservableMap"),this.enhancer_=void 0,this.name_=void 0,this[er]=rI,this.data_=void 0,this.hasMap_=void 0,this.keysAtom_=void 0,this.interceptors_=void 0,this.changeListeners_=void 0,this.dehancer=void 0,this.enhancer_=n,this.name_=r,!A(Map)&&t(18),this.keysAtom_=ea("ObservableMap.keys()"),this.data_=new Map,this.hasMap_=new Map,eY(!0,function(){o.merge(e)})}var n=e.prototype;return n.has_=function(e){return this.data_.has(e)},n.has=function(e){var n=this;if(!nl.trackingDerivation)return this.has_(e);var r=this.hasMap_.get(e);if(!r){var t=r=new e0(this.has_(e),ed,"ObservableMap.key?",!1);this.hasMap_.set(e,t),nz(t,function(){return n.hasMap_.delete(e)})}return r.get()},n.set=function(e,n){var r=this.has_(e);if(rX(this)){var t=ry(this,{type:r?rV:"add",object:this,newValue:n,name:e});if(!t)return this;n=t.newValue}return r?this.updateValue_(e,n):this.addValue_(e,n),this},n.delete=function(e){var n=this;if(e8(this.keysAtom_),rX(this)&&!ry(this,{type:rB,object:this,name:e}))return!1;if(this.has_(e)){var r=rS(this),t=r?{observableKind:"map",debugObjectName:this.name_,type:rB,object:this,oldValue:this.data_.get(e).value_,name:e}:null;return rD(function(){var r;n.keysAtom_.reportChanged(),null==(r=n.hasMap_.get(e))||r.setNewValue_(!1),n.data_.get(e).setNewValue_(void 0),n.data_.delete(e)}),r&&rG(this,t),!0}return!1},n.updateValue_=function(e,n){var r=this.data_.get(e);if((n=r.prepareNewValue_(n))!==nl.UNCHANGED){var t=rS(this),o=t?{observableKind:"map",debugObjectName:this.name_,type:rV,object:this,oldValue:r.value_,name:e,newValue:n}:null;r.setNewValue_(n),t&&rG(this,o)}},n.addValue_=function(e,n){var r=this;e8(this.keysAtom_),rD(function(){var t,o=new e0(n,r.enhancer_,"ObservableMap.key",!1);r.data_.set(e,o),n=o.value_,null==(t=r.hasMap_.get(e))||t.setNewValue_(!0),r.keysAtom_.reportChanged()});var t=rS(this),o=t?{observableKind:"map",debugObjectName:this.name_,type:"add",object:this,name:e,newValue:n}:null;t&&rG(this,o)},n.get=function(e){return this.has(e)?this.dehanceValue_(this.data_.get(e).get()):this.dehanceValue_(void 0)},n.dehanceValue_=function(e){return void 0!==this.dehancer?this.dehancer(e):e},n.keys=function(){return this.keysAtom_.reportObserved(),this.data_.keys()},n.values=function(){var e=this,n=this.keys();return ts({next:function(){var r=n.next(),t=r.done,o=r.value;return{done:t,value:t?void 0:e.get(o)}}})},n.entries=function(){var e=this,n=this.keys();return ts({next:function(){var r=n.next(),t=r.done,o=r.value;return{done:t,value:t?void 0:[o,e.get(o)]}}})},n[R]=function(){return this.entries()},n.forEach=function(e,n){for(var r,t=Q(this);!(r=t()).done;){var o=r.value,a=o[0],i=o[1];e.call(n,i,a,this)}},n.merge=function(e){var n=this;return rz(e)&&(e=new Map(e)),rD(function(){V(e)?(function(e){var n=Object.keys(e);if(!j)return n;var r=Object.getOwnPropertySymbols(e);return r.length?[].concat(n,r.filter(function(n){return H.propertyIsEnumerable.call(e,n)})):n})(e).forEach(function(r){return n.set(r,e[r])}):Array.isArray(e)?e.forEach(function(e){var r=e[0],t=e[1];return n.set(r,t)}):k(e)?(e.constructor!==Map&&t(19,e),e.forEach(function(e,r){return n.set(r,e)})):null!=e&&t(20,e)}),this},n.clear=function(){var e=this;rD(function(){nr(function(){for(var n,r=Q(e.keys());!(n=r()).done;){var t=n.value;e.delete(t)}})})},n.replace=function(e){var n=this;return rD(function(){for(var r=function(e){if(k(e)||rz(e))return e;if(Array.isArray(e))return new Map(e);if(!V(e))return t(21,e);else{var n=new Map;for(var r in e)n.set(r,e[r]);return n}}(e),o=new Map,a=!1,i,s=Q(n.data_.keys());!(i=s()).done;){var d=i.value;if(!r.has(d)){if(n.delete(d))a=!0;else{var R=n.data_.get(d);o.set(d,R)}}}for(var c,u=Q(r.entries());!(c=u()).done;){var l=c.value,h=l[0],f=l[1],p=n.data_.has(h);if(n.set(h,f),n.data_.has(h)){var v=n.data_.get(h);o.set(h,v),!p&&(a=!0)}}if(!a){if(n.data_.size!==o.size)n.keysAtom_.reportChanged();else{for(var M=n.data_.keys(),D=o.keys(),g=M.next(),_=D.next();!g.done;){if(g.value!==_.value){n.keysAtom_.reportChanged();break}g=M.next(),_=D.next()}}}n.data_=o}),this},n.toString=function(){return"[object ObservableMap]"},n.toJSON=function(){return Array.from(this)},n.observe_=function(e,n){return rT(this,e)},n.intercept_=function(e){return rm(this,e)},z(e,[{key:"size",get:function(){return this.keysAtom_.reportObserved(),this.data_.size}},{key:c,get:function(){return"Map"}}]),e}(),rz=F("ObservableMap",rU),rK={};u=Symbol.iterator,l=Symbol.toStringTag;var rZ=function(){function e(e,n,r){void 0===n&&(n=es),void 0===r&&(r="ObservableSet"),this.name_=void 0,this[er]=rK,this.data_=new Set,this.atom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.dehancer=void 0,this.enhancer_=void 0,this.name_=r,!A(Set)&&t(22),this.atom_=ea(this.name_),this.enhancer_=function(e,t){return n(e,t,r)},e&&this.replace(e)}var n=e.prototype;return n.dehanceValue_=function(e){return void 0!==this.dehancer?this.dehancer(e):e},n.clear=function(){var e=this;rD(function(){nr(function(){for(var n,r=Q(e.data_.values());!(n=r()).done;){var t=n.value;e.delete(t)}})})},n.forEach=function(e,n){for(var r,t=Q(this);!(r=t()).done;){var o=r.value;e.call(n,o,o,this)}},n.add=function(e){var n=this;if(e8(this.atom_),rX(this)&&!ry(this,{type:"add",object:this,newValue:e}))return this;if(!this.has(e)){rD(function(){n.data_.add(n.enhancer_(e,void 0)),n.atom_.reportChanged()});var r=rS(this),t=r?{observableKind:"set",debugObjectName:this.name_,type:"add",object:this,newValue:e}:null;r&&rG(this,t)}return this},n.delete=function(e){var n=this;if(rX(this)&&!ry(this,{type:rB,object:this,oldValue:e}))return!1;if(this.has(e)){var r=rS(this),t=r?{observableKind:"set",debugObjectName:this.name_,type:rB,object:this,oldValue:e}:null;return rD(function(){n.atom_.reportChanged(),n.data_.delete(e)}),r&&rG(this,t),!0}return!1},n.has=function(e){return this.atom_.reportObserved(),this.data_.has(this.dehanceValue_(e))},n.entries=function(){var e=0,n=Array.from(this.keys()),r=Array.from(this.values());return ts({next:function(){var t=e;return e+=1,t<r.length?{value:[n[t],r[t]],done:!1}:{done:!0}}})},n.keys=function(){return this.values()},n.values=function(){this.atom_.reportObserved();var e=this,n=0,r=Array.from(this.data_.values());return ts({next:function(){return n<r.length?{value:e.dehanceValue_(r[n++]),done:!1}:{done:!0}}})},n.replace=function(e){var n=this;return rq(e)&&(e=new Set(e)),rD(function(){Array.isArray(e)?(n.clear(),e.forEach(function(e){return n.add(e)})):C(e)?(n.clear(),e.forEach(function(e){return n.add(e)})):null!=e&&t("Cannot initialize set from "+e)}),this},n.observe_=function(e,n){return rT(this,e)},n.intercept_=function(e){return rm(this,e)},n.toJSON=function(){return Array.from(this)},n.toString=function(){return"[object ObservableSet]"},n[u]=function(){return this.values()},z(e,[{key:"size",get:function(){return this.atom_.reportObserved(),this.data_.size}},{key:l,get:function(){return"Set"}}]),e}(),rq=F("ObservableSet",rZ),rJ=Object.create(null),rY="remove",rQ=function(){function e(e,n,r,t){void 0===n&&(n=new Map),void 0===t&&(t=ey),this.target_=void 0,this.values_=void 0,this.name_=void 0,this.defaultAnnotation_=void 0,this.keysAtom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.proxy_=void 0,this.isPlainObject_=void 0,this.appliedAnnotations_=void 0,this.pendingKeys_=void 0,this.target_=e,this.values_=n,this.name_=r,this.defaultAnnotation_=t,this.keysAtom_=new et("ObservableObject.keys"),this.isPlainObject_=V(this.target_)}var n=e.prototype;return n.getObservablePropValue_=function(e){return this.values_.get(e).get()},n.setObservablePropValue_=function(e,n){var r=this.values_.get(e);if(r instanceof e5)return r.set(n),!0;if(rX(this)){var t=ry(this,{type:rV,object:this.proxy_||this.target_,name:e,newValue:n});if(!t)return null;n=t.newValue}if((n=r.prepareNewValue_(n))!==nl.UNCHANGED){var o=rS(this),a=o?{type:rV,observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,oldValue:r.value_,name:e,newValue:n}:null;r.setNewValue_(n),o&&rG(this,a)}return!0},n.get_=function(e){return nl.trackingDerivation&&!I(this.target_,e)&&this.has_(e),this.target_[e]},n.set_=function(e,n,r){return(void 0===r&&(r=!1),I(this.target_,e))?this.values_.has(e)?this.setObservablePropValue_(e,n):r?Reflect.set(this.target_,e,n):(this.target_[e]=n,!0):this.extend_(e,{value:n,enumerable:!0,writable:!0,configurable:!0},this.defaultAnnotation_,r)},n.has_=function(e){if(!nl.trackingDerivation)return e in this.target_;this.pendingKeys_||(this.pendingKeys_=new Map);var n=this.pendingKeys_.get(e);return!n&&(n=new e0(e in this.target_,ed,"ObservableObject.key?",!1),this.pendingKeys_.set(e,n)),n.get()},n.make_=function(e,n){if(!0===n&&(n=this.defaultAnnotation_),!1!==n){if(r6(this,n,e),!(e in this.target_)){var r;if(null!=(r=this.target_[$])&&r[e])return;t(1,n.annotationType_,this.name_+"."+e.toString())}for(var o=this.target_;o&&o!==H;){var a=_(o,e);if(a){var i=n.make_(this,e,a,o);if(0===i)return;if(1===i)break}o=Object.getPrototypeOf(o)}r7(this,n,e)}},n.extend_=function(e,n,r,t){if(void 0===t&&(t=!1),!0===r&&(r=this.defaultAnnotation_),!1===r)return this.defineProperty_(e,n,t);r6(this,r,e);var o=r.extend_(this,e,n,t);return o&&r7(this,r,e),o},n.defineProperty_=function(e,n,r){void 0===r&&(r=!1);try{nM();var t=this.delete_(e);if(!t)return t;if(rX(this)){var o=ry(this,{object:this.proxy_||this.target_,name:e,type:"add",newValue:n.value});if(!o)return null;var a=o.newValue;n.value!==a&&(n=K({},n,{value:a}))}if(r){if(!Reflect.defineProperty(this.target_,e,n))return!1}else b(this.target_,e,n);this.notifyPropertyAddition_(e,n.value)}finally{nD()}return!0},n.defineObservableProperty_=function(e,n,r,t){void 0===t&&(t=!1);try{nM();var o=this.delete_(e);if(!o)return o;if(rX(this)){var a=ry(this,{object:this.proxy_||this.target_,name:e,type:"add",newValue:n});if(!a)return null;n=a.newValue}var i=r1(e),s={configurable:!nl.safeDescriptors||this.isPlainObject_,enumerable:!0,get:i.get,set:i.set};if(t){if(!Reflect.defineProperty(this.target_,e,s))return!1}else b(this.target_,e,s);var d=new e0(n,r,"ObservableObject.key",!1);this.values_.set(e,d),this.notifyPropertyAddition_(e,d.value_)}finally{nD()}return!0},n.defineComputedProperty_=function(e,n,r){void 0===r&&(r=!1);try{nM();var t=this.delete_(e);if(!t)return t;if(rX(this)&&!ry(this,{object:this.proxy_||this.target_,name:e,type:"add",newValue:void 0}))return null;n.name||(n.name="ObservableObject.key"),n.context=this.proxy_||this.target_;var o=r1(e),a={configurable:!nl.safeDescriptors||this.isPlainObject_,enumerable:!1,get:o.get,set:o.set};if(r){if(!Reflect.defineProperty(this.target_,e,a))return!1}else b(this.target_,e,a);this.values_.set(e,new e5(n)),this.notifyPropertyAddition_(e,void 0)}finally{nD()}return!0},n.delete_=function(e,n){if(void 0===n&&(n=!1),!I(this.target_,e))return!0;if(rX(this)&&!ry(this,{object:this.proxy_||this.target_,name:e,type:rY}))return null;try{nM();var r,t,o,a=rS(this),i=this.values_.get(e),s=void 0;if(!i&&a&&(s=null==(o=_(this.target_,e))?void 0:o.value),n){if(!Reflect.deleteProperty(this.target_,e))return!1}else delete this.target_[e];if(i&&(this.values_.delete(e),i instanceof e0&&(s=i.value_),n_(i)),this.keysAtom_.reportChanged(),null==(r=this.pendingKeys_)||null==(t=r.get(e))||t.set(e in this.target_),a){var d={type:rY,observableKind:"object",object:this.proxy_||this.target_,debugObjectName:this.name_,oldValue:s,name:e};a&&rG(this,d)}}finally{nD()}return!0},n.observe_=function(e,n){return rT(this,e)},n.intercept_=function(e){return rm(this,e)},n.notifyPropertyAddition_=function(e,n){var r,t,o=rS(this);if(o){var a=o?{type:"add",observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,name:e,newValue:n}:null;o&&rG(this,a)}null==(r=this.pendingKeys_)||null==(t=r.get(e))||t.set(!0),this.keysAtom_.reportChanged()},n.ownKeys_=function(){return this.keysAtom_.reportObserved(),N(this.target_)},n.keys_=function(){return this.keysAtom_.reportObserved(),Object.keys(this.target_)},e}();function r$(e,n){if(I(e,er))return e;var r,t,o,a=null!=(o=null==n?void 0:n.name)?o:"ObservableObject";var i=new rQ(e,new Map,String(a),(r=n)?null!=(t=r.defaultDecorator)?t:eS(r):void 0);return x(e,er,i),e}var r0=F("ObservableObjectAdministration",rQ);function r1(e){return rJ[e]||(rJ[e]={get:function(){return this[er].getObservablePropValue_(e)},set:function(n){return this[er].setObservablePropValue_(e,n)}})}function r5(e){return!!w(e)&&r0(e[er])}function r7(e,n,r){var t;null==(t=e.target_[$])||delete t[r]}function r6(e,n,r){}var r2=r8(0),r3=0,r9=function(){};p=r9,v=Array.prototype,Object.setPrototypeOf?Object.setPrototypeOf(p.prototype,v):void 0!==p.prototype.__proto__?p.prototype.__proto__=v:p.prototype=v;var r4=function(e,n,r){function t(n,r,t,o){void 0===t&&(t="ObservableArray"),void 0===o&&(o=!1),a=e.call(this)||this;var a,i=new rx(t,r,o,!0);if(i.proxy_=J(a),L(J(a),er,i),n&&n.length){var s=eQ(!0);a.spliceWithArray(0,0,n),e$(s)}return Object.defineProperty(J(a),"0",r2),a}Z(t,e);var o=t.prototype;return o.concat=function(){this[er].atom_.reportObserved();for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return Array.prototype.concat.apply(this.slice(),n.map(function(e){return rW(e)?e.slice():e}))},o[r]=function(){var e=this,n=0;return ts({next:function(){return n<e.length?{value:e[n++],done:!1}:{done:!0,value:void 0}}})},z(t,[{key:"length",get:function(){return this[er].getArrayLength_()},set:function(e){this[er].setArrayLength_(e)}},{key:n,get:function(){return"Array"}}]),t}(r9,Symbol.toStringTag,Symbol.iterator);function r8(e){return{enumerable:!1,configurable:!0,get:function(){return this[er].get_(e)},set:function(n){this[er].set_(e,n)}}}Object.entries(rL).forEach(function(e){var n=e[0],r=e[1];"concat"!==n&&x(r4.prototype,n,r)});function te(e){if(e>r3){for(var n,r=r3;r<e+100;r++){;n=r,b(r4.prototype,""+n,r8(n))}r3=e}}te(1e3);function tn(e,n){if("object"==typeof e&&null!==e){if(rW(e))return void 0!==n&&t(23),e[er].atom_;if(rq(e))return e.atom_;if(rz(e)){if(void 0===n)return e.keysAtom_;var r=e.data_.get(n)||e.hasMap_.get(n);return!r&&t(25,n,tt(e)),r}if(r5(e)){if(!n)return t(26);var o=e[er].values_.get(n);return!o&&t(27,n,tt(e)),o}if(eo(e)||e7(e)||nS(e))return e}else if(A(e)&&nS(e[er]))return e[er];t(28)}function tr(e,n){return(!e&&t(29),void 0!==n)?tr(tn(e,n)):eo(e)||e7(e)||nS(e)||rz(e)||rq(e)?e:e[er]?e[er]:void t(24,e)}function tt(e,n){var r;if(void 0!==n)r=tn(e,n);else{if(nj(e))return e.name;r=r5(e)||rz(e)||rq(e)?tr(e):tn(e)}return r.name_}var to=H.toString;function ta(e,n,r){return void 0===r&&(r=-1),function e(n,r,t,o,a){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!=n)return r!=r;var i=typeof n;if("function"!==i&&"object"!==i&&"object"!=typeof r)return!1;var s=to.call(n);if(s!==to.call(r))return!1;switch(s){case"[object RegExp]":case"[object String]":return""+n==""+r;case"[object Number]":if(+n!=+n)return+r!=+r;return 0==+n?1/+n==1/r:+n==+r;case"[object Date]":case"[object Boolean]":return+n==+r;case"[object Symbol]":return"undefined"!=typeof Symbol&&Symbol.valueOf.call(n)===Symbol.valueOf.call(r);case"[object Map]":case"[object Set]":t>=0&&t++}n=ti(n),r=ti(r);var d="[object Array]"===s;if(!d){if("object"!=typeof n||"object"!=typeof r)return!1;var R=n.constructor,c=r.constructor;if(R!==c&&!(A(R)&&R instanceof R&&A(c)&&c instanceof c)&&"constructor"in n&&"constructor"in r)return!1}if(0===t)return!1;t<0&&(t=-1);a=a||[];for(var u=(o=o||[]).length;u--;)if(o[u]===n)return a[u]===r;if(o.push(n),a.push(r),d){if((u=n.length)!==r.length)return!1;for(;u--;)if(!e(n[u],r[u],t-1,o,a))return!1}else{var l,h=Object.keys(n);if(u=h.length,Object.keys(r).length!==u)return!1;for(;u--;)if(!(I(r,l=h[u])&&e(n[l],r[l],t-1,o,a)))return!1}return o.pop(),a.pop(),!0}(e,n,r)}function ti(e){return rW(e)?e.slice():k(e)||rz(e)||C(e)||rq(e)?Array.from(e.entries()):e}function ts(e){return e[Symbol.iterator]=td,e}function td(){return this}["Symbol","Map","Set"].forEach(function(e){void 0===D()[e]&&t("MobX requires global '"+e+"' to be available or polyfilled")}),"object"==typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__&&__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({spy:nG,extras:{getDebugName:tt},$mobx:er})},579657:function(e,n,r){"use strict";r(679308),r.e("16787").then(r.bind(r,146116))},653112:function(e,n,r){"use strict";r(679308),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,522573)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,233505)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,706299)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,327241)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,419200)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,293468)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,959656)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,688802)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,943127)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,399619)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,736743)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,404712)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,368630)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,139663)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,897882)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,506375)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,14327)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,739741)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,33438)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,190173)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,151263)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,122013)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,879875)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,888991)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,568331)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,414885)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,428314)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,577896)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,582389)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,85236)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,212787)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,841364)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,946808)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,633173)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,201394)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,184841)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,808332)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,925006)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,569795)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,938720)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,129040)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,603555)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,572762)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,536917)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,769591)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,124653)),Promise.all([r.e("74792"),r.e("92176"),r.e("64571"),r.e("96537"),r.e("46102"),r.e("28161"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("19452"),r.e("98481"),r.e("20531"),r.e("6873"),r.e("73231")]).then(r.bind(r,539153))},427597:function(e,n,r){"use strict";r(679308),r.e("72327").then(r.bind(r,522573)),r.e("72327").then(r.bind(r,233505)),r.e("72327").then(r.bind(r,706299)),r.e("72327").then(r.bind(r,327241)),r.e("72327").then(r.bind(r,419200)),r.e("72327").then(r.bind(r,293468)),r.e("72327").then(r.bind(r,959656)),r.e("72327").then(r.bind(r,688802)),r.e("72327").then(r.bind(r,943127)),r.e("72327").then(r.bind(r,399619)),r.e("72327").then(r.bind(r,736743)),r.e("72327").then(r.bind(r,404712)),r.e("72327").then(r.bind(r,368630)),r.e("72327").then(r.bind(r,139663)),r.e("72327").then(r.bind(r,897882)),r.e("72327").then(r.bind(r,506375)),r.e("72327").then(r.bind(r,14327)),r.e("72327").then(r.bind(r,739741)),r.e("72327").then(r.bind(r,33438)),r.e("72327").then(r.bind(r,190173)),r.e("72327").then(r.bind(r,151263)),r.e("72327").then(r.bind(r,122013)),r.e("72327").then(r.bind(r,879875)),r.e("72327").then(r.bind(r,888991)),r.e("72327").then(r.bind(r,568331)),r.e("72327").then(r.bind(r,414885)),r.e("72327").then(r.bind(r,428314)),r.e("72327").then(r.bind(r,577896)),r.e("72327").then(r.bind(r,582389)),r.e("72327").then(r.bind(r,85236)),r.e("72327").then(r.bind(r,212787)),r.e("72327").then(r.bind(r,841364)),r.e("72327").then(r.bind(r,946808)),r.e("72327").then(r.bind(r,633173)),r.e("72327").then(r.bind(r,201394)),r.e("72327").then(r.bind(r,184841)),r.e("72327").then(r.bind(r,808332)),r.e("72327").then(r.bind(r,925006)),r.e("72327").then(r.bind(r,569795)),r.e("72327").then(r.bind(r,938720)),r.e("72327").then(r.bind(r,129040)),r.e("72327").then(r.bind(r,603555)),r.e("72327").then(r.bind(r,572762)),r.e("72327").then(r.bind(r,536917)),r.e("72327").then(r.bind(r,769591)),r.e("72327").then(r.bind(r,124653)),r.e("72327").then(r.bind(r,136141))},612729:function(e,n,r){"use strict";r.d(n,{v:function(){return i}});var t=r(466150);let o="object"==typeof self?self:globalThis,a=(e,n)=>{let r=(n,r)=>(e.set(r,n),n),a=i=>{if(e.has(i))return e.get(i);let[s,d]=n[i];switch(s){case t.uk:case t.Zn:return r(d,i);case t.tF:{let e=r([],i);for(let n of d)e.push(a(n));return e}case t.$l:{let e=r({},i);for(let[n,r]of d)e[a(n)]=a(r);return e}case t.Hu:return r(new Date(d),i);case t.o1:{let{source:e,flags:n}=d;return r(new RegExp(e,n),i)}case t.nN:{let e=r(new Map,i);for(let[n,r]of d)e.set(a(n),a(r));return e}case t.JH:{let e=r(new Set,i);for(let n of d)e.add(a(n));return e}case t.pn:{let{name:e,message:n}=d;return r(new o[e](n),i)}case t.EA:return r(BigInt(d),i);case"BigInt":return r(Object(BigInt(d)),i);case"ArrayBuffer":return r(new Uint8Array(d).buffer,d);case"DataView":{let{buffer:e}=new Uint8Array(d);return r(new DataView(e),d)}}return r(new o[s](d),i)};return a},i=e=>a(new Map,e)(0)},72170:function(e,n,r){"use strict";r.d(n,{B:function(){return o}});var t=r(900312);function o(e,n){let r={src:(0,t.F)(n.url)};null!==n.alt&&void 0!==n.alt&&(r.alt=n.alt),null!==n.title&&void 0!==n.title&&(r.title=n.title);let o={type:"element",tagName:"img",properties:r,children:[]};return e.patch(n,o),e.applyData(n,o)}},99312:function(e,n,r){"use strict";r.d(n,{C:function(){return t}});let t={name:"labelStartImage",resolveAll:r(473818).Z.resolveAll,tokenize:function(e,n,r){let t=this;return function(n){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(n),e.exit("labelImageMarker"),o};function o(n){return 91===n?(e.enter("labelMarker"),e.consume(n),e.exit("labelMarker"),e.exit("labelImage"),a):r(n)}function a(e){return 94===e&&"_hiddenFootnoteSupport"in t.parser.constructs?r(e):n(e)}}}},708385:function(e,n,r){"use strict";r.d(n,{E:function(){return a}}),r(932651);var t=r(873781),o=r(304174);class a extends t.XY{compute(e,n){let r;let{cfg:o}=this,a=o.hasher.create(),i=t.Ic.create(),s=i.words,{keySize:d,iterations:R}=o;for(;s.length<d;){r&&a.update(r),r=a.update(e).finalize(n),a.reset();for(let e=1;e<R;e+=1)r=a.finalize(r),a.reset();i.concat(r)}return i.sigBytes=4*d,i}constructor(e){super(),this.cfg=Object.assign(new t.XY,{keySize:4,hasher:o.pt,iterations:1},e)}}}}]);