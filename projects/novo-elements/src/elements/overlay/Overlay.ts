// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
// Vendor
import { Observable, Subscription, of as observableOf, merge, fromEvent } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'novo-overlay-template',
  template: `
    <ng-template>
      <div class="novo-overlay-panel" role="listbox" [id]="id" #panel>
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoOverlayTemplateComponent implements OnDestroy {
  public id: string = `novo-overlay-${Date.now()}`;

  @ViewChild(TemplateRef)
  public template: TemplateRef<any>;
  @ViewChild('panel')
  public panel: ElementRef;

  @Input()
  public position:
    | 'default'
    | 'right'
    | 'above-below'
    | 'right-above-below'
    | 'center'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right' = 'default';
  @Input()
  public scrollStrategy: 'reposition' | 'block' | 'close' = 'reposition';
  @Input()
  public width: number;
  @Input()
  public height: number;
  @Input()
  public closeOnSelect: boolean = true;

  @Output()
  public select: EventEmitter<any> = new EventEmitter();
  @Output()
  public closing: EventEmitter<any> = new EventEmitter();

  public overlayRef: OverlayRef | null;
  public portal: TemplatePortal<any>;

  // The subscription for closing actions (some are bound to document)
  protected closingActionsSubscription: Subscription;
  private _parent: ElementRef;

  constructor(
    protected overlay: Overlay,
    protected viewContainerRef: ViewContainerRef,
    protected zone: NgZone,
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(DOCUMENT)
    protected document: any,
  ) {}

  public ngOnDestroy(): void {
    this.destroyOverlay();
  }

  get panelOpen(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  @Input()
  public set parent(value: ElementRef) {
    this._parent = value;
    this.checkSizes();
  }

  public get parent(): ElementRef {
    return this._parent;
  }

  public openPanel(): void {
    if (!this.overlayRef) {
      this.createOverlay(this.template);
    } else {
      this.checkSizes();
    }
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.closingActionsSubscription = this.subscribeToClosingActions();
    }
    this.changeDetectorRef.markForCheck();
    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
      }
    });
  }

  public closePanel(): void {
    this.zone.run(() => {
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.closingActionsSubscription.unsubscribe();
      }
      this.closing.emit(true);
      if (this.panelOpen) {
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  public onClosingAction(event: any): void {
    this.closePanel();
  }

  /**
   * A stream of actions that should close the autocomplete panel, including
   * when an option is selected, on blur, and when TAB is pressed.
   */
  public get panelClosingActions(): Observable<any> {
    return merge(
      // this.overlayTemplate._keyManager.tabOut,
      this.outsideClickStream,
    );
  }

  /** Stream of clicks outside of the autocomplete panel. */
  protected get outsideClickStream(): Observable<any> {
    if (!this.document) {
      return observableOf();
    }

    return merge(fromEvent(this.document, 'mousedown'), fromEvent(this.document, 'touchend')).pipe(
      filter((event: MouseEvent | TouchEvent) => {
        const clickTarget: HTMLElement = event.target as HTMLElement;
        const clicked: boolean =
          this.panelOpen &&
          clickTarget !== this.getConnectedElement().nativeElement &&
          !this.getConnectedElement().nativeElement.contains(clickTarget) &&
          (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget));
        if (this.panelOpen && !!this.overlayRef && this.overlayRef.overlayElement.contains(clickTarget) && this.closeOnSelect) {
          this.select.emit(event);
        }
        return clicked;
      }),
    );
  }

  /**
   * This method listens to a stream of panel closing actions and resets the
   * stream every time the option list changes.
   */
  protected subscribeToClosingActions(): Subscription {
    const firstStable: Observable<any> = this.zone.onStable.asObservable().pipe(first());
    // const valueChanges = Observable.from(this.value);
    // When the zone is stable initially, and when the option list changes...
    return (
      merge(firstStable)
        .pipe(
          // create a new stream of panelClosingActions, replacing any previous streams
          // that were created, and flatten it so our stream only emits closing events...
          switchMap(() => {
            return this.panelClosingActions;
          }),
          // when the first closing event occurs...
          first(),
        )
        // set the value, close the panel, and complete.
        .subscribe((event: any) => this.onClosingAction(event))
    );
  }

  protected createOverlay(template: TemplateRef<any>): void {
    this.portal = new TemplatePortal(template, this.viewContainerRef);
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.backdropClick().subscribe(() => this.closePanel());
  }

  protected destroyOverlay(): void {
    if (this.overlayRef) {
      this.closePanel();
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  protected getOverlayConfig(): OverlayConfig {
    const config: OverlayConfig = new OverlayConfig();

    if (!this.width) {
      config.width = this.getHostWidth();
    } else {
      config.width = this.width;
    }

    if (this.height) {
      config.height = this.height;
    }

    config.positionStrategy = this.getPosition();
    config.hasBackdrop = false;
    config.direction = 'ltr';
    config.scrollStrategy = this.getScrollStrategy();

    return config;
  }

  /**
   * Supports the following position strategies:
   * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
   */
  protected getPosition(): ConnectedPositionStrategy {
    if (this.position === 'center') {
      return this.overlay
        .position()
        .connectedTo(this.getConnectedElement(), { originX: 'start', originY: 'center' }, { overlayX: 'start', overlayY: 'center' })
        .withFallbackPosition({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })
        .withFallbackPosition({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'bottom' });
    }

    let [originX, fallbackX]: HorizontalConnectionPos[] = this.position.includes('right') ? ['end', 'start'] : ['start', 'end'];
    let [originY, overlayY]: VerticalConnectionPos[] = this.position.includes('top') ? ['top', 'bottom'] : ['bottom', 'top'];

    let strategy: ConnectedPositionStrategy = this.overlay
      .position()
      .connectedTo(this.getConnectedElement(), { originX, originY }, { overlayX: originX, overlayY })
      .withDirection('ltr');

    if (this.position === 'bottom') {
      strategy = strategy.withFallbackPosition({ originX: fallbackX, originY: 'bottom' }, { overlayX: fallbackX, overlayY: 'top' });
    } else if (this.position === 'right' || this.position === 'default' || this.position.includes('above-below')) {
      strategy = strategy
        .withFallbackPosition({ originX, originY: 'top' }, { overlayX: originX, overlayY: 'bottom' })
        .withFallbackPosition({ originX: fallbackX, originY: 'bottom' }, { overlayX: fallbackX, overlayY: 'top' })
        .withFallbackPosition({ originX: fallbackX, originY: 'top' }, { overlayX: fallbackX, overlayY: 'bottom' });
      if (!this.position.includes('above-below')) {
        strategy = strategy
          .withFallbackPosition({ originX: originX, originY: 'center' }, { overlayX: originX, overlayY: 'center' })
          .withFallbackPosition({ originX: fallbackX, originY: 'center' }, { overlayX: fallbackX, overlayY: 'center' });
      }
    }
    return strategy;
  }

  protected getScrollStrategy(): ScrollStrategy {
    switch (this.scrollStrategy) {
      case 'block':
        return this.overlay.scrollStrategies.block();
      case 'reposition':
        return this.overlay.scrollStrategies.reposition();
      default:
        return this.overlay.scrollStrategies.close();
    }
  }

  protected checkSizes(): void {
    if (this.overlayRef) {
      if (!this.width) {
        this.overlayRef.getConfig().width = this.getHostWidth();
      }
      if (this.height) {
        this.overlayRef.getConfig().height = this.height;
      }
      this.overlayRef.updateSize(this.overlayRef.getConfig());
      this.overlayRef.updatePosition();
      this.changeDetectorRef.markForCheck();
    }
  }

  protected getConnectedElement(): ElementRef {
    return this.parent;
  }

  protected getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }
}
