// NG2
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
// APP
import { Helpers } from './../../utils/Helpers';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

export interface NovoFormGroup {
    layout?: any;
    controls?: any;
    value?: any;
    valid?: boolean;
}

export interface NovoFieldset {
    title?: string;
    controls: Array<any>;
}

@Component({
    selector: 'novo-fieldset-header',
    template: `
        <h6><i class="bhi-section"></i>{{title}}</h6>
    `
})
export class NovoFieldsetHeaderElement {
    @Input() title: string;
}

@Component({
    selector: 'novo-control-custom',
    template: `
        <span #ref></span>
    `
})
export class NovoControlCustom implements OnInit {
    @Input() control: any;
    @Input() form: any;

    @ViewChild('ref', { read: ViewContainerRef }) referencePoint: ViewContainerRef;

    controlComponent: any;

    constructor(private componentUtils: ComponentUtils) { }

    ngOnInit() {
        this.controlComponent = this.componentUtils.appendNextToLocation(this.control.customControl, this.referencePoint);
        this.controlComponent.instance.control = this.control;
        this.controlComponent.instance.form = this.form;
    }
}

@Component({
    selector: 'novo-fieldset',
    template: `
        <div class="novo-fieldset-container">
            <novo-fieldset-header [title]="title" *ngIf="title"></novo-fieldset-header>
            <div *ngFor="let control of controls" class="novo-form-row" [class.disabled]="control.disabled">
                <novo-control *ngIf="!control.customControl" [control]="control" [form]="form"></novo-control>
                <novo-control-custom *ngIf="control.customControl" [control]="control" [form]="form"></novo-control-custom>
            </div>
        </div>
    `
})
export class NovoFieldsetElement {
    @Input() controls: Array<any> = [];
    @Input() form: any;
    @Input() title: string;
}

@Component({
    selector: 'novo-dynamic-form',
    template: `
        <div class="novo-form-container">
            <header>
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <form class="novo-form" [formGroup]="form" autocomplete="off">
                <span *ngFor="let fieldset of fieldsets">
                    <novo-fieldset *ngIf="fieldset.controls.length" [controls]="fieldset.controls" [title]="fieldset.title" [form]="form"></novo-fieldset>
                </span>
            </form>
        </div>
    `
})
export class NovoDynamicFormElement implements OnInit, OnChanges {
    @Input() controls: Array<any> = [];
    @Input() fieldsets: Array<NovoFieldset> = [];
    @Input() form: NovoFormGroup;
    @Input() layout: string;

    allFieldsRequired = false;
    allFieldsNotRequired = false;
    showingAllFields = false;
    showingRequiredFields = true;
    numControls = 0;

    ngOnInit() {
        this.form.layout = this.layout;
        if (!(this.fieldsets && this.fieldsets.length) && this.controls && this.controls.length) {
            this.fieldsets = [{
                controls: this.controls
            }];
            this.numControls = this.controls.length;
        } else if (this.fieldsets) {
            this.fieldsets.forEach(fieldset => {
                this.numControls = this.numControls + fieldset.controls.length;
            });
        }
        this.ngOnChanges();
    }

    ngOnChanges(changes?: SimpleChanges) {
        if (this.fieldsets) {
            let requiredFields: Array<any> = [];
            let nonRequiredFields: Array<any> = [];
            this.fieldsets.forEach(fieldset => {
                fieldset.controls.forEach(control => {
                    if (control.required) {
                        requiredFields.push(control);
                    } else {
                        nonRequiredFields.push(control);
                    }
                });
            });
            this.allFieldsRequired = requiredFields.length === this.numControls;
            this.allFieldsNotRequired = nonRequiredFields.length === this.numControls;
            if (this.allFieldsNotRequired) {
                this.fieldsets.forEach(fieldset => {
                    fieldset.controls.forEach(control => {
                        this.form.controls[control.key].hidden = false;
                    });
                });
            }
        }
    }

    showAllFields() {
        this.fieldsets.forEach(fieldset => {
            fieldset.controls.forEach(control => {
                this.form.controls[control.key].hidden = false;
            });
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }

    showOnlyRequired(hideRequiredWithValue) {
        this.fieldsets.forEach(fieldset => {
            fieldset.controls.forEach(control => {
                // Hide any non-required fields
                if (!control.required) {
                    this.form.controls[control.key].hidden = true;
                }

                // Hide required fields that have been successfully filled out
                if (hideRequiredWithValue && this.form.value[control.key]) {
                    this.form.controls[control.key].hidden = true;
                }

                // Don't hide fields with errors
                if (this.form.controls[control.key].errors) {
                    this.form.controls[control.key].hidden = false;
                }
            });
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
        this.forceValidation();
    }

    get values() {
        return this.form ? this.form.value : null;
    }

    get isValid() {
        return this.form ? this.form.valid : false;
    }

    updatedValues() {
        let ret = null;
        this.fieldsets.forEach(fieldset => {
            fieldset.controls.forEach(control => {
                if (this.form.controls[control.key].dirty || control.dirty) {
                    if (!ret) {
                        ret = {};
                    }
                    ret[control.key] = this.form.value[control.key];
                }
            });
        });
        return ret;
    }

    forceValidation(): void {
        Object.keys(this.form.controls).forEach((key: string) => {
            let control: any = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
