/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
export type LegacyParseOptions = {
    additionalDigits?: 0 | 1 | 2;
};
export declare function legacyParse(argument: any, options?: LegacyParseOptions): Date;
type DateStrings = {
    date: string | undefined;
    time: string | undefined;
    timezone: string | undefined;
};
export declare function splitDateString(dateString: string): DateStrings;
export {};
