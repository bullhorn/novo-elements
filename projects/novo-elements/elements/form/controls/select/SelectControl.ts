// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class SelectControl extends BaseControl {
  controlType = 'select';
  options = [];

  constructor(config: NovoControlConfig) {
    super('SelectControl', config);
    this.options = config.options || [];
    this.placeholder = config.placeholder || '';
  }
}
