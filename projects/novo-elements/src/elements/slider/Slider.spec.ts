// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoSliderElement } from './Slider';
import { NovoLabelService } from '../../services/novo-label-service';

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
