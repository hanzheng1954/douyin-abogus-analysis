(function anonymous(
) {

var _checkXSS = function (it) {
  return it && it.Math == Math && it;
};
return _checkXSS(typeof globalThis === 'object' && globalThis) ||
_checkXSS(typeof window === 'object' && window) ||
_checkXSS(typeof self === 'object' && self) ||
_checkXSS(typeof global === 'object' && global) ||
Function('return this')();

})