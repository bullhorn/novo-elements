import * as i0 from '@angular/core';
import { OnInit, PipeTransform, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import * as i4 from '@angular/common';
import * as i5 from 'novo-elements/elements/common';
import * as i6 from 'novo-elements/elements/icon';

declare class EntityList implements OnInit {
    data: any;
    meta: any;
    baseEntity: string;
    metaDisplay: any;
    ENTITY_SHORT_NAMES: any;
    constructor();
    ngOnInit(): any;
    getClass(entity: any): any;
    openLink(entity: any): void;
    isLinkable(entity: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityList, "novo-entity-list", never, { "data": { "alias": "data"; "required": false; }; "meta": { "alias": "meta"; "required": false; }; }, {}, never, never, false, never>;
}

/**
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
declare class RenderPipe implements PipeTransform {
    private changeDetector;
    private sanitizationService;
    private labels;
    value: any;
    lastValue: any;
    lastArgs: any;
    constructor(changeDetector: ChangeDetectorRef, sanitizationService: DomSanitizer, labels: NovoLabelService);
    equals(objectOne: any, objectTwo: any): any;
    getEntityLabel(item: any, entity: string): string;
    /**
     * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
     * be set up on the entity once the fields are defined.
     * @param args - fields can either be sent as a list of arguments or as an Array
     * @return text
     */
    render(value: any, args: any): any;
    updateValue(value: any, args: any): any;
    transform(value?: any, args?: any): any;
    /**
     * Simple function concat a list of fields from a list of objects
     * @param list - the list of values to use
     * @param fields - list of fields to extract
     */
    concat(list: any, ...fields: any[]): any;
    /**
     * Simple function to look up the **label** to display from options
     * @param value - the value to find
     * @param list - list of options (label/value pairs)
     */
    options(value: any, list: any, args: any): any;
    getNumberDecimalPlaces(value: any): any;
    /**
     * Capitalizes the first letter
     */
    capitalize(value: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RenderPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RenderPipe, "render", false>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RenderPipe>;
}

declare enum NOVO_VALUE_TYPE {
    DEFAULT = 0,
    ENTITY_LIST = 1,
    LINK = 2,
    INTERNAL_LINK = 3
}
declare enum NOVO_VALUE_THEME {
    DEFAULT = 0,
    MOBILE = 1
}
declare class NovoValueElement implements OnInit, OnChanges {
    data: any;
    meta: any;
    theme: NOVO_VALUE_THEME;
    row: Boolean;
    _type: NOVO_VALUE_TYPE;
    NOVO_VALUE_TYPE: typeof NOVO_VALUE_TYPE;
    NOVO_VALUE_THEME: typeof NOVO_VALUE_THEME;
    url: string;
    customClass: string;
    set label(lbl: string);
    get label(): string;
    set type(typ: string);
    get type(): string;
    set icon(value: string);
    get icon(): string;
    ngOnInit(): void;
    get isMobile(): boolean;
    iconClass(icon: any): string;
    get isDefault(): boolean;
    get showLabel(): boolean;
    get showIcon(): boolean;
    onValueClick(icon: any): void;
    openLink(): void;
    ngOnChanges(changes?: SimpleChanges): any;
    isLinkField(field: {
        name?: string;
        type?: NOVO_VALUE_TYPE;
    }, data: any): boolean;
    isEntityList(type: string): boolean;
    isHTMLField(meta: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoValueElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoValueElement, "novo-value", never, { "data": { "alias": "data"; "required": false; }; "meta": { "alias": "meta"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "row": { "alias": "row"; "required": false; }; "label": { "alias": "label"; "required": false; }; "type": { "alias": "type"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoValueModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoValueModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoValueModule, [typeof NovoValueElement, typeof RenderPipe, typeof EntityList], [typeof i4.CommonModule, typeof i5.NovoCommonModule, typeof i6.NovoIconModule], [typeof NovoValueElement, typeof RenderPipe, typeof EntityList]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoValueModule>;
}

export { EntityList, NOVO_VALUE_THEME, NOVO_VALUE_TYPE, NovoValueElement, NovoValueModule, RenderPipe };
