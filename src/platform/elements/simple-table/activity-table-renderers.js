"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTableRenderers = (function () {
    function ActivityTableRenderers() {
    }
    ActivityTableRenderers.propertyRenderer = function (prop) {
        return function (data) {
            // TODO - allow for dots and sub props
            return data[prop];
        };
    };
    ActivityTableRenderers.dateRenderer = function (prop) {
        return function (data) {
            return data[prop] ? new Date(data[prop]).toLocaleDateString() : '';
        };
    };
    return ActivityTableRenderers;
}());
exports.ActivityTableRenderers = ActivityTableRenderers;
//# sourceMappingURL=activity-table-renderers.js.map