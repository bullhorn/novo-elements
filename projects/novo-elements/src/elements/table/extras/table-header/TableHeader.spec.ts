// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTableHeaderElement } from './TableHeader';

describe('Elements: NovoTableHeaderElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTableHeaderElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTableHeaderElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });
});
