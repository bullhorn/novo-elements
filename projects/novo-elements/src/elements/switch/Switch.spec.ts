// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoSwitchElement } from './Switch';

describe('Elements: NovoSwitchElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoSwitchElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSwitchElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
