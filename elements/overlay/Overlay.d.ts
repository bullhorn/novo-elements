import { ElementRef, EventEmitter, InjectionToken, ChangeDetectorRef, TemplateRef, NgZone, ViewContainerRef, OnDestroy } from '@angular/core';
import { ConnectedPositionStrategy, Overlay, OverlayRef, OverlayConfig, PositionStrategy, RepositionScrollStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export declare const DEFAULT_OVERLAY_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
/** @docs-private */
export declare function DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => RepositionScrollStrategy;
/** @docs-private */
export declare const DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: typeof Overlay[];
    useFactory: (overlay: Overlay) => () => RepositionScrollStrategy;
};
export declare class NovoOverlayTemplate implements OnDestroy {
    protected _overlay: Overlay;
    protected _viewContainerRef: ViewContainerRef;
    protected _zone: NgZone;
    protected _changeDetectorRef: ChangeDetectorRef;
    protected _scrollStrategy: any;
    protected _document: any;
    id: string;
    /** @docs-private */
    template: TemplateRef<any>;
    /** Element for the panel containing the autocomplete options. */
    panel: ElementRef;
    parent: ElementRef;
    position: string;
    closeOnSelect: boolean;
    select: EventEmitter<any>;
    closing: EventEmitter<any>;
    _overlayRef: OverlayRef | null;
    _portal: any;
    _panelOpen: boolean;
    /** Strategy that is used to position the panel. */
    _positionStrategy: ConnectedPositionStrategy;
    /** The subscription for closing actions (some are bound to document). */
    _closingActionsSubscription: Subscription;
    constructor(_overlay: Overlay, _viewContainerRef: ViewContainerRef, _zone: NgZone, _changeDetectorRef: ChangeDetectorRef, _scrollStrategy: any, _document: any);
    ngOnDestroy(): void;
    readonly panelOpen: boolean;
    /** Opens the autocomplete suggestion panel. */
    openPanel(): void;
    /** Closes the autocomplete suggestion panel. */
    closePanel(): void;
    onClosingAction(event: any): void;
    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    readonly panelClosingActions: Observable<any>;
    /** Stream of clicks outside of the autocomplete panel. */
    protected readonly _outsideClickStream: Observable<any>;
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    protected _subscribeToClosingActions(): Subscription;
    /** Destroys the autocomplete suggestion panel. */
    protected _destroyPanel(): void;
    protected _createOverlay(template: TemplateRef<any>): void;
    protected _getOverlayConfig(): OverlayConfig;
    protected _getOverlayPosition(): PositionStrategy;
    protected _getConnectedElement(): ElementRef;
    /** Returns the width of the input element, so the panel width can match it. */
    protected _getHostWidth(): number;
}
