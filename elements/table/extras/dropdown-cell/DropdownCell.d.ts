import { OnInit } from '@angular/core';
import { BaseRenderer } from '../base-renderer/BaseRenderer';
export interface INovoDropdownCellConfig {
    category?: string;
    callback?: Function;
    options: ({
        label?: string;
        value?: string;
        callback?: Function;
    } | string)[];
}
export declare class NovoDropdownCell extends BaseRenderer implements OnInit {
    meta: any;
    value: any;
    ngOnInit(): void;
    onClick(config: any, option: any, value: any): void;
}
