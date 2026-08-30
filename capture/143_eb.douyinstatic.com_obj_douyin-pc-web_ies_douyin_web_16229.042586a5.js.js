/*! For license information please see 16229.042586a5.js.LICENSE.txt */
!function(e,r){"object"==typeof module&&"object"==typeof module.exports?r():"function"==typeof define&&define.amd?define([],r):(e="undefined"!=typeof globalThis?globalThis:e||self)&&r()}(this,function(){"use strict";"object"==typeof window&&(window.openRedirect={version:"1.2.20",webpackPluginVersion:"3.4.22",reportOnly:!1})}),!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).xss={})}(this,function(e){"use strict";var r=function(){return(r=Object.assign||function(e){for(var r,o=1,t=arguments.length;o<t;o++)for(var n in r=arguments[o])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)};function o(e,r,o){if(o||2==arguments.length)for(var t,n=0,i=r.length;n<i;n++)!t&&n in r||(t||(t=Array.prototype.slice.call(r,0,n)),t[n]=r[n]);return e.concat(t||Array.prototype.slice.call(r))}var t=/[^a-zA-Z0-9\\_:.-]/gim,n=/</g,i=/>/g,c=/&#([a-zA-Z0-9]*);?/gim,G=/&quot;/g,a=/&colon;?/gim,s=/&newline;?/gim,l=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,T=/u\s*r\s*l\s*\(.*/gi,u=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,d=/"/g,F=function(e){return e.replace(n,"&lt;").replace(i,"&gt;")},h={indexOf:function(e,r){var o,t;for(o=0,t=e.length;o<t;o++)if(e[o]===r)return o;return -1},forEach:function(e,r,o){var t,n;for(t=0,n=e.length;t<n;t++)r.call(o,e[t],t,e)},some:function(e,r,o){var t,n;for(t=0,n=e.length;t<n;t++)if(r.call(o,e[t],t,e))return!0;return!1},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},includes:function(e,r){if("string"==typeof e)return -1!==e.indexOf(r);for(var o=0;o<e.length;o++)if(e[o]===r)return!0;return!1},spaceIndex:function(e){var r=/\s|\n|\t/.exec(e);return r?r.index:-1},uniq:function(e){for(var r={},o=[],t=0;t<e.length;t++)r[e[t]]||(o.push(e[t]),r[e[t]]=!0);return o},from:function(e){for(var r=[],o=0;o<e.length;o++)r.push(e[o]);return r},keys:function(e){var r=[];for(var o in e)r.push(o);return r}};function f(e){return null==e}function X(e){var r;return'"'===(r=e)[0]&&'"'===r[r.length-1]||"'"===r[0]&&"'"===r[r.length-1]?e.substr(1,e.length-2):e}function p(e){var r,o,t,n,i,c,G,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="",l=0;for(e=function(e){e=e.replace(/rn/g,"n");for(var r="",o=0;o<e.length;o++){var t=e.charCodeAt(o);t<128?r+=String.fromCharCode(t):t>127&&t<2048?r+=String.fromCharCode(t>>6|192)+String.fromCharCode(63&t|128):r+=String.fromCharCode(t>>12|224)+String.fromCharCode(t>>6&63|128)+String.fromCharCode(63&t|128)}return r}(e);l<e.length;)n=(r=e.charCodeAt(l++))>>2,i=(3&r)<<4|(o=e.charCodeAt(l++))>>4,c=(15&o)<<2|(t=e.charCodeAt(l++))>>6,G=63&t,isNaN(o)?c=G=64:isNaN(t)&&(G=64),s=s+a.charAt(n)+a.charAt(i)+a.charAt(c)+a.charAt(G);return s}function M(e){var r,o,t,n,i,c,G="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a="",s=0;for(e=e.replace(/[^A-Za-z0-9+/=]/g,"");s<e.length;)r=G.indexOf(e.charAt(s++))<<2|(n=G.indexOf(e.charAt(s++)))>>4,o=(15&n)<<4|(i=G.indexOf(e.charAt(s++)))>>2,t=(3&i)<<6|(c=G.indexOf(e.charAt(s++))),a+=String.fromCharCode(r),64!==i&&(a+=String.fromCharCode(o)),64!==c&&(a+=String.fromCharCode(t));return function(e){for(var r="",o=0,t=0,n=0,i=0;o<e.length;)(t=e.charCodeAt(o))<128?(r+=String.fromCharCode(t),o++):t>191&&t<224?(r+=String.fromCharCode((31&t)<<6|63&(i=e.charCodeAt(o+1))),o+=2):(i=e.charCodeAt(o+1),r+=String.fromCharCode((15&t)<<12|(63&i)<<6|63&(n=e.charCodeAt(o+2))),o+=3);return r}(a)}function g(e,r,o){var t="",n=0,i=!1,c=!1,G=0,a=e.length,s="",l="";e:for(G=0;G<a;G++){var T=e.charAt(G);if(!1===i){if("<"===T){i=G;continue}}else if(!1===c){if("<"===T){t+=o(e.slice(n,G)),i=G,n=G;continue}if(">"===T||G===a-1){t+=o(e.slice(n,i)),s=function(e){var r,o=h.spaceIndex(e);return r=-1===o?e.slice(1,-1):e.slice(1,o+1),"/"===(r=h.trim(r).toLowerCase()).slice(0,1)&&(r=r.slice(1)),"/"===r.slice(-1)&&(r=r.slice(0,-1)),r}(l=e.slice(i,G+1)),t+=r(i,t.length,s,l,"</"===l.slice(0,2)),n=G+1,i=!1;continue}if('"'===T||"'"===T)for(var u=1,d=e.charAt(G-u);""===d.trim()||"="===d;){if("="===d){c=T;continue e}d=e.charAt(G-++u)}}else if(T===c){c=!1;continue}}return n<a&&(t+=o(e.substr(n))),t}function b(e,r){var o=0,n=0,i=[],c=!1,G=e.length;function a(e,o){if(!((e=(e=h.trim(e)).replace(t,"").toLowerCase()).length<1)){var n=r(e,o||"");n&&i.push(n)}}for(var s=0;s<G;s++){var l=e.charAt(s),T=void 0;if(!1!==c||"="!==l){if(!1===c||s!==n){if(/\s|\n|\t/.test(l)){if(e=e.replace(/\s|\n|\t/g," "),!1===c){if(-1===(T=function(e,r){for(;r<e.length;r++){var o=e[r];if(" "!==o)return"="===o?r:-1}return -1}(e,s))){a(h.trim(e.slice(o,s))),c=!1,o=s+1;continue}s=T-1;continue}if(-1===(T=function(e,r){for(;r>0;r--){var o=e[r];if(" "!==o)return"="===o?r:-1}return -1}(e,s-1))){a(c,X(h.trim(e.slice(o,s)))),c=!1,o=s+1;continue}}}else{if(-1===(T=e.indexOf(l,s+1)))break;a(c,h.trim(e.slice(n+1,T))),c=!1,o=(s=T)+1}}else c=e.slice(o,s),o=s+1,n='"'===e.charAt(o)||"'"===e.charAt(o)?o:function(e,r){for(;r<e.length;r++){var o=e[r];if(" "!==o)return"'"===o||'"'===o?r:-1}return -1}(e,s+1)}return o<e.length&&(!1===c?a(e.slice(o)):a(c,X(h.trim(e.slice(o))))),h.trim(i.join(" "))}function m(e,r,o){if(o=function(e){return e=function(e){for(var r="",o=0,t=e.length;o<t;o++)r+=32>e.charCodeAt(o)?" ":e.charAt(o);return h.trim(r)}(e=(e=(e=e.replace(G,'"')).replace(c,function(e,r){return"x"===r[0]||"X"===r[0]?String.fromCharCode(parseInt(r.substr(1),16)):String.fromCharCode(parseInt(r,10))})).replace(a,":").replace(s," "))}(o),"href"===r||"src"===r){if("#"===(o=h.trim(o)))return"#";if("http://"!==o.substr(0,7)&&"https://"!==o.substr(0,8)&&"mailto:"!==o.substr(0,7)&&"tel:"!==o.substr(0,4)&&"data:image/"!==o.substr(0,11)&&"ftp://"!==o.substr(0,6)&&"./"!==o.substr(0,2)&&"../"!==o.substr(0,3)&&"#"!==o[0]&&"/"!==o[0])return""}else if("background"===r){if(l.lastIndex=0,l.test(o))return""}else if("style"===r&&(u.lastIndex=0,u.test(o)||(T.lastIndex=0,T.test(o)&&(l.lastIndex=0,l.test(o)))))return"";return o=function(e){return e=F(e=e.replace(d,"&quot;"))}(o)}var v=function(e){return"string"==typeof e?e.replace(/'/g,'"').replace('=""',"").replace(/\s+/g,"").toLowerCase():""},Q=function(){function e(e){var r=function(e){var r={};for(var o in e)r[o]=e[o];return r}(e||{});r.stripIgnoreTag&&(r.onIgnoreTag,r.onIgnoreTag=function(){return""}),r.whiteList={},r.onTag=function(){},r.onTagAttr=function(){},r.onIgnoreTag=function(){},r.onIgnoreTagAttr=function(){},r.safeAttrValue=m,r.escapeHtml=F,this.options=Object.assign(r,e)}return e.prototype.process=function(e){if(!(e=(e=e||"").toString()))return"";var r,o,t,n,i,c,G=this.options,a=G.whiteList,s=G.onTag,l=G.onIgnoreTag,T=G.onTagAttr,u=G.onIgnoreTagAttr,d=G.safeAttrValue,F=G.escapeHtml;G.stripBlankChar&&(e=(r=(r=e.split("")).filter(function(e){var r=e.charCodeAt(0);return!(127===r||r<=31&&10!==r&&13!==r)})).join("")),G.allowCommentTag||(e=function(e){for(var r="",o=0;o<e.length;){var t=e.indexOf("\x3c!--",o);if(-1===t){r+=e.slice(o);break}r+=e.slice(o,t);var n=e.indexOf("--\x3e",t);if(-1===n)break;o=n+3}return r}(e));var f=!1;G.stripIgnoreTagBody&&(o=G.stripIgnoreTagBody,"function"!=typeof(t=l)&&(t=function(){}),n=!Array.isArray(o),i=[],c=!1,l=(f={onIgnoreTag:function(e,r,G){var a;if(a=e,n||-1!==h.indexOf(o,a)){if(G.isClosing){var s="[/removed]",l=G.position+s.length;return i.push([!1!==c?c:G.position,l]),c=!1,s}return c||(c=G.position),"[removed]"}return t(e,r,G)},remove:function(e){var r="",o=0;return h.forEach(i,function(t){r+=e.slice(o,t[0]),o=t[1]}),r+=e.slice(o)}}).onIgnoreTag);var X=g(e,function(e,r,o,t,n){var i={sourcePosition:e,position:r,isClosing:n,isWhite:Object.prototype.hasOwnProperty.call(a,o)},c=s(o,t,i);if(null!=c)return c;if(i.isWhite){if(i.isClosing)return"</".concat(o,">");var G=function(e){var r=h.spaceIndex(e);if(-1===r)return{html:"",closing:"/"===e[e.length-2]};var o="/"===(e=h.trim(e.slice(r+1,-1)))[e.length-1];return o&&(e=h.trim(e.slice(0,-1))),{html:e,closing:o}}(t),f=a[o],X=b(G.html,function(e,r){var t=-1!==h.indexOf(f,e),n=T(o,e,r,t);return null==n?t?(r=d(o,e,r,null))?"".concat(e,'="').concat(r,'"'):e:null==(n=u(o,e,r,t))?void 0:n:n});return t="<".concat(o),X&&(t+=" ".concat(X)),G.closing&&(t+=" /"),t+=">"}return null==(c=l(o,t,i))?F(t):c},F);return f&&(X=f.remove(X)),X},e}(),E=Function("\nvar _checkXSS = function (it) {\n  return it && it.Math == Math && it;\n};\nreturn _checkXSS(typeof globalThis === 'object' && globalThis) ||\n_checkXSS(typeof window === 'object' && window) ||\n_checkXSS(typeof self === 'object' && self) ||\n_checkXSS(typeof global === 'object' && global) ||\nFunction('return this')();\n")(),R=new(function(){function e(){var e=this;this.batchData=[],this.uniqKeys=new Set,this.timeout=2e3,this.lock=!1,this.getSlardarBid=function(){var r,o,t="douyin_web";if(!h.includes(t,"bid"))return t;if(e.config&&e.config.bid)return e.config.bid;if(E&&E._xssBid)return E._xssBid;if(E&&E.slardar&&"function"==typeof E.slardar.config){var n=(E.slardar.config()||{}).bid;if(n)return n}if(E&&E.Slardar&&"function"==typeof E.Slardar.config){var i=(E.Slardar.config()||{}).bid;if(i)return i}return(null===(o=null===(r=null==E?void 0:E.Slardar)||void 0===r?void 0:r._baseParams)||void 0===o?void 0:o.bid)||"argus"},this.getConfigRegion=function(){var r;return h.includes("cn","region")?e.config&&e.config.region?e.config.region:((null===(r=null==E?void 0:E.gfdatav1)||void 0===r?void 0:r.region)||"cn").toLowerCase():"cn"},this.gerReportUrl=function(){var r={cn:M("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boe:M("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),ttp:M("aHR0cHM6Ly9tb24udXMudGlrdG9rdi5jb20vbW9uaXRvcl9icm93c2VyL2NvbGxlY3QvYmF0Y2gvc2VjdXJpdHkvP2JpZD0="),va:M("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),maliva:M("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),sg:M("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boei18n:M("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9")}[e.getConfigRegion()];if(r)return r+e.getSlardarBid()}}return e.prototype.setConfig=function(e){this.config=e},e.prototype.upload=function(){var e=this,r=this.gerReportUrl();!this.lock&&r&&0!==this.batchData.length&&(this.lock=!0,setTimeout(function(){var o=e.batchData.slice(0,100);e.batchData=e.batchData.slice(100),E.fetch(r,{method:"post",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}).catch(function(e){}),e.lock=!1,e.upload()},this.timeout))},e.prototype.generateKey=function(e){return e.collectKey?[e.collectMode,e.collectKey].join("___"):""},e.prototype.push=function(e){this.batchData.push(e),this.upload()},e.prototype.report=function(e){var r=this.generateKey(e);if(E.fetch&&e.collectKey){var o="object"==typeof window?window.location.href:"SSR";e.documentUrl=o;var t={age:Math.floor(Date.now()),type:"xss",url:o,body:e,"user-agent":""};"enforce"===e.disposition&&"SSR"!==o||(t.url=r),"SSR"===o&&(t.url="SSR___".concat(t.url),t.body.ssr=!0),this.push(t)}},e}()),A=function(e){for(var r=0,o=function(o){Array.isArray(e[o])?0===e[o].length?delete e[o]:(e[o]=h.from(h.uniq(e[o])),r+=e[o].length):0===h.keys(e[o]).length?delete e[o]:h.keys(e[o]).forEach(function(t){e[o][t]=h.from(h.uniq(e[o][t])),r+=e[o][t].length})},t=0,n=h.keys(e);t<n.length;t++)o(n[t]);return{count:r,ret:e}};function y(e,r){return R.setConfig(r),new Q(r).process(e)}function P(e){var r,o=(r=/\s|\n|\t/.exec(e))?r.index:-1;if(-1===o)return{html:"",closing:"/"===e[e.length-2]};var t="/"===(e=e.slice(o+1,-1).trim())[e.length-1];return t&&(e=e.slice(0,-1).trim()),{html:e,closing:t}}var S=function(e){return -1===(e=(e=(e=(e=e.replace(/&colon;/gi,":")).replace(/&tab;/gi,"")).replace(/&newline;/gi,"")).replace(/(\t|\n|\r)/g,"")).indexOf("&#")?e.trim().toLowerCase():e.trim().replace(/&#(?:(x)([0-9a-f]+)|([0-9]+));?/gi,function(e,r,o,t){return String.fromCharCode(r?parseInt(o,16):parseInt(t))}).replace(/(\t|\n|\r)/g,"").toLowerCase()};function w(e,r){if(void 0===e&&(e=""),"string"!=typeof e)return!0;if(e=S(e),h.includes(e,"base64")&&!function(e){if(""===e||""===e.trim())return!0;try{return!h.includes(e,"data:text/html;base64")}catch(e){return!0}}(e))return r&&r("data:text/html;base64"),!1;var o=["expression(","behavior:","view-source:"];if(h.some(o,function(r){return -1!==e.indexOf(r)}))return h.forEach(o,function(o){-1!==e.indexOf(o)&&r&&r(o)}),!1;var t=["data:application","data:javascript","data:text/html","data:texthtml"];if(h.some(t,function(r){return -1!==e.indexOf(r)}))return h.forEach(t,function(o){-1!==e.indexOf(o)&&r&&r(o)}),!1;if(e.indexOf("javascript:")>0)return r&&r("javascript:"),!1;if(/^javascript:/i.test(e)){var n=e.slice(11).replace(/\s/g,"").trim();return!!h.some(["void","void(0)","void0","false","undefined",";"],function(e){return e===n})||(r&&r("javascript:"),!1)}return!0}var I=function(e,r){var o,t,n="<%= isSaveValidUrl =>";if("string"!=typeof e||(t=Number("<%= urlLimit =>"),void 0!==o&&(t=o),"NaN"!==e.toString()&&-1!==t&&e.length>=t)||w(e,r))return e;try{if(!0===(n=JSON.parse(n))||"true"===n){var i=new URL(e);return i.origin+i.pathname}}catch(e){}return"#"};function x(e,r,t){if(void 0===e&&(e=""),void 0===r&&(r=[]),"string"!=typeof e)return!0;if(!w(e=S(e)))return!1;var n,i={url:(n=e.match(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)||[])[0],scheme:n[1],slash:n[2],host:n[3],port:n[4],path:n[5],query:n[6],hash:n[7]},c=i.scheme,G=i.host;return t?!!t(e):!(!c||!G)&&(!h.includes(["http","https","file"],c)||("object"==typeof window&&window&&(r=o(o([],r,!0),[location.host],!1)),h.some(r,function(e){return!!(e instanceof RegExp&&e.test(G))||e===G})))}var L={a:["target","title","spellcheck","rel"],canvas:[],abbr:["title"],address:[],area:["shape","coords","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:["dir"],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["alt","title","width","height","decoding"],ins:["datetime"],li:[],mark:[],nav:[],ol:["start"],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],delete:[],form:[],strong:[],mask:["maskunits","x","y","width","height","fill"],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],wbr:[],video:["autoplay","controls","loop","preload","height","width"],svg:["viewBox","version","xmlns","fill","width","height","stroke","stroke-width","style"],path:["d","fill","opacity","stroke","p-id","fill-rule","clip-rule","stroke-width","stroke-linecap","stroke-linejoin","fill-opacity","mask"],rect:["x","y","width","height","fill","stroke","rx"],g:[]},O={collect:null,initCollect:function(){this.collect={whiteList:{},filterProtocol:[]}},removeCollect:function(){var e=A(this.collect),r=e.count,o=e.ret;return this.collect=null,{collectKey:0===r?null:JSON.stringify(o),collectMode:"white"}},onIgnoreTagAttr:function(e,r,t){return e&&h.indexOf(["href","src"],r)>-1?O.domainWhiteList&&Array.isArray(O.domainWhiteList)&&O.domainWhiteList.length>0&&!x(t,o([],O.domainWhiteList,!0))?"":"".concat(r,'="').concat(I(t,function(e){var r;null===(r=O.collect)||void 0===r||r.filterProtocol.push(e)}),'"'):e&&(h.indexOf(["style","class","id"],r)>-1||r.indexOf("data-")>-1)?"".concat(r,'="').concat(t,'"'):(O.collect.whiteList[e]=O.collect.whiteList[e]||[],void O.collect.whiteList[e].push(r))},onIgnoreTag:function(e,r){if("style"===e)return r;g(r,function(e,r,o,t){b(P(t).html.replace("/",""),function(e){O.collect.whiteList[o]=O.collect.whiteList[o]||[],O.collect.whiteList[o].push(e)})},F)},whiteList:L,mergeWhiteList:function(e){for(var r,o={},t=0,n=h.keys(L);t<n.length;t++)o[r=n[t]]=h.from(L[r]);for(var i=0,c=h.keys(e);i<c.length;i++)o[r=c[i]]=r in L?L[r].concat(e[r]):h.from(e[r]);return o},setWhiteList:function(e){for(var r=0,o=h.keys(e);r<o.length;r++){var t=o[r];this.whiteList[t]=t in L?L[t].concat(e[t]):h.from(e[t])}}};try{var N={},_="merge";h.includes(_,"override")&&(O.whiteList=N.whiteList),h.includes(_,"merge")&&O.setWhiteList(N.whiteList)}catch(e){}var D=function(e,r){for(var o={},t=0,n=h.keys(e);t<n.length;t++){var i=n[t];Array.isArray(e[i])?o[i]=h.from(e[i]):o[i]=D({},e[i])}for(var c=0,G=h.keys(r);c<G.length;c++)(i=G[c])in e?Array.isArray(e[i])?o[i]=e[i].concat(r[i]):o[i]=D(e[i],r[i]):Array.isArray(r[i])?o[i]=h.from(r[i]):o[i]=D({},r[i]);return o},C={blackList:{a:["folder"],meta:["content"],iframe:["srcdoc"],input:["pattern"],vmlframe:["xmlns"]},blackTags:["script","xml","embed","isindex","object","base","set","handler","animate","payload","import"],blackAttrs:["charset","ns","namespace","formaction","xlink:href","xmlns:xlink","handler","repeat","repeat-start","repeat-end"],blackAttrRegExps:[/^on/],filterList:{param:["value"],video:["poster"],form:["action"]},filterAttrs:["href","src","background","style","dynsrc","lowsrc","content"]};try{var K={};K.blackAttrRegExps&&(K.blackAttrRegExps=K.blackAttrRegExps.map(function(e){return new RegExp(e.toString().slice(1,e.toString().length-1))}));var B="merge";h.includes(B,"override")&&(C=K),h.includes(B,"merge")&&(C=D(C,K))}catch(e){}var k={mode:"black",whiteList:{},blackConfig:C,collect:null,initCollect:function(){k.collect={blackList:{},blackTags:[],blackAttrs:[],blackAttrRegExps:[],filterAttrs:[],filterList:{},filterProtocol:[]}},removeCollect:function(){var e=A(k.collect),r=e.count,o=e.ret;return k.collect=null,{collectKey:0===r?null:JSON.stringify(o),collectMode:"black"}},onIgnoreTag:function(e,r){var o;if(!h.includes(C.blackTags,e))return g(r,function(e,r,o,t,n){if(-1!==o.indexOf("/"))return F(t);if(n)return"</".concat(o,">");var i=P(t),c=b(i.html,function(e,r){var t,n=0;if(C.blackList[o]&&h.includes(C.blackList[o],e)&&(k.collect.blackList[o]=k.collect.blackList[o]||[],k.collect.blackList[o].push(e),n++),C.blackAttrRegExps.length&&C.blackAttrRegExps.some(function(r){return r.test(e)})&&h.forEach(C.blackAttrRegExps,function(r){r.test(e)&&(k.collect.blackAttrRegExps.push("".concat(r.toString(),"->").concat(e)),n++)}),C.blackAttrs.length&&h.includes(C.blackAttrs,e)&&(C.blackAttrs.push(e),n++),!n){if(C.filterList&&C.filterList[o]&&h.includes(C.filterList[o],e)){var i=I(r,function(e){var r;null===(r=k.collect)||void 0===r||r.filterProtocol.push(e)});return i!==r&&(k.collect.filterList[o]=k.collect.filterList[o]||[],k.collect.filterList[o].push(e)),r?"".concat(e,"='").concat(i,"'"):e}return C.filterAttrs&&h.includes(C.filterAttrs,e)?((i=I(r,function(e){var r;null===(r=k.collect)||void 0===r||r.filterProtocol.push(e)}))!==r&&(null===(t=k.collect)||void 0===t||t.filterAttrs.push(e)),r?"".concat(e,"='").concat(i,"'"):e):r?"".concat(e,"='").concat(r,"'"):e}});return t="<".concat(o),c&&(t+=" ".concat(c)),i.closing&&(t+=" /"),t+=">"},F);null===(o=k.collect)||void 0===o||o.blackTags.push(e)}},V=function(e){var r=e.reportOnly,o=void 0===r||r,t=e.block;return o&&"all"===o?"report":("string"==typeof o&&("true"===o&&(o=!0),"false"===o&&(o=!1)),t?"enforce":o?"report":"enforce")},U=function(e){return function(o,t,n){if(!o||"string"!=typeof o)return o;var i=t;e===y&&(i=O).initCollect();var c=e(o,i);if(v(c)===v(o))return o;if(!n)return c;var G=n.logType,a=V(n),s=i.removeCollect();return R.report(r(r({type:G,disposition:a},s),{sourceText:p(o),filterText:p(c)})),"enforce"===a?c:o}},Z=U(function(e,r){return void 0===r&&(r={}),r&&r.whiteList||(r.whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","crossorigin","loop","muted","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],figcaption:[],figure:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],summary:[],sup:[],strong:[],strike:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src","height","width"]}),new Q(r).process(e)}),j=U(y),H=function(e,r,o){var t=[],n=I(e,function(e){t.push(e)});if(n===e)return e;t=h.from(h.uniq(t));var i=r||o||{};if(!i)return n;var c=i.logType,G=V(o);return R.report({type:c,disposition:G,collectKey:t.join("___"),collectData:JSON.stringify(t),collectMode:"black",sourceText:p(e),filterText:p(n)}),"enforce"===G?n:e},W=E._xssProject||{},z=E.xssNamespace||{},Y="3.0.26",$={FilterXSS:Q,version:Y,webpackPluginVersion:"<%= webpackPluginVersion =>",reportOnly:"<%= reportOnly =>",filterXSS:Z,_filterXSS:j,filterUrl:H,Config:O,BlackConfig:k,project:W,setProjectName:function(e){W[e]=this,E._xssProjectName=e}};z.douyin_web=$,E.xssNamespace=z,E.Math&&!E.Math.xssNamespace&&(E.Math.xssNamespace=z),W[Y]=$,E.globalThis=E,E.getFilterXss=function(){return void 0!==this._xssProjectName?this._xssProject[this._xssProjectName]:$},E.xss=$,E.isSafeUrl=x,E.isSafeDomain=x,E.isSafeProtocol=w,E._xssProject=W,E._xssProjectName&&(W[E._xssProjectName]=$);var J=$.setProjectName.bind($);e.BlackConfig=k,e.Config=O,e.FilterXSS=Q,e._filterXSS=j,e.filterUrl=H,e.filterXSS=Z,e.isSafeDomain=x,e.isSafeProtocol=w,e.isSafeUrl=x,e.project=W,e.setProjectName=J,e.setXssNamespace=function(e){var r=e.appId,o=e.bid,t=e.region;z[r]=$;O.bid=o,O.region=t,O.enabled=!0},e.xssNamespace=z,Object.defineProperty(e,"__esModule",{value:!0})}),(self.webpackChunkdouyin_web=self.webpackChunkdouyin_web||[]).push([["16229"],{319693:function(e,r,o){"use strict";var t=o(101199),n=o(994298);let i=(0,n.A)(function(e){return t.createElement("svg",Object.assign({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,"aria-hidden":!0},e),t.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"m8.06 9.39 3.71-6.96c.13-.24.42-.33.64-.18.58.41 1.42 1.2 1.42 2.13 0 .5-.13 1.4-.27 2.33a23.55 23.55 0 0 0-.31 2.79h7.58c.45 0 1.17.45 1.17 1.5 0 .9-1 5.09-1.7 8.04l-.3 1.3c0 .22-.27.66-1.33.66H8.5a.5.5 0 0 1-.5-.5V9.63a.5.5 0 0 1 .06-.24ZM3.5 9.5a.5.5 0 0 0-.5.5v10.5c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5V10a.5.5 0 0 0-.5-.5h-2Z",fill:"currentColor"}))},"like_thumb");r.Z=i},977161:function(e,r,o){"use strict";o.d(r,{Z:function(){return n}});let t=`
GeForce RTX 4090|1950
GeForce RTX 4090 Laptop GPU|1791
GeForce RTX 4070 Ti|1517
GeForce RTX 3090 Ti|1465
GeForce RTX 4080|1426
GeForce RTX 4060 Laptop GPU|1408
GeForce RTX 3080 Ti Laptop GPU|1394
GeForce RTX 3080|1325
GeForce RTX 3080 Ti|1298
RTX A5500 Laptop GPU|1242
GeForce RTX 3090|1235
GeForce RTX 3070 Ti|1229
GeForce RTX 3070|1228
GeForce RTX 3060 Ti|1166
GeForce RTX 3080 Laptop GPU|1139
RTX A4000 Laptop GPU|1126
GeForce RTX 2080 Ti|1120
GeForce RTX 3070 Laptop GPU|1077
TITAN V|1070
GeForce RTX 2080 SUPER|1063
Quadro RTX 8000|1054
RTX A6000|1046
TITAN RTX|1046
GeForce RTX 3070 Ti Laptop GPU|1033
RTX A5000 Laptop GPU|1027
GeForce RTX 4090 Laptop GPU|1024
GeForce RTX 3060|1015
TITAN X (Pascal)|1008
TITAN Xp|995
GeForce GTX 1080 Ti|992
GeForce RTX 4070 Laptop GPU|989
GeForce RTX 4090|982
GeForce RTX 2070 SUPER|981
GeForce RTX 4080|975
GeForce RTX 3060|970
GeForce RTX 2080|970
GeForce RTX 4080 Laptop GPU|968
GeForce RTX 3060 Laptop GPU|913
GeForce RTX 2060 SUPER|890
GeForce RTX 4060 Laptop GPU|882
GeForce RTX 2070|879
GeForce RTX 2080 Super with Max-Q Design|868
GeForce RTX 2080 with Max-Q Design|868
Quadro RTX 5000|867
GeForce RTX 3080 Ti Laptop GPU|861
Quadro RTX 5000 with Max-Q Design|843
Asus GeForce GTX 1080|841
GeForce GTX 1080|841
GeForce RTX 2070 Super with Max-Q Design|837
RTX A3000 Laptop GPU|835
Quadro RTX 4000 with Max-Q Design|833
GeForce RTX 3070 Ti Laptop GPU|827
Quadro RTX 4000|817
RTX A6000|814
GeForce GTX 1070 Ti|785
GeForce RTX 4070 Ti|784
GeForce RTX 4050 Laptop GPU|784
RTX A5500 Laptop GPU|783
TITAN Xp COLLECTORS EDITION|771
GeForce RTX 2070 with Max-Q Design|765
GeForce RTX 3050|760
GeForce RTX 2060|757
GeForce GTX 980 Ti|755
Quadro P6000|753
GeForce GTX 1080|747
Quadro RTX 6000|744
GeForce GTX 1070|742
RTX A4000|739
GeForce RTX 3090|737
GeForce RTX 3080 Ti|733
GeForce GTX 1080 Ti|729
Quadro P4200|711
GeForce GTX 1080 with Max-Q Design|707
GeForce RTX 3060 Lite Hash Rate|705
EIZO MED-XN83|704
GeForce RTX 3080 Ti|701
GeForce GTX 1660 SUPER|701
TITAN Xp|700
EVGA GeForce GTX 1070|698
GeForce RTX 3090 Ti|696
Quadro GV100|695
Quadro P4000|695
GeForce GTX 1660 Ti|694
GeForce RTX 3070 Ti|690
RTX 6000 Ada Generation|687
GeForce RTX 3070|687
Quadro RTX 8000|685
RTX A2000 12GB|683
GeForce RTX 2080|679
GeForce GTX TITAN X|679
Quadro M6000 24GB|676
GeForce GTX 1660 SUPER|674
TITAN V|673
Quadro RTX 3000|672
Graphics Device|672
RTX A5000|669
GeForce RTX 3090|669
TITAN Xp COLLECTORS EDITION|669
GeForce GTX 1070 A17|668
GeForce RTX 3080 Laptop GPU|667
RTX A4500 Embedded GPU|663
RTX A5000 Laptop GPU|663
GeForce RTX 3080|658
GeForce RTX 3050 Ti Laptop GPU|657
GeForce GTX 1070 with Max-Q Design|656
GeForce RTX 3060 Ti|656
Quadro P4200 with Max-Q Design|651
GeForce RTX 3080|651
GeForce RTX 2080 SUPER|650
GeForce GTX 1070 Ti|648
GeForce GTX 1070 with MaxQ Design|642
RTX A3000 Laptop GPU|641
GeForce RTX 3070 Laptop GPU|641
GeForce GTX 1070|640
GA104GL [RTX A4000]|639
GeForce GTX 980 Ti|637
GeForce RTX 2070 Mobile / Max-Q Refresh|637
RTX A4000 Laptop GPU|634
GeForce RTX 3060|633
Microsoft Virtual Render Driver|633
GeForce RTX 3050 Laptop GPU|631
RTX A2000|629
GeForce RTX 2070 Mobile / Max-Q|626
GeForce RTX 3070|625
Quadro P5000|625
Quadro P4000|621
GeForce RTX 3060 Laptop GPU|621
GeForce RTX 2060 with Max-Q Design|618
GV102|614
GeForce RTX 2070 SUPER|612
GeForce GTX 1660|606
GeForce RTX 2070|604
GeForce GTX 1660 Ti with Max-Q Design|601
GeForce GTX TITAN X|598
RTX A2000 8GB Laptop GPU|598
GeForce GTX TITAN Xp|595
GeForce GTX 980|593
GeForce RTX 2080 SUPER|591
GTX 1060 HL|589
Tesla T4|589
GRID P4-1Q|585
RTX A4000|581
GeForce RTX 2080 Ti|577
GeForce RTX 2080 Super with Max-Q Design|576
Quadro RTX 4000 Mobile / Max-Q|576
TU102 [TITAN RTX]|574
GeForce GTX 1060 with Max-Q Design|571
GeForce RTX 2070 SUPER|570
GeForce GTX 1060 6GB|570
GeForce RTX 2080 Mobile|568
GeForce RTX 2060|568
Quadro P3200|565
P106-100|564
GRID V100DX-1Q|564
RTX A2000|562
GeForce RTX 2080 Ti Rev. A|561
GeForce RTX 2080 Rev. A|559
GV100 [TITAN V]|557
GeForce RTX 2080|556
GeForce GTX 1650 SUPER|554
P106-100 Custom|553
GeForce RTX 2070 Super with Max-Q Design|553
GV100|553
GeForce RTX 2070 Mobile|550
GP102 [TITAN X]|548
RTX A2000 12GB|546
GeForce GTX 1060 5GB|542
MSI GeForce GTX 1060|542
GeForce RTX 2060 SUPER|542
GRID T4-1Q|539
Quadro RTX 5000 Mobile / Max-Q|538
GeForce RTX 3050|538
GeForce GTX 1060 3GB|538
Quadro RTX 5000 with Max-Q Design|537
Quadro M6000|536
RTX A2000 Laptop GPU|536
GeForce GTX 1660 SUPER|533
A10-2B|530
TITAN X (Pascal)|530
Quadro P5000|527
GeForce RTX 2070|526
GeForce GTX 1080|525
GeForce RTX 2060 Mobile|524
PNY GeForce GTX 980|524
GeForce GTX 1080 Mobile|523
GeForce RTX 2060 SUPER|520
GeForce GTX 780 Ti|518
RTX A4500|516
GeForce RTX 2060 Rev. A|515
MSI GeForce GTX 980|515
Quadro P3200 with Max-Q Design|513
GeForce RTX 2070 with Max-Q Design|513
GeForce RTX 3050 Ti Laptop GPU|510
Quadro RTX 3000 Mobile / Max-Q|509
GeForce GTX 1660 SUPER|508
Quadro RTX 4000|508
GeForce GTX 1060|506
GeForce RTX 2080 with Max-Q Design|505
GeForce GTX 1080 Ti|505
GeForce GTX 1660 Ti Rev. A|504
GeForce GTX 1660 Ti Mobile|504
GeForce RTX 3050 Laptop GPU|503
GeForce RTX 2060|503
Quadro RTX 4000 with Max-Q Design|500
EIZO MED-XN83|499
GeForce GTX 970|499
GeForce GTX 1080|495
GeForce GTX 1070 Ti|492
GeForce GTX 980|491
A100-PCIE-40GB|489
GeForce GTX 1070|487
GeForce GTX 1660 Ti|487
Quadro P2200|485
GeForce GTX TITAN Black|484
TITAN Xp COLLECTORS EDITION|483
TITAN RTX|482
Quadro P5200|482
GeForce GTX 1060 with Max-Q Design|480
RTX A1000 Laptop GPU|479
GeForce GTX 1060 6GB|479
Quadro RTX 5000|475
TITAN V|475
GRID P100-4Q|474
EVGA GeForce GTX 970|472
GeForce GTX 1650 SUPER|471
GeForce GTX 1650 Ti|470
Quadro RTX 3000|470
Quadro M5000|469
Quadro RTX 3000 with Max-Q Design|468
GeForce GTX 980 Ti|467
GeForce GTX TITAN|467
Quadro P4200|466
GeForce GTX 1070 with Max-Q Design|466
Quadro M5000|466
GeForce GTX 1080 Ti|466
Tesla M60|462
GeForce GTX 1660|457
GeForce GTX 1660|455
GeForce RTX 2050|453
GeForce GTX 1060|453
GeForce RTX 2060 with Max-Q Design|453
Quadro P3200 with Max-Q Design|452
Quadro P4000|450
GeForce GTX 1060 3GB|449
GeForce GTX 1070|448
GeForce GTX 1060 6GB Rev. 2|447
Gigabyte GeForce GTX 780 Ti|447
TITAN Xp|444
GeForce GTX 980M|440
A10-4Q|439
GeForce GTX 1080 with Max-Q Design|437
GeForce GTX 1650 SUPER|435
Quadro P5000|435
Quadro P3000|434
RTX A6000|434
GeForce GTX 1060 3GB|433
GeForce GTX 1070 Ti|432
GeForce GTX 780|432
GeForce GTX 1060 Mobile|432
Gigabyte GeForce GTX 970|431
GeForce GTX TITAN Z|431
Quadro K6000|429
GeForce GTX 1650|425
GeForce GTX 970|421
Tesla K20m|420
Quadro GV100|419
Quadro P4000|419
Quadro P3200|417
GTX 1060 HL|415
RTX A2000 Laptop GPU|415
GeForce GTX 780 by St3Phl3|414
P102-100|412
T1200 Laptop GPU|412
GeForce GTX 780 Ti|411
GeForce GTX 1060 6GB|408
GeForce GTX 1650 Ti with Max-Q Design|407
Quadro T2000 with Max-Q Design|407
Quadro P2000|406
Quadro P2200|406
GeForce RTX 2060 Max-Q|405
GeForce GTX 1650 Ti Mobile|403
GeForce GTX 1060 Mobile 6GB|403
GeForce GTX 1060 with Max-Q Design|401
GeForce GTX 980|398
GeForce RTX 2070 Rev. A|397
GeForce GTX TITAN X|397
Tesla T4|395
Quadro P6000|394
GeForce GTX 1060 3GB|394
Quadro M5000|393
GeForce GTX 1060 with Max-Q Design|392
PNY GeForce GTX 970|392
Quadro T2000|391
Quadro T1000 with Max-Q Design|391
GRID P40-8Q|390
GeForce GTX 780 Rev. 2|389
Quadro GP100|387
GeForce GTX 980|387
P104-100|387
GeForce GTX 1650 Ti|386
GRID P40-4Q|384
GeForce GTX 780 Ti|383
Device|383
TU117M|381
Quadro P2000|380
Quadro RTX 6000|379
GeForce GTX 1070 Mobile|378
Quadro T1000|377
GeForce RTX 3070 Mobile / Max-Q|376
GeForce GTX 1060|376
GRID V100-1Q|375
GeForce GTX 780 Rev. 2|372
GeForce RTX 2050|370
GeForce GTX 770|370
GeForce GTX 970|368
GeForce GTX 1650 Ti|368
GRID T4-2B4|368
Asus GeForce GTX 780|366
P106-100|365
Quadro RTX 8000|365
GeForce GTX TITAN Black|365
GRID RTX6000-2Q|365
GeForce GTX TITAN Black|363
Quadro M4000|363
GeForce GTX 1060 6GB|362
Quadro P5000|361
GeForce GTX 1650|361
Quadro M5500|361
GeForce GTX 780|360
GeForce GTX 780|360
GeForce GTX 980M|358
GeForce GTX 1650|358
GeForce GTX 1050 Ti|357
Quadro P3200 Mobile|357
GeForce GTX 1650 with Max-Q Design|356
Tesla T4|356
Quadro P2000|356
GeForce GTX TITAN|355
GeForce GTX 970|355
GeForce GTX 980 Ti|354
GeForce GTX 1660 Ti with Max-Q Design|354
GeForce GTX 780 Rev. 2|352
GRID P4-4Q|351
GeForce GTX TITAN X|351
T1200 Laptop GPU|350
GRID T4-8Q|350
GeForce GTX 1060|349
GeForce GTX 1050 Ti with Max-Q Design|348
GeForce GTX 970M|346
T1000 8GB|346
GeForce RTX 3080 Mobile / Max-Q 8GB/16GB|346
GeForce GTX 780 Ti|346
GeForce GTX 680|346
GeForce GTX 1660 Ti|345
GeForce GTX 780|345
Quadro M6000|344
GRID T4-16Q|344
GeForce RTX 2080 Ti|344
GRID T4-1B|343
Quadro K5200|342
Quadro P2200|341
T1000 8GB|341
Tesla K80|341
Quadro T2000 Mobile / Max-Q|338
TU107|337
GeForce GTX 780 Mac|336
GeForce GTX TITAN|336
GeForce GTX 980M|335
GRID P40-2Q|335
EVGA GeForce GTX 780|334
GeForce GTX TITAN Z|334
TITAN X (Pascal)|332
GeForce GTX 960|331
Tesla P40|331
GeForce GTX 1650 Ti with Max-Q Design|330
Tesla P40|330
GeForce GTX 1060se 3GB|329
GeForce GTX 1650 Mobile / Max-Q|329
Quadro T2000 with Max-Q Design|328
T1000|327
RTX A5500|326
A40-8Q|326
GeForce RTX 3060 Mobile / Max-Q|326
GeForce GTX 690|326
Tesla V100-SXM2-16GB|326
Quadro M5000|325
A16-2B|323
GeForce GTX 1050 Ti with Max-Q Design|321
GeForce GTX 1050 Ti Mobile|321
GeForce GTX 980M|319
Quadro M3000M|318
GeForce GTX 1650 with Max-Q Design|318
GeForce GTX 670|316
Quadro P3000|316
T600 Laptop GPU|315
Quadro T1000 with Max-Q Design|313
Tesla K80|312
Tesla K20m|311
GeForce GTX 770|311
Tesla P100-PCIE-16GB|311
Quadro M5000M|311
Tesla K80|309
EVGA GeForce GTX 1070|309
Quadro T1000|309
GeForce GTX 1050 Ti|309
GeForce GTX TITAN Z|308
Quadro T2000|308
Quadro M6000 24GB|308
GeForce GTX 760 Ti|308
GeForce RTX 2080 SUPER Mobile / Max-Q|308
GeForce GTX 1050 Ti|307
Quadro P2000|304
Quadro P6000|304
GeForce GTX 770 Mac Edition|303
MSi GeForce GTX 1050 Ti|303
A40|303
T600|303
P106-090|302
P106-090|301
Quadro K5200|300
GeForce GTX 770|299
GeForce GTX 680|299
GeForce GTX TITAN|299
GeForce GTX 680|297
GRID M60-4Q|296
Quadro M4000|296
GRID M60-2Q|295
GeForce GTX 760|294
GRID V100DX-16Q|293
Quadro RTX 6000/8000|293
GeForce GTX 770|293
GP104|292
GeForce GTX 780 Rev. 2|290
GeForce GTX 1050 Ti|288
GeForce GTX 950|288
EVGA GeForce GTX 1050 Ti|288
GeForce GTX 1650 with Max-Q Design|286
GeForce GTX 880M|285
%NVIDIA_DEV.13D7.0580.1028%|283
GP104GL|283
Gigabyte GeForce GTX 960|282
Quadro K5200|281
GeForce GTX 660 Ti|281
GeForce GTX 670|281
Quadro M4000|280
GeForce GTX 580|280
MSi GeForce GTX 960|280
Tesla M6|278
PNY GeForce GTX 680|278
T500|277
GeForce GTX 1050|276
GeForce GTX 1050 Ti with Max-Q Design|276
GeForce GTX 690|276
GeForce GTX 680|276
GeForce GTX 670|275
GeForce GTX 760 Ti|274
GeForce GTX 1050 3GB|272
GeForce GTX 880M|272
Tesla M60|272
Asus GeForce GTX 960|271
Quadro M4000|269
T600|268
Tesla K20m|268
GeForce GTX 760|268
GP102 [TITAN Xp]|267
GeForce GTX 960|267
GeForce GTX 670|265
Quadro T1000 Mobile|265
GeForce GTX 1050|264
Tesla M60|264
EVGA GeForce GTX 1080 Ti|263
GeForce GTX 970M|263
GeForce GTX 780M|262
GeForce GTX 690|262
Asus GeForce GTX 770|261
GeForce GTX 1070 with MaxQ Design|261
EVGA GeForce GTX 960|261
GeForce GTX 960|260
GRID T4-2Q|259
GeForce GTX 970M|259
GeForce GTX 960|259
Quadro M3000M|258
GeForce GTX 1060se 3GB|257
Tesla K10|257
Quadro M3000M|257
Quadro M2200|256
GeForce GTX 690|255
GeForce GTX 760|254
GeForce GTX 880M|254
Quadro K4200|253
Quadro P2000 with Max-Q Design|253
T550 Laptop GPU|253
Quadro K5200|252
MSI GeForce GTX 760|250
GeForce GTX 580|249
GeForce GTX 780M Mac Edition|249
GeForce GTX 570|249
Tesla V100-PCIE-16GB|248
GeForce GTX880M|248
GeForce GTX 760|247
GeForce GTX 570 Rev. 2|247
Asus GeForce GTX 670|246
GeForce GTX 580|246
GeForce GTX 1050|245
Tesla P4|244
GeForce GTX 680MX|244
GeForce GTX 480|242
GeForce GTX 1050|242
Quadro 7000|241
Quadro M4000M|241
GeForce GTX 1050 Mobile|240
GeForce GTX 660|240
GeForce GTX 760 (192-bit)|239
Quadro K5000|239
GeForce GTX 760 OEM|238
GeForce GTX 660 Ti|238
GeForce GTX 775M Mac Edition|238
GeForce GTX 965M|237
GeForce GTX 870M|236
GeForce GTX 950|236
GeForce GTX 560 Ti 448 Cores|236
GeForce GTX 780M|236
Quadro P2000 with Max-Q Design|234
MSI GeForce GTX 980 TI|234
GRID K2|233
GeForce GTX 1060 6GB OpenGL Engine|233
PNY GeForce GTX 1060|233
EVGA GeForce GTX 980|232
GRID RTX6000P-6Q|232
GeForce GTX 950|232
GeForce GTX 950|232
GeForce GTX 590|231
GeForce GTX 1070 OpenGL Engine|231
TITAN X (Pascal)|229
GeForce GTX 1050 with Max-Q Design|229
GeForce GTX TITAN Black|228
Quadro K4200|227
GeForce GTX 660 OEM|227
GeForce MX450|225
GeForce GTX 1050 with Max-Q Design|225
Quadro P1000|225
Graphics Device|225
Quadro M2000|222
GeForce GTX 1630|222
Quadro M4000M|221
Quadro K5100M|221
EVGA GeForce GTX 760|221
GeForce GTX 1070 Ti|221
GeForce GTX 660 Ti|220
GeForce GTX 570|220
GeForce GTX 660 Ti|219
Quadro K6000|219
GeForce GTX 570 Rev. 2|219
GeForce GTX 1050 with Max-Q Design|219
Tesla M40|218
GeForce GTX 680M|217
GeForce GTX 780M by Nick[D]vB|217
Asus GeForce GTX 980 TI|217
GeForce GTX 1060 3GB|217
Graphics Device|217
GeForce GTX 570 Rev. 2|216
GeForce GTX 1060 3GB OpenGL Engine|216
GeForce GTX 660|215
Point of View GeForce GTX 660 Ti|214
Gigabyte GeForce GTX 980|214
Quadro K5000|213
Quadro P1000|213
GeForce GTX 480|213
GeForce MX450|212
Quadro K4200|211
GRID K280Q|211
Asus GeForce GTX 760|210
Quadro P1000|210
GeForce GTX 680MX|209
GeForce GTX 1060 6GB|209
GeForce GTX 660|209
GeForce GTX 750 Ti|208
GeForce GTX 780M Mac Edition|208
GeForce GTX 775M Mac Edition|208
GRID K520|208
Quadro M2200|207
GRID M60-8Q|207
GRID K2|207
GeForce GTX 775M Mac Edition|206
GeForce GTX 560 Ti 448 Cores|205
GeForce GTX 760 (192-bit)|205
Quadro K5000|205
Gigabyte GeForce GTX 980 TI|204
GeForce GTX 780M Mac Edition|204
Asus GeForce GTX 660|204
GRID M60-1B|202
GeForce GTX 650 Ti BOOST|202
GeForce GTX 480|202
GeForce GTX 960M|201
GeForce GTX 660 OEM|201
GeForce GTX 780 Ti|201
Quadro K5000|201
GeForce GTX 780M Mac Edition|201
GeForce GTX 870M|200
GeForce GTX 680MX|200
GeForce GTX 680MX|199
Quadro P1000|198
Tesla P100 PCIe 16GB|198
Quadro K5100M|198
GeForce GTX 470|198
Quadro P620|197
Asus GeForce GTX 780|197
Quadro 6000|196
Quadro M1200|195
Quadro K2200|195
GeForce GTX 590|195
Quadro M2000M|194
Quadro M4000 OpenGL Engine|194
GeForce GTX 870M|194
GeForce GTX 1070|194
EVGA GeForce GTX 750 Ti|194
Zotac GeForce GTX 680|193
Quadro RTX 3000 with Max-Q Design|193
T400|193
Quadro M2200|193
Quadro K4100M by nikey22|192
GRID K2|192
GTX 865M by iMacGFX|191
Quadro M2000|191
GeForce GTX 980M|190
GeForce GTX 560 Ti|190
Palit GeForce GTX 660|190
GRID K260Q|189
GRID M10-2Q|189
GeForce GTX 660|189
GeForce GTX 965M|189
GeForce GTX 650 Ti BOOST|188
GeForce GTX 675MX Mac Edition|188
Quadro K5100M by nikey22|187
GeForce GTX 680M|187
Zotac GeForce GTX 660|186
GeForce GTX 650 Ti BOOST|186
GeForce GTX 760 (192-bit)|185
GRID M60-1Q|184
Gigabyte GeForce GTX 960|184
Quadro M2000M Special Edition|184
GeForce GTX 560 Ti|184
Inno3D GeForce GTX660|183
GeForce GTX 1060|183
GeForce GTX 675MX Mac Edition|182
Quadro P600|181
GeForce GTX 1080|181
GeForce GTX 675MX Mac Edition|181
Quadro P620|180
GK104 Board - 20530501|180
Ashley|180
Quadro M2000|179
GeForce GTX 860M|179
MSi GeForce GTX 1050 Ti|179
Asus GeForce GTX 750 Ti|178
GeForce GTX 750 Ti|178
GeForce GTX 750 Ti|177
EVGA GeForce GTX 980 TI|177
Asus GeForce GTX 770|177
GeForce GTX 760 OEM|176
GeForce GTX 750|176
Quadro P2000 Mobile|176
Quadro K4100M|175
T400 4GB|174
GeForce GTX 1080 Ti OpenGL Engine|174
Quadro K5000M|173
GeForce GTX 960A|173
GeForce GTX 560 Ti|172
Tesla M10|172
GeForce GTX 1080 Ti|172
GRID RTX6000P-6|172
GK104 Board - 2051b502|172
GeForce GTX 770M|172
GeForce GTX 960M|172
GeForce GTX 970|172
GRID M10-2Q|171
GeForce GTX 560 Ti OEM|171
MSi GeForce GTX 970|171
GK104GL [GRID K2]|171
GeForce GTX 470|170
GeForce GTX 560 Ti|170
TITAN Xp|170
GeForce GTX 870M|170
GeForce MX350|169
MSi GeForce GTX 580|169
GeForce GTX 960M|169
EVGA GeForce GTX 760|169
Quadro K4000M|169
T400|169
GeForce MX350|168
GeForce GTX 470|168
GeForce GTX 560|167
Quadro 6000|167
GeForce GTX 1050 Ti OpenGL Engine|167
Quadro M1200|167
Gigabyte GeForce GTX 970|166
GeForce GT 1030|166
GeForce GTX780M by nikey22|166
GeForce GTX870M by nikey22|166
Tesla V100-PCIE-32GB|165
Quadro K2200|165
Quadro M1000M|165
Quadro K2200|165
Asus GeForce GTX 970|164
GeForce GTX 750 Ti|164
Quadro M2000M|164
GeForce GTX 1050|164
GeForce GTX 1050 Ti|163
Quadro K5000|163
Graphics Device|162
GeForce MX250|162
T500|161
EVGA GeForce GTX 570|161
Quadro M2000M|161
Quadro K1200|159
GeForce GTX 860M|159
GeForce GTX 770M|159
Quadro M1200|158
GeForce GTX 675MX|158
GeForce MX330|158
Quadro K2200M|157
Quadro K4000|157
GeForce GTX 690|157
GeForce GTX 860M|157
MSi GeForce GTX 670|156
Quadro K2200|156
Quadro K4100M|156
GeForce GTX 770M by Nick[D]vB|155
Tesla V100-SXM2-32GB|155
GeForce GTX 1080 OpenGL Engine|155
Gigabyte GeForce GTX 670|155
EVGA GeForce GTX 960|155
GeForce GTX 750|155
GeForce Pre-Release TITAN X (Pascal) OpenGL Engine|154
GeForce GTX TITAN Xp|154
Asus GeForce GTX 950|154
Quadro K4100M|153
GeForce GTX 960|153
GeForce GTX 770M|153
GeForce MX330|153
Quadro M2200 Mobile|153
GeForce MX250|153
GeForce Pre-Release TITAN Xp OpenGL Engine|153
Quadro P600|153
Quadro M620|152
GeForce GTX 1070 Ti OpenGL Engine|152
GeForce GTX 770|152
GeForce GT 1030|152
Tesla C2070|152
GeForce GTX 650 Ti|152
GRID K240Q|151
GeForce GTX 480 OpenGL Engine|151
GeForce GTX 750|151
GeForce GTX TITAN|151
GeForce GTX 760 (192-bit)|151
GeForce GTX 560|151
GeForce GT 1030|151
Quadro K5000M|151
Quadro P1000 Mobile|151
Zotac GeForce GTX 660|151
GeForce GTX 460 v2|150
GRID GTX P40-6|150
MSi GeForce GTX 660|149
GeForce GTX 780M|149
MSI GeForce GTX 760|149
P106-090|149
GeForce GTX 950A|149
GeForce MX150|149
Asus GeForce GTX 1060|149
Unknown|149
GeForce GTX 980 Ti|148
GRID T4-4Q|148
GeForce GTX 465|147
Colorful GeForce GTX 960|147
Gigabyte GeForce GTX 750|147
Quadro M1000M|147
GeForce GTX 780 Mac|147
GeForce GTX 460|146
MSi GeForce GTX 960|146
GeForce GTX 560|146
Quadro K4000|145
GeForce GTX 970M|145
Quadro M1000M|145
Unknown|145
GeForce GTX 980|144
GeForce GTX 950|144
GeForce GTX 675M|144
Zotac GeForce GTX 960|144
GeForce Pre-Release Graphics Device|144
GeForce GTX 670 OpenGL Engine|143
Quadro K4000|143
EVGA GeForce GTX 580|143
GeForce GTX 950M|143
GeForce GTX TITAN Black OpenGL Engine|142
GeForce GTX 760|142
Quadro 5000|142
MSI GeForce GTX 570 HD|142
GeForce Pre-Release TITAN Xp COLLECTORS EDITION OpenGL E|142
GeForce GTX 1050 OpenGL Engine|142
GeForce GTX TITAN X|142
GeForce GTX 880M|141
GV-N660OC-2GD|141
GeForce GTX 750|141
Quadro M5000M|140
GeForce GTX 970 OpenGL Engine|140
GeForce GTX 675MX|140
Asus GeForce GTX 760|140
Quadro P5000 OpenGL Engine|139
GeForce GTX 580|139
GeForce GTX 675MX|139
Zotac GeForce GTX 750|139
Quadro K1200|139
GeForce MX150|139
GeForce GTX 650 Ti|139
Quadro K1200|139
GeForce GTX 980 Ti OpenGL Engine|139
GeForce GTX 580M|138
Asus GeForce GTX 580|138
GeForce GTX 770 OpenGL Engine|138
GeForce GT 1010|138
GeForce GTX 780 Rev. 2|138
Quadro P2000 OpenGL Engine|138
GeForce MX250|138
Quadro K4000|137
GeForce GTX 460 v2|137
GeForce GTX 770M|137
Gigabyte GeForce GTX 570 HD|136
GeForce GTX 465|136
GeForce GTX 460 v2|136
GeForce GTX 670|136
GeForce GTX 590 OpenGL Engine|136
GeForce GTX 780|135
GeForce GTX TITAN Black|135
GeForce GTX 660 Ti|135
Zotac GeForce GTX 560 Ti|134
GeForce GTX 880M OpenGL Engine|134
GeForce GTX 650 Ti|134
GeForce GTX 760 OpenGL Engine|134
null Graphics Device|134
Quadro M620|133
GeForce GTX 780M Mac Edition|133
GeForce MX150|132
Asus GeForce GTX 570 HD|132
GeForce GTX 775M OpenGL Engine|132
GeForce GTX 850M|132
Asus GeForce GTX 570|132
Quadro K6000 OpenGL Engine|131
GeForce GTX 850M|131
GeForce GTX 460|131
GeForce GTX 950A|130
GeForce GTX 780M OpenGL Engine|130
Point of View GeForce GTX 660 Ti|130
GeForce GTX 775M Mac Edition|130
EVGA GeForce GTX 650 Ti|130
EVGA GeForce GTX 750 Ti|129
GeForce GTX 460|129
Quadro P520|129
Gainward GeForce GTX 570|129
Asus GeForce GTX 750 Ti|129
Quadro K3100M|128
Quadro K2200|128
Asus GeForce GTX 560 Ti|127
GeForce GTX 680|127
GeForce GTX 680 OpenGL Engine|127
GeForce GTX 950M|127
GRID V100-2B|127
Gigabyte GeForce GTX 660 Ti|127
N15E-GT|126
Quadro K1200|126
GeForce GTX 650 Ti|126
Gigabyte GeForce GTX 770|126
GeForce GTX 660|126
Quadro 5000|125
GeForce GT 1030|125
GeForce GTX 950M|125
GeForce GTX 765M|125
Quadro M5000|125
Gigabyte GeForce GTX 560 Ti|125
GeForce GTX 580M|125
Quadro M2000|124
GeForce GTX 850M|124
GeForce GTX 570 OpenGL Engine|123
Gainward GeForce GTX 750 Ti|123
Quadro K2200M|123
GeForce GTX 780M Mac Edition|123
GeForce GTX 680MX OpenGL Engine|123
Quadro K4200|123
GeForce GTX 460 OEM|122
GeForce GTX 670MX|122
MSi GeForce GTX 560 Ti|122
GeForce GTX 460 SE|122
Quadro M4000|122
GeForce GTX880M OpenGL Engine|122
Quadro P620|121
GeForce GTX 560 SE|121
GeForce GTX880M by nikey22|121
GeForce GTX 555|121
GeForce GTX 965M OpenGL Engine|121
GeForce GTX 850A|121
Quadro K5000 OpenGL Engine|120
GeForce GTX 580 OpenGL Engine|120
Quadro K3100M|120
GeForce GTX 650 Ti BOOST|119
GeForce GTX 570M|119
GeForce GTX 675MX OpenGL Engine|119
GeForce GTX 775M Mac Edition|119
Zotac GeForce GTX 1050 Ti|118
GeForce GTX 965M|117
Quadro M600M|117
GeForce GTX 780M by Nick[D]vB|117
GeForce GTX 460 SE|117
GeForce GTX 555|116
GeForce GTX 670M|116
Quadro K3000M|116
GeForce GTX 780 Ti OpenGL Engine|116
Quadro K4000M|115
GeForce GTX 860M|115
Asus GeForce GTX 660|115
Tesla C2075|114
GeForce GTX 675MX Mac Edition|114
Zotac GeForce GTX 770|114
Gigabyte GeForce GTX 750 Ti|114
GeForce MX330|114
GeForce GT 1030|113
GeForce GTX TITAN OpenGL Engine|113
GeForce GTX 590|113
Quadro K620|113
GeForce GTX 780M|112
GeForce GTX 560 Ti|112
Quadro 6000|112
EVGA GeForce GTX 560 Ti|112
Asus GeForce GTX 960|112
Quadro K5000|112
Point of View GeForce GTX 470|111
PNY GeForce GTX 580|111
GeForce GTX 770M|111
GeForce GT 120|111
MSi GeForce GTX 660|111
Gigabyte GeForce GTX 560|111
GeForce GTX 680MX|110
GeForce 945M|110
GeForce GTX 765M|110
GeForce GTX 950 OpenGL Engine|110
GeForce Pre-Release Tesla C2075 OpenGL Engine|109
GeForce GTX 550 Ti|109
GeForce GTX 765M|108
PNY GeForce GTX 750|108
GeForce GTX 560 Ti 448 Cores|108
Quadro P500|108
GeForce GTX 670MX|108
GeForce GTX 680MX|107
GeForce GTX 460 SE|107
GeForce GTX 675MX Mac Edition|107
GeForce GTX 770M OpenGL Engine|107
GeForce 945M|107
GeForce GTX 675MX|107
PNY GeForce GTX 570 HD|106
GeForce GTX 745|106
GeForce MX230|106
GeForce GTX 670MX|106
GeForce 845M|106
Quadro K3100M OpenGL Engine|105
Quadro P2000|105
GeForce MX570 A|105
GeForce GTX 750 Ti|104
GeForce GTX 660 OEM|104
Quadro M600M|104
GeForce GTX 750|104
GeForce GTX 645|104
GP108|104
Quadro P520|104
Zotac GeForce GTX 460|103
Chip Model|103
GeForce GTX 670M|103
Quadro T1000|103
GeForce GTX 670M|103
GeForce GTX 650|103
Zotac GeForce GTX 750|102
GeForce GTX 460 OpenGL Engine|102
GeForce GTX 860M OpenGL Engine|102
Quadro 4000|102
Asus GeForce GTX 480|102
Zotac GeForce GTX 650 Ti|102
GeForce GT 755M|101
GF100 Board - 10220000|101
GeForce GTX 470M|101
GeForce GTX 570 Rev. 2|101
GeForce GTX 775M by iDopt Mac|101
GeForce GTX 765M by Nick[D]vB|101
GeForce GTX 570|101
GeForce GTX 645|101
GeForce GTX 550 Ti|100
GeForce GTX 760M|100
GeForce GT 1030 OpenGL Engine|100
GeForce GTX 650|100
Quadro P400|100
GeForce GTX 480|99
EVGA GeForce GTX 650|99
EVGA GeForce GTX 560|99
GeForce MX130|99
GeForce MX130|98
Asus GeForce GTX 460|98
Elitegroup GeForce GTX 460|98
Tesla V100-SXM2-32GB|98
GeForce GT 755M|98
GeForce GTX 760 Ti OpenGL Engine|98
Quadro P520|97
GeForce GT 755M Mac Edition|97
GeForce GTX 1060 5GB|97
Palit GeForce GTX 650 Ti|97
MSi GeForce GTX 460|96
GeForce GTX 650|96
Gigabyte GeForce GTX 580|96
Gigabyte GeForce GTX 460|96
GeForce GTX 745|96
EVGA GeForce GTX 550 Ti|96
GeForce GTX 465|96
GeForce GTX 460 SE|96
GeForce GTX 765M|96
GeForce GT 755M Mac Edition|96
Quadro M520|95
Quadro K620|95
T1000|95
GeForce GTX 745|95
Quadro K620|95
GeForce GT 755M|94
GeForce GTX 660 Ti OpenGL Engine|94
Quadro K3000M|94
Quadro K4000|94
Quadro K4000 OpenGL Engine|94
GeForce GTX 560|94
GeForce GTX 650 Ti OpenGL Engine|94
Zotac GeForce GTX 560|94
Asus GeForce GTX 560|93
GeForce GTX 650 Ti|93
GeForce GPU|92
GeForce GTX 460|92
MSi GeForce GTX 650 Ti|92
GeForce GTX 645|92
Gigabyte GeForce GTX 760|92
GeForce GTX 660M|92
GeForce GTS 450|92
GeForce GTX 765M|92
Quadro K2000D|92
Quadro K2000|91
GeForce GT 740|91
GeForce GTX 650|91
GRID M6-0B|91
HP Quadro K620|91
GeForce MX130|91
Quadro K3000M by ST3PHL3|91
Quadro 4000|90
GeForce MX230|90
Quadro K620|90
Quadro K2100M by Nick[D]vB|90
Quadro K3000M by nikey22|89
GeForce GT 650M OpenGL Engine|89
Quadro 4000|89
Quadro K3000M|88
GeForce GTX 660M|88
Quadro K6000|87
GeForce GT 755M Mac Edition|87
Palit GeForce GTX 650|87
Quadro P500|87
GeForce GTX 570M|86
Gainward GeForce GTX 460|86
GeForce GTX 950M|86
Quadro K2000D|86
GeForce GTX 650 Ti BOOST|86
Quadro K2100M|86
GeForce GTX 470|85
Quadro K2000|85
Quadro K2000|85
GeForce GT 750M Mac Edition|85
GeForce GTX 745|85
GRID K220Q|85
GeForce GTX 750 OpenGL Engine|85
Quadro 5000M|84
Quadro P400|84
GeForce GTS 450|84
GeForce GT 640 Rev. 2|84
GeForce GTX 660M Mac Edition|84
Quadro P400|84
Asus GeForce GTX 560 SE|84
PNY GeForce GTX 460|83
GeForce GT 640 Rev. 2|83
GeForce GTS 450 Rev. 2|83
GeForce GTS 450|83
GeForce GTS 450 Rev. 2|83
GeForce GTX 645|82
GeForce GPU|82
GeForce GTX 560M|82
Quadro K3000M|82
Quadro K2100M by nikey22|82
Gigabyte GeForce GTX 750|82
GeForce GT 740|82
GeForce GT 750M Mac Edition|82
GeForce GTX 765M OpenGL Engine|82
GeForce GTX 645 OpenGL Engine|82
Quadro K620|81
GeForce GTX 550 Ti OpenGL Engine|81
Quadro 4000M|81
PNY GeForce GTX 550 Ti|81
GeForce MX110|80
GeForce GTX 760M|80
MSi GeForce GTX 745|80
Quadro K2100M OpenGL Engine|80
Quadro K2000|80
Quadro 5000|80
Quadro K620 OpenGL Engine|80
MSi GeForce GTX 745|80
GeForce GT 755M OpenGL Engine|80
GeForce GTX 660M|79
Gigabyte GeForce GTX 550 Ti|79
MSi GeForce GTX 650|79
GeForce GTX 560M|79
Quadro P400|78
Quadro K2100M|78
Quadro K2100M|78
Zotac GeForce GTX 1050 Ti|78
Quadro 3000M|77
GeForce 940A|77
GeForce GTX 460M|77
GeForce GTX 550 Ti|77
GeForce GT 545|77
GeForce GT 650M Mac Edition|77
GeForce 940MX|76
GeForce GTX 650 OEM|76
GeForce GTX 550 Ti|76
GeForce GT 755M Mac Edition|76
GeForce GT 740 OpenGL Engine|75
Gainward GeForce GTX 550 Ti|75
Quadro K1200|75
GeForce GT 650M Mac Edition|75
EVGA GeForce GTX 650|75
GeForce GT 750M Mac Edition|74
GeForce GTX 745|73
GeForce GTX 555|73
GeForce GTX 650|73
Gainward GeForce GTS 450|73
GeForce GT 650M|73
GeForce GT 755M Mac Edition|73
GeForce GTX 460M|72
GeForce 930A|72
GeForce 930MX|72
GeForce 940MX|72
GeForce MX110|72
GeForce GT 750M Mac Edition|72
Quadro 2000|72
GeForce 845M|71
Quadro 2000D|71
GeForce GT 640 Rev. 2|71
GeForce MX110|71
GeForce GT 1010|71
GeForce GT 545|71
Quadro K1200 OpenGL Engine|71
GeForce 940MX|71
GeForce GTX 650 OpenGL Engine|71
EVGA GeForce GTX 650 Ti BOOST|71
Quadro K2100M|70
GeForce GT 1010|70
Quadro M500M|70
GeForce GT 650M Mac Edition|70
GeForce GT 640 OEM|70
Quadro K2000D|70
Quadro K2000 OpenGL Engine|70
GeForce GT 750M Mac Edition|70
GeForce GT 650M|69
Quadro K1100M by Nick[D]vB|69
GeForce GT 650M|69
GeForce 940M|69
GeForce GT 650M|69
Quadro 4000|69
GeForce GT 650M Mac Edition|69
GeForce GT 745M|69
Gainward GeForce GTX 560 Ti|68
GeForce 920MX|68
Quadro M520|68
GeForce GT 640|68
GeForce 840M|68
GeForce 9800 GTX / 9800 GTX+|68
GeForce GTX 770M by Nick[D]vB|67
Zotac GeForce GTX 650|67
Asus GeForce GTX 550 Ti|67
GeForce GT 750M|67
Quadro K3100M by nikey22|67
GeForce GT 750M|67
GeForce GTX 760 (192-bit) OpenGL Engine|67
HP Quadro 4000|67
Quadro K2000|67
GeForce GTS 450 Rev. 2|67
GeForce 930MX|67
GeForce GTX 660M Mac Edition|66
GeForce GTX 570|66
GeForce GT 750M|66
GeForce GT 650M Mac Edition|66
GeForce GT 650M OpenGL Engine|65
GeForce GTX 660M OpenGL Engine|65
GeForce 930M|65
Palit GeForce GTX 650|65
GeForce GTX 760M|65
GeForce GT 650M Mac Edition|65
GeForce 940M|65
GeForce GT 750M Mac Edition|64
GeForce 940M|64
GeForce GT 740|63
GeForce 930MX|63
Quadro 3000M|63
GeForce GT 730|63
Quadro K1100M|63
GeForce GT 750M|63
GeForce 840M|63
GeForce GT 640 OEM|63
GeForce 840M|63
GeForce GT 640 Rev. 2|62
GeForce GTS 450|62
Quadro 2000|62
GeForce GT 745M|62
GeForce GT 740|62
GeForce GT 640|62
Quadro 2000|62
GeForce GTX 660M Mac Edition|62
Quadro K1100M OpenGL Engine|62
Quadro K2000M|62
GeForce GTX 680MX OpenGL Engine|61
EVGA GeForce GT 730|61
Quadro 2000D|61
GeForce 840A|61
MSi GeForce GTX 660 Ti|61
Quadro K1100M|61
GeForce GT 645M|61
GeForce GTX 780M OpenGL Engine|61
HP GeForce GT 730|61
Quadro K5000M OpenGL Engine|61
EVGA GeForce GT 640|61
GeForce 920MX|60
Quadro M500M|60
Quadro K620M|60
GeForce 930M|60
GeForce 930A|60
GeForce GT 640 OEM|60
GeForce GT 640|60
Quadro 2000M|60
GeForce GT 640|60
GeForce GT 640M Mac Edition|60
GeForce GT 640M Mac Edition|60
GeForce GT 640M Mac Edition|59
GeForce GT 645M|59
GeForce 930M|59
Gigabyte GeForce GTX 650 Ti|59
GeForce GT 640 OEM|59
GeForce 830M|59
Asus GeForce GT 640|58
MSI GeForce GTX 1070|58
GeForce GT 555M|58
Quadro K2000M|58
Quadro K1100M|57
GeForce GT 650M Mac Edition|57
Quadro K2000M by Nick[D]vB|57
EVGA GeForce GTX 650 Ti|57
GeForce GT 640M|56
GeForce GT 650M Mac Edition|56
GeForce GT 445M|56
GeForce 830A|56
GeForce 9800 GT|56
Asus GeForce GTS 450|55
GeForce 830M|55
GeForce 920MX|55
Quadro 2000|55
EVGA GeForce GT 545|54
Quadro K2000M|54
GeForce GT 650M Mac Edition|54
GeForce GTX 280|54
GeForce GT 640|53
Quadro FX 2800M|53
Quadro 3000M OpenGL Engine|53
GeForce GT 740|53
null GeForce 920A|53
GeForce GT 640M Mac Edition|52
GeForce GT 635|52
Graphics Device|52
GeForce GT 640M|52
GeForce GTX 660M Mac Edition|52
Quadro 2000M|52
Quadro 5010M|52
GeForce GTS 250|52
GeForce GT 445M|51
GeForce GT 640M OpenGL Engine|51
GeForce GT 640M|50
EVGA GeForce GT 740|50
GeForce GT 640M Mac Edition|50
GeForce 730A|50
GeForce 920M|49
HP Quadro 2000|49
GeForce GT 730M|49
null GeForce 920A|49
GeForce GT 555M|49
GeForce GT 640M LE|49
GeForce GT 730M|49
GeForce GT 730M|48
GeForce GT 640M Mac Edition|48
Quadro K2000M OpenGL Engine|48
GeForce GT 640M LE|48
GeForce GT 740M|47
GeForce GTX 460M|47
GeForce GT 440|47
GeForce GT 440|46
GeForce GT 640M Mac Edition|46
Quadro P400|46
GeForce GT 730|46
Dell Quadro 2000M|45
GeForce GT 740M|45
GeForce GT 740M|45
GeForce GTS 450 Rev. 2|45
GeForce 920M|45
GeForce 920M|45
GeForce 910M|44
GeForce GTX 680M|44
GeForce GT 730|44
Quadro 2000M|44
GeForce GT 635|43
GeForce GT 720 OpenGL Engine|43
GeForce GT 635|43
Quadro K5200 OpenGL Engine|43
Zotac GeForce GTX 650|43
GeForce GT 440|43
GeForce GT 435M|42
GeForce GT 735M|42
Gainward GeForce GT 630|42
Quadro 1000M|42
GeForce 820M|41
GeForce GTX 680M OpenGL Engine|41
MSI GeForce GT 635|41
GeForce 820A|41
Tesla M10|41
Asus GeForce GT 440|40
Asus GeForce GT 630|40
GeForce GT 820M|40
GeForce 910M|40
GeForce GT 820M|40
GeForce GT 730|40
GeForce GT 550M|40
GeForce GT 430|40
GeForce GT 540M|39
Asus GeForce GT 720|39
GeForce GT 630|39
GeForce GT 530|39
GeForce GT 635M|39
GeForce GT 620M/630M/635M/640M LE|39
NVS 5400M|39
Quadro K600|39
Quadro K610M|39
Asus GeForce GT 730|39
GeForce GT 630|39
GeForce GT 440|39
GeForce GT 630M|38
GeForce 820M|38
Quadro K420|38
Quadro K610M|38
GeForce GT 625M|38
Quadro K1000M|38
NVS 5200M|38
GRID K1|38
Quadro K600|38
Quadro K420|38
GeForce GT 630|38
Quadro K600|37
Quadro 600|37
HP Quadro 600|37
Quadro K1000M|37
Quadro K610M|37
GRID K180Q|37
GRID K160Q|37
GeForce GT 635M|37
Gigabyte GeForce GT 440|37
GeForce 820M|37
GeForce GT 530|37
GeForce GT 540M|37
GeForce GT 630 OEM|37
Quadro K610M by Nick[D]vB|37
NVS 510|37
GeForce GT 630M|37
Quadro 1000M|37
GeForce GT 540M|37
GeForce GT 530|37
Quadro K1100M|37
Quadro K620M|37
Quadro 1000M|36
GeForce GT 730|36
GeForce 820M|36
GeForce GT 430|36
GRID K1|36
GeForce GT 525M|36
NVS 5200M|36
NVS 510|36
Zotac GeForce GT 430|36
Quadro K600|36
Asus GeForce GT 730|36
HP Quadro K4000|35
GeForce GT 755M Mac Edition|35
GeForce GT 630|35
NVS 5400M|35
NVS 5400M|35
GeForce GT 640 OpenGL Engine|35
GeForce GT 625M|35
GeForce GT 630|35
GeForce GT 430|35
Quadro K600 OpenGL Engine|35
Quadro K1000M|35
Zotac GeForce GT 630|35
Gigabyte GeForce GT 630|35
GRID K140Q vGPU|35
GeForce GT 710M|35
GeForce GT 620M|35
GeForce GT 720M|34
GeForce 710M|34
Quadro 1000M,|34
Quadro K510M|34
GeForce 9400 GT|34
Quadro K1000M|34
GeForce GT 635M|34
Quadro K420|34
GRID K180Q|34
Asus GeForce GT 430|34
Quadro K4100M|34
Gigabyte GeForce GT 730|34
GeForce GT 620M|34
GeForce GT 525M|34
Quadro K420|34
Dell NVS 5200M|34
GeForce 710A|34
GeForce GT 425M|33
GeForce GT 710B|33
GeForce GT 525M|33
Quadro 600|33
GeForce GT 620M|33
Quadro K600|33
Quadro 600|33
GeForce 610M/710M/810M/820M / GT 620M/625M/630M/720M|33
MSI GeForce GT 730|33
GeForce GT 710|33
GeForce GT 435M|33
NVS 510|33
Asus GeForce GT 710|33
NVS 510|32
GeForce 710M|32
GeForce GT 720M|32
GeForce GT 730A|32
GeForce GT 710M|32
GIGABYTE GeForce GTX 660|31
EVGA GeForce GT 710|31
GeForce GT 710|31
GeForce GT 710|31
GeForce GT 425M|31
GeForce GT 720|31
EVGA GeForce GT 710|31
Quadro K1000M by Nick[D]vB|31
Asus GeForce GT 710|31
GeForce GT 720|31
GeForce GT 420M|30
GeForce GT 710|30
null Graphics Device|30
GeForce GT 240|30
GeForce 810M|29
GeForce GT 720M|29
GeForce GT 710|29
Quadro 600|29
GeForce 810M|29
GeForce GT 420M|28
Quadro 410|28
GeForce GTX 660M|28
MSI GeForce GT 710|28
GeForce GT 720|28
GeForce GT 735M|27
GeForce GT 720|27
GeForce GT 720|27
GeForce GT 630 OpenGL Engine|27
Quadro 410|27
GeForce GT 330M|26
GeForce GT 420M|26
GeForce GT 430|26
GeForce 615|25
GeForce GTX 760A|25
Toshiba GeForce GT 525M|25
GeForce GT 520MX|25
GeForce GT 620|25
GeForce GT 625|25
GeForce GT 710|24
Quadro NVS 4200M|24
GeForce 840A|24
GeForce 610M|24
GeForce 800M|24
GeForce GT 420|24
GeForce 705M|23
GeForce GT 705|23
GeForce 800M|23
GeForce 610M|23
GeForce GT 620 OEM|23
GeForce GT 625|23
GeForce GT 420|23
Quadro NVS 4200M|23
GeForce GT 520M|22
NVS 4200M|22
GeForce GT 620 OEM|22
NVS 5200M|22
GeForce GT 620 OEM|22
GeForce GT 620|22
GeForce GT 705|21
GeForce GT 620|21
GeForce GT 630 Rev. 2|21
Quadro NVS 4200M|21
GeForce GT 520M|20
GTX 980M SLI|20
GeForce GT 620|20
GeForce GT 520M|20
GeForce GT 520|19
GeForce 410M|19
GeForce 730A|19
GeForce GT 520|19
GeForce GT 610|19
Asus GeForce GT 610|19
NVS 310|18
GeForce 410M|18
NVS 315|18
GeForce 605|18
GeForce GT 610|18
GeForce GT 520|17
GeForce MX550|17
NVS 4200M|17
NVS 315|17
NVS 310|17
GeForce 410M|17
Palit GeForce GTX 660|17
GeForce 605|17
NVS 310|17
GeForce GT 415M|17
Zotac GeForce GT 610|17
GeForce GTX 675M|17
GeForce GT 610|16
Quadro 4000M|16
PNY GeForce GT 610|16
GeForce GT 610|16
GeForce 510|15
MSi GeForce GT 610|15
GeForce GT 735M|15
GeForce GT 520|15
GeForce 510|15
GeForce GT 320M|14
GeForce 9600M GT|14
GeForce GTX 570M|14
Corporation D3D12 (NVIDIA GeForce RTX 3080 Ti)|13
GeForce 510|13
Quadro FX 1800M|12
Asus GeForce GT 520|12
GeForce GT 705|12
MSi GeForce GT 630|11
Quadro 3000M|10
Gigabyte GeForce GT 610|10
Pegatron GeForce GT 420|9
GeForce 210|8
GeForce 9300 / nForce 730i|7
NVS 3100M|7
GeForce 8600 GT|5
GeForce 8400 GS Rev. 3|4
GeForce 8400 GS|3
GeForce 9600 GT|2
GeForce GT 550M|-1
GeForce 8600 GTS|-1
GeForce GT 520MX|-1
EVGA GeForce GTX 460|-1
EVGA GeForce GTX 970|-1
GP106|-1
GRID P4-2B|-1
Gainward GeForce GTX 650|-1
GeForce 210|-1
GeForce 310|-1
GeForce 310M|-1
GeForce 315|-1
GeForce 315M|-1
GeForce 320M|-1
GeForce 405|-1
GeForce 610M|-1
GeForce 820A|-1
GeForce 8300 GS|-1
GeForce 8400 GS|-1
GeForce 8400 GS Rev. 2|-1
GeForce 8400 GS Rev. 3|-1
GeForce 8400M GS|-1
GeForce 8400M GT|-1
GeForce 8500 GT|-1
GeForce 8600 GT|-1
GeForce 8600M GS|-1
GeForce 8600M GT|-1
GeForce 8700M GT|-1
GeForce 8800 GT|-1
GeForce 8800 GTS|-1
GeForce 8800 GTS 512|-1
GeForce 8800 GTX|-1
GeForce 8800M GTX|-1
GeForce 9200M GE|-1
GeForce 9200M GS|-1
GeForce 9300 / nForce 730i|-1
GeForce 9300 GE|-1
GeForce 9300 GS|-1
GeForce 9300M GS|-1
GeForce 9400|-1
GeForce 9400M|-1
GeForce 9500 GT|-1
GeForce 9500M GS|-1
GeForce 9600 GS|-1
GeForce 9600 GSO|-1
GeForce 9600 GSO 512|-1
GeForce 9600 GT|-1
GeForce 9600M GS|-1
GeForce 9600M GT|-1
GeForce 9600M GT / GeForce GT 220M|-1
GeForce 9800 GT|-1
GeForce 9800 GTX+|-1
GeForce 9800 GTX/9800 GTX+|-1
GeForce 9800M GTS|-1
GeForce G 103M|-1
GeForce G 105M|-1
GeForce G105M|-1
GeForce G205M|-1
GeForce G210|-1
GeForce G210M|-1
GeForce GT 120|-1
GeForce GT 120M|-1
GeForce GT 130|-1
GeForce GT 130M|-1
GeForce GT 220|-1
GeForce GT 220M|-1
GeForce GT 230|-1
GeForce GT 230M|-1
GeForce GT 240|-1
GeForce GT 240M|-1
GeForce GT 240M|-1
GeForce GT 320|-1
GeForce GT 320M|-1
GeForce GT 325M|-1
GeForce GT 330|-1
GeForce GT 330M|-1
GeForce GT 335M|-1
GeForce GT 435M|-1
GeForce GT 520M|-1
GeForce GT 525M|-1
GeForce GT 555M/635M|-1
GeForce GTS 240|-1
GeForce GTS 250|-1
GeForce GTS 360M|-1
GeForce GTX 1180|-1
GeForce GTX 260|-1
GeForce GTX 260M|-1
GeForce GTX 275|-1
GeForce GTX 280|-1
GeForce GTX 285|-1
GeForce GTX 295|-1
GeForce GTX 560 SE|-1
GeForce GTX 750 v2|-1
GeForce RTX T10-16|-1
GeForce RTX T10-8|-1
Gigabyte GeForce GTX 1050 Ti|-1
ION|-1
MSI GeForce GT 710|-1
NVS 300|-1
NVS 3100M|-1
NVS 4200M|-1
NVS 5100M|-1
Palit GTX 680 JetStream|-1
Quadro FX 1700|-1
Quadro FX 1700M|-1
Quadro FX 1800|-1
Quadro FX 1800M|-1
Quadro FX 2700M|-1
Quadro FX 2800M|-1
Quadro FX 3600M|-1
Quadro FX 360M|-1
Quadro FX 370|-1
Quadro FX 3700|-1
Quadro FX 3700M|-1
Quadro FX 380 LP|-1
Quadro FX 3800|-1
Quadro FX 3800M|-1
Quadro FX 4600|-1
Quadro FX 4800|-1
Quadro FX 4800|-1
Quadro FX 5600|-1
Quadro FX 570M|-1
Quadro FX 580|-1
Quadro FX 770M|-1
Quadro FX 880M|-1
Quadro K1100M by Nick[D]vB|-1
Quadro K2000D|-1
Quadro K2000M|-1
Quadro K2100M by Nick[D]vB|-1
Quadro NVS 135M|-1
Quadro NVS 140M|-1
Quadro NVS 160M|-1
Quadro NVS 290|-1
Quadro NVS 295|-1
Quadro NVS 4200M|-1
Quadro P4000 OpenGL Engine|-1
Sony GeForce 410M|-1
Zotac GeForce GTX 780|-1
`;function n(){return t}},589233:function(e,r,o){"use strict";o.d(r,{Z:function(){return t}});class t{constructor(){this._eventMap=new Map}on(e,r){return e&&"function"==typeof r&&(this._eventMap.has(e)||this._eventMap.set(e,[]),this._eventMap.get(e).push(r)),this}once(e,r){var o=this;if(e&&"function"==typeof r){let t=function(){r(...arguments),o.off(e,t)};this.on(e,t)}}off(e,r){if(e){if("function"==typeof r){let o=this._eventMap.get(e);if(Array.isArray(o)&&o.length){let e=-1;for(;(e=o.findIndex(e=>e===r))>-1;)o.splice(e,1)}}else null==r&&this._eventMap.delete(e)}return this}emit(e){for(var r=arguments.length,o=Array(r>1?r-1:0),t=1;t<r;t++)o[t-1]=arguments[t];return!!this._eventMap.has(e)&&(this._eventMap.get(e).forEach(e=>e(...o)),!0)}}},40072:function(e,r,o){"use strict";o.d(r,{j:function(){return i}});var t=o(369765),n=o.n(t);let i=(e,r=[])=>{var o,t,i;let c="";for(let{param_name:t}of r)c+=`,${t}=${null!=(o=e[t])?o:""}`;let G=n()(c.substring(1)),a={};return window.byted_acrawler&&(a=null==(t=null==window?void 0:window.byted_acrawler)?void 0:t.frontierSign({"X-MS-STUB":G})),{signature:null!=(i=a["X-Bogus"])?i:""}}},857144:function(e){var r={utf8:{stringToBytes:function(e){return r.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(r.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var r=[],o=0;o<e.length;o++)r.push(255&e.charCodeAt(o));return r},bytesToString:function(e){for(var r=[],o=0;o<e.length;o++)r.push(String.fromCharCode(e[o]));return r.join("")}}};e.exports=r},356664:function(e,r,o){"use strict";o.d(r,{Z:function(){return i}});var t=o(726588),n=o(144256);function i(e){(0,n.Z)(1,arguments);var r=(0,t.Z)(e),o=r.getMonth();return r.setFullYear(r.getFullYear(),o+1,0),r.setHours(23,59,59,999),r}},870108:function(e,r,o){"use strict";o.d(r,{Z:function(){return i}});var t=o(726588),n=o(144256);function i(e){(0,n.Z)(1,arguments);var r=(0,t.Z)(e);return r.setHours(0,0,0,0),r}},517943:function(e,r,o){var t=o(105723),n=o(293137);e.exports=function(e,r){var o=-1,i=n(e)?Array(e.length):[];return t(e,function(e,t,n){i[++o]=r(e,t,n)}),i}},756384:function(e,r,o){var t=o(79543),n=o(849771);e.exports=function(e,r){return t(e,r,function(r,o){return n(e,o)})}},818855:function(e,r,o){e=o.nmd(e);var t=o(956823),n=r&&!r.nodeType&&r,i=n&&e&&!e.nodeType&&e,c=i&&i.exports===n?t.Buffer:void 0,G=c?c.allocUnsafe:void 0;e.exports=function(e,r){if(r)return e.slice();var o=e.length,t=G?G(o):new e.constructor(o);return e.copy(t),t}},557650:function(e,r,o){var t=o(476994),n=o(694859),i=o(337920),c=o(167970),G=o(701821),a=o(945068),s=Math.ceil;e.exports=function(e,r){var o=(r=void 0===r?" ":n(r)).length;if(o<2)return o?t(r,e):r;var l=t(r,s(e/G(r)));return c(r)?i(a(l),0,e).join(""):l.slice(0,e)}},696273:function(e,r,o){var t=o(223283);e.exports=function(){this.__data__=new t,this.size=0}},216563:function(e){var r="\ud800-\udfff",o="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",t="\ud83c[\udffb-\udfff]",n="[^"+r+"]",i="(?:\ud83c[\udde6-\uddff]){2}",c="[\ud800-\udbff][\udc00-\udfff]",G="(?:"+o+"|"+t+")?",a="[\\ufe0e\\ufe0f]?",s="(?:\\u200d(?:"+[n,i,c].join("|")+")"+a+G+")*",l=RegExp(t+"(?="+t+")|"+("(?:"+[n+o+"?",o,i,c,"["+r+"]"].join("|")+")")+(a+G+s),"g");e.exports=function(e){return e.match(l)||[]}},725557:function(e){e.exports=function(e,r){return e===r||e!=e&&r!=r}},640525:function(e,r,o){var t=o(849747),n=o(757825),i=o(417517),c=i&&i.isSet,G=c?n(c):t;e.exports=G},494629:function(e,r,o){var t=o(236070),n=o(745627);e.exports=function(e,r){return e&&e.length?t(e,n(r)):void 0}},264034:function(e,r,o){var t=o(649440);e.exports=function(e){return t(2,e)}},945027:function(e,r,o){var t=o(894288)("toUpperCase");e.exports=t},955038:function(e,r,o){"use strict";var t=o(695575);function n(){}function i(){}i.resetWarningCache=n,e.exports=function(){function e(e,r,o,n,i,c){if(c!==t){var G=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw G.name="Invariant Violation",G}}function r(){return e}e.isRequired=e;var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:i,resetWarningCache:n};return o.PropTypes=o,o}},582740:function(e,r,o){"use strict";e.exports=n;var t=o(570581);function n(e,r){this.lo=e>>>0,this.hi=r>>>0}var i=n.zero=new n(0,0);i.toNumber=function(){return 0},i.zzEncode=i.zzDecode=function(){return this},i.length=function(){return 1};var c=n.zeroHash="\0\0\0\0\0\0\0\0";n.fromNumber=function(e){if(0===e)return i;var r=e<0;r&&(e=-e);var o=e>>>0,t=(e-o)/4294967296>>>0;return r&&(t=~t>>>0,o=~o>>>0,++o>4294967295&&(o=0,++t>4294967295&&(t=0))),new n(o,t)},n.from=function(e){if("number"==typeof e)return n.fromNumber(e);if(t.isString(e)){if(!t.Long)return n.fromNumber(parseInt(e,10));e=t.Long.fromString(e)}return e.low||e.high?new n(e.low>>>0,e.high>>>0):i},n.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,o=~this.hi>>>0;return!r&&(o=o+1>>>0),-(r+4294967296*o)}return this.lo+4294967296*this.hi},n.prototype.toLong=function(e){return t.Long?new t.Long(0|this.lo,0|this.hi,!!e):{low:0|this.lo,high:0|this.hi,unsigned:!!e}};var G=String.prototype.charCodeAt;n.fromHash=function(e){return e===c?i:new n((G.call(e,0)|G.call(e,1)<<8|G.call(e,2)<<16|G.call(e,3)<<24)>>>0,(G.call(e,4)|G.call(e,5)<<8|G.call(e,6)<<16|G.call(e,7)<<24)>>>0)},n.prototype.toHash=function(){return String.fromCharCode(255&this.lo,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,255&this.hi,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)},n.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this},n.prototype.zzDecode=function(){var e=-(1&this.lo);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this},n.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,o=this.hi>>>24;return 0===o?0===r?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:o<128?9:10}},815065:function(e){e.exports=function(e,r,o,t){var n=o?o.call(t,e,r):void 0;if(void 0!==n)return!!n;if(e===r)return!0;if("object"!=typeof e||!e||"object"!=typeof r||!r)return!1;var i=Object.keys(e),c=Object.keys(r);if(i.length!==c.length)return!1;for(var G=Object.prototype.hasOwnProperty.bind(r),a=0;a<i.length;a++){var s=i[a];if(!G(s))return!1;var l=e[s],T=r[s];if(!1===(n=o?o.call(t,l,T,s):void 0)||void 0===n&&l!==T)return!1}return!0}},873019:function(e,r,o){"use strict";var t=o(101199),n="function"==typeof Object.is?Object.is:function(e,r){return e===r&&(0!==e||1/e==1/r)||e!=e&&r!=r},i=t.useState,c=t.useEffect,G=t.useLayoutEffect,a=t.useDebugValue;function s(e){var r=e.getSnapshot;e=e.value;try{var o=r();return!n(e,o)}catch(e){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,r){return r()}:function(e,r){var o=r(),t=i({inst:{value:o,getSnapshot:r}}),n=t[0].inst,l=t[1];return G(function(){n.value=o,n.getSnapshot=r,s(n)&&l({inst:n})},[e,o,r]),c(function(){return s(n)&&l({inst:n}),e(function(){s(n)&&l({inst:n})})},[e]),a(o),o};r.useSyncExternalStore=void 0!==t.useSyncExternalStore?t.useSyncExternalStore:l},703205:function(e,r,o){"use strict";o.r(r)},985650:function(e,r,o){"use strict";o.r(r)},433850:function(e,r,o){"use strict";o.d(r,{Z:function(){return Q}}),o(932651),o(490629);var t=o(390063),n=o.n(t),i=o(876553),c=o.n(i),G=o(101199),a=o(426337),s=o(622689),l=o.n(s),T=o(406944),u=o(469935),d=o.n(u),F=o(900426),h=o(697752),f=o(289516),X=o(868976),p=o(565506),M=o(783250),g=o(650065),b=o(261606),m=o(678503);let v=T.U.PREFIX;class Q extends a.Z{get adapter(){var e=this;return Object.assign(Object.assign({},super.adapter),{getIsInGroup:()=>this.isInGroup(),disabledBodyScroll:()=>{let{getPopupContainer:e}=this.props;this.bodyOverflow=document.body.style.overflow||"",!e&&"hidden"!==this.bodyOverflow&&(document.body.style.overflow="hidden",document.body.style.width=`calc(${this.originBodyWidth||"100%"} - ${this.scrollBarWidth}px)`)},enabledBodyScroll:()=>{let{getPopupContainer:e}=this.props;!e&&"hidden"!==this.bodyOverflow&&(document.body.style.overflow=this.bodyOverflow,document.body.style.width=this.originBodyWidth)},notifyChange:(e,r)=>{let{onChange:o,onPrev:t,onNext:i}=this.props;n()(o)&&o(e),"prev"===r?t&&t(e):i&&i(e)},notifyZoom:(e,r)=>{let{onZoomIn:o,onZoomOut:t}=this.props;r?n()(o)&&o(e):n()(t)&&t(e)},notifyClose:()=>{let{onClose:e}=this.props;n()(e)&&e()},notifyVisibleChange:e=>{let{onVisibleChange:r}=this.props;n()(r)&&r(e)},notifyRatioChange:e=>{let{onRatioChange:r}=this.props;n()(r)&&r(e)},notifyRotateChange:e=>{let{onRotateLeft:r}=this.props;n()(r)&&r(e)},notifyDownload:(e,r)=>{let{onDownload:o}=this.props;n()(o)&&o(e,r)},notifyDownloadError:e=>{let{onDownloadError:r}=this.props;n()(r)&&r(e)},registerKeyDownListener:()=>{window&&window.addEventListener("keydown",this.handleKeyDown)},unregisterKeyDownListener:()=>{window&&window.removeEventListener("keydown",this.handleKeyDown)},getSetDownloadFunc:()=>{var e,r;return null!==(r=null===(e=this.context)||void 0===e?void 0:e.setDownloadName)&&void 0!==r?r:this.props.setDownloadName},isValidTarget:e=>{let r=this.headerRef&&this.headerRef.current,o=this.footerRef&&this.footerRef.current,t=this.leftIconRef&&this.leftIconRef.current,n=this.rightIconRef&&this.rightIconRef.current,i=e.target;return!(r&&r.contains(i)||o&&o.contains(i)||t&&t.contains(i)||n&&n.contains(i))&&!0},changeImageZoom:function(){var r;(null===(r=e.imageRef)||void 0===r?void 0:r.current)&&e.imageRef.current.foundation.changeZoom(...arguments)}})}static getDerivedStateFromProps(e,r){let o={},t=[];return e.visible&&(t=Array.isArray(e.src)?e.src:[e.src]),!c()(t,r.imgSrc)&&(o.imgSrc=t),e.visible!==r.visible&&(o.visible=e.visible,e.visible&&(o.preloadAfterVisibleChange=!0,o.viewerVisible=!0,o.rotation=0,o.ratio="adaptation")),"currentIndex"in e&&e.currentIndex!==r.currentIndex&&(o.currentIndex=e.currentIndex,o.ratio="adaptation"),o}componentDidMount(){this.scrollBarWidth=(0,m.np)(),this.originBodyWidth=document.body.style.width,this.props.visible&&this.foundation.beforeShow()}componentDidUpdate(e,r){e.src!==this.props.src&&this.foundation.updateTimer(),!e.visible&&this.props.visible&&this.foundation.beforeShow(),e.visible&&!this.props.visible&&this.foundation.afterHide()}componentWillUnmount(){this.foundation.clearTimer()}isInGroup(){return!!(this.context&&this.context.isGroup)}render(){let{getPopupContainer:e,closable:r,zIndex:o,visible:t,className:n,style:i,infinite:c,zoomStep:a,crossOrigin:s,prevTip:l,nextTip:T,zoomInTip:u,zoomOutTip:g,rotateTip:b,downloadTip:m,adaptiveTip:Q,originTip:E,showTooltip:R,disableDownload:A,renderPreviewMenu:y,renderHeader:P}=this.props,{currentIndex:S,imgSrc:w,zoom:I,ratio:x,rotation:L,viewerVisible:O}=this.state,N={zIndex:o};e&&(N={zIndex:o,position:"static"});let _=`${v}-preview`,D=d()(_,{[`${v}-hide`]:!t,[`${_}-popup`]:e},n),C=O?"":`${_}-hide`,K=w.length,B=1!==K&&(c||0!==S),k=1!==K&&(c||S!==K-1);return t&&G.createElement(F.Z,{getPopupContainer:e,style:N},G.createElement("div",{className:D,style:i,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp,ref:this.registryImageWrapRef,onMouseMove:this.handleMouseMove},G.createElement(X.Z,{ref:this.headerRef,className:d()(C),onClose:this.handlePreviewClose,renderHeader:P,closable:r}),G.createElement(M.Z,{ref:this.imageRef,src:w[S],onZoom:this.handleZoomImage,disableDownload:A,setRatio:this.handleAdjustRatio,zoom:I,ratio:x,rotation:L,crossOrigin:s,onError:this.onImageError,onLoad:this.onImageLoad}),B&&G.createElement("div",{ref:this.leftIconRef,className:d()(`${_}-icon`,`${_}-prev`,C),onClick:()=>this.handleSwitchImage("prev")},G.createElement(h.Z,{size:"large"})),k&&G.createElement("div",{ref:this.rightIconRef,className:d()(`${_}-icon`,`${_}-next`,C),onClick:()=>this.handleSwitchImage("next")},G.createElement(f.Z,{size:"large"})),G.createElement(p.Z,{forwardRef:this.footerRef,className:C,totalNum:K,curPage:S+1,disabledPrev:!B,disabledNext:!k,zoom:100*I,step:100*a,showTooltip:R,ratio:x,prevTip:l,nextTip:T,zIndex:o,zoomInTip:u,zoomOutTip:g,rotateTip:b,downloadTip:m,disableDownload:A,adaptiveTip:Q,originTip:E,onPrev:()=>this.handleSwitchImage("prev"),onNext:()=>this.handleSwitchImage("next"),onZoomIn:this.handleZoomImage,onZoomOut:this.handleZoomImage,onDownload:this.handleDownload,onRotate:this.handleRotateImage,onAdjustRatio:this.handleAdjustRatio,renderPreviewMenu:y})))}constructor(e){var r;super(e),r=this,this.viewVisibleChange=()=>{this.foundation.handleViewVisibleChange()},this.handleSwitchImage=e=>{this.foundation.handleSwitchImage(e)},this.handleDownload=()=>{this.foundation.handleDownload()},this.handlePreviewClose=e=>{this.foundation.handlePreviewClose(e)},this.handleAdjustRatio=e=>{this.foundation.handleAdjustRatio(e)},this.handleRotateImage=e=>{this.foundation.handleRotateImage(e)},this.handleZoomImage=function(e){let o=!(arguments.length>1)||void 0===arguments[1]||arguments[1];r.foundation.handleZoomImage(e,o)},this.handleMouseUp=e=>{this.foundation.handleMouseUp(e.nativeEvent)},this.handleMouseMove=e=>{this.foundation.handleMouseMove(e)},this.handleKeyDown=e=>{this.foundation.handleKeyDown(e)},this.onImageError=()=>{this.foundation.preloadSingleImage()},this.onImageLoad=e=>{this.foundation.onImageLoad(e)},this.handleMouseDown=e=>{this.foundation.handleMouseDown(e)},this.handleWheel=e=>{this.foundation.handleWheel(e)},this.registryImageWrapRef=e=>{this.imageWrapRef&&this.imageWrapRef.removeEventListener("wheel",this.handleWheel),e&&e.addEventListener("wheel",this.handleWheel,{passive:!1}),this.imageWrapRef=e},this.state={imgSrc:[],imgLoadStatus:new Map,zoom:.1,currentIndex:0,ratio:"adaptation",rotation:0,viewerVisible:!0,visible:!1,preloadAfterVisibleChange:!0,direction:""},this.foundation=new g.Z(this.adapter),this.bodyOverflow="",this.originBodyWidth="100%",this.scrollBarWidth=0,this.imageWrapRef=null,this.imageRef=G.createRef(),this.headerRef=G.createRef(),this.footerRef=G.createRef(),this.leftIconRef=G.createRef(),this.rightIconRef=G.createRef()}}Q.contextType=b.X,Q.propTypes={style:l().object,className:l().string,visible:l().bool,src:l().oneOfType([l().string,l().array]),currentIndex:l().number,defaultCurrentIndex:l().number,defaultVisible:l().bool,maskClosable:l().bool,closable:l().bool,zoomStep:l().number,infinite:l().bool,showTooltip:l().bool,closeOnEsc:l().bool,prevTip:l().string,nextTip:l().string,zoomInTip:l().string,zoomOutTip:l().string,downloadTip:l().string,adaptiveTip:l().string,originTip:l().string,lazyLoad:l().bool,preLoad:l().bool,preLoadGap:l().number,disableDownload:l().bool,viewerVisibleDelay:l().number,zIndex:l().number,maxZoom:l().number,minZoom:l().number,renderHeader:l().func,renderPreviewMenu:l().func,getPopupContainer:l().func,onVisibleChange:l().func,onChange:l().func,onClose:l().func,onZoomIn:l().func,onZoomOut:l().func,onPrev:l().func,onNext:l().func,onDownload:l().func,onRatioChange:l().func,onRotateLeft:l().func},Q.defaultProps={showTooltip:!1,zoomStep:.1,infinite:!1,closeOnEsc:!0,lazyLoad:!1,preLoad:!0,preLoadGap:2,zIndex:T.K.DEFAULT_Z_INDEX,maskClosable:!0,viewerVisibleDelay:1e4,maxZoom:5,minZoom:.1}},387132:function(e,r,o){"use strict";o(228983),o(759943);var t=o(494629),n=o.n(t),i=o(101199),c=o(448714),G=o(859725);r.Z=e=>{var r;let o=n()(null===(r=e.className)||void 0===r?void 0:r.split("-"),-1);return o?i.createElement(c.Z,{code:e.children,language:o,lineNumber:!0}):i.createElement("span",{className:`${G.U.PREFIX}-simple-code`},e.children)}},449386:function(e,r,o){"use strict";o.d(r,{Z:function(){return s}}),o(932651);var t=o(795233),n=o.n(t),i=o(101199),c=o(38542),G=o(9444),a=o(104200);function s(e){let{prefixCls:r,locale:o,collapseText:t,isCollapsed:s,onClick:l=n()}=e,T={icon:i.createElement(c.Z,null),type:"tertiary",theme:"borderless",onClick:()=>{"function"==typeof l&&l(!s)}},u=s?null==o?void 0:o.expandText:null==o?void 0:o.collapseText;return"function"==typeof t&&(u=t(s)),i.createElement("div",{className:`${r}-collapse-btn`},s?i.createElement(a.Z,{content:u,position:"right"},i.createElement(G.Z,Object.assign({},T))):i.createElement(G.Z,Object.assign({},T),u))}},537641:function(e,r,o){"use strict";o(932651);var t=o(101199),n=o(469935),i=o.n(n),c=o(622689),G=o.n(c),a=o(423340),s=o(361965),l=o(426337),T=o(59691),u=o(817924);let d=s.U.PREFIX;class F extends l.Z{componentDidMount(){this.foundation.init(),-1===this.handlerIndex&&(this.handlerIndex=this.context.registerHandler(this.handlerRef))}componentDidUpdate(e){}componentWillUnmount(){this.foundation.destroy()}get adapter(){return Object.assign(Object.assign({},super.adapter),{registerEvents:()=>{this.handlerRef.current.addEventListener("mousedown",this.onMouseDown),this.handlerRef.current.addEventListener("touchstart",this.onTouchStart)},unregisterEvents:()=>{this.handlerRef.current.removeEventListener("mousedown",this.onMouseDown),this.handlerRef.current.removeEventListener("touchstart",this.onTouchStart)}})}render(){let{style:e,className:r,children:o}=this.props,{direction:n}=this.context;return t.createElement("div",{className:i()(r,d+"-handler",d+"-handler-"+n),style:e,ref:this.handlerRef},null!=o?o:t.createElement(u.Z,{size:"inherit",style:{rotate:"horizontal"===this.context.direction?"0deg":"90deg"}}))}constructor(e){super(e),this.onMouseDown=e=>{let{notifyResizeStart:r}=this.context;r(this.handlerIndex,e,"mouse")},this.onTouchStart=e=>{let{notifyResizeStart:r}=this.context;r(this.handlerIndex,e.targetTouches[0],"touch")},this.getHandler=()=>this.handlerRef.current,this.state={},this.handlerRef=(0,t.createRef)(),this.foundation=new a.TQ(this.adapter),this.handlerIndex=-1}}F.propTypes={children:G().node,direction:G().string,onResizeStart:G().func,className:G().string,disabled:G().bool,style:G().object},F.defaultProps={},F.contextType=T.M,r.Z=F},754931:function(e,r,o){"use strict";o(932651);var t=o(101199),n=o(622689),i=o.n(n);o(535074);var c=o(259933),G=o(634239),a=o(380189),s=o(256108),l=o(572843),T=function(e,r){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>r.indexOf(t)&&(o[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)0>r.indexOf(t[n])&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(o[t[n]]=e[t[n]]);return o};class u extends t.Component{renderComponent(){let e=this.props,{type:r}=e,o=T(e,["type"]);switch(r){case"fill":return t.createElement(G.Z,Object.assign({},o));case"basic":return t.createElement(a.Z,Object.assign({},o));case"nav":return t.createElement(s.Z,Object.assign({},o));default:return null}}render(){let{type:e}=this.props;return t.createElement(l.Z.Provider,{value:{type:e}},this.renderComponent())}}u.Step=c.Z,u.propTypes={onChange:i().func,type:i().oneOf(["fill","basic","nav"]),size:i().oneOf(["small","default"])},u.defaultProps={type:"fill",size:"default"},r.Z=u},492172:function(e,r,o){"use strict";o.d(r,{Bc:function(){return n.Bc},Vc:function(){return n.Vc},ht:function(){return t.h}});var t=o(117139),n=o(330287)},238928:function(e,r,o){"use strict";o.d(r,{i:function(){return i}}),o(932651);var t=o(91816),n=o(823794);function i(e){return Object.assign({plugins:[n.Z]},(0,t.FW)(e),e)}},313210:function(e,r,o){"use strict";o.d(r,{RM:function(){return s},ZP:function(){return l},l7:function(){return a}});var t=o(480333);o(490629),o(374954);var n=o(849066);let i={debug:1,log:2,warn:3,error:4},c=!1,G=2;try{let e=localStorage.getItem(n.ct.PLAYER_LOG);c=!!e;let r=Number(e);!Number.isNaN(r)&&r>=i.debug&&r<=i.error&&(G=r)}catch(e){}function a(){return c}function s(){return G}class l{debug(){for(var e=arguments.length,r=Array(e),o=0;o<e;o++)r[o]=arguments[o];l.loggerHandle("debug",...r)}log(){for(var e=arguments.length,r=Array(e),o=0;o<e;o++)r[o]=arguments[o];l.loggerHandle("log",...r)}warn(){for(var e=arguments.length,r=Array(e),o=0;o<e;o++)r[o]=arguments[o];l.loggerHandle("warn",...r)}error(){for(var e=arguments.length,r=Array(e),o=0;o<e;o++)r[o]=arguments[o];l.loggerHandle("error",...r)}table(e){}static setLevel(e){l.level=e}static setEnable(e){l.enable=e}static setLoggerSize(e){l.maxSize=e}set loggerID(e){e&&(this._id=e)}get loggerID(){return this._id}static logCache(e){if(l.size+=e.length,l.logTextArray.push(e),l.size>l.maxSize){let e=l.logTextArray.shift();e&&(l.size-=e.length)}}static loggerHandle(e){for(var r=arguments.length,o=Array(r>1?r-1:0),t=1;t<r;t++)o[t-1]=arguments[t];let n=i[e];if(!n)return;let c=`${o.join(" ")}`;n>=l.level&&(l.logCache(c),l.enable&&console[e](c))}static getLoggerCache(){return l.logTextArray.join("\n")}static reset(){l.logTextArray=[],l.size=0}constructor(e){return(0,t._)(this,"name",void 0),(0,t._)(this,"_id",void 0),this.name=e,new Proxy(this,{get:(e,r)=>{if("function"!=typeof this[r])return this[r];if("table"===r){var o,t=this;return function(){for(var e=arguments.length,o=Array(e),n=0;n<e;n++)o[n]=arguments[n];return t[r](...o)}}return null===(o=this[r])||void 0===o?void 0:o.bind(console,`[${function(){let e=new Date;return e.toISOString?e.toISOString():e.toLocaleString()}()}|${this._id||"-"}|${this.name}]`)}})}}(0,t._)(l,"enable",!1),(0,t._)(l,"maxSize",512e3),(0,t._)(l,"size",0),(0,t._)(l,"logTextArray",[]),(0,t._)(l,"level",i.log)},250529:function(e,r,o){"use strict";o.d(r,{W:function(){return i}});var t=o(480333),n=o(619746);class i{reset(){this.sequenceNumber=0,this.timescale=0,this.sampleDuration=0,this.sampleRate=0,this.channelCount=0,this.baseMediaDecodeTime=0,this.present=!1,this.pid=-1,this.codec="",this.samples=[],this.config=[],this.warnings=[]}exist(){return!!(this.sampleRate&&this.channelCount&&this.codec&&this.codecType===n.yQ.AAC)}hasSample(){return!!this.samples.length}get isEncryption(){return this.isAudioEncryption}get firstDts(){return this.samples.length?this.samples[0].dts:null}get firstPts(){return this.samples.length?this.samples[0].pts:null}get samplesDuration(){if(this.samples.length>0){let e=this.samples[0],r=this.samples[this.samples.length-1];return r.dts-e.dts+r.duration}return 0}constructor(){(0,t._)(this,"id",2),(0,t._)(this,"type",n.Vc.AUDIO),(0,t._)(this,"codecType",n.yQ.AAC),(0,t._)(this,"pid",-1),(0,t._)(this,"codec",""),(0,t._)(this,"sequenceNumber",0),(0,t._)(this,"sampleDuration",0),(0,t._)(this,"timescale",0),(0,t._)(this,"formatTimescale",0),(0,t._)(this,"baseMediaDecodeTime",0),(0,t._)(this,"duration",0),(0,t._)(this,"warnings",[]),(0,t._)(this,"samples",[]),(0,t._)(this,"baseDts",0),(0,t._)(this,"sampleSize",16),(0,t._)(this,"sampleRate",0),(0,t._)(this,"channelCount",0),(0,t._)(this,"objectType",0),(0,t._)(this,"sampleRateIndex",0),(0,t._)(this,"config",[]),(0,t._)(this,"present",!1),(0,t._)(this,"isVideoEncryption",!1),(0,t._)(this,"isAudioEncryption",!1),(0,t._)(this,"kid",null),(0,t._)(this,"ext",void 0)}}},619746:function(e,r,o){"use strict";o.d(r,{Bc:function(){return c},Vc:function(){return t},_e:function(){return n},yQ:function(){return i}});let t={VIDEO:"video",AUDIO:"audio",METADATA:"metadata"},n={AV1:"av1",AVC:"avc",HEVC:"hevc"},i={AAC:"aac",G711PCMA:"g7110a",G711PCMU:"g7110m"},c={LARGE_AV_SHIFT:"LARGE_AV_SHIFT",LARGE_VIDEO_GAP:"LARGE_VIDEO_GAP",LARGE_VIDEO_GAP_BETWEEN_CHUNK:"LARGE_VIDEO_GAP_BETWEEN_CHUNK",LARGE_AUDIO_GAP:"LARGE_AUDIO_GAP",AUDIO_FILLED:"AUDIO_FILLED",AUDIO_DROPPED:"AUDIO_DROPPED"}},67488:function(e,r,o){"use strict";function t(e){return["string","number"].includes(typeof e)&&""!==e}o.d(r,{Z:function(){return t}}),o(706056)},912077:function(e,r,o){"use strict";o.d(r,{UX:function(){return n},j2:function(){return i}});var t=o(707852);let n={TABS:`${t.T}-tabs`,TABS_BAR:`${t.T}-tabs-bar`,TABS_BAR_LINE:`${t.T}-tabs-bar-line`,TABS_BAR_CARD:`${t.T}-tabs-bar-card`,TABS_BAR_BUTTON:`${t.T}-tabs-bar-button`,TABS_BAR_SLASH:`${t.T}-tabs-bar-slash`,TABS_BAR_EXTRA:`${t.T}-tabs-bar-extra`,TABS_TAB:`${t.T}-tabs-tab`,TABS_TAB_ACTIVE:`${t.T}-tabs-tab-active`,TABS_TAB_DISABLED:`${t.T}-tabs-tab-disabled`,TABS_CONTENT:`${t.T}-tabs-content`,TABS_CONTENT_ANIMATED:`${t.T}-tabs-content-animated`,TABS_CONTENT_NO_ANIMATED:`${t.T}-tabs-content-no-animated`,TABS_PANE:`${t.T}-tabs-pane`,TABS_PANE_INACTIVE:`${t.T}-tabs-pane-inactive`,TABS_PANE_ACTIVE:`${t.T}-tabs-pane-active`,TABS_PANE_MOTION_OVERLAY:`${t.T}-tabs-pane-motion-overlay`,TABS_PANE_ANIMATING:`${t.T}-tabs-pane-animating`,TABS_PANE_ANIMATE_LEFT_SHOW:`${t.T}-tabs-pane-animate-leftShow`,TABS_PANE_ANIMATE_RIGHT_SHOW:`${t.T}-tabs-pane-animate-rightShow`,TABS_PANE_ANIMATE_TOP_SHOW:`${t.T}-tabs-pane-animate-topShow`,TABS_PANE_ANIMATE_BOTTOM_SHOW:`${t.T}-tabs-pane-animate-bottomShow`},i={TYPE_MAP:["line","card","button","slash"],SIZE:["small","medium","large"],POSITION_MAP:["top","left"]}},668825:function(e,r,o){"use strict";o.d(r,{Z:function(){return i}}),o(932651);var t=o(856445),n=o(642449);class i extends t.Z{init(){}destroy(){this._adapter.enabledBodyScroll()}_notifyChange(e){let{current:r}=this.getStates();r!==e&&this._adapter.notifyChange(e)}getIsControlledComponent(){return this._isInProps("current")}beforeShow(){this._adapter.disabledBodyScroll()}afterHide(){this._adapter.enabledBodyScroll()}getFinalPaading(){var e;let{spotlightPadding:r,steps:o}=this.getProps(),{current:t}=this.getStates(),i=null===(e=o[t])||void 0===e?void 0:e.spotlightPadding;return"number"==typeof i?i:"number"==typeof r?r:n.KT.DEFAULT_SPOTLIGHT_PADDING}constructor(e){super(Object.assign({},e)),this.handlePrev=()=>{let{current:e}=this.getStates(),r=e-1;!this.getIsControlledComponent()&&this._adapter.setCurrent(r),this._notifyChange(r),this._adapter.notifyPrev(r)},this.handleNext=()=>{let{steps:e}=this.getProps(),{current:r}=this.getStates(),o=r===e.length-1,t=o?r:r+1;o?this._adapter.notifyFinish():(this._notifyChange(t),this._adapter.notifyNext(t),!this.getIsControlledComponent()&&this._adapter.setCurrent(t))},this.handleSkip=()=>{this._adapter.notifySkip()}}}},370389:function(e,r,o){"use strict";o.d(r,{c:function(){return n},f:function(){return i}}),o(490629);var t=o(878255);function n(e,r){if(null!==e&&e.length&&null!==r&&r.length){let o=new Set(e),n=new Set(r);return Array.from((0,t.c)(o,n))}return e}function i(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ascend";if("descend"===r)return(o,t)=>{let n=Number(e(o,t,r));return 0!==n?-n:n};return(o,t)=>e(o,t,r)}},108220:function(e,r,o){"use strict";o.d(r,{DG:function(){return n},q7:function(){return t}});let t="Enter",n="Escape";r.ZP={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229}},357548:function(e,r,o){"use strict";o.d(r,{Z:function(){return c}});var t=o(629686),n=o(402748),i=o(320165);o(101199);var c=e=>(0,i.jsxs)("svg",(0,n._)((0,t._)({xmlns:"http://www.w3.org/2000/svg",width:32,height:32,fill:"none",viewBox:"0 0 32 32"},e),{children:[(0,i.jsx)("rect",{width:5,height:16,x:9,y:8,fill:"#fff",rx:1}),(0,i.jsx)("rect",{width:5,height:16,x:18,y:8,fill:"#fff",rx:1})]}))},964591:function(e,r,o){"use strict";o.d(r,{DT:function(){return G.D},Pi:function(){return a.P}}),o(261617);var t,n=o(679622),i=o(609301);o(404307),o(228901);var c=o(302483),G=o(835952),a=o(165022);o(355562),o(409842),o(516233),o(172178),(0,i.z0)(n.m),c.O.finalizeAllImmediately},942809:function(e,r,o){"use strict";o(679308),Promise.all([o.e("23634"),o.e("92176"),o.e("64571"),o.e("15799"),o.e("28161"),o.e("21133"),o.e("51253"),o.e("69073"),o.e("69855"),o.e("15915"),o.e("38563"),o.e("67306"),o.e("14306"),o.e("6593"),o.e("6757"),o.e("45829"),o.e("89429"),o.e("49715"),o.e("15967")]).then(o.bind(o,522573)),Promise.all([o.e("23634"),o.e("92176"),o.e("64571"),o.e("15799"),o.e("28161"),o.e("21133"),o.e("51253"),o.e("69073"),o.e("69855"),o.e("15915"),o.e("38563"),o.e("67306"),o.e("14306"),o.e("6593"),o.e("6757"),o.e("45829"),o.e("89429"),o.e("49715"),o.e("15967")]).then(o.bind(o,233505)),Promise.all([o.e("23634"),o.e("92176"),o.e("64571"),o.e("15799"),o.e("28161"),o.e("21133"),o.e("51253"),o.e("69073"),o.e("69855"),o.e("15915"),o.e("38563"),o.e("67306"),o.e("14306"),o.e("6593"),o.e("6757"),o.e("45829"),o.e("89429"),o.e("49715"),o.e("15967")]).then(o.bind(o,706299)),Promise.all([o.e("23634"),o.e("92176"),o.e("64571"),o.e("15799"),o.e("28161"),o.e("21133"),o.e("51253"),o.e("69073"),o.e("69855"),o.e("15915"),o.e("38563"),o.e("67306"),o.e("14306"),o.e("6593"),o.e("6757"),o.e("45829"),o.e("89429"),o.e("49715"),o.e("15967")]).then(o.bind(o,144778))},166386:function(e,r,o){"use strict";o(679308),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,522573)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,233505)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,706299)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,327241)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,419200)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,293468)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,959656)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,688802)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,943127)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,399619)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,736743)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,404712)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,368630)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,139663)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,897882)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,506375)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,14327)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,739741)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,33438)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,190173)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,151263)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,122013)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,879875)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,888991)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,568331)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,414885)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,428314)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,577896)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,582389)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,85236)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,212787)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,841364)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,946808)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,633173)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,201394)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,184841)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,808332)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,925006)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,569795)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,938720)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,129040)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,603555)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,572762)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,536917)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,769591)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,124653)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("97894")]).then(o.bind(o,79770))},471608:function(e,r,o){"use strict";o(679308),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,522573)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,233505)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,706299)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,327241)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,419200)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,293468)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,959656)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,688802)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,943127)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,399619)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,736743)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,404712)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,368630)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,139663)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,897882)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,506375)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,14327)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,739741)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,33438)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,190173)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,151263)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,122013)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,879875)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,888991)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,568331)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,414885)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,428314)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,577896)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,582389)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,85236)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,212787)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,841364)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,946808)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,633173)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,201394)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,184841)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,808332)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,925006)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,569795)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,938720)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,129040)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,603555)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,572762)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,536917)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,769591)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,124653)),Promise.all([o.e("74792"),o.e("41162"),o.e("42794"),o.e("27195"),o.e("61639")]).then(o.bind(o,411807))},297243:function(e,r,o){"use strict";o(679308),o.e("48454").then(o.bind(o,186035)),o.e("48454").then(o.bind(o,522573)),o.e("48454").then(o.bind(o,233505)),o.e("48454").then(o.bind(o,706299)),o.e("48454").then(o.bind(o,327241)),o.e("48454").then(o.bind(o,419200)),o.e("48454").then(o.bind(o,293468)),o.e("48454").then(o.bind(o,959656)),o.e("48454").then(o.bind(o,688802)),o.e("48454").then(o.bind(o,943127)),o.e("48454").then(o.bind(o,399619)),o.e("48454").then(o.bind(o,736743)),o.e("48454").then(o.bind(o,404712)),o.e("48454").then(o.bind(o,368630)),o.e("48454").then(o.bind(o,139663)),o.e("48454").then(o.bind(o,897882)),o.e("48454").then(o.bind(o,506375)),o.e("48454").then(o.bind(o,14327)),o.e("48454").then(o.bind(o,739741)),o.e("48454").then(o.bind(o,33438)),o.e("48454").then(o.bind(o,190173)),o.e("48454").then(o.bind(o,151263)),o.e("48454").then(o.bind(o,122013)),o.e("48454").then(o.bind(o,879875)),o.e("48454").then(o.bind(o,888991)),o.e("48454").then(o.bind(o,568331)),o.e("48454").then(o.bind(o,414885)),o.e("48454").then(o.bind(o,428314)),o.e("48454").then(o.bind(o,577896)),o.e("48454").then(o.bind(o,582389)),o.e("48454").then(o.bind(o,85236)),o.e("48454").then(o.bind(o,212787)),o.e("48454").then(o.bind(o,841364)),o.e("48454").then(o.bind(o,946808)),o.e("48454").then(o.bind(o,633173)),o.e("48454").then(o.bind(o,201394)),o.e("48454").then(o.bind(o,184841)),o.e("48454").then(o.bind(o,808332)),o.e("48454").then(o.bind(o,925006)),o.e("48454").then(o.bind(o,569795)),o.e("48454").then(o.bind(o,938720)),o.e("48454").then(o.bind(o,129040)),o.e("48454").then(o.bind(o,603555)),o.e("48454").then(o.bind(o,572762)),o.e("48454").then(o.bind(o,536917)),o.e("48454").then(o.bind(o,769591)),o.e("48454").then(o.bind(o,124653))},991279:function(e,r,o){"use strict";o(679308),o.e("3625").then(o.bind(o,522573)),o.e("3625").then(o.bind(o,233505)),o.e("3625").then(o.bind(o,706299)),o.e("3625").then(o.bind(o,327241)),o.e("3625").then(o.bind(o,419200)),o.e("3625").then(o.bind(o,293468)),o.e("3625").then(o.bind(o,959656)),o.e("3625").then(o.bind(o,688802)),o.e("3625").then(o.bind(o,943127)),o.e("3625").then(o.bind(o,399619)),o.e("3625").then(o.bind(o,736743)),o.e("3625").then(o.bind(o,404712)),o.e("3625").then(o.bind(o,368630)),o.e("3625").then(o.bind(o,139663)),o.e("3625").then(o.bind(o,897882)),o.e("3625").then(o.bind(o,506375)),o.e("3625").then(o.bind(o,14327)),o.e("3625").then(o.bind(o,739741)),o.e("3625").then(o.bind(o,33438)),o.e("3625").then(o.bind(o,190173)),o.e("3625").then(o.bind(o,151263)),o.e("3625").then(o.bind(o,122013)),o.e("3625").then(o.bind(o,879875)),o.e("3625").then(o.bind(o,888991)),o.e("3625").then(o.bind(o,568331)),o.e("3625").then(o.bind(o,414885)),o.e("3625").then(o.bind(o,428314)),o.e("3625").then(o.bind(o,577896)),o.e("3625").then(o.bind(o,582389)),o.e("3625").then(o.bind(o,85236)),o.e("3625").then(o.bind(o,212787)),o.e("3625").then(o.bind(o,841364)),o.e("3625").then(o.bind(o,946808)),o.e("3625").then(o.bind(o,633173)),o.e("3625").then(o.bind(o,201394)),o.e("3625").then(o.bind(o,184841)),o.e("3625").then(o.bind(o,808332)),o.e("3625").then(o.bind(o,925006)),o.e("3625").then(o.bind(o,569795)),o.e("3625").then(o.bind(o,938720)),o.e("3625").then(o.bind(o,129040)),o.e("3625").then(o.bind(o,603555)),o.e("3625").then(o.bind(o,572762)),o.e("3625").then(o.bind(o,536917)),o.e("3625").then(o.bind(o,769591)),o.e("3625").then(o.bind(o,124653)),o.e("3625").then(o.bind(o,302611))},290481:function(e,r,o){"use strict";function t(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(t=function(){return!!e})()}o.d(r,{Z:function(){return t}})},135156:function(e,r,o){"use strict";o.d(r,{w:function(){return t}});let t={0:"�",128:"€",130:"‚",131:"ƒ",132:"„",133:"…",134:"†",135:"‡",136:"ˆ",137:"‰",138:"Š",139:"‹",140:"Œ",142:"Ž",145:"‘",146:"’",147:"“",148:"”",149:"•",150:"–",151:"—",152:"˜",153:"™",154:"š",155:"›",156:"œ",158:"ž",159:"Ÿ"}},783636:function(e,r,o){"use strict";o.d(r,{q:function(){return l}});var t=o(305161),n=o(628053),i=o(400423),c=o(342160),G=o(357509),a=o(268851),s=o(728927);let l={comment:t.U,doctype:function(){},element:n.b,mdxFlowExpression:i.n,mdxJsxFlowElement:c.D,mdxJsxTextElement:c.D,mdxTextExpression:i.n,mdxjsEsm:G.X,root:a.J,text:s.f}},13064:function(e,r,o){"use strict";o.d(r,{s:function(){return s}});var t=o(166950),n=o(766418),i=o(918395);let c=/[A-Z]/g,G=/-[a-z]/g,a=/^data[-\w.:]+$/i;function s(e,r){let o=(0,i.F)(r),s=r,u=n.k;if(o in e.normal)return e.property[e.normal[o]];if(o.length>4&&"data"===o.slice(0,4)&&a.test(r)){if("-"===r.charAt(4)){let e=r.slice(5).replace(G,T);s="data"+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=r.slice(4);if(!G.test(e)){let o=e.replace(c,l);"-"!==o.charAt(0)&&(o="-"+o),r="data"+o}}u=t.I}return new u(s,r)}function l(e){return"-"+e.toLowerCase()}function T(e){return e.charAt(1).toUpperCase()}},204765:function(e,r,o){"use strict";o.d(r,{T:function(){return n}});var t=o(158489);function n(e,r){let o={},n={};for(let r of e)Object.assign(o,r.property),Object.assign(n,r.normal);return new t.V(o,n,r)}},958560:function(e,r,o){"use strict";o.d(r,{v:function(){return a}});let t=/["&'<>`]/g,n=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,i=/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,c=/[|\\{}()[\]^$+*?.]/g,G=new WeakMap;function a(e,r){if(e=e.replace(r.subset?function(e){let r=G.get(e);return!r&&(r=function(e){let r=[],o=-1;for(;++o<e.length;)r.push(e[o].replace(c,"\\$&"));return RegExp("(?:"+r.join("|")+")","g")}(e),G.set(e,r)),r}(r.subset):t,o),r.subset||r.escapeOnly)return e;return e.replace(n,function(e,o,t){return r.format((e.charCodeAt(0)-55296)*1024+e.charCodeAt(1)-56320+65536,t.charCodeAt(o+2),r)}).replace(i,o);function o(e,o,t){return r.format(e.charCodeAt(0),t.charCodeAt(o+1),r)}}},613053:function(e,r,o){"use strict";function t(e){return"&#x"+e.toString(16).toUpperCase()+";"}o.d(r,{C:function(){return t}})},585417:function(e,r,o){"use strict";function t(e){return!!(null!==e&&"object"==typeof e&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&void 0===e.auth)}o.d(r,{C:function(){return t}})},812837:function(e,r,o){"use strict";o.d(r,{z:function(){return n}});let t={}.hasOwnProperty;function n(e,r){let o=r||{};function n(r,...o){let i=n.invalid,c=n.handlers;if(r&&t.call(r,e)){let o=String(r[e]);i=t.call(c,o)?c[o]:n.unknown}if(i)return i.call(this,r,...o)}return n.handlers=o.handlers||{},n.invalid=o.invalid,n.unknown=o.unknown,n}},769591:function(e,r,o){"use strict";o.r(r),o.d(r,{Link:function(){return m},Prefetch:function(){return v},Preloads:function(){return Q}});var t=o(629686),n=o(402748),i=o(811603);o(683656),o(759943),o(490629),o(968336),o(374954),o(228983),o(656562),o(992871),o(112459);var c=o(320165),G=o(38578),a=o(316176),s=o(101199),l=o(406848),T=o(818652),u=o(124653),d=o(776246),F=o(816705),h=o(338554),f=o(660672),X=o(239501),p=o(643253);function M(e){return!0===e||!1===e||(0,X.i)(e)&&"[object Boolean]"==(0,X.b)(e)}function g(e,r){return o=>{null==e||e(o),!o.defaultPrevented&&r(o)}}let b=e=>{let r={observer:!1,hover:!1};return M(e)&&(e?r.observer=!0:r.hover=!1),(0,p.i)(e)&&(M(e.observer)&&(r.observer=e.observer),M(e.hover)&&(r.hover=e.hover)),r},m=e=>{let{to:r,replace:o,prefetch:l,prerender:T=!1,children:u,onClick:F}=e,h=(0,i._)(e,["to","replace","prefetch","prerender","children","onClick"]),f=e.target,X=(0,s.useMemo)(()=>b(l),[l]),[p,M]=(0,s.useState)(!1),[m,E]=(0,s.useState)(!1),[R,A]=(0,s.useState)(!1),y=(0,G.k)(),P=(0,s.useCallback)(e=>{var t;if(F&&F(e),!r.startsWith("http")&&0===e.button&&(!f||"_self"===f)&&!((t=e).metaKey||t.altKey||t.ctrlKey||t.shiftKey))e.preventDefault(),o?y.replace(r):y.push(r)},[F,r,f,o,y]),S=()=>{X.hover&&r&&E(!0),T&&r&&A(!0)},w=()=>{X.hover&&E(!1),T&&A(!1)};(0,s.useEffect)(()=>{if(m||R){let e=setTimeout(()=>{m&&M(!0),R&&(null===a.f||void 0===a.f||(0,a.f)([r]))},100);return()=>{clearTimeout(e)}}},[m,R,r]);let I=g(e.onMouseEnter,S),x=g(e.onMouseLeave,w),L=g(e.onFocus,S),O=g(e.onBlur,w),N=g(e.onTouchStart,S);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("a",(0,n._)((0,t._)((0,n._)((0,t._)({},h),{onClick:P,onMouseEnter:I,onMouseLeave:x,onFocus:L,onBlur:O,onTouchStart:N,href:r}),X.observer?{[d.dH]:d.gq}:{},X.observer?{[d.ZS]:d.gq}:{}),{children:u})),p&&(0,c.jsx)(v,{to:r}),p&&(0,c.jsx)(Q,{to:r})]})};function v(e){let{to:r}=e,[o]=r.split("?"),{matchPatterns:t}=(0,h.FR)(o),{matchPatternsCache:n}=(0,u.useServerRouteCache)(),i=(0,h.iU)(null==n?void 0:n.current,t);if(o.startsWith("http")||document.location.pathname===o)return null;let G=new URL(r,window.location.href),a={pathname:G.pathname,search:G.search,type:"navigate",intersection:i},s=`${l.Yb}?state=${(0,F.e)(a)}`;return(0,c.jsx)("link",{rel:"prefetch",as:"fetch",href:s})}function Q(e){let{to:r}=e,[o]=r.split("?"),[t,n]=(0,s.useState)([]),i=o.startsWith("http")||document.location.pathname===o;return((0,s.useEffect)(()=>i?()=>{}:((0,T.K)(()=>{(0,f.S)({to:r}).then(async e=>{(0,s.startTransition)(()=>{n(e)})})}),()=>{}),[r,i]),i)?null:(0,c.jsx)(c.Fragment,{children:t.map(e=>(0,c.jsx)("link",{rel:"preload",as:e.scriptType,href:e.url},e.url))})}},921839:function(e,r,o){"use strict";o.r(r),o.d(r,{RSCRoute:function(){return c}}),o(679308);var t=o(101199),n=o(406848),i=o(124653);o(320165);let c=(0,t.memo)(e=>{let{cacheKey:r,as:o}=e,c=function(e){let r=self.__pace_rsc_cache.get(e);if(r)return r;let o=`${n.Yb}?state=${encodeURIComponent(e)}`;return r=self.__createFromFetch(fetch(o)),self.__pace_rsc_cache.set(e,r),r}(r),{patternToCacheKeyCache:G}=(0,i.useServerRouteCache)();return G.current.set(o,r),(0,t.use)(c)})},257183:function(e,r,o){"use strict";o.d(r,{M:function(){return n}});var t=o(845909);function n(){return function(e){(0,t.Vn)(e,"raw",function(e,r,o){if(o&&"number"==typeof r)return o.children.splice(r,1),r})}}},757275:function(e,r,o){"use strict";o.d(r,{$:function(){return c},Y:function(){return i}});var t=o(882742),n=o(261626);function i(e){let r,o=-1;for(;++o<e.length;){let t=e[o],i="string"==typeof t&&(0,n.u2)(t)?{type:"Identifier",name:t}:{type:"Literal",value:t};r=r?{type:"MemberExpression",object:r,property:i,computed:"Literal"===i.type,optional:!1}:i}return(0,t.ok)(r,"expected non-empty `ids` to be passed"),(0,t.ok)("Literal"!==r.type,"expected identifier as left-most value"),r}function c(e){let r,o=-1;for(;++o<e.length;){let i=e[o];(0,t.ok)("string"==typeof i&&(0,n.u2)(i,{jsx:!0}),"expected valid jsx identifier, not `"+i+"`");let c={type:"JSXIdentifier",name:i};r=r?{type:"JSXMemberExpression",object:r,property:c}:c}return(0,t.ok)(r,"expected non-empty `ids` to be passed"),r}},646278:function(e,r,o){"use strict";o.d(r,{e:function(){return M}});var t=o(291804);let n=[],i=[],c=[],G=[],a=[],s=[],l=[],T=[],u=[],d=[],F=[];for(let e=0;e<256;e+=1)e<128?F[e]=e<<1:F[e]=e<<1^283;let h=0,f=0;for(let e=0;e<256;e+=1){let e=f^f<<1^f<<2^f<<3^f<<4;e=e>>>8^255&e^99,n[h]=e,i[e]=h;let r=F[h],o=F[r],t=F[o],X=257*F[e]^16843008*e;c[h]=X<<24|X>>>8,G[h]=X<<16|X>>>16,a[h]=X<<8|X>>>24,s[h]=X,X=16843009*t^65537*o^257*r^16843008*h,l[e]=X<<24|X>>>8,T[e]=X<<16|X>>>16,u[e]=X<<8|X>>>24,d[e]=X,h?(h=r^F[F[F[t^r]]],f^=F[F[f]]):h=f=1}let X=[0,1,2,4,8,16,32,64,128,27,54];class p extends t.Gn{_doReset(){let e;if(this._nRounds&&this._keyPriorReset===this._key)return;this._keyPriorReset=this._key;let r=this._keyPriorReset,o=r.words,t=r.sigBytes/4;this._nRounds=t+6;let i=(this._nRounds+1)*4;this._keySchedule=[];let c=this._keySchedule;for(let r=0;r<i;r+=1)r<t?c[r]=o[r]:(e=c[r-1],r%t?t>6&&r%t==4&&(e=n[e>>>24]<<24|n[e>>>16&255]<<16|n[e>>>8&255]<<8|n[255&e]):e=(n[(e=e<<8|e>>>24)>>>24]<<24|n[e>>>16&255]<<16|n[e>>>8&255]<<8|n[255&e])^X[r/t|0]<<24,c[r]=c[r-t]^e);this._invKeySchedule=[];let G=this._invKeySchedule;for(let r=0;r<i;r+=1){let o=i-r;e=r%4?c[o]:c[o-4],r<4||o<=4?G[r]=e:G[r]=l[n[e>>>24]]^T[n[e>>>16&255]]^u[n[e>>>8&255]]^d[n[255&e]]}}encryptBlock(e,r){this._doCryptBlock(e,r,this._keySchedule,c,G,a,s,n)}decryptBlock(e,r){let o=e[r+1];e[r+1]=e[r+3],e[r+3]=o,this._doCryptBlock(e,r,this._invKeySchedule,l,T,u,d,i),o=e[r+1],e[r+1]=e[r+3],e[r+3]=o}_doCryptBlock(e,r,o,t,n,i,c,G){let a=this._nRounds,s=e[r]^o[0],l=e[r+1]^o[1],T=e[r+2]^o[2],u=e[r+3]^o[3],d=4;for(let e=1;e<a;e+=1){let e=t[s>>>24]^n[l>>>16&255]^i[T>>>8&255]^c[255&u]^o[d];d+=1;let r=t[l>>>24]^n[T>>>16&255]^i[u>>>8&255]^c[255&s]^o[d];d+=1;let G=t[T>>>24]^n[u>>>16&255]^i[s>>>8&255]^c[255&l]^o[d];d+=1;let a=t[u>>>24]^n[s>>>16&255]^i[l>>>8&255]^c[255&T]^o[d];d+=1,s=e,l=r,T=G,u=a}let F=(G[s>>>24]<<24|G[l>>>16&255]<<16|G[T>>>8&255]<<8|G[255&u])^o[d];d+=1;let h=(G[l>>>24]<<24|G[T>>>16&255]<<16|G[u>>>8&255]<<8|G[255&s])^o[d];d+=1;let f=(G[T>>>24]<<24|G[u>>>16&255]<<16|G[s>>>8&255]<<8|G[255&l])^o[d];d+=1;let X=(G[u>>>24]<<24|G[s>>>16&255]<<16|G[l>>>8&255]<<8|G[255&T])^o[d];d+=1,e[r]=F,e[r+1]=h,e[r+2]=f,e[r+3]=X}}p.keySize=8;let M=t.Gn._createHelper(p)},223981:function(e,r,o){"use strict";o.d(r,{pt:function(){return s}});var t=o(324219);let n=[];for(let e=0;e<64;e+=1)n[e]=4294967296*Math.abs(Math.sin(e+1))|0;let i=(e,r,o,t,n,i,c)=>{let G=e+(r&o|~r&t)+n+c;return(G<<i|G>>>32-i)+r},c=(e,r,o,t,n,i,c)=>{let G=e+(r&t|o&~t)+n+c;return(G<<i|G>>>32-i)+r},G=(e,r,o,t,n,i,c)=>{let G=e+(r^o^t)+n+c;return(G<<i|G>>>32-i)+r},a=(e,r,o,t,n,i,c)=>{let G=e+(o^(r|~t))+n+c;return(G<<i|G>>>32-i)+r};class s extends t.Px{_doReset(){this._hash=new t.Ic([1732584193,4023233417,2562383102,271733878])}_doProcessBlock(e,r){for(let o=0;o<16;o+=1){let t=r+o,n=e[t];e[t]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360}let o=this._hash.words,t=e[r+0],s=e[r+1],l=e[r+2],T=e[r+3],u=e[r+4],d=e[r+5],F=e[r+6],h=e[r+7],f=e[r+8],X=e[r+9],p=e[r+10],M=e[r+11],g=e[r+12],b=e[r+13],m=e[r+14],v=e[r+15],Q=o[0],E=o[1],R=o[2],A=o[3];Q=i(Q,E,R,A,t,7,n[0]),A=i(A,Q,E,R,s,12,n[1]),R=i(R,A,Q,E,l,17,n[2]),E=i(E,R,A,Q,T,22,n[3]),Q=i(Q,E,R,A,u,7,n[4]),A=i(A,Q,E,R,d,12,n[5]),R=i(R,A,Q,E,F,17,n[6]),E=i(E,R,A,Q,h,22,n[7]),Q=i(Q,E,R,A,f,7,n[8]),A=i(A,Q,E,R,X,12,n[9]),R=i(R,A,Q,E,p,17,n[10]),E=i(E,R,A,Q,M,22,n[11]),Q=i(Q,E,R,A,g,7,n[12]),A=i(A,Q,E,R,b,12,n[13]),R=i(R,A,Q,E,m,17,n[14]),E=i(E,R,A,Q,v,22,n[15]),Q=c(Q,E,R,A,s,5,n[16]),A=c(A,Q,E,R,F,9,n[17]),R=c(R,A,Q,E,M,14,n[18]),E=c(E,R,A,Q,t,20,n[19]),Q=c(Q,E,R,A,d,5,n[20]),A=c(A,Q,E,R,p,9,n[21]),R=c(R,A,Q,E,v,14,n[22]),E=c(E,R,A,Q,u,20,n[23]),Q=c(Q,E,R,A,X,5,n[24]),A=c(A,Q,E,R,m,9,n[25]),R=c(R,A,Q,E,T,14,n[26]),E=c(E,R,A,Q,f,20,n[27]),Q=c(Q,E,R,A,b,5,n[28]),A=c(A,Q,E,R,l,9,n[29]),R=c(R,A,Q,E,h,14,n[30]),E=c(E,R,A,Q,g,20,n[31]),Q=G(Q,E,R,A,d,4,n[32]),A=G(A,Q,E,R,f,11,n[33]),R=G(R,A,Q,E,M,16,n[34]),E=G(E,R,A,Q,m,23,n[35]),Q=G(Q,E,R,A,s,4,n[36]),A=G(A,Q,E,R,u,11,n[37]),R=G(R,A,Q,E,h,16,n[38]),E=G(E,R,A,Q,p,23,n[39]),Q=G(Q,E,R,A,b,4,n[40]),A=G(A,Q,E,R,t,11,n[41]),R=G(R,A,Q,E,T,16,n[42]),E=G(E,R,A,Q,F,23,n[43]),Q=G(Q,E,R,A,X,4,n[44]),A=G(A,Q,E,R,g,11,n[45]),R=G(R,A,Q,E,v,16,n[46]),E=G(E,R,A,Q,l,23,n[47]),Q=a(Q,E,R,A,t,6,n[48]),A=a(A,Q,E,R,h,10,n[49]),R=a(R,A,Q,E,m,15,n[50]),E=a(E,R,A,Q,d,21,n[51]),Q=a(Q,E,R,A,g,6,n[52]),A=a(A,Q,E,R,T,10,n[53]),R=a(R,A,Q,E,p,15,n[54]),E=a(E,R,A,Q,s,21,n[55]),Q=a(Q,E,R,A,f,6,n[56]),A=a(A,Q,E,R,v,10,n[57]),R=a(R,A,Q,E,F,15,n[58]),E=a(E,R,A,Q,b,21,n[59]),Q=a(Q,E,R,A,u,6,n[60]),A=a(A,Q,E,R,M,10,n[61]),R=a(R,A,Q,E,l,15,n[62]),E=a(E,R,A,Q,X,21,n[63]),o[0]=o[0]+Q|0,o[1]=o[1]+E|0,o[2]=o[2]+R|0,o[3]=o[3]+A|0}_doFinalize(){let e=this._data,r=e.words,o=8*this._nDataBytes,t=8*e.sigBytes;r[t>>>5]|=128<<24-t%32;let n=Math.floor(o/4294967296);r[(t+64>>>9<<4)+15]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360,r[(t+64>>>9<<4)+14]=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,e.sigBytes=(r.length+1)*4,this._process();let i=this._hash,c=i.words;for(let e=0;e<4;e+=1){let r=c[e];c[e]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360}return i}clone(){let e=super.clone.call(this);return e._hash=this._hash.clone(),e}}t.Px._createHelper(s),t.Px._createHmacHelper(s)}}]);