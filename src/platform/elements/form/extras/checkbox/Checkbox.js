"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Helpers_1 = require("../../../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var CHECKBOX_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoCheckboxElement; }),
    multi: true
};
var LAYOUT_DEFAULTS = { iconStyle: 'box' };
var NovoCheckboxElement = (function () {
    function NovoCheckboxElement(ref) {
        this.ref = ref;
        this.indeterminate = false;
        this.boxIcon = true;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    NovoCheckboxElement.prototype.ngOnInit = function () {
        this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
        this.boxIcon = this.layoutOptions.iconStyle === 'box';
    };
    NovoCheckboxElement.prototype.select = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        this.model = !this.model;
        this.onModelChange(this.model);
    };
    NovoCheckboxElement.prototype.writeValue = function (model) {
        this.model = model;
        this.ref.markForCheck();
    };
    NovoCheckboxElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoCheckboxElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoCheckboxElement;
}());
NovoCheckboxElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-checkbox',
                providers: [CHECKBOX_VALUE_ACCESSOR],
                template: "\n        <div class=\"check-box-group\" [class.checked]=\"model\" [class.disabled]=\"disabled\">\n            <input [name]=\"name\" type=\"checkbox\" [(ngModel)]=\"model\" [attr.id]=\"name\">\n            <label [attr.for]=\"name\" (click)=\"select($event)\">\n              <i [class.bhi-checkbox-empty]=\"!model && !indeterminate && boxIcon\"\n                 [class.bhi-checkbox-filled]=\"model && !indeterminate && boxIcon\"\n                 [class.bhi-checkbox-indeterminate]=\"indeterminate && boxIcon\"\n                 [class.bhi-circle-o]=\"!model && !indeterminate && !boxIcon\"\n                 [class.bhi-check]=\"model && !indeterminate && !boxIcon\"\n                 [class.bhi-circle]=\"indeterminate && !boxIcon\"></i>\n              <span *ngIf=\"label\">{{ label }}</span>\n            </label>\n        </div>\n    ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoCheckboxElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
]; };
NovoCheckboxElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'indeterminate': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'layoutOptions': [{ type: core_1.Input },],
};
exports.NovoCheckboxElement = NovoCheckboxElement;
//# sourceMappingURL=Checkbox.js.map