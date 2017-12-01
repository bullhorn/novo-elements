import { ElementRef, ChangeDetectorRef, EventEmitter, OnInit, AfterContentInit, OnDestroy, DoCheck, Renderer2, QueryList } from '@angular/core';
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
export declare class NovoDropdownContainer implements DoCheck {
    element: ElementRef;
    private renderer;
    private ref;
    private position;
    private isVisible;
    private relativeElement;
    private scrollHandler;
    private side;
    private appendToBody;
    parent: NovoDropdownElement;
    constructor(element: ElementRef, renderer: Renderer2, ref: ChangeDetectorRef);
    ngDoCheck(): void;
    private handleScroll();
    show(appendToBody: boolean): void;
    hide(): void;
    updatePosition(element: Element, side: string): void;
    onKeyDown(event: KeyboardEvent): void;
}
export declare class NovoDropdownElement extends OutsideClick implements OnInit, OnDestroy {
    private ref;
    appendToBody: boolean;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: string;
    toggled: EventEmitter<boolean>;
    container: NovoDropdownContainer;
    button: any;
    clickHandler: any;
    closeHandler: any;
    parentScrollElement: Element;
    private _items;
    private _textItems;
    private activeIndex;
    private filterTerm;
    private filterTermTimeout;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    items: QueryList<NovoItemElement>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private show();
    private hide();
    onKeyDown(event: KeyboardEvent): void;
    private scrollToActive();
}
export declare class NovoItemElement {
    private dropdown;
    element: ElementRef;
    disabled: boolean;
    keepOpen: boolean;
    action: EventEmitter<any>;
    active: boolean;
    constructor(dropdown: NovoDropdownElement, element: ElementRef);
    onClick(): void;
}
export declare class NovoListElement implements AfterContentInit {
    private dropdown;
    items: QueryList<NovoItemElement>;
    constructor(dropdown: NovoDropdownElement);
    ngAfterContentInit(): void;
}
export declare class NovoItemHeaderElement {
}
