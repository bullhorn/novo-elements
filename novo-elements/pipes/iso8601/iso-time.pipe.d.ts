import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class IsoTimePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoTimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoTimePipe, "isoTime", false>;
}
