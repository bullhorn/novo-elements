import { trigger, state, transition, style, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Output, Input, Component, NgModule } from '@angular/core';
import * as i3 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { setMilliseconds, setSeconds, setMinutes, setHours, getHours, getMinutes, getSeconds, getMilliseconds, isDate } from 'date-fns';
import * as i1 from 'novo-elements/services';
import { Helpers, DateUtil } from 'novo-elements/utils';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'novo-elements/elements/date-picker';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import * as i5 from 'novo-elements/elements/time-picker';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { IMaskModule } from 'angular-imask';
import { NovoOverlayModule } from 'novo-elements/elements/common';

// NG2
// Value accessor for the component (supports ngModel)
const DATE_TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerElement),
    multi: true,
};
class NovoDateTimePickerElement {
    constructor(labels, element) {
        this.labels = labels;
        this.element = element;
        this.weekStart = 0;
        // Select callback for output
        this.onSelect = new EventEmitter(false);
        this.componentTabState = 'date';
        this.datePickerValue = new Date();
        this.timePickerValue = new Date();
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    toggleView(tab) {
        this.componentTabState = tab;
    }
    onModelChange(event) {
        this.model = this.createFullDateValue(this.datePickerValue, event);
    }
    setDateLabels(value) {
        this.selectedLabel = this.labels.formatDateWithFormat(value, {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    }
    setTimeLabels(value) {
        let hours = value.getHours();
        const minutes = value.getMinutes();
        this.meridian = value.toLocaleTimeString().slice(-2);
        if (!this.military) {
            hours = this.meridian === 'PM' && hours > 12 ? hours - 12 : hours;
            // Special case for 12
            if (this.meridian === 'PM' && hours === 24) {
                hours = 12;
            }
            else if (this.meridian === 'AM' && hours === 0) {
                hours = 12;
            }
        }
        this.hours = hours.toString();
        this.minutes = minutes.toString().length === 1 ? `0${minutes.toString()}` : minutes.toString();
    }
    onDateSelected(event) {
        this.datePickerValue = event.date;
        if (this.defaultTime === 'start') {
            this.timePickerValue = new Date(this.timePickerValue.setHours(0, 0, 0));
        }
        else if (this.defaultTime === 'end') {
            this.timePickerValue = new Date(this.timePickerValue.setHours(23, 59, 59));
        }
        this.model = this.createFullDateValue(this.datePickerValue, this.timePickerValue);
        this.setDateLabels(this.model);
        this.onSelect.emit({ date: this.model });
        this._onChange(this.model);
        this.toggleView('time');
    }
    onTimeSelected(event) {
        this.timePickerValue = event.date;
        this.model = this.createFullDateValue(this.model, this.timePickerValue);
        this.setTimeLabels(this.model);
        this.onSelect.emit({ date: this.model });
        this._onChange(this.model);
    }
    createFullDateValue(datePickerValue, timePickerValue) {
        return setMilliseconds(setSeconds(setMinutes(setHours(datePickerValue, getHours(timePickerValue)), getMinutes(timePickerValue)), getSeconds(timePickerValue)), getMilliseconds(timePickerValue));
    }
    // ValueAccessor Functions
    writeValue(modelArg) {
        const model = modelArg;
        if (Helpers.isEmpty(model)) {
            this.model = new Date();
        }
        else if (Helpers.isString(model) || !isNaN(model)) {
            this.model = DateUtil.parse(model);
        }
        else {
            this.model = model;
        }
        this.datePickerValue = this.model;
        this.timePickerValue = this.model;
        if (Helpers.isDate(this.model)) {
            this.setDateLabels(this.datePickerValue);
            this.setTimeLabels(this.timePickerValue);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDateTimePickerElement, isStandalone: false, selector: "novo-date-time-picker", inputs: { defaultTime: "defaultTime", minYear: "minYear", maxYear: "maxYear", start: "start", end: "end", military: "military", weekStart: "weekStart", disabledDateMessage: "disabledDateMessage" }, outputs: { onSelect: "onSelect" }, providers: [DATE_TIME_PICKER_VALUE_ACCESSOR], ngImport: i0, template: `
    <div class="date-time-container">
      <div class="date-time-tabs">
        <span
          class="date-tab"
          (click)="toggleView('date')"
          [@dateTextState]="componentTabState"
          data-automation-id="novo-date-time-date-tab"
          >{{ selectedLabel }}</span
        >
        <span
          class="time-tab"
          (click)="toggleView('time')"
          [@timeTextState]="componentTabState"
          data-automation-id="novo-date-time-time-tab"
        >
          <span class="hours" data-automation-id="novo-time-picker-hours">{{ hours }}</span
          >:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{ minutes }}</span>
          <span *ngIf="!military" class="meridian"> {{ meridian }}</span>
        </span>
        <i class="date-time-indicator" [@indicatorState]="componentTabState"></i>
      </div>
      <div class="view-container" [@containerState]="componentTabState">
        <div class="calendar">
          <novo-date-picker
            (onSelect)="onDateSelected($event)"
            [(ngModel)]="model"
            inline="true"
            [minYear]="minYear"
            [maxYear]="maxYear"
            [start]="start"
            [end]="end"
            [disabledDateMessage]="disabledDateMessage"
            [weekStart]="weekStart"
          ></novo-date-picker>
        </div>
        <div class="time-picker">
          <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" (ngModelChange)="onModelChange($event)" [military]="military" inline="true"></novo-time-picker>
        </div>
      </div>
    </div>
  `, isInline: true, styles: [":host{display:block;width:min-content;overflow:hidden;border-radius:4px;background-color:#fff;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001}:host .date-time-container{position:relative}:host .date-time-container .view-container{position:relative}:host .date-time-container ::ng-deep .time-picker{position:absolute;height:100%;width:100%;background:#fff;transform:translate(100%);transition:transform .2s ease-in-out;z-index:10;top:0}:host .date-time-container ::ng-deep .time-picker novo-time-picker{width:inherit;border-radius:0}:host .date-time-container ::ng-deep .time-picker .increments{width:unset}:host .date-time-container ::ng-deep .time-picker .increments novo-list-item{width:auto}:host .date-time-container .date-time-tabs{border-bottom:1px solid #e0e0e0;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-time-container .date-time-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;transition:opacity .2s ease-in-out;opacity:.6}:host .date-time-container .date-time-tabs>span:hover{opacity:1!important}:host .date-time-container .date-time-tabs>span .meridian{text-transform:uppercase}:host .date-time-container .date-time-tabs .date-time-indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .calendar{box-shadow:none;background:transparent}:host .digital{height:45px}:host novo-time-picker{box-shadow:none}:host novo-time-picker .analog{margin:0}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoDatePickerElement, selector: "novo-date-picker", inputs: ["minYear", "maxYear", "start", "end", "inline", "weekStart", "preselected", "hideOverflowDays", "hideFooter", "hideToday", "disabledDateMessage", "dateForInitialView", "numberOfMonths", "mode", "range", "weekRangeSelect"], outputs: ["onSelect"] }, { kind: "component", type: i5.NovoTimePickerElement, selector: "novo-time-picker", inputs: ["military", "analog", "inline", "step", "hasButtons", "saveDisabled"], outputs: ["onSelect", "onSave", "onCancel"] }], animations: [
            trigger('dateTextState', [
                state('date', style({
                    opacity: '1.0',
                })),
                state('time', style({
                    opacity: '0.6',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('timeTextState', [
                state('date', style({
                    opacity: '0.6',
                })),
                state('time', style({
                    opacity: '1.0',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('indicatorState', [
                state('date', style({
                    transform: 'translateX(0%)',
                })),
                state('time', style({
                    transform: 'translateX(100%)',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
            trigger('containerState', [
                state('date', style({
                    transform: 'translateX(0%)',
                })),
                state('time', style({
                    transform: 'translateX(-100%)',
                })),
                transition('date <=> time', animate('200ms ease-in')),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-time-picker', providers: [DATE_TIME_PICKER_VALUE_ACCESSOR], animations: [
                        trigger('dateTextState', [
                            state('date', style({
                                opacity: '1.0',
                            })),
                            state('time', style({
                                opacity: '0.6',
                            })),
                            transition('date <=> time', animate('200ms ease-in')),
                        ]),
                        trigger('timeTextState', [
                            state('date', style({
                                opacity: '0.6',
                            })),
                            state('time', style({
                                opacity: '1.0',
                            })),
                            transition('date <=> time', animate('200ms ease-in')),
                        ]),
                        trigger('indicatorState', [
                            state('date', style({
                                transform: 'translateX(0%)',
                            })),
                            state('time', style({
                                transform: 'translateX(100%)',
                            })),
                            transition('date <=> time', animate('200ms ease-in')),
                        ]),
                        trigger('containerState', [
                            state('date', style({
                                transform: 'translateX(0%)',
                            })),
                            state('time', style({
                                transform: 'translateX(-100%)',
                            })),
                            transition('date <=> time', animate('200ms ease-in')),
                        ]),
                    ], template: `
    <div class="date-time-container">
      <div class="date-time-tabs">
        <span
          class="date-tab"
          (click)="toggleView('date')"
          [@dateTextState]="componentTabState"
          data-automation-id="novo-date-time-date-tab"
          >{{ selectedLabel }}</span
        >
        <span
          class="time-tab"
          (click)="toggleView('time')"
          [@timeTextState]="componentTabState"
          data-automation-id="novo-date-time-time-tab"
        >
          <span class="hours" data-automation-id="novo-time-picker-hours">{{ hours }}</span
          >:<span class="minutes" data-automation-id="novo-time-picker-minutes">{{ minutes }}</span>
          <span *ngIf="!military" class="meridian"> {{ meridian }}</span>
        </span>
        <i class="date-time-indicator" [@indicatorState]="componentTabState"></i>
      </div>
      <div class="view-container" [@containerState]="componentTabState">
        <div class="calendar">
          <novo-date-picker
            (onSelect)="onDateSelected($event)"
            [(ngModel)]="model"
            inline="true"
            [minYear]="minYear"
            [maxYear]="maxYear"
            [start]="start"
            [end]="end"
            [disabledDateMessage]="disabledDateMessage"
            [weekStart]="weekStart"
          ></novo-date-picker>
        </div>
        <div class="time-picker">
          <novo-time-picker (onSelect)="onTimeSelected($event)" [(ngModel)]="model" (ngModelChange)="onModelChange($event)" [military]="military" inline="true"></novo-time-picker>
        </div>
      </div>
    </div>
  `, standalone: false, styles: [":host{display:block;width:min-content;overflow:hidden;border-radius:4px;background-color:#fff;box-shadow:0 1px 3px #00000026,0 2px 7px #0000001a;z-index:9001}:host .date-time-container{position:relative}:host .date-time-container .view-container{position:relative}:host .date-time-container ::ng-deep .time-picker{position:absolute;height:100%;width:100%;background:#fff;transform:translate(100%);transition:transform .2s ease-in-out;z-index:10;top:0}:host .date-time-container ::ng-deep .time-picker novo-time-picker{width:inherit;border-radius:0}:host .date-time-container ::ng-deep .time-picker .increments{width:unset}:host .date-time-container ::ng-deep .time-picker .increments novo-list-item{width:auto}:host .date-time-container .date-time-tabs{border-bottom:1px solid #e0e0e0;display:flex;align-items:center;justify-content:space-between;position:relative;height:45px}:host .date-time-container .date-time-tabs>span{color:#4a89dc;text-align:center;flex:1;cursor:pointer;transition:opacity .2s ease-in-out;opacity:.6}:host .date-time-container .date-time-tabs>span:hover{opacity:1!important}:host .date-time-container .date-time-tabs>span .meridian{text-transform:uppercase}:host .date-time-container .date-time-tabs .date-time-indicator{position:absolute;width:50%;height:2px;bottom:0;left:0;background:#4a89dc;transition:transform .2s ease-in-out}:host .calendar{box-shadow:none;background:transparent}:host .digital{height:45px}:host novo-time-picker{box-shadow:none}:host novo-time-picker .analog{margin:0}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ElementRef }], propDecorators: { defaultTime: [{
                type: Input
            }], minYear: [{
                type: Input
            }], maxYear: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], military: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], onSelect: [{
                type: Output
            }] } });

// NG
// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDateTimePickerInputElement),
    multi: true,
};
class NovoDateTimePickerInputElement {
    constructor(element, labels, _changeDetectorRef) {
        this.element = element;
        this.labels = labels;
        this._changeDetectorRef = _changeDetectorRef;
        /** View -> model callback called when value changes */
        this._onChange = () => { };
        /** View -> model callback called when autocomplete has been touched */
        this._onTouched = () => { };
        this.military = false;
        this.disabled = false;
        this.weekStart = 0;
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
    }
    writeValue(value) {
        this.datePart = isDate(value) ? DateUtil.parse(value) : value;
        this.timePart = isDate(value) ? DateUtil.parse(value) : value;
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    updateDate(event) {
        this.datePart = event;
        this.checkParts();
    }
    updateTime(event) {
        this.timePart = event;
        this.checkParts();
    }
    handleBlur(event) {
        this.blurEvent.emit(event);
        this.changeEvent.emit(event);
    }
    handleFocus(event) {
        this.focusEvent.emit(event);
    }
    checkParts() {
        try {
            if (this.datePart instanceof Date && this.timePart instanceof Date) {
                this.dispatchOnChange(new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), this.timePart.getHours(), this.timePart.getMinutes()));
            }
            else if (this.datePart instanceof Date) {
                this.timePart = new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), 12, 0);
                this.dispatchOnChange(new Date(this.datePart.getFullYear(), this.datePart.getMonth(), this.datePart.getDate(), this.timePart.getHours(), this.timePart.getMinutes()));
            }
            else {
                this.dispatchOnChange(null);
            }
        }
        catch (err) {
            // Date not valid
            this.dispatchOnChange(null);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    dispatchOnChange(newValue) {
        if (newValue !== this.value) {
            this._onChange(newValue);
            this._setTriggerValue(newValue);
        }
    }
    _setTriggerValue(value) {
        this.value = value;
        this._changeDetectorRef.markForCheck();
    }
    setValue(event) {
        if (event && event.date) {
            this.dispatchOnChange(event.date);
        }
    }
    setValueAndClose(event) {
        this.setValue(event);
    }
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    clearValue() {
        this.dispatchOnChange(null);
    }
    get hasValue() {
        return !Helpers.isEmpty(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerInputElement, deps: [{ token: i0.ElementRef }, { token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: NovoDateTimePickerInputElement, isStandalone: false, selector: "novo-date-time-picker-input", inputs: { name: "name", start: "start", end: "end", placeholder: "placeholder", maskOptions: "maskOptions", military: "military", disabled: "disabled", format: "format", weekStart: "weekStart", disabledDateMessage: "disabledDateMessage" }, outputs: { blurEvent: "blurEvent", focusEvent: "focusEvent", changeEvent: "changeEvent" }, providers: [DATE_VALUE_ACCESSOR], ngImport: i0, template: `
    <novo-date-picker-input
      [ngModel]="datePart"
      (ngModelChange)="updateDate($event)"
      [start]="start"
      [end]="end"
      [disabledDateMessage]="disabledDateMessage"
      [maskOptions]="maskOptions"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
      [weekStart]="weekStart"
    ></novo-date-picker-input>
    <novo-time-picker-input
      [ngModel]="timePart"
      (ngModelChange)="updateTime($event)"
      [military]="military"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
    ></novo-time-picker-input>
  `, isInline: true, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;max-width:340px}:host novo-date-picker-input{margin-right:20px}:host novo-time-picker-input{max-width:130px}\n"], dependencies: [{ kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.NovoDatePickerInputElement, selector: "novo-date-picker-input", inputs: ["name", "start", "end", "placeholder", "maskOptions", "format", "textMaskEnabled", "allowInvalidDate", "overlayOnElement", "hideFooter", "hideToday", "hasButtons", "disabled", "disabledDateMessage", "dateForInitialView", "weekStart"], outputs: ["blurEvent", "focusEvent", "changeEvent", "onSave", "onCancel", "valueCleared"] }, { kind: "component", type: i5.NovoTimePickerInputElement, selector: "novo-time-picker-input", inputs: ["name", "placeholder", "military", "maskOptions", "disabled", "hasButtons", "saveDisabled", "overlayOnElement", "analog"], outputs: ["blurEvent", "focusEvent", "changeEvent", "onSave", "onCancel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerInputElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-date-time-picker-input', providers: [DATE_VALUE_ACCESSOR], template: `
    <novo-date-picker-input
      [ngModel]="datePart"
      (ngModelChange)="updateDate($event)"
      [start]="start"
      [end]="end"
      [disabledDateMessage]="disabledDateMessage"
      [maskOptions]="maskOptions"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
      [weekStart]="weekStart"
    ></novo-date-picker-input>
    <novo-time-picker-input
      [ngModel]="timePart"
      (ngModelChange)="updateTime($event)"
      [military]="military"
      (blurEvent)="handleBlur($event)"
      (focusEvent)="handleFocus($event)"
      [disabled]="disabled"
    ></novo-time-picker-input>
  `, standalone: false, styles: [":host{flex:1;position:relative;display:flex;flex-flow:row nowrap;max-width:340px}:host novo-date-picker-input{margin-right:20px}:host novo-time-picker-input{max-width:130px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { name: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maskOptions: [{
                type: Input
            }], military: [{
                type: Input
            }], disabled: [{
                type: Input
            }], format: [{
                type: Input
            }], weekStart: [{
                type: Input
            }], disabledDateMessage: [{
                type: Input
            }], blurEvent: [{
                type: Output
            }], focusEvent: [{
                type: Output
            }], changeEvent: [{
                type: Output
            }] } });

// NG2
class NovoDateTimePickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerModule, declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement], imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskModule, NovoOverlayModule], exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerModule, imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskModule, NovoOverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: NovoDateTimePickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, NovoDatePickerModule, NovoTimePickerModule, IMaskModule, NovoOverlayModule],
                    declarations: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                    exports: [NovoDateTimePickerElement, NovoDateTimePickerInputElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoDateTimePickerElement, NovoDateTimePickerInputElement, NovoDateTimePickerModule };
//# sourceMappingURL=novo-elements-elements-date-time-picker.mjs.map
