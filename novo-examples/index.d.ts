import * as i230 from 'novo-elements';
import { CalendarEvent, NovoAsideRef, FormUtils, NovoAsideService, NovoOptionSelectedEvent, IDataTableColumn, NovoModalRef, NovoModalParams, IDataTablePaginationOptions, IDataTableSearchOptions, RemoteDataTableService, NovoModalService, IDataTablePreferences, NovoDataTable, IDataTableSelectionOption, IDataTableService, AbstractConditionFieldDef, Operator, CriteriaBuilderComponent, Conjunction, AddressCriteriaConfig, AddressRadiusUnitsName, TabbedGroupPickerTab, NovoToastService, Security, QuickNoteResults, NovoVerticalStepper, NovoStep, NovoHorizontalStepper, PickerResults, NovoFormGroup, BaseControl, NovoControlGroupAddConfig, FileControl, DateControl, QueryBuilderConfig, TextBoxControl, NovoControlConfig, NOVO_VALUE_THEME, NovoSelectElement, NovoLabelService, NovoFieldControl } from 'novo-elements';
import * as i0 from '@angular/core';
import { OnInit, ElementRef, ChangeDetectorRef, AfterViewInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as i228 from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NovoModalRef as NovoModalRef$1 } from 'novo-elements/elements/modal';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';
import * as i229 from '@angular/common';
import * as i1 from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import * as i12 from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import * as i10 from 'angular-split';

/**
 * @title Agenda Example
 */
declare class AgendaExample {
    views: Array<any>;
    view: string;
    viewDate: Date;
    events: CalendarEvent[];
    getNewEvent(date: any, color: any, type: any): CalendarEvent;
    dayClicked(date: any): void;
    addShift(event: any): void;
    removeShift(event: any): void;
    toggleAvailable(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgendaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgendaExample, "agenda-example", never, {}, {}, never, never, false, never>;
}

declare class AsideFormDemo implements OnInit {
    private ref;
    private formUtils;
    textControl: any;
    emailControl: any;
    numberControl: any;
    pickerControl: any;
    textForm: any;
    constructor(ref: NovoAsideRef, formUtils: FormUtils);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideFormDemo, "aside-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Aside Form Example
 */
declare class AsideFormExample {
    private aside;
    constructor(aside: NovoAsideService);
    showAside(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideFormExample, "aside-form-example", never, {}, {}, never, never, false, never>;
}

interface CustomParams {
    id: number;
    name: string;
}
declare class AsideCustomDemo {
    ref: NovoAsideRef<CustomParams, string>;
    values: {
        label: string;
        data: string;
    }[];
    constructor(ref: NovoAsideRef<CustomParams, string>);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideCustomDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideCustomDemo, "aside-custom-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Aside Usage Example
 */
declare class AsideUsageExample {
    private aside;
    constructor(aside: NovoAsideService);
    showAside(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideUsageExample, "aside-usage-example", never, {}, {}, never, never, false, never>;
}

interface ShiftData {
    id: number;
    startTime: string;
    endTime: string;
    numAssigned: number;
    openings: number;
}
/**
 * @title Autocomplete Stacked Chips
 */
declare class AutocompleteStackedChipsExample {
    filteredShifts: Observable<ShiftData[]>;
    allShifts: ShiftData[];
    searchCtrl: UntypedFormControl;
    shiftCtrl: UntypedFormControl;
    constructor();
    add(event: any): void;
    remove(shift: ShiftData): void;
    selected(event: NovoOptionSelectedEvent): void;
    compareById(o1: any, o2: any): boolean;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteStackedChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteStackedChipsExample, "autocomplete-stacked-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Autocomplete Usage
 */
declare class AutocompleteUsageExample implements OnInit {
    myControl: UntypedFormControl;
    options: string[];
    filteredOptions: Observable<string[]>;
    ngOnInit(): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteUsageExample, "autocomplete-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Autocomplete With Chips
 */
declare class AutocompleteWithChipsExample {
    visible: boolean;
    selectable: boolean;
    removable: boolean;
    separatorKeysCodes: number[];
    searchCtrl: UntypedFormControl;
    fieldCtrl: UntypedFormControl;
    filteredFruits: Observable<string[]>;
    allFruits: string[];
    chipInput: ElementRef<HTMLInputElement>;
    constructor();
    add(event: any): void;
    remove(fruit: string): void;
    selected(event: NovoOptionSelectedEvent): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteWithChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteWithChipsExample, "autocomplete-with-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Avatar Stack Usage
 */
declare class AvatarStackUsageExample {
    profiles: any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarStackUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarStackUsageExample, "avatar-stack-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Avatar Usage
 */
declare class AvatarUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarUsageExample, "avatar-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Breadcrumb Usage Example
 */
declare class BreadcrumbUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbUsageExample, "breadcrumb-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Dialogue buttons
 */
declare class ButtonDialogueExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDialogueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonDialogueExample, "button-dialogue-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Dynamic buttons
 */
declare class ButtonDynamicExample {
    theme: string;
    isChecked: boolean;
    negativeColor: string;
    color: string;
    changeTheme(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDynamicExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonDynamicExample, "button-dynamic-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic buttons
 */
declare class ButtonFabExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonFabExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonFabExample, "button-fab-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Icon buttons
 */
declare class ButtonIconExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonIconExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonIconExample, "button-icon-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Invers buttons
 */
declare class ButtonInverseExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonInverseExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonInverseExample, "button-inverse-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Loading buttons
 */
declare class ButtonLoadingExample {
    loading: boolean;
    loadingButtonText: string;
    fakeRequest(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonLoadingExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonLoadingExample, "button-loading-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic buttons
 */
declare class ButtonOverviewExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonOverviewExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonOverviewExample, "button-overview-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Primary buttons
 */
declare class ButtonPrimaryExample {
    negativeColor: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonPrimaryExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonPrimaryExample, "button-primary-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic buttons
 */
declare class ButtonSecondaryExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonSecondaryExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonSecondaryExample, "button-secondary-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic buttons
 */
declare class ButtonStandardExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonStandardExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonStandardExample, "button-standard-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Icon buttons
 */
declare class ButtonTwoIconExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonTwoIconExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonTwoIconExample, "button-two-icon-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Calendar Example
 */
declare class CalendarExample {
    activeDate: Date;
    selection: Date[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarExample, "calendar-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Time Example
 */
declare class TimeExample {
    time: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeExample, "time-example", never, {}, {}, never, never, false, never>;
}

interface MockData {
    id: number;
    embeddedObj: {
        id: number;
        test: string;
        another: {
            id: number;
        };
    };
    simpleEmbeddedObj: {
        id: number;
    };
    name: string;
    status: string;
    priority: string;
    enabled: boolean;
    date: Date;
    dateTime: Date;
    time: Date;
    money: number;
    percent: number;
    telephone: string;
    email: string;
    address: {
        city?: string;
        state?: string;
    };
    bigdecimal?: number;
    favoriteColor?: string;
}

/**
 * @title Configure Columns Modal Example
 */
declare class ConfigureColumnsModal {
    private modalRef;
    private params;
    columns: IDataTableColumn<MockData>;
    constructor(modalRef: NovoModalRef, params: NovoModalParams);
    close(): void;
    save(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigureColumnsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfigureColumnsModal, "configure-columns-modal-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Remote Data Table Example
 */
declare class DataTableRemoteExample {
    private ref;
    private modalService;
    dataSetOptions: any[];
    loadedDataSet: number;
    paginationTypeOptions: any[];
    loadedPaginationType: string;
    paginationPlacementOptions: any[];
    loadedPaginationPlacement: boolean;
    globalSearchOptions: any[];
    loadedGlobalSearch: boolean;
    sharedColumns: IDataTableColumn<MockData>[];
    sharedDisplayColumns: string[];
    sharedPaginationOptions: IDataTablePaginationOptions;
    widePaginationOptions: IDataTablePaginationOptions;
    sharedSearchOptions: IDataTableSearchOptions;
    sharedDefaultSort: {
        id: string;
        value: string;
    };
    globalSearchEnabled: boolean;
    refreshSubject: Subject<void>;
    remoteService: RemoteDataTableService<MockData>;
    private staticDataSet1;
    constructor(ref: ChangeDetectorRef, modalService: NovoModalService);
    getPriority(): string;
    getPriorityOptions(): any[];
    switchPaginationType(type: 'basic' | 'standard'): void;
    switchPaginationPlacement(onFooter: boolean): void;
    toggleGlobalSearch(toggle: boolean): void;
    log(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    checkDisabled(row: MockData): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    refresh(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableRemoteExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableRemoteExample, "data-table-remote-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Rows Data Table Example
 */
declare class DataTableRowsExample implements AfterViewInit {
    private ref;
    private modalService;
    table: NovoDataTable<MockData>;
    ngAfterViewInit(): void;
    dataSetOptions: any[];
    loadedDataSet: number;
    paginationTypeOptions: any[];
    paginationPlacementOptions: any[];
    loadedPaginationPlacement: boolean;
    selectionOptions: IDataTableSelectionOption[];
    loadedPaginationType: string;
    globalSearchOptions: any[];
    loadedGlobalSearch: boolean;
    customStatusColumnValue: string;
    customStatusColumnOptions: object[];
    retentionEnabled: boolean;
    sharedColumns: IDataTableColumn<MockData>[];
    sharedDisplayColumns: string[];
    sharedPaginationOptions: IDataTablePaginationOptions;
    widePaginationOptions: IDataTablePaginationOptions;
    sharedSearchOptions: IDataTableSearchOptions;
    sharedDefaultSort: {
        id: string;
        value: string;
    };
    globalSearchEnabled: boolean;
    refreshSubject: Subject<void>;
    basicRows: MockData[];
    private staticDataSet1;
    private staticDataSet2;
    private staticDataSet3;
    selectedRecordId: string;
    constructor(ref: ChangeDetectorRef, modalService: NovoModalService);
    getPriority(): string;
    getPriorityOptions(): any[];
    switchPaginationType(type: 'basic' | 'standard'): void;
    switchPaginationPlacement(onFooter: boolean): void;
    loadDataset(setIndex: number): void;
    toggleGlobalSearch(toggle: boolean): void;
    log(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    preview(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    checkDisabled(): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    resized(event: any): void;
    refresh(): void;
    toggleRowDetails(expand: boolean): void;
    filterList(value: any, field?: string): void;
    processCustomFilter(columnName: string): void;
    toggle(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableRowsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableRowsExample, "data-table-rows-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Data Table Service Example
 */
declare class DataTableServiceExample {
    private ref;
    private modalService;
    dataSetOptions: any[];
    loadedDataSet: number;
    paginationTypeOptions: any[];
    loadedPaginationType: string;
    paginationPlacementOptions: any[];
    loadedPaginationPlacement: boolean;
    globalSearchOptions: any[];
    loadedGlobalSearch: boolean;
    sharedColumns: IDataTableColumn<MockData>[];
    sharedDisplayColumns: string[];
    sharedPaginationOptions: IDataTablePaginationOptions;
    widePaginationOptions: IDataTablePaginationOptions;
    sharedSearchOptions: IDataTableSearchOptions;
    sharedDefaultSort: {
        id: string;
        value: string;
    };
    globalSearchEnabled: boolean;
    refreshSubject: Subject<void>;
    basicService: IDataTableService<MockData>;
    private staticDataSet1;
    private staticDataSet2;
    private staticDataSet3;
    constructor(ref: ChangeDetectorRef, modalService: NovoModalService);
    getPriority(): string;
    getPriorityOptions(): any[];
    switchPaginationType(type: 'basic' | 'standard'): void;
    switchPaginationPlacement(onFooter: boolean): void;
    loadDataset(setIndex: number): void;
    toggleGlobalSearch(toggle: boolean): void;
    log(event: {
        originalEvent: MouseEvent;
        row: MockData;
    }): void;
    checkDisabled(): boolean;
    configureColumns(): void;
    onPreferencesChanged(event: IDataTablePreferences): void;
    refresh(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableServiceExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTableServiceExample, "data-table-service-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Drop Down
 */
declare class BasicDropDownExample implements AfterContentInit {
    asyncItems: any[];
    clickMe(event?: string): void;
    ngAfterContentInit(): Promise<void>;
    getAsyncItems(): Promise<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicDropDownExample, "basic-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Custom Drop Down
 */
declare class CustomDropDownExample {
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDropDownExample, "custom-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Large Drop Down
 */
declare class LargeDropDownExample {
    MOCK_WORDS: string[];
    clickMe(data: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LargeDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LargeDropDownExample, "large-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Multi Drop Down
 */
declare class MultiDropDownExample {
    clickMe(data: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiDropDownExample, "multi-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Drop Down Positions
 */
declare class PositionDropDownExample {
    POSITION_OPTIONS: {
        name: string;
        description: string;
    }[];
    clickMe(data: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PositionDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PositionDropDownExample, "position-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Scrollable Drop Down
 */
declare class ScrollableDropDownExample {
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollableDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollableDropDownExample, "scrollable-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Scrollable Drop Down
 */
declare class ScrollToItemDropDownExample {
    selectedWord: string;
    MOCK_WORDS: string[];
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollToItemDropDownExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollToItemDropDownExample, "scroll-to-item-drop-down-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Field Anatomy Example
 */
declare class FieldAnatomyExample {
    hide: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldAnatomyExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldAnatomyExample, "field-anatomy-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Field Native Example
 */
declare class FieldNativeExample {
    appearance: string;
    direction: string;
    fullWidth: boolean;
    hide: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldNativeExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldNativeExample, "field-native-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Field Usage Example
 */
declare class FieldUsageExample {
    time: string;
    date: Date;
    datetime: Date;
    date2: any;
    daterange: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldUsageExample, "field-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Form Usage Example
 */
declare class FormUsageExample {
    options: UntypedFormGroup;
    numberControl: UntypedFormControl;
    timeControl: UntypedFormControl;
    dateControl: UntypedFormControl;
    dateTimeControl: UntypedFormControl;
    post: any;
    constructor(fb: UntypedFormBuilder);
    onSubmit(post: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormUsageExample, "form-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Icons
 */
declare class BasicIconsExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicIconsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicIconsExample, "basic-icons-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Raised Icons
 */
declare class RaisedIconsExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<RaisedIconsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RaisedIconsExample, "raised-icons-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Themed Icons
 */
declare class ThemedIconsExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemedIconsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ThemedIconsExample, "themed-icons-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Circular Loading Symbol
 */
declare class LoadingCircleExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingCircleExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingCircleExample, "loading-circle-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Linear Loading Symbol
 */
declare class LoadingLineExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingLineExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingLineExample, "loading-line-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Menu
 */
declare class BasicMenuExample {
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicMenuExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicMenuExample, "basic-menu-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Menu Context
 */
declare class MenuContextExample {
    apple: string;
    orange: string;
    isOrange: (item: any) => boolean;
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuContextExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuContextExample, "menu-context-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Nested Menu
 */
declare class NestedMenuExample {
    clickMe(event?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NestedMenuExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NestedMenuExample, "nested-menu-example", never, {}, {}, never, never, false, never>;
}

declare class ModalCustomDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalCustomDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalCustomDemo, "modal-custom-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Custom Modal Example
 */
declare class CustomModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomModalExample, "custom-modal-example", never, {}, {}, never, never, false, never>;
}

declare class ModalErrorDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalErrorDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalErrorDemo, "modal-error-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Error Modal Example
 */
declare class ErrorModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ErrorModalExample, "error-modal-example", never, {}, {}, never, never, false, never>;
}

declare class ModalAddFormDemo implements OnInit {
    private modalRef;
    private formUtils;
    textControl: any;
    emailControl: any;
    numberControl: any;
    pickerControl: any;
    textForm: any;
    constructor(modalRef: NovoModalRef, formUtils: FormUtils);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalAddFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalAddFormDemo, "modal-edit-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Modal Add Form Example
 */
declare class ModalAddFormExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalAddFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalAddFormExample, "modal-add-form-example", never, {}, {}, never, never, false, never>;
}

declare class ModalEditFormDemo implements OnInit {
    private modalRef;
    private formUtils;
    textControl: any;
    emailControl: any;
    numberControl: any;
    pickerControl: any;
    textForm: any;
    constructor(modalRef: NovoModalRef, formUtils: FormUtils);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalEditFormDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalEditFormDemo, "modal-edit-form-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Modal Edit Form Example
 */
declare class ModalEditFormExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalEditFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalEditFormExample, "modal-edit-form-example", never, {}, {}, never, never, false, never>;
}

declare class ModalSuccessDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalSuccessDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalSuccessDemo, "modal-success-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Success Modal Example
 */
declare class SuccessModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SuccessModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SuccessModalExample, "success-modal-example", never, {}, {}, never, never, false, never>;
}

declare class ModalWarningDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef);
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalWarningDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalWarningDemo, "modal-warning-demo", never, {}, {}, never, never, false, never>;
}
/**
 * @title Warning Modal Example
 */
declare class WarningModalExample {
    private modalService;
    constructor(modalService: NovoModalService);
    showModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WarningModalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WarningModalExample, "warning-modal-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Non Ideal State Usage
 */
declare class NonIdealStateUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateUsageExample, "non-ideal-state-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOver with Automatic Positioning Example
 */
declare class PopOverAutoPlacementExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverAutoPlacementExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverAutoPlacementExample, "pop-over-auto-placement-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOver Behaviors Example
 */
declare class PopOverBehaviorsExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverBehaviorsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverBehaviorsExample, "pop-over-behaviors-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOver with Dynamic HTML Template Example
 */
declare class PopOverDynamicExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverDynamicExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverDynamicExample, "pop-over-dynamic-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOvers with Horizontal Positioning
 */
declare class PopOverHorizontalExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverHorizontalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverHorizontalExample, "pop-over-horizontal-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOver Placement Example
 */
declare class PopOverPlacementExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverPlacementExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverPlacementExample, "pop-over-placement-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title PopOvers with Vertical Positioning
 */
declare class PopOverVerticalExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PopOverVerticalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopOverVerticalExample, "pop-over-vertical-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Radial Progress Bars Usage
 */
declare class ProgressBarRadialUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressBarRadialUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressBarRadialUsageExample, "progress-bar-radial-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Progress Bar Usage
 */
declare class ProgressBarUsageExample {
    largeTooltip: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressBarUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressBarUsageExample, "progess-bar-usage-example", never, {}, {}, never, never, false, never>;
}

declare class DeleteFilterModalDemo {
    private modalRef;
    constructor(modalRef: NovoModalRef$1);
    confirm(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteFilterModalDemo, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteFilterModalDemo, "delete-filter-modal-demo", never, {}, {}, never, never, false, never>;
}
declare class CustomPickerConditionDef extends AbstractConditionFieldDef implements OnInit {
    defaultOperator: Operator;
    searchCtrl: UntypedFormControl;
    /** list of results filtered by search keyword */
    remoteResults: ReplaySubject<any[]>;
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy: Subject<void>;
    http: HttpClient;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPickerConditionDef, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPickerConditionDef, "custom-picker-condition-def", never, {}, {}, never, never, false, never>;
}
/**
 * @title Just Criteria Example
 */
declare class JustCriteriaExample implements OnInit {
    private formBuilder;
    private cdr;
    criteriaBuilder: i0.Signal<CriteriaBuilderComponent>;
    queryForm: AbstractControl;
    config: any;
    and: Conjunction[];
    andOr: Conjunction[];
    andOrNot: Conjunction[];
    addressConfig: AddressCriteriaConfig;
    addressRadiusEnabled: boolean;
    addressRadiusEnabledOptions: {
        label: string;
        value: boolean;
    }[];
    useNoteMeta: boolean;
    useNoteMetaOptions: {
        label: string;
        value: boolean;
    }[];
    hideFirstOperator: boolean;
    hideFirstOperatorOptions: {
        label: string;
        value: boolean;
    }[];
    canBeEmpty: boolean;
    canBeEmptyOptions: {
        label: string;
        value: boolean;
    }[];
    editTypeFn: (field: any) => any;
    private modalService;
    constructor(formBuilder: UntypedFormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    getFieldConfig(useNoteMeta: boolean): Promise<{
        value: string;
        entity: string;
        label: string;
        options: ({
            name: string;
            type: string;
            dataType: string;
            label: string;
            optional: boolean;
            dataSpecialization?: undefined;
            confidential?: undefined;
            required?: undefined;
            readOnly?: undefined;
            multiValue?: undefined;
            hideFromSearch?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            systemRequired?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                optional: boolean;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                defaultValue: number;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                maxLength?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                options: {
                    value: string;
                    label: string;
                }[];
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                defaultValue?: undefined;
            })[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            hasBeginsWith: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsUrl?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    options: {
                        value: string;
                        label: string;
                    }[];
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    inputType?: undefined;
                    options?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: number;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName: string;
                tabName: string;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            allowCustomFilterValues: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            }[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: number;
                label: string;
            }[];
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: boolean;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified?: undefined;
                fields?: undefined;
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        })[] | ({
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: number;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    label: string;
                    maxLength?: undefined;
                    confidential?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
            };
            dataType?: undefined;
            maxLength?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            maxLength?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
        })[];
        find: (name: string) => {
            name: string;
            type: string;
            dataType: string;
            label: string;
            optional: boolean;
            dataSpecialization?: undefined;
            confidential?: undefined;
            required?: undefined;
            readOnly?: undefined;
            multiValue?: undefined;
            hideFromSearch?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            systemRequired?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                optional: boolean;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                defaultValue: number;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                maxLength?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                options: {
                    value: string;
                    label: string;
                }[];
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                defaultValue?: undefined;
            })[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            hasBeginsWith: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsUrl?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    options: {
                        value: string;
                        label: string;
                    }[];
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    inputType?: undefined;
                    options?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: number;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName: string;
                tabName: string;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            allowCustomFilterValues: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            }[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: number;
                label: string;
            }[];
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: boolean;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified?: undefined;
                fields?: undefined;
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: number;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    label: string;
                    maxLength?: undefined;
                    confidential?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
            };
            dataType?: undefined;
            maxLength?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            maxLength?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
        };
        search: (term: string) => ({
            name: string;
            type: string;
            dataType: string;
            label: string;
            optional: boolean;
            dataSpecialization?: undefined;
            confidential?: undefined;
            required?: undefined;
            readOnly?: undefined;
            multiValue?: undefined;
            hideFromSearch?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            systemRequired?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                optional: boolean;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                inputType?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                defaultValue?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                defaultValue: number;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                maxLength?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                optionsType: string;
                optionsUrl: string;
                options: {
                    value: string;
                    label: string;
                }[];
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                defaultValue?: undefined;
            })[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            hasBeginsWith: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsUrl?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    options: {
                        value: string;
                        label: string;
                    }[];
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    inputType?: undefined;
                    options?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                    inputType?: undefined;
                    options?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: number;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                }[];
                staticTemplateName: string;
                tabName: string;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            allowCustomFilterValues: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            defaultValue?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    associatedEntity: {
                        entity: string;
                        entityMetaUrl: string;
                        label: string;
                        dateLastModified: string;
                        fields: ({
                            name: string;
                            type: string;
                            dataType: string;
                            optional: boolean;
                            maxLength?: undefined;
                            confidential?: undefined;
                            label?: undefined;
                            required?: undefined;
                            readOnly?: undefined;
                            multiValue?: undefined;
                            hideFromSearch?: undefined;
                            sortOrder?: undefined;
                            hint?: undefined;
                            description?: undefined;
                            systemRequired?: undefined;
                            shouldAddCustomEntityLabel?: undefined;
                        } | {
                            name: string;
                            type: string;
                            dataType: string;
                            maxLength: number;
                            confidential: boolean;
                            optional: boolean;
                            label: string;
                            required: boolean;
                            readOnly: boolean;
                            multiValue: boolean;
                            hideFromSearch: boolean;
                            sortOrder: number;
                            hint: string;
                            description: string;
                            systemRequired: boolean;
                            shouldAddCustomEntityLabel: boolean;
                        })[];
                    };
                    dataType?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                    fields?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        dataSpecialization: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        inputType: string;
                        optionsType: string;
                        optionsUrl: string;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                        maxLength?: undefined;
                        dataSpecialization?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        optional: boolean;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                        dataSpecialization?: undefined;
                        inputType?: undefined;
                        optionsType?: undefined;
                        optionsUrl?: undefined;
                    })[];
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                    associatedEntity?: undefined;
                    maxLength?: undefined;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            dataSpecialization?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields: {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            }[];
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: string;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    dataSpecialization?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            options: {
                value: number;
                label: string;
            }[];
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            maxLength?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: boolean;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            dataSpecialization?: undefined;
            fields?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            hasBeginsWith?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified?: undefined;
                fields?: undefined;
                staticTemplateName?: undefined;
                tabName?: undefined;
            };
            dataType?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            fields?: undefined;
            hasBeginsWith?: undefined;
            inputType?: undefined;
            options?: undefined;
            maxLength?: undefined;
            defaultValue?: undefined;
            allowCustomFilterValues?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            options: {
                value: string;
                label: string;
            }[];
            defaultValue: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            associatedEntity: {
                entity: string;
                entityMetaUrl: string;
                label: string;
                dateLastModified: number;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    label: string;
                    maxLength?: undefined;
                    confidential?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                })[];
            };
            dataType?: undefined;
            maxLength?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            dataSpecialization?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: number;
            description: number;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            maxLength?: undefined;
            inputType?: undefined;
            options?: undefined;
            defaultValue?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            associatedEntity?: undefined;
        })[];
    }[]>;
    setFieldConfig(useNoteMeta: boolean): void;
    private createWarnOnDeleteFn;
    prepopulateForm(addAdditionalScope?: boolean): void;
    resetQueryForm(addAdditionalScope?: boolean): void;
    setQueryForm(criteria?: any): void;
    onSubmit(): void;
    resetGroups(): void;
    addressRadiusEnabledChanged(enabled: boolean): void;
    addressRadiusUnitsSelected(units: AddressRadiusUnitsName): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JustCriteriaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JustCriteriaExample, "just-criteria-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Search Box Usage
 */
declare class SearchUsageExample {
    test: string;
    geo: any;
    entity: string;
    searchResults: Subject<any[]>;
    searchData: any[];
    search(term: string): void;
    onSelectMatch(item: any): void;
    onSelectEntity(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchUsageExample, "search-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Slide Example
 */
declare class BasicSlideExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicSlideExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicSlideExample, "basic-slide-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Switch Usage Example
 */
declare class SwitchUsageExample {
    toggleCount: number;
    checked: boolean;
    increment(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SwitchUsageExample, "switch-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Basic Example
 */
declare class TabbedGroupPickerNoSelectionExample {
    getActions: () => {
        actionId: number;
        name: string;
    }[];
    actionsTab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            actionId: number;
            name: string;
        }[];
    };
    example_tab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            actionId: number;
            name: string;
        }[];
    }[];
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    lastSelection: string;
    onActivation(selectedData: {
        actionId: number;
        name: string;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerNoSelectionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerNoSelectionExample, "tabbed-group-picker-no-selection-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Basic Example
 */
declare class TabbedGroupPickerBasicExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    getPlaces: () => {
        localName: string;
        englishName: string;
    }[];
    getColors: () => {
        rgb: string;
        colorName: string;
    }[];
    animalTab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    };
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            localName: string;
            englishName: string;
        }[];
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            rgb: string;
            colorName: string;
        }[];
    })[];
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    selectedPlaces: string[];
    selectedColors: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerBasicExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerBasicExample, "tabbed-group-picker-basic-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Big Groups Example
 */
declare class TabbedGroupPickerBigGroupsExample {
    isPrime(number: any): boolean;
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            value: number;
            label: string;
        }[];
        childTypeName?: undefined;
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        childTypeName: string;
        data: {
            v: number;
            l: string;
            children: {
                value: number;
                label: string;
            }[];
        }[];
    })[];
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedPrimeFactorizations: string[];
    selectedDivisibles: string[];
    selectedIntegers: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerBigGroupsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerBigGroupsExample, "tabbed-group-picker-big-groups-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Footer Example
 */
declare class TabbedGroupPickerFooterExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    getAnimalCategories: () => {
        groupId: number;
        name: string;
        children?: {
            animalId: number;
            name: string;
        }[];
    }[];
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
        childTypeName?: undefined;
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        childTypeName: string;
        data: {
            groupId: number;
            name: string;
            children?: {
                animalId: number;
                name: string;
            }[];
        }[];
    })[];
    example_quickSelectConfig: {
        label: string;
        items: ({
            childTypeName: string;
            children: number[];
            label: string;
            all?: undefined;
        } | {
            childTypeName: string;
            all: boolean;
            label: string;
            children?: undefined;
        })[];
    };
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    selectedAnimalCategories: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    onCancelChange([animalsTab, animalCategoriesTab]: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerFooterExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerFooterExample, "tabbed-group-picker-footer-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Groups Example
 */
declare class TabbedGroupPickerGroupsExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    getAnimalCategories: () => {
        groupId: number;
        name: string;
        children?: {
            animalId: number;
            name: string;
        }[];
    }[];
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
        childTypeName?: undefined;
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        childTypeName: string;
        data: {
            groupId: number;
            name: string;
            children?: {
                animalId: number;
                name: string;
            }[];
        }[];
    })[];
    example_quickSelectConfig: {
        label: string;
        items: ({
            childTypeName: string;
            children: number[];
            label: string;
            all?: undefined;
        } | {
            childTypeName: string;
            all: boolean;
            label: string;
            children?: undefined;
        })[];
    };
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    selectedAnimalCategories: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerGroupsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerGroupsExample, "tabbed-group-picker-groups-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabbed Group Picker - Quick Select Example
 */
declare class TabbedGroupPickerQuickSelectExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    example_tab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    }[];
    example_quickSelectConfig: {
        label: string;
        items: ({
            childTypeName: string;
            children: number[];
            label: string;
            all?: undefined;
        } | {
            childTypeName: string;
            all: boolean;
            label: string;
            children?: undefined;
        })[];
    };
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerQuickSelectExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerQuickSelectExample, "tabbed-group-picker-quick-select-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Tip Well Example
 */
declare class BasicTipWellExample {
    demoTip: string;
    clearLocalStorage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicTipWellExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicTipWellExample, "basic-tip-well-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tip Well with No Button Example
 */
declare class ButtonlessTipWellExample {
    demoTip: string;
    clearLocalStorage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonlessTipWellExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonlessTipWellExample, "buttonless-tip-well-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tip Well with HTML Example
 */
declare class HtmlTipWellExample {
    demoHtmlTip: string;
    clearLocalStorage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HtmlTipWellExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HtmlTipWellExample, "html-tip-well-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tip Well with Icon Example
 */
declare class IconTipWellExample {
    demoTip: string;
    clearLocalStorage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconTipWellExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconTipWellExample, "icon-tip-well-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Toaster Actions Usage
 */
declare class ToastActionsExample {
    private toaster;
    options: any;
    constructor(toaster: NovoToastService);
    toastToggled(arg: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastActionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastActionsExample, "toast-actions-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Toast Options Example
 */
declare class ToastOptionsExample {
    activeDate: Date;
    selection: Date[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastOptionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastOptionsExample, "toast-options-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Toaster Service Usage
 */
declare class ToastServiceExample {
    private toaster;
    options: any;
    constructor(toaster: NovoToastService);
    toastToggled(arg: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastServiceExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastServiceExample, "toast-service-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Static Toast Usage
 */
declare class ToastUsageExample {
    themes: Array<string>;
    icons: Array<string>;
    toast: any;
    changeToast(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastUsageExample, "toast-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Toolbar Example
 */
declare class BasicToolbarExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicToolbarExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicToolbarExample, "basic-toolbar-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Multi Row Toolbar
 */
declare class MultiRowToolbarExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiRowToolbarExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiRowToolbarExample, "multi-row-toolbar-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Align Example
 */
declare class TooltipAlignExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipAlignExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipAlignExample, "tooltip-align-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Options Example
 */
declare class TooltipOptionsExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipOptionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipOptionsExample, "tooltip-options-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Placement Example
 */
declare class TooltipPlacementExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipPlacementExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipPlacementExample, "tooltip-placement-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Sizes Example
 */
declare class TooltipSizesExample {
    mediumTooltip: string;
    largeTooltip: string;
    extraLargeTooltip: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipSizesExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipSizesExample, "tooltip-sizes-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Toggle Example
 */
declare class TooltipToggleExample {
    tooltipActive: boolean;
    toggleTooltip(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipToggleExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipToggleExample, "tooltip-toggle-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Types Example
 */
declare class TooltipTypesExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipTypesExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipTypesExample, "tooltip-types-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Analytics Colors
 */
declare class AnalyticsColorsExample {
    private toaster;
    analyticsColors: any[];
    options: any;
    constructor(toaster: NovoToastService);
    copyLink(color: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalyticsColorsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnalyticsColorsExample, "analytics-colors-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Entity Colors
 */
declare class EntityColorsExample {
    private toaster;
    entityColors: any[];
    options: any;
    constructor(toaster: NovoToastService);
    copyLink(color: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityColorsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityColorsExample, "entity-colors-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Primary Colors
 */
declare class PrimaryColorsExample {
    private toaster;
    primaryColors: any[];
    options: any;
    constructor(toaster: NovoToastService);
    copyLink(color: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimaryColorsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PrimaryColorsExample, "primary-colors-example", never, {}, {}, never, never, false, never>;
}

declare const primaryColors: Array<any>;
declare const entityColors: Array<any>;
declare const analyticsColors: Array<any>;
declare const allColors: Array<any>;

/**
 * @title Security Example
 */
declare class SecurityExample {
    private security;
    perms: any[];
    constructor(security: Security);
    shufflePermissions(): void;
    shuffle(array: string[]): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SecurityExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SecurityExample, "security-example", never, {}, {}, never, never, false, never>;
}

declare class CustomQuickNoteResults extends QuickNoteResults {
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomQuickNoteResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomQuickNoteResults, "custom-quick-note-results", never, {}, {}, never, never, false, never>;
}
/**
 * @title Custom Quick Note Results Example
 */
declare class CustomQuickNoteResultsExample {
    note: any;
    placeholder: string;
    customResults: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomQuickNoteResultsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomQuickNoteResultsExample, "custom-quick-note-results-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Required Example
 */
declare class FiRequiredExample {
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiRequiredExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiRequiredExample, "fi-required-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Header Example
 */
declare class RecordHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    record: any;
    values: any[];
    tabs: string[];
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    refresh(): void;
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RecordHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RecordHeaderExample, "record-header-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Details Card Example
 */
declare class DetailsCardExample {
    private toaster;
    theme: string;
    icon: string;
    record: any;
    values: any[];
    tabs: string[];
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    refresh(): void;
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DetailsCardExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DetailsCardExample, "details-card-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Stepper w/ Vertical Layout
 */
declare class StepperVerticalExample implements OnInit {
    private _formBuilder;
    isLinear: boolean;
    firstFormGroup: UntypedFormGroup;
    secondFormGroup: UntypedFormGroup;
    constructor(_formBuilder: UntypedFormBuilder);
    ngOnInit(): void;
    next(stepper: NovoVerticalStepper, step: NovoStep): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperVerticalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperVerticalExample, "stepper-vertical-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Stepper Component
 */
declare class StepperHorizontalExample implements OnInit {
    private _formBuilder;
    isLinear: boolean;
    firstFormGroup: UntypedFormGroup;
    secondFormGroup: UntypedFormGroup;
    constructor(_formBuilder: UntypedFormBuilder);
    ngOnInit(): void;
    next(stepper: NovoHorizontalStepper, step: NovoStep): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperHorizontalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperHorizontalExample, "stepper-horizontal-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Header with Subtitle Example
 */
declare class HeaderSubtitleExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderSubtitleExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderSubtitleExample, "header-subtitle-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Header with SearchBar Example
 */
declare class HeaderSearchbarExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    isChecked: boolean;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderSearchbarExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderSearchbarExample, "header-searchbar-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Condensed Header Example
 */
declare class CondensedHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    options: any;
    themeIndex: number;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CondensedHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CondensedHeaderExample, "condensed-header-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Header Example
 */
declare class BasicHeaderExample {
    private toaster;
    theme: string;
    icon: string;
    private options;
    private themeIndex;
    constructor(toaster: NovoToastService);
    changeTheme(): void;
    catchEv(type: any, ev: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicHeaderExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicHeaderExample, "basic-header-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Card With Image
 */
declare class CardWithImageExample {
    private toaster;
    refresh: boolean;
    close: boolean;
    move: boolean;
    padding: boolean;
    loading: boolean;
    start: number;
    end: number;
    created: number;
    bestLabel: string;
    bestTime: string;
    bestDay: string;
    message: string;
    messageIcon: string;
    donutValue: number;
    donutColor: string;
    donutLabel: string;
    constructor(toaster: NovoToastService);
    onClose(): void;
    onRefresh(): void;
    toggleLoading(): void;
    toggleMessage(): void;
    singleAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardWithImageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardWithImageExample, "card-with-image-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Full Configuration Cards
 */
declare class CardConfigExample {
    private toaster;
    refresh: boolean;
    close: boolean;
    move: boolean;
    padding: boolean;
    loading: boolean;
    fullConfig: any;
    start: number;
    end: number;
    created: number;
    bestLabel: string;
    bestTime: string;
    bestDay: string;
    message: string;
    messageIcon: string;
    donutValue: number;
    donutColor: string;
    donutLabel: string;
    constructor(toaster: NovoToastService);
    onClose(): void;
    onRefresh(): void;
    toggleLoading(): void;
    toggleMessage(): void;
    toggleLoadingConfig(): void;
    toggleMessageConfig(): void;
    singleAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardConfigExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardConfigExample, "card-config-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Cards
 */
declare class BasicCardExample {
    private toaster;
    refresh: boolean;
    close: boolean;
    move: boolean;
    padding: boolean;
    loading: boolean;
    start: number;
    end: number;
    created: number;
    bestLabel: string;
    bestTime: string;
    bestDay: string;
    message: string;
    messageIcon: string;
    donutValue: number;
    donutColor: string;
    donutLabel: string;
    constructor(toaster: NovoToastService);
    onClose(): void;
    onRefresh(): void;
    toggleLoading(): void;
    toggleMessage(): void;
    singleAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicCardExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicCardExample, "basic-card-example", never, {}, {}, never, never, false, never>;
}

declare class CustomPickerResults extends PickerResults {
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPickerResults, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPickerResults, "custom-picker-results", never, {}, {}, never, never, false, never>;
}
/**
 * @title Custom Picker Results Example
 */
declare class CustomPickerResultsExample {
    placeholder: string;
    custom: any;
    value: string;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPickerResultsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPickerResultsExample, "custom-picker-results-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Vertical Options Example
 */
declare class VerticalOptionsExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<VerticalOptionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VerticalOptionsExample, "vertical-options-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Vertical Example
 */
declare class VerticalExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<VerticalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VerticalExample, "vertical-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Horizontal Options Example
 */
declare class HorizontalOptionsExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<HorizontalOptionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HorizontalOptionsExample, "horizontal-options-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Horizontal Example
 */
declare class HorizontalExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<HorizontalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HorizontalExample, "horizontal-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Custom Template Example
 */
declare class CustomTemplateExample {
    private formUtils;
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    initialValue: {}[];
    initValue: {}[];
    simpleAddConfig: NovoControlGroupAddConfig;
    anotherAddConfig: NovoControlGroupAddConfig;
    emptyMessage: string;
    canEditFunction: Function;
    canRemoveFunction: Function;
    constructor(formUtils: FormUtils);
    onRemove(value: any): void;
    onEdit(value: any): void;
    canEdit(value: any, index: number): boolean;
    canRemove(value: any, index: number): index is 0;
    updateInitialValue(): void;
    customDelete(form: NovoFormGroup, key: string, index: number): void;
    customEdit(form: NovoFormGroup, key: string, index: number): void;
    private setupGroupedFormDemo;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTemplateExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTemplateExample, "custom-template-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Text Based Controls Example
 */
declare class TextBasedControlsExample {
    private formUtils;
    quickNoteConfig: any;
    textControl: any;
    textMaskControl: any;
    emailControl: any;
    numberControl: any;
    currencyControl: any;
    aceEditorControl: any;
    floatControl: any;
    percentageControl: any;
    quickNoteControl: any;
    textAreaControl: any;
    textForm: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<TextBasedControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextBasedControlsExample, "text-based-controls-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Picker Controls Example
 */
declare class PickerControlsExample {
    private formUtils;
    singlePickerControl: any;
    multiPickerControl: any;
    multiPickerWithCustomTextControl: any;
    multiPickerControlWithMaxlength: any;
    multiPickerControlWithMaxlengthAndPreselects: any;
    entityMultiPickerControl: any;
    rowMultiPickerControl: any;
    rowMultiPickerControlWithMaxlength: any;
    textPickerWithGetLabels: any;
    pickerForm: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<PickerControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickerControlsExample, "picker-controls-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title File Input Controls Example
 */
declare class FileInputControlsExample {
    private formUtils;
    fileControl: any;
    multiFileControl: any;
    multiFileControlMixRemove: FileControl;
    fileForm: any;
    message: string;
    customValidationFileControl: FileControl;
    customValidationFileForm: NovoFormGroup;
    constructor(formUtils: FormUtils);
    handleEdit(file: any): void;
    handleSave(file: any): void;
    handleDelete(file: any): void;
    handleUpload(files: any): void;
    checkFileSize(fileList: any): boolean;
    clearFileLists(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileInputControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileInputControlsExample, "file-input-controls-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Check Box Controls Example
 */
declare class CheckBoxControlsExample {
    private formUtils;
    checkControl: any;
    checkListControl: any;
    tilesControl: any;
    disabledTilesControl: any;
    switchControl: any;
    checkForm: any;
    constructor(formUtils: FormUtils);
    onChange(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckBoxControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckBoxControlsExample, "check-box-controls-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Calendar Input Controls Example
 */
declare class CalendarInputControlsExample {
    private formUtils;
    dateControl: any;
    userDefinedDateControl: DateControl;
    timeControl: any;
    dateTimeControl: any;
    timezoneControl: any;
    calendarForm: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarInputControlsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarInputControlsExample, "calendar-input-controls-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Address Control Example
 */
declare class AddressControlExample {
    private formUtils;
    addressControl: any;
    secondaryAddressControl: any;
    addressForm: any;
    addressFormControls: any;
    states: any[];
    constructor(formUtils: FormUtils);
    getStateOptions(filter: string, countryID: number): any[];
    getStateLabel(value: number): string;
    getCountryOptions(filter?: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressControlExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressControlExample, "address-control-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Vertical Dynamic Form Example
 */
declare class VerticalDynamicFormExample {
    private formUtils;
    dynamicVertical: any;
    dynamicVerticalForm: any;
    fieldsets: Array<any>;
    fieldsetsForm: any;
    constructor(formUtils: FormUtils);
    save(form: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VerticalDynamicFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VerticalDynamicFormExample, "vertical-dynamic-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Updating Form Example
 */
declare class UpdatingFormExample {
    private formUtils;
    textControl: any;
    percentageControl: any;
    checkControl: any;
    fileControl: any;
    singlePickerControl: any;
    updatingForm: any;
    updatingFormControls: any[];
    required: boolean;
    disabled: boolean;
    constructor(formUtils: FormUtils);
    toggleEnabled(): void;
    toggleRequired(): void;
    markAsInvalid(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdatingFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdatingFormExample, "updating-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Dynamic Form Field Sets Example
 */
declare class DynamicFormFieldSetsExample {
    private formUtils;
    fieldsets: Array<any>;
    fieldsetsForm: any;
    constructor(formUtils: FormUtils);
    save(form: any): void;
    clear(): void;
    onChange(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormFieldSetsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormFieldSetsExample, "dynamic-form-field-sets-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Dynamic Form Example
 */
declare class DynamicFormExample {
    private formUtils;
    dynamic: any;
    dynamicForm: any;
    constructor(formUtils: FormUtils);
    save(form: any): void;
    clear(): void;
    onChange(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormExample, "dynamic-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Disabled Form Example
 */
declare class DisabledFormExample {
    private formUtils;
    disabledControls: any;
    disabledQuickNote: any;
    disabledForm: any;
    disabledNote: any;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    note: string;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<DisabledFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DisabledFormExample, "disabled-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date picker limits Example
 */
declare class DatePickerLimitsExample {
    private formUtils;
    startDate: Date;
    endDate: Date;
    tooltip: String;
    initValue: {}[];
    formGroup: NovoFormGroup;
    controls: BaseControl[];
    constructor(formUtils: FormUtils);
    updateInitialValue(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerLimitsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerLimitsExample, "date-picker-limits-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Iconset
 */
declare class IconsetExample {
    private toaster;
    icons: unknown[];
    options: any;
    constructor(toaster: NovoToastService);
    copyLink(icon: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconsetExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconsetExample, "iconset-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Single Field Criteria Example
 */
declare class SingleFieldCriteriaExample implements OnInit {
    private formBuilder;
    private cdr;
    criteriaBuilder: CriteriaBuilderComponent;
    queryForm: AbstractControl;
    config: QueryBuilderConfig | null;
    mockMetaFields: ({
        name: string;
        type: string;
        dataType: string;
        label: string;
        optional: boolean;
        dataSpecialization?: undefined;
        confidential?: undefined;
        required?: undefined;
        readOnly?: undefined;
        multiValue?: undefined;
        hideFromSearch?: undefined;
        sortOrder?: undefined;
        hint?: undefined;
        description?: undefined;
        systemRequired?: undefined;
        shouldAddCustomEntityLabel?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields: ({
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            inputType?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            defaultValue?: undefined;
            options?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            optional: boolean;
            confidential?: undefined;
            label?: undefined;
            required?: undefined;
            readOnly?: undefined;
            multiValue?: undefined;
            hideFromSearch?: undefined;
            sortOrder?: undefined;
            hint?: undefined;
            description?: undefined;
            systemRequired?: undefined;
            shouldAddCustomEntityLabel?: undefined;
            inputType?: undefined;
            optionsType?: undefined;
            optionsUrl?: undefined;
            defaultValue?: undefined;
            options?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            defaultValue: number;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            maxLength?: undefined;
            options?: undefined;
        } | {
            name: string;
            type: string;
            dataType: string;
            maxLength: number;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            inputType: string;
            optionsType: string;
            optionsUrl: string;
            options: {
                value: string;
                label: string;
            }[];
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
            defaultValue?: undefined;
        })[];
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                dataSpecialization?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                optionsType: string;
                optionsUrl: string;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                associatedEntity: {
                    entity: string;
                    entityMetaUrl: string;
                    label: string;
                    dateLastModified: string;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    })[];
                };
                dataType?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                dataSpecialization?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    optional: boolean;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                })[];
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        hasBeginsWith: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: {
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
            }[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        fields?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        optionsType: string;
        options: {
            value: string;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsUrl?: undefined;
        hasBeginsWith?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                inputType?: undefined;
                options?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                dataSpecialization?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                inputType: string;
                options: {
                    value: string;
                    label: string;
                }[];
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                dataSpecialization?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                inputType?: undefined;
                options?: undefined;
                dataSpecialization?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                maxLength?: undefined;
                inputType?: undefined;
                options?: undefined;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        sortOrder?: undefined;
        hint?: undefined;
        description?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        optionsType: string;
        optionsUrl: string;
        options: {
            value: string;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        options?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        options?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        options: {
            value: number;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: {
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
            }[];
            staticTemplateName: string;
            tabName: string;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        sortOrder?: undefined;
        hint?: undefined;
        description?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        options: {
            value: string;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        defaultValue: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        options: {
            value: string;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        allowCustomFilterValues: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        options: {
            value: string;
            label: string;
        }[];
        defaultValue: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        options: {
            value: string;
            label: string;
        }[];
        defaultValue: string[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        defaultValue: number;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        defaultValue: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            } | {
                name: string;
                type: string;
                dataType: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                maxLength?: undefined;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                dataSpecialization?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                optionsType: string;
                optionsUrl: string;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                associatedEntity: {
                    entity: string;
                    entityMetaUrl: string;
                    label: string;
                    dateLastModified: string;
                    fields: ({
                        name: string;
                        type: string;
                        dataType: string;
                        optional: boolean;
                        maxLength?: undefined;
                        confidential?: undefined;
                        label?: undefined;
                        required?: undefined;
                        readOnly?: undefined;
                        multiValue?: undefined;
                        hideFromSearch?: undefined;
                        sortOrder?: undefined;
                        hint?: undefined;
                        description?: undefined;
                        systemRequired?: undefined;
                        shouldAddCustomEntityLabel?: undefined;
                    } | {
                        name: string;
                        type: string;
                        dataType: string;
                        maxLength: number;
                        confidential: boolean;
                        optional: boolean;
                        label: string;
                        required: boolean;
                        readOnly: boolean;
                        multiValue: boolean;
                        hideFromSearch: boolean;
                        sortOrder: number;
                        hint: string;
                        description: string;
                        systemRequired: boolean;
                        shouldAddCustomEntityLabel: boolean;
                    })[];
                };
                dataType?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                dataSpecialization?: undefined;
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
                fields: ({
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    dataSpecialization: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    confidential: boolean;
                    optional: boolean;
                    label: string;
                    required: boolean;
                    readOnly: boolean;
                    multiValue: boolean;
                    inputType: string;
                    optionsType: string;
                    optionsUrl: string;
                    hideFromSearch: boolean;
                    sortOrder: number;
                    hint: string;
                    description: string;
                    systemRequired: boolean;
                    shouldAddCustomEntityLabel: boolean;
                    maxLength?: undefined;
                    dataSpecialization?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    maxLength: number;
                    optional: boolean;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                } | {
                    name: string;
                    type: string;
                    dataType: string;
                    optional: boolean;
                    maxLength?: undefined;
                    confidential?: undefined;
                    label?: undefined;
                    required?: undefined;
                    readOnly?: undefined;
                    multiValue?: undefined;
                    hideFromSearch?: undefined;
                    sortOrder?: undefined;
                    hint?: undefined;
                    description?: undefined;
                    systemRequired?: undefined;
                    shouldAddCustomEntityLabel?: undefined;
                    dataSpecialization?: undefined;
                    inputType?: undefined;
                    optionsType?: undefined;
                    optionsUrl?: undefined;
                })[];
                optionsType?: undefined;
                optionsUrl?: undefined;
                associatedEntity?: undefined;
                maxLength?: undefined;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        dataSpecialization?: undefined;
        sortOrder?: undefined;
        hint?: undefined;
        description?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields: {
            name: string;
            type: string;
            dataType: string;
            dataSpecialization: string;
            confidential: boolean;
            optional: boolean;
            label: string;
            required: boolean;
            readOnly: boolean;
            multiValue: boolean;
            hideFromSearch: boolean;
            sortOrder: number;
            hint: string;
            description: string;
            systemRequired: boolean;
            shouldAddCustomEntityLabel: boolean;
        }[];
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        maxLength: number;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        options: {
            value: string;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified: string;
            fields: ({
                name: string;
                type: string;
                dataType: string;
                optional: boolean;
                maxLength?: undefined;
                dataSpecialization?: undefined;
                confidential?: undefined;
                label?: undefined;
                required?: undefined;
                readOnly?: undefined;
                multiValue?: undefined;
                hideFromSearch?: undefined;
                sortOrder?: undefined;
                hint?: undefined;
                description?: undefined;
                systemRequired?: undefined;
                shouldAddCustomEntityLabel?: undefined;
            } | {
                name: string;
                type: string;
                dataType: string;
                maxLength: number;
                dataSpecialization: string;
                confidential: boolean;
                optional: boolean;
                label: string;
                required: boolean;
                readOnly: boolean;
                multiValue: boolean;
                hideFromSearch: boolean;
                sortOrder: number;
                hint: string;
                description: string;
                systemRequired: boolean;
                shouldAddCustomEntityLabel: boolean;
            })[];
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        options: {
            value: number;
            label: string;
        }[];
        defaultValue: number;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        maxLength?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataType: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        inputType: string;
        options: {
            value: boolean;
            label: string;
        }[];
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        shouldAddCustomEntityLabel: boolean;
        dataSpecialization?: undefined;
        fields?: undefined;
        optionsType?: undefined;
        optionsUrl?: undefined;
        associatedEntity?: undefined;
        hasBeginsWith?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    } | {
        name: string;
        type: string;
        dataSpecialization: string;
        confidential: boolean;
        optional: boolean;
        label: string;
        required: boolean;
        readOnly: boolean;
        multiValue: boolean;
        optionsType: string;
        optionsUrl: string;
        hideFromSearch: boolean;
        sortOrder: number;
        hint: string;
        description: string;
        systemRequired: boolean;
        associatedEntity: {
            entity: string;
            entityMetaUrl: string;
            label: string;
            dateLastModified?: undefined;
            fields?: undefined;
            staticTemplateName?: undefined;
            tabName?: undefined;
        };
        dataType?: undefined;
        shouldAddCustomEntityLabel?: undefined;
        fields?: undefined;
        hasBeginsWith?: undefined;
        inputType?: undefined;
        options?: undefined;
        maxLength?: undefined;
        defaultValue?: undefined;
        allowCustomFilterValues?: undefined;
    })[];
    editTypeFn: (field: any) => any;
    constructor(formBuilder: UntypedFormBuilder, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    getFieldConfig(): any;
    updateConfig(values: any): void;
    resetQueryForm(): void;
    setQueryForm(data: any): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SingleFieldCriteriaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SingleFieldCriteriaExample, "single-field-criteria-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Custom Quick Note Example
 */
declare class CustomQuickNoteExample {
    note: any;
    placeholder: string;
    custom: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomQuickNoteExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomQuickNoteExample, "custom-quick-note-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Quick Note Example
 */
declare class BasicQuickNoteExample {
    note: any;
    placeholder: string;
    basic: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicQuickNoteExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicQuickNoteExample, "basic-quick-note-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Pluralize Example
 */
declare class PluralizeExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<PluralizeExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PluralizeExample, "pluralize-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Validation Example
 */
declare class FiValidationExample {
    private formUtils;
    form: any;
    controls: any;
    isUserModified: boolean;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiValidationExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiValidationExample, "fi-validation-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Tooltip Example
 */
declare class FiTooltipExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiTooltipExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiTooltipExample, "fi-tooltip-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Popover Example
 */
declare class FiPopoverExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiPopoverExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiPopoverExample, "fi-popover-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Nested Form Example
 */
declare class FiNestedExample {
    private formUtils;
    form: NovoFormGroup;
    minPayRateControl: TextBoxControl;
    maxPayRateControl: TextBoxControl;
    controls: NovoControlConfig[];
    initialValue: {
        selected: boolean;
        label: string;
        multiplier: number;
        payRate: number;
    }[];
    constructor(formUtils: FormUtils);
    private calculatePayRates;
    static ɵfac: i0.ɵɵFactoryDeclaration<FiNestedExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiNestedExample, "fi-nested-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Modify Options Example
 */
declare class FiModifyOptionsExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiModifyOptionsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiModifyOptionsExample, "fi-modify-options-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Modify Added Picker Example
 */
declare class FiModifyAddedPickerExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiModifyAddedPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiModifyAddedPickerExample, "fi-modify-added-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Messaging Example
 */
declare class FiMessagingExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiMessagingExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiMessagingExample, "fi-messaging-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Hide Show Example
 */
declare class FiHideShowExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiHideShowExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiHideShowExample, "fi-hide-show-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Globals Example
 */
declare class FiGlobalsExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiGlobalsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiGlobalsExample, "fi-globals-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Enable Disable Example
 */
declare class FiEnableDisableExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiEnableDisableExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiEnableDisableExample, "fi-enable-disable-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Required Example
 */
declare class FiDescriptionExample {
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiDescriptionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiDescriptionExample, "fi-description-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Confirm Example
 */
declare class FiConfirmExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiConfirmExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiConfirmExample, "fi-confirm-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Calculation Example
 */
declare class FiCalculationExample {
    private formUtils;
    form: any;
    controls: any;
    snippet: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiCalculationExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiCalculationExample, "fi-calculation-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Async Example
 */
declare class FiAsyncExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiAsyncExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiAsyncExample, "fi-async-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Fi Adding Removing Example
 */
declare class FiAddingRemovingExample {
    private formUtils;
    form: any;
    controls: any;
    constructor(formUtils: FormUtils);
    static ɵfac: i0.ɵɵFactoryDeclaration<FiAddingRemovingExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FiAddingRemovingExample, "fi-adding-removing-example", never, {}, {}, never, never, false, never>;
}

interface DemoButtonObject {
    name: string;
    headerText: string;
    bgClass: string;
}
/**
 * @title Drag and Drop Example
 */
declare class DragDropExample implements OnChanges {
    objects: DemoButtonObject[];
    objects2: DemoButtonObject[];
    objects3: DemoButtonObject[];
    ngOnChanges(changes: SimpleChanges): void;
    objectMoved?: DemoButtonObject;
    dragFinished(event: NovoDragFinishEvent<DemoButtonObject>): void;
    dragFinished2(event: NovoDragFinishEvent<DemoButtonObject>): void;
    dragFinished3(event: NovoDragFinishEvent<DemoButtonObject>): void;
    addObject2(): void;
    removeObject(item: DemoButtonObject): void;
    removeObject2(item: DemoButtonObject): void;
    get objectsAsString(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DragDropExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DragDropExample, "drag-drop-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Code Editor Example
 */
declare class BasicCodeExample {
    value: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicCodeExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicCodeExample, "basic-code-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Ace Editor Example
 */
declare class BasicAceExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicAceExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicAceExample, "basic-ace-example", never, {}, {}, never, never, false, never>;
}

interface Recipient {
    id: number;
    name: string;
    email: string;
}
/**
 * @title Card Form Example
 */
declare class CardFormExample {
    recipientCtrl: UntypedFormControl;
    filteredPeople: Observable<Recipient[]>;
    recipients: Recipient[];
    allPeople: Recipient[];
    searchInput: ElementRef<HTMLInputElement>;
    constructor();
    add(event: any): void;
    remove(person: Recipient): void;
    selected(event: NovoOptionSelectedEvent): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardFormExample, "card-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Activity Section
 */
declare class ActivitySectionExample {
    isDisabled: boolean;
    details: any;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ActivitySectionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActivitySectionExample, "activity-section-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Vertical Tabs
 */
declare class TabsVerticalExample {
    tabSelected(): void;
    tabDeselected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsVerticalExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsVerticalExample, "tabs-vertical-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tabs for Navigation
 */
declare class TabsRouterExample {
    tabSelected(): void;
    tabDeselected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsRouterExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsRouterExample, "tabs-router-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Condensed Tabs
 */
declare class TabsCondensedExample {
    tabSelected(): void;
    tabDeselected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsCondensedExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsCondensedExample, "tabs-condensed-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Colorful Tabs
 */
declare class TabsColorExample {
    selected: number;
    tabSelected(): void;
    tabDeselected(): void;
    updateTabIndex(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsColorExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsColorExample, "tabs-color-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Tabs
 */
declare class TabsBasicExample {
    tabSelected(): void;
    tabDeselected(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsBasicExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsBasicExample, "tabs-basic-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Sidenav
 */
declare class BasicSidenavExample {
    isMobile: boolean;
    collapsed: boolean;
    openWindows: {
        type: string;
        accent: string;
        label: string;
    }[];
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicSidenavExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicSidenavExample, "basic-sidenav-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Themed List Example
 */
declare class ThemedListExample {
    pulseItems: any;
    constructor();
    buildItems(resp: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemedListExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ThemedListExample, "themed-list-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic List Layout
 */
declare class BasicListExample {
    pulseItems: any;
    constructor();
    buildItems(resp: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicListExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicListExample, "basic-list-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Lazy Instaniated Content with Expansion
 */
declare class LazyExpansionExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<LazyExpansionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LazyExpansionExample, "lazy-expansion-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Dialogue buttons
 */
declare class BasicExpansionExample {
    isDisabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicExpansionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicExpansionExample, "basic-expansion-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Accordion Example
 */
declare class AccordionExample {
    isFlat: boolean;
    isMulti: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionExample, "accordion-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Multi Option Value Example
 */
declare class MultiOptionValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiOptionValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiOptionValueExample, "multi-option-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Icon Value Example
 */
declare class IconValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconValueExample, "icon-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Formatter Value Example
 */
declare class FormatterValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatterValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormatterValueExample, "formatter-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Value with Extenal Links Example
 */
declare class ExternalLinkValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExternalLinkValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExternalLinkValueExample, "external-link-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Entity List Value Example
 */
declare class EntityListValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityListValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityListValueExample, "entity-list-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date Time Value Example
 */
declare class DateTimeValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimeValueExample, "date-time-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Corporate User Value Example
 */
declare class CorporateUserValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CorporateUserValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CorporateUserValueExample, "corporate-user-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Category Value Example
 */
declare class CategoryValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoryValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CategoryValueExample, "category-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Value Example
 */
declare class BasicValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicValueExample, "basic-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Associated Value Example
 */
declare class AssociatedValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssociatedValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AssociatedValueExample, "associated-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Address Value Example
 */
declare class AddressValueExample {
    theme: NOVO_VALUE_THEME;
    data: any;
    meta: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddressValueExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddressValueExample, "address-value-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Checkbox Usage
 */
declare class BasicTimezoneExample {
    items: any[];
    onChange(change: Event, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicTimezoneExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicTimezoneExample, "basic-timezone-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Time Picker Example
 */
declare class TimePickerExample {
    time1: Date;
    time2: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimePickerExample, "time-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tiles Usage Example
 */
declare class TilesUsageExample {
    demoTilesDefault: Array<any>;
    valueDefault: string;
    demoTilesIcons: Array<any>;
    valueIcons: string;
    demoTilesDisabled: Array<any>;
    valueDisabled: string;
    demoTilesColor: Array<any>;
    valueColor: string;
    addedTiles: number;
    select(demo: string, newValue: any): void;
    addTile(): void;
    resetTiles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TilesUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TilesUsageExample, "tiles-usage-example", never, {}, {}, never, never, false, never>;
}

interface State {
    code: string;
    name: string;
    abbr: string;
}

/**
 * @title Multiple Select With Search Example
 */
declare class MultipleSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
    /** list of states */
    protected states: State[];
    /** control for the selected state for multi-selection */
    stateMultiCtrl: UntypedFormControl;
    /** control for the NovoSelect filter keyword multi-selection */
    stateMultiFilterCtrl: UntypedFormControl;
    /** list of states filtered by search keyword */
    filteredStatesMulti: ReplaySubject<State[]>;
    multiSelect: NovoSelectElement;
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy: Subject<void>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Sets the initial value after the filteredStates are loaded initially
     */
    protected setInitialValue(): void;
    protected filterStatesMulti(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultipleSelectWithSearchExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultipleSelectWithSearchExample, "multiple-select-with-search-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Multiple Select Example
 */
declare class MultipleSelectExample {
    placeholder: string;
    states: Array<string>;
    selected: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultipleSelectExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultipleSelectExample, "multiple-select-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Long Select Example
 */
declare class LongSelectExample {
    placeholder: string;
    states: Array<string>;
    state: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LongSelectExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LongSelectExample, "long-select-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Legacy Select Option Example
 */
declare class LegacySelectOptionExample {
    placeholder: string;
    options: Array<string>;
    value: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LegacySelectOptionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LegacySelectOptionExample, "legacy-select-option-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Select With Search Example
 */
declare class BasicSelectWithSearchExample implements OnInit, AfterViewInit, OnDestroy {
    /** list of states */
    protected states: State[];
    /** control for the selected state */
    stateCtrl: UntypedFormControl;
    /** control for the MatSelect filter keyword */
    stateFilterCtrl: UntypedFormControl;
    /** list of states filtered by search keyword */
    filteredStates: ReplaySubject<State[]>;
    singleSelect: NovoSelectElement;
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy: Subject<void>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Sets the initial value after the filteredStates are loaded initially
     */
    protected setInitialValue(): void;
    protected filterStates(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicSelectWithSearchExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicSelectWithSearchExample, "basic-select-with-search-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Select Example
 */
declare class BasicSelectExample {
    placeholder: string;
    options: Array<string>;
    value: string;
    withNumbers: Array<any>;
    withNumbersValue: any;
    withNumbersObject: any;
    withDisabledAndTooltip: Array<any>;
    disabledWithTooltipValue: number;
    headerConfig: any;
    create(opt: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicSelectExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicSelectExample, "basic-select-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Vertical Radio Buttons
 */
declare class VerticalRadioExample {
    onChange(change: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VerticalRadioExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VerticalRadioExample, "vertical-radio-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Radio Buttons with Icons
 */
declare class IconRadioExample {
    onChange(change: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconRadioExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconRadioExample, "icon-radio-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Radio Button with Buttons
 */
declare class ButtonRadioExample {
    onChange(change: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRadioExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonRadioExample, "button-radio-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Radio Button Usage
 */
declare class BasicRadioExample {
    model: any;
    onChange(change: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicRadioExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicRadioExample, "basic-radio-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Override Template Example
 */
declare class OverrideTemplateExample {
    placeholder: string;
    overrideValue: any;
    overrideDemo: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverrideTemplateExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverrideTemplateExample, "override-template-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Mixed Picker Example
 */
declare class MixedPickerExample {
    placeholder: string;
    mixedPicker: any;
    mixedPickerValue: any;
    constructor();
    setupMixedPickerDemo(): void;
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MixedPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MixedPickerExample, "mixed-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Grouped Picker Example
 */
declare class GroupedPickerExample {
    placeholder: string;
    groupedPicker1: any;
    groupedPicker2: any;
    groupedPicker3: any;
    groupedPicker4: any;
    groupedPicker1Value: any;
    groupedPicker2Value: any;
    groupedPicker3Value: any;
    groupedPicker4Value: any;
    constructor();
    setupGroupedPickerDemo(): void;
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupedPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupedPickerExample, "grouped-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Formatted Picker Example
 */
declare class FormattedPickerExample {
    placeholder: string;
    formatted: any;
    value: string;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormattedPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormattedPickerExample, "formatted-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Entity Picker Example
 */
declare class EntityPickerExample {
    placeholder: string;
    entityDemo: any;
    entity: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EntityPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EntityPickerExample, "entity-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Default Options Picker Example
 */
declare class DefaultOptionsPickerExample {
    placeholder: string;
    defaultArrayConfig: any;
    defaultFunctionConfig: any;
    defaultArrayValue: string;
    defaultFunctionValue: string;
    value: string;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultOptionsPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DefaultOptionsPickerExample, "default-options-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Picker Example
 */
declare class BasicPickerExample {
    placeholder: string;
    staticDemo: any;
    value: string;
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicPickerExample, "basic-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Async Picker Example
 */
declare class AsyncPickerExample {
    placeholder: string;
    value: string;
    async: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsyncPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsyncPickerExample, "async-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Nested Multi Picker Example
 */
declare class NestedMultiPickerExample {
    placeholder: string;
    parentChild: any;
    parentChildTypes: any;
    formatted: any;
    parentChildValue: any;
    constructor();
    onChanged(event?: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NestedMultiPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NestedMultiPickerExample, "nested-multi-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Multi Picker Example
 */
declare class BasicMultiPickerExample {
    placeholder: string;
    value: any;
    types: any;
    staticDemo: any;
    constructor();
    onChanged($event?: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicMultiPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicMultiPickerExample, "basic-multi-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Number Range Control Example
 */
declare class NumberRangeControlExample {
    exampleForm: FormGroup;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<NumberRangeControlExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NumberRangeControlExample, "number-range-control-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Custom Demo Control
 */
declare class CustomDemoControlExample {
    control: any;
    form: any;
    edit: any;
    save: any;
    delete: any;
    upload: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDemoControlExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDemoControlExample, "custom-demo-control-example", never, { "control": { "alias": "control"; "required": false; }; "form": { "alias": "form"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "save": { "alias": "save"; "required": false; }; "delete": { "alias": "delete"; "required": false; }; "upload": { "alias": "upload"; "required": false; }; }, {}, never, never, false, never>;
}

/**
 * @title Enable/Disable all Fields in Form Example
 */
declare class EnableDisableAllFieldsInFormExample {
    formUtils: FormUtils;
    controls: any;
    form: any;
    disabled: boolean;
    constructor(formUtils: FormUtils);
    toggleEnableDisableAllFields(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EnableDisableAllFieldsInFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EnableDisableAllFieldsInFormExample, "enable-disable-all-fields-in-form-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date Time Input Example
 */
declare class DateTimeInputExample {
    dateTimeInput: Date;
    dateTimeInput2: Date;
    dateTimeInput3: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeInputExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimeInputExample, "date-time-input-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Week Start Example
 */
declare class WeekStartExample {
    weekStartDate: Date;
    weekStart: number;
    setWeekStart(num: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeekStartExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WeekStartExample, "week-start-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Multiple Date Selection Example
 */
declare class MultiDateExample {
    multi: Date[];
    input: Date[];
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiDateExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiDateExample, "multi-date-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date Time Example
 */
declare class DateTimeExample {
    dateTime: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimeExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimeExample, "date-time-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date Range Input Example
 */
declare class DateRangeInputExample {
    selected: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateRangeInputExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateRangeInputExample, "date-range-input-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Date Picker Input Example
 */
declare class DatePickerInputExample {
    selected: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerInputExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerInputExample, "date-picker-input-example", never, {}, {}, never, never, false, never>;
}

declare class ExtendedLabelService extends NovoLabelService {
    dateFormat: string;
    dateFormatPlaceholder: string;
}
/**
 * @title Date Example
 */
declare class DatePickerExample {
    selectedDates: Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerExample, "date-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Color Picker Example
 */
declare class ColorPickerExample {
    hex: string;
    rgb: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerExample, "color-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Color Input Example
 */
declare class ColorInputExample {
    hex: string;
    rgb: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorInputExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorInputExample, "color-input-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Minimal Editor Example
 */
declare class MinimalEditorExample {
    editorValue: string;
    insertText(editor: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MinimalEditorExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MinimalEditorExample, "minimal-editor-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Editor Example
 */
declare class BasicEditorExample {
    editorValue: string;
    insertText(editor: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicEditorExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicEditorExample, "basic-editor-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Row Chips Example
 */
declare class RowChipsExample {
    placeholder: string;
    value: any;
    rowDemo: any;
    rowValue: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RowChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RowChipsExample, "row-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Hide Chips Example
 */
declare class HideChipsExample {
    placeholder: string;
    value: any;
    hideDemo: any;
    model: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HideChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HideChipsExample, "hide-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Grouped Multi Picker Example
 */
declare class GroupedMultiPickerExample {
    placeholder: string;
    groupedMultiPicker1: any;
    groupedMultiPicker2: any;
    groupedMultiPicker3: any;
    groupedMultiPicker1Value: any;
    groupedMultiPicker2Value: any;
    groupedMultiPicker3Value: any;
    constructor();
    setupGroupedMultiPickerDemo(): void;
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GroupedMultiPickerExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GroupedMultiPickerExample, "grouped-multi-picker-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Formatted Chips Example
 */
declare class FormattedChipsExample {
    formatted: any;
    placeholder: string;
    value: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormattedChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormattedChipsExample, "formatted-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Chips Example
 */
declare class CustomValuesExample {
    staticDemo: {
        options: string[];
    };
    placeholder: string;
    value: any[];
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomValuesExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomValuesExample, "custom-values-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Close On Select Chips Example
 */
declare class CloseOnSelectChipsExample {
    formatted: any;
    placeholder: string;
    value: any;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CloseOnSelectChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CloseOnSelectChipsExample, "close-on-select-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Chip Usage Example
 */
declare class ChipUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipUsageExample, "chip-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Chips Example
 */
declare class BasicChipsExample {
    staticDemo: {
        options: string[];
    };
    placeholder: string;
    value: string[];
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicChipsExample, "basic-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Async Chips Example
 */
declare class AsyncChipsExample {
    async: any;
    value: any;
    placeholder: string;
    constructor();
    onChanged(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsyncChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsyncChipsExample, "async-chips-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Checkbox List Usage
 */
declare class CheckboxListExample {
    options1: any[];
    options2: any[];
    onChange(change: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxListExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxListExample, "checkbox-list-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Basic Checkbox Usage
 */
declare class BasicCheckboxExample {
    items: any[];
    onChange(change: Event, item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicCheckboxExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicCheckboxExample, "basic-checkbox-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Title Example
 */
declare class TitleExample {
    icons: string[];
    index: number;
    get icon(): string;
    changeIcon(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TitleExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TitleExample, "title-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Text Example
 */
declare class TextExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TextExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextExample, "text-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Link Example
 */
declare class LinkExample {
    alert(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinkExample, "link-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Label Example
 */
declare class LabelExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelExample, "label-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Caption Example
 */
declare class CaptionExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<CaptionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaptionExample, "caption-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Tooltip Overflow Example
 */
declare class TooltipOverflowExample {
    tooltipActive: boolean;
    longText: string;
    shortText: string;
    toggleTooltip(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipOverflowExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipOverflowExample, "tooltip-overflow-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Non Ideal State Alt Usage
 */
declare class NonIdealStateSearchUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateSearchUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateSearchUsageExample, "non-ideal-state-search-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Non Ideal State Alt Usage
 */
declare class NonIdealStateLoadingUsageExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateLoadingUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateLoadingUsageExample, "non-ideal-state-loading-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Field Components Example
 */
declare class FieldComponentsExample {
    direction: string;
    fullWidth: boolean;
    hide: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldComponentsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldComponentsExample, "field-components-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Breadcrumb Dynamic Usage Example
 */
declare class BreadcrumbSourceUsageExample {
    source: ({
        title: string;
        showMenu: boolean;
        link: string;
        noNavigation?: undefined;
        isSearch?: undefined;
        menuList?: undefined;
    } | {
        title: string;
        link: string;
        showMenu: boolean;
        noNavigation: boolean;
        isSearch: boolean;
        menuList: ({
            name: string;
            link: string;
            target: string;
            linkType?: undefined;
        } | {
            name: string;
            link: string;
            linkType: string;
            target?: undefined;
        })[];
    })[];
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbSourceUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbSourceUsageExample, "breadcrumb-source-usage-example", never, {}, {}, never, never, false, never>;
}

/**
 * @title Autocomplete TextArea
 */
declare class AutocompleteTextareaExample implements OnInit {
    myControl: UntypedFormControl;
    myOtherControl: UntypedFormControl;
    options: string[];
    filteredOptions: Observable<string[]>;
    ngOnInit(): void;
    triggerFn(): (control: NovoFieldControl<any>) => boolean;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteTextareaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteTextareaExample, "autocomplete-textarea-example", never, {}, {}, never, never, false, never>;
}

interface LiveExample {
    title: string;
    component: any;
    additionalFiles?: string[];
    selectorName?: string;
    tsSource?: string;
    cssSource?: string;
    htmlSource?: string;
}
declare const EXAMPLE_COMPONENTS: {
    [key: string]: LiveExample;
};
declare const EXAMPLE_LIST: (typeof AsideFormDemo | typeof AsideFormExample | typeof AsideCustomDemo | typeof AsideUsageExample | typeof AvatarUsageExample | typeof ConfigureColumnsModal | typeof DataTableRemoteExample | typeof DataTableRowsExample | typeof DataTableServiceExample | typeof FormUsageExample | typeof ModalCustomDemo | typeof CustomModalExample | typeof ModalErrorDemo | typeof ErrorModalExample | typeof ModalAddFormDemo | typeof ModalAddFormExample | typeof ModalEditFormDemo | typeof ModalEditFormExample | typeof ModalSuccessDemo | typeof SuccessModalExample | typeof ModalWarningDemo | typeof WarningModalExample | typeof DeleteFilterModalDemo | typeof CustomPickerConditionDef | typeof JustCriteriaExample | typeof ToastActionsExample | typeof ToastServiceExample | typeof AnalyticsColorsExample | typeof EntityColorsExample | typeof PrimaryColorsExample | typeof SecurityExample | typeof CustomQuickNoteResults | typeof FiRequiredExample | typeof RecordHeaderExample | typeof DetailsCardExample | typeof StepperVerticalExample | typeof StepperHorizontalExample | typeof HeaderSubtitleExample | typeof HeaderSearchbarExample | typeof CondensedHeaderExample | typeof BasicHeaderExample | typeof CardWithImageExample | typeof CardConfigExample | typeof BasicCardExample | typeof CustomPickerResults | typeof VerticalOptionsExample | typeof VerticalExample | typeof HorizontalOptionsExample | typeof HorizontalExample | typeof CustomTemplateExample | typeof TextBasedControlsExample | typeof PickerControlsExample | typeof FileInputControlsExample | typeof CheckBoxControlsExample | typeof CalendarInputControlsExample | typeof AddressControlExample | typeof VerticalDynamicFormExample | typeof UpdatingFormExample | typeof DynamicFormFieldSetsExample | typeof DynamicFormExample | typeof DisabledFormExample | typeof DatePickerLimitsExample | typeof IconsetExample | typeof SingleFieldCriteriaExample)[];
declare class NovoExamplesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExamplesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoExamplesModule, [typeof SecurityExample, typeof CustomQuickNoteResults, typeof CustomQuickNoteResultsExample, typeof CustomQuickNoteExample, typeof BasicQuickNoteExample, typeof PluralizeExample, typeof FiValidationExample, typeof FiTooltipExample, typeof FiRequiredExample, typeof FiPopoverExample, typeof FiNestedExample, typeof FiModifyOptionsExample, typeof FiModifyAddedPickerExample, typeof FiMessagingExample, typeof FiHideShowExample, typeof FiGlobalsExample, typeof FiEnableDisableExample, typeof FiDescriptionExample, typeof FiConfirmExample, typeof FiCalculationExample, typeof FiAsyncExample, typeof FiAddingRemovingExample, typeof DragDropExample, typeof BasicCodeExample, typeof BasicAceExample, typeof RecordHeaderExample, typeof DetailsCardExample, typeof CardFormExample, typeof ActivitySectionExample, typeof TabsVerticalExample, typeof TabsRouterExample, typeof TabsCondensedExample, typeof TabsColorExample, typeof TabsBasicExample, typeof StepperVerticalExample, typeof StepperHorizontalExample, typeof BasicSidenavExample, typeof ThemedListExample, typeof BasicListExample, typeof HeaderSubtitleExample, typeof HeaderSearchbarExample, typeof CondensedHeaderExample, typeof BasicHeaderExample, typeof LazyExpansionExample, typeof BasicExpansionExample, typeof AccordionExample, typeof CardWithImageExample, typeof CardConfigExample, typeof BasicCardExample, typeof MultiOptionValueExample, typeof IconValueExample, typeof FormatterValueExample, typeof ExternalLinkValueExample, typeof EntityListValueExample, typeof DateTimeValueExample, typeof CorporateUserValueExample, typeof CategoryValueExample, typeof BasicValueExample, typeof AssociatedValueExample, typeof AddressValueExample, typeof BasicTimezoneExample, typeof TimePickerExample, typeof TilesUsageExample, typeof MultipleSelectWithSearchExample, typeof MultipleSelectExample, typeof LongSelectExample, typeof LegacySelectOptionExample, typeof BasicSelectWithSearchExample, typeof BasicSelectExample, typeof VerticalRadioExample, typeof IconRadioExample, typeof ButtonRadioExample, typeof BasicRadioExample, typeof OverrideTemplateExample, typeof MixedPickerExample, typeof GroupedPickerExample, typeof FormattedPickerExample, typeof EntityPickerExample, typeof DefaultOptionsPickerExample, typeof CustomPickerResults, typeof CustomPickerResultsExample, typeof BasicPickerExample, typeof AsyncPickerExample, typeof NestedMultiPickerExample, typeof BasicMultiPickerExample, typeof VerticalOptionsExample, typeof VerticalExample, typeof HorizontalOptionsExample, typeof HorizontalExample, typeof CustomTemplateExample, typeof TextBasedControlsExample, typeof PickerControlsExample, typeof NumberRangeControlExample, typeof FileInputControlsExample, typeof CustomDemoControlExample, typeof CheckBoxControlsExample, typeof CalendarInputControlsExample, typeof AddressControlExample, typeof VerticalDynamicFormExample, typeof UpdatingFormExample, typeof EnableDisableAllFieldsInFormExample, typeof DynamicFormFieldSetsExample, typeof DynamicFormExample, typeof DisabledFormExample, typeof DateTimeInputExample, typeof WeekStartExample, typeof MultiDateExample, typeof DateTimeExample, typeof DateRangeInputExample, typeof DatePickerLimitsExample, typeof DatePickerInputExample, typeof DatePickerExample, typeof ColorPickerExample, typeof ColorInputExample, typeof MinimalEditorExample, typeof BasicEditorExample, typeof RowChipsExample, typeof HideChipsExample, typeof GroupedMultiPickerExample, typeof FormattedChipsExample, typeof CustomValuesExample, typeof CloseOnSelectChipsExample, typeof ChipUsageExample, typeof BasicChipsExample, typeof AsyncChipsExample, typeof CheckboxListExample, typeof BasicCheckboxExample, typeof TitleExample, typeof TextExample, typeof LinkExample, typeof LabelExample, typeof CaptionExample, typeof IconsetExample, typeof PrimaryColorsExample, typeof EntityColorsExample, typeof AnalyticsColorsExample, typeof TooltipTypesExample, typeof TooltipToggleExample, typeof TooltipSizesExample, typeof TooltipPlacementExample, typeof TooltipOverflowExample, typeof TooltipOptionsExample, typeof TooltipAlignExample, typeof MultiRowToolbarExample, typeof BasicToolbarExample, typeof ToastUsageExample, typeof ToastServiceExample, typeof ToastOptionsExample, typeof ToastActionsExample, typeof IconTipWellExample, typeof HtmlTipWellExample, typeof ButtonlessTipWellExample, typeof BasicTipWellExample, typeof TabbedGroupPickerQuickSelectExample, typeof TabbedGroupPickerNoSelectionExample, typeof TabbedGroupPickerGroupsExample, typeof TabbedGroupPickerFooterExample, typeof TabbedGroupPickerBigGroupsExample, typeof TabbedGroupPickerBasicExample, typeof SwitchUsageExample, typeof BasicSlideExample, typeof SearchUsageExample, typeof SingleFieldCriteriaExample, typeof DeleteFilterModalDemo, typeof CustomPickerConditionDef, typeof JustCriteriaExample, typeof ProgressBarUsageExample, typeof ProgressBarRadialUsageExample, typeof PopOverVerticalExample, typeof PopOverPlacementExample, typeof PopOverHorizontalExample, typeof PopOverDynamicExample, typeof PopOverBehaviorsExample, typeof PopOverAutoPlacementExample, typeof NonIdealStateUsageExample, typeof NonIdealStateSearchUsageExample, typeof NonIdealStateLoadingUsageExample, typeof ModalWarningDemo, typeof WarningModalExample, typeof ModalSuccessDemo, typeof SuccessModalExample, typeof ModalEditFormDemo, typeof ModalEditFormExample, typeof ModalAddFormDemo, typeof ModalAddFormExample, typeof ModalErrorDemo, typeof ErrorModalExample, typeof ModalCustomDemo, typeof CustomModalExample, typeof NestedMenuExample, typeof MenuContextExample, typeof BasicMenuExample, typeof LoadingLineExample, typeof LoadingCircleExample, typeof ThemedIconsExample, typeof RaisedIconsExample, typeof BasicIconsExample, typeof FormUsageExample, typeof FieldUsageExample, typeof FieldNativeExample, typeof FieldComponentsExample, typeof FieldAnatomyExample, typeof ScrollableDropDownExample, typeof ScrollToItemDropDownExample, typeof PositionDropDownExample, typeof MultiDropDownExample, typeof LargeDropDownExample, typeof CustomDropDownExample, typeof BasicDropDownExample, typeof ConfigureColumnsModal, typeof DataTableServiceExample, typeof DataTableRowsExample, typeof DataTableRemoteExample, typeof TimeExample, typeof CalendarExample, typeof ButtonTwoIconExample, typeof ButtonStandardExample, typeof ButtonSecondaryExample, typeof ButtonPrimaryExample, typeof ButtonOverviewExample, typeof ButtonLoadingExample, typeof ButtonInverseExample, typeof ButtonIconExample, typeof ButtonFabExample, typeof ButtonDynamicExample, typeof ButtonDialogueExample, typeof BreadcrumbUsageExample, typeof BreadcrumbSourceUsageExample, typeof AvatarUsageExample, typeof AvatarStackUsageExample, typeof AutocompleteWithChipsExample, typeof AutocompleteUsageExample, typeof AutocompleteTextareaExample, typeof AutocompleteStackedChipsExample, typeof AsideCustomDemo, typeof AsideUsageExample, typeof AsideFormDemo, typeof AsideFormExample, typeof AgendaExample], [typeof i228.FormsModule, typeof i228.ReactiveFormsModule, typeof i229.CommonModule, typeof i230.NovoFormExtrasModule, typeof i230.NovoPipesModule, typeof i230.NovoElementsModule], [typeof SecurityExample, typeof CustomQuickNoteResults, typeof CustomQuickNoteResultsExample, typeof CustomQuickNoteExample, typeof BasicQuickNoteExample, typeof PluralizeExample, typeof FiValidationExample, typeof FiTooltipExample, typeof FiRequiredExample, typeof FiPopoverExample, typeof FiNestedExample, typeof FiModifyOptionsExample, typeof FiModifyAddedPickerExample, typeof FiMessagingExample, typeof FiHideShowExample, typeof FiGlobalsExample, typeof FiEnableDisableExample, typeof FiDescriptionExample, typeof FiConfirmExample, typeof FiCalculationExample, typeof FiAsyncExample, typeof FiAddingRemovingExample, typeof DragDropExample, typeof BasicCodeExample, typeof BasicAceExample, typeof RecordHeaderExample, typeof DetailsCardExample, typeof CardFormExample, typeof ActivitySectionExample, typeof TabsVerticalExample, typeof TabsRouterExample, typeof TabsCondensedExample, typeof TabsColorExample, typeof TabsBasicExample, typeof StepperVerticalExample, typeof StepperHorizontalExample, typeof BasicSidenavExample, typeof ThemedListExample, typeof BasicListExample, typeof HeaderSubtitleExample, typeof HeaderSearchbarExample, typeof CondensedHeaderExample, typeof BasicHeaderExample, typeof LazyExpansionExample, typeof BasicExpansionExample, typeof AccordionExample, typeof CardWithImageExample, typeof CardConfigExample, typeof BasicCardExample, typeof MultiOptionValueExample, typeof IconValueExample, typeof FormatterValueExample, typeof ExternalLinkValueExample, typeof EntityListValueExample, typeof DateTimeValueExample, typeof CorporateUserValueExample, typeof CategoryValueExample, typeof BasicValueExample, typeof AssociatedValueExample, typeof AddressValueExample, typeof BasicTimezoneExample, typeof TimePickerExample, typeof TilesUsageExample, typeof MultipleSelectWithSearchExample, typeof MultipleSelectExample, typeof LongSelectExample, typeof LegacySelectOptionExample, typeof BasicSelectWithSearchExample, typeof BasicSelectExample, typeof VerticalRadioExample, typeof IconRadioExample, typeof ButtonRadioExample, typeof BasicRadioExample, typeof OverrideTemplateExample, typeof MixedPickerExample, typeof GroupedPickerExample, typeof FormattedPickerExample, typeof EntityPickerExample, typeof DefaultOptionsPickerExample, typeof CustomPickerResults, typeof CustomPickerResultsExample, typeof BasicPickerExample, typeof AsyncPickerExample, typeof NestedMultiPickerExample, typeof BasicMultiPickerExample, typeof VerticalOptionsExample, typeof VerticalExample, typeof HorizontalOptionsExample, typeof HorizontalExample, typeof CustomTemplateExample, typeof TextBasedControlsExample, typeof PickerControlsExample, typeof NumberRangeControlExample, typeof FileInputControlsExample, typeof CustomDemoControlExample, typeof CheckBoxControlsExample, typeof CalendarInputControlsExample, typeof AddressControlExample, typeof VerticalDynamicFormExample, typeof UpdatingFormExample, typeof EnableDisableAllFieldsInFormExample, typeof DynamicFormFieldSetsExample, typeof DynamicFormExample, typeof DisabledFormExample, typeof DateTimeInputExample, typeof WeekStartExample, typeof MultiDateExample, typeof DateTimeExample, typeof DateRangeInputExample, typeof DatePickerLimitsExample, typeof DatePickerInputExample, typeof DatePickerExample, typeof ColorPickerExample, typeof ColorInputExample, typeof MinimalEditorExample, typeof BasicEditorExample, typeof RowChipsExample, typeof HideChipsExample, typeof GroupedMultiPickerExample, typeof FormattedChipsExample, typeof CustomValuesExample, typeof CloseOnSelectChipsExample, typeof ChipUsageExample, typeof BasicChipsExample, typeof AsyncChipsExample, typeof CheckboxListExample, typeof BasicCheckboxExample, typeof TitleExample, typeof TextExample, typeof LinkExample, typeof LabelExample, typeof CaptionExample, typeof IconsetExample, typeof PrimaryColorsExample, typeof EntityColorsExample, typeof AnalyticsColorsExample, typeof TooltipTypesExample, typeof TooltipToggleExample, typeof TooltipSizesExample, typeof TooltipPlacementExample, typeof TooltipOverflowExample, typeof TooltipOptionsExample, typeof TooltipAlignExample, typeof MultiRowToolbarExample, typeof BasicToolbarExample, typeof ToastUsageExample, typeof ToastServiceExample, typeof ToastOptionsExample, typeof ToastActionsExample, typeof IconTipWellExample, typeof HtmlTipWellExample, typeof ButtonlessTipWellExample, typeof BasicTipWellExample, typeof TabbedGroupPickerQuickSelectExample, typeof TabbedGroupPickerNoSelectionExample, typeof TabbedGroupPickerGroupsExample, typeof TabbedGroupPickerFooterExample, typeof TabbedGroupPickerBigGroupsExample, typeof TabbedGroupPickerBasicExample, typeof SwitchUsageExample, typeof BasicSlideExample, typeof SearchUsageExample, typeof SingleFieldCriteriaExample, typeof DeleteFilterModalDemo, typeof CustomPickerConditionDef, typeof JustCriteriaExample, typeof ProgressBarUsageExample, typeof ProgressBarRadialUsageExample, typeof PopOverVerticalExample, typeof PopOverPlacementExample, typeof PopOverHorizontalExample, typeof PopOverDynamicExample, typeof PopOverBehaviorsExample, typeof PopOverAutoPlacementExample, typeof NonIdealStateUsageExample, typeof NonIdealStateSearchUsageExample, typeof NonIdealStateLoadingUsageExample, typeof ModalWarningDemo, typeof WarningModalExample, typeof ModalSuccessDemo, typeof SuccessModalExample, typeof ModalEditFormDemo, typeof ModalEditFormExample, typeof ModalAddFormDemo, typeof ModalAddFormExample, typeof ModalErrorDemo, typeof ErrorModalExample, typeof ModalCustomDemo, typeof CustomModalExample, typeof NestedMenuExample, typeof MenuContextExample, typeof BasicMenuExample, typeof LoadingLineExample, typeof LoadingCircleExample, typeof ThemedIconsExample, typeof RaisedIconsExample, typeof BasicIconsExample, typeof FormUsageExample, typeof FieldUsageExample, typeof FieldNativeExample, typeof FieldComponentsExample, typeof FieldAnatomyExample, typeof ScrollableDropDownExample, typeof ScrollToItemDropDownExample, typeof PositionDropDownExample, typeof MultiDropDownExample, typeof LargeDropDownExample, typeof CustomDropDownExample, typeof BasicDropDownExample, typeof ConfigureColumnsModal, typeof DataTableServiceExample, typeof DataTableRowsExample, typeof DataTableRemoteExample, typeof TimeExample, typeof CalendarExample, typeof ButtonTwoIconExample, typeof ButtonStandardExample, typeof ButtonSecondaryExample, typeof ButtonPrimaryExample, typeof ButtonOverviewExample, typeof ButtonLoadingExample, typeof ButtonInverseExample, typeof ButtonIconExample, typeof ButtonFabExample, typeof ButtonDynamicExample, typeof ButtonDialogueExample, typeof BreadcrumbUsageExample, typeof BreadcrumbSourceUsageExample, typeof AvatarUsageExample, typeof AvatarStackUsageExample, typeof AutocompleteWithChipsExample, typeof AutocompleteUsageExample, typeof AutocompleteTextareaExample, typeof AutocompleteStackedChipsExample, typeof AsideCustomDemo, typeof AsideUsageExample, typeof AsideFormDemo, typeof AsideFormExample, typeof AgendaExample]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoExamplesModule>;
}

/**
 * Example data
 *   with information about Component name, selector, files used in example, and path to examples
 */
declare class ExampleData {
    /** Description of the example. */
    description: string;
    /** Path to the example. This is based on the structure of the material.angular.io repo. */
    examplePath: string;
    /** List of files that are part of this example. */
    exampleFiles: string[];
    /** Selector name of the example component. */
    selectorName: string;
    /** Name of the file that contains the example component. */
    indexFilename: string;
    /**
     * Name of the example component. For examples with multiple components, this property will
     * include multiple components that are comma separated (e.g. dialog-overview)
     */
    componentName: string;
    source: LiveExample;
    constructor(example: string);
}

interface HighlightOptions {
    theme?: string;
    path?: string;
    auto?: boolean;
    config?: HighlightConfig;
}
interface HighlightConfig {
    /** tabReplace: a string used to replace TAB characters in indentation. */
    tabReplace?: string;
    /** useBR: a flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container. */
    useBR?: boolean;
    /** classPrefix: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets. */
    classPrefix?: string;
    /** languages: an array of language names and aliases restricting auto detection to only these languages. */
    languages?: string[];
}
interface HighlightResult {
    language?: string;
    r?: number;
    second_best?: any;
    top?: any;
    value?: string;
}
declare class HighlightJS {
    options: HighlightOptions;
    private _isReady$;
    get isReady(): Observable<boolean>;
    constructor();
    highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): HighlightResult;
    highlightAuto(value: string, languageSubset: string[]): HighlightResult;
    fixMarkup(value: string): string;
    highlightBlock(block: HTMLElement): void;
    configure(options: HighlightOptions): void;
    initHighlighting(): void;
    initHighlightingOnLoad(): void;
    registerLanguage(name: string, language: Function): void;
    listLanguages(): string[];
    getLanguage(name: string): any;
    private _loadScript;
    private _loadTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<HighlightJS, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HighlightJS>;
}

declare class CodeSnippetComponent implements OnInit {
    private sanitizer;
    private hljs;
    private cdr;
    example: any;
    highlightHTML: SafeHtml;
    highlightTS: SafeHtml;
    highlightCSS: SafeHtml;
    constructor(sanitizer: DomSanitizer, hljs: HighlightJS, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeSnippetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeSnippetComponent, "code-snippet", never, { "example": { "alias": "example"; "required": false; }; }, {}, never, never, false, never>;
}

declare class CodeExampleComponent {
    /** Component portal for the currently displayed example. */
    selectedPortal: ComponentPortal<any>;
    /** String key of the currently displayed example. */
    _example: string;
    exampleData: LiveExample;
    /** Whether the source for the example is being displayed. */
    showSource: boolean;
    constructor();
    get example(): string;
    set example(example: string);
    toggleSourceView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeExampleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeExampleComponent, "code-example", never, { "example": { "alias": "example"; "required": false; }; }, {}, never, never, false, never>;
}

declare class TypedefContent {
    static ɵfac: i0.ɵɵFactoryDeclaration<TypedefContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypedefContent, "typedef-content", never, {}, {}, never, ["*"], false, never>;
}
declare class TypedefSpec {
    static ɵfac: i0.ɵɵFactoryDeclaration<TypedefSpec, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypedefSpec, "typedef-specs", never, {}, {}, never, ["*"], false, never>;
}
declare class TypedefSnippet {
    static ɵfac: i0.ɵɵFactoryDeclaration<TypedefSnippet, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypedefSnippet, "typedef-snippet", never, {}, {}, never, ["*"], false, never>;
}
declare class TypedefExample {
    static ɵfac: i0.ɵɵFactoryDeclaration<TypedefExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypedefExample, "typedef-example", never, {}, {}, never, ["typedef-content", "typedef-specs", "typedef-snippet"], false, never>;
}

declare class FigureExample implements AfterViewInit {
    private element;
    private hljs;
    theme: string;
    get hb_theme(): string;
    constructor(element: ElementRef, hljs: HighlightJS);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FigureExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FigureExample, "figure-example", never, { "theme": { "alias": "theme"; "required": false; }; }, {}, never, ["img,[img],code,pre", "novo-label,label", "*"], false, never>;
}

declare class TabsLayout implements AfterViewInit {
    private route;
    protected resolver: ComponentFactoryResolver;
    title: string;
    pages: any[];
    viewContainerRef: ViewContainerRef;
    private componentToCreate;
    constructor(route: ActivatedRoute, resolver: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsLayout, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsLayout, "tabs-layout", never, {}, {}, never, never, false, never>;
}

declare class DefaultLayout {
    private route;
    constructor(route: ActivatedRoute);
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultLayout, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DefaultLayout, "default-layout", never, {}, {}, never, never, false, never>;
}

declare class NovoExamplesSharedModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExamplesSharedModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoExamplesSharedModule, [typeof CodeSnippetComponent, typeof CodeExampleComponent, typeof TypedefContent, typeof TypedefExample, typeof TypedefSnippet, typeof TypedefSpec, typeof FigureExample, typeof TabsLayout, typeof DefaultLayout], [typeof i1.RouterModule, typeof i228.FormsModule, typeof i228.ReactiveFormsModule, typeof i229.CommonModule, typeof i10.AngularSplitModule, typeof i230.NovoElementsModule, typeof i12.PortalModule], [typeof CodeSnippetComponent, typeof CodeExampleComponent, typeof TypedefContent, typeof TypedefExample, typeof TypedefSnippet, typeof TypedefSpec, typeof FigureExample, typeof TabsLayout, typeof DefaultLayout]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoExamplesSharedModule>;
}

declare class SecurityPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SecurityPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SecurityPage, "security-page", never, {}, {}, never, never, false, never>;
}
declare class QuickNotePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickNotePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickNotePage, "quick-note-page", never, {}, {}, never, never, false, never>;
}
declare class PipesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PipesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PipesPage, "pipes-page", never, {}, {}, never, never, false, never>;
}
declare class FieldInteractionsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldInteractionsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldInteractionsPage, "field-interactions-page", never, {}, {}, never, never, false, never>;
}
declare class DragDropPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DragDropPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DragDropPage, "drag-drop-page", never, {}, {}, never, never, false, never>;
}
declare class CodeEditorPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeEditorPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeEditorPage, "code-editor-page", never, {}, {}, never, never, false, never>;
}
declare class AceEditorPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AceEditorPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AceEditorPage, "ace-editor-page", never, {}, {}, never, never, false, never>;
}
declare class v9Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v9Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v9Page, "v9-page", never, {}, {}, never, never, false, never>;
}
declare class v8Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v8Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v8Page, "v8-page", never, {}, {}, never, never, false, never>;
}
declare class v7Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v7Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v7Page, "v7-page", never, {}, {}, never, never, false, never>;
}
declare class v6Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v6Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v6Page, "v6-page", never, {}, {}, never, never, false, never>;
}
declare class v12Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v12Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v12Page, "v12-page", never, {}, {}, never, never, false, never>;
}
declare class v11Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v11Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v11Page, "v11-page", never, {}, {}, never, never, false, never>;
}
declare class v10Page {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<v10Page, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<v10Page, "v10-page", never, {}, {}, never, never, false, never>;
}
declare class TemplatesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TemplatesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TemplatesPage, "templates-page", never, {}, {}, never, never, false, never>;
}
declare class PatternsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PatternsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PatternsPage, "patterns-page", never, {}, {}, never, never, false, never>;
}
declare class PatternsTestPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PatternsTestPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PatternsTestPage, "patterns-test-page", never, {}, {}, never, never, false, never>;
}
declare class PatternsNativeFormsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PatternsNativeFormsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PatternsNativeFormsPage, "patterns-native-forms-page", never, {}, {}, never, never, false, never>;
}
declare class LayoutsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LayoutsPage, "layouts-page", never, {}, {}, never, never, false, never>;
}
declare class TabsExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsExamplesPage, "tabs-examples-page", never, {}, {}, never, never, false, never>;
}
declare class TabsDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsDevelopPage, "tabs-develop-page", never, {}, {}, never, never, false, never>;
}
declare class TabsDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsDesignPage, "tabs-design-page", never, {}, {}, never, never, false, never>;
}
declare class StepperPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StepperPage, "stepper-page", never, {}, {}, never, never, false, never>;
}
declare class SidenavPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidenavPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SidenavPage, "sidenav-page", never, {}, {}, never, never, false, never>;
}
declare class ListPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListPage, "list-page", never, {}, {}, never, never, false, never>;
}
declare class HeaderPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderPage, "header-page", never, {}, {}, never, never, false, never>;
}
declare class ExpansionPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpansionPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpansionPage, "expansion-page", never, {}, {}, never, never, false, never>;
}
declare class CardExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardExamplesPage, "card-examples-page", never, {}, {}, never, never, false, never>;
}
declare class CardDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardDevelopPage, "card-develop-page", never, {}, {}, never, never, false, never>;
}
declare class CardDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardDesignPage, "card-design-page", never, {}, {}, never, never, false, never>;
}
declare class CardDescriptionPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardDescriptionPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardDescriptionPage, "card-description-page", never, {}, {}, never, never, false, never>;
}
declare class HomePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<HomePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HomePage, "home-page", never, {}, {}, never, never, false, never>;
}
declare class FormControlsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormControlsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormControlsPage, "form-controls-page", never, {}, {}, never, never, false, never>;
}
declare class ValuePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValuePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ValuePage, "value-page", never, {}, {}, never, never, false, never>;
}
declare class TimezonePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimezonePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimezonePage, "timezone-page", never, {}, {}, never, never, false, never>;
}
declare class TimePickerExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimePickerExamplesPage, "time-picker-examples-page", never, {}, {}, never, never, false, never>;
}
declare class TimePickerDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimePickerDevelopPage, "time-picker-develop-page", never, {}, {}, never, never, false, never>;
}
declare class TimePickerDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimePickerDesignPage, "time-picker-design-page", never, {}, {}, never, never, false, never>;
}
declare class TilesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TilesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TilesPage, "tiles-page", never, {}, {}, never, never, false, never>;
}
declare class SelectPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectPage, "select-page", never, {}, {}, never, never, false, never>;
}
declare class RadioButtonsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<RadioButtonsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RadioButtonsPage, "radio-buttons-page", never, {}, {}, never, never, false, never>;
}
declare class PickerPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickerPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickerPage, "picker-page", never, {}, {}, never, never, false, never>;
}
declare class MultiPickerPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiPickerPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiPickerPage, "multi-picker-page", never, {}, {}, never, never, false, never>;
}
declare class FormGroupsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormGroupsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormGroupsPage, "form-groups-page", never, {}, {}, never, never, false, never>;
}
declare class FormPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormPage, "form-page", never, {}, {}, never, never, false, never>;
}
declare class DynamicFormPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormPage, "dynamic-form-page", never, {}, {}, never, never, false, never>;
}
declare class DateTimePickerExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimePickerExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimePickerExamplesPage, "date-time-picker-examples-page", never, {}, {}, never, never, false, never>;
}
declare class DateTimePickerDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimePickerDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimePickerDevelopPage, "date-time-picker-develop-page", never, {}, {}, never, never, false, never>;
}
declare class DateTimePickerDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimePickerDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateTimePickerDesignPage, "date-time-picker-design-page", never, {}, {}, never, never, false, never>;
}
declare class DatePickerExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerExamplesPage, "date-picker-examples-page", never, {}, {}, never, never, false, never>;
}
declare class DatePickerDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerDevelopPage, "date-picker-develop-page", never, {}, {}, never, never, false, never>;
}
declare class DatePickerDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatePickerDesignPage, "date-picker-design-page", never, {}, {}, never, never, false, never>;
}
declare class ColorPickerPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorPickerPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorPickerPage, "color-picker-page", never, {}, {}, never, never, false, never>;
}
declare class CkEditorPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CkEditorPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CkEditorPage, "ck-editor-page", never, {}, {}, never, never, false, never>;
}
declare class ChipsExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipsExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipsExamplesPage, "chips-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ChipsDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipsDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipsDevelopPage, "chips-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ChipsDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipsDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipsDesignPage, "chips-design-page", never, {}, {}, never, never, false, never>;
}
declare class CheckboxPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxPage, "checkbox-page", never, {}, {}, never, never, false, never>;
}
declare class DesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DesignPage, "design-page", never, {}, {}, never, never, false, never>;
}
declare class TypographyPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TypographyPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TypographyPage, "typography-page", never, {}, {}, never, never, false, never>;
}
declare class SpacingPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpacingPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpacingPage, "spacing-page", never, {}, {}, never, never, false, never>;
}
declare class IconographyPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconographyPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconographyPage, "iconography-page", never, {}, {}, never, never, false, never>;
}
declare class CompositionPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompositionPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompositionPage, "composition-page", never, {}, {}, never, never, false, never>;
}
declare class ColorsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColorsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColorsPage, "colors-page", never, {}, {}, never, never, false, never>;
}
declare class ComponentsPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentsPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ComponentsPage, "components-page", never, {}, {}, never, never, false, never>;
}
declare class TooltipExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipExamplesPage, "tooltip-examples-page", never, {}, {}, never, never, false, never>;
}
declare class TooltipDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipDevelopPage, "tooltip-develop-page", never, {}, {}, never, never, false, never>;
}
declare class TooltipDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipDesignPage, "tooltip-design-page", never, {}, {}, never, never, false, never>;
}
declare class ToolbarExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToolbarExamplesPage, "toolbar-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ToolbarDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToolbarDevelopPage, "toolbar-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ToolbarDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToolbarDesignPage, "toolbar-design-page", never, {}, {}, never, never, false, never>;
}
declare class ToasterExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToasterExamplesPage, "toaster-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ToasterDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToasterDevelopPage, "toaster-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ToasterDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToasterDesignPage, "toaster-design-page", never, {}, {}, never, never, false, never>;
}
declare class TipWellExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TipWellExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TipWellExamplesPage, "tip-well-examples-page", never, {}, {}, never, never, false, never>;
}
declare class TipWellDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TipWellDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TipWellDevelopPage, "tip-well-develop-page", never, {}, {}, never, never, false, never>;
}
declare class TipWellDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TipWellDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TipWellDesignPage, "tip-well-design-page", never, {}, {}, never, never, false, never>;
}
declare class TabbedGroupPickerPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerPage, "tabbed-group-picker-page", never, {}, {}, never, never, false, never>;
}
declare class SwitchPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SwitchPage, "switch-page", never, {}, {}, never, never, false, never>;
}
declare class SlidesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlidesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SlidesPage, "slides-page", never, {}, {}, never, never, false, never>;
}
declare class SearchPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchPage, "search-page", never, {}, {}, never, never, false, never>;
}
declare class QueryBuilderExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QueryBuilderExamplesPage, "query-builder-examples-page", never, {}, {}, never, never, false, never>;
}
declare class QueryBuilderDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QueryBuilderDevelopPage, "query-builder-develop-page", never, {}, {}, never, never, false, never>;
}
declare class QueryBuilderDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<QueryBuilderDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QueryBuilderDesignPage, "query-builder-design-page", never, {}, {}, never, never, false, never>;
}
declare class ProgressUsagePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressUsagePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressUsagePage, "progress-usage-page", never, {}, {}, never, never, false, never>;
}
declare class ProgressExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressExamplesPage, "progress-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ProgressDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressDevelopPage, "progress-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ProgressDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressDesignPage, "progress-design-page", never, {}, {}, never, never, false, never>;
}
declare class PopoverExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopoverExamplesPage, "popover-examples-page", never, {}, {}, never, never, false, never>;
}
declare class PopoverDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopoverDevelopPage, "popover-develop-page", never, {}, {}, never, never, false, never>;
}
declare class PopoverDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopoverDesignPage, "popover-design-page", never, {}, {}, never, never, false, never>;
}
declare class NonIdealStateExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateExamplesPage, "non-ideal-state-examples-page", never, {}, {}, never, never, false, never>;
}
declare class NonIdealStateDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateDevelopPage, "non-ideal-state-develop-page", never, {}, {}, never, never, false, never>;
}
declare class NonIdealStateDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NonIdealStateDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NonIdealStateDesignPage, "non-ideal-state-design-page", never, {}, {}, never, never, false, never>;
}
declare class ModalExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalExamplesPage, "modal-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ModalDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalDevelopPage, "modal-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ModalDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalDesignPage, "modal-design-page", never, {}, {}, never, never, false, never>;
}
declare class MenuExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuExamplesPage, "menu-examples-page", never, {}, {}, never, never, false, never>;
}
declare class MenuDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuDevelopPage, "menu-develop-page", never, {}, {}, never, never, false, never>;
}
declare class MenuDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MenuDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MenuDesignPage, "menu-design-page", never, {}, {}, never, never, false, never>;
}
declare class LoadingExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingExamplesPage, "loading-examples-page", never, {}, {}, never, never, false, never>;
}
declare class LoadingDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingDevelopPage, "loading-develop-page", never, {}, {}, never, never, false, never>;
}
declare class LoadingDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingDesignPage, "loading-design-page", never, {}, {}, never, never, false, never>;
}
declare class IconExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconExamplesPage, "icon-examples-page", never, {}, {}, never, never, false, never>;
}
declare class IconDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconDevelopPage, "icon-develop-page", never, {}, {}, never, never, false, never>;
}
declare class IconDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconDesignPage, "icon-design-page", never, {}, {}, never, never, false, never>;
}
declare class FieldExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldExamplesPage, "field-examples-page", never, {}, {}, never, never, false, never>;
}
declare class FieldDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldDevelopPage, "field-develop-page", never, {}, {}, never, never, false, never>;
}
declare class FieldDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldDesignPage, "field-design-page", never, {}, {}, never, never, false, never>;
}
declare class DropdownExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownExamplesPage, "dropdown-examples-page", never, {}, {}, never, never, false, never>;
}
declare class DropdownDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownDevelopPage, "dropdown-develop-page", never, {}, {}, never, never, false, never>;
}
declare class DropdownDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownDesignPage, "dropdown-design-page", never, {}, {}, never, never, false, never>;
}
declare class DataTablePage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTablePage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataTablePage, "data-table-page", never, {}, {}, never, never, false, never>;
}
declare class CalendarExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarExamplesPage, "calendar-examples-page", never, {}, {}, never, never, false, never>;
}
declare class CalendarDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarDevelopPage, "calendar-develop-page", never, {}, {}, never, never, false, never>;
}
declare class CalendarDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarDesignPage, "calendar-design-page", never, {}, {}, never, never, false, never>;
}
declare class ButtonExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonExamplesPage, "button-examples-page", never, {}, {}, never, never, false, never>;
}
declare class ButtonDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonDevelopPage, "button-develop-page", never, {}, {}, never, never, false, never>;
}
declare class ButtonDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonDesignPage, "button-design-page", never, {}, {}, never, never, false, never>;
}
declare class BreadcrumbExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbExamplesPage, "breadcrumb-examples-page", never, {}, {}, never, never, false, never>;
}
declare class BreadcrumbDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbDevelopPage, "breadcrumb-develop-page", never, {}, {}, never, never, false, never>;
}
declare class BreadcrumbDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbDesignPage, "breadcrumb-design-page", never, {}, {}, never, never, false, never>;
}
declare class AvatarExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarExamplesPage, "avatar-examples-page", never, {}, {}, never, never, false, never>;
}
declare class AvatarDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarDevelopPage, "avatar-develop-page", never, {}, {}, never, never, false, never>;
}
declare class AvatarDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarDesignPage, "avatar-design-page", never, {}, {}, never, never, false, never>;
}
declare class AutocompleteExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteExamplesPage, "autocomplete-examples-page", never, {}, {}, never, never, false, never>;
}
declare class AutocompleteDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteDevelopPage, "autocomplete-develop-page", never, {}, {}, never, never, false, never>;
}
declare class AutocompleteDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteDesignPage, "autocomplete-design-page", never, {}, {}, never, never, false, never>;
}
declare class AsideExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideExamplesPage, "aside-examples-page", never, {}, {}, never, never, false, never>;
}
declare class AsideDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideDevelopPage, "aside-develop-page", never, {}, {}, never, never, false, never>;
}
declare class AsideDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsideDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsideDesignPage, "aside-design-page", never, {}, {}, never, never, false, never>;
}
declare class AgendaExamplesPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgendaExamplesPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgendaExamplesPage, "agenda-examples-page", never, {}, {}, never, never, false, never>;
}
declare class AgendaDevelopPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgendaDevelopPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgendaDevelopPage, "agenda-develop-page", never, {}, {}, never, never, false, never>;
}
declare class AgendaDesignPage {
    params: any;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgendaDesignPage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgendaDesignPage, "agenda-design-page", never, {}, {}, never, never, false, never>;
}
declare const PAGE_LIST: (typeof SecurityPage)[];
declare class NovoExamplesRoutesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoExamplesRoutesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoExamplesRoutesModule, [typeof SecurityPage, typeof QuickNotePage, typeof PipesPage, typeof FieldInteractionsPage, typeof DragDropPage, typeof CodeEditorPage, typeof AceEditorPage, typeof v9Page, typeof v8Page, typeof v7Page, typeof v6Page, typeof v12Page, typeof v11Page, typeof v10Page, typeof TemplatesPage, typeof PatternsPage, typeof PatternsTestPage, typeof PatternsNativeFormsPage, typeof LayoutsPage, typeof TabsExamplesPage, typeof TabsDevelopPage, typeof TabsDesignPage, typeof StepperPage, typeof SidenavPage, typeof ListPage, typeof HeaderPage, typeof ExpansionPage, typeof CardExamplesPage, typeof CardDevelopPage, typeof CardDesignPage, typeof CardDescriptionPage, typeof HomePage, typeof FormControlsPage, typeof ValuePage, typeof TimezonePage, typeof TimePickerExamplesPage, typeof TimePickerDevelopPage, typeof TimePickerDesignPage, typeof TilesPage, typeof SelectPage, typeof RadioButtonsPage, typeof PickerPage, typeof MultiPickerPage, typeof FormGroupsPage, typeof FormPage, typeof DynamicFormPage, typeof DateTimePickerExamplesPage, typeof DateTimePickerDevelopPage, typeof DateTimePickerDesignPage, typeof DatePickerExamplesPage, typeof DatePickerDevelopPage, typeof DatePickerDesignPage, typeof ColorPickerPage, typeof CkEditorPage, typeof ChipsExamplesPage, typeof ChipsDevelopPage, typeof ChipsDesignPage, typeof CheckboxPage, typeof DesignPage, typeof TypographyPage, typeof SpacingPage, typeof IconographyPage, typeof CompositionPage, typeof ColorsPage, typeof ComponentsPage, typeof TooltipExamplesPage, typeof TooltipDevelopPage, typeof TooltipDesignPage, typeof ToolbarExamplesPage, typeof ToolbarDevelopPage, typeof ToolbarDesignPage, typeof ToasterExamplesPage, typeof ToasterDevelopPage, typeof ToasterDesignPage, typeof TipWellExamplesPage, typeof TipWellDevelopPage, typeof TipWellDesignPage, typeof TabbedGroupPickerPage, typeof SwitchPage, typeof SlidesPage, typeof SearchPage, typeof QueryBuilderExamplesPage, typeof QueryBuilderDevelopPage, typeof QueryBuilderDesignPage, typeof ProgressUsagePage, typeof ProgressExamplesPage, typeof ProgressDevelopPage, typeof ProgressDesignPage, typeof PopoverExamplesPage, typeof PopoverDevelopPage, typeof PopoverDesignPage, typeof NonIdealStateExamplesPage, typeof NonIdealStateDevelopPage, typeof NonIdealStateDesignPage, typeof ModalExamplesPage, typeof ModalDevelopPage, typeof ModalDesignPage, typeof MenuExamplesPage, typeof MenuDevelopPage, typeof MenuDesignPage, typeof LoadingExamplesPage, typeof LoadingDevelopPage, typeof LoadingDesignPage, typeof IconExamplesPage, typeof IconDevelopPage, typeof IconDesignPage, typeof FieldExamplesPage, typeof FieldDevelopPage, typeof FieldDesignPage, typeof DropdownExamplesPage, typeof DropdownDevelopPage, typeof DropdownDesignPage, typeof DataTablePage, typeof CalendarExamplesPage, typeof CalendarDevelopPage, typeof CalendarDesignPage, typeof ButtonExamplesPage, typeof ButtonDevelopPage, typeof ButtonDesignPage, typeof BreadcrumbExamplesPage, typeof BreadcrumbDevelopPage, typeof BreadcrumbDesignPage, typeof AvatarExamplesPage, typeof AvatarDevelopPage, typeof AvatarDesignPage, typeof AutocompleteExamplesPage, typeof AutocompleteDevelopPage, typeof AutocompleteDesignPage, typeof AsideExamplesPage, typeof AsideDevelopPage, typeof AsideDesignPage, typeof AgendaExamplesPage, typeof AgendaDevelopPage, typeof AgendaDesignPage], [typeof i1.RouterModule, typeof i230.NovoElementsModule, typeof NovoExamplesModule, typeof NovoExamplesSharedModule], [typeof i1.RouterModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoExamplesRoutesModule>;
}

export { AccordionExample, AceEditorPage, ActivitySectionExample, AddressControlExample, AddressValueExample, AgendaDesignPage, AgendaDevelopPage, AgendaExample, AgendaExamplesPage, AnalyticsColorsExample, AsideCustomDemo, AsideDesignPage, AsideDevelopPage, AsideExamplesPage, AsideFormDemo, AsideFormExample, AsideUsageExample, AssociatedValueExample, AsyncChipsExample, AsyncPickerExample, AutocompleteDesignPage, AutocompleteDevelopPage, AutocompleteExamplesPage, AutocompleteStackedChipsExample, AutocompleteTextareaExample, AutocompleteUsageExample, AutocompleteWithChipsExample, AvatarDesignPage, AvatarDevelopPage, AvatarExamplesPage, AvatarStackUsageExample, AvatarUsageExample, BasicAceExample, BasicCardExample, BasicCheckboxExample, BasicChipsExample, BasicCodeExample, BasicDropDownExample, BasicEditorExample, BasicExpansionExample, BasicHeaderExample, BasicIconsExample, BasicListExample, BasicMenuExample, BasicMultiPickerExample, BasicPickerExample, BasicQuickNoteExample, BasicRadioExample, BasicSelectExample, BasicSelectWithSearchExample, BasicSidenavExample, BasicSlideExample, BasicTimezoneExample, BasicTipWellExample, BasicToolbarExample, BasicValueExample, BreadcrumbDesignPage, BreadcrumbDevelopPage, BreadcrumbExamplesPage, BreadcrumbSourceUsageExample, BreadcrumbUsageExample, ButtonDesignPage, ButtonDevelopPage, ButtonDialogueExample, ButtonDynamicExample, ButtonExamplesPage, ButtonFabExample, ButtonIconExample, ButtonInverseExample, ButtonLoadingExample, ButtonOverviewExample, ButtonPrimaryExample, ButtonRadioExample, ButtonSecondaryExample, ButtonStandardExample, ButtonTwoIconExample, ButtonlessTipWellExample, CalendarDesignPage, CalendarDevelopPage, CalendarExample, CalendarExamplesPage, CalendarInputControlsExample, CaptionExample, CardConfigExample, CardDescriptionPage, CardDesignPage, CardDevelopPage, CardExamplesPage, CardFormExample, CardWithImageExample, CategoryValueExample, CheckBoxControlsExample, CheckboxListExample, CheckboxPage, ChipUsageExample, ChipsDesignPage, ChipsDevelopPage, ChipsExamplesPage, CkEditorPage, CloseOnSelectChipsExample, CodeEditorPage, CodeExampleComponent, CodeSnippetComponent, ColorInputExample, ColorPickerExample, ColorPickerPage, ColorsPage, ComponentsPage, CompositionPage, CondensedHeaderExample, ConfigureColumnsModal, CorporateUserValueExample, CustomDemoControlExample, CustomDropDownExample, CustomModalExample, CustomPickerConditionDef, CustomPickerResults, CustomPickerResultsExample, CustomQuickNoteExample, CustomQuickNoteResults, CustomQuickNoteResultsExample, CustomTemplateExample, CustomValuesExample, DataTablePage, DataTableRemoteExample, DataTableRowsExample, DataTableServiceExample, DatePickerDesignPage, DatePickerDevelopPage, DatePickerExample, DatePickerExamplesPage, DatePickerInputExample, DatePickerLimitsExample, DateRangeInputExample, DateTimeExample, DateTimeInputExample, DateTimePickerDesignPage, DateTimePickerDevelopPage, DateTimePickerExamplesPage, DateTimeValueExample, DefaultLayout, DefaultOptionsPickerExample, DeleteFilterModalDemo, DesignPage, DetailsCardExample, DisabledFormExample, DragDropExample, DragDropPage, DropdownDesignPage, DropdownDevelopPage, DropdownExamplesPage, DynamicFormExample, DynamicFormFieldSetsExample, DynamicFormPage, EXAMPLE_COMPONENTS, EXAMPLE_LIST, EnableDisableAllFieldsInFormExample, EntityColorsExample, EntityListValueExample, EntityPickerExample, ErrorModalExample, ExampleData, ExpansionPage, ExtendedLabelService, ExternalLinkValueExample, FiAddingRemovingExample, FiAsyncExample, FiCalculationExample, FiConfirmExample, FiDescriptionExample, FiEnableDisableExample, FiGlobalsExample, FiHideShowExample, FiMessagingExample, FiModifyAddedPickerExample, FiModifyOptionsExample, FiNestedExample, FiPopoverExample, FiRequiredExample, FiTooltipExample, FiValidationExample, FieldAnatomyExample, FieldComponentsExample, FieldDesignPage, FieldDevelopPage, FieldExamplesPage, FieldInteractionsPage, FieldNativeExample, FieldUsageExample, FigureExample, FileInputControlsExample, FormControlsPage, FormGroupsPage, FormPage, FormUsageExample, FormattedChipsExample, FormattedPickerExample, FormatterValueExample, GroupedMultiPickerExample, GroupedPickerExample, HeaderPage, HeaderSearchbarExample, HeaderSubtitleExample, HideChipsExample, HighlightJS, HomePage, HorizontalExample, HorizontalOptionsExample, HtmlTipWellExample, IconDesignPage, IconDevelopPage, IconExamplesPage, IconRadioExample, IconTipWellExample, IconValueExample, IconographyPage, IconsetExample, JustCriteriaExample, LabelExample, LargeDropDownExample, LayoutsPage, LazyExpansionExample, LegacySelectOptionExample, LinkExample, ListPage, LoadingCircleExample, LoadingDesignPage, LoadingDevelopPage, LoadingExamplesPage, LoadingLineExample, LongSelectExample, MenuContextExample, MenuDesignPage, MenuDevelopPage, MenuExamplesPage, MinimalEditorExample, MixedPickerExample, ModalAddFormDemo, ModalAddFormExample, ModalCustomDemo, ModalDesignPage, ModalDevelopPage, ModalEditFormDemo, ModalEditFormExample, ModalErrorDemo, ModalExamplesPage, ModalSuccessDemo, ModalWarningDemo, MultiDateExample, MultiDropDownExample, MultiOptionValueExample, MultiPickerPage, MultiRowToolbarExample, MultipleSelectExample, MultipleSelectWithSearchExample, NestedMenuExample, NestedMultiPickerExample, NonIdealStateDesignPage, NonIdealStateDevelopPage, NonIdealStateExamplesPage, NonIdealStateLoadingUsageExample, NonIdealStateSearchUsageExample, NonIdealStateUsageExample, NovoExamplesModule, NovoExamplesRoutesModule, NovoExamplesSharedModule, NumberRangeControlExample, OverrideTemplateExample, PAGE_LIST, PatternsNativeFormsPage, PatternsPage, PatternsTestPage, PickerControlsExample, PickerPage, PipesPage, PluralizeExample, PopOverAutoPlacementExample, PopOverBehaviorsExample, PopOverDynamicExample, PopOverHorizontalExample, PopOverPlacementExample, PopOverVerticalExample, PopoverDesignPage, PopoverDevelopPage, PopoverExamplesPage, PositionDropDownExample, PrimaryColorsExample, ProgressBarRadialUsageExample, ProgressBarUsageExample, ProgressDesignPage, ProgressDevelopPage, ProgressExamplesPage, ProgressUsagePage, QueryBuilderDesignPage, QueryBuilderDevelopPage, QueryBuilderExamplesPage, QuickNotePage, RadioButtonsPage, RaisedIconsExample, RecordHeaderExample, RowChipsExample, ScrollToItemDropDownExample, ScrollableDropDownExample, SearchPage, SearchUsageExample, SecurityExample, SecurityPage, SelectPage, SidenavPage, SingleFieldCriteriaExample, SlidesPage, SpacingPage, StepperHorizontalExample, StepperPage, StepperVerticalExample, SuccessModalExample, SwitchPage, SwitchUsageExample, TabbedGroupPickerBasicExample, TabbedGroupPickerBigGroupsExample, TabbedGroupPickerFooterExample, TabbedGroupPickerGroupsExample, TabbedGroupPickerNoSelectionExample, TabbedGroupPickerPage, TabbedGroupPickerQuickSelectExample, TabsBasicExample, TabsColorExample, TabsCondensedExample, TabsDesignPage, TabsDevelopPage, TabsExamplesPage, TabsLayout, TabsRouterExample, TabsVerticalExample, TemplatesPage, TextBasedControlsExample, TextExample, ThemedIconsExample, ThemedListExample, TilesPage, TilesUsageExample, TimeExample, TimePickerDesignPage, TimePickerDevelopPage, TimePickerExample, TimePickerExamplesPage, TimezonePage, TipWellDesignPage, TipWellDevelopPage, TipWellExamplesPage, TitleExample, ToastActionsExample, ToastOptionsExample, ToastServiceExample, ToastUsageExample, ToasterDesignPage, ToasterDevelopPage, ToasterExamplesPage, ToolbarDesignPage, ToolbarDevelopPage, ToolbarExamplesPage, TooltipAlignExample, TooltipDesignPage, TooltipDevelopPage, TooltipExamplesPage, TooltipOptionsExample, TooltipOverflowExample, TooltipPlacementExample, TooltipSizesExample, TooltipToggleExample, TooltipTypesExample, TypedefContent, TypedefExample, TypedefSnippet, TypedefSpec, TypographyPage, UpdatingFormExample, ValuePage, VerticalDynamicFormExample, VerticalExample, VerticalOptionsExample, VerticalRadioExample, WarningModalExample, WeekStartExample, allColors, analyticsColors, entityColors, primaryColors, v10Page, v11Page, v12Page, v6Page, v7Page, v8Page, v9Page };
export type { HighlightConfig, HighlightOptions, HighlightResult, LiveExample, MockData };
