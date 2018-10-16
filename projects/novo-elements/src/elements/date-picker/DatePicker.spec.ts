// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDatePickerElement } from './DatePicker';
import { NovoLabelService } from '../../services/novo-label-service';

xdescribe('Elements: NovoDatePickerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDatePickerElement],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDatePickerElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: ngOnInit()', () => {
    it('should be defined.', () => {
      expect(component).toBeTruthy();
      expect(component.ngOnInit).toBeTruthy();
    });
  });

  describe('Method: isSelectingRange()', () => {
    it('should be defined.', () => {
      expect(component.isSelectingRange).toBeTruthy();
      component.isSelectingRange();
    });
  });

  describe('Method: isEndFill()', () => {
    it('should be defined.', () => {
      expect(component.isEndFill).toBeTruthy();
      component.isEndFill();
    });
  });

  describe('Method: isStartFill()', () => {
    it('should be defined.', () => {
      expect(component.isStartFill).toBeTruthy();
      component.isStartFill();
    });
  });

  describe('Method: isFiller()', () => {
    it('should be defined.', () => {
      expect(component.isFiller).toBeTruthy();
      component.isFiller();
    });
  });

  xdescribe('Method: isSelected()', () => {
    it('should be defined.', () => {
      expect(component.isSelected).toBeTruthy();
      component.isSelected();
    });
  });

  describe('Method: isDisabled()', () => {
    it('should be defined.', () => {
      expect(component.isDisabled).toBeTruthy();
      component.isDisabled();
    });
  });

  describe('Method: updateView()', () => {
    it('should be defined.', () => {
      expect(component.updateView).toBeTruthy();
      component.updateView();
    });
  });

  describe('Method: setToday()', () => {
    it('should be defined.', () => {
      expect(component.setToday).toBeTruthy();
      component.setToday();
    });
  });

  describe('Method: clearRange()', () => {
    it('should be defined.', () => {
      expect(component.clearRange).toBeTruthy();
      component.clearRange();
    });
  });

  describe('Method: setMonth()', () => {
    it('should be defined.', () => {
      expect(component.setMonth).toBeTruthy();
      component.setMonth();
    });
  });

  describe('Method: setYear()', () => {
    it('should be defined.', () => {
      expect(component.setYear).toBeTruthy();
      component.setYear();
    });
  });

  xdescribe('Method: select()', () => {
    it('should be defined.', () => {
      expect(component.select).toBeTruthy();
      component.select();
    });
  });

  describe('Method: open()', () => {
    it('should be defined.', () => {
      expect(component.open).toBeTruthy();
      component.open();
    });
  });

  xdescribe('Method: previousMonth()', () => {
    it('should be defined.', () => {
      expect(component.previousMonth).toBeTruthy();
      component.previousMonth();
    });
  });

  xdescribe('Method: nextMonth()', () => {
    it('should be defined.', () => {
      expect(component.nextMonth).toBeTruthy();
      component.nextMonth();
    });
  });

  describe('Method: updateHeading()', () => {
    it('should be defined.', () => {
      expect(component.updateHeading).toBeTruthy();
      component.updateHeading();
    });
  });

  describe('Method: removeTime()', () => {
    it('should be defined.', () => {
      expect(component.removeTime).toBeTruthy();
      component.removeTime();
    });
  });

  xdescribe('Method: buildMonth()', () => {
    it('should be defined.', () => {
      expect(component.buildMonth).toBeTruthy();
      component.buildMonth();
    });
  });

  xdescribe('Method: buildWeek()', () => {
    it('should be defined.', () => {
      expect(component.buildWeek).toBeTruthy();
      component.buildWeek();
    });
  });

  describe('Method: toggleRangeSelect()', () => {
    it('should be defined.', () => {
      expect(component.toggleRangeSelect).toBeTruthy();
      component.toggleRangeSelect();
    });
  });

  xdescribe('Method: rangeHover()', () => {
    it('should be defined.', () => {
      expect(component.rangeHover).toBeTruthy();
      component.rangeHover();
    });
  });

  describe('Method: writeValue()', () => {
    it('should be defined.', () => {
      expect(component.writeValue).toBeTruthy();
      component.writeValue();
    });
  });

  describe('Method: registerOnChange()', () => {
    it('should be defined.', () => {
      expect(component.registerOnChange).toBeTruthy();
      component.registerOnChange();
    });
  });

  describe('Method: registerOnTouched()', () => {
    it('should be defined.', () => {
      expect(component.registerOnTouched).toBeTruthy();
      component.registerOnTouched();
    });
  });
});
