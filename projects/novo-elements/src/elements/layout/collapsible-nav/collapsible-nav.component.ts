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
import { delay, filter, map, merge, Observable, of, partition, race, switchMap } from 'rxjs';
import { novoCollapsibleNavAnimations } from './collapsible-nav.animations';

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
  expandDelay = input<number>(0);

  /** When true, hovering a collapsed panel temporarily expands it as an overlay without affecting layout. */
  overlayOnHover = input<boolean>(false);

  hoveredChange = output<boolean>();

  public readonly element = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isHovered = signal(false);
  private readonly isHoveredDebounced$ = this.debounceHover(this.isHovered);
  private readonly isEffectiveHovered = toSignal(this.isHoveredDebounced$);
  private readonly effectiveCollapsed = computed(() => this.collapsed() && !(this.overlayOnHover() && this.isEffectiveHovered()));

  constructor() {
    effect(() => {
      if (this.collapsed()) {
        this.isHovered.set(false);
      }
    });
    this.isHoveredDebounced$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(hovered => {
      this.hoveredChange.emit(hovered);
    });
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

  private debounceHover(hoverSignal: Signal<boolean>): Observable<boolean> {
      const hoverObs = toObservable(hoverSignal);
      const [enters, exits] = partition(hoverObs, hovered => hovered);
      const waitedEnters = enters.pipe(switchMap(
        enter => race(of(enter).pipe(delay(this.expandDelay())), exits),
      ), filter(result => result), map(
        () => this.element.nativeElement.matches(':hover'),
      ));
      return merge(waitedEnters, exits);
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
