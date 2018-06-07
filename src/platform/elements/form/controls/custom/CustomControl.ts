// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class CustomControl extends BaseControl {
  controlType = 'custom';

  constructor(config: NovoControlConfig) {
    super(config.template, config);
    this.controlType = config.template;
  }
}
