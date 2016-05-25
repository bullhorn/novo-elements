import { Validators, Control } from '@angular/common';

export class BaseInput {
    constructor(validators = []) {
        this.validators = validators;
    }

    ngOnInit() {
        if (this.required) {
            this.validators.push(Validators.required);
        }
        this.control = new Control('', Validators.compose(this.validators));
    }
}
