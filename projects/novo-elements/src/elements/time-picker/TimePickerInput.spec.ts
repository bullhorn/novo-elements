// NG2
import { TestBed } from '@angular/core/testing';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
// App
import { Helpers } from 'novo-elements/utils';
import { NovoTimePickerModule } from './TimePicker.module';
import { NovoTimePickerInputElement } from './TimePickerInput';

describe('Elements: NovoTimePickerInputElement', () => {
  let fixture;
  let component: NovoTimePickerInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, DateFormatService],
      imports: [NovoTimePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTimePickerInputElement);
    component = fixture.debugElement.componentInstance;
  });

  describe('setDisabledState()', () => {
    it('should set disabled to true', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });

    it('should set disabled to false', () => {
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });

    it('should toggle disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
      
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('hasValue getter', () => {
    it('should return true when value is set', () => {
      component.value = new Date('2023-01-15 14:30:00');
      jest.spyOn(Helpers, 'isEmpty').mockReturnValue(false);

      expect(component.hasValue).toBe(true);
    });

    it('should return false when value is empty', () => {
      component.value = null;
      jest.spyOn(Helpers, 'isEmpty').mockReturnValue(true);

      expect(component.hasValue).toBe(false);
    });

    it('should return false when value is undefined', () => {
      component.value = undefined;
      jest.spyOn(Helpers, 'isEmpty').mockReturnValue(true);

      expect(component.hasValue).toBe(false);
    });
  });

  describe('hourOneFormatRequired', () => {
    it('should return true for h1 format', () => {
      expect(component.hourOneFormatRequired('h1')).toBe(true);
    });

    it('should return true for 1h format', () => {
      expect(component.hourOneFormatRequired('1h')).toBe(true);
    });

    it('should return false for 02 format', () => {
      expect(component.hourOneFormatRequired('02')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(component.hourOneFormatRequired('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(component.hourOneFormatRequired(null as any)).toBe(false);
    });
  });

  describe('EventEmitters', () => {
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
});
