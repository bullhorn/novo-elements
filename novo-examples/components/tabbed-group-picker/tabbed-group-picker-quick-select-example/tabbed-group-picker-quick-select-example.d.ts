import { TabbedGroupPickerTab } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Tabbed Group Picker - Quick Select Example
 */
export declare class TabbedGroupPickerQuickSelectExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    example_tab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    }[];
    example_quickSelectConfig: {
        label: string;
        items: ({
            childTypeName: string;
            children: number[];
            label: string;
            all?: undefined;
        } | {
            childTypeName: string;
            all: boolean;
            label: string;
            children?: undefined;
        })[];
    };
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerQuickSelectExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerQuickSelectExample, "tabbed-group-picker-quick-select-example", never, {}, {}, never, never, false, never>;
}
