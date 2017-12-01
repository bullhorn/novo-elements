"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };
    LocalStorageService.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    return LocalStorageService;
}());
LocalStorageService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
LocalStorageService.ctorParameters = function () { return []; };
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=storage.service.js.map