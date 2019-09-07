import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export type TabbedGroupPickerSchema<N extends string, V extends string = 'value', L extends string = 'label', R = never> = {
  typeName: N;
  typeLabel: string;
  valueField: V;
  labelField: L;
  data: SelectableItem<V, L, R>[];
  childTypeName?: R extends TabbedGroupPickerSchema<infer NN, infer VV, infer LL> ? NN : never;
};

const dinos: Dinosaurs = {
  typeName: 'dinosaurs',
  typeLabel: 'Dinosaurs',
  childTypeName: 'chickens',
  valueField: 'id',
  labelField: 'name',
  data: [{ name: 'Tyrannosaurus', id: '5', children: [{ chickenId: '11', bwaack: 'bwooock?' }] }, { name: 'Velociraptor', id: '6' }],
};
export type SelectableItem<V extends string, L extends string, R = never> = { [key in V]: string | number } &
  { [key in L]: string } & {
    selected?: boolean;
    indeterminate?: boolean;
    children?: R extends TabbedGroupPickerSchema<infer N, infer VV, infer LL, R> ? SelectableItem<VV, LL>[] : never;
  };

type Dinosaurs = TabbedGroupPickerSchema<'dinosaurs', 'id', 'name', Chickens>;
type Chickens = TabbedGroupPickerSchema<'chickens', 'chickenId', 'bwaack', {}>;

type SchemaDictionary<S> = { [key in DistributeTypeName<S>]: DistributeData<S> };

type Keyify<U> = U extends PropertyKey ? U : never;
type DistributeTypeName<U> = Keyify<U extends { typeName: infer K } ? K : never>;
type DistributeData<U> = U extends { data: SelectableItem<infer V, infer L, infer R>[] } ? SelectableItem<V, L, R>[] : never;

export type InferredSchema<S> = S extends TabbedGroupPickerSchema<infer N, infer V, infer L, infer R>
  ? TabbedGroupPickerSchema<N, V, L, R>
  : never;
type InferredSelectableItem<S> = S extends TabbedGroupPickerSchema<infer N, infer V, infer L, infer R> ? SelectableItem<V, L, R> : never;
export type TabbedGroupPickerQuickSelect = {
  label: string;
  selected?: boolean;
  childTypeName: string;
} & (
  | {
      all: boolean;
      children?: { selected?: boolean; [key: string]: any }[];
    }
  | {
      children: { selected?: boolean; [key: string]: any }[];
    });

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
})
export class NovoTabbedGroupPickerElement<S = TabbedGroupPickerSchema<'items'>> implements OnInit {
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
    this.setActiveSchema(this.schemata[0]);
    this.createChildrenReferences();
    this.filter('');
    if (this.quickSelectConfig) {
      this.validateQuickSelectConfig();
    }
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
      // this.quickSelectConfig.items.forEach((quickSelect: TabbedGroupPickerQuickSelect) => {
      //   let quickSelectIdentifier = '(Invalid quickSelect)';
      //   if ('childTypeName' in quickSelect) {
      //     if (!quickSelect.childTypeName) {
      //       warning += `Invalid typeName: required field 'typeName' is not defined.\n`;
      //     } else if (!quickSelect.label) {
      //       warning += `Invalid label: required field 'label' is not defined.\n`;
      //     } else {
      //       quickSelectIdentifier = `${quickSelect.label} (${quickSelect.childTypeName})`;
      //     }
      //     const schema = this.schemata.find((schemaItem) => quickSelect.childTypeName === schemaItem.typeName);
      //     if (!schema) {
      //       warning += `Invalid typeName for ${quickSelectIdentifier} config: ${
      //         quickSelect.childTypeName
      //       } is not present in any configured typeSchema.\n`;
      //     }
      //     if ('children' in quickSelect) {
      //       if (!Array.isArray(quickSelect.children)) {
      //         warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property is not an array.\n`;
      //       } else if (quickSelect.children.length === 0) {
      //         warning += `Invalid values for ${quickSelectIdentifier} config:  'values' property contains no values.\n`;
      //       } else if (
      //         !quickSelect.children.every((quickSelectValue) =>
      //           schema.data.some((dataItem) => dataItem[schema.valueField] === quickSelectValue[schema.valueField]),
      //         )
      //       ) {
      //         warning += `Invalid value for ${quickSelectIdentifier} config: at least one value in values is not present in any item in data.${
      //           schema.typeName
      //         }\n`;
      //       }
      //     }
      //   } else if (!('all' in quickSelect)) {
      //     warning += `Invalid quick select item: neither 'all', 'children', or 'childTypeName' are defined`;
      //   }
      //   if ('values' in quickSelect && 'all' in quickSelect) {
      //     warning += `Invalid properties for ${quickSelectIdentifier} config: only one of 'values' and 'all' is allowed.\n`;
      //   } else if (!('values' in quickSelect) && !('all' in quickSelect)) {
      //     warning += `Invalid properties for ${quickSelectIdentifier} config: either 'values' or 'all' is required.\n`;
      //   }
      // });
    }
    if (warning) {
      console.warn(`TabbedGroupPicker quickSelect validation warning:\n${warning}`);
    }
  }

  createChildrenReferences(): void {
    this.schemata
      .filter(({ childTypeName }) => !!childTypeName)
      .forEach(({ data, childTypeName }) => {
        const childSchema = this.schemata.find(({ typeName }) => typeName === childTypeName);

        data
          .filter(({ children }: { children?: { selected?: boolean }[] }) => children && children.length)
          .forEach(
            (parent: { children?: any[] }) =>
              (parent.children = parent.children.map((child) =>
                childSchema.data.find((item) => item[childSchema.valueField] === child[childSchema.valueField]),
              )),
          );
      });
    if (this.quickSelectConfig) {
      this.quickSelectConfig.items
        .filter((parent) => 'all' in parent)
        .forEach((parent) => {
          parent.children = this.schemata.find(({ typeName }) => parent.childTypeName === typeName).data;
        });

      this.quickSelectConfig.items
        .filter((parent) => !('all' in parent))
        .forEach((parent) => {
          if (!('all' in parent)) {
            const childSchema = this.schemata.find(({ typeName }) => typeName === parent.childTypeName);
            parent.children = parent.children.map((child) =>
              childSchema.data.find((item) =>
                child[childSchema.valueField]
                  ? child[childSchema.valueField] === item[childSchema.valueField]
                  : (child as any) === item[childSchema.valueField],
              ),
            );
          }
        });
    }
  }

  onDataListItemClicked(item: { selected?: boolean; children?: { selected?: boolean }[] }) {
    this.onItemToggled(item);
  }

  onItemToggled(item: { selected?: boolean; children?: { selected?: boolean }[] }) {
    item.children && this.updateChildren(item.selected, item.children);
    this.updateParents();
    this.emitSelectedValues();
  }

  updateChildren(parentIsSelected: boolean, children: { selected?: boolean }[]): void {
    children.forEach((item) => (parentIsSelected ? (item.selected = true) : delete item.selected));
  }

  updateParents(): void {
    this.schemata
      .filter(({ childTypeName }) => !!childTypeName)
      .forEach(({ data }) => {
        data
          .filter(({ children }: { children?: any[] }) => children && children.length)
          .forEach((parent: { children?: { selected?: boolean }[] }) => {
            ['indeterminate', 'selected'].forEach((v) => delete parent[v]);

            const [key, value] = this.getSelectedValue(parent.children);
            key && (parent[key] = value);
          });
      });

    if (this.quickSelectConfig) {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        delete quickSelect.selected;
        const [key, value] = this.getSelectedValue(quickSelect.children);
        key && (quickSelect[key] = value);
      });
    }
  }

  getSelectedValue = (childArray: { selected?: boolean; indeterminate?: boolean }[]): ['selected' | 'indeterminate', boolean] | [] => {
    const numberOfSelectedItems = childArray.filter(({ selected }) => selected).length;
    if (!numberOfSelectedItems) {
      return [];
    }
    return numberOfSelectedItems === childArray.length ? ['selected', true] : ['indeterminate', true];
  };

  emitSelectedValues() {
    const selectedValues = this.schemata.reduce(
      (prev, { typeName, valueField, data }) => ({
        ...prev,
        [typeName]: data.filter(({ selected }) => selected).map((item) => item[valueField]),
      }),
      {},
    );
    this.selectionChange.emit(selectedValues);
  }

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
          [typeName]:
            data && data.filter((item: InferredSelectableItem<S>) => item[labelField].toLowerCase().includes(searchTerm.toLowerCase())),
        } as SchemaDictionary<S>),
      {} as SchemaDictionary<S>,
    ));
}
