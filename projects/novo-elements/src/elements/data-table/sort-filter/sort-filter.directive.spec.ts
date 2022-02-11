import { DataTableState } from '../state/data-table-state.service';
import { NovoDataTableSortFilter } from './sort-filter.directive';

describe('Directive: sort-filter', () => {
  describe('Function: filter', () => {
    const testState: DataTableState<{}> = new DataTableState();
    const directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should set state filter to results', () => {
      directive.filter('test', 'text', 'test', undefined, false, { label: 'test', value: 1 });
      const expected = {
        id: 'test',
        selectedOption: { label: 'test', value: 1 },
        transform: undefined,
        type: 'text',
        value: 'test',
      };
      expect(testState.filter).toEqual(expected);
    });

    it('should set state filter to undefined is value is blank', () => {
      directive.filter('test', 'text', null, undefined);
      expect(testState.filter).toEqual(undefined);
    });

    it('should set check for selectionOptions', () => {
      spyOn(testState, 'checkRetainment').and.callFake(() => {});
      expect(directive.filter).toBeDefined();
      directive.filter('test', 'text', null, undefined);
      expect(testState.checkRetainment).toHaveBeenCalled();
    });
  });

  describe('Function: sort', () => {
    const testState: DataTableState<{}> = new DataTableState();
    const directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should set state sort to results', () => {
      directive.sort('test', 'test', undefined);
      expect(testState.sort).toEqual({ id: 'test', transform: undefined, value: 'test' });
    });

    it('should set check for selectionOptions', () => {
      spyOn(testState, 'checkRetainment').and.callFake(() => {});
      expect(directive.sort).toBeDefined();
      directive.sort('test', 'test', undefined);
      expect(testState.checkRetainment).toHaveBeenCalled();
    });
  });

  describe('Function: resolveMultiFilter', () => {
    const testState: DataTableState<{}> = new DataTableState();
    const directive: NovoDataTableSortFilter<{}> = new NovoDataTableSortFilter(testState);

    it('should return an array of results', () => {
      testState.filter = { id: 'test', type: 'text', transform: undefined, value: 'test' };
      const result = directive.resolveMultiFilter('test2', 'text', 'also a test', undefined, undefined);
      const expected = [
        { id: 'test', transform: undefined, type: 'text', value: 'test' },
        { id: 'test2', transform: undefined, type: 'text', value: 'also a test' },
      ];
      expect(result).toEqual(expected);
    });

    it('should replace a result if id already exists', () => {
      testState.filter = { id: 'test', type: 'text', transform: undefined, value: 'test' };
      const result = directive.resolveMultiFilter('test', 'text', 'replacement test', undefined, undefined);
      const expected = [{ id: 'test', transform: undefined, type: 'text', value: 'replacement test' }];
      expect(result).toEqual(expected);
    });

    it('should remove a result if passed value is blank', () => {
      testState.filter = [
        { id: 'test', type: 'text', transform: undefined, value: 'test' },
        { id: 'test2', type: 'text', transform: undefined, value: 'also a test' },
      ];
      const result = directive.resolveMultiFilter('test2', 'text', null, undefined, undefined);
      const expected = [{ id: 'test', transform: undefined, type: 'text', value: 'test' }];
      expect(result).toEqual(expected);
    });

    it('should return undefined rather than an empty array', () => {
      testState.filter = [{ id: 'test2', type: 'text', transform: undefined, value: 'also a test' }];
      const result = directive.resolveMultiFilter('test2', 'text', null, undefined, undefined);
      expect(result).toEqual(undefined);
    });
  });
});
