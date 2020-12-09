// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NonIdealStateElement } from './NonIdealState';

describe('Elements: NonIdealStateElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonIdealStateElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NonIdealStateElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
