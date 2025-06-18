// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoTheme, ThemeChangeEvent } from '../theme/theme-options';

@Directive({
  selector: '[accent]',
})
export class AccentColorDirective implements OnDestroy {
  private subscription: Subscription;

  @Input() accent: string;

  @HostBinding('class')
  get hb_textColor() {
    // Support legacy classic theme... for now
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
