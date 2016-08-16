// APP
import { BaseControl } from './../BaseControl';
import { FormValidators } from './../../FormValidators';

export class AddressControl extends BaseControl {
    controlType = 'address';

    constructor(config = {}) {
        super(config);
        this.validators.push(FormValidators.isValidAddress);
    }
}
