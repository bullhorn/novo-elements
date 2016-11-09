// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class EditorControl extends BaseControl {
    controlType = 'editor';

    constructor(config: NovoControlConfig) {
        super(config);
    }
}
