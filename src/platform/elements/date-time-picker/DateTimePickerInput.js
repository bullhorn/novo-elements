"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var keycodes_1 = require("@angular/cdk/keycodes");
var Overlay_1 = require("../overlay/Overlay");
var novo_label_service_1 = require("../../services/novo-label-service");
var DateFormat_1 = require("../../services/date-format/DateFormat");
var Helpers_1 = require("../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var DATE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoDateTimePickerInputElement; }),
    multi: true
};
var NovoDateTimePickerInputElement = (function () {
    function NovoDateTimePickerInputElement(element, labels, dateFormatService, _changeDetectorRef) {
        this.element = element;
        this.labels = labels;
        this.dateFormatService = dateFormatService;
        this._changeDetectorRef = _changeDetectorRef;
        /** View -> model callback called when value changes */
        this._onChange = function () { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = function () { };
        this.military = false;
        this.maskOptions = {
            mask: this.dateFormatService.getDateMask(),
            keepCharPositions: true,
            guide: false
        };
        this.placeholder = this.labels.dateFormatPlaceholder;
    }
    /** BEGIN: Convienient Panel Methods. */
    NovoDateTimePickerInputElement.prototype.openPanel = function () {
        this.overlay.openPanel();
    };
    NovoDateTimePickerInputElement.prototype.closePanel = function () {
        this.overlay.closePanel();
    };
    Object.defineProperty(NovoDateTimePickerInputElement.prototype, "panelOpen", {
        get: function () {
            return this.overlay && this.overlay.panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    /** END: Convienient Panel Methods. */
    NovoDateTimePickerInputElement.prototype._handleKeydown = function (event) {
        if ((event.keyCode === keycodes_1.ESCAPE || event.keyCode === keycodes_1.ENTER || event.keyCode === keycodes_1.TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    };
    NovoDateTimePickerInputElement.prototype._handleInput = function (event) {
        if (document.activeElement === event.target) {
            this._onChange(event.target.value);
            var _a = this.dateFormatService.parseString(event.target.value, false, 'date'), dateTimeValue = _a[0], formatted = _a[1];
            if (dateTimeValue && dateTimeValue.getTime() > 0) {
                this._setTriggerValue(dateTimeValue);
            }
            this.openPanel();
        }
    };
    NovoDateTimePickerInputElement.prototype.writeValue = function (value) {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._setTriggerValue(value); });
    };
    NovoDateTimePickerInputElement.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    NovoDateTimePickerInputElement.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    NovoDateTimePickerInputElement.prototype._setTriggerValue = function (value) {
        var toDisplay = value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        var inputValue = toDisplay !== null ? toDisplay : '';
        // If it's used within a `MdFormField`, we should set it through the property so it can go
        // through change detection.
        //this._element.nativeElement.value = inputValue;
        this.value = inputValue;
        this.formattedValue = this.formatDateValue(inputValue);
        this._changeDetectorRef.markForCheck();
    };
    NovoDateTimePickerInputElement.prototype.setValue = function (event) {
        if (event && event.date) {
            this._setTriggerValue(event.date);
            this._onChange(event.date);
        }
    };
    NovoDateTimePickerInputElement.prototype.setValueAndClose = function (event) {
        this.setValue(event);
        this.closePanel();
    };
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    NovoDateTimePickerInputElement.prototype.clearValue = function (skip) {
        this.writeValue(null);
        this._onChange(null);
    };
    NovoDateTimePickerInputElement.prototype.formatDateValue = function (value) {
        if (!value) {
            return '';
        }
        return this.labels.formatDateWithFormat(value, {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };
    Object.defineProperty(NovoDateTimePickerInputElement.prototype, "hasValue", {
        get: function () {
            return !Helpers_1.Helpers.isEmpty(this.value);
        },
        enumerable: true,
        configurable: true
    });
    return NovoDateTimePickerInputElement;
}());
NovoDateTimePickerInputElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-date-time-picker-input',
                providers: [DATE_VALUE_ACCESSOR],
                template: "\n        <input type=\"text\" [name]=\"name\" [value]=\"formattedValue\" [placeholder]=\"placeholder\" (focus)=\"openPanel()\" (keydown)=\"_handleKeydown($event)\" (input)=\"_handleInput($event)\" #input readOnly/>\n        <i *ngIf=\"!hasValue\" (click)=\"openPanel()\" class=\"bhi-calendar\"></i>\n        <i *ngIf=\"hasValue\" (click)=\"clearValue()\" class=\"bhi-times\"></i>\n\n        <novo-overlay-template [parent]=\"element\">\n            <novo-date-time-picker inline=\"true\" (onSelect)=\"setValue($event)\" [ngModel]=\"value\" [military]=\"military\"></novo-date-time-picker>\n        </novo-overlay-template>\n  "
            },] },
];
/** @nocollapse */
NovoDateTimePickerInputElement.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: novo_label_service_1.NovoLabelService, },
    { type: DateFormat_1.DateFormatService, },
    { type: core_1.ChangeDetectorRef, },
]; };
NovoDateTimePickerInputElement.propDecorators = {
    'name': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'maskOptions': [{ type: core_1.Input },],
    'military': [{ type: core_1.Input },],
    'overlay': [{ type: core_1.ViewChild, args: [Overlay_1.NovoOverlayTemplate,] },],
};
exports.NovoDateTimePickerInputElement = NovoDateTimePickerInputElement;
//# sourceMappingURL=DateTimePickerInput.js.map