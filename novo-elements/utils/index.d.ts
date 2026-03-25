import { HttpClient } from '@angular/common/http';
import { Day as Day$1 } from 'date-fns';
import * as i0 from '@angular/core';
import { OnDestroy, ElementRef, EventEmitter } from '@angular/core';

declare enum AppBridgeHandler {
    HTTP = 0,
    OPEN = 1,
    OPEN_LIST = 2,
    CLOSE = 3,
    REFRESH = 4,
    PIN = 5,
    REGISTER = 6,
    UPDATE = 7,
    REQUEST_DATA = 8,
    CALLBACK = 9,
    PING = 10
}
type NovoApps = 'record' | 'add' | 'fast-add' | 'slide-out-add' | 'custom' | 'preview';
type AlleyLinkColors = 'purple' | 'green' | 'blue' | 'lead' | 'candidate' | 'contact' | 'company' | 'opportunity' | 'job' | 'billable-charge' | 'earn-code' | 'invoice-statement' | 'job-code' | 'payable-charge' | 'sales-tax-rate' | 'tax-rules' | 'submission' | 'placement' | 'navigation' | 'canvas' | 'neutral' | 'neutral-italic' | 'initial' | 'distributionList' | 'contract';
interface IAppBridgeOpenEvent {
    type: NovoApps;
    entityType: string;
    entityId?: string;
    tab?: string;
    data?: any;
    passthrough?: string;
}
type MosaicLists = 'Candidate' | 'ClientContact' | 'ClientCorporation' | 'JobOrder' | 'JobSubmission' | 'JobPosting' | 'Placement' | 'Lead' | 'Opportunity';
interface IAppBridgeOpenListEvent {
    type: MosaicLists;
    keywords: Array<string>;
    criteria: any;
}
type NovoDataType = 'entitlements' | 'settings' | 'user';
interface IAppBridgeRequestDataEvent {
    type: NovoDataType;
}
type HttpVerb = 'get' | 'post' | 'put' | 'delete';
declare const HTTP_VERBS: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
};
type MessageType$1 = 'register' | 'open' | 'openList' | 'close' | 'refresh' | 'pin' | 'ping' | 'update' | 'httpGET' | 'httpPOST' | 'httpPUT' | 'httpDELETE' | 'customEvent' | 'requestData' | 'callback';
declare const MESSAGE_TYPES: {
    REGISTER: string;
    OPEN: string;
    OPEN_LIST: string;
    CLOSE: string;
    REFRESH: string;
    PIN: string;
    PING: string;
    UPDATE: string;
    HTTP_GET: string;
    HTTP_POST: string;
    HTTP_PUT: string;
    HTTP_DELETE: string;
    CUSTOM_EVENT: string;
    REQUEST_DATA: string;
    CALLBACK: string;
};

type ValueOf<T> = T[keyof T];
type MessageType = ValueOf<typeof MESSAGE_TYPES>;
interface PostRobotEvent<T> {
    data: T;
    origin: string;
    source: Window;
}
declare class AppBridgeService {
    create(name: string): AppBridge;
}
declare class DevAppBridgeService {
    private http;
    constructor(http: HttpClient);
    create(name: string, postRobotRef?: any): DevAppBridge;
}
declare class AppBridge {
    id: string;
    traceName: string;
    windowName: string;
    private _registeredFrames;
    private _handlers;
    private _tracing;
    private _eventListeners;
    private postRobot;
    constructor(traceName?: string, postRobotRef?: any);
    set tracing(tracing: boolean);
    handle(type: AppBridgeHandler, handler: Function): void;
    private _trace;
    protected _setupHandlers(): void;
    protected windowOrigin(): string;
    handleMessage<T>({ msgType, handler, packet, echoPacket, resolveEventData }: {
        msgType: MessageType;
        handler: AppBridgeHandler;
        packet: T;
        echoPacket: any;
        resolveEventData: (any: any) => boolean;
    }): Promise<boolean>;
    /**
     * Fires or responds to an open event
     * @param packet any - packet of data to send with the open event
     */
    open(packet: IAppBridgeOpenEvent): Promise<boolean>;
    /**
     * Fires or responds to an openList event
     * @param packet any - packet of data to send with the open event
     */
    openList(packet: Partial<IAppBridgeOpenListEvent>): Promise<boolean>;
    /**
     * Fires or responds to an close event
     * @param packet any - packet of data to send with the close event
     */
    update(packet: Partial<{
        entityType: string;
        entityId: string;
        title: string;
        titleKey: string;
        color: AlleyLinkColors;
    }>): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    close(packet?: object): Promise<boolean>;
    /**
     * Fires or responds to an close event
     */
    refresh(packet?: object): Promise<boolean>;
    ping(): Promise<boolean>;
    /**
     * Fires or responds to a pin event
     */
    pin(packet?: object): Promise<boolean>;
    /**
     * Fires or responds to a requestData event
     * @param packet any - packet of data to send with the requestData event
     */
    requestData(packet: {
        type: string;
    }): Promise<any>;
    /**
     * Fires a generic callback command
     * @param packet string - key: string, generic: boolean
     */
    callback(packet: {
        key: string;
        generic: boolean;
        options: object;
    }): Promise<any>;
    /**
     * Fires or responds to an register event
     * @param packet any - packet of data to send with the event
     */
    register(packet?: Partial<{
        title: string;
        url: string;
        color: AlleyLinkColors;
    }>): Promise<string>;
    /**
     * Fires or responds to an HTTP_GET event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpGET(relativeURL: string, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param postData any - packet of data to send with the event
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpPOST(relativeURL: string, postData: any, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param packet any - packet of data to send with the event
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpPUT(relativeURL: string, putData: any, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     * @param relativeURL string - URL to fetch, relative to the mainframe URL
     * @param timeout - how long to attempt the request before reporting an error
     * @param originStack - the domain of the previous frame(s) the request originated from
     */
    httpDELETE(relativeURL: string, timeout?: number, originStack?: string[]): Promise<any>;
    /**
     * Fires a custom event to anywhere in the application
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEvent(event: string, data: any): Promise<any>;
    /**
     * Fires a custom event to all registered frames
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChildren(event: string, data: any): void;
    /**
     * Fires a custom event to specified frames
     * @param source Window - specific iframe contentWindow
     * @param event string - event name to fire
     * @param data any - data to be sent along with the event
     */
    fireEventToChild(source: Window | HTMLIFrameElement, event: string, data: any): void;
    /**
     * Adds an event listener to a custom event
     * @param event string - event name to listen to
     * @param callback function - callback to be fired when an event is caught
     */
    addEventListener(event: string, callback: Function): void;
}
declare class DevAppBridge extends AppBridge {
    private http;
    private baseURL;
    constructor(traceName: string, http: HttpClient, postRobotRef?: any);
    protected _setupHandlers(): void;
    /**
     * Fires or responds to an HTTP_GET event
     */
    httpGET(relativeURL: string): Promise<any>;
    /**
     * Fires or responds to an HTTP_POST event
     */
    httpPOST(relativeURL: string, postData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_PUT event
     */
    httpPUT(relativeURL: string, putData: any): Promise<any>;
    /**
     * Fires or responds to an HTTP_DELETE event
     */
    httpDELETE(relativeURL: string): Promise<any>;
    private getCookie;
}

declare class BaseRenderer {
    _data: any;
    _value: any;
    meta: any;
    get data(): any;
    set data(d: any);
    get value(): any;
    set value(v: any);
}

declare enum CalendarEventResponse {
    Maybe = 0,
    Accepted = 1,
    Rejected = 2
}
interface CalendarEventTimesChangedEvent {
    event: CalendarEvent;
    newStart: Date;
    newEnd?: Date;
}
interface WeekDay {
    date: Date;
    isPast: boolean;
    isToday: boolean;
    isFuture: boolean;
    isWeekend: boolean;
}
interface EventColor {
    primary: string;
    secondary: string;
}
interface EventAction {
    label: string;
    cssClass?: string;
    onClick({ event }: {
        event: CalendarEvent;
    }): any;
}
interface CalendarEvent {
    id?: number;
    start: Date;
    end?: Date;
    title: string;
    description?: string;
    color: EventColor;
    type?: string;
    response?: CalendarEventResponse;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
}
interface WeekViewEvent {
    event: CalendarEvent;
    offset: number;
    span: number;
    startsBeforeWeek: boolean;
    endsAfterWeek: boolean;
    top?: number;
    height?: number;
}
interface WeekViewEventRow {
    row: WeekViewEvent[];
}
interface MonthViewDay extends WeekDay {
    inMonth: boolean;
    events: CalendarEvent[];
    backgroundColor?: string;
    cssClass?: string;
    badgeTotal: number;
}
interface MonthView {
    rowOffsets: number[];
    days: MonthViewDay[];
    totalDaysVisibleInWeek: number;
}
interface DayViewEvent {
    event: CalendarEvent;
    height: number;
    width: number;
    top: number;
    left: number;
    startsBeforeDay: boolean;
    endsAfterDay: boolean;
}
interface DayView {
    events: DayViewEvent[];
    width: number;
    allDayEvents: CalendarEvent[];
}
interface DayViewHourSegment {
    isStart: boolean;
    date: Date;
    cssClass?: string;
}
interface DayViewHour {
    segments: DayViewHourSegment[];
}
interface IsEventInPeriodArgs {
    event: CalendarEvent;
    periodStart: Date;
    periodEnd: Date;
}
interface GetEventsInPeriodArgs {
    events: CalendarEvent[];
    periodStart: Date;
    periodEnd: Date;
}
interface GetDayViewArgs {
    events?: CalendarEvent[];
    viewDate: Date;
    hourSegments: number;
    dayStart: {
        hour: number;
        minute: number;
    };
    dayEnd: {
        hour: number;
        minute: number;
    };
    eventWidth: number;
    segmentHeight: number;
}
declare function getWeekViewEventOffset({ event, startOfWeek, excluded, }: {
    event: CalendarEvent;
    startOfWeek: Date;
    excluded?: number[];
}): number;
declare function getWeekViewHeader({ viewDate, weekStartsOn, excluded, }: {
    viewDate: Date;
    weekStartsOn: Day$1;
    excluded?: number[];
}): WeekDay[];
declare function getWeekView({ events, viewDate, weekStartsOn, excluded, hourSegments, segmentHeight, dayStart, dayEnd, }: {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: Day$1;
    excluded?: number[];
    hourSegments: number;
    segmentHeight: number;
    dayStart: any;
    dayEnd: any;
}): WeekViewEventRow[];
declare function getMonthView({ events, viewDate, weekStartsOn, excluded, }: {
    events?: CalendarEvent[];
    viewDate: Date;
    weekStartsOn: Day$1;
    excluded?: number[];
}): MonthView;
declare function getDayView({ events, viewDate, hourSegments, dayStart, dayEnd, eventWidth, segmentHeight }: GetDayViewArgs): DayView;
declare function getDayViewHourGrid({ viewDate, hourSegments, dayStart, dayEnd, }: {
    viewDate: Date;
    hourSegments: number;
    dayStart: any;
    dayEnd: any;
}): DayViewHour[];

interface RGB {
    r: number;
    g: number;
    b: number;
}
interface RGBA extends RGB {
    a: number;
}
interface HSL {
    h: number;
    s: number;
    l: number;
}
interface HSLA extends HSL {
    a: number;
}
interface HSV {
    h: number;
    s: number;
    v: number;
}
interface HSVA extends HSV {
    a: number;
}
declare class Color {
    source: string;
    isValid: boolean;
    constructor(value: HSLA | HSVA | RGBA | string);
    get hex(): string;
    get rgb(): RGB;
    get hsl(): HSL;
    get hsv(): HSV;
    static isValidHex(h: string): boolean;
    static isRGB(obj: any): boolean;
    static isRGBA(obj: any): boolean;
    static isHSL(obj: any): boolean;
    static isHSLA(obj: any): boolean;
    static isHSV(obj: any): boolean;
    static isHSVA(obj: any): boolean;
}

/**
 * AUTOGENERATED FILE - DO NOT EDIT
 * Generated by: https://bhsource.bullhorn.com/DEV_WORKSPACE/country-state-parser
 * Last generated on: Fri Apr 12 2024 10:17:16 GMT-0400 (Eastern Daylight Time)
 */
declare const COUNTRIES: Country[];
/**
 * Gets all countries
 */
declare function getCountries(): string[];
/**
 * Gets a country by country ID
 */
declare function findByCountryId(id: number): Country | undefined;
/**
 * Gets a country by country name
 * @param name - Name of country to find
 */
declare function findByCountryName(name: string): Country | undefined;
/**
 * Gets a country by country code
 * @param code - Code of country to find
 */
declare function findByCountryCode(code: string): Country | undefined;
/**
 * Gets states by country name
 * @param name - Name of the country to search by
 */
declare function getStateObjects(name: string): State[];
/**
 * Gets state names by country name
 * @param name - Name of the country to search by
 */
declare function getStates(name: string): string[];
/**
 * Interfaces for State and Country objects
 */
interface State {
    code: string;
    name: string;
}
interface Country {
    code: string;
    id: number;
    name: string;
    states: State[];
}

/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
type LegacyParseOptions = {
    additionalDigits?: 0 | 1 | 2;
};
declare function legacyParse(argument: any, options?: LegacyParseOptions): Date;
type DateStrings = {
    date: string | undefined;
    time: string | undefined;
    timezone: string | undefined;
};
declare function splitDateString(dateString: string): DateStrings;

type DateLike$1 = Date | string | number;
interface DateParseOptions extends LegacyParseOptions {
    userDateFormat?: string;
}
/**
 * This DateUtil is a wrapper for calling new date-fns v2 functions with existing legacy
 * v1 function calls without having to refactor too much code and potentially introduce
 * breaking changes.
 *
 * The old calls generally called date-fns functions with loosely-typed date values, often
 * of type DateLike (Date | string | number). This was a problem when upgrading to date-fns
 * v2 since functions are now typed more strongly and no longer accept strings.
 *
 * If you are adding a new component/feature and looking here to add a new date-fns wrapper
 * function, strongly consider not doing that and instead refactoring your code to not use
 * DateLike, and calling the date-fns function(s) directly.
 **/
declare class DateUtil {
    static getDateFromAnyType(date: DateLike$1): Date | number;
    static getWeekDayFromNumber(weekDay: number | Day$1): Day$1;
    static parse(date: any, options?: DateParseOptions): Date;
    static format(date: any, formatString: string): string;
    static addDays(date: any, days: number): Date;
    static addWeeks(date: any, weeks: number): Date;
    static addMonths(date: any, months: number): Date;
    static startOfMinute(date: DateLike$1): Date;
    static startOfDay(date: DateLike$1): Date;
    static startOfWeek(date: DateLike$1, options?: any): Date;
    static startOfMonth(date: DateLike$1): Date;
    static endOfDay(date: DateLike$1): Date;
    static endOfWeek(date: DateLike$1, options?: any): Date;
    static endOfMonth(date: DateLike$1): Date;
    static isSameDay(dateLeft: DateLike$1, dateRight: DateLike$1): boolean;
    static isSameMonth(dateLeft: DateLike$1, dateRight: DateLike$1): boolean;
    static isSameSecond(dateLeft: DateLike$1, dateRight: DateLike$1): boolean;
    static differenceInSeconds(date: DateLike$1, start: DateLike$1): number;
    static differenceInCalendarDays(date: DateLike$1, start: DateLike$1): number;
    static differenceInDays(date: DateLike$1, start: DateLike$1): number;
    static isWithinRange(date: DateLike$1 | null, start: DateLike$1, end: DateLike$1): boolean;
    static getMonth(date: DateLike$1): number;
    static getYear(date: DateLike$1): number;
    static setMinutes(date: DateLike$1, minutes: number): Date;
    static setHours(date: DateLike$1, hours: number): Date;
    static isBefore(date: DateLike$1, minDate: Date | number): boolean;
    static isAfter(date: DateLike$1, maxDate: Date | number): boolean;
    static rewireDatePositionsToMDY(dateStr: string, userDateFormat: string): string;
}

type DateLike = Date | string | number;
declare class DateRange<D = DateLike> {
    /** The start date of the range. */
    readonly start: D | null;
    /** The end date of the range. */
    readonly end: D | null;
    private _disableStructuralEquivalency;
    constructor(
    /** The start date of the range. */
    start: D | null, 
    /** The end date of the range. */
    end: D | null);
}
interface RangeModel {
    startDate: Date;
    endDate: Date;
}
interface DataTableRangeModel {
    min: Date;
    max: Date;
}
type modelTypes = Date | Date[] | RangeModel | DataTableRangeModel;
interface Day {
    date: Date;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    name?: string;
    number?: string | number;
}
interface NovoDateSelectEvent {
    event: Event;
    day: Day;
}
interface NovoMonthSelectEvent {
    event: Event;
    month: number;
}
interface NovoYearSelectEvent {
    event: Event;
    year: number;
}
type DatePickerValueFormats = 'date' | 'iso8601';
type DatePickerSelectModes = 'single' | 'multiple' | 'range' | 'week';
type rangeSelectModes = 'startDate' | 'endDate';
/** Object that can be provided in order to customize the date range selection behavior. */
interface NovoDateSelectionStrategy<D = DateLike> {
    /**
     * Called when the user has finished selecting a value.
     * @param date Date that was selected. Will be null if the user cleared the selection.
     * @param currentValue Value that is currently shown in the calendar.
     * @param event DOM event that triggered the selection. Currently only corresponds to a `click`
     *    event, but it may get expanded in the future.
     */
    selectionFinished(date: DateLike | null, currentValue: D, event: Event): D;
    /**
     * Called when the user has activated a new date (e.g. by hovering over
     * it or moving focus) and the calendar tries to display a date range.
     *
     * @param activeDate Date that the user has activated. Will be null if the user moved
     *    focus to an element that's no a calendar cell.
     * @param currentValue Value that is currently shown in the calendar.
     * @param event DOM event that caused the preview to be changed. Will be either a
     *    `mouseenter`/`mouseleave` or `focus`/`blur` depending on how the user is navigating.
     */
    createPreview(activeDate: DateLike | null, currentValue: D, event: Event): D;
    isSelected(activeDate: DateLike | null, currentValue: D): boolean;
}
interface OverlayDate {
    date: Date;
    type: string;
}

/**
 * Copyright © 2022 Sasha Koss
 * https://www.npmjs.com/package/@date-fns/upgrade
 **/
declare function convertTokens(format: string): string;

/**
 * Copyright © 2018-2022 Ferdinand Prantl
 * https://www.npmjs.com/package/timezone-support
 **/
declare function formatZonedTime(time: any, format: any): any;

declare function BooleanInput(): any;

/**
 * A Promise that uses the deferred anti-pattern
 */
interface DeferredPromise<T = any> extends Promise<T> {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}
declare function Deferred(): DeferredPromise;

declare class Helpers {
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
declare class Can {
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
declare function can(obj: any): Can;
/**
 * Performs a binary search on a sorted array
 * Note: Assumes the array is already sorted according to the compare function
 * @param item - The item to search for
 * @param array - The sorted array to search in
 * @param compare - Comparator function that returns -1 (item < array[i]), 0 (equal), or 1 (item > array[i])
 * @returns The matching item if found, undefined otherwise
 * @throws Error if the item is not comparable to an array element
 */
declare function binarySearch<T>(item: T, array: T[], compare: (a: T, b: T) => 1 | -1 | 0 | undefined): T | undefined;

/**
 * A const enum that includes all non-printable string values one can expect from $event.key.
 * For example, this enum includes values like "CapsLock", "Backspace", and "AudioVolumeMute",
 * but does not include values like "a", "A", "#", "é", or "¿".
 * Auto generated from MDN: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Speech_recognition_keys
 */
declare const enum Key {
    /**
     * The user agent wasn't able to map the event's virtual keycode to a specific key value.
     * This can happen due to hardware or software constraints, or because of constraints around the platform on which the user agent is running.
     */
    Unidentified = "Unidentified",
    /** The Alt (Alternative) key. */
    Alt = "Alt",
    /** The AltGr or AltGraph (Alternate Graphics) key. Enables the ISO Level 3 shift modifier (where Shift is the level 2 modifier). */
    AltGraph = "AltGraph",
    /** The Caps Lock key. Toggles the capital character lock on and off for subsequent input. */
    CapsLock = "CapsLock",
    /** The Control, Ctrl, or Ctl key. Allows typing control characters. */
    Control = "Control",
    /** The Fn (Function modifier) key. Used to allow generating function key (F1–F15, for instance) characters on keyboards without a dedicated function key area. Often handled in hardware so that events aren't generated for this key. */
    Fn = "Fn",
    /** The FnLock or F-Lock (Function Lock) key.Toggles the function key mode described by "Fn" on and off. Often handled in hardware so that events aren't generated for this key. */
    FnLock = "FnLock",
    /** The Hyper key. */
    Hyper = "Hyper",
    /** The Meta key. Allows issuing special command inputs. This is the Windows logo key, or the Command or ⌘ key on Mac keyboards. */
    Meta = "Meta",
    /** The NumLock (Number Lock) key. Toggles the numeric keypad between number entry some other mode (often directional arrows). */
    NumLock = "NumLock",
    /** The Scroll Lock key. Toggles between scrolling and cursor movement modes. */
    ScrollLock = "ScrollLock",
    /** The Shift key. Modifies keystrokes to allow typing upper (or other) case letters, and to support typing punctuation and other special characters. */
    Shift = "Shift",
    /** The Super key. */
    Super = "Super",
    /** The Symbol modifier key (found on certain virtual keyboards). */
    Symbol = "Symbol",
    /** The Symbol Lock key. */
    SymbolLock = "SymbolLock",
    /** The Enter or ↵ key (sometimes labeled Return). */
    Enter = "Enter",
    /** The Horizontal Tab key, Tab. */
    Tab = "Tab",
    /** The down arrow key. */
    ArrowDown = "ArrowDown",
    /** The left arrow key. */
    ArrowLeft = "ArrowLeft",
    /** The right arrow key. */
    ArrowRight = "ArrowRight",
    /** The up arrow key. */
    ArrowUp = "ArrowUp",
    /** The End key. Moves to the end of content. */
    End = "End",
    /** The Home key. Moves to the start of content. */
    Home = "Home",
    /** The Page Down (or PgDn) key. Scrolls down or displays the next page of content. */
    PageDown = "PageDown",
    /** The Page Up (or PgUp) key. Scrolls up or displays the previous page of content. */
    PageUp = "PageUp",
    /** The Backspace key. This key is labeled Delete on Mac keyboards. */
    Backspace = "Backspace",
    /** The Clear key. Removes the currently selected input. */
    Clear = "Clear",
    /** The Copy key (on certain extended keyboards). */
    Copy = "Copy",
    /** The Cursor Select key, CrSel. */
    CrSel = "CrSel",
    /** The Cut key (on certain extended keyboards). */
    Cut = "Cut",
    /** The Delete key, Del. */
    Delete = "Delete",
    /** Erase to End of Field. Deletes all characters from the current cursor position to the end of the current field. */
    EraseEof = "EraseEof",
    /** The ExSel (Extend Selection) key. */
    ExSel = "ExSel",
    /** The Insert key, Ins. Toggles between inserting and overwriting text. */
    Insert = "Insert",
    /** Paste from the clipboard. */
    Paste = "Paste",
    /** Redo the last action. */
    Redo = "Redo",
    /** Undo the last action. */
    Undo = "Undo",
    /** The Accept, Commit, or OK key or button. Accepts the currently selected option or input method sequence conversion. */
    Accept = "Accept",
    /** The Again key. Redoes or repeats a previous action. */
    Again = "Again",
    /** The Attn (Attention) key. */
    Attn = "Attn",
    /** The Cancel key. */
    Cancel = "Cancel",
    /** Shows the context menu. Typically found between the Windows (or OS) key and the Control key on the right side of the keyboard. */
    ContextMenu = "ContextMenu",
    /** The Esc (Escape) key. Typically used as an exit, cancel, or "escape this operation" button. Historically, the Escape character was used to signal the start of a special control sequence of characters called an "escape sequence." */
    Escape = "Escape",
    /** The Execute key. */
    Execute = "Execute",
    /** The Find key. Opens an interface (typically a dialog box) for performing a find/search operation. */
    Find = "Find",
    /** The Finish key. */
    Finish = "Finish",
    /** The Help key. Opens or toggles the display of help information. */
    Help = "Help",
    /**
     * The Pause key. Pauses the current application or state, if applicable.
     * Note: This shouldn't be confused with the "MediaPause" key value, which is used for media controllers, rather than to control applications and processes.
     */
    Pause = "Pause",
    /**
     * The Play key. Resumes a previously paused application, if applicable.
     * Note: This shouldn't be confused with the "MediaPlay" key value, which is used for media controllers, rather than to control applications and processes.
     */
    Play = "Play",
    /** The Props (Properties) key. */
    Props = "Props",
    /** The Select key. */
    Select = "Select",
    /** The ZoomIn key. */
    ZoomIn = "ZoomIn",
    /** The ZoomOut key. */
    ZoomOut = "ZoomOut",
    /** The Brightness Down key. Typically used to reduce the brightness of the display. */
    BrightnessDown = "BrightnessDown",
    /** The Brightness Up key. Typically increases the brightness of the display. */
    BrightnessUp = "BrightnessUp",
    /** The Eject key. Ejects removable media (or toggles an optical storage device tray open and closed). */
    Eject = "Eject",
    /** The LogOff key. */
    LogOff = "LogOff",
    /**
     * The Power button or key, to toggle power on and off.
     * Note: Not all systems pass this key through to the user agent.
     */
    Power = "Power",
    /** The PowerOff or PowerDown key. Shuts off the system. */
    PowerOff = "PowerOff",
    /** The PrintScreen or PrtScr key. Sometimes SnapShot. Captures the screen and prints it or saves it to disk. */
    PrintScreen = "PrintScreen",
    /** The Hibernate key. This saves the state of the computer to disk and then shuts down; the computer can be returned to its previous state by restoring the saved state information. */
    Hibernate = "Hibernate",
    /** The Standby key. (Also known as Suspend or Sleep.) This turns off the display and puts the computer in a low power consumption mode, without completely powering off. */
    Standby = "Standby",
    /** The WakeUp key. Used to wake the computer from the hibernation or standby modes. */
    WakeUp = "WakeUp",
    /** The All Candidates key, which starts multi-candidate mode, in which multiple candidates are displayed for the ongoing input. */
    AllCandidates = "AllCandidates",
    /** The Alphanumeric key. */
    Alphanumeric = "Alphanumeric",
    /** The Code Input key, which enables code input mode, which lets the user enter characters by typing their code points (their Unicode character numbers, typically). */
    CodeInput = "CodeInput",
    /** The Compose key. */
    Compose = "Compose",
    /** The Convert key, which instructs the IME to convert the current input method sequence into the resulting character. */
    Convert = "Convert",
    /**
     * A dead "combining" key; that is, a key which is used in tandem with other keys to generate accented and other modified characters. If pressed by itself, it doesn't generate a character.
     * If you wish to identify which specific dead key was pressed (in cases where more than one exists), you can do so by examining the KeyboardEvent's associated compositionupdate event's  data property.
     */
    Dead = "Dead",
    /** The Final (Final Mode) key is used on some Asian keyboards to enter final mode when using IMEs. */
    FinalMode = "FinalMode",
    /** Switches to the first character group on an ISO/IEC 9995 keyboard. Each key may have multiple groups of characters, each in its own column. Pressing this key instructs the device to interpret keypresses as coming from the first column on subsequent keystrokes. */
    GroupFirst = "GroupFirst",
    /** Switches to the last character group on an ISO/IEC 9995 keyboard. */
    GroupLast = "GroupLast",
    /** Switches to the next character group on an ISO/IEC 9995 keyboard. */
    GroupNext = "GroupNext",
    /** Switches to the previous character group on an ISO/IEC 9995 keyboard. */
    GroupPrevious = "GroupPrevious",
    /** The Mode Change key. Toggles or cycles among input modes of IMEs. */
    ModeChange = "ModeChange",
    /** The Next Candidate function key. Selects the next possible match for the ongoing input. */
    NextCandidate = "NextCandidate",
    /** The NonConvert ("Don't convert") key. This accepts the current input method sequence without running conversion when using an IME. */
    NonConvert = "NonConvert",
    /** The Previous Candidate key. Selects the previous possible match for the ongoing input. */
    PreviousCandidate = "PreviousCandidate",
    /** The Process key. Instructs the IME to process the conversion. */
    Process = "Process",
    /** The Single Candidate key. Enables single candidate mode (as opposed to multi-candidate mode); in this mode, only one candidate is displayed at a time. */
    SingleCandidate = "SingleCandidate",
    /** The Hangul (Korean character set) mode key, which toggles between Hangul and English entry modes. */
    HangulMode = "HangulMode",
    /** Selects the Hanja mode, for converting Hangul characters to the more specific Hanja characters. */
    HanjaMode = "HanjaMode",
    /** Selects the Junja mode, in which Korean is represented using single-byte Latin characters. */
    JunjaMode = "JunjaMode",
    /** The Eisu key. This key's purpose is defined by the IME, but may be used to close the IME. */
    Eisu = "Eisu",
    /** The Hankaku (half-width characters) key. */
    Hankaku = "Hankaku",
    /** The Hiragana key; selects Kana characters mode. */
    Hiragana = "Hiragana",
    /** Toggles between the Hiragana and Katakana writing systems. */
    HiraganaKatakana = "HiraganaKatakana",
    /** The Kana Mode (Kana Lock) key. */
    KanaMode = "KanaMode",
    /** The Kanji Mode key. Enables entering Japanese text using the ideographic characters of Chinese origin. */
    KanjiMode = "KanjiMode",
    /** The Katakana key. */
    Katakana = "Katakana",
    /** The Romaji key; selects the Roman character set. */
    Romaji = "Romaji",
    /** The Zenkaku (full width) characters key. */
    Zenkaku = "Zenkaku",
    /** The Zenkaku/Hankaku (full width/half width) toggle key. */
    ZenkakuHanaku = "ZenkakuHanaku",
    /** The first general-purpose function key, F1. */
    F1 = "F1",
    /** The F2 key. */
    F2 = "F2",
    /** The F3 key. */
    F3 = "F3",
    /** The F4 key. */
    F4 = "F4",
    /** The F5 key. */
    F5 = "F5",
    /** The F6 key. */
    F6 = "F6",
    /** The F7 key. */
    F7 = "F7",
    /** The F8 key. */
    F8 = "F8",
    /** The F9 key. */
    F9 = "F9",
    /** The F10 key. */
    F10 = "F10",
    /** The F11 key. */
    F11 = "F11",
    /** The F12 key. */
    F12 = "F12",
    /** The F13 key. */
    F13 = "F13",
    /** The F14 key. */
    F14 = "F14",
    /** The F15 key. */
    F15 = "F15",
    /** The F16 key. */
    F16 = "F16",
    /** The F17 key. */
    F17 = "F17",
    /** The F18 key. */
    F18 = "F18",
    /** The F19 key. */
    F19 = "F19",
    /** The F20 key. */
    F20 = "F20",
    /** The first general-purpose virtual function key. */
    Soft1 = "Soft1",
    /** The second general-purpose virtual function key. */
    Soft2 = "Soft2",
    /** The third general-purpose virtual function key. */
    Soft3 = "Soft3",
    /** The fourth general-purpose virtual function key. */
    Soft4 = "Soft4",
    /** Presents a list of recently-used applications which lets the user change apps quickly. */
    AppSwitch = "AppSwitch",
    /** The Call key. Dials the number which has been entered. */
    Call = "Call",
    /** The Camera key. Activates the camera. */
    Camera = "Camera",
    /** The Focus key. Focuses the camera. */
    CameraFocus = "CameraFocus",
    /** The End Call or Hang Up button. */
    EndCall = "EndCall",
    /** The Back button. */
    GoBack = "GoBack",
    /** The Home button. Returns the user to the phone's main screen (usually an application launcher). */
    GoHome = "GoHome",
    /** The Headset Hook key. This is typically actually a button on the headset which is used to hang up calls and play or pause media. */
    HeadsetHook = "HeadsetHook",
    /** The Redial button. Redials the last-called number. */
    LastNumberRedial = "LastNumberRedial",
    /** The Notification key. */
    Notification = "Notification",
    /** A button which cycles among the notification modes: silent, vibrate, ring, and so forth. */
    MannerMode = "MannerMode",
    /** The Voice Dial key. Initiates voice dialing. */
    VoiceDial = "VoiceDial",
    /** Switches to the previous channel. */
    ChannelDown = "ChannelDown",
    /** Switches to the next channel. */
    ChannelUp = "ChannelUp",
    /** Starts, continues, or increases the speed of fast forwarding the media. */
    MediaFastForward = "MediaFastForward",
    /**
     * Pauses the currently playing media.
     * Note: Some older applications use "Pause", but this is not correct.
     */
    MediaPause = "MediaPause",
    /** Starts or continues playing media at normal speed, if not already doing so. Has no effect otherwise. */
    MediaPlay = "MediaPlay",
    /** Toggles between playing and pausing the current media. */
    MediaPlayPause = "MediaPlayPause",
    /** Starts or resumes recording media. */
    MediaRecord = "MediaRecord",
    /** Starts, continues, or increases the speed of rewinding the media. */
    MediaRewind = "MediaRewind",
    /** Stops the current media activity (such as playing, recording, pausing, forwarding, or rewinding). Has no effect if the media is currently stopped already. */
    MediaStop = "MediaStop",
    /** Seeks to the next media or program track. */
    MediaTrackNext = "MediaTrackNext",
    /** Seeks to the previous media or program track. */
    MediaTrackPrevious = "MediaTrackPrevious",
    /** Adjusts audio balance toward the left. */
    AudioBalanceLeft = "AudioBalanceLeft",
    /** Adjusts audio balance toward the right. */
    AudioBalanceRight = "AudioBalanceRight",
    /** Decreases the amount of bass. */
    AudioBassDown = "AudioBassDown",
    /** Reduces bass boosting or cycles downward through bass boost modes or states. */
    AudioBassBoostDown = "AudioBassBoostDown",
    /** Toggles bass boosting on and off. */
    AudioBassBoostToggle = "AudioBassBoostToggle",
    /** Increases the amoung of bass boosting, or cycles upward through a set of bass boost modes or states. */
    AudioBassBoostUp = "AudioBassBoostUp",
    /** Increases the amount of bass. */
    AudioBassUp = "AudioBassUp",
    /** Adjusts the audio fader toward the front. */
    AudioFaderFront = "AudioFaderFront",
    /** Adjusts the audio fader toward the rear. */
    AudioFaderRear = "AudioFaderRear",
    /** Selects the next available surround sound mode. */
    AudioSurroundModeNext = "AudioSurroundModeNext",
    /** Decreases the amount of treble. */
    AudioTrebleDown = "AudioTrebleDown",
    /** Increases the amount of treble. */
    AudioTrebleUp = "AudioTrebleUp",
    /** Decreases the audio volume. */
    AudioVolumeDown = "AudioVolumeDown",
    /** Mutes the audio. */
    AudioVolumeMute = "AudioVolumeMute",
    /** Increases the audio volume. */
    AudioVolumeUp = "AudioVolumeUp",
    /** Toggles the microphone on and off. */
    MicrophoneToggle = "MicrophoneToggle",
    /** Decreases the microphone's input volume. */
    MicrophoneVolumeDown = "MicrophoneVolumeDown",
    /** Mutes the microphone input. */
    MicrophoneVolumeMute = "MicrophoneVolumeMute",
    /** Increases the microphone's input volume. */
    MicrophoneVolumeUp = "MicrophoneVolumeUp",
    /** Switches into TV viewing mode. */
    TV = "TV",
    /** Toggles 3D TV mode on and off. */
    TV3DMode = "TV3DMode",
    /** Toggles between antenna and cable inputs. */
    TVAntennaCable = "TVAntennaCable",
    /** Toggles audio description mode on and off. */
    TVAudioDescription = "TVAudioDescription",
    /** Decreases trhe audio description's mixing volume; reduces the volume of the audio descriptions relative to the program sound. */
    TVAudioDescriptionMixDown = "TVAudioDescriptionMixDown",
    /** Increases the audio description's mixing volume; increases the volume of the audio descriptions relative to the program sound. */
    TVAudioDescriptionMixUp = "TVAudioDescriptionMixUp",
    /** Displays or hides the media contents available for playback (this may be a channel guide showing the currently airing programs, or a list of media files to play). */
    TVContentsMenu = "TVContentsMenu",
    /** Displays or hides the TV's data service menu. */
    TVDataService = "TVDataService",
    /** Cycles the input mode on an external TV. */
    TVInput = "TVInput",
    /** Switches to the input "Component 1." */
    TVInputComponent1 = "TVInputComponent1",
    /** Switches to the input "Component 2." */
    TVInputComponent2 = "TVInputComponent2",
    /** Switches to the input "Composite 1." */
    TVInputComposite1 = "TVInputComposite1",
    /** Switches to the input "Composite 2." */
    TVInputComposite2 = "TVInputComposite2",
    /** Switches to the input "HDMI 1." */
    TVInputHDMI1 = "TVInputHDMI1",
    /** Switches to the input "HDMI 2." */
    TVInputHDMI2 = "TVInputHDMI2",
    /** Switches to the input "HDMI 3." */
    TVInputHDMI3 = "TVInputHDMI3",
    /** Switches to the input "HDMI 4." */
    TVInputHDMI4 = "TVInputHDMI4",
    /** Switches to the input "VGA 1." */
    TVInputVGA1 = "TVInputVGA1",
    /** The Media Context menu key. */
    TVMediaContext = "TVMediaContext",
    /** Toggle the TV's network connection on and off. */
    TVNetwork = "TVNetwork",
    /** Put the TV into number entry mode. */
    TVNumberEntry = "TVNumberEntry",
    /** The device's power button. */
    TVPower = "TVPower",
    /** Radio button. */
    TVRadioService = "TVRadioService",
    /** Satellite button. */
    TVSatellite = "TVSatellite",
    /** Broadcast Satellite button. */
    TVSatelliteBS = "TVSatelliteBS",
    /** Communication Satellite button. */
    TVSatelliteCS = "TVSatelliteCS",
    /** Toggles among available satellites. */
    TVSatelliteToggle = "TVSatelliteToggle",
    /** Selects analog terrestrial television service (analog cable or antenna reception). */
    TVTerrestrialAnalog = "TVTerrestrialAnalog",
    /** Selects digital terrestrial television service (digital cable or antenna receiption). */
    TVTerrestrialDigital = "TVTerrestrialDigital",
    /** Timer programming button. */
    TVTimer = "TVTimer",
    /** Changes the input mode on an external audio/video receiver (AVR) unit. */
    AVRInput = "AVRInput",
    /** Toggles the power on an external AVR unit. */
    AVRPower = "AVRPower",
    /** General-purpose media function key, color-coded red. This has index 0 among the colored keys. */
    ColorF0Red = "ColorF0Red",
    /** General-purpose media funciton key, color-coded green. This has index 1 among the colored keys. */
    ColorF1Green = "ColorF1Green",
    /** General-purpose media funciton key, color-coded yellow. This has index 2 among the colored keys. */
    ColorF2Yellow = "ColorF2Yellow",
    /** General-purpose media funciton key, color-coded blue. This has index 3 among the colored keys. */
    ColorF3Blue = "ColorF3Blue",
    /** General-purpose media funciton key, color-coded grey. This has index 4 among the colored keys. */
    ColorF4Grey = "ColorF4Grey",
    /** General-purpose media funciton key, color-coded brown. This has index 5 among the colored keys. */
    ColorF5Brown = "ColorF5Brown",
    /** Toggles closed captioning on and off. */
    ClosedCaptionToggle = "ClosedCaptionToggle",
    /** Adjusts the brightness of the device by toggling between two brightness levels or by cycling among multiple brightness levels. */
    Dimmer = "Dimmer",
    /** Cycles among video sources. */
    DisplaySwap = "DisplaySwap",
    /** Switches the input source to the Digital Video Recorder (DVR). */
    DVR = "DVR",
    /** The Exit button, which exits the curreent application or menu. */
    Exit = "Exit",
    /** Clears the program or content stored in the first favorites list slot. */
    FavoriteClear0 = "FavoriteClear0",
    /** Clears the program or content stored in the second favorites list slot. */
    FavoriteClear1 = "FavoriteClear1",
    /** Clears the program or content stored in the third favorites list slot. */
    FavoriteClear2 = "FavoriteClear2",
    /** Clears the program or content stored in the fourth favorites list slot. */
    FavoriteClear3 = "FavoriteClear3",
    /** Selects (recalls) the program or content stored in the first favorites list slot. */
    FavoriteRecall0 = "FavoriteRecall0",
    /** Selects (recalls) the program or content stored in the second favorites list slot. */
    FavoriteRecall1 = "FavoriteRecall1",
    /** Selects (recalls) the program or content stored in the third favorites list slot. */
    FavoriteRecall2 = "FavoriteRecall2",
    /** Selects (recalls) the program or content stored in the fourth favorites list slot. */
    FavoriteRecall3 = "FavoriteRecall3",
    /** Stores the current program or content into the first favorites list slot. */
    FavoriteStore0 = "FavoriteStore0",
    /** Stores the current program or content into the second favorites list slot. */
    FavoriteStore1 = "FavoriteStore1",
    /** Stores the current program or content into the third favorites list slot. */
    FavoriteStore2 = "FavoriteStore2",
    /** Stores the current program or content into the fourth favorites list slot. */
    FavoriteStore3 = "FavoriteStore3",
    /** Toggles the display of the program or content guide. */
    Guide = "Guide",
    /** If the guide is currently displayed, this button tells the guide to display the next day's content. */
    GuideNextDay = "GuideNextDay",
    /** If the guide is currently displayed, this button tells the guide to display the previous day's content. */
    GuidePreviousDay = "GuidePreviousDay",
    /** Toggles the display of information about the currently selected content, program, or media. */
    Info = "Info",
    /** Tells the device to perform an instant replay (typically some form of jumping back a short amount of time then playing it again, possibly but not usually in slow motion). */
    InstantReplay = "InstantReplay",
    /** Opens content liniked to the current program, if available and possible. */
    Link = "Link",
    /** Lists the current program. */
    ListProgram = "ListProgram",
    /** Toggles a display listing currently available live content or programs. */
    LiveContent = "LiveContent",
    /** Locks or unlocks the currently selected content or pgoram. */
    Lock = "Lock",
    /** Presents a list of media applications, such as photo viewers, audio and video players, and games. [1] */
    MediaApps = "MediaApps",
    /** The Audio Track key. */
    MediaAudioTrack = "MediaAudioTrack",
    /** Jumps back to the last-viewed content, program, or other media. */
    MediaLast = "MediaLast",
    /** Skips backward to the previous content or program. */
    MediaSkipBackward = "MediaSkipBackward",
    /** Skips forward to the next content or program. */
    MediaSkipForward = "MediaSkipForward",
    /** Steps backward to the previous content or program. */
    MediaStepBackward = "MediaStepBackward",
    /** Steps forward to the next content or program. */
    MediaStepForward = "MediaStepForward",
    /** Top Menu button. Opens the media's main menu (e.g., for a DVD or Blu-Ray disc). */
    MediaTopMenu = "MediaTopMenu",
    /** Navigates into a submenu or option. */
    NavigateIn = "NavigateIn",
    /** Navigates to the next item. */
    NavigateNext = "NavigateNext",
    /** Navigates out of the current screen or menu. */
    NavigateOut = "NavigateOut",
    /** Navigates to the previous item. */
    NavigatePrevious = "NavigatePrevious",
    /** Cycles to the next channel in the favorites list. */
    NextFavoriteChannel = "NextFavoriteChannel",
    /** Cycles to the next saved user profile, if this feature is supported and multiple profiles exist. */
    NextUserProfile = "NextUserProfile",
    /** Opens the user interface for selecting on demand content or programs to watch. */
    OnDemand = "OnDemand",
    /** Starts the process of pairing the remote with a device to be controlled. */
    Pairing = "Pairing",
    /** A button to move the picture-in-picture view downward. */
    PinPDown = "PinPDown",
    /** A button to control moving the picture-in-picture view. */
    PinPMove = "PinPMove",
    /** Toggles display of th epicture-in-picture view on and off. */
    PinPToggle = "PinPToggle",
    /** A button to move the picture-in-picture view upward. */
    PinPUp = "PinPUp",
    /** Decreases the media playback rate. */
    PlaySpeedDown = "PlaySpeedDown",
    /** Returns the media playback rate to normal. */
    PlaySpeedReset = "PlaySpeedReset",
    /** Increases the media playback rate. */
    PlaySpeedUp = "PlaySpeedUp",
    /** Toggles random media (also known as "shuffle mode") on and off. */
    RandomToggle = "RandomToggle",
    /** A code sent when the remote control's battery is low. This doesn't actually correspond to a physical key at all. */
    RcLowBattery = "RcLowBattery",
    /** Cycles among the available media recording speeds. */
    RecordSpeedNext = "RecordSpeedNext",
    /** Toggles radio frequency (RF) input bypass mode on and off. RF bypass mode passes RF input directly to the RF output without any processing or filtering. */
    RfBypass = "RfBypass",
    /** Toggles the channel scan mode on and off. This is a mode which flips through channels automatically until the user stops the scan. */
    ScanChannelsToggle = "ScanChannelsToggle",
    /** Cycles through the available screen display modes. */
    ScreenModeNext = "ScreenModeNext",
    /** Toggles display of the device's settings screen on and off. */
    Settings = "Settings",
    /** Toggles split screen display mode on and off. */
    SplitScreenToggle = "SplitScreenToggle",
    /** Cycles among input modes on an external set-top box (STB). */
    STBInput = "STBInput",
    /** Toggles on and off an external STB. */
    STBPower = "STBPower",
    /** Toggles the display of subtitles on and off if they're available. */
    Subtitle = "Subtitle",
    /** Toggles display of teletext, if available. */
    Teletext = "Teletext",
    /** Cycles through the available video modes. */
    VideoModeNext = "VideoModeNext",
    /** Causes the device to identify itself in some fashion, such as by flashing a light, briefly changing the brightness of indicator lights, or emitting a tone. */
    Wink = "Wink",
    /** Toggles between full-screen and scaled content display, or otherwise change the magnification level. */
    ZoomToggle = "ZoomToggle",
    /** Presents a list of possible corrections for a word which was incorrectly identified. */
    SpeechCorrectionList = "SpeechCorrectionList",
    /** Toggles between dictation mode and command/control mode. This lets the speech engine know whether to interpret spoken words as input text or as commands. */
    SpeechInputToggle = "SpeechInputToggle",
    /** Closes the current document or message. Must not exit the application. */
    Close = "Close",
    /** Creates a new document or message. */
    New = "New",
    /** Opens an existing document or message. */
    Open = "Open",
    /** Prints the current document or message. */
    Print = "Print",
    /** Saves the current document or message. */
    Save = "Save",
    /** Starts spell checking the current document. */
    SpellCheck = "SpellCheck",
    /** Opens the user interface to forward a message. */
    MailForward = "MailForward",
    /** Opens the user interface to reply to a message. */
    MailReply = "MailReply",
    /** Sends the current message. */
    MailSend = "MailSend",
    /** The Calculator key, often labeled with an icon. This is often used as a generic application launcher key (APPCOMMAND_LAUNCH_APP2). */
    LaunchCalculator = "LaunchCalculator",
    /** The Calendar key. Often labeled with an icon. */
    LaunchCalendar = "LaunchCalendar",
    /** The Contacts key. */
    LaunchContacts = "LaunchContacts",
    /** The Mail key. Often labeled with an icon. */
    LaunchMail = "LaunchMail",
    /** The Media Player key. */
    LaunchMediaPlayer = "LaunchMediaPlayer",
    /** The Music Player key. Often labeled with an icon. */
    LaunchMusicPlayer = "LaunchMusicPlayer",
    /** The My Computer key on Windows keyboards. This is often used as a generic application launcher key (APPCOMMAND_LAUNCH_APP1). */
    LaunchMyComputer = "LaunchMyComputer",
    /** The Phone key. Opens the phone dialer application (if one is present). */
    LaunchPhone = "LaunchPhone",
    /** The Screen Saver key. */
    LaunchScreenSaver = "LaunchScreenSaver",
    /** The Spreadsheet key. This key may be labeled with an icon. */
    LaunchSpreadsheet = "LaunchSpreadsheet",
    /** The Web Browser key. This key is frequently labeled with an icon. */
    LaunchWebBrowser = "LaunchWebBrowser",
    /** The WebCam key. Opens the webcam application. */
    LaunchWebCam = "LaunchWebCam",
    /** The Word Processor key. This may be an icon of a specific word processor application, or a generic document icon. */
    LaunchWordProcessor = "LaunchWordProcessor",
    /** The first generic application launcher button. */
    LaunchApplication1 = "LaunchApplication1",
    /** The second generic application launcher button. */
    LaunchApplication2 = "LaunchApplication2",
    /** The third generic application launcher button. */
    LaunchApplication3 = "LaunchApplication3",
    /** The fourth generic application launcher button. */
    LaunchApplication4 = "LaunchApplication4",
    /** The fifth generic application launcher button. */
    LaunchApplication5 = "LaunchApplication5",
    /** The sixth generic application launcher button. */
    LaunchApplication6 = "LaunchApplication6",
    /** The seventh generic application launcher button. */
    LaunchApplication7 = "LaunchApplication7",
    /** The eighth generic application launcher button. */
    LaunchApplication8 = "LaunchApplication8",
    /** The ninth generic application launcher button. */
    LaunchApplication9 = "LaunchApplication9",
    /** The 10th generic application launcher button. */
    LaunchApplication10 = "LaunchApplication10",
    /** The 11th generic application launcher button. */
    LaunchApplication11 = "LaunchApplication11",
    /** The 12th generic application launcher button. */
    LaunchApplication12 = "LaunchApplication12",
    /** The 13th generic application launcher button. */
    LaunchApplication13 = "LaunchApplication13",
    /** The 14th generic application launcher button. */
    LaunchApplication14 = "LaunchApplication14",
    /** The 15th generic application launcher button. */
    LaunchApplication15 = "LaunchApplication15",
    /** The 16th generic application launcher button. */
    LaunchApplication16 = "LaunchApplication16",
    /** Navigates to the previous content or page in the current Web view's history. */
    BrowserBack = "BrowserBack",
    /** Opens the user's list of bookmarks/favorites. */
    BrowserFavorites = "BrowserFavorites",
    /** Navigates to the next content or page in the current Web view's history. */
    BrowserForward = "BrowserForward",
    /** Navigates to the user's preferred home page. */
    BrowserHome = "BrowserHome",
    /** Refreshes the current page or content. */
    BrowserRefresh = "BrowserRefresh",
    /** Activates the user's preferred search engine or the search interface within their browser. */
    BrowserSearch = "BrowserSearch",
    /** Stops loading the currently displayed Web view or content. */
    BrowserStop = "BrowserStop",
    /**
     * The decimal point key (typically . or , depending on the region).
     * In newer browsers, this value to be the character generated by the decimal key (one of those two characters). [1]
     */
    Decimal = "Decimal",
    /** The 11 key found on certain media numeric keypads. */
    Key11 = "Key11",
    /** The 12 key found on certain media numeric keypads. */
    Key12 = "Key12",
    /** The numeric keypad's multiplication key, *. */
    Multiply = "Multiply",
    /** The numeric keypad's addition key, +. */
    Add = "Add",
    /** The numeric keypad's division key, /. */
    Divide = "Divide",
    /** The numeric keypad's subtraction key, -. */
    Subtract = "Subtract",
    /**
     * The numeric keypad's places separator character.
     * (In the United States this is a comma, but elsewhere it is frequently a period.)
     */
    Separator = "Separator",
    /**
     * The Spacebar
     */
    Space = " "
}
declare const isAlphaNumeric: (letter: string) => boolean;

declare const KeyCodes: {
    BACKSPACE: number;
    TAB: number;
    NUM_CENTER: number;
    ENTER: number;
    RETURN: number;
    SHIFT: number;
    CTRL: number;
    ALT: number;
    PAUSE: number;
    CAPS_LOCK: number;
    ESC: number;
    SPACE: number;
    PAGE_UP: number;
    PAGE_DOWN: number;
    HASH_SYMBOL: number;
    HOME: number;
    LEFT: number;
    UP: number;
    RIGHT: number;
    DOWN: number;
    PRINT_SCREEN: number;
    INSERT: number;
    DELETE: number;
    ZERO: number;
    ONE: number;
    TWO: number;
    THREE: number;
    FOUR: number;
    FIVE: number;
    SIX: number;
    SEVEN: number;
    EIGHT: number;
    NINE: number;
    AT_SYMBOL: number;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    I: number;
    J: number;
    K: number;
    L: number;
    M: number;
    N: number;
    O: number;
    P: number;
    Q: number;
    R: number;
    S: number;
    T: number;
    U: number;
    V: number;
    W: number;
    X: number;
    Y: number;
    Z: number;
    CONTEXT_MENU: number;
    NUM_ZERO: number;
    NUM_ONE: number;
    NUM_TWO: number;
    NUM_THREE: number;
    NUM_FOUR: number;
    NUM_FIVE: number;
    NUM_SIX: number;
    NUM_SEVEN: number;
    NUM_EIGHT: number;
    NUM_NINE: number;
    NUM_MULTIPLY: number;
    NUM_PLUS: number;
    NUM_MINUS: number;
    NUM_PERIOD: number;
    NUM_DIVISION: number;
    F1: number;
    F2: number;
    F3: number;
    F4: number;
    F5: number;
    F6: number;
    F7: number;
    F8: number;
    F9: number;
    F10: number;
    F11: number;
    F12: number;
    DASH: number;
    PERIOD: number;
    FORWARD_SLASH: number;
};

declare function notify(message: string): void;

/**
 * Outside click helper, makes to set the element as inactive when clicking outside of it
 */
declare class OutsideClick implements OnDestroy {
    element: ElementRef;
    otherElement: ElementRef;
    active: boolean;
    onOutsideClick: EventListenerOrEventListenerObject;
    onActiveChange: EventEmitter<boolean>;
    constructor(element: ElementRef);
    /**
     * When the element is destroyed, make sure to remove the handler
     */
    ngOnDestroy(): void;
    /**
     * Toggles the element as active and adds/removes the outside click handler
     */
    toggleActive(event?: MouseEvent, forceValue?: boolean): void;
    /**
     * When clicking outside, checks the element and closes if outside
     */
    handleOutsideClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutsideClick, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OutsideClick>;
}

export { AppBridge, AppBridgeHandler, AppBridgeService, BaseRenderer, BooleanInput, COUNTRIES, CalendarEventResponse, Can, Color, DateRange, DateUtil, Deferred, DevAppBridge, DevAppBridgeService, HTTP_VERBS, Helpers, Key, KeyCodes, MESSAGE_TYPES, OutsideClick, binarySearch, can, convertTokens, findByCountryCode, findByCountryId, findByCountryName, formatZonedTime, getCountries, getDayView, getDayViewHourGrid, getMonthView, getStateObjects, getStates, getWeekView, getWeekViewEventOffset, getWeekViewHeader, isAlphaNumeric, legacyParse, notify, splitDateString };
export type { AlleyLinkColors, CalendarEvent, CalendarEventTimesChangedEvent, Country, DataTableRangeModel, DateLike, DateParseOptions, DatePickerSelectModes, DatePickerValueFormats, Day, DayView, DayViewEvent, DayViewHour, DayViewHourSegment, DeferredPromise, EventAction, EventColor, GetDayViewArgs, GetEventsInPeriodArgs, HSL, HSLA, HSV, HSVA, HttpVerb, IAppBridgeOpenEvent, IAppBridgeOpenListEvent, IAppBridgeRequestDataEvent, IsEventInPeriodArgs, LegacyParseOptions, MessageType$1 as MessageType, MonthView, MonthViewDay, MosaicLists, NovoApps, NovoDataType, NovoDateSelectEvent, NovoDateSelectionStrategy, NovoMonthSelectEvent, NovoYearSelectEvent, OverlayDate, PostRobotEvent, RGB, RGBA, RangeModel, State, WeekDay, WeekViewEvent, WeekViewEventRow, modelTypes, rangeSelectModes };
