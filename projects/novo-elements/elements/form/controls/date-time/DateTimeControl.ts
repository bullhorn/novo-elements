// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class DateTimeControl extends BaseControl {
  controlType = 'date-time';

  constructor(config: NovoControlConfig) {
    super('DateTimeControl', config);
  }
}
