import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Day as DateFnsDay } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import type { DateLike, Day, OverlayDate } from 'novo-elements/utils';
import * as i0 from "@angular/core";
export declare class NovoMonthViewElement implements OnInit {
    labels: NovoLabelService;
    private element;
    private cdr;
    private _sanitizer;
    minDate: Date;
    maxDate: Date;
    activeDate: Date;
    selected: DateLike[];
    preview: DateLike[];
    overlays: OverlayDate[];
    disabledDateMessage: string;
    isRange: boolean;
    hideOverflowDays: boolean;
    _weekStartsOn: DateFnsDay;
    get weekStartsOn(): DateFnsDay;
    set weekStartsOn(value: DateFnsDay);
    select: EventEmitter<any>;
    hover: EventEmitter<any>;
    weekdays: string[];
    monthNames: string[];
    monthLabel: string;
    weeks: any;
    constructor(labels: NovoLabelService, element: ElementRef, cdr: ChangeDetectorRef, _sanitizer: DomSanitizer);
    ngOnInit(): void;
    updateView(date: Date): void;
    onSelect(event: Event, day: Day): void;
    onHover(event: Event, day: Day): void;
    buildMonth(month: Date): void;
    buildWeek(date: Date, month: Date): Array<Object>;
    isDisabled(day: DateLike): boolean;
    /** Returns whether a cell should be marked as selected. */
    _isSelected(value: DateLike): DateLike;
    /** Returns whether a cell should be marked as preview. */
    _isPreview(value: DateLike): DateLike;
    /** Returns whether a cell should be marked as an overlay. */
    _isOverlay(value: DateLike): OverlayDate;
    /** Returns whether a cell should be marked as an overlay. */
    _hasOverlayType(value: DateLike): string;
    /** Gets whether a value is the start of the main range. */
    _isRangeStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the main range. */
    _isRangeEnd(value: DateLike): boolean;
    /** Gets whether a value is within the currently-selected range. */
    _isInRange(value: DateLike): boolean;
    /** Gets whether a value is the start of the preview range. */
    _isPreviewStart(value: DateLike): boolean;
    /** Gets whether a value is the end of the preview range. */
    _isPreviewEnd(value: DateLike): boolean;
    /** Gets whether a value is inside the preview range. */
    _isInPreview(value: DateLike): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoMonthViewElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoMonthViewElement, "novo-month-view", never, { "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "activeDate": { "alias": "activeDate"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "preview": { "alias": "preview"; "required": false; }; "overlays": { "alias": "overlays"; "required": false; }; "disabledDateMessage": { "alias": "disabledDateMessage"; "required": false; }; "isRange": { "alias": "isRange"; "required": false; }; "hideOverflowDays": { "alias": "hideOverflowDays"; "required": false; }; "weekStartsOn": { "alias": "weekStartsOn"; "required": false; }; }, { "select": "select"; "hover": "hover"; }, never, never, false, never>;
}
