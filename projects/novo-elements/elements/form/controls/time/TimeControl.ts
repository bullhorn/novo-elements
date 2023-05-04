// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class TimeControl extends BaseControl {
  controlType = 'time';

  constructor(config: NovoControlConfig) {
    super('TimeControl', config);
  }
}
