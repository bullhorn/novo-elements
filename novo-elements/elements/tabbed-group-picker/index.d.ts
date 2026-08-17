import * as _angular_core from '@angular/core';
import { OnDestroy, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import * as i12 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/cdk/scrolling';
import * as i5 from 'novo-elements/elements/chips';
import * as i6 from 'novo-elements/elements/common';
import * as i7 from 'novo-elements/elements/icon';
import * as i8 from 'novo-elements/elements/tabs';
import * as i9 from 'novo-elements/elements/list';
import * as i10 from 'novo-elements/elements/form';
import * as i11 from 'novo-elements/elements/button';
import * as i13 from 'novo-elements/elements/checkbox';

type TabbedGroupPickerTab = {
    typeName: string;
    typeLabel: string;
    valueField: string;
    labelField: string;
    scrollOffset?: number;
    icon?: any;
} & (ParentTab | ChildTab);
type ParentTab = {
    childTypeName: string;
    data: Array<ParentOption>;
};
type BaseOption = {
    selected?: boolean;
    indeterminate?: boolean;
} & {
    [key: string]: any;
};
type ParentOption = BaseOption & {
    children: Option[];
};
type Option = BaseOption | ParentOption;
type ChildTab = {
    data: Array<{
        selected?: boolean;
    } & {
        [key: string]: any;
    }>;
};
type TabbedGroupPickerQuickSelect = {
    label: string;
    selected?: boolean;
    childTypeName?: string;
    children?: (({
        selected?: boolean;
    } & {
        [key: string]: any;
    }) | number)[];
    all?: boolean;
};
type QuickSelectConfig = {
    label: string;
    items: TabbedGroupPickerQuickSelect[];
};
type TabbedGroupPickerButtonConfig = {
    theme: string;
    side: string;
    icon: string;
    label: string;
    size?: string;
};
declare class NovoTabbedGroupPickerElement implements OnDestroy, OnInit {
    labelService: NovoLabelService;
    private ref;
    private scrollableInstance;
    private inputElement;
    dropdown: NovoDropdownElement;
    multiple: boolean;
    buttonConfig: TabbedGroupPickerButtonConfig;
    tabs: TabbedGroupPickerTab[];
    quickSelectConfig: QuickSelectConfig;
    showFooter: boolean;
    useChips: _angular_core.InputSignal<boolean>;
    maxChips: _angular_core.InputSignal<number>;
    chipSize: _angular_core.InputSignal<string>;
    selectionEnabled: boolean;
    activation: EventEmitter<any>;
    selectionChange: EventEmitter<TabbedGroupPickerTab[]>;
    applyChange: EventEmitter<any>;
    cancelChange: EventEmitter<any>;
    tabSelect: EventEmitter<any>;
    displayTabs: TabbedGroupPickerTab[];
    displayTabIndex: number;
    filterText: BehaviorSubject<string>;
    filterTextSubscription: Subscription;
    loading: boolean;
    showClearAll: boolean;
    appliedState: TabbedGroupPickerTab[];
    scrollViewportHeight: number;
    virtualScrollItemSize: number;
    selectedChips: _angular_core.WritableSignal<any[]>;
    showAllChips: _angular_core.WritableSignal<boolean>;
    displayedChips: _angular_core.Signal<any[]>;
    hiddenChips: _angular_core.Signal<any[]>;
    chipsInputPlaceholder: _angular_core.Signal<string>;
    constructor(labelService: NovoLabelService, ref: ChangeDetectorRef);
    get displayTab(): TabbedGroupPickerTab;
    set displayTab(tab: TabbedGroupPickerTab);
    get minBufferPx(): number;
    get maxBufferPx(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
    showAllChipsToggle(event: any): void;
    loadValues(): void;
    changeTab(tab: TabbedGroupPickerTab): void;
    getPixelHeight(element: HTMLElement): number;
    setupDisplayData(): void;
    createChildrenReferences(): void;
    makeCompareFunction<T>(key: string): (a: T | {
        [key: string]: T;
    }, b: T | {
        [key: string]: T;
    }) => 1 | -1 | 0 | undefined;
    replaceChildrenWithReferences(parent: {
        children: any[];
    }, sortedData: ChildTab['data'], compareFunction: (a: any, b: any) => 1 | -1 | 0, warnFunction: (child: any) => void): void;
    makeWarningFunction(parentLabel: string, childLabel: string, childValueField: any): (child: any) => void;
    onDropdownToggle(event: any): void;
    activateItem(item: any, tab?: TabbedGroupPickerTab): void;
    onItemToggled(item: Option): void;
    toggleChip(item: Option): void;
    initializeDescendantSelection(): void;
    updateDescendants(parentIsSelected: boolean, children: Option[]): void;
    updateClearAll(itemWasJustSelected?: boolean): void;
    updateParentsAndQuickSelect(): void;
    getSelectedState: (childArray: Option[]) => "selected" | "indeterminate" | undefined;
    getSelectedValues(): TabbedGroupPickerTab[];
    emitSelectedValues(): void;
    updateAppliedState(): void;
    apply(): void;
    cancel(): void;
    revertState(): void;
    deselectEverything(event: any): void;
    onClearFilter(event: any): void;
    onFilter(event: {
        target: {
            value: string;
        };
    }): void;
    filter: (searchTerm: string) => void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NovoTabbedGroupPickerElement, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NovoTabbedGroupPickerElement, "novo-tabbed-group-picker", never, { "buttonConfig": { "alias": "buttonConfig"; "required": false; }; "tabs": { "alias": "tabs"; "required": false; }; "quickSelectConfig": { "alias": "quickSelectConfig"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "useChips": { "alias": "useChips"; "required": false; "isSignal": true; }; "maxChips": { "alias": "maxChips"; "required": false; "isSignal": true; }; "chipSize": { "alias": "chipSize"; "required": false; "isSignal": true; }; "selectionEnabled": { "alias": "selectionEnabled"; "required": false; }; }, { "activation": "activation"; "selectionChange": "selectionChange"; "applyChange": "applyChange"; "cancelChange": "cancelChange"; "tabSelect": "tabSelect"; }, never, ["*"], false, never>;
}

declare class NovoTabbedGroupPickerModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NovoTabbedGroupPickerModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<NovoTabbedGroupPickerModule, [typeof NovoTabbedGroupPickerElement], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.ScrollingModule, typeof i5.NovoChipsModule, typeof i6.NovoCommonModule, typeof i7.NovoIconModule, typeof i8.NovoTabModule, typeof i9.NovoListModule, typeof i10.NovoFormExtrasModule, typeof i11.NovoButtonModule, typeof i12.NovoDropdownModule, typeof i6.NovoOptionModule, typeof i13.NovoCheckboxModule], [typeof NovoTabbedGroupPickerElement]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<NovoTabbedGroupPickerModule>;
}

export { NovoTabbedGroupPickerElement, NovoTabbedGroupPickerModule };
export type { ChildTab, ParentTab, QuickSelectConfig, TabbedGroupPickerButtonConfig, TabbedGroupPickerQuickSelect, TabbedGroupPickerTab };
