// APP
import { BaseControl } from './../BaseControl';

export class RadioControl extends BaseControl {
    controlType = 'radio';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
