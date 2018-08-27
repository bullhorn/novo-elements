// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTableActionsElement } from './TableActions';

describe('Elements: NovoTableActionsElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTableActionsElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTableActionsElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });
});
