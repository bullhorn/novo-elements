"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var Helpers_1 = require("../../utils/Helpers");
var NovoFormElement = (function () {
    function NovoFormElement() {
        this.hideHeader = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
    }
    NovoFormElement.prototype.ngOnInit = function () {
        this.form.layout = this.layout;
    };
    Object.defineProperty(NovoFormElement.prototype, "value", {
        get: function () {
            return this.form.getRawValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoFormElement.prototype, "isValid", {
        get: function () {
            return this.form.valid;
        },
        enumerable: true,
        configurable: true
    });
    NovoFormElement.prototype.showAllFields = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (key) {
            _this.form.controls[key].hidden = false;
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    };
    NovoFormElement.prototype.showOnlyRequired = function (hideRequiredWithValue) {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (key) {
            // Hide any non-required fields
            if (!_this.form.controls[key].required) {
                _this.form.controls[key].hidden = true;
            }
            // Hide required fields that have been successfully filled out
            if (hideRequiredWithValue && !Helpers_1.Helpers.isBlank(_this.form.value[key])) {
                _this.form.controls[key].hidden = true;
            }
            // Don't hide fields with errors
            if (_this.form.controls[key].errors) {
                _this.form.controls[key].hidden = false;
            }
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    };
    NovoFormElement.prototype.forceValidation = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (key) {
            var control = _this.form.controls[key];
            if (control.required && Helpers_1.Helpers.isBlank(_this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    };
    return NovoFormElement;
}());
NovoFormElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-form',
                template: "\n        <div class=\"novo-form-container\">\n            <header *ngIf=\"!hideHeader\">\n                <ng-content select=\"form-title\"></ng-content>\n                <ng-content select=\"form-subtitle\"></ng-content>\n            </header>\n            <form class=\"novo-form\" [formGroup]=\"form\" autocomplete=\"off\">\n                <ng-content></ng-content>\n            </form>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoFormElement.ctorParameters = function () { return []; };
NovoFormElement.propDecorators = {
    'form': [{ type: core_1.Input },],
    'layout': [{ type: core_1.Input },],
    'hideHeader': [{ type: core_1.Input },],
};
exports.NovoFormElement = NovoFormElement;
//# sourceMappingURL=Form.js.map