// NG2
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { getCountries, getStates, findByCountryName, findByCountryId } from '../../../../utils/countries/Countries';

// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAddressElement),
    multi: true
};

@Component({
    selector: 'novo-address',
    providers: [ADDRESS_VALUE_ACCESSOR],
    template: `
        <input type="text" class="street-address" id="address1" name="address1" placeholder="Address" [(ngModel)]="address1" (ngModelChange)="updateControl()"/>
        <input type="text" class="apt suite" id="address2" name="address2" placeholder="Apt" [(ngModel)]="address2" (ngModelChange)="updateControl()"/>
        <input type="text" class="city locality" id="city" name="city" placeholder="City / Locality" [(ngModel)]="city" (ngModelChange)="updateControl()"/>
        <novo-select class="state region" id="state" [options]="states" placeholder="State / Region" [(ngModel)]="state" (ngModelChange)="onStateChange($event)"></novo-select>
        <input type="text" class="zip postal-code" id="zip" name="zip" placeholder="Postal Code" [(ngModel)]="zip" (ngModelChange)="updateControl()"/>
        <novo-select class="country-name" id="country" [options]="countries" placeholder="Country" [(ngModel)]="countryName" (ngModelChange)="onCountryChange($event)"></novo-select>
    `
})
export class NovoAddressElement implements ControlValueAccessor {
    states:Array = [];
    countries:Array = getCountries();

    @Input() model;
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    ngOnInit() {
        if (!this.model) {
            this.model = {
                countryID: 1,
                countryName: 'United States'
            };
        } else if (this.model.countryName) {
            this.model.countryName = this.model.countryName.trim();
        } else {
            this.address1 = this.model.address1;
            this.address2 = this.model.address2;
            this.city = this.model.city;
            this.state = this.model.state;
            this.zip = this.model.zip;
            this.countryID = this.model.countryID;
        }
        this.updateControl();
        this.updateStates();
    }

    onCountryChange(evt) {
        let country;
        if (typeof evt === 'number') {
            country = findByCountryId(this.model.countryID);
        } else {
            country = findByCountryName(evt);
        }
        this.model.countryName = country.name;
        this.model.countryCode = country.code;
        this.model.countryID = country.id;
        this.updateStates();

        // Update state
        // this.model.state = null;
        this.updateControl();
    }

    onStateChange(evt) {
        this.model.state = evt;
        this.updateControl();
    }

    updateStates() {
        if (this.model.countryName) {
            this.states = getStates(this.model.countryName);
        } else {
            this.states = [];
        }
    }

    updateControl() {
        this.onModelChange(this.model);
    }

    writeValue(model:any):void {
        if (!this.model || !this.model.length) {
            this.model = {
                countryID: 1,
                countryName: 'United States'
            };
        } else {
            this.model = model;
        }
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
