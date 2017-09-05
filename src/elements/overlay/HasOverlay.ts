import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    InjectionToken,
    ViewChild,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    ViewContainerRef,
    TemplateRef
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { filter, first, map, RxChain, switchMap } from '@angular/cdk/rxjs';
import {
    ConnectedPositionStrategy,
    Overlay,
    OverlayRef,
    OverlayState,
    PositionStrategy,
    RepositionScrollStrategy,
    // tslint:disable-next-line:no-unused-variable
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of as observableOf } from 'rxjs/observable/of';

export class HasOverlay {

    protected _overlayRef: OverlayRef | null;
    protected _portal: any; // TODO - type me!
    protected _panelOpen: boolean = false;

    /** Strategy that is used to position the panel. */
    protected _positionStrategy: ConnectedPositionStrategy;

    /** The subscription for closing actions (some are bound to document). */
    protected _closingActionsSubscription: Subscription;

    constructor(
        protected _element: ElementRef,
        protected _overlay: Overlay,
        protected _viewContainerRef: ViewContainerRef,
        protected _zone: NgZone,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _scrollStrategy: any,
        protected _document: any
    ) { }

    /* Whether or not the autocomplete panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** Opens the autocomplete suggestion panel. */
    openPanel(template: TemplateRef<any>): void {
        //if (!this.overlayTemplate) {
        //throw getMdAutocompleteMissingPanelError();
        //}

        if (!this._overlayRef) {
            this._createOverlay(template);
        } else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getState().width = this._getHostWidth();
            this._overlayRef.updateSize();
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }

        //this.overlayTemplate._setVisibility();
        this._panelOpen = true;
    }

    /** Closes the autocomplete suggestion panel. */
    closePanel(): void {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._closingActionsSubscription.unsubscribe();
        }

        if (this._panelOpen) {
            this._panelOpen = false;

            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the placeholder is reset when the
            // user clicks outside.
            this._changeDetectorRef.detectChanges();
        }
    }

    onClosingAction(event: any): void {
        this.closePanel();
    }

    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<any> {
        return merge(
            //this.overlayTemplate._keyManager.tabOut,
            this._outsideClickStream
        );
    }


    /** Stream of clicks outside of the autocomplete panel. */
    protected get _outsideClickStream(): Observable<any> {
        if (!this._document) {
            return observableOf(null);
        }

        return RxChain.from(merge(
            fromEvent(this._document, 'click'),
            fromEvent(this._document, 'touchend')
        )).call(filter, (event: MouseEvent | TouchEvent) => {
            const clickTarget = event.target as HTMLElement;

            return this._panelOpen &&
                clickTarget !== this._element.nativeElement &&
                (!this._element.nativeElement.contains(clickTarget)) &&
                (!!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget));
        }).result();
    }

    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    protected _subscribeToClosingActions(): Subscription {
        const firstStable = first.call(this._zone.onStable);
        //const valueChanges = Observable.from(this.value);
        // When the zone is stable initially, and when the option list changes...
        return RxChain.from(merge(firstStable))
            // create a new stream of panelClosingActions, replacing any previous streams
            // that were created, and flatten it so our stream only emits closing events...
            .call(switchMap, () => {
                return this.panelClosingActions;
            })
            // when the first closing event occurs...
            .call(first)
            // set the value, close the panel, and complete.
            .subscribe(event => this.onClosingAction(event));
    }

    /** Destroys the autocomplete suggestion panel. */
    protected _destroyPanel(): void {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }

    protected _createOverlay(template: TemplateRef<any>): void {
        this._portal = new TemplatePortal(template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    }

    protected _getOverlayConfig(): OverlayState {
        const overlayState = new OverlayState();
        overlayState.positionStrategy = this._getOverlayPosition();
        //overlayState.width = this._getHostWidth();
        overlayState.direction = 'ltr';
        overlayState.scrollStrategy = this._scrollStrategy();
        return overlayState;
    }

    protected _getOverlayPosition(): PositionStrategy {
        this._positionStrategy = this._overlay.position().connectedTo(
            this._getConnectedElement(),
            { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition(
            { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }
            );
        return this._positionStrategy;
    }

    protected _getConnectedElement(): ElementRef {
        return this._element;
    }

    /** Returns the width of the input element, so the panel width can match it. */
    protected _getHostWidth(): number {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }

}
