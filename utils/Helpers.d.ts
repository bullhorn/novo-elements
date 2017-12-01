export declare class Helpers {
    /**
     * Swallows an event to stop further execution
     * @param event
     */
    static swallowEvent(event: any): void;
    /**
     * Interpolates a string with vars passed to it
     * @param  {String} str   The string to interpolate
     * @param  {Object} props The params to replace in string.
     * @return {String}
     */
    static interpolate(str: any, props: any): any;
    /**
     * Verifies that an object has every property expected by a string to interpolate
     * @param  {String} str   The string to interpolate
     * @param  {Object} props The params to replace in string.
     * @return {Boolean}
     */
    static validateInterpolationProps(str: any, props: any): any;
    static isObject(item: any): boolean;
    /**
     * Checks to see if the object is a string
     */
    static isString(obj: any): boolean;
    /**
     * Checks to see if the object is a undefined or null
     */
    static isBlank(obj: any): boolean;
    /**
     * Checks to see if the object is a undefined or null
     */
    static isEmpty(obj: any): boolean;
    /**
     * Checks to see if the object is a function
     */
    static isFunction(obj: any): boolean;
    /**
     * Checks to see if the object is a Date
     */
    static isDate(obj: any): boolean;
    static sortByField(fields: any, reverse?: boolean): (previous: any, current: any) => any;
    static filterByField(key: any, value: any): (item: any) => boolean;
    static calcPositionOffset(position: ClientRect, element: Element, side: string): {
        top: string;
        left: string;
        width: string;
    };
    static findAncestor(element: Element, selector: string): Element;
    static deepClone(item: any): any;
    static deepAssign(...objs: any[]): any;
    /**
     * Workaround for Edge browser since Element:nextElementSibling is undefined inside of template directives
     * @param element any document element
     * @returns the next sibling node that is of type: Element
     */
    static getNextElementSibling(element: Element): Node;
}
export declare class Can {
    obj: Object;
    constructor(obj: Object);
    have(key: string): any;
    check(thing: any): boolean;
}
/**
 * @param {any} obj
 * @returns
 */
export declare function can(obj: any): Can;
