import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';

export class EditorControl extends BaseControl {
  controlType = 'editor';
  minimal: boolean = false;

  constructor(config: NovoControlConfig) {
    super('EditorControl', config);
  }
}
