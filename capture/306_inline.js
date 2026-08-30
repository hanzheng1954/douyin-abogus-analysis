(function anonymous(body
) {
return function UnboundTypeError() {
    "use strict";    return body.apply(this, arguments);
};

})