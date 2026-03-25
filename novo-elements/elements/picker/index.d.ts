import { OverlayRef } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { ElementRef, ChangeDetectorRef, EventEmitter, OnInit, OnDestroy, Renderer2, ViewContainerRef, ComponentRef, DestroyRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NovoLabelService, ComponentUtils } from 'novo-elements/services';
import * as _angular_platform_browser from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import * as i13 from 'novo-elements/elements/common';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
import * as i10 from '@angular/common';
import * as i11 from 'novo-elements/pipes';
import * as i12 from '@angular/forms';
import * as i14 from 'novo-elements/elements/loading';
import * as i15 from 'novo-elements/elements/list';
import * as i16 from 'novo-elements/elements/switch';

/**
 * @description This is the actual list of matches that gets injected into the DOM. It's also the piece that can be
 * overwritten if custom list options are needed.
 */
declare class BasePickerResults {
    _term: string;
    selected: Array<any>;
    hasError: boolean;
    isLoading: boolean;
    isStatic: boolean;
    _config: any;
    activeMatch: any;
    parent: any;
    element: ElementRef;
    ref: ChangeDetectorRef;
    page: number;
    lastPage: boolean;
    autoSelectFirstOption: boolean;
    overlay: OverlayRef;
    optionsFunctionHasChanged: boolean;
    private selectingMatches;
    private scrollHandler;
    _matches: Array<any>;
    customTextValue: any;
    set matches(m: Array<any>);
    get matches(): Array<any>;
    constructor(element: ElementRef, ref: ChangeDetectorRef);
    cleanUp(): void;
    onScrollDown(event: WheelEvent): void;
    set term(value: string);
    get term(): string;
    set config(value: any);
    get config(): any;
    shouldSearch(value: unknown): boolean;
    addScrollListener(): void;
    processSearch(shouldReset?: boolean): void;
    search(term: any, mode?: any): Observable<any>;
    shouldCallOptionsFunction(term: string): boolean;
    /**
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: any): any;
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): Array<any>;
    /**
     * @description This function is called when the user presses the enter key to call the selectMatch method.
     */
    selectActiveMatch(): void;
    /**
     * @description This function sets activeMatch to the match before the current node.
     */
    prevActiveMatch(): void;
    /**
     * @description This function sets activeMatch to the match after the current node.
     */
    nextActiveMatch(): void;
    getListElement(): any;
    getChildrenOfListElement(): any[];
    scrollToActive(): void;
    /**
     * @description
     */
    selectActive(match: any): void;
    /**
     * @description
     */
    isActive(match: any): boolean;
    /**
     * @description
     */
    selectMatch(event?: any, item?: any): boolean;
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape: any): any;
    /**
     * @deprecated use highlight pipe
     */
    highlight(match: any, query: any): any;
    preselected(match: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasePickerResults, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BasePickerResults, never, never, { "matches": { "alias": "matches"; "required": false; }; "term": { "alias": "term"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * @description This is the actual list of matches that gets injected into the DOM.
 */
declare class ChecklistPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    filteredMatches: any;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    search(): Observable<any>;
    /**
     * @param matches - Collection of objects=
     *
     * @description This function loops through the picker options and creates a filtered list of objects that contain
     * the newSearch.
     */
    filterData(matches: any): any;
    selectMatch(event: any, item: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChecklistPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChecklistPickerResults, "checklist-picker-results", never, {}, {}, never, never, false, never>;
}

declare class DistributionListPickerResults extends BasePickerResults {
    private sanitizer;
    labels: NovoLabelService;
    active: boolean;
    get isHidden(): boolean;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    sanitizeHTML(html: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DistributionListPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DistributionListPickerResults, "distribution-list-picker-results", never, {}, {}, never, never, false, never>;
}

declare class EntityPickerResult {
    labels: NovoLabelService;
    match: any;
    term: any;
    select: EventEmitter<any>;
    constructor(labels: NovoLabelService);
    /**
     * @description This function captures the whole query string and replace it with the string that will be used to
     * match.
     */
    escapeRegexp(queryToEscape: any): any;
    /**
     * @deprecated use highlight pipe
     */
    highlight(match: any, query: any): any;
    getIconForResult(result?: any): string;
    renderTimestamp(date?: any): string;
    renderTime(dateStr?: string): string;
    renderTimeNoOffset(dateStr?: string): string;
    getNameForResult(result?: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityPickerResult, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityPickerResult, "entity-picker-result", never, { "match": { "alias": "match"; "required": false; }; "term": { "alias": "term"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
declare class EntityPickerResults extends BasePickerResults {
    labels: NovoLabelService;
    select: EventEmitter<any>;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getListElement(): any;
    selectMatch(event?: any, item?: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityPickerResults, "entity-picker-results", never, {}, { "select": "select"; }, never, never, false, never>;
}

declare class GroupedMultiPickerResults extends BasePickerResults implements OnInit, OnDestroy {
    private renderer;
    labels: NovoLabelService;
    private inputElement;
    private listElement;
    selectedCategory: {
        value: string;
        label: string;
    };
    searchTerm: string;
    customFilterEnabled: boolean;
    customFilterLabel: string;
    placeholder: string;
    private keyboardSubscription;
    private internalMap;
    customFilterValue: any;
    set term(value: any);
    get categories(): any;
    constructor(element: ElementRef, renderer: Renderer2, labels: NovoLabelService, ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setAllCategory(): void;
    selectCategory(category: {
        value: string;
        label: string;
    }): void;
    clearSearchTerm(event: MouseEvent): void;
    selectMatch(event?: MouseEvent, item?: {
        value: string;
        label: string;
    }): boolean;
    fireCustomFilter(value: boolean): void;
    filterData(): {
        value: string;
        label: string;
    }[];
    private getNewMatches;
    private filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupedMultiPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupedMultiPickerResults, "grouped-multi-picker-results", never, {}, {}, never, never, false, never>;
}

interface IMixedMultiPickerOption {
    value: string;
    label: string;
    secondaryOptions?: {
        value: string;
        label: string;
        filterValue?: any;
    }[];
    getSecondaryOptionsAsync?(): Promise<{
        value: string;
        label: string;
    }[]>;
    clearSecondaryOptions?: Subject<any>;
    showSearchOnSecondaryOptions?: boolean;
}
declare class MixedMultiPickerResults extends BasePickerResults implements OnDestroy {
    private renderer;
    labels: NovoLabelService;
    private inputElement;
    private listElement;
    selectedPrimaryOption: IMixedMultiPickerOption;
    searchTerm: string;
    placeholder: string;
    emptyOptionsLabel: string;
    private keyboardSubscription;
    private internalMap;
    set term(value: any);
    get options(): any;
    constructor(element: ElementRef, renderer: Renderer2, labels: NovoLabelService, ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    selectPrimaryOption(primaryOption: IMixedMultiPickerOption, event?: MouseEvent): void;
    selectMatch(event?: MouseEvent): boolean;
    clearSearchTerm(event: MouseEvent): void;
    optionHasSecondaryOptions(primaryOption: IMixedMultiPickerOption): boolean;
    shouldShowSearchBox(primaryOption: IMixedMultiPickerOption): boolean;
    clearPrimaryOption(primaryOption: IMixedMultiPickerOption): void;
    filterData(): {
        value: string;
        label: string;
    }[];
    private filter;
    private getNewMatches;
    static ɵfac: i0.ɵɵFactoryDeclaration<MixedMultiPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MixedMultiPickerResults, "mixed-multi-picker-results", never, {}, {}, never, never, false, never>;
}

declare class PickerResults extends BasePickerResults {
    labels: NovoLabelService;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    get hasNonErrorMessage(): boolean;
    getEmptyMessage(): any;
    shouldShowMessageForZeroLengthSearch(): any;
    getListElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickerResults, "picker-results", never, {}, {}, never, never, false, never>;
}

declare class SkillsSpecialtyPickerResults extends BasePickerResults {
    element: ElementRef;
    labels: NovoLabelService;
    active: boolean;
    limitedTo: boolean;
    limit: number;
    total: number;
    constructor(element: ElementRef, labels: NovoLabelService, ref: ChangeDetectorRef);
    getListElement(): any;
    /**
     * @name structureArray
     * @param collection - the data once getData resolves it
     *
     * @description This function structures an array of nodes into an array of objects with a
     * 'name' field by default.
     */
    structureArray(collection: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkillsSpecialtyPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SkillsSpecialtyPickerResults, "skill-specialty-picker-results", never, {}, {}, never, never, false, never>;
}

declare class WorkersCompCodesPickerResults extends PickerResults {
    private sanitizer;
    labels: NovoLabelService;
    constructor(element: ElementRef, sanitizer: DomSanitizer, labels: NovoLabelService, ref: ChangeDetectorRef);
    sanitizeHTML(compCode: string, name: string): _angular_platform_browser.SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkersCompCodesPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkersCompCodesPickerResults, "workers-comp-codes-picker-results", never, {}, {}, never, never, false, never>;
}

/**
 * @description This class is the directive definition of the Picker. If you add an attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
declare class NovoPickerElement implements OnInit {
    element: ElementRef;
    private componentUtils;
    private ref;
    private destroyRef;
    results: ViewContainerRef;
    config: any;
    placeholder: string;
    clearValueOnSelect: boolean;
    closeOnSelect: boolean;
    selected: Array<any>;
    appendToBody: boolean;
    parentScrollSelector: string;
    parentScrollAction: string;
    containerClass: string;
    side: string;
    autoSelectFirstOption: boolean;
    overrideElement: ElementRef;
    maxlength: number;
    allowCustomValues: boolean;
    width: string;
    minWidth: string;
    allowTabNavigation: boolean;
    set disablePickerInput(v: boolean);
    get disablePickerInput(): boolean;
    private _disablePickerInput;
    changed: EventEmitter<any>;
    select: EventEmitter<any>;
    focus: EventEmitter<any>;
    blur: EventEmitter<any>;
    typing: EventEmitter<any>;
    tab: EventEmitter<any>;
    container: NovoOverlayTemplateComponent;
    input: ElementRef;
    term: string;
    resultsComponent: any;
    popup: ComponentRef<any>;
    _value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(element: ElementRef, componentUtils: ComponentUtils, ref: ChangeDetectorRef, destroyRef: DestroyRef);
    ngOnInit(): void;
    private onDebouncedKeyup;
    openPanel(): void;
    closePanel(): void;
    get panelOpen(): boolean;
    private show;
    onKeyDown(event: KeyboardEvent): void;
    clearValue(wipeTerm: any): void;
    /**
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event: any): void;
    showResults(term?: any): void;
    hideResults(err?: any): void;
    onOverlayClosed(): void;
    get value(): any;
    set value(selected: any);
    checkTerm(event: any): void;
    onTouched(event?: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPickerElement, "novo-picker", never, { "config": { "alias": "config"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "clearValueOnSelect": { "alias": "clearValueOnSelect"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "appendToBody": { "alias": "appendToBody"; "required": false; }; "parentScrollSelector": { "alias": "parentScrollSelector"; "required": false; }; "parentScrollAction": { "alias": "parentScrollAction"; "required": false; }; "containerClass": { "alias": "containerClass"; "required": false; }; "side": { "alias": "side"; "required": false; }; "autoSelectFirstOption": { "alias": "autoSelectFirstOption"; "required": false; }; "overrideElement": { "alias": "overrideElement"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "allowCustomValues": { "alias": "allowCustomValues"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "allowTabNavigation": { "alias": "allowTabNavigation"; "required": false; }; "disablePickerInput": { "alias": "disablePickerInput"; "required": false; }; }, { "changed": "changed"; "select": "select"; "focus": "focus"; "blur": "blur"; "typing": "typing"; "tab": "tab"; }, never, ["*"], false, never>;
}

declare class NovoPickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoPickerModule, [typeof NovoPickerElement, typeof PickerResults, typeof EntityPickerResult, typeof EntityPickerResults, typeof ChecklistPickerResults, typeof GroupedMultiPickerResults, typeof MixedMultiPickerResults, typeof DistributionListPickerResults, typeof WorkersCompCodesPickerResults, typeof SkillsSpecialtyPickerResults], [typeof i10.CommonModule, typeof i11.NovoPipesModule, typeof i12.FormsModule, typeof i13.NovoCommonModule, typeof i14.NovoLoadingModule, typeof i15.NovoListModule, typeof i13.NovoOverlayModule, typeof i16.NovoSwitchModule], [typeof NovoPickerElement, typeof PickerResults, typeof EntityPickerResult, typeof EntityPickerResults, typeof ChecklistPickerResults, typeof GroupedMultiPickerResults, typeof MixedMultiPickerResults, typeof DistributionListPickerResults, typeof WorkersCompCodesPickerResults, typeof SkillsSpecialtyPickerResults]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoPickerModule>;
}

export { BasePickerResults, ChecklistPickerResults, DistributionListPickerResults, EntityPickerResult, EntityPickerResults, GroupedMultiPickerResults, MixedMultiPickerResults, NovoPickerElement, NovoPickerModule, PickerResults, SkillsSpecialtyPickerResults, WorkersCompCodesPickerResults };
export type { IMixedMultiPickerOption };
