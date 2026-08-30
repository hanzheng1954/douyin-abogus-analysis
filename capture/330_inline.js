(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1
) {
return function vector$float$$resize(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function vector<float>.resize called with ' + arguments.length + ' arguments, expected 2 args!');
}
var thisWired = classParam.toWireType(null, this);
var arg0Wired = argType0.toWireType(null, arg0); // unsigned long
var arg1Wired = argType1.toWireType(null, arg1); // float
invoker(fn, thisWired, arg0Wired, arg1Wired);
}

})