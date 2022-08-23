import { NovoControlConfig } from 'novo-elements/types';
import { FormValidators } from '../../form-validators';
import { BaseControl } from '../base-control';

export class AddressControl extends BaseControl {
  controlType = 'address';
  constructor(config: NovoControlConfig) {
    super('AddressControl', config);
    this.validators.push(FormValidators.isValidAddress);
  }
}
