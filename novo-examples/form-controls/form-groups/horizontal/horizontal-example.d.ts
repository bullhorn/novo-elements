import { BaseControl, FormUtils, NovoControlGroupAddConfig, NovoFormGroup } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Horizontal Example
 */
export declare class HorizontalExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<HorizontalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HorizontalExample, "horizontal-example", never, {}, {}, never, never, false, never>;
}
