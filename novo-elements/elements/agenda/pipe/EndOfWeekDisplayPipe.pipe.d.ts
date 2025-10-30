import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class EndOfWeekDisplayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(endOfWeek: Date, startOfWeek: Date, locale?: string, method?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'): String;
    static ɵfac: i0.ɵɵFactoryDeclaration<EndOfWeekDisplayPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<EndOfWeekDisplayPipe, "endofweekdisplay", false>;
}
