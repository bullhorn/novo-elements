// tslint:disable: directive-selector
import { Directive, ElementRef, HostBinding, Inject, Input, Optional } from '@angular/core';
import { NovoThemeOptions, NOVO_THEME_OPTIONS } from '../tokens/theme-options';

@Directive({
  selector: '[accent]',
})
export class AccentColorDirective {
  @Input() accent: string;

  @HostBinding('class')
  get hb_textColor() {
    // Support legacy classic theme... for now
    if (this.themeOptions.themeName === 'classic') {
      return `novo-theme-${this.accent}`;
    }
    return `novo-accent-${this.accent}`;
  }

  constructor(private el: ElementRef, @Optional() @Inject(NOVO_THEME_OPTIONS) private themeOptions: NovoThemeOptions) {
    console.log('Found Theme Options', themeOptions);
  }
}
