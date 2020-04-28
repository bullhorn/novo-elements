// NG2
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
// Vendor
import { map } from 'rxjs/operators';
import { NovoLabelService } from '../../services/novo-label-service';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { Helpers } from '../../utils/Helpers';
import { NovoModalService } from '../modal/ModalService';
import { EntityPickerResults } from '../picker/extras/entity-picker-results/EntityPickerResults';
import { NovoToastService, ToastOptions } from '../toast/ToastService';
import { CustomHttp, ModifyPickerConfigArgs, OptionsFunction } from './FieldInteractionApiTypes';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { NovoControlConfig } from './FormControls';
import { IFieldInteractionEvent, NovoFieldset, ResultsTemplateType, NovoFormGroup } from './FormInterfaces';
// APP
import { NovoFormControl } from './NovoFormControl';

class CustomHttpImpl implements CustomHttp {
  url: string;
  options;
  mapFn = (x) => x;

  constructor(private http: HttpClient) { }

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
    return this.http
      .get(this.url, this.options)
      .pipe(map(this.mapFn))
      .subscribe(resolve, reject);
  }
}

@Injectable()
export class FieldInteractionApi {
  private _globals;
  form: NovoFormGroup | any;
  private _currentKey: string;
  appBridge: AppBridge;
  private asyncBlockTimeout;

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
  ) { }

  get associations() {
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

  getFieldSet(key: string): NovoFieldset {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    const fieldSet = this.form.fieldsets.find((fs: NovoFieldset) => fs.key && fs.key.toLowerCase() === key.toLowerCase());
    if (!fieldSet) {
      console.error('[FieldInteractionAPI] - could not find a fieldset in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return fieldSet as NovoFieldset;
  }

  getControl(key: string) {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    const control = this.form.controls[key] as NovoFormControl;
    if (!control) {
      console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return control;
  }

  getValue(key: string) {
    const control = this.getControl(key);
    if (control) {
      return control.value;
    }
    return null;
  }

  getRawValue(key: string) {
    const control = this.getControl(key);
    if (control) {
      return control.rawValue;
    }
    return null;
  }

  getInitialValue(key: string) {
    const control = this.getControl(key);
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
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value });
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
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value });
    }
  }

  setReadOnly(key: string, isReadOnly: boolean): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setReadOnly(isReadOnly);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: isReadOnly });
    }
  }

  setRequired(key: string, required: boolean): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setRequired(required);
      this.triggerEvent({ controlKey: key, prop: 'required', value: required });
    }
  }

  hide(key: string, clearValue = true) {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.hide(clearValue);
      this.disable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: true });
    }
    return control;
  }

  show(key: string): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.show();
      this.enable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: false });
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
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.disable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: true });
    }
  }

  enable(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.enable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: false });
    }
  }

  markAsInvalid(key: string, validationMessage?: string): void {
    const control = this.getControl(key);
    if (control) {
      if (control && !control.restrictFieldInteractions) {
        control.markAsInvalid(validationMessage);
      }
    }
  }

  markAsDirty(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsDirty(options);
    }
  }

  markAsPending(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPending(options);
    }
  }

  markAsPristine(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPristine(options);
    }
  }

  markAsTouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsTouched(options);
    }
  }

  markAsUntouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    const control = this.getControl(key);
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
  ): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.updateValueAndValidity(options);
    }
  }

  displayToast(toastConfig: ToastOptions): void {
    if (this.toaster) {
      this.toaster.alert(toastConfig);
    }
  }

  displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean, sanitize?: boolean): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.tipWell = {
        tip,
        icon,
        button: allowDismiss,
        sanitize: sanitize !== false, // defaults to true when undefined
      };
      this.triggerEvent({ controlKey: key, prop: 'tipWell', value: tip });
    }
  }

  setTooltip(key: string, tooltip: string): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.tooltip = tooltip;
      if (tooltip.length >= 40 && tooltip.length <= 400) {
        control.tooltipSize = 'large';
        control.tooltipPreline = true;
      } else if (tooltip.length > 400) {
        control.tooltipSize = 'extra-large';
      }
      this.triggerEvent({ controlKey: key, prop: 'tooltip', value: tooltip });
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
    });
  }

  promptUser(key: string, changes: string[]): Promise<boolean> {
    const showYes = true;
    (document.activeElement as any).blur();
    return this.modalService.open(ControlPromptModal, { changes, key }).onClosed;
  }

  setProperty(key: string, prop: string, value): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control[prop] = value;
      this.triggerEvent({ controlKey: key, prop, value });
    }
  }

  getProperty(key: string, prop: string) {
    const control = this.getControl(key);
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

  hasField(key: string): boolean {
    return !!this.form.controls[key];
  }

  addStaticOption(key: string, newOption): void {
    const control = this.getControl(key);
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
        this.triggerEvent({ controlKey: key, prop: 'options', value: [...currentOptions, optionToAdd] });
      }
    }
  }

  removeStaticOption(key: string, optionToRemove: string): void {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      let currentOptions = this.getProperty(key, 'options');
      if (!currentOptions || !currentOptions.length) {
        const config = this.getProperty(key, 'config');
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
            this.setProperty(key, 'config', config);
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
        this.setProperty(key, 'options', [...currentOptions]);
      }
      this.triggerEvent({ controlKey: key, prop: 'options', value: control.options });
    }
  }

  modifyPickerConfig(
    key: string,
    config: {
      format?: string;
      optionsUrl?: string;
      optionsUrlBuilder?: Function;
      optionsPromise?;
      options?: [];
      resultsTemplateType?: ResultsTemplateType;
    },
    mapper?,
  ): void {
    // call another method to avoid a breaking change but still enable stricter types
    this.mutatePickerConfig(key, config as ModifyPickerConfigArgs, mapper);
  }

  mutatePickerConfig(key: string, args: ModifyPickerConfigArgs, mapper?: (item: unknown) => unknown): void {
    const control = this.getControl(key);
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
      this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: args });
    }
  }

  addPropertiesToPickerConfig(key: string, properties: { [key: string]: unknown }) {
    const control = this.getControl(key);
    if (!control || control.restrictFieldInteractions) {
      return;
    }

    const config = {
      ...control.config,
      ...properties,
    };

    this.setProperty(key, 'config', config);
    this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: properties });
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

  createOptionsFunction = (
    config: ModifyPickerConfigArgs,
    mapper?: (item: unknown) => unknown,
    filteredOptionsCreator?: (where?: string) => (query: string, page?: number) => Promise<unknown[]>,
  ): ((query: string) => Promise<unknown[]>) => (query: string, page?: number) => {
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

  setLoading(key: string, loading: boolean) {
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      if (loading) {
        this.form.controls[key].fieldInteractionloading = true;
        control.setErrors({ loading: true });
        // History
        clearTimeout(this.asyncBlockTimeout);
        this.asyncBlockTimeout = setTimeout(() => {
          this.setLoading(key, false);
          this.displayTip(key, this.labels.asyncFailure, 'info', false);
          this.setProperty(key, '_displayedAsyncFailure', true);
        }, 10000);
      } else {
        this.form.controls[key].fieldInteractionloading = false;
        clearTimeout(this.asyncBlockTimeout);
        control.setErrors({ loading: null });
        control.updateValueAndValidity({ emitEvent: false });
        if (this.getProperty(key, '_displayedAsyncFailure')) {
          this.setProperty(key, 'tipWell', null);
        }
      }
      this.triggerEvent({ controlKey: key, prop: 'loading', value: loading });
    }
  }

  addControl(
    key: string,
    metaForNewField: { key?: string, type?: string, name?: string, label?: string },
    position: string = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD,
    initialValue?,
  ): void {
    if (!metaForNewField.key && !metaForNewField.name) {
      console.error('[FieldInteractionAPI] - missing "key" in meta for new field'); // tslint:disable-line
      return null;
    }

    if (!metaForNewField.key) {
      // If key is not explicitly declared, use name as key
      metaForNewField.key = metaForNewField.name;
    }

    if (this.form.controls[metaForNewField.key]) {
      // Field is already on the form
      return null;
    }

    const control = this.form.controls[key];
    let fieldsetIndex: number;
    let controlIndex: number;
    if (control) {
      fieldsetIndex = -1;
      controlIndex = -1;

      this.form.fieldsets.forEach((fieldset, fi) => {
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
          fieldsetIndex = this.form.fieldsets.length - 1;
          controlIndex = this.form.fieldsets[fieldsetIndex].controls.length;
          break;
        default:
          break;
      }

      if (fieldsetIndex !== -1 && controlIndex !== -1) {
        const novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
        novoControl.hidden = false;
        const formControl = new NovoFormControl(initialValue, novoControl);
        this.form.addControl(novoControl.key, formControl);
        this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
        this.triggerEvent({ controlKey: key, prop: 'addControl', value: formControl });
      }
    }
  }

  removeControl(key: string): void {
    if (!this.form.controls[key]) {
      // Field is not on the form
      return null;
    }
    const control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      let fieldsetIndex = -1;
      let controlIndex = -1;

      this.form.fieldsets.forEach((fieldset, fi) => {
        fieldset.controls.forEach((fieldsetControl, ci) => {
          if (fieldsetControl.key === key) {
            fieldsetIndex = fi;
            controlIndex = ci;
          }
        });
      });

      if (fieldsetIndex !== -1 && controlIndex !== -1) {
        this.form.removeControl(key);
        this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 1);
        this.triggerEvent({ controlKey: key, prop: 'removeControl', value: key });
      }
    }
  }

  debounce(func: () => void, wait = 50) {
    let h;
    clearTimeout(h);
    h = setTimeout(() => func(), wait);
  }

  private triggerEvent(event: IFieldInteractionEvent): void {
    if (this.form && this.form.fieldInteractionEvents) {
      this.form.fieldInteractionEvents.emit(event);
    }
  }
}
