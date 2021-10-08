// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoDatePickerModule } from './DatePicker.module';
import { DateFormatService } from '../../services/date-format/DateFormat';

xdescribe('Elements: NovoDatePickerInputElement', () => {
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
      spyOn(component.dateFormatService, 'parseString').and.callThrough();
      spyOn(component, 'dispatchOnChange');
      const mockValue: String = '01/01/2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });
  });

  describe('Method: _setTriggerValue()', () => {
    beforeEach(() => {
      spyOn(component, '_setFormValue');
    });
    it('should set formattedValue to empty string if value is null', () => {
      component._setTriggerValue(null);
      expect(component._setFormValue).toHaveBeenCalled();
      expect(component.formattedValue).toEqual('');
    });
    it('should set formattedValue to empty string if value is undefined', () => {
      component._setTriggerValue(undefined);
      expect(component._setFormValue).toHaveBeenCalled();
      expect(component.formattedValue).toEqual('');
    });
  });
});
