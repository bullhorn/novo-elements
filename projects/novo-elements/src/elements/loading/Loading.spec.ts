// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoLoadingElement, NovoSpinnerElement } from './Loading';

describe('Elements: NovoLoadingElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoLoadingElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoLoadingElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});

describe('Elements: NovoSpinnerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoSpinnerElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSpinnerElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
