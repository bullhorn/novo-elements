import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../../services';
import { NovoFlexModule, NovoQueryBuilderModule, NumberRangeComponent } from '../../index';

describe('NumberRangeComponent', () => {
  let fixture: ComponentFixture<NumberRangeComponent>;
  let component: NumberRangeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRangeComponent],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
      imports: [NovoQueryBuilderModule, NovoFlexModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NumberRangeComponent);
    component = fixture.debugElement.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  })

  describe('Function: minLessThanMaxValidator(group)', () => {
    const testCases: { min: number; max: number; expected: { [key: string]: boolean } | null }[] = [
      { min: null, max: null, expected: null },
      { min: 1, max: null, expected: null },
      { min: null, max: 10, expected: null },
      { min: 1, max: 10, expected: null },
      { min: 10, max: 5, expected: { minGreaterThanMax: true } },
      { min: 5, max: 5, expected: null },
      { min: -1, max: 0, expected: null },
      { min: -10, max: -15, expected: { minGreaterThanMax: true } },
    ];
    test.each(testCases)('should combine adaptive criteria', (config) => {
      component.rangeForm.setValue({ min: config.min, max: config.max })
      const actual = component.minLessThanMaxValidator(component.rangeForm);
      expect(actual).toEqual(config.expected);
    });
  });
});
