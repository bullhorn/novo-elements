// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class AceEditorControl extends BaseControl {
  controlType = 'ace-editor';

  constructor(config: NovoControlConfig) {
    super('AceEditorControl', config);
  }
}
