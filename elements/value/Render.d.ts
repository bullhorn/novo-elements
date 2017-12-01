import { ChangeDetectorRef, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../services/novo-label-service';
/**
 * @class RenderPipe
 * @classdesc
 * Renders data appropriately based on the data type found in Meta
 * All data types defined by bullhorn should be supported:
 *
 * - **String**: trims value and returns
 * - **Integer**: return value
 * - **Double**: return value fixed to 2 decimals
 * - **BigDecimal**: return value fixed to 2 decimals
 * - **Address**: only city and/or state returned
 * - **Address1**: only city and/or state returned
 * - **AddressWithoutCountry**: only city and/or state returned
 * - **Currency**: put a $ in front
 * - **Percentage**: divide by 100 fix to 2 decimals place and return
 * - **Options**: returns the appropriate 'label' for the 'value' from 'options'
 * - **Array**: returns list comma separated
 * - **DateTime**: formats the date
 * - **TimeStamp**: formats the date
 * - **ToOne**: return the entity specific name (ie. name, firstName lastName, title, ...)
 * - **ToMany**: return an array of the entity specific names (ie. name, firstName lastName, title, ...)
 *
 * @example
 * ```
 * {{ expression | render:field }}
 * ```
 */
export declare class RenderPipe implements PipeTransform {
    private changeDetector;
    private sanitizationService;
    private labels;
    value: any;
    lastValue: any;
    lastArgs: any;
    constructor(changeDetector: ChangeDetectorRef, sanitizationService: DomSanitizer, labels: NovoLabelService);
    equals(objectOne: any, objectTwo: any): any;
    /**
     * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
     * be set up on the entity once the fields are defined.
     * @name fields
     * @memberOf Entity#
     * @param value
     * @param {args} args - fields can either be sent as a list of arguments or as an Array
     * @return text
     */
    render(value: any, args: any): any;
    updateValue(value: any, args: any): any;
    transform(value?: any, args?: any): any;
    /**
     * Simple function concat a list of fields from a list of objects
     * @name options
     * @param {Array} list - the list of values to use
     * @param {Array} fields - list of fields to extract
     * @return {String}
     */
    concat(list: any, ...fields: any[]): any;
    /**
     * Simple function to look up the **label** to display from options
     * @name options
     * @param {Object} value - the value to find
     * @param {Array} list - list of options (label/value pairs)
     * @return {String}
     */
    options(value: any, list: any): any;
    getNumberDecimalPlaces(value: any): any;
    /**
     * Capitalizes the first letter
     * @param string
     * @returns {string}
     */
    capitalize(value: any): string;
}
