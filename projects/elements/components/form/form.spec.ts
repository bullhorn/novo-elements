// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { async, TestBed } from '@angular/core/testing';
import { NovoFormModule } from './form.module';
import { NovoFormElement } from './form';
import { NovoTemplateService } from 'novo-elements/services';
xdescribe('Elements: NovoFormElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.layout).toBe('vertical');
    expect(component.form.layout).toBe('vertical');
  });
});