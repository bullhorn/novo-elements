import { UntypedFormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface ShiftData {
    id: number;
    startTime: string;
    endTime: string;
    numAssigned: number;
    openings: number;
}
/**
 * @title Autocomplete Stacked Chips
 */
export declare class AutocompleteStackedChipsExample {
    filteredShifts: Observable<ShiftData[]>;
    allShifts: ShiftData[];
    searchCtrl: UntypedFormControl;
    shiftCtrl: UntypedFormControl;
    constructor();
    add(event: any): void;
    remove(shift: ShiftData): void;
    selected(event: NovoOptionSelectedEvent): void;
    compareById(o1: any, o2: any): boolean;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteStackedChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteStackedChipsExample, "autocomplete-stacked-chips-example", never, {}, {}, never, never, false, never>;
}
export {};
