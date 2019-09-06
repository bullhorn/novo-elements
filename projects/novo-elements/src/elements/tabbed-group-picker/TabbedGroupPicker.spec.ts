// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoTabbedGroupPickerElement, TabbedGroupPickerSchema, SelectableItem, TabbedGroupPickerQuickSelect } from './TabbedGroupPicker';
import { NovoTabbedGroupPickerModule } from './TabbedGroupPicker.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoTabbedGroupPickerElement', () => {
  let fixture;
  let component: NovoTabbedGroupPickerElement<any>;

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
          data: [],
        },
        {
          typeName: 'secondTypeName',
          typeLabel: 'secondTypeLabel',
          valueField: 'secondValueField',
          labelField: 'secondLabelField',
          data: [],
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
      const expected = {
        typeName: 'firstTypeName',
        typeLabel: 'firstTypeLabel',
        valueField: 'firstValueField',
        labelField: 'firstLabelField',
        data: [],
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

    xit('should filter large datasets in a reasonable amount of time', () => {
      const amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm = 4000;
      const { data, schemata } = buildBigDataset();
      component.schemata = schemata;

      const start = performance.now();
      component.filter('asdfasdf');
      const timeItTakesToSearchAMillionItems = performance.now() - start;

      expect(timeItTakesToSearchAMillionItems).toBeLessThan(amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm);
    });
  });
  describe('createChildrenReferences', () => {
    it('should make it so that children of data list items are references to other data list items', () => {
      const chicken = { chickenId: 3, bwaack: 'bwock?' };
      const mockingbird = { chickenId: 4, bwaack: 'tweeet' };
      const dinosaurs = [
        {
          id: 5,
          name: 'Allosaurus',
          children: [{ chickenId: 3, bwaack: 'bwock?' }, { chickenId: 4, bwaack: 'tweeet' }],
        },
      ];
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [chicken, mockingbird],
        },
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: dinosaurs,
        },
      ];
      let childOfAllosaurus = component.schemata[1].data[0].children[0];
      expect(childOfAllosaurus).not.toBe(chicken);

      component.createChildrenReferences();

      childOfAllosaurus = component.schemata[1].data[0].children[0];
      expect(childOfAllosaurus).toBe(chicken);
    });
  });
  describe('updateParents', () => {
    it('should set parents to selected if their only child is selected', () => {
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [{ chickenId: 3, bwaack: 'bwock?' }],
        },
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [
            {
              id: 5,
              name: 'Allosaurus',
              children: [{ chickenId: 3, bwaack: 'bwock?' }],
            },
          ],
        },
      ];
      component.createChildrenReferences();
      component.schemata[0].data[0].selected = true;

      const parent = component.schemata[1].data[0];
      expect(parent.selected).toEqual(undefined);

      component.updateParents();

      expect(parent.selected).toEqual(true);
    });
    it('should set parents to unselected if none of their children are selected', () => {
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [{ chickenId: 3, bwaack: 'bwock?' }],
        },
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [
            {
              selected: true,
              id: 5,
              name: 'Allosaurus',
              children: [{ chickenId: 3, bwaack: 'bwock?' }],
            },
          ],
        },
      ];
      component.createChildrenReferences();
      const parent = component.schemata[1].data[0];
      expect(parent.selected).toEqual(true);

      component.updateParents();

      expect(parent.selected).toEqual(undefined);
    });
    it('should set parents to indeterminate if one of their many children is selected', () => {
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [{ chickenId: 3, bwaack: 'bwock?', selected: true }, { chickenId: 4, bwaack: 'baa bock' }],
        },
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [
            {
              selected: true,
              id: 5,
              name: 'Allosaurus',
              children: [{ chickenId: 3, bwaack: 'bwock?' }, { chickenId: 4, bwaack: 'baa bock' }],
            },
          ],
        },
      ];
      component.createChildrenReferences();
      const parent = component.schemata[1].data[0];
      expect(parent.selected).toEqual(true);

      component.updateParents();

      expect(parent.selected).toEqual(undefined);
      expect(parent.indeterminate).toEqual(true);
    });
  });
  describe('getSelectedValue', () => {
    it('should return indeterminate if one value is selected', () => {
      const childArray = [{ id: 1, name: 'Scout', selected: true }, { id: 2, name: 'Atticus' }];
      const result = component.getSelectedValue(childArray);
      expect(result).toEqual(['indeterminate', true]);
    });
    it('should return selected if every element of the child array is selected', () => {
      const childArray = [{ id: 1, name: 'Scout', selected: true }, { id: 2, name: 'Atticus', selected: true }];
      const result = component.getSelectedValue(childArray);
      expect(result).toEqual(['selected', true]);
    });
    it('should return undefined if none of the items in the child array are selected', () => {
      const childArray = [{ id: 1, name: 'Scout' }, { id: 2, name: 'Atticus' }];
      const result = component.getSelectedValue(childArray as any);
      expect(result).toEqual([]);
    });
  });
  describe('onQuickSelectListItemClicked', () => {
    it('should select each item in the quick select group', () => {
      const quickSelectItem = { typeName: 'animals', values: [1], label: 'chicken' };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [
        { typeName: 'animals', valueField: 'id', labelField: 'name', data: [{ id: 1, name: 'chicken' }, { id: 2, name: 'goldfish' }] },
      ];
      const chicken = component.schemata[0].data[0];
      expect(chicken.selected).toEqual(undefined);
      component.onQuickSelectListItemClicked(quickSelectItem);
      expect(chicken.selected).toEqual(true);
    });
    it('should unselect each item in the quick select group', () => {
      const quickSelectItem: TabbedGroupPickerQuickSelect = { typeName: 'animals', values: [1], label: 'chicken', active: true };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [
        {
          typeName: 'animals',
          valueField: 'id',
          labelField: 'name',
          data: [{ id: 1, name: 'chicken', selected: true }, { id: 2, name: 'goldfish' }],
        },
      ];
      const chicken = component.schemata[0].data[0];
      expect(chicken.selected).toEqual(true);
      expect(component.quickSelectConfig.items[0].active).toEqual(true);
      component.onQuickSelectListItemClicked(quickSelectItem);
      expect(component.quickSelectConfig.items[0].active).toEqual(false);
      expect(chicken.selected).toEqual(undefined);
    });
  });
  describe('updateQuickSelectCheckboxes', () => {
    it('should select each item in the quick select group', () => {
      const quickSelectItem: TabbedGroupPickerQuickSelect = { typeName: 'animals', values: [1], label: 'chicken' };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [
        {
          typeName: 'animals',
          valueField: 'id',
          labelField: 'name',
          data: [{ id: 1, name: 'chicken', selected: true }, { id: 2, name: 'goldfish' }],
        },
      ];
      expect(quickSelectItem.active).toEqual(undefined);
      component.updateQuickSelectCheckboxes(component.schemata[0]);
      expect(quickSelectItem.active).toEqual(true);
    });
  });
  describe('onDataListItemClicked', () => {
    it('should update the selected status on the schema as well as the display data', () => {
      const chicken = { chickenId: '3', bwaack: 'bwock?' };
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [chicken],
        },
      ];
      component.filter('');
      component.onDataListItemClicked(component.schemata[0], chicken);
      const selectedItem = component.schemata[0].data[0];
      const displayReference = component.displayData['chickens'][0];
      expect(selectedItem.selected).toEqual(true);
      expect(displayReference.selected).toEqual(true);
      expect(selectedItem).toEqual(displayReference);
    });
    it('should update the selected status of a group to indeterminate if an item in the group is selected but others are not', () => {
      const chicken = { chickenId: 3, bwaack: 'bwock?' };
      const mockingbird = { chickenId: 4, bwaack: 'tweeet' };
      const dinosaurs = [
        {
          id: 5,
          name: 'Allosaurus',
          children: [{ chickenId: 3, bwaack: 'bwock?' }, { chickenId: 4, bwaack: 'tweeet' }],
        },
      ];
      component.schemata = [
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [chicken, mockingbird],
        },
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: dinosaurs,
        },
      ];
      component.createChildrenReferences();
      component.onDataListItemClicked(component.schemata[0], chicken);

      const selectedItem = component.schemata[0].data[0];
      expect(selectedItem.selected).toEqual(true);

      const indeterminateGroup = component.schemata[1].data[0];
      expect(indeterminateGroup.selected).toBeFalsy();
      expect(indeterminateGroup.indeterminate).toEqual(true);
    });
    it('should update the selected status of a group if the only item in the group is selected', () => {
      const chicken = { chickenId: '3', bwaack: 'bwock?' };
      const dinosaur = { id: '1', name: 'Tyrannosaurus', children: [chicken] };
      component.schemata = [
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [dinosaur],
        },
        {
          typeName: 'chickens',
          typeLabel: 'Chickens',
          valueField: 'chickenId',
          labelField: 'bwaack',
          data: [chicken],
        },
      ];
      component.onDataListItemClicked(component.schemata[1], chicken);
      const tRex = component.schemata[0].data[0];
      const heyhey = component.schemata[1].data[0];
      expect(heyhey.selected).toEqual(true);
      expect(tRex.selected).toEqual(true);
    });
  });
});
