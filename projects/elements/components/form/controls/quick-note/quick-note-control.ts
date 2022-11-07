import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';
export class QuickNoteControl extends BaseControl {
  controlType = 'quick-note';
  options = [];

  constructor(config: NovoControlConfig) {
    super('QuickNoteControl', config);
    this.options = config.options || [];
  }
}
