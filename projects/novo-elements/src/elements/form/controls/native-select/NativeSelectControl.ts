// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class NativeSelectControl extends BaseControl {
  controlType = 'native-select';
  options = [];

  constructor(config: NovoControlConfig) {
    super('NativeSelectControl', config);
    this.options = config.options || [];
  }
}
