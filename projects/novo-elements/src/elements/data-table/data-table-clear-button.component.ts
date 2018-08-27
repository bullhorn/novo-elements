import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { DataTableState } from './state/data-table-state.service';
import { NovoLabelService } from '../../services/novo-label-service';

@Component({
  selector: 'novo-data-table-clear-button',
  template: `
    <novo-dropdown side="right" class="novo-data-table-clear-button" data-automation-id="novo-data-table-clear-dropdown">
      <button type="button" theme="primary" color="negative" icon="collapse" data-automation-id="novo-data-table-clear-dropdown-btn">{{ labels.clear }}</button>
      <list>
          <item *ngIf="state.sort" (click)="clearSort()" data-automation-id="novo-data-table-clear-dropdown-clear-sort">{{ labels.clearSort }}</item>
          <item *ngIf="state.filter" (click)="clearFilter()" data-automation-id="novo-data-table-clear-dropdown-clear-filter">{{ labels.clearFilter }}</item>
          <item *ngIf="state.sort && state.filter" (click)="clearAll()" data-automation-id="novo-data-table-clear-dropdown-clear-all">{{ labels.clearAllNormalCase }}</item>
      </list>
    </novo-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoDataTableClearButton<T> {
  @Output()
  sortClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  filterClear: EventEmitter<boolean> = new EventEmitter();
  @Output()
  allClear: EventEmitter<boolean> = new EventEmitter();

  constructor(public state: DataTableState<T>, private ref: ChangeDetectorRef, public labels: NovoLabelService) {}

  clearSort(): void {
    this.state.clearSort();
    this.sortClear.emit(true);
  }

  clearFilter(): void {
    this.state.clearFilter();
    this.filterClear.emit(true);
  }

  clearAll(): void {
    this.state.reset();
    this.allClear.emit(true);
    this.sortClear.emit(true);
    this.filterClear.emit(true);
  }
}
