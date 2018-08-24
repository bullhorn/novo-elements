// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTimePickerModule } from './TimePicker.module';
import { NovoTimePickerInputElement } from './TimePickerInput';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';

describe('Elements: NovoTimePickerInputElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, DateFormatService],
      imports: [NovoTimePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTimePickerInputElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

  describe('Method: ngOnInit()', () => {
    it('should be defined.', () => {
      expect(component.ngOnInit).toBeDefined();
      component.ngOnInit();
    });
  });

  describe('Method: dispatchOnChange()', () => {
    it('should be defined.', () => {
      expect(component.dispatchOnChange).toBeDefined();
      component.dispatchOnChange();
    });
  });

  describe('Method: writeValue()', () => {
    it('should be defined.', () => {
      expect(component.writeValue).toBeDefined();
      component.writeValue();
    });
  });

  describe('Method: registerOnChange()', () => {
    it('should be defined.', () => {
      expect(component.registerOnChange).toBeDefined();
      component.registerOnChange();
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeDefined();
      component.registerOnTouched();
    });
  });

  describe('Method: formatDateValue()', () => {
    it('should return empty string if called with null value', () => {
      let expected = '';
      let actual: string = component.formatDateValue(null);
      expect(actual).toEqual(expected);
    });
    it('should call formatDateWithFormat', () => {
      spyOn(component.labels, 'formatDateWithFormat').and.returnValue('12:00 am');
      component.formatDateValue('12:00 am');
      expect(component.labels.formatDateWithFormat).toHaveBeenCalled();
    });
    it('should prepend a 0 to value if formatDateWithFormat returns a value with only one digit in front of colon', () => {
      spyOn(component.labels, 'formatDateWithFormat').and.returnValue('2:00 am');
      component.formatDateValue('2:00 am');
      let expected = '02:00 am';
      let actual: string = component.formatDateValue('2:00 am');
      expect(actual).toEqual(expected);
    });
    it('should change german value vorm. to am.', () => {
      spyOn(component.labels, 'formatDateWithFormat').and.returnValue('8:30 vorm.');
      let expected = '08:30 am';
      let actual: string = component.formatDateValue('08:30');
      expect(actual).toEqual(expected);
    });
    it('should change german value nachm. to pm.', () => {
      spyOn(component.labels, 'formatDateWithFormat').and.returnValue('8:30 nachm.');
      let expected = '08:30 pm';
      let actual: string = component.formatDateValue('08:30');
      expect(actual).toEqual(expected);
    });
  });
});
