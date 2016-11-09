// NG2
import { Component, EventEmitter, forwardRef, Input, Output, OnInit } from '@angular/core';
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

@Component({
    selector: 'novo-date-picker',
    providers: [DATE_PICKER_VALUE_ACCESSOR],
    template: `
        <div class="calendar">
            <div class="calendar-top" *ngIf="!inline && !range">
                <h4 class="day" [attr.data-automation-id]="heading?.day">{{heading?.day}}</h4>
                <h2 class="month" [attr.data-automation-id]="heading?.month">{{heading?.month}}</h2>
                <h1 class="date" [attr.data-automation-id]="heading?.date">{{heading?.date}}</h1>
                <h3 class="year" [attr.data-automation-id]="heading?.year">{{heading?.year}}</h3>
            </div>
            <div *ngIf="range" class="calendar-range">
                <span [class.active]="!calendarRangeEnd">{{(selected?.format('MMM D, YYYY') ) || 'Start Date'}}</span>
                <span [class.active]="calendarRangeEnd">{{(selected2?selected2.format('MMM D, YYYY'):null ) || 'End Date'}}</span>
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
                        <td *ngFor="let day of week.days" [ngClass]="{ today: day.isToday,
                            'notinmonth': !day.isCurrentMonth,
                            selected: (!range ? day.date.isSame(selected) : (day.date.isSame(selected) || day.date.isSame(selected2))),
                            filler: (range && selected2 && day.date.isAfter(selected) && day.date.isBefore(selected2)),
                            startfill: (range && selected2 && day.date.isSame(selected) && day.date.isBefore(selected2))
                        }">
                            <button class="day" (click)="select($event, day, true)" [attr.data-automation-id]="day.number" [disabled]="(start && day.date.isBefore(start)) || (end && day.date.isAfter(end))">{{day.number}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="calendar-content months" [hidden]="!(view == 'months')">
                <li *ngFor="let month of months" (click)="setMonth(month)">
                    <div class="month" [ngClass]="{selected: month == selected?.format('MMM')}" [attr.data-automation-id]="month">{{month}}</div>
                </li>
            </ul>
            <ul class="calendar-content years" [hidden]="!(view == 'years')">
                <li *ngFor="let year of years" (click)="setYear(year)">
                    <div class="year" [ngClass]="{selected: year == selected?.format('YYYY')}" [attr.data-automation-id]="year">{{year}}</div>
                </li>
            </ul>
            <div class="calendar-footer" *ngIf="!range">
                <span (click)="setToday()" class="today" title="{{today}}" data-automation-id="calendar-today">Today</span>
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
    // List of all the weekdays (use moment to localize)
    weekday = moment.weekdays();
    // List of all months (use moment to localize)
    months = moment.months();
    // List of all years (generated in ngOnInit)
    years = [];
    // Default view mode (select days)
    view = 'days';
    month: any;
    selected: any;
    selected2: any;
    calendarRangeEnd: any;
    heading: any;
    weeks: any;
    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    ngOnInit() {
        // Determine the year array
        let now = moment();
        let start = this.minYear ? Number(this.minYear) : now.year() - 100;
        let end = this.maxYear ? Number(this.maxYear) : now.year() + 10;
        this.years = [];
        for (let i = start; i <= end; i++) {
            this.years.push(i);
        }

        this.updateView(this.model, false, true);
    }

    updateView(date, fireEvents, markedSelected) {
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

            if (markedSelected && !this.range) {
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
        let tmp = this.selected ? this.selected.clone().month(month) : moment().month(month);
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year) {
        let tmp = this.selected ? this.selected.clone().year(year) : moment().year(year);
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    select(event, day, fireEvents) {
        Helpers.swallowEvent(event);
        if (this.range) {
            if (!this.selected && event) {
                this.selected = day.date;
            } else if (this.selected && this.selected2) {
                this.selected = day.date;
                this.selected2 = null;
                this.calendarRangeEnd = false;
            } else if (day.date.isAfter(this.selected)) {
                this.selected2 = day.date.endOf('day');
            } else if (day.date.isBefore(this.selected)) {
                this.selected2 = this.selected.endOf('day');
                this.selected = day.date;
            } else if (day.date.isSame(this.selected)) {
                this.selected = day.date;
                this.selected2 = day.date.endOf('day');
                this.calendarRangeEnd = !this.calendarRangeEnd;
            }
            this.calendarRangeEnd = !this.calendarRangeEnd;
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

    open(event, type) {
        Helpers.swallowEvent(event);

        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        } else {
            this.view = type;
        }

        this.updateHeading();
    }

    prevMonth(event) {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.subtract(1, 'months');
        this.updateView(tmp, false, false);
    }

    nextMonth(event) {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.add(1, 'months');
        this.updateView(tmp, false, false);
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

    buildWeek(date, month) {
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
            date = date.clone(); // eslint-disable-line
            date.add(1, 'd');
        }

        return days;
    }

    // ValueAccessor Functions
    writeValue(model: any): void {
        this.model = model;
        this.updateView(model, false, true);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
