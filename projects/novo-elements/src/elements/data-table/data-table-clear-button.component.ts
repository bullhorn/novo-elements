import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, Input } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DataTableState } from './state/data-table-state.service';

@Component({
    selector: 'novo-data-table-clear-button',
    template: `
    <novo-dropdown side="bottom-right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <novo-button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">
        {{ labels.clear }}
      </novo-button>
      <list>
        <item
          *ngIf="state.selected.length > 0"
          (click)="clearSelected()"
          data-automation-id="novo-data-table-clear-dropdown-clear-selected"
          >{{ labels.clearSelected }}</item>
        <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{
          labels.clearSort
        }}</item>
        <item *ngIf="state.filter || state.globalSearch" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{
          labels.clearFilter
        }}</item>
        <item *ngIf="state.where" (click)="clearSearch()" data-automation-id="novo-data-table-clear-dropdown-clear-search">{{
          labels.clearSearch
        }}</item>
        <item *ngIf="(state.sort && (state.filter || state.globalSearch)) || (state.sort && state.where) || (state.where && (state.filter || state.globalSearch))"
          (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all"><b>{{
          labels.clearAllNormalCase
        }}</b></item>
      </list>
    </novo-dropdown>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class NovoDataTableClearButton<T> {
  @Output()
  selectedClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  sortClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  filterClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  queryClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  allClear: EventEmitter<boolean> = new EventEmitter();
  @Input()
  emitOnly: boolean = false;

  constructor(public state: DataTableState<T>, private ref: ChangeDetectorRef, public labels: NovoLabelService) { }

  clearSort(): void {
    if (!this.emitOnly) {
      this.state.clearSort();
    }
    this.sortClear.emit(true);
  }

  clearFilter(): void {
    if (!this.emitOnly) {
      this.state.clearFilter();
    }
    this.filterClear.emit(true);
  }

  clearSearch(): void {
    if (!this.emitOnly) {
      this.state.clearQuery();
    }
    this.queryClear.emit(true);
  }

  clearSelected(): void {
    if (!this.emitOnly) {
      this.state.clearSelected();
    }
    this.selectedClear.emit(true);
  }

  clearAll(): void {
    if (!this.emitOnly) {
      this.state.reset();
    }
    this.allClear.emit(true);
    this.selectedClear.emit(true);
    this.sortClear.emit(true);
    this.filterClear.emit(true);
    this.queryClear.emit(true);
  }
}
