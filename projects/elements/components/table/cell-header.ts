import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { NovoDropdownElement } from 'novo-elements/components/dropdown';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { Subscription } from 'rxjs';
import { NovoTableChange, TableColumnFilterConfig, TableColumnFilterOption } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';

@Directive({
  selector: '[novoFilterFocus]',
})
export class NovoFilterFocus implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}

@Component({
  selector: 'novo-advanced-header-cell',
  template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      <novo-button
        *ngIf="config.sortable"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-activity-table-sort"
      ></novo-button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-table"
        containerClass="table-dropdown"
        data-automation-id="novo-activity-table-filter"
      >
        <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <novo-button
            theme="dialogue"
            color="danger"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter"
            data-automation-id="novo-activity-table-filter-clear"
          >
            {{ labels.clear }}
          </novo-button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <novo-optgroup *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <novo-option
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-activity-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </novo-option>
            </ng-container>
            <novo-option
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </novo-option>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </novo-optgroup>
          <novo-optgroup *ngSwitchCase="'select'">
            <novo-option
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-activity-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </novo-option>
          </novo-optgroup>
          <novo-optgroup *ngSwitchDefault>
            <novo-option class="filter-search" keepOpen>
              <input
                type="text"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                novoFilterFocus
                data-automation-id="novo-activity-table-filter-input"
              />
            </novo-option>
          </novo-optgroup>
        </ng-container>
      </novo-dropdown>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoAdvancedHeaderCell implements OnInit, OnDestroy {
  @ViewChild(NovoDropdownElement)
  dropdown: NovoDropdownElement;

  @Input()
  defaultSort: { id: string; value: string };

  @Input('novo-cell-config')
  get config() {
    return this._config;
  }

  set config(v) {
    if (!v) {
      this._config = {
        sortable: false,
        filterable: false,
        filterConfig: {
          type: 'text',
        },
      };
    } else {
      this._config = {
        sortable: coerceBooleanProperty(v.sortable),
        filterable: coerceBooleanProperty(v.filterable),
        transforms: v.transforms || {},
        filterConfig: v.filterConfig || {
          type: 'text',
        },
      };

      if (this._config.filterConfig.type === 'date' && !this._config.filterConfig.options) {
        this._config.filterConfig.options = this.getDefaultDateFilterOptions();
      }
    }
  }

  private _config: {
    sortable: boolean;
    filterable: boolean;
    transforms?: { filter?: Function; sort?: Function };
    filterConfig: TableColumnFilterConfig;
  };

  private _rerenderSubscription: Subscription;
  private changeTimeout: any;

  public icon: string = 'sortable';
  public id: string;
  public filter: string | boolean;
  public direction: string;
  public filterActive: boolean = false;
  public sortActive: boolean = false;
  public showCustomRange: boolean = false;
  public activeDateFilter: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public labels: NovoLabelService,
    private state: NovoActivityTableState,
    @Host() @Optional() public _sort: NovoSortFilter,
    @Host() @Optional() public _cdkColumnDef: CdkColumnDef,
  ) {
    this._rerenderSubscription = state.updates.subscribe((change: NovoTableChange) => {
      if (change.sort && change.sort.id === this.id) {
        this.icon = `sort-${change.sort.value}`;
        this.sortActive = true;
      } else {
        this.icon = 'sortable';
        this.sortActive = false;
      }
      if (change.filter && change.filter.id === this.id) {
        this.filterActive = true;
        this.filter = change.filter.value;
      } else {
        this.filterActive = false;
        this.filter = undefined;
      }
      changeDetectorRef.markForCheck();
    });
  }

  public ngOnInit(): void {
    if (this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }
    if (this.defaultSort && this.id === this.defaultSort.id) {
      this.icon = `sort-${this.defaultSort.value}`;
      this.sortActive = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  public ngOnDestroy(): void {
    this._rerenderSubscription.unsubscribe();
  }

  public sort(): void {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }
    this.changeTimeout = setTimeout(() => {
      this.direction = this.getNextSortDirection(this.direction);
      this._sort.sort(this.id, this.direction, this._config.transforms.sort);
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  public toggleCustomRange(event: Event, value: boolean): void {
    Helpers.swallowEvent(event);
    this.showCustomRange = value;
    this.changeDetectorRef.markForCheck();
    this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
  }

  public filterData(filter?: any): void {
    let actualFilter = filter;
    if (this.config.filterConfig.type === 'date' && filter) {
      this.activeDateFilter = filter.label || this.labels.customDateRange;
      if (filter.startDate && filter.endDate) {
        actualFilter = {
          min: DateUtil.startOfDay(filter.startDate.date),
          max: DateUtil.startOfDay(DateUtil.addDays(DateUtil.startOfDay(filter.endDate.date), 1)),
        };
      } else {
        actualFilter = {
          min: filter.min ? DateUtil.addDays(startOfToday(), filter.min) : startOfToday(),
          max: filter.max ? DateUtil.addDays(startOfTomorrow(), filter.max) : startOfTomorrow(),
        };
      }
    }

    if (actualFilter && actualFilter.hasOwnProperty('value')) {
      actualFilter = filter.value;
    }

    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }

    this.changeTimeout = setTimeout(() => {
      if (actualFilter === '') {
        actualFilter = undefined;
      }
      this._sort.filter(this.id, actualFilter, this.config.transforms.filter);
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  public clearFilter(): void {
    this.filter = undefined;
    this.activeDateFilter = undefined;
    this.filterData();
  }

  private getNextSortDirection(direction: string): string {
    if (!direction) {
      return 'asc';
    }
    if (direction === 'asc') {
      return 'desc';
    }
    return 'asc';
  }

  private getDefaultDateFilterOptions(): TableColumnFilterOption[] {
    const opts: TableColumnFilterOption[] = [
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
    return opts;
  }
}
