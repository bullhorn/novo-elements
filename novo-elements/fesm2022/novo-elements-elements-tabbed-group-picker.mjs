import * as i3 from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as i0 from '@angular/core';
import { input, EventEmitter, signal, computed, Output, Input, ViewChild, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i1 from 'novo-elements/services';
import { NovoLabelService } from 'novo-elements/services';
import { Helpers, binarySearch, BooleanInput } from 'novo-elements/utils';
import * as i5 from 'novo-elements/elements/common';
import { NOVO_OPTION_PARENT_COMPONENT, NovoCommonModule, NovoOptionModule } from 'novo-elements/elements/common';
import * as i9 from 'novo-elements/elements/dropdown';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from 'novo-elements/elements/chips';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import * as i6 from 'novo-elements/elements/icon';
import { NovoIconModule } from 'novo-elements/elements/icon';
import * as i7 from 'novo-elements/elements/tabs';
import { NovoTabModule } from 'novo-elements/elements/tabs';
import * as i8 from 'novo-elements/elements/button';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { FormsModule } from '@angular/forms';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoFormExtrasModule } from 'novo-elements/elements/form';
import { NovoListModule } from 'novo-elements/elements/list';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class NovoTabbedGroupPickerElement {
    constructor(labelService, ref) {
        this.labelService = labelService;
        this.ref = ref;
        this.multiple = true;
        this.showFooter = false;
        this.useChips = input(false, ...(ngDevMode ? [{ debugName: "useChips" }] : []));
        this.maxChips = input(3, ...(ngDevMode ? [{ debugName: "maxChips" }] : []));
        this.chipSize = input('md', ...(ngDevMode ? [{ debugName: "chipSize" }] : []));
        // In activation mode, no checkboxes are displayed, and only the selectionActivated event occurs.
        this.selectionEnabled = true;
        this.activation = new EventEmitter();
        this.selectionChange = new EventEmitter();
        this.applyChange = new EventEmitter();
        this.cancelChange = new EventEmitter();
        this.tabSelect = new EventEmitter();
        this.displayTabIndex = 0;
        this.filterText = new BehaviorSubject('');
        this.loading = true;
        this.showClearAll = false;
        // Initial height based on 13 px font rendered in chrome. Actual height retrieved onDropdownToggled.
        this.scrollViewportHeight = 351;
        this.virtualScrollItemSize = 39;
        this.selectedChips = signal([], ...(ngDevMode ? [{ debugName: "selectedChips" }] : []));
        this.showAllChips = signal(false, ...(ngDevMode ? [{ debugName: "showAllChips" }] : []));
        this.displayedChips = computed(() => this.showAllChips() ? this.selectedChips() : this.selectedChips().slice(0, this.maxChips()), ...(ngDevMode ? [{ debugName: "displayedChips" }] : []));
        this.hiddenChips = computed(() => this.showAllChips() ? [] : this.selectedChips().slice(this.maxChips()), ...(ngDevMode ? [{ debugName: "hiddenChips" }] : []));
        this.chipsInputPlaceholder = computed(() => this.displayedChips().length ? '' : this.buttonConfig.label, ...(ngDevMode ? [{ debugName: "chipsInputPlaceholder" }] : []));
        this.getSelectedState = (childArray) => {
            if (!Array.isArray(childArray)) {
                return undefined;
            }
            const numberOfSelectedItems = childArray.filter(({ selected }) => selected).length;
            if (!numberOfSelectedItems) {
                return undefined;
            }
            return numberOfSelectedItems === childArray.length ? 'selected' : 'indeterminate';
        };
        this.filter = (searchTerm) => {
            this.displayTabs.forEach((displayTab, i) => (displayTab.data = this.tabs[i].data.filter((item) => item[displayTab.labelField].toLowerCase().includes(searchTerm.toLowerCase()) ||
                item[displayTab.valueField]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))));
            this.ref.markForCheck();
        };
    }
    get displayTab() {
        return this.displayTabs[this.displayTabIndex];
    }
    set displayTab(tab) {
        this.displayTabIndex = this.tabs.map(({ typeName }) => typeName).indexOf(tab.typeName);
    }
    get minBufferPx() {
        return this.scrollViewportHeight; // render at least 2x the number of items visible (viewport + min buffer)
    }
    get maxBufferPx() {
        return 2 * this.scrollViewportHeight; // render at most 3x the number of items visible (viewport + max buffer)
    }
    ngOnInit() {
        this.loadValues();
        this.loading = false;
        this.filterTextSubscription = this.filterText.pipe(debounceTime(300)).subscribe({
            next: this.filter,
        });
    }
    ngOnDestroy() {
        if (this.filterTextSubscription) {
            this.filterTextSubscription.unsubscribe();
        }
    }
    showAllChipsToggle(event) {
        this.showAllChips.update((show) => !show);
        Helpers.swallowEvent(event);
    }
    loadValues() {
        this.setupDisplayData();
        this.createChildrenReferences();
        this.initializeDescendantSelection();
        this.updateParentsAndQuickSelect();
        this.updateClearAll();
    }
    changeTab(tab) {
        this.tabSelect.emit({ newTab: tab, oldTab: { ...this.displayTab } });
        this.displayTab = tab;
        if (this.scrollableInstance) {
            this.scrollableInstance.scrollTo({ behavior: 'auto', top: 0 });
        }
    }
    getPixelHeight(element) {
        return Number(getComputedStyle(element, '').height.match(/(\d+(\.\d+)?)px$/)[1]);
    }
    setupDisplayData() {
        if (this.useChips()) {
            this.tabs.forEach((tab) => {
                tab.data.forEach((item) => {
                    item.icon = tab.icon;
                    if (item.selected) {
                        this.selectedChips.set([...this.selectedChips(), item]);
                    }
                });
            });
        }
        // shallow copy here so that reassigning displayTabs[i].data doesn't mutate tabs[i].data
        // but both data values point to the same items
        this.displayTabs = this.tabs.map((tab) => ({ ...tab }));
        this.displayTab = this.tabs[0];
        this.updateAppliedState();
    }
    // Replace each parent's child object with a reference to the child to avoid
    // a child lookup for selected status; linking references allows M x N
    // time complexity instead of M x N^2
    createChildrenReferences() {
        this.tabs.forEach((tab) => {
            // would rather filter but TypeScript still wants a type narrowing here
            if ('childTypeName' in tab) {
                const childTab = this.tabs.find(({ typeName }) => typeName === tab.childTypeName);
                const compareFunction = this.makeCompareFunction(childTab.valueField);
                const warnFunction = this.makeWarningFunction(tab.typeName, childTab.typeName, childTab.valueField);
                const sortedChildren = childTab.data.slice().sort(compareFunction);
                tab.data
                    .filter(({ children }) => children?.length)
                    .forEach((parent) => this.replaceChildrenWithReferences(parent, sortedChildren, compareFunction, warnFunction));
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
                this.replaceChildrenWithReferences(parent, sortedChildren, compareFunction, warnFunction);
            });
        }
    }
    makeCompareFunction(key) {
        return (a, b) => {
            const aValue = (a && a[key]) || a;
            const bValue = (b && b[key]) || b;
            if (aValue < bValue) {
                return -1;
            }
            else if (aValue > bValue) {
                return 1;
            }
            else if (aValue === bValue) {
                return 0;
            }
            else {
                return undefined;
            }
        };
    }
    replaceChildrenWithReferences(parent, sortedData, compareFunction, warnFunction) {
        if (Array.isArray(parent?.children)) {
            parent.children = parent.children
                .map((child) => binarySearch(child, sortedData, compareFunction) || warnFunction(child))
                .filter(Boolean); // since map can return undefined, remove undefined elements
        }
    }
    makeWarningFunction(parentLabel, childLabel, childValueField) {
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
    activateItem(item, tab) {
        if (this.selectionEnabled) {
            item.selected = !item.selected;
            this.onItemToggled(item);
        }
        this.activation.emit({ ...item, scope: tab?.typeName || 'quickselect' });
    }
    onItemToggled(item) {
        if (Array.isArray(item.children)) {
            this.updateDescendants(item.selected, item.children);
        }
        this.updateParentsAndQuickSelect();
        this.updateClearAll(item.selected);
        this.emitSelectedValues();
        this.toggleChip(item);
        this.ref.markForCheck();
    }
    toggleChip(item) {
        if (this.useChips()) {
            let newChips = [];
            const oldChips = [...this.selectedChips()];
            if (oldChips.includes(item)) {
                if (oldChips.length > 1) {
                    oldChips.splice(oldChips.indexOf(item), 1);
                    newChips = oldChips;
                }
            }
            else {
                newChips = [...oldChips, item];
            }
            this.selectedChips.set(newChips);
        }
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
    updateDescendants(parentIsSelected, children) {
        children.forEach((item) => {
            if (parentIsSelected) {
                item.selected = true;
            }
            else {
                delete item.selected;
            }
            if (Array.isArray(item.children)) {
                this.updateDescendants(item.selected, item.children);
            }
        });
    }
    updateClearAll(itemWasJustSelected) {
        if (!this.selectionEnabled) {
            this.showClearAll = false;
        }
        else {
            this.showClearAll = itemWasJustSelected
                ? true
                : this.tabs.some((tab) => {
                    if (tab.childTypeName) {
                        return tab.data.some(({ selected, indeterminate }) => selected || indeterminate);
                    }
                    else {
                        return tab.data.some(({ selected }) => selected);
                    }
                });
        }
    }
    updateParentsAndQuickSelect() {
        // mutate here to avoid dereferencing the objects in displayTabs
        this.tabs
            .filter((tab) => 'childTypeName' in tab && !!tab.childTypeName)
            .forEach((tab) => {
            const parents = tab.data.filter(({ children }) => children?.length);
            parents.forEach((parent) => {
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
                const selectedState = this.getSelectedState(quickSelect.children);
                if (selectedState) {
                    quickSelect[selectedState] = true;
                }
            });
        }
    }
    getSelectedValues() {
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
        this.cancelChange.emit(this.tabs);
        this.ref.markForCheck();
        this.dropdown.closePanel();
    }
    revertState() {
        this.tabs = Helpers.deepClone(this.appliedState);
        this.selectedChips.set([]);
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
            if (tab.childTypeName) {
                tab.data.forEach((item) => {
                    delete item.selected;
                    delete item.indeterminate;
                    item.children.forEach((child) => delete child.selected);
                });
            }
            else {
                tab.data.forEach((item) => delete item.selected);
            }
        });
        this.selectedChips.set([]);
        this.emitSelectedValues();
        this.ref.markForCheck();
    }
    onClearFilter(event) {
        Helpers.swallowEvent(event);
        this.filterText.next('');
    }
    onFilter(event) {
        this.filterText.next(event.target.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerElement, deps: [{ token: i1.NovoLabelService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.19", type: NovoTabbedGroupPickerElement, isStandalone: false, selector: "novo-tabbed-group-picker", inputs: { buttonConfig: { classPropertyName: "buttonConfig", publicName: "buttonConfig", isSignal: false, isRequired: false, transformFunction: null }, tabs: { classPropertyName: "tabs", publicName: "tabs", isSignal: false, isRequired: false, transformFunction: null }, quickSelectConfig: { classPropertyName: "quickSelectConfig", publicName: "quickSelectConfig", isSignal: false, isRequired: false, transformFunction: null }, showFooter: { classPropertyName: "showFooter", publicName: "showFooter", isSignal: false, isRequired: false, transformFunction: null }, useChips: { classPropertyName: "useChips", publicName: "useChips", isSignal: true, isRequired: false, transformFunction: null }, maxChips: { classPropertyName: "maxChips", publicName: "maxChips", isSignal: true, isRequired: false, transformFunction: null }, chipSize: { classPropertyName: "chipSize", publicName: "chipSize", isSignal: true, isRequired: false, transformFunction: null }, selectionEnabled: { classPropertyName: "selectionEnabled", publicName: "selectionEnabled", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { activation: "activation", selectionChange: "selectionChange", applyChange: "applyChange", cancelChange: "cancelChange", tabSelect: "tabSelect" }, host: { properties: { "class.use-chips": "useChips()" } }, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoTabbedGroupPickerElement }], viewQueries: [{ propertyName: "scrollableInstance", first: true, predicate: ["tabbedGroupPickerVirtualScrollViewport"], descendants: true }, { propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }], ngImport: i0, template: "<novo-dropdown (toggled)=\"onDropdownToggle($event)\" multiple #dropdown>\n  <novo-button\n    class=\"tabbed-group-picker-button\"\n    [theme]=\"buttonConfig.theme\"\n    [side]=\"buttonConfig.side\"\n    [size]=\"buttonConfig.size\"\n    [icon]=\"buttonConfig.icon\"\n    [loading]=\"loading\">\n    <ng-content></ng-content>\n    <div class=\"tabbed-group-picker-button-label\">{{ buttonConfig.label }}</div>\n  </novo-button>\n  <div class=\"tabbed-group-picker-search\"\n    [class.use-chips]=\"useChips()\"\n    data-automation-id=\"tabbed-group-picker-search\"\n    (keydown)=\"dropdown._handleKeydown($event)\">\n    @if (useChips()) {\n      <novo-chip-list>\n        <novo-chip *ngFor=\"let chip of displayedChips()\" [value]=\"chip\" [size]=\"chipSize()\">\n          <novo-icon *ngIf=\"chip.icon?.entityColor\" class=\"txc-{{ chip.icon.entityColor }}\" novoChipAvatar>circle</novo-icon>\n          <novo-icon *ngIf=\"!chip.icon?.entityColor && chip.icon\">{{ chip.icon }}</novo-icon>\n          <novo-text ellipsis tooltipOnOverflow>{{ chip.label || chip.name || chip.title || chip.value }}</novo-text>\n          <novo-icon novoChipRemove (click)=\"activateItem(chip)\">x</novo-icon>\n        </novo-chip>\n        <div *ngIf=\"selectedChips().length\" class=\"hidden-chips-toggle\" (click)=\"showAllChipsToggle($event)\">\n          <novo-label *ngIf=\"hiddenChips().length && !showAllChips()\" color=\"positive\">+ {{ hiddenChips().length }} {{ labelService.more }} </novo-label>\n          <novo-label *ngIf=\"showAllChips()\" color=\"positive\"><novo-icon>sort-asc</novo-icon> {{ labelService.showLess }}</novo-label>\n        </div>\n        <input #inputElement class=\"chip-list-input\" type=\"text\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n        <i class=\"bhi-search\" *ngIf=\"!(filterText | async) && !showAllChips()\" (click)=\"inputElement.focus()\"></i>\n        <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\" (keydown.space)=\"onClearFilter($event)\"></i>\n      </novo-chip-list>\n    } @else {\n      <input #inputElement type=\"text\" [placeholder]=\"labelService.search\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n      <i class=\"bhi-search\" *ngIf=\"!(filterText | async)\"></i>\n      <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\" (keydown.space)=\"onClearFilter($event)\"></i>\n    }\n  </div>\n  <div class=\"tabbed-group-picker-column-container\" (keydown)=\"dropdown._handleKeydown($event)\">\n    <div class=\"tabbed-group-picker-column left\">\n      <novo-nav theme=\"white\" direction=\"vertical\">\n        <novo-tab *ngFor=\"let tab of displayTabs\" [attr.data-automation-id]=\"tab.typeName\"\n          (activeChange)=\"changeTab(tab)\">\n          <span>{{ tab.typeLabel }} ({{ tab.data.length }})</span><i class=\"bhi-next\"></i>\n        </novo-tab>\n      </novo-nav>\n      <novo-button *ngIf=\"showClearAll && !showFooter\" class=\"clear-all-button\" theme=\"dialogue\" icon=\"times\" side=\"right\"\n        color=\"grapefruit\" (click)=\"deselectEverything($event)\" (keydown.space)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"tabbed-group-picker-column right\">\n      <div class=\"quick-select\" *ngIf=\"quickSelectConfig && !(filterText | async)\">\n        <novo-optgroup class=\"quick-select-list\" [label]=\"quickSelectConfig.label\">\n          <novo-option\n            class=\"quick-select-item\"\n            *ngFor=\"let quickSelect of quickSelectConfig.items\"\n            [attr.data-automation-id]=\"quickSelect.label\"\n            [allowSelection]=\"selectionEnabled\"\n            [selected]=\"quickSelect.selected\"\n            (click)=\"activateItem(quickSelect)\"\n            (keydown.space)=\"activateItem(quickSelect)\"\n            novoInert>\n            {{quickSelect.label}}\n          </novo-option>\n        </novo-optgroup>\n      </div>\n      <novo-optgroup *ngIf=\"displayTab.data.length\">\n        <cdk-virtual-scroll-viewport\n          [itemSize]=\"virtualScrollItemSize\"\n          [maxBufferPx]=\"maxBufferPx\"\n          [minBufferPx]=\"minBufferPx\"\n          #tabbedGroupPickerVirtualScrollViewport>\n          <novo-option\n            *cdkVirtualFor=\"let item of displayTab.data\"\n            [attr.data-automation-id]=\"item[displayTab.labelField]\"\n            [attr.data-automation-value]=\"item[displayTab.valueField]\"\n            [allowSelection]=\"selectionEnabled\"\n            [selected]=\"item.selected\"\n            (click)=\"activateItem(item, displayTab)\"\n            (keydown.space)=\"activateItem(item, displayTab)\"\n            novoInert>\n            {{item[displayTab.labelField]}}\n          </novo-option>\n        </cdk-virtual-scroll-viewport>\n      </novo-optgroup>\n      <div class=\"tabbed-group-picker-empty-item\" *ngIf=\"!displayTab.data.length && (filterText | async)\">\n        <i class=\"{{ displayTab.icon || 'bhi-search' }}\"></i>\n        <div class=\"empty-item-main-message\">{{ labelService.tabbedGroupPickerEmpty }}</div>\n        <div class=\"empty-item-sub-message\">{{ labelService.tabbedGroupClearSuggestion(displayTab.typeLabel) }}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\" *ngIf=\"showFooter\">\n    <div class=\"save-cancel-button-container\">\n      <novo-button\n        class=\"clear-all-button\"\n        *ngIf=\"showClearAll\"\n        theme=\"dialogue\"\n        icon=\"times\"\n        side=\"right\"\n        color=\"grapefruit\"\n        (click)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"save-cancel-button-container\">\n      <novo-button\n        class=\"cancel-button\"\n        marginRight=\"1rem\"\n        theme=\"dialogue\"\n        (click)=\"cancel()\">{{ labelService.cancel }}</novo-button>\n      <novo-button\n        class=\"save-button\"\n        theme=\"primary\"\n        color=\"primary\"\n        (click)=\"apply()\">{{ labelService.apply }}</novo-button>\n    </div>\n  </div>\n</novo-dropdown>", styles: [":host .tabbed-group-picker-button .tabbed-group-picker-button-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:40px;width:100%}::ng-deep .dropdown-container .tabbed-group-picker-search{width:100%;padding:.5em;border-bottom:.1em solid #ccc;position:relative}::ng-deep .dropdown-container .tabbed-group-picker-search input{background:transparent;border:none;border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--font-color-base)}::ng-deep .dropdown-container .tabbed-group-picker-search input.chip-list-input{flex:1 0 20px}::ng-deep .dropdown-container .tabbed-group-picker-search input::placeholder{color:var(--form-placeholder)}::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-search,::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-times{position:absolute;bottom:1em;right:.5em;color:#9e9e9e;font-size:var(--font-size-sm);margin-right:1em}::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-times{cursor:pointer}::ng-deep .dropdown-container .tabbed-group-picker-search .hidden-chips-toggle{cursor:pointer}::ng-deep .dropdown-container .tabbed-group-picker-search.use-chips{max-width:500px}::ng-deep .dropdown-container .footer{background:var(--background-main);display:flex;align-items:center;justify-content:space-between;padding:1rem}::ng-deep .dropdown-container .tabbed-group-picker-column-container{display:flex;flex-direction:row;-webkit-user-select:none;user-select:none}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column{display:flex;flex-direction:column;align-items:center}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left{border-right:1px solid var(--color-border);justify-content:space-between}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left .clear-all-button{margin-bottom:.5em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav{overflow:auto}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab{min-height:3em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;display:flex;justify-content:space-between;align-items:center}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active .novo-tab-link{font-weight:400}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active:hover .novo-tab-link{font-weight:400;color:var(--color-positive)}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab:hover .novo-tab-link{font-weight:400;color:#000;opacity:1}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right{display:block;width:23em;overflow:hidden}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select{font-weight:500}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-label{padding:.7em 1.9em 0;background:hsl(from var(--color-light) h s calc(l + 10));text-transform:uppercase;font-size:.8em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-list .quick-select-item{background:hsl(from var(--color-light) h s calc(l + 10));padding:.5em .8em;border-bottom:none}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:27em;overflow-x:hidden}@media(max-height:720px){::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:18em}}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup novo-option:hover.novo-option-inert{background:var(--background-main, rgb(from var(--color-ocean) r g b/.1))}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#9e9e9e;width:100%;height:27em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item i{padding-bottom:.2em;font-size:3em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-main-message{font-weight:500;color:var(--font-color-base)}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-sub-message{font-size:.9em}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i3.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i3.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: i4.NovoChipElement, selector: "novo-chip, [novo-chip]", inputs: ["color", "tabIndex", "size", "type", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"] }, { kind: "directive", type: i4.NovoChipAvatar, selector: "novo-chip-avatar, [novoChipAvatar]" }, { kind: "directive", type: i4.NovoChipRemove, selector: "[novoChipRemove]" }, { kind: "component", type: i4.NovoChipList, selector: "novo-chip-list", inputs: ["errorStateMatcher", "multiple", "chipsToggleable", "stacked", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["novoChipList"] }, { kind: "component", type: i5.NovoText, selector: "novo-text,[novo-text]", inputs: ["block"] }, { kind: "component", type: i5.NovoLabel, selector: "novo-label,[novo-label]", inputs: ["id"] }, { kind: "directive", type: i5.MarginDirective, selector: "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", inputs: ["margin", "m", "marginLeft", "ml", "marginRight", "mr", "marginTop", "mt", "marginBottom", "mb", "marginX", "mx", "marginY", "my"] }, { kind: "directive", type: i5.ThemeColorDirective, selector: "[theme]", inputs: ["theme"] }, { kind: "component", type: i6.NovoIconComponent, selector: "novo-icon", inputs: ["raised", "theme", "shape", "color", "size", "smaller", "larger", "alt", "name"] }, { kind: "component", type: i7.NovoNavElement, selector: "novo-nav", inputs: ["theme", "direction", "outlet", "router", "condensed", "selectedIndex"], outputs: ["selectedIndexChange"] }, { kind: "component", type: i7.NovoTabElement, selector: "novo-tab", inputs: ["active", "color", "disabled"], outputs: ["activeChange"] }, { kind: "component", type: i8.NovoButtonElement, selector: "novo-button,button[theme]", inputs: ["color", "side", "size", "theme", "loading", "icon", "secondIcon", "disabled"] }, { kind: "component", type: i9.NovoDropdownElement, selector: "novo-dropdown", inputs: ["parentScrollSelector", "parentScrollAction", "containerClass", "side", "scrollStrategy", "keepOpen", "height", "width", "appendToBody", "multiple", "scrollToActiveItemOnOpen"], outputs: ["toggled"] }, { kind: "component", type: i5.NovoOption, selector: "novo-option", inputs: ["selected", "keepOpen", "novoInert", "value", "disabled"], exportAs: ["novoOption"] }, { kind: "component", type: i5.NovoOptgroup, selector: "novo-optgroup", inputs: ["disabled", "label"], exportAs: ["novoOptgroup"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    BooleanInput(),
    __metadata("design:type", Object)
], NovoTabbedGroupPickerElement.prototype, "selectionEnabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerElement, decorators: [{
            type: Component,
            args: [{ selector: 'novo-tabbed-group-picker', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: NOVO_OPTION_PARENT_COMPONENT, useExisting: NovoTabbedGroupPickerElement }], standalone: false, host: {
                        '[class.use-chips]': 'useChips()',
                    }, template: "<novo-dropdown (toggled)=\"onDropdownToggle($event)\" multiple #dropdown>\n  <novo-button\n    class=\"tabbed-group-picker-button\"\n    [theme]=\"buttonConfig.theme\"\n    [side]=\"buttonConfig.side\"\n    [size]=\"buttonConfig.size\"\n    [icon]=\"buttonConfig.icon\"\n    [loading]=\"loading\">\n    <ng-content></ng-content>\n    <div class=\"tabbed-group-picker-button-label\">{{ buttonConfig.label }}</div>\n  </novo-button>\n  <div class=\"tabbed-group-picker-search\"\n    [class.use-chips]=\"useChips()\"\n    data-automation-id=\"tabbed-group-picker-search\"\n    (keydown)=\"dropdown._handleKeydown($event)\">\n    @if (useChips()) {\n      <novo-chip-list>\n        <novo-chip *ngFor=\"let chip of displayedChips()\" [value]=\"chip\" [size]=\"chipSize()\">\n          <novo-icon *ngIf=\"chip.icon?.entityColor\" class=\"txc-{{ chip.icon.entityColor }}\" novoChipAvatar>circle</novo-icon>\n          <novo-icon *ngIf=\"!chip.icon?.entityColor && chip.icon\">{{ chip.icon }}</novo-icon>\n          <novo-text ellipsis tooltipOnOverflow>{{ chip.label || chip.name || chip.title || chip.value }}</novo-text>\n          <novo-icon novoChipRemove (click)=\"activateItem(chip)\">x</novo-icon>\n        </novo-chip>\n        <div *ngIf=\"selectedChips().length\" class=\"hidden-chips-toggle\" (click)=\"showAllChipsToggle($event)\">\n          <novo-label *ngIf=\"hiddenChips().length && !showAllChips()\" color=\"positive\">+ {{ hiddenChips().length }} {{ labelService.more }} </novo-label>\n          <novo-label *ngIf=\"showAllChips()\" color=\"positive\"><novo-icon>sort-asc</novo-icon> {{ labelService.showLess }}</novo-label>\n        </div>\n        <input #inputElement class=\"chip-list-input\" type=\"text\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n        <i class=\"bhi-search\" *ngIf=\"!(filterText | async) && !showAllChips()\" (click)=\"inputElement.focus()\"></i>\n        <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\" (keydown.space)=\"onClearFilter($event)\"></i>\n      </novo-chip-list>\n    } @else {\n      <input #inputElement type=\"text\" [placeholder]=\"labelService.search\" [value]=\"filterText | async\" (input)=\"onFilter($event)\" />\n      <i class=\"bhi-search\" *ngIf=\"!(filterText | async)\"></i>\n      <i class=\"bhi-times\" *ngIf=\"(filterText | async)\" (click)=\"onClearFilter($event)\" (keydown.space)=\"onClearFilter($event)\"></i>\n    }\n  </div>\n  <div class=\"tabbed-group-picker-column-container\" (keydown)=\"dropdown._handleKeydown($event)\">\n    <div class=\"tabbed-group-picker-column left\">\n      <novo-nav theme=\"white\" direction=\"vertical\">\n        <novo-tab *ngFor=\"let tab of displayTabs\" [attr.data-automation-id]=\"tab.typeName\"\n          (activeChange)=\"changeTab(tab)\">\n          <span>{{ tab.typeLabel }} ({{ tab.data.length }})</span><i class=\"bhi-next\"></i>\n        </novo-tab>\n      </novo-nav>\n      <novo-button *ngIf=\"showClearAll && !showFooter\" class=\"clear-all-button\" theme=\"dialogue\" icon=\"times\" side=\"right\"\n        color=\"grapefruit\" (click)=\"deselectEverything($event)\" (keydown.space)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"tabbed-group-picker-column right\">\n      <div class=\"quick-select\" *ngIf=\"quickSelectConfig && !(filterText | async)\">\n        <novo-optgroup class=\"quick-select-list\" [label]=\"quickSelectConfig.label\">\n          <novo-option\n            class=\"quick-select-item\"\n            *ngFor=\"let quickSelect of quickSelectConfig.items\"\n            [attr.data-automation-id]=\"quickSelect.label\"\n            [allowSelection]=\"selectionEnabled\"\n            [selected]=\"quickSelect.selected\"\n            (click)=\"activateItem(quickSelect)\"\n            (keydown.space)=\"activateItem(quickSelect)\"\n            novoInert>\n            {{quickSelect.label}}\n          </novo-option>\n        </novo-optgroup>\n      </div>\n      <novo-optgroup *ngIf=\"displayTab.data.length\">\n        <cdk-virtual-scroll-viewport\n          [itemSize]=\"virtualScrollItemSize\"\n          [maxBufferPx]=\"maxBufferPx\"\n          [minBufferPx]=\"minBufferPx\"\n          #tabbedGroupPickerVirtualScrollViewport>\n          <novo-option\n            *cdkVirtualFor=\"let item of displayTab.data\"\n            [attr.data-automation-id]=\"item[displayTab.labelField]\"\n            [attr.data-automation-value]=\"item[displayTab.valueField]\"\n            [allowSelection]=\"selectionEnabled\"\n            [selected]=\"item.selected\"\n            (click)=\"activateItem(item, displayTab)\"\n            (keydown.space)=\"activateItem(item, displayTab)\"\n            novoInert>\n            {{item[displayTab.labelField]}}\n          </novo-option>\n        </cdk-virtual-scroll-viewport>\n      </novo-optgroup>\n      <div class=\"tabbed-group-picker-empty-item\" *ngIf=\"!displayTab.data.length && (filterText | async)\">\n        <i class=\"{{ displayTab.icon || 'bhi-search' }}\"></i>\n        <div class=\"empty-item-main-message\">{{ labelService.tabbedGroupPickerEmpty }}</div>\n        <div class=\"empty-item-sub-message\">{{ labelService.tabbedGroupClearSuggestion(displayTab.typeLabel) }}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\" *ngIf=\"showFooter\">\n    <div class=\"save-cancel-button-container\">\n      <novo-button\n        class=\"clear-all-button\"\n        *ngIf=\"showClearAll\"\n        theme=\"dialogue\"\n        icon=\"times\"\n        side=\"right\"\n        color=\"grapefruit\"\n        (click)=\"deselectEverything($event)\">{{ labelService.clear }}</novo-button>\n    </div>\n    <div class=\"save-cancel-button-container\">\n      <novo-button\n        class=\"cancel-button\"\n        marginRight=\"1rem\"\n        theme=\"dialogue\"\n        (click)=\"cancel()\">{{ labelService.cancel }}</novo-button>\n      <novo-button\n        class=\"save-button\"\n        theme=\"primary\"\n        color=\"primary\"\n        (click)=\"apply()\">{{ labelService.apply }}</novo-button>\n    </div>\n  </div>\n</novo-dropdown>", styles: [":host .tabbed-group-picker-button .tabbed-group-picker-button-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:40px;width:100%}::ng-deep .dropdown-container .tabbed-group-picker-search{width:100%;padding:.5em;border-bottom:.1em solid #ccc;position:relative}::ng-deep .dropdown-container .tabbed-group-picker-search input{background:transparent;border:none;border-radius:0;outline:none;height:2rem;width:95%;padding:0;box-shadow:none;box-sizing:content-box;transition:all .3s;color:var(--font-color-base)}::ng-deep .dropdown-container .tabbed-group-picker-search input.chip-list-input{flex:1 0 20px}::ng-deep .dropdown-container .tabbed-group-picker-search input::placeholder{color:var(--form-placeholder)}::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-search,::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-times{position:absolute;bottom:1em;right:.5em;color:#9e9e9e;font-size:var(--font-size-sm);margin-right:1em}::ng-deep .dropdown-container .tabbed-group-picker-search i.bhi-times{cursor:pointer}::ng-deep .dropdown-container .tabbed-group-picker-search .hidden-chips-toggle{cursor:pointer}::ng-deep .dropdown-container .tabbed-group-picker-search.use-chips{max-width:500px}::ng-deep .dropdown-container .footer{background:var(--background-main);display:flex;align-items:center;justify-content:space-between;padding:1rem}::ng-deep .dropdown-container .tabbed-group-picker-column-container{display:flex;flex-direction:row;-webkit-user-select:none;user-select:none}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column{display:flex;flex-direction:column;align-items:center}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left{border-right:1px solid var(--color-border);justify-content:space-between}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left .clear-all-button{margin-bottom:.5em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav{overflow:auto}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab{min-height:3em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab>.novo-tab-link{max-width:100%;height:100%;display:flex;justify-content:space-between;align-items:center}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active .novo-tab-link{font-weight:400}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab.active:hover .novo-tab-link{font-weight:400;color:var(--color-positive)}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.left novo-nav>novo-tab:hover .novo-tab-link{font-weight:400;color:#000;opacity:1}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right{display:block;width:23em;overflow:hidden}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select{font-weight:500}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-label{padding:.7em 1.9em 0;background:hsl(from var(--color-light) h s calc(l + 10));text-transform:uppercase;font-size:.8em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .quick-select .quick-select-list .quick-select-item{background:hsl(from var(--color-light) h s calc(l + 10));padding:.5em .8em;border-bottom:none}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:27em;overflow-x:hidden}@media(max-height:720px){::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup cdk-virtual-scroll-viewport{height:18em}}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right novo-optgroup novo-option:hover.novo-option-inert{background:var(--background-main, rgb(from var(--color-ocean) r g b/.1))}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#9e9e9e;width:100%;height:27em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item i{padding-bottom:.2em;font-size:3em}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-main-message{font-weight:500;color:var(--font-color-base)}::ng-deep .dropdown-container .tabbed-group-picker-column-container .tabbed-group-picker-column.right .tabbed-group-picker-empty-item .empty-item-sub-message{font-size:.9em}\n"] }]
        }], ctorParameters: () => [{ type: i1.NovoLabelService }, { type: i0.ChangeDetectorRef }], propDecorators: { scrollableInstance: [{
                type: ViewChild,
                args: ['tabbedGroupPickerVirtualScrollViewport']
            }], inputElement: [{
                type: ViewChild,
                args: ['inputElement']
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdown']
            }], buttonConfig: [{
                type: Input
            }], tabs: [{
                type: Input
            }], quickSelectConfig: [{
                type: Input
            }], showFooter: [{
                type: Input
            }], useChips: [{ type: i0.Input, args: [{ isSignal: true, alias: "useChips", required: false }] }], maxChips: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxChips", required: false }] }], chipSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "chipSize", required: false }] }], selectionEnabled: [{
                type: Input
            }], activation: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], applyChange: [{
                type: Output
            }], cancelChange: [{
                type: Output
            }], tabSelect: [{
                type: Output
            }] } });

// NG2
class NovoTabbedGroupPickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerModule, declarations: [NovoTabbedGroupPickerElement], imports: [CommonModule,
            FormsModule,
            ScrollingModule,
            NovoChipsModule,
            NovoCommonModule,
            NovoIconModule,
            NovoTabModule,
            NovoListModule,
            NovoFormExtrasModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoOptionModule,
            NovoCheckboxModule], exports: [NovoTabbedGroupPickerElement] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerModule, providers: [NovoLabelService], imports: [CommonModule,
            FormsModule,
            ScrollingModule,
            NovoChipsModule,
            NovoCommonModule,
            NovoIconModule,
            NovoTabModule,
            NovoListModule,
            NovoFormExtrasModule,
            NovoButtonModule,
            NovoDropdownModule,
            NovoOptionModule,
            NovoCheckboxModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: NovoTabbedGroupPickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ScrollingModule,
                        NovoChipsModule,
                        NovoCommonModule,
                        NovoIconModule,
                        NovoTabModule,
                        NovoListModule,
                        NovoFormExtrasModule,
                        NovoButtonModule,
                        NovoDropdownModule,
                        NovoOptionModule,
                        NovoCheckboxModule,
                    ],
                    providers: [NovoLabelService],
                    declarations: [NovoTabbedGroupPickerElement],
                    exports: [NovoTabbedGroupPickerElement],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NovoTabbedGroupPickerElement, NovoTabbedGroupPickerModule };
//# sourceMappingURL=novo-elements-elements-tabbed-group-picker.mjs.map
