// NG2
import { Component, OnDestroy, AfterContentInit, ElementRef, Input, Output, HostBinding, HostListener, EventEmitter, ContentChildren, QueryList, Optional, Inject, forwardRef } from '@angular/core';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

/** Divider between items within a list. */
@Component({
    selector: 'novo-divider,[novo-divider]',
    template: '<ng-content></ng-content>',
})
export class NovoListDividerComponent {
    @HostBinding('attr.role') public role: string = 'separator';
}

@Component({
    selector: 'novo-list-item',
    template: `
        <div class="list-item" layout="row">
            <ng-content select="novo-icon, [novo-list-avatar], [novo-list-icon], [novoListAvatar], [novoListIcon]"></ng-content>
            <div class="item-content"><ng-content select="item-content, [novo-line], [novoLine]"></ng-content></div>
            <ng-content></ng-content>
        </div>
    `,
})
export class NovoListItemComponent implements FocusableOption, OnDestroy {
    @HostBinding('attr.role') public role: string = 'list-item';
    @HostBinding('attr.disabled') public _disabled: boolean;
    /** Stream that emits when the menu item is hovered. */
    @Output() public hovered: EventEmitter<any> = new EventEmitter();

    /** Whether the menu item is highlighted. */
    @HostBinding('class.focused')
    public focused: boolean = false;

    @Input()
    public get disabled(): boolean {
        return !!this._disabled;
    }
    public set disabled(value: boolean) {
        if (value === undefined || `${value}` === '') {
            this._disabled = true;
        } else if (`${value}` === 'false' || value === false) {
            this._disabled = undefined;
        } else {
            this._disabled = value ? true : undefined;
        }
    }

    constructor(
        private element: ElementRef,
        // tslint:disable-next-line:no-use-before-declare
        @Optional() @Inject(forwardRef(() => NovoListComponent)) public parent: NovoListComponent,
    ) { }

    /** Life Cycle Events. */
    public ngOnDestroy(): void {
        this.hovered.complete();
    }

    /** Focuses the menu item. */
    public focus(): void {
        this._getHostElement().focus();
    }
    /** Returns the host DOM element. */
    public _getHostElement(): HTMLElement {
        return this.element.nativeElement;
    }

    /** Used to set the `tabindex`. */
    @HostBinding('attr.tabindex')
    public get tabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    @HostListener('focus', ['$event'])
    public _handleFocus(event: Event): void {
        if (!this.disabled) {
            this.focused = true;
            this.parent._setFocusedItem(this);
        } else {
            this._getHostElement().blur();
        }
    }
    @HostListener('blur', ['$event'])
    public _handleBlur(event: Event): void {
        this.focused = false;
    }
    /** Prevents the default element actions if it is disabled. */
    @HostListener('click', ['$event'])
    public _checkDisabled(event: Event): void {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** Emits to the hover stream. */
    @HostListener('mouseenter')
    public _emitHoverEvent(): void {
        if (!this.disabled) {
            this.hovered.next(this);
        }
    }

    /** Gets the label to be used when determining whether the option should be focused. */
    public getLabel(): string {
        const element: HTMLElement = this.element.nativeElement;
        let output: string = '';

        if (element.childNodes) {
            const length: number = element.childNodes.length;

            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (let i: number = 0; i < length; i++) {
                if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    }
}

@Component({
    selector: 'novo-item-content, item-content, novo-line, [novo-line]',
    template: `
        <ng-content></ng-content>
    `,
})
export class NovoItemContentComponent {
    @HostBinding('class') @Input() public direction: string = 'vertical';
}

@Component({
    selector: 'novo-list',
    template: `
        <ng-content></ng-content>
    `,
})
export class NovoListComponent implements AfterContentInit {
    @HostBinding('attr.role') public role: string = 'list';
    @HostBinding('class') @Input() public direction: string = 'vertical';
    @HostBinding('attr.theme') @Input() public theme: string;

    /** List of the items inside of a menu. */
    @ContentChildren(NovoListItemComponent) public items: QueryList<NovoListItemComponent>;
    private _keyManager: FocusKeyManager<NovoListItemComponent>;

    constructor(public element: ElementRef) { }

    /** Life Cycle Events. */
    public ngAfterContentInit(): void {
        this._keyManager = new FocusKeyManager<NovoListItemComponent>(this.items).withWrap().withTypeAhead();
        // this._tabSubscription = this._keyManager.tabOut.subscribe(() => this.close.emit('keydown'));
    }

    /** Sets the focused option of the selection-list. */
    public _setFocusedItem(item: NovoListItemComponent): void {
        this._keyManager.updateActiveItemIndex(this._getItemIndex(item));
    }

    /** Returns the index of the specified list option. */
    protected _getItemIndex(item: NovoListItemComponent): number {
        return this.items.toArray().indexOf(item);
    }
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    @HostListener('keydown', ['$event'])
    protected _handleKeydown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case ESCAPE:
                //  this.closePanel();
                //  event.stopPropagation();
                break;
            case LEFT_ARROW:
                // if (this.parentMenu && this.direction === 'ltr') {
                //     this.closePanel();
                // }
                break;
            case RIGHT_ARROW:
                // if (this.parentMenu && this.direction === 'rtl') {
                //     this.closePanel();
                // }
                break;
            default:
                this._keyManager.onKeydown(event);
                break;
        }
    }
}
