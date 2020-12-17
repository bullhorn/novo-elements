// NG2
import { async, TestBed } from '@angular/core/testing';
import { NonIdealStateElement } from './NonIdealState';
// App
import { NovoNonIdealStateModule } from './NonIdealState.module';

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
