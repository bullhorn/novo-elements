import { BaseControl, NovoControlConfig } from './../BaseControl';

export class EmbeddedFormGroupControl extends BaseControl {
  controlType = 'embedded-form-group';
  options = [];

  constructor(config: NovoControlConfig) {
    super('embedded-form-group', config);
    this.options = config.options || [];
    this.placeholder = config.placeholder || '';
  }
}
