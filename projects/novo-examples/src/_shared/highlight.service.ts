import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';

export interface HighlightOptions {
  theme?: string;
  path?: string;
  auto?: boolean;
  config?: HighlightConfig;
}

export interface HighlightConfig {
  /** tabReplace: a string used to replace TAB characters in indentation. */
  tabReplace?: string;
  /** useBR: a flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container. */
  useBR?: boolean;
  /** classPrefix: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets. */
  classPrefix?: string;
  /** languages: an array of language names and aliases restricting auto detection to only these languages. */
  languages?: string[];
}

export interface HighlightResult {
  language?: string;
  r?: number;
  second_best?: any;
  top?: any;
  value?: string;
}

declare const hljs: any;

@Injectable()
export class HighlightJS {
  public options: HighlightOptions = {
    theme: 'github',
    path: 'assets/lib/hljs',
    auto: true,
  };

  private _isReady$ = new BehaviorSubject(false);

  // Stream that emits when highlightjs is loaded
  get isReady(): Observable<boolean> {
    return this._isReady$.pipe(
      filter((isReady) => isReady),
      take(1),
    );
  }

  constructor() {
    this.options = { ...this.options };

    if (typeof hljs !== 'undefined') {
      /** hljs is loaded by the user */
      hljs.configure(this.options.config);
      this._isReady$.next(true);
    } else {
      /** Load hljs script and style locally */
      this._loadScript();
      this._loadTheme();
    }
  }

  highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): HighlightResult {
    if (typeof hljs !== 'undefined') {
      return hljs.highlight(name, value, ignore_illegals, continuation);
    }
  }

  highlightAuto(value: string, languageSubset: string[]): HighlightResult {
    if (typeof hljs !== 'undefined') {
      return hljs.highlightAuto(value, languageSubset);
    }
  }

  fixMarkup(value: string): string {
    if (typeof hljs !== 'undefined') {
      return hljs.fixMarkup(value);
    }
  }

  highlightBlock(block: HTMLElement) {
    if (typeof hljs !== 'undefined') {
      hljs.highlightBlock(block);
    }
  }

  configure(options: HighlightOptions) {
    if (typeof hljs !== 'undefined') {
      hljs.configure(this.options.config);
    }
  }

  initHighlighting() {
    if (typeof hljs !== 'undefined') {
      hljs.initHighlighting();
    }
  }

  initHighlightingOnLoad() {
    if (typeof hljs !== 'undefined') {
      hljs.initHighlightingOnLoad();
    }
  }

  registerLanguage(name: string, language: Function) {
    if (typeof hljs !== 'undefined') {
      hljs.registerLanguage(name, language);
    }
  }

  listLanguages(): string[] {
    if (typeof hljs !== 'undefined') {
      return hljs.listLanguages();
    }
  }

  getLanguage(name: string): any {
    if (typeof hljs !== 'undefined') {
      return hljs.getLanguage(name);
    }
  }

  private _loadScript() {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
      hljs.configure(this.options.config);
      this._isReady$.next(true);
    };
    script.src = `${this.options.path}/highlight.pack.js`;
    document.head.appendChild(script);
  }

  private _loadTheme() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `${this.options.path}/styles/${this.options.theme}.css`;
    document.head.appendChild(style);
  }
}
