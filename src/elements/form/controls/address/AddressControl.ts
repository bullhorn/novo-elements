// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';
import { FormValidators } from './../../FormValidators';

export class AddressControl extends BaseControl {
    controlType = 'address';

    constructor(config:NovoControlConfig) {
        super(config);
        this.validators.push(FormValidators.isValidAddress);
    }
}
