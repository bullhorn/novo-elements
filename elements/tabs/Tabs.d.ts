import { EventEmitter } from '@angular/core';
export declare class NovoNavElement {
    theme: string;
    direction: string;
    outlet: any;
    router: string;
    condensed: boolean;
    items: Array<any>;
    select(item: any): void;
    add(item: any): void;
}
export declare class NovoTabElement {
    active: boolean;
    disabled: boolean;
    activeChange: EventEmitter<boolean>;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
}
export declare class NovoTabButtonElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
}
export declare class NovoTabLinkElement {
    active: boolean;
    disabled: boolean;
    nav: any;
    constructor(nav: NovoNavElement);
    select(): void;
}
export declare class NovoNavOutletElement {
    items: Array<any>;
    show(index: any): void;
    add(item: any): void;
}
export declare class NovoNavContentElement {
    active: boolean;
    constructor(outlet: NovoNavOutletElement);
}
export declare class NovoNavHeaderElement {
    active: boolean;
    forElement: any;
    outlet: any;
    constructor(outlet: NovoNavOutletElement);
    show(event?: any): void;
}
