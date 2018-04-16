import { Helpers } from './../../utils/Helpers';

const MAX_INTEGER = 2147483647;
const MIN_YEAR = 1753;

export class FormValidators {
  // Makes sure the control value does not exceed the max integer value
  static maxInteger(control) {
    return control.value < MAX_INTEGER ? null : { 'integerTooLarge': true };
  }

  // Makes sure the control value is above the minimum year
  static minYear(control) {
    if (!control.value) {
      return null;
    }
    return control.value >= MIN_YEAR ? null : { 'minYear': true };
  }

  // Makes sure the control value does not exceed the max number value
  static maxDouble(control) {
    return control.value < Number.MAX_SAFE_INTEGER ? null : { 'doubleTooLarge': true };
  }

  // Make sure the control value is an email
  static isEmail(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return !control.value || EMAIL_REGEXP.test(control.value) ? null : { 'invalidEmail': true };
  }
  // Makes sure the control value is a valid address
  static isValidAddress(control) {
    console.log('checking if address is valid')
    let fieldList: string[] = ['address1', 'address2', 'city', 'state', 'zip', 'country'];
    let invalidAddressFields: string[] = [];
    let maxlengthFields: string[] = [];
    let maxlengthMetFields: string[] = [];
    let returnVal: {
      invalidAddress?: boolean;
      invalidAddressFields?: string[];
      invalidAddressForForm?: boolean;
      maxlength?: boolean;
      maxlengthFields?: string[];
      maxlengthMet?: boolean;
      maxlengthMetFields?: string[];
    } = null;
    let maxlengthError: boolean = false;
    let maxlengthMetError: boolean = false;
    if (control.value && control.config) {
      let valid = true;
      let formValidity = true;
      fieldList.forEach((subfield: string) => {
        if (!Helpers.isEmpty(control.config[subfield])) {
          if ((subfield !== 'country' && control.config[subfield].required &&
            !Helpers.isBlank(control.value[subfield]) && Helpers.isEmpty(control.value[subfield])) ||
            (subfield === 'country' && !Helpers.isEmpty(control.config.country) && control.config.country.required &&
              !Helpers.isBlank(control.value.countryName) && Helpers.isEmpty(control.value.countryName)) ||
              ((!Helpers.isEmpty(control.config[subfield]) && control.value[subfield] && control.value[subfield].length >= control.config[subfield].maxlength
            ))) {
            valid = false;
            invalidAddressFields.push(control.config[subfield].label);
          }
          if ((subfield !== 'country' && control.config[subfield].required &&
            Helpers.isEmpty(control.value[subfield])) ||
            (subfield === 'country' && !Helpers.isEmpty(control.config.country) && control.config.country.required &&
              Helpers.isEmpty(control.value.countryName))) {
            formValidity = false;
          } else if (!Helpers.isEmpty(control.config[subfield].maxlength) && !Helpers.isEmpty(control.value[subfield]) &&
            control.value[subfield].length > control.config[subfield].maxlength) {
              maxlengthError = true;
              maxlengthFields.push(subfield);
          } else if (!Helpers.isEmpty(control.config[subfield].maxlength) && !Helpers.isEmpty(control.value[subfield]) &&
            control.value[subfield].length === control.config[subfield].maxlength) {
              maxlengthMetError = true;
              maxlengthMetFields.push(subfield);
              console.log('maxlengthMeterror', maxlengthMetFields)
          } else {
              if (!Helpers.isEmpty(control.config[subfield].maxlength) && !Helpers.isEmpty(control.value[subfield])) {
              console.log('control.value[subfield].length', control.value[subfield].length)            
              console.log('control.config[subfield].maxlength', control.config[subfield].maxlength)            
              }
          }
        }
      });
      if (!valid || !formValidity || maxlengthError) {
        returnVal = {};
      }
      if (!valid) {
        returnVal.invalidAddress = true;
        returnVal.invalidAddressFields = invalidAddressFields;
      }
      if (!formValidity) {
        returnVal.invalidAddressForForm = true;
      }
      if (maxlengthError) {
        returnVal.maxlength = true;
        returnVal.maxlengthFields = maxlengthFields;
      }
      if (maxlengthMetError) {
        returnVal.maxlengthMet = true;
        returnVal.maxlengthMetFields = maxlengthMetFields;
      }
      console.log('returnVal', returnVal)
      return returnVal;
    }
    console.log('returning null')
    return null;
  }
}
