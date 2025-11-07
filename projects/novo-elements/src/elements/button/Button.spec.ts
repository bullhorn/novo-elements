// NG2
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// APP
import { NovoButtonElement } from './Button';
import { Component, Input } from '@angular/core';

describe('Elements: NovoButtonElement', () => {
  let fixture: ComponentFixture<NovoButtonElement>;
  let component;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [NovoButtonElement],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoButtonElement);
    component = fixture.componentInstance;
  });

  it('should be compiled', () => {
    expect(component).toBeDefined();
  });

  it('should not assign disabled attribute to self when registered as <novo-button>', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.getAttribute('disabled')).toBe(null);
  });
});

@Component({
  template: '<button theme="dialogue" [disabled]="disableButton"></button>',
  selector: 'test-button-component',
  standalone: false,
})
class TestButtonContainer {
  @Input() disableButton = false;
}

describe('<button> with NovoButtonElement directive', () => {
  let fixture: ComponentFixture<TestButtonContainer>;
  let component;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [NovoButtonElement, TestButtonContainer],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonContainer);
    component = fixture.componentInstance;
  });

  it('should be compiled', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(fixture.debugElement.query(By.directive(NovoButtonElement))).toBeTruthy();
  });

  it('should disable the element when the disabled property is specified', () => {
    fixture.componentRef.setInput('disableButton', true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBe(true);
  });
});
