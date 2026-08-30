(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1,arg1Wired_dtor
) {
return function appendVectorWithString(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function appendVectorWithString called with ' + arguments.length + ' arguments, expected 2 args!');
}
var arg0Wired = argType0.toWireType(null, arg0); // vector<string>
var arg1Wired = argType1.toWireType(null, arg1); // std::string
invoker(fn, arg0Wired, arg1Wired);
arg1Wired_dtor(arg1Wired); // std::string
}

})