import { ElementRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NovoOptionSelectedEvent } from 'novo-elements';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface Recipient {
    id: number;
    name: string;
    email: string;
}
/**
 * @title Card Form Example
 */
export declare class CardFormExample {
    recipientCtrl: UntypedFormControl;
    filteredPeople: Observable<Recipient[]>;
    recipients: Recipient[];
    allPeople: Recipient[];
    searchInput: ElementRef<HTMLInputElement>;
    constructor();
    add(event: any): void;
    remove(person: Recipient): void;
    selected(event: NovoOptionSelectedEvent): void;
    private _filter;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardFormExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardFormExample, "card-form-example", never, {}, {}, never, never, false, never>;
}
export {};
