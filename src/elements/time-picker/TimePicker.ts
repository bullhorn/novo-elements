// NG2
import { Component, EventEmitter, forwardRef, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { Helpers } from './../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoTimePickerElement),
    multi: true
};

@Component({
    selector: 'novo-time-picker',
    providers: [TIME_PICKER_VALUE_ACCESSOR],
    template: `
        <div class="digital" [class.inline]="inline" [class.military]="military">
            <div class="digital--inner">
                <span class="digital--clock" *ngIf="!inline">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                </span>
                <div class="control-block" *ngIf="!military">
                    <span *ngFor="let period of MERIDIANS" class="digital--period" [class.active]="meridian==period" (click)="setPeriod($event, period, true)" [attr.data-automation-id]="period">{{period}}</span>
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
                    <span *ngFor="let hour of HOURS" class="analog--hour" [ngClass]="{active: activeHour == hour}" (click)="setHours($event, hour, true)" [attr.data-automation-id]="hour">{{hour}}</span>
                </div>
                <div class="analog--minutes">
                    <span *ngFor="let minute of MINUTES" class="analog--minute" [ngClass]="{active: activeMinute == minute}" (click)="setMinutes($event, minute, true)" [attr.data-automation-id]="minute">{{minute}}</span>
                </div>
            </div>
        </div>
    `,
    host: {
        '[class.military]': 'military'
    }
})
export class NovoTimePickerElement implements ControlValueAccessor, OnInit, OnChanges {
    @Input() military: boolean = false;
    @Input() inline: boolean = false;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    hours: number = 12;
    minutes: number = 0;
    value: any = null;
    meridian: string;
    inBetween: boolean;
    hoursClass: string;
    activeHour;
    minutesClass: string;
    activeMinute;
    MERIDIANS: Array<string> = ['am', 'pm'];
    MINUTES: Array<string> = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];
    HOURS: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    ngOnInit() {
        if (this.military) {
            this.HOURS = ['0', ...this.HOURS, '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
        }
        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges) {
        if (this.model) {
            this.init(this.model, false);
        } else {
            this.init(new Date(), false);
        }
    }

    init(value, dispatch) {
        let _value = new Date(value);
        let hours: string | number = _value.getHours();
        let minutes: string | number = _value.getMinutes();

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

        let value = new Date();
        value.setHours(hours);
        value.setMinutes(this.minutes);
        value.setSeconds(0);
        this.onSelect.next({
            hours: hours,
            minutes: this.minutes,
            meridian: this.meridian,
            date: value,
            text: `${this.hours}:${this.minutes} ${this.meridian}`
        });
        this.onModelChange(value);
    }

    // ValueAccessor Functions
    writeValue(model: any): void {
        this.model = model;
        if (Helpers.isDate(model)) {
            this.init(model, false);
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
