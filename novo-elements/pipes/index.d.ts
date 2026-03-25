import * as i0 from '@angular/core';
import { PipeTransform } from '@angular/core';

declare class DecodeURIPipe implements PipeTransform {
    transform(encodedString: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DecodeURIPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DecodeURIPipe, "decodeURI", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DecodeURIPipe>;
}

declare class DefaultPipe implements PipeTransform {
    transform(value: any, defaultValue: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DefaultPipe, "default", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DefaultPipe>;
}

declare class GroupByPipe implements PipeTransform {
    transform(input: any, prop: string): Array<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupByPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<GroupByPipe, "groupBy", false>;
}

declare class HighlightPipe implements PipeTransform {
    transform(value: any, term: any): any;
    escapeRegexp(queryToEscape: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<HighlightPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HighlightPipe, "highlight", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HighlightPipe>;
}

type IsoDateRangeArgs = (string | Date)[];
declare class IsoDateRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoDateRangeArgs): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoDateRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoDateRangePipe, "isoDateRange", false>;
}

declare class IsoDatePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoDatePipe, "isoDate", false>;
}

type IsoTimeRangeArgs = (string | Date)[];
declare class IsoTimeRangePipe implements PipeTransform {
    constructor();
    transform(dates: IsoTimeRangeArgs): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoTimeRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoTimeRangePipe, "isoTimeRange", false>;
}

declare class IsoTimePipe implements PipeTransform {
    constructor();
    transform(date: string | Date): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsoTimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsoTimePipe, "isoTime", false>;
}

declare class PluralPipe implements PipeTransform {
    transform(value: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PluralPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PluralPipe, "plural", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PluralPipe>;
}

declare class NovoPipesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPipesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoPipesModule, [typeof PluralPipe, typeof DecodeURIPipe, typeof GroupByPipe, typeof HighlightPipe, typeof DefaultPipe, typeof IsoTimePipe, typeof IsoDatePipe, typeof IsoTimeRangePipe, typeof IsoDateRangePipe], never, [typeof PluralPipe, typeof DecodeURIPipe, typeof GroupByPipe, typeof HighlightPipe, typeof DefaultPipe, typeof IsoTimePipe, typeof IsoDatePipe, typeof IsoTimeRangePipe, typeof IsoDateRangePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoPipesModule>;
}

export { DecodeURIPipe, DefaultPipe, GroupByPipe, HighlightPipe, IsoDatePipe, IsoDateRangePipe, IsoTimePipe, IsoTimeRangePipe, NovoPipesModule, PluralPipe };
