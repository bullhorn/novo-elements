// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { NovoButtonElement } from './Button';

describe('Elements: NovoButtonElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoButtonElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoButtonElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should be compiled', () => {
    expect(component).toBeDefined();
  });
});
