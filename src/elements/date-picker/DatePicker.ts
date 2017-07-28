// NG2
import { ElementRef, Component, EventEmitter, forwardRef, trigger, state, style, transition, animate, Input, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true
};

export interface RangeModal {
    startDate: Date;
    endDate: Date;
};
export type modelTypes = Date | RangeModal;

export interface Day {
    date: Date;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    name?: string;
    number?: string | number;
}

export type rangeSelectModes = 'startDate' | 'endDate';

@Component({
    selector: 'novo-date-picker',
    providers: [DATE_PICKER_VALUE_ACCESSOR],
    animations: [
        trigger('startDateTextState', [
            state('startDate', style({
                'opacity': '1.0'
            })),
            state('endDate', style({
                'opacity': '0.6'
            })),
            transition('startDate <=> endDate', animate('200ms ease-in'))
        ]),
        trigger('endDateTextState', [
            state('startDate', style({
                'opacity': '0.6'
            })),
            state('endDate', style({
                'opacity': '1.0'
            })),
            transition('startDate <=> endDate', animate('200ms ease-in'))
        ]),
        trigger('indicatorState', [
            state('startDate', style({
                'transform': 'translateX(0%)'
            })),
            state('endDate', style({
                'transform': 'translateX(100%)'
            })),
            transition('startDate <=> endDate', animate('200ms ease-in'))
        ])
    ],
    template: `
        <div class="calendar">
            <div class="calendar-top" *ngIf="!inline && !range">
                <h4 class="day" [attr.data-automation-id]="heading?.day">{{heading?.day}}</h4>
                <h2 class="month" [attr.data-automation-id]="heading?.month">{{heading?.month}}</h2>
                <h1 class="date" [attr.data-automation-id]="heading?.date">{{heading?.date}}</h1>
                <h3 class="year" [attr.data-automation-id]="heading?.year">{{heading?.year}}</h3>
            </div>
            <div class="date-range-tabs" *ngIf="range">
                <span class="range-tab" (click)="toggleRangeSelect('startDate')" [@startDateTextState]="rangeSelectMode">{{selectedLabel}}</span>
                <span class="range-tab" (click)="toggleRangeSelect('endDate')" [@endDateTextState]="rangeSelectMode">{{selected2Label}}</span>
                <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
            </div>
            <div class="calendar-header">
                <span class="previous" (click)="prevMonth($event)" data-automation-id="calendar-previous"></span>
                <span class="heading">
                    <span class="month" (click)="open($event, 'months')" [attr.data-automation-id]="heading?.month">{{monthLabel}}</span>
                    <span class="year" (click)="open($event, 'years')" [attr.data-automation-id]="heading?.year">{{month?.getFullYear()}}</span>
                </span>
                <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
            </div>
            <table class="calendar-content days" cellspacing="0" cellpadding="0" [hidden]="!(view=='days')">
                <thead>
                    <tr>
                        <th *ngFor="let day of weekdays" title="{{day}}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of weeks">
                        <td *ngFor="let day of week.days" [ngClass]="{
                            today: day.isToday,
                            'notinmonth': day.date.getMonth() !== this.month.getMonth(),
                            selected: isSelected(range, day.date, selected, selected2),
                            filler: isFiller(range, day.date, selected, selected2),
                            startfill: isStartFill(range, day.date, selected, selected2),
                            endfill: isEndFill(range, day.date, selected, selected2),
                            'selecting-range': isSelectingRange(range, day.date, selected, selected2, hoverDay, rangeSelectMode)
                           }" (click)="select($event, day, true)" (mouseover)="rangeHover($event, day)">
                            <button class="day" [attr.data-automation-id]="day.number" [disabled]="isDisabled(day.date, start, end)">{{day.number}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="calendar-content months" [hidden]="view !== 'months'">
                <li *ngFor="let month of months;let i = index" (click)="setMonth(i)">
                    <div class="month" [ngClass]="{selected: i === selected?.getMonth()}" [attr.data-automation-id]="month">{{month}}</div>
                </li>
            </ul>
            <ul class="calendar-content years" [hidden]="view !== 'years'">
                <li *ngFor="let year of years" (click)="setYear(year)">
                    <div class="year" [ngClass]="{selected: year == selected?.getFullYear()}" [attr.data-automation-id]="year">{{year}}</div>
                </li>
            </ul>
            <div class="calendar-footer">
                <span (click)="setToday()" class="today" data-automation-id="calendar-today">{{ labels.today }}</span>
            </div>
        </div>
    `
})

export class NovoDatePickerElement implements ControlValueAccessor, OnInit {
    @Input() minYear: any;
    @Input() maxYear: any;
    @Input() start: any;
    @Input() end: any;
    @Input() inline: any;
    @Input() range: any;
    // Select callback for output
    @Output() onSelect: EventEmitter<any> = new EventEmitter(false);
    // List of all the weekdays
    weekdays: string[] = [];
    // List of all months
    months: string[] = [];
    // List of all years (generated in ngOnInit)
    years: Array<any> = [];
    // Default view mode (select days)
    view: string = 'days';
    heading: any;

    model: modelTypes;
    month: Date;
    monthLabel: string;
    weeks: any;
    selected: Date;
    selectedLabel: string;
    selected2: Date;
    selected2Label: string;
    hoverDay: any;

    rangeSelectMode: rangeSelectModes = 'startDate';
    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor(public labels: NovoLabelService, private element: ElementRef) { }

    ngOnInit() {
        // Determine the year array
        let now = new Date();
        let start = this.minYear ? Number(this.minYear) : now.getFullYear() - 100;
        let end = this.maxYear ? Number(this.maxYear) : now.getFullYear() + 10;

        for (let i = start; i <= end; i++) {
            this.years.push(i);
        }

        // Set weekdays / months
        this.weekdays = this.labels.getWeekdays();
        this.months = this.labels.getMonths();

        // Set labels
        this.selectedLabel = this.labels.startDate;
        this.selected2Label = this.labels.endDate;
        this.updateView(this.model, false, true);
    }

    isSelectingRange(range, day, selected, selected2, hoverDay, rangeSelectMode) {
        if (range) {
            let isRangeModeEndDate = rangeSelectMode === 'endDate' && (selected && selected2 && dateFns.isAfter(day, selected2) && dateFns.isBefore(day, hoverDay));
            let isRangeModeStartDate = rangeSelectMode === 'startDate' && (selected && selected2 && dateFns.isBefore(day, selected) && dateFns.isAfter(day, hoverDay));
            let isNotSelected = !selected && selected2 && dateFns.isBefore(day, selected2) && dateFns.isAfter(day, hoverDay);
            let isNotSelected2 = selected && !selected2 && dateFns.isAfter(day, selected) && dateFns.isBefore(day, hoverDay);
            return isNotSelected2 || isNotSelected || isRangeModeStartDate || isRangeModeEndDate;
        }
        return false;
    }

    isEndFill(range, day, selected, selected2) {
        if (range && selected2) {
            return dateFns.isSameDay(day, selected2) && dateFns.isAfter(day, selected);
        }
        return false;
    }

    isStartFill(range, day, selected, selected2) {
        if (range && selected2) {
            return dateFns.isSameDay(day, selected) && dateFns.isBefore(day, selected2);
        }
        return false;
    }

    isFiller(range, day, selected, selected2) {
        if (range && selected2) {
            return dateFns.isAfter(day, selected) && dateFns.isBefore(day, selected2);
        }
        return false;
    }

    isSelected(range, day, selected, selected2) {
        if (range) {
            return day && (selected && (day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear()) || (selected2 && (day.getDate() === selected2.getDate() && day.getMonth() === selected2.getMonth() && day.getFullYear() === selected2.getFullYear())));
        }
        return day.getDate() === selected.getDate() && day.getMonth() === selected.getMonth() && day.getFullYear() === selected.getFullYear();
    }

    isDisabled(day, start, end) {
        return dateFns.isBefore(day, start) || dateFns.isAfter(day, end);
    }

    updateView(date, fireEvents: boolean, markedSelected: boolean) {
        if (date && date.startDate === null) {
            this.clearRange();
        } else {
            if (!date) {
                this.clearRange();
            }
            let value: any = date ? new Date(date) : new Date();
            value = this.removeTime(value);
            this.month = new Date(value);
            this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });

            let start = new Date(value.getTime());
            start.setDate(1);
            this.removeTime(start.setDate(1));

            this.buildMonth(start, this.month);

            if (markedSelected) {
                this.select(null, { date: value }, fireEvents);
            }
        }
    }

    setToday() {
        let tmp = new Date();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    clearRange() {
        this.selected = null;
        this.selectedLabel = this.labels.startDate;
        this.selected2 = null;
        this.selected2Label = this.labels.endDate;
    }

    setMonth(month: number): void {
        let date = this.month ? this.month : new Date();
        let tmp = dateFns.setMonth(date, month);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year: number): void {
        let date = this.month ? this.month : new Date();
        let tmp = dateFns.setYear(date, year);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    select(event: Event, day: Day, fireEvents: boolean) {
        Helpers.swallowEvent(event);
        if (this.range) {
            if (this.rangeSelectMode === 'startDate') {
                if (this.selected2 && dateFns.isAfter(day.date, this.selected2)) {
                    // CLEAR END DATE
                    this.selected2 = null;
                    this.selected2Label = this.labels.endDate;
                }
                // SET START DATE
                this.selected = day.date;
                this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                if (event) {
                    this.rangeSelectMode = 'endDate';
                }
            } else {
                if (this.selected && dateFns.isBefore(day.date, this.selected2)) {
                    // CLEAR START DATE
                    this.selected = null;
                    this.selectedLabel = this.labels.startDate;
                }
                // SET END DATE
                this.selected2 = dateFns.endOfDay(day.date);
                this.selected2Label = this.labels.formatDateWithFormat(this.selected2, {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
                if (event) {
                    this.rangeSelectMode = 'startDate';
                }
            }

        } else {
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
                this.onSelect.next({
                    startDate: {
                        month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                        year: this.selected.getFullYear(),
                        day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                        date: this.selected
                    },
                    endDate: {
                        month: this.labels.formatDateWithFormat(this.selected2, { month: 'long' }),
                        year: this.selected.getFullYear(),
                        day: this.labels.formatDateWithFormat(this.selected2, { weekday: 'long' }),
                        date: this.selected
                    }
                });
            } else {
                this.onSelect.next({
                    month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                    year: this.selected.getFullYear(),
                    day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                    date: this.selected
                });
            }

            if (this.range) {
                // Also, update the ngModel
                this.onModelChange({
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null
                });
                this.model = {
                    startDate: this.selected,
                    endDate: this.selected2 ? this.selected2 : null
                };
            } else {
                // Also, update the ngModel
                this.onModelChange(this.selected);
                this.model = this.selected;
            }
        }
    }

    open(event: Event, type: string) {
        Helpers.swallowEvent(event);

        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        } else {
            this.view = type;
        }

        // Make sure to scroll the selected one into view
        if (this.view === 'years' || this.view === 'months') {
            setTimeout(() => {
                let container = this.element.nativeElement.querySelector(`.calendar-content.${this.view}`);
                let selectedItem = this.element.nativeElement.querySelector(`.calendar-content.${this.view} .${this.view === 'years' ? 'year' : 'month'}.selected`);
                if (container && selectedItem) {
                    container.scrollTop = selectedItem.offsetTop - 100;
                }
            });
        }

        this.updateHeading();
    }

    prevMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = dateFns.subMonths(this.month, 1);
        this.updateView(tmp, false, false);
    }

    nextMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = dateFns.addMonths(this.month, 1);
        this.updateView(tmp, false, false);
    }

    updateHeading() {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
            year: this.selected.getFullYear(),
            day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
            date: this.selected.getDate()
        };
    }

    /**
     * Remove the time aspect of the date
     * @param date
     * @returns with time stripped out
     */
    removeTime(date: any): Date {
        let ret = new Date(date);
        ret.setHours(12);
        ret.setSeconds(0);
        ret.setMilliseconds(0);
        return ret;
    }

    buildMonth(start: Date, month: Date) {
        // Reset the weeks
        this.weeks = [];

        // House keeping variables to know when we are done building the month
        let done = false,
            date = new Date(start.getTime()),
            monthIndex = date.getMonth(),
            count = 0;

        if (date.getDay() !== 0) {
            date = dateFns.subDays(date, date.getDay());
        }

        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });

            // Increment variables for the next iteration
            date = dateFns.addDays(date, 7);
            done = count++ > 2 && monthIndex !== date.getMonth();
            monthIndex = date.getMonth();
        }
    }

    buildWeek(date: Date, month: Date): Array<Object> {
        // Build out of the days of the week
        let days = [];

        // Iterate over the days of the week
        for (let i = 0; i < 7; i++) {
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
    }

    toggleRangeSelect(range: rangeSelectModes): void {
        this.rangeSelectMode = range;
    }

    rangeHover(event: Event, day: Day): void {
        this.hoverDay = day.date;
    }

    // ValueAccessor Functions
    writeValue(model: modelTypes): void {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.updateView(model, false, true);
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
