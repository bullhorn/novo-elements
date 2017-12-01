import { ElementRef, DoCheck, Renderer2 } from '@angular/core';
import { NovoPickerElement } from '../../Picker';
export declare class NovoPickerContainer implements DoCheck {
    element: ElementRef;
    private renderer;
    private position;
    private isVisible;
    private relativeElement;
    private scrollHandler;
    private side;
    private appendToBody;
    parent: NovoPickerElement;
    constructor(element: ElementRef, renderer: Renderer2);
    ngDoCheck(): void;
    private handleScroll();
    show(appendToBody: boolean): void;
    hide(): void;
    updatePosition(element: Element, side: string): void;
    onKeyDown(event: KeyboardEvent): void;
}
