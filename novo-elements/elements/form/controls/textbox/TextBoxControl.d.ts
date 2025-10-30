import { BaseControl, NovoControlConfig } from './../BaseControl';
export declare class TextBoxControl extends BaseControl {
    controlType: string;
    type: string;
    subType: string;
    constructor(config: NovoControlConfig);
    setValidators(type: any): void;
    getTextboxType(type: any): any;
}
