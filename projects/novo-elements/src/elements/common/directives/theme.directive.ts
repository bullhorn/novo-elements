// tslint:disable: directive-selector
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoTheme, ThemeChangeEvent } from '../theme/theme-options';

@Directive({
  selector: '[theme]',
})
export class ThemeColorDirective {
  private subscription: Subscription;

  @Input() theme: string;

  @HostBinding('class')
  get hb_textColor() {
    // Support legacy classic theme... for now
    if (this.novoTheme.themeName === 'classic') {
      return `novo-theme-${this.theme}`;
    }
    return '';
  }

  constructor(private el: ElementRef, private novoTheme: NovoTheme, protected cdr: ChangeDetectorRef) {
    this.subscription = this.novoTheme.onThemeChange.subscribe((event: ThemeChangeEvent) => {
      this.cdr.markForCheck();
    });
  }

  onDestroy(): void {
    this.subscription.unsubscribe();
  }
}
