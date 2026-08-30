(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1
) {
return function appendVectorWithFloat(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function appendVectorWithFloat called with ' + arguments.length + ' arguments, expected 2 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // vector<float>
var arg1Wired = argType1.toWireType(null, arg1); // float
invoker(fn, arg0Wired, arg1Wired);
}

})