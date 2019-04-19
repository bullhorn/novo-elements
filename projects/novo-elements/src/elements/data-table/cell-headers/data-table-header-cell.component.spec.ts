// NG2
import { TestBed, async } from '@angular/core/testing';
import { NovoDataTableCellHeader } from './data-table-header-cell.component';
import { NovoButtonModule, NovoLabelService, NovoTooltipModule, NovoDropdownModule, NovoDatePickerModule } from '../../..';
import { FormsModule } from '@angular/forms';
import { DataTableState } from '../state/data-table-state.service';
import { EventEmitter } from '@angular/core';

// App

describe('Elements: NovoDataTableCellHeader', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTableCellHeader],
      imports: [FormsModule, NovoTooltipModule, NovoButtonModule, NovoDropdownModule, NovoDatePickerModule],
      providers: [NovoLabelService, DataTableState],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDataTableCellHeader);
    component = fixture.debugElement.componentInstance;
  }));

  beforeEach(() => {
    component.config = {
      filterable: true,
      sortable: true,
      resizable: true,
    };
    component._column = {
      width: 999,
    };
    component.resizable = new EventEmitter();
  });

  describe('Method: ngOnInit()', () => {
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
      expect(component.ngOnInit).toBeDefined();
    });
  });

  describe('MultiSelect Tests:', () => {
    beforeAll(() => {
      component.config.resizable = false;
    });
    describe('method isSelected()', () => {
      it('should return true if an option in the optionList', () => {
        const optionList = [1, 2, 3, 4, 5];

        const result = component.isSelected(1, optionList);
        expect(result).toBe(true);

        const result2 = component.isSelected({ value: 1, label: 'A Label' }, optionList);
        expect(result2).toBe(true);

        const optionList2 = [{ value: 1, label: '1 Label' }, { value: 2, label: '2 Label' }];

        const result3 = component.isSelected(1, optionList2);
        expect(result3).toBe(true);
      });
      it('should return false if an option is not in the optionList', () => {
        const optionList = [1, 2, 3, 4, 5];

        const result = component.isSelected(6, optionList);
        expect(result).toBe(false);

        const result2 = component.isSelected({ value: 6, label: 'A Label' }, optionList);
        expect(result2).toBe(false);

        const optionList2 = [{ value: 1, label: '1 Label' }, { value: 2, label: '2 Label' }];

        const result3 = component.isSelected(3, optionList2);
        expect(result3).toBe(false);
      });
      it('should return false if there is no optionList', () => {
        const result = component.isSelected(6, undefined);
        expect(result).toBe(false);
      });
    });

    describe('method cancel()', () => {
      beforeEach(() => {
        component.dropdown = {
          closePanel: () => {},
        };
        spyOn(component.dropdown, 'closePanel');
      });
      it('should reset multiSelectOptions', () => {
        component.filter = [1, 2];
        component.multiSelectedOptions = [2, 3, 4];
        component.cancel();
        expect(component.multiSelectedOptions).toEqual(component.filter);

        component.filter = undefined;
        component.multiSelectedOptions = [2, 3, 4];
        component.cancel();
        expect(component.multiSelectedOptions).toEqual([]);
      });

      it('should call closePanel()', () => {
        component.filter = [1, 2];
        component.multiSelectedOptions = [2, 3, 4];
        component.cancel();
        expect(component.dropdown.closePanel).toHaveBeenCalled();
      });
    });

    describe('method toggleSelection()', () => {
      it('should add an item to the multiSelectedOptions if not already in', () => {
        component.multiSelectedOptions = [1, 2, 3, 4, 5];
        component.toggleSelection(6);
        expect(component.multiSelectedOptions).toContain(6);

        component.toggleSelection({ value: 7 });
        expect(component.multiSelectedOptions).toContain(7);
      });

      it('should remove an item from the multiSelectedOptions if already there', () => {
        component.multiSelectedOptions = [1, 2, 3, 4, 5];
        component.toggleSelection(2);
        expect(component.multiSelectedOptions).not.toContain(2);

        component.toggleSelection({ value: 5 });
        expect(component.multiSelectedOptions).not.toContain(5);
      });
    });
  });

  describe('Method: startResize(mouseDownEvent: MouseEvent)', () => {
    let mouseDownEvent: MouseEvent;
    let mouseUpEvent: MouseEvent;

    beforeEach(() => {
      mouseDownEvent = window.document.createEvent('MouseEvents');
      mouseDownEvent.initMouseEvent('mousedown', true, true, window, 1, 50, 50, 500, 50, false, false, false, false, 0, null);
      spyOn(mouseDownEvent, 'preventDefault');

      mouseUpEvent = window.document.createEvent('MouseEvents');
      mouseUpEvent.initMouseEvent('mouseup', true, true, window, 1, 50, 50, 550, 50, false, false, false, false, 0, null);
      spyOn(mouseUpEvent, 'preventDefault');
      component.elementRef = {
        nativeElement: {
          getBoundingClientRect: () => {
            return {
              width: 120,
            };
          },
        },
      };
    });

    it('should stop from dispatching the event', () => {
      component.startResize(mouseDownEvent);
      expect(mouseDownEvent.preventDefault).toHaveBeenCalled();
    });

    it('should add subscriptions to global list', () => {
      component.startResize(mouseDownEvent);
      expect(component.subscriptions.length).toEqual(2);
    });

    it('should change the width when moving mouse', async () => {
      spyOn(component.renderer, 'setStyle');
      component.startResize(mouseDownEvent);

      let mouseMoveEvent: MouseEvent = window.document.createEvent('MouseEvents');
      mouseMoveEvent.initMouseEvent('mousemove', true, true, window, 1, 50, 50, 550, 50, false, false, false, false, 0, null);
      window.document.dispatchEvent(mouseMoveEvent);

      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'min-width', '170px');
      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'width', '170px');
      expect(component.renderer.setStyle).toHaveBeenCalledWith(component.elementRef.nativeElement, 'max-width', '170px');
      expect(component._column.width).toEqual(170);
      window.document.dispatchEvent(mouseUpEvent);
    });
  });
});
