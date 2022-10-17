import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class CheckListControl extends BaseControl {
  controlType = 'checklist';

  constructor(config: NovoControlConfig) {
    super('CheckListControl', config);
    this.options = config.options || [];
  }
}
