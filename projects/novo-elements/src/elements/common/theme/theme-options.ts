import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, Observable, of } from 'rxjs';

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
  private _currentTheme = signal<NovoThemeOptions>(undefined);
  public currentTheme = this._currentTheme.asReadonly();

  onThemeChange: Observable<ThemeChangeEvent> = toObservable(this._currentTheme).pipe(map(theme => ({
    themeName: theme?.themeName,
    options: theme,
  })));

  document = inject(DOCUMENT);

  /** Name of the theme being used. defaults to `bh2022-light`. */
  get themeName() {
    return this._currentTheme()?.themeName || this._defaultTheme.themeName;
  }
  set themeName(value: string) {
    const newTheme = { themeName: value };
    this.changeTheme(newTheme);
  }

  public use(options: NovoThemeOptions): Observable<any> {
    // future: don't change the theme if the theme given is already selected
    this.changeTheme(options);
    // this might become async in future
    return of(options);
  }

  public isBh2026 = computed(() => {
    return this.currentTheme()?.themeName?.includes('bh2026');
  });

  /**
   * Changes the current theme
   */
  private changeTheme(theme: NovoThemeOptions): void {
    this._currentTheme.set(theme);
    this.applyThemeToDom(theme.themeName);
  }

  private applyThemeToDom(themeName: string): void {
    if (typeof this.document === 'undefined' || !this.document.documentElement) {
      return;
    }
    const root = this.document.documentElement;
    const normalized = normalizeThemeName(themeName);
    const generation = normalized.split('-')[0];
    root.classList.toggle('theme-dark', normalized.endsWith('-dark'));
    if (OVERRIDE_GENERATIONS.has(generation)) {
      root.dataset.theme = generation;
    } else {
      root.removeAttribute('data-theme');
    }
  }
}
