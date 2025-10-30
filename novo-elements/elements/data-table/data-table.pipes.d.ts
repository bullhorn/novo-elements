import { PipeTransform } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { IDataTableColumn } from './interfaces';
import * as i0 from "@angular/core";
export declare function interpolateCell<T>(value: any, col: IDataTableColumn<T>): string;
export declare class DataTableInterpolatePipe<T> implements PipeTransform {
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableInterpolatePipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DataTableInterpolatePipe<any>, "dataTableInterpolate", false>;
}
export declare class DateTableDateRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableDateRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableDateRendererPipe<any>, "dataTableDateRenderer", false>;
}
export declare class DateTableDateTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableDateTimeRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableDateTimeRendererPipe<any>, "dataTableDateTimeRenderer", false>;
}
export declare class DateTableTimeRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableTimeRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableTimeRendererPipe<any>, "dataTableTimeRenderer", false>;
}
export declare class DateTableNumberRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>, isPercent?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableNumberRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableNumberRendererPipe<any>, "dataTableNumberRenderer", false>;
}
export declare class DataTableBigDecimalRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableBigDecimalRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DataTableBigDecimalRendererPipe<any>, "dataTableBigDecimalRenderer", false>;
}
export declare class DateTableCurrencyRendererPipe<T> implements PipeTransform {
    private labels;
    constructor(labels: NovoLabelService);
    transform(value: any, column: IDataTableColumn<T>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTableCurrencyRendererPipe<any>, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTableCurrencyRendererPipe<any>, "dataTableCurrencyRenderer", false>;
}
