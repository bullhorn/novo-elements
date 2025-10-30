import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DayOfMonthPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: 'numeric' | '2-digit'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DayOfMonthPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DayOfMonthPipe, "dayofmonth", false>;
}
