// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';
// App
import { NovoFormElement } from './Form';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';

describe('Elements: NovoFormElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NovoFormElement,
        FormGroupDirective
      ],
      providers: [NovoTemplateService]
    }).compileComponents();
    fixture = TestBed.createComponent(NovoFormElement);
    component = fixture.debugElement.componentInstance;
    // Mock @Input
    component.form = {
      value: 'TEST',
      valid: false,
      getRawValue: () => {
        return 'TEST';
      }
    };
    component.layout = 'vertical';
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.layout).toBe('vertical');
    expect(component.form.layout).toBe('vertical');
  });

  it('should return the value', () => {
    expect(component.value).toEqual('TEST');
  });

  it('should return the valid', () => {
    expect(component.isValid).toBe(false);
  });
});
