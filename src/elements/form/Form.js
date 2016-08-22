// NG2
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'novo-form',
    inputs: ['layout'],
    template: require('./Form.html')
})
export class NovoFormElement {
    @Input() form:FormGroup;

    get value() {
        return this.form.value;
    }

    get isValid() {
        return this.form.valid;
    }
}
