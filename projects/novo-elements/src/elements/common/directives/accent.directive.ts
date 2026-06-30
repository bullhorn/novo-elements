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
    // The legacy 'classic' theme is retired — every theme now uses the
    // modern/neutral accent treatment (classic = today's baseline look).
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
