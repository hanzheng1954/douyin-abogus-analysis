(function anonymous(body
) {
return function InternalError() {
    "use strict";    return body.apply(this, arguments);
};

})