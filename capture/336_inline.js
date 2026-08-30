(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,arg0Wired_dtor
) {
return function vector$string$$push_back(arg0) {
if (arguments.length !== 1) {
throwBindingError('function vector<string>.push_back called with ' + arguments.length + ' arguments, expected 1 args!');
}
var thisWired = classParam.toWireType(null, this);
var arg0Wired = argType0.toWireType(null, arg0); // std::string
invoker(fn, thisWired, arg0Wired);
arg0Wired_dtor(arg0Wired); // std::string
}

})