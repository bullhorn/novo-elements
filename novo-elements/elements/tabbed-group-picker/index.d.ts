import * as i0 from '@angular/core';
import { OnDestroy, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NovoLabelService } from 'novo-elements/services';
import * as i9 from 'novo-elements/elements/dropdown';
import { NovoDropdownElement } from 'novo-elements/elements/dropdown';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/cdk/scrolling';
import * as i5 from 'novo-elements/elements/tabs';
import * as i6 from 'novo-elements/elements/list';
import * as i7 from 'novo-elements/elements/form';
import * as i8 from 'novo-elements/elements/button';
import * as i10 from 'novo-elements/elements/common';
import * as i11 from 'novo-elements/elements/checkbox';

type TabbedGroupPickerTab = {
    typeName: string;
    typeLabel: string;
    valueField: string;
    labelField: string;
    scrollOffset?: number;
    icon?: string;
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
    selectionEnabled: boolean;
    activation: EventEmitter<any>;
    selectionChange: EventEmitter<TabbedGroupPickerTab[]>;
    applyChange: EventEmitter<any>;
    cancelChange: EventEmitter<any>;
    displayTabs: TabbedGroupPickerTab[];
    displayTabIndex: number;
    filterText: BehaviorSubject<string>;
    filterTextSubscription: Subscription;
    loading: boolean;
    showClearAll: boolean;
    appliedState: TabbedGroupPickerTab[];
    scrollViewportHeight: number;
    virtualScrollItemSize: number;
    constructor(labelService: NovoLabelService, ref: ChangeDetectorRef);
    get displayTab(): TabbedGroupPickerTab;
    set displayTab(tab: TabbedGroupPickerTab);
    get minBufferPx(): number;
    get maxBufferPx(): number;
    ngOnInit(): void;
    ngOnDestroy(): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabbedGroupPickerElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTabbedGroupPickerElement, "novo-tabbed-group-picker", never, { "buttonConfig": { "alias": "buttonConfig"; "required": false; }; "tabs": { "alias": "tabs"; "required": false; }; "quickSelectConfig": { "alias": "quickSelectConfig"; "required": false; }; "showFooter": { "alias": "showFooter"; "required": false; }; "selectionEnabled": { "alias": "selectionEnabled"; "required": false; }; }, { "activation": "activation"; "selectionChange": "selectionChange"; "applyChange": "applyChange"; "cancelChange": "cancelChange"; }, never, ["*"], false, never>;
}

declare class NovoTabbedGroupPickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTabbedGroupPickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoTabbedGroupPickerModule, [typeof NovoTabbedGroupPickerElement], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.ScrollingModule, typeof i5.NovoTabModule, typeof i6.NovoListModule, typeof i7.NovoFormExtrasModule, typeof i8.NovoButtonModule, typeof i9.NovoDropdownModule, typeof i10.NovoOptionModule, typeof i11.NovoCheckboxModule], [typeof NovoTabbedGroupPickerElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoTabbedGroupPickerModule>;
}

export { NovoTabbedGroupPickerElement, NovoTabbedGroupPickerModule };
export type { ChildTab, ParentTab, QuickSelectConfig, TabbedGroupPickerButtonConfig, TabbedGroupPickerQuickSelect, TabbedGroupPickerTab };
