// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class FileControl extends BaseControl {
  controlType = 'file';

  constructor(config: NovoControlConfig) {
    super('FileControl', config);
    this.placeholder = config.placeholder;
    this.multiple = config.multiple;
  }
}
