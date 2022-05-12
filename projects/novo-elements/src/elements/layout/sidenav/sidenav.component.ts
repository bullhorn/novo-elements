import { AnimationEvent } from '@angular/animations';
import { FocusMonitor, FocusOrigin, FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Key } from '../../../utils';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, take, takeUntil } from 'rxjs/operators';
// import type { NovoLayoutContainer } from '../container/layout-container.component';
import { NovoSidenavMode, NovoSidenavToggleResult, NOVO_LAYOUT_CONTAINER } from '../layout.constants';
import { novoSidenavAnimations } from './sidenav.animations';

@Component({
  selector: 'novo-sidenav',
  exportAs: 'novoSidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [novoSidenavAnimations.transformDrawer],
  host: {
    class: 'novo-sidenav',
    tabIndex: '-1',
    // must prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[class.novo-sidenav-end]': 'position === "end"',
    '[class.novo-sidenav-over]': 'mode === "over"',
    '[class.novo-sidenav-push]': 'mode === "push"',
    '[class.novo-sidenav-side]': 'mode === "side"',
    '[class.novo-sidenav-opened]': 'opened',
    '[class.novo-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
    '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NovoSidenavComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean {
    return this._fixedInViewport;
  }
  set fixedInViewport(value) {
    this._fixedInViewport = coerceBooleanProperty(value);
  }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number {
    return this._fixedTopGap;
  }
  set fixedTopGap(value) {
    this._fixedTopGap = coerceNumberProperty(value);
  }
  private _fixedTopGap = 0;

  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  @Input()
  get fixedBottomGap(): number {
    return this._fixedBottomGap;
  }
  set fixedBottomGap(value) {
    this._fixedBottomGap = coerceNumberProperty(value);
  }
  private _fixedBottomGap = 0;

  private _focusTrap: FocusTrap;
  private _elementFocusedBeforeDrawerWasOpened: HTMLElement | null = null;

  /** Whether the drawer is initialized. Used for disabling the initial animation. */
  private _enableAnimations = false;

  /** The side that the drawer is attached to. */
  @Input()
  get position(): 'start' | 'end' {
    return this._position;
  }
  set position(value: 'start' | 'end') {
    // Make sure we have a valid value.
    value = value === 'end' ? 'end' : 'start';
    if (value !== this._position) {
      this._position = value;
      this.onPositionChanged.emit();
    }
  }
  private _position: 'start' | 'end' = 'start';

  /** Mode of the drawer; one of 'over', 'push' or 'side'. */
  @Input()
  get mode(): NovoSidenavMode {
    return this._mode;
  }
  set mode(value: NovoSidenavMode) {
    this._mode = value;
    this._updateFocusTrapState();
    this._modeChanged.next();
  }
  private _mode: NovoSidenavMode = 'over';

  /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
  @Input()
  get disableClose(): boolean {
    return this._disableClose;
  }
  set disableClose(value: boolean) {
    this._disableClose = coerceBooleanProperty(value);
  }
  private _disableClose: boolean = false;

  /**
   * Whether the drawer should focus the first focusable element automatically when opened.
   * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
   * enabled, focus will be moved into the sidenav in `side` mode as well.
   */
  @Input()
  get autoFocus(): boolean {
    const value = this._autoFocus;

    // Note that usually we disable auto focusing in `side` mode, because we don't know how the
    // sidenav is being used, but in some cases it still makes sense to do it. If the consumer
    // explicitly enabled `autoFocus`, we take it as them always wanting to enable it.
    return value == null ? this.mode !== 'side' : value;
  }
  set autoFocus(value: boolean) {
    this._autoFocus = coerceBooleanProperty(value);
  }
  private _autoFocus: boolean | undefined;

  /**
   * Whether the drawer is opened. We overload this because we trigger an event when it
   * starts or end.
   */
  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    this.toggle(coerceBooleanProperty(value));
  }
  private _opened: boolean = false;

  /** How the sidenav was opened (keypress, mouse click etc.) */
  private _openedVia: FocusOrigin | null;

  /** Emits whenever the drawer has started animating. */
  _animationStarted = new Subject<AnimationEvent>();

  /** Emits whenever the drawer is done animating. */
  _animationEnd = new Subject<AnimationEvent>();

  /** Current state of the sidenav animation. */
  // @HostBinding is used in the class as it is expected to be extended.  Since @Component decorator
  // metadata is not inherited by child classes, instead the host binding data is defined in a way
  // that can be inherited.
  // tslint:disable:no-host-decorator-in-concrete
  @HostBinding('@transform')
  _animationState: 'open-instant' | 'open' | 'void' = 'void';

  /** Event emitted when the drawer open state is changed. */
  @Output() readonly openedChange: EventEmitter<boolean> =
    // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
    new EventEmitter<boolean>(/* isAsync */ true);

  /** Event emitted when the drawer has been opened. */
  @Output('opened')
  _openedStream = this.openedChange.pipe(
    filter((o) => o),
    map(() => {}),
  );

  /** Event emitted when the drawer has started opening. */
  @Output()
  readonly openedStart: Observable<void> = this._animationStarted.pipe(
    filter((e) => e.fromState !== e.toState && e.toState.indexOf('open') === 0),
    mapTo(undefined),
  );

  /** Event emitted when the drawer has been closed. */
  @Output('closed')
  _closedStream = this.openedChange.pipe(
    filter((o) => !o),
    map(() => {}),
  );

  /** Event emitted when the drawer has started closing. */
  @Output()
  readonly closedStart: Observable<void> = this._animationStarted.pipe(
    filter((e) => e.fromState !== e.toState && e.toState === 'void'),
    mapTo(undefined),
  );

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /** Event emitted when the drawer's position changes. */
  // tslint:disable-next-line:no-output-on-prefix
  @Output('positionChanged') onPositionChanged: EventEmitter<void> = new EventEmitter<void>();

  /**
   * An observable that emits when the drawer mode changes. This is used by the drawer container to
   * to know when to when the mode changes so it can adapt the margins on the content.
   */
  readonly _modeChanged = new Subject<void>();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _focusTrapFactory: FocusTrapFactory,
    private _focusMonitor: FocusMonitor,
    private _platform: Platform,
    private _ngZone: NgZone,
    @Optional() @Inject(DOCUMENT) private _doc: any,
    @Optional() @Inject(NOVO_LAYOUT_CONTAINER) public _container?: any, // NovoLayoutContainer
  ) {
    this.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        if (this._doc) {
          this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement as HTMLElement;
        }

        this._takeFocus();
      } else if (this._isFocusWithinDrawer()) {
        this._restoreFocus();
      }
    });

    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
     * and we don't have close disabled.
     */
    this._ngZone.runOutsideAngular(() => {
      (fromEvent(this._elementRef.nativeElement, 'keydown') as Observable<KeyboardEvent>)
        .pipe(
          filter((event) => {
            return event.key === Key.Escape && !this.disableClose && !hasModifierKey(event);
          }),
          takeUntil(this._destroyed),
        )
        .subscribe((event) =>
          this._ngZone.run(() => {
            this.close();
            event.stopPropagation();
            event.preventDefault();
          }),
        );
    });

    // We need a Subject with distinctUntilChanged, because the `done` event
    // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
    this._animationEnd
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        }),
      )
      .subscribe((event: AnimationEvent) => {
        const { fromState, toState } = event;

        if ((toState.indexOf('open') === 0 && fromState === 'void') || (toState === 'void' && fromState.indexOf('open') === 0)) {
          this.openedChange.emit(this._opened);
        }
      });
  }

  /**
   * Moves focus into the drawer. Note that this works even if
   * the focus trap is disabled in `side` mode.
   */
  private _takeFocus() {
    if (!this.autoFocus || !this._focusTrap) {
      return;
    }

    this._focusTrap.focusInitialElementWhenReady().then((hasMovedFocus) => {
      // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
      // still works. We need to check that `focus` is a function due to Universal.
      if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
        this._elementRef.nativeElement.focus();
      }
    });
  }

  /**
   * Restores focus to the element that was originally focused when the drawer opened.
   * If no element was focused at that time, the focus will be restored to the drawer.
   */
  private _restoreFocus() {
    if (!this.autoFocus) {
      return;
    }

    // Note that we don't check via `instanceof HTMLElement` so that we can cover SVGs as well.
    if (this._elementFocusedBeforeDrawerWasOpened) {
      this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
    } else {
      this._elementRef.nativeElement.blur();
    }

    this._elementFocusedBeforeDrawerWasOpened = null;
    this._openedVia = null;
  }

  /** Whether focus is currently within the drawer. */
  private _isFocusWithinDrawer(): boolean {
    const activeEl = this._doc?.activeElement;
    return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
  }

  ngAfterContentInit() {
    this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    this._updateFocusTrapState();
  }

  ngAfterContentChecked() {
    // Enable the animations after the lifecycle hooks have run, in order to avoid animating
    // drawers that are open by default. When we're on the server, we shouldn't enable the
    // animations, because we don't want the drawer to animate the first time the user sees
    // the page.
    if (this._platform.isBrowser) {
      this._enableAnimations = true;
    }
  }

  ngOnDestroy() {
    if (this._focusTrap) {
      this._focusTrap.destroy();
    }

    this._animationStarted.complete();
    this._animationEnd.complete();
    this._modeChanged.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  /**
   * Open the drawer.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  open(openedVia?: FocusOrigin): Promise<NovoSidenavToggleResult> {
    return this.toggle(true, openedVia);
  }

  /** Close the drawer. */
  close(): Promise<NovoSidenavToggleResult> {
    return this.toggle(false);
  }

  /** Closes the drawer with context that the backdrop was clicked. */
  _closeViaBackdropClick(): Promise<NovoSidenavToggleResult> {
    // If the drawer is closed upon a backdrop click, we always want to restore focus. We
    // don't need to check whether focus is currently in the drawer, as clicking on the
    // backdrop causes blurring of the active element.
    return this._setOpen(/* isOpen */ false, /* restoreFocus */ true);
  }

  /**
   * Toggle this drawer.
   * @param isOpen Whether the drawer should be open.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  toggle(isOpen: boolean = !this.opened, openedVia?: FocusOrigin): Promise<NovoSidenavToggleResult> {
    // If the focus is currently inside the drawer content and we are closing the drawer,
    // restore the focus to the initially focused element (when the drawer opened).
    return this._setOpen(isOpen, /* restoreFocus */ !isOpen && this._isFocusWithinDrawer(), openedVia);
  }

  /**
   * Toggles the opened state of the drawer.
   * @param isOpen Whether the drawer should open or close.
   * @param restoreFocus Whether focus should be restored on close.
   * @param openedVia Focus origin that can be optionally set when opening a drawer. The
   *   origin will be used later when focus is restored on drawer close.
   */
  private _setOpen(isOpen: boolean, restoreFocus: boolean, openedVia: FocusOrigin = 'program'): Promise<NovoSidenavToggleResult> {
    this._opened = isOpen;

    if (isOpen) {
      this._animationState = this._enableAnimations ? 'open' : 'open-instant';
      this._openedVia = openedVia;
    } else {
      this._animationState = 'void';
      if (restoreFocus) {
        this._restoreFocus();
      }
    }

    this._updateFocusTrapState();

    return new Promise<NovoSidenavToggleResult>((resolve) => {
      this.openedChange.pipe(take(1)).subscribe((open) => resolve(open ? 'open' : 'close'));
    });
  }

  _getWidth(): number {
    return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
  }

  /** Updates the enabled state of the focus trap. */
  private _updateFocusTrapState() {
    if (this._focusTrap) {
      // The focus trap is only enabled when the drawer is open in any mode other than side.
      this._focusTrap.enabled = this.opened && this.mode !== 'side';
    }
  }

  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  @HostListener('@transform.start', ['$event'])
  _animationStartListener(event: AnimationEvent) {
    this._animationStarted.next(event);
  }

  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  @HostListener('@transform.done', ['$event'])
  _animationDoneListener(event: AnimationEvent) {
    this._animationEnd.next(event);
  }

  static ngAcceptInputType_disableClose: BooleanInput;
  static ngAcceptInputType_autoFocus: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;

  static ngAcceptInputType_fixedInViewport: BooleanInput;
  static ngAcceptInputType_fixedTopGap: NumberInput;
  static ngAcceptInputType_fixedBottomGap: NumberInput;
}
