import { ElementRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @title Autocomplete With Chips
 */
export declare class AutocompleteWithChipsExample {
    visible: boolean;
    selectable: boolean;
    removable: boolean;
    separatorKeysCodes: number[];
    searchCtrl: UntypedFormControl;
    fieldCtrl: UntypedFormControl;
    filteredFruits: Observable<string[]>;
    allFruits: string[];
    chipInput: ElementRef<HTMLInputElement>;
    constructor();
    add(event: any): void;
    remove(fruit: string): void;
    selected(event: NovoOptionSelectedEvent): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteWithChipsExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteWithChipsExample, "autocomplete-with-chips-example", never, {}, {}, never, never, false, never>;
}
