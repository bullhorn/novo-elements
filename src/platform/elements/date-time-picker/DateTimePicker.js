"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Vendor
var dateFns = require("date-fns");
// APP
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
// Value accessor for the component (supports ngModel)
var DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoDateTimePickerElement; }),
    multi: true
};
var NovoDateTimePickerElement = (function () {
    function NovoDateTimePickerElement(labels, element) {
        this.labels = labels;
        this.element = element;
        // Select callback for output
        this.onSelect = new core_1.EventEmitter(false);
        this.componentTabState = 'date';
        this.datePickerValue = new Date();
        this.timePickerValue = new Date();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    NovoDateTimePickerElement.prototype.toggleView = function (tab) {
        this.componentTabState = tab;
    };
    NovoDateTimePickerElement.prototype.setDateLabels = function (value) {
        this.selectedLabel = this.labels.formatDateWithFormat(value, {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };
    NovoDateTimePickerElement.prototype.setTimeLabels = function (value) {
        var hours = value.getHours();
        var minutes = value.getMinutes();
        this.meridian = value.toLocaleTimeString().slice(-2);
        if (!this.military) {
            hours = this.meridian === 'PM' && hours > 12 ? hours - 12 : hours;
            // Special case for 12
            if (this.meridian === 'PM' && hours === 24) {
                hours = 12;
            }
            else if (this.meridian === 'AM' && hours === 0) {
                hours = 12;
            }
        }
        this.hours = hours.toString().length === 1 ? "0" + hours.toString() : hours.toString();
        this.minutes = minutes.toString().length === 1 ? "0" + minutes.toString() : minutes.toString();
    };
    NovoDateTimePickerElement.prototype.onDateSelected = function (event) {
        this.datePickerValue = event.date;
        this.model = this.createFullDateValue(this.datePickerValue, this.timePickerValue);
        this.setDateLabels(this.model);
        this.onModelChange(this.model);
        this.onSelect.emit({ date: this.model });
        this.toggleView('time');
    };
    NovoDateTimePickerElement.prototype.onTimeSelected = function (event) {
        this.timePickerValue = event.date;
        this.model = this.createFullDateValue(this.datePickerValue, this.timePickerValue);
        this.setTimeLabels(this.model);
        this.onModelChange(this.model);
        this.onSelect.emit({ date: this.model });
    };
    NovoDateTimePickerElement.prototype.createFullDateValue = function (datePickerValue, timePickerValue) {
        return dateFns.setMilliseconds(dateFns.setSeconds(dateFns.setMinutes(dateFns.setHours(datePickerValue, dateFns.getHours(timePickerValue)), dateFns.getMinutes(timePickerValue)), dateFns.getSeconds(timePickerValue)), dateFns.getMilliseconds(timePickerValue));
    };
    // ValueAccessor Functions
    NovoDateTimePickerElement.prototype.writeValue = function (model) {
        this.model = model;
        if (Helpers_1.Helpers.isEmpty(model)) {
            this.model = new Date();
        }
        else if (!isNaN(model)) {
            this.model = new Date(model);
        }
        this.datePickerValue = this.model;
        this.timePickerValue = this.model;
        if (Helpers_1.Helpers.isDate(this.model)) {
            this.setDateLabels(this.model);
            this.setTimeLabels(this.model);
        }
    };
    NovoDateTimePickerElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoDateTimePickerElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoDateTimePickerElement;
}());
NovoDateTimePickerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-date-time-picker',
                providers: [DATE_TIME_PICKER_VALUE_ACCESSOR],
                animations: [
                    core_1.trigger('dateTextState', [
                        core_1.state('date', core_1.style({
                            'opacity': '1.0'
                        })),
                        core_1.state('time', core_1.style({
                            'opacity': '0.6'
                        })),
                        core_1.transition('date <=> time', core_1.animate('200ms ease-in'))
                    ]),
                    core_1.trigger('timeTextState', [
                        core_1.state('date', core_1.style({
                            'opacity': '0.6'
                        })),
                        core_1.state('time', core_1.style({
                            'opacity': '1.0'
                        })),
                        core_1.transition('date <=> time', core_1.animate('200ms ease-in'))
                    ]),
                    core_1.trigger('indicatorState', [
                        core_1.state('date', core_1.style({
                            'transform': 'translateX(0%)'
                        })),
                        core_1.state('time', core_1.style({
                            'transform': 'translateX(100%)'
                        })),
                        core_1.transition('date <=> time', core_1.animate('200ms ease-in'))
                    ]),
                    core_1.trigger('containerState', [
                        core_1.state('date', core_1.style({
                            'transform': 'translateX(0%)'
                        })),
                        core_1.state('time', core_1.style({
                            'transform': 'translateX(-100%)'
                        })),
                        core_1.transition('date <=> time', core_1.animate('200ms ease-in'))
                    ])
                ],
                template: "\n        <div class=\"date-time-container\">\n            <div class=\"date-time-tabs\">\n                <span class=\"date-tab\" (click)=\"toggleView('date')\" [@dateTextState]=\"componentTabState\">{{selectedLabel}}</span>\n                <span class=\"time-tab\" (click)=\"toggleView('time')\" [@timeTextState]=\"componentTabState\">\n                    <span class=\"hours\" data-automation-id=\"novo-time-picker-hours\">{{hours}}</span>:<span\n                    class=\"minutes\" data-automation-id=\"novo-time-picker-minutes\">{{minutes}}</span>\n                    <span *ngIf=\"!military\" class=\"meridian\">{{meridian}}</span>\n                </span>\n                <i class=\"date-time-indicator\" [@indicatorState]=\"componentTabState\"></i>\n            </div>\n            <div class=\"view-container\" [@containerState]=\"componentTabState\">\n                <div class=\"calendar\">\n                    <novo-date-picker (onSelect)=\"onDateSelected($event)\" [(ngModel)]=\"model\" inline=\"true\" [minYear]=\"minYear\" [maxYear]=\"maxYear\" [start]=\"start\" [end]=\"end\"></novo-date-picker>\n                </div>\n                <div class=\"time-picker\">\n                    <novo-time-picker (onSelect)=\"onTimeSelected($event)\" [(ngModel)]=\"model\" [military]=\"military\" inline=\"true\"></novo-time-picker>\n                </div>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoDateTimePickerElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ElementRef, },
]; };
NovoDateTimePickerElement.propDecorators = {
    'minYear': [{ type: core_1.Input },],
    'maxYear': [{ type: core_1.Input },],
    'start': [{ type: core_1.Input },],
    'end': [{ type: core_1.Input },],
    'military': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
};
exports.NovoDateTimePickerElement = NovoDateTimePickerElement;
//# sourceMappingURL=DateTimePicker.js.map