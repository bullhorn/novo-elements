import { TabbedGroupPickerTab } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Tabbed Group Picker - Groups Example
 */
export declare class TabbedGroupPickerGroupsExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    getAnimalCategories: () => {
        groupId: number;
        name: string;
        children?: {
            animalId: number;
            name: string;
        }[];
    }[];
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
        childTypeName?: undefined;
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        childTypeName: string;
        data: {
            groupId: number;
            name: string;
            children?: {
                animalId: number;
                name: string;
            }[];
        }[];
    })[];
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
    selectedAnimalCategories: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerGroupsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerGroupsExample, "tabbed-group-picker-groups-example", never, {}, {}, never, never, false, never>;
}
