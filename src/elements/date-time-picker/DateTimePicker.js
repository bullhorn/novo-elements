// NG2
import { Component, EventEmitter, forwardRef, trigger, state, style, transition, animate } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from './../../utils/Helpers';
// Vendor
import moment from 'moment/moment';

// Value accessor for the component (supports ngModel)
const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerElement),
    multi: true
};

@Component({
    selector: 'novo-date-time-picker',
    inputs: ['minYear', 'maxYear', 'start', 'end', 'inline', 'range', 'military'],
    outputs: ['onSelect'],
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
export class NovoDateTimePickerElement implements ControlValueAccessor {
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

    hours = 12;
    minutes = 0;
    value = null;
    showClock:Boolean = false;
    componentTabState:String = 'date';

    MERIDIANS = ['am', 'pm'];
    HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    model:any;
    onModelChange:Function = () => {};
    onModelTouched:Function = () => {};

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

    ngOnChanges() {
        this.updateCal(this.model, false, true);
        this.updateTime(this.model, false);
    }

    updateTime(time, fireEvents) {
        let momentValue = time ? moment(time) : moment();
        let hours = momentValue.hours();
        let minutes = momentValue.minutes();

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

    updateCal(date, fireEvents, markedSelected) {
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
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    clearRange() {
        this.selected = null;
        this.selected2 = null;
    }

    setMonth(month) {
        let tmp = this.selected ? this.selected.clone().month(month) : new moment().month(month);
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year) {
        let tmp = this.selected ? this.selected.clone().year(year) : new moment().year(year);
        this.updateCal(tmp, true, true);
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
        this.updateCal(tmp, false, false);
    }

    nextMonth(event) {
        Helpers.swallowEvent(event);
        let tmp = this.month.clone();
        tmp = tmp.add(1, 'months');
        this.updateCal(tmp, false, false);
    }

    updateHeading() {
        if (!this.selected) return;
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

    // TIME
    setHours(event, hours, dispatch) {
        Helpers.swallowEvent(event);
        this.hours = hours;
        this.hoursClass = `hour-${hours}`;
        this.activeHour = hours;

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setMinutes(event, minutes, dispatch) {
        Helpers.swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = `min-${minutes}`;
        this.activeMinute = minutes;
        this.checkBetween(minutes);

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setPeriod(event, period, dispatch) {
        Helpers.swallowEvent(event);
        this.meridian = period;

        if (dispatch) {
            this.dispatchChange();
        }
    }

    dispatchChange() {
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
        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value.toDate(),
            moment: value,
            text: `${this.hours}:${this.minutes} ${this.meridian}`
        });
        this.onModelChange(value.toDate());
    }

    clearTime() {
        this.updateTime(null, true);
    }

    toggleTimePicker(tab) {
        this.showClock = !this.showClock;
        this.componentTabState = tab;
    }

    // ValueAccessor Functions

    // writeValue(model:any):void {
    //     this.model = model;
    //     if (model) {
    //         this.updateTime(model, false);
    //     }
    // }

    // ValueAccessor Functions
    writeValue(model:any):void {
        this.model = model;
        this.updateCal(model, false, true);
        // this.updateTime(model, false);
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }

    checkBetween(value) {
        this.inBetween = this.MINUTES.indexOf(String(value)) < 0;
    }
}
