import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers, binarySearch } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export type TabbedGroupPickerSchema = {
  typeName: string;
  typeLabel: string;
  valueField: string;
  labelField: string;
} & (ParentSchema | ChildSchema);
export type ParentSchema = {
  childTypeName: string;
  data: Array<ParentOption>;
};

type ParentOption = {
  selected?: boolean;
  indeterminate?: boolean;
  children: Array<{ selected?: boolean }>;
} & { [key: string]: any };
export type ChildSchema = { data: Array<{ selected?: boolean } & { [key: string]: any }> };
export type TabbedGroupPickerQuickSelect = {
  label: string;
  selected?: boolean;
  childTypeName?: string;
  children?: (({ selected?: boolean } & object) | (number))[];
  all?: boolean;
};

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
})
export class NovoTabbedGroupPickerElement implements OnInit {
  @Input() buttonConfig: {
    theme: string;
    side: string;
    icon: string;
    label: string;
  };
  @Input() schemata: TabbedGroupPickerSchema[];
  @Input() quickSelectConfig: { label: string; items: TabbedGroupPickerQuickSelect[] };
  displaySchemata: TabbedGroupPickerSchema[];

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  displaySchemaIndex: number;

  get displaySchema(): TabbedGroupPickerSchema {
    return this.displaySchemata[this.displaySchemaIndex];
  }
  set displaySchema(schema: TabbedGroupPickerSchema) {
    this.displaySchemaIndex = this.schemata.map(({ typeName }) => typeName).indexOf(schema.typeName);
  }

  filterText: BehaviorSubject<string> = new BehaviorSubject('');
  searchLabel: string = 'Search';

  loading = true;

  constructor(public labelService: NovoLabelService) {}

  ngOnInit(): void {
    this.setupDisplayData();
    this.createChildrenReferences();

    this.loading = false;
    this.filterText.pipe(debounceTime(300)).subscribe({
      next: this.filter,
    });
  }

  setupDisplayData(): void {
    this.displaySchemata = this.schemata;
    this.displaySchema = this.schemata[0];
  }

  // Replace each parent's child object with a reference to the child to avoid
  // a child lookup for selected status; linking references gets M x N
  // time complexity instead of M x N^2, which in practice is 2 orders of magnitude
  // difference in time.
  createChildrenReferences(): void {
    this.schemata.forEach((schema) => {
      // would rather filter but TypeScript still wants a type narrowing here
      if ('childTypeName' in schema) {
        const { childTypeName, data } = schema;
        const childSchema = this.schemata.find(({ typeName }) => typeName === childTypeName);
        const compareFunction = this.makeCompareFunction(childSchema.valueField);
        const sortedChildren = childSchema.data.slice().sort(compareFunction);

        data
          .filter(({ children }) => children && children.length)
          .forEach((parent: { children?: any[] }) =>
            this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction),
          );
      }
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
          const childSchema = this.schemata.find(({ typeName }) => typeName === parent.childTypeName);
          const compareFunction = this.makeCompareFunction(childSchema.valueField);
          const sortedChildren = childSchema.data.slice().sort(compareFunction);
          this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction);
        });
    }
  }

  makeCompareFunction<T>(key: string): (a: T | { [key: string]: T }, b: { [key: string]: T }) => 1 | -1 | 0 {
    return (a: T | { [key: string]: T }, b: { [key: string]: T }) => {
      const value: T = a[key] || a;

      if (value < b[key]) {
        return -1;
      } else if (value > b[key]) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  replaceChildrenWithReferences(parent: { children: any[] }, sortedData: ChildSchema['data'], compareFunction: (a, b) => 1 | -1 | 0): void {
    parent.children = parent.children.map((child) => binarySearch(child, sortedData, compareFunction));
  }

  onItemToggled(item: { selected?: boolean; children?: Array<{ selected?: boolean }> }) {
    if (Array.isArray(item.children)) {
      this.updateChildren(item.selected, item.children);
    }
    this.updateParents();
    this.emitSelectedValues();
  }

  updateChildren(parentIsSelected: boolean, children: { selected?: boolean }[]): void {
    children.forEach((item) => (parentIsSelected ? (item.selected = true) : delete item.selected));
  }

  updateParents(): void {
    // mutate here to avoid dereferencing the objects in displaySchemata
    this.schemata
      .filter((schema) => 'childTypeName' in schema && !!schema.childTypeName)
      .forEach((schema) => {
        const parents = schema.data.filter(({ children }: { children?: any[] }) => children && children.length);

        parents.forEach((parent: { children?: { selected?: boolean }[] }) => {
          ['indeterminate', 'selected'].forEach((v) => delete parent[v]);

          const selectedState = this.getSelectedState(parent.children);
          if (selectedState) {
            parent[selectedState] = true;
          }
        });
      });

    if (this.quickSelectConfig) {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        delete quickSelect.selected;
        const selectedState = this.getSelectedState(quickSelect.children as ({ selected?: boolean } & object)[]);
        if (selectedState) {
          quickSelect[selectedState] = true;
        }
      });
    }
  }

  getSelectedState = (childArray: { selected?: boolean; indeterminate?: boolean }[]): 'selected' | 'indeterminate' | undefined => {
    const numberOfSelectedItems = childArray.filter(({ selected }) => selected).length;
    if (!numberOfSelectedItems) {
      return undefined;
    }
    return numberOfSelectedItems === childArray.length ? 'selected' : 'indeterminate';
  };

  emitSelectedValues() {
    const selectedValues: TabbedGroupPickerSchema[] = this.schemata.map((schema) => ({
      ...schema,
      data: schema.data.filter(({ selected }) => selected),
    }));
    this.selectionChange.emit(selectedValues);
  }

  onClearFilter(event) {
    Helpers.swallowEvent(event);
    this.filterText.next('');
  }

  onFilter(event: { target: { value: string } }) {
    this.filterText.next(event.target.value);
  }

  filter = (searchTerm: string) =>
    (this.displaySchemata = this.schemata.map(({ data, ...schema }: TabbedGroupPickerSchema) => ({
      ...schema,
      data: data && data.filter((item) => item[schema.labelField].toLowerCase().includes(searchTerm.toLowerCase())),
    })));
}
