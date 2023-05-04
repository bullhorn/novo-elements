// APP
import { NovoGroupedControlConfig } from './../BaseControl';

export class GroupedControl implements NovoGroupedControlConfig {
  public __type: string;
  key: string;

  constructor(config: NovoGroupedControlConfig) {
    this.__type = 'GroupedControl';
    Object.keys(config).forEach((key) => (this[key] = config[key]));
  }
}
