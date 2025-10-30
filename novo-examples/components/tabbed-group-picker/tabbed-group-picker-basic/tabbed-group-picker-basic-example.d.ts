import { TabbedGroupPickerTab } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Tabbed Group Picker - Basic Example
 */
export declare class TabbedGroupPickerBasicExample {
    getAnimals: () => {
        animalId: number;
        name: string;
    }[];
    getPlaces: () => {
        localName: string;
        englishName: string;
    }[];
    getColors: () => {
        rgb: string;
        colorName: string;
    }[];
    animalTab: {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    };
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            animalId: number;
            name: string;
        }[];
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            localName: string;
            englishName: string;
        }[];
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            rgb: string;
            colorName: string;
        }[];
    })[];
    buttonLabel: string;
    example_buttonConfig: {
        theme: string;
        side: string;
        icon: string;
        label: string;
        selector: string;
    };
    selectedAnimals: string[];
    selectedPlaces: string[];
    selectedColors: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerBasicExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerBasicExample, "tabbed-group-picker-basic-example", never, {}, {}, never, never, false, never>;
}
