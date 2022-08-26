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
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoLabelService } from '../../services/novo-label-service';
import { notify } from '../../utils/notifier/notifier.util';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { NovoDataTableCellHeader } from './cell-headers/data-table-header-cell.component';
import { DataTableSource } from './data-table.source';
import { NOVO_DATA_TABLE_REF } from './data-table.token';
import {
  IDataTableChangeEvent,
  IDataTableColumn,
  IDataTableFilter,
  IDataTablePaginationOptions,
  IDataTablePreferences,
  IDataTableSearchOptions,
  IDataTableSelectionOption,
  IDataTableService,
  IDataTableSort,
} from './interfaces';
import { ListInteractionDictionary, ListInteractionEvent } from './ListInteractionTypes';
import { StaticDataTableService } from './services/static-data-table.service';
import { DataTableState } from './state/data-table-state.service';

@Component({
  selector: 'novo-data-table',
  animations: [
    trigger('expand', [
      animState('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      animState('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('70ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  template: `
    <header
      *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader"
      [class.empty]="hideGlobalSearch && !paginationOptions && !templates['customActions']"
    >
      <ng-container *ngTemplateOutlet="templates['customHeader']"></ng-container>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-data-table-pagination
        *ngIf="paginationOptions"
        [theme]="paginationOptions.theme"
        [length]="dataSource?.currentTotal"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
        [dataFeatureId]="paginatorDataFeatureId"
        [canSelectAll]="canSelectAll"
        [allMatchingSelected]="allMatchingSelected"
      >
      </novo-data-table-pagination>
      <div class="novo-data-table-actions" *ngIf="templates['customActions']">
        <ng-container *ngTemplateOutlet="templates['customActions']"></ng-container>
      </div>
    </header>
    <div class="novo-data-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-data-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-data-table-outside-container" [ngClass]="{ 'novo-data-table-outside-container-fixed': fixedHeader }">
      <div class="novo-data-table-custom-filter" *ngIf="customFilter">
        <ng-container *ngTemplateOutlet="templates['customFilter']"></ng-container>
      </div>
      <div
        #novoDataTableContainer
        class="novo-data-table-container"
        [ngClass]="{ 'novo-data-table-container-fixed': fixedHeader }"
        [class.empty-user-filtered]="dataSource?.currentlyEmpty && state.userFiltered"
        [class.empty]="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <cdk-table
          *ngIf="columns?.length > 0 && columnsLoaded && dataSource"
          [dataSource]="dataSource"
          [trackBy]="trackByFn"
          novoDataTableSortFilter
          [class.expandable]="expandable"
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-container cdkColumnDef="selection">
            <novo-data-table-checkbox-header-cell *cdkHeaderCellDef [maxSelected]="maxSelected"></novo-data-table-checkbox-header-cell>
            <novo-data-table-checkbox-cell
              *cdkCellDef="let row; let i = index"
              [row]="row"
              [maxSelected]="maxSelected"
            ></novo-data-table-checkbox-cell>
          </ng-container>
          <ng-container cdkColumnDef="expand">
            <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>
            <novo-data-table-expand-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-expand-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns; trackBy: trackColumnsBy" [cdkColumnDef]="column.id">
            <novo-data-table-header-cell
              *cdkHeaderCellDef
              [column]="column"
              [filterTemplate]="templates['column-filter-' + column.id]"
              [novo-data-table-cell-config]="column"
              [resized]="resized"
              [defaultSort]="defaultSort"
              [allowMultipleFilters]="allowMultipleFilters"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-header-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-header-cell]="column?.type === 'action' && column?.action?.options"
              [class.fixed-header]="fixedHeader"
            ></novo-data-table-header-cell>
            <novo-data-table-cell
              *cdkCellDef="let row"
              [resized]="resized"
              [column]="column"
              [row]="row"
              [template]="columnToTemplate[column.id]"
              [class.empty]="column?.type === 'action' && !column?.label"
              [class.button-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)"
              [class.dropdown-cell]="column?.type === 'action' && column?.action?.options"
            ></novo-data-table-cell>
          </ng-container>
          <novo-data-table-header-row
            *cdkHeaderRowDef="displayedColumns"
            [fixedHeader]="fixedHeader"
            data-automation-id="novo-data-table-header-row"
          ></novo-data-table-header-row>
          <novo-data-table-row
            *cdkRowDef="let row; columns: displayedColumns"
            [ngClass]="{ active: row[rowIdentifier] == activeRowIdentifier }"
            [novoDataTableExpand]="detailRowTemplate"
            [row]="row"
            [id]="name + '-' + row[rowIdentifier]"
            [dataAutomationId]="row[rowIdentifier]"
          ></novo-data-table-row>
        </cdk-table>
        <div class="novo-data-table-footer" *ngIf="templates['footer']">
          <ng-container *ngTemplateOutlet="templates['footer']; context: { $implicit: columns, data: dataSource.data }"></ng-container>
        </div>
        <div
          class="novo-data-table-no-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noResultsMessage'] || templates['defaultNoResultsMessage']"></ng-container>
          </div>
        </div>
        <div
          class="novo-data-table-no-more-results-container"
          [style.left.px]="scrollLeft"
          *ngIf="!dataSource?.totallyEmpty && dataSource?.currentlyEmpty && !state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['noMoreResultsMessage'] || templates['defaultNoMoreResultsMessage']"></ng-container>
          </div>
        </div>
      </div>
      <div
        class="novo-data-table-empty-container"
        *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
      >
        <div class="novo-data-table-empty-message">
          <ng-container *ngTemplateOutlet="templates['emptyMessage'] || templates['defaultNoResultsMessage']"></ng-container>
        </div>
      </div>
    </div>
    <!-- DEFAULT CELL TEMPLATE -->
    <ng-template novoTemplate="textCellTemplate" let-row let-col="col">
      <span [style.width.px]="col?.width" [style.min-width.px]="col?.width" [style.max-width.px]="col?.width">{{
        row[col.id] | dataTableInterpolate: col
      }}</span>
    </ng-template>
    <ng-template novoTemplate="dateCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="datetimeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableDateTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="timeCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableTimeRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="currencyCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableCurrencyRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="bigdecimalCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableBigDecimalRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="numberCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col }}</span>
    </ng-template>
    <ng-template novoTemplate="percentCellTemplate" let-row let-col="col">
      <span>{{ row[col.id] | dataTableInterpolate: col | dataTableNumberRenderer: col:true }}</span>
    </ng-template>
    <ng-template novoTemplate="linkCellTemplate" let-row let-col="col">
      <a
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
        [style.width.px]="col?.width"
        [style.min-width.px]="col?.width"
        [style.max-width.px]="col?.width"
        >{{ row[col.id] | dataTableInterpolate: col }}</a
      >
    </ng-template>
    <ng-template novoTemplate="telCellTemplate" let-row let-col="col">
      <a href="tel:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="mailtoCellTemplate" let-row let-col="col">
      <a href="mailto:{{ row[col.id] | dataTableInterpolate: col }}" [target]="col?.attributes?.target">{{
        row[col.id] | dataTableInterpolate: col
      }}</a>
    </ng-template>
    <ng-template novoTemplate="buttonCellTemplate" let-row let-col="col">
      <novo-button
        size="small"
        theme="icon"
        [tooltip]="col?.action?.tooltip"
        tooltipPosition="right"
        [attr.data-feature-id]="col?.attributes?.dataFeatureId"
        [disabled]="isDisabled(col, row)"
        (click)="col.handlers?.click({ originalEvent: $event, row: row })"
      >
        <novo-icon>{{ col?.action?.icon }}</novo-icon>
      </novo-button>
    </ng-template>
    <ng-template novoTemplate="dropdownCellTemplate" let-row let-col="col">
      <novo-dropdown parentScrollSelector=".novo-data-table-container" containerClass="novo-data-table-dropdown">
        <novo-button type="button" theme="dialogue" [icon]="col.action.icon" inverse>{{ col.label }}</novo-button>
        <novo-optgroup>
          <novo-option
            *ngFor="let option of col?.action?.options"
            (click)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })"
            [disabled]="isDisabled(option, row)"
          >
            <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
          </novo-option>
        </novo-optgroup>
      </novo-dropdown>
    </ng-template>
    <ng-template novoTemplate="defaultNoResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultNoMoreResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMoreRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultEmptyMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="expandedRow"> You did not provide an "expandedRow" template! </ng-template>
    <ng-template #detailRowTemplate let-row>
      <div class="novo-data-table-detail-row" [@expand] style="overflow: hidden">
        <ng-container *ngTemplateOutlet="templates['expandedRow']; context: { $implicit: row }"></ng-container>
      </div>
    </ng-template>
    <!-- CUSTOM CELLS PASSED IN -->
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataTableState, { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable }],
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
    if (this.displayedColumns && this.displayedColumns.length !== 0) {
      if (this.name !== 'novo-data-table') {
        this.preferencesChanged.emit({
          name: this.name,
          displayedColumns,
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
  set refreshSubject(refreshSubject: EventEmitter<any>) {
    // Unsubscribe
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (refreshSubject) {
      // Re-subscribe
      this.refreshSubscription = refreshSubject.subscribe((filter: any) => {
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

  @Output() preferencesChanged: EventEmitter<IDataTablePreferences> = new EventEmitter<IDataTablePreferences>();
  @Output() allSelected: EventEmitter<{ allSelected: boolean; selectedCount: number }> = new EventEmitter<{
    allSelected: boolean;
    selectedCount: number;
  }>();

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
    return this.dataSource && this.dataSource.totallyEmpty;
  }

  @HostBinding('class.loading')
  get loadingClass() {
    return this.loading || (this.dataSource && this.dataSource.loading);
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
          this.preferencesChanged.emit({ name: this.name, pageSize: event.pageSize });
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
      });
      this.configureLastDisplayedColumn();
      this.columnsLoaded = true;
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
