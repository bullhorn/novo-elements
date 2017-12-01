"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var coercion_1 = require("@angular/cdk/coercion");
var BaseControl_1 = require("./controls/BaseControl");
var FormUtils_1 = require("./../../utils/form-utils/FormUtils");
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
var NovoControlGroup = (function () {
    function NovoControlGroup(formUtils, fb, ref, labels) {
        this.formUtils = formUtils;
        this.fb = fb;
        this.ref = ref;
        this.labels = labels;
        this._vertical = false;
        this._remove = false;
        this._edit = false;
        this._collapsible = false;
        this.onRemove = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onAdd = new core_1.EventEmitter();
        this.controlLabels = [];
        this.toggled = false;
        this.disabledArray = [];
        this.currentIndex = 0;
    }
    Object.defineProperty(NovoControlGroup.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        // Sets the display of the group to either be row (default) or vertical via flex-box
        set: function (v) {
            this._vertical = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlGroup.prototype, "remove", {
        get: function () {
            return this._remove;
        },
        // Hide/shows the remove button for removing a control
        set: function (v) {
            this._remove = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlGroup.prototype, "edit", {
        get: function () {
            return this._edit;
        },
        // Hide/shows the edit button for editing a control
        set: function (v) {
            this._edit = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlGroup.prototype, "collapsible", {
        get: function () {
            return this._collapsible;
        },
        // Allows the control to collapse or not
        set: function (v) {
            this._collapsible = coercion_1.coerceBooleanProperty(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlGroup.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        // Icon of the control group (can have bhi prefix or not)
        set: function (v) {
            this._icon = v && v.indexOf('bhi') !== -1 ? v : "bhi-" + v;
        },
        enumerable: true,
        configurable: true
    });
    NovoControlGroup.prototype.ngAfterContentInit = function () {
        if (!this.key) {
            throw new Error('novo-control-group must have the [key] attribute provided!');
        }
    };
    NovoControlGroup.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var initialValueChange = changes['initialValue'];
        // If initial value changes, clear the controls
        if (initialValueChange && initialValueChange.currentValue !== initialValueChange.previousValue && !initialValueChange.firstChange) {
            this.clearControls();
        }
        // Check for array, add a control for each value
        if (this.initialValue && Array.isArray(this.initialValue)) {
            if (this.initialValue.length !== 0) {
                this.currentIndex = 0;
                this.initialValue.forEach(function (value) { return _this.addNewControl(value); });
            }
        }
        else if (this.initialValue) {
            // If value is an object, just add one control
            this.addNewControl(this.initialValue);
        }
        // If we are horizontal, grab the labels to help with layout
        if (!this.vertical) {
            this.controlLabels = (this.controls || []).map(function (control) {
                return {
                    value: control.label,
                    width: control.width
                };
            });
            this.ref.markForCheck();
        }
    };
    NovoControlGroup.prototype.addNewControl = function (value) {
        var control = this.form.controls[this.key];
        var newCtrl = this.buildControl(value);
        if (control) {
            control.push(newCtrl);
        }
        else {
            this.form.addControl(this.key, this.fb.array([newCtrl]));
        }
        this.disabledArray.push({
            edit: this.checkCanEdit(this.currentIndex),
            remove: this.checkCanRemove(this.currentIndex),
        });
        if (!value) {
            this.onAdd.emit();
        }
        this.currentIndex++;
        this.ref.markForCheck();
    };
    NovoControlGroup.prototype.buildControl = function (value) {
        var newControls = this.getNewControls(this.controls);
        if (value) {
            this.formUtils.setInitialValues(newControls, value);
        }
        var ctrl = this.formUtils.toFormGroup(newControls);
        return ctrl;
    };
    NovoControlGroup.prototype.removeControl = function (index, emitEvent) {
        if (emitEvent === void 0) { emitEvent = true; }
        var control = this.form.controls[this.key];
        if (emitEvent) {
            this.onRemove.emit({ value: control.at(index).value, index: index });
        }
        control.removeAt(index);
        this.ref.markForCheck();
    };
    NovoControlGroup.prototype.editControl = function (index) {
        var control = this.form.controls[this.key];
        this.onEdit.emit({ value: control.at(index).value, index: index });
    };
    NovoControlGroup.prototype.toggle = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        if (this.collapsible) {
            this.toggled = !this.toggled;
            this.ref.markForCheck();
        }
    };
    NovoControlGroup.prototype.clearControls = function () {
        var control = this.form.controls[this.key];
        if (control) {
            for (var i = control.controls.length; i >= 0; i--) {
                this.removeControl(i, false);
            }
            this.currentIndex = 0;
        }
    };
    NovoControlGroup.prototype.checkCanEdit = function (index) {
        if (this.canEdit) {
            var control = this.form.controls[this.key];
            return this.canEdit(control.at(index).value, index);
        }
        return true;
    };
    NovoControlGroup.prototype.checkCanRemove = function (index) {
        if (this.canRemove) {
            var control = this.form.controls[this.key];
            return this.canRemove(control.at(index).value, index);
        }
        return true;
    };
    NovoControlGroup.prototype.getNewControls = function (controls) {
        var ret = [];
        (this.controls || []).forEach(function (control) {
            ret.push(new BaseControl_1.BaseControl(control.__type, control));
        });
        return ret;
    };
    return NovoControlGroup;
}());
NovoControlGroup.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-control-group',
                template: "\n        <h6 class=\"novo-section-header\" *ngIf=\"label\">\n            <span (click)=\"toggle($event)\" [class.clickable]=\"collapsible\">\n                <i *ngIf=\"icon && !collapsible\" [ngClass]=\"icon\" [attr.data-automation-id]=\"'novo-control-group-icon-' + key\"></i>\n                <i *ngIf=\"collapsible\" class=\"bhi-next\" [class.toggled]=\"toggled\" [attr.data-automation-id]=\"'novo-control-group-collapse-' + key\"></i>\n                <span [attr.data-automation-id]=\"'novo-control-group-label-' + key\">{{ label }}</span>\n            </span>\n            <label class=\"novo-control-group-description\" *ngIf=\"description\" [attr.data-automation-id]=\"'novo-control-group-description-' + key\">{{ description }}</label>\n        </h6>\n        <div class=\"novo-control-group-controls\" [class.vertical]=\"vertical\" [class.horizontal]=\"!vertical\" [class.hidden]=\"collapsible && !toggled\">\n            <ng-template #defaultTemplate let-index=\"index\" let-form=\"form\" let-key=\"key\">\n                <div class=\"novo-control-group-control\">\n                    <div *ngFor=\"let c of controls\" class=\"novo-control-container\" [class.is-label]=\"c.controlType === 'read-only'\" [style.max-width.px]=\"c.width\">\n                        <novo-control [form]=\"form?.controls[key]['controls'][index]\" [control]=\"c\" [condensed]=\"!vertical || c.controlType === 'read-only'\"></novo-control>\n                    </div>\n                    <div class=\"novo-control-container last\" *ngIf=\"edit && !vertical\">\n                        <button [disabled]=\"!disabledArray[index].edit\" type=\"button\" *ngIf=\"edit && !vertical\" theme=\"icon\" icon=\"edit\" (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\"></button>\n                    </div>\n                    <div class=\"novo-control-container last\" *ngIf=\"remove && !vertical\">\n                        <button [disabled]=\"!disabledArray[index].remove\" type=\"button\" *ngIf=\"remove && !vertical\" theme=\"icon\" icon=\"delete-o\" (click)=\"removeControl(index)\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\" index=\"-1\"></button>\n                    </div>\n                </div>\n                <button [disabled]=\"!disabledArray[index].edit\" type=\"button\" *ngIf=\"edit && vertical\" theme=\"icon\" icon=\"edit\" (click)=\"editControl(index)\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\" index=\"-1\"></button>\n                <button [disabled]=\"!disabledArray[index].remove\" type=\"button\" *ngIf=\"remove && vertical\" theme=\"icon\" icon=\"delete-o\" (click)=\"removeControl(index)\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\" index=\"-1\"></button>\n            </ng-template>\n            <div class=\"novo-control-group-labels\" *ngIf=\"!vertical && form?.controls[key] && form?.controls[key]['controls'].length !== 0\">\n                <div class=\"novo-control-group-control-label\" *ngFor=\"let label of controlLabels\" [style.max-width.px]=\"label.width\">\n                    <span [attr.data-automation-id]=\"'novo-control-group-label-' + label.value\">{{ label.value }}</span>\n                </div>\n                <div class=\"novo-control-group-control-label last\" *ngIf=\"edit\" [attr.data-automation-id]=\"'novo-control-group-edit-' + key\"></div>\n                <div class=\"novo-control-group-control-label last\" *ngIf=\"remove\" [attr.data-automation-id]=\"'novo-control-group-delete-' + key\"></div>\n            </div>\n            <ng-container *ngIf=\"form?.controls[key]\">\n                <div class=\"novo-control-group-row\" *ngFor=\"let control of form?.controls[key]['controls']; let index = index;\">\n                    <ng-template\n                        [ngTemplateOutlet]=\"rowTemplate || defaultTemplate\"\n                        [ngTemplateOutletContext]=\"{form: form, index: index, key: key, controls: controls}\">\n                    </ng-template>\n                </div>\n            </ng-container>\n            <div class=\"novo-control-group-empty\" *ngIf=\"form?.controls[key] && form?.controls[key]['controls'].length === 0\" [attr.data-automation-id]=\"'novo-control-group-empty-' + key\">\n                {{ emptyMessage }}\n            </div>\n            <p *ngIf=\"add\">\n                <button type=\"button\" theme=\"dialogue\" icon=\"add-thin\" (click)=\"addNewControl()\" [attr.data-automation-id]=\"'novo-control-group-bottom-add-' + key\" index=\"-1\">{{ add?.label }}</button>\n            </p>\n        </div>\n   ",
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NovoControlGroup.ctorParameters = function () { return [
    { type: FormUtils_1.FormUtils, },
    { type: forms_1.FormBuilder, },
    { type: core_1.ChangeDetectorRef, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
NovoControlGroup.propDecorators = {
    'vertical': [{ type: core_1.Input },],
    'add': [{ type: core_1.Input },],
    'remove': [{ type: core_1.Input },],
    'edit': [{ type: core_1.Input },],
    'collapsible': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'controls': [{ type: core_1.Input },],
    'key': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'description': [{ type: core_1.Input },],
    'emptyMessage': [{ type: core_1.Input },],
    'icon': [{ type: core_1.Input },],
    'initialValue': [{ type: core_1.Input },],
    'canEdit': [{ type: core_1.Input },],
    'canRemove': [{ type: core_1.Input },],
    'rowTemplate': [{ type: core_1.Input },],
    'onRemove': [{ type: core_1.Output },],
    'onEdit': [{ type: core_1.Output },],
    'onAdd': [{ type: core_1.Output },],
};
exports.NovoControlGroup = NovoControlGroup;
//# sourceMappingURL=ControlGroup.js.map