// APP
import { BaseControl } from './../BaseControl';

export class NativeSelectControl extends BaseControl {
    controlType = 'native-select';
    options = [];

    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
    }
}
