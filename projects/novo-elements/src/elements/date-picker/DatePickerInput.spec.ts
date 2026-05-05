// NG2
import { TestBed, waitForAsync } from '@angular/core/testing';
// App
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { vi } from 'vitest';
import { NovoDatePickerModule } from './DatePicker.module';
import { NovoDatePickerInputElement } from './DatePickerInput';

describe('Elements: NovoDatePickerInputElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [
      //     NovoDatePickerInputElement
      // ],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, DateFormatService],
      imports: [NovoDatePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDatePickerInputElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: formatDate()', () => {
    it('should call parseString from the dateFormatService and then dispatchOnChange.', () => {
      vi.spyOn(component.dateFormatService, 'parseString');
      vi.spyOn(component, 'dispatchOnChange');
      const mockValue = '01/01/2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });

    it('should call parseCustomDateString from the dateFormatService when a dateFormat is added, and then dispatchOnChange.', () => {
      component.format = 'MMM DD dddd, YYYY';
      vi.spyOn(component.dateFormatService, 'parseCustomDateString');
      vi.spyOn(component, 'dispatchOnChange');
      const mockValue = 'Jan 1 Wed, 2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseCustomDateString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });
  });

  describe('Method: _setTriggerValue()', () => {
    beforeEach(() => {
      vi.spyOn(component, '_setFormValue');
    });
    it('should set formattedValue to empty string if value is null', () => {
      component._setTriggerValue(null);
      expect(component._setFormValue).toHaveBeenCalled();
      expect(component.formattedValue).toEqual('');
    });
    it('should set formattedValue to empty string if value changed back to undefined', () => {
      const now = new Date();
      component._setTriggerValue(now);
      component._setTriggerValue(undefined);
      expect(component._setFormValue).toHaveBeenCalled();
      expect(component.formattedValue).toEqual('');
    });
  });

  describe('Method: handleMaskAccept', () => {
    it('should call clearValue when the mask has been reduced to empty', () => {
      vi.spyOn(component, 'clearValue').mockImplementation(() => {});
      const closePanelSpy = vi.spyOn(component, 'closePanel').mockImplementation(() => {});
      component.handleMaskAccept('');
      expect(component.clearValue).toHaveBeenCalled();
      expect(component.closePanel).toHaveBeenCalled();

      component.hasButtons = true;
      closePanelSpy.mockClear();

      component.handleMaskAccept('');
      expect(component.closePanel).not.toHaveBeenCalled();
    });
  });
});
