// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class CheckListControl extends BaseControl {
    controlType = 'checklist';

    constructor(config:NovoControlConfig) {
        super(config);
        this.options = config.options || [];
    }
}
