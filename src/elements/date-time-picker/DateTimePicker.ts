// NG2
import { ElementRef, Component, EventEmitter, Input, Output, forwardRef, trigger, state, style, transition, animate, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

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
                <span class="date-tab" (click)="toggleTimePicker('date')" [@dateTextState]="componentTabState">{{selectedLabel}}</span>
                <span class="time-tab" (click)="toggleTimePicker('time')" [@timeTextState]="componentTabState">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span
                    class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                    <span *ngIf="!military" class="meridian">{{meridian}}</span>
                </span>
                <i class="date-time-indicator" [@indicatorState]="componentTabState"></i>
            </div>
            <div class="view-container" [@containerState]="componentTabState">
                <div class="calendar">
                    <div class="calendar-header">
                        <span class="previous" (click)="previousMonth($event)"
                              data-automation-id="calendar-previous"></span>
                        <span class="heading">
                            <span class="month" (click)="open($event, 'months')"
                                  [attr.data-automation-id]="heading?.month">{{monthLabel}}</span>
                            <span class="year" (click)="open($event, 'years')"
                                  [attr.data-automation-id]="heading?.year">{{month?.getFullYear()}}</span>
                        </span>
                        <span class="next" (click)="nextMonth($event)" data-automation-id="calendar-next"></span>
                    </div>
                    <table class="calendar-content days" cellspacing="0" cellpadding="0" [hidden]="!(view=='days')">
                        <thead>
                        <tr>
                            <th *ngFor="let day of weekdays" title="{{day}}" class="weekday"
                                [attr.data-automation-id]="day.substr(0, 2)">{{day.substr(0, 2)}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let week of weeks">
                            <td *ngFor="let day of week.days" [ngClass]="{ today: day.isToday,
                                    'notinmonth': !day.isCurrentMonth,
                                    selected: day.date.getDate() === selected.getDate() && day.date.getMonth() === selected.getMonth() && day.date.getFullYear() === selected.getFullYear()
                                }">
                                <button class="day" (click)="select($event, day, true); toggleTimePicker('time')"
                                        [attr.data-automation-id]="day.number"
                                        [disabled]="isDisabled(day.date, start, end)">{{day.number}}
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="calendar-content months" [hidden]="view !== 'months'">
                        <li *ngFor="let month of months;let i = index" (click)="setMonth(i)">
                            <div class="month" [ngClass]="{selected: i === selected.getMonth()}"
                                 [attr.data-automation-id]="month">{{month}}
                            </div>
                        </li>
                    </ul>
                    <ul class="calendar-content years" [hidden]="view !== 'years'">
                        <li *ngFor="let year of years" (click)="setYear(year)">
                            <div class="year" [ngClass]="{selected: year == selected?.getFullYear()}"
                                 [attr.data-automation-id]="year">{{year}}
                            </div>
                        </li>
                    </ul>
                    <div class="calendar-footer">
                        <span (click)="setToday()" class="today" data-automation-id="calendar-today">{{ labels.today
                            }}</span>
                    </div>
                </div>
                <div class="time-picker">
                    <div class="meridian-control-block" *ngIf="!military">
                        <span *ngFor="let period of MERIDIANS" class="digital--period" [class.active]="meridian==period"
                              (click)="setPeriod($event, period, true)"
                              [attr.data-automation-id]="period">{{period}}</span>
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
                                <span *ngFor="let hour of HOURS" class="analog--hour"
                                      [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour, true)"
                                      [attr.data-automation-id]="hour">{{hour}}</span>
                            </div>
                            <div class="analog--minutes">
                                <span *ngFor="let minute of MINUTES" class="analog--minute"
                                      [ngClass]="{active: activeMinute == minute}"
                                      (click)="setMinutes($event, minute, true)" [attr.data-automation-id]="minute">{{minute}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="time-footer">
                        <span class="now" (click)="clearTime()">{{ labels.now }}</span>
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

    // List of all the weekdays
    weekdays: string[] = [];
    // List of all months
    months: string[] = [];
    // List of all years (generated in ngOnInit)
    years: number[] = [];
    // Default view mode (select days)
    view: string = 'days';

    hours: number = 12;
    minutes: number = 0;
    value: any = null;

    MERIDIANS: Array<string> = ['am', 'pm'];
    HOURS: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    MINUTES: Array<string> = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    model: any;
    month: Date;
    monthLabel: string;
    weeks: any;
    selected: Date;
    selectedLabel: string = 'Date';
    meridian: any;
    heading: any;
    hoursClass: string;
    minutesClass: string;
    activeHour: number;
    activeMinute: number;
    inBetween: boolean;
    showClock: boolean = false;
    componentTabState: componentTabStates = 'date';

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

        // Set the hours if military
        if (this.military) {
            this.HOURS = ['0', ...this.HOURS, '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }

        // Set weekdays / months
        this.weekdays = this.labels.getWeekdays();
        this.months = this.labels.getMonths();

        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges): void {
        this.updateCal(this.model, false, true);
        this.updateTime(this.model, false);
    }

    isDisabled(day, start, end) {
        return Helpers.isDateBefore(day, start) || Helpers.isDateAfter(day, end);
    }

    updateTime(time: any, fireEvents: boolean): void {
        let value = time ? new Date(time) : new Date();
        let hours = value.getHours();
        let minutes: any = value.getMinutes();

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
        let value: Date = !Helpers.isBlank(date) ? new Date(date) : new Date();
        value = this.removeTime(value);
        this.month = new Date(value.getTime());
        this.monthLabel = this.labels.formatDateWithFormat(this.month, { month: 'short' });

        let start = new Date(value.getTime());
        start.setDate(1);
        this.removeTime(start.setDate(1));

        this.buildMonth(start, this.month);

        if (markedSelected) {
            this.select(null, { date: value }, fireEvents);
        }
    }

    setToday(): void {
        let tmp = new Date();
        this.updateCal(tmp, true, true);
        // Go back to days
        this.open(null, 'days');
    }

    setMonth(month: number): void {
        let tmp = this.month ? Helpers.modifyDate({ month }, this.month) : Helpers.newDate({ month });
        this.updateCal(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    setYear(year: number): void {
        let tmp = this.month ? Helpers.modifyDate({ year }, this.month) : Helpers.newDate({ year });
        this.updateCal(tmp, true, false);
        // Go back to days
        this.open(null, 'days');
    }

    select(event: Event, day: any, fireEvents: boolean): void {
        Helpers.swallowEvent(event);

        this.selected = day.date;
        this.selectedLabel = this.labels.formatDateWithFormat(this.selected, {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
        this.updateHeading();

        if (fireEvents && this.selected) {
            // Also, update the ngModel
            this.onModelChange(this.selected);
            this.model = this.selected;

            // Emit our output
            this.onSelect.next({
                month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
                year: this.selected.getFullYear(),
                day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
                date: this.selected
            });
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

    previousMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = Helpers.modifyDate({ month: this.month.getMonth() - 1 }, this.month);
        this.updateCal(tmp, false, false);
    }

    nextMonth(event: Event): void {
        Helpers.swallowEvent(event);
        let tmp = Helpers.modifyDate({ month: this.month.getMonth() + 1 }, this.month);
        this.updateCal(tmp, false, false);
    }

    updateHeading(): void {
        if (!this.selected) {
            return;
        }
        this.heading = {
            month: this.labels.formatDateWithFormat(this.selected, { month: 'long' }),
            year: this.selected.getFullYear(),
            day: this.labels.formatDateWithFormat(this.selected, { weekday: 'long' }),
            date: this.selected
        };
    }

    removeTime(date: any) {
        let ret = new Date(date);
        ret.setHours(0);
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
            date = Helpers.modifyDate({ day: date.getDate() - date.getDay() }, date);
        }

        while (!done) {
            // Build the days for the weeks
            this.weeks.push({ days: this.buildWeek(new Date(date.getTime()), month) });

            // Increment variables for the next iteration
            date = Helpers.modifyDate({ day: date.getDate() + 7 }, date);
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
                isCurrentMonth: date.getMonth() === month.getMonth(),
                isToday: date.getDate() === new Date().getDate(),
                date: date
            });

            // Increment for the next iteration
            date = Helpers.modifyDate({ day: date.getDate() + 1 }, date);
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

        let value = Helpers.modifyDate({ hours: hours, minutes: this.minutes, seconds: 0 });
        if (this.model) {
            value = Helpers.modifyDate({ hours: hours, minutes: this.minutes, seconds: 0 }, this.model);
        }
        this.onModelChange(value);
        this.model = value;

        //onSelect needs to be fired after the model has been changed
        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value,
            text: `${this.hours}:${this.minutes} ${this.meridian}`
        });
    }

    clearTime(): void {
        this.updateTime(null, true);
        this.dispatchChange();
    }

    toggleTimePicker(tab: componentTabStates): void {
        this.showClock = !this.showClock;
        this.componentTabState = tab;
    }

    // ValueAccessor Functions
    writeValue(model: any): void {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.updateCal(model, false, true);
            this.updateTime(model, false);
        }
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
