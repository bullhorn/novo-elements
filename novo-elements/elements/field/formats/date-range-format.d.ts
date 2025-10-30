import { EventEmitter } from '@angular/core';
import { IMaskDirective } from 'angular-imask';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { DateParseOptions } from 'novo-elements/utils';
import { DATE_FORMATS } from './base-format';
import * as i0 from "@angular/core";
export declare const DATERANGEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<readonly import("@angular/forms").ControlValueAccessor[]>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
type DateRange = {
    startDate: Date;
    endDate: Date;
};
export declare class NovoDateRangeFormatDirective extends IMaskDirective<any> {
    private labels;
    private dateFormat;
    valueChange: EventEmitter<any>;
    dateRangeFormat: DATE_FORMATS;
    constructor(labels: NovoLabelService, dateFormat: DateFormatService);
    normalize(value: string | Date, options?: DateParseOptions): string;
    formatAsIso(value: DateRange): string;
    formatValue(value: DateRange): string;
    formatDate(source: Date | string): string;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    extractDatesFromInput(value: any): {
        startDate: Date;
        endDate: Date;
    };
    validate(dateStr: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoDateRangeFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoDateRangeFormatDirective, "input[dateRangeFormat]", never, { "dateRangeFormat": { "alias": "dateRangeFormat"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
