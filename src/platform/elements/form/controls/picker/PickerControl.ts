// APP
import { BaseControl, NovoControlConfig } from './../BaseControl';

export class PickerControl extends BaseControl {
    controlType = 'picker';
    options = [];

    constructor(config: NovoControlConfig) {
        super('PickerControl', config);
        this.options = config.options || [];
    }
}

export class TablePickerControl extends PickerControl {
    constructor(config: NovoControlConfig) {
        super(Object.assign(config, { appendToBody: true, parentScrollSelector: '.table-container' }));
        this.__type = 'TablePickerControl';
    }
}

export class AppendToBodyPickerControl extends PickerControl {
    constructor(config: NovoControlConfig) {
        super(Object.assign(config, { appendToBody: true, parentScrollSelector: '.table-container' }));
        this.__type = 'AppendToBodyPickerControl';
    }
}
