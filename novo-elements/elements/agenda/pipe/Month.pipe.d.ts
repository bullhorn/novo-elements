import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MonthPipe, "month", false>;
}
