"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var novo_label_service_1 = require("../../../../services/novo-label-service");
var BasePickerResults_1 = require("../base-picker-results/BasePickerResults");
var PickerResults = (function (_super) {
    __extends(PickerResults, _super);
    function PickerResults(element, labels, ref) {
        var _this = _super.call(this, element, ref) || this;
        _this.labels = labels;
        return _this;
    }
    PickerResults.prototype.getListElement = function () {
        return this.element.nativeElement.querySelector('novo-list');
    };
    return PickerResults;
}(BasePickerResults_1.BasePickerResults));
PickerResults.decorators = [
    { type: core_1.Component, args: [{
                selector: 'picker-results',
                host: {
                    'class': 'active'
                },
                template: "\n        <novo-list *ngIf=\"matches.length > 0\" direction=\"vertical\">\n            <novo-list-item\n                *ngFor=\"let match of matches\"\n                (click)=\"selectMatch($event)\"\n                [class.active]=\"match === activeMatch\"\n                (mouseenter)=\"selectActive(match)\"\n                [class.disabled]=\"preselected(match)\">\n                <item-content>\n                    <span [innerHtml]=\"highlight(match.label, term)\"></span>\n                </item-content>\n            </novo-list-item>\n        </novo-list>\n        <div class=\"picker-loader\" *ngIf=\"isLoading && matches.length === 0\">\n            <novo-loading theme=\"line\"></novo-loading>\n        </div>\n        <p class=\"picker-error\" *ngIf=\"hasError\">{{ labels.pickerError }}</p>\n        <p class=\"picker-null-results\" *ngIf=\"!isLoading && !matches.length && !hasError\">{{ labels.pickerEmpty }}</p>\n    "
            },] },
];
/** @nocollapse */
PickerResults.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ChangeDetectorRef, },
]; };
exports.PickerResults = PickerResults;
//# sourceMappingURL=PickerResults.js.map