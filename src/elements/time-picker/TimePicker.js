import { Component, EventEmitter, Optional } from 'angular2/core'; // eslint-disable-line
import { COMMON_DIRECTIVES, NgControl, NgModel } from 'angular2/common';
import moment from 'moment/moment';

import { swallowEvent } from './../../utils/Helpers';

@Component({
    selector: 'novo-time-picker',
    inputs: [
        'military'
    ],
    outputs: [
        'onSelect'
    ],
    directives: [
        COMMON_DIRECTIVES
    ],
    template: `
        <div class="digital">
            <div class="digital--inner">
                <span class="digital--clock">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                </span>
                <div class="control-block" *ngIf="!military">
                    <span *ngFor="#period of MERIDIANS" class="digital--period" [class.active]="meridian==period" (click)="setPeriod($event, period, true)" [attr.data-automation-id]="period">{{period}}</span>
                </div>
            </div>
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
                    <span *ngFor="#hour of HOURS; #h=index;" class="analog--hour" [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour, true)" [attr.data-automation-id]="hour">{{hour}}</span>
                </div>
                <div class="analog--minutes">
                    <span *ngFor="#minute of MINUTES; #m=index;" class="analog--minute" [ngClass]="{active: activeMinute == minute}" (click)="setMinutes($event, minute, true)" [attr.data-automation-id]="minute">{{minute}}</span>
                </div>
            </div>
        </div>
    `,
    host: {
        '[class.ng-untouched]': 'model.control?.untouched == true',
        '[class.ng-touched]': 'model.control?.touched == true',
        '[class.ng-pristine]': 'model.control?.pristine == true',
        '[class.ng-dirty]': 'model.control?.dirty == true',
        '[class.ng-valid]': 'model.control?.valid == true',
        '[class.ng-invalid]': 'model.control?.valid == false',
        '[class.military]': 'military'
    }
})
export class TimePicker {
    hours = 12;
    minutes = 0;
    value = null;
    onSelect = new EventEmitter(false);
    onChange = null;
    onTouched = null;

    MERIDIANS = ['am', 'pm'];
    MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];

    constructor(@Optional() model:NgControl) {
        this.model = model || new NgModel();
        this.model.valueAccessor = this;
    }

    ngOnInit() {
        // Set the hours
        this.HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        if (this.military) {
            this.HOURS = ['0', ...this.HOURS, '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }
        this.ngOnChanges();
    }

    ngOnChanges() {
        if (this.model.value) {
            this.init(this.model.value, false);
        } else {
            this.init(moment(), false);
        }
    }

    init(value, dispatch) {
        let momentValue = moment(value);
        let hours = momentValue.hours();
        let minutes = momentValue.minutes();

        if (!this.military) {
            this.meridian = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours || 12;
        }
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        this.setHours(null, hours, dispatch);
        this.setMinutes(null, minutes, dispatch);
        this.checkBetween(minutes);
    }

    checkBetween(value) {
        this.inBetween = this.MINUTES.indexOf(String(value)) < 0;
    }

    setHours(event, hours, dispatch) {
        swallowEvent(event);
        this.hours = hours;
        this.hoursClass = `hour-${hours}`;
        this.activeHour = hours;

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setMinutes(event, minutes, dispatch) {
        swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = `min-${minutes}`;
        this.activeMinute = minutes;
        this.checkBetween(minutes);

        if (dispatch) {
            this.dispatchChange();
        }
    }

    setPeriod(event, period, dispatch) {
        swallowEvent(event);
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
        this.model.viewToModelUpdate(value.toDate());
    }

    // ValueAccessor Functions
    writeValue(value) {
        this.value = value;
        if (value) {
            this.init(value, false);
        }
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}

export const NOVO_TIME_PICKER_ELEMENTS = [TimePicker];
