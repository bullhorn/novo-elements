"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Helpers_1 = require("../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var RADIO_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoRadioElement; }),
    multi: true
};
var NovoRadioGroup = (function () {
    function NovoRadioGroup() {
    }
    return NovoRadioGroup;
}());
NovoRadioGroup.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-radio-group',
                template: '<ng-content></ng-content>'
            },] },
];
/** @nocollapse */
NovoRadioGroup.ctorParameters = function () { return []; };
exports.NovoRadioGroup = NovoRadioGroup;
var NovoRadioElement = (function () {
    function NovoRadioElement(ref) {
        this.ref = ref;
        this.button = false;
        this.theme = 'secondary';
        this.change = new core_1.EventEmitter();
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    /**
     * Handles the select of the radio button, will only change if a new radio is selected
     * @param event
     * @param radio
     */
    NovoRadioElement.prototype.select = function (event, radio) {
        Helpers_1.Helpers.swallowEvent(event);
        // Only change the checked state if this is a new radio, they are not toggle buttons
        if (!radio.checked) {
            radio.checked = !radio.checked;
            this.change.emit(this.value);
            this.onModelChange(this.value);
            this.ref.markForCheck();
        }
    };
    NovoRadioElement.prototype.writeValue = function (model) {
        this.model = model;
        this.ref.markForCheck();
    };
    NovoRadioElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoRadioElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoRadioElement;
}());
NovoRadioElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-radio',
                providers: [RADIO_VALUE_ACCESSOR],
                template: "\n        <input [name]=\"name\" type=\"radio\" [checked]=\"checked\" [attr.id]=\"name\" #radio (change)=\"select($event, radio)\">\n        <label [attr.for]=\"name\" (click)=\"select($event, radio)\">\n            <button *ngIf=\"button\" [ngClass]=\"{'unchecked': !radio.checked, 'checked': radio.checked, 'has-icon': !!icon}\" [theme]=\"theme\" [icon]=\"icon\">{{ label }}</button>\n            <div *ngIf=\"!button\">\n                <i [ngClass]=\"{'bhi-radio-empty': !radio.checked, 'bhi-radio-filled': radio.checked}\"></i>\n                {{ label }}\n                <ng-content></ng-content>\n            </div>\n        </label>\n    ",
                host: {
                    '[class.vertical]': 'vertical'
                }
            },] },
];
/** @nocollapse */
NovoRadioElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
]; };
NovoRadioElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'value': [{ type: core_1.Input },],
    'checked': [{ type: core_1.Input },],
    'vertical': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'button': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
};
exports.NovoRadioElement = NovoRadioElement;
//# sourceMappingURL=Radio.js.map