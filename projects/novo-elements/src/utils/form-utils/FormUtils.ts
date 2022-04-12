// NG
import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';
// App
import {
  AddressControl,
  BaseControl,
  CheckboxControl,
  CheckListControl,
  CustomControl,
  DateControl,
  DateTimeControl,
  EditorControl,
  FileControl,
  NovoControlConfig,
  PickerControl,
  RadioControl,
  SelectControl,
  SwitchControl,
  TextAreaControl,
  TextBoxControl,
  TilesControl,
  TimeControl,
  TimezoneControl,
} from '../../elements/form/FormControls';
import type { FormField, NovoFieldset } from '../../elements/form/FormInterfaces';
import { NovoFormControl } from '../../elements/form/NovoFormControl';
import { NovoFormGroup } from '../../elements/form/NovoFormGroup';
import { EntityPickerResult, EntityPickerResults } from '../../elements/picker/extras/entity-picker-results/EntityPickerResults';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../Helpers';
import { OptionsService } from './../../services/options/OptionsService';

@Injectable()
export class FormUtils {
  ASSOCIATED_ENTITY_LIST: string[] = [
    'Candidate',
    'ClientContact',
    'ClientCorporation',
    'CorporationDepartment',
    'Lead',
    'Opportunity',
    'JobOrder',
    'CorporateUser',
    'Person',
    'Placement',
    'JobShift',
  ];
  ENTITY_PICKER_LIST: string[] = [
    'Candidate',
    'CandidateText',
    'Client',
    'ClientText',
    'ClientContact',
    'ClientContactText',
    'ClientCorporation',
    'ClientCorporationText',
    'Lead',
    'LeadText',
    'Opportunity',
    'OpportunityText',
    'JobOrder',
    'JobOrderText',
    'CorporateUser',
    'CorporateUserText',
    'Person',
    'PersonText',
    'Placement',
    'JobShift',
  ];

  constructor(public labels: NovoLabelService, public optionsService: OptionsService) {}

  toFormGroup(controls: Array<any>): NovoFormGroup {
    const group: any = {};
    controls.forEach((control) => {
      const value = Helpers.isBlank(control.value) ? '' : control.value;
      group[control.key] = new NovoFormControl(value, control);
    });
    return new NovoFormGroup(group);
  }

  emptyFormGroup(): NovoFormGroup {
    return new NovoFormGroup({});
  }

  addControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void {
    controls.forEach((control) => {
      const value = Helpers.isBlank(control.value) ? '' : control.value;
      const formControl = new NovoFormControl(value, control);
      formGroup.addControl(control.key, formControl);
    });
  }

  removeControls(formGroup: NovoFormGroup, controls: Array<NovoControlConfig>): void {
    controls.forEach((control) => {
      formGroup.removeControl(control.key);
    });
  }

  toFormGroupFromFieldset(fieldsets: Array<NovoFieldset>): NovoFormGroup {
    const controls: Array<NovoFormControl> = [];
    fieldsets.forEach((fieldset) => {
      controls.push(...fieldset.controls);
    });
    return this.toFormGroup(controls);
  }

  hasAssociatedEntity(field: FormField): boolean {
    return !!(field.associatedEntity && ~this.ASSOCIATED_ENTITY_LIST.indexOf(field.associatedEntity.entity));
  }

  determineInputType(field: FormField): string {
    let type: string;
    const dataSpecializationTypeMap = {
      DATETIME: 'datetime',
      TIME: 'time',
      MONEY: 'currency',
      PERCENTAGE: 'percentage',
      HTML: 'editor',
      'HTML-MINIMAL': 'editor-minimal',
      YEAR: 'year',
      WORKFLOW_OPTIONS: 'select',
      SPECIALIZED_OPTIONS: 'select',
      ALL_WORKFLOW_OPTIONS: 'select',
      WorkflowOptionsLookup: 'select',
      SpecializedOptionsLookup: 'select',
      SimplifiedOptionsLookup: 'select',
      AllWorkflowOptionsLookup: 'select',
    };
    const dataTypeToTypeMap = {
      Timestamp: 'date',
      Date: 'date',
      Boolean: 'tiles',
    };
    const inputTypeToTypeMap = {
      CHECKBOX: 'radio',
      RADIO: 'radio',
      SELECT: 'select',
      TILES: 'tiles',
    };
    const inputTypeMultiToTypeMap = {
      CHECKBOX: 'checklist',
      RADIO: 'checklist',
      SELECT: 'chips',
    };
    const typeToTypeMap = {
      file: 'file',
      COMPOSITE: 'address',
    };
    const numberDataTypeToTypeMap = {
      Double: 'float',
      BigDecimal: 'float',
      Integer: 'number',
    };
    if (field.type === 'TO_MANY') {
      if (this.hasAssociatedEntity(field)) {
        if (field.multiValue === false) {
          type = 'entitypicker';
        } else {
          type = 'entitychips';
        }
      } else {
        if (field.multiValue === false) {
          type = 'picker';
        } else {
          type = 'chips';
        }
      }
    } else if (field.type === 'TO_ONE') {
      if (
        'SYSTEM' === field.dataSpecialization &&
        ['WorkflowOptionsLookup', 'SpecializedOptionsLookup', 'AllWorkflowOptionsLookup'].includes(field.dataType)
      ) {
        type = dataSpecializationTypeMap[field.dataType];
      } else if (['WORKFLOW_OPTIONS', 'SPECIALIZED_OPTIONS', 'ALL_WORKFLOW_OPTIONS'].includes(field.dataSpecialization)) {
        type = dataSpecializationTypeMap[field.dataSpecialization];
      } else if (['SimplifiedOptionsLookup', 'SpecializedOptionsLookup'].includes(field.dataType)) {
        if (field.options && Object.keys(inputTypeToTypeMap).indexOf(field.inputType) > -1 && !field.multiValue) {
          type = inputTypeToTypeMap[field.inputType];
        } else if (field.options && Object.keys(inputTypeMultiToTypeMap).indexOf(field.inputType) > -1 && field.multiValue) {
          type = inputTypeMultiToTypeMap[field.inputType];
        } else {
          type = dataSpecializationTypeMap[field.dataType];
        }
      } else if (this.hasAssociatedEntity(field)) {
        type = 'entitypicker'; // TODO!
      } else {
        type = 'picker';
      }
    } else if (field.optionsUrl && field.inputType === 'SELECT') {
      if (field.optionsType && ~this.ENTITY_PICKER_LIST.indexOf(field.optionsType)) {
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
    } /* else {
            throw new Error('FormUtils: This field type is unsupported.');
        }*/
    return type;
  }

  isFieldEncrypted(key: string): boolean {
    return key.indexOf('customEncrypted') > -1;
  }

  getControlForField(
    field: any,
    http,
    config: { token?: string; restUrl?: string; military?: boolean; weekStart?: number },
    overrides?: any,
    forTable: boolean = false,
    fieldData?: any,
  ) {
    // TODO: if field.type overrides `determineInputType` we should use it in that method or use this method
    // TODO: (cont.) as the setter of the field argument
    let type: string = this.determineInputType(field) || field.type;
    let control: any;
    const controlConfig: NovoControlConfig = {
      metaType: field.type,
      type,
      key: field.name,
      label: field.label,
      placeholder: field.hint || '',
      required: field.required || field.systemRequired,
      hidden: !field.required,
      encrypted: this.isFieldEncrypted(field.name ? field.name.toString() : ''),
      value: field.value || field.defaultValue,
      sortOrder: field.sortOrder,
      associatedEntity: field.associatedEntity,
      optionsType: field.optionsType,
      multiple: field.multiValue,
      readOnly: !!field.disabled || !!field.readOnly,
      disabled: field.disabled,
      maxlength: field.maxLength,
      interactions: field.interactions,
      dataSpecialization: field.dataSpecialization,
      dataType: field.dataType,
      description: field.description || '',
      tooltip: field.tooltip,
      tooltipPosition: field.tooltipPosition,
      customControl: field.customControl,
      template: field.template,
      customControlConfig: field.customControlConfig,
      restrictFieldInteractions: field.restrictFieldInteractions,
      validators: field.validators,
      warning: field.warning,
      config: field.config || {},
      closeOnSelect: field.closeOnSelect,
      layoutOptions: field.layoutOptions,
    };
    this.inferDateRange(controlConfig, field);
    // TODO: getControlOptions should always return the correct format
    const optionsConfig = this.getControlOptions(field, http, config, fieldData);
    if (Array.isArray(optionsConfig) && !(type === 'chips' || type === 'picker')) {
      controlConfig.options = optionsConfig;
    } else if (Array.isArray(optionsConfig) && (type === 'chips' || type === 'picker')) {
      controlConfig.config = {
        options: optionsConfig,
      };
    } else if (optionsConfig) {
      controlConfig.config = {
        ...optionsConfig,
        ...(controlConfig && controlConfig.config),
      };
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
      if (overrides[field.name].type) {
        type = overrides[field.name].type;
      }
      if (overrides[field.name].columns) {
        controlConfig.config.columns = overrides[field.name].columns;
        controlConfig.closeOnSelect = true;
        delete controlConfig.label;
      }
      if (overrides[field.name].warning) {
        controlConfig.warning = overrides[field.name].warning;
      }
      Object.assign(controlConfig, overrides[field.name]);
    }

    switch (type) {
      case 'entitychips':
        // TODO: This doesn't belong in this codebase
        controlConfig.multiple = true;
        controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
        controlConfig.config.previewTemplate = overridePreviewTemplate || EntityPickerResult;
        // TODO: When appendToBody picker works better in table/form
        control = new PickerControl(controlConfig);
        break;
      case 'chips':
        controlConfig.multiple = true;
        // TODO: When appendToBody picker works better in table/form
        control = new PickerControl(controlConfig);
        break;
      case 'entitypicker':
        // TODO: This doesn't belong in this codebase
        controlConfig.config.resultsTemplate = overrideResultsTemplate || EntityPickerResults;
        // TODO: When appendToBody picker works better in table/form
        control = new PickerControl(controlConfig);
        break;
      case 'picker':
        // TODO: When appendToBody picker works better in table/form
        control = new PickerControl(controlConfig);
        break;
      case 'datetime':
        controlConfig.military = config ? !!config.military : false;
        controlConfig.weekStart = config && config.weekStart ? config.weekStart : 0;
        control = new DateTimeControl(controlConfig);
        break;
      case 'date':
        controlConfig.dateFormat = field.dateFormat;
        controlConfig.textMaskEnabled = field.textMaskEnabled;
        controlConfig.allowInvalidDate = field.allowInvalidDate;
        controlConfig.military = config ? !!config.military : false;
        controlConfig.weekStart = config && config.weekStart ? config.weekStart : 0;
        control = new DateControl(controlConfig);
        break;
      case 'time':
        controlConfig.military = config ? !!config.military : false;
        control = new TimeControl(controlConfig);
        break;
      case 'native-time':
      case 'native-date':
      case 'native-week':
      case 'native-year':
      case 'native-datetime-local':
      case 'native-tel':
      case 'native-email':
      case 'native-url':
      case 'native-number':
        control = new CustomControl({ ...controlConfig, template: 'native-input', type: type.replace('native-', ''), alwaysActive: true });
        break;
      case 'timezone':
        control = new TimezoneControl(controlConfig);
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
        controlConfig.checkboxLabel = field.checkboxLabel;
        control = new CheckboxControl(controlConfig);
        break;
      case 'switch':
        control = new SwitchControl(controlConfig);
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
        controlConfig.config.readOnly = controlConfig.readOnly;
        if (field.fields && field.fields.length) {
          for (const subfield of field.fields) {
            controlConfig.config[subfield.name] = {
              required: !!subfield.required,
              hidden: !!subfield.readOnly,
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
            if (subfield.name === 'state' || subfield.name === 'countryID') {
              if (subfield.name === 'countryID') {
                subfield.optionsType = 'Country';
              }
              if (!subfield.optionsUrl) {
                subfield.optionsUrl = `options/${subfield.optionsType}`;
              }
              controlConfig.config[subfield.name].pickerConfig = this.getControlOptions(subfield, http, config, fieldData);
            }
          }
        }
        controlConfig.isEmpty = this.isAddressEmpty;
        control = new AddressControl(controlConfig);
        break;
      case 'file':
        control = new FileControl(controlConfig);
        break;
      case 'custom':
        control = new CustomControl(controlConfig);
        break;
      default:
        control = new TextBoxControl(controlConfig);
        break;
    }
    return control;
  }

  private shouldCreateControl(field): boolean {
    if (field.systemRequired) {
      field.readOnly = false;
    }

    return (
      field.name !== 'id' &&
      (!['SYSTEM', 'SECTION_HEADER'].includes(field.dataSpecialization) ||
        ['address', 'billingAddress', 'secondaryAddress'].includes(field.name)) &&
      !field.readOnly
    );
  }

  toControls(
    meta,
    currencyFormat,
    http,
    config: { token?: string; restUrl?: string; military?: boolean; weekStart?: number },
    overrides?: any,
    forTable: boolean = false,
  ) {
    const controls = [];
    if (meta && meta.fields) {
      const fields = meta.fields;
      fields.forEach((field) => {
        if (this.shouldCreateControl(field)) {
          const control = this.getControlForField(field, http, config, overrides, forTable);
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

  toTableControls(meta, currencyFormat, http, config: { token?: string; restUrl?: string; military?: boolean }, overrides?: any) {
    const controls = this.toControls(meta, currencyFormat, http, config, overrides, true);
    const ret = {};
    controls.forEach((control: BaseControl) => {
      ret[control.key] = {
        editorType: control.__type,
        editorConfig: control.__config,
      };
    });
    return ret;
  }

  toFieldSets(
    meta,
    currencyFormat,
    http,
    config: { token?: string; restUrl?: string; military?: boolean; weekStart?: number },
    overrides?,
    data?: { [key: string]: any },
  ) {
    const fieldsets: Array<NovoFieldset> = [];
    let formFields = [];

    if (meta && meta.fields) {
      formFields = this.getFormFields(meta);

      formFields.forEach((field) => {
        if (this.isHeader(field)) {
          if (field.enabled) {
            this.insertHeaderToFieldsets(fieldsets, field);
          }
        } else if (this.isEmbeddedField(field)) {
          this.insertHeaderToFieldsets(fieldsets, field);

          const embeddedFields = this.getEmbeddedFields(field);

          embeddedFields.forEach((embeddedField) => {
            if (this.shouldCreateControl(embeddedField)) {
              let control = this.createControl(embeddedField, data, http, config, overrides, currencyFormat);
              control = this.markControlAsEmbedded(control, field.dataSpecialization ? field.dataSpecialization.toLowerCase() : null);
              fieldsets[fieldsets.length - 1].controls.push(control);
            } else if (this.isHeader(embeddedField)) {
              this.insertHeaderToFieldsets(fieldsets, embeddedField);
            }
          });
        } else if (this.shouldCreateControl(field)) {
          let control = this.createControl(field, data, http, config, overrides, currencyFormat);
          if (field.inlineEmbeddedAssociatedEntityField) {
            control = this.markControlAsEmbedded(control, 'inline_embedded');
          }

          if (fieldsets.length === 0) {
            fieldsets.push({ controls: [] });
          }

          fieldsets[fieldsets.length - 1].controls.push(control);
        }
      });
    }
    if (fieldsets.length > 0) {
      return fieldsets;
    } else {
      return [
        {
          controls: this.toControls(meta, currencyFormat, http, config),
        },
      ];
    }
  }

  private isEmbeddedField(field) {
    return field.dataSpecialization && ['embedded'].includes(field.dataSpecialization.toLowerCase()) && !field.readOnly;
  }

  private createControl(field, data, http, config, overrides, currencyFormat) {
    const fieldData = this.isEmbeddedFieldData(field, data) ? this.getEmbeddedFieldData(field, data) : this.getFieldData(field, data);
    const control = this.getControlForField(field, http, config, overrides, undefined, fieldData);
    // Set currency format
    if (control.subType === 'currency') {
      control.currencyFormat = currencyFormat;
    }
    return control;
  }

  private isEmbeddedFieldData(field, data) {
    return data && field.name.includes('.');
  }

  private getFieldData(field, data) {
    return (data && data[field.name]) || null;
  }

  private getEmbeddedFieldData(field, data) {
    const [parentFieldName, fieldName] = field.name.split('.');
    return (data && data[parentFieldName] && data[parentFieldName][fieldName]) || null;
  }

  private getFormFields(meta) {
    const sectionHeaders = meta.sectionHeaders
      ? meta.sectionHeaders.map((element) => {
          element.isSectionHeader = true;
          return element;
        })
      : [];

    let fields = meta.fields.map((field) => {
      field.parentEntity = meta.entity;
      if (!field.hasOwnProperty('sortOrder')) {
        field.sortOrder = Number.MAX_SAFE_INTEGER - 1;
      }
      return field;
    });

    // build list of fields that should be displayed inline but belong to associated entities
    const inlineEmbeddedAssociatedEntityFields = this.getInlineEmbeddedFields(fields);

    // remove the inline embedded fields because the associated entity fields were extracted above
    // and will be added to the regular list of fields. This prevents the fields from being added multiple times.
    fields = fields.filter((f) => !f.dataSpecialization || f.dataSpecialization.toLowerCase() !== 'inline_embedded');

    // sort fields
    return [...sectionHeaders, ...fields, ...inlineEmbeddedAssociatedEntityFields].sort(Helpers.sortByField(['sortOrder', 'name']));
  }

  private getInlineEmbeddedFields(fields) {
    let inlineEmbeddedAssociatedEntityFields = [];
    fields
      .filter((f) => f.dataSpecialization && f.dataSpecialization.toLowerCase() === 'inline_embedded')
      .forEach((f) => {
        inlineEmbeddedAssociatedEntityFields = [...inlineEmbeddedAssociatedEntityFields, ...this.getAssociatedFieldsForInlineEmbedded(f)];
      });
    return inlineEmbeddedAssociatedEntityFields;
  }

  private getAssociatedFieldsForInlineEmbedded(field) {
    let associatedEntityFields = [];
    associatedEntityFields = this.getEmbeddedFields(field).map((aef) => {
      aef.inlineEmbeddedAssociatedEntityField = true;
      return aef;
    });
    return associatedEntityFields;
  }

  private getEmbeddedFields(subHeader) {
    return subHeader.associatedEntity.fields
      .filter((field) => field.name !== 'id')
      .map((field) => {
        if (!field.name.startsWith(`${subHeader.name}.`)) {
          field.name = `${subHeader.name}.${field.name}`;
        }
        return field;
      })
      .sort(Helpers.sortByField(['sortOrder', 'name']));
  }

  private isHeader(field): boolean {
    return (
      !Helpers.isBlank(field) &&
      ((field.hasOwnProperty('isSectionHeader') && field.isSectionHeader) ||
        (field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'section_header'))
    );
  }

  private insertHeaderToFieldsets(fieldsets, field) {
    const constantProperties = {
      controls: [],
      isEmbedded: field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'embedded',
      isInlineEmbedded: field.dataSpecialization && field.dataSpecialization.toLowerCase() === 'inline_embedded',
      key: field.name,
    };
    if (field.name && field.name.startsWith('customObject') && field.associatedEntity && field.associatedEntity.label) {
      fieldsets.push({
        title: field.associatedEntity.label || field.label,
        icon: field.icon || 'bhi-card-expand',
        ...constantProperties,
      });
    } else {
      fieldsets.push({
        title: field.label,
        icon: field.icon || 'bhi-section',
        ...constantProperties,
      });
    }
  }

  private markControlAsEmbedded(control, dataSpecialization?: 'embedded' | 'inline_embedded') {
    if (Helpers.isBlank(control.config)) {
      control.config = {};
    }
    control.config.embedded = true;
    control.isEmbedded = dataSpecialization === 'embedded';
    control.isInlineEmbedded = dataSpecialization === 'inline_embedded';
    return control;
  }

  getControlOptions(field: any, http: any, config: { token?: string; restUrl?: string; military?: boolean }, fieldData?: any): any {
    // TODO: The token property of config is the only property used; just pass in `token: string`
    if (field.dataType === 'Boolean' && !field.options) {
      // TODO: dataType should only be determined by `determineInputType` which doesn't ever return 'Boolean' it
      // TODO: (cont.) returns `tiles`
      return [
        { value: false, label: this.labels.no },
        { value: true, label: this.labels.yes },
      ];
    } else if (field.dataSpecialization === 'ALL_WORKFLOW_OPTIONS' && field.options) {
      return field.options;
    } else if (field.workflowOptions) {
      return this.getWorkflowOptions(field.workflowOptions, fieldData);
    } else if (
      field.dataSpecialization === 'SPECIALIZED_OPTIONS' ||
      (field.options && ['SpecializedOptionsLookup', 'SimplifiedOptionsLookup'].includes(field.dataType))
    ) {
      return field.options;
    } else if (field.optionsUrl) {
      return this.optionsService.getOptionsConfig(http, field, config);
    } else if (Array.isArray(field.options) && field.type === 'chips') {
      const options = field.options;
      return {
        field: 'value',
        format: '$label',
        options,
      };
    } else if (field.options) {
      return field.options;
    }
    return null;
  }

  private getWorkflowOptions(
    workflowOptions: { [key: string]: any },
    fieldData: { id?: number; value?: string | number; label?: string | number } | null,
  ): Array<{ id?: number; value?: string | number; label?: string | number }> {
    let currentValue: { id?: number; value?: string | number; label?: string | number } = null;
    let currentWorkflowOption: number | string = 'initial';
    if (fieldData?.id) {
      currentValue = { ...fieldData, value: fieldData.id, label: fieldData.label || fieldData.id };
      currentWorkflowOption = fieldData.id;
    }
    const updateWorkflowOptions: Array<{ id?: number; value?: string | number; label?: string | number }> =
      workflowOptions[currentWorkflowOption] || [];

    // Ensure that the current value is added to the beginning of the options list
    if (currentValue && !updateWorkflowOptions.find((option) => option.value === currentValue.value)) {
      updateWorkflowOptions.unshift(currentValue);
    }

    return updateWorkflowOptions;
  }

  setInitialValues(controls: Array<NovoControlConfig>, values: any, keepClean?: boolean, keyOverride?: string) {
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      const key = keyOverride ? control.key.replace(keyOverride, '') : control.key;
      let value = values[key];

      if (Helpers.isBlank(value)) {
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        continue;
      }

      if (Array.isArray(value) && value.length > 0) {
        value = value.filter((val) => !(Object.keys(val).length === 0 && val.constructor === Object));
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

      if (control.dataType === 'Date' && typeof value === 'string' && control.optionsType !== 'skipConversion') {
        value = dateFns.startOfDay(value);
      }

      control.value = value;
      // TODO: keepClean is not required, but is always used. It should default (to true?)
      control.dirty = !keepClean;
    }
  }

  setInitialValuesFieldsets(fieldsets: Array<NovoFieldset>, values, keepClean?: boolean) {
    fieldsets.forEach((fieldset) => {
      this.setInitialValues(fieldset.controls, values, keepClean);
    });
  }

  forceShowAllControls(controls: Array<NovoControlConfig>) {
    controls.forEach((control) => {
      control.hidden = false;
    });
  }

  forceShowAllControlsInFieldsets(fieldsets: Array<NovoFieldset>) {
    fieldsets.forEach((fieldset) => {
      fieldset.controls.forEach((control) => {
        control.hidden = false;
      });
    });
  }

  forceValidation(form: NovoFormGroup): void {
    Object.keys(form.controls).forEach((key: string) => {
      const control: any = form.controls[key];
      if (control.required && Helpers.isBlank(form.getRawValue()[control.key])) {
        control.markAsDirty();
        control.markAsTouched();
      }
    });
  }

  isAddressEmpty(control: any): boolean {
    const fieldList: string[] = ['address1', 'address2', 'city', 'state', 'zip', 'countryID'];
    let valid: boolean = true;
    if (control.value && control.config) {
      fieldList.forEach((subfield: string) => {
        if (
          ((subfield !== 'countryID' &&
            !Helpers.isEmpty(control.config[subfield]) &&
            control.config[subfield].required &&
            (Helpers.isBlank(control.value[subfield]) || Helpers.isEmpty(control.value[subfield]))) ||
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
          valid = false;
        }
      });
    }
    return valid;
  }

  private getStartDateFromRange(dateRange: { minDate: string; minOffset: number }): Date {
    if (dateRange.minDate) {
      return dateFns.parse(dateRange.minDate);
    } else if (dateRange.minOffset) {
      return dateFns.addDays(dateFns.startOfToday(), dateRange.minOffset);
    }
  }

  private getEndDateFromRange(dateRange: { maxDate: string; minOffset: number }): Date {
    if (dateRange.maxDate) {
      return dateFns.parse(dateRange.maxDate);
    } else if (dateRange.minOffset) {
      return dateFns.addDays(dateFns.startOfToday(), dateRange.minOffset);
    }
  }

  /**
   * Get the min start date and max end date of a Date base on field data.
   */

  private inferDateRange(controlConfig, field): void {
    if (field.dataType === 'Date' && field.allowedDateRange) {
      controlConfig.startDate = this.getStartDateFromRange(field.allowedDateRange);
      controlConfig.endDate = this.getEndDateFromRange(field.allowedDateRange);
      controlConfig.disabledDateMessage = field.allowedDateRange?.disabledDateMessage;
    }
  }

  inflateEmbeddedProperties(data: object): object {
    if (data) {
      Object.keys(data)
        .filter((fieldName) => fieldName.includes('.'))
        .forEach((field) => {
          const [parentFieldName, fieldName] = field.split('.');
          if (!data[parentFieldName]) {
            data[parentFieldName] = {};
          }
          data[parentFieldName][fieldName] = data[field];
          delete data[field];
        });
    }

    return data;
  }
}
