import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class TilesControl extends BaseControl {
  controlType = 'tiles';
  options = [];

  constructor(config: NovoControlConfig) {
    super('TilesControl', config);
    this.options = config.options || [];
  }
}
