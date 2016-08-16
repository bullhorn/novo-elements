// APP
import { BaseControl } from './../BaseControl';

export class CheckListControl extends BaseControl {
    controlType = 'checklist';

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
