import { Day } from 'date-fns';
import { LegacyParseOptions } from './legacy-parse';
type DateLike = Date | string | number;
export interface DateParseOptions extends LegacyParseOptions {
    userDateFormat?: string;
}
/**
 * This DateUtil is a wrapper for calling new date-fns v2 functions with existing legacy
 * v1 function calls without having to refactor too much code and potentially introduce
 * breaking changes.
 *
 * The old calls generally called date-fns functions with loosely-typed date values, often
 * of type DateLike (Date | string | number). This was a problem when upgrading to date-fns
 * v2 since functions are now typed more strongly and no longer accept strings.
 *
 * If you are adding a new component/feature and looking here to add a new date-fns wrapper
 * function, strongly consider not doing that and instead refactoring your code to not use
 * DateLike, and calling the date-fns function(s) directly.
 **/
export declare class DateUtil {
    static getDateFromAnyType(date: DateLike): Date | number;
    static getWeekDayFromNumber(weekDay: number | Day): Day;
    static parse(date: any, options?: DateParseOptions): Date;
    static format(date: any, formatString: string): string;
    static addDays(date: any, days: number): Date;
    static addWeeks(date: any, weeks: number): Date;
    static addMonths(date: any, months: number): Date;
    static startOfMinute(date: DateLike): Date;
    static startOfDay(date: DateLike): Date;
    static startOfWeek(date: DateLike, options?: any): Date;
    static startOfMonth(date: DateLike): Date;
    static endOfDay(date: DateLike): Date;
    static endOfWeek(date: DateLike, options?: any): Date;
    static endOfMonth(date: DateLike): Date;
    static isSameDay(dateLeft: DateLike, dateRight: DateLike): boolean;
    static isSameMonth(dateLeft: DateLike, dateRight: DateLike): boolean;
    static isSameSecond(dateLeft: DateLike, dateRight: DateLike): boolean;
    static differenceInSeconds(date: DateLike, start: DateLike): number;
    static differenceInCalendarDays(date: DateLike, start: DateLike): number;
    static differenceInDays(date: DateLike, start: DateLike): number;
    static isWithinRange(date: DateLike | null, start: DateLike, end: DateLike): boolean;
    static getMonth(date: DateLike): number;
    static getYear(date: DateLike): number;
    static setMinutes(date: DateLike, minutes: number): Date;
    static setHours(date: DateLike, hours: number): Date;
    static isBefore(date: DateLike, minDate: Date | number): boolean;
    static isAfter(date: DateLike, maxDate: Date | number): boolean;
    static rewireDatePositionsToMDY(dateStr: string, userDateFormat: string): string;
}
export {};
