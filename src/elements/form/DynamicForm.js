// NG2
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    host: {
        '[hidden]': 'control.hidden'
    }
})
export class NovoControlElement {
    @Input() control;
    @Input() form:FormGroup;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    get isDirty() {
        return this.form.controls[this.control.key].dirty;
    }
}

@Component({
    selector: 'novo-dynamic-form',
    template: require('./DynamicForm.html')
})
export class NovoDynamicFormElement {
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

