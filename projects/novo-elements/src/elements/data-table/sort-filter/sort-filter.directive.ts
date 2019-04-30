import { Directive } from '@angular/core';

import { DataTableState } from '../state/data-table-state.service';
import { Helpers } from '../../../utils/Helpers';

@Directive({
  selector: '[novoDataTableSortFilter]',
})
export class NovoDataTableSortFilter<T> {
  constructor(private state: DataTableState<T>) {}

  public filter(id: string, value: any, transform: Function, allowMultipleFilters: boolean = false): void {
    let filter;

    if (allowMultipleFilters) {
      this.state.filter = Helpers.convertToArray(this.state.filter);

      let filterIndex = this.state.filter.findIndex((aFilter) => aFilter && aFilter.id === id);
      if (filterIndex > -1) {
        this.state.filter.splice(filterIndex, 1);
      }

      if (!Helpers.isBlank(value)) {
        filter = this.state.filter.length > 0 ? [...this.state.filter, { id, value, transform }] : [{ id, value, transform }];
      }

      if (filter.length < 1) {
        filter = undefined;
      }
    } else {
      if (!Helpers.isBlank(value)) {
        filter = { id, value, transform };
      } else {
        filter = undefined;
      }
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
