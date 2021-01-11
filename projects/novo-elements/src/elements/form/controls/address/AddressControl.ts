// APP
import { FormValidators } from '../../FormValidators';
import { BaseControl, NovoControlConfig } from '../BaseControl';

export class AddressControl extends BaseControl {
  controlType = 'address';
  constructor(config: NovoControlConfig) {
    super('AddressControl', config);
    this.validators.push(FormValidators.isValidAddress);
  }
}
