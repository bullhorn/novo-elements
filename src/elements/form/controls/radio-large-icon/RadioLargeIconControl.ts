// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class RadioLargeIconControl extends BaseControl {
    controlType = 'radio-large-icon';
    options = [];

    constructor(config: NovoControlConfig) {
        super('RadioLargeIconControl', config);
        this.options = config.options || [];
    }
}
