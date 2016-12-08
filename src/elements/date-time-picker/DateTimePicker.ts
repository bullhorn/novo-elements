// NG2
import { Component, EventEmitter, Input, Output, forwardRef, trigger, state, style, transition, animate, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from './../../utils/Helpers';
// Vendor
import * as moment from 'moment';

// Value accessor for the component (supports ngModel)
const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerElement),
    multi: true
};

export type componentTabStates = 'date' | 'time';

@Component({
    selector: 'novo-date-time-picker',
    providers: [DATE_TIME_PICKER_VALUE_ACCESSOR],
    animations: [
        trigger('dateTextState', [
            state('date', style({
                'opacity': '1.0'
            })),
            state('time', style({
                'opacity': '0.6'
            })),
            transition('date <=> time', animate('200ms ease-in'))
        ]),
        trigger('timeTextState', [
            state('date', style({
                'opacity': '0.6'
            })),
            state('time', style({
                'opacity': '1.0'
            })),
            transition('date <=> time', animate('200ms ease-in'))
        ]),
        trigger('indicatorState', [
            state('date', style({
                'transform': 'translateX(0%)'
            })),
            state('time', style({
                'transform': 'translateX(100%)'
            })),
            transition('date <=> time', animate('200ms ease-in'))
        ]),
        trigger('containerState', [
            state('date', style({
                'transform': 'translateX(0%)'
            })),
            state('time', style({
                'transform': 'translateX(-100%)'
            })),
            transition('date <=> time', animate('200ms ease-in'))
        ])
    ],
    template: `
        <div class="date-time-container">
            <div class="date-time-tabs">
                <span class="date-tab" (click)="toggleTimePicker('date')" [@dateTextState]="componentTabState">{{(selected?.format('MMM D, YYYY') ) || 'Date'}}</span>
                <span class="time-tab" (click)="toggleTimePicker('time')" [@timeTextState]="componentTabState">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                    <span *ngIf="!military" class="meridian">{{meridian}}</span>
                </span>
                <i class="indicator" [@indicatorState]="componentTabState"></i>
            </div>
            <div class="view-container" [@containerState]="componentTabState">
                <div class="calendar">
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
                                    selected: day.date.isSame(selected)
                                }">
                                    <button class="day" (click)="select($event, day, true); toggleTimePicker('time')" [attr.data-automation-id]="day.number" [disabled]="(start && day.date.isBefore(start)) || (end && day.date.isAfter(end))">{{day.number}}</button>
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
                    <div class="calendar-footer">
                        <span (click)="setToday()" class="today" data-automation-id="calendar-today">Today</span>
                    </div>
                </div>
                <div class="time-picker">
                    <div class="meridian-control-block" *ngIf="!military">
                        <span *ngFor="let period of MERIDIANS" class="digital--period" [class.active]="meridian==period" (click)="setPeriod($event, period, true)" [attr.data-automation-id]="period">{{period}}</span>
                    </div>
                    <div class="analog">
                        <div class="analog--inner">
                            <div class="analog--face">
                                <span class="analog--center"></span>
                                <span class="analog--hand--hours" [ngClass]="hoursClass">
                                    <span class="analog--ball"></span>
                                </span>
                                <span class="analog--hand--minutes" [ngClass]="minutesClass">
                                    <span class="analog--ball" [ngClass]="{between: inBetween}"></span>
                                </span>
                            </div>
                            <div class="analog--hours">
                                <span *ngFor="let hour of HOURS" class="analog--hour" [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour, true)" [attr.data-automation-id]="hour">{{hour}}</span>
                            </div>
                            <div class="analog--minutes">
                                <span *ngFor="let minute of MINUTES" class="analog--minute" [ngClass]="{active: activeMinute == minute}" (click)="setMinutes($event, minute, true)" [attr.data-automation-id]="minute">{{minute}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="time-footer">
                        <span class="now" (click)="clearTime()">Now</span>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class NovoDateTimePickerElement implements ControlValueAccessor, OnInit, OnChanges {
    @Input() minYear: any;
    @Input() maxYear: any;
    @Input() start: any;
    @Input() end: any;
    @Input() inline: any;
    @Input() military: any;
    // Select callback for output
    @Output() onSelect: EventEmitter<any> = new EventEmitter(false);

    // List of all the weekdays (use moment to localize)
    weekday = moment.weekdays();
    // List of all months (use moment to localize)
    months = moment.months();
    // List of all years (generated in ngOnInit)
    years: Array<number> = [];
    // Default view mode (select days)
    view: string = 'days';

    hours: number = 12;
    minutes: number = 0;
    value: any = null;

    MERIDIANS: Array<string> = ['am', 'pm'];
    HOURS: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    MINUTES: Array<string> = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    model: any;
    month: any;
    weeks: any;
    selected: any;
    meridian: any;
    heading: any;
    hoursClass: string;
    minutesClass: string;
    activeHour: number;
    activeMinute: number;
    inBetween: boolean;
    showClock: boolean = false;
    componentTabState: componentTabStates = 'date';

    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};

    ngOnInit() {
        // Determine the year array
        let now = moment();
        let start = this.minYear ? Number(this.minYear) : now.year() - 100;
        let end = this.maxYear ? Number(this.maxYear) : now.year() + 10;

        for (let i = start; i <= end; i++) {
            this.years.push(i);
        }

        // Set the hours if military
        if (this.military) {
            this.HOURS = ['0', ...this.HOURS, '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }

        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges): void {
        this.updateCal(this.model, false, true);
        this.updateTime(this.model, false);
    }

    updateTime(time: any, fireEvents: boolean): void {
        let momentValue = time ? moment(time) : moment();
        let hours = momentValue.hours();
        let minutes: any = momentValue.minutes();

        if (!this.military) {
            this.meridian = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours || 12;
        }

        minutes = minutes < 10 ? `0${minutes}` : minutes;

        this.setHours(null, hours, fireEvents);
        this.setMinutes(null, minutes, fireEvents);
        this.checkBetween(minutes);
    }

    updateCal(date: any, fireEvents: boolean, markedSelected: boolean): void {
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

    setToday(): void {
        let tmp = moment();
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setMonth(month: string): void {
        let tmp = this.selected ? this.selected.clone().month(month) : moment().month(month);
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year: number): void {
        let tmp = this.selected ? this.selected.clone().year(year) : moment().year(year);
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    select(event: Event, day: any, fireEvents: boolean): void {
        Helpers.swallowEvent(event);

        this.selected = day.date;
        this.updateHeading();

        if (fireEvents && this.selected) {
            // Emit our output
            this.onSelect.next({
                year: this.selected.format('YYYY'),
                month: this.selected.format('MM'),
                day: this.selected.format('DD'),
                date: this.selected.toDate()
            });

            // Also, update the ngModel
            this.onModelChange(this.selected.toDate());
            this.model = this.selected.toDate();
            this.dispatchChange();
        }
    }

    open(event: Event, type: string): void {
        Helpers.swallowEvent(event);

        // If they click the toggle two time in a row, close it (go back to days)
        if (type === this.view) {
            this.view = 'days';
        } else {
            this.view = type;
        }

        this.updateHeading();
    }

    prevMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.subtract(1, 'months');
        this.updateCal(tmp, false, false);
    }

    nextMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.add(1, 'months');
        this.updateCal(tmp, false, false);
    }

    updateHeading(): void {
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
     * @returns {Moment} with time stripped out
     */
    removeTime(date: any) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }

    buildMonth(start: any, month: any) {
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

    buildWeek(date: any, month: any): Array<Object> {
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

    // TIME
    setHours(event: Event, hours: number, dispatch: boolean): void {
        Helpers.swallowEvent(event);
        this.hours = hours;
        this.hoursClass = `hour-${hours}`;
        this.activeHour = hours;

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setMinutes(event: Event, minutes: number, dispatch: boolean): void {
        Helpers.swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = `min-${minutes}`;
        this.activeMinute = minutes;
        this.checkBetween(minutes);

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setPeriod(event: Event, period: string, dispatch: boolean): void {
        Helpers.swallowEvent(event);
        this.meridian = period;

        if (dispatch) {
            this.dispatchChange();
        }
    }

    dispatchChange(): void {
        let hours = Number(this.hours);

        if (!this.military) {
            hours = this.meridian === 'pm' ? hours + 12 : hours;

            // Special case for 12
            if (this.meridian === 'pm' && hours === 24) {
                hours = 12;
            } else if (this.meridian === 'am' && hours === 12) {
                hours = 0;
            }
        }

        let value = moment().hours(hours).minutes(this.minutes).seconds(0);

        if (this.model) {
            value = moment(this.model).hours(hours).minutes(this.minutes).seconds(0);
        }

        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value.toDate(),
            moment: value,
            text: `${this.hours}:${this.minutes} ${this.meridian}`
        });

        this.onModelChange(value.toDate());
        this.model = value.toDate();
    }

    clearTime(): void {
        this.updateTime(null, true);
    }

    toggleTimePicker(tab: componentTabStates): void {
        this.showClock = !this.showClock;
        this.componentTabState = tab;
    }

    // ValueAccessor Functions
    writeValue(model: any): void {
        this.model = model;
        this.updateCal(model, false, true);
        this.updateTime(model, false);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    checkBetween(value: number): void {
        this.inBetween = this.MINUTES.indexOf(String(value)) < 0;
    }
}
