// NG2
import { ChangeDetectorRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NovoLabelService, NovoSelectModule, NovoTilesModule } from '../../..';
import { DataTableState } from '../state/data-table-state.service';
import { NovoDataTablePagination } from './data-table-pagination.component';

// App

describe('Elements: NovoDataTablePagination', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTablePagination],
      imports: [FormsModule, NovoTilesModule, NovoSelectModule],
      providers: [NovoLabelService, DataTableState, ChangeDetectorRef],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTablePagination);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: selectPage()', () => {
    beforeEach(() => {
      spyOn(component.state, 'checkRetainment');
    });
    it('should call emitPageEvent and set page', () => {
      spyOn(component, 'emitPageEvent');
      component.selectPage(1);
      expect(component.emitPageEvent).toHaveBeenCalled();
      expect(component.page).toEqual(1);
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
    });
    it('should call state.checkRetainment', () => {
      component.allMatchingSelected = true;
      component.canSelectAll = false;
      component.selectPage(1);
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
    });
    it('should call state.checkRetainment - allMatchingSelected true', () => {
      component.allMatchingSelected = true;
      component.canSelectAll = true;
      component.selectPage(1);
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', true);
    });
  });

  describe('Method: nextPage()', () => {
    beforeEach(() => {
      component.totalPages = 5;
      component.page = 1;
      spyOn(component.state, 'checkRetainment');
      spyOn(component, 'emitPageEvent');
      spyOn(component, 'getPages');
    });
    it('should return if no next page', () => {
      spyOn(component, 'hasNextPage').and.returnValue(false);
      component.nextPage();
      expect(component.hasNextPage).toHaveBeenCalled();
      expect(component.getPages).not.toHaveBeenCalled();
      expect(component.emitPageEvent).not.toHaveBeenCalled();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
      expect(component.page).toEqual(1);
    });
    it('should increment page, set pages and call emitPageEvent', () => {
      component.allMatchingSelected = true;
      component.canSelectAll = false;
      spyOn(component, 'hasNextPage').and.returnValue(true);
      component.nextPage();
      expect(component.hasNextPage).toHaveBeenCalled();
      expect(component.page).toEqual(2);
      expect(component.getPages).toHaveBeenCalledWith(2, 5);
      expect(component.emitPageEvent).toHaveBeenCalled();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
    });
    it('should call state.checkRetainment - allMatchingSelected true', () => {
      spyOn(component, 'hasNextPage').and.returnValue(true);
      component.allMatchingSelected = true;
      component.canSelectAll = true;
      component.nextPage();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', true);
    });
  });

  describe('Method: previousPage()', () => {
    beforeEach(() => {
      component.totalPages = 5;
      component.page = 1;
      spyOn(component.state, 'checkRetainment');
      spyOn(component, 'emitPageEvent');
      spyOn(component, 'getPages');
    });
    it('should return if no next page', () => {
      spyOn(component, 'hasPreviousPage').and.returnValue(false);
      component.previousPage();
      expect(component.hasPreviousPage).toHaveBeenCalled();
      expect(component.getPages).not.toHaveBeenCalled();
      expect(component.emitPageEvent).not.toHaveBeenCalled();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
      expect(component.page).toEqual(1);
    });
    it('should increment page, set pages and call emitPageEvent', () => {
      component.allMatchingSelected = false;
      component.canSelectAll = true;
      spyOn(component, 'hasPreviousPage').and.returnValue(true);
      component.previousPage();
      expect(component.hasPreviousPage).toHaveBeenCalled();
      expect(component.page).toEqual(0);
      expect(component.getPages).toHaveBeenCalledWith(0, 5);
      expect(component.emitPageEvent).toHaveBeenCalled();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', false);
    });
    it('should call state.checkRetainment - allMatchingSelected true', () => {
      spyOn(component, 'hasPreviousPage').and.returnValue(true);
      component.allMatchingSelected = true;
      component.canSelectAll = true;
      component.previousPage();
      expect(component.state.checkRetainment).toHaveBeenCalledWith('page', true);
    });
  });

  describe('Method: hasPreviousPage()', () => {
    it('should return false if pageSize is 0', () => {
      component.pageSize = 0;
      const actual = component.hasPreviousPage();
      expect(actual).toBeFalsy();
    });
    it('should return false if page is on the first page', () => {
      component.pageSize = 10;
      component.length = 20;
      component.page = 0;
      const actual = component.hasPreviousPage();
      expect(actual).toBeFalsy();
    });
    it('should return true if page is on the first page', () => {
      component.pageSize = 10;
      component.length = 40;
      component.page = 2;
      const actual = component.hasPreviousPage();
      expect(actual).toBeTruthy();
    });
  });

  describe('Method: hasNextPage()', () => {
    it('should return false if pageSize is 0', () => {
      component.pageSize = 0;
      const actual = component.hasNextPage();
      expect(actual).toBeFalsy();
    });
    it('should return false if page is not on the last page', () => {
      component.pageSize = 10;
      component.length = 20;
      component.page = 1;
      const actual = component.hasNextPage();
      expect(actual).toBeFalsy();
    });
    it('should return true if page is on the last page', () => {
      component.pageSize = 10;
      component.length = 40;
      component.page = 2;
      const actual = component.hasNextPage();
      expect(actual).toBeTruthy();
    });
  });

  describe('Method: changePageSize()', () => {
    it('should call emitPageEvent, set pageSize to passed in value and reset page number', () => {
      spyOn(component, 'emitPageEvent');
      component.changePageSize(10);
      expect(component.emitPageEvent).toHaveBeenCalledWith(true);
      expect(component.page).toEqual(0);
      expect(component.pageSize).toEqual(10);
    });
  });
});
