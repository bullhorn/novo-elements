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
      let currentFilters = Helpers.convertToArray(this.state.filter);

      let filterIndex = currentFilters.findIndex((aFilter) => aFilter && aFilter.id === id);
      if (filterIndex > -1) {
        currentFilters.splice(filterIndex, 1);
      }

      if (!Helpers.isBlank(value)) {
        filter = currentFilters.length > 0 ? [...currentFilters, { id, value, transform }] : [{ id, value, transform }];
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
