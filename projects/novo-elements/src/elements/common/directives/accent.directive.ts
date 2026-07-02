import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoTheme, ThemeChangeEvent } from '../theme/theme-options';

@Directive({
    selector: '[accent]',
    standalone: false,
})
export class AccentColorDirective implements OnDestroy {
  private subscription: Subscription;

  @Input() accent: string;

  @HostBinding('class')
  get hb_textColor() {
    // 'classic' (main, entity-colored) keeps the legacy treatment; every other theme
    // (main modern-light, and the bh2022/bh2026 generations) uses the neutral accent.
    // This makes flag-off byte-identical to main while the refresh (bh2026-light) stays neutral.
    if (this.theme.themeName === 'classic') {
      return `novo-theme-${this.accent}`;
    }
    return `novo-accent-${this.accent}`;
  }

  constructor(private theme: NovoTheme, protected cdr: ChangeDetectorRef) {
    this.subscription = this.theme.onThemeChange.subscribe((event: ThemeChangeEvent) => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
