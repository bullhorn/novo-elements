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
     * Checks to see if the object is a function
     */
    static isFunction(obj: any): boolean {
        return typeof obj === 'function';
    }
}
