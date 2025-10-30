import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import { PickerResults } from '../picker-results';
import * as i0 from "@angular/core";
export declare class WorkersCompCodesPickerResults extends PickerResults {
    private sanitizer;
    labels: NovoLabelService;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    sanitizeHTML(compCode: string, name: string): import("@angular/platform-browser").SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkersCompCodesPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkersCompCodesPickerResults, "workers-comp-codes-picker-results", never, {}, {}, never, never, false, never>;
}
