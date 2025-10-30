import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoFieldControl } from 'novo-elements';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @title Autocomplete TextArea
 */
export declare class AutocompleteTextareaExample implements OnInit {
    myControl: UntypedFormControl;
    myOtherControl: UntypedFormControl;
    options: string[];
    filteredOptions: Observable<string[]>;
    ngOnInit(): void;
    triggerFn(): (control: NovoFieldControl<any>) => boolean;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteTextareaExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteTextareaExample, "autocomplete-textarea-example", never, {}, {}, never, never, false, never>;
}
