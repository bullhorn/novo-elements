"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// APP
var Helpers_1 = require("./../../utils/Helpers");
// Value accessor for the component (supports ngModel)
var TIME_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoTimePickerElement; }),
    multi: true
};
var NovoTimePickerElement = (function () {
    function NovoTimePickerElement() {
        this.military = false;
        this.inline = false;
        this.onSelect = new core_1.EventEmitter();
        this.hours = 12;
        this.minutes = 0;
        this.value = null;
        this.MERIDIANS = ['am', 'pm'];
        this.MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];
        this.HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.onModelChange = function () {
        };
        this.onModelTouched = function () {
        };
    }
    NovoTimePickerElement.prototype.ngOnInit = function () {
        if (this.military) {
            this.HOURS = ['0'].concat(this.HOURS, ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']);
        }
        this.ngOnChanges();
    };
    NovoTimePickerElement.prototype.ngOnChanges = function (changes) {
        if (this.model) {
            this.init(this.model, false);
        }
        else {
            this.init(new Date(), false);
        }
    };
    NovoTimePickerElement.prototype.init = function (value, dispatch) {
        var _value = new Date(value);
        var hours = _value.getHours();
        var minutes = _value.getMinutes();
        if (!this.military) {
            this.meridian = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours || 12;
        }
        minutes = minutes < 10 ? "0" + minutes : minutes;
        this.setHours(null, hours, dispatch);
        this.setMinutes(null, minutes, dispatch);
        this.checkBetween(minutes);
    };
    NovoTimePickerElement.prototype.checkBetween = function (value) {
        this.inBetween = this.MINUTES.indexOf(String(value)) < 0;
    };
    NovoTimePickerElement.prototype.setHours = function (event, hours, dispatch) {
        Helpers_1.Helpers.swallowEvent(event);
        this.hours = hours;
        this.hoursClass = "hour-" + hours;
        this.activeHour = hours;
        if (dispatch) {
            this.dispatchChange();
        }
    };
    NovoTimePickerElement.prototype.setMinutes = function (event, minutes, dispatch) {
        Helpers_1.Helpers.swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = "min-" + minutes;
        this.activeMinute = minutes;
        this.checkBetween(minutes);
        if (dispatch) {
            this.dispatchChange();
        }
    };
    NovoTimePickerElement.prototype.setPeriod = function (event, period, dispatch) {
        Helpers_1.Helpers.swallowEvent(event);
        this.meridian = period;
        if (dispatch) {
            this.dispatchChange();
        }
    };
    NovoTimePickerElement.prototype.dispatchChange = function () {
        var hours = Number(this.hours);
        if (!this.military) {
            hours = this.meridian === 'pm' ? hours + 12 : hours;
            // Special case for 12
            if (this.meridian === 'pm' && hours === 24) {
                hours = 12;
            }
            else if (this.meridian === 'am' && hours === 12) {
                hours = 0;
            }
        }
        var value = new Date();
        value.setHours(hours);
        value.setMinutes(this.minutes);
        value.setSeconds(0);
        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value,
            text: this.hours + ":" + this.minutes + " " + this.meridian
        });
        this.onModelChange(value);
    };
    // ValueAccessor Functions
    NovoTimePickerElement.prototype.writeValue = function (model) {
        this.model = model;
        if (Helpers_1.Helpers.isDate(model)) {
            this.init(model, false);
        }
    };
    NovoTimePickerElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoTimePickerElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoTimePickerElement;
}());
NovoTimePickerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-time-picker',
                providers: [TIME_PICKER_VALUE_ACCESSOR],
                template: "\n        <div class=\"digital\" [class.inline]=\"inline\" [class.military]=\"military\">\n            <div class=\"digital--inner\">\n                <span class=\"digital--clock\" *ngIf=\"!inline\">\n                    <span class=\"hours\" data-automation-id=\"novo-time-picker-hours\">{{hours}}</span>:<span class=\"minutes\" data-automation-id=\"novo-time-picker-minutes\">{{minutes}}</span>\n                </span>\n                <div class=\"control-block\" *ngIf=\"!military\">\n                    <span *ngFor=\"let period of MERIDIANS\" class=\"digital--period\" [class.active]=\"meridian==period\" (click)=\"setPeriod($event, period, true)\" [attr.data-automation-id]=\"period\">{{period}}</span>\n                </div>\n            </div>\n        </div>\n        <div class=\"analog\">\n            <div class=\"analog--inner\">\n                <div class=\"analog--face\">\n                    <span class=\"analog--center\"></span>\n                    <span class=\"analog--hand--hours\" [ngClass]=\"hoursClass\">\n                        <span class=\"analog--ball\"></span>\n                    </span>\n                    <span class=\"analog--hand--minutes\" [ngClass]=\"minutesClass\">\n                        <span class=\"analog--ball\" [ngClass]=\"{between: inBetween}\"></span>\n                    </span>\n                </div>\n                <div class=\"analog--hours\">\n                    <span *ngFor=\"let hour of HOURS\" class=\"analog--hour\" [ngClass]=\"{active: activeHour == hour}\" (click)=\"setHours($event, hour, true)\" [attr.data-automation-id]=\"hour\">{{hour}}</span>\n                </div>\n                <div class=\"analog--minutes\">\n                    <span *ngFor=\"let minute of MINUTES\" class=\"analog--minute\" [ngClass]=\"{active: activeMinute == minute}\" (click)=\"setMinutes($event, minute, true)\" [attr.data-automation-id]=\"minute\">{{minute}}</span>\n                </div>\n            </div>\n        </div>\n    ",
                host: {
                    '[class.military]': 'military'
                }
            },] },
];
/** @nocollapse */
NovoTimePickerElement.ctorParameters = function () { return []; };
NovoTimePickerElement.propDecorators = {
    'military': [{ type: core_1.Input },],
    'inline': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
};
exports.NovoTimePickerElement = NovoTimePickerElement;
//# sourceMappingURL=TimePicker.js.map