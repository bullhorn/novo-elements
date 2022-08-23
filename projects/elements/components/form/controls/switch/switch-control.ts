import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class SwitchControl extends BaseControl {
  controlType = 'switch';

  constructor(config: NovoControlConfig) {
    super('SwitchControl', config);
  }
}
