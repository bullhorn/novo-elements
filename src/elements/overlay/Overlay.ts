import {
    Component,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    Inject,
    InjectionToken,
    ViewChild,
    ChangeDetectorRef,
    TemplateRef,
    NgZone,
    Optional,
    ViewContainerRef,
    OnDestroy,
    ChangeDetectionStrategy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
// CDK
import { ConnectedPositionStrategy, Overlay, OverlayRef, OverlayConfig, PositionStrategy, RepositionScrollStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// Vendor
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of as observableOf } from 'rxjs/observable/of';
import { } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';

/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export const DEFAULT_OVERLAY_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('novo-overlay-scroll-strategy');

/** @docs-private */
export function DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
    () => RepositionScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: DEFAULT_OVERLAY_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: DEFAULT_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Component({
    selector: 'novo-overlay-template',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-template>
        <div class="novo-overlay-panel" role="listbox" [id]="id" #panel>
            <ng-content></ng-content>
        </div>
    </ng-template>
  `
})
export class NovoOverlayTemplate implements OnDestroy {
    id: string = `novo-overlay-${Date.now()}`;

    /** @docs-private */
    @ViewChild(TemplateRef) template: TemplateRef<any>;

    /** Element for the panel containing the autocomplete options. */
    @ViewChild('panel') panel: ElementRef;
    @Input() public parent: ElementRef;
    @Input() public position: string = 'default';
    @Input() public closeOnSelect: boolean = true;
    @Output() public select: EventEmitter<any> = new EventEmitter();
    @Output() public closing: EventEmitter<any> = new EventEmitter();

    public _overlayRef: OverlayRef | null;
    public _portal: any; // TODO - type me!
    public _panelOpen: boolean = false;


    /** Strategy that is used to position the panel. */
    public _positionStrategy: ConnectedPositionStrategy;

    /** The subscription for closing actions (some are bound to document). */
    public _closingActionsSubscription: Subscription;

    constructor(
        protected _overlay: Overlay,
        protected _viewContainerRef: ViewContainerRef,
        protected _zone: NgZone,
        protected _changeDetectorRef: ChangeDetectorRef,
        @Inject(DEFAULT_OVERLAY_SCROLL_STRATEGY) protected _scrollStrategy,
        @Optional() @Inject(DOCUMENT) protected _document: any
    ) { }


    ngOnDestroy() {
        this._destroyPanel();
    }

    /* Whether or not the autocomplete panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** Opens the autocomplete suggestion panel. */
    openPanel(): void {
        //if (!this.overlayTemplate) {
        //throw getMdAutocompleteMissingPanelError();
        //}

        if (!this._overlayRef) {
            this._createOverlay(this.template);
        } else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.getConfig().width = this._getHostWidth();
            this._overlayRef.updateSize();
            this._overlayRef.updatePosition();
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        this._panelOpen = true;
        this._changeDetectorRef.markForCheck();
        setTimeout(() => this._overlayRef.updatePosition());
    }

    /** Closes the autocomplete suggestion panel. */
    closePanel(): void {
        this._zone.run(() => {
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.detach();
                this._closingActionsSubscription.unsubscribe();
            }
            this.closing.emit(true);
            if (this._panelOpen) {
                this._panelOpen = false;
                // We need to trigger change detection manually, because
                // `fromEvent` doesn't seem to do it at the proper time.
                // This ensures that the placeholder is reset when the
                // user clicks outside.
                this._changeDetectorRef.markForCheck();
            }
        });
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

        return merge(
            fromEvent(this._document, 'click'),
            fromEvent(this._document, 'touchend')
        )
            .pipe(filter((event: MouseEvent | TouchEvent) => {
                const clickTarget = event.target as HTMLElement;
                const clicked = this._panelOpen &&
                    clickTarget !== this._getConnectedElement().nativeElement &&
                    (!this._getConnectedElement().nativeElement.contains(clickTarget)) &&
                    (!!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget));
                if (this._panelOpen && !!this._overlayRef && this._overlayRef.overlayElement.contains(clickTarget) && this.closeOnSelect) {
                    this.select.emit(event);
                }
                return clicked;
            }));
    }

    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    protected _subscribeToClosingActions(): Subscription {
        const firstStable = this._zone.onStable.asObservable().pipe(first());
        //const valueChanges = Observable.from(this.value);
        // When the zone is stable initially, and when the option list changes...
        return merge(firstStable)
            .pipe(
            // create a new stream of panelClosingActions, replacing any previous streams
            // that were created, and flatten it so our stream only emits closing events...
            switchMap(() => {
                return this.panelClosingActions;
            }),
            // when the first closing event occurs...
            first()
            )
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
        this._overlayRef.getConfig().width = this._getHostWidth();
    }

    protected _getOverlayConfig(): OverlayConfig {
        const overlayState = new OverlayConfig();
        overlayState.positionStrategy = this._getOverlayPosition();
        //overlayState.width = this._getHostWidth();
        overlayState.direction = 'ltr';
        overlayState.scrollStrategy = this._scrollStrategy();
        return overlayState;
    }

    protected _getOverlayPosition(): PositionStrategy {
        switch (this.position) {
            case 'center':
                this._positionStrategy = this._overlay.position()
                    .connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
                    .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
                    .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' });
                break;
            default:
                this._positionStrategy = this._overlay.position()
                    .connectedTo(this._getConnectedElement(), { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
                    .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' });
                break;
        }

        return this._positionStrategy;
    }

    protected _getConnectedElement(): ElementRef {
        return this.parent;
    }

    /** Returns the width of the input element, so the panel width can match it. */
    protected _getHostWidth(): number {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }

}
