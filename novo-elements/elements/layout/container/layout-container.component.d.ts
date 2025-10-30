import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { AfterContentInit, ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, NgZone, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { NovoLayoutContent } from '../content/layout-content.component';
import { NovoRailComponent } from '../rail/rail.component';
import { NovoSidenavComponent } from '../sidenav/sidenav.component';
import * as i0 from "@angular/core";
export declare class NovoLayoutContainer implements AfterContentInit, DoCheck, OnDestroy {
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
