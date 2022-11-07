import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class RadioControl extends BaseControl {
  controlType = 'radio';
  options = [];

  constructor(config: NovoControlConfig) {
    super('RadioControl', config);
    this.options = config.options || [];
  }
}
