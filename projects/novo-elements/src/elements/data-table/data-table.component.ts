import { animate, state as animState, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { BooleanInput, Helpers, notify } from 'novo-elements/utils';
import { NovoTemplate } from 'novo-elements/elements/common';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { DataTableSource } from './data-table.source';
import { NOVO_DATA_TABLE_REF } from './data-table.token';
import {
  IDataTableChangeEvent,
  IDataTableColumn,
  IDataTablePaginationOptions,
  IDataTablePreferences,
  IDataTableSearchOptions,
  IDataTableSelectionOption,
  IDataTableService,
} from './interfaces';
import { ListInteractionDictionary, ListInteractionEvent } from './ListInteractionTypes';
import { StaticDataTableService } from './services/static-data-table.service';
import { DataTableState } from './state/data-table-state.service';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';

export type DataTablePreferenceUpdateSrc = 'columndrag' | 'input' | 'statesortchange' | 'pagination';
export interface IDataTablePreferencesChangeEvent extends IDataTablePreferences {
  eventSrc: DataTablePreferenceUpdateSrc
}

@Component({
    selector: 'novo-data-table',
    animations: [
        trigger('expand', [
            animState('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            animState('*', style({ height: '*', visibility: 'visible' })),
            transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }],
    standalone: false,
})
export class NovoDataTable<T> implements AfterContentInit, OnDestroy {
  @HostBinding('class.global-search-hidden') globalSearchHiddenClassToggle: boolean = false;

  @ContentChildren(NovoTemplate) customTemplates: QueryList<NovoTemplate>;
  @ViewChildren(NovoTemplate) defaultTemplates: QueryList<NovoTemplate>;
  @ViewChildren(NovoDataTableCellHeader) cellHeaders: QueryList<NovoDataTableCellHeader<T>>;
  @ViewChild('novoDataTableContainer') novoDataTableContainer: ElementRef;
  @Output() resized: EventEmitter<IDataTableColumn<T>> = new EventEmitter();

  @Input()
  set displayedColumns(displayedColumns: string[]) {
    this.updateDisplayedColumns(displayedColumns, 'input');
  }

  get displayedColumns(): string[] {
    return this._disabledColumns;
  }
  private _disabledColumns: string[];

  @Input() paginationOptions: IDataTablePaginationOptions;
  @Input() searchOptions: IDataTableSearchOptions;
  @Input() selectionOptions: IDataTableSelectionOption[];
  @Input() defaultSort: { id: string; value: string };
  @Input() name = 'novo-data-table';
  @Input() allowMultipleFilters = false;
  @Input() rowIdentifier = 'id';
  @Input() activeRowIdentifier = '';
  // prettier-ignore
  @Input() trackByFn = (index, item) => item.id;
  @Input() templates: { [key: string]: TemplateRef<any> } = {};
  @Input() fixedHeader = false;
  @Input() paginatorDataFeatureId: string;
  @Input() maxSelected: number = undefined;
  @Input() canSelectAll: boolean = false;
  @Input() allMatchingSelected = false;
  @Input() overrideTotal: number;
  @Input() paginationRefreshSubject: Subject<void>;
  @BooleanInput()
  @Input() enableColumnDragging = false;

  private dragEnabledByColumn: Map<string, boolean>;

  @Input()
  set dataTableService(service: IDataTableService<T>) {
    this.loading = false;
    if (!service) {
      service = new StaticDataTableService([]);
    }
    this.dataSource = new DataTableSource<T>(service, this.state, this.ref);
    this.ref.detectChanges();
  }

  @Input()
  set rows(rows: T[]) {
    this.loading = false;
    const service = new StaticDataTableService(rows);
    this.dataSource = new DataTableSource<T>(service, this.state, this.ref);
    this.ref.detectChanges();
  }

  @Input()
  set outsideFilter(outsideFilter: EventEmitter<any>) {
    // Unsubscribe
    if (this.outsideFilterSubscription) {
      this.outsideFilterSubscription.unsubscribe();
    }
    if (outsideFilter) {
      // Re-subscribe
      this.outsideFilterSubscription = outsideFilter.subscribe((filter: any) => {
        this.state.outsideFilter = filter;
        this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
        this.ref.markForCheck();
      });
    }
  }

  @Input()
  set refreshSubject(refreshSubject: EventEmitter<void>) {
    // Unsubscribe
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (refreshSubject) {
      // Re-subscribe
      this.refreshSubscription = refreshSubject.subscribe(() => {
        this.state.isForceRefresh = true;
        this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
        this.ref.markForCheck();
      });
    }
  }

  @Input()
  set columns(columns: IDataTableColumn<T>[]) {
    this._columns = columns;
    this.configureColumns();
    this.performInteractions('init');
  }
  get columns(): IDataTableColumn<T>[] {
    return this._columns;
  }

  @Input()
  set customFilter(v: boolean) {
    this._customFilter = coerceBooleanProperty(v);
  }
  get customFilter() {
    return this._customFilter;
  }
  private _customFilter: boolean;

  @Input()
  set hasExandedRows(v: boolean) {
    this._hasExandedRows = coerceBooleanProperty(v);
  }
  get hasExandedRows() {
    return this._hasExandedRows;
  }
  private _hasExandedRows: boolean;

  @Input()
  set forceShowHeader(v: boolean) {
    this._forceShowHeader = coerceBooleanProperty(v);
  }
  get forceShowHeader() {
    return this._forceShowHeader;
  }
  private _forceShowHeader: boolean;

  @Input()
  set hideGlobalSearch(v: boolean) {
    this._hideGlobalSearch = coerceBooleanProperty(v);
    this.globalSearchHiddenClassToggle = this._hideGlobalSearch;
  }
  get hideGlobalSearch() {
    return this._hideGlobalSearch;
  }
  private _hideGlobalSearch: boolean = true;

  @Output() preferencesChanged = new EventEmitter<IDataTablePreferencesChangeEvent>();
  @Output() allSelected: EventEmitter<{ allSelected: boolean; selectedCount: number }> = new EventEmitter<{
    allSelected: boolean;
    selectedCount: number;
  }>();
  @Output() toggledFilter = new EventEmitter<string>();

  public dataSource: DataTableSource<T>;
  public loading: boolean = true;
  public columnToTemplate: { [key: string]: TemplateRef<any> } = {};
  public columnsLoaded: boolean = false;
  public selection: Set<string> = new Set();
  public scrollLeft: number = 0;
  public expandable: boolean = false;

  private outsideFilterSubscription: Subscription;
  private refreshSubscription: Subscription;
  private resetSubscription: Subscription;
  private paginationSubscription: Subscription;
  private sortFilterSubscription: Subscription;
  private allMatchingSelectedSubscription: Subscription;
  private _columns: IDataTableColumn<T>[];
  private scrollListenerHandler: any;
  private initialized: boolean = false;

  @HostBinding('class.empty')
  get empty() {
    return this.useOverrideTotal ? this.overrideTotal === 0 : this.dataSource?.totallyEmpty;
  }

  @HostBinding('class.loading')
  get loadingClass() {
    return this.loading || (this.dataSource && this.dataSource.loading);
  }

  get useOverrideTotal(): boolean {
    return !Helpers.isBlank(this.overrideTotal)
  }

  @Input() listInteractions: ListInteractionDictionary;

  constructor(public labels: NovoLabelService, private ref: ChangeDetectorRef, public state: DataTableState<T>) {
    this.scrollListenerHandler = this.scrollListener.bind(this);
    this.sortFilterSubscription = this.state.sortFilterSource.subscribe(
      (event: IDataTableChangeEvent) => {
        if (this.name !== 'novo-data-table') {
          this.preferencesChanged.emit({
            name: this.name,
            sort: event.sort,
            filter: event.filter,
            globalSearch: event.globalSearch,
            where: event.where,
            savedSearchName: event.savedSearchName,
            appliedSearchType: event.appliedSearchType,
            eventSrc: 'statesortchange',
          });
          this.performInteractions('change');
        } else {
          notify('Must have [name] set on data-table to use preferences!');
        }
      },
    );
    this.paginationSubscription = this.state.paginationSource.subscribe((event: { isPageSizeChange: boolean; pageSize: number }) => {
      if (this.name !== 'novo-data-table') {
        if (event.isPageSizeChange) {
          this.preferencesChanged.emit({ name: this.name, pageSize: event.pageSize, eventSrc: 'pagination' });
        }
      } else {
        notify('Must have [name] set on data-table to use preferences!');
      }
    });
    this.resetSubscription = this.state.resetSource.subscribe(() => {
      setTimeout(() => {
        this.ref.detectChanges();
      }, 300);
    });
    this.allMatchingSelectedSubscription = this.state.allMatchingSelectedSource.subscribe((event: boolean) => {
      this.allMatchingSelected = event;
    });
  }

  public modifyCellHeaderMultiSelectFilterOptions(column: string, newOptions: { value: any; label: string }[]): void {
    const header = this.cellHeaders.find((cellHeader) => cellHeader.id === column);
    if (header) {
      if (header.config && header.config.filterConfig && header.config.filterConfig.options) {
        const filterOptions: any[] = header.config.filterConfig.options;
        const optionsToKeep = filterOptions.filter(
          (opt) =>
            header.isSelected(opt, header.multiSelectedOptions) &&
            !newOptions.find((newOpt) => opt.value && newOpt.value && newOpt.value === opt.value),
        );
        header.config.filterConfig.options = [...optionsToKeep, ...newOptions];
      } else {
        header.config.filterConfig.options = newOptions;
      }
      header.setupFilterOptions();
      header.changeDetectorRef.markForCheck();
    }
  }

  public ngOnDestroy(): void {
    this.outsideFilterSubscription?.unsubscribe();
    this.refreshSubscription?.unsubscribe();
    this.resetSubscription?.unsubscribe();
    this.sortFilterSubscription?.unsubscribe();
    this.allMatchingSelectedSubscription?.unsubscribe();
    if (this.novoDataTableContainer) {
      (this.novoDataTableContainer.nativeElement as Element).removeEventListener('scroll', this.scrollListenerHandler);
    }
  }

  public ngAfterContentInit(): void {
    if (this.displayedColumns && this.displayedColumns.length) {
      this.expandable = this.displayedColumns.includes('expand');
    }

    // Default templates defined here
    this.defaultTemplates.forEach((item) => {
      // Only override if it doesn't already exist
      if (!this.templates[item.getType()]) {
        this.templates[item.getType()] = item.template;
      }
    });
    // Custom templates passed in
    this.customTemplates.forEach((item) => {
      // Override anything that is custom and in HTML
      this.templates[item.getType()] = item.template;
    });
    // Load columns
    this.configureColumns();

    // State
    if (this.paginationOptions && !this.paginationOptions.page) {
      this.paginationOptions.page = 0;
    }
    if (this.paginationOptions && !this.paginationOptions.pageSize) {
      this.paginationOptions.pageSize = 50;
    }
    if (this.paginationOptions && !this.paginationOptions.pageSizeOptions) {
      this.paginationOptions.pageSizeOptions = [10, 25, 50, 100];
    }
    this.state.page = this.paginationOptions ? this.paginationOptions.page : undefined;
    this.state.pageSize = this.paginationOptions ? this.paginationOptions.pageSize : undefined;
    this.state.selectionOptions = this.selectionOptions ?? undefined;

    // Scrolling inside table
    (this.novoDataTableContainer.nativeElement as Element).addEventListener('scroll', this.scrollListenerHandler);
    this.initialized = true;
    this.ref.markForCheck();
  }

  public onSearchChange(term: string): void {
    this.state.globalSearch = term;
    this.state.reset(false, true);
    this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort, where: this.state.where });
  }

  public trackColumnsBy(index: number, item: IDataTableColumn<T>) {
    return item.id;
  }

  public isDisabled(check: any, row: T): boolean {
    if (check.disabled === true) {
      return true;
    }
    if (check.disabledFunc) {
      return check.disabledFunc(row);
    }
    return false;
  }

  public isExpanded(row: T): boolean {
    if (!row) {
      return false;
    }
    return this.state.expandedRows.has(`${row[this.rowIdentifier]}`);
  }

  public expandRow(row: T): void {
    const expanded = this.isExpanded(row);

    if (expanded) {
      this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
    } else {
      this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
    }
    this.state.onExpandChange((row as unknown as { id: number }).id);
  }

  public expandRows(expand: boolean): void {
    (this.dataSource.data || []).forEach((row: T) => {
      if (!expand) {
        this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
      } else {
        this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
      }
    });
    this.state.onExpandChange();
  }

  public allCurrentRowsExpanded(): boolean {
    for (let i = 0; i < (this.dataSource.data || []).length; i++) {
      if (!this.isExpanded((this.dataSource.data || [])[i])) {
        return false;
      }
    }
    return true;
  }

  public isSelected(row: T): boolean {
    if (!row) {
      return false;
    }
    return this.state.selectedRows.has(`${row[this.rowIdentifier]}`);
  }

  public selectRow(row: T, origin?: string): void {
    const selected = this.isSelected(row);
    if (selected) {
      this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
    } else {
      if (this.canSelectAll && this.allMatchingSelected && ['onClick'].includes(origin)) {
        // When all matching records are selected the user could be on another page where all rows only appear selected
        // Need to reset the rows that are actually selected, select rows on the current page and deselect the chosen record
        this.state.selectedRows.clear();
        this.selectRows(true);
        this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
      } else {
        this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
      }
    }
    this.state.allMatchingSelectedSource.next(false);
    this.state.onSelectionChange();
  }

  public selectRows(selected: boolean): void {
    (this.dataSource.data || []).forEach((row: T) => {
      if (!selected) {
        this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
      } else {
        this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
      }
    });
    this.state.onSelectionChange();
  }

  public allCurrentRowsSelected(): boolean {
    if (this.allMatchingSelected) {
      return true;
    }
    if (!this.dataSource?.data?.length) {
      return false;
    }
    for (let i = 0; i < (this.dataSource.data || []).length; i++) {
      if (!this.isSelected((this.dataSource.data || [])[i])) {
        return false;
      }
    }
    return true;
  }

  columnDragFilter = (columnName: string) => {
    if (['selection', 'expand'].includes(columnName)) {
      return false;
    }
    return this.dragEnabledByColumn.get(columnName) ?? false;
  }

  public columnDragged(event: NovoDragFinishEvent<string>): void {
    this.updateDisplayedColumns(event.allItems, 'columndrag');
  }

  private configureLastDisplayedColumn(): void {
    if (this.columns && this.displayedColumns && 0 !== this.columns.length && 0 !== this.displayedColumns.length) {
      this.columns.forEach((column: IDataTableColumn<T>) => {
        if (column.initialResizable) {
          column.resizable = column.initialResizable.resizable;
          column.width = column.initialResizable.width;
          column.initialResizable = undefined;
        }
      });
      const resizableColumns: string[] = this.displayedColumns.filter((name: string): boolean => {
        return (
          this.columns.findIndex((column: IDataTableColumn<T>): boolean => {
            return column.resizable && column.id === name;
          }) !== -1
        );
      });
      if (resizableColumns && resizableColumns.length > 0) {
        const lastResizableColumn: IDataTableColumn<T> = this.columns.find((column: IDataTableColumn<T>) => {
          return column.id === resizableColumns[resizableColumns.length - 1];
        });
        lastResizableColumn.initialResizable = {
          resizable: lastResizableColumn.resizable,
          width: lastResizableColumn.width,
        };
        lastResizableColumn.width = undefined;
        lastResizableColumn.resizable = false;
      }
    }
  }

  private configureColumns(): void {
    if (this.columns && this.columns.length !== 0 && Object.keys(this.templates).length !== 0) {
      // Figure the column templates
      if (this.enableColumnDragging) {
        this.dragEnabledByColumn = new Map();
      }
      this.columns.forEach((column: IDataTableColumn<T>) => {
        // Figure the template
        let templateName: string;
        if (column.template) {
          // Pass it in as template
          templateName = column.template;
        } else if (!!this.templates[column.id]) {
          // Custom template for the column id
          templateName = column.id;
        } else {
          // Default to the defaulCellTemplate
          if (column.type === 'action') {
            if (column.action && column.action.options) {
              if (!column.action.icon) {
                column.action.icon = 'collapse';
              }
              templateName = 'dropdownCellTemplate';
            } else {
              templateName = 'buttonCellTemplate';
            }
          } else {
            if (column.type === 'link:tel' || column.type === 'link:mailto') {
              templateName = `${column.type.split(':')[1]}CellTemplate`;
            } else {
              templateName = `${column.type}CellTemplate`;
            }
          }
        }
        this.columnToTemplate[column.id] = this.templates[templateName];
        if (this.enableColumnDragging) {
          const draggable = column.draggable != null ? column.draggable : true;
          this.dragEnabledByColumn.set(column.id, draggable);
        }
      });
      this.configureLastDisplayedColumn();
      this.columnsLoaded = true;
    }
  }

  private updateDisplayedColumns(displayedColumns: string[], updateSrc: DataTablePreferenceUpdateSrc) {
    if (this.displayedColumns && this.displayedColumns.length !== 0) {
      if (this.name !== 'novo-data-table') {
        this.preferencesChanged.emit({
          name: this.name,
          displayedColumns,
          eventSrc: updateSrc,
        });
      } else {
        notify('Must have [name] set on data-table to use preferences!');
      }
    }
    this._disabledColumns = displayedColumns;
    this.configureLastDisplayedColumn();
    if (this.initialized) {
      setTimeout(() => {
        this.scrollListener();
      });
    }
  }

  private scrollListener(): void {
    const target: Element = this.novoDataTableContainer.nativeElement as Element;
    const left: number = target.scrollLeft;
    if (left !== this.scrollLeft) {
      this.scrollLeft = target.scrollLeft;
    }
    this.ref.markForCheck();
  }

  performInteractions(event: ListInteractionEvent): void {
    if (this.listInteractions) {
      for (const column of this.columns) {
        const allListColumnInteractions = this.listInteractions[column.id];
        const listColumnInteraction = allListColumnInteractions && allListColumnInteractions.find((int) => int.event.includes(event));
        if (listColumnInteraction) {
          listColumnInteraction.script(this, column.id);
        }
      }
    }
  }
}
