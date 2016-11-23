// APP
import { BaseControl } from './../BaseControl';

export class SelectControl extends BaseControl {
    controlType = 'select';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
        this.placeholder = config.placeholder || '';
    }
}
