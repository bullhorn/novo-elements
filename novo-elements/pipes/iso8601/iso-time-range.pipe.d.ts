import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
type IsoTimeRangeArgs = (string | Date)[];
export declare class IsoTimeRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoTimeRangeArgs): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoTimeRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoTimeRangePipe, "isoTimeRange", false>;
}
export {};
