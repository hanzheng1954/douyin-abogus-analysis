(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0
) {
return function stringVectorToString(arg0) {
if (arguments.length !== 1) {
throwBindingError('function stringVectorToString called with ' + arguments.length + ' arguments, expected 1 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // vector<string>
invoker(fn, arg0Wired);
}

})