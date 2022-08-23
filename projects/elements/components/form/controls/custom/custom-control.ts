import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class CustomControl extends BaseControl {
  controlType = 'custom';

  constructor(config: NovoControlConfig) {
    super(config.template, config);
    this.controlType = config.template;
  }
}
