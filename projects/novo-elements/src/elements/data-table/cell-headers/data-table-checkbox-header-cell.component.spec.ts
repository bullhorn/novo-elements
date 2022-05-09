// NG2
import { CdkColumnDef } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  ComponentUtils,
  NovoButtonModule,
  NovoDatePickerModule,
  NovoDropdownModule,
  NovoLabelService,
  NovoToastService,
  NovoTooltipModule,
} from '../../..';
import { NovoDataTable } from '../data-table.component';
import { NOVO_DATA_TABLE_REF } from '../data-table.token';
import { DataTableState } from '../state/data-table-state.service';
import { NovoDataTableCheckboxHeaderCell } from './data-table-checkbox-header-cell.component';

// App

describe('Elements: NovoDataTableCheckboxHeaderCell', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTableCheckboxHeaderCell],
      imports: [FormsModule, NovoTooltipModule, NovoButtonModule, NovoDropdownModule, NovoDatePickerModule],
      providers: [
        NovoLabelService,
        DataTableState,
        CdkColumnDef,
        NovoDataTable,
        ChangeDetectorRef,
        NovoToastService,
        ComponentUtils,
        { provide: NOVO_DATA_TABLE_REF, useExisting: NovoDataTable },
        {
          provide: CdkColumnDef,
          useFactory: () => {
            const columnDef = new CdkColumnDef();
            columnDef._columnCssClassName = ['test'];
            return columnDef;
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTableCheckboxHeaderCell);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: onClick(()', () => {
    beforeEach(() => {
      component.dataTable = {
        selectRows: () => {},
      };
      component.toaster = {
        alert: () => {},
      };
      spyOn(component, 'selectAllChanged');
      spyOn(component, 'resetAllMatchingSelected');
      spyOn(component.dataTable, 'selectRows');
      spyOn(component.toaster, 'alert');
    });
    it('should call dataTable.selectRows if isAtLimit is false', () => {
      component.dataTable.canSelectAll = false;
      component.onClick();
      expect(component.dataTable.selectRows).toHaveBeenCalled();
      expect(component.selectAllChanged).not.toHaveBeenCalled();
      expect(component.resetAllMatchingSelected).not.toHaveBeenCalled();
    });
    it('should call call toaster.alert isAtLimit is true', () => {
      const expected = {
        theme: 'danger',
        position: 'fixedTop',
        message: 'Error, more than 500 items are not able to be selected at one time',
        icon: 'caution',
      };
      component.maxSelected = 1;
      component.dataTable.state = {
        selectedRows: {
          size: 5,
        },
      };
      component.dataTable.dataSource = {
        data: [1, 2, 3, 4],
      };
      component.checked = false;
      component.onClick();
      expect(component.dataTable.selectRows).not.toHaveBeenCalled();
      expect(component.toaster.alert).toHaveBeenCalledWith(expected);
    });
    it('should call selectAllChanged if canSelectAll is true and this.checked is false', () => {
      component.dataTable.canSelectAll = true;
      component.checked = false;
      component.onClick();
      expect(component.selectAllChanged).toHaveBeenCalled();
      expect(component.resetAllMatchingSelected).not.toHaveBeenCalled();
    });
    it('should call resetAllMatchingSelected if canSelectAll is true and this.checked is true', () => {
      component.dataTable.canSelectAll = true;
      component.checked = true;
      component.onClick();
      expect(component.resetAllMatchingSelected).toHaveBeenCalled();
      expect(component.selectAllChanged).not.toHaveBeenCalled();
    });
  });

  describe('Method: selectAllChanged()', () => {
    it('should emit and allSelected event', () => {
      const expected = {
        allSelected: false,
        selectedCount: 3,
        allMatchingSelected: true,
      };
      component.dataTable = {
        allMatchingSelected: true,
        state: {
          selected: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
        allSelected: {
          emit: () => {},
        },
      };
      spyOn(component.dataTable.allSelected, 'emit');
      component.selectAllChanged();
      expect(component.dataTable.allSelected.emit).toHaveBeenCalledWith(expected);
    });
  });
});
