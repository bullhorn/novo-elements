import { EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { PagedArrayCollection } from '../../services/data-provider/PagedArrayCollection';
export interface NovoTableConfig {
    paging?: {
        current: number;
        itemsPerPage: number;
        onPageChange: Function;
        rowOptions?: {
            value: number;
            label: string;
        }[];
        disablePageSelection?: boolean;
    };
    footers?: Array<{
        columns: Array<string>;
        method: string;
        labelColumn: string;
        label: string;
    }>;
    filtering?: boolean | any;
    sorting?: boolean | any;
    ordering?: boolean | Function;
    resizing?: boolean | Function;
    rowSelectionStyle?: string;
    rowSelect?: boolean;
    hasDetails?: boolean;
    detailsRenderer?: any;
    expandAll?: boolean;
    selectAllEnabled?: boolean;
}
export declare enum NovoTableMode {
    VIEW = 1,
    EDIT = 2,
}
export declare class NovoTableElement implements DoCheck {
    labels: NovoLabelService;
    private formUtils;
    private builder;
    config: NovoTableConfig;
    columns: Array<any>;
    theme: string;
    skipSortAndFilterClear: boolean;
    mode: NovoTableMode;
    editable: boolean;
    onRowClick: EventEmitter<any>;
    onRowSelect: EventEmitter<any>;
    onTableChange: EventEmitter<any>;
    _dataProvider: PagedArrayCollection<any>;
    _rows: Array<any>;
    selected: Array<any>;
    activeId: number;
    master: boolean;
    expandAll: boolean;
    indeterminate: boolean;
    lastPage: number;
    selectedPageCount: number;
    showSelectAllMessage: boolean;
    currentSortColumn: any;
    pagedData: Array<any>;
    pageSelected: any;
    toggledDropdownMap: any;
    NovoTableMode: typeof NovoTableMode;
    tableForm: FormGroup;
    toast: {
        theme: string;
        icon: string;
        message: string;
    };
    footers: any[];
    grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast: boolean;
    loading: boolean;
    rows: Array<any>;
    dataProvider: any;
    readonly editing: boolean;
    readonly formValue: any;
    constructor(labels: NovoLabelService, formUtils: FormUtils, builder: FormBuilder);
    onDropdownToggled(event: any, column: any): void;
    onPageChange(event: any): void;
    getOptionDataAutomationId(option: any): any;
    /**
     * @name setupColumnDefaults
     */
    setupColumnDefaults(): void;
    /**
     * @name ngDoCheck
     */
    ngDoCheck(): void;
    /**
     * @name getPageStart
     * @returns {number}
     */
    getPageStart(): number;
    /**
     * @name getPageEnd
     * @returns {*}
     */
    getPageEnd(): any;
    /**
     * @name onFilterClick
     * @param column
     * @param filter
     */
    onFilterClick(column: any, filter: any): void;
    /**
     * @name onFilterClear
     * @param column
     */
    onFilterClear(column: any): void;
    clearAllSortAndFilters(): void;
    /**
     * @name onFilterChange
     *
     * @description This method updates the row data to reflect the active filters.
     */
    onFilterChange(): void;
    escapeCharacters(filter: any): any;
    /**
     * @name isFilterActive
     * @param column
     * @param filter
     * @returns {boolean}
     *
     * @description
     */
    isFilterActive(column: any, filter: any): boolean;
    /**
     * @name onSortChange
     * @param newSortColumn
     */
    onSortChange(column: any): void;
    /**
     * @name fireTableChangeEvent
     */
    fireTableChangeEvent(): void;
    /**
     * @name findColumnIndex
     * @param value
     * @returns {*}
     */
    findColumnIndex(value: any): number;
    /**
     * @name onOrderChange
     * @param event
     */
    onOrderChange(event: any): void;
    /**
     * @name selectPage
     */
    expandAllOnPage(expanded: any): void;
    /**
     * @name selectPage
     */
    selectPage(): void;
    /**
     * @name selectAll
     */
    selectAll(value: any): void;
    /**
     * @name rowSelectHandler
     */
    rowSelectHandler(): void;
    /**
     * @name emitSelected
     * @param selected
     */
    emitSelected(selected: any): void;
    /**
     * @name rowClickHandler
     * @param row
     */
    rowClickHandler(row: any): void;
    /**
     * @name setDateOptions
     * @returns {Array}
     */
    getDefaultOptions(column: any): any[];
    onCalenderSelect(column: any, event: any): void;
    onFilterKeywords(config: any): void;
    /**
     * @name setTableEdit
     * @description Sets the Table into EDIT mode, based on the row/column passed you can enter in a few states
     * (1) setTableEdit() - don't pass any to put the FULL table into edit mode
     * (2) setTableEdit(1) - pass only row to put that FULL row of the table into edit mode
     * (3) setTableEdit(1, 1) - pass row and column to put that column of the row of the table into edit mode
     * @param {number} [rowNumber]
     * @param {number} [columnNumber]
     * @memberOf NovoTableElement
     */
    setTableEdit(rowNumber?: number, columnNumber?: number): void;
    /**
     * @name leaveEditMode
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param {cancel} [boolean] - whether or not to save data or undo
     */
    private leaveEditMode(cancel);
    /**
     * @name addEditableRow
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @param {*} [defaultValue={}]
     * @memberOf NovoTableElement
     */
    addEditableRow(defaultValue?: any): void;
    /**
     * @name validateAndGetUpdatedData
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @returns {{ changed?: any[], errors?: { errors: any, row: any, index: number }[] }} - either the changed data or errors!
     * @memberOf NovoTableElement
     */
    validateAndGetUpdatedData(): {
        changed?: any[];
        errors?: {
            errors: any;
            row: any;
            index: number;
        }[];
    };
    /**
     * @name cancelEditing
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    cancelEditing(): void;
    /**
     * @name saveChanges
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    saveChanges(): void;
    /**
     * @name displayToastMessage
     * @description Displays a toast message inside of the table
     * @param {{ icon: string, theme: string, message: string }} toast
     * @param {number} [hideDelay]
     * @memberOf NovoTableElement
     */
    displayToastMessage(toast: {
        icon: string;
        theme: string;
        message: string;
    }, hideDelay?: number): void;
    /**
     * @name hideToastMessage
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    hideToastMessage(): void;
    /**
     * @name toggleLoading
     * @description display the loading overlay on the table
     * @param {boolean} show
     * @memberOf NovoTableElement
     */
    toggleLoading(show: boolean): void;
    /**
     * @name isColumnHidden
     * @description hide a column in edit or view mode
     * @param {column meta} column
     * @returns {boolean}
     * @memberOf NovoTableElement
     */
    isColumnHidden(column: any): boolean;
}
