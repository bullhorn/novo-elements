import { EventEmitter, InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const NOVO_INPUT_FORMAT: InjectionToken<NovoInputFormat<any>>;
export interface NovoInputFormat<T = any> extends ControlValueAccessor {
    valueChange: EventEmitter<any>;
    formatValue(value: T): string;
}
export declare enum DATE_FORMATS {
    DATE = "date",
    ISO8601 = "iso8601",
    STRING = "string",
    YEAR_MONTH_DAY = "yyyy-mm-dd"
}
