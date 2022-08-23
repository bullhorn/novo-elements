// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoRadioElement } from './radio';
import { NovoButtonModule } from 'novo-elements/components/button';

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
