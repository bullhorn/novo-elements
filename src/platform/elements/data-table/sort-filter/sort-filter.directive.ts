import { Directive } from '@angular/core';

import { DataTableState } from '../state/data-table-state.service';
import { Helpers } from '../../../utils/Helpers';

@Directive({
  selector: '[novoDataTableSortFilter]',
})
export class NovoDataTableSortFilter<T> {
  constructor(private state: DataTableState<T>) {}

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
    this.state.onSortFilterChange();
  }

  public sort(id: string, value: string, transform: Function): void {
    let sort = { id, value, transform };
    this.state.sort = sort;
    this.state.reset(false, true);
    this.state.updates.next({ sort: sort, filter: this.state.filter });
    this.state.onSortFilterChange();
  }
}
