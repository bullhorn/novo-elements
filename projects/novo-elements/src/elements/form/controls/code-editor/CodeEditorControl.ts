// APP
import { BaseControl, NovoControlConfig } from '../BaseControl';

export class CodeEditorControl extends BaseControl {
  controlType = 'code-editor';

  constructor(config: NovoControlConfig) {
    super('CodeEditorControl', config);
  }
}
