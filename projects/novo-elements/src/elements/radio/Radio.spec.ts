// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
import { NovoButtonModule } from 'novo-elements/elements/button';
// App
import { NovoRadioElement } from './Radio';

describe('Elements: NovoRadioElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoRadioElement],
      imports: [NovoButtonModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRadioElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
