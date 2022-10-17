import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class TimeControl extends BaseControl {
  controlType = 'time';

  constructor(config: NovoControlConfig) {
    super('TimeControl', config);
  }
}
