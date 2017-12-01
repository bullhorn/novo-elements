import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare enum NOVO_VALUE_TYPE {
    DEFAULT = 0,
    EMAIL = 1,
    PHONE = 2,
    ENTITY_LIST = 3,
    LINK = 4,
    INTERNAL_LINK = 5,
}
export declare enum NOVO_VALUE_THEME {
    DEFAULT = 0,
    MOBILE = 1,
}
export declare class NovoValuePhone {
    data: any;
    meta: any;
    theme: NOVO_VALUE_THEME;
    readonly isMobile: boolean;
    readonly showIcon: boolean;
}
export declare class NovoValueEmail {
    data: any;
    meta: any;
    theme: NOVO_VALUE_THEME;
    readonly isMobile: boolean;
    openEmail(data: any): void;
    readonly showIcon: boolean;
}
export declare class NovoValueElement implements OnInit, OnChanges {
    data: any;
    meta: any;
    theme: NOVO_VALUE_THEME;
    type: NOVO_VALUE_TYPE;
    NOVO_VALUE_TYPE: typeof NOVO_VALUE_TYPE;
    NOVO_VALUE_THEME: typeof NOVO_VALUE_THEME;
    url: string;
    ngOnInit(): void;
    readonly isMobile: boolean;
    readonly iconClass: string;
    readonly isDefault: boolean;
    readonly showLabel: boolean;
    readonly showIcon: boolean;
    onValueClick(): void;
    openLink(): void;
    ngOnChanges(changes?: SimpleChanges): any;
    isEmailField(field: {
        name?: string;
        type?: NOVO_VALUE_TYPE;
    }): boolean;
    isPhoneField(field: {
        name?: string;
        type?: NOVO_VALUE_TYPE;
    }): boolean;
    isLinkField(field: {
        name?: string;
        type?: NOVO_VALUE_TYPE;
    }, data: any): boolean;
}
