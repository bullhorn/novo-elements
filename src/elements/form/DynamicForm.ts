// NG2
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface NovoFormGroup {
    layout?:any;
    controls?:any;
    value?:any;
    valid?:boolean;
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
                <div *ngFor="let control of controls" class="novo-form-row">
                    <novo-control [control]="control" [form]="form"></novo-control>
                </div>
            </form>
        </div>
    `
})
export class NovoDynamicFormElement implements OnInit, OnChanges {
    @Input() controls:Array<any> = [];
    @Input() form:NovoFormGroup;
    @Input() layout:string;

    allFieldsRequired = false;
    allFieldsNotRequired = false;
    showingAllFields = false;
    showingRequiredFields = true;

    ngOnInit() {
        this.ngOnChanges();
        this.form.layout = this.layout;
    }

    ngOnChanges(changes?:SimpleChanges) {
        if (this.controls) {
            let requiredFields:Array<any> = [];
            let nonRequiredFields:Array<any> = [];

            this.controls.forEach(control => {
                if (control.required) {
                    requiredFields.push(control);
                } else {
                    nonRequiredFields.push(control);
                }
            });

            this.allFieldsRequired = requiredFields.length === this.controls.length;
            this.allFieldsNotRequired = nonRequiredFields.length === this.controls.length;

            if (this.allFieldsNotRequired) {
                this.controls.forEach(control => {
                    control.hidden = false;
                });
            }
        }
    }

    showAllFields() {
        this.controls.forEach(control => {
            control.hidden = false;
        });
        this.showingAllFields = true;
        this.showingRequiredFields = false;
    }

    showOnlyRequired(hideRequiredWithValue) {
        this.controls.forEach(control => {
            // Hide any non-required fields
            if (!control.required) {
                control.hidden = true;
            }

            // Hide required fields that have been successfully filled out
            if (hideRequiredWithValue && this.form.value[control.key]) {
                control.hidden = true;
            }

            // Don't hide fields with errors
            if (this.form.controls[control.key].errors) {
                control.hidden = false;
            }
        });
        this.showingAllFields = false;
        this.showingRequiredFields = true;
    }

    get values() {
        return this.form ? this.form.value : null;
    }

    get isValid() {
        return this.form ? this.form.valid : false;
    }

    updatedValues() {
        let ret = null;
        this.controls.forEach(control => {
            if (this.form.controls[control.key].dirty || control.dirty) {
                if (!ret) {
                    ret = {};
                }
                ret[control.key] = this.form.value[control.key];
            }
        });
        return ret;
    }
}
