import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class YearPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<YearPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<YearPipe, "year", false>;
}
