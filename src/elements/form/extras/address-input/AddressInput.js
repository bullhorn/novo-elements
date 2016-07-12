import { Component } from '@angular/core';
import { COMMON_DIRECTIVES, NgModel } from '@angular/common';

import { NOVO_SELECT_ELEMENTS } from './../../../select';
import { BaseInput } from './../FormExtras';
import { getCountries, getStates, findByCountryName } from '../../../../utils/countries/Countries';

@Component({
    selector: 'address-input',
    inputs: [
        'name',
        'placeholder',
        'required'
    ],
    directives: [
        COMMON_DIRECTIVES,
        NOVO_SELECT_ELEMENTS,
        NgModel
    ],
    template: `
        <i *ngIf="required" class="required-indicator" [ngClass]="{'bhi-circle': !control.valid, 'bhi-check': control.valid}"></i>
        <input type="text" class="street-address" id="address1" [name]="address1" placeholder="Address" [(ngModel)]="value.address1" (ngModelChange)="postChanges()"/>
        <input type="text" class="apt suite" id="address2" [name]="address2" placeholder="Apt" [(ngModel)]="value.address2" (ngModelChange)="postChanges()"/>
        <input type="text" class="city locality" id="city" [name]="city" placeholder="City / Locality" [(ngModel)]="value.city" (ngModelChange)="postChanges()"/>
        <novo-select class="state region" id="state" [options]="states" placeholder="State / Region" [(ngModel)]="value.state" (ngModelChange)="onStateChange($event)"></novo-select>
        <input type="text" class="zip postal-code" id="zip" [name]="zip" placeholder="Postal Code" [(ngModel)]="value.zip" (ngModelChange)="postChanges()"/>
        <novo-select class="country-name" id="country" [options]="countries" placeholder="Country" [(ngModel)]="value.countryName" (ngModelChange)="onCountryChange($event)"></novo-select>
    `
})
export class AddressInput extends BaseInput {
    states:Array = [];
    constructor() {
        super();
        this.countries = getCountries();
    }

    ngOnInit() {
        super.ngOnInit();
        if (!this.value) {
            this.value = {
                countryID: 1,
                countryName: 'United States'
            };
        } else if (this.value.countryName) {
            this.value.countryName = this.value.countryName.trim();
        }
        this.updateControl();
        this.updateStates();
    }

    onCountryChange(evt) {
        this.value.countryName = evt;
        let country = findByCountryName(this.value.countryName);
        this.value.countryCode = country.code;
        this.value.countryID = country.id;
        this.updateStates();

        // Update state
        this.value.state = null;
        this.updateControl();
    }

    onStateChange(evt) {
        this.value.state = evt;
        this.postChanges();
    }

    updateStates() {
        if (this.value.countryName) {
            this.states = getStates(this.value.countryName);
        } else {
            this.states = [];
        }
    }

    validateAddress(address) {
        // Sure, this *could* be cleaner, but this is SUPER readable
        if (address) {
            // Address
            if (!address.address1 || address.address1.length === 0) {
                return false;
            }
            // City
            if (!address.city || address.city.length === 0) {
                return false;
            }
            // State
            if (!address.state || address.state.length < 2) {
                return false;
            }
            // Zip
            // TODO: may need to change this depending on localization
            if (!address.zip || address.zip.length < 5) {
                return false;
            }
            // Country
            if (!address.countryName || address.countryName.length === 0) {
                return false;
            }
            return true;
        }
        return false;
    }

    updateControl() {
        if (this.control) {
            if (this.validateAddress(this.value)) {
                // Valid
                this.control.updateValue(this.value);
            } else {
                this.control.updateValue();
            }
        }
    }

    postChanges() {
        this.updateControl();
        this.update.emit(this.value);
    }
}
