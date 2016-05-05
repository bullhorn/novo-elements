import { Component, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

// a global month names array
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// a global day names array
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Zero-Fill
Number.prototype.zf = function (l) {  // eslint-disable-line
    return '0'.string(l - this.toString().length) + this;
};
// return the sub of an integer
Number.prototype.substr = function (l) {  // eslint-disable-line
    return this.toString().substr(l);
};
// VB-like string
String.prototype.string = function (l) {  // eslint-disable-line
    let s = '', i = 0;  // eslint-disable-line
    while (i++ < l) {
        s += this;
    }
    return s;
};

// the date format prototype
export function FormatDate(dt, f) {
    if (!dt.valueOf()) return ' ';

    return f.replace(/(yyyy|yy|mmmm|mmm|mm|m|dd|d|eeee|eee|ee|e|hh|nn|ss|a\/p)/gi,
        val => {
            let h = dt.getHours() % 12;
            switch (val.toLowerCase()) {
                case 'yy':
                    return dt.getFullYear().substr(2);
                case 'yyyy':
                    return dt.getFullYear();
                case 'mmmm':
                    return MONTH_NAMES[dt.getMonth()];
                case 'mmm':
                    return MONTH_NAMES[dt.getMonth()].substr(0, 3);
                case 'mm':
                    return (dt.getMonth() + 1).zf(2);
                case 'm':
                    return (dt.getMonth() + 1);
                case 'eeee':
                    return DAY_NAMES[dt.getDay()];
                case 'eee':
                    return DAY_NAMES[dt.getDay()].substr(0, 3);
                case 'ee':
                    return DAY_NAMES[dt.getDay()].substr(0, 2);
                case 'e':
                    return DAY_NAMES[dt.getDay()].substr(0, 1);
                case 'dd':
                    return dt.getDate().zf(2);
                case 'd':
                    return dt.getDate();
                case 'hh':
                    return (h ? h : 12).zf(2);
                case 'nn':
                    return dt.getMinutes().zf(2);
                case 'ss':
                    return dt.getSeconds().zf(2);
                case 'a/p':
                    return dt.getHours() < 12 ? 'am' : 'pm';
                default:
                    return '';
            }
        }
    );
}

@Component({
    selector: 'novo-date-picker',
    inputs: [
        'format',
        'value',
        'inline'
    ],
    outputs: [
        'select'
    ],
    directives: [CORE_DIRECTIVES],
    template: `
        <div class="calendar">
            <div class="calendar-top" *ngIf="!inline">
                <h4 class="day" [attr.data-automation-id]="heading.day">{{heading.day}}</h4>
                <h2 class="month" [attr.data-automation-id]="heading.month">{{heading.month}}</h2>
                <h1 class="date" [attr.data-automation-id]="heading.date">{{heading.date}}</h1>
                <h3 class="year" [attr.data-automation-id]="heading.year">{{heading.year}}</h3>
            </div>
            <div class="calendar-header">
                <span class="previous" (click)="prev($event)" data-automation-id="calendar-previous"></span>
                <span class="heading">
                    <span class="month" (click)="open($event, 'months')" [attr.data-automation-id]="heading.month">{{heading.month}}</span>
                    <span class="year" (click)="open($event, 'years')" [attr.data-automation-id]="heading.year">{{heading.year}}</span>
                </span>
                <span class="next" (click)="next($event)" data-automation-id="calendar-next"></span>
            </div>
            <table class="calendar-content days" cellspacing="0" cellpadding="0" *ngIf="view=='days'">
                <thead>
                    <tr>
                        <th *ngFor="#day of weekday" title="{{day}}" class="weekday" [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#week of weeks">
                        <td *ngFor="#day of weekday; #i = index;" [ngClass]="dayStyle(selected,week,i)">
                            <div class="day" (click)="onSelect($event,selected,week,i)" [attr.data-automation-id]="dateOfTheWeek(selected, week, i)">{{dateOfTheWeek(selected, week, i)}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <ul class="calendar-content months" *ngIf="view=='months'">
                <li *ngFor="#month of months; #m = index;" (click)="selected.setMonth(m);open($event,'days');">
                    <div class="month" [ngClass]="{selected: (m==selected.getMonth())}" [attr.data-automation-id]="month">{{month}}</div>
                </li>
            </ul>
            <ul class="calendar-content years" *ngIf="view=='years'" >
                <li *ngFor="#year of years" (click)="selected.setFullYear(year);open($event,'days');">
                    <div class="year" [ngClass]="{selected: (year==selected.getFullYear())}" [attr.data-automation-id]="year">{{year}}</div>
                </li>
            </ul>
            <div class="calendar-footer">
                <span (click)="setToday()" class="today" title="{{today}}" data-automation-id="calendar-today">Today</span>
            </div>
        </div>
    `
})
export class DatePicker {
    constructor() {
        this.select = new EventEmitter();
        this.selected = new Date();
        this.today = FormatDate(new Date(), 'mmmm dd, yyyy');
        this.view = 'days';
        this.weekday = DAY_NAMES;
        this.months = MONTH_NAMES;
        this.weeks = [0, 1, 2, 3, 4, 5];
        this.years = [];

        let now = new Date();
        for (let i = now.getFullYear() - 100; i < now.getFullYear() + 10; i++) {
            this.years.unshift(i);
        }
    }

    ngOnInit() {
        if (this.value) this.selected = this.value;
        this.update();
    }

    daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    getRelativeDay(tmp, week, day) {
        let firstday = new Date(tmp.getFullYear(), tmp.getMonth(), 1).getDay();
        return ((day + 1) + (week * 7)) - firstday;
    }

    setSelected(date) {
        this.selected = date;
        this.update();
    }

    setToday() {

    }

    onSelect(event, tmp, week, day) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        let num = this.getRelativeDay(tmp, week, day);
        tmp.setDate(num);
        if (this.withTime) {
            event.stopImmediatePropagation();
            this.value = tmp;
            this.open(null, 'time');
        } else {
            this.update();
            this.select.next({
                year: tmp.getFullYear(),
                month: tmp.getMonth(),
                day: tmp.getDate(),
                date: tmp
            });
            this.value = tmp;
        }
    }

    save() {
        let tmp = this.selected;
        this.update();
        this.select.next({ date: tmp });
        this.open(null, 'days');
        this.value = tmp;
    }

    dayStyle(tmp, week, day) {
        let now = tmp.getDate();
        let lastday = new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0).getDate();
        let num = this.getRelativeDay(tmp, week, day);
        let relDay = new Date(tmp.getFullYear(), tmp.getMonth(), num);

        if (num <= 0) return 'notinmonth';
        else if (num > lastday) return 'notinmonth';
        else if (num === now) return 'selected';
        else if (FormatDate(relDay, 'yyyymmdd') === FormatDate(new Date(), 'yyyymmdd')) return 'today';
        return '';
    }

    dateOfTheWeek(tmp, week, day) {
        let prevlastday = new Date(tmp.getFullYear(), tmp.getMonth(), 0).getDate();
        let lastday = new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0).getDate();
        let num = this.getRelativeDay(tmp, week, day);

        if (num <= 0) num += prevlastday;
        else if (num > lastday) num -= lastday;

        return num;
    }

    open(event, type) {
        if (event) event.stopPropagation();
        this.view = type;

        this.update();
    }

    prev(event) {
        event.stopPropagation();
        let year = this.selected.getYear(),
            month = this.selected.getMonth() - 1,
            day = this.selected.getDate(),
            maxDays = this.daysInMonth(month, year);

        if (day > maxDays) {
            day = maxDays;
        }

        this.selected.setMonth(month, day);
        this.update();
    }

    next(event) {
        event.stopPropagation();
        let year = this.selected.getYear(),
            month = this.selected.getMonth() + 1,
            day = this.selected.getDate(),
            maxDays = this.daysInMonth(month, year);

        if (day > maxDays) {
            day = maxDays;
        }

        this.selected.setMonth(month, day);
        this.update();
    }

    capture(event) {
        event.stopImmediatePropagation();
    }

    update() {
        this.heading = {
            month: FormatDate(this.selected, 'mmmm'),
            year: this.selected.getFullYear(),
            date: FormatDate(new Date(), 'dd'),
            day: FormatDate(new Date(), 'eeee')
        };
    }
}

export const NOVO_DATE_PICKER_ELEMENTS = [DatePicker]
