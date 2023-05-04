// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class CheckboxControl extends BaseControl {
  controlType = 'checkbox';

  constructor(config: NovoControlConfig) {
    super('CheckboxControl', config);
  }
}
