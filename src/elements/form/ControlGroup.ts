import { Component, Input, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { NovoFormGroup, NovoFormControl } from './NovoFormControl';
import { BaseControl } from './controls/BaseControl';
import { FormUtils } from './../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export interface NovoControlGroupAddConfig {
    position: 'top' | 'bottom';
    label: string;
}

@Component({
    selector: 'novo-control-group',
    template: `
        <h6 class="novo-section-header">
            <span (click)="toggle($event)" [class.clickable]="collapsible">
                <i *ngIf="icon && !collapsible" [ngClass]="icon" [attr.data-automation-id]="'novo-control-group-icon-' + key"></i>
                <i *ngIf="collapsible" class="bhi-next" [class.toggled]="toggled" [attr.data-automation-id]="'novo-control-group-collapse-' + key"></i>
                <span [attr.data-automation-id]="'novo-control-group-label-' + key">{{ label }}</span>
            </span>
            <label class="novo-control-group-description" *ngIf="description" [attr.data-automation-id]="'novo-control-group-description-' + key">{{ description }}</label>
            <button *ngIf="add?.position === 'top' && !description" theme="dialogue" icon="add-thin" (click)="addNewControl()" [attr.data-automation-id]="'novo-control-group-top-add-' + key">{{ add?.label }}</button>
        </h6>
        <div class="novo-control-group-controls" [class.vertical]="vertical" [class.horizontal]="!vertical" [class.hidden]="collapsible && !toggled">
            <div class="novo-control-group-labels" *ngIf="!vertical && form?.controls[key]?.controls.length !== 0">
                <div class="novo-control-group-control-label" *ngFor="let label of controlLabels">
                    <span [attr.data-automation-id]="'novo-control-group-label-' + label">{{ label }}</span>
                </div>
                <div class="novo-control-group-control-button-label" *ngIf="remove" [attr.data-automation-id]="'novo-control-group-delete-' + key"></div>
            </div>
            <div class="novo-control-group-row" *ngFor="let control of form?.controls[key]?.controls; let i = index;">
                <div class="novo-control-group-control">
                    <novo-control *ngFor="let c of controls" [form]="form?.controls[key]?.controls[i]" [control]="c" [condensed]="!vertical"></novo-control>
                    <button *ngIf="remove && !vertical" theme="icon" icon="delete-o" (click)="removeControl(i)" [attr.data-automation-id]="'novo-control-group-delete-' + key"></button>
                </div>
                <button *ngIf="remove && vertical" theme="icon" icon="delete-o" (click)="removeControl(i)" [attr.data-automation-id]="'novo-control-group-delete-' + key"></button>
            </div>
            <div class="novo-control-group-empty" *ngIf="form?.controls[key]?.controls.length === 0" [attr.data-automation-id]="'novo-control-group-empty-' + key">
                {{ emptyMessage }}
            </div>
            <p *ngIf="add?.position === 'bottom'">
                <button *ngIf="add?.position === 'bottom'" theme="dialogue" icon="add-thin" (click)="addNewControl()" [attr.data-automation-id]="'novo-control-group-bottom-add-' + key">{{ add?.label }}</button>
            </p>
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
    @Input() add: NovoControlGroupAddConfig;
    // Hide/shows the remove button for removing a control
    @Input()
    set remove(v: boolean) {
        this._remove = coerceBooleanProperty(v);
    }
    get remove() {
        return this._remove;
    }
    private _remove: boolean = false;
    // Allows the control to collapse or not
    @Input()
    set collapsible(v: boolean) {
        this._collapsible = coerceBooleanProperty(v);
    }
    get collapsible() {
        return this._collapsible;
    }
    private _collapsible: boolean = false;
    // Main form group
    @Input() form: NovoFormGroup;
    // Controls for each item in the control group
    @Input() controls: BaseControl[];
    // Key of the control group (on the main form)
    @Input() key: string;
    // Label of the control group
    @Input() label: string;
    // Description of the control group (only use with position:bottom Add button!)
    @Input() description: string;
    // Message to display if there are no controls
    @Input() emptyMessage: string;
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
    public toggled: boolean = false;

    constructor(private formUtils: FormUtils, private fb: FormBuilder, private ref: ChangeDetectorRef, private labels: NovoLabelService) { }

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
            this.ref.markForCheck();
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

    public toggle(event: MouseEvent) {
        Helpers.swallowEvent(event);
        if (this.collapsible) {
            this.toggled = !this.toggled;
            this.ref.markForCheck();
        }
    }
}
