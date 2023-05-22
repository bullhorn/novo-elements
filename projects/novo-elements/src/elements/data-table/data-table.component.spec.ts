// NG2
import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {DataTableSource, NovoDataTable, NovoLabelService, NovoSelectModule, NovoTilesModule} from '../../..';
import { DataTableState } from './state/data-table-state.service';

// App

describe('Elements: NovoDataTable', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTable],
      imports: [FormsModule, NovoTilesModule, NovoSelectModule],
      providers: [NovoLabelService, ChangeDetectorRef, DataTableState],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTable);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: empty()', () => {
    it('should call dataSource.totallyEmpty when overrideTotal is null', () => {
      component.overrideTotal = null;
      component.dataSource = {};
      Object.defineProperty(component.dataSource, 'totallyEmpty', {
        get: jest.fn(() => true)
      });
      const result = component.empty;
      expect(result).toEqual(true);
    });
    it('should return true when overrideTotal is set to 0', () => {
      component.overrideTotal = 0;
      const result = component.empty;
      expect(result).toEqual(true);
    });
    it('should return false when overrideTotal is set to 99', () => {
      component.overrideTotal = 99;
      const result = component.empty;
      expect(result).toEqual(false);
    });
  });

  describe('Method: useOverrideTotal()', () => {
    it('should return false when overrideTotal is null', () => {
      component.overrideTotal = null;
      const result = component.useOverrideTotal;
      expect(result).toEqual(false);
    });
    it('should return false when overrideTotal is undefined', () => {
      component.overrideTotal = undefined;
      const result = component.useOverrideTotal;
      expect(result).toEqual(false);
    });
    it('should return true when overrideTotal is 0', () => {
      component.overrideTotal = 0;
      const result = component.useOverrideTotal;
      expect(result).toEqual(true);
    });
    it('should return true when overrideTotal is 1', () => {
      component.overrideTotal = 1;
      const result = component.useOverrideTotal;
      expect(result).toEqual(true);
    });
  });
});
