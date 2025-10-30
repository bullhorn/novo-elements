import { NovoLabelService } from '../novo-label-service';
import { MaskedOptions } from 'imask';
import * as i0 from "@angular/core";
export declare class DateFormatService {
    private labels;
    readonly dateFormatAsImaskPattern: string;
    constructor(labels: NovoLabelService);
    getTimeMask(militaryTime: boolean): MaskedOptions;
    getDateMask(): MaskedOptions;
    getDateTimeMask(militaryTime?: boolean): Array<any>;
    getTimePlaceHolder(militaryTime: boolean): string;
    parseCustomDateString(dateString: string, customFormat?: string): [Date, string, boolean];
    private dateFormatToImaskPattern;
    /**
     * Certain date format characters are considered nonstandard. We can still use them, but remove them for date parsing to avoid errors
     * @param dateString
     * @param format
     * @returns date string and format in array, both having had their
     */
    private removeNonstandardFormatCharacters;
    parseDateString(dateString: string): [Date, string, boolean];
    parseTimeString(timeString: string, militaryTime: boolean): [Date, string];
    parseString(dateTimeString: string, militaryTime: boolean, type: string): [Date, string, boolean?];
    convertTime12to24(time12h: string): string;
    isValidDatePart(value: string, format: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFormatService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFormatService>;
}
