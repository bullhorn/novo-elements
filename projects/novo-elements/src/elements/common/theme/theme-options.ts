import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  private _defaultTheme: NovoThemeOptions = { themeName: 'modern-light' };
  private _currentTheme: NovoThemeOptions;

  onThemeChange: EventEmitter<ThemeChangeEvent> = new EventEmitter<ThemeChangeEvent>();

  /** Name of the theme being used. defaults to `modern-light` */
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
   * Reflects the active theme onto the document root so token CSS can target it.
   *
   * The per-component `themeName` logic (e.g. header accents) keeps working off the
   * service value; this adds the *global* hook the modern token set needs:
   * `variables-modern.css` is scoped to `[data-theme="modern"]`, so any theme whose
   * name starts with `modern` switches the whole token contract at runtime.
   * `classic`/`light` clear the attribute and fall back to the default `:root` vars.
   * Dark mode remains an orthogonal `theme-dark` class, so it can layer on either base.
   */
  private applyThemeToDom(themeName: string): void {
    if (typeof document === 'undefined' || !document.documentElement) {
      return;
    }
    const root = document.documentElement;
    if (themeName?.startsWith('modern')) {
      root.dataset.theme = 'modern';
    } else {
      root.removeAttribute('data-theme');
    }
  }
}

/* FUTURE THOUGHTS */
/**
 getComputedStyle(document.documentElement)
    .getPropertyValue('--my-variable-name'); // #999999

 document.documentElement.style
    .setProperty('--my-variable-name', 'pink');
*/
