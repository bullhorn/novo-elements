import { TemplateRef } from '@angular/core';

// @dynamic
export class Helpers {
  /**
   * Checks if the provided value is an Angular TemplateRef
   * @param value - The value to check
   * @returns true if the value is an instance of TemplateRef, false otherwise
   */
  static isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  /**
   * Swallows an event to stop further execution
   */
  static swallowEvent(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * Interpolates a string or function with provided properties
   * Replaces placeholders in the format $variableName with values from props
   * @param str - The format string or function to interpolate
   * @param props - The object containing values to replace placeholders
   * @returns The interpolated string
   */
  static interpolate(str: string | Function, props: any): string {
    if (typeof str === 'function') {
      return str(props);
    }
    if (this.isDate(props)) {
      props = this.dateToObject(props);
    }

    return str.replace(/\$([\w\.]+)/g, (original: string, key: string) => {
      const keys: string[] = key.split('.');
      let value = props[keys.shift()];
      while (keys.length && value !== undefined) {
        const k = keys.shift();
        value = k ? value[k] : `${value}.`;
      }
      return value !== undefined ? value : '';
    });
  }

  /**
   * Interpolates a format string (or array of strings) with provided data
   * Attempts to replace all variables, returning the first successful interpolation
   * or an empty string if all attempts fail
   * @param formatString - A single format string or array of format strings to try
   * @param data - The object containing values to replace placeholders
   * @returns The first successfully interpolated string, or an empty string
   */
  static interpolateWithFallback(formatString: string | string[], data: any): string {
    // Format string can be an array, it will attempt to interpolate each item
    // in the array, if there is a failure to replace it will mark it as such
    // It will either return the first successful replacement of ALL variables,
    // or an empty string
    if (Array.isArray(formatString)) {
      const successes: string[] = [];
      const failures: string[] = [];
      formatString.forEach((format: string) => {
        let isSuccess: boolean = true;
        const attempt = format.replace(/\$([\w\.]+)/g, (original, key) => {
          const keys = key.split('.');
          let value = data[keys.shift()];
          while (keys.length && value !== undefined) {
            const k = keys.shift();
            value = k ? value[k] : `${value}.`;
          }
          if (isSuccess && Helpers.isEmpty(value)) {
            isSuccess = false;
          }
          return Helpers.isEmpty(value) ? '' : value;
        });
        if (isSuccess) {
          successes.push(attempt);
        } else {
          failures.push(attempt);
        }
      });
      if (successes.length !== 0) {
        return successes[0];
      }
      return '';
    } else {
      return Helpers.interpolate(formatString, data);
    }
  }

  /**
   * Verifies that an object has every property expected by a string to interpolate
   * @param str   The string to interpolate
   * @param props The params to replace in string.
   */
  static validateInterpolationProps(str: string | Function, props: any): boolean {
    if (typeof str === 'function') {
      return true;
    }
    const keys = str.match(/\$([\w\.]+)/g);
    return keys.every((key) => {
      return props.hasOwnProperty(key.substr(1));
    });
  }

  /**
   * Checks if the provided value is a plain object
   * @param item - The value to check
   * @returns true if the value is an object but not an array or null, false otherwise
   */
  static isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
  }

  /**
   * Checks to see if the object is a string
   */
  static isString(obj: any) {
    return typeof obj === 'string';
  }

  /**
   * Escapes special regex characters in a string
   * @param obj - The value to escape (if it's a string)
   * @returns The escaped string if input is a string, otherwise the original value
   */
  static escapeString(obj: any): any {
    if (Helpers.isString(obj)) {
      return obj.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    return obj;
  }

  /**
   * Checks if a value is a valid number (string or numeric type)
   * @param val - The value to check
   * @param includeNegatives - Whether to allow negative numbers (default: false)
   * @returns true if the value is a valid number, false otherwise
   */
  static isNumber(val: any, includeNegatives: boolean = false) {
    const numberRegex = includeNegatives ? /^-{0,1}\d*\.?\d*$/ : /^\d*\.?\d*$/;
    if (typeof val === 'string') {
      return val.length > 0 && val !== '.' && numberRegex.test(val);
    } else {
      return !isNaN(parseFloat(val));
    }
  }

  /**
   * Checks to see if the object is undefined or null
   */
  static isBlank(obj: any): boolean {
    return Helpers.isNullOrUndefined(obj);
  }

  /**
   * Checks to see if the object is null or undefined
   */
  static isNullOrUndefined(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  /**
   * Checks to see if the object is undefined, null, an empty string, or an empty array
   */
  static isEmpty(obj: any): boolean {
    return Helpers.isBlank(obj) || obj === '' || (Array.isArray(obj) && obj.length === 0);
  }

  /**
   * Checks to see if the object is a function
   */
  static isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  /**
   * Checks to see if the object is a Date
   */
  static isDate(obj: any) {
    return obj instanceof Date;
  }

  /**
   * Checks if a string is a valid ISO 8601 date format
   * @param str - The string to validate
   * @returns true if the string is a valid ISO date, false otherwise
   */
  static isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
      return false;
    }
    const d = new Date(str);
    return d.toISOString() === str;
  }

  /**
   * Converts a value to an array
   * @param obj - The value to convert
   * @returns An empty array if undefined, the value wrapped in an array if not already an array, or the array as-is
   */
  static convertToArray(obj: unknown) {
    if (obj === undefined) {
      return [];
    } else if (!Array.isArray(obj)) {
      return [obj];
    }
    return obj;
  }

  /**
   * Creates a comparator function for sorting objects by specified fields
   * @param fields - A field name, array of field names, or custom comparator function
   * @param reverse - Whether to reverse the sort order (default: false for ascending)
   * @returns A comparator function suitable for use with Array.sort()
   */
  static sortByField(fields: any, reverse = false) {
    return (previous: any, current: any) => {
      if (Helpers.isFunction(fields)) {
        return fields(reverse ? 'desc' : 'asc', previous, current);
      }
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      for (let i = 0; i < fields.length; i++) {
        const field: string = fields[i];
        let first = previous[field] || '';
        let second = current[field] || '';

        if (Helpers.isDate(first) && Helpers.isDate(second)) {
          // Dates
          first = first.getTime();
          second = second.getTime();
        } else if (Helpers.isString(first) && Helpers.isString(second)) {
          // Basic strings
          first = first.toLowerCase();
          second = second.toLowerCase();
        } else {
          // Numbers
          first = isNaN(Number(first)) ? first : Number(first);
          second = isNaN(Number(second)) ? second : Number(second);
        }

        if (first > second) {
          return reverse ? -1 : 1;
        } else if (first < second) {
          return reverse ? 1 : -1;
        }
      }
      return 0;
    };
  }

  /**
   * Creates a filter function for filtering objects by field values
   * Supports exact matching, arrays, ranges, and complex filter objects
   * @param key - The field key to filter on (supports dot notation for nested properties)
   * @param value - The filter value (can be a function, array, range object, or regex pattern string)
   * @returns A filter function suitable for use with Array.filter()
   */
  static filterByField(key, value) {
    return (item) => {
      const results = [];
      let field = can(item).have(key);
      if (value instanceof Function) {
        results.push(value(field, item));
      } else if (Array.isArray(value)) {
        results.push(value.includes(field));
      } else if (value instanceof Object) {
        if (field instanceof Date) {
          field = field.getTime();
        }
        if (value.min) {
          results.push(field >= value.min);
        }
        if (value.max) {
          results.push(field <= value.max);
        }
        if (value.any && Array.isArray(value.any)) {
          if (Array.isArray(field)) {
            results.push(value.any.some((v) => field.includes(v)));
          } else {
            results.push(value.any.includes(field));
          }
        }
        if (value.all && Array.isArray(value.all)) {
          results.push(value.all.every((v) => field.includes(v)));
        }
        if (value.not) {
          results.push(!Helpers.filterByField(key, value.not)(item));
        }
        for (const subkey in value) {
          if (['min', 'max', 'any', 'all', 'not'].indexOf(subkey) < 0) {
            const subvalue = value[subkey];
            results.push(Helpers.filterByField(`${key}.${subkey}`, subvalue)(item));
          }
        }
      } else {
        results.push(JSON.stringify(field).match(new RegExp(value, 'gi')));
      }
      return results.every((x) => x);
    };
  }

  /**
   * Finds the first ancestor element that matches the provided CSS selector
   * @param element - The starting element to search from
   * @param selector - The CSS selector to match against
   * @returns The first matching ancestor element, or undefined if none found
   */
  static findAncestor(element: Element, selector: string): Element {
    while ((element = element.parentElement) && !element.matches.call(element, selector)); // tslint:disable-line
    return element;
  }

  /**
   * Creates a deep clone of an object or array
   * Recursively clones all nested properties and array elements
   * @param item - The item to clone
   * @returns A deep clone of the provided item
   */
  static deepClone(item: any): any {
    if (Array.isArray(item)) {
      const newArr = [];
      for (let i = item.length; i-- > 0; ) {
        // tslint:disable-line
        newArr[i] = Helpers.deepClone(item[i]);
      }
      return newArr;
    }
    if (typeof item === 'function' && !/\(\) \{ \[native/.test(item.toString()) && !item.toString().startsWith('class')) {
      let obj;
      for (const k in item) {
        if (k in item) {
          obj[k] = Helpers.deepClone(item[k]);
        }
      }
      return obj;
    }
    if (item && typeof item === 'object') {
      const obj = {};
      for (const k in item) {
        if (k in item) {
          obj[k] = Helpers.deepClone(item[k]);
        }
      }
      return obj;
    }
    return item;
  }

  /**
   * Recursively merges multiple objects into a single object
   * Nested objects and arrays are merged deeply
   * @param objs - Two or more objects to merge
   * @returns A new object with all properties merged
   * @throws Error if fewer than 2 objects are provided
   */
  static deepAssign(...objs) {
    if (objs.length < 2) {
      throw new Error('Need two or more objects to merge');
    }
    const target = Object.assign({}, objs[0]);
    for (let i = 1; i < objs.length; i++) {
      const source = Object.assign({}, objs[i]);
      Object.keys(source).forEach((prop) => {
        const value = source[prop];
        if (Helpers.isObject(value)) {
          if (target.hasOwnProperty(prop) && Helpers.isObject(target[prop])) {
            target[prop] = Helpers.deepAssign(target[prop], value);
          } else {
            target[prop] = value;
          }
        } else if (Array.isArray(value)) {
          if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {
            const targetArray = target[prop];
            value.forEach((sourceItem, itemIndex) => {
              if (itemIndex < targetArray.length) {
                const targetItem = targetArray[itemIndex];
                if (Object.is(targetItem, sourceItem)) {
                  return;
                }
                if (Helpers.isObject(targetItem) && Helpers.isObject(sourceItem)) {
                  targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                } else if (Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                  targetArray[itemIndex] = Helpers.deepAssign(targetItem, sourceItem);
                } else {
                  targetArray[itemIndex] = sourceItem;
                }
              } else {
                targetArray.push(sourceItem);
              }
            });
          } else {
            target[prop] = value;
          }
        } else {
          target[prop] = value;
        }
      });
    }

    return target;
  }

  /**
   * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
   * @param element any document element
   * @returns the next sibling node that is of type: Element
   */
  static getNextElementSibling(element: Element): Node {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    } else {
      let e = element.nextSibling;
      while (e && 1 !== e.nodeType) {
        e = e.nextSibling;
      }
      return e;
    }
  }

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
  } {
    const dateObj = {
      day: '',
      dayPeriod: '',
      era: '',
      hour: '',
      minute: '',
      month: '',
      second: '',
      weekday: '',
      year: '',
    };
    Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      era: 'short',
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      second: 'numeric',
      weekday: 'long',
      year: 'numeric',
    })
      .formatToParts(date)
      .forEach((dateTimeFormatPart: Intl.DateTimeFormatPart) => {
        if (dateTimeFormatPart.type !== 'literal') {
          dateObj[dateTimeFormatPart.type] = dateTimeFormatPart.value;
        }
      });
    return dateObj;
  }
}

/**
 * Helper class for safe property access using dot notation
 */
export class Can {
  obj: Object;

  /**
   * Creates a new Can instance
   * @param obj - The object to wrap for safe property access
   */
  constructor(obj: Object) {
    this.obj = obj;
  }

  /**
   * Safely accesses a property using dot notation
   * @param key - The property key (supports dot notation for nested properties)
   * @returns The property value or undefined
   */
  have(key: string): any {
    const props = key.split('.');
    let item: any = this.obj;
    for (let i = 0; i < props.length; i++) {
      item = item[props[i]];
      if (this.check(item) === false) {
        return item;
      }
    }
    return item;
  }

  /**
   * Checks if a value is defined (not undefined)
   * @param thing - The value to check
   * @returns true if the value is defined, false otherwise
   */
  check(thing: any): boolean {
    return thing !== void 0;
  }
}

/**
 * Factory function to create a Can instance for safe property access
 * @param obj - The object to wrap
 * @returns A new Can instance
 */
export function can(obj: any) {
  return new Can(obj);
}

/**
 * Performs a binary search on a sorted array
 * Note: Assumes the array is already sorted according to the compare function
 * @param item - The item to search for
 * @param array - The sorted array to search in
 * @param compare - Comparator function that returns -1 (item < array[i]), 0 (equal), or 1 (item > array[i])
 * @returns The matching item if found, undefined otherwise
 * @throws Error if the item is not comparable to an array element
 */
export function binarySearch<T>(item: T, array: T[], compare: (a: T, b: T) => 1 | -1 | 0 | undefined): T | undefined {
  return search(0, array.length - 1);

  function search(min: number, max: number): T | undefined {
    if (min > max) {
      return undefined;
    }
    const guess = min + Math.floor((max - min) / 2);
    const comparison = compare(item, array[guess]);

    if (comparison === 0) {
      return array[guess];
    } else if (comparison === -1) {
      return search(min, guess - 1);
    } else if (comparison === 1) {
      return search(guess + 1, max);
    } else {
      throw new Error(`Input mismatch: ${JSON.stringify(item)} not comparable to ${JSON.stringify(array[guess])}`);
    }
  }
}
