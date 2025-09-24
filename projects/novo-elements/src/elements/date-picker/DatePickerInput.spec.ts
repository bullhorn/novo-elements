// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
// App
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
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
      jest.spyOn(component.dateFormatService, 'parseString');
      jest.spyOn(component, 'dispatchOnChange');
      const mockValue = '01/01/2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });

    it('should call parseCustomDateString from the dateFormatService when a dateFormat is added, and then dispatchOnChange.', () => {
      component.format = 'MMM DD dddd, YYYY';
      jest.spyOn(component.dateFormatService, 'parseCustomDateString');
      jest.spyOn(component, 'dispatchOnChange');
      const mockValue = 'Jan 1 Wed, 2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseCustomDateString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });
  });

  describe('Method: _setTriggerValue()', () => {
    beforeEach(() => {
      jest.spyOn(component, '_setFormValue');
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
      spyOn(component, 'clearValue');
      spyOn(component, 'closePanel');
      component.handleMaskAccept('');
      expect(component.clearValue).toHaveBeenCalled();
      expect(component.closePanel).toHaveBeenCalled();

      component.hasButtons = true;
      component.closePanel.calls.reset();

      component.handleMaskAccept('');
      expect(component.closePanel).not.toHaveBeenCalled();
    })
  });
});
