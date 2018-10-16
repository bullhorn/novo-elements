// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class DateControl extends BaseControl {
  controlType = 'date';

  constructor(config: NovoControlConfig) {
    super('DateControl', config);
  }
}
