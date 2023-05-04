// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class CheckListControl extends BaseControl {
  controlType = 'checklist';

  constructor(config: NovoControlConfig) {
    super('CheckListControl', config);
    this.options = config.options || [];
  }
}
