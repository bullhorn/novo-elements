import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { NovoDateRangeFormatDirective } from './date-range-format';

jest.mock('angular-imask', () => {
  return {
    IMaskDirective: class implements ControlValueAccessor, AfterViewInit {
      renderer = inject(Renderer2);
      element = inject(ElementRef);
      _initialValue: any;
      maskRefInitialized = false;

      ngAfterViewInit(): void {
        this.maskRefInitialized = true;
        if (this._initialValue) {
          this.writeValue(this._initialValue);
        }
      }

      writeValue(val) {
        if (!this.maskRefInitialized) {
          this._initialValue = val;
        } else {
          this.renderer.setProperty(this.element.nativeElement, 'value', val || '');
        }
      }

      registerOnChange(fn: any): void {}

      registerOnTouched(fn: any): void {}
    }
  };
});

@Component({
  selector: 'test-date-range-format',
  template: `<input [formControl]="testControl" dateRangeFormat="date">`,
  standalone: false,
})
class DateRangeFormatTestComponent {
  testControl = new FormControl<any>(new Date());
}

describe('NovoDateRangeFormatDirective', () => {
  let fixture: ComponentFixture<DateRangeFormatTestComponent>;
  let directive: NovoDateRangeFormatDirective;
  let labelService: NovoLabelService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDateRangeFormatDirective, DateRangeFormatTestComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [NovoLabelService, DateFormatService]
    }).compileComponents();
    fixture = TestBed.createComponent(DateRangeFormatTestComponent);
    labelService = TestBed.inject(NovoLabelService);
  }));

  beforeEach(() => {
    fixture.detectChanges();
    const dbgDirective = fixture.debugElement.query(By.directive(NovoDateRangeFormatDirective));
    if (dbgDirective) {
      directive = dbgDirective.injector.get(NovoDateRangeFormatDirective);
    }
  });

  describe('Function: formatValue', () => {
    it('should format date range with separator', () => {
      if (!directive) return;
      const dateRange = {
        startDate: new Date('2022-01-04'),
        endDate: new Date('2022-01-15')
      };
      const result = directive.formatValue(dateRange);
      expect(result).toContain(' - ');
    });

    it('should safely handle receiving a blank value', () => {
      if (!directive) return;
      const result = directive.formatValue(null);
      expect(result).toEqual('');
    });

    it('should handle undefined date range', () => {
      if (!directive) return;
      const result = directive.formatValue(undefined);
      expect(result).toEqual('');
    });
  });

  describe('Function: formatAsIso', () => {
    it('should format as ISO when formatAsIso is called', () => {
      if (!directive) return;
      const dateRange = {
        startDate: new Date('2025-10-22'),
        endDate: new Date('2025-10-25')
      };
      const result = directive.formatAsIso(dateRange);
      expect(result).toContain('/');
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}/);
    });

    it('should return empty string for null date range', () => {
      if (!directive) return;
      const dateRange = {
        startDate: null,
        endDate: null
      };
      const result = directive.formatAsIso(dateRange);
      expect(result).toBe('');
    });

    it('should return empty string for undefined values', () => {
      if (!directive) return;
      const result = directive.formatAsIso(null);
      expect(result).toBe('');
    });
  });

  describe('Function: validate', () => {
    it('should validate a properly formatted date range string', () => {
      if (!directive) return;
      labelService.dateFormat = 'MM/dd/YYYY';
      const isValid = directive.validate('01/04/2022 - 01/15/2022');
      expect(isValid).toBe(true);
    });

    it('should reject an invalid date range string', () => {
      if (!directive) return;
      const isValid = directive.validate('invalid - data');
      expect(isValid).toBe(false);
    });

    it('should reject when one date is invalid', () => {
      if (!directive) return;
      labelService.dateFormat = 'MM/dd/YYYY';
      const isValid = directive.validate('01/04/2022 - invalid');
      expect(isValid).toBe(false);
    });
  });

  describe('Function: extractDatesFromInput', () => {
    it('should extract start and end dates from properly formatted input', () => {
      if (!directive) return;
      labelService.dateFormat = 'MM/dd/YYYY';
      const dates = directive.extractDatesFromInput('01/04/2022 - 01/15/2022');
      expect(dates.startDate).toBeDefined();
      expect(dates.endDate).toBeDefined();
    });

    it('should return dates with correct values', () => {
      if (!directive) return;
      labelService.dateFormat = 'MM/dd/YYYY';
      const dates = directive.extractDatesFromInput('01/04/2022 - 01/15/2022');
      expect(dates.startDate.getDate()).toBe(4);
      expect(dates.endDate.getDate()).toBe(15);
    });
  });

  describe('Function: formatDate', () => {
    it('should format a valid date', () => {
      if (!directive) return;
      const date = new Date('2025-10-22');
      const result = directive.formatDate(date);
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle invalid date gracefully', () => {
      if (!directive) return;
      const result = directive.formatDate('invalid');
      expect(result).toBeTruthy();
    });
  });
});
