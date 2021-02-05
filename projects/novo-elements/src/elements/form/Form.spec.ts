// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoFormElement } from './Form';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';
import { NovoFormModule } from './Form.module';
describe('Elements: NovoFormElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ imports: [NovoFormModule], providers: [NovoTemplateService] }).compileComponents();
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
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.layout).toBe('vertical');
    expect(component.form.layout).toBe('vertical');
  });
});
