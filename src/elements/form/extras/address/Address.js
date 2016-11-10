// NG2
import { Component, forwardRef, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
    constructor(changeDetectorRef:ChangeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    onModelChange:Function = () => {
    };
    onModelTouched:Function = () => {
    };

    ngOnInit() {
        this.values = {};
        if (this.model) {
            Object.assign(this.values, this.model);
        }
        if (this.model.countryName) {
            this.model.countryName = this.model.countryName.trim();
        } else {
            setTimeout(() => {
                if (this.model) {
                    this.address1 = this.values.address1;
                    this.address2 = this.values.address2;
                    this.city = this.values.city;
                    this.zip = this.values.zip;
                    this.countryID = this.values.countryID;
                    this.onCountryChange(this.values.countryID);
                    this.state = this.states.find(state => {
                        return state === this.values.state;
                    });
                    this.updateControl();
                }
            });
        }
    }

    onCountryChange(evt) {
        let country;
        if (typeof evt === 'number') {
            country = findByCountryId(this.model.countryID);
        } else {
            country = findByCountryName(evt);
        }
        this.countryName = country.name;
        this.countryCode = country.code;
        this.countryID = country.id;
        this.updateStates();

        // Update state
        this.state = null;
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
