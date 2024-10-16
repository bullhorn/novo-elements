import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NovoFieldElement, NovoFieldModule } from '../field';
import { NovoChipInput } from './ChipInput';
import { NovoChipsModule } from './Chips.module';

@Component({
    selector: 'test-chip-input',
    template: `
    <novo-field>
        <novo-chip-list [formControl]="chipsCtrl">
            <input novoChipInput
              [formControl]="textCtrl">
        </novo-chip-list>
    </novo-field>
    <div class="mock-overlay"></div>`
})
class TestChipInputComponent {
  textCtrl = new FormControl('');
  chipsCtrl = new FormControl([]);
}

describe('Directive: NovoChipInput', () => {
  let fixture: ComponentFixture<TestChipInputComponent>;
  let testComponent: TestChipInputComponent;
  let directive: NovoChipInput;
  let mockOverlay: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NovoChipsModule, ReactiveFormsModule, NovoFieldModule],
      declarations: [TestChipInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChipInputComponent);
    testComponent = fixture.debugElement.componentInstance;
    directive = fixture.debugElement.query(By.directive(NovoChipInput)).injector.get(NovoChipInput);
    mockOverlay = fixture.debugElement.query(By.css('.mock-overlay')).nativeElement;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should clear the control value on blur', () => {
    fixture.detectChanges();
    const blurEvent = new FocusEvent('blur', {
        relatedTarget: mockOverlay
    });
    testComponent.textCtrl.setValue('value');
    spyOn(NovoFieldElement.prototype, 'blurEventIsInField').and.returnValue(false);
    fixture.debugElement.query(By.directive(NovoChipInput)).triggerEventHandler('blur', blurEvent);
    expect(NovoFieldElement.prototype.blurEventIsInField).toHaveBeenCalledWith(blurEvent);
    expect(testComponent.textCtrl.value).toBeFalsy();
  });
});