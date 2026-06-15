import { TestBed } from '@angular/core/testing';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoRadioElement } from './Radio';

describe('Elements: NovoRadioElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoRadioElement],
      imports: [NovoButtonModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoRadioElement);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
