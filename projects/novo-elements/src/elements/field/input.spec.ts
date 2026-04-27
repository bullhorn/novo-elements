import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { NovoInput } from './input';

@Component({
  template: `
    <input
      novoInput
      type="text"
      placeholder="Test placeholder"
      [formControl]="formControl"
      data-testid="test-input"
    />
  `,
  standalone: false,
})
class TestComponent {
  formControl = new FormControl('', Validators.required);
}

describe('Directive: NovoInput', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputDebugElement: DebugElement;
  let novoInput: NovoInput;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NovoInput, TestComponent],
        imports: [ReactiveFormsModule],
        providers: [AutofillMonitor],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      inputDebugElement = fixture.debugElement.query(By.directive(NovoInput));
      novoInput = inputDebugElement.injector.get(NovoInput);
      fixture.detectChanges();
    })
  );

  describe('errorState', () => {
    it('should be false when control is valid', () => {
      component.formControl.setValue('valid value');
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(false);
    });

    it('should be false when control is invalid but untouched', () => {
      component.formControl.setValue('');
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(false);
    });

    it('should be true when control is invalid and touched', () => {
      component.formControl.setValue('');
      component.formControl.markAsTouched();
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(true);
    });

    it('should be true when control is invalid and dirty', () => {
      component.formControl.setValue('');
      component.formControl.markAsDirty();
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(true);
    });

    it('should transition from false to true when user interacts', () => {
      component.formControl.setValue('');
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(false);

      component.formControl.markAsTouched();
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(true);
    });

    it('should return false to true when value becomes valid', () => {
      component.formControl.setValue('');
      component.formControl.markAsTouched();
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(true);

      component.formControl.setValue('valid value');
      fixture.detectChanges();
      expect(novoInput.errorState).toBe(false);
    });

    it('should handle missing ngControl gracefully', () => {
      novoInput.ngControl = null;
      expect(novoInput.errorState).toBe(false);
    });
  });

  describe('initialization', () => {
    it('should be defined', () => {
      expect(novoInput).toBeDefined();
    });

    it('should implement NovoFieldControl interface', () => {
      expect(novoInput.id).toBeDefined();
      expect(novoInput.placeholder).toBeDefined();
      expect(novoInput.disabled).toBeDefined();
      expect(novoInput.required).toBeDefined();
      expect(novoInput.empty).toBeDefined();
      expect(novoInput.focused).toBeDefined();
      expect(novoInput.stateChanges).toBeDefined();
    });
  });
});
