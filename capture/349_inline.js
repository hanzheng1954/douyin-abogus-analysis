(function anonymous(body
) {
return function Function() {
    "use strict";    return body.apply(this, arguments);
};

})