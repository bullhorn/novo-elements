"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Helpers_1 = require("../../utils/Helpers");
var GroupByPipe = (function () {
    function GroupByPipe() {
    }
    GroupByPipe.prototype.transform = function (input, prop) {
        if (!Array.isArray(input)) {
            return input;
        }
        var arr = {};
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var value = input_1[_i];
            var field = Helpers_1.can(value).have(prop);
            if (Helpers_1.Helpers.isBlank(arr[field])) {
                arr[field] = [];
            }
            arr[field].push(value);
        }
        return Object.keys(arr).map(function (key) { return ({ key: key, 'value': arr[key] }); });
    };
    return GroupByPipe;
}());
GroupByPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'groupBy'
            },] },
];
/** @nocollapse */
GroupByPipe.ctorParameters = function () { return []; };
exports.GroupByPipe = GroupByPipe;
//# sourceMappingURL=GroupBy.js.map