// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class ReadOnlyControl extends BaseControl {
  controlType = 'read-only';

  constructor(config: NovoControlConfig) {
    super('ReadOnlyControl', config);
    config.readOnly = true;
  }
}
