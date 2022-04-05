import { InjectionToken } from '@angular/core';

export interface NovoThemeOptions {
  /** Name of the theme being used. */
  themeName?: string;
}

/** Injection token to be used to override the default options for components that use the theme attribute. */
export const NOVO_THEME_OPTIONS = new InjectionToken<NovoThemeOptions>('novo-theme-options', {
  providedIn: 'root',
  factory: NOVO_THEME_OPTIONS_FACTORY,
});

/** @docs-private */
export function NOVO_THEME_OPTIONS_FACTORY(): NovoThemeOptions {
  return { themeName: 'modern' };
}
