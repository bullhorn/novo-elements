import { OnInit } from '@angular/core';
export declare class UtilsElement {
}
export declare class UtilActionElement {
    icon: string;
    inverse: boolean;
    disabled: boolean;
}
export declare class NovoHeaderElement implements OnInit {
    title: string;
    subTitle: string;
    theme: string;
    icon: string;
    config: any;
    inverse: string;
    iconClass: string;
    ngOnInit(): void;
}
