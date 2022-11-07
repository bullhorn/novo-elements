import { TemplateRef } from '@angular/core';

// @dynamic
export class Helpers {
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

  static interpolate(str: string | Function, props: any): string {
    if (typeof str === 'function') {
      return str(props);
    }
    if (this.isDate(props)) {
      props = this.dateToObject(props);
    }
    // else {
    //   props = Object.entries(props).reduce((obj, [key, value]) => {
    //     const res = { ...obj, [key]: value };
    //     if (this.isIsoDate(value as string)) {
    //       res[`${key}Parts`] = this.dateToObject(new Date(value as string));
    //     }
    //     return res;
    //   }, {});
    // }

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

  static isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
  }

  /**
   * Checks to see if the object is a string
   */
  static isString(obj: any) {
    return typeof obj === 'string';
  }

  static escapeString(obj: any): any {
    if (Helpers.isString(obj)) {
      return obj.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    return obj;
  }

  static isNumber(val: any, includeNegatives: boolean = false) {
    const numberRegex = includeNegatives ? /^-{0,1}\d*\.?\d*$/ : /^\d*\.?\d*$/;
    if (typeof val === 'string') {
      return val.length > 0 && val !== '.' && numberRegex.test(val);
    } else {
      return !isNaN(parseFloat(val));
    }
  }

  /**
   * Checks to see if the object is a undefined or null
   */
  static isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  /**
   * Checks to see if the object is a undefined or null
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

  static isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
      return false;
    }
    const d = new Date(str);
    return d.toISOString() === str;
  }

  static convertToArray(obj: unknown) {
    if (obj === undefined) {
      return [];
    } else if (!Array.isArray(obj)) {
      return [obj];
    }
    return obj;
  }

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

  static findAncestor(element: Element, selector: string): Element {
    while ((element = element.parentElement) && !element.matches.call(element, selector)); // tslint:disable-line
    return element;
  }

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

export class Can {
  obj: Object;

  constructor(obj: Object) {
    this.obj = obj;
  }

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

  check(thing: any): boolean {
    return thing !== void 0;
  }
}

export function can(obj: any) {
  return new Can(obj);
}

// Assumes data is already sorted
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
