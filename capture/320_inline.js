(function anonymous(throwBindingError,invoker,fn,runDestructors,retType,classParam
) {
return function createFloatVector() {
if (arguments.length !== 0) {
throwBindingError('function createFloatVector called with ' + arguments.length + ' arguments, expected 0 args!');
}
var rv = invoker(fn);
var ret = retType.fromWireType(rv);
return ret;
}

})