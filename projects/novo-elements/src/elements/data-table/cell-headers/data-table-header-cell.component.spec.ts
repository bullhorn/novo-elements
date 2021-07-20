// NG2
import { EventEmitter } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IMaskDirectiveModule } from 'angular-imask';
import { NovoLabelService } from '../../../services';
import { Key } from '../../../utils';
import { NovoButtonModule } from '../../button';
import { NovoDatePickerModule } from '../../date-picker/DatePicker.module';
import { NovoDropdownModule } from '../../dropdown';
import { NovoTooltipModule } from '../../tooltip/Tooltip.module';
import { IDataTableColumnFilterOption } from '../interfaces';
import { DataTableState } from '../state/data-table-state.service';
import { NovoDataTableCellHeader } from './data-table-header-cell.component';

// App

xdescribe('Elements: NovoDataTableCellHeader', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDataTableCellHeader],
      imports: [FormsModule, NovoTooltipModule, NovoButtonModule, NovoDropdownModule, NovoDatePickerModule, IMaskDirectiveModule],
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

        const optionList2 = [
          { value: 1, label: '1 Label' },
          { value: 2, label: '2 Label' },
        ];

        const result3 = component.isSelected(1, optionList2);
        expect(result3).toBe(true);
      });
      it('should return false if an option is not in the optionList', () => {
        const optionList = [1, 2, 3, 4, 5];

        const result = component.isSelected(6, optionList);
        expect(result).toBe(false);

        const result2 = component.isSelected({ value: 6, label: 'A Label' }, optionList);
        expect(result2).toBe(false);

        const optionList2 = [
          { value: 1, label: '1 Label' },
          { value: 2, label: '2 Label' },
        ];

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
        jest.spyOn(component.dropdown, 'closePanel');
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

    describe('method multiSelectOptionFilter', () => {
      it('should hide options based on their label, not value, when the options are an object array', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: { label: 'abc', value: 'def' } },
          { hidden: false, option: { label: 'def', value: 'abc' } },
        ];
        component.multiSelectOptionFilter('ab');
        expect(component.multiSelectedOptionIsHidden).toEqual([
          { hidden: false, option: { label: 'abc', value: 'def' } },
          { hidden: true, option: { label: 'def', value: 'abc' } },
        ]);
      });

      it('should hide string options when the options are a string array', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: 'abc' },
          { hidden: false, option: 'def' },
        ];
        component.multiSelectOptionFilter('ab');
        expect(component.multiSelectedOptionIsHidden).toEqual([
          { hidden: false, option: 'abc' },
          { hidden: true, option: 'def' },
        ]);
      });

      it('should not hide string options that are selected', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: 'abc' },
          { hidden: false, option: 'def' },
          { hidden: false, option: 'ghi' },
        ];
        component.multiSelectedOptions = ['def'];
        component.multiSelectOptionFilter('ab');
        expect(component.multiSelectedOptionIsHidden).toEqual([
          { hidden: false, option: 'abc' },
          { hidden: false, option: 'def' },
          { hidden: true, option: 'ghi' },
        ]);
      });
    });

    describe('method multiSelectOptionIsHidden', () => {
      it('should return hidden value for matching option when option is a string', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: 'abc' },
          { hidden: true, option: 'def' },
        ];
        expect(component.multiSelectOptionIsHidden('def')).toEqual(true);
      });

      it('should return hidden value for matching option when option is an object', () => {
        const options: IDataTableColumnFilterOption[] = [
          { label: 'abc', value: 'def' },
          { label: 'def', value: 'abc' },
        ];
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: options[0] },
          { hidden: true, option: options[1] },
        ];
        expect(component.multiSelectOptionIsHidden(options[1])).toEqual(true);
      });
    });

    describe('method multiSelectHasVisibleOptions', () => {
      it('should be true if some options are not hidden', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: false, option: 'abc' },
          { hidden: true, option: 'def' },
        ];
        expect(component.multiSelectHasVisibleOptions()).toEqual(true);
      });

      it('should be false if all options are hidden', () => {
        component.multiSelectedOptionIsHidden = [
          { hidden: true, option: 'abc' },
          { hidden: true, option: 'def' },
        ];
        expect(component.multiSelectHasVisibleOptions()).toEqual(false);
      });

      it('should be false if there are no options', () => {
        component.multiSelectedOptionIsHidden = [];
        expect(component.multiSelectHasVisibleOptions()).toEqual(false);
      });
    });

    describe('method getOptionText', () => {
      it('should return a string if option is a string', () => {
        expect(component.getOptionText('abc')).toEqual('abc');
      });

      it('should return a string if option is a boolean', () => {
        expect(component.getOptionText(true)).toEqual('true');
      });

      it('should return label if option is an object', () => {
        expect(component.getOptionText({ label: 'abc', value: true })).toEqual('abc');
      });

      it('should return value if option is an object but label is empty', () => {
        expect(component.getOptionText({ label: '', value: 123 })).toEqual('123');
      });
    });

    describe('method multiSelectOptionFilterHandleKeydown', () => {
      beforeEach(() => {
        component.dropdown = {
          panelOpen: true,
          closePanel: () => {},
        };
        component.multiSelect = true;
      });
      it('should clear filter text and close dropdown on ESC', () => {
        const event = { key: Key.Escape, stopPropagation: () => {}, preventDefault: () => {} };
        jest.spyOn(component.dropdown, 'closePanel');
        jest.spyOn(component, 'clearOptionFilter');
        component.multiSelectOptionFilterHandleKeydown(event);
        expect(component.dropdown.closePanel).toHaveBeenCalled();
        expect(component.clearOptionFilter).toHaveBeenCalled();
      });

      it('should attempt to filter on ENTER', () => {
        const event = { key: Key.Enter, stopPropagation: () => {}, preventDefault: () => {} };
        jest.spyOn(component, 'filterMultiSelect');
        component.multiSelectOptionFilterHandleKeydown(event);
        expect(component.filterMultiSelect).toHaveBeenCalled();
      });
    });

    describe('method clearOptionFilter', () => {
      it('should clear error state', () => {
        component.error = true;
        component.clearOptionFilter();
        expect(component.error).toEqual(false);
      });

      it('should clear option filter text', () => {
        component.optionFilter = 'abc';
        component.clearOptionFilter();
        expect(component.optionFilter).toEqual('');
      });
    });
  });

  describe('Method: startResize(mouseDownEvent: MouseEvent)', () => {
    let mouseDownEvent: MouseEvent;
    let mouseUpEvent: MouseEvent;

    beforeEach(() => {
      mouseDownEvent = window.document.createEvent('MouseEvents');
      mouseDownEvent.initMouseEvent('mousedown', true, true, window, 1, 50, 50, 500, 50, false, false, false, false, 0, null);
      jest.spyOn(mouseDownEvent, 'preventDefault');

      mouseUpEvent = window.document.createEvent('MouseEvents');
      mouseUpEvent.initMouseEvent('mouseup', true, true, window, 1, 50, 50, 550, 50, false, false, false, false, 0, null);
      jest.spyOn(mouseUpEvent, 'preventDefault');
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
      jest.spyOn(component.renderer, 'setStyle');
      component.startResize(mouseDownEvent);

      const mouseMoveEvent: MouseEvent = window.document.createEvent('MouseEvents');
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
