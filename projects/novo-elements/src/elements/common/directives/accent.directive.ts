import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoTheme, ThemeChangeEvent, normalizeThemeName } from '../theme/theme-options';

@Directive({
    selector: '[accent]',
    standalone: false,
})
export class AccentColorDirective implements OnDestroy {
  private subscription: Subscription;

  @Input() accent: string;

  @HostBinding('class')
  get hb_textColor() {
    // Classic look is a fully colored record header. bh2022 theme is an entity colored bottom border.
    if (this.theme.themeName === 'classic') {
      return `novo-theme-${this.accent}`;
    }
    const normalized = normalizeThemeName(this.theme.themeName);
    if (normalized.includes('bh2022') || normalized.includes('bh2026')) {
      return `novo-accent-${this.accent}`;
    }
    return '';
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
