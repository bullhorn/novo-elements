import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class NativeSelectControl extends BaseControl {
  controlType = 'native-select';
  options = [];

  constructor(config: NovoControlConfig) {
    super('NativeSelectControl', config);
    this.options = config.options || [];
  }
}
