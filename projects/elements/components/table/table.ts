import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { _DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { CdkTable, CDK_TABLE_TEMPLATE, _CoalescedStyleScheduler, _COALESCED_STYLE_SCHEDULER } from '@angular/cdk/table';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { notify } from 'novo-elements/utils';
import { Subscription } from 'rxjs';
import { TableActionColumn, TableColumn, TablePaginationOptions, TableSearchOptions } from './interfaces';
import { NovoActivityTableState } from './state';
import { ActivityTableDataSource, ActivityTableService } from './table-source';

@Component({
  selector: 'novo-table,[novo-table]',
  template: CDK_TABLE_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoTable<T> extends CdkTable<T> {
  // TODO: add explicit constructor
}

@Directive({
  selector: 'novo-activity-table-actions',
})
export class NovoActivityTableActions {}

@Directive({
  selector: 'novo-activity-table-custom-header',
})
export class NovoActivityTableCustomHeader {}

@Directive({
  selector: 'novo-activity-table-custom-filter',
})
export class NovoActivityTableCustomFilter {}

@Directive({
  selector: 'novo-activity-table-empty-message',
})
export class NovoActivityTableEmptyMessage {}

@Directive({
  selector: 'novo-activity-table-no-results-message',
})
export class NovoActivityTableNoResultsMessage {}

@Component({
  selector: 'novo-activity-table',
  template: `
    <div *ngIf="debug">
      <p>Total: {{ dataSource?.total }}</p>
      <p>Current: {{ dataSource?.current }}</p>
      <p>Totally Empty: {{ dataSource?.totallyEmpty }}</p>
      <p>Currently Empty: {{ dataSource?.currentlyEmpty }}</p>
      <p>Loading (DataSource): {{ dataSource?.loading }}</p>
      <p>User Filtered: {{ state.userFiltered }}</p>
      <p>Loading (Table): {{ loading }}</p>
    </div>
    <header *ngIf="(!(dataSource?.totallyEmpty && !state.userFiltered) && !loading) || forceShowHeader">
      <ng-content select="[novo-activity-table-custom-header]"></ng-content>
      <novo-search
        alwaysOpen="true"
        (searchChanged)="onSearchChange($event)"
        [(ngModel)]="state.globalSearch"
        *ngIf="!hideGlobalSearch"
        [placeholder]="searchOptions?.placeholder"
        [hint]="searchOptions?.tooltip"
      >
      </novo-search>
      <novo-table-pagination
        *ngIf="paginationOptions"
        [length]="dataSource?.total"
        [page]="paginationOptions.page"
        [pageSize]="paginationOptions.pageSize"
        [pageSizeOptions]="paginationOptions.pageSizeOptions"
      >
      </novo-table-pagination>
      <div class="novo-activity-table-actions">
        <ng-content select="[novo-activity-table-actions]"></ng-content>
      </div>
    </header>
    <div class="novo-activity-table-loading-mask" *ngIf="dataSource?.loading || loading" data-automation-id="novo-activity-table-loading">
      <novo-loading></novo-loading>
    </div>
    <div class="novo-activity-table-filter-container">
      <div class="novo-activity-table-custom-filter" *ngIf="customFilter">
        <ng-content select="[novo-activity-table-custom-filter]"></ng-content>
      </div>
      <div class="novo-activity-table-container">
        <novo-table
          *ngIf="columns?.length > 0"
          [dataSource]="dataSource"
          novoSortFilter
          novoSelection
          [class.empty]="dataSource?.currentlyEmpty && state.userFiltered"
          [hidden]="dataSource?.totallyEmpty && !state.userFiltered"
        >
          <ng-content></ng-content>
          <ng-container novoColumnDef="selection">
            <novo-checkbox-header-cell *novoHeaderCellDef></novo-checkbox-header-cell>
            <novo-checkbox-cell *novoCellDef="let row; let i = index" [row]="row" [index]="i"></novo-checkbox-cell>
          </ng-container>
          <ng-container *ngFor="let column of actionColumns" [novoColumnDef]="column.id">
            <novo-empty-header-cell
              [class.button-header-cell]="!column.options"
              [class.dropdown-header-cell]="column.options"
              *novoHeaderCellDef
            ></novo-empty-header-cell>
            <novo-action-cell *novoCellDef="let row; let i = index" [row]="row" [column]="column"></novo-action-cell>
          </ng-container>
          <ng-container *ngFor="let column of columns" [novoColumnDef]="column.id">
            <novo-header-cell *novoHeaderCellDef [column]="column">{{ column.label }}</novo-header-cell>
            <novo-cell *novoCellDef="let row" [column]="column" [row]="row"></novo-cell>
          </ng-container>
          <novo-header-row *novoHeaderRowDef="displayedColumns"></novo-header-row>
          <novo-table-row *novoRowDef="let row; columns: displayedColumns"></novo-table-row>
        </novo-table>
        <div
          class="novo-activity-table-no-results-container"
          *ngIf="dataSource?.currentlyEmpty && state.userFiltered && !dataSource?.loading && !loading && !dataSource.pristine"
        >
          <div #filtered><ng-content select="[novo-activity-table-no-results-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="filtered.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.noMatchingRecordsMessage }}</h4>
          </div>
        </div>
        <div
          class="novo-activity-table-empty-container"
          *ngIf="dataSource?.totallyEmpty && !dataSource?.loading && !loading && !state.userFiltered && !dataSource.pristine"
        >
          <div #empty><ng-content select="[novo-activity-table-empty-message]"></ng-content></div>
          <div class="novo-activity-table-empty-message" *ngIf="empty.childNodes.length == 0">
            <h4><i class="bhi-search-question"></i> {{ labels.emptyTableMessage }}</h4>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NovoActivityTableState,
    { provide: _VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
  ],
})
export class NovoActivityTable<T> implements AfterContentInit, OnChanges, OnDestroy {
  @HostBinding('class.global-search-hidden')
  globalSearchHiddenClassToggle: boolean = false;

  @Input()
  activityService: ActivityTableService<T>;
  @Input()
  columns: TableColumn<T>[];
  @Input()
  displayedColumns: string[];
  @Input()
  actionColumns: TableActionColumn<T>[];
  @Input()
  paginationOptions: TablePaginationOptions;
  @Input()
  searchOptions: TableSearchOptions;
  @Input()
  defaultSort: { id: string; value: string };
  @Input()
  outsideFilter: EventEmitter<any>;

  @Input()
  set customFilter(v: boolean) {
    this._customFilter = coerceBooleanProperty(v);
  }
  get customFilter() {
    return this._customFilter;
  }
  private _customFilter: boolean;

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
  private _hideGlobalSearch: boolean;

  @Input()
  set debug(v: boolean) {
    this._debug = coerceBooleanProperty(v);
  }
  get debug() {
    return this._debug;
  }
  private _debug: boolean;

  public dataSource: ActivityTableDataSource<T>;
  public loading: boolean = true;

  private outsideFilterSubscription: Subscription;

  @HostBinding('class.empty')
  get empty() {
    return this.dataSource && this.dataSource.totallyEmpty;
  }

  @HostBinding('class.loading')
  get loadingClass() {
    return this.loading || (this.dataSource && this.dataSource.loading);
  }

  constructor(public labels: NovoLabelService, private ref: ChangeDetectorRef, public state: NovoActivityTableState) {
    notify('[Deprecated]: The simple table is deprecated. Please migrate to novo-data-tables!');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.loading = changes.activityService && !changes.activityService.currentValue;
    this.ref.detectChanges();
    if (changes.activityService && changes.activityService.currentValue) {
      this.loading = false;
      this.dataSource = new ActivityTableDataSource<T>(this.activityService, this.state, this.ref);
      this.ref.detectChanges();
    }
    if (changes.outsideFilter && changes.outsideFilter.currentValue) {
      if (!this.outsideFilterSubscription) {
        this.outsideFilterSubscription = this.outsideFilter.subscribe((filter: any) => {
          this.state.outsideFilter = filter;
          this.state.updates.next({ globalSearch: this.state.globalSearch, filter: this.state.filter, sort: this.state.sort });
          this.ref.markForCheck();
        });
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.outsideFilterSubscription) {
      this.outsideFilterSubscription.unsubscribe();
    }
  }

  public ngAfterContentInit(): void {
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
    this.ref.markForCheck();
  }

  public onSearchChange(term: string): void {
    this.state.globalSearch = term;
    this.state.reset(false, true);
    this.state.updates.next({ globalSearch: term, filter: this.state.filter, sort: this.state.sort });
  }
}
