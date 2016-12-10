// NG2
import { Component, Input, Output, ElementRef, EventEmitter, trigger, state, style, transition, animate, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
// APP
import { NovoFormGroup } from './DynamicForm';
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { NovoLabelService } from './../../services/novo-label-service';
import { Helpers } from './../../utils/Helpers';

@Component({
    selector: 'novo-control',
    template: `
        <div class="novo-control-container" [formGroup]="form" *ngIf="!control.hidden || control.type === 'hidden'">
            <!--Label-->
            <label [attr.for]="control.key" [@verticalState]="state">{{control.label}}</label>
            <div class="novo-control-input-container">
                <!--Required Indicator-->
                <i [hidden]="!control.required" class="required-indicator" [ngClass]="{'bhi-circle': !isValid, 'bhi-check': isValid}"></i>
                <!--Form Controls-->
                <div class="novo-control-input {{control.controlType}}" [ngSwitch]="control.controlType" [attr.data-automation-id]="control.key">
                    <!--Text-based Inputs-->
                    <!--TODO prefix/suffix on the control-->
                    <div class="novo-control-input-container novo-control-input-with-label" *ngSwitchCase="'textbox'">
                        <input [formControlName]="control.key" [id]="control.key" [type]="control.type" [placeholder]="control.placeholder" (focus)="toggleState()" (blur)="toggleState()" (input)="emitChange($event)" [maxlength]="control.maxlength">
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
                        <novo-picker [config]="control.config" [formControlName]="control.key" [placeholder]="control.placeholder" *ngIf="!control.multiple" (select)="modelChange($event);checkState()" (focus)="toggleState()" (blur)="checkState()"></novo-picker>
                        <chips [source]="control.config" [type]="control.config.type" [formControlName]="control.key" [placeholder]="control.placeholder" *ngIf="control.multiple" (focus)="toggleState()" (blur)="checkState()" (changed)="modelChange($event);checkState()"></chips>
                    </div>
                    <!--Novo Select-->
                    <novo-select *ngSwitchCase="'select'" [options]="control.options" [headerConfig]="control.headerConfig" [placeholder]="control.placeholder" [formControlName]="control.key"></novo-select>
                    <!--Radio-->
                    <div class="novo-control-input-container" *ngSwitchCase="'radio'">
                        <novo-radio [vertical]="vertical" [name]="control.key" [formControlName]="control.key" *ngFor="let option of control.options" [value]="option.key" [label]="option.value"></novo-radio>
                    </div>
                    <!--Time-->
                    <div class="novo-control-input-container" *ngSwitchCase="'time'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event); toggleState()" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-clock" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-time-picker [hidden]="!active" (onSelect)="formatTimeValue($event); checkState();" [formControlName]="control.key"></novo-time-picker>
                    </div>
                    <!--Date-->
                    <div class="novo-control-input-container" *ngSwitchCase="'date'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event); toggleState()" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-calendar" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-date-picker inline="true" [hidden]="!active" (onSelect)="formatDateValue($event); checkState();" [formControlName]="control.key"></novo-date-picker>
                    </div>
                    <!--Date and Time-->
                    <div class="novo-control-input-container" *ngSwitchCase="'date-time'">
                        <input [name]="control.key" type="text" [attr.id]="control.key" [placeholder]="control.placeholder" (click)="toggleActive($event); toggleState();" [value]="formattedValue" readonly/>
                        <i (click)="toggleActive($event)" class="bhi-calendar" *ngIf="!hasValue"></i>
                        <i (click)="clearValue()" class="bhi-times" *ngIf="hasValue"></i>
                        <novo-date-time-picker [hidden]="!active" (onSelect)="formatDateTimeValue($event); checkState();" [formControlName]="control.key"></novo-date-time-picker>
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
    animations: [
        trigger('verticalState', [
            state('inactive', style({
                transform: 'translate(0px, 25px) scale(1.1)'
            })),
            state('active', style({
                transform: 'translate(-1px, 0px) scale(1)'
            })),
            state('horizontal', style({
                transform: 'translateY(0px. 0px) scale(1)'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out')),
            transition('inactive => horizontal', animate('0ms ease-in')),
            transition('horizontal => inactive', animate('0ms ease-out'))
        ]),
        trigger('hiddenState', [
            state('hidden', style({
                'opacity': '0',
                'height': '0',
                'min-height': '0'
            })),
            state('shown', style({
                'opacity': '1',
                'height': 'auto',
                'min-height': '44px'
            })),
            transition('hidden <=> shown', animate('200ms ease-in'))
        ])
    ],
    host: {
        '[class.disabled]': 'control.disabled'
    }
})
export class NovoControlElement extends OutsideClick implements OnInit, OnChanges, OnDestroy {
    @Input() control;
    @Input() form: NovoFormGroup;
    @Output() change: EventEmitter<any> = new EventEmitter();

    formattedValue: string = '';
    state: string = 'horizontal';
    alwaysActive: [any] = ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'select', 'native-select', 'quick-note'];

    constructor(element: ElementRef, public labels: NovoLabelService) {
        super(element);
        this.onActiveChange.subscribe(active => {
            if (!active) {
                setTimeout(() => {
                    this.checkState();
                });
            }
        });
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
            this.checkState();
        }
        if (this.control) {
            // Listen to clear events
            this.control.forceClear.subscribe(() => {
                this.clearValue();
            });
        }
    }

    ngOnChanges(changes?: SimpleChanges) {
        this.checkState();
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
        return !!this.form.value[this.control.key];
    }

    clearValue() {
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
        this.checkState();
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
        this.change.emit(value);
        this.checkState();
    }

    emitChange(value) {
        this.change.emit(value);
    }

    checkState() {
        setTimeout(() => {
            if (this.form.layout === 'vertical') {
                if (this.alwaysActive.indexOf(this.control.controlType) !== -1) {
                    this.state = 'active';
                } else {
                    let stateToggle = !Helpers.isEmpty(this.form.value[this.control.key]);

                    if (this.control.placeholder) {
                        stateToggle = true;
                    }

                    this.state = stateToggle ? 'active' : 'inactive';
                }
            } else {
                this.state = 'horizontal';
            }
        });
    }

    toggleState() {
        setTimeout(() => {
            if (this.form.layout === 'vertical') {
                if (this.alwaysActive.indexOf(this.control.controlType) !== -1) {
                    this.state = 'active';
                } else {
                    if (!this.form.value[this.control.key] && !this.control.placeholder) {
                        this.state = (this.state === 'active' ? 'inactive' : 'active');
                    }
                }
            } else {
                this.state = 'horizontal';
            }
        });
    }
}
