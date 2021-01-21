import { BaseControl, NovoControlConfig } from './../BaseControl';

export class EmbeddedFormGroupControl extends BaseControl {
  controlType = 'embeddedFormGroupControl';
  options = [];

  constructor(config: NovoControlConfig) {
    super('embeddedFormGroupControl', config);
    this.options = config.options || [];
    this.placeholder = config.placeholder || '';
  }
}
