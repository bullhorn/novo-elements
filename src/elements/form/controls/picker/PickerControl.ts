// APP
import { BaseControl } from './../BaseControl';

export class PickerControl extends BaseControl {
    controlType = 'picker';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
