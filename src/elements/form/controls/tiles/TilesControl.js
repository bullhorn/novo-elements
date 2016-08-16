// APP
import { BaseControl } from './../BaseControl';

export class TilesControl extends BaseControl {
    controlType = 'tiles';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
