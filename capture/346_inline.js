(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1,arg0Wired_dtor,arg1Wired_dtor
) {
return function createEngine(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function createEngine called with ' + arguments.length + ' arguments, expected 2 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // ByteNNConfig
var arg1Wired = argType1.toWireType(null, arg1); // std::string
var rv = invoker(fn, arg0Wired, arg1Wired);
arg0Wired_dtor(arg0Wired); // ByteNNConfig
arg1Wired_dtor(arg1Wired); // std::string
var ret = retType.fromWireType(rv);
return ret;
}

})