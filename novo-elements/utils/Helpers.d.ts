export declare class Helpers {
    /**
     * Checks if the provided value is an Angular TemplateRef
     * @param value - The value to check
     * @returns true if the value is an instance of TemplateRef, false otherwise
     */
    static isTemplateRef(value: any): boolean;
    /**
     * Swallows an event to stop further execution
     */
    static swallowEvent(event: any): void;
    /**
     * Interpolates a string or function with provided properties
     * Replaces placeholders in the format $variableName with values from props
     * @param str - The format string or function to interpolate
     * @param props - The object containing values to replace placeholders
     * @returns The interpolated string
     */
    static interpolate(str: string | Function, props: any): string;
    /**
     * Interpolates a format string (or array of strings) with provided data
     * Attempts to replace all variables, returning the first successful interpolation
     * or an empty string if all attempts fail
     * @param formatString - A single format string or array of format strings to try
     * @param data - The object containing values to replace placeholders
     * @returns The first successfully interpolated string, or an empty string
     */
    static interpolateWithFallback(formatString: string | string[], data: any): string;
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param str   The string to interpolate
     * @param props The params to replace in string.
     */
    static validateInterpolationProps(str: string | Function, props: any): boolean;
    /**
     * Checks if the provided value is a plain object
     * @param item - The value to check
     * @returns true if the value is an object but not an array or null, false otherwise
     */
    static isObject(item: any): boolean;
    /**
     * Checks to see if the object is a string
     */
    static isString(obj: any): obj is string;
    /**
     * Escapes special regex characters in a string
     * @param obj - The value to escape (if it's a string)
     * @returns The escaped string if input is a string, otherwise the original value
     */
    static escapeString(obj: any): any;
    /**
     * Checks if a value is a valid number (string or numeric type)
     * @param val - The value to check
     * @param includeNegatives - Whether to allow negative numbers (default: false)
     * @returns true if the value is a valid number, false otherwise
     */
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
    /**
     * Checks if a string is a valid ISO 8601 date format
     * @param str - The string to validate
     * @returns true if the string is a valid ISO date, false otherwise
     */
    static isIsoDate(str: string): boolean;
    /**
     * Converts a value to an array
     * @param obj - The value to convert
     * @returns An empty array if undefined, the value wrapped in an array if not already an array, or the array as-is
     */
    static convertToArray(obj: unknown): any[];
    /**
     * Creates a comparator function for sorting objects by specified fields
     * @param fields - A field name, array of field names, or custom comparator function
     * @param reverse - Whether to reverse the sort order (default: false for ascending)
     * @returns A comparator function suitable for use with Array.sort()
     */
    static sortByField(fields: any, reverse?: boolean): (previous: any, current: any) => any;
    /**
     * Creates a filter function for filtering objects by field values
     * Supports exact matching, arrays, ranges, and complex filter objects
     * @param key - The field key to filter on (supports dot notation for nested properties)
     * @param value - The filter value (can be a function, array, range object, or regex pattern string)
     * @returns A filter function suitable for use with Array.filter()
     */
    static filterByField(key: any, value: any): (item: any) => boolean;
    /**
     * Finds the first ancestor element that matches the provided CSS selector
     * @param element - The starting element to search from
     * @param selector - The CSS selector to match against
     * @returns The first matching ancestor element, or undefined if none found
     */
    static findAncestor(element: Element, selector: string): Element;
    /**
     * Creates a deep clone of an object or array
     * Recursively clones all nested properties and array elements
     * @param item - The item to clone
     * @returns A deep clone of the provided item
     */
    static deepClone(item: any): any;
    /**
     * Recursively merges multiple objects into a single object
     * Nested objects and arrays are merged deeply
     * @param objs - Two or more objects to merge
     * @returns A new object with all properties merged
     * @throws Error if fewer than 2 objects are provided
     */
    static deepAssign(...objs: any[]): any;
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element: Element): Node;
    /**
     * Converts a Date object to an object with formatted date and time parts
     * @param date - The Date object to convert
     * @returns An object with date components (year, month, day, hour, minute, second, weekday, era, dayPeriod)
     */
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
/**
 * Helper class for safe property access using dot notation
 */
export declare class Can {
    obj: Object;
    /**
     * Creates a new Can instance
     * @param obj - The object to wrap for safe property access
     */
    constructor(obj: Object);
    /**
     * Safely accesses a property using dot notation
     * @param key - The property key (supports dot notation for nested properties)
     * @returns The property value or undefined
     */
    have(key: string): any;
    /**
     * Checks if a value is defined (not undefined)
     * @param thing - The value to check
     * @returns true if the value is defined, false otherwise
     */
    check(thing: any): boolean;
}
/**
 * Factory function to create a Can instance for safe property access
 * @param obj - The object to wrap
 * @returns A new Can instance
 */
export declare function can(obj: any): Can;
/**
 * Performs a binary search on a sorted array
 * Note: Assumes the array is already sorted according to the compare function
 * @param item - The item to search for
 * @param array - The sorted array to search in
 * @param compare - Comparator function that returns -1 (item < array[i]), 0 (equal), or 1 (item > array[i])
 * @returns The matching item if found, undefined otherwise
 * @throws Error if the item is not comparable to an array element
 */
export declare function binarySearch<T>(item: T, array: T[], compare: (a: T, b: T) => 1 | -1 | 0 | undefined): T | undefined;
