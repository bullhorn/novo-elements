// NG2
import { Component, forwardRef, Input, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// APP
import { getCountries, getStates, findByCountryId } from '../../../../utils/countries/Countries';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { Helpers } from '../../../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const ADDRESS_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoAddressElement),
  multi: true,
};

export interface NovoAddressSubfieldConfig {
  label: string;
  required: boolean;
  maxlength: number;
  pickerConfig?: any;
  hidden: boolean;
  updated?: boolean;
  readOnly?: boolean;
}

export interface NovoAddressConfig {
  required?: boolean;
  readOnly?: boolean;
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
        <span *ngIf="!config?.state?.hidden" class="state region" [class.invalid]="invalid.state" [class.focus]="focused.state" [class.disabled]="disabled.state"  [tooltip]="tooltip.state">
            <i *ngIf="config.state.required"
                class="required-indicator"
                [ngClass]="{'bhi-circle': !valid.state, 'bhi-check': valid.state}">
            </i>
            <novo-picker [config]="config?.state?.pickerConfig" [placeholder]="config?.state?.label" (changed)="onStateChange($event)" autocomplete="shipping region" [(ngModel)]="model.state" [disablePickerInput]="disabled.state"></novo-picker>
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
            <novo-picker [config]="config?.countryID?.pickerConfig" [placeholder]="config.countryID.label" (changed)="onCountryChange($event)" autocomplete="shipping country" [(ngModel)]="model.countryName" [disablePickerInput]="disabled.countryID"></novo-picker>
        </span>
    `,
})
export class NovoAddressElement implements ControlValueAccessor, OnInit {
  @Input()
  config: NovoAddressConfig;
  private _readOnly: boolean = false;
  @Input()
  set readOnly(readOnly: boolean) {
    this._readOnly = readOnly;
    this.fieldList.forEach((field: string) => {
      this.disabled[field] = this._readOnly;
    });
    if (this.model) {
      this.updateStates();
    }
  }
  get readOnly(): boolean {
    return this._readOnly;
  }
  states: Array<any> = [];
  countries: Array<any> = getCountries();
  fieldList: Array<string> = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  focused: any = {};
  invalid: any = {};
  disabled: any = {};
  invalidMaxlength: any = {};
  valid: any = {};
  stateOptions: any;
  tooltip: any = {};
  initComplete: boolean = false;
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  validityChange: EventEmitter<any> = new EventEmitter();

  constructor(public labels: NovoLabelService) {}

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
    if (this.model) {
      this.writeValue(this.model);
      this.updateControl();
    } else if (!this.model) {
      this.model = {};
    }
    this.initConfig();
    if (Helpers.isBlank(this.model.countryID)) {
      this.updateStates();
    }
  }

  initConfig(): void {
    this.fieldList.forEach((field: string) => {
      if (!this.config.hasOwnProperty(field)) {
        this.config[field] = {
          hidden: true,
        };
      }
      if (!this.config[field].hasOwnProperty('label')) {
        this.config[field].label = this.labels[field];
      }
      if (this.config.required) {
        this.config[field].required = true;
      }
      if (this.config[field].readOnly || this.config.readOnly) {
        this.config[field].readOnly = true;
        this.disabled[field] = true;
      }
      if (field === 'countryID') {
        if (!this.config[field].pickerConfig) {
          this.config.countryID.pickerConfig = this.getDefaultCountryConfig();
        }
        this.config[field].pickerConfig.defaultOptions = this.config.countryID.pickerConfig.options;
      }
      if (field === 'state') {
        if (!this.config[field].pickerConfig) {
          this.config.state.pickerConfig = this.getDefaultStateConfig();
          this.config[field].pickerConfig.defaultOptions = this.config[field].pickerConfig.options;
        }
        this.stateOptions = this.config[field].pickerConfig.options;
        this.config[field].pickerConfig.options = (query = '') => {
          return this.stateOptions(query, this.model.countryID);
        };
        this.config[field].pickerConfig.defaultOptions = this.stateOptions;
      }
    });
  }

  isValid(field: string): void {
    let valid: boolean = true;
    if (
      ((this.config[field].required && (Helpers.isBlank(this.model[field]) || Helpers.isEmpty(this.model[field]))) ||
        !this.config[field].required) &&
      !(field === 'countryID' && this.config[field].required && !Helpers.isBlank(this.model.countryID)) &&
      !(
        field === 'state' &&
        this.config[field].required &&
        (!Helpers.isEmpty(this.model.state) ||
          ((Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
            !Helpers.isBlank(this.model.countryName) &&
            this.config.state.pickerConfig &&
            this.config.state.pickerConfig.defaultOptions &&
            this.config.state.pickerConfig.defaultOptions.length === 0))
      )
    ) {
      valid = false;
    } else if (
      !Helpers.isEmpty(this.model[field]) &&
      !Helpers.isBlank(this.config[field].maxlength) &&
      this.config[field].maxlength < this.model[field].length
    ) {
      valid = false;
    }
    this.valid[field] = valid;
  }

  isInvalid(field: string): void {
    let invalid: boolean = false;
    let invalidMaxlength: boolean = false;
    if (
      (field !== 'countryID' &&
        field !== 'state' &&
        this.config[field].required &&
        Helpers.isEmpty(this.model[field]) &&
        !Helpers.isBlank(this.model[field])) ||
      (field === 'countryID' && this.config[field].required && Helpers.isBlank(this.model.countryName) && this.config[field].updated) ||
      (field === 'state' &&
        this.config[field].required &&
        (Helpers.isBlank(this.model.state) || Helpers.isEmpty(this.model.state)) &&
        !Helpers.isBlank(this.model.countryID) &&
        this.config[field].updated &&
        this.config.state.pickerConfig &&
        this.config.state.pickerConfig.defaultOptions &&
        this.config.state.pickerConfig.defaultOptions.length > 0)
    ) {
      invalid = true;
    } else if (
      !Helpers.isEmpty(this.model[field]) &&
      !Helpers.isBlank(this.config[field].maxlength) &&
      this.config[field].maxlength < this.model[field].length
    ) {
      invalid = true;
      invalidMaxlength = true;
    }
    this.invalid[field] = invalid;
    this.invalidMaxlength[field] = invalidMaxlength;
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
    let country: any = evt && evt.rawValue ? evt.rawValue : null;
    let field: any;
    let statesUpdatable: boolean = false;
    this.config.countryID.updated = true;
    if (this.config.countryID.pickerConfig) {
      field = this.config.countryID.pickerConfig.field;
    }
    if (country && field && !Helpers.isBlank(country[field]) && this.model.countryID !== country[field]) {
      this.model.countryID = country[field];
      this.model.countryName = Helpers.interpolate(this.config.countryID.pickerConfig.format, country);
      this.disabled.state = false;
      this.tooltip.state = undefined;
      statesUpdatable = true;
    } else if (Helpers.isBlank(country) || Helpers.isBlank(country[field])) {
      this.model.countryID = undefined;
      this.model.countryName = undefined;
      this.disabled.state = true;
      this.tooltip.state = this.labels.selectCountryFirst;
      this.invalid.state = false;
      statesUpdatable = true;
    }

    // Update state
    if (statesUpdatable) {
      this.model.state = undefined;
      this.updateStates();
    }
    this.updateControl();
    this.onInput(null, 'countryID');
    this.onInput(null, 'state');
  }

  onStateChange(evt) {
    let state: any = evt && evt.value ? evt.value : null;
    this.config.state.updated = true;
    this.model.state = state;
    this.updateControl();
    this.onInput(null, 'state');
  }

  setStateLabel(model: any) {
    let state: string = model.state;
    if (!Helpers.isBlank(state)) {
      if (this.config.state.required) {
        this.valid.state = true;
      }
      this.model.state = state;
    } else {
      this.model.state = undefined;
      if (this.config.state.required) {
        this.valid.state = false;
      }
    }
  }

  updateStates() {
    if (this.config.state.pickerConfig.options && !Helpers.isBlank(this.model.countryID)) {
      this.config.state.pickerConfig.options = (query = '') => {
        return this.stateOptions(query, this.model.countryID);
      };
      this.stateOptions('', this.model.countryID).then((results) => {
        this.config.state.pickerConfig.defaultOptions = results;
        if (results.length) {
          this.tooltip.state = undefined;
          this.disabled.state = this._readOnly;
          this.setStateLabel(this.model);
        } else {
          this.disabled.state = true;
          this.tooltip.state = this.labels.noStatesForCountry;
          if (this.config.state.required) {
            this.valid.state = true;
          }
        }
        this.validityChange.emit();
        this.onInput(null, 'state');
      });
    } else {
      this.config.state.pickerConfig.defaultOptions = [];
      this.disabled.state = true;
      this.tooltip.state = this.labels.selectCountryFirst;
      if (this.config.state.required) {
        this.valid.state = false;
      }
    }
  }

  getStateOptions(filter: string = '', countryID: number): any[] {
    if (countryID) {
      const country: any = findByCountryId(countryID);
      const states: any[] = getStates(country.name);
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
    this.onInput(null, 'countryID');
    this.onInput(null, 'state');
  }

  writeValue(model: any): void {
    let loadingCountries: boolean = false;
    if (model) {
      let countryName;
      if (model.countryName && model.countryID) {
        countryName = model.countryName;
      } else if (model.countryID) {
        if (this.config.countryID.pickerConfig && this.config.countryID.pickerConfig.getLabels) {
          if (Helpers.isFunction(this.config.countryID.pickerConfig.getLabels)) {
            let promise: any = this.config.countryID.pickerConfig.getLabels(model.countryID);
            loadingCountries = true;
            if (promise.then) {
              promise.then((result: any) => {
                loadingCountries = false;
                countryName = Helpers.interpolateWithFallback(this.config.countryID.pickerConfig.format, result);
                this.model = Object.assign(model, { countryName });
                this.updateStates();
              });
            }
          }
        }
      }
      if (countryName) {
        countryName = countryName.trim();
        model.state = model.state || '';
        this.model = Object.assign(model, { countryName: countryName });
      } else {
        this.model = model;
      }
      if (!loadingCountries && !Helpers.isBlank(this.model.countryID)) {
        this.updateStates();
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

  private getDefaultStateConfig(): any {
    return {
      field: 'value',
      format: '$label',
      options: (query = '', countryID) => {
        return Promise.resolve(this.getStateOptions(query, countryID));
      },
      getLabels: (state: string) => {
        return Promise.resolve(state);
      },
    };
  }

  private getDefaultCountryConfig(): any {
    return {
      field: 'value',
      format: '$label',
      options: (query: string = '') => {
        return new Promise((resolve: any) => {
          let countries: any = getCountries();
          if (query) {
            countries = countries.filter((country) => new RegExp(`${query}`, 'gi').test(country.name));
          }
          return resolve(countries);
        });
      },
      getLabels: (countryID) => {
        return new Promise((resolve: any) => {
          let country: any = findByCountryId(countryID);
          if (country) {
            resolve(country.name);
          } else {
            resolve('');
          }
        });
      },
    };
  }
}
