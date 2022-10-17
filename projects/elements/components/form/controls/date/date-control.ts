import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class DateControl extends BaseControl {
  controlType = 'date';

  constructor(config: NovoControlConfig) {
    super('DateControl', config);
  }
}
