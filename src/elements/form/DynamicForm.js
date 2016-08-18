// NG2
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'novo-dynamic-form',
    inputs: ['layout'],
    template: require('./DynamicForm.html')
})
export class NovoDynamicFormElement {
    @Input() controls = [];
    @Input() form:FormGroup;

    allFieldsRequired = false;
    allFieldsNotRequired = false;
    showingAllFields = false;
    showingRequiredFields = true;

    ngOnInit() {
        let requiredFields = [];
        let nonRequiredFields = [];

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
        return this.form.value;
    }

    get isValid() {
        return this.form.valid;
    }

    get updatedValues() {
        let ret = {};
        this.controls.forEach(control => {
            if (this.form.controls[control.key].dirty) {
                ret[control.key] = this.form.value[control.key];
            }
        });
        return ret;
    }
}

