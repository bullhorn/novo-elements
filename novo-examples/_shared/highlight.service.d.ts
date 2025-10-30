import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
export declare class HighlightJS {
    options: HighlightOptions;
    private _isReady$;
    get isReady(): Observable<boolean>;
    constructor();
    highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): HighlightResult;
    highlightAuto(value: string, languageSubset: string[]): HighlightResult;
    fixMarkup(value: string): string;
    highlightBlock(block: HTMLElement): void;
    configure(options: HighlightOptions): void;
    initHighlighting(): void;
    initHighlightingOnLoad(): void;
    registerLanguage(name: string, language: Function): void;
    listLanguages(): string[];
    getLanguage(name: string): any;
    private _loadScript;
    private _loadTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<HighlightJS, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HighlightJS>;
}
