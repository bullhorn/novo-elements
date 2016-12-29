// NG2
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// APP
import {
    AddressControl,
    CheckListControl,
    CheckboxControl,
    DateControl,
    DateTimeControl,
    EditorControl,
    FileControl,
    PickerControl,
    RadioControl,
    SelectControl,
    TextAreaControl,
    TextBoxControl,
    TilesControl,
    TimeControl,
    NovoControlConfig
} from './FormControls';
import { EntityPickerResults } from './../picker/extras/entity-picker-results/EntityPickerResults';
import { Helpers } from './../../utils/Helpers';
import { NovoFieldset } from './DynamicForm';

@Injectable()
export class FormUtils {
    toFormGroup(controls) {
        let group: any = {};
        controls.forEach(control => {
            let value = Helpers.isBlank(control.value) ? '' : control.value;
            group[control.key] = new FormControl(value, control.validators, control.asyncValidators);
        });
        return new FormGroup(group);
    }

    toFormGroupFromFieldset(fieldsets: Array<NovoFieldset>) {
        let controls = [];
        fieldsets.forEach(fieldset => {
            controls.push(...fieldset.controls);
        });
        return this.toFormGroup(controls);
    }

    determineInputType(field) {
        let type = null;
        // Determine TYPE because its not just 1 value that determines this.
        if (field.type === 'TO_MANY') {
            if (field.associatedEntity && ~['Candidate', 'ClientContact', 'ClientCorporation', 'Lead', 'Opportunity', 'JobOrder', 'CorporateUser', 'Person', 'Placement'].indexOf(field.associatedEntity.entity)) {
                type = 'entitychips';
            } else {
                type = 'chips';
            }
        } else if (field.type === 'TO_ONE') {
            if (field.associatedEntity && ~['Candidate', 'ClientContact', 'ClientCorporation', 'Lead', 'Opportunity', 'JobOrder', 'CorporateUser', 'Person', 'Placement'].indexOf(field.associatedEntity.entity)) {
                type = 'entitypicker';
            } else {
                type = 'picker';
            }
        } else if (field.dataSpecialization === 'DATETIME') {
            type = 'datetime';
        } else if (field.dataSpecialization === 'TIME') {
            type = 'time';
        } else if (field.dataSpecialization === 'MONEY') {
            type = 'currency';
        } else if (field.dataSpecialization === 'PERCENTAGE') {
            type = 'percentage';
        } else if (field.dataSpecialization === 'HTML') {
            type = 'editor';
        } else if (field.dataType === 'Timestamp') {
            type = 'date';
        } else if (field.dataType === 'Boolean') {
            type = 'tiles';
        } else if (~['Double', 'BigDecimal'].indexOf(field.dataType)) {
            type = 'float';
        } else if (field.inputType === 'TEXTAREA') {
            type = 'textarea';
        } else if (field.options && ~['CHECKBOX', 'RADIO'].indexOf(field.inputType) && field.multiValue) {
            type = 'checklist';
        } else if (field.options && ~['CHECKBOX', 'RADIO'].indexOf(field.inputType) && !field.multiValue) {
            type = 'radio';
        } else if (field.optionsUrl && field.inputType === 'SELECT') {
            if (field.optionsType && ~['CandidateText', 'ClientText', 'ClientContactText', 'ClientCorporationText', 'LeadText', 'OpportunityText', 'JobOrderText', 'CorporateUserText', 'PersonText'].indexOf(field.optionsType)) {
                type = 'entitypicker';
            } else {
                type = 'picker';
            }
        } else if (field.options && ~['SELECT'].indexOf(field.inputType) && field.multiValue) {
            type = 'chips';
        } else if (field.options && ~['SELECT'].indexOf(field.inputType) && !field.multiValue) {
            type = 'select';
        } else if (field.options && ~['TILES'].indexOf(field.inputType) && !field.multiValue) {
            type = 'tiles';
        } else if (field.type === 'COMPOSITE') {
            type = 'address';
        } else if (field.dataType === 'Integer') {
            type = 'number';
        } else if (field.type === 'file') {
            type = 'file';
        }

        // Overrides
        if (type === 'picker' && field.multiValue) {
            type = 'chips';
        } else if (type === 'entitypicker' && field.multiValue) {
            type = 'entitychips';
        }

        return type;
    }

    getControlForField(field, http, config) {
        let type = this.determineInputType(field) || field.type;
        let control;
        let controlConfig: NovoControlConfig = {
            type: type,
            key: field.name,
            label: field.label,
            placeholder: field.hint || '',
            required: field.required,
            hidden: !field.required,
            value: field.value || field.defaultValue,
            sortOrder: field.sortOrder,
            associatedEntity: field.associatedEntity,
            optionsType: field.optionsType,
            multiple: field.multiValue,
            disabled: field.disabled || false,
            config: null,
            options: null
        };
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

        switch (type) {
            case 'entitychips':
                controlConfig.multiple = true;
                controlConfig.config.resultsTemplate = EntityPickerResults;
                control = new PickerControl(controlConfig);
                break;
            case 'chips':
                controlConfig.multiple = true;
                control = new PickerControl(controlConfig);
                break;
            case 'entitypicker':
                controlConfig.config.resultsTemplate = EntityPickerResults;
                control = new PickerControl(controlConfig);
                break;
            case 'picker':
                control = new PickerControl(controlConfig);
                break;
            case 'datetime':
                control = new DateTimeControl(controlConfig);
                break;
            case 'date':
                control = new DateControl(controlConfig);
                break;
            case 'time':
                control = new TimeControl(controlConfig);
                break;
            case 'currency':
            case 'money':
            case 'email':
            case 'percentage':
            case 'float':
            case 'number':
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

    toControls(meta, currencyFormat, http, config) {
        let controls = [];
        if (meta && meta.fields) {
            let fields = meta.fields;
            fields.forEach(field => {
                if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
                    let control = this.getControlForField(field, http, config);
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

    toFieldSets(meta, currencyFormat, http, config) {
        let fieldsets: Array<NovoFieldset> = [];
        let ranges = [];
        if (meta && meta.fields) {
            meta.fields.sort(Helpers.sortByField('sortOrder'));
            if (meta.sectionHeaders && meta.sectionHeaders.length) {
                meta.sectionHeaders.sort(Helpers.sortByField('sortOrder'));
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
            let fields = meta.fields;

            fields.forEach(field => {
                if (field.name !== 'id' && (field.dataSpecialization !== 'SYSTEM' || ['address', 'billingAddress', 'secondaryAddress'].indexOf(field.name) !== -1) && !field.readOnly) {
                    if (!field.hasOwnProperty('sortOrder')) {
                        field.sortOrder = Number.MAX_SAFE_INTEGER - 1;
                    }
                    let control = this.getControlForField(field, http, config);
                    // Set currency format
                    if (control.subType === 'currency') {
                        control.currencyFormat = currencyFormat;
                    }
                    let location = ranges.find(item => {
                        return (item.min <= field.sortOrder && field.sortOrder < item.max) || (item.min <= field.sortOrder && item.min === item.max);
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

    getControlOptions(field, http, config) {
        if (field.dataType === 'Boolean' && !field.options) {
            return [
                { value: false, label: 'No' },
                { value: true, label: 'Yes' }
            ];
        } else if (field.optionsUrl) {
            return {
                field: 'value',
                format: '$label',
                options: (query) => {
                    return new Promise((resolve, reject) => {
                        if (query && query.length) {
                            http.get(`${field.optionsUrl}?filter=${query || ''}&BhRestToken=${config.token}`)
                                .map(response => response.json().data)
                                .subscribe(resolve, reject);
                        } else {
                            resolve([]);
                        }
                    });
                }
            };
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

    setInitialValues(controls: Array<NovoControlConfig>, values, keepClean = false) {
        for (let i = 0; i < controls.length; i++) {
            let control = controls[i];
            let value = values[control.key];

            if (Helpers.isBlank(value)) {
                continue;
            }

            if (Array.isArray(value) && value.length === 0) {
                continue;
            }

            if (value.data && value.data.length === 0) {
                continue;
            }

            if (Object.keys(value).length === 0 && value.constructor === Object) {
                continue;
            }

            control.value = values[control.key];
            control.dirty = !keepClean;
        }
    }

    setInitialValuesFieldsets(fieldsets: Array<NovoFieldset>, values, keepClean = false) {
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
}
