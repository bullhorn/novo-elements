import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import { DateUtil, Helpers } from 'novo-elements/utils';
import { NovoTimePickerElement } from './TimePicker';

jest.mock('novo-elements/services');
jest.mock('novo-elements/utils');

describe('NovoTimePickerElement', () => {
  let component: NovoTimePickerElement;
  let elementRef: jest.Mocked<ElementRef>;
  let labels: jest.Mocked<NovoLabelService>;
  let cdr: jest.Mocked<ChangeDetectorRef>;

  beforeEach(() => {
    elementRef = {
      nativeElement: document.createElement('div'),
    } as any;

    labels = {
      cancel: 'Cancel',
      save: 'Save',
      timeFormatPM: 'PM',
    } as any;

    cdr = {
      markForCheck: jest.fn(),
    } as any;

    component = new NovoTimePickerElement(elementRef, labels, cdr);
  });

  describe('constructor', () => {
    it('should create component instance', () => {
      expect(component).toBeDefined();
    });

    it('should initialize military as false', () => {
      expect(component.military).toBe(false);
    });

    it('should initialize analog as false', () => {
      expect(component.analog).toBe(false);
    });

    it('should initialize inline as false', () => {
      expect(component.inline).toBe(false);
    });

    it('should initialize step as 1', () => {
      expect(component.step).toBe(1);
    });

    it('should initialize hasButtons as false', () => {
      expect(component.hasButtons).toBe(false);
    });

    it('should initialize saveDisabled as false', () => {
      expect(component.saveDisabled).toBe(false);
    });

    it('should initialize hours as 12', () => {
      expect(component.hours).toBe(12);
    });

    it('should initialize minutes as 0', () => {
      expect(component.minutes).toBe(0);
    });

    it('should initialize value as null', () => {
      expect(component.value).toBeNull();
    });

    it('should initialize MERIDIANS array', () => {
      expect(component.MERIDIANS).toEqual(['am', 'pm']);
    });

    it('should initialize MINUTES array', () => {
      expect(component.MINUTES).toEqual(['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00']);
    });

    it('should initialize HOURS array', () => {
      expect(component.HOURS).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
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

    it('should have onSave EventEmitter', () => {
      expect(component.onSave).toBeDefined();
      expect(typeof component.onSave.next).toBe('function');
    });

    it('should have onCancel EventEmitter', () => {
      expect(component.onCancel).toBeDefined();
      expect(typeof component.onCancel.next).toBe('function');
    });
  });

  describe('ngOnInit', () => {
    it('should call ngOnChanges', () => {
      const ngOnChangesSpy = jest.spyOn(component, 'ngOnChanges');
      component.ngOnInit();
      expect(ngOnChangesSpy).toHaveBeenCalled();
      ngOnChangesSpy.mockRestore();
    });

    describe('military mode', () => {
      it('should add military hours when military is true', () => {
        component.military = true;
        component.ngOnInit();
        expect(component.HOURS).toContain('0');
        expect(component.HOURS).toContain('13');
        expect(component.HOURS).toContain('23');
      });

      it('should have 24 hours in military mode', () => {
        component.military = true;
        component.ngOnInit();
        expect(component.HOURS.length).toBe(24);
      });

      it('should not add military hours when military is false', () => {
        component.military = false;
        component.ngOnInit();
        expect(component.HOURS).not.toContain('0');
        expect(component.HOURS).not.toContain('13');
      });
    });

    describe('analog mode minutes', () => {
      it('should generate minutes based on step when not analog', () => {
        component.analog = false;
        component.step = 5;
        component.ngOnInit();
        expect(component.MINUTES).toContain('00');
        expect(component.MINUTES).toContain('05');
        expect(component.MINUTES).toContain('10');
      });

      it('should generate minutes with step 1', () => {
        component.analog = false;
        component.step = 1;
        component.ngOnInit();
        expect(component.MINUTES.length).toBe(60);
      });

      it('should generate minutes with step 15', () => {
        component.analog = false;
        component.step = 15;
        component.ngOnInit();
        expect(component.MINUTES).toContain('00');
        expect(component.MINUTES).toContain('15');
        expect(component.MINUTES).toContain('30');
        expect(component.MINUTES).toContain('45');
      });

      it('should not modify minutes when analog is true', () => {
        component.analog = true;
        const originalMinutes = [...component.MINUTES];
        component.ngOnInit();
        expect(component.MINUTES).toEqual(originalMinutes);
      });

      it('should pad minutes with leading zeros', () => {
        component.analog = false;
        component.step = 1;
        component.ngOnInit();
        expect(component.MINUTES[0]).toBe('00');
        expect(component.MINUTES[1]).toBe('01');
        expect(component.MINUTES[9]).toBe('09');
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should call init with model when model exists', () => {
      const initSpy = jest.spyOn(component, 'init');
      component.model = new Date('2023-01-15 14:30:00');
      component.ngOnChanges();
      expect(initSpy).toHaveBeenCalledWith(component.model, false);
      initSpy.mockRestore();
    });

    it('should call init with current date when model does not exist', () => {
      const initSpy = jest.spyOn(component, 'init');
      component.model = null;
      component.ngOnChanges();
      expect(initSpy).toHaveBeenCalled();
      expect(component.selected).toBeNull();
      initSpy.mockRestore();
    });

    it('should set selected to null when model does not exist', () => {
      component.model = null;
      component.ngOnChanges();
      expect(component.selected).toBeNull();
    });
  });

  describe('init', () => {
    beforeEach(() => {
      jest.spyOn(component, 'setHours');
      jest.spyOn(component, 'setMinutes');
      jest.spyOn(component, 'checkBetween');
    });

    describe('12-hour format', () => {
      beforeEach(() => {
        component.military = false;
      });

      it('should set meridian to am for morning hours', () => {
        const date = new Date('2023-01-15 09:30:00');
        component.init(date, false);
        expect(component.meridian).toBe('am');
      });

      it('should set meridian to pm for afternoon hours', () => {
        const date = new Date('2023-01-15 14:30:00');
        component.init(date, false);
        expect(component.meridian).toBe('pm');
      });

      it('should set meridian to pm for 12:00 PM', () => {
        const date = new Date('2023-01-15 12:00:00');
        component.init(date, false);
        expect(component.meridian).toBe('pm');
      });

      it('should set meridian to am for 12:00 AM', () => {
        const date = new Date('2023-01-15 00:00:00');
        component.init(date, false);
        expect(component.meridian).toBe('am');
      });

      it('should convert 24-hour to 12-hour format', () => {
        const date = new Date('2023-01-15 14:30:00');
        component.init(date, false);
        expect(component.hours).toBe(2);
      });

      it('should handle midnight correctly', () => {
        const date = new Date('2023-01-15 00:30:00');
        component.init(date, false);
        expect(component.hours).toBe(12);
      });

      it('should handle noon correctly', () => {
        const date = new Date('2023-01-15 12:30:00');
        component.init(date, false);
        expect(component.hours).toBe(12);
      });
    });

    describe('24-hour format', () => {
      beforeEach(() => {
        component.military = true;
      });

      it('should not set meridian in military mode', () => {
        const date = new Date('2023-01-15 14:30:00');
        component.init(date, false);
        expect(component.meridian).toBeUndefined();
      });

      it('should use 24-hour format hours', () => {
        const date = new Date('2023-01-15 14:30:00');
        component.init(date, false);
        expect(component.hours).toBe(14);
      });

      it('should handle midnight in military mode', () => {
        const date = new Date('2023-01-15 00:30:00');
        component.init(date, false);
        expect(component.hours).toBe(0);
      });
    });

    describe('minutes handling', () => {
      it('should pad minutes with leading zero', () => {
        const date = new Date('2023-01-15 14:05:00');
        component.init(date, false);
        expect(component.minutes).toBe('05');
      });

      it('should not pad minutes if already two digits', () => {
        const date = new Date('2023-01-15 14:30:00');
        component.init(date, false);
        expect(component.minutes).toBe(30);
      });

      it('should handle zero minutes', () => {
        const date = new Date('2023-01-15 14:00:00');
        component.init(date, false);
        expect(component.minutes).toBe('00');
      });
    });

    it('should call setHours with dispatch parameter', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.init(date, false);
      expect(component.setHours).toHaveBeenCalledWith(null, expect.any(Number), false);
    });

    it('should call setMinutes with dispatch parameter', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.init(date, false);
      expect(component.setMinutes).toHaveBeenCalledWith(null, expect.any(Number), false);
    });

    it('should call checkBetween with minutes', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.init(date, false);
      expect(component.checkBetween).toHaveBeenCalled();
    });
  });

  describe('checkBetween', () => {
    beforeEach(() => {
      component.MINUTES = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '00'];
    });

    it('should set inBetween to false for valid minute', () => {
      component.checkBetween('15');
      expect(component.inBetween).toBe(false);
    });

    it('should set inBetween to true for invalid minute', () => {
      component.checkBetween('12');
      expect(component.inBetween).toBe(true);
    });

    it('should set inBetween to false for first minute', () => {
      component.checkBetween('05');
      expect(component.inBetween).toBe(false);
    });

    it('should set inBetween to false for last minute', () => {
      component.checkBetween('00');
      expect(component.inBetween).toBe(false);
    });

    it('should handle string numbers', () => {
      component.checkBetween('30');
      expect(component.inBetween).toBe(false);
    });

    it('should handle numeric values', () => {
      component.checkBetween(30 as any);
      expect(component.inBetween).toBe(false);
    });
  });

  describe('setValue', () => {
    it('should parse and set hours, minutes, and meridian', () => {
      const event = new Event('click');
      jest.spyOn(Helpers, 'swallowEvent');
      jest.spyOn(component, 'dispatchChange');

      component.setValue(event, '02:30 pm');

      expect(component.hours).toBe('02');
      expect(component.minutes).toBe('30');
      expect(component.meridian).toBe('pm');
      expect(component.selected).toBe('02:30 pm');
    });

    it('should call swallowEvent', () => {
      const event = new Event('click');
      jest.spyOn(Helpers, 'swallowEvent');
      component.setValue(event, '02:30 pm');
      expect(Helpers.swallowEvent).toHaveBeenCalledWith(event);
    });

    it('should call dispatchChange', () => {
      const event = new Event('click');
      jest.spyOn(component, 'dispatchChange');
      component.setValue(event, '02:30 pm');
      expect(component.dispatchChange).toHaveBeenCalled();
    });

    it('should handle different time formats', () => {
      const event = new Event('click');
      component.setValue(event, '11:45 am');
      expect(component.hours).toBe('11');
      expect(component.minutes).toBe('45');
      expect(component.meridian).toBe('am');
    });
  });

  describe('setHours', () => {
    beforeEach(() => {
      jest.spyOn(component, 'dispatchChange').mockImplementation(()=> {});
    });
    it('should set hours property', () => {
      component.setHours(null, 5, false);
      expect(component.hours).toBe(5);
    });

    it('should set hoursClass property', () => {
      component.setHours(null, 5, false);
      expect(component.hoursClass).toBe('hour-5');
    });

    it('should set activeHour property', () => {
      component.setHours(null, 5, false);
      expect(component.activeHour).toBe(5);
    });

    it('should call swallowEvent', () => {
      const event = new Event('click');
      jest.spyOn(Helpers, 'swallowEvent');
      component.setHours(event, 5, false);
      expect(Helpers.swallowEvent).toHaveBeenCalledWith(event);
    });

    it('should call dispatchChange when dispatch is true', () => {
      component.setHours(null, 5, true);
      expect(component.dispatchChange).toHaveBeenCalled();
    });

    it('should not call dispatchChange when dispatch is false', () => {
      component.setHours(null, 5, false);
      expect(component.dispatchChange).not.toHaveBeenCalled();
    });

    it('should handle string hours', () => {
      component.setHours(null, '5' as any, false);
      expect(component.hours).toBe('5');
    });

    it('should handle hour 12', () => {
      component.setHours(null, 12, false);
      expect(component.hours).toBe(12);
      expect(component.hoursClass).toBe('hour-12');
    });

    it('should handle hour 1', () => {
      component.setHours(null, 1, false);
      expect(component.hours).toBe(1);
      expect(component.hoursClass).toBe('hour-1');
    });
  });

  describe('setMinutes', () => {
    beforeEach(() => {
      jest.spyOn(component, 'dispatchChange').mockImplementation(()=> {});
    });

    it('should set minutes property', () => {
      component.setMinutes(null, 30, false);
      expect(component.minutes).toBe(30);
    });

    it('should set minutesClass property', () => {
      component.setMinutes(null, 30, false);
      expect(component.minutesClass).toBe('min-30');
    });

    it('should set activeMinute property', () => {
      component.setMinutes(null, 30, false);
      expect(component.activeMinute).toBe(30);
    });

    it('should call checkBetween', () => {
      jest.spyOn(component, 'checkBetween');
      component.setMinutes(null, 30, false);
      expect(component.checkBetween).toHaveBeenCalledWith(30);
    });

    it('should call swallowEvent', () => {
      const event = new Event('click');
      jest.spyOn(Helpers, 'swallowEvent');
      component.setMinutes(event, 30, false);
      expect(Helpers.swallowEvent).toHaveBeenCalledWith(event);
    });

    it('should call dispatchChange when dispatch is true', () => {
      component.setMinutes(null, 30, true);
      expect(component.dispatchChange).toHaveBeenCalled();
    });

    it('should not call dispatchChange when dispatch is false', () => {
      component.setMinutes(null, 30, false);
      expect(component.dispatchChange).not.toHaveBeenCalled();
    });

    it('should handle string minutes', () => {
      component.setMinutes(null, '30' as any, false);
      expect(component.minutes).toBe('30');
    });

    it('should handle minute 0', () => {
      component.setMinutes(null, 0, false);
      expect(component.minutes).toBe(0);
      expect(component.minutesClass).toBe('min-0');
    });

    it('should handle minute 59', () => {
      component.setMinutes(null, 59, false);
      expect(component.minutes).toBe(59);
      expect(component.minutesClass).toBe('min-59');
    });
  });

  describe('setPeriod', () => {
    it('should set meridian property', () => {
      component.setPeriod(null, 'pm', false);
      expect(component.meridian).toBe('pm');
    });

    it('should call swallowEvent', () => {
      const event = new Event('click');
      jest.spyOn(Helpers, 'swallowEvent');
      component.setPeriod(event, 'pm', false);
      expect(Helpers.swallowEvent).toHaveBeenCalledWith(event);
    });

    it('should call dispatchChange when dispatch is true', () => {
      jest.spyOn(component, 'dispatchChange');
      component.setPeriod(null, 'pm', true);
      expect(component.dispatchChange).toHaveBeenCalled();
    });

    it('should not call dispatchChange when dispatch is false', () => {
      jest.spyOn(component, 'dispatchChange');
      component.setPeriod(null, 'pm', false);
      expect(component.dispatchChange).not.toHaveBeenCalled();
    });

    it('should handle am period', () => {
      component.setPeriod(null, 'am', false);
      expect(component.meridian).toBe('am');
    });

    it('should handle pm period', () => {
      component.setPeriod(null, 'pm', false);
      expect(component.meridian).toBe('pm');
    });
  });

  describe('dispatchChange', () => {
    beforeEach(() => {
      component.hours = 2;
      component.minutes = 30;
      component.meridian = 'pm';
      jest.spyOn(component.onSelect, 'next');
      component._onChange = jest.fn();
    });

    describe('12-hour format', () => {
      beforeEach(() => {
        component.military = false;
      });

      it('should convert pm hours correctly', () => {
        component.dispatchChange();
        expect(component._onChange).toHaveBeenCalledWith(expect.any(Date));
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(14);
      });

      it('should convert am hours correctly', () => {
        component.meridian = 'am';
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(2);
      });

      it('should handle 12 pm correctly', () => {
        component.hours = 12;
        component.meridian = 'pm';
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(12);
      });

      it('should handle 12 am correctly', () => {
        component.hours = 12;
        component.meridian = 'am';
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(0);
      });

      it('should handle 1 am correctly', () => {
        component.hours = 1;
        component.meridian = 'am';
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(1);
      });

      it('should handle 1 pm correctly', () => {
        component.hours = 1;
        component.meridian = 'pm';
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(13);
      });
    });

    describe('24-hour format', () => {
      beforeEach(() => {
        component.military = true;
      });

      it('should use hours directly in military mode', () => {
        component.hours = 14;
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(14);
      });

      it('should handle midnight in military mode', () => {
        component.hours = 0;
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(0);
      });

      it('should handle 23:00 in military mode', () => {
        component.hours = 23;
        component.dispatchChange();
        const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
        expect(callArg.getHours()).toBe(23);
      });
    });

    it('should set minutes correctly', () => {
      component.dispatchChange();
      const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
      expect(callArg.getMinutes()).toBe(30);
    });

    it('should set seconds to 0', () => {
      component.dispatchChange();
      const callArg = (component._onChange as jest.Mock).mock.calls[0][0];
      expect(callArg.getSeconds()).toBe(0);
    });

    it('should set value property', () => {
      component.dispatchChange();
      expect(component.value).toBe('2:30 pm');
    });

    it('should emit onSelect event', () => {
      component.dispatchChange();
      expect(component.onSelect.next).toHaveBeenCalledWith(
        expect.objectContaining({
          hours: expect.any(Number),
          minutes: expect.any(Number),
          meridian: expect.any(String),
          date: expect.any(Date),
          text: expect.any(String),
        })
      );
    });

    it('should call _onChange callback', () => {
      component.dispatchChange();
      expect(component._onChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('should include correct data in onSelect event', () => {
      component.dispatchChange();
      const eventData = (component.onSelect.next as jest.Mock).mock.calls[0][0];
      expect(eventData.hours).toBe(14);
      expect(eventData.minutes).toBe(30);
      expect(eventData.meridian).toBe('pm');
      expect(eventData.text).toBe('2:30 pm');
    });
  });

  describe('writeValue (ControlValueAccessor)', () => {
    it('should set model property', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.writeValue(date);
      expect(component.model).toBe(date);
    });

    it('should call init when value is a Date', () => {
      const initSpy = jest.spyOn(component, 'init');
      const date = new Date('2023-01-15 14:30:00');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(true);
      component.writeValue(date);
      expect(initSpy).toHaveBeenCalledWith(date, false);
      initSpy.mockRestore();
    });

    it('should handle string time in 12-hour format', () => {
      const initSpy = jest.spyOn(component, 'init');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(false);
      jest.spyOn(Helpers, 'isString').mockReturnValue(true);
      jest.spyOn(DateUtil, 'parse').mockReturnValue(new Date('2023-01-15 14:30:00'));
      jest.spyOn(DateUtil, 'format').mockReturnValue('2023-01-15');
      component.military = false;
      component.writeValue('02:30 pm');
      expect(initSpy).toHaveBeenCalled();
      initSpy.mockRestore();
    });

    it('should handle string time in 24-hour format', () => {
      const initSpy = jest.spyOn(component, 'init');
      jest.spyOn(Helpers, 'isDate').mockReturnValue(false);
      jest.spyOn(Helpers, 'isString').mockReturnValue(true);
      jest.spyOn(DateUtil, 'parse').mockReturnValue(new Date('2023-01-15 14:30:00'));
      jest.spyOn(DateUtil, 'format').mockReturnValue('2023-01-15');
      component.military = true;
      component.writeValue('14:30');
      expect(initSpy).toHaveBeenCalled();
      initSpy.mockRestore();
    });

    it('should handle null value', () => {
      component.military = true;
      component.writeValue(null);
      expect(component.model).toBeNull();
    });

    it('should handle undefined value', () => {
      component.military = true;
      component.writeValue(undefined);
      expect(component.model).toBeUndefined();
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

  describe('convertTime12to24', () => {
    beforeEach(() => {
      labels.timeFormatPM = 'PM';
    });

    it('should convert 12:30 am to 00:30', () => {
      const result = component.convertTime12to24('12:30 am');
      expect(result).toBe('00:30');
    });

    it('should convert 01:30 am to 01:30', () => {
      const result = component.convertTime12to24('01:30 am');
      expect(result).toBe('01:30');
    });

    it('should convert 11:30 am to 11:30', () => {
      const result = component.convertTime12to24('11:30 am');
      expect(result).toBe('11:30');
    });

    it('should convert 12:30 pm to 12:30', () => {
      const result = component.convertTime12to24('12:30 PM');
      expect(result).toBe('12:30');
    });

    it('should convert 01:30 pm to 13:30', () => {
      const result = component.convertTime12to24('01:30 PM');
      expect(result).toBe('13:30');
    });

    it('should convert 11:30 pm to 23:30', () => {
      const result = component.convertTime12to24('11:30 PM');
      expect(result).toBe('23:30');
    });

    it('should handle uppercase PM', () => {
      const result = component.convertTime12to24('02:30 PM');
      expect(result).toBe('14:30');
    });

    it('should handle custom PM format', () => {
      labels.timeFormatPM = 'P.M.';
      const result = component.convertTime12to24('02:30 P.M.');
      expect(result).toBe('14:30');
    });

    it('should pad hours with leading zero', () => {
      const result = component.convertTime12to24('01:30 PM');
      expect(result).toBe('13:30');
    });

    it('should handle edge case 12:00 am', () => {
      const result = component.convertTime12to24('12:00 am');
      expect(result).toBe('00:00');
    });

    it('should handle edge case 12:00 pm', () => {
      const result = component.convertTime12to24('12:00 PM');
      expect(result).toBe('12:00');
    });
  });

  describe('save', () => {
    it('should emit onSave event', () => {
      jest.spyOn(component.onSave, 'emit');
      component.save();
      expect(component.onSave.emit).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should emit onCancel event', () => {
      jest.spyOn(component.onCancel, 'emit');
      component.cancel();
      expect(component.onCancel.emit).toHaveBeenCalled();
    });
  });

  describe('flatten', () => {
    it('should flatten array of arrays', () => {
      const result = component.flatten([[1, 2], [3, 4]]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle empty array', () => {
      const result = component.flatten([]);
      expect(result).toEqual([]);
    });

    it('should handle single array', () => {
      const result = component.flatten([[1, 2, 3]]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle nested empty arrays', () => {
      const result = component.flatten([[], [], []]);
      expect(result).toEqual([]);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete workflow: init, set time, dispatch change', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.military = false;
      component.ngOnInit();
      component.init(date, false);

      expect(component.hours).toBe(2);
      expect(component.minutes).toBe(30);
      expect(component.meridian).toBe('pm');

      jest.spyOn(component.onSelect, 'next');
      component.dispatchChange();

      expect(component.onSelect.next).toHaveBeenCalledWith(
        expect.objectContaining({
          hours: 14,
          minutes: 30,
          meridian: 'pm',
        })
      );
    });

    it('should handle military mode workflow', () => {
      const date = new Date('2023-01-15 14:30:00');
      component.military = true;
      component.ngOnInit();
      component.init(date, false);

      expect(component.hours).toBe(14);
      expect(component.minutes).toBe(30);
      expect(component.HOURS.length).toBe(24);
    });

    it('should handle analog mode with custom step', () => {
      component.analog = false;
      component.step = 15;
      component.ngOnInit();

      expect(component.MINUTES).toContain('00');
      expect(component.MINUTES).toContain('15');
      expect(component.MINUTES).toContain('30');
      expect(component.MINUTES).toContain('45');
    });

    it('should handle time picker with disabled save button', () => {
      component.hasButtons = true;
      component.saveDisabled = true;

      expect(component.saveDisabled).toBe(true);
    });

    it('should handle user interaction: click hours, minutes, period', () => {
      component.military = false;
      component.ngOnInit();

      jest.spyOn(component, 'dispatchChange');

      component.setHours(null, 3, true);
      expect(component.dispatchChange).toHaveBeenCalled();

      component.setMinutes(null, 45, true);
      expect(component.dispatchChange).toHaveBeenCalledTimes(2);

      component.setPeriod(null, 'pm', true);
      expect(component.dispatchChange).toHaveBeenCalledTimes(3);
    });

    it('should handle time conversion from 12-hour to 24-hour', () => {
      component.military = false;
      component.ngOnInit();

      jest.spyOn(Helpers, 'isDate').mockReturnValue(false);
      jest.spyOn(Helpers, 'isString').mockReturnValue(true);
      jest.spyOn(DateUtil, 'parse').mockReturnValue(new Date('2023-01-15 14:30:00'));
      jest.spyOn(DateUtil, 'format').mockReturnValue('2023-01-15');

      component.writeValue('02:30 pm');

      expect(component.model).toBeDefined();
    });

    it('should handle multiple time changes', () => {
      component.military = false;
      component.ngOnInit();

      component.setHours(null, 9, false);
      component.setMinutes(null, 15, false);
      component.setPeriod(null, 'am', false);

      expect(component.hours).toBe(9);
      expect(component.minutes).toBe(15);
      expect(component.meridian).toBe('am');

      component.setHours(null, 5, false);
      component.setMinutes(null, 45, false);
      component.setPeriod(null, 'pm', false);

      expect(component.hours).toBe(5);
      expect(component.minutes).toBe(45);
      expect(component.meridian).toBe('pm');
    });

    it('should handle edge case times', () => {
      component.military = false;
      component.ngOnInit();

      // Test midnight
      const midnightDate = new Date('2023-01-15 00:00:00');
      component.init(midnightDate, false);
      expect(component.hours).toBe(12);
      expect(component.meridian).toBe('am');

      // Test noon
      const noonDate = new Date('2023-01-15 12:00:00');
      component.init(noonDate, false);
      expect(component.hours).toBe(12);
      expect(component.meridian).toBe('pm');
    });
  });

  describe('EventEmitters', () => {
    it('should have onSelect EventEmitter that emits correct data', () => {
      const listener = jest.fn();
      component.onSelect.subscribe(listener);

      component.hours = 2;
      component.minutes = 30;
      component.meridian = 'pm';
      component.dispatchChange();

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          hours: 14,
          minutes: 30,
          meridian: 'pm',
          date: expect.any(Date),
          text: expect.any(String),
        })
      );
    });

    it('should have onSave EventEmitter', () => {
      const listener = jest.fn();
      component.onSave.subscribe(listener);

      component.save();

      expect(listener).toHaveBeenCalled();
    });

    it('should have onCancel EventEmitter', () => {
      const listener = jest.fn();
      component.onCancel.subscribe(listener);

      component.cancel();

      expect(listener).toHaveBeenCalled();
    });
  });

  describe('Input Properties', () => {
    it('should accept military input', () => {
      component.military = true;
      expect(component.military).toBe(true);
    });

    it('should accept analog input', () => {
      component.analog = true;
      expect(component.analog).toBe(true);
    });

    it('should accept inline input', () => {
      component.inline = true;
      expect(component.inline).toBe(true);
    });

    it('should accept step input', () => {
      component.step = 15;
      expect(component.step).toBe(15);
    });

    it('should accept hasButtons input', () => {
      component.hasButtons = true;
      expect(component.hasButtons).toBe(true);
    });

    it('should accept saveDisabled input', () => {
      component.saveDisabled = true;
      expect(component.saveDisabled).toBe(true);
    });
  });
});
