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
    it('should reset page, globalSearch, filter and sort', () => {
      service.reset();
      expect(service.filter).toBeUndefined();
      expect(service.sort).toBeUndefined();
      expect(service.globalSearch).toBeUndefined();
      expect(service.page).toEqual(0);
      expect(service.retainSelected).toBeFalsy();
    });
    it('should not reset globalSearch, filter and sort if persist filters is true', () => {
      service.reset(false, true);
      expect(service.filter).toEqual({ id: 'test', value: 'value' });
      expect(service.sort).toEqual({ id: 'test', value: 'desc' });
      expect(service.globalSearch).toEqual('testing');
    });
    it('should emit an update if fiedUpdate is true', () => {
      const expected = {
        sort: undefined,
        filter: undefined,
        globalSearch: undefined,
      };
      service.reset(true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fiedUpdate is false', () => {
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
    it('should reset sort and page', () => {
      service.clearSort();
      expect(service.sort).toBeUndefined();
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fiedUpdate is true', () => {
      const expected = {
        sort: undefined,
        filter: { id: 'test', value: 'value' },
        globalSearch: undefined,
      };
      service.clearSort(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fiedUpdate is false', () => {
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
    it('should reset page, globalSearch and filter', () => {
      service.clearFilter();
      expect(service.filter).toBeUndefined();
      expect(service.globalSearch).toBeUndefined();
      expect(service.page).toEqual(0);
    });
    it('should emit an update if fiedUpdate is true', () => {
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: undefined,
        globalSearch: undefined,
      };
      service.clearFilter(true);
      expect(service.reset).toHaveBeenCalledWith(true, true);
      expect(service.updates.emit).toHaveBeenCalledWith(expected);
    });
    it('should not emit an update if fiedUpdate is false', () => {
      service.clearFilter(false);
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
    it('should emit an update if fiedUpdate is true', () => {
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
    it('should not emit an update if fiedUpdate is false', () => {
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
    it('should call checkRetainment for sort and filter, and sortFilterSource.next', () => {
      spyOn(service.sortFilterSource, 'next');
      spyOn(service, 'checkRetainment');
      service.filter = { id: 'test', value: 'value' };
      service.sort = { id: 'test', value: 'desc' };
      service.globalSearch = 'testing';
      const expected = {
        sort: { id: 'test', value: 'desc' },
        filter: { id: 'test', value: 'value' },
        globalSearch: 'testing',
      };
      service.onSortFilterChange();
      expect(service.sortFilterSource.next).toHaveBeenCalledWith(expected);
      expect(service.checkRetainment).toHaveBeenCalledTimes(2);
    });
  });
});
