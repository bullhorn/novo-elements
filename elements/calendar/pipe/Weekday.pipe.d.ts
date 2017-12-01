import { PipeTransform } from '@angular/core';
export declare class WeekdayPipe implements PipeTransform {
    private locale;
    constructor(locale?: string);
    transform(date: Date, locale?: string, method?: string): string;
}
