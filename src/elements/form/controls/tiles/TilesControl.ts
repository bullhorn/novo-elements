// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class TilesControl extends BaseControl {
    controlType = 'tiles';
    options = [];

    constructor(config:NovoControlConfig) {
        super(config);
        this.options = config.options || [];
    }
}
