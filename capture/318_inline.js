(function anonymous(body
) {
return function ByteNNEngine() {
    "use strict";    return body.apply(this, arguments);
};

})