import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NOVO_TILES_ELEMENTS } from './../tiles';
import { NOVO_PICKER_ELEMENTS } from './../picker';
import { NOVO_CHIPS_ELEMENTS } from './../chips';
import { NOVO_SELECT_ELEMENTS } from './../select';

@Component({
    selector: 'novo-control',
    template: require('./Control.html'),
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        NOVO_TILES_ELEMENTS,
        NOVO_PICKER_ELEMENTS,
        NOVO_CHIPS_ELEMENTS,
        NOVO_SELECT_ELEMENTS
    ],
    host: {
        '[hidden]': 'control.hidden',
        '[formGroup]': 'form'
    }
})
export class NovoControl {
    @Input() control;
    @Input() form:FormGroup;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    get isDirty() {
        return this.form.controls[this.control.key].dirty;
    }
}
