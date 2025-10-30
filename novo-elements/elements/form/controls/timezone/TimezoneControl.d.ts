import { BaseControl, NovoControlConfig } from '../BaseControl';
export declare class TimezoneControl extends BaseControl {
    controlType: string;
    options: any[];
    constructor(config: NovoControlConfig);
    private buildTimezones;
}
