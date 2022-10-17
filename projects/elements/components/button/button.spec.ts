// NG2
import { TestBed } from '@angular/core/testing';
import { setupTestSuite } from '../../../../scripts/testing/test-setup';
import { NovoButtonElement } from './button';

describe('Elements: NovoButtonElement', () => {
  let fixture;
  let component;

  setupTestSuite();

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
