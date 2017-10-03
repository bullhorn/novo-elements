// NG2
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
// APP
import { Helpers } from './../../utils/Helpers';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';
import { NovoFieldset, NovoFormGroup } from './FormInterfaces';

@Component({
    selector: 'novo-fieldset-header',
    template: `
        <h6><i [class]="icon || 'bhi-section'"></i>{{title}}</h6>
    `
})
export class NovoFieldsetHeaderElement {
    @Input() title: string;
    @Input() icon: string;
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
        if (this.control.customControlConfig) {
            this.controlComponent.instance.config = this.control.customControlConfig;
        }
    }
}

@Component({
    selector: 'novo-fieldset',
    template: `
        <div class="novo-fieldset-container">
            <novo-fieldset-header [icon]="icon" [title]="title" *ngIf="title" [id]="id"></novo-fieldset-header>
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
    @Input() icon: string;
    @Input() id: string;
}

@Component({
    selector: 'novo-dynamic-form',
    template: `
        <div class="novo-form-container">
            <header>
                <ng-content select="form-title"></ng-content>
                <ng-content select="form-subtitle"></ng-content>
            </header>
            <novo-nav id="FormSections" *ngIf="fieldsets && fieldsets.length > 1" theme="white">
                <span *ngFor="let fieldset of fieldsets">
                    <novo-tab *ngIf="fieldset.sectionHeaderId" scrollTo [scrollTargetSelector]="getId(fieldset)">
                            <i class="bhi-section"></i> {{fieldset.title || 'Top'}}
                    </novo-tab>
                </span>
            </novo-nav>
            <form class="novo-form" [formGroup]="form" autocomplete="off" id="formTop">
                <span *ngFor="let fieldset of form.fieldsets">
                    <novo-fieldset *ngIf="fieldset.controls.length" [icon]="fieldset.icon" [controls]="fieldset.controls" [title]="fieldset.title" [id]="fieldset.sectionHeaderId" [form]="form"></novo-fieldset>
                </span>
            </form>
        </div>
    `
})
export class NovoDynamicFormElement implements OnChanges, OnInit {
    @Input() controls: Array<any> = [];
    @Input() fieldsets: Array<NovoFieldset> = [];
    @Input() form: NovoFormGroup;
    @Input() layout: string;
    @Input() hideNonRequiredFields: boolean = true;

    allFieldsRequired = false;
    allFieldsNotRequired = false;
    showingAllFields = false;
    showingRequiredFields = true;
    numControls = 0;

    public ngOnInit(): void {
        this.ngOnChanges();
    }

    public ngOnChanges(changes?: SimpleChanges): void {
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
    }

    public getId(fieldset): string {
        return `#${fieldset.sectionHeaderId}`;
    }

    public showAllFields(): void {
        this.form.fieldsets.forEach(fieldset => {
            fieldset.controls.forEach(control => {
                this.form.controls[control.key].hidden = false;
            });
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }

    public showOnlyRequired(hideRequiredWithValue): void {
        this.form.fieldsets.forEach(fieldset => {
            fieldset.controls.forEach(control => {
                // Hide any non-required fields
                if (!control.required) {
                    this.form.controls[control.key].hidden = true;
                }

                // Hide required fields that have been successfully filled out
                if (hideRequiredWithValue && !Helpers.isBlank(this.form.value[control.key])) {
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

    public updatedValues(): any {
        let ret = null;
        this.form.fieldsets.forEach(fieldset => {
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

    public forceValidation(): void {
        Object.keys(this.form.controls).forEach((key: string) => {
            let control: any = this.form.controls[key];
            if (control.required && Helpers.isBlank(this.form.value[control.key])) {
                control.markAsDirty();
                control.markAsTouched();
            }
        });
    }
}
