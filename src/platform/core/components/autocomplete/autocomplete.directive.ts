// NG
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    Host,
    HostBinding,
    HostListener,
    Inject,
    InjectionToken,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// CDK 
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW, TAB } from '@angular/cdk/keycodes';
import {
    ConnectedPositionStrategy,
    Overlay,
    OverlayRef,
    OverlayConfig,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
// RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { filter } from 'rxjs/operators/filter';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { delay } from 'rxjs/operators/delay';
import { Subscription } from 'rxjs/Subscription';
// App
import { NovoListItemComponent, /*MatOptionSelectionChange*/ } from '../list';
import { NovoAutocompleteComponent } from './autocomplete.component';

/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export const NOVO_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAutocompleteDirective),
    multi: true,
};

/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 */
export function getNovoAutocompleteMissingPanelError(): Error {
    return Error('Attempting to open an undefined instance of `novo-autocomplete`. ' +
        'Make sure that the id passed to the `novoAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}

@Directive({
    selector: `input[novoAutocomplete], textarea[novoAutocomplete]`,
    providers: [NOVO_AUTOCOMPLETE_VALUE_ACCESSOR],
})
export class NovoAutocompleteDirective implements ControlValueAccessor, OnDestroy {
    @HostBinding('attr.role') public role: string = 'combobox';
    @HostBinding('attr.disabled') public _disabled: boolean;
    @HostBinding('attr.autocomplete') public _autocompleteAttr: string = 'off';

    private _overlayRef: OverlayRef | null;
    private _portal: TemplatePortal<any>;
    private _panelOpen: boolean = false;

    /** Whether or not the label state is being overridden. */
    private _manuallyFloatingLabel: boolean = false;

    /** The subscription for closing actions (some are bound to document). */
    private _closingActionsSubscription: Subscription;

    /** Stream of escape keyboard events. */
    private _escapeEventStream: Subject<void> = new Subject<void>();
    private _autocompleteRef: NovoAutocompleteComponent;

    constructor(private _element: ElementRef,
        private _viewContainerRef: ViewContainerRef,
        private _zone: NgZone,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Inject(DOCUMENT) private _document: any) { }

    public ngOnDestroy(): void {
        this.closePanel();
        this._escapeEventStream.complete();
    }

    /* The autocomplete panel to be attached to this trigger. */
    @Input('novoAutocomplete')
    public set autocomplete(value: NovoAutocompleteComponent) {
        value.element = this._element;
        this._autocompleteRef = value;
    }
    public get autocomplete(): NovoAutocompleteComponent {
        return this._autocompleteRef;
    }

    /** View -> model callback called when value changes */
    public _onChange: (value: any) => void = () => { };

    /** View -> model callback called when autocomplete has been touched */
    public _onTouched = () => { };

    /* Whether or not the autocomplete panel is open. */
    get panelOpen(): boolean {
        return this.autocomplete.panelOpen;
    }

    /** Opens the autocomplete suggestion panel. */
    public openPanel(): void {
        if (!this.panelOpen) {
            this._closingActionsSubscription = this._subscribeToClosingActions();
            this.autocomplete.openPanel();
        }
    }

    /** Closes the autocomplete suggestion panel. */
    public closePanel(): void {
        if (this._closingActionsSubscription) {
            this._closingActionsSubscription.unsubscribe();
        }
        this.autocomplete.closePanel();
    }

    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<any> {
        return merge(
            this.optionSelections,
            this.autocomplete._keyManager.tabOut.pipe(filter(() => this.autocomplete.panelOpen)),
            this._escapeEventStream,
            this._outsideClickStream,
            this._overlayRef ?
                this._overlayRef.detachments().pipe(filter(() => this.autocomplete.panelOpen)) :
                observableOf(),
        );
    }

    /** Stream of autocomplete option selections. */
    get optionSelections(): Observable<any> {
        return merge(...this.autocomplete.options.map((option: NovoListItemComponent) => option.select));
    }

    /** The currently active option, coerced to MatOption type. */
    get activeOption(): NovoListItemComponent | null {
        if (this.autocomplete && this.autocomplete._keyManager) {
            return this.autocomplete._keyManager.activeItem;
        }

        return undefined;
    }

    /** Stream of clicks outside of the autocomplete panel. */
    private get _outsideClickStream(): Observable<any> {
        if (!this._document) {
            return observableOf(undefined);
        }

        return merge(
            fromEvent(this._document, 'click'),
            fromEvent(this._document, 'touchend'),
        )
            .pipe(filter((event: MouseEvent | TouchEvent) => {
                const clickTarget: HTMLElement = event.target as HTMLElement;

                return this._panelOpen &&
                    clickTarget !== this._element.nativeElement &&
                    (!!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget));
            }));
    }

    /**
     * Sets the autocomplete's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    public writeValue(value: any): void {
        Promise.resolve(undefined).then(() => this._setDirectiveValue(value));
    }

    /**
     * Saves a callback function to be invoked when the autocomplete's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    public registerOnChange(fn: (value: any) => {}): void {
        this._onChange = fn;
    }

    /**
     * Saves a callback function to be invoked when the autocomplete is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    public registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    /**
     * Disables the input. Implemented as a part of `ControlValueAccessor`.
     * @param isDisabled Whether the component should be disabled.
     */
    public setDisabledState(isDisabled: boolean): void {
        this._element.nativeElement.disabled = isDisabled;
    }

    @HostListener('blur')
    public _handleBlur(event: Event): void {
        this._onTouched();
    }

    @HostListener('keydown', ['$event'])
    public _handleKeydown(event: KeyboardEvent): void {
        const keyCode: number = event.keyCode;

        if (keyCode === ESCAPE && this.panelOpen) {
            this._resetActiveItem();
            this._escapeEventStream.next();
            event.stopPropagation();
        } else if (this.activeOption && keyCode === ENTER && this.panelOpen) {
            // this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        } else {
            const prevActiveItem: any = this.autocomplete._keyManager.activeItem;
            const isArrowKey: boolean = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete._keyManager.onKeydown(event);
            } else if (isArrowKey) {
                this.openPanel();
            }

            if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                this._scrollToOption();
            }
        }
    }

    @HostListener('input', ['$event'])
    public _handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            this._onChange((event.target as HTMLInputElement).value);
            this.openPanel();
        }
    }

    @HostListener('focusin')
    public _handleFocus(): void {
        if (!this._element.nativeElement.readOnly) {
            // this._attachOverlay();
            this.openPanel();
        }
    }

    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    private _scrollToOption(): void {
        const AUTOCOMPLETE_OPTION_HEIGHT: number = 48;
        const AUTOCOMPLETE_PANEL_HEIGHT: number = 250;
        const activeOptionIndex: number = this.autocomplete._keyManager.activeItemIndex || 0;
        const labelCount: number = 0;
        const optionOffset: number = (activeOptionIndex + labelCount) * AUTOCOMPLETE_OPTION_HEIGHT;
        const panelTop: number = this.autocomplete._getScrollTop();

        if (optionOffset < panelTop) {
            // Scroll up to reveal selected option scrolled above the panel top
            this.autocomplete._setScrollTop(optionOffset);
        } else if (optionOffset + AUTOCOMPLETE_OPTION_HEIGHT > panelTop + AUTOCOMPLETE_PANEL_HEIGHT) {
            // Scroll down to reveal selected option scrolled below the panel bottom
            const newScrollTop: number = optionOffset - AUTOCOMPLETE_PANEL_HEIGHT + AUTOCOMPLETE_OPTION_HEIGHT;
            this.autocomplete._setScrollTop(Math.max(0, newScrollTop));
        }
    }

    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    private _subscribeToClosingActions(): Subscription {
        const firstStable: Observable<any> = this._zone.onStable.asObservable().pipe(take(1));
        const optionChanges: Observable<any> = this.autocomplete.options.changes.pipe(
            delay(0),
        );

        // When the zone is stable initially, and when the option list changes...
        return merge(firstStable, optionChanges)
            .pipe(
            // create a new stream of panelClosingActions, replacing any previous streams
            // that were created, and flatten it so our stream only emits closing events...
            switchMap(() => {
                this._resetActiveItem();
                return this.panelClosingActions;
            }),
            // when the first closing event occurs...
            take(1),
        )
            // set the value, close the panel, and complete.
            .subscribe((event: any) => this._setValueAndClose(event));
    }

    private _setDirectiveValue(value: any): void {
        const toDisplay: string = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;

        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue: string = toDisplay !== undefined ? toDisplay : '';

        // if (this._formField) {
        //     this._formField._control.value = inputValue;
        // } else {
        this._element.nativeElement.value = inputValue;
    }

    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose(event: any): void {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setDirectiveValue(event.source.value);
            this._onChange(event.source.value);
            this._element.nativeElement.focus();
            this.autocomplete._emitSelectEvent(event.source);
        }

        this.closePanel();
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    private _clearPreviousSelectedOption(skip: NovoListItemComponent): void {
        this.autocomplete.options.forEach((option: NovoListItemComponent) => {
            // if (option !== skip && option.selected) {
            //     option.deselect();
            // }
        });
    }

    /** 
     * Reset active item to -1 so arrow events will activate the correct options.
     */
    private _resetActiveItem(): void {
        this.autocomplete._keyManager.setActiveItem(-1);
    }

}
