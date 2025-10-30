import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MonthDayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MonthDayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MonthDayPipe, "monthday", false>;
}
