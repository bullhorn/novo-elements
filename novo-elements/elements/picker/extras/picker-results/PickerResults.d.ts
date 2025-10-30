import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
import * as i0 from "@angular/core";
export declare class PickerResults extends BasePickerResults {
    labels: NovoLabelService;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getEmptyMessage(): any;
    shouldShowMessageForZeroLengthSearch(): any;
    getListElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickerResults, "picker-results", never, {}, {}, never, never, false, never>;
}
