import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NovoControl } from './Control';

@Component({
    selector: 'novo-dynamic-form',
    directives: [REACTIVE_FORM_DIRECTIVES, NovoControl],
    template: require('./DynamicForm.html')
})
export class NovoDynamicForm {
    @Input() controls = [];
    @Input() form:FormGroup;

    constructor() {
    }

    showAllFields() {
        this.controls.forEach(control => {
            control.hidden = false;
        });
    }

    showOnlyRequired(hideRequiredWithValue) {
        this.controls.forEach(control => {
            if (!control.required) {
                control.hidden = true;
            }

            if (hideRequiredWithValue && this.form.value[control.key]) {
                control.hidden = true;
            }
        });
    }

    get value() {
        let ret = {};
        this.controls.forEach(control => {
            if (this.form.controls[control.key].dirty) {
                ret[control.key] = this.form.value[control.key];
            }
        });
        return ret;
    }
}

