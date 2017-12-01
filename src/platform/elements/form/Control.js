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
var OutsideClick_1 = require("../../utils/outside-click/OutsideClick");
var novo_label_service_1 = require("../../services/novo-label-service");
var Helpers_1 = require("../../utils/Helpers");
var KeyCodes_1 = require("../../utils/key-codes/KeyCodes");
var DateFormat_1 = require("../../services/date-format/DateFormat");
var FieldInteractionApi_1 = require("./FieldInteractionApi");
;
var NovoAutoSize = (function () {
    function NovoAutoSize(element) {
        this.element = element;
    }
    NovoAutoSize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    NovoAutoSize.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.adjust();
        });
    };
    NovoAutoSize.prototype.adjust = function () {
        var hasValue = this.element.nativeElement.value.length !== 0;
        this.element.nativeElement.style.overflow = 'hidden';
        if (hasValue) {
            this.element.nativeElement.style.height = Math.min((this.element.nativeElement.scrollHeight - 11), 300) + 'px';
        }
        else {
            this.element.nativeElement.style.height = '14px';
        }
    };
    return NovoAutoSize;
}());
NovoAutoSize.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'textarea[autosize]'
            },] },
];
/** @nocollapse */
NovoAutoSize.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
NovoAutoSize.propDecorators = {
    'onInput': [{ type: core_1.HostListener, args: ['input', ['$event.target'],] },],
};
exports.NovoAutoSize = NovoAutoSize;
var NovoCustomControlContainerElement = (function () {
    function NovoCustomControlContainerElement() {
    }
    return NovoCustomControlContainerElement;
}());
NovoCustomControlContainerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-custom-control-container',
                template: "\n        <div class=\"novo-control-container\" [hidden]=\"form.controls[control.key].hidden || form.controls[control.key].type === 'hidden' || form.controls[control.key].controlType === 'hidden'\">\n            <!--Label (for horizontal)-->\n            <label [attr.for]=\"control.key\" *ngIf=\"form.layout !== 'vertical' && form.controls[control.key].label\">{{ form.controls[control.key].label }}</label>\n            <div class=\"novo-control-outer-container\">\n                <!--Label (for vertical)-->\n                <label\n                    *ngIf=\"form.layout === 'vertical' && form.controls[control.key].label\"\n                    class=\"novo-control-label\"\n                    [attr.for]=\"control.key\"\n                    [class.novo-control-always-active]=\"true\">\n                    {{ form.controls[control.key].label }}\n                </label>\n                <div class=\"novo-control-inner-container\">\n                    <div class=\"novo-control-inner-input-container\">\n                        <!--Required Indicator-->\n                        <i [hidden]=\"!form.controls[control.key].required || form.controls[control.key].readOnly\"\n                            class=\"required-indicator\"\n                            [ngClass]=\"{'bhi-circle': !isValid, 'bhi-check': isValid}\" *ngIf=\"form.controls[control.key].required\">\n                        </i>\n                        <!--Form Controls-->\n                        <div class=\"novo-control-input {{ form.controls[control.key].controlType }}\" [attr.data-automation-id]=\"control.key\">\n                            <ng-content></ng-content>\n                        </div>\n                    </div>\n                    <!--Error Message-->\n                    <div class=\"field-message\">\n                        <div class=\"messages\">\n                            <span class=\"error-text\" *ngIf=\"(form.controls[control.key].dirty || control.dirty) && form.controls[control.key].errors?.required\">{{ form.controls[control.key].label | uppercase }} is required</span>\n                            <span class=\"error-text\" *ngIf=\"(form.controls[control.key].dirty || control.dirty) && (form.controls[control.key].errors?.custom)\">{{ form.controls[control.key].errors.custom }}</span>\n                            <!--Field Hint-->\n                            <span class=\"description\" *ngIf=\"form.controls[control.key].description\">\n                                {{ form.controls[control.key].description }}\n                            </span>\n                        </div>\n                    </div>\n                    <!--Tip Wel-->\n                    <novo-tip-well *ngIf=\"form.controls[control.key].tipWell\" [name]=\"control.key\" [tip]=\"form.controls[control.key]?.tipWell?.tip\" [icon]=\"form.controls[control.key]?.tipWell?.icon\" [button]=\"form.controls[control.key]?.tipWell?.button\"></novo-tip-well>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoCustomControlContainerElement.ctorParameters = function () { return []; };
NovoCustomControlContainerElement.propDecorators = {
    'control': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
};
exports.NovoCustomControlContainerElement = NovoCustomControlContainerElement;
var NovoControlElement = (function (_super) {
    __extends(NovoControlElement, _super);
    function NovoControlElement(element, labels, dateFormatService, fieldInteractionApi) {
        var _this = _super.call(this, element) || this;
        _this.labels = labels;
        _this.dateFormatService = dateFormatService;
        _this.fieldInteractionApi = fieldInteractionApi;
        _this.condensed = false;
        _this.change = new core_1.EventEmitter();
        _this._blurEmitter = new core_1.EventEmitter();
        _this._focusEmitter = new core_1.EventEmitter();
        _this._focused = false;
        _this._enteredText = '';
        _this.formattedValue = '';
        _this.maxLengthMet = false;
        _this.characterCount = 0;
        return _this;
    }
    Object.defineProperty(NovoControlElement.prototype, "onBlur", {
        get: function () {
            return this._blurEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "onFocus", {
        get: function () {
            return this._focusEmitter.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "showFieldMessage", {
        get: function () {
            return !this.errors && !this.maxLengthMet && Helpers_1.Helpers.isBlank(this.control.description);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "showCount", {
        get: function () {
            return this.form.controls[this.control.key].maxlength && this.focused && (this.form.controls[this.control.key].controlType === 'text-area' || this.form.controls[this.control.key].controlType === 'textbox');
        },
        enumerable: true,
        configurable: true
    });
    NovoControlElement.prototype.ngOnInit = function () {
        var _this = this;
        // Make sure to initially format the time controls
        if (this.control && this.form.controls[this.control.key].value) {
            if (this.form.controls[this.control.key].controlType === 'textbox' || this.form.controls[this.control.key].controlType === 'text-area') {
                this.characterCount = this.form.controls[this.control.key].value.length;
            }
        }
        if (this.control) {
            // Listen to clear events
            this.forceClearSubscription = this.control.forceClear.subscribe(function () {
                _this.clearValue();
            });
            // Subscribe to control interactions
            if (this.control.interactions) {
                var _loop_1 = function (interaction) {
                    switch (interaction.event) {
                        case 'blur':
                            this_1.valueChangeSubscription = this_1.onBlur.debounceTime(300).subscribe(function () {
                                _this.executeInteraction(interaction);
                            });
                            break;
                        case 'focus':
                            this_1.valueChangeSubscription = this_1.onFocus.debounceTime(300).subscribe(function () {
                                _this.executeInteraction(interaction);
                            });
                            break;
                        case 'change':
                            this_1.valueChangeSubscription = this_1.form.controls[this_1.control.key].valueChanges.debounceTime(300).subscribe(function () {
                                _this.executeInteraction(interaction);
                            });
                            break;
                        case 'init':
                            interaction.invokeOnInit = true;
                            break;
                        default:
                            break;
                    }
                    if (interaction.invokeOnInit) {
                        this_1.executeInteraction(interaction);
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = this.control.interactions; _i < _a.length; _i++) {
                    var interaction = _a[_i];
                    _loop_1(interaction);
                }
            }
        }
        if (this.form.controls[this.control.key] && this.form.controls[this.control.key].subType === 'percentage') {
            if (!Helpers_1.Helpers.isEmpty(this.form.controls[this.control.key].value)) {
                this.percentValue = Number((this.form.controls[this.control.key].value * 100).toFixed(6).replace(/\.?0*$/, ''));
            }
            this.percentChangeSubscription = this.form.controls[this.control.key].displayValueChanges.subscribe(function (value) {
                if (!Helpers_1.Helpers.isEmpty(value)) {
                    _this.percentValue = Number((value * 100).toFixed(6).replace(/\.?0*$/, ''));
                }
            });
        }
    };
    NovoControlElement.prototype.executeInteraction = function (interaction) {
        var _this = this;
        if (interaction.script && Helpers_1.Helpers.isFunction(interaction.script)) {
            setTimeout(function () {
                _this.fieldInteractionApi.form = _this.form;
                _this.fieldInteractionApi.currentKey = _this.control.key;
                try {
                    interaction.script(_this.fieldInteractionApi, _this.control.key);
                }
                catch (err) {
                    console.info('Field Interaction Error!', _this.control.key); // tslint:disable-line
                    console.error(err); // tslint:disable-line
                }
            });
        }
    };
    NovoControlElement.prototype.ngOnDestroy = function () {
        // Unsubscribe from control interactions
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
        // if (this.dateChangeSubscription) {
        //     this.dateChangeSubscription.unsubscribe();
        // }
        if (this.forceClearSubscription) {
            // Un-listen for clear events
            this.forceClearSubscription.unsubscribe();
        }
        if (this.percentChangeSubscription) {
            // Un-listen for clear events
            this.percentChangeSubscription.unsubscribe();
        }
        if (this.dateChangeSubscription) {
            this.dateChangeSubscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    Object.defineProperty(NovoControlElement.prototype, "errors", {
        get: function () {
            return this.form.controls[this.control.key].errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "isValid", {
        get: function () {
            return this.form.controls[this.control.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "isDirty", {
        get: function () {
            return this.form.controls[this.control.key].dirty || this.control.dirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "hasValue", {
        get: function () {
            return !Helpers_1.Helpers.isEmpty(this.form.value[this.control.key]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "focused", {
        get: function () {
            return this._focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "tooltip", {
        get: function () {
            return this.form.controls[this.control.key].tooltip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "tooltipPosition", {
        get: function () {
            if (Helpers_1.Helpers.isBlank(this.form.controls[this.control.key].tooltipPosition)) {
                return 'right';
            }
            return this.form.controls[this.control.key].tooltipPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "alwaysActive", {
        get: function () {
            // Controls that have the label active if there is any user entered text in the field
            if (this.form.controls[this.control.key].controlType === 'picker' && this._enteredText.length) {
                return true;
            }
            // Controls that always have the label active
            return ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'quick-note'].indexOf(this.form.controls[this.control.key].controlType) !== -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoControlElement.prototype, "requiresExtraSpacing", {
        get: function () {
            // Chips
            if (this.form.controls[this.control.key].controlType === 'picker' && this.form.controls[this.control.key].multiple && this.hasValue) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    NovoControlElement.prototype.handleTyping = function (event) {
        this._focused = event && event.length;
        this._enteredText = event;
    };
    NovoControlElement.prototype.handleFocus = function (event) {
        this._focused = true;
        this._focusEmitter.emit(event);
    };
    NovoControlElement.prototype.handleBlur = function (event) {
        this._focused = false;
        this._blurEmitter.emit(event);
    };
    NovoControlElement.prototype.clearValue = function () {
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
    };
    NovoControlElement.prototype.handleTextAreaInput = function (event) {
        this.emitChange(event);
        this.restrictKeys(event);
    };
    NovoControlElement.prototype.checkMaxLength = function (event) {
        if (this.control && this.form.controls[this.control.key].maxlength) {
            this.characterCount = event.target.value.length;
            this.maxLengthMet = event.target.value.length >= this.form.controls[this.control.key].maxlength;
        }
    };
    NovoControlElement.prototype.modelChangeWithRaw = function (event) {
        if (Helpers_1.Helpers.isEmpty(event.value)) {
            this._focused = false;
            this._enteredText = '';
        }
        this.form.controls[this.control.key].rawValue = event.rawValue;
        this.change.emit(event.value);
    };
    NovoControlElement.prototype.modelChange = function (value) {
        if (Helpers_1.Helpers.isEmpty(value)) {
            this._focused = false;
            this._enteredText = '';
        }
        this.change.emit(value);
    };
    NovoControlElement.prototype.restrictKeys = function (event) {
        var NUMBERS_ONLY = /[0-9\-]/;
        var NUMBERS_WITH_DECIMAL = /[0-9\.\-]/;
        var UTILITY_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        var key = event.key;
        // Types
        if (this.form.controls[this.control.key].subType === 'number' && !(NUMBERS_ONLY.test(key) || UTILITY_KEYS.includes(key))) {
            event.preventDefault();
        }
        else if (~['currency', 'float', 'percentage'].indexOf(this.form.controls[this.control.key].subType) && !(NUMBERS_WITH_DECIMAL.test(key) || UTILITY_KEYS.includes(key))) {
            event.preventDefault();
        }
        // Max Length
        if (this.form.controls[this.control.key].maxlength && event.target.value.length >= this.form.controls[this.control.key].maxlength) {
            event.preventDefault();
        }
    };
    NovoControlElement.prototype.handlePercentChange = function (event) {
        var value = event.target['value'];
        var percent = Helpers_1.Helpers.isEmpty(value) ? null : Number((value / 100).toFixed(6).replace(/\.?0*$/, ''));
        if (!Helpers_1.Helpers.isEmpty(percent)) {
            this.change.emit(percent);
            this.form.controls[this.control.key].setValue(percent);
        }
        else {
            this.change.emit(null);
            this.form.controls[this.control.key].setValue(null);
        }
    };
    NovoControlElement.prototype.handleTabForPickers = function (event) {
        if (this.active && event && event.keyCode) {
            if (event.keyCode === KeyCodes_1.KeyCodes.ESC || event.keyCode === KeyCodes_1.KeyCodes.TAB) {
                this.toggleActive(event, false);
            }
        }
    };
    NovoControlElement.prototype.emitChange = function (value) {
        this.change.emit(value);
        this.checkMaxLength(value);
    };
    return NovoControlElement;
}(OutsideClick_1.OutsideClick));
NovoControlElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-control',
                template: "\n        <div class=\"novo-control-container\" [formGroup]=\"form\" [hidden]=\"form.controls[control.key].hidden || form.controls[control.key].type === 'hidden' || form.controls[control.key].controlType === 'hidden'\">\n            <!--Encrypted Field-->\n            <span [tooltip]=\"labels.encryptedFieldTooltip\" [tooltipPosition]=\"'right'\"><i [hidden]=\"!form.controls[control.key].encrypted\"\n            class=\"bhi-lock\"></i></span>\n            <!--Label (for horizontal)-->\n            <label [attr.for]=\"control.key\" *ngIf=\"form.layout !== 'vertical' && form.controls[control.key].label && !condensed\" [ngClass]=\"{'encrypted': form.controls[control.key].encrypted }\">\n                {{ form.controls[control.key].label }}\n            </label>\n            <div class=\"novo-control-outer-container\">\n                <!--Label (for vertical)-->\n                <label\n                    *ngIf=\"form.layout === 'vertical' && form.controls[control.key].label && !condensed\"\n                    class=\"novo-control-label\"\n                    [attr.for]=\"control.key\"\n                    [class.novo-control-empty]=\"!hasValue\"\n                    [class.novo-control-focused]=\"focused\"\n                    [class.novo-control-filled]=\"hasValue\"\n                    [class.novo-control-always-active]=\"alwaysActive || form.controls[control.key].placeholder\"\n                    [class.novo-control-extra-spacing]=\"requiresExtraSpacing\">\n                    {{ form.controls[control.key].label }}\n                </label>\n                <div class=\"novo-control-inner-container\">\n                    <div class=\"novo-control-inner-input-container\">\n                        <!--Required Indicator-->\n                        <i [hidden]=\"!form.controls[control.key].required || form.controls[control.key].readOnly\"\n                            class=\"required-indicator\"\n                            [ngClass]=\"{'bhi-circle': !isValid, 'bhi-check': isValid}\" *ngIf=\"!condensed || form.controls[control.key].required\">\n                        </i>\n                        <!--Form Controls-->\n                        <div class=\"novo-control-input {{ form.controls[control.key].controlType }}\" [ngSwitch]=\"form.controls[control.key].controlType\" [attr.data-automation-id]=\"control.key\" [class.control-disabled]=\"form.controls[control.key].disabled\">\n                            <!--Text-based Inputs-->\n                            <!--TODO prefix/suffix on the control-->\n                            <div class=\"novo-control-input-container novo-control-input-with-label\" *ngSwitchCase=\"'textbox'\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\">\n                                <input *ngIf=\"form.controls[control.key].type !== 'number'\" [formControlName]=\"control.key\" [id]=\"control.key\" [type]=\"form.controls[control.key].type\" [placeholder]=\"form.controls[control.key].placeholder\" (input)=\"emitChange($event)\" [maxlength]=\"form.controls[control.key].maxlength\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\">\n                                <input *ngIf=\"form.controls[control.key].type === 'number' && form.controls[control.key].subType !== 'percentage'\" [formControlName]=\"control.key\" [id]=\"control.key\" [type]=\"form.controls[control.key].type\" [placeholder]=\"form.controls[control.key].placeholder\" (keydown)=\"restrictKeys($event)\" (input)=\"emitChange($event)\" [maxlength]=\"form.controls[control.key].maxlength\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" step=\"any\" (mousewheel)=\"numberInput.blur()\" #numberInput>\n                                <input *ngIf=\"form.controls[control.key].type === 'number' && form.controls[control.key].subType === 'percentage'\" [type]=\"form.controls[control.key].type\" [placeholder]=\"form.controls[control.key].placeholder\" (keydown)=\"restrictKeys($event)\" [value]=\"percentValue\" (input)=\"handlePercentChange($event)\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" step=\"any\" (mousewheel)=\"percentInput.blur()\" #percentInput>\n                                <label class=\"input-label\" *ngIf=\"form.controls[control.key].subType === 'currency'\">{{ control.currencyFormat }}</label>\n                                <label class=\"input-label\" *ngIf=\"form.controls[control.key].subType === 'percentage'\">%</label>\n                            </div>\n                            <!--TextArea-->\n                            <textarea *ngSwitchCase=\"'text-area'\" [name]=\"control.key\" [attr.id]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [formControlName]=\"control.key\" autosize (input)=\"handleTextAreaInput($event)\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" [maxlength]=\"control.maxlength\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></textarea>\n                            <!--Editor-->\n                            <novo-editor *ngSwitchCase=\"'editor'\" [name]=\"control.key\" [formControlName]=\"control.key\" [minimal]=\"control.minimal\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\"></novo-editor>\n                            <!--HTML5 Select-->\n                            <select [id]=\"control.key\" *ngSwitchCase=\"'native-select'\" [formControlName]=\"control.key\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\">\n                                <option *ngIf=\"form.controls[control.key].placeholder\" value=\"\" disabled selected hidden>{{ form.controls[control.key].placeholder }}</option>\n                                <option *ngFor=\"let opt of form.controls[control.key].options\" [value]=\"opt.key\">{{opt.value}}</option>\n                            </select>\n                            <!--File-->\n                            <novo-file-input *ngSwitchCase=\"'file'\" [formControlName]=\"control.key\" [id]=\"control.key\" [name]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [value]=\"form.controls[control.key].value\" [multiple]=\"form.controls[control.key].multiple\" [layoutOptions]=\"form.controls[control.key].layoutOptions\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></novo-file-input>\n                            <!--Tiles-->\n                            <novo-tiles *ngSwitchCase=\"'tiles'\" [options]=\"control.options\" [formControlName]=\"control.key\" (onChange)=\"modelChange($event)\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></novo-tiles>\n                            <!--Picker-->\n                            <div class=\"novo-control-input-container\" *ngSwitchCase=\"'picker'\">\n                                <novo-picker [config]=\"form.controls[control.key].config\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [parentScrollSelector]=\"form.controls[control.key].parentScrollSelector\" *ngIf=\"!form.controls[control.key].multiple\" (select)=\"modelChange($event);\" (changed)=\"modelChangeWithRaw($event)\" (typing)=\"handleTyping($event)\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></novo-picker>\n                                <chips [source]=\"form.controls[control.key].config\" [type]=\"form.controls[control.key].config.type\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" *ngIf=\"control.multiple\" [closeOnSelect]=\"form.controls[control.key].closeOnSelect\" (changed)=\"modelChangeWithRaw($event)\" (typing)=\"handleTyping($event)\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></chips>\n                            </div>\n                            <!--Novo Select-->\n                            <novo-select *ngSwitchCase=\"'select'\" [options]=\"form.controls[control.key].options\" [headerConfig]=\"form.controls[control.key].headerConfig\" [placeholder]=\"form.controls[control.key].placeholder\" [formControlName]=\"control.key\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" (onSelect)=\"modelChange($event)\"></novo-select>\n                            <!--Radio-->\n                            <div class=\"novo-control-input-container\" *ngSwitchCase=\"'radio'\">\n                                <novo-radio [vertical]=\"vertical\" [name]=\"control.key\" [formControlName]=\"control.key\" *ngFor=\"let option of form.controls[control.key].options\" [value]=\"option.value\" [label]=\"option.label\" [checked]=\"option.value === form.value[control.key]\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" [button]=\"!!option.icon\" [icon]=\"option.icon\" [attr.data-automation-id]=\"control.key + '-' + (option?.label || option?.value)\"></novo-radio>\n                            </div>\n                            <!--Time-->\n                            <div class=\"novo-control-input-container\" *ngSwitchCase=\"'time'\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\">\n                                <novo-time-picker-input [attr.id]=\"control.key\" [name]=\"control.key\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [military]=\"form.controls[control.key].military\"></novo-time-picker-input>\n                            </div>\n                            <!--Date-->\n                            <div class=\"novo-control-input-container\" *ngSwitchCase=\"'date'\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\">\n                                <novo-date-picker-input [attr.id]=\"control.key\" [name]=\"control.key\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\"></novo-date-picker-input>\n                            </div>\n                            <!--Date and Time-->\n                            <div class=\"novo-control-input-container\" *ngSwitchCase=\"'date-time'\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\">\n                                <novo-date-time-picker-input [attr.id]=\"control.key\" [name]=\"control.key\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [military]=\"form.controls[control.key].military\"></novo-date-time-picker-input>\n                            </div>\n                            <!--Address-->\n                            <novo-address *ngSwitchCase=\"'address'\" [formControlName]=\"control.key\"></novo-address>\n                            <!--Checkbox-->\n                            <novo-checkbox *ngSwitchCase=\"'checkbox'\" [formControlName]=\"control.key\" [name]=\"control.key\" [label]=\"control.checkboxLabel\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" [layoutOptions]=\"layoutOptions\"></novo-checkbox>\n                            <!--Checklist-->\n                            <novo-check-list *ngSwitchCase=\"'checklist'\" [formControlName]=\"control.key\" [name]=\"control.key\" [options]=\"form.controls[control.key].options\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" (onSelect)=\"modelChange($event)\"></novo-check-list>\n                            <!--QuickNote-->\n                            <novo-quick-note *ngSwitchCase=\"'quick-note'\" [formControlName]=\"control.key\" [placeholder]=\"form.controls[control.key].placeholder\" [config]=\"form.controls[control.key].config\" (change)=\"modelChange($event)\" [tooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\"></novo-quick-note>\n                            <!--ReadOnly-->\n                            <!--TODO - Handle rendering of different READONLY values-->\n                            <div *ngSwitchCase=\"'read-only'\">{{ form.value[control.key] }}</div>\n                        </div>\n                    </div>\n                    <!--Error Message-->\n                    <div class=\"field-message\" *ngIf=\"!condensed\" [class.has-tip]=\"form.controls[control.key].tipWell\">\n                        <div class=\"messages\">\n                            <span class=\"error-text\" *ngIf=\"showFieldMessage\"></span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && errors?.required\">{{ form.controls[control.key].label | uppercase }} {{ labels.isRequired }}</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && errors?.minlength\">{{ form.controls[control.key].label | uppercase }} {{ labels.minLength }} {{ form.controls[control.key].minlength }}</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && maxLengthMet && focused && !errors?.maxlength\">{{ labels.maxLengthMet }}({{ form.controls[control.key].maxlength }})</span>\n                            <span class=\"error-text\" *ngIf=\"errors?.maxlength\">{{ labels.invalidMaxLength }}({{ form.controls[control.key].maxlength }})</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && errors?.invalidEmail\">{{ form.controls[control.key].label | uppercase }} {{ labels.invalidEmail }}</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && errors?.invalidAddress\">{{ form.controls[control.key].label | uppercase }} {{ labels.invalidAddress }}</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)\">{{ form.controls[control.key].label | uppercase }} {{ labels.isTooLarge }}</span>\n                            <span *ngIf=\"isDirty && errors?.minYear\">{{ form.controls[control.key].label | uppercase }} {{ labels.notValidYear }}</span>\n                            <span class=\"error-text\" *ngIf=\"isDirty && (errors?.custom)\">{{ errors.custom }}</span>\n                            <!--Field Hint-->\n                            <span class=\"description\" *ngIf=\"form.controls[control.key].description\">\n                                {{ form.controls[control.key].description }}\n                            </span>\n                        </div>\n                        <span class=\"character-count\" [class.error]=\"errors?.maxlength\" *ngIf=\"showCount\">{{ characterCount }}/{{ form.controls[control.key].maxlength }}</span>\n                    </div>\n                    <!--Tip Wel-->\n                    <novo-tip-well *ngIf=\"form.controls[control.key].tipWell\" [name]=\"control.key\" [tip]=\"form.controls[control.key]?.tipWell?.tip\" [icon]=\"form.controls[control.key]?.tipWell?.icon\" [button]=\"form.controls[control.key]?.tipWell?.button\"></novo-tip-well>\n                </div>\n                <i *ngIf=\"form.controls[control.key].fieldInteractionloading\" class=\"loading\">\n                    <svg version=\"1.1\"\n                     xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:a=\"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/\"\n                     x=\"0px\" y=\"0px\" width=\"18.2px\" height=\"18.5px\" viewBox=\"0 0 18.2 18.5\" style=\"enable-background:new 0 0 18.2 18.5;\"\n                     xml:space=\"preserve\">\n                    <style type=\"text/css\">\n                        .spinner { fill:#FFFFFF; }\n                    </style>\n                        <path class=\"spinner\" d=\"M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9\n                            c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1\n                            c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z\"/>\n                    </svg>\n                </i>\n            </div>\n        </div>\n    ",
                host: {
                    '[class]': 'form.controls[control.key].controlType',
                    '[attr.data-control-type]': 'form.controls[control.key].controlType',
                    '[class.disabled]': 'form.controls[control.key].readOnly',
                    '[class.hidden]': 'form.controls[control.key].hidden',
                    '[attr.data-control-key]': 'control.key',
                }
            },] },
];
/** @nocollapse */
NovoControlElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: DateFormat_1.DateFormatService, },
    { type: FieldInteractionApi_1.FieldInteractionApi, },
]; };
NovoControlElement.propDecorators = {
    'control': [{ type: core_1.Input },],
    'form': [{ type: core_1.Input },],
    'condensed': [{ type: core_1.Input },],
    'change': [{ type: core_1.Output },],
    'onBlur': [{ type: core_1.Output, args: ['blur',] },],
    'onFocus': [{ type: core_1.Output, args: ['focus',] },],
};
exports.NovoControlElement = NovoControlElement;
//# sourceMappingURL=Control.js.map