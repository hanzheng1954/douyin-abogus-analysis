/*! For license information please see 39244.3e61b4d6.js.LICENSE.txt */
!function(e,t){"object"==typeof module&&"object"==typeof module.exports?t():"function"==typeof define&&define.amd?define([],t):(e="undefined"!=typeof globalThis?globalThis:e||self)&&t()}(this,function(){"use strict";"object"==typeof window&&(window.openRedirect={version:"1.2.20",webpackPluginVersion:"3.4.22",reportOnly:!1})}),!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).xss={})}(this,function(e){"use strict";var t=function(){return(t=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function r(e,t,r){if(r||2==arguments.length)for(var i,n=0,a=t.length;n<a;n++)!i&&n in t||(i||(i=Array.prototype.slice.call(t,0,n)),i[n]=t[n]);return e.concat(i||Array.prototype.slice.call(t))}var i=/[^a-zA-Z0-9\\_:.-]/gim,n=/</g,a=/>/g,s=/&#([a-zA-Z0-9]*);?/gim,o=/&quot;/g,c=/&colon;?/gim,l=/&newline;?/gim,p=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,u=/u\s*r\s*l\s*\(.*/gi,h=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,d=/"/g,f=function(e){return e.replace(n,"&lt;").replace(a,"&gt;")},m={indexOf:function(e,t){var r,i;for(r=0,i=e.length;r<i;r++)if(e[r]===t)return r;return -1},forEach:function(e,t,r){var i,n;for(i=0,n=e.length;i<n;i++)t.call(r,e[i],i,e)},some:function(e,t,r){var i,n;for(i=0,n=e.length;i<n;i++)if(t.call(r,e[i],i,e))return!0;return!1},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},includes:function(e,t){if("string"==typeof e)return -1!==e.indexOf(t);for(var r=0;r<e.length;r++)if(e[r]===t)return!0;return!1},spaceIndex:function(e){var t=/\s|\n|\t/.exec(e);return t?t.index:-1},uniq:function(e){for(var t={},r=[],i=0;i<e.length;i++)t[e[i]]||(r.push(e[i]),t[e[i]]=!0);return r},from:function(e){for(var t=[],r=0;r<e.length;r++)t.push(e[r]);return t},keys:function(e){var t=[];for(var r in e)t.push(r);return t}};function g(e){return null==e}function G(e){var t;return'"'===(t=e)[0]&&'"'===t[t.length-1]||"'"===t[0]&&"'"===t[t.length-1]?e.substr(1,e.length-2):e}function D(e){var t,r,i,n,a,s,o,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",l="",p=0;for(e=function(e){e=e.replace(/rn/g,"n");for(var t="",r=0;r<e.length;r++){var i=e.charCodeAt(r);i<128?t+=String.fromCharCode(i):i>127&&i<2048?t+=String.fromCharCode(i>>6|192)+String.fromCharCode(63&i|128):t+=String.fromCharCode(i>>12|224)+String.fromCharCode(i>>6&63|128)+String.fromCharCode(63&i|128)}return t}(e);p<e.length;)n=(t=e.charCodeAt(p++))>>2,a=(3&t)<<4|(r=e.charCodeAt(p++))>>4,s=(15&r)<<2|(i=e.charCodeAt(p++))>>6,o=63&i,isNaN(r)?s=o=64:isNaN(i)&&(o=64),l=l+c.charAt(n)+c.charAt(a)+c.charAt(s)+c.charAt(o);return l}function v(e){var t,r,i,n,a,s,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c="",l=0;for(e=e.replace(/[^A-Za-z0-9+/=]/g,"");l<e.length;)t=o.indexOf(e.charAt(l++))<<2|(n=o.indexOf(e.charAt(l++)))>>4,r=(15&n)<<4|(a=o.indexOf(e.charAt(l++)))>>2,i=(3&a)<<6|(s=o.indexOf(e.charAt(l++))),c+=String.fromCharCode(t),64!==a&&(c+=String.fromCharCode(r)),64!==s&&(c+=String.fromCharCode(i));return function(e){for(var t="",r=0,i=0,n=0,a=0;r<e.length;)(i=e.charCodeAt(r))<128?(t+=String.fromCharCode(i),r++):i>191&&i<224?(t+=String.fromCharCode((31&i)<<6|63&(a=e.charCodeAt(r+1))),r+=2):(a=e.charCodeAt(r+1),t+=String.fromCharCode((15&i)<<12|(63&a)<<6|63&(n=e.charCodeAt(r+2))),r+=3);return t}(c)}function H(e,t,r){var i="",n=0,a=!1,s=!1,o=0,c=e.length,l="",p="";e:for(o=0;o<c;o++){var u=e.charAt(o);if(!1===a){if("<"===u){a=o;continue}}else if(!1===s){if("<"===u){i+=r(e.slice(n,o)),a=o,n=o;continue}if(">"===u||o===c-1){i+=r(e.slice(n,a)),l=function(e){var t,r=m.spaceIndex(e);return t=-1===r?e.slice(1,-1):e.slice(1,r+1),"/"===(t=m.trim(t).toLowerCase()).slice(0,1)&&(t=t.slice(1)),"/"===t.slice(-1)&&(t=t.slice(0,-1)),t}(p=e.slice(a,o+1)),i+=t(a,i.length,l,p,"</"===p.slice(0,2)),n=o+1,a=!1;continue}if('"'===u||"'"===u)for(var h=1,d=e.charAt(o-h);""===d.trim()||"="===d;){if("="===d){s=u;continue e}d=e.charAt(o-++h)}}else if(u===s){s=!1;continue}}return n<c&&(i+=r(e.substr(n))),i}function y(e,t){var r=0,n=0,a=[],s=!1,o=e.length;function c(e,r){if(!((e=(e=m.trim(e)).replace(i,"").toLowerCase()).length<1)){var n=t(e,r||"");n&&a.push(n)}}for(var l=0;l<o;l++){var p=e.charAt(l),u=void 0;if(!1!==s||"="!==p){if(!1===s||l!==n){if(/\s|\n|\t/.test(p)){if(e=e.replace(/\s|\n|\t/g," "),!1===s){if(-1===(u=function(e,t){for(;t<e.length;t++){var r=e[t];if(" "!==r)return"="===r?t:-1}return -1}(e,l))){c(m.trim(e.slice(r,l))),s=!1,r=l+1;continue}l=u-1;continue}if(-1===(u=function(e,t){for(;t>0;t--){var r=e[t];if(" "!==r)return"="===r?t:-1}return -1}(e,l-1))){c(s,G(m.trim(e.slice(r,l)))),s=!1,r=l+1;continue}}}else{if(-1===(u=e.indexOf(p,l+1)))break;c(s,m.trim(e.slice(n+1,u))),s=!1,r=(l=u)+1}}else s=e.slice(r,l),r=l+1,n='"'===e.charAt(r)||"'"===e.charAt(r)?r:function(e,t){for(;t<e.length;t++){var r=e[t];if(" "!==r)return"'"===r||'"'===r?t:-1}return -1}(e,l+1)}return r<e.length&&(!1===s?c(e.slice(r)):c(s,G(m.trim(e.slice(r))))),m.trim(a.join(" "))}function b(e,t,r){if(r=function(e){return e=function(e){for(var t="",r=0,i=e.length;r<i;r++)t+=32>e.charCodeAt(r)?" ":e.charAt(r);return m.trim(t)}(e=(e=(e=e.replace(o,'"')).replace(s,function(e,t){return"x"===t[0]||"X"===t[0]?String.fromCharCode(parseInt(t.substr(1),16)):String.fromCharCode(parseInt(t,10))})).replace(c,":").replace(l," "))}(r),"href"===t||"src"===t){if("#"===(r=m.trim(r)))return"#";if("http://"!==r.substr(0,7)&&"https://"!==r.substr(0,8)&&"mailto:"!==r.substr(0,7)&&"tel:"!==r.substr(0,4)&&"data:image/"!==r.substr(0,11)&&"ftp://"!==r.substr(0,6)&&"./"!==r.substr(0,2)&&"../"!==r.substr(0,3)&&"#"!==r[0]&&"/"!==r[0])return""}else if("background"===t){if(p.lastIndex=0,p.test(r))return""}else if("style"===t&&(h.lastIndex=0,h.test(r)||(u.lastIndex=0,u.test(r)&&(p.lastIndex=0,p.test(r)))))return"";return r=function(e){return e=f(e=e.replace(d,"&quot;"))}(r)}var x=function(e){return"string"==typeof e?e.replace(/'/g,'"').replace('=""',"").replace(/\s+/g,"").toLowerCase():""},I=function(){function e(e){var t=function(e){var t={};for(var r in e)t[r]=e[r];return t}(e||{});t.stripIgnoreTag&&(t.onIgnoreTag,t.onIgnoreTag=function(){return""}),t.whiteList={},t.onTag=function(){},t.onTagAttr=function(){},t.onIgnoreTag=function(){},t.onIgnoreTagAttr=function(){},t.safeAttrValue=b,t.escapeHtml=f,this.options=Object.assign(t,e)}return e.prototype.process=function(e){if(!(e=(e=e||"").toString()))return"";var t,r,i,n,a,s,o=this.options,c=o.whiteList,l=o.onTag,p=o.onIgnoreTag,u=o.onTagAttr,h=o.onIgnoreTagAttr,d=o.safeAttrValue,f=o.escapeHtml;o.stripBlankChar&&(e=(t=(t=e.split("")).filter(function(e){var t=e.charCodeAt(0);return!(127===t||t<=31&&10!==t&&13!==t)})).join("")),o.allowCommentTag||(e=function(e){for(var t="",r=0;r<e.length;){var i=e.indexOf("\x3c!--",r);if(-1===i){t+=e.slice(r);break}t+=e.slice(r,i);var n=e.indexOf("--\x3e",i);if(-1===n)break;r=n+3}return t}(e));var g=!1;o.stripIgnoreTagBody&&(r=o.stripIgnoreTagBody,"function"!=typeof(i=p)&&(i=function(){}),n=!Array.isArray(r),a=[],s=!1,p=(g={onIgnoreTag:function(e,t,o){var c;if(c=e,n||-1!==m.indexOf(r,c)){if(o.isClosing){var l="[/removed]",p=o.position+l.length;return a.push([!1!==s?s:o.position,p]),s=!1,l}return s||(s=o.position),"[removed]"}return i(e,t,o)},remove:function(e){var t="",r=0;return m.forEach(a,function(i){t+=e.slice(r,i[0]),r=i[1]}),t+=e.slice(r)}}).onIgnoreTag);var G=H(e,function(e,t,r,i,n){var a={sourcePosition:e,position:t,isClosing:n,isWhite:Object.prototype.hasOwnProperty.call(c,r)},s=l(r,i,a);if(null!=s)return s;if(a.isWhite){if(a.isClosing)return"</".concat(r,">");var o=function(e){var t=m.spaceIndex(e);if(-1===t)return{html:"",closing:"/"===e[e.length-2]};var r="/"===(e=m.trim(e.slice(t+1,-1)))[e.length-1];return r&&(e=m.trim(e.slice(0,-1))),{html:e,closing:r}}(i),g=c[r],G=y(o.html,function(e,t){var i=-1!==m.indexOf(g,e),n=u(r,e,t,i);return null==n?i?(t=d(r,e,t,null))?"".concat(e,'="').concat(t,'"'):e:null==(n=h(r,e,t,i))?void 0:n:n});return i="<".concat(r),G&&(i+=" ".concat(G)),o.closing&&(i+=" /"),i+=">"}return null==(s=p(r,i,a))?f(i):s},f);return g&&(G=g.remove(G)),G},e}(),T=Function("\nvar _checkXSS = function (it) {\n  return it && it.Math == Math && it;\n};\nreturn _checkXSS(typeof globalThis === 'object' && globalThis) ||\n_checkXSS(typeof window === 'object' && window) ||\n_checkXSS(typeof self === 'object' && self) ||\n_checkXSS(typeof global === 'object' && global) ||\nFunction('return this')();\n")(),C=new(function(){function e(){var e=this;this.batchData=[],this.uniqKeys=new Set,this.timeout=2e3,this.lock=!1,this.getSlardarBid=function(){var t,r,i="douyin_web";if(!m.includes(i,"bid"))return i;if(e.config&&e.config.bid)return e.config.bid;if(T&&T._xssBid)return T._xssBid;if(T&&T.slardar&&"function"==typeof T.slardar.config){var n=(T.slardar.config()||{}).bid;if(n)return n}if(T&&T.Slardar&&"function"==typeof T.Slardar.config){var a=(T.Slardar.config()||{}).bid;if(a)return a}return(null===(r=null===(t=null==T?void 0:T.Slardar)||void 0===t?void 0:t._baseParams)||void 0===r?void 0:r.bid)||"argus"},this.getConfigRegion=function(){var t;return m.includes("cn","region")?e.config&&e.config.region?e.config.region:((null===(t=null==T?void 0:T.gfdatav1)||void 0===t?void 0:t.region)||"cn").toLowerCase():"cn"},this.gerReportUrl=function(){var t={cn:v("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boe:v("aHR0cHM6Ly9tb24uemlqaWVhcGkuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),ttp:v("aHR0cHM6Ly9tb24udXMudGlrdG9rdi5jb20vbW9uaXRvcl9icm93c2VyL2NvbGxlY3QvYmF0Y2gvc2VjdXJpdHkvP2JpZD0="),va:v("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),maliva:v("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),sg:v("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9"),boei18n:v("aHR0cHM6Ly9tb24tdmEuYnl0ZW92ZXJzZWEuY29tL21vbml0b3JfYnJvd3Nlci9jb2xsZWN0L2JhdGNoL3NlY3VyaXR5Lz9iaWQ9")}[e.getConfigRegion()];if(t)return t+e.getSlardarBid()}}return e.prototype.setConfig=function(e){this.config=e},e.prototype.upload=function(){var e=this,t=this.gerReportUrl();!this.lock&&t&&0!==this.batchData.length&&(this.lock=!0,setTimeout(function(){var r=e.batchData.slice(0,100);e.batchData=e.batchData.slice(100),T.fetch(t,{method:"post",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}).catch(function(e){}),e.lock=!1,e.upload()},this.timeout))},e.prototype.generateKey=function(e){return e.collectKey?[e.collectMode,e.collectKey].join("___"):""},e.prototype.push=function(e){this.batchData.push(e),this.upload()},e.prototype.report=function(e){var t=this.generateKey(e);if(T.fetch&&e.collectKey){var r="object"==typeof window?window.location.href:"SSR";e.documentUrl=r;var i={age:Math.floor(Date.now()),type:"xss",url:r,body:e,"user-agent":""};"enforce"===e.disposition&&"SSR"!==r||(i.url=t),"SSR"===r&&(i.url="SSR___".concat(i.url),i.body.ssr=!0),this.push(i)}},e}()),w=function(e){for(var t=0,r=function(r){Array.isArray(e[r])?0===e[r].length?delete e[r]:(e[r]=m.from(m.uniq(e[r])),t+=e[r].length):0===m.keys(e[r]).length?delete e[r]:m.keys(e[r]).forEach(function(i){e[r][i]=m.from(m.uniq(e[r][i])),t+=e[r][i].length})},i=0,n=m.keys(e);i<n.length;i++)r(n[i]);return{count:t,ret:e}};function P(e,t){return C.setConfig(t),new I(t).process(e)}function k(e){var t,r=(t=/\s|\n|\t/.exec(e))?t.index:-1;if(-1===r)return{html:"",closing:"/"===e[e.length-2]};var i="/"===(e=e.slice(r+1,-1).trim())[e.length-1];return i&&(e=e.slice(0,-1).trim()),{html:e,closing:i}}var E=function(e){return -1===(e=(e=(e=(e=e.replace(/&colon;/gi,":")).replace(/&tab;/gi,"")).replace(/&newline;/gi,"")).replace(/(\t|\n|\r)/g,"")).indexOf("&#")?e.trim().toLowerCase():e.trim().replace(/&#(?:(x)([0-9a-f]+)|([0-9]+));?/gi,function(e,t,r,i){return String.fromCharCode(t?parseInt(r,16):parseInt(i))}).replace(/(\t|\n|\r)/g,"").toLowerCase()};function A(e,t){if(void 0===e&&(e=""),"string"!=typeof e)return!0;if(e=E(e),m.includes(e,"base64")&&!function(e){if(""===e||""===e.trim())return!0;try{return!m.includes(e,"data:text/html;base64")}catch(e){return!0}}(e))return t&&t("data:text/html;base64"),!1;var r=["expression(","behavior:","view-source:"];if(m.some(r,function(t){return -1!==e.indexOf(t)}))return m.forEach(r,function(r){-1!==e.indexOf(r)&&t&&t(r)}),!1;var i=["data:application","data:javascript","data:text/html","data:texthtml"];if(m.some(i,function(t){return -1!==e.indexOf(t)}))return m.forEach(i,function(r){-1!==e.indexOf(r)&&t&&t(r)}),!1;if(e.indexOf("javascript:")>0)return t&&t("javascript:"),!1;if(/^javascript:/i.test(e)){var n=e.slice(11).replace(/\s/g,"").trim();return!!m.some(["void","void(0)","void0","false","undefined",";"],function(e){return e===n})||(t&&t("javascript:"),!1)}return!0}var S=function(e,t){var r,i,n="<%= isSaveValidUrl =>";if("string"!=typeof e||(i=Number("<%= urlLimit =>"),void 0!==r&&(i=r),"NaN"!==e.toString()&&-1!==i&&e.length>=i)||A(e,t))return e;try{if(!0===(n=JSON.parse(n))||"true"===n){var a=new URL(e);return a.origin+a.pathname}}catch(e){}return"#"};function M(e,t,i){if(void 0===e&&(e=""),void 0===t&&(t=[]),"string"!=typeof e)return!0;if(!A(e=E(e)))return!1;var n,a={url:(n=e.match(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/)||[])[0],scheme:n[1],slash:n[2],host:n[3],port:n[4],path:n[5],query:n[6],hash:n[7]},s=a.scheme,o=a.host;return i?!!i(e):!(!s||!o)&&(!m.includes(["http","https","file"],s)||("object"==typeof window&&window&&(t=r(r([],t,!0),[location.host],!1)),m.some(t,function(e){return!!(e instanceof RegExp&&e.test(o))||e===o})))}var R={a:["target","title","spellcheck","rel"],canvas:[],abbr:["title"],address:[],area:["shape","coords","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:["dir"],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["alt","title","width","height","decoding"],ins:["datetime"],li:[],mark:[],nav:[],ol:["start"],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],delete:[],form:[],strong:[],mask:["maskunits","x","y","width","height","fill"],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],wbr:[],video:["autoplay","controls","loop","preload","height","width"],svg:["viewBox","version","xmlns","fill","width","height","stroke","stroke-width","style"],path:["d","fill","opacity","stroke","p-id","fill-rule","clip-rule","stroke-width","stroke-linecap","stroke-linejoin","fill-opacity","mask"],rect:["x","y","width","height","fill","stroke","rx"],g:[]},U={collect:null,initCollect:function(){this.collect={whiteList:{},filterProtocol:[]}},removeCollect:function(){var e=w(this.collect),t=e.count,r=e.ret;return this.collect=null,{collectKey:0===t?null:JSON.stringify(r),collectMode:"white"}},onIgnoreTagAttr:function(e,t,i){return e&&m.indexOf(["href","src"],t)>-1?U.domainWhiteList&&Array.isArray(U.domainWhiteList)&&U.domainWhiteList.length>0&&!M(i,r([],U.domainWhiteList,!0))?"":"".concat(t,'="').concat(S(i,function(e){var t;null===(t=U.collect)||void 0===t||t.filterProtocol.push(e)}),'"'):e&&(m.indexOf(["style","class","id"],t)>-1||t.indexOf("data-")>-1)?"".concat(t,'="').concat(i,'"'):(U.collect.whiteList[e]=U.collect.whiteList[e]||[],void U.collect.whiteList[e].push(t))},onIgnoreTag:function(e,t){if("style"===e)return t;H(t,function(e,t,r,i){y(k(i).html.replace("/",""),function(e){U.collect.whiteList[r]=U.collect.whiteList[r]||[],U.collect.whiteList[r].push(e)})},f)},whiteList:R,mergeWhiteList:function(e){for(var t,r={},i=0,n=m.keys(R);i<n.length;i++)r[t=n[i]]=m.from(R[t]);for(var a=0,s=m.keys(e);a<s.length;a++)r[t=s[a]]=t in R?R[t].concat(e[t]):m.from(e[t]);return r},setWhiteList:function(e){for(var t=0,r=m.keys(e);t<r.length;t++){var i=r[t];this.whiteList[i]=i in R?R[i].concat(e[i]):m.from(e[i])}}};try{var O={},_="merge";m.includes(_,"override")&&(U.whiteList=O.whiteList),m.includes(_,"merge")&&U.setWhiteList(O.whiteList)}catch(e){}var L=function(e,t){for(var r={},i=0,n=m.keys(e);i<n.length;i++){var a=n[i];Array.isArray(e[a])?r[a]=m.from(e[a]):r[a]=L({},e[a])}for(var s=0,o=m.keys(t);s<o.length;s++)(a=o[s])in e?Array.isArray(e[a])?r[a]=e[a].concat(t[a]):r[a]=L(e[a],t[a]):Array.isArray(t[a])?r[a]=m.from(t[a]):r[a]=L({},t[a]);return r},N={blackList:{a:["folder"],meta:["content"],iframe:["srcdoc"],input:["pattern"],vmlframe:["xmlns"]},blackTags:["script","xml","embed","isindex","object","base","set","handler","animate","payload","import"],blackAttrs:["charset","ns","namespace","formaction","xlink:href","xmlns:xlink","handler","repeat","repeat-start","repeat-end"],blackAttrRegExps:[/^on/],filterList:{param:["value"],video:["poster"],form:["action"]},filterAttrs:["href","src","background","style","dynsrc","lowsrc","content"]};try{var j={};j.blackAttrRegExps&&(j.blackAttrRegExps=j.blackAttrRegExps.map(function(e){return new RegExp(e.toString().slice(1,e.toString().length-1))}));var F="merge";m.includes(F,"override")&&(N=j),m.includes(F,"merge")&&(N=L(N,j))}catch(e){}var X={mode:"black",whiteList:{},blackConfig:N,collect:null,initCollect:function(){X.collect={blackList:{},blackTags:[],blackAttrs:[],blackAttrRegExps:[],filterAttrs:[],filterList:{},filterProtocol:[]}},removeCollect:function(){var e=w(X.collect),t=e.count,r=e.ret;return X.collect=null,{collectKey:0===t?null:JSON.stringify(r),collectMode:"black"}},onIgnoreTag:function(e,t){var r;if(!m.includes(N.blackTags,e))return H(t,function(e,t,r,i,n){if(-1!==r.indexOf("/"))return f(i);if(n)return"</".concat(r,">");var a=k(i),s=y(a.html,function(e,t){var i,n=0;if(N.blackList[r]&&m.includes(N.blackList[r],e)&&(X.collect.blackList[r]=X.collect.blackList[r]||[],X.collect.blackList[r].push(e),n++),N.blackAttrRegExps.length&&N.blackAttrRegExps.some(function(t){return t.test(e)})&&m.forEach(N.blackAttrRegExps,function(t){t.test(e)&&(X.collect.blackAttrRegExps.push("".concat(t.toString(),"->").concat(e)),n++)}),N.blackAttrs.length&&m.includes(N.blackAttrs,e)&&(N.blackAttrs.push(e),n++),!n){if(N.filterList&&N.filterList[r]&&m.includes(N.filterList[r],e)){var a=S(t,function(e){var t;null===(t=X.collect)||void 0===t||t.filterProtocol.push(e)});return a!==t&&(X.collect.filterList[r]=X.collect.filterList[r]||[],X.collect.filterList[r].push(e)),t?"".concat(e,"='").concat(a,"'"):e}return N.filterAttrs&&m.includes(N.filterAttrs,e)?((a=S(t,function(e){var t;null===(t=X.collect)||void 0===t||t.filterProtocol.push(e)}))!==t&&(null===(i=X.collect)||void 0===i||i.filterAttrs.push(e)),t?"".concat(e,"='").concat(a,"'"):e):t?"".concat(e,"='").concat(t,"'"):e}});return i="<".concat(r),s&&(i+=" ".concat(s)),a.closing&&(i+=" /"),i+=">"},f);null===(r=X.collect)||void 0===r||r.blackTags.push(e)}},Z=function(e){var t=e.reportOnly,r=void 0===t||t,i=e.block;return r&&"all"===r?"report":("string"==typeof r&&("true"===r&&(r=!0),"false"===r&&(r=!1)),i?"enforce":r?"report":"enforce")},$=function(e){return function(r,i,n){if(!r||"string"!=typeof r)return r;var a=i;e===P&&(a=U).initCollect();var s=e(r,a);if(x(s)===x(r))return r;if(!n)return s;var o=n.logType,c=Z(n),l=a.removeCollect();return C.report(t(t({type:o,disposition:c},l),{sourceText:D(r),filterText:D(s)})),"enforce"===c?s:r}},B=$(function(e,t){return void 0===t&&(t={}),t&&t.whiteList||(t.whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","crossorigin","loop","muted","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],figcaption:[],figure:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],summary:[],sup:[],strong:[],strike:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src","height","width"]}),new I(t).process(e)}),V=$(P),z=function(e,t,r){var i=[],n=S(e,function(e){i.push(e)});if(n===e)return e;i=m.from(m.uniq(i));var a=t||r||{};if(!a)return n;var s=a.logType,o=Z(r);return C.report({type:s,disposition:o,collectKey:i.join("___"),collectData:JSON.stringify(i),collectMode:"black",sourceText:D(e),filterText:D(n)}),"enforce"===o?n:e},W=T._xssProject||{},J=T.xssNamespace||{},Y="3.0.26",q={FilterXSS:I,version:Y,webpackPluginVersion:"<%= webpackPluginVersion =>",reportOnly:"<%= reportOnly =>",filterXSS:B,_filterXSS:V,filterUrl:z,Config:U,BlackConfig:X,project:W,setProjectName:function(e){W[e]=this,T._xssProjectName=e}};J.douyin_web=q,T.xssNamespace=J,T.Math&&!T.Math.xssNamespace&&(T.Math.xssNamespace=J),W[Y]=q,T.globalThis=T,T.getFilterXss=function(){return void 0!==this._xssProjectName?this._xssProject[this._xssProjectName]:q},T.xss=q,T.isSafeUrl=M,T.isSafeDomain=M,T.isSafeProtocol=A,T._xssProject=W,T._xssProjectName&&(W[T._xssProjectName]=q);var K=q.setProjectName.bind(q);e.BlackConfig=X,e.Config=U,e.FilterXSS=I,e._filterXSS=V,e.filterUrl=z,e.filterXSS=B,e.isSafeDomain=M,e.isSafeProtocol=A,e.isSafeUrl=M,e.project=W,e.setProjectName=K,e.setXssNamespace=function(e){var t=e.appId,r=e.bid,i=e.region;J[t]=q;U.bid=r,U.region=i,U.enabled=!0},e.xssNamespace=J,Object.defineProperty(e,"__esModule",{value:!0})}),(self.webpackChunkdouyin_web=self.webpackChunkdouyin_web||[]).push([["39244"],{724409:function(e,t,r){"use strict";var i=r(101199),n=r(994298);let a=(0,n.A)(function(e){return i.createElement("svg",Object.assign({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,"aria-hidden":!0},e),i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0Zm-9.5 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM12 5a1.9 1.9 0 0 0-1.89 2l.3 5.5a1.59 1.59 0 0 0 3.17 0l.3-5.5c.07-1.09-.8-2-1.88-2Z",fill:"currentColor"}))},"alert_circle");t.Z=a},934057:function(e,t,r){"use strict";r.d(t,{En:function(){return s},L5:function(){return a},NP:function(){return p},QZ:function(){return l},d8:function(){return c},mz:function(){return o},t$:function(){return u}});var i={},n={},a=function(e,t){if(i[e]=t,t){var r;null!==(r=n[e])&&void 0!==r||(n[e]=Object.create(null))}else delete n[e]},s=function(e){return!!i[e]},o=function(e){delete i[e],delete n[e]},c=function(e,t,r,i){var a,s,o;null!==(s=n[e])&&void 0!==s||(n[e]=Object.create(null)),null!==(o=(a=n[e])[t])&&void 0!==o||(a[t]=[]),!n[e][t].some(function(e){return e.id===r})&&n[e][t].push({id:r,once:i})},l=function(e,t,r){var i;(null===(i=n[e])||void 0===i?void 0:i[t])&&(null==r?n[e][t]=[]:n[e][t]=n[e][t].filter(function(e){return e.id!==r}))},p=function(e,t){var r;return((null===(r=n[e])||void 0===r?void 0:r[t])||[]).slice()},u=function(e,t,r){var i;(null===(i=n[e])||void 0===i?void 0:i[t])&&(n[e][t]=n[e][t].filter(function(e){return!(e.once&&r.includes(e.id))}))}},523659:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});let i=`Arc(TM) A770M Graphics|995
Arc(TM) A770 Graphics|983
Arc(TM) A770 Graphics|969
Arc(TM) A580 Graphics|944
Arc(TM) A730M Graphics|822
Arc(TM) A750 Graphics|768
Arc(TM) A750 Graphics|768
Arc(TM) A550M Graphics|660
Arc(TM) A550M Graphics|634
Xe Graphics ReleaseInternal|561
Arc(TM) A770M Graphics|498
Arc(TM) A380 Graphics|473
Arc(TM) A380 Graphics|468
Arc(TM) A370M Graphics|342
Arc(TM) A370M Graphics|341
Xe Graphics|319
HD Graphics 630 GT2|309
Arc(TM) A350M Graphics|284
Iris(R) Xe MAX Graphics|214
Iris(R) Xe Graphics RI|205
Iris(R) Xe Graphics ReleaseInternal|181
Iris(R) Xe Graphics|180
Gen12 Desktop Graphics Controller|179
Iris(R) Xe Graphics|178
Iris(R) Xe MAX Graphics|168
Corporation Iris Xe Graphics|167
Corporation TigerLake-LP GT2 [Iris Xe Graphics]|162
Xe Graphics|158
Arc(TM) A350M Graphics|156
Corporation TigerLake GT2 [Iris Xe Graphics]|149
UHD Graphics 770|138
UHD Graphics ReleaseInternal|137
Iris(R) Pro Graphics P580|137
Iris(R) Plus Graphics|132
Iris Plus Graphics|127
Iris(R) Pro Graphics 580|126
UHD Graphics 770|125
UHD Graphics 750|125
Radeong 0.4 on AMD TONGA (DRM 3.1.0, LLVM 3.9.0)|123
Corporation Iris Plus Graphics G7|123
Iris(R) Plus Graphics|122
Iris(R) Plus Graphics 940|121
Iris(R) Plus Graphics 650|121
Iris(R) Plus Graphics 655|121
Iris(R) Plus Graphics 655|121
HD Graphics P4600|120
Iris(TM) Pro Graphics 6200|120
Iris(R) Plus Graphics|118
Iris(R) Plus Graphics 650|116
Iris(R) Plus Graphics 655|115
Iris(R) Pro Graphics 580|114
Corporation Iris Pro Graphics 580|114
Iris(R) Plus Graphics 645|113
Iris(TM) Pro Graphics 6200|113
Iris(TM) Pro Graphics P580|113
Corporation Iris Plus Graphics 655|112
Arc(TM) Graphics RI|111
Iris(R) Plus Graphics 655|111
Iris(R) Plus Graphics 655|110
Iris(R) Plus Graphics|110
UHD Graphics|110
Iris Plus Graphics 655|108
Iris(R) Plus Graphics 650|108
Iris(R) Plus Graphics 650|108
Iris(TM) Pro Graphics 580|108
Iris(TM) Pro Graphics 6200|107
Iris Graphics 6100|107
Iris(TM) Pro Graphics 6200|107
Iris(R) Plus Graphics 645|106
UHD Graphics 730|106
Iris(TM) Pro Graphics 6200|103
Iris Pro Graphics 580|102
Corporation Iris Pro Graphics 6200|102
Iris(R) Plus Graphics gfx-driver-user-comp_media-21486 DC ReleaseInternal|101
Iris(R) Pro Graphics 580|101
Iris Plus Graphics 645|101
UHD Graphics 750|100
Iris(TM) Pro Graphics 580|99
Iris(TM) Graphics 550|99
Iris(TM) Pro Graphics P6300|99
Iris(R) Plus Graphics 650|99
Iris(TM) Pro Graphics 5200|98
Iris(R) Graphics 550|97
Iris(R) Plus Graphics|97
Iris(R) Plus Graphics 650|96
Iris(R) Plus Graphics 655|96
Iris(R) Graphics 550|96
Iris(R) Plus Graphics 645|95
Iris Plus Graphics 650|95
Iris(R) Graphics 550|95
Iris Graphics 550|93
Iris(R) Plus Graphics 650|93
Iris(R) Pro Graphics 580|93
Iris(TM) Plus Graphics 650|91
Iris(TM) Graphics 550|91
Iris(R) Plus Graphics 640|89
Iris(TM) Plus Graphics 650|88
Iris(TM) Pro Graphics P6300|88
Iris(TM) Plus Graphics 650|88
Iris(TM) Graphics 550|87
UHD Graphics 730|87
Corporation Iris Plus Graphics 650|87
Iris(TM) Pro Graphics 5200|86
Corporation CometLake-H GT2 [UHD Graphics]|86
Iris(R) Graphics 540|86
UHD Graphics P630|86
UHD Graphics 630|85
Iris(TM) Graphics 540|85
Iris(TM) Plus Graphics 640|84
Iris(TM) Graphics 540|84
UHD Graphics 630|84
UHD Graphics 630|83
UHD Graphics P630|83
Iris(TM) Plus Graphics 640|83
UHD Graphics 630|83
UHD Graphics 630|83
Iris Plus Graphics 640|83
Iris(TM) Graphics 540|82
UHD Graphics 630|82
UHD Graphics 630|82
Iris(TM) Pro Graphics 5200|81
UHD Graphics 630|81
HD Graphics 630|81
UHD Graphics 630|81
UHD Graphics 630|81
UHD Graphics 630|80
UHD Graphics 630|80
UHD Graphics 630|80
Iris Pro Graphics 6200|80
UHD Graphics 630|80
Iris Graphics 540|80
HD Graphics 630|80
Iris(TM) Graphics 540|80
Iris(TM) Pro Graphics 5200|79
UHD Graphics 630|79
UHD Graphics 630|79
UHD Graphics 630|79
Iris Graphics 540|79
UHD Graphics 630|79
UHD Graphics|78
Corporation Sky Lake Integrated Graphics|78
Iris(TM) Pro Graphics 6200|78
Corporation WhiskeyLake-U GT2 [UHD Graphics 620]|78
Radeong 0.4 on AMD BONAIRE (DRM 2.43.0, LLVM 3.8.0)|78
UHD Graphics 710|78
UHD Graphics 630|78
UHD Graphics P630|77
UHD Graphics 630|77
UHD Graphics 630 (Desktop 9 Series)|77
UHD Graphics 630|77
Coffee Lake UHD Graphics|77
Iris(TM) Pro Graphics 5200|77
UHD Graphics 630|76
Iris(R) Plus Graphics 640|76
Iris(TM) Pro Graphics 5200|76
UHD Graphics 630|76
UHD Graphics|76
UHD Graphics 630|76
Iris(TM) Pro Graphics 5200|75
UHD Graphics 630|75
UHD Graphics P630|75
HD Graphics P530|75
HD Graphics 630|75
Iris(TM) Pro Graphics 5200|75
UHD Graphics 630|75
Iris(TM) Pro Graphics 5200|75
HD Graphics 620|74
UHD Graphics 630|74
HD Graphics 630|74
HD Graphics 630|74
Coffee Lake HD Graphics|74
UHD Graphics 630|74
Iris(TM) Graphics 540|74
UHD 630|74
Iris(R) Graphics 540|73
UHD Graphics 620|73
Iris Graphics 6200|73
Corporation CoffeeLake-H GT2 [UHD Graphics 630]|73
UHD Graphics 630 (Desktop)|73
HD Graphics ICL RVP|73
UHD Graphics 630|73
HD Graphics 630|72
Iris Pro|72
KBL Unknown|72
UHD Graphics 630|72
Iris(TM) Pro Graphics 5200|72
HD Graphics 530|72
Corporation UHD Graphics 630 (Desktop 9 Series)|72
Radeon Pro Vega 16|72
Iris(TM) Graphics 540|72
Iris(R) Graphics 540|72
UHD Graphics 630|71
HD Graphics 630|71
Iris(TM) Pro Graphics 5200|71
UHD Graphics 630|71
Iris Pro|71
CometLake UHD Graphics 630|71
HD Graphics 630|71
UHD Graphics|71
Iris(TM) Plus Graphics 640|71
UHD Graphics|71
Corporation UHD Graphics|70
Iris Pro Graphics 6200|70
Iris(R) Graphics 540|70
Graphics|70
UHD Graphics 630|70
HD Graphics ICL RVP BigSur|70
UHD Graphics ReleaseInternal|70
HD Graphics 530|70
UHD Graphics 630|70
UHD Graphics|70
UHD Graphics gfx-driver-user-comp_core-23599|70
UHD Graphics 630|69
UHD Graphics|69
Iris(TM) Pro Graphics 5200|69
Corporation Iris Plus Graphics G1 (Ice Lake)|69
HD Graphics 630|69
HD Graphics 630|69
Iris(R) Plus Graphics|69
Iris(TM) Pro Graphics 5200|69
UHD Graphics 620|69
UHD Graphics|69
Iris(R) Plus Graphics 640|69
Iris Pro Graphics 6200|69
HD Graphics 630|69
UHD Graphics 630 (Mobile)|68
Iris(TM) Pro Graphics 5200|68
Corporation UHD Graphics 630 (Desktop)|68
HD Graphics 630|68
UHD Graphics 630|68
UHD Graphics 620|68
UHD Graphics 630|68
Iris(TM) Plus Graphics 640|68
UHD Graphics|67
Iris Pro Graphics 580|67
Iris(TM) Graphics 540|67
UHD Graphics 620|67
Iris(TM) Pro Graphics 5200|67
UHD Graphics|66
HD Graphics P530|66
Corporation UHD Graphics 630 (Mobile)|66
Iris(R) Plus Graphics 640|66
UHD Graphics 630|66
Iris(R) Plus Graphics 640|65
HD Graphics 630|65
HD 530|65
UHD Graphics 620|65
SKL Unknown|65
HD Graphics 630|64
Iris(TM) Graphics 540|64
Mesa DRI Intel(R) UHD Graphics 620 (Kabylake GT2)|64
UHD Graphics 630|64
HD Graphics 530|63
HD Graphics 530|63
HD Graphics 530|63
Mesa Intel(R) HD Graphics 530 (SKL GT2)|63
UHD Graphics|63
HD Graphics 530|63
Iris Graphics 550|63
HD Graphics 530|63
Iris Plus Graphics 655|63
HD Graphics 630|63
UHD Graphics, Gen11 LP|63
Corporation 8th Gen Core Processor Gaussian Mixture Model|63
UHD Graphics 630|63
Iris(TM) Graphics 650|63
Iris(R) Plus Graphics 640|62
HD Graphics 530|62
Mesa DRI Intel(R) Iris Graphics 540 (Skylake GT3e)|62
Iris(R) Plus Graphics|61
Iris(TM) Pro Graphics 5200|61
Iris Pro|61
HD Graphics 620|61
UHD Graphics 620|61
UHD Graphics 630|61
UHD Graphics|61
HD Graphics 530|60
Iris Plus Graphics G1|60
Iris(TM) Pro Graphics 5200|60
Iris Plus Graphics 650|60
UHD Graphics|60
HD Graphics 620|60
UHD Graphics 620|60
UHD Graphics 630|60
Mesa DRI Intel(R) HD Graphics 630 (Kaby Lake GT2)|60
UHD Graphics 620|60
HD Graphics 630|60
HD Graphics 630|59
Iris Graphics 540|59
Iris Plus Graphics 640|59
CoffeeLake-H GT2 [UHD Graphics 630]|59
HD Graphics 630|59
UHD Graphics|59
HD Graphics 620|59
UHD Graphics 620|59
HD Graphics 630|59
Corporation UHD Graphics 620 (Whiskey Lake)|59
Iris(R) Plus Graphics 650|59
UHD Graphics 620|59
Mesa Intel(R) HD Graphics 520 (SKL GT2)|58
HD Graphics 630|58
HD Graphics P530|58
Iris(TM) Plus Graphics 640|58
Corporation HD Graphics 630|58
UHD Graphics 620|58
UHD Graphics 630|58
HD Graphics P630|58
Mesa DRI Intel(R) UHD Graphics 630 (Coffeelake 3x8 GT2)|58
Corporation CometLake-S GT2 [UHD Graphics 630]|58
HD Graphics 530|58
Iris Graphics 540|58
HD Graphics 530|58
Corporation Device|58
HD Graphics CFL CRB|57
HD Graphics 620 macOS Edition|57
HD Graphics 530|57
Mesa DRI Intel(R) HD Graphics 520 (SKL GT2)|57
Iris Pro Graphics|56
Iris(TM) Pro Graphics 5200|56
Iris(R) Plus Graphics 655|56
Coffee Lake UHD Graphics|56
Iris(TM) Graphics 640|55
Iris Pro|55
UHD Graphics 630|55
UHD Graphics 620|55
HD Graphics 530|55
HD Graphics 520|54
HD Graphics 530|54
UHD Graphics 620|54
HD Graphics 530|54
Corporation UHD Graphics 620|54
UHD Graphics|54
Iris Plus Graphics G7|54
Corporation Skylake GT2 [HD Graphics 520]|53
UHD Graphics 630|53
HD Graphics 630|53
Corporation HD Graphics 530|53
UHD Graphics 617|53
HD Graphics 520|52
HD Graphics 620|52
HD Graphics 620|52
HD Graphics 620|52
HD Graphics 620|52
HD Graphics 630|52
HD Graphics 630|52
HD Graphics 5600|51
HD Graphics 530|51
HD Graphics 630|51
UHD Graphics 615|51
Mesa DRI Intel(R) HD Graphics 520 (Skylake GT2)|51
HD Graphics 630|50
HD Graphics 620|50
UHD Graphics|50
HD Graphics P4600/P4700|50
HD Graphics 520|50
HD Graphics 530|50
HD Graphics 620|50
HD Graphics 530|50
Corporation HD Graphics 620|50
HD Graphics 530|50
UHD Graphics 620|49
UHD Graphics 620|49
HD Graphics 530|49
Iris(TM) Graphics 6100|49
HD Graphics 4600|49
HD Graphics 630|49
UHD Graphics 617|49
UHD Graphics RI|48
HD Graphics 520|48
UHD Graphics 617|48
HD Graphics 5600|48
HD Graphics 620|48
UHD Graphics, Gen11 LP|47
UHD Graphics 617|47
Mesa DRI Intel(R) HD Graphics 620 (Kaby Lake GT2)|47
HD Graphics 615|47
UHD Graphics RI|47
HD Graphics 630|47
HD Graphics 4600|46
HD Graphics 520|46
Corporation Skylake GT2 [HD Graphics 520]|46
HD Graphics 520|46
Corporation Device|46
HD Graphics 4600|46
HD Graphics 615|45
HD Graphics 4600|45
Iris(TM) Graphics 6100|45
HD Graphics 615|45
UHD Graphics 615|45
HD Graphics 630 GT2|45
HD Graphics 4600|45
HD Graphics 630|45
Iris(TM) Graphics 6100|45
HD Graphics 4600|45
HD Graphics 620|45
Iris(TM) Graphics 6100|45
HD Graphics 520|45
HD Graphics 4600|45
Iris(TM) Graphics 540|44
HD Graphics 530|44
HD Graphics 4600|44
Iris(TM) Graphics 5100|44
Kabylake HD Graphics ULT GT2|44
Iris Graphics 6100|44
UHD Graphics 630|44
HD Graphics 520|44
HD Graphics KBL CRB|44
HD Graphics 530 (Skylake GT2)|44
Corporation HD Graphics 620|44
HD Graphics 515|44
UHD Graphics|44
UHD Graphics 620|44
Iris(TM) Pro Graphics P580|43
UHD Graphics 615|43
HD Graphics 4600|43
HD Graphics 4600|43
Corporation Skylake Integrated Graphics|43
HD Graphics 530|43
UHD Graphics 615|43
UHD Graphics 630|43
HD Graphics 615|42
HD Graphics 620|42
HD Graphics 4600|42
HD Graphics 615|42
HD Graphics 4600|42
HD Graphics 4600|42
Mesa DRI Intel(R) Kabylake GT2|42
HD Graphics 620|42
Corporation HD Graphics 6000|42
UHD Graphics 615|42
HD Graphics 4600|41
Corporation HD Graphics 520|41
HD Graphics P4600/P4700|41
Corporation, Series Chipset Iris Plus Graphics 655|41
HD Graphics 4600|41
Mesa DRI Intel(R) HD Graphics 530 (Skylake GT2)|41
HD Graphics 4600|41
Iris(TM) Graphics 640|41
HD Graphics 4600|41
HD Graphics 630|40
Iris(TM) Graphics 5100|40
Iris(TM) Graphics 6100|40
UHD Graphics 610|40
HD Graphics 4600|40
HD Graphics 4600|40
UHD Graphics 615|40
UHD Graphics 610|40
HD Graphics 530|40
UHD Graphics 605|40
HD Graphics 615|40
HD Graphics 4600|40
UHD Graphics 615|40
HD Graphics 505|39
PHDGD Ivy 4|39
Unknown|39
Iris(TM) Graphics 5100|39
Iris|39
Corporation Iris Graphics 6100|39
HD Graphics 6000|39
Iris(TM) Graphics 5100|39
HD Graphics 615|39
HD Graphics 5500|39
Skylake GT2 [HD Graphics 520]|39
Corporation Broadwell-U Integrated Graphics|38
HD Graphics 615|38
HD Graphics 5500|38
HD Graphics 4600|38
Mesa DRI Intel(R) HD Graphics P4000 (IVB GT2)|38
HD Graphics 4600|38
HD Graphics 615|38
Corporation HD Graphics 610|38
HD Graphics 4600|38
HD Graphics 4600|38
Iris(TM) Graphics 5100|38
Iris Graphics 6100|38
HD Graphics 515|38
HD Graphics 6000|38
UHD Graphics, Gen11 LP|38
Iris(TM) Graphics 5100|38
HD Graphics 4600|37
HD Graphics 610|37
HD Graphics 4600|37
HD Graphics 515|37
HD Graphics 4600|37
HD Graphics 4600|37
Iris Graphics P580|37
Iris(TM) Pro Graphics P6300|37
HD Graphics 5500|37
HD Graphics 4600|37
Iris Graphics 6100|37
UHD Graphics 610|37
HD Graphics 4600|37
HD Graphics 4600|37
UHD Graphics 610|37
HD Graphics 530|37
HD Graphics 5500|37
HD Graphics 515|36
HD Graphics P4600/P4700|36
HD Graphics 515|36
HD Graphics 4600|36
UHD Graphics 615|36
Iris Graphics 6100|36
HD Graphics 4600|36
HD Graphics 4600|36
HD Graphics 4600|36
HD Graphics 520|36
HD Graphics 520|36
HD Graphics 5500|36
Corporation HD Graphics 5500|35
Iris|35
HD5500 Graphics PG7|35
HD Graphics 515|35
Iris|35
Graphics gfx-driver-user-feature_dg1_poweron-27723 DCH ReleaseInternal|35
HD Graphics 615|35
HD Graphics P630|35
HD Graphics 510|35
HD Graphics 6000|35
HD Graphics 5000|35
Corporation HD Graphics 5300|35
HD Graphics 6000|35
HD Graphics 4600|35
HD5500 Broadwell PG7|35
Graphics HD 4600|35
HD Graphics 6000|35
HD Graphics 510|34
HD Graphics 610|34
HD Graphics 4600|34
HD Graphics Family (PHDGD Skylake v2.9)|34
Corporation Device|34
HD Graphics 610|34
UHD Graphics 610|34
HD Graphics 5300|34
HD Graphics 5000|34
HD Graphics 4600|34
UHD Graphics 610|33
HD Graphics 4600|33
UHD Graphics 620|33
Corporation UHD Graphics 615|33
HD Graphics 5000|33
Kabylake HD Graphics ULX GT2|33
HD Graphics 620|33
UHD Graphics 615|33
HD Graphics 4600|33
HD Graphics 5500|33
HD Graphics 515|33
UHD Graphics|33
HD Graphics 4600|33
HD Graphics 520|33
HD Graphics 6000|33
HD Graphics 615|33
HD Graphics KBL CRB|33
HD Graphics 4600|33
UHD Graphics 610|33
Iris Graphics 6100|33
HD Graphics 515|33
Iris|32
Iris|32
HD Graphics 5000|32
Iris|32
HD Graphics 5000|32
Iris(TM) Graphics 5100|32
HD Graphics 4600|32
HD Graphics 4600|32
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|32
HD Graphics 5500 (PHDGD Skylake v2.9)|32
HD Graphics 610|32
HD Graphics 6000|31
HD Graphics 5500|31
Iris|31
HD Graphics 6000|31
UHD Graphics 610|31
HD Graphics 510|31
HD Graphics|31
HD Graphics 6000|31
HD Graphics 4400|31
HD Graphics 5000|31
HD Graphics 4600|30
HD Graphics 515|30
HD Graphics 5600|30
HD Graphics 4600|30
HD Graphics 4400|30
HD Graphics 530|30
GeForce GTX 960|30
UHD Graphics 610|30
GeForce GTX 960|30
HD Graphics 510|30
HD Graphics 6000|30
Corporation HD Graphics 515|30
HD Graphics 610|29
HD Graphics 510|29
HD Graphics 5000|29
HD Graphics 4600|29
Iris(TM) Pro Graphics 6200|29
HD Graphics 510|29
HD Graphics 5000|29
HD Graphics 6000|29
Iris|29
HD Graphics 4400|29
HD Graphics 4400|29
HD Graphics 4000|29
HD Graphics 510|29
HD Graphics 5000|29
HD Graphics 4400|28
HD Graphics 610|28
HD Graphics 5300|28
HD Graphics 510|28
HD Graphics|28
HD Graphics 610|28
HD Graphics 4400|28
HD Graphics 610|28
HD Graphics 4600|28
HD Graphics 4600|28
HD Graphics 5000|28
HD Graphics 4400|28
HD Graphics 4400|28
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|28
HD Graphics 4400|28
HD Graphics 5300|28
HD Graphics 5000|28
UHD Graphics 605|28
HD Graphics 4400|28
HD Graphics 5500|28
HD Graphics 4000|28
HD Graphics 4400|27
HD Graphics 615|27
HD Graphics Family(PHDGD Skylake v2.0)|27
HD Graphics 4400|27
HD Graphics 4400|27
HD Graphics 610|27
Corporation HD Graphics 510|27
Iris|27
HD Graphics 520|27
HD Graphics 5000|27
HD Graphics 5300|27
HD Graphics 6000|27
HD Graphics 4000|27
HD Graphics 610|27
HD Graphics 5000|27
HD Graphics 4600|27
Mesa DRI Intel(R) HD Graphics 505 (Broxton)|27
HD Graphics 5500|27
HD Graphics|27
HD Graphics 5000|26
UHD Graphics 600|26
HD Graphics 4600|26
Mesa DRI Intel(R) Haswell Mobile|26
HD Graphics 4000|26
HD Graphics 5300|26
Iris(TM) Graphics 540|26
HD Graphics 4000|26
HD Graphics 4600|26
HD Graphics|26
HD Graphics 4400|26
HD Graphics 4600|26
HD Graphics 6000|26
Corporation Celeron N3350/Pentium N4200/Atom E3900 Series Integrated Graphics Controller|26
HD Graphics 530|26
HD Graphics 5500|25
Broxton-P HD Graphics|25
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|25
HD 4000|25
HD Graphics 4400|25
HD Graphics 4600|25
HD Graphics 5500|25
HD 4000|25
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|25
Corporation HD Graphics|25
HD Graphics 4400|25
Mesa DRI Intel(R) HD Graphics 5500 (Broadwell GT2)|25
HD Graphics 4400|25
HD Graphics|25
UHD Graphics 600|24
Arc(TM) Graphics|24
HD Graphics 4600|24
HD Graphics 5300|24
HD Graphics 4400|24
HD Graphics 4400|24
HD Graphics 4400|24
HD Graphics 4000|24
UHD Graphics 605|24
HD Graphics 5000|23
Corporation Xeon E3-1200 v2/3rd Gen Core processor Graphics Controller|23
UHD Graphics, LKF|23
UHD Graphics 605|23
HD Graphics 4400|23
HD Graphics 4400|23
HD Graphics 4000|23
HD Graphics 4400|23
Mesa DRI Intel(R) Ivybridge Desktop|23
0x496e74656c2048442047726170686963000732034343|23
HD Graphics 5300|22
HD Graphics 615|22
Kabylake HD Graphics ULX GT2|22
HD Graphics 5300|22
HD Graphics|22
HD Graphics|22
HD Graphics 4000|22
HD Graphics|22
HD Graphics 515|22
HD Graphics|22
HD Graphics 5300|22
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|22
HD Graphics 5300|22
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|22
HD Graphics 4000|21
UHD Graphics 605|21
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|21
HD Graphics 4400|21
HD Graphics|21
HD Graphics 4400|21
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|21
HD Graphics|21
HD Graphics 5300|21
HD Graphics 4400|21
HD Graphics 5300|21
HD Graphics P4600/P4700|21
HD Graphics|21
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|21
Corporation UHD Graphics 605|20
UHD Graphics 600|20
HD Graphics 4000|20
HD Graphics|20
UHD Graphics 600 Universal|20
HD Graphics 4600|20
HD Graphics 500|20
UHD Graphics 600|20
HD Graphics|20
HD Graphics 5000|20
HD Graphics 4400|20
HD Graphics 5300|19
HD Graphics 4000|19
Mesa DRI Intel(R) Sandybridge Mobile|19
HD Graphics 505|19
HD Graphics 4000|19
HD Graphics 4400|19
UHD Graphics 600|19
HD Graphics 3000|19
HD Graphics 615|19
HD Graphics|19
Corporation Atom/Celeron/Pentium Processor N4200/N3350/E3900 Series Integrated Graphics Controller|19
HD Graphics 4000|19
HD Graphics|19
UHD Graphics 600|19
HD Graphics|19
Corporation Haswell-ULT Integrated Graphics Controller|19
HD Graphics 4400|19
Corporation GeminiLake [UHD Graphics 600]|19
HD Graphics 4000|18
HD Graphics|18
HD Graphics|18
HD Graphics 500|18
HD Graphics 4000|18
CherryView HD Graphics|17
Corporation Xeon E3-1200 v2/3rd Gen Core processor Graphics Controller|17
Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|17
Corporation Xeon E3-1200 v3/4th Gen Core Processor Integrated Graphics Controller|17
UHD Graphics 600|17
UHD Graphics 600|17
Corporation Xeon E3-1200 v2/3rd Gen Core processor Graphics Controller|16
HD Graphics|16
UHD Graphics 600|16
HD Graphics|16
HD Graphics 5000 (Android)|16
HD Graphics|16
UHD Graphics 600|16
HD Graphics|16
HD Graphics, Gen10|16
HD Graphics (PHDGD IvyDrive 3.0)|16
HD Graphics|15
UHD Graphics 600|15
Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Integrated Graphics Controller|15
HD Graphics 500|15
HD Graphics 505|15
HD Graphics|15
Corporation 3rd Gen Core processor Graphics Controller|15
HD Graphics 4400|15
HD Graphics|14
HD Graphics|14
HD Graphics|14
HD Graphics 505|14
HD Graphics|14
HD Graphics|14
HD Graphics|14
HD Graphics|13
HD Graphics 530|13
HD Graphics 500|13
Corporation 3rd Gen Core processor Graphics Controller|13
HD Graphics 4400|12
HD Graphics 5500|12
HD Graphics|12
HD Graphics|12
Corporation HD Graphics 500|12
HD Graphics 500|12
3rd Gen Core processor Graphics Controller|12
HD Graphics|11
Corporation Atom/Celeron/Pentium Processor x5-E8000/J3xxx/N3xxx Series PCI Configuration Registers|11
Corporation 2nd Gen Core Processor Family Integrated Graphics Controller|11
HD Graphics 510|11
HD Graphics 4600 (PHDGD Skylake v2.9)|9
Corporation Atom Processor Z36xxx/Z37xxx Series Graphics & Display|8
Corporation Atom Processor Z36xxx/Z37xxx Series Graphics & Display|8
Mesa DRI Intel(R) Bay Trail|8
UHD Graphics, Gen12 LP ReleaseInternal|5
Corporation D3D12 (Intel(R) UHD Graphics 630)|3
HD Graphics 3000|2
(PE64) Intel(R) 4th Generation Haswell HD Graphics Family|-1
4 Series Internal Chipset|-1
7 Series/C216 Chipset Family MEI Controller #1|-1
B43 Express Chipset|-1
CometLake-S GT2 [UHD Graphics 630]|-1
HD Graphics 5500|-1
HD Graphics 620|-1
G35 Express Chipset Family|-1
G41 Express Chipset|-1
G45/G43 Express Chipset|-1
Graphics Media Accelerator HD|-1
HD Graphics (PHDGD Omega 5.0)|-1
HD Graphics 4400|-1
HD Graphics P3000|-1
HD Graphics P3000 (PHDGD Omega 5.0)|-1
IncrediblE HD Graphics 3000|-1
Iris Pro Graphics 5200|-1
Mesa DRI Intel(R) HD Graphics (CHV)|-1
Mesa DRI Intel(R) Ivybridge Mobile|-1
Mobile Intel(R) 4 Series Express Chipset Family|-1
Mobile Intel(R) 965 Express Chipset Family|-1
Mobile Intel(R) HD Graphics|-1
PHDGD Quantic C3|-1
Q45/Q43 Express Chipset|-1
Radeong 0.4 on AMD CAPE VERDE (DRM 2.43.0, LLVM 3.7.0)|-1
Radeong 0.4 on AMD CAPE VERDE (DRM 3.9.0 / 4.9.0-rc1+, LLVM 4.0.0)|-1
Radeong 0.4 on AMD FIJI (DRM 3.2.0 / 4.7.0-rc5+, LLVM 4.0.0)|-1
UHD Graphics, Gen12 LP ReleaseInternal|-1`;function n(){return i}},855436:function(e,t,r){"use strict";var i=r(101199),n=r(611778),a=r(900121),s=r(732905),o=r(771765),c=r(970425),l=r(760596),p=r.n(l),u=i.createContext(),h={initialChunks:{}},d="PENDING",f="REJECTED",m=function(e){return e};function g(e){var t=e.defaultResolveComponent,r=void 0===t?m:t,l=e.render,g=e.onLoad;function G(e,t){void 0===t&&(t={});var m,G,D="function"==typeof(m=e)?{requireAsync:m,resolve:function(){},chunkName:function(){}}:m,v={};function H(e){return t.cacheKey?t.cacheKey(e):D.resolve?D.resolve(e):"static"}function y(e,i,n){var a=t.resolveComponent?t.resolveComponent(e,i):r(e);if(t.resolveComponent&&!(0,c.isValidElementType)(a))throw Error("resolveComponent returned something that is not a React component!");return p()(n,a,{preload:!0}),a}var b=(G=function(e){function r(r){var i;if((i=e.call(this,r)||this).state={result:null,error:null,loading:!0,cacheKey:H(r)},!function(e,t){if(!e){var r=Error("loadable: "+t);throw r.framesToPop=1,r.name="Invariant Violation",r}}(!r.__chunkExtractor||D.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),r.__chunkExtractor)return!1===t.ssr?(0,s.Z)(i):(D.requireAsync(r).catch(function(){return null}),i.loadSync(),r.__chunkExtractor.addChunk(D.chunkName(r)),(0,s.Z)(i));return!1!==t.ssr&&(D.isReady&&D.isReady(r)||D.chunkName&&h.initialChunks[D.chunkName(r)])&&i.loadSync(),i}(0,o.Z)(r,e),r.getDerivedStateFromProps=function(e,t){var r=H(e);return(0,a.Z)({},t,{cacheKey:r,loading:t.loading||t.cacheKey!==r})};var i=r.prototype;return i.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===f&&this.setCache(),this.state.loading&&this.loadAsync()},i.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&this.loadAsync()},i.componentWillUnmount=function(){this.mounted=!1},i.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},i.getCacheKey=function(){return H(this.props)},i.getCache=function(){return v[this.getCacheKey()]},i.setCache=function(e){void 0===e&&(e=void 0),v[this.getCacheKey()]=e},i.triggerOnLoad=function(){var e=this;g&&setTimeout(function(){g(e.state.result,e.props)})},i.loadSync=function(){if(this.state.loading)try{var e=D.requireSync(this.props),t=y(e,this.props,x);this.state.result=t,this.state.loading=!1}catch(e){this.state.error=e}},i.loadAsync=function(){var e=this,t=this.resolveAsync();return t.then(function(t){var r=y(t,e.props,{Loadable:x});e.safeSetState({result:r,loading:!1},function(){return e.triggerOnLoad()})}).catch(function(t){return e.safeSetState({error:t,loading:!1})}),t},i.resolveAsync=function(){var e=this.props,t=(e.__chunkExtractor,e.forwardedRef,(0,n.Z)(e,["__chunkExtractor","forwardedRef"])),r=this.getCache();return!r&&((r=D.requireAsync(t)).status=d,this.setCache(r),r.then(function(){r.status="RESOLVED"},function(e){r.status=f})),r},i.render=function(){var e=this.props,r=e.forwardedRef,i=e.fallback,s=(e.__chunkExtractor,(0,n.Z)(e,["forwardedRef","fallback","__chunkExtractor"])),o=this.state,c=o.error,p=o.loading,u=o.result;if(t.suspense&&(this.getCache()||this.loadAsync()).status===d)throw this.loadAsync();if(c)throw c;var h=i||t.fallback||null;return p?h:l({fallback:h,result:u,options:t,props:(0,a.Z)({},s,{ref:r})})},r}(i.Component),function(e){return i.createElement(u.Consumer,null,function(t){return i.createElement(G,Object.assign({__chunkExtractor:t},e))})}),x=i.forwardRef(function(e,t){return i.createElement(b,Object.assign({forwardedRef:t},e))});return x.preload=function(e){D.requireAsync(e)},x.load=function(e){return D.requireAsync(e)},x}return{loadable:G,lazy:function(e,t){return G(e,(0,a.Z)({},t,{suspense:!0}))}}}var G=g({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,r=e.props;return i.createElement(t,r)}}),D=G.loadable,v=G.lazy,H=g({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,r=e.props;return r.children?r.children(t):null}}),y=H.loadable,b=H.lazy;D.lib=y;v.lib=b,t.ZP=D},763731:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var i=r(726588),n=r(144256),a=r(462796),s=r(557094),o=r(588736);function c(e,t){(0,n.Z)(1,arguments);var r,c,l,p,u,h,d,f,m=(0,i.Z)(e),g=m.getUTCFullYear(),G=(0,o.j)(),D=(0,s.Z)(null!==(r=null!==(c=null!==(l=null!==(p=null==t?void 0:t.firstWeekContainsDate)&&void 0!==p?p:null==t?void 0:null===(u=t.locale)||void 0===u?void 0:null===(h=u.options)||void 0===h?void 0:h.firstWeekContainsDate)&&void 0!==l?l:G.firstWeekContainsDate)&&void 0!==c?c:null===(d=G.locale)||void 0===d?void 0:null===(f=d.options)||void 0===f?void 0:f.firstWeekContainsDate)&&void 0!==r?r:1);if(!(D>=1&&D<=7))throw RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var v=new Date(0);v.setUTCFullYear(g+1,0,D),v.setUTCHours(0,0,0,0);var H=(0,a.Z)(v,t),y=new Date(0);y.setUTCFullYear(g,0,D),y.setUTCHours(0,0,0,0);var b=(0,a.Z)(y,t);return m.getTime()>=H.getTime()?g+1:m.getTime()>=b.getTime()?g:g-1}},262669:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var i=r(726588),n=r(144256);function a(e,t){(0,n.Z)(2,arguments);var r=(0,i.Z)(e),a=(0,i.Z)(t);return r.getFullYear()-a.getFullYear()}},366535:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var i=r(588736),n=r(726588),a=r(557094),s=r(144256);function o(e,t){(0,s.Z)(1,arguments);var r,o,c,l,p,u,h,d,f=(0,i.j)(),m=(0,a.Z)(null!==(r=null!==(o=null!==(c=null!==(l=null==t?void 0:t.weekStartsOn)&&void 0!==l?l:null==t?void 0:null===(p=t.locale)||void 0===p?void 0:null===(u=p.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==c?c:f.weekStartsOn)&&void 0!==o?o:null===(h=f.locale)||void 0===h?void 0:null===(d=h.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==r?r:0);if(!(m>=0&&m<=6))throw RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=(0,n.Z)(e),G=g.getDay();return g.setDate(g.getDate()+((G<m?-7:0)+6-(G-m))),g.setHours(23,59,59,999),g}},634233:function(e,t,r){"use strict";var i=r(58136)();e.exports=function(e){return e!==i&&null!==e}},821154:function(e){e.exports=function(e,t){for(var r=-1,i=null==e?0:e.length,n=Array(i);++r<i;)n[r]=t(e[r],r,e);return n}},469616:function(e,t,r){var i=r(584897),n=r(725557),a=Object.prototype.hasOwnProperty;e.exports=function(e,t,r){var s=e[t];(!(a.call(e,t)&&n(s,r))||void 0===r&&!(t in e))&&i(e,t,r)}},146004:function(e,t,r){var i=r(996480);e.exports=function(e){return function(t){return i(t,e)}}},706833:function(e,t,r){var i=r(518869),n=function(){try{var e=i(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();e.exports=n},605782:function(e,t,r){var i=r(488706),n=r(749148),a=r(431356),s=r(412818),o=r(331085),c=r(746170);e.exports=function(e,t,r){t=i(t,e);for(var l=-1,p=t.length,u=!1;++l<p;){var h=c(t[l]);if(!(u=null!=e&&r(e,h)))break;e=e[h]}return u||++l!=p?u:!!(p=null==e?0:e.length)&&o(p)&&s(h,p)&&(a(e)||n(e))}},658462:function(e){e.exports=function(e){return function(){return e}}},778457:function(e,t,r){var i=r(292943),n=r(757825),a=r(417517),s=a&&a.isTypedArray,o=s?n(s):i;e.exports=o},285406:function(e,t,r){var i=r(821154),n=r(710603),a=r(703278),s=r(488706),o=r(222121),c=r(102716),l=r(607480),p=r(69225),u=l(function(e,t){var r={};if(null==e)return r;var l=!1;t=i(t,function(t){return t=s(t,e),l||(l=t.length>1),t}),o(e,p(e),r),l&&(r=n(r,7,c));for(var u=t.length;u--;)a(r,t[u]);return r});e.exports=u},110241:function(e,t,r){var i=r(557650),n=r(701821),a=r(745627),s=r(404152);e.exports=function(e,t,r){e=s(e);var o=(t=a(t))?n(e):0;return t&&o<t?i(t-o,r)+e:e}},423815:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var i={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=n?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(i,a,s):i[a]=e[a]}return i.default=e,r&&r.set(e,i),i}(r(101199)),n=p(r(622689)),a=p(r(890710)),s=r(912476),o=r(880718),c=r(419084),l=p(r(65573));function p(e){return e&&e.__esModule?e:{default:e}}function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}function h(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let d={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},f=d.mouse;class m extends i.Component{constructor(){super(...arguments),h(this,"dragging",!1),h(this,"lastX",NaN),h(this,"lastY",NaN),h(this,"touchIdentifier",null),h(this,"mounted",!1),h(this,"handleDragStart",e=>{if(this.props.onMouseDown(e),!this.props.allowAnyClick&&"number"==typeof e.button&&0!==e.button)return!1;let t=this.findDOMNode();if(!t||!t.ownerDocument||!t.ownerDocument.body)throw Error("<DraggableCore> not mounted on DragStart!");let{ownerDocument:r}=t;if(this.props.disabled||!(e.target instanceof r.defaultView.Node)||this.props.handle&&!(0,s.matchesSelectorAndParentsTo)(e.target,this.props.handle,t)||this.props.cancel&&(0,s.matchesSelectorAndParentsTo)(e.target,this.props.cancel,t))return;"touchstart"===e.type&&e.preventDefault();let i=(0,s.getTouchIdentifier)(e);this.touchIdentifier=i;let n=(0,o.getControlPosition)(e,i,this);if(null==n)return;let{x:a,y:c}=n,p=(0,o.createCoreData)(this,a,c);(0,l.default)("DraggableCore: handleDragStart: %j",p),(0,l.default)("calling",this.props.onStart),!1!==this.props.onStart(e,p)&&!1!==this.mounted&&(this.props.enableUserSelectHack&&(0,s.addUserSelectStyles)(r),this.dragging=!0,this.lastX=a,this.lastY=c,(0,s.addEvent)(r,f.move,this.handleDrag),(0,s.addEvent)(r,f.stop,this.handleDragStop))}),h(this,"handleDrag",e=>{let t=(0,o.getControlPosition)(e,this.touchIdentifier,this);if(null==t)return;let{x:r,y:i}=t;if(Array.isArray(this.props.grid)){let e=r-this.lastX,t=i-this.lastY;if([e,t]=(0,o.snapToGrid)(this.props.grid,e,t),!e&&!t)return;r=this.lastX+e,i=this.lastY+t}let n=(0,o.createCoreData)(this,r,i);if((0,l.default)("DraggableCore: handleDrag: %j",n),!1===this.props.onDrag(e,n)||!1===this.mounted){try{this.handleDragStop(new MouseEvent("mouseup"))}catch(t){let e=document.createEvent("MouseEvents");e.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),this.handleDragStop(e)}return}this.lastX=r,this.lastY=i}),h(this,"handleDragStop",e=>{if(!this.dragging)return;let t=(0,o.getControlPosition)(e,this.touchIdentifier,this);if(null==t)return;let{x:r,y:i}=t;if(Array.isArray(this.props.grid)){let e=r-this.lastX||0,t=i-this.lastY||0;[e,t]=(0,o.snapToGrid)(this.props.grid,e,t),r=this.lastX+e,i=this.lastY+t}let n=(0,o.createCoreData)(this,r,i);if(!1===this.props.onStop(e,n)||!1===this.mounted)return!1;let a=this.findDOMNode();a&&this.props.enableUserSelectHack&&(0,s.removeUserSelectStyles)(a.ownerDocument),(0,l.default)("DraggableCore: handleDragStop: %j",n),this.dragging=!1,this.lastX=NaN,this.lastY=NaN,a&&((0,l.default)("DraggableCore: Removing handlers"),(0,s.removeEvent)(a.ownerDocument,f.move,this.handleDrag),(0,s.removeEvent)(a.ownerDocument,f.stop,this.handleDragStop))}),h(this,"onMouseDown",e=>(f=d.mouse,this.handleDragStart(e))),h(this,"onMouseUp",e=>(f=d.mouse,this.handleDragStop(e))),h(this,"onTouchStart",e=>(f=d.touch,this.handleDragStart(e))),h(this,"onTouchEnd",e=>(f=d.touch,this.handleDragStop(e)))}componentDidMount(){this.mounted=!0;let e=this.findDOMNode();e&&(0,s.addEvent)(e,d.touch.start,this.onTouchStart,{passive:!1})}componentWillUnmount(){this.mounted=!1;let e=this.findDOMNode();if(e){let{ownerDocument:t}=e;(0,s.removeEvent)(t,d.mouse.move,this.handleDrag),(0,s.removeEvent)(t,d.touch.move,this.handleDrag),(0,s.removeEvent)(t,d.mouse.stop,this.handleDragStop),(0,s.removeEvent)(t,d.touch.stop,this.handleDragStop),(0,s.removeEvent)(e,d.touch.start,this.onTouchStart,{passive:!1}),this.props.enableUserSelectHack&&(0,s.removeUserSelectStyles)(t)}}findDOMNode(){var e,t;return null!==(e=this.props)&&void 0!==e&&e.nodeRef?null===(t=this.props)||void 0===t||null===(t=t.nodeRef)||void 0===t?void 0:t.current:a.default.findDOMNode(this)}render(){return i.cloneElement(i.Children.only(this.props.children),{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}t.default=m,h(m,"displayName","DraggableCore"),h(m,"propTypes",{allowAnyClick:n.default.bool,children:n.default.node.isRequired,disabled:n.default.bool,enableUserSelectHack:n.default.bool,offsetParent:function(e,t){if(e[t]&&1!==e[t].nodeType)throw Error("Draggable's offsetParent must be a DOM Node.")},grid:n.default.arrayOf(n.default.number),handle:n.default.string,cancel:n.default.string,nodeRef:n.default.object,onStart:n.default.func,onDrag:n.default.func,onStop:n.default.func,onMouseDown:n.default.func,scale:n.default.number,className:c.dontSetMe,style:c.dontSetMe,transform:c.dontSetMe}),h(m,"defaultProps",{allowAnyClick:!1,disabled:!1,enableUserSelectHack:!0,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1})},862656:function(e,t,r){"use strict";e.exports=function(){throw Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable")},e.exports.Resizable=r(805137).default,e.exports.ResizableBox=r(636620).default},810174:function(e){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)},870236:function(e,t,r){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ErrorTypes=t.ERROR_TYPE_MAP=void 0;var n,a,s,o=l(r(537731)),c=l(r(68146));function l(e){return e&&e.__esModule?e:{default:e}}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,function(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==i(n))return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===i(t)?t:String(t)}(n.key),n)}}t.ERROR_TYPE_MAP={1:"network",2:"network",3:"decoder",4:"format"};t.ErrorTypes={network:{code:1},mse:{code:2},parse:{code:3},format:{code:4},decoder:{code:5},runtime:{code:6},timeout:{code:7},other:{code:8}};var u=(n=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{errorType:"",errorCode:0,errorMessage:"",originError:"",ext:{},mediaError:null,src:null};!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,e);var i=t&&t.i18n?t.i18n.ERROR_TYPES:null;if(null!=t&&t.video){var n=r.mediaError?r.mediaError:t.video.error||{},a=t.duration,s=t.currentTime,l=t.ended,p=t.src,u=t.currentSrc,h=t.video,d=h.readyState,f=h.networkState,m={playerVersion:o.default,domain:document.domain,currentTime:s,duration:a,ended:l,readyState:d,networkState:f,src:r.src||p||u,errorType:r.errorType,errorCode:r.errorCode||n.code,message:r.errorMessage||n.message,mediaError:n,originError:r.originError?r.originError.stack:"",host:c.default.getHostFromUrl(p||u)};return r.ext&&Object.keys(r.ext).map(function(e){m[e]=r.ext[e]}),m}if(arguments.length>1){for(var g={playerVersion:o.default,domain:document.domain},G=["errorType","currentTime","duration","networkState","readyState","src","currentSrc","ended","errd","errorCode","mediaError"],D=0;D<arguments.length;D++)g[G[D]]=arguments[D];return g.ex=i?(i[arguments[0]]||{}).msg:"",g}},Object.defineProperty(n,"prototype",{writable:!1}),n);t.default=u},68146:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkIsCurrentVideo=function(e,t,r){if(!!e){var i=e.getAttribute(r);return!!i&&i===t&&("VIDEO"===e.tagName||"AUDIO"===e.tagName)||!1}},t.debounce=p,t.default=void 0,t.getLang=function(){var e=(document.documentElement.getAttribute("lang")||navigator.language||"zh-cn").toLocaleLowerCase();return"zh-cn"===e&&(e="zh"),e},t.throttle=function(e,t,r){var i=!0,n=!0;if("function"!=typeof e)throw TypeError("Expected a function");return l(r)&&(i="leading"in r?!!r.leading:i,n="trailing"in r?!!r.trailing:n),p(e,t,{leading:i,trailing:n,maxWait:t})};var i=a(r(191071)),n=a(r(71012));function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=Array(t);r<t;r++)i[r]=e[r];return i}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c={};t.default=c,c.createDom=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",n=document.createElement(e);return n.className=i,n.innerHTML=t,Object.keys(r).forEach(function(t){var i=r[t];"video"===e||"audio"===e||"live-video"===e?i&&n.setAttribute(t,i):n.setAttribute(t,i)}),n},c.createDomFromHtml=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";try{var n=document.createElement("div");n.innerHTML=e;var a=n.children;if(n=null,a.length>0)return a=a[0],r&&c.addClass(a,r),t&&Object.keys(t).forEach(function(e){a.setAttribute(e,t[e])}),a;return null}catch(e){return i.default.logError("util.createDomFromHtml",e),null}},c.hasClass=function(e,t){if(!e||!t)return!1;try{return Array.prototype.some.call(e.classList,function(e){return e===t})}catch(i){var r=e.className&&"object"===o(e.className)?e.getAttribute("class"):e.className;return r&&!!r.match(RegExp("(\\s|^)"+t+"(\\s|$)"))}},c.addClass=function(e,t){if(!!e&&!!t)try{t.replace(/(^\s+|\s+$)/g,"").split(/\s+/g).forEach(function(t){t&&e.classList.add(t)})}catch(r){!c.hasClass(e,t)&&(e.className&&"object"===o(e.className)?e.setAttribute("class",e.getAttribute("class")+" "+t):e.className+=" "+t)}},c.removeClass=function(e,t){if(!!e&&!!t)try{t.replace(/(^\s+|\s+$)/g,"").split(/\s+/g).forEach(function(t){t&&e.classList.remove(t)})}catch(r){c.hasClass(e,t)&&t.split(/\s+/g).forEach(function(t){var r=RegExp("(\\s|^)"+t+"(\\s|$)");e.className&&"object"===o(e.className)?e.setAttribute("class",e.getAttribute("class").replace(r," ")):e.className=e.className.replace(r," ")})}},c.toggleClass=function(e,t){if(!!e)t.split(/\s+/g).forEach(function(t){c.hasClass(e,t)?c.removeClass(e,t):c.addClass(e,t)})},c.classNames=function(){for(var e=arguments,t=[],r=function(r){"String"===c.typeOf(e[r])?t.push(e[r]):"Object"===c.typeOf(e[r])&&Object.keys(e[r]).map(function(i){e[r][i]&&t.push(i)})},i=0;i<arguments.length;i++)r(i);return t.join(" ")},c.findDom=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,r=arguments.length>1?arguments[1]:void 0;try{e=t.querySelector(r)}catch(n){i.default.logError("util.findDom",n),0===r.indexOf("#")&&(e=t.getElementById(r.slice(1)))}return e},c.getCss=function(e,t){return e.currentStyle?e.currentStyle[t]:document.defaultView.getComputedStyle(e,!1)[t]},c.padStart=function(e,t,r){for(var i=String(r),n=t>>0,a=Math.ceil(n/i.length),s=[],o=String(e);a--;)s.push(i);return s.join("").substring(0,n-o.length)+o},c.format=function(e){if(window.isNaN(e))return"";e=Math.round(e);var t=c.padStart(Math.floor(e/3600),2,0),r=c.padStart(Math.floor((e-3600*t)/60),2,0),i=c.padStart(Math.floor(e-3600*t-60*r),2,0);return("00"===t?[r,i]:[t,r,i]).join(":")},c.event=function(e){if(e.touches){var t=e.touches[0]||e.changedTouches[0];e.clientX=t.clientX||0,e.clientY=t.clientY||0,e.offsetX=t.pageX-t.target.offsetLeft,e.offsetY=t.pageY-t.target.offsetTop}e._target=e.target||e.srcElement},c.typeOf=function(e){return Object.prototype.toString.call(e).match(/([^\s.*]+)(?=]$)/g)[0]},c.deepCopy=function(e,t){if("Object"===c.typeOf(t)&&"Object"===c.typeOf(e))return Object.keys(t).forEach(function(r){"Object"!==c.typeOf(t[r])||t[r]instanceof Node?"Array"===c.typeOf(t[r])?e[r]="Array"===c.typeOf(e[r])?e[r].concat(t[r]):t[r]:e[r]=t[r]:void 0===e[r]||void 0===e[r]?e[r]=t[r]:c.deepCopy(e[r],t[r])}),e},c.deepMerge=function(e,t){return Object.keys(t).map(function(r){if("Array"===c.typeOf(t[r])&&"Array"===c.typeOf(e[r])){if("Array"===c.typeOf(e[r])){var i,n;(i=e[r]).push.apply(i,function(e){if(Array.isArray(e))return s(e)}(n=t[r])||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}}(n)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}}else c.typeOf(e[r])!==c.typeOf(t[r])||null===e[r]||"Object"!==c.typeOf(e[r])||t[r]instanceof window.Node?null!==t[r]&&(e[r]=t[r]):c.deepMerge(e[r],t[r])}),e},c.getBgImage=function(e){var t=(e.currentStyle||window.getComputedStyle(e,null)).backgroundImage;if(!t||"none"===t)return"";var r=document.createElement("a");return r.href=t.replace(/url\("|"\)/g,""),r.href},c.copyDom=function(e){if(!e||1!==e.nodeType)return"";var t=document.createElement(e.tagName);return Array.prototype.forEach.call(e.attributes,function(e){t.setAttribute(e.name,e.value)}),e.innerHTML&&(t.innerHTML=e.innerHTML),t},c.setInterval=function(e,t,r,i){!e._interval[t]&&(e._interval[t]=window.setInterval(r.bind(e),i))},c.clearInterval=function(e,t){clearInterval(e._interval[t]),e._interval[t]=null},c.setTimeout=function(e,t,r){!e._timers&&(e._timers=[]);var i=setTimeout(function(){t(),c.clearTimeout(e,i)},r);return e._timers.push(i),i},c.clearTimeout=function(e,t){var r=e._timers;if("Array"===c.typeOf(r)){for(var i=0;i<r.length;i++)if(r[i]===t){r.splice(i,1),clearTimeout(t);break}}else clearTimeout(t)},c.clearAllTimers=function(e){var t=e._timers;"Array"===c.typeOf(t)&&(t.map(function(e){clearTimeout(e)}),e._timerIds=[])},c.createImgBtn=function(e,t,r,i){var n,a,s,o=c.createDom("xg-".concat(e),"",{},"xgplayer-".concat(e,"-img"));return o.style.backgroundImage='url("'.concat(t,'")'),r&&i&&(["px","rem","em","pt","dp","vw","vh","vm","%"].every(function(e){return!(r.indexOf(e)>-1&&i.indexOf(e)>-1)||(n=parseFloat(r.slice(0,r.indexOf(e)).trim()),a=parseFloat(i.slice(0,i.indexOf(e)).trim()),s=e,!1)}),o.style.width="".concat(n).concat(s),o.style.height="".concat(a).concat(s),o.style.backgroundSize="".concat(n).concat(s," ").concat(a).concat(s),"start"===e?o.style.margin="-".concat(a/2).concat(s," auto auto -").concat(n/2).concat(s):o.style.margin="auto 5px auto 5px"),o},c.Hex2RGBA=function(e,t){var r=[];if(/^\#[0-9A-F]{3}$/i.test(e)){var i="#";e.replace(/[0-9A-F]/ig,function(e){i+=e+e}),e=i}return/^#[0-9A-F]{6}$/i.test(e)?(e.replace(/[0-9A-F]{2}/ig,function(e){r.push(parseInt(e,16))}),"rgba(".concat(r.join(","),", ").concat(t,")")):"rgba(255, 255, 255, 0.1)"},c.getFullScreenEl=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement},c.checkIsFunction=function(e){return e&&"function"==typeof e},c.checkIsObject=function(e){return null!==e&&"object"===o(e)},c.hide=function(e){e.style.display="none"},c.show=function(e,t){e.style.display=t||"block"},c.isUndefined=function(e){if(null==e)return!0},c.setStyleFromCsstext=function(e,t){if(!!t)"String"===c.typeOf(t)?t.replace(/\s+/g,"").split(";").map(function(t){if(t){var r=t.split(":");r.length>1&&(e.style[r[0]]=r[1])}}):Object.keys(t).map(function(r){e.style[r]=t[r]})};function l(e){var t=o(e);return null!==e&&("object"===t||"function"===t)}function p(e,t,r){var i,n,a,s,o,c,p=0,u=!1,h=!1,d=!0,f=!t&&0!==t&&"function"==typeof window.requestAnimationFrame;if("function"!=typeof e)throw TypeError("Expected a function");function m(t){var r=i,a=n;return i=n=void 0,p=t,s=e.apply(a,r)}function g(e,t){return f?(window.cancelAnimationFrame(o),window.requestAnimationFrame(e)):setTimeout(e,t)}t=+t||0,l(r)&&(u=!!r.leading,a=(h="maxWait"in r)?Math.max(+r.maxWait||0,t):a,d="trailing"in r?!!r.trailing:d);function G(e){var r=e-c,i=e-p;return void 0===c||r>=t||r<0||h&&i>=a}function D(){var e,r,i,n,s=Date.now();if(G(s))return v(s);o=g(D,(r=(e=s)-c,i=e-p,n=t-r,h?Math.min(n,a-i):n))}function v(e){return(o=void 0,d&&i)?m(e):(i=n=void 0,s)}function H(){for(var e,r=Date.now(),a=G(r),l=arguments.length,d=Array(l),f=0;f<l;f++)d[f]=arguments[f];if(i=d,n=this,c=r,a){if(void 0===o){;return p=e=c,o=g(D,t),u?m(e):s}if(h)return o=g(D,t),m(c)}return void 0===o&&(o=g(D,t)),s}return H.cancel=function(){void 0!==o&&!function(e){if(f)return window.cancelAnimationFrame(e);clearTimeout(e)}(o),p=0,i=c=n=o=void 0},H.flush=function(){return void 0===o?s:v(Date.now())},H.pending=function(){return void 0!==o},H}c.filterStyleFromText=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["width","height","top","left","bottom","right","position","z-index","padding","margin","transform"],r=e.style.cssText;if(!r)return{};var i=r.replace(/\s+/g,"").split(";"),n={},a={};return i.map(function(e){if(e){var r=e.split(":");r.length>1&&(function(e,t){for(var r=0,i=t.length;r<i;r++)if(e.indexOf(t[r])>-1)return!0;return!1}(r[0],t)?n[r[0]]=r[1]:a[r[0]]=r[1])}}),e.setAttribute("style",""),Object.keys(a).map(function(t){e.style[t]=a[t]}),n},c.getStyleFromCsstext=function(e){var t=e.style.cssText;if(!t)return{};var r=t.replace(/\s+/g,"").split(";"),i={};return r.map(function(e){if(e){var t=e.split(":");t.length>1&&(i[t[0]]=t[1])}}),i},c.preloadImg=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(!!e){var i=new window.Image;i.onload=function(e){i=null,t&&t(e)},i.onerror=function(e){i=null,r&&r(e)},i.src=e}},c.stopPropagation=function(e){e&&(e.stopPropagation(),e.cancelable&&e.preventDefault())},c.scrollTop=function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},c.scrollLeft=function(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0},c.checkTouchSupport=function(){return"ontouchstart"in window},c.getBuffered2=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5,r=[],i=0;i<e.length;i++)r.push({start:.5>e.start(i)?0:e.start(i),end:e.end(i)});r.sort(function(e,t){var r=e.start-t.start;return r?r:t.end-e.end});var a=[];if(t)for(var s=0;s<r.length;s++){var o=a.length;if(o){var c=a[o-1].end;r[s].start-c<t?r[s].end>c&&(a[o-1].end=r[s].end):a.push(r[s])}else a.push(r[s])}else a=r;return new n.default(a)},c.getBufferByCurrentTime=function(e,t){var r={start:0,end:0,include:0,diff:0,cur:t};if(!e||e.length<1)return r;for(var i=-1,n=-1,a=parseInt(1e3*t,10),s=e.length-1;s>-1;s--){var o=parseInt(1e3*e.start(s),10),c=parseInt(1e3*e.end(s),10);if(a>=o&&a<=c){r.include=1,r.start=o/1e3,r.end=c/1e3,r.diff=(c-a)/1e3;break}a<o&&(i<0||o-a<i)?(i=(o-a)/1e3,n=s):a>c&&(i<0||a-c<i)&&(i=(a-c)/1e3,n=s)}return 1!==r.include&&(n<0&&(n=e.length-1),r.start=parseInt(1e3*e.start(n),10)/1e3,r.end=parseInt(1e3*e.end(n),10)/1e3,r.diff=(parseInt(1e3*r.end,10)-a)/1e3),r},c.getEventPos=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return e.touches&&e.touches.length>0&&(e=e.touches[0]),{x:e.x/t,y:e.y/t,clientX:e.clientX/t,clientY:e.clientY/t,offsetX:e.offsetX/t,offsetY:e.offsetY/t,pageX:e.pageX/t,pageY:e.pageY/t}},c.requestAnimationFrame=function(e){var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(t)return t(e)},c.getHostFromUrl=function(e){if("String"!==c.typeOf(e))return"";var t=e.split("/"),r="";return t.length>3&&t[2]&&(r=t[2]),r},c.cancelAnimationFrame=function(e){var t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.cancelRequestAnimationFrame;t&&t(e)},c.isMSE=function(e){return e.media&&(e=e.media),!!(e&&e instanceof HTMLMediaElement)&&(/^blob/.test(e.currentSrc)||/^blob/.test(e.src))},c.isBlob=function(e){return"string"==typeof e&&/^blob/.test(e)},c.generateSessionId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=new Date().getTime();try{e=parseInt(e)}catch(t){e=0}return t+=e,window.performance&&"function"==typeof window.performance.now&&(t+=parseInt(window.performance.now())),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?r:3&r|8).toString(16)})},c.adjustTimeByDuration=function(e,t,r){return t&&e?e>t||r&&e<t?t:e:e},c.getTransformStyle=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0,scale:1,rotate:0},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r={scale:"".concat(e.scale||1),translate:"".concat(e.x||0,"%, ").concat(e.y||0,"%"),rotate:"".concat(e.rotate||0,"deg")};return Object.keys(r).forEach(function(e){var i=RegExp("".concat(e,"\\([^\\(]+\\)"),"g"),n="".concat(e,"(").concat(r[e],")");i.test(t)?(i.lastIndex=-1,t=t.replace(i,n)):t+="".concat(n," ")}),t},c.convertDeg=function(e){return 1>=Math.abs(e)?360*e:e%360}},83186:function(e,t,r){"use strict";r.r(t)},850607:function(e,t,r){"use strict";r.r(t)},547050:function(e,t,r){"use strict";r.r(t)},617906:function(e,t,r){"use strict";r.r(t)},225511:function(e,t,r){"use strict";r.r(t)},834108:function(e,t,r){"use strict";r.r(t)},910461:function(e,t,r){"use strict";r.r(t)},953806:function(e){e.exports={quot:'"',amp:"&",apos:"'",lt:"<",gt:">",nbsp:"\xa0",iexcl:"\xa1",cent:"\xa2",pound:"\xa3",curren:"\xa4",yen:"\xa5",brvbar:"\xa6",sect:"\xa7",uml:"\xa8",copy:"\xa9",ordf:"\xaa",laquo:"\xab",not:"\xac",shy:"\xad",reg:"\xae",macr:"\xaf",deg:"\xb0",plusmn:"\xb1",sup2:"\xb2",sup3:"\xb3",acute:"\xb4",micro:"\xb5",para:"\xb6",middot:"\xb7",cedil:"\xb8",sup1:"\xb9",ordm:"\xba",raquo:"\xbb",frac14:"\xbc",frac12:"\xbd",frac34:"\xbe",iquest:"\xbf",Agrave:"\xc0",Aacute:"\xc1",Acirc:"\xc2",Atilde:"\xc3",Auml:"\xc4",Aring:"\xc5",AElig:"\xc6",Ccedil:"\xc7",Egrave:"\xc8",Eacute:"\xc9",Ecirc:"\xca",Euml:"\xcb",Igrave:"\xcc",Iacute:"\xcd",Icirc:"\xce",Iuml:"\xcf",ETH:"\xd0",Ntilde:"\xd1",Ograve:"\xd2",Oacute:"\xd3",Ocirc:"\xd4",Otilde:"\xd5",Ouml:"\xd6",times:"\xd7",Oslash:"\xd8",Ugrave:"\xd9",Uacute:"\xda",Ucirc:"\xdb",Uuml:"\xdc",Yacute:"\xdd",THORN:"\xde",szlig:"\xdf",agrave:"\xe0",aacute:"\xe1",acirc:"\xe2",atilde:"\xe3",auml:"\xe4",aring:"\xe5",aelig:"\xe6",ccedil:"\xe7",egrave:"\xe8",eacute:"\xe9",ecirc:"\xea",euml:"\xeb",igrave:"\xec",iacute:"\xed",icirc:"\xee",iuml:"\xef",eth:"\xf0",ntilde:"\xf1",ograve:"\xf2",oacute:"\xf3",ocirc:"\xf4",otilde:"\xf5",ouml:"\xf6",divide:"\xf7",oslash:"\xf8",ugrave:"\xf9",uacute:"\xfa",ucirc:"\xfb",uuml:"\xfc",yacute:"\xfd",thorn:"\xfe",yuml:"\xff",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦"}},907071:function(e,t,r){"use strict";r(932651),r(490629),r(679308);var i=r(390063),n=r.n(i),a=r(101199),s=r(469935),o=r.n(s),c=r(622689),l=r.n(c),p=r(461693),u=r(227552),h=r(182811);r(636125);var d=r(786202),f=r(426337),m=r(619050),g=r(713243),G=r(610655),D=r(181150);let v=p.U.PREFIX;class H extends f.Z{get adapter(){var e=this;return Object.assign(Object.assign({},super.adapter),{notifyClick:function(){e.props.onClick(...arguments)},expandCollapsed:()=>this.setState({isCollapsed:!1})})}componentDidMount(){this.foundation.init()}componentWillUnmount(){this.foundation.destroy()}renderPopoverMore(e){let{separator:t}=this.props,r=a.createElement(a.Fragment,null,e.map((r,i)=>a.createElement(a.Fragment,{key:`restItem-${i}`},r,i!==e.length-1&&a.createElement("span",{className:`${v}-restItem`},t))));return a.createElement(m.Z,{content:r,style:{padding:12},showArrow:!0},a.createElement(D.Z,null))}render(){let e=this.renderList(),{compact:t,className:r,style:i,separator:n,showTooltip:s}=this.props,c=o()(r,{[`${v}-wrapper`]:!0,[`${v}-wrapper-compact`]:t,[`${v}-wrapper-loose`]:!t});return a.createElement(G.Z.Provider,{value:{onClick:this.onClick,showTooltip:s,compact:t,separator:n}},a.createElement("nav",Object.assign({"aria-label":this.props["aria-label"],className:c,style:i},this.getDataAttr(this.props)),e))}constructor(e){super(e),this.handleCollapse=(e,t)=>{let{maxItemCount:r,renderMore:i,moreType:s}=this.props,o=n()(i),c=e.slice(1,t-r+1),l=a.createElement("span",{className:`${v}-collapse`,key:`more-${t}`},a.createElement("span",{className:`${v}-item-wrap`},a.createElement("span",{role:"button",tabIndex:0,"aria-label":"Expand breadcrumb items",className:`${v}-item ${v}-item-more`,onClick:e=>this.foundation.handleExpand(e),onKeyPress:e=>this.foundation.handleExpandEnterPress(e)},o&&i(c),!o&&"default"===s&&a.createElement(D.Z,null),!o&&"popover"===s&&this.renderPopoverMore(c)),a.createElement("span",{className:`${v}-separator`,"x-semi-prop":"separator"},this.props.separator)));return e.splice(1,t-r,l),e},this.renderRouteItems=(e,t,r)=>{let{renderItem:i,renderMore:s,maxItemCount:o}=this.props,c=e.length-o,l=n()(s);return e.map((n,s)=>{let o=n._origin.key||`item-${n.name||n.path}-${s}`,p=s>0&&s<=c;return a.createElement(g.Z,Object.assign({},n,{key:o,active:void 0!==this.props.activeIndex?this.props.activeIndex===s:s===e.length-1,route:n._origin,shouldRenderSeparator:s!==e.length-1&&!(t&&(l||r)&&p)}),i?i(n._origin):n.name)})},this.renderList=()=>{let e;let{routes:t,children:r,autoCollapse:i,maxItemCount:s,renderMore:o,moreType:c}=this.props,{isCollapsed:l}=this.state,p=t&&t.length>0,u=p?this.foundation.genRoutes(t):a.Children.toArray(r),d=u.length,f=d-s,m=u&&i&&d>s&&l,g=n()(o),G="popover"===c;return(e=p?this.renderRouteItems(u,m,G):u.map((e,t)=>e?((0,h.Z)(e.type&&!e.type.isBreadcrumbItem,"[Semi Breadcrumb]: Only accepts Breadcrumb.Item as its children"),a.cloneElement(e,{key:`${t}-item`,active:void 0!==this.props.activeIndex?this.props.activeIndex===t:t===u.length-1,shouldRenderSeparator:t!==u.length-1&&!(m&&(g||G)&&t>0&&t<=f)})):e),m)?this.handleCollapse(e,u.length):e},this.onClick=(e,t)=>{this.foundation.handleClick(e,t)},this.foundation=new u.Z(this.adapter),this.state={isCollapsed:!0},this.onClick=this.onClick.bind(this)}}H.contextType=G.Z,H.Item=g.Z,H.propTypes={activeIndex:l().number,routes:l().array,onClick:l().func,separator:l().node,compact:l().bool,children:l().node,style:l().object,renderItem:l().func,showTooltip:l().oneOfType([l().shape({width:l().oneOfType([l().string,l().number]),ellipsisPos:l().oneOf(["end","middle"]),opts:l().object}),l().bool]),className:l().string,autoCollapse:l().bool,maxItemCount:l().number,renderMore:l().func,moreType:l().oneOf(p.j.MORE_TYPE),"aria-label":l().string},H.defaultProps={routes:[],onClick:d.Z,renderItem:void 0,separator:"/",compact:!0,showTooltip:{width:150,ellipsisPos:"end"},autoCollapse:!0,moreType:"default",maxItemCount:4,"aria-label":"Breadcrumb"},t.Z=H},871989:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}}),r(932651),r(706056);var i=r(285406),n=r.n(i),a=r(101199),s=r(469935),o=r.n(s),c=r(622689),l=r.n(c),p=r(101703);r(703205);var u=r(786202),h=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&0>t.indexOf(i)&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)0>t.indexOf(i[n])&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]]);return r};let d=p.j2.sizes,{htmlTypes:f,btnTypes:m}=p.j2;class g extends a.PureComponent{render(){let e=this.props,{children:t,block:r,htmlType:i,loading:s,circle:c,className:l,style:p,disabled:u,size:d,theme:f,type:m,prefixCls:g,iconPosition:G}=e,D=h(e,["children","block","htmlType","loading","circle","className","style","disabled","size","theme","type","prefixCls","iconPosition"]),v=Object.assign(Object.assign({disabled:u},n()(D,["x-semi-children-alias"])),{className:o()(g,{[`${g}-${m}`]:!u&&m,[`${g}-disabled`]:u,[`${g}-size-large`]:"large"===d,[`${g}-size-small`]:"small"===d,[`${g}-light`]:"light"===f,[`${g}-block`]:r,[`${g}-circle`]:c,[`${g}-borderless`]:"borderless"===f,[`${g}-outline`]:"outline"===f,[`${g}-${m}-disabled`]:u&&m},l),type:i,"aria-disabled":u}),H={};return!(l&&l.includes("-with-icon"))&&(H["x-semi-prop"]=this.props["x-semi-children-alias"]||"children"),a.createElement("button",Object.assign({},v,{onClick:this.props.onClick,onMouseDown:this.props.onMouseDown,style:p}),a.createElement("span",Object.assign({className:o()(`${g}-content`,this.props.contentClassName),onClick:e=>u&&e.stopPropagation()},H),t))}}g.defaultProps={disabled:!1,size:"default",type:"primary",theme:"light",block:!1,htmlType:"button",onMouseDown:u.Z,onClick:u.Z,onMouseEnter:u.Z,onMouseLeave:u.Z,prefixCls:p.UX.PREFIX},g.propTypes={children:l().node,disabled:l().bool,prefixCls:l().string,style:l().object,size:l().oneOf(d),type:l().oneOf(m),block:l().bool,onClick:l().func,onMouseDown:l().func,circle:l().bool,loading:l().bool,htmlType:l().oneOf(f),theme:l().oneOf(p.j2.themes),className:l().string,onMouseEnter:l().func,onMouseLeave:l().func,"aria-label":l().string,contentClassName:l().string}},906899:function(e,t,r){"use strict";var i=r(101199),n=r(622689),a=r.n(n),s=r(88204),o=r(469935),c=r.n(o),l=r(608104);let p=s.UX.PREFIX;class u extends i.PureComponent{render(){let{className:e,style:t,children:r}=this.props,{showTick:n}=this.context,a=c()({[`${p}-title`]:!0,[`${p}-title-withTick`]:n},e);return i.createElement("div",{className:a,style:t},r)}}u.propTypes={children:a().node,className:a().string,style:a().object},u.contextType=l.Z,t.Z=u},219311:function(e,t,r){"use strict";r.d(t,{g:function(){return h}}),r(932651),r(490629);var i=r(101199),n=r(469935),a=r.n(n),s=r(622689),o=r.n(s),c=r(141358);r(860276);var l=r(678503),p=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&0>t.indexOf(i)&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)0>t.indexOf(i[n])&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]]);return r};let u=["xxl","xl","lg","md","sm","xs"],h=i.createContext(null),d={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"};class f extends i.Component{componentDidMount(){this.unRegisters=Object.keys(d).map(e=>(0,l.ql)(d[e],{match:()=>{if("object"==typeof this.props.gutter)this.setState(t=>({screens:Object.assign(Object.assign({},t.screens),{[e]:!0})}))},unmatch:()=>{if("object"==typeof this.props.gutter)this.setState(t=>({screens:Object.assign(Object.assign({},t.screens),{[e]:!1})}))}}))}componentWillUnmount(){this.unRegisters.forEach(e=>e())}getGutter(){let{gutter:e=0}=this.props,t=[0,0];return(Array.isArray(e)?e.slice(0,2):[e,0]).forEach((e,r)=>{if("object"==typeof e)for(let i=0;i<u.length;i++){let n=u[i];if(this.state.screens[n]&&void 0!==e[n]){t[r]=e[n];break}}else t[r]=e||0}),t}render(){let e=this.props,{prefixCls:t,type:r,justify:n,align:s,className:o,style:c,children:l}=e,u=p(e,["prefixCls","type","justify","align","className","style","children"]),d=this.getGutter(),f=`${t}-row`,m=a()({[f]:"flex"!==r,[`${f}-${r}`]:r,[`${f}-${r}-${n}`]:r&&n,[`${f}-${r}-${s}`]:r&&s},o),g=Object.assign(Object.assign(Object.assign({},d[0]>0?{marginLeft:-(d[0]/2),marginRight:-(d[0]/2)}:{}),d[1]>0?{marginTop:-(d[1]/2),marginBottom:-(d[1]/2)}:{}),c),G=Object.assign({},u);return delete G.gutter,i.createElement(h.Provider,{value:{gutters:d}},i.createElement("div",Object.assign({},G,{className:m,style:g,"x-semi-prop":"children"}),l))}constructor(){super(...arguments),this.state={screens:{xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}},this.unRegisters=[]}}f.propTypes={type:o().oneOf(["flex"]),align:o().oneOf(["top","middle","bottom"]),justify:o().oneOf(["start","end","center","space-around","space-between"]),className:o().string,style:o().object,children:o().node,gutter:o().oneOfType([o().object,o().number,o().array]),prefixCls:o().string},f.defaultProps={prefixCls:c.U.PREFIX},f.RowContext={gutters:o().any},t.Z=f},555045:function(e,t,r){"use strict";r(85310);var i=r(136636);t.Z=i.Z},825005:function(e,t,r){"use strict";r.d(t,{Z:function(){return G}}),r(490629),r(706056),r(374954),r(932651);var i=r(72137),n=r.n(i),a=r(795233),s=r.n(a),o=r(876553),c=r.n(o),l=r(101199),p=r(469935),u=r.n(p),h=r(614096),d=r(278766),f=r(438136),m=r(451659),g=r(873827);function G(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{prefixCls:r=d.UX.PREFIX,filteredValue:i,filterIcon:a="filter",filterDropdownProps:o,onSelect:p,filterDropdownVisible:G,renderFilterDropdown:D,onFilterDropdownVisibleChange:v}=t,{filterDropdown:H=null}=t,y=void 0!==G,b=!y&&"function"==typeof D,[x,I]=(0,l.useState)(i),T=!b&&G,[C,w]=(0,l.useState)(T);(0,l.useEffect)(()=>{void 0!==G&&w(G)},[G]),(0,l.useEffect)(()=>{I(i)},[i]);let P=u()(`${r}-column-filter`,{on:Array.isArray(i)&&i.length});e="function"==typeof a?a(Array.isArray(i)&&i.length>0):(0,l.isValidElement)(a)?a:l.createElement("div",{className:P},"​",l.createElement(h.Z,{role:"button","aria-label":"Filter data with this column","aria-haspopup":"listbox",tabIndex:-1,size:"default"}));let k=Object.assign(Object.assign(Object.assign(Object.assign({},t),o),{tempFilteredValue:x,setTempFilteredValue:I,confirm:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(null==e?void 0:e.filteredValue)||x;!c()(t,i)&&p({filteredValue:t}),e.closeDropdown&&w(!1)},clear:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};I([]),p({filteredValue:[]}),e.closeDropdown&&w(!1)},close:()=>{w(!1)}}),{filterDropdownVisible:y?G:C,onFilterDropdownVisibleChange:e=>{b&&w(e),v(e)}});return H=l.isValidElement(H)?H:function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,{filterMultiple:a=!0,filters:o=[],filteredValue:c=[],filterDropdownVisible:p,onSelect:u=s(),onFilterDropdownVisibleChange:h=s(),trigger:G="click",position:D="bottom",renderFilterDropdown:v,renderFilterDropdownItem:H}=null!=t?t:{},y=n()(t,["tempFilteredValue","setTempFilteredValue","confirm","clear","close","filters"]),b="function"==typeof v?v(y):l.createElement(f.Z.Menu,null,Array.isArray(o)&&o.map((r,n)=>{let s=e=>{let t=e&&e.nativeEvent;t&&(t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault());let i=[...c],n=i.includes(r.value),s=i.indexOf(r.value);return s>-1?i.splice(s,1):a?i.push(r.value):i=[r.value],u({value:r.value,filteredValue:i,included:!n,domEvent:t})},o=c.includes(r.value),{text:p}=r,{value:h}=r,d=`${i}_${n}`,G="function"==typeof H?H({onChange:s,filterMultiple:a,value:h,text:p,checked:o,filteredValue:c,level:i}):null,D=G&&l.isValidElement(G)?l.cloneElement(G,{key:d}):l.createElement(f.Z.Item,{key:d,onClick:s},a?l.createElement(g.Z,{checked:o},p):l.createElement(m.Z,{checked:o},p));if(Array.isArray(r.children)&&r.children.length){let n=Object.assign(Object.assign({},t),{filters:r.children,trigger:"hover",position:"right"});delete n.filterDropdownVisible,D=e(n,D,i+1)}return D})),x=Object.assign(Object.assign({},t),{onVisibleChange:e=>h(e),trigger:G,position:D,render:b});return null!=p&&(x.visible=p),l.createElement(f.Z,Object.assign({},x,{key:`Dropdown_level_${i}`,className:`${d.UX.PREFIX}-column-filter-dropdown`}),r)}(k,e)}},167271:function(e,t,r){"use strict";r.d(t,{Z:function(){return h}}),r(932651);var i=r(390063),n=r.n(i),a=r(198412),s=r.n(a),o=r(101199),c=r(622689),l=r.n(c),p=r(278766),u=r(408537);class h extends o.PureComponent{render(){let{pagination:e,prefixCls:t,info:r,renderPagination:i}=this.props,a=s()(e,"total"),c=i&&n()(i)?i(e):null;return o.createElement("div",{className:`${t}-pagination-outer`},(0,o.isValidElement)(c)?c:o.createElement(o.Fragment,null,o.createElement("span",{className:`${t}-pagination-info`},r),o.createElement("span",{className:`${t}-pagination-wrapper`},a>0?o.createElement(u.Z,Object.assign({},e,{key:s()(e,"pageSize","pagination")})):null)))}}h.propTypes={style:l().object,prefixCls:l().string,pagination:l().object,info:l().oneOfType([l().string,l().node]),renderPagination:l().func},h.defaultProps={prefixCls:p.UX.PREFIX}},161086:function(e,t,r){"use strict";r.d(t,{AK:function(){return l},I6:function(){return d},UM:function(){return o},WN:function(){return p},nI:function(){return c},wq:function(){return h}}),r(228983),r(759943),r(240148),r(683656),r(14275),r(780582),r(591964);let i=/^#(EXT[^:]*)(?::(.*))?$/,n=/([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g,a=/^(?:[a-zA-Z0-9+\-.]+:)?\/\//,s=/^((?:[a-zA-Z0-9+\-.]+:)?\/\/[^/?#]*)?([^?#]*\/)?/;function o(e){return e.split(/[\r\n]/).map(e=>e.trim()).filter(Boolean)}function c(e){let t=e.match(i);if(t&&t[1])return[t[1].replace("EXT-X-",""),t[2]]}function l(e){let t={},r=n.exec(e);for(;r;)t[r[1]]=r[2]||r[3],r=n.exec(e);return t}function p(e,t){if(!t||!e||a.test(e))return e;let r=s.exec(t);return r?"/"===e[0]?r[1]+e:r[1]+r[2]+e:e}let u={audio:[/^mp4a/,/^vorbis$/,/^opus$/,/^flac$/,/^[ae]c-3$/],video:[/^avc/,/^hev/,/^hvc/,/^vp0?[89]/,/^av1$/],text:[/^vtt$/,/^wvtt/,/^stpp/]};function h(e,t){let r=u[e];if(r&&t&&t.length){for(let e=0;e<r.length;e++)for(let i=0;i<t.length;i++)if(r[e].test(t[i]))return t[i]}}function d(e,t){let r;if(t){for(let i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&e[i]!==t[i]){r=i;break}}let i=null;e.DURATION&&(Number.isFinite(i=parseFloat(e.DURATION))?e._endDate&&(i=(e._endDate.getTime()-e._startDate.getTime())/1e3):i=null);let n=function(e,t){return(e?e.split(/[ ,]+/):[]).reduce((e,t)=>(e[t.toLowerCase()]=!0,e),t)}(e.CUE||e["X-CUE"],{pre:!1,post:!1,once:!1});return!!e.ID&&!r&&Number.isFinite(e._startDate.getTime())&&(null===i||i>=0)&&("YES"!==e.END_ON_NEXT||!!e.CLASS)&&(!e.CUE||!n.pre&&!n.post||n.pre!==n.post)&&("com.apple.hls.interstitial"!==e.CLASS||"X-ASSET-URI"in e||"X-ASSET-LIST"in e)}},695587:function(e,t,r){"use strict";r.d(t,{n:function(){return o}}),r(374954),r(559352);var i=r(330287),n=r(204694),a=r(525434),s=r(921469);class o{fix(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];e=Math.round(9e4*e);let i=this.videoTrack,n=this.audioTrack,a=i.samples,s=n.samples;if(!a.length&&!s.length)return;let o=a[0],c=s[0],l=0;if(a.length&&s.length&&(l=o.dts-c.pts),!this._baseDtsInited&&this._calculateBaseDts(this.audioTrack,this.videoTrack),t&&(this._calculateBaseDts(this.audioTrack,this.videoTrack),this._baseDts-=e,this._baseAudioDts-=e,this._baseVideoDts-=e),!r){this._videoNextDts=l>0?e+l:e,this._audioNextPts=l>0?e:e-l,this._needForceFixLargeGap&&(this._videoNextDts=0,this._audioNextPts=0);let t=o?o.dts-this._baseDts-this._videoNextDts:0,r=c?c.pts-this._baseDts-this._audioNextPts:0;Math.abs(t||r)>9e4&&(this._calculateBaseDts(this.audioTrack,this.videoTrack),this._baseDts-=e)}if(this._resetBaseDtsWhenStreamBreaked(),this._fixAudio(n),this._fixVideo(i),this.metadataTrack.exist()){let e=this.metadataTrack.timescale;this.metadataTrack.seiSamples.forEach(t=>{t.pts=t.originPts-this._baseDts,t.time=Math.max(0,t.pts)/e})}i.samples.length&&(i.baseMediaDecodeTime=i.samples[0].dts),n.samples.length&&(n.baseMediaDecodeTime=n.samples[0].pts*n.timescale/9e4)}_fixVideo(e){let t;let r=e.samples;if(!r.length)return;if(r.forEach(e=>{e.dts-=this._needForceFixLargeGap?this._baseVideoDts:this._baseDts,e.pts-=this._needForceFixLargeGap?this._baseVideoDts:this._baseDts}),void 0===this._videoNextDts){let e=r[0];this._videoNextDts=e.dts}let n=r.length,a=0,s=r[0],o=r[1],c=this._videoNextDts-s.dts;if(Math.abs(c)>45e3){var l,p;if(e.warnings.push({type:i.Bc.LARGE_VIDEO_GAP_BETWEEN_CHUNK,nextDts:this._videoNextDts/90,firstSampleDts:s.dts/90,nextSampleDts:((null===(l=r[1])||void 0===l?void 0:l.dts)||0)/90,sampleDuration:c/90}),s.dts+=c,s.pts+=c,o&&Math.abs(o.dts-s.dts)>9e4)this._videoTimestampBreak=!0,r.forEach((e,t)=>{0!==t&&(e.dts+=c,e.pts+=c)});else for(let e=1;e<=n-1;e++){let t=null===(p=r[e])||void 0===p?void 0:p.dts,i=r[e-1].dts;t&&t-i<0&&(r[e].dts+=c,r[e].pts+=c)}}if(e.fpsNum&&e.fpsDen&&(t=e.timescale*(e.fpsDen/e.fpsNum)),t<900&&(t=0),!t){let r=e.samples[0],i=e.samples[1];t=1===n?9e3:Math.floor(i.dts-r.dts)}for(let s=0;s<n;s++){let o=r[s].dts,c=r[s+1];if((a=s<n-1?c.dts-o:r[s-1]?Math.min(o-r[s-1].dts,t):t)>9e4||a<0){this._videoTimestampBreak=!0,a=this._audioTimestampBreak?t:Math.max(a,2700);let n=this._audioNextPts||0;c&&c.dts>n&&(a=t),e.warnings.push({type:i.Bc.LARGE_VIDEO_GAP,time:o/e.timescale,dts:o,originDts:r[s].originDts,nextDts:this._videoNextDts,sampleDuration:a,refSampleDuration:t})}r[s].duration=a,this._videoNextDts+=a}}_fixAudio(e){let t=e.samples;if(t.length){if(e.codecType===s.yQ.MP3){this.lastAudioSample&&t.unshift(this.lastAudioSample);for(let e=0;e<t.length;e++){let r=t[e];if(t[e+1])r.duration=t[e+1].pts-r.pts;else break;r.pts-=this._baseDts,r.dts=r.pts}this.lastAudioSample=t.pop();return}t.forEach(e=>{e.pts-=this._needForceFixLargeGap?this._baseAudioDts:this._baseDts,e.dts=e.pts}),this._doFixAudioInternal(e,t,9e4)}}_calculateBaseDts(e,t){let r=e.samples,n=t.samples;if(!r.length&&!n.length)return!1;let a=1/0,s=1/0;r.length&&(e.baseDts=a=r[0].pts,this._baseAudioDts=a),n.length&&(t.baseDts=s=n[0].dts,this._baseVideoDts=s),this._baseDts=Math.min(a,s);let o=s-a,c=!1;return Number.isFinite(o)&&Math.abs(o)>45e3&&t.warnings.push({type:i.Bc.LARGE_AV_SHIFT,videoBaseDts:s,audioBasePts:a,baseDts:this._baseDts,delta:o}),Number.isFinite(o)&&Math.abs(o)>9e4*this._largeGapThreshold&&(c=!0),!this._baseDtsInited&&(c&&this._needForceFixLargeGap?this._needForceFixLargeGap=!0:this._needForceFixLargeGap=!1),this._baseDtsInited=!0,!0}_resetBaseDtsWhenStreamBreaked(){this._baseDtsInited&&this._videoTimestampBreak&&this._audioTimestampBreak&&this._calculateBaseDts(this.audioTrack,this.videoTrack)&&(this._baseDts-=Math.min(this._audioNextPts,this._videoNextDts),this._audioLastSample=null,this._videoLastSample=null,this._videoTimestampBreak=!1,this._audioTimestampBreak=!1)}_doFixAudioInternal(e,t,r){!e.sampleDuration&&(e.sampleDuration=n.Wc.getFrameDuration(e.timescale,r));let s=e.sampleDuration;if(void 0===this._audioNextPts){let e=t[0];this._audioNextPts=e.pts}for(let r=0;r<t.length;r++){let o=this._audioNextPts,c=t[r],l=c.pts-o;if(!this._audioTimestampBreak&&l>=3*s&&l<=9e4&&!a.G6){let a=n.Wc.getSilentFrame(e.codec,e.channelCount)||t[0].data.subarray(),p=Math.floor(l/s);Math.abs(c.pts-this._lastAudioExceptionGapDot)>45e4&&(this._lastAudioExceptionGapDot=c.pts),e.warnings.push({type:i.Bc.AUDIO_FILLED,pts:c.pts/90,originPts:c.originPts,count:p,nextPts:o/90,refSampleDuration:s});for(let e=0;e<p;e++){let e=new i.Xw(Math.floor(o),a);e.originPts=Math.floor(this._baseDts+o),t.splice(r,0,e),this._audioNextPts+=s,r++}r--}else l<=-3*s&&l>=-9e4?(Math.abs(c.pts-this._lastAudioExceptionOverlapDot)>45e4&&(this._lastAudioExceptionOverlapDot=c.pts,e.warnings.push({type:i.Bc.AUDIO_DROPPED,pts:c.pts/90,originPts:c.originPts,nextPts:o/90,refSampleDuration:s})),t.splice(r,1),r--):(Math.abs(l)>=9e4&&(this._audioTimestampBreak=!0,Math.abs(c.pts-this._lastAudioExceptionLargeGapDot)>45e4&&(this._lastAudioExceptionLargeGapDot=c.pts,e.warnings.push({type:i.Bc.LARGE_AUDIO_GAP,time:c.pts/1e3,pts:c.pts/90,originPts:c.originPts,nextPts:o/90,sampleDuration:l,refSampleDuration:s}))),c.dts=c.pts=o,this._audioNextPts+=s)}}constructor(e,t,r,i){this.videoTrack=e,this.audioTrack=t,this.metadataTrack=r,this._baseDts=-1,this._baseVideoDts=-1,this._baseAudioDts=-1,this._baseDtsInited=!1,this._audioNextPts=void 0,this._videoNextDts=void 0,this._audioTimestampBreak=!1,this._videoTimestampBreak=!1,this._lastAudioExceptionGapDot=0,this._lastAudioExceptionOverlapDot=0,this._lastAudioExceptionLargeGapDot=0,this._needForceFixLargeGap=null==i?void 0:i.forceFixLargeGap,this._largeGapThreshold=(null==i?void 0:i.largeGapThreshold)||45e4}}},278739:function(e,t,r){"use strict";function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(t=>setTimeout(t,e))}r.d(t,{_:function(){return i}}),r(679308)},14010:function(e,t,r){"use strict";r.d(t,{U:function(){return n},j:function(){return a}});var i=r(707852);let n={PREFIX:`${i.T}-avatar`},a={SHAPE:["circle","square"],SIZE:["extra-extra-small","extra-small","small","default","medium","large","extra-large"],COLOR:["grey","red","pink","purple","violet","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","white"],OVERLAP_FROM:["start","end"]}},101703:function(e,t,r){"use strict";r.d(t,{UX:function(){return n},j2:function(){return a}});var i=r(707852);let n={PREFIX:`${i.T}-button`},a={sizes:["default","small","large"],iconPositions:["left","right"],htmlTypes:["button","reset","submit"],btnTypes:["primary","secondary","tertiary","warning","danger"],themes:["solid","borderless","light","outline"],DEFAULT_ICON_SIZE:"default",DEFAULT_ICON_POSITION:"left"}},985895:function(e,t,r){"use strict";r(374954);t.Z=e=>{let{weekStartsOn:t=0}=e,r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];for(let e=0;e<t;e++)r.push(r.shift());return r}},224596:function(e,t,r){"use strict";r(780582);var i=r(72137),n=r.n(i);let a=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth","boxSizing","fontFamily","fontSize","fontStyle","fontWeight","letterSpacing","lineHeight","paddingBottom","paddingLeft","paddingRight","paddingTop","tabSize","textIndent","textRendering","textTransform","width"];t.Z=e=>{let t=window.getComputedStyle(e);if(null===t)return null;let r=n()(t,a),{boxSizing:i}=r;if(""===i)return null;let s=parseFloat(r.paddingBottom)+parseFloat(r.paddingTop),o=parseFloat(r.borderBottomWidth)+parseFloat(r.borderTopWidth);return{sizingStyle:r,paddingSize:s,borderSize:o}}},508187:function(e,t,r){"use strict";r.d(t,{U:function(){return n},j:function(){return a}});var i=r(707852);let n={PREFIX:`${i.T}-progress`},a={types:["line","circle"],DEFAULT_TYPE:"line",STROKE_DEFAULT:"var(--semi-color-success)",strokeLineCap:["square","round"],DEFAULT_LINECAP:"round",sizes:["default","small","large"],DEFAULT_SIZE:"default",directions:["vertical","horizontal"],DEFAULT_DIRECTION:"horizontal"}},16979:function(e,t,r){"use strict";r.d(t,{U:function(){return n},j:function(){return a}});var i=r(707852);let n={PREFIX:`${i.T}-timeline`,ITEM:`${i.T}-timeline-item`},a={MODE:["left","alternate","right","center"],ITEM_POS:["left","right"],ITEM_TYPE:["ongoing","success","warning","error","default"]}},155553:function(e,t,r){"use strict";function i(e){return`${e}-${new Date().getTime()}-${Math.random()}`}function n(){var e,t;try{return null!==(t=null===(e=null==crypto?void 0:crypto.randomUUID)||void 0===e?void 0:e.call(crypto))&&void 0!==t?t:String(-99990013e3).replace(/[018]/g,e=>(Number(e)^crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4).toString(16))}catch(e){return i("semi")}}function a(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{prefix:t="",length:r=7}=e,i="0123456789abcdefghijklmnopqrstuvwxyz",n=i.length,a="";for(let e=0;e<r;e++){let e=Math.floor(Math.random()*n);a+=i.charAt(e)}return t?`${t}-${a}`:a}r.d(t,{Cd:function(){return n},Ms:function(){return a},ZP:function(){return i}}),r(683656),r(759943),r(190932),r(808483),r(126159),r(100832),r(825666),r(943281),r(82726),r(414931)},342087:function(e,t,r){"use strict";r(932651);var i=r(101199);function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}let a=i.forwardRef(function(e,t){return i.createElement("svg",n({viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,ref:t},e),i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M10.9056 9.84516C10.6127 9.55226 10.1379 9.55226 9.84498 9.84516C9.55208 10.1381 9.55208 10.6129 9.84498 10.9058L14.9393 16.0002L9.84498 21.0945C9.55208 21.3874 9.55208 21.8623 9.84498 22.1552C10.1379 22.4481 10.6127 22.4481 10.9056 22.1552L16 17.0608L21.0943 22.1552C21.3872 22.4481 21.8621 22.4481 22.155 22.1552C22.4479 21.8623 22.4479 21.3874 22.155 21.0945L17.0606 16.0002L22.155 10.9058C22.4479 10.6129 22.4479 10.1381 22.155 9.84516C21.8621 9.55226 21.3872 9.55226 21.0943 9.84516L16 14.9395L10.9056 9.84516Z",fill:"currentColor"}))});a.elementType="Icon",t.Z=a},936052:function(e,t,r){"use strict";r(932651);var i=r(101199);function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}let a=i.forwardRef(function(e,t){return i.createElement("svg",n({viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,ref:t},e),i.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M20.9282 6.79886C19.8543 5.72492 18.1131 5.72492 17.0392 6.79886C16.1491 7.68895 15.9967 9.0374 16.582 10.0844L13.7233 12.9432L9.58426 12.9432C8.47063 12.9432 7.91292 14.2896 8.70038 15.077L12.2675 18.6442L6.96829 23.9709L8.0317 25.0289L13.3282 19.7048L16.8928 23.2694C17.6802 24.0569 19.0267 23.4992 19.0267 22.3855V18.2464L21.8853 15.3877C22.9324 15.9731 24.2808 15.8207 25.1709 14.9306C26.2448 13.8567 26.2448 12.1154 25.1709 11.0415L20.9282 6.79886ZM18.0998 7.85952C18.588 7.37137 19.3794 7.37137 19.8676 7.85952L24.1102 12.1022C24.5984 12.5903 24.5984 13.3818 24.1102 13.8699C23.6221 14.3581 22.8306 14.3581 22.3425 13.8699L21.8121 13.3396L17.5267 17.6251V21.782L10.1878 14.4432L14.3446 14.4432L18.6301 10.1576L18.0998 9.62729C17.6117 9.13914 17.6117 8.34768 18.0998 7.85952Z",fill:"currentColor"}))});a.elementType="Icon",t.Z=a},696869:function(e,t,r){"use strict";var i=r(320165),n=r(366786),a=r(745314),s=r(123082),o=r(101199);(0,a.n)(()=>{let{playerRef:e}=(0,o.useContext)(n.E),t=(0,o.useRef)(null);return(0,o.useEffect)(()=>(e.current.plugins.pip=t.current,()=>{var t;null===(t=e.current)||void 0===t||delete t.plugins.pip}),[]),(0,i.jsx)(s.x,{ref:t})})},89722:function(e,t,r){"use strict";r.d(t,{B:function(){return a}});var i=r(480333),n=r(982308);class a extends n.Sy{afterPlayerInit(){if(!this._inited)this._inited=!0,"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>{this._player.emit("video_resize")}),this._resizeObserver.observe(this._root))}beforeDestroy(){var e;null===(e=this._resizeObserver)||void 0===e||e.disconnect()}}(0,i._)(a,"pluginName","events")},165022:function(e,t,r){"use strict";r.d(t,{P:function(){return l}}),r(313036),r(76375);var i=r(101199),n=r(835952),a=r(228901),s="function"==typeof Symbol&&Symbol.for,o=s?Symbol.for("react.forward_ref"):"function"==typeof i.forwardRef&&(0,i.forwardRef)(function(e){return null}).$$typeof,c=s?Symbol.for("react.memo"):"function"==typeof i.memo&&(0,i.memo)(function(e){return null}).$$typeof;function l(e,t){if(c&&e.$$typeof===c)throw Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");if((0,n.F)())return e;var r,s=null!==(r=null==t?void 0:t.forwardRef)&&void 0!==r&&r,l=e,u=e.displayName||e.name;if(o&&e.$$typeof===o&&(s=!0,"function"!=typeof(l=e.render)))throw Error("[mobx-react-lite] `render` property of ForwardRef was not a function");var h=function(e,t){return(0,a.S)(function(){return l(e,t)},u)};return""!==u&&(h.displayName=u),e.contextTypes&&(h.contextTypes=e.contextTypes),s&&(h=(0,i.forwardRef)(h)),function(e,t){Object.keys(e).forEach(function(r){!p[r]&&Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))})}(e,h=(0,i.memo)(h)),h}var p={$$typeof:!0,render:!0,compare:!0,type:!0,displayName:!0}},564013:function(e,t,r){"use strict";r(679308),r.e("25041").then(r.bind(r,60793))},4592:function(e,t,r){"use strict";r(679308),Promise.all([r.e("23634"),r.e("92176"),r.e("41162"),r.e("64571"),r.e("15799"),r.e("28161"),r.e("21133"),r.e("51253"),r.e("69073"),r.e("69855"),r.e("42794"),r.e("15915"),r.e("38563"),r.e("67306"),r.e("69221"),r.e("14306"),r.e("24882"),r.e("47072"),r.e("10771"),r.e("6593"),r.e("6757"),r.e("45829"),r.e("89429"),r.e("20717"),r.e("74352"),r.e("16616")]).then(r.bind(r,342011))},40298:function(e,t,r){"use strict";function i(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,{Z:function(){return i}})},914803:function(e,t,r){"use strict";var i=r(612729),n=r(189990);t.ZP="function"==typeof structuredClone?(e,t)=>t&&("json"in t||"lossy"in t)?(0,i.v)((0,n.q)(e,t)):structuredClone(e):(e,t)=>(0,i.v)((0,n.q)(e,t))},791382:function(e,t,r){"use strict";function i(e,t){if(e.options.allowDangerousHtml){let r={type:"raw",value:t.value};return e.patch(t,r),e.applyData(t,r)}}r.d(t,{d:function(){return i}})},923204:function(e,t,r){"use strict";function i(e,t){let r={type:"root",children:e.wrap(e.all(t))};return e.patch(t,r),e.applyData(t,r)}r.d(t,{J:function(){return i}})},853857:function(e,t,r){"use strict";r.d(t,{q:function(){return a}});var i=r(667287),n=r(540717);function a(e,t,r,a){let s=(0,n.w)(r),o=r.bulletCurrent||(0,i.g)(r);t&&"list"===t.type&&t.ordered&&(o=("number"==typeof t.start&&t.start>-1?t.start:1)+(!1===r.options.incrementListMarker?0:t.children.indexOf(e))+o);let c=o.length+1;("tab"===s||"mixed"===s&&(t&&"list"===t.type&&t.spread||e.spread))&&(c=4*Math.ceil(c/4));let l=r.createTracker(a);l.move(o+" ".repeat(c-o.length)),l.shift(c);let p=r.enter("listItem"),u=r.indentLines(r.containerFlow(e,l.current()),function(e,t,r){return t?(r?"":" ".repeat(c))+e:(r?o:o+" ".repeat(c-o.length))+e});return p(),u}},170035:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var i=r(890131),n=r(368183),a=r(252819);let s={name:"headingAtx",resolve:function(e,t){let r,i,n=e.length-2,s=3;return"whitespace"===e[3][1].type&&(s+=2),n-2>s&&"whitespace"===e[n][1].type&&(n-=2),"atxHeadingSequence"===e[n][1].type&&(s===n-1||n-4>s&&"whitespace"===e[n-2][1].type)&&(n-=s+1===n?2:4),n>s&&(r={type:"atxHeadingText",start:e[s][1].start,end:e[n][1].end},i={type:"chunkText",start:e[s][1].start,end:e[n][1].end,contentType:"text"},(0,a.d)(e,s,n-s+1,[["enter",r,t],["enter",i,t],["exit",i,t],["exit",r,t]])),e},tokenize:function(e,t,r){let a=0;return function(t){return e.enter("atxHeading"),function(t){return e.enter("atxHeadingSequence"),function t(i){return 35===i&&a++<6?(e.consume(i),t):null===i||(0,n.z3)(i)?(e.exit("atxHeadingSequence"),s(i)):r(i)}(t)}(t)};function s(r){return 35===r?(e.enter("atxHeadingSequence"),function t(r){return 35===r?(e.consume(r),t):(e.exit("atxHeadingSequence"),s(r))}(r)):null===r||(0,n.Ch)(r)?(e.exit("atxHeading"),t(r)):(0,n.xz)(r)?(0,i.f)(e,s,"whitespace")(r):(e.enter("atxHeadingText"),function t(r){return null===r||35===r||(0,n.z3)(r)?(e.exit("atxHeadingText"),s(r)):(e.consume(r),t)}(r))}}}},873233:function(e,t,r){"use strict";r.d(t,{v:function(){return n}});var i=r(359778);function n(e,t){return{name:"mdxJsxTextTag",tokenize:function(r,n,a){return i.r.call(this,r,n,a,e,t.acornOptions,t.addResult,!0,"mdxJsxTextTag","mdxJsxTextTagMarker","mdxJsxTextTagClosingMarker","mdxJsxTextTagSelfClosingMarker","mdxJsxTextTagName","mdxJsxTextTagNamePrimary","mdxJsxTextTagNameMemberMarker","mdxJsxTextTagNameMember","mdxJsxTextTagNamePrefixMarker","mdxJsxTextTagNameLocal","mdxJsxTextTagExpressionAttribute","mdxJsxTextTagExpressionAttributeMarker","mdxJsxTextTagExpressionAttributeValue","mdxJsxTextTagAttribute","mdxJsxTextTagAttributeName","mdxJsxTextTagAttributeNamePrimary","mdxJsxTextTagAttributeNamePrefixMarker","mdxJsxTextTagAttributeNameLocal","mdxJsxTextTagAttributeInitializerMarker","mdxJsxTextTagAttributeValueLiteral","mdxJsxTextTagAttributeValueLiteralMarker","mdxJsxTextTagAttributeValueLiteralValue","mdxJsxTextTagAttributeValueExpression","mdxJsxTextTagAttributeValueExpressionMarker","mdxJsxTextTagAttributeValueExpressionValue")}}}},614867:function(e,t,r){"use strict";r.d(t,{_:function(){return a}});var i=r(252819),n=r(61340);function a(e){let t,r,a,s,o,c,l;let p={},u=-1,h=new n.U(e);for(;++u<h.length;){for(;u in p;)u=p[u];if(t=h.get(u),u&&"chunkFlow"===t[1].type&&"listItemPrefix"===h.get(u-1)[1].type&&(c=t[1]._tokenizer.events,(a=0)<c.length&&"lineEndingBlank"===c[a][1].type&&(a+=2),a<c.length&&"content"===c[a][1].type))for(;++a<c.length&&"content"!==c[a][1].type;){;"chunkText"===c[a][1].type&&(c[a][1]._isInFirstContentOfListItem=!0,a++)}if("enter"===t[0])t[1].contentType&&(Object.assign(p,function(e,t){let r,i;let n=e.get(t)[1],a=e.get(t)[2],s=t-1,o=[],c=n._tokenizer;!c&&(c=a.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(c._contentTypeTextTrailing=!0));let l=c.events,p=[],u={},h=-1,d=n,f=0,m=0,g=[0];for(;d;){for(;e.get(++s)[1]!==d;);o.push(s),!d._tokenizer&&(r=a.sliceStream(d),!d.next&&r.push(null),i&&c.defineSkip(d.start),d._isInFirstContentOfListItem&&(c._gfmTasklistFirstContentOfListItem=!0),c.write(r),d._isInFirstContentOfListItem&&(c._gfmTasklistFirstContentOfListItem=void 0)),i=d,d=d.next}for(d=n;++h<l.length;)"exit"===l[h][0]&&"enter"===l[h-1][0]&&l[h][1].type===l[h-1][1].type&&l[h][1].start.line!==l[h][1].end.line&&(m=h+1,g.push(m),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(c.events=[],d?(d._tokenizer=void 0,d.previous=void 0):g.pop(),h=g.length;h--;){let t=l.slice(g[h],g[h+1]),r=o.pop();p.push([r,r+t.length-1]),e.splice(r,2,t)}for(p.reverse(),h=-1;++h<p.length;)u[f+p[h][0]]=f+p[h][1],f+=p[h][1]-p[h][0]-1;return u}(h,u)),u=p[u],l=!0);else if(t[1]._container){for(a=u,r=void 0;a--;)if("lineEnding"===(s=h.get(a))[1].type||"lineEndingBlank"===s[1].type)"enter"===s[0]&&(r&&(h.get(r)[1].type="lineEndingBlank"),s[1].type="lineEnding",r=a);else if("linePrefix"===s[1].type||"listItemIndent"===s[1].type);else break;r&&(t[1].end={...h.get(r)[1].start},(o=h.slice(r,u)).unshift(t),h.splice(r,u-r+1,o))}}return(0,i.d)(e,0,Number.POSITIVE_INFINITY,h.slice(0)),!l}},918395:function(e,t,r){"use strict";function i(e){return e.toLowerCase()}r.d(t,{F:function(){return i}})},18546:function(e,t,r){"use strict";function i(e){let{id:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=document.getElementById(t);if(!r)return;let i=new IntersectionObserver(t=>{for(let r of t){if(!!r.isIntersecting){i.disconnect(),e();break}}});for(let e of Array.from(r.children))i.observe(e)}r.d(t,{X:function(){return i}}),r(490629)},755135:function(e,t,r){"use strict";r.d(t,{g:function(){return i}});let i={pad(){},unpad(){}}}}]);