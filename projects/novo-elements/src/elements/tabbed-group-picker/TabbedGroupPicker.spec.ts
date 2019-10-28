// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoTabbedGroupPickerElement, TabbedGroupPickerSchema, TabbedGroupPickerQuickSelect } from './TabbedGroupPicker';
import { NovoTabbedGroupPickerModule } from './TabbedGroupPicker.module';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoTabbedGroupPickerElement', () => {
  let fixture;
  let component: NovoTabbedGroupPickerElement;

  const getChickenSchema = (): TabbedGroupPickerSchema => ({
    typeName: 'chickens',
    typeLabel: 'Chickens',
    valueField: 'chickenId',
    labelField: 'bwaack',
    data: [
      ({ chickenId: 3, bwaack: 'bwock?' } as unknown) as { selected?: boolean },
      ({ chickenId: 4, bwaack: 'baa bock' } as unknown) as { selected?: boolean },
    ],
  });

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

  describe('function: ngOnInit', () => {
    const firstSchema = {
      typeName: 'firstTypeName',
      typeLabel: 'firstTypeLabel',
      valueField: 'firstValueField',
      labelField: 'firstLabelField',
      data: [],
    };
    beforeEach(() => {
      component.schemata = [
        firstSchema,
        {
          typeName: 'secondTypeName',
          typeLabel: 'secondTypeLabel',
          valueField: 'secondValueField',
          labelField: 'secondLabelField',
          data: [],
        },
      ];
    });
    it('should activate the first item in the input schemata array', () => {
      component.ngOnInit();
      expect(component.displaySchema).toBe(firstSchema);
    });
    it('should stop loading', () => {
      component.ngOnInit();
      expect(component.loading).toEqual(false);
    });
  });
  describe('function: filter', () => {
    const getLetter = (n: number) => String.fromCharCode((n % 26) + 65);

    const turnNumbersIntoLetters = (val: string): string =>
      Array.from(val)
        .map((n) => parseInt(n, 10))
        .map(getLetter)
        .join('');

    const buildBigDataset = (): Partial<TabbedGroupPickerSchema>[] => {
      const names: string[] = Array(200)
        .fill(0)
        .map((e, i) => String(Math.pow(1000 + i, 5))); // make a bunch of ~16 character strings
      const schemaNames = names.slice(0, 100);
      const labelFieldNames = names.splice(0, 100);
      const schemata = schemaNames.map((typeName, i) => ({
        typeName,
        labelField: labelFieldNames[i], // search/filter only looks at labelField
      }));
      schemata.forEach((schema) => {
        const { labelField } = schema;
        schema['data'] = Array(1000)
          .fill(0)
          .map((n, i) => ({
            [labelField]: turnNumbersIntoLetters(`${labelField}${i}`),
          }));
      });
      return schemata;
    };

    it('should filter large datasets in a reasonable amount of time', () => {
      const amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm = 1000;
      component.schemata = buildBigDataset() as TabbedGroupPickerSchema[];

      const start = performance.now();
      component.filter('asdfasdf');
      const timeItTakesToSearchAMillionItems = performance.now() - start;

      expect(timeItTakesToSearchAMillionItems).toBeLessThan(amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm);
    });
  });
  describe('function: createChildrenReferences', () => {
    it('should make it so that children of data list items are references to other data list items', () => {
      const dinosaurs = [
        {
          id: 5,
          name: 'Allosaurus',
          children: [{ chickenId: 3, bwaack: 'bwock?' }, { chickenId: 4, bwaack: 'tweeet' }],
        },
      ];
      component.schemata = [
        getChickenSchema(),
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: dinosaurs,
        },
      ];
      const chicken = component.schemata[0].data[0];
      let childOfAllosaurus = component.schemata[1].data[0]['children'][0];
      expect(childOfAllosaurus).not.toBe(chicken);

      component.createChildrenReferences();

      childOfAllosaurus = component.schemata[1].data[0]['children'][0];
      expect(childOfAllosaurus).toBe(chicken);
    });
  });
  describe('function: updateParents', () => {
    it('should set parents to selected if their only child is selected', () => {
      component.schemata = [
        getChickenSchema(),
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [
            ({
              id: 5,
              name: 'Allosaurus',
              children: [({ chickenId: 3, bwaack: 'bwock?' } as unknown) as { selected?: boolean }],
            } as unknown) as { selected?: boolean },
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
        getChickenSchema(),
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [
            ({
              selected: true,
              id: 5,
              name: 'Allosaurus',
              children: [...getChickenSchema().data],
            } as unknown) as { selected?: boolean },
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
      const dinosaurSchema = {
        typeName: 'dinosaurs',
        typeLabel: 'Dinosaurs',
        valueField: 'id',
        labelField: 'name',
        childTypeName: 'chickens',
        data: [
          ({
            selected: true,
            id: 5,
            name: 'Allosaurus',
            children: [...getChickenSchema().data],
          } as unknown) as { selected?: boolean; indeterminate?: boolean },
        ],
      };
      component.schemata = [
        {
          ...getChickenSchema(),
          data: [...getChickenSchema().data],
        },
        dinosaurSchema,
      ];
      component.schemata[0].data[0].selected = true;
      component.createChildrenReferences();
      const parent = dinosaurSchema.data[0];
      expect(parent.selected).toEqual(true);

      component.updateParents();

      expect(parent.selected).toEqual(undefined);
      expect(parent.indeterminate).toEqual(true);
    });
  });
  describe('function: getSelectedValue', () => {
    it('should return indeterminate if one value is selected', () => {
      const childArray = [{ id: 1, name: 'Scout', selected: true }, { id: 2, name: 'Atticus' }];
      const result = component.getSelectedState(childArray);
      expect(result).toEqual('indeterminate');
    });
    it('should return selected if every element of the child array is selected', () => {
      const childArray = [{ id: 1, name: 'Scout', selected: true }, { id: 2, name: 'Atticus', selected: true }];
      const result = component.getSelectedState(childArray);
      expect(result).toEqual('selected');
    });
    it('should return undefined if none of the items in the child array are selected', () => {
      const childArray = [{ id: 1, name: 'Scout' }, { id: 2, name: 'Atticus' }];
      const result = component.getSelectedState(childArray as any);
      expect(result).toEqual(undefined);
    });
  });
  describe('function: updateParents', () => {
    it('should select each item in the quick select group', () => {
      const data = [{ id: 1, name: 'chicken', selected: true }, { id: 2, name: 'goldfish' }];
      const quickSelectItem: TabbedGroupPickerQuickSelect = { childTypeName: 'animals', children: [1], label: 'chicken' };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [
        {
          typeName: 'animals',
          typeLabel: 'Animalz',
          valueField: 'id',
          labelField: 'name',
          data,
        },
      ];

      component.createChildrenReferences();
      expect(quickSelectItem.selected).toEqual(undefined);

      component.updateParents();

      expect(quickSelectItem.selected).toEqual(true);
    });
  });
  describe('function: onItemToggled', () => {
    it('should use an algorithm more efficient than O(MxN^2)', () => {
      // this dataset takes about 3 orders of magnitude longer for MxN^2 vs MxN
      const amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm = 500;
      const children: TabbedGroupPickerSchema['data'] = Array(10000)
        .fill(0)
        .map((n, i) => ({
          value: i,
          label: `child #${i}`,
          selected: true,
        }));
      const childSchema: TabbedGroupPickerSchema = {
        typeLabel: 'child',
        typeName: 'child',
        valueField: 'value',
        labelField: 'label',
        data: children,
      };
      const parentSchemata: TabbedGroupPickerSchema[] = Array(10)
        .fill(0)
        .map(
          (n, i): TabbedGroupPickerSchema => ({
            typeLabel: 'parent',
            typeName: `parent${i}`,
            labelField: `label${i}`,
            valueField: `value${i}`,
            childTypeName: 'child',
            data: Array(10)
              .fill(0)
              .map((nn, ii) => ({
                [`value${i}`]: i,
                [`label${i}`]: i,
                children,
              })),
          }),
        );
      component.schemata = [...parentSchemata, childSchema];
      const firstParent = parentSchemata[0].data[0];
      firstParent.selected = true;

      const start = performance.now();
      component.onItemToggled(firstParent);
      const end = performance.now();

      expect(end - start).toBeLessThan(amountOfTimeInMillisecondsThatIndicatesAGrosslyInefficientAlgorithm);
      const allAreSelected = component.schemata.every((schema) => schema.data.every((datum) => datum.selected));
      expect(allAreSelected).toBe(true);
    });
    it('should select each item in the quick select group', () => {
      const data = [{ id: 1, name: 'chicken', selected: false }, { id: 2, name: 'goldfish', selected: false }];
      const quickSelectItem: TabbedGroupPickerQuickSelect = {
        childTypeName: 'animals',
        children: [data[0]],
        label: 'chicken',
        selected: true,
      };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [{ typeName: 'animals', typeLabel: 'Animalz', valueField: 'id', labelField: 'name', data }];
      const chicken = component.schemata[0].data[0];
      const goldfish = component.schemata[0].data[1];

      expect(chicken.selected).toBeFalsy();

      component.onItemToggled(quickSelectItem as any);

      expect(chicken.selected).toEqual(true);
      expect(goldfish.selected).toEqual(false);
    });
    it('should unselect each item in the quick select group', () => {
      const data = [{ id: 1, name: 'chicken', selected: true }, { id: 2, name: 'goldfish' }];
      const quickSelectItem: TabbedGroupPickerQuickSelect = {
        childTypeName: 'animals',
        children: [data[0]],
        label: 'chicken',
        selected: false,
      };
      component.quickSelectConfig = {
        label: 'Quick Select',
        items: [quickSelectItem],
      };
      component.schemata = [
        {
          typeName: 'animals',
          typeLabel: 'Animalz',
          valueField: 'id',
          labelField: 'name',
          data,
        },
      ];
      const chicken = component.schemata[0].data[0];
      expect(chicken.selected).toEqual(true);

      component.onItemToggled(quickSelectItem as any);

      expect(chicken.selected).toEqual(undefined);
    });
    it('should update the selected status on the schema as well as the display data', () => {
      component.schemata = [getChickenSchema()];
      component.ngOnInit();
      const chicken = component.schemata[0].data[0];
      chicken.selected = true;

      component.onItemToggled(chicken);

      const selectedItem = component.schemata[0].data[0];
      const displayReference = component.displaySchemata.find(({ typeName }) => typeName === 'chickens').data[0];

      expect(selectedItem.selected).toEqual(true);
      expect(displayReference.selected).toEqual(true);
      expect(selectedItem).toEqual(displayReference);
    });
    it('should update the selected status of a group to indeterminate if an item in the group is selected but others are not', () => {
      const dinosaurs = [
        {
          id: 5,
          name: 'Allosaurus',
          children: [{ chickenId: 3, bwaack: 'bwock?' }, { chickenId: 4, bwaack: 'tweeet' }],
        },
      ];
      component.schemata = [
        getChickenSchema(),
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: dinosaurs,
        },
      ];
      const chicken = component.schemata[0].data[0];
      chicken.selected = true;

      component.createChildrenReferences();
      component.onItemToggled(chicken);

      const selectedItem = component.schemata[0].data[0];
      expect(selectedItem.selected).toEqual(true);

      const indeterminateGroup = component.schemata[1].data[0];
      expect(indeterminateGroup.selected).toBeFalsy();
      expect(indeterminateGroup['indeterminate']).toEqual(true);
    });
    it('should update the selected status of a group if the only item in the group is selected', () => {
      const chickenSchema = getChickenSchema();
      const dinosaur = { id: '1', name: 'Tyrannosaurus', children: [chickenSchema.data[0]] };
      component.schemata = [
        chickenSchema,
        {
          typeName: 'dinosaurs',
          typeLabel: 'Dinosaurs',
          valueField: 'id',
          labelField: 'name',
          childTypeName: 'chickens',
          data: [dinosaur],
        },
      ];
      const chicken = component.schemata[0].data[0];
      chicken.selected = true;
      const tRex = component.schemata[1].data[0];

      component.onItemToggled(chicken);
      expect(tRex.selected).toEqual(true);
    });
  });
});
