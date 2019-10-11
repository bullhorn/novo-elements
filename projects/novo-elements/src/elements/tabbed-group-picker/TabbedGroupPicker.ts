import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Helpers, binarySearch } from '../../utils/Helpers';
import { NovoLabelService } from '../../services/novo-label-service';
import { ScrollDispatcher, CdkScrollable, ExtendedScrollToOptions } from '@angular/cdk/scrolling';

export type TabbedGroupPickerSchema = {
  typeName: string;
  typeLabel: string;
  valueField: string;
  labelField: string;
  scrollOffset?: number;
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

export type QuickSelectConfig = { label: string; items: TabbedGroupPickerQuickSelect[] };

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoTabbedGroupPickerElement implements OnInit, AfterViewInit {
  @Input() buttonConfig: {
    theme: string;
    side: string;
    icon: string;
    label: string;
  };
  @Input() schemata: TabbedGroupPickerSchema[];
  @Input() quickSelectConfig: QuickSelectConfig;

  @Input() title: string = 'tabbed-group-picker'; // need unique information in order to find scroll container from scroll dispatcher
  displaySchemata: TabbedGroupPickerSchema[];

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  displaySchemaIndex: number = 0;
  scrollableInstance: CdkScrollable;

  get displaySchema(): TabbedGroupPickerSchema {
    return this.displaySchemata[this.displaySchemaIndex];
  }
  set displaySchema(schema: TabbedGroupPickerSchema) {
    this.displaySchemaIndex = this.schemata.map(({ typeName }) => typeName).indexOf(schema.typeName);
  }

  get viewportClass(): string {
    return `virtual-scroll-viewport ${this.title}`;
  }

  filterText: BehaviorSubject<string> = new BehaviorSubject('');

  loading = true;

  showClearAll: boolean = false;

  constructor(public labelService: NovoLabelService, public scrollDispatch: ScrollDispatcher, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setupDisplayData();
    this.createChildrenReferences();

    this.loading = false;
    this.filterText.pipe(debounceTime(300)).subscribe({
      next: this.filter,
    });
  }

  ngAfterViewInit(): void {
    this.scrollableInstance = [...this.scrollDispatch.scrollContainers.keys()].find((scrollable) =>
      scrollable.getElementRef().nativeElement.classList.contains(this.title),
    );
  }

  changeTab(schema: TabbedGroupPickerSchema) {
    this.schemata[this.displaySchemaIndex].scrollOffset = this.scrollableInstance.measureScrollOffset('top');
    this.displaySchema = schema;
    const offset = this.schemata[this.displaySchemaIndex].scrollOffset || 0;
    const options: ExtendedScrollToOptions = { behavior: 'auto', top: offset };
    this.scrollableInstance.scrollTo(options);
  }

  get virtualScrollItemSize() {
    const em = 3.1; // this corresponds to TabbedGroupPicker.scss .tabbed-group-picker-column-container.tabbed-group-picker-column &.right novo-list-item.height
    const defaultFontSize = 16; // fingers crossed
    const element = document.getElementById('tabbed-group-picker-viewport');
    const emSizeInPixels = element ? this.getEmSize(element) : defaultFontSize;
    return em * emSizeInPixels;
  }

  get minBufferPx() {
    const em = 27; // this corresponds to the height of the list;
    const defaultFontSize = 16;
    const element = document.getElementById('tabbed-group-picker-viewport');
    const emSizeInPixels = element ? this.getEmSize(element) : defaultFontSize;
    return 3 * em * emSizeInPixels;
  }

  get maxBufferPx() {
    return 2 * this.minBufferPx;
  }
  getEmSize(el: HTMLElement) {
    return Number(getComputedStyle(el, '').fontSize.match(/(\d+(\.\d+)?)px$/)[1]);
  }

  setupDisplayData(): void {
    // shallow copy here so that reassigning displaySchemata[i].data doesn't mutate schemata[i].data
    // but both data values point to the same items
    this.displaySchemata = this.schemata.map((schema) => ({...schema}));
    this.displaySchema = this.schemata[0];
  }

  // Replace each parent's child object with a reference to the child to avoid
  // a child lookup for selected status; linking references allows M x N
  // time complexity instead of M x N^2
  createChildrenReferences(): void {
    this.schemata.forEach((schema) => {
      // would rather filter but TypeScript still wants a type narrowing here
      if ('childTypeName' in schema) {
        const childSchema = this.schemata.find(({ typeName }) => typeName === schema.childTypeName);
        const compareFunction = this.makeCompareFunction(childSchema.valueField);
        const warnFunction = this.makeWarningFunction(schema.typeName, childSchema.typeName, childSchema.valueField);
        const sortedChildren = childSchema.data.slice().sort(compareFunction);

        schema.data
          .filter(({ children }) => children && children.length)
          .forEach((parent: { children?: any[] }) =>
            this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction, warnFunction),
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
          const warnFunction = this.makeWarningFunction(parent.label, childSchema.typeName, childSchema.valueField);
          const sortedChildren = childSchema.data.slice().sort(compareFunction);

          this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction, warnFunction);
        });
    }
  }

  makeCompareFunction<T>(key: string): (a: T | { [key: string]: T }, b: { [key: string]: T }) => 1 | -1 | 0 | undefined {
    return (a: T | { [key: string]: T }, b: { [key: string]: T }) => {
      const value: T = (a && a[key]) || a;

      if (value < b[key]) {
        return -1;
      } else if (value > b[key]) {
        return 1;
      } else if (value === b[key]) {
        return 0;
      } else {
        return undefined;
      }
    };
  }

  replaceChildrenWithReferences(
    parent: { children: any[] },
    sortedData: ChildSchema['data'],
    compareFunction: (a, b) => 1 | -1 | 0,
    warnFunction: (child) => void,
  ): void {
    parent.children = parent.children
      .map((child) => binarySearch(child, sortedData, compareFunction) || warnFunction(child))
      .filter(Boolean); // since map can return undefined, remove undefined elements
  }

  makeWarningFunction(parentLabel: string, childLabel: string, childValueField): (child) => void {
    return (child) => {
      const childValue = child[childValueField] || child;
      console.warn(`No ${childLabel} found with value ${childValue} for parent ${parentLabel}`);
    };
  }

  onItemToggled(item: { selected?: boolean; children?: Array<{ selected?: boolean }> }) {
    if (Array.isArray(item.children)) {
      this.updateChildren(item.selected, item.children);
    }
    this.updateParents();
    this.updateClearAll(item.selected);
    this.emitSelectedValues();
    this.ref.markForCheck();
  }

  updateClearAll(itemWasJustSelected?: boolean) {
    if (itemWasJustSelected) {
      this.showClearAll = true;
    } else {
      return this.schemata.some((schema) => {
        if ((schema as ParentSchema).childTypeName) {
          return schema.data.some(({ selected, indeterminate }) => selected || indeterminate);
        } else {
          return schema.data.some(({ selected }) => selected);
        }
      });
    }
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

  deselectEverything(event) {
    Helpers.swallowEvent(event);
    this.showClearAll = false;
    if (this.quickSelectConfig) {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        delete quickSelect.selected;
      });
    }
    this.schemata.forEach((schema) => {
      if ((schema as ParentSchema).childTypeName) {
        schema.data.forEach((item) => {
          delete item.selected;
          delete item.indeterminate;
          item.children.forEach((child) => delete child.selected);
        });
      } else {
        (schema as ChildSchema).data.forEach((item) => delete item.selected);
      }
    });
  }

  onClearFilter(event) {
    Helpers.swallowEvent(event);
    this.filterText.next('');
  }

  onFilter(event: { target: { value: string } }) {
    this.filterText.next(event.target.value);
  }

  filter = (searchTerm: string) => {
    this.displaySchemata.forEach(
      (displaySchema, i) =>
        (displaySchema.data = this.schemata[i].data.filter((item) =>
          item[displaySchema.labelField].toLowerCase().includes(searchTerm.toLowerCase()),
        )),
    );
    this.ref.markForCheck();
  };
}
