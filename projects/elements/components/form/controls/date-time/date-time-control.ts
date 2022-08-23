import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class DateTimeControl extends BaseControl {
  controlType = 'date-time';

  constructor(config: NovoControlConfig) {
    super('DateTimeControl', config);
  }
}
