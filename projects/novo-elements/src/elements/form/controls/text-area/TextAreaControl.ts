// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class TextAreaControl extends BaseControl {
  controlType = 'text-area';

  constructor(config: NovoControlConfig) {
    super('TextAreaControl', config);
  }
}
