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
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import { Subscription } from 'rxjs/Subscription';
import * as dateFns from 'date-fns';

import { NovoSimpleSortFilter, NovoSimpleTableChange, SimpleTableColumnFilterConfig, SimpleTableColumnFilterOption } from './interfaces';
import { NovoSortFilter } from './sort';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoActivityTableState } from './state';
import { Helpers } from '../../utils/Helpers';

@Directive({
  selector: '[novoSimpleFilterFocus]'
})
export class NovoSimpleFilterFocus implements AfterViewInit {
  constructor(private element: ElementRef) { }

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
      <button *ngIf="config.sortable" theme="icon" [icon]="icon" (click)="sort()" [class.active]="sortActive"
              data-automation-id="novo-activity-table-sort"></button>
      <novo-dropdown *ngIf="config.filterable" side="right" parentScrollSelector=".novo-simple-table" containerClass="simple-table-dropdown"
                     data-automation-id="novo-activity-table-filter">
        <button type="button" theme="icon" icon="filter" [class.active]="filterActive"></button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <button theme="dialogue" color="negative" icon="times" (click)="clearFilter()"
                  *ngIf="filter !== null && filter !== undefined && filter !== ''" data-automation-id="novo-activity-table-filter-clear">
            {{ labels.clear }}
          </button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <list *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <item [class.active]="activeDateFilter === option.label" *ngFor="let option of config.filterConfig.options" (click)="filterData(option)"
                    [attr.data-automation-id]="'novo-activity-table-filter-' + option.label">
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </item>
            </ng-container>
            <item [class.active]="labels.customDateRange === activeDateFilter" (click)="toggleCustomRange($event, true)"
                  *ngIf="config.filterConfig.allowCustomRange && !showCustomRange" [keepOpen]="true">
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </item>
            <div class="calender-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </list>
          <list *ngSwitchCase="'select'">
            <item [class.active]="filter === option" *ngFor="let option of config.filterConfig.options" (click)="filterData(option)"
                  [attr.data-automation-id]="'novo-activity-table-filter-' + (option?.label || option)">
              <span>{{ option?.label || option }}</span> <i class="bhi-check"
                                                            *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </item>
          </list>
          <list *ngSwitchDefault>
            <item class="filter-search" keepOpen="true">
              <input type="text" [(ngModel)]="filter" (ngModelChange)="filterData($event)" novoSimpleFilterFocus
                     data-automation-id="novo-activity-table-filter-input"/>
            </item>
          </list>
        </ng-container>
      </novo-dropdown>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoSimpleCellHeader implements NovoSimpleSortFilter, OnInit, OnDestroy {
  @Input() defaultSort: { id: string; value: string };

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

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public labels: NovoLabelService,
              private state: NovoActivityTableState,
              @Optional() public _sort: NovoSortFilter,
              @Optional() public _cdkColumnDef: CdkColumnDef,) {
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
  }

  public filterData(filter?: any): void {
    let actualFilter = filter;
    if (this.config.filterConfig.type === 'date' && filter) {
      this.activeDateFilter = filter.label || this.labels.customDateRange;
      if (filter.startDate && filter.endDate) {
        actualFilter = {
          min: dateFns.startOfDay(filter.startDate.date),
          max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(filter.endDate.date), 1)),
        };
      } else {
        actualFilter = {
          min: filter.min ? dateFns.addDays(dateFns.startOfToday(), filter.min) : dateFns.startOfToday(),
          max: filter.max ? dateFns.addDays(dateFns.startOfTomorrow(), filter.max) : dateFns.startOfTomorrow(),
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
    let opts: SimpleTableColumnFilterOption[] = [
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
