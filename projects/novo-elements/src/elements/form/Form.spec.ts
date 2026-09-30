import { OverlayModule } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { NovoTemplateService } from 'novo-elements/services';
import { NovoFormElement } from './Form';
import { NovoFormModule } from './Form.module';

describe('Elements: NovoFormElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NovoFormModule, OverlayModule], providers: [NovoTemplateService] }).compileComponents();
    fixture = TestBed.createComponent(NovoFormElement);
    component = fixture.debugElement.componentInstance;
    // Mock @Input
    component.form = {
      value: 'TEST',
      valid: false,
      getRawValue: () => {
        return 'TEST';
      },
    };
    component.layout = 'vertical';
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.layout).toBe('vertical');
    expect(component.form.layout).toBe('vertical');
  });

  it('should re-sync layout onto a reassigned form on ngOnChanges', () => {
    component.ngOnInit();

    const reassignedForm = {
      value: 'TEST',
      valid: false,
      getRawValue: () => {
        return 'TEST';
      },
    };
    component.form = reassignedForm;
    component.ngOnChanges();

    expect(reassignedForm.layout).toBe('vertical');
  });

  it('should not throw when ngOnChanges runs without a bound form', () => {
    component.form = undefined;

    expect(() => component.ngOnChanges()).not.toThrow();
  });
});
