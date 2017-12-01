import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class NovoListElement {
    element: ElementRef;
    theme: string;
    direction: string;
    constructor(element: ElementRef);
}
export declare class NovoListItemElement implements OnInit {
    private element;
    avatar: boolean;
    constructor(element: ElementRef);
    ngOnInit(): void;
}
export declare class NovoItemAvatarElement implements OnChanges, OnInit {
    icon: string;
    iconClass: string;
    classMap: any;
    ngOnChanges(changes?: SimpleChanges): void;
    ngOnInit(): void;
}
export declare class NovoItemTitleElement {
}
export declare class NovoItemHeaderElement {
}
export declare class NovoItemDateElement {
}
export declare class NovoItemContentElement {
    direction: string;
}
export declare class NovoItemEndElement {
}
