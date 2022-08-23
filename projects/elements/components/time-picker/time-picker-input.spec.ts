// NG2
import { TestBed } from '@angular/core/testing';
import { NovoTimePickerInputElement } from './time-picker-input';
import { NovoTimePickerModule } from './time-picker.module';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';

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
