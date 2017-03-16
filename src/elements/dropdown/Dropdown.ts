// NG2
import { Component, ElementRef, EventEmitter, OnInit, OnDestroy, Input, Output, ViewChild, DoCheck, Renderer, HostListener } from '@angular/core';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { Helpers } from '../../utils/Helpers';

@Component({
    selector: 'novo-dropdown-container',
    template: '<ng-content></ng-content>'
})
export class NovoDropdownContainer implements DoCheck {
    private position: ClientRect;
    private isVisible: boolean;
    private relativeElement: Element;
    private scrollHandler: any;
    private side: string;
    private appendToBody: boolean;
    public parent: NovoDropdownElement;

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

@Component({
    selector: 'novo-dropdown',
    template: `
        <ng-content select="button" #trigger></ng-content>
        <novo-dropdown-container class="dropdown-container {{ containerClass }}">
            <ng-content></ng-content>
        </novo-dropdown-container>
    `
})
export class NovoDropdownElement extends OutsideClick implements OnInit, OnDestroy {
    // Append the dropdown container to the body
    @Input() appendToBody: boolean = false;
    // Listen for scroll on a parent selector, so we can close the dropdown
    @Input() parentScrollSelector: string;
    // What action to perform when we recieve scroll from parent selector
    // TODO - handle "move"
    @Input() parentScrollAction: string = 'close';
    // Custom class for the dropdown container
    @Input() containerClass: string;
    // Side the dropdown will open
    @Input() side: string = 'left';
    // Output for when the dropdown is toggled
    @Output() toggled: EventEmitter<boolean>;

    @ViewChild(NovoDropdownContainer) public container: NovoDropdownContainer;
    @ViewChild('trigger') public button;

    clickHandler: any;
    closeHandler: any;
    parentScrollElement: Element;

    constructor(element: ElementRef) {
        super(element);
        // Click handler
        this.clickHandler = this.toggleActive.bind(this);
        this.closeHandler = this.toggleActive.bind(this);
        this.toggled = this.onActiveChange;
        // Listen for active change to hide/show menu
        this.onActiveChange.subscribe((active) => {
            if (active) {
                this.show();
            } else {
                this.hide();
            }
        });
    }

    ngOnInit() {
        // Add a click handler to the button to toggle the menu
        let button = this.element.nativeElement.querySelector('button');
        button.addEventListener('click', this.clickHandler);
        if (this.parentScrollSelector) {
            this.parentScrollElement = Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
        }
    }

    ngOnDestroy() {
        // Remove listener
        let button = this.element.nativeElement.querySelector('button');
        if (button) {
            button.removeEventListener('click', this.clickHandler);
        }
    }

    private show(): void {
        this.container.parent = this;
        this.container.show(this.appendToBody);
        this.otherElement = this.container.element;
        if (this.appendToBody) {
            this.container.updatePosition(this.element.nativeElement.children[0], this.side);
            // If append to body then rip it out of here and put on body
            window.document.body.appendChild(this.container.element.nativeElement);
            window.addEventListener('resize', this.closeHandler);
        }
        // Listen for scroll on a parent to force close
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.addEventListener('scroll', this.closeHandler);
            }
        }
    }

    private hide(): void {
        this.container.hide();
        // If append to body then rip it out of here and put on body
        if (this.appendToBody) {
            let elm = this.container.element.nativeElement;
            elm.parentNode.removeChild(elm);
            window.removeEventListener('resize', this.closeHandler);
        }
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
            }
        }
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        // Close with ESC/Enter
        if (this.active && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.toggleActive();
        }
    }
}

@Component({
    selector: 'list',
    template: '<ng-content></ng-content>'
})
export class NovoListElement {
}

@Component({
    selector: 'item',
    template: '<ng-content></ng-content>',
    host: {
        '[class.disabled]': 'disabled'
    }
})
export class NovoItemElement {
    @Input() disabled: boolean;
    @Input() keepOpen: boolean = false;
    @Output() action: EventEmitter<any> = new EventEmitter();

    constructor(private dropdown: NovoDropdownElement) { }

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        // Poor man's disable
        if (!this.disabled) {
            // Close if keepOpen is false
            if (!this.keepOpen) {
                this.dropdown.toggleActive();
            }
            // Emit the action
            this.action.emit();
        }
    }
}
