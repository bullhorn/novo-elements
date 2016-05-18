import { Component, EventEmitter, Optional } from '@angular/core'; // eslint-disable-line
import { COMMON_DIRECTIVES, NgControl, NgModel } from '@angular/common';
import moment from 'moment/moment';

import { swallowEvent } from './../../utils/Helpers';

@Component({
    selector: 'novo-date-picker',
    inputs: [
        'minYear',
        'maxYear',
        'start',
        'end',
        'inline'
    ],
    outputs: [
        'onSelect'
    ],
    directives: [COMMON_DIRECTIVES],
    template: `
        <div class="calendar">
            <div class="calendar-top" *ngIf="!inline">
                <h4 class="day" [attr.data-automation-id]="heading.day">{{heading.day}}</h4>
                <h2 class="month" [attr.data-automation-id]="heading.month">{{heading.month}}</h2>
                <h1 class="date" [attr.data-automation-id]="heading.date">{{heading.date}}</h1>
                <h3 class="year" [attr.data-automation-id]="heading.year">{{heading.year}}</h3>
            </div>
            <div class="calendar-header">
                <span class="previous" (click)="prevMonth($event)" data-automation-id="calendar-previous"></span>
                <span class="heading">
                    <span class="month" (click)="open($event, 'months')" [attr.data-automation-id]="heading.month">{{month.format('MMM')}}</span>
                    <span class="year" (click)="open($event, 'years')" [attr.data-automation-id]="heading.year">{{month.format('YYYY')}}</span>
                </span>
                <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
            </div>
            <table class="calendar-content days" cellspacing="0" cellpadding="0" *ngIf="view=='days'">
                <thead>
                    <tr>
                        <th *ngFor="let day of weekday" title="{{day}}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let week of weeks">
                        <td *ngFor="let day of week.days" [ngClass]="{ today: day.isToday, 'notinmonth': !day.isCurrentMonth, selected: day.date.isSame(selected) }">
                            <button class="day" (click)="select($event, day, true)" [attr.data-automation-id]="day.number" [disabled]="(start && day.date.isBefore(start)) || (end && day.date.isAfter(end))">{{day.number}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="calendar-content months" *ngIf="view == 'months'">
                <li *ngFor="let month of months" (click)="setMonth(month)">
                    <div class="month" [ngClass]="{selected: month == selected.format('MMM')}" [attr.data-automation-id]="month">{{month}}</div>
                </li>
            </ul>
            <ul class="calendar-content years" *ngIf="view == 'years'">
                <li *ngFor="let year of years" (click)="setYear(year)">
                    <div class="year" [ngClass]="{selected: year == selected.format('YYYY')}" [attr.data-automation-id]="year">{{year}}</div>
                </li>
            </ul>
            <div class="calendar-footer">
                <span (click)="setToday()" class="today" title="{{today}}" data-automation-id="calendar-today">Today</span>
            </div>
        </div>
    `
})
export class DatePicker {
    // Select callback for output
    onSelect = new EventEmitter(false);
    // List of all the weekdays (use moment to localize)
    weekday = moment.weekdays();
    // List of all months (use moment to localize)
    months = moment.months();
    // List of all years (generated in ngOnInit)
    years = [];
    // Default view mode (select days)
    view = 'days';

    constructor(@Optional() model:NgControl) {
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        // Determine the year array
        let now = moment();
        let start = this.minYear ? Number(this.minYear) : now.year() - 100;
        let end = this.maxYear ? Number(this.maxYear) : now.year() + 10;
        this.years = [];
        for (let i = start; i <= end; i++) {
            this.years.push(i);
        }
        this.updateView(this.value, false, true);
    }

    updateView(date, fireEvents, markedSelected) {
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

    setToday() {
        let tmp = moment();
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setMonth(month) {
        let tmp = this.selected.clone().month(month);
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year) {
        let tmp = this.selected.clone().year(year);
        this.updateView(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    select(event, day, fireEvents) {
        swallowEvent(event);

        this.selected = day.date;
        this.updateHeading();

        if (fireEvents) {
            // Emit our output
            this.onSelect.next({
                year: this.selected.format('YYYY'),
                month: this.selected.format('MM'),
                day: this.selected.format('DD'),
                date: this.selected.toDate()
            });

            // Also, update the ngModel
            this.model.viewToModelUpdate(this.selected.toDate());
            this.value = this.selected.toDate();
        }
    }

    open(event, type) {
        swallowEvent(event);

        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        } else {
            this.view = type;
        }

        this.updateHeading();
    }

    prevMonth(event) {
        swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.subtract(1, 'months');
        this.updateView(tmp, false, false);
    }

    nextMonth(event) {
        swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.add(1, 'months');
        this.updateView(tmp, false, false);
    }

    updateHeading() {
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
     * @returns {Moment} with time stripped out
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
    writeValue(value) {
        this.value = value;
        if (value) {
            this.updateView(value, false, true);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}

export const NOVO_DATE_PICKER_ELEMENTS = [DatePicker];
