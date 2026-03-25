import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import { CdkScrollable, ScrollDispatcher, ViewportRuler } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { AfterContentInit, ChangeDetectorRef, ElementRef, NgZone, DestroyRef, InjectionToken, AfterContentChecked, OnDestroy, EventEmitter, DoCheck, QueryList } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { FocusTrapFactory, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import * as i5 from '@angular/common';

declare class NovoLayoutContent extends CdkScrollable implements AfterContentInit {
    private _changeDetectorRef;
    _container: any;
    private destroyRef;
    constructor(_changeDetectorRef: ChangeDetectorRef, _container: any, elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone, destroyRef: DestroyRef);
    ngAfterContentInit(): void;
    getHostElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLayoutContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLayoutContent, "novo-layout-content", ["novoLayoutContent"], {}, {}, never, ["*"], false, never>;
}

declare class NovoRailComponent extends CdkScrollable implements AfterContentInit {
    constructor(elementRef: ElementRef<HTMLElement>, scrollDispatcher: ScrollDispatcher, ngZone: NgZone);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoRailComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoRailComponent, "novo-rail", never, {}, {}, never, ["*"], false, never>;
}

/**
 * Throws an exception when two NovoSidenav are matching the same position.
 * @docs-private
 */
declare function throwNovoDuplicatedSidenavError(position: string): void;
/** Result of the toggle promise that indicates the state of the drawer. */
type NovoSidenavToggleResult = 'open' | 'close';
/** Sidenav and SideNav display modes. */
type NovoSidenavMode = 'over' | 'push' | 'side';
/** Configures whether drawers should use auto sizing by default. */
declare const NOVO_LAYOUT_DEFAULT_AUTOSIZE: InjectionToken<boolean>;
/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
declare const NOVO_LAYOUT_CONTAINER: InjectionToken<unknown>;
/** @docs-private */
declare function NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY(): boolean;

declare class NovoSidenavComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
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

declare class NovoLayoutContainer implements AfterContentInit, DoCheck, OnDestroy {
    private _dir;
    private _element;
    private _ngZone;
    private _changeDetectorRef;
    private _animationMode?;
    _allDrawers: QueryList<NovoSidenavComponent>;
    _rail: NovoRailComponent;
    _content: NovoLayoutContent;
    /** Drawers that belong to this container. */
    _drawers: QueryList<NovoSidenavComponent>;
    _userContent: NovoLayoutContent;
    /** The drawer child with the `start` position. */
    get start(): NovoSidenavComponent | null;
    /** The drawer child with the `end` position. */
    get end(): NovoSidenavComponent | null;
    /**
     * Whether to automatically resize the container whenever
     * the size of any of its drawers changes.
     *
     * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
     * the drawers on every change detection cycle. Can be configured globally via the
     * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
     */
    get autosize(): boolean;
    set autosize(value: boolean);
    private _autosize;
    /**
     * Whether the drawer container should have a backdrop while one of the sidenavs is open.
     * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
     * mode as well.
     */
    get hasBackdrop(): any;
    set hasBackdrop(value: any);
    _backdropOverride: boolean | null;
    /** Event emitted when the drawer backdrop is clicked. */
    readonly backdropClick: EventEmitter<void>;
    /** The drawer at the start/end position, independent of direction. */
    private _start;
    private _end;
    /**
     * The drawer at the left/right. When direction changes, these will change as well.
     * They're used as aliases for the above to set the left/right style properly.
     * In LTR, _left == _start and _right == _end.
     * In RTL, _left == _end and _right == _start.
     */
    private _left;
    private _right;
    /** Emits when the component is destroyed. */
    private readonly _destroyed;
    /** Emits on every ngDoCheck. Used for debouncing reflows. */
    private readonly _doCheckSubject;
    /**
     * Margins to be applied to the content. These are used to push / shrink the drawer content when a
     * drawer is open. We use margin rather than transform even for push mode because transform breaks
     * fixed position elements inside of the transformed element.
     */
    _contentMargins: {
        left: number | null;
        right: number | null;
    };
    readonly _contentMarginChanges: Subject<{
        left: number | null;
        right: number | null;
    }>;
    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable(): CdkScrollable;
    constructor(_dir: Directionality, _element: ElementRef<HTMLElement>, _ngZone: NgZone, _changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, defaultAutosize?: boolean, _animationMode?: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Calls `open` of both start and end drawers */
    open(): void;
    /** Calls `close` of both start and end drawers */
    close(): void;
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     */
    updateContentMargins(): void;
    ngDoCheck(): void;
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     */
    private _watchDrawerToggle;
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     */
    private _watchDrawerPosition;
    /** Subscribes to changes in drawer mode so we can run change detection. */
    private _watchDrawerMode;
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    private _setContainerClass;
    /** Validate the state of the drawer children components. */
    private _validateDrawers;
    /** Whether the container is being pushed to the side by one of the drawers. */
    private _isPushed;
    _onBackdropClicked(): void;
    _closeModalDrawersViaBackdrop(): void;
    _isShowingBackdrop(): boolean;
    private _canHaveBackdrop;
    private _isDrawerOpen;
    static ngAcceptInputType_autosize: BooleanInput;
    static ngAcceptInputType_hasBackdrop: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLayoutContainer, [{ optional: true; }, null, null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLayoutContainer, "novo-layout-container", ["novoLayoutContainer"], { "autosize": { "alias": "autosize"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; }, { "backdropClick": "backdropClick"; }, ["_rail", "_content", "_allDrawers"], ["novo-sidenav", "novo-rail", "novo-layout-content", "*"], false, never>;
}

declare class NovoLayoutModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLayoutModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoLayoutModule, [typeof NovoLayoutContainer, typeof NovoLayoutContent, typeof NovoSidenavComponent, typeof NovoRailComponent], [typeof i5.CommonModule], [typeof NovoLayoutContainer, typeof NovoLayoutContent, typeof NovoSidenavComponent, typeof NovoRailComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoLayoutModule>;
}

export { NOVO_LAYOUT_CONTAINER, NOVO_LAYOUT_DEFAULT_AUTOSIZE, NOVO_LAYOUT_DEFAULT_AUTOSIZE_FACTORY, NovoLayoutContainer, NovoLayoutContent, NovoLayoutModule, NovoRailComponent, NovoSidenavComponent, throwNovoDuplicatedSidenavError };
export type { NovoSidenavMode, NovoSidenavToggleResult };
