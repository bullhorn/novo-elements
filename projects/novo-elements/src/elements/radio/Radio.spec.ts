// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoRadioElement } from './Radio';
import { NovoButtonModule } from '../button/Button.module';

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
