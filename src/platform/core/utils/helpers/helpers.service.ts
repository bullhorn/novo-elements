export class Helpers {
  /**
   * Swallows an event to stop further execution
   * @param event
   */
  public static swallowEvent(event: MouseEvent | KeyboardEvent | MouseWheelEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * Interpolates a string with vars passed to it
   * @param  {String} str   The string to interpolate
   * @param  {Object} props The params to replace in string.
   * @return {String}
   */
  public static interpolate(str: string, props: any): string {
    return str.replace(/\$([\w\.]+)/g, (original: string, key: string) => {
      let keys: string[] = key.split('.');
      let value: string = props[keys.shift()];
      while (keys.length && value !== undefined) {
        let k: string = keys.shift();
        value = k ? value[k] : `${value}.`;
      }
      return value !== undefined ? value : original;
    });
  }

  /**
   * Verifies that an object has every property expected by a string to interpolate
   * @param  {String} str   The string to interpolate
   * @param  {Object} props The params to replace in string.
   * @return {Boolean}
   */
  public static validateInterpolationProps(str: string, props: Object): boolean {
    let keys: string[] = str.match(/\$([\w\.]+)/g);
    return keys.every((key: string) => {
      return props.hasOwnProperty(key.substr(1));
    });
  }

  public static isUndefined(value: any): boolean {
    return typeof value === 'undefined';
  }

  public static isObject(item: any): boolean {
    return item !== null && typeof item === 'object'; // tslint:disable-line
  }

  /**
   * Checks to see if the object is a string
   */
  public static isString(obj: any): boolean {
    return typeof obj === 'string';
  }

  /**
   * Checks to see if the object is a undefined or null
   */
  public static isBlank(obj: any): boolean {
    return obj === undefined || obj === undefined;
  }

  /**
   * Checks to see if the object is a undefined or null
   */
  public static isEmpty(obj: any): boolean {
    return Helpers.isBlank(obj) || obj === '' || (Array.isArray(obj) && obj.length === 0);
  }

  /**
   * Checks to see if the object is a function
   */
  public static isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  /**
   * Checks to see if the object is a Date
   */
  public static isDate(obj: any): boolean {
    return obj instanceof Date;
  }

  public static deepAssign(...objs: any[]): Object {
    if (objs.length < 2) {
      throw new Error('Need two or more objects to merge');
    }
    const target: Object = Object.assign({}, objs[0]);
    for (let i: number = 1; i < objs.length; i++) {
      const source: Object = Object.assign({}, objs[i]);
      Object.keys(source).forEach((prop: string) => {
        const value: any = source[prop];
        if (Helpers.isObject(value)) {
          if (target.hasOwnProperty(prop) && Helpers.isObject(target[prop])) {
            target[prop] = Helpers.deepAssign(target[prop], value);
          } else {
            target[prop] = value;
          }
        } else if (Array.isArray(value)) {
          if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {
            const targetArray: any[] = target[prop];
            value.forEach((sourceItem: any, itemIndex: number) => {
              if (itemIndex < targetArray.length) {
                const targetItem: any = targetArray[itemIndex];
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
  public static getNextElementSibling(element: Element): Node {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    } else {
      let e: Node = element.nextSibling;
      while (e && 1 !== e.nodeType) {
        e = e.nextSibling;
      }
      return e;
    }
  }

  public static extractDeepPropertyByMapKey(obj: any, map: string): any {
    const keys: string[] = map.split('.');
    const key: string = keys.shift();

    return keys.reduce((prop: any, k: string) => {
      return !Helpers.isUndefined(prop) && !Helpers.isUndefined(prop[k])
        ? prop[k]
        : undefined;
    }, obj[key || '']);
  }

  public static getKeysTwoObjects(obj: any, other: any): any {
    return [...Object.keys(obj), ...Object.keys(other)]
      .filter((key: string, index: number, array: any[]) => array.indexOf(key) === index);
  }

  public static isDeepEqual(obj: any, other: any): any {
    if (!Helpers.isObject(obj) || !Helpers.isObject(other)) {
      return obj === other;
    }

    return Helpers.getKeysTwoObjects(obj, other).every((key: any): boolean => {
      if (!Helpers.isObject(obj[key]) && !Helpers.isObject(other[key])) {
        return obj[key] === other[key];
      }
      if (!Helpers.isObject(obj[key]) || !Helpers.isObject(other[key])) {
        return false;
      }
      return Helpers.isDeepEqual(obj[key], other[key]);
    });
  }
}

export class Can {
  public obj: Object;

  constructor(obj: Object) {
    this.obj = obj;
  }

  public have(key: string): any {
    let props: any = key.split('.');
    let item: any = this.obj;
    for (let i: number = 0; i < props.length; i++) {
      item = item[props[i]];
      if (this.check(item) === false) {
        return item;
      }
    }
    return item;
  }

  public check(thing: any): boolean {
    return thing !== void 0;
  }
}

export function can(obj: Object): Can {
  return new Can(obj);
}
