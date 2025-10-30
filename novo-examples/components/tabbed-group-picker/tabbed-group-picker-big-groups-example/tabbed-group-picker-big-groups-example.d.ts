import { TabbedGroupPickerTab } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Tabbed Group Picker - Big Groups Example
 */
export declare class TabbedGroupPickerBigGroupsExample {
    isPrime(number: any): boolean;
    example_tab: ({
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        data: {
            value: number;
            label: string;
        }[];
        childTypeName?: undefined;
    } | {
        typeName: string;
        typeLabel: string;
        valueField: string;
        labelField: string;
        childTypeName: string;
        data: {
            v: number;
            l: string;
            children: {
                value: number;
                label: string;
            }[];
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
    selectedPrimeFactorizations: string[];
    selectedDivisibles: string[];
    selectedIntegers: string[];
    onSelectionChange(selectedData: TabbedGroupPickerTab[]): void;
    buildButtonLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabbedGroupPickerBigGroupsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabbedGroupPickerBigGroupsExample, "tabbed-group-picker-big-groups-example", never, {}, {}, never, never, false, never>;
}
