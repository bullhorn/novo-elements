// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoTabbedGroupPickerElement, TabbedGroupPickerSchema } from './TabbedGroupPicker';
import { NovoTabbedGroupPickerModule } from './TabbedGroupPicker.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { expressionChangedAfterItHasBeenCheckedError } from '@angular/core/src/view/errors';

describe('Elements: NovoTabbedGroupPickerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentUtils, useClass: ComponentUtils }],
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
});
