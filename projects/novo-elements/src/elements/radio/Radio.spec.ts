// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoButtonModule } from '../button/Button.module';
// App
import { NovoRadioElement } from './Radio';

describe('Elements: NovoRadioElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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
