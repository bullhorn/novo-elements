// NG2
import { TestBed } from '@angular/core/testing';
// APP
import { NovoButtonElement } from './Button';

describe('Elements: NovoButtonElement', () => {
  let fixture;
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
});
