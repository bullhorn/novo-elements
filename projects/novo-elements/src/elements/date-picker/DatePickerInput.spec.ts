// NG2
import { async, TestBed } from '@angular/core/testing';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoDatePickerModule } from './DatePicker.module';
// App
import { NovoDatePickerInputElement } from './DatePickerInput';

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
});
