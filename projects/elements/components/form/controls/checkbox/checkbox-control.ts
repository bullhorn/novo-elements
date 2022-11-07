import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class CheckboxControl extends BaseControl {
  controlType = 'checkbox';

  constructor(config: NovoControlConfig) {
    super('CheckboxControl', config);
  }
}
