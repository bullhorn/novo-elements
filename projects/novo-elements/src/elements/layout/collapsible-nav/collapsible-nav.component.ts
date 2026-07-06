import { ChangeDetectionStrategy, Component, HostBinding, input, model, ViewEncapsulation } from '@angular/core';
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

  @HostBinding('@expandCollapse')
  get expandCollapseState(): { value: string; params: { expandedWidth: string; collapsedWidth: string } } {
    return {
      value: this.collapsed() ? 'collapsed' : 'expanded',
      params: { expandedWidth: this.expandedWidth(), collapsedWidth: this.collapsedWidth() },
    };
  }

  @HostBinding('class.novo-collapsible-nav-collapsed')
  get isCollapsed(): boolean {
    return this.collapsed();
  }

  toggle(): void {
    this.collapsed.update((collapsed) => !collapsed);
  }

  expand(): void {
    this.collapsed.set(false);
  }

  collapse(): void {
    this.collapsed.set(true);
  }
}
