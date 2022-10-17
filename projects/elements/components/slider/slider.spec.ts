// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoSliderElement } from './slider';
import { NovoLabelService } from 'novo-elements/services';

describe('Elements: NovoSliderElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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
