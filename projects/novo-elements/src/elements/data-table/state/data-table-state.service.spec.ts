// APP
import { DataTableState } from './data-table-state.service';

describe('Service: DataTableState', () => {
  let service = new DataTableState();

  describe('Method: reset', () => {
    beforeEach(() => {
      spyOn(service.selectedRows, 'clear');
      spyOn(service.resetSource, 'next');
      spyOn(service.updates, 'emit');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
    });
    it('should call selectedRows.clear, resetSource.next and onSortFilterChange if retainSelected is true', () => {
      service.retainSelected = false;
      spyOn(service, 'onSortFilterChange');
      service.reset();
      expect(service.onSortFilterChange).toHaveBeenCalled();
      expect(service.resetSource.next).toHaveBeenCalled();
      expect(service.selectedRows.clear).toHaveBeenCalled();
    });
    it('should not call selectedRows.clear or resetSource.next if retainSelected is false', () => {
      service.retainSelected = true;
      service.reset();
      expect(service.resetSource.next).not.toHaveBeenCalled();
      expect(service.selectedRows.clear).not.toHaveBeenCalled();
    });
    it('should reset page, globalSearch, filter, sort, and where', () => {
      service.reset();
      expect(service.filter).toBeUndefined();
      expect(service.sort).toBeUndefined();
      expect(service.globalSearch).toBeUndefined();
      expect(service.where).toBeUndefined();
      expect(service.page).toEqual(0);
      expect(service.retainSelected).toBeFalsy();
    });
    it('should not reset globalSearch, filter, sort, and where if persist filters is true', () => {
      service.reset(false, true);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
    });
    it('should emit an update if fireUpdate is true', () => {
      const expected = {
        sort: undefined,
        filter: undefined,
        globalSearch: undefined,
        where: undefined,
      };
      service.reset(true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.reset(false);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: clearSort', () => {
    beforeEach(() => {
      spyOn(service, 'reset');
      spyOn(service.updates, 'emit');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
    });
    afterAll(() => {
      service.reset();
    });
    it('should call checkRetainment, reset and onSortFilterChange', () => {
      spyOn(service, 'checkRetainment');
      spyOn(service, 'onSortFilterChange');
      service.clearSort();
      expect(service.checkRetainment).toHaveBeenCalledWith('sort');
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.onSortFilterChange).toHaveBeenCalled();
      expect(service.updates.emit).toHaveBeenCalled();
    });
    it('should only reset sort and page', () => {
      service.clearSort();
      expect(service.sort).toBeUndefined();
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fireUpdate is true', () => {
      const expected = {
        sort: undefined,
        filter: { id: 'test', value: 'value' },
        globalSearch: 'testing',
        where: { query: 'mock query', form: 'mock form' },
      };
      service.clearSort(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.clearSort(false);
      expect(service.reset).toHaveBeenCalledWith(false, true);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: clearFilter', () => {
    beforeEach(() => {
      spyOn(service, 'reset');
      spyOn(service.updates, 'emit');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
    });
    afterAll(() => {
      service.reset();
    });
    it('should call checkRetainment, reset and onSortFilterChange', () => {
      spyOn(service, 'checkRetainment');
      spyOn(service, 'onSortFilterChange');
      service.clearFilter();
      expect(service.checkRetainment).toHaveBeenCalledWith('filter');
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.onSortFilterChange).toHaveBeenCalled();
      expect(service.updates.emit).toHaveBeenCalled();
    });
    it('should only reset page, globalSearch, and filter', () => {
      service.clearFilter();
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.filter).toBeUndefined();
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.globalSearch).toBeUndefined();
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fireUpdate is true', () => {
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: undefined,
        globalSearch: undefined,
        where: { query: 'mock query', form: 'mock form' },
      };
      service.clearFilter(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.clearFilter(false);
      expect(service.reset).toHaveBeenCalledWith(false, true);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: clearQuery', () => {
    beforeEach(() => {
      spyOn(service, 'reset');
      spyOn(service.updates, 'emit');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
    });
    afterAll(() => {
      service.reset();
    });
    it('should call checkRetainment, reset and onSortFilterChange', () => {
      spyOn(service, 'checkRetainment');
      spyOn(service, 'onSortFilterChange');
      service.clearQuery();
      expect(service.checkRetainment).toHaveBeenCalledWith('where');
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.onSortFilterChange).toHaveBeenCalled();
      expect(service.updates.emit).toHaveBeenCalled();
    });
    it('should only reset page and where', () => {
      service.clearQuery();
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toBeUndefined();
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fireUpdate is true', () => {
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: { id: 'test', value: 'value' },
        globalSearch: 'testing',
        where: undefined,
      };
      service.clearQuery(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.clearQuery(false);
      expect(service.reset).toHaveBeenCalledWith(false, true);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: clearSelected', () => {
    beforeEach(() => {
      spyOn(service, 'reset');
      spyOn(service.updates, 'emit');
      service.globalSearch = 'testing';
    });
    afterAll(() => {
      service.reset();
    });
    it('should call allMatchingSelectedSource.next, reset and onSelectionChange', () => {
      spyOn(service.allMatchingSelectedSource, 'next');
      spyOn(service, 'onSelectionChange');
      service.clearSelected();
      expect(service.allMatchingSelectedSource.next).toHaveBeenCalledWith(false);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.onSelectionChange).toHaveBeenCalled();
      expect(service.updates.emit).toHaveBeenCalled();
    });
    it('should reset globalSearch and page', () => {
      service.clearSelected();
      expect(service.globalSearch).toBeUndefined();
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fireUpdate is true', () => {
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: { id: 'test', value: 'value' },
        globalSearch: undefined,
      };
      service.clearSelected(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.clearSelected(false);
      expect(service.reset).toHaveBeenCalledWith(false, true);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });

  describe('Method: checkRetainment', () => {
    beforeEach(() => {
      service.selectionOptions = [{ label: 'sort' }, { label: 'filter' }];
    });
    it('should return false if caller is not in selectedOptions, retainSelected and allMatchingSelected are false', () => {
      service.retainSelected = false;
      service.checkRetainment('test', false);
      expect(service.retainSelected).toBeFalsy();
    });
    it('should return false if caller is not in selectedOptions, retainSelected is false and allMatchingSelected is not passed in', () => {
      service.retainSelected = false;
      service.checkRetainment('test');
      expect(service.retainSelected).toBeFalsy();
    });
    it('should return true if caller is in selectedOptions', () => {
      service.retainSelected = false;
      service.checkRetainment('filter', false);
      expect(service.retainSelected).toBeTruthy();
    });
    it('should return true if retainSelected is true', () => {
      service.retainSelected = true;
      service.checkRetainment('test', false);
      expect(service.retainSelected).toBeTruthy();
    });
    it('should return true if allMatchingSelected is true', () => {
      service.retainSelected = false;
      service.checkRetainment('test', true);
      expect(service.retainSelected).toBeTruthy();
    });
  });

  describe('Method: onSelectionChange', () => {
    it('should call selectionSource.next with passed in targetId', () => {
      spyOn(service.selectionSource, 'next');
      service.onSelectionChange();
      expect(service.selectionSource.next).toHaveBeenCalled();
    });
  });

  describe('Method: onExpandChange', () => {
    it('should call expandSource.next with passed in targetId', () => {
      spyOn(service.expandSource, 'next');
      service.onExpandChange(5);
      expect(service.expandSource.next).toHaveBeenCalledWith(5);
    });
  });

  describe('Method: onPaginationChange', () => {
    it('should call checkRetainment for page, and paginationSource.next', () => {
      spyOn(service.paginationSource, 'next');
      spyOn(service, 'checkRetainment');
      const expected = {
        isPageSizeChange: true,
        pageSize: 5,
      };
      service.onPaginationChange(true, 5);
      expect(service.paginationSource.next).toHaveBeenCalledWith(expected);
      expect(service.checkRetainment).toHaveBeenCalledWith('page');
    });
  });

  describe('Method: onSortFilterChange', () => {
    it('should call checkRetainment for sort, filter, and where, and sortFilterSource.next', () => {
      spyOn(service.sortFilterSource, 'next');
      spyOn(service, 'checkRetainment');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
      service.savedSearchName = 'saved search';
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: { id: 'test', value: 'value' },
        globalSearch: 'testing',
        where: { query: 'mock query', form: 'mock form' },
        savedSearchName: 'saved search',
      };
      service.onSortFilterChange();
      expect(service.sortFilterSource.next).toHaveBeenCalledWith(expected);
      expect(service.checkRetainment).toHaveBeenCalledTimes(3);
    });
  });

  describe('Method: setInitialSortFilter', () => {
    beforeEach(() => {
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
      service.savedSearchName = 'old saved search';
    });
    it('should not do anything if preferences undefined', () => {
      service.setInitialSortFilter(undefined);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual('old saved search');
    });
    it('should set all values included in preferences', () => {
      const updatedPreferences = {
        filter: { id: 'updated', value: 'filter' },
        sort: { id: 'new', value: 'asc' },
        globalSearch: 'updated search',
        where: { query: 'updated', form: 'query' },
        savedSearchName: 'new saved search',
      };
      service.setInitialSortFilter(updatedPreferences);
      expect(service.filter).toEqual([{ id: 'updated', value: 'filter' }]);
      expect(service.sort).toEqual({ id: 'new', value: 'asc' });
      expect(service.globalSearch).toEqual('updated search');
      expect(service.where).toEqual({ query: 'updated', form: 'query' });
      expect(service.savedSearchName).toEqual('new saved search');
    });
    it('should only set values included in preferences (where)', () => {
      const updatedPreferences = {
        where: { query: 'updated', form: 'query' },
      };
      service.setInitialSortFilter(updatedPreferences);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual(updatedPreferences.where);
      expect(service.savedSearchName).toEqual('old saved search');
    });
    it('should only set values included in preferences (sort)', () => {
      const updatedPreferences = {
        sort: { id: 'new', value: 'asc' },
      };
      service.setInitialSortFilter(updatedPreferences);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual(updatedPreferences.sort);
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual('old saved search');
    });
    it('should only set values included in preferences (filter)', () => {
      spyOn((service as any), 'transformFilters').and.callThrough();
      const updatedPreferences = {
        filter: { id: 'updated', value: 'filter' },
      };
      service.setInitialSortFilter(updatedPreferences);
      expect((service as any).transformFilters).toHaveBeenCalledWith(updatedPreferences.filter);
      expect(service.filter).toEqual([updatedPreferences.filter]);
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual('old saved search');
    });
    it('should only set values included in preferences (globalSearch)', () => {
      const updatedPreferences = {
        globalSearch: 'updated search',
      };
      service.setInitialSortFilter(updatedPreferences);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual(updatedPreferences.globalSearch);
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual('old saved search');
    });
    it('should only set values included in preferences (savedSearchName)', () => {
      const updatedPreferences = {
        savedSearchName: 'new saved search',
      };
      service.setInitialSortFilter(updatedPreferences);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual(updatedPreferences.savedSearchName);
    });
  });

  describe('Method: setState', () => {
    const updatedPreferences = {
      name: 'table',
      filter: { id: 'updated', value: 'filter' },
      sort: { id: 'new', value: 'asc' },
      globalSearch: 'updated search',
      where: { query: 'updated', form: 'query' },
      savedSearchName: 'new saved search',
      displayedColumns: ['column 3', 'column 4'],
    };
    beforeEach(() => {
      spyOn(service.selectedRows, 'clear');
      spyOn(service.resetSource, 'next');
      spyOn(service.updates, 'emit');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      service.where = { query: 'mock query', form: 'mock form' };
      service.savedSearchName = 'old saved search';
      service.displayedColumns = ['column 1', 'column 2'];
    });
    it('should call selectedRows.clear, resetSource.next and onSortFilterChange if retainSelected is true', () => {
      service.retainSelected = false;
      spyOn(service, 'onSortFilterChange');
      service.setState(updatedPreferences);
      expect(service.onSortFilterChange).toHaveBeenCalled();
      expect(service.resetSource.next).toHaveBeenCalled();
      expect(service.selectedRows.clear).toHaveBeenCalled();
    });
    it('should not call selectedRows.clear or resetSource.next if retainSelected is false', () => {
      service.retainSelected = true;
      service.setState(updatedPreferences);
      expect(service.resetSource.next).not.toHaveBeenCalled();
      expect(service.selectedRows.clear).not.toHaveBeenCalled();
    });
    it('should set page, globalSearch, filter, sort, and where', () => {
      service.setState(updatedPreferences);
      expect(service.filter).toEqual([{ id: 'updated', value: 'filter' }]);
      expect(service.sort).toEqual({ id: 'new', value: 'asc' });
      expect(service.globalSearch).toEqual('updated search');
      expect(service.where).toEqual({ query: 'updated', form: 'query' });
      expect(service.savedSearchName).toEqual('new saved search');
      expect(service.displayedColumns).toEqual(['column 3', 'column 4']);
      expect(service.page).toEqual(0);
      expect(service.retainSelected).toBeFalsy();
    });
    it('should not set globalSearch, filter, sort, and where if persist filters is true', () => {
      service.setState(updatedPreferences, true, true);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
      expect(service.where).toEqual({ query: 'mock query', form: 'mock form' });
      expect(service.savedSearchName).toEqual('old saved search');
      expect(service.displayedColumns).toEqual(['column 1', 'column 2']);
    });
    it('should not set displayedColumns if displayedColumns property is undefined', () => {
      service.setState({ name: 'undefined columns', displayedColumns: undefined });
      expect(service.displayedColumns).toEqual(['column 1', 'column 2']);
    });
    it('should not set displayedColumns if displayedColumns array is empty', () => {
      service.setState({  name: 'empty columns', displayedColumns: [] });
      expect(service.displayedColumns).toEqual(['column 1', 'column 2']);
    });
    it('should emit an update if fireUpdate is true', () => {
      service.setState(updatedPreferences, true);
      const expectedUpdate = {
        ...updatedPreferences,
        name: undefined,
        filter: [updatedPreferences.filter],
      }
      expect(service.updates.emit).toHaveBeenCalledWith(expectedUpdate);
    });
    it('should not emit an update if fireUpdate is false', () => {
      service.setState(updatedPreferences, false);
      expect(service.updates.emit).not.toHaveBeenCalled();
    });
  });
});
