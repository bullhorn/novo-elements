export declare class Helpers {
    static isTemplateRef(value: any): boolean;
    /**
     * Swallows an event to stop further execution
     */
    static swallowEvent(event: any): void;
    static interpolate(str: string | Function, props: any): string;
    static interpolateWithFallback(formatString: string | string[], data: any): string;
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param str   The string to interpolate
     * @param props The params to replace in string.
     */
    static validateInterpolationProps(str: string | Function, props: any): boolean;
    static isObject(item: any): boolean;
    /**
     * Checks to see if the object is a string
     */
    static isString(obj: any): obj is string;
    static escapeString(obj: any): any;
    static isNumber(val: any, includeNegatives?: boolean): boolean;
    /**
     * Checks to see if the object is undefined or null
     */
    static isBlank(obj: any): boolean;
    /**
     * Checks to see if the object is null or undefined
     */
    static isNullOrUndefined(obj: any): boolean;
    /**
     * Checks to see if the object is undefined, null, an empty string, or an empty array
     */
    static isEmpty(obj: any): boolean;
    /**
     * Checks to see if the object is a function
     */
    static isFunction(obj: any): boolean;
    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj: any): obj is Date;
    static isIsoDate(str: string): boolean;
    static convertToArray(obj: unknown): any[];
    static sortByField(fields: any, reverse?: boolean): (previous: any, current: any) => any;
    static filterByField(key: any, value: any): (item: any) => boolean;
    static findAncestor(element: Element, selector: string): Element;
    static deepClone(item: any): any;
    static deepAssign(...objs: any[]): any;
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element: Element): Node;
    static dateToObject(date: Date): {
        day: string;
        dayPeriod: string;
        era: string;
        hour: string;
        minute: string;
        month: string;
        second: string;
        weekday: string;
        year: string;
    };
}
export declare class Can {
    obj: Object;
    constructor(obj: Object);
    have(key: string): any;
    check(thing: any): boolean;
}
export declare function can(obj: any): Can;
export declare function binarySearch<T>(item: T, array: T[], compare: (a: T, b: T) => 1 | -1 | 0 | undefined): T | undefined;
