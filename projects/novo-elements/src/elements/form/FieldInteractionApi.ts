// NG2
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
// Vendor
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { FormUtils } from '../../utils/form-utils/FormUtils';
// APP
import { Helpers } from '../../utils/Helpers';
import { NovoModalService } from '../modal/modal.service';
import { EntityPickerResults } from '../picker/extras/entity-picker-results/EntityPickerResults';
import { NovoToastService, ToastOptions } from '../toast/ToastService';
import { CustomHttp, ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoControlConfig } from './FormControls';
import { IFieldInteractionEvent, NovoFieldset, ResultsTemplateType } from './FormInterfaces';
import { NovoFormControl } from './NovoFormControl';
import { NovoFormGroup } from './NovoFormGroup';

class CustomHttpImpl implements CustomHttp {
  url: string;
  options;
  mapFn = (x) => x;

  constructor(private http: HttpClient) {}

  get(url: string, options?): CustomHttp {
    this.url = url;
    this.options = options;
    return this;
  }

  map(mapFn): CustomHttp {
    this.mapFn = mapFn;
    return this;
  }

  subscribe(resolve, reject?): Subscription {
    return this.http.get(this.url, this.options).pipe(map(this.mapFn)).subscribe(resolve, reject);
  }
}

@Injectable()
export class FieldInteractionApi {
  private _globals;
  form: NovoFormGroup | any;
  private _currentKey: string;
  appBridge: AppBridge;
  private asyncBlockTimeout;
  private _isInvokedOnInit = false;

  static FIELD_POSITIONS = {
    ABOVE_FIELD: 'ABOVE_FIELD',
    BELOW_FIELD: 'BELOW_FIELD',
    TOP_OF_FORM: 'TOP_OF_FORM',
    BOTTOM_OF_FORM: 'BOTTOM_OF_FORM',
  };

  constructor(
    private toaster: NovoToastService,
    private modalService: NovoModalService,
    private formUtils: FormUtils,
    private http: HttpClient,
    private labels: NovoLabelService,
  ) {}

  get associations(): object {
    return this.form.hasOwnProperty('associations') ? this.form.associations : {};
  }

  get currentEntity(): string {
    return this.form.hasOwnProperty('currentEntity') ? this.form.currentEntity : undefined;
  }

  get currentEntityId(): string {
    return this.form.hasOwnProperty('currentEntityId') ? this.form.currentEntityId : undefined;
  }

  get isEdit(): boolean {
    return this.form.hasOwnProperty('edit') ? this.form.edit : false;
  }

  get isAdd(): boolean {
    return this.form.hasOwnProperty('edit') ? !this.form.edit : false;
  }

  set globals(globals) {
    this._globals = globals;
  }

  get globals() {
    return this._globals;
  }

  set currentKey(key: string) {
    this._currentKey = key;
  }

  get currentKey(): string {
    return this._currentKey;
  }

  set isInvokedOnInit(isOnInit: boolean) {
    this._isInvokedOnInit = isOnInit;
  }

  get isInvokedOnInit(): boolean {
    return this._isInvokedOnInit;
  }

  isActiveControlValid(): boolean {
    return !!this.getValue(this.currentKey);
  }

  getActiveControl(): NovoFormControl {
    return this.getControl(this.currentKey);
  }

  getActiveKey(): string {
    return this.currentKey;
  }

  getActiveValue() {
    return this.getValue(this.currentKey);
  }

  getActiveInitialValue() {
    return this.getInitialValue(this.currentKey);
  }

  getFieldSet(key: string, otherForm?: NovoFormGroup): NovoFieldset {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    const form = otherForm || this.form;
    const fieldSet = form.fieldsets.find((fs: NovoFieldset) => fs.key && fs.key.toLowerCase() === key.toLowerCase());
    if (!fieldSet) {
      console.error('[FieldInteractionAPI] - could not find a fieldset in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return fieldSet as NovoFieldset;
  }

  getControl(key: string, otherForm?: NovoFormGroup) {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    const form = otherForm || this.form;
    const control = form.controls[key] as NovoFormControl;
    if (!control) {
      console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return control;
  }

  getFormGroupArray(key: string, otherForm?: NovoFormGroup): NovoFormGroup[] {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    const form = otherForm || this.form;
    const formArray = form.controls[key] as FormArray;
    if (!formArray || !formArray.controls) {
      console.error('[FieldInteractionAPI] - could not find a form array in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return formArray.controls as NovoFormGroup[] | any;
  }

  getValue(key: string, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (control) {
      return control.value;
    }
    return null;
  }

  getRawValue(key: string, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (control) {
      return control.rawValue;
    }
    return null;
  }

  getInitialValue(key: string, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (control) {
      return control.initialValue;
    }
    return null;
  }

  setValue(
    key: string,
    value,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value }, otherForm);
    }
  }

  patchValue(
    key: string,
    value,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value }, otherForm);
    }
  }

  setReadOnly(key: string, isReadOnly: boolean, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.setReadOnly(isReadOnly);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: isReadOnly }, otherForm);
    }
  }

  setRequired(key: string, required: boolean, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.setRequired(required);
      this.triggerEvent({ controlKey: key, prop: 'required', value: required }, otherForm);
    }
  }

  setDescription(key: string, description: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.description = description;
      this.triggerEvent({ controlKey: key, prop: 'description', value: description }, otherForm);
    }
  }

  highlight(key: string, isHighlighted: boolean, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.highlighted = isHighlighted;
      this.triggerEvent({ controlKey: key, prop: 'highlight', value: isHighlighted }, otherForm);
    }
  }

  hide(key: string, clearValue = true, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.hide(clearValue);
      this.disable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: true }, otherForm);
    }
    return control;
  }

  show(key: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.show();
      this.enable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: false }, otherForm);
    }
  }

  hideFieldSetHeader(key: string): void {
    const fieldSet = this.getFieldSet(key);
    if (fieldSet) {
      fieldSet.hidden = true;
    }
  }

  showFieldSetHeader(key: string): void {
    const fieldSet = this.getFieldSet(key);
    if (fieldSet) {
      fieldSet.hidden = false;
    }
  }

  disable(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.disable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: true }, otherForm);
    }
  }

  enable(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.enable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: false }, otherForm);
    }
  }

  markAsInvalid(key: string, validationMessage?: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control) {
      if (control && !control.restrictFieldInteractions) {
        control.markAsInvalid(validationMessage);
        this.triggerEvent({ controlKey: key, prop: 'errors', value: validationMessage }, otherForm);
      }
    }
  }

  markAsValid(key: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control) {
      if (control && !control.restrictFieldInteractions) {
        control.markAsValid();
        this.triggerEvent({ controlKey: key, prop: 'errors', value: null }, otherForm);
      }
    }
  }

  markAsDirty(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.markAsDirty(options);
    }
  }

  markAsPending(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPending(options);
    }
  }

  markAsPristine(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPristine(options);
    }
  }

  markAsTouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.markAsTouched(options);
    }
  }

  markAsUntouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.markAsUntouched(options);
    }
  }

  updateValueAndValidity(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
    otherForm?: NovoFormGroup,
  ): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.updateValueAndValidity(options);
    }
  }

  displayToast(toastConfig: ToastOptions): void {
    if (this.toaster) {
      this.toaster.alert(toastConfig);
    }
  }

  displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean, sanitize?: boolean, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.tipWell = {
        tip,
        icon,
        button: allowDismiss,
        sanitize: sanitize !== false, // defaults to true when undefined
      };
      this.triggerEvent({ controlKey: key, prop: 'tipWell', value: tip }, otherForm);
    }
  }

  clearTip(key: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.tipWell = null;
      this.triggerEvent({ controlKey: key, prop: 'tipWell', value: null }, otherForm);
    }
  }

  setTooltip(key: string, tooltip: string, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control.tooltip = tooltip;
      if (tooltip.length >= 40 && tooltip.length <= 400) {
        control.tooltipSize = 'large';
        control.tooltipPreline = true;
      } else if (tooltip.length > 400) {
        control.tooltipSize = 'extra-large';
      }
      this.triggerEvent({ controlKey: key, prop: 'tooltip', value: tooltip }, otherForm);
    }
  }

  confirmChanges(key: string, message?: string): Promise<boolean> {
    const history = this.getProperty(key, 'valueHistory');
    const oldValue = history[history.length - 2];
    const newValue = this.getValue(key);
    const label = this.getProperty(key, 'label');
    (document.activeElement as any).blur();
    return this.modalService.open(ControlConfirmModal, { oldValue, newValue, label, message, key }).onClosed.then((result) => {
      if (!result) {
        this.setValue(key, oldValue, { emitEvent: false });
      }
      return true;
    });
  }

  promptUser(key: string, changes: string[]): Promise<boolean> {
    (document.activeElement as any).blur();
    return this.modalService.open(ControlPromptModal, { changes, key }).onClosed;
  }

  setProperty(key: string, prop: string, value, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      control[prop] = value;
      this.triggerEvent({ controlKey: key, prop, value }, otherForm);
    }
  }

  getProperty(key: string, prop: string, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      return control[prop];
    }
    return null;
  }

  isValueEmpty(key: string): boolean {
    const value = this.getValue(key);
    return Helpers.isEmpty(value);
  }

  isValueBlank(key: string): boolean {
    const value = this.getValue(key);
    return Helpers.isBlank(value);
  }

  hasField(key: string, otherForm?: NovoFormGroup): boolean {
    const form = otherForm || this.form;
    return !!form.controls[key];
  }

  addStaticOption(key: string, newOption: any, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    let optionToAdd = newOption;
    let isUnique = true;
    if (control && !control.restrictFieldInteractions) {
      let currentOptions = this.getProperty(key, 'options');
      if (!currentOptions || !currentOptions.length) {
        const config = this.getProperty(key, 'config');
        if (config) {
          currentOptions = config.options;
          if (currentOptions && Array.isArray(currentOptions)) {
            if (currentOptions[0].value && !optionToAdd.value) {
              optionToAdd = { value: newOption, label: newOption };
            }
            config.options = [...currentOptions, optionToAdd];
            this.setProperty(key, 'config', config);
          }
        }
      } else {
        if (currentOptions[0].value && !optionToAdd.value) {
          optionToAdd = { value: newOption, label: newOption };
        }
        // Ensure duplicate values are not added
        currentOptions.forEach((option) => {
          if ((option.value && option.value === optionToAdd.value) || option === optionToAdd) {
            isUnique = false;
          }
        });
        if (isUnique) {
          this.setProperty(key, 'options', [...currentOptions, optionToAdd]);
        }
      }
      if (isUnique) {
        this.triggerEvent({ controlKey: key, prop: 'options', value: [...currentOptions, optionToAdd] }, otherForm);
      }
    }
  }

  removeStaticOption(key: string, optionToRemove: any, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      let currentOptions = this.getProperty(key, 'options', otherForm);
      if (!currentOptions || !currentOptions.length) {
        const config = this.getProperty(key, 'config', otherForm);
        if (config) {
          currentOptions = config.options;
          if (currentOptions && Array.isArray(currentOptions)) {
            let index = -1;
            currentOptions.forEach((opt, i) => {
              if (opt.value || opt.label) {
                if (opt.value === optionToRemove || opt.label === optionToRemove) {
                  index = i;
                }
              } else {
                if (opt === optionToRemove) {
                  index = i;
                }
              }
            });
            if (index !== -1) {
              currentOptions.splice(index, 1);
            }
            config.options = [...currentOptions];
            this.setProperty(key, 'config', config, otherForm);
          }
        }
      } else {
        let index = -1;
        currentOptions.forEach((opt, i) => {
          if (opt.value || opt.label) {
            if (opt.value === optionToRemove || opt.label === optionToRemove) {
              index = i;
            }
          } else {
            if (opt === optionToRemove) {
              index = i;
            }
          }
        });
        if (index !== -1) {
          currentOptions.splice(index, 1);
        }
        this.setProperty(key, 'options', [...currentOptions], otherForm);
      }
      this.triggerEvent({ controlKey: key, prop: 'options', value: control.options }, otherForm);
    }
  }

  modifyPickerConfig(
    key: string,
    config: {
      format?: string;
      optionsUrl?: string;
      optionsUrlBuilder?: Function;
      optionsPromise?;
      options?: any[];
      resultsTemplateType?: ResultsTemplateType;
    },
    mapper?,
  ): void {
    // call another method to avoid a breaking change but still enable stricter types
    this.mutatePickerConfig(key, config as ModifyPickerConfigArgs, mapper);
  }

  mutatePickerConfig(key: string, args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown, otherForm?: NovoFormGroup): void {
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      const { minSearchLength, enableInfiniteScroll, filteredOptionsCreator, format, getLabels, emptyPickerMessage } = control.config;
      const optionsConfig = this.getOptionsConfig(args, mapper, filteredOptionsCreator, format);

      const newConfig: NovoControlConfig['config'] = {
        ...(emptyPickerMessage && { emptyPickerMessage }),
        ...(Number.isInteger(minSearchLength) && { minSearchLength }),
        ...(enableInfiniteScroll && { enableInfiniteScroll }),
        ...(filteredOptionsCreator && { filteredOptionsCreator }),
        ...(getLabels && { getLabels }),
        ...(optionsConfig && optionsConfig),
        resultsTemplate:
          control.config.resultsTemplate || ('resultsTemplateType' in args && this.getAppropriateResultsTemplate(args.resultsTemplateType)),
      };

      this.setProperty(key, 'config', newConfig);
      this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: args }, otherForm);
    }
  }

  addPropertiesToPickerConfig(key: string, properties: { [key: string]: unknown }, otherForm?: NovoFormGroup) {
    const control = this.getControl(key, otherForm);
    if (!control || control.restrictFieldInteractions) {
      return;
    }

    const config = {
      ...control.config,
      ...properties,
    };

    this.setProperty(key, 'config', config);
    this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: properties }, otherForm);
  }
  getOptionsConfig = (
    args: ModifyPickerConfigArgs,
    mapper?: (item: unknown) => unknown,
    filteredOptionsCreator?: (where: string) => (query: string) => Promise<unknown[]>,
    pickerConfigFormat?: string,
  ): undefined | { options: unknown[] } | { options: OptionsFunction; format?: string } => {
    if (filteredOptionsCreator || 'optionsUrl' in args || 'optionsUrlBuilder' in args || 'optionsPromise' in args) {
      const format = ('format' in args && args.format) || pickerConfigFormat;
      return {
        options: this.createOptionsFunction(args, mapper, filteredOptionsCreator),
        ...('emptyPickerMessage' in args && { emptyPickerMessage: args.emptyPickerMessage }),
        ...(format && { format }),
      };
    } else if ('options' in args && Array.isArray(args.options)) {
      return {
        options: [...args.options],
      };
    } else {
      return undefined;
    }
  };

  private getAppropriateResultsTemplate(resultsTemplateType: ResultsTemplateType) {
    switch (resultsTemplateType) {
      case 'entity-picker':
        return EntityPickerResults;
      default:
        return undefined;
    }
  }

  createOptionsFunction =
    (
      config: ModifyPickerConfigArgs,
      mapper?: (item: unknown) => unknown,
      filteredOptionsCreator?: (where?: string) => (query: string, page?: number) => Promise<unknown[]>,
    ): ((query: string) => Promise<unknown[]>) =>
    (query: string, page?: number) => {
      if ('optionsPromise' in config && config.optionsPromise) {
        return config.optionsPromise(query, new CustomHttpImpl(this.http), page);
      } else if (('optionsUrlBuilder' in config && config.optionsUrlBuilder) || ('optionsUrl' in config && config.optionsUrl)) {
        return new Promise((resolve, reject) => {
          const url = 'optionsUrlBuilder' in config ? config.optionsUrlBuilder(query) : `${config.optionsUrl}?filter=${query || ''}`;
          this.http
            .get(url)
            .pipe(
              map((results: unknown[]) => {
                if (mapper) {
                  return results.map(mapper);
                }
                return results;
              }),
            )
            .subscribe(resolve, reject);
        });
      } else if (filteredOptionsCreator) {
        if ('where' in config) {
          return filteredOptionsCreator(config.where)(query, page);
        } else {
          return filteredOptionsCreator()(query, page);
        }
      }
    };

  setLoading(key: string, loading: boolean, otherForm?: NovoFormGroup) {
    const form = otherForm || this.form;
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      if (loading) {
        form.controls[key].fieldInteractionloading = true;
        control.setErrors({ loading: true });
        // History
        clearTimeout(this.asyncBlockTimeout);
        this.asyncBlockTimeout = setTimeout(() => {
          this.setLoading(key, false);
          this.displayTip(key, this.labels.asyncFailure, 'info', false);
          this.setProperty(key, '_displayedAsyncFailure', true);
        }, 10000);
      } else {
        form.controls[key].fieldInteractionloading = false;
        clearTimeout(this.asyncBlockTimeout);
        control.setErrors({ loading: null });
        control.updateValueAndValidity({ emitEvent: false });
        if (this.getProperty(key, '_displayedAsyncFailure')) {
          this.setProperty(key, 'tipWell', null);
        }
      }
      this.triggerEvent({ controlKey: key, prop: 'loading', value: loading }, otherForm);
    }
  }

  addControl(
    key: string,
    metaForNewField: {
      key?: string;
      type?: string;
      name?: string;
      label?: string;
      interactions?: Array<{ event?: string; invokeOnInit?: boolean; script? }>;
    },
    position: string = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD,
    initialValue?,
    otherForm?: NovoFormGroup,
  ): void {
    if (!metaForNewField.key && !metaForNewField.name) {
      console.error('[FieldInteractionAPI] - missing "key" in meta for new field'); // tslint:disable-line
      return null;
    }

    if (!metaForNewField.key) {
      // If key is not explicitly declared, use name as key
      metaForNewField.key = metaForNewField.name;
    }

    const form = otherForm || this.form;
    if (form.controls[metaForNewField.key]) {
      // Field is already on the form
      return null;
    }

    const control = form.controls[key];
    let fieldsetIndex: number;
    let controlIndex: number;
    if (control) {
      fieldsetIndex = -1;
      controlIndex = -1;

      form.fieldsets.forEach((fieldset, fi) => {
        fieldset.controls.forEach((fieldsetControl, ci) => {
          if (fieldsetControl.key === key) {
            fieldsetIndex = fi;
            controlIndex = ci;
          }
        });
      });

      // Change the position of the newly added field
      switch (position) {
        case FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD:
          // Adding field above active field
          // index can stay the same
          break;
        case FieldInteractionApi.FIELD_POSITIONS.BELOW_FIELD:
          // Adding field below active field
          controlIndex += 1;
          break;
        case FieldInteractionApi.FIELD_POSITIONS.TOP_OF_FORM:
          // Adding field to the top of the form
          controlIndex = 0;
          fieldsetIndex = 0;
          break;
        case FieldInteractionApi.FIELD_POSITIONS.BOTTOM_OF_FORM:
          // Adding field to the bottom of the form
          fieldsetIndex = form.fieldsets.length - 1;
          controlIndex = form.fieldsets[fieldsetIndex].controls.length;
          break;
        default:
          break;
      }

      if (fieldsetIndex !== -1 && controlIndex !== -1) {
        const novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
        novoControl.hidden = false;
        const formControl = new NovoFormControl(initialValue, novoControl);
        form.addControl(novoControl.key, formControl);
        form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
        this.triggerEvent({ controlKey: key, prop: 'addControl', value: formControl }, otherForm);
      }
    }
  }

  removeControl(key: string, otherForm?: NovoFormGroup): void {
    const form = otherForm || this.form;
    if (!form.controls[key]) {
      // Field is not on the form
      return null;
    }
    const control = this.getControl(key, otherForm);
    if (control && !control.restrictFieldInteractions) {
      let fieldsetIndex = -1;
      let controlIndex = -1;

      form.fieldsets.forEach((fieldset, fi) => {
        fieldset.controls.forEach((fieldsetControl, ci) => {
          if (fieldsetControl.key === key) {
            fieldsetIndex = fi;
            controlIndex = ci;
          }
        });
      });

      if (fieldsetIndex !== -1 && controlIndex !== -1) {
        form.removeControl(key);
        form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 1);
        this.triggerEvent({ controlKey: key, prop: 'removeControl', value: key }, otherForm);
      }
    }
  }

  debounce(func: () => void, wait = 50) {
    let h;
    clearTimeout(h);
    h = setTimeout(() => func(), wait);
  }

  /**
   * Allows traversing nested forms by accessing the parent form.
   *
   * @param otherForm optional parameter for getting the parent of a different form.
   * If not provided will default to the parent of the current form.
   */
  getParent(otherForm?: NovoFormGroup) {
    const form = otherForm || this.form;
    return form.parent;
  }

  /**
   * The index is assigned as a property on the form's associations object when the form is part of a NovoControlGroup array.
   *
   * @param otherForm optional parameter for getting the index of a different form. If not provided will default to the current form.
   * @returns the index if it exists for the current or form, or null otherwise.
   */
  getIndex(otherForm?: NovoFormGroup) {
    const form = otherForm || this.form;
    return form.associations && form.associations.hasOwnProperty('index') ? form.associations.index : null;
  }

  private triggerEvent(event: IFieldInteractionEvent, otherForm?: NovoFormGroup): void {
    const form = otherForm || this.form;
    if (form && form.fieldInteractionEvents) {
      form.fieldInteractionEvents.emit(event);
    }
  }
}
