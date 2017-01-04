// NG2
import { Component, Input, Output, ElementRef, EventEmitter, trigger, state, style, transition, animate, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
// Vendor
import { Observable } from 'rxjs/Observable';
// APP
import { NovoFormGroup } from './DynamicForm';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../services/novo-label-service';
import { Helpers } from './../../utils/Helpers';

@Component({
    selector: 'novo-control',
    template: `
        <div class="novo-control-container" [formGroup]="form" *ngIf="!control.hidden || control.type === 'hidden' || control.controlType === 'hidden'">
            <!--Label (for horizontal)-->
            <label [attr.for]="control.key" *ngIf="form.layout !== 'vertical'">{{control.label}}</label>
            <div class="novo-control-input-container">
                <!--Label (for vertical)-->
                <label
                    *ngIf="form.layout === 'vertical'"
                    class="novo-control-label"
                    [attr.for]="control.key"
                    [class.novo-control-empty]="!hasValue"
                    [class.novo-control-focused]="focused"
                    [class.novo-control-filled]="hasValue"
                    [class.novo-control-always-active]="alwaysActive || control.placeholder"
                    [class.novo-control-extra-spacing]="requiresExtraSpacing">
                    {{control.label}}
                </label>
                <!--Required Indicator-->
                <i [hidden]="!control.required" class="required-indicator" [ngClass]="{'bhi-circle': !isValid, 'bhi-check': isValid}"></i>
                <!--Form Controls-->
                <div class="novo-control-input {{control.controlType}}" [ngSwitch]="control.controlType" [attr.data-automation-id]="control.key">
                    <!--Text-based Inputs-->
                    <!--TODO prefix/suffix on the control-->
                    <div class="novo-control-input-container novo-control-input-with-label" *ngSwitchCase="'textbox'">
                        <input *ngIf="control.type !== 'number'" [formControlName]="control.key" [id]="control.key" [type]="control.type" [placeholder]="control.placeholder" (input)="emitChange($event)" [maxlength]="control.maxlength" (focus)="handleFocus($event)" (blur)="handleBlur($event)">
                        <input *ngIf="control.type === 'number'" [formControlName]="control.key" [id]="control.key" [type]="control.type" [placeholder]="control.placeholder" (keypress)="restrictKeys($event)" (input)="emitChange($event)" [maxlength]="control.maxlength" (focus)="handleFocus($event)" (blur)="handleBlur($event)" step="any">
                        <label class="input-label" *ngIf="control.subType === 'currency'">{{control.currencyFormat}}</label>
                        <label class="input-label" *ngIf="control.subType === 'percentage'">%</label>
                    </div>
                    <!--TextArea-->
                    <textarea *ngSwitchCase="'text-area'" [name]="control.key" [attr.id]="control.key" [placeholder]="control.placeholder" [formControlName]="control.key" (input)="resizeTextArea($event)" (input)="emitChange($event)" [maxlength]="control.maxlength"></textarea>
                    <!--Editor-->
                    <novo-editor *ngSwitchCase="'editor'" [name]="control.key" [formControlName]="control.key"></novo-editor>
                    <!--HTML5 Select-->
                    <select [id]="control.key" *ngSwitchCase="'native-select'" [formControlName]="control.key">
                        <option *ngIf="control.placeholder" value="" disabled selected hidden>{{control.placeholder}}</option>
                        <option *ngFor="let opt of control.options" [value]="opt.key">{{opt.value}}</option>
                    </select>
                    <!--File-->
                    <novo-file-input *ngSwitchCase="'file'" [formControlName]="control.key" [id]="control.key" [name]="control.key" [placeholder]="control.placeholder" [multiple]="control.multiple"></novo-file-input>
                    <!--Tiles-->
                    <novo-tiles *ngSwitchCase="'tiles'" [options]="control.options" [formControlName]="control.key" (onChange)="modelChange($event)"></novo-tiles>
                    <!--Picker-->
                    <div class="novo-control-input-container" *ngSwitchCase="'picker'">
                        <novo-picker [config]="control.config" [formControlName]="control.key" [placeholder]="control.placeholder" *ngIf="!control.multiple" (select)="modelChange($event);" (typing)="handleTyping($event)"></novo-picker>
                        <chips [source]="control.config" [type]="control.config.type" [formControlName]="control.key" [placeholder]="control.placeholder" *ngIf="control.multiple" [closeOnSelect]="control.closeOnSelect" (changed)="modelChange($event)" (typing)="handleTyping($event)"></chips>
                    </div>
                    <!--Novo Select-->
                    <novo-select *ngSwitchCase="'select'" [options]="control.options" [headerConfig]="control.headerConfig" [placeholder]="control.placeholder" [formControlName]="control.key"></novo-select>
                    <!--Radio-->
                    <div class="novo-control-input-container" *ngSwitchCase="'radio'">
                        <novo-radio [vertical]="vertical" [name]="control.key" [formControlName]="control.key" *ngFor="let option of control.options" [value]="option.value" [label]="option.label" [checked]="option.value === form.value[control.key]"></novo-radio>
                    </div>
                    <!--Time-->
                    <div class="novo-control-input-container" *ngSwitchCase="'time'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event);" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-clock" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-time-picker [hidden]="!active" (onSelect)="formatTimeValue($event);" [formControlName]="control.key"></novo-time-picker>
                    </div>
                    <!--Date-->
                    <div class="novo-control-input-container" *ngSwitchCase="'date'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event);" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-calendar" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-date-picker inline="true" [hidden]="!active" (onSelect)="formatDateValue($event);" [formControlName]="control.key"></novo-date-picker>
                    </div>
                    <!--Date and Time-->
                    <div class="novo-control-input-container" *ngSwitchCase="'date-time'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event);" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-calendar" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-date-time-picker [hidden]="!active" (onSelect)="formatDateTimeValue($event);" [formControlName]="control.key"></novo-date-time-picker>
                    </div>
                    <!--Address-->
                    <novo-address *ngSwitchCase="'address'" [formControlName]="control.key"></novo-address>
                    <!--Checkbox-->
                    <novo-checkbox *ngSwitchCase="'checkbox'" [formControlName]="control.key" [name]="control.key"></novo-checkbox>
                    <!--Checklist-->
                    <novo-check-list *ngSwitchCase="'checklist'" [formControlName]="control.key" [name]="control.key" [options]="control.options"></novo-check-list>
                    <!--QuickNote-->
                    <novo-quick-note *ngSwitchCase="'quick-note'" [formControlName]="control.key" [placeholder]="control.placeholder" [config]="control.config" (change)="modelChange($event)"></novo-quick-note>
                </div>
            </div>
            <!--Error Message-->
            <div class="error-message">
                <span *ngIf="isDirty && errors?.required">{{control.label | uppercase}} is required</span>
                <span *ngIf="isDirty && errors?.invalidEmail">{{control.label | uppercase}} requires a valid email (ex. abc@123.com)</span>
                <span *ngIf="isDirty && errors?.invalidAddress">{{control.label | uppercase}} requires all fields filled out</span>
                <span *ngIf="isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)">{{control.label | uppercase}} is too large</span>
            </div>
        </div>
    `,
    host: {
        '[class.disabled]': 'control.disabled'
    }
})
export class NovoControlElement extends OutsideClick implements OnInit, OnDestroy {
    @Input() control;
    @Input() form: NovoFormGroup;
    @Output() change: EventEmitter<any> = new EventEmitter();

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focused: boolean = false;
    formattedValue: string = '';

    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
    }

    ngOnInit() {
        // Make sure to initially format the time controls
        if (this.control && this.control.value) {
            if (this.control.controlType === 'date') {
                this.formatDateValue({ date: this.control.value });
            } else if (this.control.controlType === 'time') {
                this.formatTimeValue({ date: this.control.value });
            } else if (this.control.controlType === 'date-time') {
                this.formatDateTimeValue({ date: this.control.value });
            }
        }
        if (this.control) {
            // Listen to clear events
            this.control.forceClear.subscribe(() => {
                this.clearValue();
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.control) {
            // Un-listen for clear events
            this.control.forceClear.unsubscribe();
        }
    }

    get errors() {
        return this.form.controls[this.control.key].errors;
    }

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    get isDirty() {
        return this.form.controls[this.control.key].dirty || this.control.dirty;
    }

    get hasValue() {
        return !Helpers.isEmpty(this.form.value[this.control.key]);
    }

    get focused() {
        return this._focused;
    }

    get alwaysActive() {
        // Controls that always have the label active
        return ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'quick-note'].indexOf(this.control.controlType) !== -1;
    }

    get requiresExtraSpacing() {
        // Chips
        if (this.control.controlType === 'picker' && this.control.multiple && this.hasValue) {
            return true;
        }
        return false;
    }

    handleTyping(event: any) {
        this._focused = event && event.length;
    }

    handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
    }

    clearValue() {
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
    }

    formatDateValue(event) {
        this.formattedValue = this.labels.formatDateWithFormat(event.date, this.labels.dateFormat);
        this.toggleActive(null, false);
    }

    formatTimeValue(event) {
        this.formattedValue = this.labels.formatDateWithFormat(event.date, this.labels.timeFormat);
    }

    formatDateTimeValue(event) {
        this.formattedValue = this.labels.formatDateWithFormat(event.date, this.labels.dateTimeFormat);
    }

    resizeTextArea(event) {
        // Reset the height
        let height = event.target.value.length > 0 ? `${event.target.scrollHeight}px` : '2rem';
        event.target.style.height = '';
        event.target.style.height = height;
    }

    modelChange(value) {
        if (!value) {
            this._focused = false;
        }
        this.change.emit(value);
    }

    restrictKeys(event) {
        const NUMBERS_ONLY = /[0-9]/;
        const NUMBERS_WITH_DECIMAL = /[0-9\.]/;
        let key = String.fromCharCode(event.charCode);
        if (this.control.subType === 'number' && !NUMBERS_ONLY.test(key)) {
            event.preventDefault();
        } else if (~['currency', 'float', 'percentage'].indexOf(this.control.subType) && !NUMBERS_WITH_DECIMAL.test(key)) {
            event.preventDefault();
        }
    }

    emitChange(value) {
        this.change.emit(value);
    }
}
