import { Directive, EventEmitter, Output, OnDestroy } from '@angular/core';

import { IDataTableChangeEvent } from '../interfaces';
import { DataTableState } from '../state';

@Directive({
  selector: '[novoDataTableSelection]',
})
export class NovoDataTableSelection implements OnDestroy {
  @Output() public novoSelectAllToggle = new EventEmitter<boolean>();

  public allRows = new Map<string, object>();
  private throttleTimeout: any;

  constructor(public state: DataTableState) {}

  public register(id, row): void {
    this.allRows.set(id, row);
  }

  public deregister(id): void {
    this.allRows.delete(id);
    this.state.selectedRows.delete(id);
    clearTimeout(this.throttleTimeout);
    this.throttleTimeout = setTimeout(() => {
      if (this.state.selectedRows.size === 0) {
        this.novoSelectAllToggle.emit(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.allRows.clear();
    this.state.selectedRows.clear();
  }

  public toggle(id: string, selected: boolean, row: any): void {
    if (selected) {
      this.state.selectedRows.set(id, row);
    } else {
      this.state.selectedRows.delete(id);
    }
  }

  public selectAll(value: boolean): void {
    if (value) {
      this.state.selectedRows = new Map<string, object>(this.allRows);
    } else {
      this.state.selectedRows.clear();
    }
    this.novoSelectAllToggle.emit(value);
  }
}
