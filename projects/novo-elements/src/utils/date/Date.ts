import { addDays, addHours, addMonths, addWeeks, differenceInCalendarDays, differenceInDays,
    differenceInSeconds, endOfDay, endOfMonth, endOfWeek, format, getMonth, getYear, Interval,
    isAfter, isBefore, isDate, isSameDay, isSameMonth, isSameSecond, isWithinInterval, parse,
    parseISO, setHours, setMinutes, startOfDay, startOfMinute, startOfMonth, startOfWeek, toDate } from 'date-fns';
import { Helpers } from '../Helpers';
import { convertTokens } from './convert-tokens';
import { legacyParse, LegacyParseOptions } from './legacy-parse';

type DateLike = Date | string | number;

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
export class DateUtil {
    static getDateFromAnyType(date: DateLike): Date | number {
        return legacyParse(date);
    }

    static getWeekDayFromNumber(weekDay: number | Day): Day {
        if (0 <= weekDay && weekDay <= 6) {
            return weekDay as Day;
        } else {
            console.warn('Invalid weekDay value:', weekDay);
            return 0;
        }
    }

    static parse(date: any, options?: LegacyParseOptions): Date {
        return legacyParse(date, options);
    }

    static format(date, formatString): string {
        if (!date) {
            return '';
        }
        date = this.getDateFromAnyType(date);
        formatString = convertTokens(formatString);
        return format(date, formatString);
    }

    static addDays(date, days: number): Date {
        date = this.getDateFromAnyType(date);
        return addDays(date, days);
    }

    static addWeeks(date, weeks: number): Date {
        date = this.getDateFromAnyType(date);
        return addWeeks(date, weeks);
    }

    static addMonths(date, months: number): Date {
        date = this.getDateFromAnyType(date);
        return addMonths(date, months);
    }

    static startOfMinute(date: DateLike): Date {
        date = this.getDateFromAnyType(date);
        return startOfMinute(date);
    }

    static startOfDay(date: DateLike): Date {
        date = this.getDateFromAnyType(date);
        return startOfDay(date);
    }

    static startOfWeek(date: DateLike, options?): Date {
        date = this.getDateFromAnyType(date);
        if (options?.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return startOfWeek(date, options);
    }

    static startOfMonth(date: DateLike): Date {
        date = this.getDateFromAnyType(date);
        return startOfMonth(date);
    }

    static endOfDay(date: DateLike): Date {
        date = this.getDateFromAnyType(date);
        return endOfDay(date);
    }

    static endOfWeek(date: DateLike, options?): Date {
        date = this.getDateFromAnyType(date);
        if (options?.weekStartsOn) {
            options.weekStartsOn = this.getWeekDayFromNumber(options.weekStartsOn);
        }
        return endOfWeek(date, options);
    }

    static endOfMonth(date: DateLike): Date {
        date = this.getDateFromAnyType(date);
        return endOfMonth(date);
    }

    static isSameDay(dateLeft: DateLike, dateRight: DateLike): boolean {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameDay(dateLeft, dateRight);
    }

    static isSameMonth(dateLeft: DateLike, dateRight: DateLike): boolean {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameMonth(dateLeft, dateRight);
    }

    static isSameSecond(dateLeft: DateLike, dateRight: DateLike): boolean {
        dateLeft = this.getDateFromAnyType(dateLeft);
        dateRight = this.getDateFromAnyType(dateRight);
        return isSameSecond(dateLeft, dateRight);
    }

    static differenceInSeconds(date: DateLike, start: DateLike): number {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInSeconds(date, start);
    }

    static differenceInCalendarDays(date: DateLike, start: DateLike): number {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInCalendarDays(date, start);
    }

    static differenceInDays(date: DateLike, start: DateLike): number {
        date = this.getDateFromAnyType(date);
        start = this.getDateFromAnyType(start);
        return differenceInDays(date, start);
    }

    static isWithinRange(date: DateLike | null, start: DateLike, end: DateLike): boolean {
        date = this.getDateFromAnyType(date);
        const interval = {
            start: this.getDateFromAnyType(start),
            end: this.getDateFromAnyType(end),
        };

        /**
         * Need extra error handling here to retain backwards compatibility because the new
         * isWithinInterval replacement function throws an error for Invalid Dates and Invalid
         * Intervals instead of returning true or false.
         **/
        try {
          return isWithinInterval(date, interval);
        } catch (e) {
          console.warn(e.toString());
          return false;
        }
    }

    static getMonth(date: DateLike): number {
        date = this.getDateFromAnyType(date);
        return getMonth(date);
    }

    static getYear(date: DateLike): number {
        date = this.getDateFromAnyType(date);
        return getYear(date);
    }

    static setMinutes(date: DateLike, minutes: number) {
        date = this.getDateFromAnyType(date);
        return setMinutes(date, minutes);
    }

    static setHours(date: DateLike, hours: number) {
        date = this.getDateFromAnyType(date);
        return setHours(date, hours);
    }

    static isBefore(date: DateLike, minDate: Date | number): boolean {
        date = this.getDateFromAnyType(date);
        return isBefore(date, minDate);
    }

    static isAfter(date: DateLike, maxDate: Date | number): boolean {
        date = this.getDateFromAnyType(date);
        return isAfter(date, maxDate);
    }
}
