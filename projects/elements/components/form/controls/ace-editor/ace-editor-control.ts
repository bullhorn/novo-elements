import { NovoControlConfig } from 'novo-elements/types';
import { BaseControl } from '../base-control';
export class AceEditorControl extends BaseControl {
  controlType = 'ace-editor';

  constructor(config: NovoControlConfig) {
    super('AceEditorControl', config);
  }
}
