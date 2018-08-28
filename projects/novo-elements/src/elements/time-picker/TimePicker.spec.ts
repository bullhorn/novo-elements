// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTimePickerModule } from './TimePicker.module';
import { NovoTimePickerElement } from './TimePicker';

xdescribe('Elements: NovoTimePickerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoTimePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTimePickerElement);
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

  describe('Method: init()', () => {
    it('should be defined.', () => {
      expect(component.init).toBeDefined();
      component.init();
    });
  });

  describe('Method: checkBetween()', () => {
    it('should be defined.', () => {
      expect(component.checkBetween).toBeDefined();
      component.checkBetween();
    });
  });

  describe('Method: setHours()', () => {
    it('should be defined.', () => {
      expect(component.setHours).toBeDefined();
      component.setHours();
    });
  });

  describe('Method: setMinutes()', () => {
    it('should be defined.', () => {
      expect(component.setMinutes).toBeDefined();
      component.setMinutes();
    });
  });

  describe('Method: setPeriod()', () => {
    it('should be defined.', () => {
      expect(component.setPeriod).toBeDefined();
      component.setPeriod();
    });
  });

  xdescribe('Method: dispatchChange()', () => {
    it('should be defined.', () => {
      expect(component.dispatchChange).toBeDefined();
      component.dispatchChange();
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
});
