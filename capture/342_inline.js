(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,arg0Wired_dtor
) {
return function createStringVector(arg0) {
if (arguments.length !== 1) {
throwBindingError('function createStringVector called with ' + arguments.length + ' arguments, expected 1 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // std::string
var rv = invoker(fn, arg0Wired);
arg0Wired_dtor(arg0Wired); // std::string
var ret = retType.fromWireType(rv);
return ret;
}

})