(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam,argType0,argType1
) {
return function runInference(arg0, arg1) {
if (arguments.length !== 2) {
throwBindingError('function runInference called with ' + arguments.length + ' arguments, expected 2 args!');
}
var destructors = [];
var arg0Wired = argType0.toWireType(destructors, arg0); // shared_ptr<ByteNNEngine>
var arg1Wired = argType1.toWireType(destructors, arg1); // std::string
var rv = invoker(fn, arg0Wired, arg1Wired);
runDestructors(destructors);
var ret = retType.fromWireType(rv);
return ret;
}

})