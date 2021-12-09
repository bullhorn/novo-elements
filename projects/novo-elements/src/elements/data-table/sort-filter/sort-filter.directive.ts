import { Directive } from '@angular/core';
import { Helpers } from '../../../utils/Helpers';
import { DataTableState } from '../state/data-table-state.service';

@Directive({
  selector: '[novoDataTableSortFilter]',
})
export class NovoDataTableSortFilter<T> {
  constructor(private state: DataTableState<T>) {}

  public filter(
    id: string,
    type: string,
    value: any,
    transform: Function,
    allowMultipleFilters: boolean = false,
    selectedOption?: Object,
  ): void {
    let filter;

    if (allowMultipleFilters) {
      filter = this.resolveMultiFilter(id, type, value, transform, selectedOption);
    } else {
      if (!Helpers.isBlank(value)) {
        filter = { id, type, value, transform, ...(selectedOption && { selectedOption }) };
      } else {
        filter = undefined;
      }
    }

    this.state.filter = filter;
    this.state.checkRetainment('filter');
    this.state.reset(false, true);
    this.state.updates.next({ filter, sort: this.state.sort });
    this.state.onSortFilterChange();
  }

  public sort(id: string, value: string, transform: Function): void {
    const sort = { id, value, transform };
    this.state.sort = sort;
    this.state.checkRetainment('sort');
    this.state.reset(false, true);
    this.state.updates.next({ sort, filter: this.state.filter });
    this.state.onSortFilterChange();
  }

  public resolveMultiFilter(id: string, type: string, value: any, transform: Function, selectedOption: Object) {
    let filter;

    filter = Helpers.convertToArray(this.state.filter);

    const filterIndex = filter.findIndex((aFilter) => aFilter && aFilter.id === id);
    if (filterIndex > -1) {
      filter.splice(filterIndex, 1);
    }

    if (!Helpers.isBlank(value)) {
      filter = [...filter, { id, type, value, transform, ...(selectedOption && { selectedOption }) }];
    }

    if (filter.length < 1) {
      filter = undefined;
    }

    return filter;
  }
}
