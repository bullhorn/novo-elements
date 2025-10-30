import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @title Autocomplete Usage
 */
export declare class AutocompleteUsageExample implements OnInit {
    myControl: UntypedFormControl;
    options: string[];
    filteredOptions: Observable<string[]>;
    ngOnInit(): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteUsageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteUsageExample, "autocomplete-usage-example", never, {}, {}, never, never, false, never>;
}
