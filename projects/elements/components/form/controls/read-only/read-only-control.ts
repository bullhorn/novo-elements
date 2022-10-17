import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class ReadOnlyControl extends BaseControl {
  controlType = 'read-only';

  constructor(config: NovoControlConfig) {
    super('ReadOnlyControl', config);
    config.readOnly = true;
  }
}
