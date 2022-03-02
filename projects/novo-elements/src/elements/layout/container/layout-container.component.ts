import { AnimationEvent } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { merge, Subject } from 'rxjs';
import { debounceTime, filter, startWith, take, takeUntil } from 'rxjs/operators';
import { NovoLayoutContent } from '../content/layout-content.component';
import { NOVO_LAYOUT_CONTAINER, NOVO_LAYOUT_DEFAULT_AUTOSIZE } from '../layout.constants';
import { NovoRailComponent } from '../rail/rail.component';
import { NovoSidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'novo-layout-container',
  exportAs: 'novoLayoutContainer',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  host: {
    class: 'novo-layout-container',
    '[class.novo-layout-container-explicit-backdrop]': '_backdropOverride',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NOVO_LAYOUT_CONTAINER,
      useExisting: NovoLayoutContainer,
    },
  ],
})
export class NovoLayoutContainer implements AfterContentInit, DoCheck, OnDestroy {
  @ContentChildren(NovoSidenavComponent, {
    // We need to use `descendants: true`, because Ivy will no longer match
    // indirect descendants if it's left as false.
    descendants: true,
  })
  _allDrawers: QueryList<NovoSidenavComponent>;

  @ContentChild(NovoRailComponent) _rail: NovoRailComponent;

  @ContentChild(NovoLayoutContent) _content: NovoLayoutContent;

  /** Drawers that belong to this container. */
  _drawers = new QueryList<NovoSidenavComponent>();

  @ViewChild(NovoLayoutContent) _userContent: NovoLayoutContent;

  /** The drawer child with the `start` position. */
  get start(): NovoSidenavComponent | null {
    return this._start;
  }

  /** The drawer child with the `end` position. */
  get end(): NovoSidenavComponent | null {
    return this._end;
  }

  /**
   * Whether to automatically resize the container whenever
   * the size of any of its drawers changes.
   *
   * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
   * the drawers on every change detection cycle. Can be configured globally via the
   * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
   */
  @Input()
  get autosize(): boolean {
    return this._autosize;
  }
  set autosize(value: boolean) {
    this._autosize = coerceBooleanProperty(value);
  }
  private _autosize: boolean;

  /**
   * Whether the drawer container should have a backdrop while one of the sidenavs is open.
   * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
   * mode as well.
   */
  @Input()
  get hasBackdrop() {
    if (this._backdropOverride == null) {
      return !this._start || this._start.mode !== 'side' || !this._end || this._end.mode !== 'side';
    }

    return this._backdropOverride;
  }
  set hasBackdrop(value: any) {
    this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
  }
  _backdropOverride: boolean | null;

  /** Event emitted when the drawer backdrop is clicked. */
  @Output() readonly backdropClick: EventEmitter<void> = new EventEmitter<void>();

  /** The drawer at the start/end position, independent of direction. */
  private _start: NovoSidenavComponent | null;
  private _end: NovoSidenavComponent | null;

  /**
   * The drawer at the left/right. When direction changes, these will change as well.
   * They're used as aliases for the above to set the left/right style properly.
   * In LTR, _left == _start and _right == _end.
   * In RTL, _left == _end and _right == _start.
   */
  private _left: NovoSidenavComponent | null;
  private _right: NovoSidenavComponent | null;

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /** Emits on every ngDoCheck. Used for debouncing reflows. */
  private readonly _doCheckSubject = new Subject<void>();

  /**
   * Margins to be applied to the content. These are used to push / shrink the drawer content when a
   * drawer is open. We use margin rather than transform even for push mode because transform breaks
   * fixed position elements inside of the transformed element.
   */
  _contentMargins: { left: number | null; right: number | null } = { left: null, right: null };

  readonly _contentMarginChanges = new Subject<{ left: number | null; right: number | null }>();

  /** Reference to the CdkScrollable instance that wraps the scrollable content. */
  get scrollable(): CdkScrollable {
    return this._userContent || this._content;
  }

  constructor(
    @Optional() private _dir: Directionality,
    private _element: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    viewportRuler: ViewportRuler,
    @Inject(NOVO_LAYOUT_DEFAULT_AUTOSIZE) defaultAutosize = false,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private _animationMode?: string,
  ) {
    // If a `Dir` directive exists up the tree, listen direction changes
    // and update the left/right properties to point to the proper start/end.
    if (_dir) {
      _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._validateDrawers();
        this.updateContentMargins();
      });
    }

    // Since the minimum width of the sidenav depends on the viewport width,
    // we need to recompute the margins if the viewport changes.
    viewportRuler
      .change()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this.updateContentMargins());

    this._autosize = defaultAutosize;
  }

  ngAfterContentInit() {
    this._allDrawers.changes
      .pipe(startWith(this._allDrawers), takeUntil(this._destroyed))
      .subscribe((drawer: QueryList<NovoSidenavComponent>) => {
        this._drawers.reset(drawer.filter((item) => !item._container || item._container === this));
        this._drawers.notifyOnChanges();
      });

    this._drawers.changes.pipe(startWith(null)).subscribe(() => {
      this._validateDrawers();

      this._drawers.forEach((drawer: NovoSidenavComponent) => {
        this._watchDrawerToggle(drawer);
        this._watchDrawerPosition(drawer);
        this._watchDrawerMode(drawer);
      });

      if (!this._drawers.length || this._isDrawerOpen(this._start) || this._isDrawerOpen(this._end)) {
        this.updateContentMargins();
      }

      this._changeDetectorRef.markForCheck();
    });

    // Avoid hitting the NgZone through the debounce timeout.
    this._ngZone.runOutsideAngular(() => {
      this._doCheckSubject
        .pipe(
          debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
          takeUntil(this._destroyed),
        )
        .subscribe(() => this.updateContentMargins());
    });
  }

  ngOnDestroy() {
    this._contentMarginChanges.complete();
    this._doCheckSubject.complete();
    this._drawers.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Calls `open` of both start and end drawers */
  open(): void {
    this._drawers.forEach((drawer) => drawer.open());
  }

  /** Calls `close` of both start and end drawers */
  close(): void {
    this._drawers.forEach((drawer) => drawer.close());
  }

  /**
   * Recalculates and updates the inline styles for the content. Note that this should be used
   * sparingly, because it causes a reflow.
   */
  updateContentMargins() {
    // 1. For drawers in `over` mode, they don't affect the content.
    // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
    //    left margin (for left drawer) or right margin (for right the drawer).
    // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
    //    adding to the left or right margin and simultaneously subtracting the same amount of
    //    margin from the other side.
    let left = 0;
    let right = 0;

    if (this._left && this._left.opened) {
      if (this._left.mode === 'side') {
        left += this._left._getWidth();
      } else if (this._left.mode === 'push') {
        const width = this._left._getWidth();
        left += width;
        right -= width;
      }
    }

    if (this._right && this._right.opened) {
      if (this._right.mode === 'side') {
        right += this._right._getWidth();
      } else if (this._right.mode === 'push') {
        const width = this._right._getWidth();
        right += width;
        left -= width;
      }
    }

    // If either `right` or `left` is zero, don't set a style to the element. This
    // allows users to specify a custom size via CSS class in SSR scenarios where the
    // measured widths will always be zero. Note that we reset to `null` here, rather
    // than below, in order to ensure that the types in the `if` below are consistent.
    left = left || null;
    right = right || null;

    if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
      this._contentMargins = { left, right };

      // Pull back into the NgZone since in some cases we could be outside. We need to be careful
      // to do it only when something changed, otherwise we can end up hitting the zone too often.
      this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
    }
  }

  ngDoCheck() {
    // If users opted into autosizing, do a check every change detection cycle.
    if (this._autosize && this._isPushed()) {
      // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
      this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }
  }

  /**
   * Subscribes to drawer events in order to set a class on the main container element when the
   * drawer is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   */
  private _watchDrawerToggle(drawer: NovoSidenavComponent): void {
    drawer._animationStarted
      .pipe(
        filter((event: AnimationEvent) => event.fromState !== event.toState),
        takeUntil(this._drawers.changes),
      )
      .subscribe((event: AnimationEvent) => {
        // Set the transition class on the container so that the animations occur. This should not
        // be set initially because animations should only be triggered via a change in state.
        if (event.toState !== 'open-instant' && this._animationMode !== 'NoopAnimations') {
          this._element.nativeElement.classList.add('mat-drawer-transition');
        }

        this.updateContentMargins();
        this._changeDetectorRef.markForCheck();
      });

    if (drawer.mode !== 'side') {
      drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._setContainerClass(drawer.opened));
    }
  }

  /**
   * Subscribes to drawer onPositionChanged event in order to
   * re-validate drawers when the position changes.
   */
  private _watchDrawerPosition(drawer: NovoSidenavComponent): void {
    if (!drawer) {
      return;
    }
    // NOTE: We need to wait for the microtask queue to be empty before validating,
    // since both drawers may be swapping positions at the same time.
    drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
      this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        this._validateDrawers();
      });
    });
  }

  /** Subscribes to changes in drawer mode so we can run change detection. */
  private _watchDrawerMode(drawer: NovoSidenavComponent): void {
    if (drawer) {
      drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed))).subscribe(() => {
        this.updateContentMargins();
        this._changeDetectorRef.markForCheck();
      });
    }
  }

  /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
  private _setContainerClass(isAdd: boolean): void {
    const classList = this._element.nativeElement.classList;
    const className = 'mat-drawer-container-has-open';

    if (isAdd) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
  }

  /** Validate the state of the drawer children components. */
  private _validateDrawers() {
    this._start = this._end = null;

    // Ensure that we have at most one start and one end drawer.
    this._drawers.forEach((drawer) => {
      if (drawer.position === 'end') {
        if (this._end != null) {
          throw new Error('Duplication drawers at end');
          // throwMatDuplicatedDrawerError('end');
        }
        this._end = drawer;
      } else {
        if (this._start != null) {
          throw new Error('Duplication drawers at start');
        }
        this._start = drawer;
      }
    });

    this._right = this._left = null;

    // Detect if we're LTR or RTL.
    if (this._dir && this._dir.value === 'rtl') {
      this._left = this._end;
      this._right = this._start;
    } else {
      this._left = this._start;
      this._right = this._end;
    }
  }

  /** Whether the container is being pushed to the side by one of the drawers. */
  private _isPushed() {
    return (this._isDrawerOpen(this._start) && this._start.mode !== 'over') || (this._isDrawerOpen(this._end) && this._end.mode !== 'over');
  }

  _onBackdropClicked() {
    this.backdropClick.emit();
    this._closeModalDrawersViaBackdrop();
  }

  _closeModalDrawersViaBackdrop() {
    // Close all open drawers where closing is not disabled and the mode is not `side`.
    [this._start, this._end]
      .filter((drawer) => drawer && !drawer.disableClose && this._canHaveBackdrop(drawer))
      .forEach((drawer) => drawer._closeViaBackdropClick());
  }

  _isShowingBackdrop(): boolean {
    return (
      (this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
      (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end))
    );
  }

  private _canHaveBackdrop(drawer: NovoSidenavComponent): boolean {
    return drawer.mode !== 'side' || !!this._backdropOverride;
  }

  private _isDrawerOpen(drawer: NovoSidenavComponent | null): drawer is NovoSidenavComponent {
    return drawer != null && drawer.opened;
  }

  static ngAcceptInputType_autosize: BooleanInput;
  static ngAcceptInputType_hasBackdrop: BooleanInput;
}
