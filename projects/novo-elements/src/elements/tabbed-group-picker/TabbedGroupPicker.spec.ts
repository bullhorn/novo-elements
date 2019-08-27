// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoTabbedGroupPickerElement, TabbedGroupPickerSchema } from './TabbedGroupPicker';
import { NovoTabbedGroupPickerModule } from './TabbedGroupPicker.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoTabbedGroupPickerElement', () => {
  let fixture;
  let component: NovoTabbedGroupPickerElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentUtils, useClass: ComponentUtils }, NovoLabelService],
      imports: [NovoTabbedGroupPickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoTabbedGroupPickerElement);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

  describe('Function: ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'validateData').and.callFake(() => {});
      spyOn(component, 'validateQuickSelectConfig').and.callFake(() => {});
      spyOn(component, 'setActiveSchema').and.callFake(() => {});
      component.schemata = [
        {
          typeName: 'firstTypeName',
          typeLabel: 'firstTypeLabel',
          valueField: 'firstValueField',
          labelField: 'firstLabelField',
        },
        {
          typeName: 'secondTypeName',
          typeLabel: 'secondTypeLabel',
          valueField: 'secondValueField',
          labelField: 'secondLabelField',
        },
      ];
      component.data = {};
    });
    it('should validate the input data', () => {
      component.ngOnInit();
      expect(component.validateData).toHaveBeenCalled();
    });
    it('when quick select configuration exists, should validate the quick select configuration', () => {
      component.quickSelectConfig = { label: 'blah', items: [] };
      component.ngOnInit();
      expect(component.validateQuickSelectConfig).toHaveBeenCalled();
    });
    it('should activate the first item in the input schemata array', () => {
      const expected: TabbedGroupPickerSchema = {
        typeName: 'firstTypeName',
        typeLabel: 'firstTypeLabel',
        valueField: 'firstValueField',
        labelField: 'firstLabelField',
      };
      component.ngOnInit();
      expect(component.setActiveSchema).toHaveBeenCalledWith(expected);
    });
    it('should stop loading', () => {
      component.ngOnInit();
      expect(component.loading).toEqual(false);
    });
  });
  describe('function: filter', () => {
    beforeEach(() => {
      spyOn(component, 'validateData').and.callFake(() => {});
      spyOn(component, 'validateQuickSelectConfig').and.callFake(() => {});
      spyOn(component, 'setActiveSchema').and.callFake(() => {});
    });

    const getLetter = (n: number) => String.fromCharCode((n % 26) + 65);

    const turnNumbersIntoLetters = (val: string): string =>
      Array.from(val)
        .map((n) => parseInt(n, 10))
        .map(getLetter)
        .join('');

    const buildBigDataset = (): { data; schemata } => {
      const names: string[] = Array(2000)
        .fill(0)
        .map((e, i) => String(Math.pow(1000 + i, 5))); // make a bunch of ~16 character strings
      const schemaNames = names.slice(0, 1000);
      const labelFieldNames = names.splice(0, 1000);
      const schemata = schemaNames.map((typeName, i) => ({
        typeName,
        labelField: labelFieldNames[i], // search/filter only looks at labelField
      }));
      const data = {};
      schemata.forEach(({ labelField, typeName }) => {
        data[typeName] = Array(1000)
          .fill(0)
          .map((n, i) => ({
            [labelField]: turnNumbersIntoLetters(`${labelField}${i}`),
          }));
      });
      return { data, schemata };
    };

    it('should filter large datasets in a reasonable amount of time', () => {
      const amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm = 4000;
      const { data, schemata } = buildBigDataset();
      component.data = data;
      component.schemata = schemata;

      const start = performance.now();
      component.filter('asdfasdf');
      const timeItTakesToSearchAMillionItems = performance.now() - start;

      expect(timeItTakesToSearchAMillionItems).toBeLessThan(amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm);
    });
  });
});
