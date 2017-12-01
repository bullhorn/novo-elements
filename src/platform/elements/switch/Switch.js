"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
// Value accessor for the component (supports ngModel)
var SWITCH_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoSwitchElement; }),
    multi: true
};
var NovoSwitchElement = (function () {
    function NovoSwitchElement(ref) {
        this.ref = ref;
        this.onChange = new core_1.EventEmitter();
        this._disabled = false;
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    Object.defineProperty(NovoSwitchElement.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = (!value);
        },
        enumerable: true,
        configurable: true
    });
    NovoSwitchElement.prototype.onKeydown = function (event) {
        if (event.keyCode === KeyCodes_1.KeyCodes.SPACE) {
            event.preventDefault();
            this.toggle(event);
        }
    };
    NovoSwitchElement.prototype.toggle = function (event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        if (this.disabled) {
            return;
        }
        this.model = !this.model;
        this.onChange.next(this.model);
        this.onModelChange(this.model);
        this.ref.markForCheck();
    };
    NovoSwitchElement.prototype.writeValue = function (model) {
        this.model = model;
        this.ref.markForCheck();
    };
    NovoSwitchElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoSwitchElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoSwitchElement;
}());
NovoSwitchElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-switch',
                providers: [SWITCH_VALUE_ACCESSOR],
                template: "\n        <div (click)=\"toggle($event)\">\n            <div class=\"novo-switch-container\">\n                <div class=\"novo-switch-bar\"></div>\n                <div class=\"novo-switch-thumb-container\">\n                    <div class=\"novo-switch-thumb\"></div>\n                </div>\n            </div>\n            <div class=\"novo-switch-label\"><ng-content></ng-content></div>\n        </div>\n    ",
                host: {
                    'role': 'checkbox',
                    '[attr.aria-checked]': 'model',
                    '[attr.aria-disabled]': 'disabled',
                    '(keydown)': 'onKeydown($event)',
                    '[class]': 'theme'
                }
            },] },
];
/** @nocollapse */
NovoSwitchElement.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
]; };
NovoSwitchElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
    'onChange': [{ type: core_1.Output },],
    'disabled': [{ type: core_1.Input, args: ['disabled',] },],
};
exports.NovoSwitchElement = NovoSwitchElement;
//# sourceMappingURL=Switch.js.map