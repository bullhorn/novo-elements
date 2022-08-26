import { addDays, differenceInCalendarDays, endOfWeek, format, isSameDay, parse, parseISO, startOfDay, startOfWeek } from 'date-fns';
import { Helpers } from '../../utils';

export type WeekDayNumber = 0 | 2 | 1 | 3 | 4 | 5 | 6;

export class DateUtil {    
    static parse(date, options?) {
        date = this.getDateIfString(date);
        const format = ''; // fix
        const reference: number | Date = Date.now(); // fix
        return parse(date, format, reference, options)
    }

    static format(date, format) {
        date = this.getDateIfString(date);
        return format(date, format);
    }

    static addDays(date, days) {
        date = this.getDateIfString(date);
        return addDays(date, days);
    }

    static startOfDay(date) {
        date = this.getDateIfString(date);
        return startOfDay(date);
    }

    static startOfWeek(date, options) {
        date = this.getDateIfString(date);
        return startOfWeek(date, options)
    }

    static endOfWeek(date, options) {
        date = this.getDateIfString(date);
        return endOfWeek(date, options);
    }

    static isSameDay(dateLeft, dateRight) {

        dateLeft = this.getDateIfString(dateLeft);
        dateRight = this.getDateIfString(dateRight);

        return isSameDay(dateLeft, dateRight);
    }

    static differenceInCalendarDays(date, start) {
        date = this.getDateIfString(date);
        return differenceInCalendarDays(date, start);
    }

    static isWithinRange(date, start, end) {
        return true; // write fn
    }

    static getDateIfString(date) {
        date = Helpers.isString(date) ? parseISO(date.toString()) : date;
    }
}