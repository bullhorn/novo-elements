// NG2
import { ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Host,
    HostBinding,
    Inject,
    InjectionToken,
    ViewChild,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    ViewContainerRef,
    TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Overlay } from '@angular/cdk/overlay';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// App
import { HasOverlay } from '../overlay/HasOverlay';
import { DEFAULT_OVERLAY_SCROLL_STRATEGY } from '../overlay/Overlay';


// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSearchBoxElement),
    multi: true
};
@Component({
    selector: 'novo-search',
    providers: [SEARCH_VALUE_ACCESSOR],
    template: `
        <!-- SEARCH ICON -->
        <button theme="fab" [color]="theme" icon="search" (click)="showSearch()"></button>
        <!-- SEARCH INPUT -->
        <input type="text" [attr.name]="name" [attr.value]="value" [attr.placeholder]="placeholder" (focus)="onFocus()" (blur)="closePanel()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input/>
        <!-- SEARCH OVERLAY -->
        <novo-overlay-template #overlay>
            <ng-content></ng-content>
        </novo-overlay-template>
    `,
    host: {
        '[class.active]': 'panelOpen || alwaysOpen'
    }
})
export class NovoSearchBoxElement extends HasOverlay implements OnDestroy, ControlValueAccessor {
    // The search string
    @HostBinding('class.focused') focused:boolean = false;
    //@HostBinding('class.active') active:boolean = false;
    @Input() name: string;
    @Input() placeholder: string = 'Search...';
    @Input() alwaysOpen:boolean = false;
    @Input() theme: string = 'positive';
    public value: any;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };
    /** View -> model callback called when autocomplete has been touched */
    _onTouched = () => { };

    /** Element for the panel containing the autocomplete options. */
    @ViewChild('overlay') autocomplete: any;
    @ViewChild('input') input: any;

    constructor(
        protected _element: ElementRef,
        protected _overlay: Overlay,
        protected _viewContainerRef: ViewContainerRef,
        protected _zone: NgZone,
        protected _changeDetectorRef: ChangeDetectorRef,
        @Inject(DEFAULT_OVERLAY_SCROLL_STRATEGY) protected _scrollStrategy,
        @Optional() @Inject(DOCUMENT) protected _document: any
    ) {
        super(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _document);
    }
    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event?: any, forceClose: boolean = false) {
        if (!this.panelOpen) {
            // Reset search
            // Mark as active
            this.openPanel();
            // Set focus on search
            setTimeout(() => {
                let element = this.input.nativeElement;
                if (element) {
                    element.focus();
                }
            }, 100);
        }
    }
    onFocus() {
        this.focused = true;
        //this.openPanel();
    }
    ngOnDestroy() {
        this._destroyPanel();
    }
    // /** Opens the overlay panel. */
    openPanel(): void {
        super.openPanel(this.autocomplete.template);
    }
    closePanel(): void {
        this.focused = false;
        super.closePanel();
    }
    onClosingAction(event): void {
        this.setValueAndClose(event);
    }
    _handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB ) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }
    _handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            this._onChange((event.target as HTMLInputElement).value);
            //this.openPanel();
        }
    }
    writeValue(value: any): void {
        Promise.resolve(null).then(() => this._setValue(value));
    }
    registerOnChange(fn: (value: any) => {}): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: () => {}) {
        this._onTouched = fn;
    }
    private _setValue(value: any): void {
        const toDisplay = value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay ? toDisplay : '';
        this.value = inputValue;
        this._changeDetectorRef.markForCheck();
    }

    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    public setValueAndClose(event: any | null): void {
        if (event && event.value) {
            this._setValue(event.value);
            this._onChange(event.value);
        }
        this.closePanel();
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    public clearValue(skip: any) {
        this.writeValue(null);
        this._onChange(null);
    }
}
