// NG2
import { Component, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <input type="text" class="street-address" id="address1" name="address1" placeholder="Address" [(ngModel)]="model.address1" (ngModelChange)="updateControl()"/>
        <input type="text" class="apt suite" id="address2" name="address2" placeholder="Apt" [(ngModel)]="model.address2" (ngModelChange)="updateControl()"/>
        <input type="text" class="city locality" id="city" name="city" placeholder="City / Locality" [(ngModel)]="model.city" (ngModelChange)="updateControl()"/>
        <novo-select class="state region" id="state" [options]="states" placeholder="State / Region" [(ngModel)]="model.state" (ngModelChange)="onStateChange($event)"></novo-select>
        <input type="text" class="zip postal-code" id="zip" name="zip" placeholder="Postal Code" [(ngModel)]="model.zip" (ngModelChange)="updateControl()"/>
        <novo-select class="country-name" id="country" [options]="countries" placeholder="Country" [(ngModel)]="model.countryName" (ngModelChange)="onCountryChange($event)"></novo-select>
    `
})
export class NovoAddressElement implements ControlValueAccessor {
    states:Array = [];
    countries:Array = getCountries();

    model;
    constructor(changeDetectorRef:ChangeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
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
        }
        this.updateControl();
        this.updateStates();
    }

    onCountryChange(evt) {
        let country;
        if (typeof evt === 'number') {
            country = findByCountryId(evt);
        } else {
            country = findByCountryName(evt);
        }
        this.model.countryName = country.name;
        this.model.countryCode = country.code;
        this.model.countryID = country.id;
        this.updateStates();

        // Update state
        this.model.state = undefined;
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
        this.changeDetectorRef.markForCheck();
    }

    writeValue(model:any):void {
        setTimeout(() => {
            if (!model) {
                this.model = {
                    countryID: 1,
                    countryName: 'United States'
                };
            } else {
                model.countryName = findByCountryId(model.countryID);
                model.state = this.states.find(state => {
                    return state === model.state;
                });
                this.model = model;
                this.updateControl();
            }
        });
    }

    registerOnChange(fn:Function):void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn:Function):void {
        this.onModelTouched = fn;
    }
}
