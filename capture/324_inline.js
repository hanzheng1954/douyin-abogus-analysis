(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam
) {
return function vector$float$$size() {
if (arguments.length !== 0) {
throwBindingError('function vector<float>.size called with ' + arguments.length + ' arguments, expected 0 args!');
}
var thisWired = classParam.toWireType(null, this);
var rv = invoker(fn, thisWired);
var ret = retType.fromWireType(rv);
return ret;
}

})