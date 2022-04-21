// NG2
import { async, TestBed } from '@angular/core/testing';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoDatePickerModule } from './DatePicker.module';
// App
import { NovoDatePickerInputElement } from './DatePickerInput';

describe('Elements: NovoDatePickerInputElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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
      const mockValue: String = '01/01/2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseString).toHaveBeenCalled();
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
});
