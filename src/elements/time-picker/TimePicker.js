import { Component, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import moment from 'moment/moment';

import { swallowEvent } from './../../utils/Helpers';

@Component({
    selector: 'novo-time-picker',
    inputs: [
        'value',
        'inline'
    ],
    outputs: [
        'onSelect'
    ],
    directives: [
        CORE_DIRECTIVES
    ],
    template: `
        <div class="digital">
            <div class="digital--inner">
                <span class="digital--clock">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                </span>
                <div class="control-block">
                    <span *ngFor="#period of MERIDIANS" class="digital--period" [class.active]="meridian==period" (click)="setPeriod($event, period)" [attr.data-automation-id]="period">{{period}}</span>
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
                    <span *ngFor="#hour of HOURS; #h=index;" class="analog--hour" [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour)" [attr.data-automation-id]="hour">{{hour}}</span>
                </div>
                <div class="analog--minutes">
                    <span *ngFor="#minute of MINUTES; #m=index;" class="analog--minute" [ngClass]="{active: activeMinute == minute}" (click)="setMinutes($event, minute)" [attr.data-automation-id]="minute">{{minute}}</span>
                </div>
            </div>
        </div>
    `
})
export class TimePicker {
    constructor() {
        this.HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];
        this.MERIDIANS = ['am', 'pm'];
        this.onSelect = new EventEmitter();
        this.hours = 3;
        this.minutes = 15;
    }

    ngOnInit() {
        if (this.value) {
            let momentValue = moment(this.value);
            let hours = momentValue.hours();
            let minutes = momentValue.minutes();

            this.meridian = hours >= 12 ? 'pm' : 'am';

            hours = hours % 12;
            hours = hours || 12;
            minutes = minutes < 10 ? `0${minutes}` : minutes;

            this.setHours(null, hours);
            this.setMinutes(null, minutes);
            this.checkBetween(minutes);
        }
    }

    checkBetween(val) {
        this.inBetween = (this.MINUTES.indexOf(val) >= 0) ? false : true;
    }

    setHours(event, hours) {
        swallowEvent(event);
        this.hours = hours;
        this.hoursClass = `hour-${hours}`;
        this.activeHour = hours;
        this.dispatchChange();
    }

    setMinutes(event, minutes) {
        swallowEvent(event);
        this.minutes = minutes;
        this.minutesClass = `min-${minutes}`;
        this.activeMinute = minutes;
        this.checkBetween(minutes);
        this.dispatchChange();
    }

    setPeriod(event, period) {
        swallowEvent(event);
        this.meridian = period;
        this.dispatchChange();
    }

    dispatchChange() {
        let hours = (this.meridian === 'pm') ? Number(this.hours) + 12 : this.hours;
        let value = moment().hours(hours).minutes(this.minutes);
        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value.toDate(),
            moment: value,
            text: `${this.hours}:${this.minutes} ${this.meridian}`
        });
    }
}

export const NOVO_TIME_PICKER_ELEMENTS = [TimePicker];
