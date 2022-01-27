import { TestBed, async } from '@angular/core/testing';
import { NovoDataTable } from './data-table.component';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NovoLabelService } from '../..';
import { DataTableState } from './state/data-table-state.service';


describe('Elements: NovoDataTable', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTable],
      imports: [FormsModule],
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
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
      const actual = component.allCurrentRowsSelected();
      expect(component.isSelected).toHaveBeenCalledTimes(1);
      expect(actual).toBeFalsy();
    });
    it('should return true if every row is selected', () => {
      spyOn(component, 'isSelected').and.returnValue(true);
      component.allMatchingSelected = false;
      component.dataSource = {
        data: [{ id: 1 }, { id: 2 }],
      };
      const actual = component.allCurrentRowsSelected();
      expect(component.isSelected).toHaveBeenCalledTimes(2);
      expect(actual).toBeTruthy();
    });
  });
});
