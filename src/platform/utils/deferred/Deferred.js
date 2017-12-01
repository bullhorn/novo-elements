"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Promise that uses the deferred anti-pattern
 */
function Deferred() {
    var temp = {};
    var promise = new Promise(function (resolve, reject) {
        temp.resolve = resolve;
        temp.reject = reject;
    });
    promise.resolve = temp.resolve;
    promise.reject = temp.reject;
    return promise;
}
exports.Deferred = Deferred;
//# sourceMappingURL=Deferred.js.map