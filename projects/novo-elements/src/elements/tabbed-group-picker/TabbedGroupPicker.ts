import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';

export type TabbedGroupPickerSchema = {
  typeName: string;
  typeLabel: string;
  valueField: string;
  labelField: string;
} & (
  | {
      childTypeName: string;
      data: Array<
        {
          selected?: boolean;
          indeterminate?: boolean;
          children: Array<{ selected?: boolean } & object>;
        } & object
      >;
    }
  | { data: Array<{ selected?: boolean } & object> });

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

  displaySchema: TabbedGroupPickerSchema;
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
    this.setDisplaySchema(this.schemata[0]);
  }

  setDisplaySchema(newActiveSchema: TabbedGroupPickerSchema) {
    this.displaySchema = newActiveSchema;
  }

  // Replace each parent's child object with a reference to the child in order to avoid duplicating data, since children
  // have a to-many relationship with parents
  createChildrenReferences(): void {
    this.schemata.forEach((schema) => {
      // would rather filter but TypeScript stills wants a type narrowing here
      if ('childTypeName' in schema) {
        const { childTypeName, data } = schema;
        const childSchema = this.schemata.find(({ typeName }) => typeName === childTypeName);

        data
          .filter(({ children }: { children?: { selected?: boolean }[] }) => children && children.length)
          .forEach(
            (parent: { children?: any[] }) =>
              (parent.children = parent.children.map((child) =>
                childSchema.data.find((item) => item[childSchema.valueField] === child[childSchema.valueField]),
              )),
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
          parent.children = parent.children.map((child) =>
            childSchema.data.find((item) =>
              child[childSchema.valueField]
                ? child[childSchema.valueField] === item[childSchema.valueField]
                : (child as any) === item[childSchema.valueField],
            ),
          );
        });
    }
  }

  onDataListItemClicked(item: { selected?: boolean; children?: Array<{ selected?: boolean }> }) {
    this.onItemToggled(item);
  }

  onItemToggled(item: { selected?: boolean; children?: Array<{ selected?: boolean }> }) {
    item.children && this.updateChildren(item.selected, item.children);
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
        const [key, value] = this.getSelectedValue(quickSelect.children as ({ selected?: boolean } & object)[]);
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
      data: data.filter((item) => item[schema.labelField].toLowerCase().includes(searchTerm.toLowerCase())),
    })));
}
