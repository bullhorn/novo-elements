import { AfterViewInit, ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IMaskDirective } from 'angular-imask';
import { NovoLabelService } from 'novo-elements/services';
import { NovoInputFormat } from './base-format';
import * as i0 from "@angular/core";
export declare const TIMEFORMAT_VALUE_ACCESSOR: {
    provide: import("@angular/core").InjectionToken<readonly import("@angular/forms").ControlValueAccessor[]>;
    useExisting: import("@angular/core").Type<any>;
    multi: boolean;
};
export declare enum TIME_FORMATS {
    DATE = "date",
    ISO8601 = "iso8601",
    STRING = "string"
}
export declare class NovoTimeFormatDirective extends IMaskDirective<any> implements NovoInputFormat, AfterViewInit, OnChanges {
    private labels;
    private cdr;
    valueChange: EventEmitter<any>;
    military: boolean;
    timeFormat: TIME_FORMATS;
    constructor(labels: NovoLabelService, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    initFormatOptions(): void;
    _checkInput(event: InputEvent): void;
    _handleBlur(event: FocusEvent): void;
    _handleKeydown(event: KeyboardEvent): void;
    normalize(value: string): string;
    formatValue(value: any): string;
    formatAsIso(date: Date): string;
    convertTime12to24(time12h: string): string;
    convertTime24to12(time24h: string): string;
    writeValue(value: any): void;
    registerOnChange(fn: (date: any) => void): void;
    hourOneFormatRequired(hourInput: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTimeFormatDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoTimeFormatDirective, "input[timeFormat]", never, { "military": { "alias": "military"; "required": false; }; "timeFormat": { "alias": "timeFormat"; "required": false; }; }, {}, never, never, false, never>;
}
