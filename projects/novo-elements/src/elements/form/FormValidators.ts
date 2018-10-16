import { Helpers } from './../../utils/Helpers';

const MAX_INTEGER = 2147483647;
const MIN_YEAR = 1753;

export class FormValidators {
  private showStateRequiredFlag(subfield, control): boolean {
    return (
      subfield === 'state' &&
      !Helpers.isEmpty(control.config.state) &&
      control.config.state.required &&
      Helpers.isBlank(control.value.state) &&
      control.config.state.updated &&
      !Helpers.isBlank(control.value.countryName) &&
      control.config.state.pickerConfig &&
      control.config.state.pickerConfig.defaultOptions &&
      control.config.state.pickerConfig.defaultOptions.length > 0
    );
  }

  // Makes sure the control value does not exceed the max integer value
  static maxInteger(control) {
    return control.value < MAX_INTEGER ? null : { integerTooLarge: true };
  }

  // Makes sure the control value is above the minimum year
  static minYear(control) {
    if (!control.value) {
      return null;
    }
    return control.value >= MIN_YEAR ? null : { minYear: true };
  }

  // Makes sure the control value does not exceed the max number value
  static maxDouble(control) {
    return control.value < Number.MAX_SAFE_INTEGER ? null : { doubleTooLarge: true };
  }

  // Make sure the control value is an email
  static isEmail(control) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return !control.value || EMAIL_REGEXP.test(control.value) ? null : { invalidEmail: true };
  }
  // Makes sure the control value is a valid address
  static isValidAddress(control) {
    let fieldList: string[] = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
    let invalidAddressFields: string[] = [];
    let maxlengthFields: string[] = [];
    let returnVal: {
      invalidAddress?: boolean;
      invalidAddressFields?: string[];
      invalidAddressForForm?: boolean;
      maxlength?: boolean;
      maxlengthFields?: string[];
    } = null;
    let maxlengthError: boolean = false;
    let showCountryRequiredFlag = (subfield, ctrl) => {
      return (
        subfield === 'countryID' &&
        !Helpers.isEmpty(ctrl.config.countryID) &&
        ctrl.config.countryID.required &&
        Helpers.isBlank(ctrl.value.countryName) &&
        ctrl.config.countryID.updated
      );
    };

    let showStateRequiredFlag = (subfield, ctrl): boolean => {
      return (
        subfield === 'state' &&
        !Helpers.isEmpty(ctrl.config.state) &&
        ctrl.config.state.required &&
        Helpers.isBlank(ctrl.value.state) &&
        ctrl.config.state.updated &&
        !Helpers.isBlank(ctrl.value.countryName) &&
        ctrl.config.state.pickerConfig &&
        ctrl.config.state.pickerConfig.defaultOptions &&
        ctrl.config.state.pickerConfig.defaultOptions.length > 0
      );
    };

    if (control.value && control.config) {
      let valid = true;
      let formValidity = true;
      fieldList.forEach((subfield: string) => {
        if (!Helpers.isEmpty(control.config[subfield])) {
          if (
            (['countryID', 'state'].indexOf(subfield) === -1 &&
              control.config[subfield].required &&
              !Helpers.isBlank(control.value[subfield]) &&
              Helpers.isEmpty(control.value[subfield])) ||
            showCountryRequiredFlag(subfield, control) ||
            showStateRequiredFlag(subfield, control)
          ) {
            valid = false;
            invalidAddressFields.push(control.config[subfield].label);
          }
          if (
            ((subfield !== 'countryID' && control.config[subfield].required && Helpers.isEmpty(control.value[subfield])) ||
              (subfield === 'countryID' &&
                !Helpers.isEmpty(control.config.countryID) &&
                control.config.countryID.required &&
                Helpers.isEmpty(control.value.countryName))) &&
            !(
              subfield === 'state' &&
              !Helpers.isBlank(control.value.countryName) &&
              control.config.state.pickerConfig &&
              control.config.state.pickerConfig.defaultOptions &&
              control.config.state.pickerConfig.defaultOptions.length === 0
            )
          ) {
            formValidity = false;
          }
          if (
            !Helpers.isEmpty(control.config[subfield].maxlength) &&
            !Helpers.isEmpty(control.value[subfield]) &&
            control.value[subfield].length > control.config[subfield].maxlength
          ) {
            maxlengthError = true;
            maxlengthFields.push(subfield);
            formValidity = false;
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
      return returnVal;
    }
    return null;
  }
}
