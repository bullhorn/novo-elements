import { Component, Input, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoFormGroup, NovoFormControl } from './NovoFormControl';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from './../../utils/form-utils/FormUtils';

@Component({
    selector: 'novo-control-group',
    template: `
        <h6 class="novo-section-header">
            <span>
                <i *ngIf="icon" [ngClass]="icon"></i>
                <span>{{ label }}</span>
            </span>
            <button *ngIf="add" theme="dialogue" icon="add-thin" (click)="addNewControl()">Add</button>
        </h6>
        <div class="novo-control-group-controls" [class.vertical]="vertical" [class.horizontal]="!vertical">
            <div class="novo-control-group-labels" *ngIf="!vertical && form?.controls[key]?.controls.length !== 0">
                <div class="novo-control-group-control-label" *ngFor="let label of controlLabels">
                    <span>{{ label }}</span>
                </div>
                <div class="novo-control-group-control-button-label" *ngIf="remove"></div>
            </div>
            <div class="novo-control-group-row" *ngFor="let control of form?.controls[key]?.controls; let i = index;">
                <div class="novo-control-group-control">
                    <novo-control *ngFor="let c of controls" [form]="form?.controls[key]?.controls[i]" [control]="c" [condensed]="!vertical"></novo-control>
                    <button *ngIf="remove && !vertical" theme="icon" icon="delete-o" (click)="removeControl(i)"></button>
                </div>
                <button *ngIf="remove && vertical" theme="icon" icon="delete-o" (click)="removeControl(i)"></button>
            </div>
            <div class="novo-control-group-empty" *ngIf="form?.controls[key]?.controls.length === 0">
                There are no controls...
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NovoControlGroup implements AfterContentInit {
    // Sets the display of the group to either be row (default) or vertical via flex-box
    @Input()
    set vertical(v: boolean) {
        this._vertical = coerceBooleanProperty(v);
    }
    get vertical() {
        return this._vertical;
    }
    private _vertical: boolean = false;
    // Hides/shows the add button for adding a new control
    @Input()
    set add(v: boolean) {
        this._add = coerceBooleanProperty(v);
    }
    get add() {
        return this._add;
    }
    private _add: boolean = false;
    // Hide/shows the remove button for removing a control
    @Input()
    set remove(v: boolean) {
        this._remove = coerceBooleanProperty(v);
    }
    get remove() {
        return this._remove;
    }
    private _remove: boolean = false;
    // Main form group
    @Input() form: NovoFormGroup;
    // Controls for each item in the control group
    @Input() controls: BaseControl[];
    // Key of the control group (on the main form)
    @Input() key: string;
    // Label of the control group
    @Input() label: string;
    // Icon of the control group (can have bhi prefix or not)
    @Input()
    set icon(v: string) {
        this._icon = v && v.indexOf('bhi') !== -1 ? v : `bhi-${v}`;
    }
    get icon() {
        return this._icon;
    }
    private _icon: string;
    // The initial value object, will create the form rows off of
    @Input() initialValue: {}[];

    public controlLabels: string[] = [];

    constructor(private formUtils: FormUtils, private fb: FormBuilder, private ref: ChangeDetectorRef) { }

    public ngAfterContentInit(): void {
        if (!this.initialValue) {
            // Add one control by default
            this.addNewControl();
        } else {
            // Check for array, add a control for each value, otherwise add just one control
            if (Array.isArray(this.initialValue)) {
                if (this.initialValue.length !== 0) {
                    this.initialValue.forEach(value => this.addNewControl(value));
                } else {
                    this.addNewControl();
                }
            } else {
                // If value is an object, just add one control
                this.addNewControl(this.initialValue);
            }
        }
        // If we are horizontal, grab the labels to help with layout
        if (!this.vertical) {
            this.controlLabels = this.controls.map((control: BaseControl) => control.label);
        }
    }

    public addNewControl(value?: {}): void {
        const control: FormArray = <FormArray>this.form.controls[this.key];
        const newCtrl: NovoFormGroup = this.buildControl(value);
        if (control) {
            control.push(newCtrl);
        } else {
            this.form.addControl(this.key, this.fb.array([newCtrl]));
        }
        this.ref.markForCheck();
    }

    public buildControl(value?: {}): NovoFormGroup {
        const newControls = [...this.controls];
        const ctrl: NovoFormGroup = this.formUtils.toFormGroup(newControls);
        if (value) {
            this.formUtils.setInitialValues(newControls, value);
        }
        return ctrl;
    }

    public removeControl(index: number): void {
        const control: FormArray = <FormArray>this.form.controls[this.key];
        control.removeAt(index);
        this.ref.markForCheck();
    }
}
