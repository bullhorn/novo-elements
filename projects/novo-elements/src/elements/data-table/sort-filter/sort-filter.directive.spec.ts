import { NovoDataTableSortFilter } from './sort-filter.directive';
import { DataTableState } from '../state/data-table-state.service';

describe('Directive: sort-filter', () => {
  describe('Function: makeFilter', () => {
    let directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(new DataTableState());
    it('works', () => {
      const result = directive['makeFilter'](true, [{}], 'whelp', 5, () => {});
      expect(result).toBeDefined();
    });
  });
});
