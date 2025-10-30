import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class HighlightPipe implements PipeTransform {
    transform(value: any, term: any): any;
    escapeRegexp(queryToEscape: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<HighlightPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HighlightPipe, "highlight", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HighlightPipe>;
}
