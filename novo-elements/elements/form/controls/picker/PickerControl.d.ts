import { BaseControl, NovoControlConfig } from './../BaseControl';
export declare class PickerControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
}
export declare class TablePickerControl extends PickerControl {
    constructor(config: NovoControlConfig);
}
