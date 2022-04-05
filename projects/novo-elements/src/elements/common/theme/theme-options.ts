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
    this.onThemeChange.emit({ themeName: theme.themeName, options: theme });
  }
}

/* FUTURE THOUGHTS */
/**
 getComputedStyle(document.documentElement)
    .getPropertyValue('--my-variable-name'); // #999999
 
 document.documentElement.style
    .setProperty('--my-variable-name', 'pink');
*/
