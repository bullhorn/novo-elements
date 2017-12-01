import { PipeTransform } from '@angular/core';
export declare class EndOfWeekDisplayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(endOfWeek: Date, startOfWeek: Date, locale?: string, method?: string): String;
}
