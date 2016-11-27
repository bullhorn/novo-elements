// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class RadioControl extends BaseControl {
    controlType = 'radio';
    options = [];

    constructor(config:NovoControlConfig) {
        super(config);
        this.options = config.options || [];
    }
}
