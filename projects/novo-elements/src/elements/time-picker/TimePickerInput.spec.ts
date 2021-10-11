// NG2
import { TestBed } from '@angular/core/testing';
// App
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoTimePickerModule } from './TimePicker.module';
import { DateFormatService } from '../../services/date-format/DateFormat';
import {NovoTimePickerInputElement} from './TimePickerInput';

xdescribe('Elements: NovoTimePickerInputElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, DateFormatService],
      imports: [NovoTimePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTimePickerInputElement);
    component = fixture.debugElement.componentInstance;
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
    it('should set formattedValue to empty string if value changed back to undefined', () => {
      const now = new Date();
      component._setTriggerValue(now);
      component._setTriggerValue(undefined);
      expect(component._setFormValue).toHaveBeenCalled();
      expect(component.formattedValue).toEqual('');
    });
  });
});
