import { AfterViewInit, Component, DebugElement, ElementRef, inject, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DateFormatService, NovoLabelService } from 'novo-elements/services';
import { DateLike } from 'novo-elements/utils';
import { NovoDateTimeFormatDirective } from './date-time-format';

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
  selector: 'test-datetime-format',
  template: `<input [formControl]="testControl" dateTimeFormat="iso8601">`,
  standalone: false,
})
class DateFormatTestComponent {
  testControl = new FormControl<DateLike>(new Date());
}

describe('NovoDateTimeFormatDirective', () => {
  let fixture: ComponentFixture<DateFormatTestComponent>;
  let dbgDirective: DebugElement;
  let directive: NovoDateTimeFormatDirective;
  let labelService: NovoLabelService;
  let input: HTMLInputElement;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoDateTimeFormatDirective, DateFormatTestComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [NovoLabelService, DateFormatService]
    }).compileComponents();
    fixture = TestBed.createComponent(DateFormatTestComponent);
    labelService = TestBed.inject(NovoLabelService);

  }));

  beforeEach(() => {
    fixture.detectChanges();
    dbgDirective = fixture.debugElement.query(By.directive(NovoDateTimeFormatDirective));
    directive = dbgDirective.injector.get(NovoDateTimeFormatDirective);
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should format date/time', () => {
    fixture.componentInstance.testControl.setValue('January 4, 2022 11:30:00');
    fixture.detectChanges();
    expect(input.value).toEqual('01/04/2022, 11:30 AM');
  });

  it('should safely handle receiving a blank value', () => {
    fixture.componentInstance.testControl.setValue('');
    fixture.detectChanges();
    expect(input.value).toEqual('');
  });

  it('should format an international value correctly', () => {
    labelService.dateFormat = 'dd/MM/YYYY';
    const dt = directive.imask.parse('19/06/2025');
    expect(dt.getDate()).toBe(19);
  });

  it('should correctly initialize if writeValue is called before ready', () => {
    labelService.dateFormat = 'dd/MM/YYYY';
    fixture = TestBed.createComponent(DateFormatTestComponent);
    directive = dbgDirective.injector.get(NovoDateTimeFormatDirective);
    fixture.componentInstance.testControl.setValue('January 4, 2022 11:30:00');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('04/01/2022, 11:30 AM');
  });
});
