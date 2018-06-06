// NG2
import { Component, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
// Vendor
import * as dateFns from 'date-fns';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { ReadOnlyControl, ControlFactory } from './../form/FormControls';
import { CollectionEvent } from '../../services/data-provider/CollectionEvent';
import { PagedArrayCollection } from '../../services/data-provider/PagedArrayCollection';
import { PagedCollection } from '../../services/data-provider/PagedCollection';

export interface NovoTableConfig {
  // Paging config
  paging?: {
    current: number; // current page
    itemsPerPage: number; // items per page
    onPageChange: Function; // function to handle page changing
    rowOptions?: { value: number; label: string }[]; // page options
    disablePageSelection?: boolean; // disables the pages from being selected
  };
  // Footer config (total footer)
  footers?: Array<{
    columns: Array<string>; // string array of columns to total
    method: string; // method to use for the footer, SUM | AVG, defaults to SUM
    labelColumn: string; // column to use as the "total" label
    label: string; // label to use in the "total" label
  }>;
  // TODO: When these types are enforced as `boolean | Function`, there's a lint error. That's a bug.
  filtering?: boolean | any; // Turn on filtering for the table, boolean or function for filtering callback
  sorting?: boolean | any; // Turn on sorting for the table, boolean or function for sorting callback
  ordering?: boolean | Function; // Turn on ordering for the table, boolean or function for ordering callback
  resizing?: boolean | Function; // Turn on resizing for the table, boolean or function for resizing callback
  rowSelectionStyle?: string; // Row selection style, checkbox or row
  rowSelect?: boolean; // Turn on row selection
  hasDetails?: boolean; // Turn on details row for the table
  detailsRenderer?: any; // Renderer/component for the details row
  expandAll?: boolean; // should All Rows be expanded by default
  selectAllEnabled?: boolean; // Allows the table, while in selection mode to have a select all at the top
}

// TODO - support (1) clicking cell to edit, (2) clicking row to edit, (3) button to trigger full table to edit
export enum NovoTableMode {
  VIEW = 1,
  EDIT = 2,
}

@Component({
  selector: 'novo-table',
  host: {
    '[attr.theme]': 'theme',
    '[class.editing]': 'mode === NovoTableMode.EDIT',
    '[class.novo-table-loading]': 'loading',
  },
  // directives: [],
  template: `
        <header *ngIf="columns.length">
            <ng-content select="novo-table-header"></ng-content>
            <div class="header-actions">
                <novo-pagination *ngIf="config.paging && !(dataProvider.isEmpty() && !dataProvider.isFiltered())"
                                 [rowOptions]="config.paging.rowOptions"
                                 [disablePageSelection]="config.paging.disablePageSelection"
                                 [(page)]="dataProvider.page"
                                 [(itemsPerPage)]="dataProvider.pageSize"
                                 [totalItems]="dataProvider.total"
                                 (onPageChange)="onPageChange($event)">
                </novo-pagination>
                <ng-content select="novo-table-actions"></ng-content>
            </div>
        </header>
        <div class="novo-table-loading-overlay" *ngIf="loading || dataProvider.isLoading()">
            <novo-loading></novo-loading>
        </div>
        <novo-toast *ngIf="toast" [theme]="toast?.theme" [icon]="toast?.icon" [message]="toast?.message"></novo-toast>
        <div class="table-container" *ngIf="!grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast">
            <novo-form hideHeader="true" [form]="tableForm">
                <table class="table table-striped dataTable" [class.table-details]="config.hasDetails" role="grid">
                <!-- skipSortAndFilterClear is a hack right now, will be removed once Canvas is refactored -->
                <thead *ngIf="columns.length && (!dataProvider.isEmpty() || dataProvider.isFiltered() || skipSortAndFilterClear || editing)">
                    <tr role="row">
                        <!-- DETAILS -->
                        <th class="row-actions" *ngIf="config.hasDetails">
                            <button theme="icon" icon="next" (click)="expandAllOnPage(config.expandAll)" *ngIf="!config.expandAll" data-automation-id="expand-all"></button>
                            <button theme="icon" icon="sort-desc" (click)="expandAllOnPage(config.expandAll)" *ngIf="config.expandAll" data-automation-id="collapse-all"></button>
                        </th>
                        <!-- CHECKBOX -->
                        <th class="row-actions checkbox mass-action" *ngIf="config.rowSelectionStyle === 'checkbox'">
                            <novo-checkbox [(ngModel)]="master" [indeterminate]="pageSelected.length > 0 && pageSelected.length < pagedData.length" (ngModelChange)="selectPage($event)" data-automation-id="select-all-checkbox" [tooltip]="master ? labels.deselectAll : labels.selectAllOnPage" tooltipPosition="right"></novo-checkbox>
                        </th>
                        <!-- TABLE HEADERS -->
                        <th *ngFor="let column of columns" [ngClass]="{ 'mass-action': config?.rowSelectionStyle === 'checkbox', 'actions': column?.actions?.items?.length > 0, 'preview': column?.name === 'preview' }" [novoThOrderable]="column" (onOrderChange)="onOrderChange($event)" [hidden]="isColumnHidden(column)">
                            <div class="th-group" [attr.data-automation-id]="column.id || column.name" *ngIf="!column.hideHeader">
                                <!-- LABEL & SORT ARROWS -->
                                <div class="th-title" [ngClass]="(config.sorting !== false && column.sorting !== false) ? 'sortable' : ''" [novoThSortable]="config" [column]="column" (onSortChange)="onSortChange($event)">
                                    <label>{{ column.title || column.label }}</label>
                                    <div class="table-sort-icons" tooltipPosition="bottom" [tooltip]="labels.sort" [ngClass]="column.sort || ''" *ngIf="config.sorting !== false && column.sorting !== false">
                                        <i class="bhi-arrow-up"></i>
                                        <i class="bhi-arrow-down"></i>
                                    </div>
                                </div>
                                <!-- FILTER DROP-DOWN -->
                                <novo-dropdown side="right" *ngIf="config.filtering !== false && column.filtering !== false" class="column-filters" (toggled)="onDropdownToggled($event, column.name)" parentScrollSelector=".table-container" containerClass="table-dropdown">
                                    <button type="button" theme="icon" icon="filter" tooltipPosition="bottom" [tooltip]="labels.filters" [class.filtered]="column.filter || column.filter===false"></button>
                                    <!-- FILTER OPTIONS LIST -->
                                    <list *ngIf="(column?.options?.length || column?.originalOptions?.length) && column?.type !== 'date' && toggledDropdownMap[column.name]">
                                        <item class="filter-search">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter || column.filter===false">{{ labels.clear }}</button>
                                            </div>
                                            <input type="text" *ngIf="!!column.allowCustomTextOption" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterKeywords($event)" [(ngModel)]="column.freetextFilter" keepFilterFocused/>
                                        </item>
                                        <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [attr.data-automation-id]="getOptionDataAutomationId(option)">
                                            <span>{{ option?.label || option }}</span> <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                        </item>
                                    </list>
                                    <!-- FILTER SEARCH INPUT -->
                                    <list *ngIf="!(column?.options?.length || column?.originalOptions?.length) && toggledDropdownMap[column.name]">
                                        <item class="filter-search">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                            </div>
                                            <input type="text" [attr.id]="column.name + '-input'" [novoTableFilter]="column" (onFilterChange)="onFilterChange($event)" [(ngModel)]="column.filter" keepFilterFocused/>
                                        </item>
                                    </list>
                                    <!-- FILTER DATE OPTIONS -->
                                    <list *ngIf="column?.options?.length && column?.type === 'date' && toggledDropdownMap[column.name]">
                                        <item class="filter-search" *ngIf="!column.calenderShow">
                                            <div class="header">
                                                <span>{{ labels.filters }}</span>
                                                <button theme="dialogue" color="negative" icon="times" (click)="onFilterClear(column)" *ngIf="column.filter">{{ labels.clear }}</button>
                                            </div>
                                        </item>
                                        <item [ngClass]="{ active: isFilterActive(column, option) }" *ngFor="let option of column.options" (click)="onFilterClick(column, option)" [keepOpen]="option.range" [hidden]="column.calenderShow" [attr.data-automation-id]="(option?.label || option)">
                                            {{ option?.label || option }} <i class="bhi-check" *ngIf="isFilterActive(column, option)"></i>
                                        </item>
                                        <div class="calender-container" [hidden]="!column.calenderShow">
                                            <div (click)="column.calenderShow=false"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
                                            <novo-date-picker #rangePicker (onSelect)="onCalenderSelect(column, $event)" [(ngModel)]="column.filter" range="true"></novo-date-picker>
                                        </div>
                                    </list>
                                </novo-dropdown>
                            </div>
                        </th>
                    </tr>
                </thead>
                <!-- TABLE DATA -->
                <tbody *ngIf="!dataProvider.isEmpty() || editing">
                    <tr class="table-selection-row" *ngIf="config.rowSelectionStyle === 'checkbox' && showSelectAllMessage && config.selectAllEnabled" data-automation-id="table-selection-row">
                        <td colspan="100%">
                            {{labels.selectedRecords(selected.length)}} <a (click)="selectAll(true)" data-automation-id="all-matching-records">{{labels.totalRecords(dataProvider.total)}}</a>
                        </td>
                    </tr>
                    <ng-template ngFor let-row="$implicit" let-i="index" [ngForOf]="rows">
                        <tr class="table-row" [ngClass]="row.customClass || ''" [id]="name + '-' + row[rowIdentifier]" [attr.data-automation-id]="row.id" (click)="rowClickHandler(row)" [class.active]="row.id === activeId">
                            <td class="row-actions" *ngIf="config.hasDetails">
                                <button theme="icon" icon="next" (click)="row._expanded=!row._expanded" *ngIf="!row._expanded"></button>
                                <button theme="icon" icon="sort-desc" (click)="row._expanded=!row._expanded" *ngIf="row._expanded"></button>
                            </td>
                            <td class="row-actions checkbox" *ngIf="config.rowSelectionStyle === 'checkbox'">
                                <novo-checkbox [(ngModel)]="row._selected" (ngModelChange)="rowSelectHandler(row)" data-automation-id="select-row-checkbox"></novo-checkbox>
                            </td>
                            <td *ngFor="let column of columns" [attr.data-automation-id]="column.id || column.name" [class.novo-form-row]="editable" [hidden]="isColumnHidden(column)">
                                <novo-table-cell *ngIf="row._editing && !row._editing[column.name]" [hasEditor]="editable" [column]="column" [row]="row" [form]="tableForm.controls.rows.controls[i]"></novo-table-cell>
                                <novo-control *ngIf="row._editing && row._editing[column.name]" condensed="true" [form]="tableForm.controls.rows.controls[i]" [control]="row.controls[column.name]"></novo-control>
                            </td>
                        </tr>
                        <tr class="details-row" *ngIf="config.hasDetails" [hidden]="!row._expanded" [attr.data-automation-id]="'details-row-'+row.id">
                            <td class="row-actions"></td>
                            <td [attr.colspan]="config.rowSelectionStyle === 'checkbox' ? (columns.length + 1) : columns.length">
                                <novo-row-details [data]="row" [renderer]="config.detailsRenderer"></novo-row-details>
                            </td>
                        </tr>
                    </ng-template>
                </tbody>
                <!-- NO TABLE DATA PLACEHOLDER -->
                <tbody class="table-message" *ngIf="dataProvider.isEmpty() && !dataProvider.isFiltered() && !editing" data-automation-id="empty-table">
                    <tr>
                        <td colspan="100%">
                            <div #emptymessage><ng-content select="[table-empty-message]"></ng-content></div>
                            <div class="table-empty-message" *ngIf="emptymessage.childNodes.length == 0">
                                <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <!-- NO MATCHING RECORDS -->
                <tbody class="table-message" *ngIf="dataProvider.isEmpty() && dataProvider.isFiltered()" data-automation-id="empty-table">
                    <tr>
                        <td colspan="100%">
                            <div #nomatchmessage><ng-content select="[table-no-matching-records-message]"></ng-content></div>
                            <div class="no-matching-records" *ngIf="nomatchmessage.childNodes.length == 0">
                                <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <!-- TABLE DATA ERROR PLACEHOLDER -->
                <tbody class="table-message" *ngIf="dataProvider.hasErrors()" data-automation-id="table-errors">
                    <tr>
                        <td colspan="100%">
                            <div #errormessage><ng-content select="[table-error-message]"></ng-content></div>
                            <div class="table-error-message" *ngIf="errormessage.childNodes.length == 0">
                                <h4><i class="bhi-caution"></i> {{ labels.erroredTableMessage }}</h4>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot *ngIf="!config.footers" [ngClass]="dataProvider.length % 2 == 0 ? 'odd' : 'even'">
                    <tr>
                        <td colspan="100%">
                            <ng-content select="novo-table-footer"></ng-content>
                        </td>
                    </tr>
                </tfoot>
                <tfoot *ngFor="let footer of footers;let i = index;" class="novo-table-total-footer">
                    <tr>
                        <td *ngFor="let column of columns" [attr.data-automation-id]="(column.id || column.name) + '-total-' + i">{{ footer[column.name] }}</td>
                    </tr>
                </tfoot>
            </table>
        </novo-form>
    </div>
    `,
})
export class NovoTableElement implements DoCheck {
  @Input() config: NovoTableConfig = {};
  @Input() columns: Array<any>;
  @Input() theme: string;
  @Input() skipSortAndFilterClear: boolean = false;
  @Input() mode: NovoTableMode = NovoTableMode.VIEW;
  @Input() editable: boolean = false;
  @Input() rowIdentifier: string = 'id';
  @Input() name: string = 'table';

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();
  @Output() onTableChange: EventEmitter<any> = new EventEmitter();

  _dataProvider: PagedArrayCollection<any>;
  _rows: Array<any> = [];
  selected: Array<any> = [];
  activeId: number = 0;
  master: boolean = false;
  expandAll: boolean = false;
  indeterminate: boolean = false;
  lastPage: number = 0;
  selectedPageCount: number = 0;
  showSelectAllMessage: boolean = false;
  currentSortColumn: any;
  pagedData: Array<any> = [];
  pageSelected: any;
  // Map to keep track of what dropdowns are toggled
  // Used to properly *ngIf the <list> so that the keepFilterFocused Directive
  // will properly fire the ngAfterViewInit event
  toggledDropdownMap: any = {};
  public NovoTableMode = NovoTableMode;
  public tableForm: FormGroup = new FormGroup({});
  public toast: { theme: string; icon: string; message: string };
  public footers: any[] = [];
  public grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast: boolean = false;
  public loading: boolean = false;

  @Input()
  set rows(rows: Array<any>) {
    this.dataProvider = rows;
    if (rows && rows.length > 0) {
      this.setupColumnDefaults();
    }
    // this is a temporary/hacky fix until async dataloading is handled within the table
    if (!this.skipSortAndFilterClear) {
      this.clearAllSortAndFilters();
    }
  }

  get rows() {
    return this._rows;
  }

  @Input()
  set dataProvider(dp: any) {
    this._dataProvider = Array.isArray(dp) ? new PagedArrayCollection<any>(dp) : dp;
    this._dataProvider.dataChange.debounceTime(100).subscribe((event: CollectionEvent) => {
      switch (event.type) {
        case CollectionEvent.CHANGE:
          this._rows = event.data;
          // Setup form
          this.tableForm = this.builder.group({
            rows: this.builder.array([]),
          });
          // Remove all selection on sort change if selection is on
          if (this.config.rowSelectionStyle === 'checkbox') {
            this.pagedData = event.data;
            this.pageSelected = this.pagedData.filter((r) => r._selected);
            this.rowSelectHandler();
          }
          // Find that columns we might need to sum up via the footer
          let columnsToSum = [];
          let columnSums = {};
          if (this.config.footers) {
            this.config.footers.forEach((config) => {
              columnsToSum.push(...config.columns);
            });
            // Only have unique columns, filter out duplicates
            columnsToSum = columnsToSum.filter((item, index, array) => array.indexOf(item) === index);
          }
          // Make a form for each row
          let tableFormRows = <FormArray>this.tableForm.controls['rows'];
          this._rows.forEach((row, index) => {
            let rowControls = [];
            row.controls = {};
            row._editing = {};
            row._expanded = this.config.expandAll;
            row.rowId = this._rows.length;
            this.columns.forEach((column) => {
              // Use the control passed or use a ReadOnlyControl so that the form has the values
              let control = column.editorConfig ? ControlFactory.create(column.editorType, column.editorConfig) : new ReadOnlyControl({ key: column.name });
              row.controls[column.name] = control;
              rowControls.push(control);
            });
            this.formUtils.setInitialValues(rowControls, row, false);
            tableFormRows.push(this.formUtils.toFormGroup(rowControls));
            // Setup the total footer if configured
            // Array of keys to total
            if (columnsToSum.length !== 0) {
              columnsToSum.forEach((column) => {
                if (Helpers.isBlank(columnSums[column])) {
                  columnSums[column] = 0;
                }
                columnSums[column] += row[column];
              });
            }
          });
          if (this.mode === NovoTableMode.EDIT) {
            this.setTableEdit();
          }
          // Setup the footers (if any)
          if (this.config.footers) {
            this.footers = [];
            this.config.footers.forEach((footerConfig, footerConfigIndex) => {
              let footer = {};
              footer[footerConfig.labelColumn] = footerConfig.label;
              footerConfig.columns.forEach((column) => {
                if (footerConfig.method === 'AVG' && this._rows.length !== 0) {
                  footer[column] = columnSums[column] / this._rows.length;
                } else {
                  footer[column] = columnSums[column];
                }
              });
              this.footers.push(footer);
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
    } else {
      // Paging turned off, return basically all of the data
      this._dataProvider.page = 1;
      this._dataProvider.pageSize = 500;
    }
    if (dp && dp.length > 0) {
      this.setupColumnDefaults();
    }
    this._dataProvider.refresh();
  }
  get dataProvider() {
    return this._dataProvider;
  }

  get editing() {
    return this.mode === NovoTableMode.EDIT;
  }

  get formValue() {
    return this.tableForm.value;
  }

  constructor(public labels: NovoLabelService, private formUtils: FormUtils, private builder: FormBuilder) {}

  onDropdownToggled(event, column): void {
    this.toggledDropdownMap[column] = event;
  }

  onPageChange(event) {
    //this.dataProvider.page = event.page;
    //this.dataProvider.pageSize = event.itemsPerPage;
  }

  getOptionDataAutomationId(option) {
    if (!Helpers.isBlank(option.value)) {
      return option.value;
    }
    return option;
  }

  /**
   * @name setupColumnDefaults
   */
  setupColumnDefaults() {
    // Check columns for cell option types
    this.columns.forEach((column) => {
      if (column && column.type) {
        switch (column.type) {
          case 'date':
            // Set options based on dates if there are none
            column.options = column.options || this.getDefaultOptions(column);
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * @name ngDoCheck
   */
  ngDoCheck() {
    if (this.config.paging && this.config.paging.current !== this.lastPage) {
      this.rowSelectHandler();
      this.showSelectAllMessage = false;
    }
    this.lastPage = this.config.paging ? this.config.paging.current : 1;
  }

  /**
   * @name getPageStart
   * @returns {number}
   */
  getPageStart() {
    return this.config.paging ? (this.dataProvider.page - 1) * this.dataProvider.pageSize : 0;
  }

  /**
   * @name getPageEnd
   * @returns {*}
   */
  getPageEnd() {
    return this.config.paging && this.dataProvider.pageSize > -1 ? this.getPageStart() + this.dataProvider.pageSize : this.rows.length;
  }

  /**
   * @name onFilterClick
   * @param column
   * @param filter
   */
  onFilterClick(column, filter) {
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
      } else {
        // Add filter
        column.filter.push(filter);
      }
    } else if (column.multiple) {
      column.filter = new Array();
      column.filter.push(Helpers.isBlank(filter.value) ? filter : filter.value);
    } else {
      column.filter = Helpers.isBlank(filter.value) ? filter : filter.value;
    }
    this.onFilterChange();
  }

  /**
   * @name onFilterClear
   * @param column
   */
  onFilterClear(column: any): void {
    setTimeout(() => {
      column.filter = null;
      column.freetextFilter = null;
      this.onFilterChange();
      if (column.originalOptions) {
        column.options = column.originalOptions;
      }
    });
  }

  clearAllSortAndFilters() {
    if (this.config.filtering) {
      this.columns.forEach((column) => {
        column.filter = null;
        column.sort = null;
      });
    }
  }

  /**
   * @name onFilterChange
   *
   * @description This method updates the row data to reflect the active filters.
   */
  onFilterChange() {
    if (this.config.filtering) {
      // Array of filters
      const filters = this.columns.filter((col) => !Helpers.isEmpty(col.filter));
      if (filters.length) {
        let query = {};
        for (const column of filters) {
          if (Helpers.isFunction(column.match)) {
            query[column.name] = (value, record) => {
              return column.match(record, column.filter);
            };
          } else if (column.preFilter && Helpers.isFunction(column.preFilter)) {
            query = Object.assign({}, query, column.preFilter(this.escapeCharacters(column.filter)));
          } else if (Array.isArray(column.filter)) {
            // The filters are an array (multi-select), check value
            let options = column.filter;
            // We have an array of {value: '', labels: ''}
            if (options[0].value || options[0].label) {
              options = column.filter.map((opt) => opt.value);
            }
            query[column.name] = { any: options };
          } else if (column.type && column.type === 'date') {
            if (column.filter.startDate && column.filter.endDate) {
              query[column.name] = {
                min: dateFns.startOfDay(column.filter.startDate),
                max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(column.filter.endDate), 1)),
              };
            } else {
              query[column.name] = {
                min: column.filter.min ? dateFns.addDays(dateFns.startOfToday(), column.filter.min) : dateFns.startOfToday(),
                max: column.filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), column.filter.max) : dateFns.startOfTomorrow(),
              };
            }
          } else {
            query[column.name] = column.filter;
          }
        }
        if (Helpers.isFunction(this.config.filtering)) {
          this.config.filtering(query);
        } else {
          this._dataProvider.filter = query;
        }
      } else {
        this._dataProvider.filter = {};
      }
      // Trickle down to keep sort
      // this.onSortChange(this.currentSortColumn);
      this.fireTableChangeEvent();

      // If paging, reset page
      if (this.config.paging) {
        this.config.paging.current = 1;
      }
      // Remove all selection on sort change if selection is on
      if (this.config.rowSelectionStyle === 'checkbox') {
        this.selectAll(false);
      }
    }
  }

  escapeCharacters(filter) {
    if (typeof filter === 'string') {
      return filter.replace(/'/g, "''");
    }
    return filter;
  }

  /**
   * @name isFilterActive
   * @param column
   * @param filter
   * @returns {boolean}
   *
   * @description
   */
  isFilterActive(column, filter) {
    //TODO: This needs to be refactored
    let isActive = false;
    if (column && !Helpers.isBlank(column.filter) && !Helpers.isBlank(filter)) {
      if (Array.isArray(column.filter)) {
        if (typeof filter !== 'string') {
          isActive = column.filter.some((item) => {
            return item.label === filter.label;
          });
        } else {
          isActive = column.filter.includes(filter);
        }
      } else {
        if (typeof column.filter === typeof filter) {
          isActive = column.filter === filter;
        } else {
          isActive = column.filter === filter.value;
        }
      }
    }
    return isActive;
  }

  /**
   * @name onSortChange
   * @param newSortColumn
   */
  onSortChange(column) {
    this.currentSortColumn = column;
    let sortedColumns: any = this.columns.filter((thisColumn) => {
      return thisColumn.sort && thisColumn !== this.currentSortColumn;
    });
    for (let sortedColumn of sortedColumns) {
      sortedColumn.sort = null;
    }

    if (column) {
      if (Helpers.isFunction(this.config.sorting)) {
        this.config.sorting();
      } else if (Helpers.isFunction(column.preSort)) {
        this._dataProvider.sort = [].concat(column.preSort(column));
      } else {
        this._dataProvider.sort = [{ field: column.compare || column.name, reverse: column.sort === 'desc' }];
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
  }

  /**
   * @name fireTableChangeEvent
   */
  fireTableChangeEvent() {
    // Construct a table change object
    const onTableChange: any = {};
    const filters = this.columns.filter((col) => col.filter && col.filter.length);
    onTableChange.filter = filters.length ? filters : false;
    onTableChange.sort = this.currentSortColumn ? this.currentSortColumn : false;
    onTableChange.rows = this.rows;

    // Emit event
    this.onTableChange.emit(onTableChange);
  }

  /**
   * @name findColumnIndex
   * @param value
   * @returns {*}
   */
  findColumnIndex(value) {
    for (let i = 0; i < this.columns.length; i += 1) {
      if (this.columns[i].name === value) {
        return i;
      }
    }
    return null;
  }

  /**
   * @name onOrderChange
   * @param event
   */
  onOrderChange(event) {
    const oldIndex = this.findColumnIndex(event.first.name);
    const newIndex = this.findColumnIndex(event.second.name);
    this.columns.splice(newIndex, 0, this.columns.splice(oldIndex, 1)[0]);
    this.onSortChange(this.currentSortColumn);
  }

  /**
   * @name selectPage
   */
  expandAllOnPage(expanded) {
    this.config.expandAll = !expanded;
    for (let row of this.dataProvider.list) {
      row._expanded = this.config.expandAll;
    }
  }

  /**
   * @name selectPage
   */
  selectPage() {
    if (!this.master) {
      this.selectAll(false);
      // Only show the select all message when there is only one new page selected at a time
      this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
      this.showSelectAllMessage = false;
    } else {
      this.indeterminate = false;
      //this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
      for (let row of this.pagedData) {
        row._selected = this.master;
      }
      this.selected = this.dataProvider.list.filter((r) => r._selected);
      this.pageSelected = this.pagedData.filter((r) => r._selected);
      this.emitSelected(this.selected);
      // Only show the select all message when there is only one new page selected at a time
      this.selectedPageCount++;
      this.showSelectAllMessage = this.selectedPageCount === 1 && this.selected.length !== this.dataProvider.total;
    }
  }

  /**
   * @name selectAll
   */
  selectAll(value) {
    this.master = value;
    this.indeterminate = false;
    for (let row of this.dataProvider.list) {
      row._selected = value;
    }
    this.selected = value ? this.dataProvider.list : [];
    this.showSelectAllMessage = false;
    this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
    this.rowSelectHandler();
  }

  /**
   * @name rowSelectHandler
   */
  rowSelectHandler() {
    // this.pagedData = this.rows.slice(this.getPageStart(), this.getPageEnd());
    this.pageSelected = this.pagedData.filter((r) => r._selected);
    this.selected = this.dataProvider.list.filter((r) => r._selected);
    if (this.pageSelected.length === 0) {
      this.master = false;
      this.indeterminate = false;
    } else if (this.pageSelected.length === this.pagedData.length) {
      this.master = true;
      this.indeterminate = false;
    } else {
      this.master = false;
      this.indeterminate = true;

      // Breaking the selected page count
      this.showSelectAllMessage = false;
      this.selectedPageCount = this.selectedPageCount > 0 ? this.selectedPageCount - 1 : 0;
    }
    this.emitSelected(this.selected);
  }

  /**
   * @name emitSelected
   * @param selected
   */
  emitSelected(selected) {
    this.onRowSelect.emit({ length: selected.length, selected: selected });
  }

  /**
   * @name rowClickHandler
   * @param row
   */
  rowClickHandler(row) {
    if (this.config.rowSelect) {
      this.activeId = row.id || 0;
      this.onRowClick.emit(row);
    }
  }

  /**
   * @name setDateOptions
   * @returns {Array}
   */
  getDefaultOptions(column) {
    // TODO - needs to come from label service - https://github.com/bullhorn/novo-elements/issues/116
    let opts: any[] = [
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
  }

  onCalenderSelect(column, event): void {
    setTimeout(() => {
      if (event.startDate && event.endDate) {
        this.onFilterChange();
      }
    }, 10);
  }

  onFilterKeywords(config) {
    if (config && config.filtering && config.filtering.freetextFilter) {
      let filterKeywords = config.filtering.freetextFilter.toLowerCase();
      if (!config.filtering.originalOptions) {
        config.filtering.originalOptions = config.filtering.options;
      }
      let newOptions = config.filtering.originalOptions.filter((option) => {
        let value = option && option.label ? option.label : option;
        value = value.toLowerCase() ? value.toLowerCase() : value;
        if (value === filterKeywords) {
          return true;
        } else if (~value.indexOf(filterKeywords) || ~value.indexOf(filterKeywords)) {
          return true;
        }
        return false;
      });
      config.filtering.options = newOptions;
      config.filtering.filter = config.filtering.freetextFilter;
    } else {
      config.filtering.options = config.filtering.originalOptions;
    }
    this.onFilterChange();
  }

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
  setTableEdit(rowNumber?: number, columnNumber?: number): void {
    this.mode = NovoTableMode.EDIT;
    this._dataProvider.edit();
    this._rows.forEach((row, rowIndex) => {
      row._editing = row._editing || {};
      this.columns.forEach((column, columnIndex) => {
        if (column.viewOnly) {
          row._editing[column.name] = false;
        } else if (Helpers.isEmpty(rowNumber) && Helpers.isEmpty(columnNumber)) {
          row._editing[column.name] = true;
        } else if (!Helpers.isEmpty(rowNumber) && rowIndex === Number(rowNumber) && Helpers.isEmpty(columnNumber)) {
          row._editing[column.name] = true;
        } else if (!Helpers.isEmpty(rowNumber) && !Helpers.isEmpty(columnNumber) && rowIndex === Number(rowNumber) && columnIndex === Number(columnNumber)) {
          row._editing[column.name] = true;
        } else {
          row._editing[column.name] = false;
        }
      });
    });
  }

  /**
   * @name leaveEditMode
   * @description Leaves edit mode for the Table and puts everything back to VIEW only
   * @memberOf NovoTableElement
   * @param {cancel} [boolean] - whether or not to save data or undo
   */
  private leaveEditMode(cancel: boolean): void {
    this.mode = NovoTableMode.VIEW;
    this._rows.forEach((row) => {
      row._editing = row._editing || {};
      this.columns.forEach((column) => {
        row._editing[column.name] = false;
      });
    });
    if (cancel) {
      this._dataProvider.undo();
    } else {
      this._dataProvider.commit();
    }
    this.hideToastMessage();
  }

  /**
   * @name addEditableRow
   * @description Adds a new row into the table to be edited, can be called from a local reference of the table in your template
   * @param {*} [defaultValue={}]
   * @memberOf NovoTableElement
   */
  addEditableRow(defaultValue: any = {}): void {
    let tableFormRows = <FormArray>this.tableForm.controls['rows'];
    let row: any = {};
    let rowControls = [];
    row.controls = {};
    row._editing = {};
    row.rowId = this._rows.length + 1;
    this.columns.forEach((column) => {
      // Use the control passed or use a ReadOnlyControl so that the form has the values
      let control = column.editorConfig ? ControlFactory.create(column.editorType, column.editorConfig) : new ReadOnlyControl({ key: column.name });
      control.value = null; // remove copied column value
      row.controls[column.name] = control;
      row._editing[column.name] = !column.viewOnly;
      rowControls.push(control);
    });
    this.formUtils.setInitialValues(rowControls, defaultValue, false);
    tableFormRows.push(this.formUtils.toFormGroup(rowControls));
    this._rows.push(row);
  }

  /**
   * @name validateAndGetUpdatedData
   * @description Validates the Form inside of the Table, if there are errors it will display/return the errors for each row.
   * If there are no errors, then it will return ONLY the changed data for each row, the data returned will be in the form:
   * { id: ID_OF_RECORD, key: value } -- data that was updated
   * { id: undefined, key: value } -- data that was added
   * @returns {{ changed?: any[], errors?: { errors: any, row: any, index: number }[] }} - either the changed data or errors!
   * @memberOf NovoTableElement
   */
  validateAndGetUpdatedData(): { changed?: any[]; errors?: { errors: any; row: any; index: number }[] } {
    if (this.tableForm && this.tableForm.controls && this.tableForm.controls['rows']) {
      let changedRows = [];
      let errors = [];
      // Go over the FormArray's controls
      (this.tableForm.controls['rows'] as FormArray).controls.forEach((formGroup: FormGroup, index: number) => {
        let changedRow = null;
        let error = null;
        // Go over the form group controls
        Object.keys(formGroup.controls).forEach((key: string) => {
          let control = formGroup.controls[key];
          // Handle value changing
          if (control && control.dirty && !control.errors) {
            if (!changedRow) {
              // Append the ID, so we have some key to save against
              changedRow = {};
              if (this._rows[index].id) {
                changedRow.id = this._rows[index].id;
              }
            }
            // If dirty, grab value off the form
            changedRow[key] = this.tableForm.value['rows'][index][key];
            // Set value back to row (should be already done via the server call, but do it anyway)
            this._rows[index][key] = changedRow[key];
          } else if (control && control.errors) {
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
          changedRows.push(changedRow);
        }
        if (error) {
          errors.push({ errors: error, row: this._rows[index], index: index });
        }
      });
      let ret = {};
      // Return errors if any, otherwise return the changed rows
      if (errors.length === 0) {
        return { changed: changedRows };
      }
      return { errors: errors };
    }
  }

  /**
   * @name cancelEditing
   * @description Refresh the data provider and leave edit mode
   * @memberOf NovoTableElement
   */
  cancelEditing(): void {
    this.leaveEditMode(true);
  }

  /**
   * @name saveChanges
   * @description Refresh the data provider and leave edit mode
   * @memberOf NovoTableElement
   */
  saveChanges(): void {
    this.leaveEditMode(false);
  }

  /**
   * @name displayToastMessage
   * @description Displays a toast message inside of the table
   * @param {{ icon: string, theme: string, message: string }} toast
   * @param {number} [hideDelay]
   * @memberOf NovoTableElement
   */
  displayToastMessage(toast: { icon: string; theme: string; message: string }, hideDelay?: number): void {
    this.loading = false;
    this.toast = toast;
    if (hideDelay) {
      setTimeout(() => this.hideToastMessage(), hideDelay);
    }
  }

  /**
   * @name hideToastMessage
   * @description Force hide the toast message
   * @memberOf NovoTableElement
   */
  hideToastMessage(): void {
    this.toast = null;
    // Hack to make the table display properly after hiding the toast
    this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = true;
    setTimeout(() => {
      this.grossFlagToAvoidTheTableFromBeingUglyWhenHidingTheToast = false;
    });
  }

  /**
   * @name toggleLoading
   * @description display the loading overlay on the table
   * @param {boolean} show
   * @memberOf NovoTableElement
   */
  toggleLoading(show: boolean): void {
    this.loading = show;
  }

  /**
   * @name isColumnHidden
   * @description hide a column in edit or view mode
   * @param {column meta} column
   * @returns {boolean}
   * @memberOf NovoTableElement
   */
  isColumnHidden(column: any): boolean {
    return this.editing ? !!column.hideColumnOnEdit : !!column.hideColumnOnView;
  }
}
