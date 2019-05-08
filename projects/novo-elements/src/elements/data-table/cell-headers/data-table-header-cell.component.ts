import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Optional,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  HostBinding,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { fromEvent, Subscription } from 'rxjs';
import * as dateFns from 'date-fns';

import {
  IDataTableSortFilter,
  IDataTableChangeEvent,
  IDataTableColumn,
  IDataTableColumnFilterOption,
  IDataTableColumnFilterConfig,
  IDataTableColumnSortConfig,
} from '../interfaces';
import { NovoDataTableSortFilter } from '../sort-filter/sort-filter.directive';
import { NovoDropdownElement } from '../../dropdown/Dropdown';
import { NovoLabelService } from '../../../services/novo-label-service';
import { DataTableState } from '../state/data-table-state.service';
import { Helpers } from '../../../utils/Helpers';
import { KeyCodes } from '../../../utils/key-codes/KeyCodes';
import { DataTableFilterUtils } from '../services/data-table-filter-utils';

@Component({
  selector: '[novo-data-table-cell-config]',
  template: `
    <i class="bhi-{{ labelIcon }} label-icon" *ngIf="labelIcon" data-automation-id="novo-data-table-header-icon"></i>
    <label data-automation-id="novo-data-table-label">{{ label }}</label>
    <div>
      <button
        *ngIf="config.sortable"
        tooltipPosition="right"
        [tooltip]="labels.sort"
        theme="icon"
        [icon]="icon"
        (click)="sort()"
        [class.active]="sortActive"
        data-automation-id="novo-data-table-sort"
      ></button>
      <novo-dropdown
        *ngIf="config.filterable"
        side="right"
        parentScrollSelector=".novo-data-table-container"
        containerClass="data-table-dropdown"
        data-automation-id="novo-data-table-filter"
      >
        <button
          type="button"
          theme="icon"
          icon="filter"
          [class.active]="filterActive"
          (click)="focusInput()"
          tooltipPosition="right"
          [tooltip]="labels.filters"
        ></button>
        <div class="header">
          <span>{{ labels.filters }}</span>
          <button
            theme="dialogue"
            color="negative"
            icon="times"
            (click)="clearFilter()"
            *ngIf="filter !== null && filter !== undefined && filter !== ''"
            data-automation-id="novo-data-table-filter-clear"
          >
            {{ labels.clear }}
          </button>
        </div>
        <ng-container [ngSwitch]="config.filterConfig.type">
          <list *ngSwitchCase="'date'">
            <ng-container *ngIf="!showCustomRange">
              <item
                [class.active]="activeDateFilter === option.label"
                *ngFor="let option of config.filterConfig.options"
                (click)="filterData(option)"
                [attr.data-automation-id]="'novo-data-table-filter-' + option.label"
              >
                {{ option.label }} <i class="bhi-check" *ngIf="activeDateFilter === option.label"></i>
              </item>
            </ng-container>
            <item
              [class.active]="labels.customDateRange === activeDateFilter"
              (click)="toggleCustomRange($event, true)"
              *ngIf="config.filterConfig.allowCustomRange && !showCustomRange"
              [keepOpen]="true"
            >
              {{ labels.customDateRange }} <i class="bhi-check" *ngIf="labels.customDateRange === activeDateFilter"></i>
            </item>
            <div class="calendar-container" *ngIf="showCustomRange">
              <div (click)="toggleCustomRange($event, false)"><i class="bhi-previous"></i>{{ labels.backToPresetFilters }}</div>
              <novo-date-picker (onSelect)="filterData($event)" [(ngModel)]="filter" range="true"></novo-date-picker>
            </div>
          </list>
          <list *ngSwitchCase="'select'">
            <item
              [class.active]="filter === option"
              *ngFor="let option of config.filterConfig.options"
              (click)="filterData(option)"
              [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)"
            >
              <span>{{ option?.label || option }}</span>
              <i class="bhi-check" *ngIf="option.hasOwnProperty('value') ? filter === option.value : filter === option"></i>
            </item>
          </list>
          <list *ngSwitchCase="'multi-select'">
            <div class="dropdown-list-filter" (keydown)="multiSelectOptionFilterHandleKeydown($event)">
              <item class="filter-search" keepOpen="true">
                <input
                  [(ngModel)]="optionFilter"
                  (ngModelChange)="multiSelectOptionFilter($event)"
                  #optionFilterInput
                  data-automation-id="novo-data-table-multi-select-option-filter-input"
                />
                <i class="bhi-search"></i>
                <span class="error-text" [hidden]="!error || !multiSelectHasVisibleOptions()">{{ labels.selectFilterOptions }}</span>
              </item>
            </div>
            <div class="dropdown-list-options">
              <item
                *ngFor="let option of config.filterConfig.options"
                [hidden]="multiSelectOptionIsHidden(option)"
                (click)="toggleSelection(option)"
                [attr.data-automation-id]="'novo-data-table-filter-' + (option?.label || option)"
                [keepOpen]="true"
              >
                <span>{{ option?.label || option }}</span>
                <i
                  [class.bhi-checkbox-empty]="!isSelected(option, multiSelectedOptions)"
                  [class.bhi-checkbox-filled]="isSelected(option, multiSelectedOptions)"
                ></i>
              </item>
            </div>
            <p class="filter-null-results" [hidden]="multiSelectHasVisibleOptions()">{{ labels.pickerEmpty }}</p>
          </list>
          <list *ngSwitchCase="'custom'">
            <item class="filter-search" keepOpen="true">
              <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: config }"></ng-container>
            </item>
          </list>
          <list *ngSwitchDefault>
            <item class="filter-search" keepOpen="true">
              <input
                [type]="config.filterConfig.type"
                [(ngModel)]="filter"
                (ngModelChange)="filterData($event)"
                #filterInput
                data-automation-id="novo-data-table-filter-input"
              />
            </item>
          </list>
        </ng-container>
        <div class="footer" *ngIf="multiSelect">
          <button theme="dialogue" color="dark" (click)="cancel()" data-automation-id="novo-data-table-multi-select-cancel">
            {{ labels.cancel }}
          </button>
          <button theme="dialogue" color="positive" (click)="filterMultiSelect()" data-automation-id="novo-data-table-multi-select-filter">
            {{ labels.filters }}
          </button>
        </div>
      </novo-dropdown>
    </div>
    <div class="spacer"></div>
    <div class="data-table-header-resizable" *ngIf="config.resizable"><span (mousedown)="startResize($event)">&nbsp;</span></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableCellHeader<T> implements IDataTableSortFilter, OnInit, OnDestroy {
  @ViewChild('filterInput')
  filterInput: ElementRef;
  @ViewChild(NovoDropdownElement)
  dropdown: NovoDropdownElement;
  @ViewChild('optionFilterInput')
  optionFilterInput: ElementRef;

  @Input()
  defaultSort: { id: string; value: string };

  @Input()
  allowMultipleFilters: boolean = false;

  @Input()
  resized: EventEmitter<IDataTableColumn<T>>;
  @Input()
  filterTemplate: TemplateRef<any>;
  @HostBinding('class.resizable')
  public resizable: boolean;

  @Input('novo-data-table-cell-config')
  set column(column: IDataTableColumn<T>) {
    this._column = column;
    this.label = column.type === 'action' ? '' : column.label;
    this.labelIcon = column.labelIcon;

    this.config = {
      sortable: !!column.sortable,
      filterable: !!column.filterable,
      resizable: !!column.resizable,
    };
    this.resizable = this.config.resizable;

    let transforms: { filter?: Function; sort?: Function } = {};

    if (column.filterable && Helpers.isObject(column.filterable)) {
      this.config.filterConfig = column.filterable as IDataTableColumnFilterConfig;
      if (!this.config.filterConfig.type) {
        this.config.filterConfig = { type: 'text' };
      }
      if ((column.filterable as IDataTableColumnFilterConfig).transform) {
        transforms.filter = (column.filterable as IDataTableColumnFilterConfig).transform;
      }
    } else {
      this.config.filterConfig = { type: 'text' };
    }

    if (column.sortable && Helpers.isObject(column.sortable)) {
      if ((column.sortable as IDataTableColumnSortConfig).transform) {
        transforms.sort = (column.sortable as IDataTableColumnSortConfig).transform;
      }
    }

    if (this.config.filterConfig.type === 'date' && !this.config.filterConfig.options) {
      this.config.filterConfig.options = this.getDefaultDateFilterOptions();
    }

    this.config.transforms = transforms;
  }

  private _rerenderSubscription: Subscription;
  private changeTimeout: any;

  public label: string;
  public icon: string = 'sortable';
  public labelIcon: string;
  public id: string;
  public filter: any;
  public direction: string;
  public filterActive: boolean = false;
  public sortActive: boolean = false;
  public showCustomRange: boolean = false;
  public activeDateFilter: string;
  public config: {
    sortable: boolean;
    filterable: boolean;
    resizable: boolean;
    transforms?: { filter?: Function; sort?: Function };
    filterConfig?: IDataTableColumnFilterConfig;
  };
  public multiSelect: boolean = false;
  public multiSelectedOptions: Array<any> = [];
  private multiSelectedOptionIsHidden: Array<{ option: string | IDataTableColumnFilterOption; hidden: boolean }> = [];
  public optionFilter: string = '';
  public error: boolean = false;
  private subscriptions: Subscription[] = [];
  private _column: IDataTableColumn<T>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public labels: NovoLabelService,
    private state: DataTableState<T>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() public _sort: NovoDataTableSortFilter<T>,
    @Optional() public _cdkColumnDef: CdkColumnDef,
  ) {
    this._rerenderSubscription = state.updates.subscribe((change: IDataTableChangeEvent) => this.checkSortFilterState(change));
  }

  public ngOnInit(): void {
    if (this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }

    this.checkSortFilterState({ filter: this.state.filter, sort: this.state.sort }, true);

    if (this.defaultSort && this.id === this.defaultSort.id) {
      this.icon = `sort-${this.defaultSort.value}`;
      this.sortActive = true;
      this.changeDetectorRef.markForCheck();
    }
    this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
    if (this.multiSelect) {
      this.multiSelectedOptions = this.filter ? [...this.filter] : [];
    }
  }

  public ngOnDestroy(): void {
    this._rerenderSubscription.unsubscribe();
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public checkSortFilterState(sortFilterState: IDataTableChangeEvent, initialConfig: boolean = false): void {
    if (sortFilterState.sort && sortFilterState.sort.id === this.id) {
      this.icon = `sort-${sortFilterState.sort.value}`;
      this.sortActive = true;
    } else {
      this.icon = 'sortable';
      this.sortActive = false;
    }

    let tableFilter = Helpers.convertToArray(sortFilterState.filter);
    let thisFilter = tableFilter.find((filter) => filter && filter.id === this.id);

    if (thisFilter) {
      this.filterActive = true;
      if (initialConfig && thisFilter.type === 'date' && thisFilter.selectedOption) {
        this.activeDateFilter = thisFilter.selectedOption.label || this.labels.customDateRange;
      }
      this.filter = thisFilter.value;
    } else {
      this.filterActive = false;
      this.filter = undefined;
      this.activeDateFilter = undefined;
      this.multiSelectedOptions = [];
    }
    if (this.defaultSort && this.id === this.defaultSort.id) {
      this.icon = `sort-${this.defaultSort.value}`;
      this.sortActive = true;
      this.changeDetectorRef.markForCheck();
    }
    this.multiSelect = this.config.filterConfig && this.config.filterConfig.type ? this.config.filterConfig.type === 'multi-select' : false;
    if (this.multiSelect) {
      this.multiSelectedOptions = this.filter ? [...this.filter] : [];
      if (this.config.filterConfig.options) {
        if (typeof this.config.filterConfig.options[0] === 'string') {
          this.multiSelectedOptionIsHidden = (this.config.filterConfig.options as string[]).map(
            (option: string): { option: string; hidden: boolean } => ({ option: option, hidden: false }),
          );
        } else {
          this.multiSelectedOptionIsHidden = (this.config.filterConfig.options as IDataTableColumnFilterOption[]).map(
            (option: IDataTableColumnFilterOption): { option: IDataTableColumnFilterOption; hidden: boolean } => ({
              option: option,
              hidden: false,
            }),
          );
        }
      }
    }
  }

  public isSelected(option, optionsList) {
    if (optionsList) {
      const optionValue = option.hasOwnProperty('value') ? option.value : option;

      let found = optionsList.find((item) => this.optionPresentCheck(item, optionValue));
      return found !== undefined;
    }
    return false;
  }

  public toggleSelection(option) {
    const optionValue = option.hasOwnProperty('value') ? option.value : option;

    let optionIndex = this.multiSelectedOptions.findIndex((item) => this.optionPresentCheck(item, optionValue));
    this.error = false;
    if (optionIndex > -1) {
      this.multiSelectedOptions.splice(optionIndex, 1);
      if (
        this.optionFilter &&
        !this.getOptionText(option)
          .toLowerCase()
          .startsWith(this.optionFilter.toLowerCase())
      ) {
        this.multiSelectedOptionIsHidden[this.multiSelectedOptionIsHidden.findIndex((record) => record.option === option)].hidden = true;
      }
    } else {
      this.multiSelectedOptions.push(optionValue);
    }
  }

  public optionPresentCheck(item, optionValue): boolean {
    if (item.hasOwnProperty('value')) {
      return item.value === optionValue;
    } else {
      return item === optionValue;
    }
  }

  public cancel(): void {
    this.multiSelectedOptions = this.filter ? [...this.filter] : [];
    this.dropdown.closePanel();
    this.clearOptionFilter();
  }

  public filterMultiSelect(): void {
    if (this.multiSelectedOptions.length === 0 && !this.filter) {
      this.multiSelectHasVisibleOptions() && this.dropdown ? (this.error = true) : null;
    } else {
      this.clearOptionFilter();
      let actualFilter = this.multiSelectedOptions.length > 0 ? [...this.multiSelectedOptions] : undefined;
      this.filterData(actualFilter);
      this.dropdown.closePanel();
    }
  }

  public multiSelectOptionFilter(optionFilter: string) {
    this.multiSelectedOptionIsHidden.forEach((record) => {
      if (record.option) {
        record.hidden = !(
          this.getOptionText(record.option)
            .toLowerCase()
            .startsWith(optionFilter.toLowerCase()) || this.isSelected(record.option, this.multiSelectedOptions)
        );
      }
    });
  }

  public multiSelectOptionIsHidden(option: string | IDataTableColumnFilterOption): boolean {
    return this.multiSelectedOptionIsHidden.find((record) => record.option === option).hidden;
  }

  public multiSelectHasVisibleOptions(): boolean {
    return this.multiSelectedOptionIsHidden.some((record) => !record.hidden);
  }

  private getOptionText(option: string | IDataTableColumnFilterOption): string {
    if (typeof option !== 'object') {
      return option.toString();
    } else {
      const opt = option as IDataTableColumnFilterOption;
      return (opt.label.length > 0 ? opt.label : opt.value).toString();
    }
  }

  @HostListener('document:keydown', ['$event'])
  public multiSelectOptionFilterHandleKeydown(event: KeyboardEvent) {
    if (this.multiSelect) {
      this.error = false;
      if (this.dropdown.panelOpen && event.keyCode === KeyCodes.ESC) {
        // escape = clear text box and close
        Helpers.swallowEvent(event);
        this.clearOptionFilter();
        this.dropdown.closePanel();
      } else if (event.keyCode === KeyCodes.ENTER) {
        Helpers.swallowEvent(event);
        this.filterMultiSelect();
      } else if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        (event.keyCode >= 48 && event.keyCode <= 57)
      ) {
        this.optionFilterInput.nativeElement.focus();
      }
    }
  }

  private clearOptionFilter() {
    this.error = false;
    if (this.optionFilter.length > 0) {
      this.optionFilter = '';
      this.multiSelectedOptionIsHidden.forEach((record) => {
        record.hidden = false;
      });
    }
  }

  public startResize(mouseDownEvent: MouseEvent): void {
    mouseDownEvent.preventDefault();
    const minimumWidth = 60 + (this.config.filterable ? 30 : 0) + (this.config.sortable ? 30 : 0);
    let startingWidth: number = this.elementRef.nativeElement.getBoundingClientRect().width;
    const mouseMoveSubscription: Subscription = fromEvent(window.document, 'mousemove').subscribe((middleMouseEvent: MouseEvent) => {
      let differenceWidth: number = middleMouseEvent.clientX - mouseDownEvent.clientX;
      let width: number = startingWidth + differenceWidth;
      if (width < minimumWidth) {
        width = minimumWidth;
      }
      this._column.width = width;
      this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', `${this._column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', `${this._column.width}px`);
      this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${this._column.width}px`);
      this.changeDetectorRef.markForCheck();
      this.resized.next(this._column);
    });

    let mouseUpSubscription: Subscription = fromEvent(window.document, 'mouseup').subscribe(() => {
      mouseUpSubscription.unsubscribe();
      mouseMoveSubscription.unsubscribe();
      this.changeDetectorRef.markForCheck();
    });
    this.subscriptions.push(mouseMoveSubscription);
    this.subscriptions.push(mouseUpSubscription);
  }

  public toggleCustomRange(event: Event, value: boolean): void {
    Helpers.swallowEvent(event);
    this.showCustomRange = value;
    this.changeDetectorRef.markForCheck();
    this.dropdown.openPanel(); // Ensures that the panel correctly updates to the dynamic size of the dropdown
  }

  public focusInput(): void {
    if (this.filterInput && this.filterInput.nativeElement) {
      setTimeout(() => this.filterInput.nativeElement.focus(), 0);
    }
    if (this.multiSelect && this.dropdown) {
      this.dropdown.onKeyDown = (event: KeyboardEvent) => {
        this.multiSelectOptionFilterHandleKeydown(event);
      };
      setTimeout(() => this.optionFilterInput.nativeElement.focus(), 0);
      this.changeDetectorRef.markForCheck();
    }
  }

  public sort(): void {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }
    this.changeTimeout = setTimeout(() => {
      this.direction = this.getNextSortDirection(this.direction);
      this._sort.sort(this.id, this.direction, this.config.transforms.sort);
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  public filterData(filter?: any): void {
    let actualFilter = DataTableFilterUtils.constructFilter(filter, this.config.filterConfig.type, this.multiSelect);
    const selectedOption = this.config.filterConfig.type === 'date' && filter ? filter : undefined;

    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }

    this.changeTimeout = setTimeout(() => {
      if (actualFilter === '') {
        actualFilter = undefined;
      }
      this._sort.filter(
        this.id,
        this.config.filterConfig.type,
        actualFilter,
        this.config.transforms.filter,
        this.allowMultipleFilters,
        selectedOption,
      );
      this.changeDetectorRef.markForCheck();
    }, 300);
  }

  constructFilter(filter?: any) {
    let actualFilter = filter;
    if (this.config.filterConfig.type === 'date' && filter) {
      if (filter.startDate && filter.endDate) {
        actualFilter = {
          min: dateFns.startOfDay(filter.startDate.date),
          max: dateFns.startOfDay(dateFns.addDays(dateFns.startOfDay(filter.endDate.date), 1)),
        };
      } else {
        actualFilter = {
          min: filter.min ? dateFns.addDays(dateFns.startOfToday(), filter.min) : dateFns.startOfToday(),
          max: filter.max ? dateFns.addDays(dateFns.endOfToday(), filter.max) : dateFns.endOfToday(),
        };
      }
    }

    if (this.multiSelect && Array.isArray(filter)) {
      actualFilter = filter.map((filterItem) => {
        if (filterItem && filterItem.hasOwnProperty('value')) {
          return filterItem.value;
        }
        return filterItem;
      });
    } else if (actualFilter && actualFilter.hasOwnProperty('value')) {
      actualFilter = filter.value;
    }

    return actualFilter;
  }

  public clearFilter(): void {
    this.filter = undefined;
    this.multiSelectedOptions = [];
    this.activeDateFilter = undefined;
    this.filterData(undefined);
    this.clearOptionFilter();
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

  private getDefaultDateFilterOptions(): IDataTableColumnFilterOption[] {
    let opts: IDataTableColumnFilterOption[] = [
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
