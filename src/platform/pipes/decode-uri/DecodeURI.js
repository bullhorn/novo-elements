"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// App
var Helpers_1 = require("../../utils/Helpers");
var DecodeURIPipe = (function () {
    function DecodeURIPipe() {
    }
    DecodeURIPipe.prototype.transform = function (encodedString) {
        var decodedString = '';
        if (!Helpers_1.Helpers.isBlank(encodedString) && typeof encodedString === 'string') {
            decodedString = decodeURIComponent(encodedString);
        }
        return decodedString;
    };
    return DecodeURIPipe;
}());
DecodeURIPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'decodeURI' },] },
    { type: core_1.Injectable },
];
/** @nocollapse */
DecodeURIPipe.ctorParameters = function () { return []; };
exports.DecodeURIPipe = DecodeURIPipe;
//# sourceMappingURL=DecodeURI.js.map