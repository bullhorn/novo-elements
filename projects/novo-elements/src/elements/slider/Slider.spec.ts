// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
import { NovoLabelService } from 'novo-elements/services';
// App
import { NovoSliderElement } from './Slider';

describe('Elements: NovoSliderElement', () => {
  let fixture;
  let component;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NovoSliderElement],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSliderElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
