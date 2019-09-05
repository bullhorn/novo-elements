import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export type TabbedGroupPickerSchema<N extends string, V extends string, L extends string, R = never> = {
  typeName: N;
  typeLabel: string;
  valueField: V;
  labelField: L;
  childTypeName?: R extends TabbedGroupPickerSchema<infer NN, infer VV, infer LL, infer RR> ? NN : never;
  data: SelectableItem<V, L, R>[];
};

export type SelectableItem<V extends string, L extends string, R = never> = { [key in V | L]: string } & {
  selected?: boolean;
  indeterminate?: boolean;
  children?: R extends TabbedGroupPickerSchema<infer N, infer VV, infer LL, infer RR> ? SelectableItem<VV, LL, RR>[] : never;
};

type Dinosaurs = TabbedGroupPickerSchema<'dinosaurs', 'id', 'name', Chickens>;

const dinos: Dinosaurs = {
  typeName: 'dinosaurs',
  typeLabel: 'Dinosaurs',
  childTypeName: 'chickens',
  valueField: 'id',
  labelField: 'name',
  data: [{ name: 'Tyrannosaurus', id: '5', children: [{ chickenId: '11', bwaack: 'bwock?' }] }, { name: 'Velociraptor', id: '6' }],
};
type Chickens = TabbedGroupPickerSchema<'chickens', 'chickenId', 'bwaack', {}>;

type SchemaDictionary<S> = { [key in DistributeTypeName<S>]: DistributeData<S> };

type Keyify<U> = U extends PropertyKey ? U : never;
type DistributeTypeName<U> = Keyify<U extends { typeName: infer K } ? K : never>;
type DistributeData<U> = U extends { data: SelectableItem<infer V, infer L, infer R>[] } ? SelectableItem<V, L, R>[] : never;

type InferredSchema<S> = S extends TabbedGroupPickerSchema<infer N, infer V, infer L, infer R>
  ? TabbedGroupPickerSchema<N, V, L, R>
  : never;
type InferredSelectableItem<S> = S extends TabbedGroupPickerSchema<infer N, infer V, infer L, infer R> ? SelectableItem<V, L, R> : never;
export type TabbedGroupPickerQuickSelect = {
  typeName: string;
  label: string;
  active?: boolean;
  all?: boolean;
  values?: any[];
};

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
})
export class NovoTabbedGroupPickerElement<S> implements OnInit {
  @Input() buttonConfig: {
    theme: string;
    side: string;
    icon: string;
    label: string;
  };
  @Input() schemata: InferredSchema<S>[];
  @Input() quickSelectConfig: { label: string; items: TabbedGroupPickerQuickSelect[] };
  displayData: SchemaDictionary<S>;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  activeSchema: S extends TabbedGroupPickerSchema<infer N, infer V, infer L, infer R> ? TabbedGroupPickerSchema<N, V, L, R> : never;
  filterText: BehaviorSubject<string> = new BehaviorSubject('');
  searchLabel: string = 'Search';

  loading = true;

  constructor(public labelService: NovoLabelService) {}

  ngOnInit(): void {
    this.validateData();
    this.filter('');
    if (this.quickSelectConfig) {
      this.validateQuickSelectConfig();
    }
    this.setActiveSchema(this.schemata[0]);
    this.loading = false;
    this.filterText.pipe(debounceTime(300)).subscribe({
      next: this.filter,
    });
  }

  setActiveSchema(newActiveSchema) {
    this.activeSchema = newActiveSchema;
  }

  validateData() {
    let warning = '';
    this.schemata.forEach((schema) => {
      // if (this.data[schema.typeName] === undefined) {
      //   warning += `Property ${schema.typeName} is missing from data.\n`;
      // } else if (!Array.isArray(this.data[schema.typeName])) {
      //   warning += `data.${schema.typeName} is not an array.\n`;
      // } else {
      //   if (this.data[schema.typeName].some((item) => !(schema.valueField in item))) {
      //     warning += `At least one item in data.${schema.typeName} is missing the ${schema.valueField} property.\n`;
      //   }
      //   if (this.data[schema.typeName].some((item) => !(schema.labelField in item))) {
      //     warning += `At least one item in data.${schema.typeName} is missing the ${schema.labelField} property.\n`;
      //   }
      // }
    });
    if (warning) {
      console.warn(`TabbedGroupPicker data validation warning:\n${warning}`);
    }
  }

  validateQuickSelectConfig() {
    let warning = '';
    if (!('items' in this.quickSelectConfig)) {
      warning += `Invalid quick select: required field 'items' is not defined.\n`;
    } else if (!Array.isArray(this.quickSelectConfig.items)) {
      warning += `Invalid quick select: 'items' is not an array.\n`;
    } else if (!this.quickSelectConfig.items.length) {
      warning += `Invalid quick select: 'items' is empty.\n`;
    } else {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        let quickSelectIdentifier = '(Invalid quickSelect)';
        if (!quickSelect.typeName) {
          warning += `Invalid typeName: required field 'typeName' is not defined.\n`;
        } else if (!quickSelect.label) {
          warning += `Invalid label: required field 'label' is not defined.\n`;
        } else {
          quickSelectIdentifier = `${quickSelect.label} (${quickSelect.typeName})`;
        }
        const schema = this.schemata.find((schemaItem) => quickSelect.typeName === schemaItem.typeName);
        if (!schema) {
          warning += `Invalid typeName for ${quickSelectIdentifier} config: ${
            quickSelect.typeName
          } is not present in any configured typeSchema.\n`;
        }
        if ('values' in quickSelect && 'all' in quickSelect) {
          warning += `Invalid properties for ${quickSelectIdentifier} config: only one of 'values' and 'all' is allowed.\n`;
        } else if (!('values' in quickSelect) && !('all' in quickSelect)) {
          warning += `Invalid properties for ${quickSelectIdentifier} config: either 'values' or 'all' is required.\n`;
        }
        if ('values' in quickSelect) {
          // if (!Array.isArray(quickSelect.values)) {
          //   warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property is not an array.\n`;
          // } else if (!Array.isArray(quickSelect.values)) {
          //   warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property contains no values.\n`;
          // } else if (
          //   !quickSelect.values.every((quickSelectValue) =>
          //     this.data[schema.typeName].some((dataItem) => dataItem[schema.valueField] === quickSelectValue),
          //   )
          // ) {
          //   warning += `Invalid value for ${quickSelectIdentifier} config: at least one value in values is not present in any item in data.${
          //     schema.typeName
          //   }\n`;
          // }
        }
      });
    }
    if (warning) {
      console.warn(`TabbedGroupPicker quickSelect validation warning:\n${warning}`);
    }
  }

  onDataListItemClicked(activeSchema: { typeName: string; valueField: string }, item: { selected?: boolean } & object) {
    item.selected ? delete item.selected : (item.selected = true);
    this.onItemToggled(activeSchema);
  }

  onItemToggled(schema: { typeName: string; valueField: string }) {
    if (this.quickSelectConfig) {
      this.updateQuickSelectCheckboxes(schema);
    }
    this.updateParents();
    this.emitSelectedValues();
  }

  updateParents(): void {
    this.schemata = this.schemata.map(
      (schema): InferredSchema<S> => {
        const { childTypeName, data } = schema;
        if (!childTypeName) {
          return schema as InferredSchema<S>;
        }
        return {
          ...schema,
          data: data.map(({ selected: previousValue, ...item }) => {
            const [key, value] = this.getSelectedValue(
              this.schemata.find(({ typeName: childName }) => childName === childTypeName).data,
            );
            return {
              ...item,
              ...(key ? { [key]: value } : {}),
            };
          }),
        } as InferredSchema<S>;
      },
    );
  }

  getSelectedValue = (childArray: { selected?: boolean, indeterminate?: boolean }[]): ['selected' | 'indeterminate', boolean] | [] => {
    const numberOfSelectedItems = childArray.filter(({selected}) => selected).length;
    if (!numberOfSelectedItems) {
      return [];
    }
    return numberOfSelectedItems === childArray.length ? ['selected', true] : ['indeterminate', true];
  };

  onQuickSelectListItemClicked(quickSelect: TabbedGroupPickerQuickSelect) {
    quickSelect.active = !quickSelect.active;
    this.onQuickSelectToggled(quickSelect);
  }

  onQuickSelectToggled(quickSelect: TabbedGroupPickerQuickSelect) {
    const schema = this.schemata.find((schemaItem) => quickSelect.typeName === schemaItem.typeName);

    schema.data = schema.data.map(
      (item: InferredSelectableItem<S>): InferredSelectableItem<S> => {
        if (quickSelect.all || quickSelect.values.includes(item[schema.valueField])) {
          const { selected, indeterminate, ...unselectedItem } = item;
          return {
            ...unselectedItem,
            ...(quickSelect.active ? { selected: true } : {}),
          } as InferredSelectableItem<S>;
        } else {
          return item;
        }
      },
    );
    // reconstruct displayData from new version of schema.data
    this.filterText.subscribe({
      next: this.filter
    });

    this.onItemToggled(schema);
  }

  updateQuickSelectCheckboxes(activeSchema: { typeName: string; valueField: string }) {
    const relevantQuickSelects = this.quickSelectConfig.items.filter(({typeName}) => activeSchema.typeName === typeName);
    relevantQuickSelects.forEach((quickSelect) => {
      let itemsToCheck = this.schemata.find(({ typeName }) => typeName === activeSchema.typeName).data;
      if (!quickSelect.all) {
        quickSelect.active = itemsToCheck.filter((item) => quickSelect.values.includes(item[activeSchema.valueField])).every(({selected}) => selected);
      }
      quickSelect.active = itemsToCheck.every(({selected}) => selected);
    });
  }

  emitSelectedValues() {
    this.selectionChange.emit(this.getSelectedValues());
  }

  getSelectedValues = () =>
    this.schemata.reduce(
      (prev, { typeName, valueField, data }) => ({
        ...prev,
        [typeName]: data.filter(({ selected }) => selected).map((item) => item[valueField]),
      }),
      {},
    );

  onClearFilter(event) {
    Helpers.swallowEvent(event); // dunno if this is necessary
    this.filterText.next('');
  }

  onFilter(event: { target: { value: string } }) {
    this.filterText.next(event.target.value);
  }

  filter = (searchTerm: string) =>
    (this.displayData = this.schemata.reduce(
      (accumulator: SchemaDictionary<S>, { labelField, typeName, data }: InferredSchema<S>): SchemaDictionary<S> =>
        ({
          ...accumulator,
          [typeName]: data && data.filter((item: InferredSelectableItem<S>) => item[labelField].toLowerCase().includes(searchTerm.toLowerCase())),
        } as SchemaDictionary<S>),
      {} as SchemaDictionary<S>,
    ));
}
