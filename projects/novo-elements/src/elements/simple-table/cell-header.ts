import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { Subscription } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import { NovoSimpleSortFilter, NovoSimpleTableChange, SimpleTableColumnFilterConfig, SimpleTableColumnFilterOption } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoActivityTableState } from './state';

@Directive({
  selector: '[novoSimpleFilterFocus]',
  standalone: false
})
export class NovoSimpleFilterFocus implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}

@Component({
  selector: '[novo-simple-cell-config]',
  template: `
    <label (click)="sort()" data-automation-id="novo-activity-table-label" [class.sort-disabled]="!config.sortable">
      <ng-content></ng-content>
    </label>
    <div>
      @if (config.sortable) {
        <novo-button
          theme="icon"
          [icon]="icon"
          (click)="sort()"
          [class.active]="sortActive"
          data-automation-id="novo-activity-table-sort"></novo-button>
      }
      @if (config.filterable) {
        <novo-dropdown
          side="right"
          parentScrollSelector=".novo-simple-table"
          containerClass="simple-table-dropdown"
          data-automation-id="novo-activity-table-filter">
          <novo-button type="button" theme="icon" icon="filter" [class.active]="filterActive"></novo-button>
          <div class="header">
            <span>{{ labels.filters }}</span>
            @if (filter) {
              <novo-button
                theme="dialogue"
                color="negative"
                icon="times"
                (click)="clearFilter()"
                data-automation-id="novo-activity-table-filter-clear">
                {{ labels.clear }}
              </novo-button>
            }
          </div>
          @switch (config.filterConfig.type) {
            @case ('date') {
              <novo-optgroup>
                @if (!showCustomRange) {
                  @for (option of config.filterConfig.options; track option) {
                    <novo-option
                      [class.active]="activeDateFilter === $any(option).label"
                      (click)="filterData(option)"
                      [attr.data-automation-id]="'novo-activity-table-filter-' + $any(option).label"
                      >
                      {{ $any(option).label }}
                      @if (activeDateFilter === $any(option).label) {
                        <i class="bhi-check"></i>
                      }
                    </novo-option>
                  }
                }
                @if (config.filterConfig.allowCustomRange && !showCustomRange) {
                  <novo-option
                    [class.active]="labels.customDateRange === activeDateFilter"
                    (click)="toggleCustomRange($event, true)"
                    [keepOpen]="true">
                    {{ labels.customDateRange }}
                    @if (labels.customDateRange === activeDateFilter) {
                      <i class="bhi-check"></i>
                    }
                  </novo-option>
                }
                @if (showCustomRange) {
                  <div class="calendar-container">
                    <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
                    <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
                  </div>
                }
              </novo-optgroup>
            }
            @case ('select') {
              <novo-optgroup>
                @for (option of config.filterConfig.options; track option) {
                  <novo-option
                    [class.active]="filter === option"
                    (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-activity-table-filter-' + ($any(option)?.label || option)">
                    <span>{{ $any(option)?.label || option }}</span>
                    @if (option.hasOwnProperty('value') ? filter === $any(option).value : filter === option) {
                      <i class="bhi-check"></i>
                    }
                  </novo-option>
                }
              </novo-optgroup>
            }
            @default {
              <novo-optgroup>
                <novo-option class="filter-search" keepOpen>
                  <input
                    type="text"
                    [(ngModel)]="filter"
                    (ngModelChange)="filterData($event)"
                    novoSimpleFilterFocus
                    data-automation-id="novo-activity-table-filter-input" />
                </novo-option>
              </novo-optgroup>
            }
          }
        </novo-dropdown>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class NovoSimpleCellHeader implements NovoSimpleSortFilter, OnInit, OnDestroy {
  @ViewChild(NovoDropdownElement)
  dropdown: NovoDropdownElement;

  @Input()
  defaultSort: { id: string; value: string };

  @Input('novo-simple-cell-config')
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
    filterConfig: SimpleTableColumnFilterConfig;
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
    @Optional() public _sort: NovoSortFilter,
    @Optional() public _cdkColumnDef: CdkColumnDef,
  ) {
    this._rerenderSubscription = state.updates.subscribe((change: NovoSimpleTableChange) => {
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

  private getDefaultDateFilterOptions(): SimpleTableColumnFilterOption[] {
    const opts: SimpleTableColumnFilterOption[] = [
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
