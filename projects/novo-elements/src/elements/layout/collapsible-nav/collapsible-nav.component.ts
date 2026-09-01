import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  output,
  Signal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { delay, filter, fromEvent, map, merge, Observable, of, partition, race, switchMap } from 'rxjs';
import { novoCollapsibleNavAnimations } from './collapsible-nav.animations';

export type NavTransitionState = 'collapsed' | 'expanding' | 'expanded' | 'collapsing';

// Event fired when a user event (click, space) is about to expand navigation early
export class CollapsibleNavExpansionEvent extends Event {
  private _expandPrevented = false;
  public get expandPrevented() {
    return this._expandPrevented;
  }
  constructor(public srcEvent: Event) {
    super('expansionClick');
  }
  preventExpand() {
    this._expandPrevented = true;
  }
}

/**
 * A slide-out navigation panel that expands to a full-width panel or collapses to a narrow icon rail.
 * Generic building block: consumers project their own header, body, and footer content.
 */
@Component({
  selector: 'novo-collapsible-nav',
  templateUrl: './collapsible-nav.component.html',
  styleUrls: ['./collapsible-nav.component.scss'],
  exportAs: 'novoCollapsibleNav',
  animations: [novoCollapsibleNavAnimations.expandCollapse],
  host: {
    class: 'novo-collapsible-nav',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class NovoCollapsibleNavComponent {
  /** Whether the panel is collapsed to the icon rail. Two-way bindable via `[(collapsed)]`. */
  collapsed = model<boolean>(false);

  /** Width of the panel when expanded. */
  expandedWidth = input<string>('18rem');

  /** Width of the panel when collapsed to the icon rail. */
  collapsedWidth = input<string>('4rem');

  /** Time in ms to delay between the user entering the nav region, and expanding it */
  expandDelay = model<number>(0);

  /** When true, hovering a collapsed panel temporarily expands it as an overlay without affecting layout. */
  overlayOnHover = input<boolean>(false);

  hoveredChange = output<boolean>();
  transitionChange = output<NavTransitionState>();

  manualExpand = output<CollapsibleNavExpansionEvent>();

  public readonly element = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isHovered = signal(false);
  private readonly isHoveredDebounced$ = this.debounceHover(this.isHovered);
  private readonly isEffectiveHovered = toSignal(this.isHoveredDebounced$);
  private readonly effectiveCollapsed = computed(() => this.collapsed() && !(this.overlayOnHover() && this.isEffectiveHovered()));
  private readonly clicked$ = fromEvent<MouseEvent>(this.element.nativeElement, 'click');
  private readonly activationKeyPressed$ = fromEvent<KeyboardEvent>(this.element.nativeElement, 'keydown').pipe(
    filter(kevt => kevt.key === ' ' || kevt.key === 'Enter'));
  private readonly manualExpandUnprevented$: Observable<CollapsibleNavExpansionEvent>;

  constructor() {
    effect(() => {
      if (this.collapsed()) {
        this.isHovered.set(false);
      }
    });
    this.isHoveredDebounced$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(hovered => {
      this.hoveredChange.emit(hovered);
    });

    this.manualExpandUnprevented$ = this.setupExpandFromActivation();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  @HostBinding('@expandCollapse')
  get expandCollapseState(): { value: string; params: { expandedWidth: string; collapsedWidth: string } } {
    return {
      value: this.effectiveCollapsed() ? 'collapsed' : 'expanded',
      params: { expandedWidth: this.expandedWidth(), collapsedWidth: this.collapsedWidth() },
    };
  }

  @HostListener('@expandCollapse.start', ['$event'])
  transitionStart(event: any) {
    this.transitionChange.emit(event.toState === 'expanded' ? 'expanding' : 'collapsing');
  }

  @HostListener('@expandCollapse.done', ['$event'])
  transitionEnd(event) {
    this.transitionChange.emit(event.toState === 'expanded' ? 'expanded' : 'collapsed');
  }

  private debounceHover(hoverSignal: Signal<boolean>): Observable<boolean> {
      const hoverObs = toObservable(hoverSignal);
      const [enters, exits] = partition(hoverObs, hovered => hovered);
      const waitedEnters = enters.pipe(switchMap(
        enter => race(of(enter).pipe(delay(this.expandDelay())), exits, this.manualExpandUnprevented$),
      ), filter(result => Boolean(result)), map(
        () => this.element.nativeElement.matches(':hover'),
      ));
      return merge(waitedEnters, exits);
  }

  private setupExpandFromActivation() {
    const userEvents = merge(this.clicked$, this.activationKeyPressed$);
    // Emit anytime that the user clicks, or presses space/enter inside the nav,
    // AND the ensuing event is not prevented when emitted to parent components.
    return userEvents.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(event => {
        const expandEvent = new CollapsibleNavExpansionEvent(event);
        this.manualExpand.emit(expandEvent);
        return expandEvent;
      }),
      filter(expandEvent => !expandEvent.expandPrevented),
    );
  }

  @HostBinding('class.novo-collapsible-nav-collapsed')
  get isCollapsed(): boolean {
    return this.effectiveCollapsed();
  }

  toggle(): void {
    this.collapsed.update((collapsed) => !collapsed);
  }

  expand(): void {
    this.collapsed.set(false);
  }

  collapse(): void {
    this.collapsed.set(true);
    this.isHovered.set(false);
  }
}
