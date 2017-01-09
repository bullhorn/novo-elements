// NG2
import { Component, EventEmitter, forwardRef, trigger, state, style, transition, animate, Input, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from './../../utils/Helpers';
// Vendor
import * as moment from 'moment';

// Value accessor for the component (supports ngModel)
const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerElement),
    multi: true
};

export type dateModel = string;
export interface RangeModal {
    startDate: dateModel;
    endDate: dateModel;
};
export type modelTypes = dateModel | RangeModal;

export interface Day {
    date: moment.Moment;
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
                <span class="range-tab" (click)="toggleRangeSelect('startDate')" [@startDateTextState]="rangeSelectMode">{{(selected?.format('MMM D, YYYY') ) || 'Start Date'}}</span>
                <span class="range-tab" (click)="toggleRangeSelect('endDate')" [@endDateTextState]="rangeSelectMode">{{(selected2?selected2.format('MMM D, YYYY'):null ) || 'End Date'}}</span>
                <i class="indicator" [@indicatorState]="rangeSelectMode"></i>
            </div>
            <div class="calendar-header">
                <span class="previous" (click)="prevMonth($event)" data-automation-id="calendar-previous"></span>
                <span class="heading">
                    <span class="month" (click)="open($event, 'months')" [attr.data-automation-id]="heading?.month">{{month?.format('MMM')}}</span>
                    <span class="year" (click)="open($event, 'years')" [attr.data-automation-id]="heading?.year">{{month?.format('YYYY')}}</span>
                </span>
                <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
            </div>
            <table class="calendar-content days" cellspacing="0" cellpadding="0" [hidden]="!(view=='days')">
                <thead>
                    <tr>
                        <th *ngFor="let day of weekday" title="{{day}}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of weeks">
                        <td *ngFor="let day of week.days" [ngClass]="{
                            today: day.isToday,
                            'notinmonth': !day.isCurrentMonth,
                            selected: (!range ? day.date.isSame(selected) : (day.date.isSame(selected) || day.date.isSame(selected2))),
                            filler: (range && selected2 && day.date.isAfter(selected) && day.date.isBefore(selected2)),
                            startfill: (range && selected2 && day.date.isSame(selected) && day.date.isBefore(selected2)),
                            endfill: (range && selected2 && day.date.isSame(selected2.startOf('day')) && day.date.isAfter(selected)),
                            'selecting-range': (range && ((selected && !selected2 && day.date.isAfter(selected) && day.date.isBefore(hoverDay)) || (!selected && selected2 && day.date.isBefore(selected2) && day.date.isAfter(hoverDay)) || ( rangeSelectMode === 'startDate' && (selected && selected2 && day.date.isBefore(selected) && day.date.isAfter(hoverDay))) || ( rangeSelectMode === 'endDate' && (selected && selected2 && day.date.isAfter(selected2) && day.date.isBefore(hoverDay)))))
                        }" (click)="select($event, day, true)" (mouseover)="rangeHover($event, day)">
                            <button class="day" [attr.data-automation-id]="day.number" [disabled]="(start && day.date.isBefore(start)) || (end && day.date.isAfter(end))">{{day.number}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="calendar-content months" [hidden]="!(view == 'months')">
                <li *ngFor="let month of months" (click)="setMonth(month)">
                    <div class="month" [ngClass]="{selected: checkSelected(month, 'MMMM')}" [attr.data-automation-id]="month">{{month}}</div>
                </li>
            </ul>
            <ul class="calendar-content years" [hidden]="!(view == 'years')">
                <li *ngFor="let year of years" (click)="setYear(year)">
                    <div class="year" [ngClass]="{selected: checkSelected(year, 'YYYY')}" [attr.data-automation-id]="year">{{year}}</div>
                </li>
            </ul>
            <div class="calendar-footer">
                <span (click)="setToday()" class="today" title="Today" data-automation-id="calendar-today">Today</span>
            </div>
        </div>
    `
})

export class NovoDatePickerElement implements ControlValueAccessor, OnInit {
    @Input() minYear:any;
    @Input() maxYear:any;
    @Input() start:any;
    @Input() end:any;
    @Input() inline:any;
    @Input() range:any;
    // Select callback for output
    @Output() onSelect:EventEmitter<any> = new EventEmitter(false);
    // List of all the weekdays (use moment to localize)
    weekday = moment.weekdays();
    // List of all months (use moment to localize)
    months = moment.months();
    // List of all years (generated in ngOnInit)
    years:Array<any> = [];
    // Default view mode (select days)
    view:string = 'days';
    heading:any;

    model:modelTypes;
    month:any;
    weeks:any;
    selected:any;
    selected2:any;
    hoverDay:any;

    rangeSelectMode:rangeSelectModes = 'startDate';
    onModelChange:Function = () => {};
    onModelTouched:Function = () => {};

    ngOnInit() {
        // Determine the year array
        let now = moment();
        let start = this.minYear ? Number(this.minYear) : now.year() - 100;
        let end = this.maxYear ? Number(this.maxYear) : now.year() + 10;

        for (let i = end; i >= start; i--) {
            this.years.push(i);
        }

        this.updateView(this.model, false, true);
    }

    updateView(date, fireEvents:boolean, markedSelected:boolean) {
        if (date && date.startDate === null) {
            this.clearRange();
        } else {
            let value = date ? moment(date) : moment();
            value = this.removeTime(value);
            this.month = value.clone();

            let start = value.clone();
            start.date(1);
            this.removeTime(start.day(0));

            this.buildMonth(start, this.month);

            if (markedSelected) {
                this.select(null, { date: value }, fireEvents);
            }
        }
    }

    setToday() {
        let tmp = moment();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    clearRange() {
        this.selected = null;
        this.selected2 = null;
    }

    setMonth(month) {
        let tmp = this.month ? this.month.clone().month(month) : moment().month(month);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year) {
        let tmp = this.month ? this.month.clone().year(year) : moment().year(year);
        this.updateView(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    select(event:Event, day:Day, fireEvents:boolean) {
        Helpers.swallowEvent(event);
        if (this.range) {

            if (this.rangeSelectMode === 'startDate') {
                if (day.date.isAfter(this.selected2)) {
                    // CLEAR END DATE
                    this.selected2 = null;
                }
                // SET START DATE
                this.selected = day.date;
                if (event) { this.rangeSelectMode = 'endDate'; }
            } else {
                if (day.date.isBefore(this.selected)) {
                    // CLEAR START DATE
                    this.selected = null;
                }
                // SET END DATE
                this.selected2 = day.date.endOf('day');
                if (event) { this.rangeSelectMode = 'startDate'; }
            }

        } else {
            this.selected = day.date;
            this.updateHeading();
        }
        if (fireEvents && this.selected) {
            // Emit our output
            if (this.range && this.selected && this.selected2) {
                this.onSelect.next({
                    startDate: {
                        year: this.selected.format('YYYY'),
                        month: this.selected.format('MM'),
                        day: this.selected.format('DD'),
                        date: this.selected.toDate()
                    },
                    endDate: {
                        year: this.selected2.format('YYYY'),
                        month: this.selected2.format('MM'),
                        day: this.selected2.format('DD'),
                        date: this.selected2.toDate()
                    }
                });
            } else {
                this.onSelect.next({
                    year: this.selected.format('YYYY'),
                    month: this.selected.format('MM'),
                    day: this.selected.format('DD'),
                    date: this.selected.toDate()
                });
            }

            if (this.range) {
                // Also, update the ngModel
                this.onModelChange({
                    startDate: this.selected.toDate(),
                    endDate: this.selected2 ? this.selected2.toDate() : null
                });
                this.model = {
                    startDate: this.selected.toDate(),
                    endDate: this.selected2 ? this.selected2.toDate() : null
                };
            } else {
                // Also, update the ngModel
                this.onModelChange(this.selected.toDate());
                this.model = this.selected.toDate();
            }
        }
    }

    open(event:Event, type:string) {
        Helpers.swallowEvent(event);

        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        } else {
            this.view = type;
        }

        this.updateHeading();
    }

    prevMonth(event:Event) {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.subtract(1, 'months');
        this.updateView(tmp, false, false);
    }

    nextMonth(event:Event) {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.add(1, 'months');
        this.updateView(tmp, false, false);
    }

    checkSelected(item:string, format:string) {
        let selected = true;

        if (this.rangeSelectMode === 'endDate') {
            selected = this.selected2 ? item === this.selected2.format(format) : false;
        } else {
            selected = this.selected ? item === this.selected.format(format) : false;
        }

        return selected;
    }

    updateHeading() {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.selected.format('MMMM'),
            year: this.selected.format('YYYY'),
            date: this.selected.format('DD'),
            day: this.selected.format('dddd')
        };
    }

    /**
     * Remove the time aspect of the date
     * @param date
     * @returns with time stripped out
     */
    removeTime(date) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }

    buildMonth(start, month) {
        // Reset the weeks
        this.weeks = [];

        // House keeping variables to know when we are done building the month
        let done = false,
            date = start.clone(),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(date.clone(), month) });

            // Increment variables for the next iteration
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
    }

    buildWeek(date, month):Array<Day> {
        // Build out of the days of the week
        let days = [];

        // Iterate over the days of the week
        for (let i = 0; i < 7; i++) {
            // Push a variable on the day array with lots of helpers to make the template easier
            days.push({
                name: date.format('dd').substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), 'day'),
                date: date
            });

            // Increment for the next iteration
            date = date.clone();
            date.add(1, 'd');
        }

        return days;
    }

    toggleRangeSelect(range:rangeSelectModes):void {
        this.rangeSelectMode = range;
    }

    rangeHover(event:Event, day:Day):void {
        this.hoverDay = day.date;
    }

    // ValueAccessor Functions
    writeValue(model:modelTypes):void {
        this.model = model;
        this.updateView(model, false, true);
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
