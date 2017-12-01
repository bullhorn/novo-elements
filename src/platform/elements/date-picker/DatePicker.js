"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
// Vendor
var dateFns = require("date-fns");
// APP
var Helpers_1 = require("../../utils/Helpers");
var novo_label_service_1 = require("../../services/novo-label-service");
// Value accessor for the component (supports ngModel)
var DATE_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NovoDatePickerElement; }),
    multi: true
};
;
var NovoDatePickerElement = (function () {
    function NovoDatePickerElement(labels, element) {
        this.labels = labels;
        this.element = element;
        this.weekStart = 0;
        // Select callback for output
        this.onSelect = new core_1.EventEmitter(false);
        // List of all the weekdays
        this.weekdays = [];
        // List of all months
        this.months = [];
        // List of all years (generated in ngOnInit)
        this.years = [];
        // Default view mode (select days)
        this.view = 'days';
        this.rangeSelectMode = 'startDate';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    NovoDatePickerElement.prototype.ngOnInit = function () {
        // Determine the year array
        var now = new Date();
        var start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        var end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
        for (var i = start; i <= end; i++) {
            this.years.push(i);
        }
        // Set weekdays / months
        this.weekdays = this.setupWeekdays();
        this.months = this.labels.getMonths();
        // Set labels
        this.selectedLabel = this.labels.startDate;
        this.selected2Label = this.labels.endDate;
        this.updateView(this.model, false, true);
    };
    NovoDatePickerElement.prototype.ngOnChanges = function (changes) {
        var weekRangeSelectChange = changes['weekRangeSelect'];
        if (weekRangeSelectChange && weekRangeSelectChange.currentValue !== weekRangeSelectChange.previousValue && !weekRangeSelectChange.firstChange) {
            this.clearRange();
        }
        var weekStartChanges = changes['weekStart'];
        if (weekStartChanges && weekStartChanges.currentValue !== weekStartChanges.previousValue && !weekStartChanges.firstChange) {
            this.weekdays = this.setupWeekdays();
            this.updateView(this.model, false, false);
        }
    };
    NovoDatePickerElement.prototype.setupWeekdays = function () {
        var weekdays = this.labels.getWeekdays();
        // Weekstart must be 0-6 (Sunday - Saturday)
        if (!Helpers_1.Helpers.isBlank(this.weekStart) && this.weekStart > 0 && this.weekStart <= 6) {
            var newStart = weekdays.splice(this.weekStart);
            weekdays = newStart.concat(weekdays);
        }
        return weekdays;
    };
    NovoDatePickerElement.prototype.isSelectingRange = function (range, day, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect) {
        if (range && !weekRangeSelect) {
            var isRangeModeEndDate = rangeSelectMode === 'endDate' && (selected && selected2 && dateFns.isAfter(day, selected2) && dateFns.isBefore(day, hoverDay));
            var isRangeModeStartDate = rangeSelectMode === 'startDate' && (selected && selected2 && dateFns.isBefore(day, selected) && dateFns.isAfter(day, hoverDay));
            var isNotSelected = !selected && selected2 && dateFns.isBefore(day, selected2) && dateFns.isAfter(day, hoverDay);
            var isNotSelected2 = selected && !selected2 && dateFns.isAfter(day, selected) && dateFns.isBefore(day, hoverDay);
            return isNotSelected2 || isNotSelected || isRangeModeStartDate || isRangeModeEndDate;
        }
        return false;
    };
    NovoDatePickerElement.prototype.isEndFill = function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected2) && dateFns.isAfter(day, selected);
        }
        return false;
    };
    NovoDatePickerElement.prototype.isStartFill = function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return !dateFns.isSameDay(selected, selected2) && dateFns.isSameDay(day, selected) && dateFns.isBefore(day, selected2);
        }
        return false;
    };
    NovoDatePickerElement.prototype.isFiller = function (range, day, selected, selected2) {
        if (range && selected2 && selected) {
            return (dateFns.isAfter(day, selected) && dateFns.isBefore(day, selected2)) || dateFns.isSameDay(day, selected) || dateFns.isSameDay(day, selected2);
        }
        return false;
    };
    NovoDatePickerElement.prototype.isSelected = function (range, day, selected, selected2) {
        if (range) {
            return day && (selected && (day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear()) || (selected2 && (day.getDate() === selected2.getDate() && day.getMonth() === selected2.getMonth() && day.getFullYear() === selected2.getFullYear())));
        }
        return day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear();
    };
    NovoDatePickerElement.prototype.isDisabled = function (day, start, end) {
        return dateFns.isBefore(day, start) || dateFns.isAfter(day, end);
    };
    NovoDatePickerElement.prototype.updateView = function (date, fireEvents, markedSelected) {
        if (date && date.startDate === null) {
            this.clearRange();
        }
        else {
            if (!date) {
                this.clearRange();
            }
            var value = date ? new Date(date) : new Date();
            value = this.removeTime(value);
            this.month = new Date(value);
            this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });
            var start = new Date(value.getTime());
            start.setDate(1);
            this.removeTime(start.setDate(1));
            this.buildMonth(start, this.month);
            if (markedSelected) {
                this.select(null, { date: value }, fireEvents);
            }
        }
    };
    NovoDatePickerElement.prototype.setToday = function () {
        var tmp = new Date();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    };
    NovoDatePickerElement.prototype.clearRange = function () {
        this.selected = null;
        this.selectedLabel = this.labels.startDate;
        this.selected2 = null;
        this.selected2Label = this.labels.endDate;
    };
    NovoDatePickerElement.prototype.setMonth = function (month) {
        var date = this.month ? this.month : new Date();
        var tmp = dateFns.setMonth(date, month);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    };
    NovoDatePickerElement.prototype.setYear = function (year) {
        var date = this.month ? this.month : new Date();
        var tmp = dateFns.setYear(date, year);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    };
    NovoDatePickerElement.prototype.select = function (event, day, fireEvents) {
        Helpers_1.Helpers.swallowEvent(event);
        if (this.range) {
            if (this.weekRangeSelect) {
                this.selected = dateFns.startOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selected2 = dateFns.endOfWeek(day.date, { weekStartsOn: this.weekStart });
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                // Make sure to fire this, since we default to the current week selected!
                if (!fireEvents && this.weekRangeSelect) {
                    this.fireRangeSelect();
                }
            }
            else if (this.rangeSelectMode === 'startDate') {
                // SET START DATE
                this.selected = dateFns.startOfDay(day.date);
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                if (this.selected2 && dateFns.isAfter(day.date, this.selected2)) {
                    // CLEAR END DATE
                    this.selected2 = null;
                    this.selected2Label = this.labels.endDate;
                }
                if (event) {
                    this.rangeSelectMode = 'endDate';
                }
            }
            else if (this.rangeSelectMode === 'endDate') {
                // SET END DATE
                this.selected2 = dateFns.endOfDay(day.date);
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                if (this.selected && dateFns.isBefore(day.date, this.selected)) {
                    // CLEAR START DATE
                    this.selected = null;
                    this.selectedLabel = this.labels.startDate;
                }
                if (event) {
                    this.rangeSelectMode = 'startDate';
                }
            }
        }
        else {
            this.selected = day.date;
            this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            });
            this.updateHeading();
        }
        if (fireEvents && this.selected) {
            // Emit our output
            if (this.range && this.selected && this.selected2) {
                this.fireRangeSelect();
                // Also, update the ngModel
                this.onModelChange({
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null
                });
                this.model = {
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null
                };
            }
            if (!this.range) {
                this.onSelect.next({
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected
                });
                // Also, update the ngModel
                this.onModelChange(this.selected);
                this.model = this.selected;
            }
        }
    };
    NovoDatePickerElement.prototype.fireRangeSelect = function () {
        // Make sure the start date is before the end date
        if (dateFns.isBefore(this.selected, this.selected2)) {
            this.onSelect.next({
                startDate: {
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected
                },
                endDate: {
                    month: this.labels.formatDateWithFormat(this.selected2, { month: 'long' }),
                    year: this.selected2.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected2, { weekday: 'long' }),
                    date: this.selected2
                }
            });
        }
    };
    NovoDatePickerElement.prototype.open = function (event, type) {
        var _this = this;
        Helpers_1.Helpers.swallowEvent(event);
        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        }
        else {
            this.view = type;
        }
        // Make sure to scroll the selected one into view
        if (this.view === 'years' || this.view === 'months') {
            setTimeout(function () {
                var container = _this.element.nativeElement.querySelector(".calendar-content." + _this.view);
                var selectedItem = _this.element.nativeElement.querySelector(".calendar-content." + _this.view + " ." + (_this.view === 'years' ? 'year' : 'month') + ".selected");
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }
        this.updateHeading();
    };
    NovoDatePickerElement.prototype.prevMonth = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        var tmp = dateFns.subMonths(this.month, 1);
        this.updateView(tmp, false, false);
    };
    NovoDatePickerElement.prototype.nextMonth = function (event) {
        Helpers_1.Helpers.swallowEvent(event);
        var tmp = dateFns.addMonths(this.month, 1);
        this.updateView(tmp, false, false);
    };
    NovoDatePickerElement.prototype.updateHeading = function () {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
            year: this.selected.getFullYear(),
            day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
            date: this.selected.getDate()
        };
    };
    /**
     * Remove the time aspect of the date
     * @param date
     * @returns with time stripped out
     */
    NovoDatePickerElement.prototype.removeTime = function (date) {
        var ret = new Date(date);
        ret.setHours(12);
        ret.setSeconds(0);
        ret.setMilliseconds(0);
        return ret;
    };
    NovoDatePickerElement.prototype.buildMonth = function (start, month) {
        // Reset the weeks
        this.weeks = [];
        // House keeping variables to know when we are done building the month
        var done = false, date = dateFns.startOfWeek(start, { weekStartsOn: this.weekStart }), monthIndex = date.getMonth(), count = 0;
        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });
            // Increment variables for the next iteration
            date = dateFns.addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    };
    NovoDatePickerElement.prototype.buildWeek = function (date, month) {
        // Build out of the days of the week
        var days = [];
        // Iterate over the days of the week
        for (var i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: this.weekdays[i],
                number: date.getDate(),
                isToday: dateFns.isToday(date),
                date: date
            });
            // Increment for the next iteration
            date = dateFns.addDays(date, 1);
        }
        return days;
    };
    NovoDatePickerElement.prototype.toggleRangeSelect = function (range) {
        this.rangeSelectMode = range;
    };
    NovoDatePickerElement.prototype.rangeHover = function (event, day) {
        this.hoverDay = day.date;
    };
    // ValueAccessor Functions
    NovoDatePickerElement.prototype.writeValue = function (model) {
        this.model = model;
        if (Helpers_1.Helpers.isDate(model)) {
            this.updateView(model, false, true);
        }
    };
    NovoDatePickerElement.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    NovoDatePickerElement.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    return NovoDatePickerElement;
}());
NovoDatePickerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-date-picker',
                providers: [DATE_PICKER_VALUE_ACCESSOR],
                animations: [
                    animations_1.trigger('startDateTextState', [
                        animations_1.state('startDate', animations_1.style({
                            'opacity': '1.0'
                        })),
                        animations_1.state('endDate', animations_1.style({
                            'opacity': '0.6'
                        })),
                        animations_1.transition('startDate <=> endDate', animations_1.animate('200ms ease-in'))
                    ]),
                    animations_1.trigger('endDateTextState', [
                        animations_1.state('startDate', animations_1.style({
                            'opacity': '0.6'
                        })),
                        animations_1.state('endDate', animations_1.style({
                            'opacity': '1.0'
                        })),
                        animations_1.transition('startDate <=> endDate', animations_1.animate('200ms ease-in'))
                    ]),
                    animations_1.trigger('indicatorState', [
                        animations_1.state('startDate', animations_1.style({
                            'transform': 'translateX(0%)'
                        })),
                        animations_1.state('endDate', animations_1.style({
                            'transform': 'translateX(100%)'
                        })),
                        animations_1.transition('startDate <=> endDate', animations_1.animate('200ms ease-in'))
                    ])
                ],
                template: "\n        <div class=\"calendar\">\n            <div class=\"calendar-top\" *ngIf=\"!inline && !range\">\n                <h4 class=\"day\" [attr.data-automation-id]=\"heading?.day\">{{heading?.day}}</h4>\n                <h2 class=\"month\" [attr.data-automation-id]=\"heading?.month\">{{heading?.month}}</h2>\n                <h1 class=\"date\" [attr.data-automation-id]=\"heading?.date\">{{heading?.date}}</h1>\n                <h3 class=\"year\" [attr.data-automation-id]=\"heading?.year\">{{heading?.year}}</h3>\n            </div>\n            <div class=\"date-range-tabs\" *ngIf=\"range\" [class.week-select-mode]=\"weekRangeSelect\">\n                <span class=\"range-tab\" (click)=\"toggleRangeSelect('startDate')\" [@startDateTextState]=\"rangeSelectMode\" data-automation-id=\"calendar-start-date\">{{selectedLabel}}</span>\n                <span class=\"range-tab\" (click)=\"toggleRangeSelect('endDate')\" [@endDateTextState]=\"rangeSelectMode\" data-automation-id=\"calendar-end-date\">{{selected2Label}}</span>\n                <i class=\"indicator\" [@indicatorState]=\"rangeSelectMode\"></i>\n            </div>\n            <div class=\"calendar-header\">\n                <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\"></span>\n                <span class=\"heading\">\n                    <span class=\"month\" (click)=\"open($event, 'months')\" data-automation-id=\"header-month\">{{monthLabel}}</span>\n                    <span class=\"year\" (click)=\"open($event, 'years')\" data-automation-id=\"header-year\">{{month?.getFullYear()}}</span>\n                </span>\n                <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n            </div>\n            <table class=\"calendar-content days\" cellspacing=\"0\" cellpadding=\"0\" [hidden]=\"!(view=='days')\">\n                <thead>\n                    <tr>\n                        <th *ngFor=\"let day of weekdays\" title=\"{{day}}\" class=\"weekday\" [attr.data-automation-id]=\"day.substr(0, 2)\">{{day.substr(0, 2)}}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let week of weeks\">\n                        <td *ngFor=\"let day of week.days\" [ngClass]=\"{\n                            today: day.isToday,\n                            'notinmonth': day.date.getMonth() !== this.month.getMonth(),\n                            selected: isSelected(range, day.date, selected, selected2),\n                            filler: isFiller(range, day.date, selected, selected2),\n                            startfill: isStartFill(range, day.date, selected, selected2),\n                            endfill: isEndFill(range, day.date, selected, selected2),\n                            'selecting-range': isSelectingRange(range, day.date, selected, selected2, hoverDay, rangeSelectMode, weekRangeSelect)\n                           }\" (click)=\"select($event, day, true)\" (mouseover)=\"rangeHover($event, day)\" [attr.data-automation-id]=\"day.number\">\n                            <button class=\"day\" [attr.data-automation-id]=\"day.number\" [disabled]=\"isDisabled(day.date, start, end)\">{{day.number}}</button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n            <section class=\"calendar-content months\" [hidden]=\"view !== 'months'\">\n                <div *ngFor=\"let month of months;let i = index\" (click)=\"setMonth(i)\">\n                    <div class=\"month\" [ngClass]=\"{selected: i === selected?.getMonth()}\" [attr.data-automation-id]=\"month\">{{month}}</div>\n                </div>\n            </section>\n            <section class=\"calendar-content years\" [hidden]=\"view !== 'years'\">\n                <div *ngFor=\"let year of years\" (click)=\"setYear(year)\">\n                    <div class=\"year\" [ngClass]=\"{selected: year == selected?.getFullYear()}\" [attr.data-automation-id]=\"year\">{{year}}</div>\n                </div>\n            </section>\n            <div class=\"calendar-footer\">\n                <span (click)=\"setToday()\" class=\"today\" data-automation-id=\"calendar-today\">{{ labels.today }}</span>\n            </div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
NovoDatePickerElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
    { type: core_1.ElementRef, },
]; };
NovoDatePickerElement.propDecorators = {
    'minYear': [{ type: core_1.Input },],
    'maxYear': [{ type: core_1.Input },],
    'start': [{ type: core_1.Input },],
    'end': [{ type: core_1.Input },],
    'inline': [{ type: core_1.Input },],
    'range': [{ type: core_1.Input },],
    'weekRangeSelect': [{ type: core_1.Input },],
    'weekStart': [{ type: core_1.Input },],
    'onSelect': [{ type: core_1.Output },],
    'template': [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
};
exports.NovoDatePickerElement = NovoDatePickerElement;
//# sourceMappingURL=DatePicker.js.map