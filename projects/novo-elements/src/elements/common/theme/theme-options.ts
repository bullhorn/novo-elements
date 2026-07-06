import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Novo theme generations named `bh<year>-<mode>`
 */
export type ThemeName = 'bh2022-light' | 'bh2022-dark' | 'bh2026-light' | 'bh2026-dark';
export const DEFAULT_THEME: ThemeName = 'bh2022-light';

/** Generations that render as a `[data-theme]` token override (bh2022 = the :root base). */
const OVERRIDE_GENERATIONS = new Set<string>(['bh2026']);

/** Map any stored/legacy themeName onto a canonical current name. */
export function normalizeThemeName(stored?: string): ThemeName {
  switch (stored) {
    case 'bh2026-light':
    case 'modern':
      return 'bh2026-light';
    case 'bh2026-dark':
      return 'bh2026-dark';
    case 'bh2022-dark':
    case 'modern-dark':
    case 'dark':
      return 'bh2022-dark';
    // 'bh2022-light' | 'classic' | 'light' | 'modern-light' | undefined
    default:
      return 'bh2022-light';
  }
}

export class NovoThemeOptions {
  themeName: string;
}
export interface ThemeChangeEvent {
  themeName: string;
  options?: NovoThemeOptions;
}

@Injectable({
  providedIn: 'root',
})
export class NovoTheme {
  private _defaultTheme: NovoThemeOptions = { themeName: DEFAULT_THEME };
  private _currentTheme: NovoThemeOptions;

  onThemeChange: EventEmitter<ThemeChangeEvent> = new EventEmitter<ThemeChangeEvent>();

  /** Name of the theme being used. defaults to `bh2022-light`. */
  get themeName() {
    return this._currentTheme?.themeName || this._defaultTheme.themeName;
  }
  set themeName(value: string) {
    this._currentTheme = { themeName: value };
    this.changeTheme(this._currentTheme);
  }

  public use(options: NovoThemeOptions): Observable<any> {
    // future: don't change the theme if the theme given is already selected
    this.changeTheme(options);
    // this might become async in future
    return of(options);
  }

  /**
   * Changes the current theme
   */
  private changeTheme(theme: NovoThemeOptions): void {
    this._currentTheme = theme;
    this.applyThemeToDom(theme.themeName);
    this.onThemeChange.emit({ themeName: theme.themeName, options: theme });
  }

  /**
   * Reflects the active theme's *generation* onto the document root so the token CSS can
   * target it. Override generations (bh2026) set `data-theme=<generation>` — the
   * `variables-bh2026.css` set is scoped to `[data-theme="bh2026"]`. The base generation
   * (bh2022) clears the attribute and uses the default `:root` vars. Light/dark remains an
   * orthogonal `theme-dark` class, layered on either base.
   */
  private applyThemeToDom(themeName: string): void {
    if (typeof document === 'undefined' || !document.documentElement) {
      return;
    }
    const root = document.documentElement;
    const generation = normalizeThemeName(themeName).split('-')[0];
    if (OVERRIDE_GENERATIONS.has(generation)) {
      root.dataset.theme = generation;
    } else {
      root.removeAttribute('data-theme');
    }
  }
}
