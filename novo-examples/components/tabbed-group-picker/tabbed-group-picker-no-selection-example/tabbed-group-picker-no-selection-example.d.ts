import * as i0 from "@angular/core";
/**
 * @title Tabbed Group Picker - Basic Example
 */
export declare class TabbedGroupPickerNoSelectionExample {
    getActions: () => {
        actionId: number;
        name: string;
    }[];
    actionsTab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            actionId: number;
            name: string;
        }[];
    };
    example_tab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            actionId: number;
            name: string;
        }[];
    }[];
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    lastSelection: string;
    onActivation(selectedData: {
        actionId: number;
        name: string;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerNoSelectionExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerNoSelectionExample, "tabbed-group-picker-no-selection-example", never, {}, {}, never, never, false, never>;
}
