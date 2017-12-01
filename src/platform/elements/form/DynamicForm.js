"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
// APP
var Helpers_1 = require("./../../utils/Helpers");
var ComponentUtils_1 = require("./../../utils/component-utils/ComponentUtils");
var NovoFieldsetHeaderElement = (function () {
    function NovoFieldsetHeaderElement() {
    }
    return NovoFieldsetHeaderElement;
}());
NovoFieldsetHeaderElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-fieldset-header',
                template: "\n        <h6><i [class]=\"icon || 'bhi-section'\"></i>{{title}}</h6>\n    "
            },] },
];
/** @nocollapse */
NovoFieldsetHeaderElement.ctorParameters = function () { return []; };
NovoFieldsetHeaderElement.propDecorators = {
    'title': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
};
exports.NovoFieldsetHeaderElement = NovoFieldsetHeaderElement;
var NovoControlCustom = (function () {
    function NovoControlCustom(componentUtils) {
        this.componentUtils = componentUtils;
    }
    NovoControlCustom.prototype.ngOnInit = function () {
        this.controlComponent = this.componentUtils.appendNextToLocation(this.control.customControl, this.referencePoint);
        this.controlComponent.instance.control = this.control;
        this.controlComponent.instance.form = this.form;
        if (this.control.customControlConfig) {
            this.controlComponent.instance.config = this.control.customControlConfig;
        }
    };
    return NovoControlCustom;
}());
NovoControlCustom.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-control-custom',
                template: "\n        <span #ref></span>\n    "
            },] },
];
/** @nocollapse */
NovoControlCustom.ctorParameters = function () { return [
    { type: ComponentUtils_1.ComponentUtils, },
]; };
NovoControlCustom.propDecorators = {
    'control': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'referencePoint': [{ type: core_1.ViewChild, args: ['ref', { read: core_1.ViewContainerRef },] },],
};
exports.NovoControlCustom = NovoControlCustom;
var NovoFieldsetElement = (function () {
    function NovoFieldsetElement() {
        this.controls = [];
    }
    return NovoFieldsetElement;
}());
NovoFieldsetElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-fieldset',
                template: "\n        <div class=\"novo-fieldset-container\">\n            <novo-fieldset-header [icon]=\"icon\" [title]=\"title\" *ngIf=\"title\"></novo-fieldset-header>\n            <ng-container *ngFor=\"let control of controls\">\n                <div class=\"novo-form-row\" [class.disabled]=\"control.disabled\" *ngIf=\"control.__type !== 'GroupedControl'\">\n                    <novo-control *ngIf=\"!control.customControl\" [control]=\"control\" [form]=\"form\"></novo-control>\n                    <novo-control-custom *ngIf=\"control.customControl\" [control]=\"control\" [form]=\"form\"></novo-control-custom>\n                </div>\n                <div *ngIf=\"control.__type === 'GroupedControl'\">TODO - GroupedControl</div>\n            </ng-container>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoFieldsetElement.ctorParameters = function () { return []; };
NovoFieldsetElement.propDecorators = {
    'controls': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
};
exports.NovoFieldsetElement = NovoFieldsetElement;
var NovoDynamicFormElement = (function () {
    function NovoDynamicFormElement() {
        this.controls = [];
        this.fieldsets = [];
        this.hideNonRequiredFields = true;
        this.allFieldsRequired = false;
        this.allFieldsNotRequired = false;
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.numControls = 0;
    }
    NovoDynamicFormElement.prototype.ngOnInit = function () {
        this.ngOnChanges();
    };
    NovoDynamicFormElement.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.form.layout = this.layout;
        if (!(this.fieldsets && this.fieldsets.length) && this.controls && this.controls.length) {
            this.fieldsets = [{
                    controls: this.controls
                }];
            this.numControls = this.controls.length;
        }
        else if (this.fieldsets) {
            this.fieldsets.forEach(function (fieldset) {
                _this.numControls = _this.numControls + fieldset.controls.length;
            });
        }
        var requiredFields = [];
        var nonRequiredFields = [];
        this.fieldsets.forEach(function (fieldset) {
            fieldset.controls.forEach(function (control) {
                if (control.required) {
                    requiredFields.push(control);
                }
                else {
                    nonRequiredFields.push(control);
                }
            });
        });
        this.allFieldsRequired = requiredFields.length === this.numControls;
        this.allFieldsNotRequired = nonRequiredFields.length === this.numControls;
        if (this.allFieldsNotRequired && this.hideNonRequiredFields) {
            this.fieldsets.forEach(function (fieldset) {
                fieldset.controls.forEach(function (control) {
                    _this.form.controls[control.key].hidden = false;
                });
            });
        }
        this.form.fieldsets = this.fieldsets.slice();
    };
    NovoDynamicFormElement.prototype.showAllFields = function () {
        var _this = this;
        this.form.fieldsets.forEach(function (fieldset) {
            fieldset.controls.forEach(function (control) {
                _this.form.controls[control.key].hidden = false;
            });
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    };
    NovoDynamicFormElement.prototype.showOnlyRequired = function (hideRequiredWithValue) {
        var _this = this;
        this.form.fieldsets.forEach(function (fieldset) {
            fieldset.controls.forEach(function (control) {
                // Hide any non-required fields
                if (!control.required) {
                    _this.form.controls[control.key].hidden = true;
                }
                // Hide required fields that have been successfully filled out
                if (hideRequiredWithValue && !Helpers_1.Helpers.isBlank(_this.form.value[control.key])) {
                    _this.form.controls[control.key].hidden = true;
                }
                // Don't hide fields with errors
                if (_this.form.controls[control.key].errors) {
                    _this.form.controls[control.key].hidden = false;
                }
            });
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    };
    Object.defineProperty(NovoDynamicFormElement.prototype, "values", {
        get: function () {
            return this.form ? this.form.value : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoDynamicFormElement.prototype, "isValid", {
        get: function () {
            return this.form ? this.form.valid : false;
        },
        enumerable: true,
        configurable: true
    });
    NovoDynamicFormElement.prototype.updatedValues = function () {
        var _this = this;
        var ret = null;
        this.form.fieldsets.forEach(function (fieldset) {
            fieldset.controls.forEach(function (control) {
                if (_this.form.controls[control.key].dirty || control.dirty) {
                    if (!ret) {
                        ret = {};
                    }
                    ret[control.key] = _this.form.value[control.key];
                }
            });
        });
        return ret;
    };
    NovoDynamicFormElement.prototype.forceValidation = function () {
        var _this = this;
        Object.keys(this.form.controls).forEach(function (key) {
            var control = _this.form.controls[key];
            if (control.required && Helpers_1.Helpers.isBlank(_this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    };
    return NovoDynamicFormElement;
}());
NovoDynamicFormElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-dynamic-form',
                template: "\n        <div class=\"novo-form-container\">\n            <header>\n                <ng-content select=\"form-title\"></ng-content>\n                <ng-content select=\"form-subtitle\"></ng-content>\n            </header>\n            <form class=\"novo-form\" [formGroup]=\"form\" autocomplete=\"off\">\n                <ng-container *ngFor=\"let fieldset of form.fieldsets\">\n                    <novo-fieldset *ngIf=\"fieldset.controls.length\" [icon]=\"fieldset.icon\" [controls]=\"fieldset.controls\" [title]=\"fieldset.title\" [form]=\"form\"></novo-fieldset>\n                </ng-container>\n            </form>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoDynamicFormElement.ctorParameters = function () { return []; };
NovoDynamicFormElement.propDecorators = {
    'controls': [{ type: core_1.Input },],
    'fieldsets': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'layout': [{ type: core_1.Input },],
    'hideNonRequiredFields': [{ type: core_1.Input },],
};
exports.NovoDynamicFormElement = NovoDynamicFormElement;
//# sourceMappingURL=DynamicForm.js.map