// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class PickerControl extends BaseControl {
    controlType = 'picker';
    options = [];

    constructor(config:NovoControlConfig) {
        super(config);
        this.options = config.options || [];
    }
}
