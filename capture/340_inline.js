(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1,arg1Wired_dtor
) {
return function vector$string$$set(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function vector<string>.set called with ' + arguments.length + ' arguments, expected 2 args!');
}
var thisWired = classParam.toWireType(null, this);
var arg0Wired = argType0.toWireType(null, arg0); // unsigned long
var arg1Wired = argType1.toWireType(null, arg1); // std::string
var rv = invoker(fn, thisWired, arg0Wired, arg1Wired);
arg1Wired_dtor(arg1Wired); // std::string
var ret = retType.fromWireType(rv);
return ret;
}

})