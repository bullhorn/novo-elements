export class Helpers {
    /**
     * Swallows an event to stop further execution
     * @param event
     */
    static swallowEvent(event) {
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
    static interpolate(str, props) {
        return str.replace(/\$([\w\.]+)/g, (original, key) => {
            let keys = key.split('.');
            let value = props[keys.shift()];
            while (keys.length && value !== undefined) {
                let k = keys.shift();
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
    static validateInterpolationProps(str, props) {
        let keys = str.match(/\$([\w\.]+)/g);
        return keys.every(key => {
            return props.hasOwnProperty(key.substr(1));
        });
    }

    /**
     * Checks to see if the object is a string
     */
    static isString(obj: any) {
        return typeof obj === 'string';
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
        return typeof obj === 'function';
    }

    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj: any) {
        return obj instanceof Date;
    }

    static sortByField(fields: any, reverse = false) {
        return (previous: any, current: any) => {
            //return (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0; // eslint-disable-line
            // Custom compare function on the column
            if (Helpers.isFunction(fields)) {
                return fields((reverse) ? 'desc' : 'asc', previous, current);
            }
            if (!Array.isArray(fields)) {
                fields = [fields];
            }
            for (let i = 0; i < fields.length; i++) {
                let field: string = fields[i];
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
                    return (reverse) ? -1 : 1;
                } else if (first < second) {
                    return (reverse) ? 1 : -1;
                }
            }
            return 0;
        };
    }

    static filterByField(key, value) {
        //TODO: Handle dates, min, max, options, etc...
        return (item) => {
            //return item[field] === options.value;
            let results = [];
            let field = can(item).have(key);
            if (value instanceof Function) {
                results.push(value(field, item));
            } else if (Array.isArray(value)) {
                results.push(value.includes(field));
            } else if (value instanceof Object) {
                if (field instanceof Date) {
                    field = field.getTime(); //Math.round((field.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
                }
                if (value.min) {
                    results.push(field > value.min);
                }
                if (value.max) {
                    results.push(field < value.max);
                }
                if (value.any && Array.isArray(value.any)) {
                    if (Array.isArray(field)) {
                        results.push(value.any.some(v => field.includes(v)));
                    } else {
                        results.push(value.any.includes(field));
                    }
                }
                if (value.all && Array.isArray(value.all)) {
                    results.push(value.all.every(v => field.includes(v)));
                }
                if (value.not) {
                    results.push(!Helpers.filterByField(key, value.not)(item));
                }
                for (let subkey in value) {
                    if (['min', 'max', 'any', 'all', 'not'].indexOf(subkey) < 0) {
                        let subvalue = value[subkey];
                        results.push(Helpers.filterByField(`${key}.${subkey}`, subvalue)(item));
                    }
                }
            } else {
                results.push(JSON.stringify(field).match(new RegExp(value, 'gi')));
            }

            return results.every(x => x);
        };
    }
}
class Can {
    obj: Object;
    constructor(obj: Object) {
        this.obj = obj;
    }

    have(key: string): any {
        let props = key.split('.');
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
/**
 * @param {any} obj
 * @returns
 */
function can(obj) {
    return new Can(obj);
}
