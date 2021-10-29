// NG2
import { TestBed } from '@angular/core/testing';
import { DateFormatService } from '../../services/date-format/DateFormat';
// App
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoTimePickerModule } from './TimePicker.module';
import { NovoTimePickerInputElement } from './TimePickerInput';

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
    it('should set formattedValue to empty string if value is null', () => {
      component._setTriggerValue(null);
      expect(component.value).toEqual('');
    });
    it('should set formattedValue to empty string if value changed back to undefined', () => {
      const now = new Date();
      component._setTriggerValue(now);
      component._setTriggerValue(undefined);
      expect(component.value).toEqual('');
    });
  });
});
