// NG2
import { Validators } from '@angular/forms';

export class BaseControl {
    constructor(config = {}) {
        this.validators = config.validators || [];
        this.value = config.value;
        this.key = config.key || '';
        this.label = config.label || '';
        this.required = !!config.required;
        this.hidden = !!config.hidden;
        this.sortOrder = config.sortOrder === undefined ? 1 : config.sortOrder;
        this.controlType = config.controlType || '';
        this.placeholder = config.placeholder || '';
        this.config = config.config || null;
        this.multiple = !!config.multiple;
        this.headerConfig = config.headerConfig || null;
        this.currencyFormat = config.currencyFormat || null;
        this.associatedEntity = config.associatedEntity || null;
        this.optionsType = config.optionsType || null;

        if (this.required) {
            this.validators.push(Validators.required);
        }
    }
}
