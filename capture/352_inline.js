(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0
) {
return function vector$float$$get(arg0) {
if (arguments.length !== 1) {
throwBindingError('function vector<float>.get called with ' + arguments.length + ' arguments, expected 1 args!');
}
var thisWired = classParam.toWireType(null, this);
var arg0Wired = argType0.toWireType(null, arg0); // unsigned long
var rv = invoker(fn, thisWired, arg0Wired);
var ret = retType.fromWireType(rv);
return ret;
}

})