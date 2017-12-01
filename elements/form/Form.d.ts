import { OnInit } from '@angular/core';
import { NovoFormGroup } from './FormInterfaces';
export declare class NovoFormElement implements OnInit {
    form: NovoFormGroup;
    layout: string;
    hideHeader: boolean;
    showingAllFields: boolean;
    showingRequiredFields: boolean;
    ngOnInit(): void;
    readonly value: any;
    readonly isValid: boolean;
    showAllFields(): void;
    showOnlyRequired(hideRequiredWithValue: any): void;
    forceValidation(): void;
}
