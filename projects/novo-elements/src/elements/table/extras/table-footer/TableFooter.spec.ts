// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTableFooterElement } from './TableFooter';

describe('Elements: NovoTableFooterElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoTableFooterElement],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTableFooterElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize with defaults', () => {
    expect(component).toBeDefined();
  });
});
