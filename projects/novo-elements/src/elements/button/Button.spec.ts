// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { NovoButtonElement } from './Button';
import { setupTestSuite } from '../../../../../utils/test-setup';

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
