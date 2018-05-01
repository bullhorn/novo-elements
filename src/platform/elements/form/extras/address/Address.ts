// NG2
import {
  Component, forwardRef, Input, OnInit, ChangeDetectionStrategy, EventEmitter, Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { getCountries, getStates, getStateObjects, findByCountryName, findByCountryId } from '../../../../utils/countries/Countries';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoAddressElement),
  multi: true
};

export interface NovoAddressSubfieldConfig {
  label: string;
  required: boolean;
  maxlength: number;
  pickerConfig?: any;
  hidden: boolean;
}

export interface NovoAddressConfig {
  required?: boolean;
  address1?: NovoAddressSubfieldConfig;
  address2?: NovoAddressSubfieldConfig;
  city?: NovoAddressSubfieldConfig;
  state?: NovoAddressSubfieldConfig;
  zip?: NovoAddressSubfieldConfig;
  countryID?: NovoAddressSubfieldConfig;
}

@Component({
  selector: 'novo-address',
  providers: [ADDRESS_VALUE_ACCESSOR],
  template: `
        <span *ngIf="!config?.address1?.hidden" class="street-address" [class.invalid]="invalid.address1" [class.focus]="focused.address1" [class.disabled]="disabled.address1">
            <i *ngIf="config.address1.required"
                class="required-indicator address1"
                [ngClass]="{'bhi-circle': !valid.address1, 'bhi-check': valid.address1}">
            </i>
            <input [class.maxlength-error]="invalidMaxlength.address1" type="text" id="address1" name="address1" [placeholder]="config.address1.label" [maxlength]="config?.address1?.maxlength" autocomplete="shipping street-address address-line-1" [(ngModel)]="model.address1" (ngModelChange)="updateControl()" (focus)="isFocused($event, 'address1')" (blur)="isBlurred($event, 'address1')" (input)="onInput($event, 'address1')"/>
        </span>
        <span *ngIf="!config?.address2?.hidden" class="apt suite" [class.invalid]="invalid.address2" [class.focus]="focused.address2" [class.disabled]="disabled.address2">
            <i *ngIf="config.address2.required"
                class="required-indicator address2"
                [ngClass]="{'bhi-circle': !valid.address2, 'bhi-check': valid.address2}">
            </i>
            <input [class.maxlength-error]="invalidMaxlength.address2" type="text" id="address2" name="address2" [placeholder]="config.address2.label" [maxlength]="config?.address2?.maxlength" autocomplete="shipping address-line-2" [(ngModel)]="model.address2" (ngModelChange)="updateControl()" (focus)="isFocused($event, 'address2')" (blur)="isBlurred($event, 'address2')" (input)="onInput($event, 'address2')"/>
        </span>
        <span *ngIf="!config?.city?.hidden" class="city locality" [class.invalid]="invalid.city" [class.focus]="focused.city" [class.disabled]="disabled.city">
            <i *ngIf="config.city.required"
                class="required-indicator"
                [ngClass]="{'bhi-circle': !valid.city, 'bhi-check': valid.city}">
            </i>
            <input [class.maxlength-error]="invalidMaxlength.city" type="text" id="city" name="city" [placeholder]="config.city.label" autocomplete="shipping city locality" [maxlength]="config?.city?.maxlength" [(ngModel)]="model.city" (ngModelChange)="updateControl()" (focus)="isFocused($event, 'city')" (blur)="isBlurred($event, 'city')" (input)="onInput($event, 'city')"/>
        </span>
        <span *ngIf="!config?.state?.hidden" class="state region" [class.invalid]="invalid.state" [class.focus]="focused.state" [class.disabled]="disabled.state">
            <i *ngIf="config.state.required"
                class="required-indicator"
                [ngClass]="{'bhi-circle': !valid.state, 'bhi-check': valid.state}">
            </i>
            <novo-picker [config]="config?.state?.pickerConfig" [placeholder]="config?.state?.label" (select)="onStateChange($event)" (changed)="onStateChange($event)" autocomplete="shipping region" [(ngModel)]="model.state"></novo-picker>
        </span>
        <span *ngIf="!config?.zip?.hidden" class="zip postal-code" [class.invalid]="invalid.zip" [class.focus]="focused.zip" [class.disabled]="disabled.zip">
            <i *ngIf="config.zip.required"
                class="required-indicator"
                [ngClass]="{'bhi-circle': !valid.zip, 'bhi-check': valid.zip}">
            </i>
            <input [class.maxlength-error]="invalidMaxlength.zip" type="text" id="zip" name="zip" [placeholder]="config.zip.label" autocomplete="shipping postal-code" [maxlength]="config?.zip?.maxlength" [(ngModel)]="model.zip" (ngModelChange)="updateControl()" (focus)="isFocused($event, 'zip')" (blur)="isBlurred($event, 'zip')" (input)="onInput($event, 'zip')" />
        </span>
        <span *ngIf="!config?.countryID?.hidden" class="country-name" [class.invalid]="invalid.countryID" [class.focus]="focused.countryID" [class.disabled]="disabled.countryID">
            <i *ngIf="config.countryID.required"
                class="required-indicator"
                [ngClass]="{'bhi-circle': !valid.countryID, 'bhi-check': valid.countryID}">
            </i>
            <novo-picker [config]="config?.countryID?.pickerConfig" [placeholder]="config.countryID.label" (select)="onCountryChange($event)" (changed)="onCountryChange($event)" autocomplete="shipping country" [(ngModel)]="model.countryName"></novo-picker>
        </span>
    `
})
export class NovoAddressElement implements ControlValueAccessor, OnInit {
  @Input() config: NovoAddressConfig;
  states: Array<any> = [];
  countries: Array<any> = getCountries();
  fieldList: Array<string> = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
  model: any;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };
  focused: any = {};
  invalid: any = {};
  disabled: any ={};
  invalidMaxlength: any = {};
  valid: any = {};
  stateOptions: any;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  constructor(public labels: NovoLabelService) { }

  ngOnInit() {
    if (!this.config) {
      this.config = {
      };
    }
    if (this.model) {
      this.writeValue(this.model);
      this.updateControl();
    } else if (!this.model) {
      this.model = {};
    }
    this.fieldList.forEach(((field: string) => {
      if (!this.config.hasOwnProperty(field)) {
        this.config[field] = {};
      }
      if (field === 'countryID' && !this.config[field].pickerConfig) {
        this.config.countryID.pickerConfig = {
          field: 'id',
          format: '$name',
          options: getCountries()
        };
      }
      if (field === 'state' && !this.config[field].pickerConfig) {
        this.config.state.pickerConfig = {
          field: 'id',
          format: '$name',
          options: (query) => {
            return Promise.resolve(this.getStateOptions(query));
          },
          custom: false,
        };
      } else if (field === 'state' && this.config[field].pickerConfig && this.config[field].pickerConfig.options) {
        let stateOptions = this.config[field].pickerConfig.options;
        this.stateOptions = stateOptions;
        this.config[field].pickerConfig.options = (query) => {
          return stateOptions(this.model.countryID, query);
        };
        this.config[field].pickerConfig = {
          custom: true,
          defaultOptions: stateOptions
        };
      }
      if (!this.config[field].hasOwnProperty('label')) {
        this.config[field].label = this.labels[field];
      }
      if (this.config.required) {
        this.config[field].required = true;
      }

    }));
  }

  isValid(field: string): void {
    let valid: boolean = true;
    if (((this.config[field].required && Helpers.isEmpty(this.model[field])) || !this.config[field].required) &&
      !(field === 'countryID' && this.config[field].required && !Helpers.isEmpty(this.model.countryName))) {
      valid = false;
    } else if (!Helpers.isEmpty(this.model[field]) && !Helpers.isBlank(this.config[field].maxlength) && this.config[field].maxlength < this.model[field].length) {
      valid = false;
    }
    this.valid[field] = valid;
  }

  isInvalid(field: string): void {
    let invalid: boolean = false;
    let invalidMaxlength: boolean = false;
    if (((this.config[field].required && Helpers.isEmpty(this.model[field]) && !Helpers.isBlank(this.model[field]))) &&
      !(field === 'countryID' && this.config[field].required && !Helpers.isEmpty(this.model.countryName) && !Helpers.isBlank(this.model.countryName))) {
      invalid = true;
    } else if (!Helpers.isEmpty(this.model[field]) && !Helpers.isBlank(this.config[field].maxlength) && this.config[field].maxlength < this.model[field].length) {
      invalid = true;
      invalidMaxlength = true;
    }
    this.invalid[field] = invalid;
    this.invalidMaxlength[field] = invalidMaxlength;
  }

  isDisabled(field: string): void {
   this.disabled[field] = true;
  }

  onInput(event: Event, field: string): void {
    this.isInvalid(field);
    this.isValid(field);
    if (event) {
      this.change.emit({ value: this.model[field], field: field });
    }
  }

  isFocused(event: Event, field: string): void {
    this.focused[field] = true;
    this.focus.emit({ event, field });
  }

  isBlurred(event: Event, field: string): void {
    this.focused[field] = false;
    this.blur.emit({ event, field });
  }

  onCountryChange(evt) {
    let country: any = evt && evt.value ? findByCountryName(evt.value) : null;
    if (country) {
      this.model.countryName = country.name;
      this.model.countryCode = country.code;
      this.model.countryID = country.id;
      this.updateStates();
    }

    // Update state
    this.model.state = undefined;
    this.updateControl();
    this.onInput(null, 'countryID');
  }

  onStateChange(evt) {
    let state: any = evt && evt.value ? evt.value : null;
    if (state) {
      this.model.state = evt;
      this.updateControl();
      this.onInput(null, 'state');
    }
  }

  updateStates() {
    if (this.config.state.pickerConfig.custom) {
      this.config.state.pickerConfig.options = (query) => {
        return this.stateOptions(this.model.countryID, query);
      };
      this.stateOptions(this.model.countryID).then((results) => {
        if (results.length) {
          this.config.state.pickerConfig.defaultOptions = results;
        } else {
          this.isDisabled('state');
          if (this.config.state.required) {
            this.valid.state = true;
          }
        }
        });
    } else if (this.model.countryName) {
      this.states = getStates(this.model.countryName);
      if(this.states.length) {
        this.config.state.pickerConfig.defaultOptions = this.states;
      } else {
        this.isDisabled('state');
        if (this.config.state.required) {
          this.valid.state = true;
        }
      }
    } else {
      this.states = [];
    }
  }

  getStateOptions(filter?:string): any[] {
    if (this.model.countryName) {
      const states = getStates(this.model.countryName);
      if (filter) {
        return states.filter((name) => new RegExp(`${filter}`, 'gi').test(name));
      }
      return states;
    } else {
      return [];
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
    this.fieldList.forEach((field: string) => {
      this.onInput(null, field);
    });
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
