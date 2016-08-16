// APP
import { BaseControl } from './../BaseControl';

export class QuickNoteControl extends BaseControl {
    controlType = 'quick-note';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
