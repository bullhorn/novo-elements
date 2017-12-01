import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { BasePickerResults } from '../base-picker-results/BasePickerResults';
export declare class PickerResults extends BasePickerResults {
    labels: NovoLabelService;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
}
