// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoNonIdealStateModule } from './non-ideal-state.module';
import { NonIdealStateElement } from './non-ideal-state';

describe('Elements: NonIdealStateElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoNonIdealStateModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NonIdealStateElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
