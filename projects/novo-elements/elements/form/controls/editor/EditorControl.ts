// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class EditorControl extends BaseControl {
  controlType = 'editor';
  minimal: boolean = false;

  constructor(config: NovoControlConfig) {
    super('EditorControl', config);
  }
}
