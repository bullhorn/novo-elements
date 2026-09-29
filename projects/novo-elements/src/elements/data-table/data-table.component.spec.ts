import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NovoTheme } from 'novo-elements/elements/common';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoLabelService } from 'novo-elements/services';
import { vi } from 'vitest';
import { NovoDataTable } from './data-table.component';
import { DataTableState } from './state/data-table-state.service';

describe('Elements: NovoDataTable', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTable],
      imports: [FormsModule, NovoTilesModule, NovoSelectModule],
      providers: [NovoLabelService, ChangeDetectorRef, DataTableState],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTable);
    component = fixture.debugElement.componentInstance;
  });

  describe('Method: empty()', () => {
    it('should call dataSource.totallyEmpty when overrideTotal is null', () => {
      component.overrideTotal = null;
      component.dataSource = {};
      Object.defineProperty(component.dataSource, 'totallyEmpty', {
        get: vi.fn(() => true),
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

  describe('Getter: isPaginationOnFooter', () => {
    let theme: NovoTheme;
    let previousThemeName: string;

    beforeEach(() => {
      theme = TestBed.inject(NovoTheme);
      previousThemeName = theme.themeName;
    });

    afterEach(() => {
      theme.themeName = previousThemeName;
    });

    it('should keep pagination in the header by default outside bh2026', () => {
      component.paginationOptions = { page: 0, pageSize: 10, pageSizeOptions: [10] };
      expect(component.isPaginationOnFooter).toEqual(false);
    });
    it('should move pagination to the footer by default in bh2026', () => {
      theme.themeName = 'bh2026-light';
      component.paginationOptions = { page: 0, pageSize: 10, pageSizeOptions: [10] };
      expect(component.isPaginationOnFooter).toEqual(true);
    });
    it('should respect an explicit onFooter: false in bh2026', () => {
      theme.themeName = 'bh2026-light';
      component.paginationOptions = { page: 0, pageSize: 10, pageSizeOptions: [10], onFooter: false };
      expect(component.isPaginationOnFooter).toEqual(false);
    });
    it('should respect an explicit onFooter: true outside bh2026', () => {
      component.paginationOptions = { page: 0, pageSize: 10, pageSizeOptions: [10], onFooter: true };
      expect(component.isPaginationOnFooter).toEqual(true);
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
