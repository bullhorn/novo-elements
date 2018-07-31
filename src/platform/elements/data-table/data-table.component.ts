import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewChild,
  EventEmitter,
  AfterContentInit,
  ChangeDetectorRef,
  OnDestroy,
  ContentChildren,
  QueryList,
  ViewChildren,
  TemplateRef,
  ElementRef,
  Output,
} from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs/Subscription';
import { animate, state as animState, style, transition, trigger } from '@angular/animations';

import { NovoDataTableSortFilter } from './sort-filter/sort-filter.directive';
import { NovoDataTablePagination } from './pagination/data-table-pagination.component';
import {
  IDataTableColumn,
  IDataTablePaginationOptions,
  IDataTableSearchOptions,
  IDataTableService,
  IDataTablePreferences,
} from './interfaces';
import { DataTableSource } from './data-table.source';
import { NovoLabelService } from '../../services/novo-label-service';
import { DataTableState } from './state/data-table-state.service';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
import { Helpers } from '../../utils/Helpers';
import { notify } from '../../utils/notifier/notifier.util';
import { StaticDataTableService } from './services/static-data-table.service';

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
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader"
            [class.empty]="hideGlobalSearch && !paginationOptions && !templates['customActions']">
      <ng-container *ngTemplateOutlet="templates['customHeader']"></ng-container>
        <novo-search
            alwaysOpen="true"
            (searchChanged)="onSearchChange($event)"
            [(ngModel)]="state.globalSearch"
            *ngIf="!hideGlobalSearch"
            [placeholder]="searchOptions?.placeholder"
            [hint]="searchOptions?.tooltip">
        </novo-search>
        <novo-data-table-pagination
            *ngIf="paginationOptions"
            [theme]="paginationOptions.theme"
            [length]="dataSource?.currentTotal"
            [page]="paginationOptions.page"
            [pageSize]="paginationOptions.pageSize"
            [pageSizeOptions]="paginationOptions.pageSizeOptions">
        </novo-data-table-pagination>
        <div class="novo-data-table-actions" *ngIf="templates['customActions']">
          <ng-container *ngTemplateOutlet="templates['customActions']"></ng-container>
        </div>
    </header>
    <div class="novo-data-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-data-table-loading">
        <novo-loading></novo-loading>
    </div>
    <div class="novo-data-table-outside-container">
        <div class="novo-data-table-custom-filter" *ngIf="customFilter">
          <ng-container *ngTemplateOutlet="templates['customFilter']"></ng-container>
        </div>
        <div #novoDataTableContainer class="novo-data-table-container" [class.empty-user-filtered]="dataSource?.currentlyEmpty && state.userFiltered" [class.empty]="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine">
            <cdk-table *ngIf="(columns?.length > 0) && columnsLoaded && dataSource" [dataSource]="dataSource" [trackBy]="trackByFn" novoDataTableSortFilter [class.expandable]="expandable" [class.empty]="dataSource?.currentlyEmpty && state.userFiltered" [hidden]="dataSource?.totallyEmpty && !userFiltered">
                <ng-container cdkColumnDef="selection">
                    <novo-data-table-checkbox-header-cell *cdkHeaderCellDef></novo-data-table-checkbox-header-cell>
                    <novo-data-table-checkbox-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-checkbox-cell>
                </ng-container>
                <ng-container cdkColumnDef="expand">
                    <novo-data-table-expand-header-cell *cdkHeaderCellDef></novo-data-table-expand-header-cell>
                    <novo-data-table-expand-cell *cdkCellDef="let row; let i = index" [row]="row"></novo-data-table-expand-cell>
                </ng-container>
                <ng-container *ngFor="let column of columns;trackBy: trackColumnsBy" [cdkColumnDef]="column.id">
                  <novo-data-table-header-cell *cdkHeaderCellDef [column]="column" [novo-data-table-cell-config]="column" [defaultSort]="defaultSort" [class.empty]="column?.type === 'action' && !column?.label" [class.button-header-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)" [class.dropdown-header-cell]="column?.type === 'action' && column?.action?.options"></novo-data-table-header-cell>
                  <novo-data-table-cell *cdkCellDef="let row" [column]="column" [row]="row" [template]="columnToTemplate[column.id]" [class.empty]="column?.type === 'action' && !column?.label" [class.button-cell]="column?.type === 'expand' || (column?.type === 'action' && !column?.action?.options)" [class.dropdown-cell]="column?.type === 'action' && column?.action?.options"></novo-data-table-cell>
                </ng-container>
                <novo-data-table-header-row *cdkHeaderRowDef="displayedColumns" data-automation-id="novo-data-table-header-row"></novo-data-table-header-row>
                <novo-data-table-row *cdkRowDef="let row; columns: displayedColumns" [novoDataTableExpand]="detailRowTemplate" [row]="row" [id]="name + '-' + row[rowIdentifier]" [dataAutomationId]="row[rowIdentifier]"></novo-data-table-row>
            </cdk-table>
            <div class="novo-data-table-footer" *ngIf="templates['footer']">
              <ng-container *ngTemplateOutlet="templates['footer']; context: {$implicit: columns, data: dataSource.data}"></ng-container>
            </div>
            <div class="novo-data-table-no-results-container" [style.left.px]="scrollLeft" *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine">
              <div class="novo-data-table-empty-message" >
                <ng-container *ngTemplateOutlet="templates['noResultsMessage'] || templates['defaultNoResultsMessage']"></ng-container>
              </div>
            </div>
        </div>
        <div class="novo-data-table-empty-container" *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine">
          <div class="novo-data-table-empty-message">
            <ng-container *ngTemplateOutlet="templates['emptyMessage'] || templates['defaultNoResultsMessage']"></ng-container>
          </div>
        </div>
    </div>

      <!-- DEFAULT CELL TEMPLATE -->
    <ng-template novoTemplate="textCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col }}</span>
    </ng-template>
    <ng-template novoTemplate="dateCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col | dataTableDateRenderer:col }}</span>
    </ng-template>
    <ng-template novoTemplate="datetimeCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col | dataTableDateTimeRenderer:col }}</span>
    </ng-template>
    <ng-template novoTemplate="timeCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col | dataTableTimeRenderer:col }}</span>
    </ng-template>
    <ng-template novoTemplate="currencyCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col | dataTableCurrencyRenderer:col }}</span>
    </ng-template>
    <ng-template novoTemplate="numberCellTemplate"
          let-row
          let-col="col">
          <span>{{ row[col.id] | dataTableInterpolate:col | dataTableNumberRenderer:col }}</span>
    </ng-template>
    <ng-template novoTemplate="percentCellTemplate"
        let-row
        let-col="col">
        <span>{{ row[col.id] | dataTableInterpolate:col | dataTableNumberRenderer:col:true }}</span>
    </ng-template>
    <ng-template novoTemplate="linkCellTemplate"
          let-row
          let-col="col">
          <a (click)="col.handlers?.click({originalEvent: $event, row: row})">{{ row[col.id] | dataTableInterpolate:col }}</a>
    </ng-template>
    <ng-template novoTemplate="telCellTemplate"
          let-row
          let-col="col">
        <a href="tel:{{ row[col.id] | dataTableInterpolate:col }}" [target]="col?.attributes?.target">{{ row[col.id] | dataTableInterpolate:col }}</a>
    </ng-template>
    <ng-template novoTemplate="mailtoCellTemplate"
          let-row
          let-col="col">
          <a href="mailto:{{ row[col.id] | dataTableInterpolate:col }}" [target]="col?.attributes?.target">{{ row[col.id] | dataTableInterpolate:col }}</a>
    </ng-template>
    <ng-template novoTemplate="buttonCellTemplate"
          let-row
          let-col="col">
          <p [tooltip]="col?.action?.tooltip" tooltipPosition="right">
            <i class="bhi-{{ col?.action?.icon }} data-table-icon" (click)="col.handlers?.click({ originalEvent: $event, row: row })" [class.disabled]="isDisabled(col, row)"></i>
          </p>
    </ng-template>
    <ng-template novoTemplate="dropdownCellTemplate"
          let-row
          let-col="col">
          <novo-dropdown parentScrollSelector=".novo-data-table-container" containerClass="novo-data-table-dropdown">
            <button type="button" theme="dialogue" icon="collapse" inverse>{{ col.label }}</button>
            <list>
                <item *ngFor="let option of col?.action?.options" (action)="option.handlers.click({ originalEvent: $event?.originalEvent, row: row })" [disabled]="isDisabled(option, row)">
                    <span [attr.data-automation-id]="option.label">{{ option.label }}</span>
                </item>
            </list>
        </novo-dropdown>
    </ng-template>
    <ng-template novoTemplate="defaultNoResultsMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="defaultEmptyMessage">
      <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
    </ng-template>
    <ng-template novoTemplate="expandedRow">
      You did not provide an "expandedRow" template!
    </ng-template>
    <ng-template #detailRowTemplate let-row>
      <div class="novo-data-table-detail-row" [@expand] style="overflow: hidden">
        <ng-container *ngTemplateOutlet="templates['expandedRow']; context: {$implicit: row}"></ng-container>
      </div>
    </ng-template>
    <!-- CUSTOM CELLS PASSED IN -->
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataTableState],
})
export class NovoDataTable<T> implements AfterContentInit, OnDestroy {
  @HostBinding('class.global-search-hidden')
  globalSearchHiddenClassToggle: boolean = false;

  @ContentChildren(NovoTemplate)
  customTemplates: QueryList<NovoTemplate>;
  @ViewChildren(NovoTemplate)
  defaultTemplates: QueryList<NovoTemplate>;
  @ViewChild('novoDataTableContainer')
  novoDataTableContainer: ElementRef;

  @Input()
  set displayedColumns(displayedColumns: string[]) {
    if (this.displayedColumns && this.displayedColumns.length !== 0) {
      if (this.name !== 'novo-data-table') {
        this.preferencesChanged.emit({
          name: this.name,
          displayedColumns: displayedColumns,
        });
      } else {
        notify('Must have [name] set on data-table to use preferences!');
      }
    }
    this._disabledColumns = displayedColumns;
  }
  get displayedColumns(): string[] {
    return this._disabledColumns;
  }
  private _disabledColumns: string[];

  @Input()
  paginationOptions: IDataTablePaginationOptions;
  @Input()
  searchOptions: IDataTableSearchOptions;
  @Input()
  defaultSort: { id: string; value: string };
  @Input()
  name: string = 'novo-data-table';
  @Input()
  rowIdentifier: string = 'id';
  @Input()
  trackByFn: Function = (index, item) => item.id;
  @Input()
  templates: { [key: string]: TemplateRef<any> } = {};

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
    let service = new StaticDataTableService(rows);
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
        this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
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
        this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
        this.ref.markForCheck();
      });
    }
  }

  @Input()
  set columns(columns: IDataTableColumn<T>[]) {
    this._columns = columns;
    this.configureColumns();
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

  @Output()
  preferencesChanged: EventEmitter<IDataTablePreferences> = new EventEmitter<IDataTablePreferences>();

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
  private _columns: IDataTableColumn<T>[];
  private scrollListenerHandler: any;

  @HostBinding('class.empty')
  get empty() {
    return this.dataSource && this.dataSource.totallyEmpty;
  }

  @HostBinding('class.loading')
  get loadingClass() {
    return this.loading || (this.dataSource && this.dataSource.loading);
  }

  constructor(public labels: NovoLabelService, private ref: ChangeDetectorRef, public state: DataTableState<T>) {
    this.scrollListenerHandler = this.scrollListener.bind(this);
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
  }

  public ngOnDestroy(): void {
    if (this.outsideFilterSubscription) {
      this.outsideFilterSubscription.unsubscribe();
    }
    if (this.novoDataTableContainer) {
      (this.novoDataTableContainer.nativeElement as Element).removeEventListener('scroll', this.scrollListenerHandler);
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
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

    // Scrolling inside table
    (this.novoDataTableContainer.nativeElement as Element).addEventListener('scroll', this.scrollListenerHandler);

    this.ref.markForCheck();
  }

  public onSearchChange(term: string): void {
    this.state.globalSearch = term;
    this.state.reset(false, true);
    this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
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
    let expanded = this.isExpanded(row);

    if (expanded) {
      this.state.expandedRows.delete(`${row[this.rowIdentifier]}`);
    } else {
      this.state.expandedRows.add(`${row[this.rowIdentifier]}`);
    }
    this.state.onExpandChange();
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

  public selectRow(row: T): void {
    let selected = this.isSelected(row);

    if (selected) {
      this.state.selectedRows.delete(`${row[this.rowIdentifier]}`);
    } else {
      this.state.selectedRows.set(`${row[this.rowIdentifier]}`, row);
    }
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
    for (let i = 0; i < (this.dataSource.data || []).length; i++) {
      if (!this.isSelected((this.dataSource.data || [])[i])) {
        return false;
      }
    }
    return true;
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
      this.columnsLoaded = true;
    }
  }

  private scrollListener(event: Event): void {
    let left: number = (event.target as Element).scrollLeft;
    if (left !== this.scrollLeft) {
      this.scrollLeft = (event.target as Element).scrollLeft;
      this.ref.markForCheck();
    }
  }
}
