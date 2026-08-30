(function(){
  var S = function(v){ try { var j = JSON.stringify(v); return j && j.length > 3000 ? j.slice(0,3000) : j; } catch(e){ return '[unserializable]'; } };
  var push = function(m){ window.__trace = window.__trace || []; window.__trace.push(m); if (window.__trace.length > 3000) window.__trace.shift(); };
  window.__trace = [];
  var NL = String.fromCharCode(10);
  try {
    var oa = URLSearchParams.prototype.append;
    var os = URLSearchParams.prototype.set;
    URLSearchParams.prototype.append = function(name, value) {
      var n = String(name);
      if (/bogus/i.test(n)) push({ k: 'USP.append', name: n, value: String(value), query: this.toString ? this.toString() : '', stack: (new Error().stack || '').split(NL).slice(1, 9).join(' | ') });
      return oa.apply(this, arguments);
    };
    URLSearchParams.prototype.set = function(name, value) {
      var n = String(name);
      if (/bogus/i.test(n)) push({ k: 'USP.set', name: n, value: String(value), query: this.toString ? this.toString() : '', stack: (new Error().stack || '').split(NL).slice(1, 9).join(' | ') });
      return os.apply(this, arguments);
    };
    var sx = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
      if (/stub|bogus|sign/i.test(String(name))) push({ k: 'XHR.hdr', name: String(name), value: String(value), stack: (new Error().stack || '').split(NL).slice(1, 9).join(' | ') });
      return sx.apply(this, arguments);
    };
    var oHF = Headers.prototype.append;
    Headers.prototype.append = function(name, value) {
      if (/stub|bogus|sign/i.test(String(name))) push({ k: 'HDR.append', name: String(name), value: String(value), stack: (new Error().stack || '').split(NL).slice(1, 9).join(' | ') });
      return oHF.apply(this, arguments);
    };
  } catch(e) { push({ k: 'initErr', e: String(e) }); }
})();
