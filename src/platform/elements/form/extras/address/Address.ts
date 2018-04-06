// NG2
import {
    Component, forwardRef, Input, OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { getCountries, getStates, getStateObjects, findByCountryName, findByCountryId } from '../../../../utils/countries/Countries';
import { NovoLabelService } from '../../../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoAddressElement),
    multi: true
};

export interface NovoAddressSubfieldConfig {
    label: string;
}

export interface NovoAddressConfig {
    address1?: NovoAddressSubfieldConfig;
    address2?: NovoAddressSubfieldConfig;
    city?: NovoAddressSubfieldConfig;
    state?: NovoAddressSubfieldConfig;
    zip?: NovoAddressSubfieldConfig;
    country?: NovoAddressSubfieldConfig;
}

@Component({
    selector: 'novo-address',
    providers: [ADDRESS_VALUE_ACCESSOR],
    template: `
        <input type="text" class="street-address" id="address1" name="address1" [placeholder]="config.address1.label" autocomplete="shipping street-address address-line-1" [(ngModel)]="model.address1" (ngModelChange)="updateControl()"/>
        <input type="text" class="apt suite" id="address2" name="address2" [placeholder]="config.address2.label" autocomplete="shipping address-line-2" [(ngModel)]="model.address2" (ngModelChange)="updateControl()"/>
        <input type="text" class="city locality" id="city" name="city" [placeholder]="config.city.label" autocomplete="shipping city locality" [(ngModel)]="model.city" (ngModelChange)="updateControl()"/>
        <novo-select class="state region" id="state" [options]="states" [placeholder]="config.state.label" autocomplete="shipping region" [(ngModel)]="model.state" (ngModelChange)="onStateChange($event)"></novo-select>
        <input type="text" class="zip postal-code" id="zip" name="zip" [placeholder]="config.zip.label" autocomplete="shipping postal-code" [(ngModel)]="model.zip" (ngModelChange)="updateControl()"/>
        <novo-select class="country-name" id="country" [options]="countries" [placeholder]="config.country.label" autocomplete="shipping country" [(ngModel)]="model.countryName" (ngModelChange)="onCountryChange($event)"></novo-select>
    `
})
export class NovoAddressElement implements ControlValueAccessor, OnInit {
    @Input() config: NovoAddressConfig;
    states: Array<any> = [];
    countries: Array<any> = getCountries();
    fieldList: Array<string> = ['address1', 'address2', 'city', 'state', 'zip', 'country'];
    model: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(public labels: NovoLabelService) { }

    ngOnInit() {
        if (!this.config) {
            this.config = {
            };
        }
        this.fieldList.forEach(((field: string) => {
            if (!this.config.hasOwnProperty(field)) {
                this.config[field] = {
                    label: this.labels[field]
                };
            }
        }));
        if (this.model) {
            this.writeValue(this.model);
            this.updateControl();
        } else if (!this.model) {
            this.model = {};
        }
    }

    onCountryChange(evt) {
        let country: any = findByCountryName(evt);
        if (country) {
            this.model.countryName = country.name;
            this.model.countryCode = country.code;
            this.model.countryID = country.id;
            this.updateStates();
        }

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
    }

    writeValue(model: any): void {
        if (model) {
            let countryName;
            if (model.countryName) {
                countryName = model.countryName;
            } else if (model.countryID) {
                let country: any = findByCountryId(model.countryID);
                if (country) {
                    countryName = country.name;
                };
            }
            if (countryName) {
                countryName = countryName.trim();
                model.state = model.state || '';
                let stateObj: any = getStateObjects(countryName).find(state => {
                    return state.code === model.state.replace(/\W+/g, '').toUpperCase() || state.name === model.state;
                }) || {};
                this.model = Object.assign(model, { countryName: countryName, state: stateObj.name });
                this.updateStates();
            } else {
                this.model = model;
            }
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
