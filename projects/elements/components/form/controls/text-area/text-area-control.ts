import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class TextAreaControl extends BaseControl {
  controlType = 'text-area';

  constructor(config: NovoControlConfig) {
    super('TextAreaControl', config);
  }
}
