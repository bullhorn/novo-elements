import { AnimationEvent } from '@angular/animations';
import { FocusMonitor, FocusOrigin, FocusTrapFactory } from '@angular/cdk/a11y';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AfterContentChecked, AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NovoSidenavMode, NovoSidenavToggleResult } from '../layout.constants';
import * as i0 from "@angular/core";
export declare class NovoSidenavComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
    private _elementRef;
    private _focusTrapFactory;
    private _focusMonitor;
    private _platform;
    private _ngZone;
    private _doc;
    _container?: any;
    /** Whether the sidenav is fixed in the viewport. */
    get fixedInViewport(): boolean;
    set fixedInViewport(value: boolean);
    private _fixedInViewport;
    /**
     * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
     * mode.
     */
    get fixedTopGap(): number;
    set fixedTopGap(value: number);
    private _fixedTopGap;
    /**
     * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
     * fixed mode.
     */
    get fixedBottomGap(): number;
    set fixedBottomGap(value: number);
    private _fixedBottomGap;
    private _focusTrap;
    private _elementFocusedBeforeDrawerWasOpened;
    /** Whether the drawer is initialized. Used for disabling the initial animation. */
    private _enableAnimations;
    /** The side that the drawer is attached to. */
    get position(): 'start' | 'end';
    set position(value: 'start' | 'end');
    private _position;
    /** Mode of the drawer; one of 'over', 'push' or 'side'. */
    get mode(): NovoSidenavMode;
    set mode(value: NovoSidenavMode);
    private _mode;
    /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
    get disableClose(): boolean;
    set disableClose(value: boolean);
    private _disableClose;
    /**
     * Whether the drawer should focus the first focusable element automatically when opened.
     * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
     * enabled, focus will be moved into the sidenav in `side` mode as well.
     */
    get autoFocus(): boolean;
    set autoFocus(value: boolean);
    private _autoFocus;
    /**
     * Whether the drawer is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    get opened(): boolean;
    set opened(value: boolean);
    private _opened;
    /** How the sidenav was opened (keypress, mouse click etc.) */
    private _openedVia;
    /** Emits whenever the drawer has started animating. */
    _animationStarted: Subject<AnimationEvent>;
    /** Emits whenever the drawer is done animating. */
    _animationEnd: Subject<AnimationEvent>;
    /** Current state of the sidenav animation. */
    _animationState: 'open-instant' | 'open' | 'void';
    /** Event emitted when the drawer open state is changed. */
    readonly openedChange: EventEmitter<boolean>;
    /** Event emitted when the drawer has been opened. */
    _openedStream: Observable<void>;
    /** Event emitted when the drawer has started opening. */
    readonly openedStart: Observable<void>;
    /** Event emitted when the drawer has been closed. */
    _closedStream: Observable<void>;
    /** Event emitted when the drawer has started closing. */
    readonly closedStart: Observable<void>;
    /** Emits when the component is destroyed. */
    private readonly _destroyed;
    /** Event emitted when the drawer's position changes. */
    onPositionChanged: EventEmitter<void>;
    /**
     * An observable that emits when the drawer mode changes. This is used by the drawer container to
     * to know when to when the mode changes so it can adapt the margins on the content.
     */
    readonly _modeChanged: Subject<void>;
    constructor(_elementRef: ElementRef<HTMLElement>, _focusTrapFactory: FocusTrapFactory, _focusMonitor: FocusMonitor, _platform: Platform, _ngZone: NgZone, _doc: any, _container?: any);
    /**
     * Moves focus into the drawer. Note that this works even if
     * the focus trap is disabled in `side` mode.
     */
    private _takeFocus;
    /**
     * Restores focus to the element that was originally focused when the drawer opened.
     * If no element was focused at that time, the focus will be restored to the drawer.
     */
    private _restoreFocus;
    /** Whether focus is currently within the drawer. */
    private _isFocusWithinDrawer;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    open(openedVia?: FocusOrigin): Promise<NovoSidenavToggleResult>;
    /** Close the drawer. */
    close(): Promise<NovoSidenavToggleResult>;
    /** Closes the drawer with context that the backdrop was clicked. */
    _closeViaBackdropClick(): Promise<NovoSidenavToggleResult>;
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    toggle(isOpen?: boolean, openedVia?: FocusOrigin): Promise<NovoSidenavToggleResult>;
    /**
     * Toggles the opened state of the drawer.
     * @param isOpen Whether the drawer should open or close.
     * @param restoreFocus Whether focus should be restored on close.
     * @param openedVia Focus origin that can be optionally set when opening a drawer. The
     *   origin will be used later when focus is restored on drawer close.
     */
    private _setOpen;
    _getWidth(): number;
    /** Updates the enabled state of the focus trap. */
    private _updateFocusTrapState;
    _animationStartListener(event: AnimationEvent): void;
    _animationDoneListener(event: AnimationEvent): void;
    static ngAcceptInputType_disableClose: BooleanInput;
    static ngAcceptInputType_autoFocus: BooleanInput;
    static ngAcceptInputType_opened: BooleanInput;
    static ngAcceptInputType_fixedInViewport: BooleanInput;
    static ngAcceptInputType_fixedTopGap: NumberInput;
    static ngAcceptInputType_fixedBottomGap: NumberInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSidenavComponent, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSidenavComponent, "novo-sidenav", ["novoSidenav"], { "fixedInViewport": { "alias": "fixedInViewport"; "required": false; }; "fixedTopGap": { "alias": "fixedTopGap"; "required": false; }; "fixedBottomGap": { "alias": "fixedBottomGap"; "required": false; }; "position": { "alias": "position"; "required": false; }; "mode": { "alias": "mode"; "required": false; }; "disableClose": { "alias": "disableClose"; "required": false; }; "autoFocus": { "alias": "autoFocus"; "required": false; }; "opened": { "alias": "opened"; "required": false; }; }, { "openedChange": "openedChange"; "_openedStream": "opened"; "openedStart": "openedStart"; "_closedStream": "closed"; "closedStart": "closedStart"; "onPositionChanged": "positionChanged"; }, never, ["*"], false, never>;
}
