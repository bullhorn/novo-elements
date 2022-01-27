import { TestBed, async } from '@angular/core/testing';
import { NovoDataTable } from './data-table.component';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoDropdownModule, NovoLabelService } from '../..';
import { DataTableState } from './state/data-table-state.service';
import { NovoDataTableRow } from './rows/data-table-row.component';
import { NovoDataTableHeaderRow } from './rows/data-table-header-row.component';
import { NovoDataTableCell } from './cells/data-table-cell.component';
import { NovoDataTableHeaderCell } from './cell-headers/data-table-header-cell.directive';
import { NovoDataTableExpandCell } from './cells/data-table-expand-cell.component';

describe('Elements: NovoDataTable', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTable, NovoDataTableRow, NovoDataTableHeaderRow, NovoDataTableCell, NovoDataTableHeaderCell, NovoDataTableExpandCell],
      imports: [FormsModule, NovoDropdownModule],
      providers: [NovoLabelService,
                  DataTableState,
                  ChangeDetectorRef,
                ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTable);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: trackColumnsBy()', () => {
    it('should return item.id', () => {
      const expected = 10;
      const actual = component.trackColumnsBy(2, { id: 10 });
      expect(actual).toEqual(expected);
    });
  });

  describe('Method: onSearchChange(term: string)', () => {
    it('should set state.globalSearch., state.reset, and state.updates.next', () => {
      const expected = {
        globalSearch: 'test',
        filter: 'filter',
        sort: 'sort',
      };
      component.state.globalSearch = 'notTest';
      component.state.filter = 'filter';
      component.state.sort = 'sort';
      spyOn(component.state, 'reset');
      spyOn(component.state.updates, 'next');
      component.onSearchChange('test');
      expect(component.state.globalSearch).toEqual('test');
      expect(component.state.reset).toHaveBeenCalledWith(false, true);
      expect(component.state.updates.next).toHaveBeenCalledWith(expected);
    });
  });

  describe('Method: isDisabled(check: any, row: T)', () => {
    const row = { id: 1 };
    it('should return true if check.disabled is true', () => {
      const check = { disabled: true };
      const actual = component.isDisabled(check, row);
      expect(actual).toBeTruthy();
    });
    it('should return false if check.disabled is false and there is no check.disabledFunc', () => {
      const check = { disabled: false };
      const actual = component.isDisabled(check, row);
      expect(actual).toBeFalsy();
    });
    it('should return check.disabledFunc if check.disabled is false', () => {
      const check = { disabled: false, disabledFunc: () => true };
      const actual = component.isDisabled(check, row);
      expect(actual).toBeTruthy();
    });
  });

  describe('Method: isExpanded(row: T)', () => {
    beforeEach(() => {
      spyOn(component.state.expandedRows, 'has');
    });
    it('should call expandedRows.has if row passed in', () => {
      const row = { id: 1 };
      component.rowIdentifier = 'id';
      component.isExpanded(row);
      expect(component.state.expandedRows.has).toHaveBeenCalledWith('1');
    });
    it('should return false if no row passed in', () => {
      expect(component.isExpanded()).toBeFalsy();
      expect(component.state.expandedRows.has).not.toHaveBeenCalled();
    });
  });

  describe('Method: expandRow()', () => {
    const row = { id: 1 };

    it('should call isExpanded and state.onExpandChange', () => {
      spyOn(component, 'isExpanded');
      spyOn(component.state, 'onExpandChange');
      component.expandRow(row);
      expect(component.isExpanded).toHaveBeenCalledWith(row);
      expect(component.state.onExpandChange).toHaveBeenCalled();
    });
    it('should call state.expandedRows.delete if selected', () => {
      spyOn(component.state.expandedRows, 'delete');
      spyOn(component, 'isExpanded').and.returnValue(true);
      component.expandRow(row);
      expect(component.state.expandedRows.delete).toHaveBeenCalled();
    });
    it('should call state.selectedRows.set if not selected', () => {
      spyOn(component.state.expandedRows, 'add');
      spyOn(component, 'isExpanded').and.returnValue(false);
      component.expandRow(row);
      expect(component.state.expandedRows.add).toHaveBeenCalled();
    });
  });

  describe('Method: expandRows(expand: boolean)', () => {
    beforeEach(() => {
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
    });
    it('should call expandedRows.add if selected is true', () => {
      spyOn(component.state.expandedRows, 'add');
      component.expandRows(true);
      expect(component.state.expandedRows.add).toHaveBeenCalledTimes(2);
    });
    it('should call selectedRows.delete if selected is false', () => {
      spyOn(component.state.expandedRows, 'delete');
      component.expandRows(false);
      expect(component.state.expandedRows.delete).toHaveBeenCalledTimes(2);
    });
    it('should call onExpandChange', () => {
      spyOn(component.state, 'onExpandChange');
      component.expandRows(true);
      expect(component.state.onExpandChange).toHaveBeenCalled();
    });
  });

  describe('Method: allCurrentRowsExpanded()', () => {
    beforeEach(() => {
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
    });
    it('should return false if one of the records is not selected', () => {
      spyOn(component, 'isExpanded').and.returnValue(false);
      const actual = component.allCurrentRowsExpanded();
      expect(component.isExpanded).toHaveBeenCalledTimes(1);
      expect(actual).toBeFalsy();
    });
    it('should return true if every row is selected', () => {
      spyOn(component, 'isExpanded').and.returnValue(true);
      const actual = component.allCurrentRowsExpanded();
      expect(component.isExpanded).toHaveBeenCalledTimes(2);
      expect(actual).toBeTruthy();
    });
  });

  describe('Method: isSelected(row: T)', () => {
    beforeEach(() => {
      spyOn(component.state.selectedRows, 'has');
    });
    it('should call selectedRows.has if row passed in', () => {
      const row = { id: 1 };
      component.rowIdentifier = 'id';
      component.isSelected(row);
      expect(component.state.selectedRows.has).toHaveBeenCalledWith('1');
    });
    it('should return false if no row passed in', () => {
      expect(component.isSelected()).toBeFalsy();
      expect(component.state.selectedRows.has).not.toHaveBeenCalled();
    });
  });

  describe('Method: selectRow()', () => {
    const row = { id: 1 };

    beforeEach(() => {
      spyOn(component.state.selectedRows, 'delete');
      spyOn(component.state.selectedRows, 'set');
      spyOn(component.state.selectedRows, 'clear');
      spyOn(component, 'selectRows');
    });

    it('should call isSelected, state.allMatchingSelectedSource.next, and state.onSelectionChange', () => {
      spyOn(component, 'isSelected');
      spyOn(component.state.allMatchingSelectedSource, 'next');
      spyOn(component.state, 'onSelectionChange');
      component.selectRow(row);
      expect(component.isSelected).toHaveBeenCalledWith(row);
      expect(component.state.allMatchingSelectedSource.next).toHaveBeenCalledWith(false);
      expect(component.state.onSelectionChange).toHaveBeenCalled();
    });
    it('should call state.selectedRows.delete if selected', () => {
      spyOn(component, 'isSelected').and.returnValue(true);
      component.selectRow(row);
      expect(component.state.selectedRows.delete).toHaveBeenCalled();
    });
    it('should call state.selectedRows.set if not selected', () => {
      component.canSelectAll = false;
      spyOn(component, 'isSelected').and.returnValue(false);
      component.selectRow(row);
      expect(component.state.selectedRows.set).toHaveBeenCalled();
    });
    it('should call state.selectedRows.set if not selected, and allMatchingSelected is false ', () => {
      component.canSelectAll = true;
      component.allMatchingSelected = false;
      spyOn(component, 'isSelected').and.returnValue(false);
      component.selectRow(row);
      expect(component.state.selectedRows.set).toHaveBeenCalled();
    });
    it('should call state.selectedRows.set if not selected, and no origin passed in', () => {
      component.canSelectAll = true;
      component.allMatchingSelected = true;
      spyOn(component, 'isSelected').and.returnValue(false);
      component.selectRow(row);
      expect(component.state.selectedRows.set).toHaveBeenCalled();
    });
    it('should call state.selectedRows.set if not selected, and origin that is not onClick is passed in', () => {
      component.canSelectAll = true;
      component.allMatchingSelected = true;
      spyOn(component, 'isSelected').and.returnValue(false);
      component.selectRow(row, 'onSelectionChange');
      expect(component.state.selectedRows.set).toHaveBeenCalled();
      expect(component.state.selectedRows.clear).not.toHaveBeenCalled();
      expect(component.selectRows).not.toHaveBeenCalled();
      expect(component.state.selectedRows.delete).not.toHaveBeenCalled();

    });
    it('should call clear selected rows, select the current rows, and deselect current row if origin = onClick, canSelectAll and allMatchingSelected', () => {
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
      component.canSelectAll = true;
      component.allMatchingSelected = true;
      spyOn(component, 'isSelected').and.returnValue(false);
      component.selectRow(row, 'onClick');
      expect(component.state.selectedRows.clear).toHaveBeenCalled();
      expect(component.selectRows).toHaveBeenCalledWith(true);
      expect(component.state.selectedRows.delete).toHaveBeenCalled();
    });
  });

  describe('Method: selectRows()', () => {
    beforeEach(() => {
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
    });
    it('should call selectedRows.set if selected is true', () => {
      spyOn(component.state.selectedRows, 'set');
      component.selectRows(true);
      expect(component.state.selectedRows.set).toHaveBeenCalledTimes(2);
    });
    it('should call selectedRows.delete if selected is false', () => {
      spyOn(component.state.selectedRows, 'delete');
      component.selectRows(false);
      expect(component.state.selectedRows.delete).toHaveBeenCalledTimes(2);
    });
    it('should call onSelectionChange', () => {
      spyOn(component.state, 'onSelectionChange');
      component.selectRows(true);
      expect(component.state.onSelectionChange).toHaveBeenCalled();
    });
  });

  describe('Method: allCurrentRowsSelected()', () => {
    beforeEach(() => {
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
    });
    it('should return true if allMatching selected is true', () => {
      component.allMatchingSelected = true;
      const actual = component.allCurrentRowsSelected();
      expect(actual).toBeTruthy();
    });
    it('should return false if dataSource has no data', () => {
      component.allMatchingSelected = false;
      component.dataSource = {};
      const actual = component.allCurrentRowsSelected();
      expect(actual).toBeFalsy();
    });
    it('should return false if one of the records is not selected', () => {
      spyOn(component, 'isSelected').and.returnValue(false);
      component.allMatchingSelected = false;
      const actual = component.allCurrentRowsSelected();
      expect(component.isSelected).toHaveBeenCalledTimes(1);
      expect(actual).toBeFalsy();
    });
    it('should return true if every row is selected', () => {
      spyOn(component, 'isSelected').and.returnValue(true);
      component.allMatchingSelected = false;
      const actual = component.allCurrentRowsSelected();
      expect(component.isSelected).toHaveBeenCalledTimes(2);
      expect(actual).toBeTruthy();
    });
  });
});
