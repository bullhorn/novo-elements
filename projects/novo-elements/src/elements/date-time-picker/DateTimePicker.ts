// NG2
import { ElementRef, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const DATE_TIME_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoDateTimePickerElement),
  multi: true,
};

@Component({
  selector: 'novo-date-time-picker',
  providers: [DATE_TIME_PICKER_VALUE_ACCESSOR],
  animations: [
    trigger('dateTextState', [
      state(
        'date',
        style({
          opacity: '1.0',
        }),
      ),
      state(
        'time',
        style({
          opacity: '0.6',
        }),
      ),
      transition('date <=> time', animate('200ms ease-in')),
    ]),
    trigger('timeTextState', [
      state(
        'date',
        style({
          opacity: '0.6',
        }),
      ),
      state(
        'time',
        style({
          opacity: '1.0',
        }),
      ),
      transition('date <=> time', animate('200ms ease-in')),
    ]),
    trigger('indicatorState', [
      state(
        'date',
        style({
          transform: 'translateX(0%)',
        }),
      ),
      state(
        'time',
        style({
          transform: 'translateX(100%)',
        }),
      ),
      transition('date <=> time', animate('200ms ease-in')),
    ]),
    trigger('containerState', [
      state(
        'date',
        style({
          transform: 'translateX(0%)',
        }),
      ),
      state(
        'time',
        style({
          transform: 'translateX(-100%)',
        }),
      ),
      transition('date <=> time', animate('200ms ease-in')),
    ]),
  ],
  template: `
        <div class="date-time-container">
            <div class="date-time-tabs">
                <span class="date-tab" (click)="toggleView('date')" [@dateTextState]="componentTabState" data-automation-id="novo-date-time-date-tab">{{selectedLabel}}</span>
                <span class="time-tab" (click)="toggleView('time')" [@timeTextState]="componentTabState" data-automation-id="novo-date-time-time-tab">
                    <span class="hours" data-automation-id="novo-time-picker-hours">{{hours}}</span>:<span
                    class="minutes" data-automation-id="novo-time-picker-minutes">{{minutes}}</span>
                    <span *ngIf="!military" class="meridian">{{meridian}}</span>
                </span>
                <i class="date-time-indicator" [@indicatorState]="componentTabState"></i>
            </div>
            <div class="view-container" [@containerState]="componentTabState">
                <div class="calendar">
                    <novo-date-picker (onSelect)="onDateSelected($event)" [(ngModel)]="model" inline="true" [minYear]="minYear" [maxYear]="maxYear" [start]="start" [end]="end"></novo-date-picker>
                </div>
                <div class="time-picker">
                    <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" [military]="military" inline="true"></novo-time-picker>
                </div>
            </div>
        </div>
    `,
})
export class NovoDateTimePickerElement implements ControlValueAccessor {
  @Input()
  minYear: any;
  @Input()
  maxYear: any;
  @Input()
  start: any;
  @Input()
  end: any;
  @Input()
  military: any;

  // Select callback for output
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter(false);

  componentTabState: string = 'date';
  selectedLabel: string;
  hours: string;
  minutes: string;
  meridian: string;
  datePickerValue: Date = new Date();
  timePickerValue: Date = new Date();

  model: any;
  _onChange: Function = () => {};
  _onTouched: Function = () => {};

  constructor(public labels: NovoLabelService, private element: ElementRef) {}

  toggleView(tab: string): void {
    this.componentTabState = tab;
  }

  setDateLabels(value: Date) {
    this.selectedLabel = this.labels.formatDateWithFormat(value, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  }

  setTimeLabels(value: Date) {
    let hours = value.getHours();
    let minutes = value.getMinutes();

    this.meridian = value.toLocaleTimeString().slice(-2);

    if (!this.military) {
      hours = this.meridian === 'PM' && hours > 12 ? hours - 12 : hours;

      // Special case for 12
      if (this.meridian === 'PM' && hours === 24) {
        hours = 12;
      } else if (this.meridian === 'AM' && hours === 0) {
        hours = 12;
      }
    }

    this.hours = hours.toString().length === 1 ? `0${hours.toString()}` : hours.toString();
    this.minutes = minutes.toString().length === 1 ? `0${minutes.toString()}` : minutes.toString();
  }

  onDateSelected(event: { month?: any; year?: any; day?: any; date?: Date }) {
    this.datePickerValue = event.date;
    this.model = this.createFullDateValue(this.datePickerValue, this.timePickerValue);
    this.setDateLabels(this.model);
    this.onSelect.emit({ date: this.model });
    this._onChange(this.model);
    this.toggleView('time');
  }

  onTimeSelected(event: { hours?: number; minutes?: number; meridian?: string; date?: Date; text?: string }) {
    this.timePickerValue = event.date;
    this.model = this.createFullDateValue(this.model, this.timePickerValue);
    this.setTimeLabels(this.model);
    this.onSelect.emit({ date: this.model });
    this._onChange(this.model);
  }

  createFullDateValue(datePickerValue: Date, timePickerValue: Date) {
    return dateFns.setMilliseconds(
      dateFns.setSeconds(
        dateFns.setMinutes(dateFns.setHours(datePickerValue, dateFns.getHours(timePickerValue)), dateFns.getMinutes(timePickerValue)),
        dateFns.getSeconds(timePickerValue),
      ),
      dateFns.getMilliseconds(timePickerValue),
    );
  }

  // ValueAccessor Functions
  writeValue(model: any): void {
    this.model = model;
    if (Helpers.isEmpty(model)) {
      this.model = new Date();
    } else if (!isNaN(model)) {
      this.model = new Date(model);
    }
    this.datePickerValue = this.model;
    this.timePickerValue = this.model;
    if (Helpers.isDate(this.model)) {
      this.setDateLabels(this.model);
      this.setTimeLabels(this.model);
    }
  }

  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }
}
