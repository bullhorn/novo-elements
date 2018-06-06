// NG2
import { Injectable } from '@angular/core';
// Vendor
// APP
import {
  AddressControl, BaseControl, CheckboxControl, CheckListControl, DateControl, DateTimeControl, EditorControl, FileControl, NovoControlConfig,
  PickerControl, RadioControl, SelectControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl
} from '../../elements/form/FormControls';
import { EntityPickerResult, EntityPickerResults } from '../../elements/picker/extras/entity-picker-results/EntityPickerResults';
import { Helpers } from '../Helpers';
import { NovoFieldset } from '../../elements/form/FormInterfaces';
import { NovoFormControl, NovoFormGroup } from '../../elements/form/NovoFormControl';
import { NovoLabelService } from '../../services/novo-label-service';
import { OptionsService } from './../../services/options/OptionsService';

@Injectable()
export class FormUtils {

  ASSOCIATED_ENTITY_LIST: string[] = ['Candidate', 'ClientContact', 'ClientCorporation', 'Lead', 'Opportunity', 'JobOrder', 'CorporateUser', 'Person', 'Placement'];
  PICKER_TEST_LIST: string[] = ['CandidateText', 'ClientText', 'ClientContactText', 'ClientCorporationText', 'LeadText', 'OpportunityText', 'JobOrderText', 'CorporateUserText', 'PersonText'];

  constructor(public labels: NovoLabelService, public optionsService: OptionsService) {
  }

  toFormGroup(controls: Array<any>): NovoFormGroup {
    let group: any = {};
    controls.forEach(control => {
      let value = Helpers.isBlank(control.value) ? '' : control.value;
      group[control.key] = new NovoFormControl(value, control);
    });
    return new NovoFormGroup(group);
  }

  emptyFormGroup(): NovoFormGroup {
    return new NovoFormGroup({});
  }

  addControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void {
    controls.forEach(control => {
      let value = Helpers.isBlank(control.value) ? '' : control.value;
      let formControl = new NovoFormControl(value, control);
      formGroup.addControl(control.key, formControl);
    });
  }

  /**
   * @name toFormGroupFromFieldset
   * @param fieldsets
   * @returns {NovoFormGroup}
   */
  toFormGroupFromFieldset(fieldsets: Array<NovoFieldset>) {
    let controls: Array<NovoFormControl> = [];
    fieldsets.forEach(fieldset => {
      controls.push(...fieldset.controls);
    });
    return this.toFormGroup(controls);
  }

  /**
   * @name determineInputType
   * @param field
   * @returns {string}
   */
  determineInputType(field: { dataSpecialization: string, inputType: string, options: string, multiValue: boolean, dataType: string, type: string, associatedEntity?: any, optionsUrl?: string, optionsType?: string }): string {
    let type: string;
    let dataSpecializationTypeMap = {
      'DATETIME': 'datetime',
      'TIME': 'time',
      'MONEY': 'currency',
      'PERCENTAGE': 'percentage',
      'HTML': 'editor',
      'HTML-MINIMAL': 'editor-minimal',
      'YEAR': 'year',
    };
    let dataTypeToTypeMap = {
      'Timestamp': 'date',
      'Boolean': 'tiles',
    };
    let inputTypeToTypeMap = {
      'CHECKBOX': 'radio',
      'RADIO': 'radio',
      'SELECT': 'select',
      'TILES': 'tiles',
    };
    let inputTypeMultiToTypeMap = {
      'CHECKBOX': 'checklist',
      'RADIO': 'checklist',
      'SELECT': 'chips',
    };
    let typeToTypeMap = {
      'file': 'file',
      'COMPOSITE': 'address'
    };
    let numberDataTypeToTypeMap = {
      'Double': 'float',
      'BigDecimal': 'float',
      'Integer': 'number'
    };
    if (field.type === 'TO_MANY') {
      if (field.associatedEntity && ~this.ASSOCIATED_ENTITY_LIST.indexOf(field.associatedEntity.entity)) {
        type = 'entitychips'; // TODO!
      } else {
        type = 'chips';
      }
    } else if (field.type === 'TO_ONE') {
      if (field.associatedEntity && ~this.ASSOCIATED_ENTITY_LIST.indexOf(field.associatedEntity.entity)) {
        type = 'entitypicker'; // TODO!
      } else {
        type = 'picker';
      }
    } else if (field.optionsUrl && field.inputType === 'SELECT') {
      if (field.optionsType && ~this.PICKER_TEST_LIST.indexOf(field.optionsType)) {
        type = 'entitypicker'; // TODO!
      } else {
        type = 'picker';
      }
    } else if (Object.keys(dataSpecializationTypeMap).indexOf(field.dataSpecialization) > -1) {
      type = dataSpecializationTypeMap[field.dataSpecialization];
    } else if (Object.keys(dataTypeToTypeMap).indexOf(field.dataType) > -1) {
      type = dataTypeToTypeMap[field.dataType];
    } else if (field.inputType === 'TEXTAREA') {
      type = 'textarea';
    } else if (field.options && Object.keys(inputTypeToTypeMap).indexOf(field.inputType) > -1 && !field.multiValue) {
      type = inputTypeToTypeMap[field.inputType];
    } else if (field.options && Object.keys(inputTypeMultiToTypeMap).indexOf(field.inputType) > -1 && field.multiValue) {
      type = inputTypeMultiToTypeMap[field.inputType];
    } else if (Object.keys(typeToTypeMap).indexOf(field.type) > -1) {
      type = typeToTypeMap[field.type];
    } else if (Object.keys(numberDataTypeToTypeMap).indexOf(field.dataType) > -1) {
      type = numberDataTypeToTypeMap[field.dataType];
    }/* else {
            throw new Error('FormUtils: This field type is unsupported.');
        }*/
    return type;
  }

  isFieldEncrypted(key: string): boolean {
    return key.indexOf('customEncrypted') > -1;
  }

  getControlForField(field: any, http, config: { token?: string, restUrl?: string, military?: boolean }, overrides?: any, forTable: boolean = false) {
    // TODO: if field.type overrides `determineInputType` we should use it in that method or use this method
    // TODO: (cont.) as the setter of the field argument
    let type: string = this.determineInputType(field) || field.type;
    let control: any;
    let controlConfig: NovoControlConfig = {
      type: type,
      key: field.name,
      label: field.label,
      placeholder: field.hint || '',
      required: field.required,
      hidden: !field.required,
      encrypted: this.isFieldEncrypted(field.name ? field.name.toString() : ''),
      value: field.value || field.defaultValue,
      sortOrder: field.sortOrder,
      associatedEntity: field.associatedEntity,
      optionsType: field.optionsType,
      multiple: field.multiValue,
      readOnly: !!field.disabled || !!field.readOnly,
      maxlength: field.maxLength,
      interactions: field.interactions,
      dataSpecialization: field.dataSpecialization,
      description: field.description || '',
      tooltip: field.tooltip,
      tooltipPosition: field.tooltipPosition,
      customControl: field.customControl,
      customControlConfig: field.customControlConfig
    };
    // TODO: getControlOptions should always return the correct format
    let optionsConfig = this.getControlOptions(field, http, config);
    if (Array.isArray(optionsConfig) && !(type === 'chips' || type === 'picker')) {
      controlConfig.options = optionsConfig;
    } else if (Array.isArray(optionsConfig) && (type === 'chips' || type === 'picker')) {
      controlConfig.config = {
        options: optionsConfig
      };
    } else if (optionsConfig) {
      controlConfig.config = optionsConfig;
    }

    if (type === 'year') {
      controlConfig.maxlength = 4;
    }
    // TODO: Overrides should be an iterable of all properties (potentially a private method)
    let overrideResultsTemplate;
    let overridePreviewTemplate;
    if (overrides && overrides[field.name]) {
      if (overrides[field.name].resultsTemplate) {
        overrideResultsTemplate = overrides[field.name].resultsTemplate;
        controlConfig.config.resultsTemplate = overrideResultsTemplate;
        delete overrides[field.name].resultsTemplate;
      }
      if (overrides[field.name].overridePreviewTemplate) {
        overrideResultsTemplate = overrides[field.name].overridePreviewTemplate;
        controlConfig.config.overridePreviewTemplate = overrideResultsTemplate;
        delete overrides[field.name].overridePreviewTemplate;
      }
      if (overrides[field.name].pickerCallback) {
        controlConfig.config.callback = overrides[field.name].pickerCallback;
      }
      Object.assign(controlConfig, overrides[field.name]);
    }

    switch (type) {
      case 'entitychips':
        // TODO: This doesn't belong in this codebase
        controlConfig.multiple = true;
        controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
        controlConfig.config.previewTemplate = overridePreviewTemplate || EntityPickerResult;
        control = new PickerControl(controlConfig);
        break;
      case 'chips':
        controlConfig.multiple = true;
        control = new PickerControl(controlConfig);
        break;
      case 'entitypicker':
        // TODO: This doesn't belong in this codebase
        controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
        control = new PickerControl(controlConfig);
        break;
      case 'picker':
        control = new PickerControl(controlConfig);
        break;
      case 'datetime':
        controlConfig.military = config ? !!config.military : false;
        control = new DateTimeControl(controlConfig);
        break;
      case 'date':
        controlConfig.dateFormat = field.dateFormat;
        controlConfig.textMaskEnabled = field.textMaskEnabled;
        controlConfig.allowInvalidDate = field.allowInvalidDate;
        controlConfig.military = config ? !!config.military : false;
        control = new DateControl(controlConfig);
        break;
      case 'time':
        controlConfig.military = config ? !!config.military : false;
        control = new TimeControl(controlConfig);
        break;
      case 'currency':
      case 'money':
      case 'email':
      case 'percentage':
      case 'float':
      case 'number':
      case 'year':
        // TODO: Only types from `determineInputType` should be used in this class
        if (type === 'money') {
          type = 'currency';
        }
        controlConfig.type = type;
        control = new TextBoxControl(controlConfig);
        break;
      case 'text':
        control = new TextBoxControl(controlConfig);
        break;
      case 'textarea':
        control = new TextAreaControl(controlConfig);
        break;
      case 'editor':
        control = new EditorControl(controlConfig);
        break;
      case 'editor-minimal':
        control = new EditorControl(controlConfig);
        control.minimal = true;
        break;
      case 'tiles':
        control = new TilesControl(controlConfig);
        break;
      case 'checkbox':
        control = new CheckboxControl(controlConfig);
        break;
      case 'checklist':
        control = new CheckListControl(controlConfig);
        break;
      case 'radio':
        control = new RadioControl(controlConfig);
        break;
      case 'select':
        control = new SelectControl(controlConfig);
        break;
      case 'address':
        controlConfig.required = field.required || false;
        if (Helpers.isBlank(controlConfig.config)) {
          controlConfig.config = {};
        }
        controlConfig.config.required = field.required;
        if (field.fields && field.fields.length) {
          for (let subfield of field.fields) {
            controlConfig.config[subfield.name] = {
              required: !!subfield.required,
              hidden: !!subfield.readOnly
            };
            if (!Helpers.isEmpty(subfield.label)) {
              controlConfig.config[subfield.name].label = subfield.label;
            }
            if (!Helpers.isEmpty(subfield.maxLength)) {
              controlConfig.config[subfield.name].maxlength = subfield.maxLength;
            }
            controlConfig.required = controlConfig.required || subfield.required;
            if (subfield.defaultValue) {
              if (Helpers.isBlank(controlConfig.value)) {
                controlConfig.value = {};
              }
              controlConfig.value[subfield.name] = subfield.defaultValue;
            } else if (subfield.name === 'countryID') {
              if (Helpers.isBlank(controlConfig.value)) {
                controlConfig.value = {};
              }
              controlConfig.value[subfield.name] = 1;
            }
          }
        }
        controlConfig.isEmpty = this.isAddressEmpty;
        control = new AddressControl(controlConfig);
        break;
      case 'file':
        control = new FileControl(controlConfig);
        break;
      default:
        control = new TextBoxControl(controlConfig);
        break;
    }
    return control;
  }

  toControls(meta, currencyFormat, http, config: { token?: string, restUrl?: string, military?: boolean, }, overrides?: any, forTable: boolean = false) {
    let controls = [];
    if (meta && meta.fields) {
      let fields = meta.fields;
      fields.forEach(field => {
        if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
          let control = this.getControlForField(field, http, config, overrides, forTable);
          // Set currency format
          if (control.subType === 'currency') {
            control.currencyFormat = currencyFormat;
          }
          // Add to controls
          controls.push(control);
        }
      });
    }
    return controls;
  }

  toTableControls(meta, currencyFormat, http, config: { token?: string, restUrl?: string, military?: boolean }, overrides?: any) {
    let controls = this.toControls(meta, currencyFormat, http, config, overrides, true);
    let ret = {};
    controls.forEach((control: BaseControl) => {
      ret[control.key] = {
        editorType: control.__type,
        editorConfig: control.__config
      };
    });
    return ret;
  }

  toFieldSets(meta, currencyFormat, http, config: { token?: string, restUrl?: string, military?: boolean }, overrides?) {
    let fieldsets: Array<NovoFieldset> = [];
    let ranges = [];
    if (meta && meta.fields) {
      let fields = meta.fields.map(field => {
        if (!field.hasOwnProperty('sortOrder')) {
          field.sortOrder = Number.MAX_SAFE_INTEGER - 1;
        }
        return field;
      }).sort(Helpers.sortByField(['sortOrder', 'name']));
      if (meta.sectionHeaders && meta.sectionHeaders.length) {
        meta.sectionHeaders.sort(Helpers.sortByField(['sortOrder', 'name']));
        meta.sectionHeaders.forEach((item, i) => {
          if (item.enabled) {
            if (item.sortOrder > 0 && fieldsets.length === 0) {
              fieldsets.push({
                controls: []
              });
              ranges.push({
                min: 0,
                max: item.sortOrder - 1,
                fieldsetIdx: 0
              });
            }
            fieldsets.push({
              title: item.label,
              icon: item.icon || 'bhi-section',
              controls: []
            });
            ranges.push({
              min: item.sortOrder,
              max: Number.MAX_SAFE_INTEGER,
              fieldsetIdx: fieldsets.length - 1
            });
            if (i > 0 && fieldsets.length > 1) {
              ranges[fieldsets.length - 2].max = item.sortOrder - 1;
            }
          }
        });
        if (!ranges.length) {
          fieldsets.push({
            controls: []
          });
          ranges.push({
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
            fieldsetIdx: 0
          });
        }
      } else {
        fieldsets.push({
          controls: []
        });
        ranges.push({
          min: 0,
          max: Number.MAX_SAFE_INTEGER,
          fieldsetIdx: 0
        });
      }
      fields.forEach(field => {
        if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
          let control = this.getControlForField(field, http, config, overrides);
          // Set currency format
          if (control.subType === 'currency') {
            control.currencyFormat = currencyFormat;
          }
          let location = ranges.find(item => {
            return (item.min <= field.sortOrder && field.sortOrder <= item.max) || (item.min <= field.sortOrder && item.min === item.max);
          });
          if (location) {
            // Add to controls
            fieldsets[location.fieldsetIdx].controls.push(control);
          }
        }
      });
    }
    if (fieldsets.length > 0) {
      return fieldsets;
    } else {
      return [{
        controls: this.toControls(meta, currencyFormat, http, config)
      }];
    }
  }

  getControlOptions(field: any, http: any, config: { token?: string, restUrl?: string, military?: boolean }): any {
    // TODO: The token property of config is the only property used; just pass in `token: string`
    if (field.dataType === 'Boolean' && !field.options) {
      // TODO: dataType should only be determined by `determineInputType` which doesn't ever return 'Boolean' it
      // TODO: (cont.) returns `tiles`
      return [
        { value: false, label: this.labels.no },
        { value: true, label: this.labels.yes }
      ];
    } else if (field.optionsUrl) {
      return this.optionsService.getOptionsConfig(http, field, config);
    } else if (Array.isArray(field.options) && field.type === 'chips') {
      let options = field.options;
      return {
        field: 'value',
        format: '$label',
        options
      };
    } else if (field.options) {
      return field.options;
    }
    return null;
  }

  setInitialValues(controls: Array<NovoControlConfig>, values: any, keepClean?: boolean, keyOverride?: string) {
    for (let i = 0; i < controls.length; i++) {
      let control = controls[i];
      let key = keyOverride ? control.key.replace(keyOverride, '') : control.key;
      let value = values[key];

      if (Helpers.isBlank(value)) {
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        continue;
      }

      if (Array.isArray(value) && value.length > 0) {
        value = value.filter(val => !(Object.keys(val).length === 0 && val.constructor === Object));
        if (value.length === 0) {
          continue;
        }
      }

      if (value.data && value.data.length === 0) {
        continue;
      }

      if (Object.keys(value).length === 0 && value.constructor === Object) {
        continue;
      }

      control.value = value;
      // TODO: keepClean is not required, but is always used. It should default (to true?)
      control.dirty = !keepClean;
    }
  }

  setInitialValuesFieldsets(fieldsets: Array<NovoFieldset>, values, keepClean?: boolean) {
    fieldsets.forEach(fieldset => {
      this.setInitialValues(fieldset.controls, values, keepClean);
    });
  }

  forceShowAllControls(controls: Array<NovoControlConfig>) {
    controls.forEach(control => {
      control.hidden = false;
    });
  }

  forceShowAllControlsInFieldsets(fieldsets: Array<NovoFieldset>) {
    fieldsets.forEach(fieldset => {
      fieldset.controls.forEach(control => {
        control.hidden = false;
      });
    });
  }

  forceValidation(form: NovoFormGroup): void {
    Object.keys(form.controls).forEach((key: string) => {
      let control: any = form.controls[key];
      if (control.required && Helpers.isBlank(form.value[control.key])) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  isAddressEmpty(control: any): boolean {
    let fieldList: string[] = ['address1', 'address2', 'city', 'state', 'zip', 'country'];
    let valid: boolean = true;
    if (control.value && control.config) {
      fieldList.forEach((subfield: string) => {
        if ((subfield !== 'country' && !Helpers.isEmpty(control.config[subfield]) && control.config[subfield].required &&
            (Helpers.isBlank(control.value[subfield]) || Helpers.isEmpty(control.value[subfield]))) ||
          (subfield === 'country' && !Helpers.isEmpty(control.config.country) && control.config.country.required && Helpers.isEmpty(control.value.countryName))) {
          valid = false;
        }
      });
    }
    return valid;
  }
}
