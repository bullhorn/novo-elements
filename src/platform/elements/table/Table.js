"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// Vendor
var dateFns = require("date-fns");
// APP
var novo_label_service_1 = require("../../services/novo-label-service");
var Helpers_1 = require("../../utils/Helpers");
var FormUtils_1 = require("../../utils/form-utils/FormUtils");
var FormControls_1 = require("./../form/FormControls");
var CollectionEvent_1 = require("../../services/data-provider/CollectionEvent");
var PagedArrayCollection_1 = require("../../services/data-provider/PagedArrayCollection");
// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
var NovoTableMode;
(function (NovoTableMode) {
    NovoTableMode[NovoTableMode["VIEW"] = 1] = "VIEW";
    NovoTableMode[NovoTableMode["EDIT"] = 2] = "EDIT";
})(NovoTableMode = exports.NovoTableMode || (exports.NovoTableMode = {}));
var NovoTableElement = (function () {
    function NovoTableElement(labels, formUtils, builder) {
        this.labels = labels;
        this.formUtils = formUtils;
        this.builder = builder;
        this.config = {};
        this.skipSortAndFilterClear = false;
        this.mode = NovoTableMode.VIEW;
        this.editable = false;
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onTableChange = new core_1.EventEmitter();
        this._rows = [];
        this.selected = [];
        this.activeId = 0;
        this.master = false;
        this.expandAll = false;
        this.indeterminate = false;
        this.lastPage = 0;
        this.selectedPageCount = 0;
        this.showSelectAllMessage = false;
        this.pagedData = [];
        // Map to keep track of what dropdowns are toggled
        // Used to properly *ngIf the <list> so that the keepFilterFocused Directive
        // will properly fire the ngAfterViewInit event
        this.toggledDropdownMap = {};
        this.NovoTableMode = NovoTableMode;
        this.tableForm = new forms_1.FormGroup({});
        this.footers = [];
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        this.loading = false;
    }
    Object.defineProperty(NovoTableElement.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (rows) {
            this.dataProvider = rows;
            if (rows && rows.length > 0) {
                this.setupColumnDefaults();
            }
            // this is a temporary/hacky fix until async dataloading is handled within the table
            if (!this.skipSortAndFilterClear) {
                this.clearAllSortAndFilters();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoTableElement.prototype, "dataProvider", {
        get: function () {
            return this._dataProvider;
        },
        set: function (dp) {
            var _this = this;
            this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection_1.PagedArrayCollection(dp) : dp;
            this._dataProvider.dataChange.debounceTime(100).subscribe(function (event) {
                switch (event.type) {
                    case CollectionEvent_1.CollectionEvent.CHANGE:
                        _this._rows = event.data;
                        // Setup form
                        _this.tableForm = _this.builder.group({
                            rows: _this.builder.array([])
                        });
                        // Remove all selection on sort change if selection is on
                        if (_this.config.rowSelectionStyle === 'checkbox') {
                            _this.pagedData = event.data;
                            _this.pageSelected = _this.pagedData.filter(function (r) { return r._selected; });
                            _this.rowSelectHandler();
                        }
                        // Find that columns we might need to sum up via the footer
                        var columnsToSum_1 = [];
                        var columnSums_1 = {};
                        if (_this.config.footers) {
                            _this.config.footers.forEach(function (config) {
                                columnsToSum_1.push.apply(columnsToSum_1, config.columns);
                            });
                            // Only have unique columns, filter out duplicates
                            columnsToSum_1 = columnsToSum_1.filter(function (item, index, array) { return array.indexOf(item) === index; });
                        }
                        // Make a form for each row
                        var tableFormRows_1 = _this.tableForm.controls['rows'];
                        _this._rows.forEach(function (row, index) {
                            var rowControls = [];
                            row.controls = {};
                            row._editing = {};
                            row._expanded = _this.config.expandAll;
                            row.rowId = _this._rows.length;
                            _this.columns.forEach(function (column) {
                                // Use the control passed or use a ReadOnlyControl so that the form has the values
                                var control = column.editorConfig ? FormControls_1.ControlFactory.create(column.editorType, column.editorConfig) : new FormControls_1.ReadOnlyControl({ key: column.name });
                                row.controls[column.name] = control;
                                rowControls.push(control);
                            });
                            _this.formUtils.setInitialValues(rowControls, row, false);
                            tableFormRows_1.push(_this.formUtils.toFormGroup(rowControls));
                            // Setup the total footer if configured
                            // Array of keys to total
                            if (columnsToSum_1.length !== 0) {
                                columnsToSum_1.forEach(function (column) {
                                    if (Helpers_1.Helpers.isBlank(columnSums_1[column])) {
                                        columnSums_1[column] = 0;
                                    }
                                    columnSums_1[column] += row[column];
                                });
                            }
                        });
                        if (_this.mode === NovoTableMode.EDIT) {
                            _this.setTableEdit();
                        }
                        // Setup the footers (if any)
                        if (_this.config.footers) {
                            _this.footers = [];
                            _this.config.footers.forEach(function (footerConfig, footerConfigIndex) {
                                var footer = {};
                                footer[footerConfig.labelColumn] = footerConfig.label;
                                footerConfig.columns.forEach(function (column) {
                                    if (footerConfig.method === 'AVG' && _this._rows.length !== 0) {
                                        footer[column] = columnSums_1[column] / _this._rows.length;
                                    }
                                    else {
                                        footer[column] = columnSums_1[column];
                                    }
                                });
                                _this.footers.push(footer);
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
            if (this.config.paging) {
                this._dataProvider.page = this.config.paging.current;
                this._dataProvider.pageSize = this.config.paging.itemsPerPage;
            }
            else {
                // Paging turned off, return basically all of the data
                this._dataProvider.page = 1;
                this._dataProvider.pageSize = 500;
            }
            if (dp && dp.length > 0) {
                this.setupColumnDefaults();
            }
            this._dataProvider.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoTableElement.prototype, "editing", {
        get: function () {
            return this.mode === NovoTableMode.EDIT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NovoTableElement.prototype, "formValue", {
        get: function () {
            return this.tableForm.value;
        },
        enumerable: true,
        configurable: true
    });
    NovoTableElement.prototype.onDropdownToggled = function (event, column) {
        this.toggledDropdownMap[column] = event;
    };
    NovoTableElement.prototype.onPageChange = function (event) {
        //this.dataProvider.page = event.page;
        //this.dataProvider.pageSize = event.itemsPerPage;
    };
    NovoTableElement.prototype.getOptionDataAutomationId = function (option) {
        if (!Helpers_1.Helpers.isBlank(option.value)) {
            return option.value;
        }
        return option;
    };
    /**
     * @name setupColumnDefaults
     */
    NovoTableElement.prototype.setupColumnDefaults = function () {
        var _this = this;
        // Check columns for cell option types
        this.columns.forEach(function (column) {
            if (column && column.type) {
                switch (column.type) {
                    case 'date':
                        // Set options based on dates if there are none
                        column.options = (column.options || _this.getDefaultOptions(column));
                        break;
                    default:
                        break;
                }
            }
        });
    };
    /**
     * @name ngDoCheck
     */
    NovoTableElement.prototype.ngDoCheck = function () {
        if (this.config.paging && this.config.paging.current !== this.lastPage) {
            this.rowSelectHandler();
            this.showSelectAllMessage = false;
        }
        this.lastPage = this.config.paging ? this.config.paging.current : 1;
    };
    /**
     * @name getPageStart
     * @returns {number}
     */
    NovoTableElement.prototype.getPageStart = function () {
        return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
    };
    /**
     * @name getPageEnd
     * @returns {*}
     */
    NovoTableElement.prototype.getPageEnd = function () {
        return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
    };
    /**
     * @name onFilterClick
     * @param column
     * @param filter
     */
    NovoTableElement.prototype.onFilterClick = function (column, filter) {
        if (filter.range && !column.calendarShow) {
            column.calenderShow = true;
            return;
        }
        if (Array.isArray(column.filter) && column.multiple) {
            if (~column.filter.indexOf(filter)) {
                // Remove filter
                column.filter.splice(column.filter.indexOf(filter), 1);
                if (filter.range) {
                    column.calenderShow = false;
                }
                if (column.filter.length === 0) {
                    column.filter = null;
                }
            }
            else {
                // Add filter
                column.filter.push(filter);
            }
        }
        else {
            column.filter = Helpers_1.Helpers.isBlank(filter.value) ? filter : filter.value;
        }
        this.onFilterChange();
    };
    /**
     * @name onFilterClear
     * @param column
     */
    NovoTableElement.prototype.onFilterClear = function (column) {
        var _this = this;
        setTimeout(function () {
            column.filter = null;
            column.freetextFilter = null;
            _this.onFilterChange();
            if (column.originalOptions) {
                column.options = column.originalOptions;
            }
        });
    };
    NovoTableElement.prototype.clearAllSortAndFilters = function () {
        if (this.config.filtering) {
            this.columns.forEach(function (column) {
                column.filter = null;
                column.sort = null;
            });
        }
    };
    /**
     * @name onFilterChange
     *
     * @description This method updates the row data to reflect the active filters.
     */
    NovoTableElement.prototype.onFilterChange = function () {
        if (this.config.filtering) {
            // Array of filters
            var filters = this.columns.filter(function (col) { return !Helpers_1.Helpers.isEmpty(col.filter); });
            if (filters.length) {
                var query = {};
                var _loop_1 = function (column) {
                    if (Helpers_1.Helpers.isFunction(column.match)) {
                        query[column.name] = function (value, record) {
                            return column.match(record, column.filter);
                        };
                    }
                    else if (column.preFilter && Helpers_1.Helpers.isFunction(column.preFilter)) {
                        query = Object.assign({}, query, column.preFilter(this_1.escapeCharacters(column.filter)));
                    }
                    else if (Array.isArray(column.filter)) {
                        // The filters are an array (multi-select), check value
                        var options = column.filter;
                        // We have an array of {value: '', labels: ''}
                        if (options[0].value || options[0].label) {
                            options = column.filter.map(function (opt) { return opt.value; });
                        }
                        query[column.name] = { any: options };
                    }
                    else if (column.type && column.type === 'date') {
                        if (column.filter.startDate && column.filter.endDate) {
                            query[column.name] = {
                                min: dateFns.startOfDay(column.filter.startDate),
                                max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(column.filter.endDate), 1))
                            };
                        }
                        else {
                            query[column.name] = {
                                min: column.filter.min ? dateFns.addDays(dateFns.startOfToday(), column.filter.min) : dateFns.startOfToday(),
                                max: column.filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), column.filter.max) : dateFns.startOfTomorrow()
                            };
                        }
                    }
                    else {
                        query[column.name] = column.filter;
                    }
                };
                var this_1 = this;
                for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                    var column = filters_1[_i];
                    _loop_1(column);
                }
                if (Helpers_1.Helpers.isFunction(this.config.filtering)) {
                    this.config.filtering(query);
                }
                else {
                    this._dataProvider.filter = query;
                }
            }
            else {
                this._dataProvider.filter = {};
            }
            // Trickle down to keep sort
            // this.onSortChange(this.currentSortColumn);
            // If paging, reset page
            if (this.config.paging) {
                this.config.paging.current = 1;
            }
            // Remove all selection on sort change if selection is on
            if (this.config.rowSelectionStyle === 'checkbox') {
                this.selectAll(false);
            }
        }
    };
    NovoTableElement.prototype.escapeCharacters = function (filter) {
        if (typeof (filter) === 'string') {
            return filter.replace(/'/g, '\'\'');
        }
        return filter;
    };
    /**
     * @name isFilterActive
     * @param column
     * @param filter
     * @returns {boolean}
     *
     * @description
     */
    NovoTableElement.prototype.isFilterActive = function (column, filter) {
        //TODO: This needs to be refactored
        var isActive = false;
        if (column && !Helpers_1.Helpers.isBlank(column.filter) && !Helpers_1.Helpers.isBlank(filter)) {
            if (Array.isArray(column.filter)) {
                if (typeof (filter) !== 'string') {
                    isActive = column.filter.some(function (item) {
                        return item.label === filter.label;
                    });
                }
                else {
                    isActive = column.filter.includes(filter);
                }
            }
            else {
                if (typeof (column.filter) === typeof (filter)) {
                    isActive = (column.filter === filter);
                }
                else {
                    isActive = (column.filter === filter.value);
                }
            }
        }
        return isActive;
    };
    /**
     * @name onSortChange
     * @param newSortColumn
     */
    NovoTableElement.prototype.onSortChange = function (column) {
        var _this = this;
        this.currentSortColumn = column;
        var sortedColumns = this.columns.filter(function (thisColumn) {
            return thisColumn.sort && thisColumn !== _this.currentSortColumn;
        });
        for (var _i = 0, sortedColumns_1 = sortedColumns; _i < sortedColumns_1.length; _i++) {
            var sortedColumn = sortedColumns_1[_i];
            sortedColumn.sort = null;
        }
        if (column) {
            if (Helpers_1.Helpers.isFunction(this.config.sorting)) {
                this.config.sorting();
            }
            else if (Helpers_1.Helpers.isFunction(column.preSort)) {
                this._dataProvider.sort = [].concat(column.preSort(column));
            }
            else {
                this._dataProvider.sort = [{ field: (column.compare || column.name), reverse: column.sort === 'desc' }];
            }
        }
        // Fire table change event
        // this.fireTableChangeEvent();
        // If paging, reset page
        if (this.config.paging) {
            this.config.paging.current = 1;
        }
        // Remove all selection on sort change if selection is on
        if (this.config.rowSelectionStyle === 'checkbox') {
            this.selectAll(false);
        }
    };
    /**
     * @name fireTableChangeEvent
     */
    NovoTableElement.prototype.fireTableChangeEvent = function () {
        // Construct a table change object
        var onTableChange = {};
        var filters = this.columns.filter(function (col) { return col.filter && col.filter.length; });
        onTableChange.filter = filters.length ? filters : false;
        onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
        onTableChange.rows = this.rows;
        // Emit event
        this.onTableChange.emit(onTableChange);
    };
    /**
     * @name findColumnIndex
     * @param value
     * @returns {*}
     */
    NovoTableElement.prototype.findColumnIndex = function (value) {
        for (var i = 0; i < this.columns.length; i += 1) {
            if (this.columns[i].name === value) {
                return i;
            }
        }
        return null;
    };
    /**
     * @name onOrderChange
     * @param event
     */
    NovoTableElement.prototype.onOrderChange = function (event) {
        var oldIndex = this.findColumnIndex(event.first.name);
        var newIndex = this.findColumnIndex(event.second.name);
        this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
        this.onSortChange(this.currentSortColumn);
    };
    /**
     * @name selectPage
     */
    NovoTableElement.prototype.expandAllOnPage = function (expanded) {
        this.config.expandAll = !expanded;
        for (var _i = 0, _a = this.dataProvider.list; _i < _a.length; _i++) {
            var row = _a[_i];
            row._expanded = this.config.expandAll;
        }
    };
    /**
     * @name selectPage
     */
    NovoTableElement.prototype.selectPage = function () {
        if (!this.master) {
            this.selectAll(false);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
            this.showSelectAllMessage = false;
        }
        else {
            this.indeterminate = false;
            //this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
            for (var _i = 0, _a = this.pagedData; _i < _a.length; _i++) {
                var row = _a[_i];
                row._selected = this.master;
            }
            this.selected = this.dataProvider.list.filter(function (r) { return r._selected; });
            this.pageSelected = this.pagedData.filter(function (r) { return r._selected; });
            this.emitSelected(this.selected);
            // Only show the select all message when there is only one new page selected at a time
            this.selectedPageCount++;
            this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.total;
        }
    };
    /**
     * @name selectAll
     */
    NovoTableElement.prototype.selectAll = function (value) {
        this.master = value;
        this.indeterminate = false;
        for (var _i = 0, _a = this.dataProvider.list; _i < _a.length; _i++) {
            var row = _a[_i];
            row._selected = value;
        }
        this.selected = value ? this.dataProvider.list : [];
        this.showSelectAllMessage = false;
        this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        this.rowSelectHandler();
    };
    /**
     * @name rowSelectHandler
     */
    NovoTableElement.prototype.rowSelectHandler = function () {
        // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
        this.pageSelected = this.pagedData.filter(function (r) { return r._selected; });
        this.selected = this.dataProvider.list.filter(function (r) { return r._selected; });
        if (this.pageSelected.length === 0) {
            this.master = false;
            this.indeterminate = false;
        }
        else if (this.pageSelected.length === this.pagedData.length) {
            this.master = true;
            this.indeterminate = false;
        }
        else {
            this.master = false;
            this.indeterminate = true;
            // Breaking the selected page count
            this.showSelectAllMessage = false;
            this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
        }
        this.emitSelected(this.selected);
    };
    /**
     * @name emitSelected
     * @param selected
     */
    NovoTableElement.prototype.emitSelected = function (selected) {
        this.onRowSelect.emit({ length: selected.length, selected: selected });
    };
    /**
     * @name rowClickHandler
     * @param row
     */
    NovoTableElement.prototype.rowClickHandler = function (row) {
        if (this.config.rowSelect) {
            this.activeId = row.id || 0;
            this.onRowClick.emit(row);
        }
    };
    /**
     * @name setDateOptions
     * @returns {Array}
     */
    NovoTableElement.prototype.getDefaultOptions = function (column) {
        // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
        var opts = [
            { label: this.labels.past1Day, min: -1, max: 0 },
            { label: this.labels.past7Days, min: -7, max: 0 },
            { label: this.labels.past30Days, min: -30, max: 0 },
            { label: this.labels.past90Days, min: -90, max: 0 },
            { label: this.labels.past1Year, min: -366, max: 0 },
            { label: this.labels.next1Day, min: 0, max: 1 },
            { label: this.labels.next7Days, min: 0, max: 7 },
            { label: this.labels.next30Days, min: 0, max: 30 },
            { label: this.labels.next90Days, min: 0, max: 90 },
            { label: this.labels.next1Year, min: 0, max: 366 },
        ];
        if (column && column.range) {
            opts.push({
                label: this.labels.customDateRange,
                range: true,
            });
        }
        return opts;
    };
    NovoTableElement.prototype.onCalenderSelect = function (column, event) {
        var _this = this;
        setTimeout(function () {
            if (event.startDate && event.endDate) {
                _this.onFilterChange();
            }
        }, 10);
    };
    NovoTableElement.prototype.onFilterKeywords = function (config) {
        if (config && config.filtering && config.filtering.freetextFilter) {
            var filterKeywords_1 = config.filtering.freetextFilter.toLowerCase();
            if (!config.filtering.originalOptions) {
                config.filtering.originalOptions = config.filtering.options;
            }
            var newOptions = config.filtering.originalOptions.filter(function (option) {
                var value = option && option.label ? option.label : option;
                value = value.toLowerCase() ? value.toLowerCase() : value;
                if (value === filterKeywords_1) {
                    return true;
                }
                else if (~value.indexOf(filterKeywords_1) || ~value.indexOf(filterKeywords_1)) {
                    return true;
                }
                return false;
            });
            config.filtering.options = newOptions;
            config.filtering.filter = config.filtering.freetextFilter;
        }
        else {
            config.filtering.options = config.filtering.originalOptions;
        }
        this.onFilterChange();
    };
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
    NovoTableElement.prototype.setTableEdit = function (rowNumber, columnNumber) {
        var _this = this;
        this.mode = NovoTableMode.EDIT;
        this._dataProvider.edit();
        this._rows.forEach(function (row, rowIndex) {
            row._editing = row._editing || {};
            _this.columns.forEach(function (column, columnIndex) {
                if (column.viewOnly) {
                    row._editing[column.name] = false;
                }
                else if (Helpers_1.Helpers.isEmpty(rowNumber) && Helpers_1.Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers_1.Helpers.isEmpty(rowNumber) && rowIndex === Number(rowNumber) && Helpers_1.Helpers.isEmpty(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else if (!Helpers_1.Helpers.isEmpty(rowNumber) && !Helpers_1.Helpers.isEmpty(columnNumber) && rowIndex === Number(rowNumber) && columnIndex === Number(columnNumber)) {
                    row._editing[column.name] = true;
                }
                else {
                    row._editing[column.name] = false;
                }
            });
        });
    };
    /**
     * @name leaveEditMode
     * @description Leaves edit mode for the Table and puts everything back to VIEW only
     * @memberOf NovoTableElement
     * @param {cancel} [boolean] - whether or not to save data or undo
     */
    NovoTableElement.prototype.leaveEditMode = function (cancel) {
        var _this = this;
        this.mode = NovoTableMode.VIEW;
        this._rows.forEach(function (row) {
            row._editing = row._editing || {};
            _this.columns.forEach(function (column) {
                row._editing[column.name] = false;
            });
        });
        if (cancel) {
            this._dataProvider.undo();
        }
        else {
            this._dataProvider.commit();
        }
        this.hideToastMessage();
    };
    /**
     * @name addEditableRow
     * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
     * @param {*} [defaultValue={}]
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.addEditableRow = function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = {}; }
        var tableFormRows = this.tableForm.controls['rows'];
        var row = {};
        var rowControls = [];
        row.controls = {};
        row._editing = {};
        row.rowId = this._rows.length + 1;
        this.columns.forEach(function (column) {
            // Use the control passed or use a ReadOnlyControl so that the form has the values
            var control = column.editorConfig ? FormControls_1.ControlFactory.create(column.editorType, column.editorConfig) : new FormControls_1.ReadOnlyControl({ key: column.name });
            control.value = null; // remove copied column value
            row.controls[column.name] = control;
            row._editing[column.name] = !column.viewOnly;
            rowControls.push(control);
        });
        this.formUtils.setInitialValues(rowControls, defaultValue, false);
        tableFormRows.push(this.formUtils.toFormGroup(rowControls));
        this._rows.push(row);
    };
    /**
     * @name validateAndGetUpdatedData
     * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
     * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
     * { id: ID_OF_RECORD, key: value } -- data that was updated
     * { id: undefined, key: value } -- data that was added
     * @returns {{ changed?: any[], errors?: { errors: any, row: any, index: number }[] }} - either the changed data or errors!
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.validateAndGetUpdatedData = function () {
        var _this = this;
        if (this.tableForm && this.tableForm.controls && this.tableForm.controls['rows']) {
            var changedRows_1 = [];
            var errors_1 = [];
            // Go over the FormArray's controls
            this.tableForm.controls['rows'].controls.forEach(function (formGroup, index) {
                var changedRow = null;
                var error = null;
                // Go over the form group controls
                Object.keys(formGroup.controls).forEach(function (key) {
                    var control = formGroup.controls[key];
                    // Handle value changing
                    if (control && control.dirty && !control.errors) {
                        if (!changedRow) {
                            // Append the ID, so we have some key to save against
                            changedRow = {};
                            if (_this._rows[index].id) {
                                changedRow.id = _this._rows[index].id;
                            }
                        }
                        // If dirty, grab value off the form
                        changedRow[key] = _this.tableForm.value['rows'][index][key];
                        // Set value back to row (should be already done via the server call, but do it anyway)
                        _this._rows[index][key] = changedRow[key];
                    }
                    else if (control && control.errors) {
                        // Handle errors
                        if (!error) {
                            error = {};
                        }
                        error[key] = control.errors;
                        control.markAsDirty();
                        control.markAsTouched();
                    }
                });
                if (changedRow) {
                    changedRows_1.push(changedRow);
                }
                if (error) {
                    errors_1.push({ errors: error, row: _this._rows[index], index: index });
                }
            });
            var ret = {};
            // Return errors if any, otherwise return the changed rows
            if (errors_1.length === 0) {
                return { changed: changedRows_1 };
            }
            return { errors: errors_1 };
        }
    };
    /**
     * @name cancelEditing
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.cancelEditing = function () {
        this.leaveEditMode(true);
    };
    /**
     * @name saveChanges
     * @description Refresh the data provider and leave edit mode
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.saveChanges = function () {
        this.leaveEditMode(false);
    };
    /**
     * @name displayToastMessage
     * @description Displays a toast message inside of the table
     * @param {{ icon: string, theme: string, message: string }} toast
     * @param {number} [hideDelay]
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.displayToastMessage = function (toast, hideDelay) {
        var _this = this;
        this.loading = false;
        this.toast = toast;
        if (hideDelay) {
            setTimeout(function () { return _this.hideToastMessage(); }, hideDelay);
        }
    };
    /**
     * @name hideToastMessage
     * @description Force hide the toast message
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.hideToastMessage = function () {
        var _this = this;
        this.toast = null;
        // Hack to make the table display properly after hiding the toast
        this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = true;
        setTimeout(function () {
            _this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
        });
    };
    /**
     * @name toggleLoading
     * @description display the loading overlay on the table
     * @param {boolean} show
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.toggleLoading = function (show) {
        this.loading = show;
    };
    /**
     * @name isColumnHidden
     * @description hide a column in edit or view mode
     * @param {column meta} column
     * @returns {boolean}
     * @memberOf NovoTableElement
     */
    NovoTableElement.prototype.isColumnHidden = function (column) {
        return this.editing ? !!column.hideColumnOnEdit : !!column.hideColumnOnView;
    };
    return NovoTableElement;
}());
NovoTableElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-table',
                host: {
                    '[attr.theme]': 'theme',
                    '[class.editing]': 'mode === NovoTableMode.EDIT',
                    '[class.novo-table-loading]': 'loading'
                },
                // directives: [],
                template: "\n        <header *ngIf=\"columns.length\">\n            <ng-content select=\"novo-table-header\"></ng-content>\n            <div class=\"header-actions\">\n                <novo-pagination *ngIf=\"config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())\"\n                                 [rowOptions]=\"config.paging.rowOptions\"\n                                 [disablePageSelection]=\"config.paging.disablePageSelection\"\n                                 [(page)]=\"dataProvider.page\"\n                                 [(itemsPerPage)]=\"dataProvider.pageSize\"\n                                 [totalItems]=\"dataProvider.total\"\n                                 (onPageChange)=\"onPageChange($event)\">\n                </novo-pagination>\n                <ng-content select=\"novo-table-actions\"></ng-content>\n            </div>\n        </header>\n        <div class=\"novo-table-loading-overlay\" *ngIf=\"loading || dataProvider.isLoading()\">\n            <novo-loading></novo-loading>\n        </div>\n        <novo-toast *ngIf=\"toast\" [theme]=\"toast?.theme\" [icon]=\"toast?.icon\" [message]=\"toast?.message\"></novo-toast>\n        <div class=\"table-container\" *ngIf=\"!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast\">\n            <novo-form hideHeader=\"true\" [form]=\"tableForm\">\n                <table class=\"table table-striped dataTable\" [class.table-details]=\"config.hasDetails\" role=\"grid\">\n                <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->\n                <thead *ngIf=\"columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)\">\n                    <tr role=\"row\">\n                        <!-- DETAILS -->\n                        <th class=\"row-actions\" *ngIf=\"config.hasDetails\">\n                            <button theme=\"icon\" icon=\"next\" (click)=\"expandAllOnPage(config.expandAll)\" *ngIf=\"!config.expandAll\" data-automation-id=\"expand-all\"></button>\n                            <button theme=\"icon\" icon=\"sort-desc\" (click)=\"expandAllOnPage(config.expandAll)\" *ngIf=\"config.expandAll\" data-automation-id=\"collapse-all\"></button>\n                        </th>\n                        <!-- CHECKBOX -->\n                        <th class=\"row-actions checkbox mass-action\" *ngIf=\"config.rowSelectionStyle === 'checkbox'\">\n                            <novo-checkbox [(ngModel)]=\"master\" [indeterminate]=\"pageSelected.length > 0 && pageSelected.length < pagedData.length\" (ngModelChange)=\"selectPage($event)\" data-automation-id=\"select-all-checkbox\" [tooltip]=\"master ? labels.deselectAll : labels.selectAllOnPage\" tooltipPosition=\"right\"></novo-checkbox>\n                        </th>\n                        <!-- TABLE HEADERS -->\n                        <th *ngFor=\"let column of columns\" [ngClass]=\"{ 'mass-action': config?.rowSelectionStyle === 'checkbox', 'actions': column?.actions?.items?.length > 0, 'preview': column?.name === 'preview' }\" [novoThOrderable]=\"column\" (onOrderChange)=\"onOrderChange($event)\" [hidden]=\"isColumnHidden(column)\">\n                            <div class=\"th-group\" [attr.data-automation-id]=\"column.id || column.name\" *ngIf=\"!column.hideHeader\">\n                                <!-- LABEL & SORT ARROWS -->\n                                <div class=\"th-title\" [ngClass]=\"(config.sorting !== false && column.sorting !== false) ? 'sortable' : ''\" [novoThSortable]=\"config\" [column]=\"column\" (onSortChange)=\"onSortChange($event)\">\n                                    <label>{{ column.title || column.label }}</label>\n                                    <div class=\"table-sort-icons\" tooltipPosition=\"bottom\" [tooltip]=\"labels.sort\" [ngClass]=\"column.sort || ''\" *ngIf=\"config.sorting !== false && column.sorting !== false\">\n                                        <i class=\"bhi-arrow-up\"></i>\n                                        <i class=\"bhi-arrow-down\"></i>\n                                    </div>\n                                </div>\n                                <!-- FILTER DROP-DOWN -->\n                                <novo-dropdown side=\"right\" *ngIf=\"config.filtering !== false && column.filtering !== false\" class=\"column-filters\" (toggled)=\"onDropdownToggled($event, column.name)\" appendToBody=\"true\" parentScrollSelector=\".table-container\" containerClass=\"table-dropdown\">\n                                    <button type=\"button\" theme=\"icon\" icon=\"filter\" tooltipPosition=\"bottom\" [tooltip]=\"labels.filters\" [class.filtered]=\"column.filter || column.filter===false\"></button>\n                                    <!-- FILTER OPTIONS LIST -->\n                                    <list *ngIf=\"(column?.options?.length || column?.originalOptions?.length) && column?.type !== 'date' && toggledDropdownMap[column.name]\">\n                                        <item class=\"filter-search\">\n                                            <div class=\"header\">\n                                                <span>{{ labels.filters }}</span>\n                                                <button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"onFilterClear(column)\" *ngIf=\"column.filter || column.filter===false\">{{ labels.clear }}</button>\n                                            </div>\n                                            <input type=\"text\" *ngIf=\"!!column.allowCustomTextOption\" [attr.id]=\"column.name + '-input'\" [novoTableFilter]=\"column\" (onFilterChange)=\"onFilterKeywords($event)\" [(ngModel)]=\"column.freetextFilter\" keepFilterFocused/>\n                                        </item>\n                                        <item [ngClass]=\"{ active: isFilterActive(column, option) }\" *ngFor=\"let option of column.options\" (click)=\"onFilterClick(column, option)\" [attr.data-automation-id]=\"getOptionDataAutomationId(option)\">\n                                            <span>{{ option?.label || option }}</span> <i class=\"bhi-check\" *ngIf=\"isFilterActive(column, option)\"></i>\n                                        </item>\n                                    </list>\n                                    <!-- FILTER SEARCH INPUT -->\n                                    <list *ngIf=\"!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]\">\n                                        <item class=\"filter-search\">\n                                            <div class=\"header\">\n                                                <span>{{ labels.filters }}</span>\n                                                <button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"onFilterClear(column)\" *ngIf=\"column.filter\">{{ labels.clear }}</button>\n                                            </div>\n                                            <input type=\"text\" [attr.id]=\"column.name + '-input'\" [novoTableFilter]=\"column\" (onFilterChange)=\"onFilterChange($event)\" [(ngModel)]=\"column.filter\" keepFilterFocused/>\n                                        </item>\n                                    </list>\n                                    <!-- FILTER DATE OPTIONS -->\n                                    <list *ngIf=\"column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]\">\n                                        <item class=\"filter-search\" *ngIf=\"!column.calenderShow\">\n                                            <div class=\"header\">\n                                                <span>{{ labels.filters }}</span>\n                                                <button theme=\"dialogue\" color=\"negative\" icon=\"times\" (click)=\"onFilterClear(column)\" *ngIf=\"column.filter\">{{ labels.clear }}</button>\n                                            </div>\n                                        </item>\n                                        <item [ngClass]=\"{ active: isFilterActive(column, option) }\" *ngFor=\"let option of column.options\" (click)=\"onFilterClick(column, option)\" [keepOpen]=\"option.range\" [hidden]=\"column.calenderShow\" [attr.data-automation-id]=\"(option?.label || option)\">\n                                            {{ option?.label || option }} <i class=\"bhi-check\" *ngIf=\"isFilterActive(column, option)\"></i>\n                                        </item>\n                                        <div class=\"calender-container\" [hidden]=\"!column.calenderShow\">\n                                            <div (click)=\"column.calenderShow=false\"><i class=\"bhi-previous\"></i>{{ labels.backToPresetFilters }}</div>\n                                            <novo-date-picker #rangePicker (onSelect)=\"onCalenderSelect(column, $event)\" [(ngModel)]=\"column.filter\" range=\"true\"></novo-date-picker>\n                                        </div>\n                                    </list>\n                                </novo-dropdown>\n                            </div>\n                        </th>\n                    </tr>\n                </thead>\n                <!-- TABLE DATA -->\n                <tbody *ngIf=\"!dataProvider.isEmpty() || editing\">\n                    <tr class=\"table-selection-row\" *ngIf=\"config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled\" data-automation-id=\"table-selection-row\">\n                        <td colspan=\"100%\">\n                            {{labels.selectedRecords(selected.length)}} <a (click)=\"selectAll(true)\" data-automation-id=\"all-matching-records\">{{labels.totalRecords(dataProvider.total)}}</a>\n                        </td>\n                    </tr>\n                    <ng-template ngFor let-row=\"$implicit\" let-i=\"index\" [ngForOf]=\"rows\">\n                        <tr class=\"table-row\" [ngClass]=\"row.customClass || ''\" [attr.data-automation-id]=\"row.id\" (click)=\"rowClickHandler(row)\" [class.active]=\"row.id === activeId\">\n                            <td class=\"row-actions\" *ngIf=\"config.hasDetails\">\n                                <button theme=\"icon\" icon=\"next\" (click)=\"row._expanded=!row._expanded\" *ngIf=\"!row._expanded\"></button>\n                                <button theme=\"icon\" icon=\"sort-desc\" (click)=\"row._expanded=!row._expanded\" *ngIf=\"row._expanded\"></button>\n                            </td>\n                            <td class=\"row-actions checkbox\" *ngIf=\"config.rowSelectionStyle === 'checkbox'\">\n                                <novo-checkbox [(ngModel)]=\"row._selected\" (ngModelChange)=\"rowSelectHandler(row)\" data-automation-id=\"select-row-checkbox\"></novo-checkbox>\n                            </td>\n                            <td *ngFor=\"let column of columns\" [attr.data-automation-id]=\"column.id || column.name\" [class.novo-form-row]=\"editable\" [hidden]=\"isColumnHidden(column)\">\n                                <novo-table-cell *ngIf=\"row._editing && !row._editing[column.name]\" [hasEditor]=\"editable\" [column]=\"column\" [row]=\"row\" [form]=\"tableForm.controls.rows.controls[i]\"></novo-table-cell>\n                                <novo-control *ngIf=\"row._editing && row._editing[column.name]\" condensed=\"true\" [form]=\"tableForm.controls.rows.controls[i]\" [control]=\"row.controls[column.name]\"></novo-control>\n                            </td>\n                        </tr>\n                        <tr class=\"details-row\" *ngIf=\"config.hasDetails\" [hidden]=\"!row._expanded\" [attr.data-automation-id]=\"'details-row-'+row.id\">\n                            <td class=\"row-actions\"></td>\n                            <td [attr.colspan]=\"columns.length\">\n                                <novo-row-details [data]=\"row\" [renderer]=\"config.detailsRenderer\"></novo-row-details>\n                            </td>\n                        </tr>\n                    </ng-template>\n                </tbody>\n                <!-- NO TABLE DATA PLACEHOLDER -->\n                <tbody class=\"table-message\" *ngIf=\"dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing\" data-automation-id=\"empty-table\">\n                    <tr>\n                        <td colspan=\"100%\">\n                            <div #emptymessage><ng-content select=\"[table-empty-message]\"></ng-content></div>\n                            <div class=\"table-empty-message\" *ngIf=\"emptymessage.childNodes.length == 0\">\n                                <h4><i class=\"bhi-search-question\"></i> {{ labels.emptyTableMessage }}</h4>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n                <!-- NO MATCHING RECORDS -->\n                <tbody class=\"table-message\" *ngIf=\"dataProvider.isEmpty() && dataProvider.isFiltered()\" data-automation-id=\"empty-table\">\n                    <tr>\n                        <td colspan=\"100%\">\n                            <div #nomatchmessage><ng-content select=\"[table-no-matching-records-message]\"></ng-content></div>\n                            <div class=\"no-matching-records\" *ngIf=\"nomatchmessage.childNodes.length == 0\">\n                                <h4><i class=\"bhi-search-question\"></i> {{ labels.noMatchingRecordsMessage }}</h4>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n                <!-- TABLE DATA ERROR PLACEHOLDER -->\n                <tbody class=\"table-message\" *ngIf=\"dataProvider.hasErrors()\" data-automation-id=\"table-errors\">\n                    <tr>\n                        <td colspan=\"100%\">\n                            <div #errormessage><ng-content select=\"[table-error-message]\"></ng-content></div>\n                            <div class=\"table-error-message\" *ngIf=\"errormessage.childNodes.length == 0\">\n                                <h4><i class=\"bhi-caution\"></i> {{ labels.erroredTableMessage }}</h4>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n                <tfoot *ngIf=\"!config.footers\" [ngClass]=\"dataProvider.length % 2 == 0 ? 'odd' : 'even'\">\n                    <tr>\n                        <td colspan=\"100%\">\n                            <ng-content select=\"novo-table-footer\"></ng-content>\n                        </td>\n                    </tr>\n                </tfoot>\n                <tfoot *ngFor=\"let footer of footers;let i = index;\" class=\"novo-table-total-footer\">\n                    <tr>\n                        <td *ngFor=\"let column of columns\" [attr.data-automation-id]=\"(column.id || column.name) + '-total-' + i\">{{ footer[column.name] }}</td>\n                    </tr>\n                </tfoot>\n            </table>\n        </novo-form>\n    </div>\n    "
            },] },
];
/** @nocollapse */
NovoTableElement.ctorParameters = function () { return [
    { type: novo_label_service_1.NovoLabelService, },
    { type: FormUtils_1.FormUtils, },
    { type: forms_1.FormBuilder, },
]; };
NovoTableElement.propDecorators = {
    'config': [{ type: core_1.Input },],
    'columns': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'skipSortAndFilterClear': [{ type: core_1.Input },],
    'mode': [{ type: core_1.Input },],
    'editable': [{ type: core_1.Input },],
    'onRowClick': [{ type: core_1.Output },],
    'onRowSelect': [{ type: core_1.Output },],
    'onTableChange': [{ type: core_1.Output },],
    'rows': [{ type: core_1.Input },],
    'dataProvider': [{ type: core_1.Input },],
};
exports.NovoTableElement = NovoTableElement;
//# sourceMappingURL=Table.js.map