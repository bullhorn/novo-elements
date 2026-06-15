import { TestBed } from '@angular/core/testing';
import { NovoSwitchElement } from './Switch';

describe('Elements: NovoSwitchElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoSwitchElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSwitchElement);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
