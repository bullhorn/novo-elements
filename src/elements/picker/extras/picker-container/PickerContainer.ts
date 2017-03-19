// NG2
import { Component, ElementRef, DoCheck, Renderer, HostListener } from '@angular/core';
// APP
import { KeyCodes } from '../../../../utils/key-codes/KeyCodes';
import { Helpers } from '../../../../utils/Helpers';
import { NovoPickerElement } from '../../Picker';
@Component({
    selector: 'novo-picker-container',
    template: '<ng-content></ng-content>'
})
export class NovoPickerContainer implements DoCheck {
    private position: ClientRect;
    private isVisible: boolean;
    private relativeElement: Element;
    private scrollHandler: any;
    private side: string;
    private appendToBody: boolean;
    public parent: NovoPickerElement;

    constructor(public element: ElementRef, private renderer: Renderer) {
        this.scrollHandler = this.handleScroll.bind(this);
    }

    ngDoCheck() {
        if (this.isVisible && this.position) {
            const element = this.element.nativeElement;
            const position = Helpers.calcPositionOffset(this.position, element, this.side);
            if (position) {
                this.renderer.setElementStyle(element, 'top', position.top);
                this.renderer.setElementStyle(element, 'left', position.left);
                this.renderer.setElementStyle(element, 'width', position.width);
            }
        }
    }

    private handleScroll(): void {
        // On scroll, don't force the position to update (jump from top/middle/bottom/right)
        this.updatePosition(this.relativeElement, this.side);
    }

    public show(appendToBody: boolean): void {
        this.appendToBody = appendToBody;
        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'visible');
        this.isVisible = true;
        if (appendToBody) {
            window.addEventListener('scroll', this.scrollHandler);
        }
    }

    public hide(): void {
        this.isVisible = false;
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'hidden');
        if (this.appendToBody) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    }

    public updatePosition(element: Element, side: string): void {
        this.relativeElement = element;
        this.side = side;
        this.position = element.getBoundingClientRect();
        this.ngDoCheck();
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        // Close with ESC/Enter
        if (this.isVisible && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.parent.toggleActive(null, false);
        }
    }
}
