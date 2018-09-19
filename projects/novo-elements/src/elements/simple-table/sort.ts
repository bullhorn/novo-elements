import { Directive, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NovoActivityTableState } from './state';
import { Helpers } from '../../utils/Helpers';

@Directive({
  selector: '[novoSortFilter]',
})
export class NovoSortFilter {
  constructor(private state: NovoActivityTableState) {}

  public filter(id: string, value: any, transform: Function): void {
    let filter;
    if (!Helpers.isBlank(value)) {
      filter = { id, value, transform };
    } else {
      filter = undefined;
    }
    this.state.filter = filter;
    this.state.reset(false, true);
    this.state.updates.next({ filter: filter, sort: this.state.sort });
  }

  public sort(id: string, value: string, transform: Function): void {
    let sort = { id, value, transform };
    this.state.sort = sort;
    this.state.reset(false, true);
    this.state.updates.next({ sort: sort, filter: this.state.filter });
  }
}

@Directive({
  selector: '[novoSelection]',
})
export class NovoSelection implements OnDestroy {
  @Output()
  public novoSelectAllToggle = new EventEmitter<boolean>();

  public allRows = new Map<string, object>();
  private throttleTimeout: any;

  constructor(public state: NovoActivityTableState) {}

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
