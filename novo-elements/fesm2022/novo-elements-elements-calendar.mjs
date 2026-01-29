import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, SkipSelf, EventEmitter, Output, Input, HostBinding, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/platform-browser';
import { addDays, isToday, isDate, startOfDay, isSameDay, startOfMonth, addMonths, setMonth, setYear, subMonths } from 'date-fns';
import * as i1 from 'novo-elements/services';
import { DateUtil, BooleanInput, Helpers } from 'novo-elements/utils';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { FormsModule } from '@angular/forms';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoPipesModule } from 'novo-elements/pipes';

/** Injection token used to customize the date range selection behavior. */
const NOVO_DATE_SELECTION_STRATEGY = new InjectionToken('NOVO_DATE_SELECTION_STRATEGY');
/** Provides the default date selection behavior. Single Date */
class DefaultDateSelectionStrategy {
    selectionFinished(date, currentValue, event) {
        return [date];
    }
    createPreview(activeDate, [currentDate]) {
        return [activeDate];
    }
    isSelected(activeDate, [currentDate]) {
        return DateUtil.isSameDay(activeDate, currentDate);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DefaultDateSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DefaultDateSelectionStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DefaultDateSelectionStrategy, decorators: [{
            type: Injectable
        }] });
/** @docs-private */
function NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY(parent) {
    return parent || new DefaultDateSelectionStrategy();
}
/** @docs-private */
const NOVO_DATE_SELECTION_STRATEGY_PROVIDER = {
    provide: NOVO_DATE_SELECTION_STRATEGY,
    deps: [[new Optional(), new SkipSelf(), NOVO_DATE_SELECTION_STRATEGY]],
    useFactory: NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY,
};

class MultiDateSelectionStrategy {
    selectionFinished(dateLike, currentValue, event) {
        const date = dateLike;
        const current = new Set(currentValue.map((c) => c.getTime()));
        if (current.has(date.getTime())) {
            current.delete(date.getTime());
        }
        else {
            current.add(date.getTime());
        }
        return [...current].map((c) => new Date(c));
    }
    createPreview(activeDate, currentValue) {
        return [activeDate];
    }
    isSelected(activeDate, currentValue) {
        return currentValue && currentValue.includes(activeDate);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MultiDateSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MultiDateSelectionStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: MultiDateSelectionStrategy, decorators: [{
            type: Injectable
        }] });

class RangeSelectionStrategy {
    selectionFinished(date, currentRange) {
        let [start, end] = currentRange;
        if (start == null) {
            start = date;
        }
        else if (end == null && date && DateUtil.differenceInCalendarDays(date, start) >= 0) {
            end = date;
        }
        else {
            start = date;
            end = null;
        }
        return [start, end];
    }
    createPreview(activeDate, currentRange) {
        let start = null;
        let end = null;
        const [currStart, currEnd] = currentRange;
        if (currStart && !currEnd && activeDate) {
            start = currStart;
            end = activeDate;
        }
        return [start, end];
    }
    isSelected(activeDate, currentRange) {
        const [start, end] = currentRange;
        return DateUtil.isWithinRange(activeDate, start, end);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: RangeSelectionStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: RangeSelectionStrategy }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: RangeSelectionStrategy, decorators: [{
            type: Injectable
        }] });

class WeekSelectionStrategy {
    constructor(weekStartsOn = 0) {
        this.weekStartsOn = weekStartsOn;
    }
    selectionFinished(date) {
        return this._createWeekRange(date);
    }
    createPreview(activeDate) {
        return this._createWeekRange(activeDate);
    }
    _createWeekRange(date) {
        if (date) {
            const { weekStartsOn } = this;
            const start = DateUtil.startOfWeek(date, { weekStartsOn });
            const end = DateUtil.endOfWeek(date, { weekStartsOn });
            return [start, end];
        }
        return [null, null];
    }
    isSelected(activeDate, currentRange) {
        const [start, end] = currentRange;
        return DateUtil.isWithinRange(activeDate, start, end);
    }
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoMonthViewElement {
    get weekStartsOn() {
        return this._weekStartsOn;
    }
    set weekStartsOn(value) {
        this._weekStartsOn = value;
        this.weekdays = this.labels.getWeekdays(value);
        this.updateView(this.activeDate);
    }
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        this.activeDate = new Date();
        // Weekstart must be 0-6 (Sunday - Saturday)
        this.selected = [];
        this.preview = [];
        this.overlays = [];
        this.isRange = false;
        this.hideOverflowDays = false;
        this._weekStartsOn = 0;
        // Select callback for output
        this.select = new EventEmitter(false);
        // Select callback for output
        this.hover = new EventEmitter(false);
        // List of all the weekdays
        this.weekdays = this.labels.getWeekdays(this.weekStartsOn);
        // List of all months
        this.monthNames = this.labels.getMonths();
    }
    ngOnInit() {
        // Set labels
        this.updateView(this.activeDate);
    }
    updateView(date) {
        this.monthLabel = this.labels.formatDateWithFormat(this.activeDate, { month: 'short' });
        this.buildMonth(this.activeDate);
    }
    onSelect(event, day) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, day });
        this.cdr.markForCheck();
    }
    onHover(event, day) {
        this.isRange && this.hover.next({ event, day });
    }
    buildMonth(month) {
        // Reset the weeks
        this.weeks = [];
        const start = DateUtil.startOfMonth(month);
        // House keeping variables to know when we are done building the month
        let done = false;
        let date = DateUtil.startOfWeek(start, { weekStartsOn: this.weekStartsOn });
        let monthIndex = date.getMonth();
        let count = 0;
        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });
            // Increment variables for the next iteration
            date = addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    }
    buildWeek(date, month) {
        // Build out of the days of the week
        const days = [];
        // Iterate over the days of the week
        for (let i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: this.weekdays[i],
                number: date.getDate(),
                isToday: isToday(date),
                date,
            });
            // Increment for the next iteration
            date = addDays(date, 1);
        }
        return days;
    }
    isDisabled(day) {
        return (this.minDate && DateUtil.isBefore(day, this.minDate)) || (this.maxDate && DateUtil.isAfter(day, this.maxDate));
    }
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value) {
        return this.selected && this.selected.find((d) => DateUtil.isSameDay(d, value));
    }
    /** Returns whether a cell should be marked as preview. */
    _isPreview(value) {
        return this.preview && this.preview.find((d) => DateUtil.isSameDay(d, value));
    }
    /** Returns whether a cell should be marked as an overlay. */
    _isOverlay(value) {
        return this.overlays && this.overlays.find((o) => DateUtil.isSameDay(o.date, value));
    }
    /** Returns whether a cell should be marked as an overlay. */
    _hasOverlayType(value) {
        const overlay = this.overlays && this.overlays.find((o) => DateUtil.isSameDay(o.date, value));
        return overlay ? overlay.type : null;
    }
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value) {
        return isStart(value, this.selected, this.isRange);
    }
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value) {
        return isEnd(value, this.selected, this.isRange);
    }
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value) {
        return isInRange(value, this.selected, this.isRange);
    }
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value) {
        return isStart(value, this.preview, this.isRange);
    }
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value) {
        return isEnd(value, this.preview, this.isRange);
    }
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value) {
        return isInRange(value, this.preview, this.isRange);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoMonthViewElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoMonthViewElement, isStandalone: false, selector: "novo-month-view", inputs: { minDate: "minDate", maxDate: "maxDate", activeDate: "activeDate", selected: "selected", preview: "preview", overlays: "overlays", disabledDateMessage: "disabledDateMessage", isRange: "isRange", hideOverflowDays: "hideOverflowDays", weekStartsOn: "weekStartsOn" }, outputs: { select: "select", hover: "hover" }, host: { properties: { "class.hide-overflow-days": "this.hideOverflowDays" } }, ngImport: i0, template: "<div class=\"calendar-table\" cellspacing=\"0\" cellpadding=\"0\">\n  <div class=\"calendar-thead\">\n    <div class=\"calendar-th weekday\" *ngFor=\"let day of weekdays\" title=\"{{ day }}\"\n      [attr.data-automation-id]=\"day.substr(0, 2)\">\n      {{ day.substr(0, 2) }}\n    </div>\n  </div>\n  <div class=\"calendar-body\">\n    <div class=\"calendar-week\" *ngFor=\"let week of weeks\">\n      <div class=\"calendar-date\" *ngFor=\"let day of week.days\"\n        [class.today]=\"day.isToday\"\n        [class.notinmonth]=\"day.date.getMonth() !== activeDate.getMonth()\"\n        [class.selected]=\"_isSelected(day.date)\"\n        [class.preview]=\"_isPreview(day.date)\"\n        [class.overlay]=\"_isOverlay(day.date)\"\n        [class]=\"_hasOverlayType(day.date)\"\n        [class.inRange]=\"_isInRange(day.date)\"\n        [class.rangeStart]=\"_isRangeStart(day.date)\"\n        [class.rangeEnd]=\"_isRangeEnd(day.date)\"\n        [class.inPreview]=\"_isInPreview(day.date)\"\n        [class.previewStart]=\"_isPreviewStart(day.date)\"\n        [class.previewEnd]=\"_isPreviewEnd(day.date)\"\n        [class.calendar-date]=\"true\"\n        [attr.aria-label]=\"day.name\"\n        [attr.aria-disabled]=\"isDisabled(day.date)\"\n        [attr.aria-selected]=\"_isSelected(day.date)\"\n        [attr.data-automation-id]=\"day.number\"\n        [title]=\"isDisabled(day.date) ? disabledDateMessage : ''\"\n        (mouseover)=\"onHover($event, day)\">\n        <novo-button\n          class=\"day\"\n          tabindex=\"0\"\n          [attr.data-automation-id]=\"day.number\"\n          [disabled]=\"isDisabled(day.date)\"\n          (click)=\"onSelect($event, day)\">\n          {{ day.number }}\n        </novo-button>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host{background:var(--background-bright);width:100%;height:min-content;position:relative}:host .calendar-table{display:table}:host .calendar-table .calendar-thead{display:table-header-group}:host .calendar-table .calendar-th{display:table-cell;width:30px;padding:10px 0}:host .calendar-table .calendar-body{display:table-row-group}:host .calendar-table .calendar-week{display:table-row}:host .calendar-table .month,:host .calendar-table .year{text-align:center;padding:4px 15px;color:#666;overflow-x:hidden;text-overflow:ellipsis;margin:5px;font-weight:400;border-radius:3px}:host .calendar-table .month.selected,:host .calendar-table .year.selected{background-color:var(--selection);color:#fff}:host .calendar-table .month:hover,:host .calendar-table .year:hover{cursor:pointer;background-color:var(--selection);color:#fff}:host .calendar-table .day{height:3.2rem;width:3.2rem;line-height:1;font-size:1.2rem;padding:1px;border:none;background-color:transparent;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;transition:box-shadow .14s ease-in-out;position:relative;color:var(--text-main, #3d464d)}:host .calendar-table .day:focus{outline:none}:host .calendar-table .day:disabled{color:var(--text-disabled);cursor:not-allowed!important;box-shadow:none!important}:host .calendar-table .calendar-date{display:table-cell}:host .calendar-table .calendar-date.notinmonth,:host .calendar-table .calendar-date.notinmonth:not(.selected)>.day{color:var(--text-disabled)}:host .calendar-table .calendar-date:hover .day{cursor:pointer;box-shadow:inset 0 0 0 2px var(--selection)}:host .calendar-table .calendar-date.inRange:hover .day{box-shadow:inset 0 0 0 2px #fff}:host .calendar-table .calendar-date.inRange{background:var(--selection);color:#fff;height:3.2rem;width:3.2rem;border-radius:0}:host .calendar-table .calendar-date.inRange .day{color:#fff}:host .calendar-table .calendar-date.rangeStart{border-radius:50% 0 0 50%;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeStart:before{content:\"\";position:absolute;height:100%;background:#4a89dc;width:10px;top:0;right:-5px;z-index:-1}:host .calendar-table .calendar-date.rangeEnd{border-radius:0 50% 50% 0;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeEnd:before{content:\"\";position:absolute;height:100%;background:var(--selection);width:10px;top:0;left:-5px;z-index:-1}:host .calendar-table .calendar-date.selected .day{background:var(--selection);color:#fff}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd) .day{border:1px dashed var(--selection)}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd).selected .day{border:1px dashed #9dbeff}:host .calendar-table .calendar-date.today .day:after{content:\"\";position:absolute;top:0;left:0;border-radius:100%;width:100%;height:100%;max-width:3.2rem;margin:0 auto;box-shadow:inset 0 0 0 2px #dbdbdb}:host .calendar-table .calendar-date.today.inRange .day:after,:host .calendar-table .calendar-date.today.selected .day:after{box-shadow:inset 0 0 0 2px #9dbeff}:host .calendar-table .calendar-date.inPreview .day{border-radius:0;border-top:1px dashed #4a89dc;border-bottom:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewStart .day{border-radius:50% 0 0 50%;box-shadow:none!important;border-left:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewEnd .day{border-radius:0 50% 50% 0;box-shadow:none!important;border-right:1px dashed #4a89dc}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "isRange", void 0);
__decorate([
    BooleanInput(),
    __metadata("design:type", Boolean)
], NovoMonthViewElement.prototype, "hideOverflowDays", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoMonthViewElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-month-view', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div class=\"calendar-table\" cellspacing=\"0\" cellpadding=\"0\">\n  <div class=\"calendar-thead\">\n    <div class=\"calendar-th weekday\" *ngFor=\"let day of weekdays\" title=\"{{ day }}\"\n      [attr.data-automation-id]=\"day.substr(0, 2)\">\n      {{ day.substr(0, 2) }}\n    </div>\n  </div>\n  <div class=\"calendar-body\">\n    <div class=\"calendar-week\" *ngFor=\"let week of weeks\">\n      <div class=\"calendar-date\" *ngFor=\"let day of week.days\"\n        [class.today]=\"day.isToday\"\n        [class.notinmonth]=\"day.date.getMonth() !== activeDate.getMonth()\"\n        [class.selected]=\"_isSelected(day.date)\"\n        [class.preview]=\"_isPreview(day.date)\"\n        [class.overlay]=\"_isOverlay(day.date)\"\n        [class]=\"_hasOverlayType(day.date)\"\n        [class.inRange]=\"_isInRange(day.date)\"\n        [class.rangeStart]=\"_isRangeStart(day.date)\"\n        [class.rangeEnd]=\"_isRangeEnd(day.date)\"\n        [class.inPreview]=\"_isInPreview(day.date)\"\n        [class.previewStart]=\"_isPreviewStart(day.date)\"\n        [class.previewEnd]=\"_isPreviewEnd(day.date)\"\n        [class.calendar-date]=\"true\"\n        [attr.aria-label]=\"day.name\"\n        [attr.aria-disabled]=\"isDisabled(day.date)\"\n        [attr.aria-selected]=\"_isSelected(day.date)\"\n        [attr.data-automation-id]=\"day.number\"\n        [title]=\"isDisabled(day.date) ? disabledDateMessage : ''\"\n        (mouseover)=\"onHover($event, day)\">\n        <novo-button\n          class=\"day\"\n          tabindex=\"0\"\n          [attr.data-automation-id]=\"day.number\"\n          [disabled]=\"isDisabled(day.date)\"\n          (click)=\"onSelect($event, day)\">\n          {{ day.number }}\n        </novo-button>\n      </div>\n    </div>\n  </div>\n</div>", styles: [":host{background:var(--background-bright);width:100%;height:min-content;position:relative}:host .calendar-table{display:table}:host .calendar-table .calendar-thead{display:table-header-group}:host .calendar-table .calendar-th{display:table-cell;width:30px;padding:10px 0}:host .calendar-table .calendar-body{display:table-row-group}:host .calendar-table .calendar-week{display:table-row}:host .calendar-table .month,:host .calendar-table .year{text-align:center;padding:4px 15px;color:#666;overflow-x:hidden;text-overflow:ellipsis;margin:5px;font-weight:400;border-radius:3px}:host .calendar-table .month.selected,:host .calendar-table .year.selected{background-color:var(--selection);color:#fff}:host .calendar-table .month:hover,:host .calendar-table .year:hover{cursor:pointer;background-color:var(--selection);color:#fff}:host .calendar-table .day{height:3.2rem;width:3.2rem;line-height:1;font-size:1.2rem;padding:1px;border:none;background-color:transparent;border-radius:50%;box-shadow:inset 0 0 0 2px transparent;transition:box-shadow .14s ease-in-out;position:relative;color:var(--text-main, #3d464d)}:host .calendar-table .day:focus{outline:none}:host .calendar-table .day:disabled{color:var(--text-disabled);cursor:not-allowed!important;box-shadow:none!important}:host .calendar-table .calendar-date{display:table-cell}:host .calendar-table .calendar-date.notinmonth,:host .calendar-table .calendar-date.notinmonth:not(.selected)>.day{color:var(--text-disabled)}:host .calendar-table .calendar-date:hover .day{cursor:pointer;box-shadow:inset 0 0 0 2px var(--selection)}:host .calendar-table .calendar-date.inRange:hover .day{box-shadow:inset 0 0 0 2px #fff}:host .calendar-table .calendar-date.inRange{background:var(--selection);color:#fff;height:3.2rem;width:3.2rem;border-radius:0}:host .calendar-table .calendar-date.inRange .day{color:#fff}:host .calendar-table .calendar-date.rangeStart{border-radius:50% 0 0 50%;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeStart:before{content:\"\";position:absolute;height:100%;background:#4a89dc;width:10px;top:0;right:-5px;z-index:-1}:host .calendar-table .calendar-date.rangeEnd{border-radius:0 50% 50% 0;box-shadow:none!important;position:relative}:host .calendar-table .calendar-date.rangeEnd:before{content:\"\";position:absolute;height:100%;background:var(--selection);width:10px;top:0;left:-5px;z-index:-1}:host .calendar-table .calendar-date.selected .day{background:var(--selection);color:#fff}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd) .day{border:1px dashed var(--selection)}:host .calendar-table .calendar-date.preview:not(.previewStart):not(.previewEnd).selected .day{border:1px dashed #9dbeff}:host .calendar-table .calendar-date.today .day:after{content:\"\";position:absolute;top:0;left:0;border-radius:100%;width:100%;height:100%;max-width:3.2rem;margin:0 auto;box-shadow:inset 0 0 0 2px #dbdbdb}:host .calendar-table .calendar-date.today.inRange .day:after,:host .calendar-table .calendar-date.today.selected .day:after{box-shadow:inset 0 0 0 2px #9dbeff}:host .calendar-table .calendar-date.inPreview .day{border-radius:0;border-top:1px dashed #4a89dc;border-bottom:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewStart .day{border-radius:50% 0 0 50%;box-shadow:none!important;border-left:1px dashed #4a89dc}:host .calendar-table .calendar-date.previewEnd .day{border-radius:0 50% 50% 0;box-shadow:none!important;border-right:1px dashed #4a89dc}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }], propDecorators: { minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], preview: [{
                type: Input
            }], overlays: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], isRange: [{
                type: Input
            }], hideOverflowDays: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.hide-overflow-days']
            }], weekStartsOn: [{
                type: Input
            }], select: [{
                type: Output
            }], hover: [{
                type: Output
            }] } });
/** Checks whether a value is the start of a range. */
function isStart(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && end !== null && !DateUtil.isSameDay(start, end) && value < end && DateUtil.isSameDay(value, start);
}
/** Checks whether a value is the end of a range. */
function isEnd(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && start !== null && !DateUtil.isSameDay(start, end) && value >= start && DateUtil.isSameDay(value, end);
}
/** Checks whether a value is inside of a range. */
function isInRange(value, range, rangeEnabled) {
    const [start, end] = range ?? [];
    return rangeEnabled && start !== null && end !== null && !DateUtil.isSameDay(start, end) && value >= start && value <= end;
}

// NG2
class NovoMonthSelectElement {
    constructor(labels) {
        this.labels = labels;
        this.activeDate = new Date();
        this.selected = [];
        // Select callback for output
        this.select = new EventEmitter(false);
        // List of all months
        this.monthNames = this.labels.getMonths();
    }
    ngOnInit() { }
    onSelect(event, month) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, month });
    }
    _isActive(month) {
        return this.activeDate && month === DateUtil.getMonth(this.activeDate);
    }
    _isSelected(month) {
        return this.selected && month === DateUtil.getMonth(this.selected[0]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoMonthSelectElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoMonthSelectElement, isStandalone: false, selector: "novo-month-select", inputs: { activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\" tabindex=\"0\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:#4a89dc;color:#fff}:host .month:hover{background-color:#4a89dc;color:#fff}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoMonthSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-month-select', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div *ngFor=\"let month of monthNames; let i = index\" (click)=\"onSelect($event, i)\" tabindex=\"0\">\n  <div class=\"month\" [class.selected]=\"_isSelected(i)\" [attr.data-automation-id]=\"month\">\n    {{ month }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr;flex:1}:host .month{padding:1rem;cursor:pointer;border-radius:.4rem}:host .month.selected{background-color:#4a89dc;color:#fff}:host .month:hover{background-color:#4a89dc;color:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], select: [{
                type: Output
            }] } });

class NovoYearSelectElement {
    constructor(labels) {
        this.labels = labels;
        this.activeDate = new Date();
        this.selected = [];
        // Select callback for output
        this.select = new EventEmitter(false);
        // List of all years (generated in ngOnInit)
        this.years = [];
    }
    ngOnInit() {
        // Determine the year array
        const now = new Date();
        const start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        const end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;
        const years = [];
        for (let i = start; i <= end; i++) {
            years.push(i);
        }
        this.years = years.reverse();
    }
    onSelect(event, year) {
        // Helpers.swallowEvent(event);
        this.select.next({ event, year });
    }
    _isActive(year) {
        return this.activeDate && year === DateUtil.getYear(this.activeDate);
    }
    _isSelected(year) {
        return this.selected && year === DateUtil.getYear(this.selected[0]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoYearSelectElement, deps: [{ token: i1.NovoLabelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoYearSelectElement, isStandalone: false, selector: "novo-year-select", inputs: { minYear: "minYear", maxYear: "maxYear", activeDate: "activeDate", selected: "selected" }, outputs: { select: "select" }, ngImport: i0, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\" tabindex=\"0\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:#4a89dc;color:#fff}:host .year:hover{background-color:#4a89dc;color:#fff}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoYearSelectElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-year-select', changeDetection: ChangeDetectionStrategy.OnPush, standalone: false, template: "<div *ngFor=\"let year of years\" (click)=\"onSelect($event, year)\" tabindex=\"0\">\n  <div class=\"year\" [class.selected]=\"_isSelected(year)\" [attr.data-automation-id]=\"year\">{{ year }}</div>\n</div>", styles: [":host{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;flex:1;max-height:320px;overflow-y:scroll}:host .year{padding:1rem;cursor:pointer;border-radius:.4rem}:host .year.selected{background-color:#4a89dc;color:#fff}:host .year:hover{background-color:#4a89dc;color:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }], propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selected: [{
                type: Input
            }], select: [{
                type: Output
            }] } });

// NG2
class NovoCalendarElement {
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value ? value.filter(isDate).map((d) => startOfDay(d)) : [];
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        if (!isSameDay(value, this._activeDate)) {
            this._activeDate = value;
            this.activeDateChange.next(value);
            this.updateView(value);
        }
    }
    get weekStartsOn() {
        return this._weekStartsOn;
    }
    set weekStartsOn(value) {
        this._weekStartsOn = value;
        if (this.mode === 'week') {
            this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
        }
    }
    get numberOfMonths() {
        return this._numberOfMonths.length;
    }
    set numberOfMonths(value) {
        this._numberOfMonths = Array.from(Array(Number(value)).keys());
        this.updateView(this.activeDate);
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode !== value) {
            this._mode = value;
            switch (value) {
                case 'multiple':
                    this._strategy = new MultiDateSelectionStrategy();
                    break;
                case 'range':
                    this._strategy = new RangeSelectionStrategy();
                    break;
                case 'week':
                    this._strategy = new WeekSelectionStrategy(this.weekStartsOn);
                    break;
                case 'single':
                default:
                    this._strategy = new DefaultDateSelectionStrategy();
                    break;
            }
        }
    }
    get hb_width() {
        if (this.layout === 'vertical') {
            return this._sanitizer.bypassSecurityTrustStyle('min-content');
        }
        return this._sanitizer.bypassSecurityTrustStyle('min-content');
    }
    get hb_horiztonal() {
        return this.layout !== 'vertical';
    }
    get hb_vertical() {
        return this.layout === 'vertical';
    }
    constructor(labels, element, cdr, _sanitizer) {
        this.labels = labels;
        this.element = element;
        this.cdr = cdr;
        this._sanitizer = _sanitizer;
        // Default view mode (select days)
        this.activeView = 'days';
        this.layout = 'horizontal';
        this._selected = [];
        this.selectedChange = new EventEmitter();
        this.preview = [];
        this.previewChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        this.overlays = [];
        this._activeDate = new Date();
        this._mode = 'single';
        this._numberOfMonths = [0];
        this._weekStartsOn = 0;
        this._strategy = new DefaultDateSelectionStrategy();
    }
    ngOnInit() {
        if (!this.activeDate) {
            this.activeDate = this.selected.length ? this.selected[0] : new Date();
        }
        this.updateView(this.activeDate);
    }
    updateView(activeDate) {
        this.activeDate = new Date(activeDate ? new Date(activeDate) : new Date());
        this.months = [];
        const month = startOfMonth(this.activeDate);
        for (const i of this._numberOfMonths) {
            const date = addMonths(month, i);
            const label = this.labels.formatDateWithFormat(date, { month: 'short' });
            this.months.push({ date, label });
        }
    }
    setToday() {
        const tmp = new Date();
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    monthSelected({ event, month }) {
        const date = this.activeDate ? this.activeDate : new Date().getMonth();
        const tmp = setMonth(date, month);
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    yearSelected({ event, year }) {
        const date = this.activeDate ? this.activeDate : new Date();
        const tmp = setYear(date, year);
        this.updateView(tmp);
        // Go back to days
        this.openView(null, 'days');
    }
    dateSelected({ event, day }) {
        // Helpers.swallowEvent(event);
        this.selected = this._strategy.selectionFinished(day.date, this.selected, event);
        this.selectedChange.emit(this.selected);
        this.cdr.markForCheck();
    }
    updatePreview({ event, day }) {
        this.preview = this._strategy.createPreview(day.date, this.selected, event);
        this.previewChange.emit(this.preview);
    }
    prevMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = subMonths(this.activeDate, 1);
        this.updateView(tmp);
    }
    nextMonth(event) {
        Helpers.swallowEvent(event);
        const tmp = addMonths(this.activeDate, 1);
        this.updateView(tmp);
    }
    openView(event, type) {
        Helpers.swallowEvent(event);
        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.activeView) {
            this.activeView = 'days';
        }
        else {
            this.activeView = type;
        }
        // Make sure to scroll the selected one into view
        if (this.activeView === 'years' || this.activeView === 'months') {
            setTimeout(() => {
                const container = this.element.nativeElement.querySelector(`.calendar-content.${this.activeView}`);
                const selectedItem = this.element.nativeElement.querySelector(`.calendar-content.${this.activeView} .${this.activeView === 'years' ? 'year' : 'month'}.selected`);
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }
    }
    _isRange() {
        return ['week', 'range'].includes(this.mode);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoCalendarElement, isStandalone: false, selector: "novo-calendar", inputs: { minYear: "minYear", maxYear: "maxYear", minDate: "minDate", maxDate: "maxDate", activeView: "activeView", layout: "layout", selected: "selected", preview: "preview", overlays: "overlays", disabledDateMessage: "disabledDateMessage", activeDate: "activeDate", weekStartsOn: "weekStartsOn", numberOfMonths: "numberOfMonths", mode: "mode" }, outputs: { selectedChange: "selectedChange", previewChange: "previewChange", activeDateChange: "activeDateChange" }, host: { properties: { "style.width": "this.hb_width", "class.layout-horizontal": "this.hb_horiztonal", "class.layout-vertical": "this.hb_vertical" } }, ngImport: i0, template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\" tabindex=\"0\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\" tabindex=\"0\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\" tabindex=\"0\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i4.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: NovoMonthViewElement, selector: "novo-month-view", inputs: ["minDate", "maxDate", "activeDate", "selected", "preview", "overlays", "disabledDateMessage", "isRange", "hideOverflowDays", "weekStartsOn"], outputs: ["select", "hover"] }, { kind: "component", type: NovoMonthSelectElement, selector: "novo-month-select", inputs: ["activeDate", "selected"], outputs: ["select"] }, { kind: "component", type: NovoYearSelectElement, selector: "novo-year-select", inputs: ["minYear", "maxYear", "activeDate", "selected"], outputs: ["select"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-calendar', standalone: false, template: "<div class=\"calendar-header\">\n  <novo-button theme=\"icon\" icon=\"previous\" size=\"small\" (click)=\"prevMonth($event)\"\n    data-automation-id=\"calendar-previous\" tabindex=\"0\"></novo-button>\n  <ng-container *ngFor=\"let month of months; let i = index;\">\n    <span class=\"heading\" [class.secondary]=\"i > 0\">\n      <span class=\"month\" (click)=\"openView($event, 'months')\"\n        data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n      <span class=\"year\" (click)=\"openView($event, 'years')\"\n        data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n    </span>\n  </ng-container>\n  <novo-button theme=\"icon\" icon=\"next\" size=\"small\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\" tabindex=\"0\">\n  </novo-button>\n</div>\n<section class=\"calendar-content\" [ngSwitch]=\"activeView\">\n  <ng-container *ngSwitchCase=\"'days'\">\n    <ng-container *ngFor=\"let month of months; let i = index\">\n      <div class=\"calendar-header\" *ngIf=\"layout==='vertical' && i > 0\">\n        <span class=\"previous\" (click)=\"prevMonth($event)\" data-automation-id=\"calendar-previous\" tabindex=\"0\"></span>\n        <span class=\"heading\">\n          <span class=\"month\" (click)=\"openView($event, 'months')\"\n            data-automation-id=\"header-month\" tabindex=\"0\">{{ month.label }}</span>\n          <span class=\"year\" (click)=\"openView($event, 'years')\"\n            data-automation-id=\"header-year\" tabindex=\"0\">{{ month.date?.getFullYear() }}</span>\n        </span>\n        <span class=\"next\" (click)=\"nextMonth($event)\" data-automation-id=\"calendar-next\"></span>\n      </div>\n      <novo-month-view\n        class=\"month-view\"\n        [activeDate]=\"month.date\"\n        [selected]=\"selected\"\n        [preview]=\"preview\"\n        [overlays]=\"overlays\"\n        [isRange]=\"_isRange()\"\n        [hideOverflowDays]=\"months.length > 1\"\n        [weekStartsOn]=\"weekStartsOn\"\n        [disabledDateMessage]=\"disabledDateMessage\"\n        [minDate]=\"minDate\"\n        [maxDate]=\"maxDate\"\n        (select)=\"dateSelected($event)\"\n        (hover)=\"updatePreview($event)\"></novo-month-view>\n    </ng-container>\n  </ng-container>\n  <novo-month-select\n    *ngSwitchCase=\"'months'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"monthSelected($event)\">\n  </novo-month-select>\n  <novo-year-select\n    *ngSwitchCase=\"'years'\"\n    [activeDate]=\"activeDate\"\n    [selected]=\"selected\"\n    (select)=\"yearSelected($event)\">\n  </novo-year-select>\n</section>", styles: [":host(.layout-horizontal){font-size:1.2rem}:host(.layout-horizontal) .calendar-content{flex-flow:row nowrap}:host(.layout-horizontal) .month-view+.month-view{border-collapse:unset;border-left:1px solid #dbdbdb;margin-left:.5rem;padding-left:.5rem}:host(.layout-vertical) .calendar-content{flex-flow:column nowrap}:host(.layout-vertical) .calendar-header .heading.secondary{display:none}:host{display:block;width:100%;text-align:center;background:var(--background-bright);color:var(--text-main);position:relative;-webkit-user-select:none;user-select:none}:host .calendar-content{display:flex;width:100%;height:min-content;position:static;top:0;left:0;overflow:hidden}:host .calendar-header{width:100%;display:flex;flex-flow:row nowrap;border-collapse:collapse;padding:1rem .8rem;-webkit-user-select:none;justify-content:space-between;align-items:center;cursor:default;border-bottom:1px solid var(--border)}:host .calendar-header .previous{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .previous:after{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-right:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .previous:hover:after{border-right:4px solid #4a89dc;cursor:pointer}:host .calendar-header .heading{flex:1;display:inline-block;vertical-align:middle;color:#4a89dc;font-weight:600}:host .calendar-header .heading .month{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .month:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .heading .year{border-radius:2px;padding:3px 8px}:host .calendar-header .heading .year:hover{background:#4a89dc;color:#fff;cursor:pointer}:host .calendar-header .next{width:30px;height:15px;display:inline-block;cursor:pointer}:host .calendar-header .next:before{content:\"\";border-bottom:4px solid transparent;border-top:4px solid transparent;border-left:4px solid #aaa;display:inline-block;height:0;vertical-align:middle;width:0}:host .calendar-header .next:hover:before{opacity:1;border-left:4px solid #4a89dc;cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.DomSanitizer }], propDecorators: { minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], activeView: [{
                type: Input
            }], layout: [{
                type: Input
            }], selected: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], preview: [{
                type: Input
            }], previewChange: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }], overlays: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], weekStartsOn: [{
                type: Input
            }], numberOfMonths: [{
                type: Input
            }], mode: [{
                type: Input
            }], hb_width: [{
                type: HostBinding,
                args: ['style.width']
            }], hb_horiztonal: [{
                type: HostBinding,
                args: ['class.layout-horizontal']
            }], hb_vertical: [{
                type: HostBinding,
                args: ['class.layout-vertical']
            }] } });

// NG2
class NovoCalendarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarModule, declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement], imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule], exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarModule, imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoButtonModule, NovoPipesModule, NovoIconModule],
                    declarations: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                    exports: [NovoMonthViewElement, NovoMonthSelectElement, NovoYearSelectElement, NovoCalendarElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultDateSelectionStrategy, MultiDateSelectionStrategy, NOVO_DATE_SELECTION_STRATEGY, NOVO_DATE_SELECTION_STRATEGY_PROVIDER, NOVO_DATE_SELECTION_STRATEGY_PROVIDER_FACTORY, NovoCalendarElement, NovoCalendarModule, NovoMonthSelectElement, NovoMonthViewElement, NovoYearSelectElement, RangeSelectionStrategy, WeekSelectionStrategy };
//# sourceMappingURL=novo-elements-elements-calendar.mjs.map
