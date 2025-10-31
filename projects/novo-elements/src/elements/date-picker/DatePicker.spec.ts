import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isDate, isValid, subDays } from 'date-fns';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoDatePickerElement } from './DatePicker';

jest.mock('date-fns');
jest.mock('novo-elements/services');
jest.mock('novo-elements/utils');

describe('NovoDatePickerElement', () => {
  let component: NovoDatePickerElement;
  let labels: jest.Mocked<NovoLabelService>;
  let element: jest.Mocked<ElementRef>;
  let cdr: jest.Mocked<ChangeDetectorRef>;
  let sanitizer: jest.Mocked<DomSanitizer>;

  beforeEach(() => {
    labels = {
      formatDateWithFormat: jest.fn((date, format) => '01/15/2023'),
      today: 'Today',
    } as any;

    element = {
      nativeElement: document.createElement('div'),
    } as any;

    cdr = {
      markForCheck: jest.fn(),
    } as any;

    sanitizer = {
      bypassSecurityTrustHtml: jest.fn(),
    } as any;

    component = new NovoDatePickerElement(labels, element, cdr, sanitizer);
  });

  describe('constructor', () => {
    it('should create component instance', () => {
      expect(component).toBeDefined();
    });

    it('should initialize _mode as single', () => {
      expect(component._mode).toBe('single');
    });

    it('should initialize _numberOfMonths as [0]', () => {
      expect(component._numberOfMonths).toEqual([0]);
    });

    it('should initialize _selection as empty array', () => {
      expect(component._selection).toEqual([]);
    });

    it('should initialize preview as empty array', () => {
      expect(component.preview).toEqual([]);
    });

    it('should initialize rangeSelectMode as startDate', () => {
      expect(component.rangeSelectMode).toBe('startDate');
    });

    it('should initialize _onChange as empty function', () => {
      expect(typeof component._onChange).toBe('function');
    });

    it('should initialize _onTouched as empty function', () => {
      expect(typeof component._onTouched).toBe('function');
    });

    it('should have onSelect EventEmitter', () => {
      expect(component.onSelect).toBeDefined();
      expect(typeof component.onSelect.next).toBe('function');
    });

    it('should have labels property', () => {
      expect(component.labels).toBe(labels);
    });
  });

  describe('Input Properties', () => {
    describe('minYear', () => {
      it('should accept minYear as string', () => {
        component.minYear = '2020';
        expect(component.minYear).toBe('2020');
      });

      it('should accept minYear as number', () => {
        component.minYear = 2020;
        expect(component.minYear).toBe(2020);
      });
    });

    describe('maxYear', () => {
      it('should accept maxYear as string', () => {
        component.maxYear = '2030';
        expect(component.maxYear).toBe('2030');
      });

      it('should accept maxYear as number', () => {
        component.maxYear = 2030;
        expect(component.maxYear).toBe(2030);
      });
    });

    describe('start and end dates', () => {
      it('should accept start date', () => {
        const date = new Date('2023-01-01');
        component.start = date;
        expect(component.start).toBe(date);
      });

      it('should accept end date', () => {
        const date = new Date('2023-12-31');
        component.end = date;
        expect(component.end).toBe(date);
      });
    });

    describe('inline', () => {
      it('should accept inline as true', () => {
        component.inline = true;
        expect(component.inline).toBe(true);
      });

      it('should accept inline as false', () => {
        component.inline = false;
        expect(component.inline).toBe(false);
      });
    });

    describe('weekStart', () => {
      it('should accept weekStart as 0 (Sunday)', () => {
        component.weekStart = 0;
        expect(component.weekStart).toBe(0);
      });

      it('should accept weekStart as 1 (Monday)', () => {
        component.weekStart = 1;
        expect(component.weekStart).toBe(1);
      });

      it('should have default weekStart as 0', () => {
        expect(component.weekStart).toBe(0);
      });
    });

    describe('preselected', () => {
      it('should accept preselected dates', () => {
        const dates = [new Date('2023-01-01'), new Date('2023-01-02')];
        component.preselected = dates;
        expect(component.preselected).toEqual(dates);
      });

      it('should have default preselected as empty array', () => {
        expect(component.preselected).toEqual([]);
      });
    });

    describe('hideOverflowDays', () => {
      it('should accept hideOverflowDays as true', () => {
        component.hideOverflowDays = true;
        expect(component.hideOverflowDays).toBe(true);
      });

      it('should accept hideOverflowDays as false', () => {
        component.hideOverflowDays = false;
        expect(component.hideOverflowDays).toBe(false);
      });

      it('should have default hideOverflowDays as false', () => {
        expect(component.hideOverflowDays).toBe(false);
      });
    });

    describe('hideFooter', () => {
      it('should accept hideFooter as true', () => {
        component.hideFooter = true;
        expect(component.hideFooter).toBe(true);
      });

      it('should accept hideFooter as false', () => {
        component.hideFooter = false;
        expect(component.hideFooter).toBe(false);
      });

      it('should have default hideFooter as false', () => {
        expect(component.hideFooter).toBe(false);
      });
    });

    describe('hideToday', () => {
      it('should accept hideToday as true', () => {
        component.hideToday = true;
        expect(component.hideToday).toBe(true);
      });

      it('should accept hideToday as false', () => {
        component.hideToday = false;
        expect(component.hideToday).toBe(false);
      });

      it('should have default hideToday as false', () => {
        expect(component.hideToday).toBe(false);
      });
    });

    describe('disabledDateMessage', () => {
      it('should accept disabledDateMessage', () => {
        component.disabledDateMessage = 'This date is disabled';
        expect(component.disabledDateMessage).toBe('This date is disabled');
      });
    });

    describe('dateForInitialView', () => {
      it('should accept dateForInitialView', () => {
        const date = new Date('2023-06-15');
        component.dateForInitialView = date;
        expect(component.dateForInitialView).toBe(date);
      });
    });
  });

  describe('numberOfMonths getter/setter', () => {
    it('should return numberOfMonths length', () => {
      component._numberOfMonths = [0, 1, 2];
      expect(component.numberOfMonths).toBe(3);
    });

    it('should set numberOfMonths by creating array', () => {
      component.numberOfMonths = 2;
      expect(component._numberOfMonths.length).toBe(2);
    });

    it('should handle numberOfMonths as string', () => {
      component.numberOfMonths = '3' as any;
      expect(component._numberOfMonths.length).toBe(3);
    });

    it('should default to 1 month', () => {
      expect(component.numberOfMonths).toBe(1);
    });
  });

  describe('mode getter/setter', () => {
    it('should return current mode', () => {
      component._mode = 'single';
      expect(component.mode).toBe('single');
    });

    it('should set mode to single', () => {
      component.mode = 'single';
      expect(component._mode).toBe('single');
    });

    it('should set mode to multiple', () => {
      component.mode = 'multiple';
      expect(component._mode).toBe('multiple');
    });

    it('should set mode to range', () => {
      component.mode = 'range';
      expect(component._mode).toBe('range');
    });

    it('should set mode to week', () => {
      component.mode = 'week';
      expect(component._mode).toBe('week');
    });

    it('should not update if mode is same', () => {
      component._mode = 'single';
      component.mode = 'single';
      expect(component._mode).toBe('single');
    });
  });

  describe('range getter/setter (deprecated)', () => {
    it('should return true when mode is range', () => {
      component._mode = 'range';
      expect(component.range).toBe(true);
    });

    it('should return true when mode is week', () => {
      component._mode = 'week';
      expect(component.range).toBe(true);
    });

    it('should return false when mode is single', () => {
      component._mode = 'single';
      expect(component.range).toBeFalsy();
    });

    it('should set mode to range when range is true', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.range = true;
      expect(component._mode).toBe('range');
      consoleSpy.mockRestore();
    });

    it('should log deprecation warning', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.range = true;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('deprecated')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('weekRangeSelect getter/setter (deprecated)', () => {
    it('should return true when mode is week', () => {
      component._mode = 'week';
      expect(component.weekRangeSelect).toBe(true);
    });

    it('should return false when mode is not week', () => {
      component._mode = 'single';
      expect(component.weekRangeSelect).toBeFalsy();
    });

    it('should set mode to week when weekRangeSelect is true', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.weekRangeSelect = true;
      expect(component._mode).toBe('week');
      consoleSpy.mockRestore();
    });

    it('should log deprecation warning', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.weekRangeSelect = true;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('deprecated')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('selection getter/setter', () => {
    it('should return _selection', () => {
      const dates = [new Date('2023-01-15')];
      component._selection = dates;
      expect(component.selection).toEqual(dates);
    });

    it('should filter out non-date values', () => {
      (isDate as jest.Mock).mockImplementation((val) => val instanceof Date);
      const dates = [new Date('2023-01-15'), null, new Date('2023-01-16')];
      component.selection = dates as any;
      expect(component._selection.length).toBe(2);
    });

    it('should call DateUtil.startOfDay on each date', () => {
      (isDate as jest.Mock).mockReturnValue(true);
      (DateUtil.startOfDay as jest.Mock).mockImplementation((d) => d);
      const dates = [new Date('2023-01-15')];
      component.selection = dates;
      expect(DateUtil.startOfDay).toHaveBeenCalled();
    });

    it('should handle null value', () => {
      component.selection = null;
      expect(component._selection).toEqual([]);
    });

    it('should handle undefined value', () => {
      component.selection = undefined;
      expect(component._selection).toEqual([]);
    });
  });

  describe('ngOnInit', () => {
    it('should call modelToSelection if model exists', () => {
      const modelToSelectionSpy = jest.spyOn(component, 'modelToSelection');
      component.model = new Date('2023-01-15');
      component.ngOnInit();
      expect(modelToSelectionSpy).toHaveBeenCalledWith(component.model);
      modelToSelectionSpy.mockRestore();
    });

    it('should call updateView with dateForInitialView if provided', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      const date = new Date('2023-06-15');
      component.dateForInitialView = date;
      component.ngOnInit();
      expect(updateViewSpy).toHaveBeenCalledWith(date);
      updateViewSpy.mockRestore();
    });

    it('should call updateView with first selection if no dateForInitialView', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      const date = new Date('2023-01-15');
      component._selection = [date];
      component.ngOnInit();
      expect(updateViewSpy).toHaveBeenCalledWith(date);
      updateViewSpy.mockRestore();
    });

    it('should not call updateView if no initial date available', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component.model = null;
      component.dateForInitialView = undefined;
      component._selection = [];
      component.ngOnInit();
      expect(updateViewSpy).not.toHaveBeenCalled();
      updateViewSpy.mockRestore();
    });
  });

  describe('updateView', () => {
    it('should set activeDate to provided date', () => {
      const date = new Date('2023-01-15');
      component.updateView(date);
      expect(component.activeDate).toEqual(new Date(date));
    });

    it('should set activeDate to current date if no date provided', () => {
      const beforeCall = new Date();
      component.updateView(null);
      const afterCall = new Date();
      expect(component.activeDate.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(component.activeDate.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });

    it('should create new Date instance', () => {
      const date = new Date('2023-01-15');
      component.updateView(date);
      expect(component.activeDate).not.toBe(date);
      expect(component.activeDate.getTime()).toBe(date.getTime());
    });
  });

  describe('updateSelection', () => {
    beforeEach(() => {
      labels.formatDateWithFormat.mockReturnValue('Jan 15, 2023');
      jest.spyOn(component.onSelect, 'next');
      component._onChange = jest.fn();
    });

    describe('single mode', () => {
      beforeEach(() => {
        component._mode = 'single';
      });

      it('should set selection', () => {
        const dates = [new Date('2023-01-15')];
        component.updateSelection(dates);
        expect(component.selection).toEqual(dates);
      });

      it('should call fireSelect', () => {
        const fireSelectSpy = jest.spyOn(component, 'fireSelect');
        component.updateSelection([new Date('2023-01-15')]);
        expect(fireSelectSpy).toHaveBeenCalled();
        fireSelectSpy.mockRestore();
      });

      it('should call _onChange with selected date', () => {
        component.updateSelection([new Date('2023-01-15')]);
        expect(component._onChange).toHaveBeenCalledWith(component.selection[0]);
      });

      it('should set model to selected date', () => {
        const date = new Date('2023-01-15');
        component.updateSelection([date]);
        expect(component.model).toBe(date);
      });

      it('should call markForCheck', () => {
        component.updateSelection([new Date('2023-01-15')]);
        expect(cdr.markForCheck).toHaveBeenCalled();
      });
    });

    describe('multiple mode', () => {
      beforeEach(() => {
        component._mode = 'multiple';
      });

      it('should call fireSelect', () => {
        const fireSelectSpy = jest.spyOn(component, 'fireSelect');
        component.updateSelection([new Date('2023-01-15'), new Date('2023-01-16')]);
        expect(fireSelectSpy).toHaveBeenCalled();
        fireSelectSpy.mockRestore();
      });

      it('should call _onChange with selection array', () => {
        const dates = [new Date('2023-01-15'), new Date('2023-01-16')];
        component.updateSelection(dates);
        expect(component._onChange).toHaveBeenCalledWith(component.selection);
      });

      it('should set model to selection array', () => {
        const dates = [new Date('2023-01-15'), new Date('2023-01-16')];
        component.updateSelection(dates);
        expect(component.model).toEqual(dates);
      });
    });

    describe('range mode', () => {
      beforeEach(() => {
        component._mode = 'range';
      });

      it('should call fireRangeSelect when both dates selected', () => {
        const fireRangeSelectSpy = jest.spyOn(component, 'fireRangeSelect');
        component.updateSelection([new Date('2023-01-15'), new Date('2023-01-20')]);
        expect(fireRangeSelectSpy).toHaveBeenCalled();
        fireRangeSelectSpy.mockRestore();
      });

      it('should not call fireRangeSelect when only one date selected', () => {
        const fireRangeSelectSpy = jest.spyOn(component, 'fireRangeSelect');
        component.updateSelection([new Date('2023-01-15')]);
        expect(fireRangeSelectSpy).not.toHaveBeenCalled();
        fireRangeSelectSpy.mockRestore();
      });

      it('should call _onChange with range object', () => {
        component.updateSelection([new Date('2023-01-15'), new Date('2023-01-20')]);
        expect(component._onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            startDate: expect.any(Date),
            endDate: expect.any(Date),
          })
        );
      });

      it('should set model to range object', () => {
        const startDate = new Date('2023-01-15');
        const endDate = new Date('2023-01-20');
        component.updateSelection([startDate, endDate]);
        expect(component.model).toEqual({
          startDate,
          endDate,
        });
      });
    });

    describe('week mode', () => {
      beforeEach(() => {
        component._mode = 'week';
      });

      it('should call fireRangeSelect when both dates selected', () => {
        const fireRangeSelectSpy = jest.spyOn(component, 'fireRangeSelect');
        component.updateSelection([new Date('2023-01-15'), new Date('2023-01-20')]);
        expect(fireRangeSelectSpy).toHaveBeenCalled();
        fireRangeSelectSpy.mockRestore();
      });

      it('should format date labels', () => {
        component.updateSelection([new Date('2023-01-15'), new Date('2023-01-20')]);
        expect(labels.formatDateWithFormat).toHaveBeenCalled();
      });
    });

    it('should not fire events when fireEvents is false', () => {
      const fireSelectSpy = jest.spyOn(component, 'fireSelect');
      component._mode = 'single';
      component.updateSelection([new Date('2023-01-15')], false);
      expect(fireSelectSpy).not.toHaveBeenCalled();
      fireSelectSpy.mockRestore();
    });
  });

  describe('eventData', () => {
    it('should return event data object', () => {
      labels.formatDateWithFormat.mockImplementation((date, format) => {
        if (format.month === 'long') return 'January';
        if (format.weekday === 'long') return 'Sunday';
        return '15';
      });

      const date = new Date('2023-01-15');
      const result = component.eventData(date);

      expect(result).toEqual({
        year: 2023,
        month: 'January',
        day: 'Sunday',
        date,
      });
    });

    it('should include year', () => {
      const date = new Date('2023-01-15');
      const result = component.eventData(date);
      expect(result.year).toBe(2023);
    });

    it('should include month', () => {
      labels.formatDateWithFormat.mockReturnValue('January');
      const date = new Date('2023-01-15');
      const result = component.eventData(date);
      expect(result.month).toBeDefined();
    });

    it('should include day', () => {
      labels.formatDateWithFormat.mockReturnValue('Sunday');
      const date = new Date('2023-01-15');
      const result = component.eventData(date);
      expect(result.day).toBeDefined();
    });

    it('should include date', () => {
      const date = new Date('2023-01-15');
      const result = component.eventData(date);
      expect(result.date).toBe(date);
    });
  });

  describe('fireSelect', () => {
    beforeEach(() => {
      jest.spyOn(component.onSelect, 'next');
    });

    it('should emit onSelect for single mode', () => {
      component._mode = 'single';
      component._selection = [new Date('2023-01-15')];
      component.fireSelect();
      expect(component.onSelect.next).toHaveBeenCalledWith(
        expect.objectContaining({
          year: expect.any(Number),
          month: expect.any(String),
          day: expect.any(String),
          date: expect.any(Date),
        })
      );
    });

    it('should emit onSelect for multiple mode', () => {
      component._mode = 'multiple';
      component._selection = [new Date('2023-01-15'), new Date('2023-01-16')];
      component.fireSelect();
      expect(component.onSelect.next).toHaveBeenCalledWith(component.selection);
    });

    it('should emit eventData for single date', () => {
      component._mode = 'single';
      const date = new Date('2023-01-15');
      component._selection = [date];
      component.fireSelect();
      expect(component.onSelect.next).toHaveBeenCalled();
    });
  });

  describe('fireRangeSelect', () => {
    beforeEach(() => {
      jest.spyOn(component.onSelect, 'next');
    });

    it('should emit onSelect with startDate and endDate', () => {
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-20');
      component._selection = [startDate, endDate];
      component.fireRangeSelect();
      expect(component.onSelect.next).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: expect.any(Object),
          endDate: expect.any(Object),
        })
      );
    });

    it('should not emit if only one date selected', () => {
      component._selection = [new Date('2023-01-15')];
      component.fireRangeSelect();
      expect(component.onSelect.next).not.toHaveBeenCalled();
    });

    it('should not emit if no dates selected', () => {
      component._selection = [];
      component.fireRangeSelect();
      expect(component.onSelect.next).not.toHaveBeenCalled();
    });

    it('should include eventData for both dates', () => {
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-20');
      component._selection = [startDate, endDate];
      component.fireRangeSelect();
      const emittedData = (component.onSelect.next as jest.Mock).mock.calls[0][0];
      expect(emittedData.startDate).toHaveProperty('year');
      expect(emittedData.startDate).toHaveProperty('month');
      expect(emittedData.startDate).toHaveProperty('day');
      expect(emittedData.endDate).toHaveProperty('year');
      expect(emittedData.endDate).toHaveProperty('month');
      expect(emittedData.endDate).toHaveProperty('day');
    });
  });

  describe('setToday', () => {
    it('should set selection to today', () => {
      const updateSelectionSpy = jest.spyOn(component, 'updateSelection');
      component.setToday();
      expect(updateSelectionSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Date)])
      );
      updateSelectionSpy.mockRestore();
    });

    it('should call updateView with today', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component.setToday();
      expect(updateViewSpy).toHaveBeenCalledWith(expect.any(Date));
      updateViewSpy.mockRestore();
    });

    it('should select current date', () => {
      const beforeCall = new Date();
      component.setToday();
      const afterCall = new Date();
      const selectedDate = component.selection[0];
      expect(selectedDate.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(selectedDate.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });
  });

  describe('toggleRangeSelect', () => {
    it('should set rangeSelectMode to startDate', () => {
      component.toggleRangeSelect('startDate');
      expect(component.rangeSelectMode).toBe('startDate');
    });

    it('should set rangeSelectMode to endDate', () => {
      component.toggleRangeSelect('endDate');
      expect(component.rangeSelectMode).toBe('endDate');
    });

    it('should call updateView with startDate when toggling to startDate', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component._selection = [new Date('2023-01-15'), new Date('2023-01-20')];
      component.toggleRangeSelect('startDate');
      expect(updateViewSpy).toHaveBeenCalledWith(component._selection[0]);
      updateViewSpy.mockRestore();
    });

    it('should call updateView with endDate when toggling to endDate', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component._selection = [new Date('2023-01-15'), new Date('2023-01-20')];
      component.toggleRangeSelect('endDate');
      expect(updateViewSpy).toHaveBeenCalledWith(component._selection[1]);
      updateViewSpy.mockRestore();
    });

    it('should not call updateView if selection is empty', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component._selection = [];
      component.toggleRangeSelect('startDate');
      expect(updateViewSpy).not.toHaveBeenCalled();
      updateViewSpy.mockRestore();
    });

    it('should not call updateView for endDate if only one date selected', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      component._selection = [new Date('2023-01-15')];
      component.toggleRangeSelect('endDate');
      expect(updateViewSpy).not.toHaveBeenCalled();
      updateViewSpy.mockRestore();
    });
  });

  describe('modelToSelection', () => {
    describe('single mode', () => {
      beforeEach(() => {
        component._mode = 'single';
      });

      it('should set selection to single date', () => {
        const date = new Date('2023-01-15');
        component.modelToSelection(date);
        expect(component.selection).toEqual([date]);
      });
    });

    describe('multiple mode', () => {
      beforeEach(() => {
        component._mode = 'multiple';
      });

      it('should set selection to array of dates', () => {
        const dates = [new Date('2023-01-15'), new Date('2023-01-16')];
        component.modelToSelection(dates);
        expect(component.selection).toEqual(dates);
      });
    });

    describe('range mode', () => {
      beforeEach(() => {
        component._mode = 'range';
      });

      it('should call setRangeSelection', () => {
        const setRangeSelectionSpy = jest.spyOn(component, 'setRangeSelection');
        component.modelToSelection({} as any);
        expect(setRangeSelectionSpy).toHaveBeenCalled();
        setRangeSelectionSpy.mockRestore();
      });
    });

    describe('week mode', () => {
      beforeEach(() => {
        component._mode = 'week';
      });

      it('should call setRangeSelection', () => {
        const setRangeSelectionSpy = jest.spyOn(component, 'setRangeSelection');
        component.modelToSelection({} as any);
        expect(setRangeSelectionSpy).toHaveBeenCalled();
        setRangeSelectionSpy.mockRestore();
      });
    });
  });

  describe('writeValue (ControlValueAccessor)', () => {
    it('should set model property', () => {
      const date = new Date('2023-01-15');
      component.writeValue(date);
      expect(component.model).toBe(date);
    });

    it('should call modelToSelection for Date', () => {
      const modelToSelectionSpy = jest.spyOn(component, 'modelToSelection');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(true);
      const date = new Date('2023-01-15');
      component.writeValue(date);
      expect(modelToSelectionSpy).toHaveBeenCalledWith(date);
      modelToSelectionSpy.mockRestore();
    });

    it('should call updateView for Date', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(true);
      const date = new Date('2023-01-15');
      component.writeValue(date);
      expect(updateViewSpy).toHaveBeenCalledWith(date);
      updateViewSpy.mockRestore();
    });

    it('should handle string date', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(false);
      jest.spyOn(Helpers, 'isString').mockReturnValue(true);
      jest.spyOn(DateUtil, 'parse').mockReturnValue(new Date('2023-01-15'));
      (isValid as jest.Mock).mockReturnValue(true);
      component.writeValue('2023-01-15' as any);
      expect(updateViewSpy).toHaveBeenCalled();
      updateViewSpy.mockRestore();
    });

    it('should handle invalid string date', () => {
      const updateViewSpy = jest.spyOn(component, 'updateView');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(false);
      jest.spyOn(Helpers, 'isString').mockReturnValue(true);
      jest.spyOn(DateUtil, 'parse').mockReturnValue(new Date('invalid'));
      (isValid as jest.Mock).mockReturnValue(false);
      component.writeValue('invalid-date' as any);
      expect(updateViewSpy).not.toHaveBeenCalled();
      updateViewSpy.mockRestore();
    });

    it('should handle null value', () => {
      component.writeValue(null);
      expect(component.model).toBeNull();
    });

    it('should handle undefined value', () => {
      component.writeValue(undefined);
      expect(component.model).toBeUndefined();
    });

    it('should handle multiple mode with array', () => {
      component._mode = 'multiple';
      const dates = [new Date('2023-01-15'), new Date('2023-01-16')];
      component.writeValue(dates);
      expect(component.selection).toEqual(dates);
    });

    it('should handle range mode with object', () => {
      component._mode = 'range';
      const range = {
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-01-20'),
      };
      component.writeValue(range);
      expect(component.model).toBe(range);
    });
  });

  describe('setRangeSelection', () => {
    it('should handle RangeModel with startDate and endDate', () => {
      const range = {
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-01-20'),
      };
      component.model = range;
      component.setRangeSelection();
      expect(component.selection).toEqual([range.startDate, range.endDate]);
    });

    it('should filter out falsy values', () => {
      const range = {
        startDate: new Date('2023-01-15'),
        endDate: null,
      };
      component.model = range;
      component.setRangeSelection();
      expect(component.selection).toEqual([range.startDate]);
    });

    it('should handle DataTableRangeModel with min and max', () => {
      (subDays as jest.Mock).mockReturnValue(new Date('2023-01-19'));
      const range = {
        min: new Date('2023-01-15'),
        max: new Date('2023-01-20'),
      };
      component.model = range;
      component.setRangeSelection();
      expect(subDays).toHaveBeenCalledWith(range.max, 1);
    });

    it('should handle model without startDate or min', () => {
      component.model = {} as any;
      component.setRangeSelection();
      expect(component.selection).toEqual([]);
    });

    it('should handle null model', () => {
      component.model = null;
      component.setRangeSelection();
      expect(component.selection).toEqual([]);
    });
  });

  describe('registerOnChange', () => {
    it('should register onChange callback', () => {
      const callback = jest.fn();
      component.registerOnChange(callback);
      expect(component._onChange).toBe(callback);
    });

    it('should allow calling registered callback', () => {
      const callback = jest.fn();
      component.registerOnChange(callback);
      const date = new Date();
      component._onChange(date);
      expect(callback).toHaveBeenCalledWith(date);
    });
  });

  describe('registerOnTouched', () => {
    it('should register onTouched callback', () => {
      const callback = jest.fn();
      component.registerOnTouched(callback);
      expect(component._onTouched).toBe(callback);
    });

    it('should allow calling registered callback', () => {
      const callback = jest.fn();
      component.registerOnTouched(callback);
      component._onTouched();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete single date selection workflow', () => {
      component._mode = 'single';
      const date = new Date('2023-01-15');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(true);
      component.writeValue(date);
      expect(component.model).toBe(date);
      expect(component.selection).toContain(date);
    });

    it('should handle complete range selection workflow', () => {
      component._mode = 'range';
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-20');
      component.updateSelection([startDate, endDate]);
      expect(component.model).toEqual({
        startDate,
        endDate,
      });
    });

    it('should handle multiple date selection workflow', () => {
      component._mode = 'multiple';
      const dates = [
        new Date('2023-01-15'),
        new Date('2023-01-16'),
        new Date('2023-01-17'),
      ];
      component.updateSelection(dates);
      expect(component.model).toEqual(dates);
    });

    it('should handle week selection workflow', () => {
      component._mode = 'week';
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-21');
      component.updateSelection([startDate, endDate]);
      expect(component.rangeSelectMode).toBe('startDate');
    });

    it('should handle toggling between start and end date in range mode', () => {
      component._mode = 'range';
      const startDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-20');
      component._selection = [startDate, endDate];

      component.toggleRangeSelect('startDate');
      expect(component.rangeSelectMode).toBe('startDate');

      component.toggleRangeSelect('endDate');
      expect(component.rangeSelectMode).toBe('endDate');
    });

    it('should handle today button click', () => {
      component._mode = 'single';
      jest.spyOn(component.onSelect, 'next');
      component.setToday();
      expect(component.onSelect.next).toHaveBeenCalled();
    });

    it('should handle value accessor workflow', () => {
      const onChange = jest.fn();
      const onTouched = jest.fn();
      component.registerOnChange(onChange);
      component.registerOnTouched(onTouched);

      const date = new Date('2023-01-15');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(true);
      component.writeValue(date);
      component.updateSelection([date]);

      expect(onChange).toHaveBeenCalledWith(date);
    });

    it('should handle multiple month display', () => {
      component.numberOfMonths = 3;
      expect(component.numberOfMonths).toBe(3);
      expect(component._numberOfMonths.length).toBe(3);
    });

    it('should handle date range with min and max constraints', () => {
      const minDate = new Date('2023-01-01');
      const maxDate = new Date('2023-12-31');
      component.start = minDate;
      component.end = maxDate;

      const selectedDate = new Date('2023-06-15');
      component.updateSelection([selectedDate]);

      expect(component.start).toBe(minDate);
      expect(component.end).toBe(maxDate);
    });

    it('should handle preselected dates', () => {
      const preselected = [
        new Date('2023-01-15'),
        new Date('2023-01-20'),
      ];
      component.preselected = preselected;
      expect(component.preselected).toEqual(preselected);
    });

    it('should handle deprecated range property', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.range = true;
      expect(component._mode).toBe('range');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle deprecated weekRangeSelect property', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      component.weekRangeSelect = true;
      expect(component._mode).toBe('week');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle selection with null dates', () => {
      (isDate as jest.Mock).mockImplementation((val) => val instanceof Date);
      component.selection = [new Date('2023-01-15'), null, new Date('2023-01-16')] as any;
      expect(component._selection.length).toBe(2);
    });

    it('should handle empty selection array', () => {
      component.selection = [];
      expect(component._selection).toEqual([]);
    });

    it('should handle selection with duplicate dates', () => {
      const date = new Date('2023-01-15');
      component.selection = [date, date];
      expect(component._selection.length).toBe(2);
    });

    it('should handle range selection with same start and end date', () => {
      const date = new Date('2023-01-15');
      component._mode = 'range';
      component.updateSelection([date, date]);
      expect(component.model).toEqual({
        startDate: date,
        endDate: date,
      });
    });

    it('should handle very large date range', () => {
      const startDate = new Date('2000-01-01');
      const endDate = new Date('2099-12-31');
      component._mode = 'range';
      component.updateSelection([startDate, endDate]);
      expect(component.model).toEqual({
        startDate,
        endDate,
      });
    });

    it('should handle leap year dates', () => {
      const leapYearDate = new Date('2020-02-29');
      component._mode = 'single';
      component.updateSelection([leapYearDate]);
      expect(component.model).toBe(leapYearDate);
    });

    it('should handle year boundaries', () => {
      const newYearsEve = new Date('2023-12-31');
      const newYearsDay = new Date('2024-01-01');
      component._mode = 'range';
      component.updateSelection([newYearsEve, newYearsDay]);
      expect(component.model).toEqual({
        startDate: newYearsEve,
        endDate: newYearsDay,
      });
    });
  });

  describe('EventEmitters', () => {
    it('should emit onSelect for single date selection', () => {
      const listener = jest.fn();
      component.onSelect.subscribe(listener);
      component._mode = 'single';
      component._selection = [new Date('2023-01-15')];
      component.fireSelect();
      expect(listener).toHaveBeenCalled();
    });

    it('should emit onSelect for range selection', () => {
      const listener = jest.fn();
      component.onSelect.subscribe(listener);
      component._selection = [new Date('2023-01-15'), new Date('2023-01-20')];
      component.fireRangeSelect();
      expect(listener).toHaveBeenCalled();
    });

    it('should emit onSelect for multiple selection', () => {
      const listener = jest.fn();
      component.onSelect.subscribe(listener);
      component._mode = 'multiple';
      component._selection = [
        new Date('2023-01-15'),
        new Date('2023-01-16'),
      ];
      component.fireSelect();
      expect(listener).toHaveBeenCalled();
    });
  });
});
