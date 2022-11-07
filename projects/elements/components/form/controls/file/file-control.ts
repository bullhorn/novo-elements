import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class FileControl extends BaseControl {
  controlType = 'file';

  constructor(config: NovoControlConfig) {
    super('FileControl', config);
    // TODO - translate
    this.placeholder = config.placeholder;
    this.multiple = config.multiple;
  }
}
