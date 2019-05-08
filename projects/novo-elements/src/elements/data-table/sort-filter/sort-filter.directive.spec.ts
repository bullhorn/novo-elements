import { NovoDataTableSortFilter } from './sort-filter.directive';
import { DataTableState } from '../state/data-table-state.service';

describe('Directive: sort-filter', () => {
  describe('Function: filter', () => {
    let testState: DataTableState<{}> = new DataTableState();
    let directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should set state filter to results', () => {
      directive.filter('test', 'test', undefined);
      expect(testState.filter).toEqual({ id: 'test', transform: undefined, value: 'test' });
    });

    it('should set state filter to undefined is value is blank', () => {
      directive.filter('test', null, undefined);
      expect(testState.filter).toEqual(undefined);
    });
  });

  describe('Function: sort', () => {
    let testState: DataTableState<{}> = new DataTableState();
    let directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should set state sort to results', () => {
      directive.sort('test', 'test', undefined);
      expect(testState.sort).toEqual({ id: 'test', transform: undefined, value: 'test' });
    });
  });

  describe('Function: resolveMultiFilter', () => {
    let testState: DataTableState<{}> = new DataTableState();
    let directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should return an array of results', () => {
      testState.filter = { id: 'test', transform: undefined, value: 'test' };
      let result = directive.resolveMultiFilter('test2', 'also a test', undefined);
      let expected = [{ id: 'test', transform: undefined, value: 'test' }, { id: 'test2', transform: undefined, value: 'also a test' }];
      expect(result).toEqual(expected);
    });

    it('should replace a result if id already exists', () => {
      testState.filter = { id: 'test', transform: undefined, value: 'test' };
      let result = directive.resolveMultiFilter('test', 'replacement test', undefined);
      let expected = [{ id: 'test', transform: undefined, value: 'replacement test' }];
      expect(result).toEqual(expected);
    });

    it('should remove a result if passed value is blank', () => {
      testState.filter = [{ id: 'test', transform: undefined, value: 'test' }, { id: 'test2', transform: undefined, value: 'also a test' }];
      let result = directive.resolveMultiFilter('test2', null, undefined);
      let expected = [{ id: 'test', transform: undefined, value: 'test' }];
      expect(result).toEqual(expected);
    });

    it('should return undefined rather than an empty array', () => {
      testState.filter = [{ id: 'test2', transform: undefined, value: 'also a test' }];
      let result = directive.resolveMultiFilter('test2', null, undefined);
      expect(result).toEqual(undefined);
    });
  });
});
