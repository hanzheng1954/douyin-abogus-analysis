(function anonymous(body
) {
return function BindingError() {
    "use strict";    return body.apply(this, arguments);
};

})