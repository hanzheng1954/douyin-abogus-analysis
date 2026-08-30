(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1,arg0Wired_dtor,arg1Wired_dtor
) {
return function createConfig(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function createConfig called with ' + arguments.length + ' arguments, expected 2 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // std::string
var arg1Wired = argType1.toWireType(null, arg1); // std::string
var rv = invoker(fn, arg0Wired, arg1Wired);
arg0Wired_dtor(arg0Wired); // std::string
arg1Wired_dtor(arg1Wired); // std::string
var ret = retType.fromWireType(rv);
return ret;
}

})