// APP
import { BaseControl, NovoControlConfig } from '../BaseControl';

export class SwitchControl extends BaseControl {
  controlType = 'switch';

  constructor(config: NovoControlConfig) {
    super('SwitchControl', config);
  }
}
