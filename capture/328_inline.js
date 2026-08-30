(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0
) {
return function vector$float$$push_back(arg0) {
if (arguments.length !== 1) {
throwBindingError('function vector<float>.push_back called with ' + arguments.length + ' arguments, expected 1 args!');
}
var thisWired = classParam.toWireType(null, this);
var arg0Wired = argType0.toWireType(null, arg0); // float
invoker(fn, thisWired, arg0Wired);
}

})