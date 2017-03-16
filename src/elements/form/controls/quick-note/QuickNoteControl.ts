// APP
import { BaseControl, NovoControlConfig } from '../BaseControl';

export class QuickNoteControl extends BaseControl {
    controlType = 'quick-note';
    options = [];

    constructor(config:NovoControlConfig) {
        super(config);
        this.options = config.options || [];
    }
}
