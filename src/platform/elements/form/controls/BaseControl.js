"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
// APP
var Helpers_1 = require("../../../utils/Helpers");
var BaseControl = (function () {
    function BaseControl(type, config) {
        if (type === void 0) { type = 'BaseControl'; }
        if (config === void 0) { config = {}; }
        this.__type = 'BaseControl';
        this.__type = type;
        this.__config = config;
        this.validators = config.validators || [];
        this.asyncValidators = config.asyncValidators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.checkboxLabel = config.checkboxLabel;
        this.name = config.name || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
        this.encrypted = !!config.encrypted;
        this.sortOrder = config.sortOrder === undefined ? 1 : config.sortOrder;
        this.controlType = config.controlType || '';
        this.placeholder = config.placeholder || '';
        this.config = config.config || null;
        this.dirty = !!config.value;
        this.multiple = !!config.multiple;
        this.headerConfig = config.headerConfig || null;
        this.currencyFormat = config.currencyFormat || null;
        this.associatedEntity = config.associatedEntity || null;
        this.optionsType = config.optionsType || null;
        this.options = config.options || [];
        this.forceClear = new core_1.EventEmitter();
        this.readOnly = !!config.readOnly || !!config.disabled;
        this.disabled = !!config.disabled;
        this.layoutOptions = config.layoutOptions || {};
        this.military = !!config.military;
        if (this.required) {
            this.validators.push(forms_1.Validators.required);
        }
        if (!Helpers_1.Helpers.isBlank(config.maxlength)) {
            this.maxlength = config.maxlength;
            this.validators.push(forms_1.Validators.maxLength(this.maxlength));
        }
        if (!Helpers_1.Helpers.isBlank(config.minlength)) {
            this.minlength = config.minlength;
            this.validators.push(forms_1.Validators.minLength(this.minlength));
        }
        this.closeOnSelect = !!config.closeOnSelect;
        this.interactions = config.interactions;
        this.dataSpecialization = config.dataSpecialization;
        this.appendToBody = !!config.appendToBody;
        this.parentScrollSelector = config.parentScrollSelector;
        this.description = config.description;
        if (config.tooltip) {
            this.tooltip = config.tooltip;
            this.tooltipPosition = config.tooltipPosition;
        }
        this.customControl = config.customControl;
        this.customControlConfig = config.customControlConfig;
        this.tipWell = config.tipWell;
        this.width = config.width;
    }
    return BaseControl;
}());
exports.BaseControl = BaseControl;
//# sourceMappingURL=BaseControl.js.map