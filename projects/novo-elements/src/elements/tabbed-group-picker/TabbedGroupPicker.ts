import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NovoLabelService } from 'novo-elements/services';
import { binarySearch, BooleanInput, Helpers } from 'novo-elements/utils';
import { NOVO_OPTION_PARENT_COMPONENT } from 'novo-elements/elements/common';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';

export type TabbedGroupPickerTab = {
  typeName: string;
  typeLabel: string;
  valueField: string;
  labelField: string;
  scrollOffset?: number;
  icon?: string;
} & (ParentTab | ChildTab);

export type ParentTab = {
  childTypeName: string;
  data: Array<ParentOption>;
};

type BaseOption = {
  selected?: boolean;
  indeterminate?: boolean;
} & { [key: string]: any };

type ParentOption = BaseOption & {
  children: Option[];
};

type Option = BaseOption | ParentOption;

export type ChildTab = {
  data: Array<{ selected?: boolean } & { [key: string]: any }>;
};

export type TabbedGroupPickerQuickSelect = {
  label: string;
  selected?: boolean;
  childTypeName?: string;
  children?: (({ selected?: boolean } & { [key: string]: any }) | number)[];
  all?: boolean;
};

export type QuickSelectConfig = { label: string; items: TabbedGroupPickerQuickSelect[] };

export type TabbedGroupPickerButtonConfig = {
  theme: string;
  side: string;
  icon: string;
  label: string;
};

@Component({
  selector: 'novo-tabbed-group-picker',
  templateUrl: './TabbedGroupPicker.html',
  styleUrls: ['./TabbedGroupPicker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoTabbedGroupPickerElement }],
})
export class NovoTabbedGroupPickerElement implements OnDestroy, OnInit {
  @ViewChild('tabbedGroupPickerVirtualScrollViewport')
  private scrollableInstance: CdkScrollable;
  @ViewChild('inputElement')
  private inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('dropdown')
  public dropdown: NovoDropdownElement;

  multiple = true;

  @Input() buttonConfig: TabbedGroupPickerButtonConfig;
  @Input() tabs: TabbedGroupPickerTab[];
  @Input() quickSelectConfig: QuickSelectConfig;
  @Input() showFooter = false;

  // In activation mode, no checkboxes are displayed, and only the selectionActivated event occurs.
  @BooleanInput()
  @Input() selectionEnabled = true;

  @Output() activation = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<TabbedGroupPickerTab[]>();
  @Output() applyChange: EventEmitter<any> = new EventEmitter<any>();

  displayTabs: TabbedGroupPickerTab[];
  displayTabIndex: number = 0;

  filterText: BehaviorSubject<string> = new BehaviorSubject('');
  filterTextSubscription: Subscription;

  loading = true;
  showClearAll: boolean = false;

  appliedState: TabbedGroupPickerTab[];

  // Initial height based on 13 px font rendered in chrome. Actual height retrieved onDropdownToggled.
  scrollViewportHeight: number = 351;
  virtualScrollItemSize: number = 39;

  constructor(public labelService: NovoLabelService, private ref: ChangeDetectorRef) {}

  get displayTab(): TabbedGroupPickerTab {
    return this.displayTabs[this.displayTabIndex];
  }
  set displayTab(tab: TabbedGroupPickerTab) {
    this.displayTabIndex = this.tabs.map(({ typeName }) => typeName).indexOf(tab.typeName);
  }

  get minBufferPx() {
    return this.scrollViewportHeight; // render at least 2x the number of items visible (viewport + min buffer)
  }

  get maxBufferPx() {
    return 2 * this.scrollViewportHeight; // render at most 3x the number of items visible (viewport + max buffer)
  }

  ngOnInit(): void {
    this.loadValues();
    this.loading = false;
    this.filterTextSubscription = this.filterText.pipe(debounceTime(300)).subscribe({
      next: this.filter,
    });
  }

  ngOnDestroy(): void {
    if (this.filterTextSubscription) {
      this.filterTextSubscription.unsubscribe();
    }
  }

  loadValues() {
    this.setupDisplayData();
    this.createChildrenReferences();
    this.initializeDescendantSelection();
    this.updateParentsAndQuickSelect();
    this.updateClearAll();
  }

  changeTab(tab: TabbedGroupPickerTab) {
    this.displayTab = tab;
    if (this.scrollableInstance) {
      this.scrollableInstance.scrollTo({ behavior: 'auto', top: 0 });
    }
  }

  getPixelHeight(element: HTMLElement) {
    return Number(getComputedStyle(element, '').height.match(/(\d+(\.\d+)?)px$/)[1]);
  }

  setupDisplayData(): void {
    // shallow copy here so that reassigning displayTabs[i].data doesn't mutate tabs[i].data
    // but both data values point to the same items
    this.displayTabs = this.tabs.map((tab) => ({ ...tab }));
    this.displayTab = this.tabs[0];
    this.updateAppliedState();
  }

  // Replace each parent's child object with a reference to the child to avoid
  // a child lookup for selected status; linking references allows M x N
  // time complexity instead of M x N^2
  createChildrenReferences(): void {
    this.tabs.forEach((tab) => {
      // would rather filter but TypeScript still wants a type narrowing here
      if ('childTypeName' in tab) {
        const childTab = this.tabs.find(({ typeName }) => typeName === tab.childTypeName);
        const compareFunction = this.makeCompareFunction(childTab.valueField);
        const warnFunction = this.makeWarningFunction(tab.typeName, childTab.typeName, childTab.valueField);
        const sortedChildren = childTab.data.slice().sort(compareFunction);

        tab.data
          .filter(({ children }) => children?.length)
          .forEach((parent: { children?: any[] }) =>
            this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction, warnFunction),
          );
      }
    });
    if (this.quickSelectConfig) {
      this.quickSelectConfig.items
        .filter((parent) => 'all' in parent)
        .forEach((parent) => {
          parent.children = this.tabs.find(({ typeName }) => parent.childTypeName === typeName).data;
        });

      this.quickSelectConfig.items
        .filter((parent) => !('all' in parent))
        .forEach((parent) => {
          const childTab = this.tabs.find(({ typeName }) => typeName === parent.childTypeName);
          const compareFunction = this.makeCompareFunction(childTab.valueField);
          const warnFunction = this.makeWarningFunction(parent.label, childTab.typeName, childTab.valueField);
          const sortedChildren = childTab.data.slice().sort(compareFunction);

          this.replaceChildrenWithReferences(parent as ParentOption, sortedChildren, compareFunction, warnFunction);
        });
    }
  }

  makeCompareFunction<T>(key: string): (a: T | { [key: string]: T }, b: T | { [key: string]: T }) => 1 | -1 | 0 | undefined {
    return (a: T | { [key: string]: T }, b: T | { [key: string]: T }) => {
      const aValue: T = (a && a[key]) || a;
      const bValue: T = (b && b[key]) || b;

      if (aValue < bValue) {
        return -1;
      } else if (aValue > bValue) {
        return 1;
      } else if (aValue === bValue) {
        return 0;
      } else {
        return undefined;
      }
    };
  }

  replaceChildrenWithReferences(
    parent: { children: any[] },
    sortedData: ChildTab['data'],
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

  onDropdownToggle(event) {
    this.filterText.next('');
    this.inputElement.nativeElement?.focus();
    if (event) {
      this.scrollViewportHeight = this.getPixelHeight(this.scrollableInstance.getElementRef().nativeElement);
      this.virtualScrollItemSize = this.getPixelHeight(this.scrollableInstance.getElementRef().nativeElement.querySelector('novo-option'));
      // Emit a fake scroll event so the rendered items update
      this.scrollableInstance.getElementRef().nativeElement.dispatchEvent(new Event('scroll'));
    }
  }

  activateItem(item: any): void {
    if (this.selectionEnabled) {
      item.selected = !item.selected;
      this.onItemToggled(item);
    }
    this.activation.emit(item);
  }

  onItemToggled(item: Option) {
    if (Array.isArray(item.children)) {
      this.updateDescendants(item.selected, item.children);
    }
    this.updateParentsAndQuickSelect();
    this.updateClearAll(item.selected);
    this.emitSelectedValues();
    this.ref.markForCheck();
  }

  initializeDescendantSelection() {
    this.tabs.forEach((tab) => {
      if ('childTypeName' in tab && tab.data?.length) {
        tab.data.forEach((parent) => {
          if (parent.selected && parent.children?.length) {
            parent.children.forEach((child) => {
              child.selected = true;
            });
          }
        });
      }
    });
  }

  updateDescendants(parentIsSelected: boolean, children: Option[]): void {
    children.forEach((item) => {
      if (parentIsSelected) {
        item.selected = true;
      } else {
        delete item.selected;
      }
      if (Array.isArray(item.children)) {
        this.updateDescendants(item.selected, item.children);
      }
    });
  }

  updateClearAll(itemWasJustSelected?: boolean) {
    if (!this.selectionEnabled) {
      this.showClearAll = false;
    } else {
    this.showClearAll = itemWasJustSelected
      ? true
      : this.tabs.some((tab) => {
          if ((tab as ParentTab).childTypeName) {
            return tab.data.some(({ selected, indeterminate }) => selected || indeterminate);
          } else {
            return tab.data.some(({ selected }) => selected);
          }
        });
    }
  }

  updateParentsAndQuickSelect(): void {
    // mutate here to avoid dereferencing the objects in displayTabs
    this.tabs
      .filter((tab) => 'childTypeName' in tab && !!tab.childTypeName)
      .forEach((tab) => {
        const parents = tab.data.filter(({ children }: { children?: any[] }) => children?.length);

        parents.forEach((parent: ParentOption) => {
          ['indeterminate', 'selected'].forEach((selectedStateOption) => delete parent[selectedStateOption]);

          const selectedState = this.getSelectedState(parent.children);
          if (selectedState) {
            parent[selectedState] = true;
          }
        });
      });

    if (this.quickSelectConfig) {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        delete quickSelect.selected;
        const selectedState = this.getSelectedState(quickSelect.children as (Option)[]);
        if (selectedState) {
          quickSelect[selectedState] = true;
        }
      });
    }
  }

  getSelectedState = (childArray: Option[]): 'selected' | 'indeterminate' | undefined => {
    const numberOfSelectedItems = childArray.filter(({ selected }) => selected).length;
    if (!numberOfSelectedItems) {
      return undefined;
    }
    return numberOfSelectedItems === childArray.length ? 'selected' : 'indeterminate';
  };

  getSelectedValues(): TabbedGroupPickerTab[] {
    return this.tabs.map((tab) => ({
      ...tab,
      data: tab.data.filter(({ selected }) => selected),
    }));
  }

  emitSelectedValues() {
    this.selectionChange.emit(this.getSelectedValues());
  }

  updateAppliedState() {
    this.appliedState = Helpers.deepClone(this.displayTabs);
  }

  apply() {
    this.updateAppliedState();
    this.applyChange.emit(this.getSelectedValues());
    this.dropdown.closePanel();
  }

  cancel() {
    this.revertState();
    this.ref.markForCheck();
    this.dropdown.closePanel();
  }

  revertState() {
    this.tabs = Helpers.deepClone(this.appliedState);
    this.loadValues();
  }

  deselectEverything(event) {
    Helpers.swallowEvent(event);
    this.showClearAll = false;
    if (this.quickSelectConfig) {
      this.quickSelectConfig.items.forEach((quickSelect) => {
        delete quickSelect.selected;
      });
    }
    this.tabs.forEach((tab) => {
      if ((tab as ParentTab).childTypeName) {
        tab.data.forEach((item) => {
          delete item.selected;
          delete item.indeterminate;
          item.children.forEach((child) => delete child.selected);
        });
      } else {
        (tab as ChildTab).data.forEach((item) => delete item.selected);
      }
    });
    this.emitSelectedValues();
    this.ref.markForCheck();
  }

  onClearFilter(event) {
    Helpers.swallowEvent(event);
    this.filterText.next('');
  }

  onFilter(event: { target: { value: string } }) {
    this.filterText.next(event.target.value);
  }

  filter = (searchTerm: string) => {
    this.displayTabs.forEach(
      (displayTab, i) =>
        (displayTab.data = this.tabs[i].data.filter((item) =>
          item[displayTab.labelField].toLowerCase().includes(searchTerm.toLowerCase()) ||
          item[displayTab.valueField]?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        )),
    );
    this.ref.markForCheck();
  };
}
