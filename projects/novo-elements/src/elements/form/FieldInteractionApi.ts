// NG2
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Vendor
import { map } from 'rxjs/operators';
// APP
import { NovoFormControl } from './NovoFormControl';
import { NovoControlConfig } from './FormControls';
import { FormUtils } from '../../utils/form-utils/FormUtils';
import { NovoToastService } from '../toast/ToastService';
import { NovoModalService } from '../modal/ModalService';
import { ControlConfirmModal, ControlPromptModal } from './FieldInteractionModals';
import { Helpers } from '../../utils/Helpers';
import { AppBridge } from '../../utils/app-bridge/AppBridge';
import { NovoLabelService } from '../../services/novo-label-service';
import { IFieldInteractionEvent } from './FormInterfaces';

class CustomHttp {
  url: string;
  options: any;
  mapFn: any;

  constructor(private http: HttpClient) {}

  get(url: string, options?: any) {
    this.url = url;
    this.options = options;
    return this;
  }

  map(mapFn: any) {
    this.mapFn = mapFn;
    return this;
  }

  subscribe(resolve: any, reject?: any) {
    return this.http
      .get(this.url, this.options)
      .pipe(map(this.mapFn))
      .subscribe(resolve, reject);
  }
}

@Injectable()
export class FieldInteractionApi {
  private _globals: any;
  private _form: any;
  private _currentKey: string;
  private _appBridge: AppBridge;
  private asyncBlockTimeout: any;

  public static FIELD_POSITIONS = {
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

  set form(form: any) {
    this._form = form;
  }

  get form(): any {
    return this._form;
  }

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

  set globals(globals: any) {
    this._globals = globals;
  }

  get globals(): any {
    return this._globals;
  }

  set currentKey(key: string) {
    this._currentKey = key;
  }

  get currentKey(): string {
    return this._currentKey;
  }

  set appBridge(appBridge: AppBridge) {
    this._appBridge = appBridge;
  }

  get appBridge(): AppBridge {
    return this._appBridge;
  }

  public isActiveControlValid(): boolean {
    return !!this.getValue(this.currentKey);
  }

  public getActiveControl(): NovoFormControl {
    return this.getControl(this.currentKey);
  }

  public getActiveKey(): string {
    return this.currentKey;
  }

  public getActiveValue(): any {
    return this.getValue(this.currentKey);
  }

  public getActiveInitialValue(): any {
    return this.getInitialValue(this.currentKey);
  }

  public getControl(key: string): NovoFormControl {
    if (!key) {
      console.error('[FieldInteractionAPI] - invalid or missing "key"'); // tslint:disable-line
      return null;
    }

    let control = this.form.controls[key];
    if (!control) {
      console.error('[FieldInteractionAPI] - could not find a control in the form by the key --', key); // tslint:disable-line
      return null;
    }

    return control as NovoFormControl;
  }

  public getValue(key: string): any {
    let control = this.getControl(key);
    if (control) {
      return control.value;
    }
    return null;
  }

  public getRawValue(key: string): any {
    let control = this.getControl(key);
    if (control) {
      return control.rawValue;
    }
    return null;
  }

  public getInitialValue(key: string): any {
    let control = this.getControl(key);
    if (control) {
      return control.initialValue;
    }
    return null;
  }

  public setValue(
    key: string,
    value: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value: value });
    }
  }

  public patchValue(
    key: string,
    value: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setValue(value, options);
      this.triggerEvent({ controlKey: key, prop: 'value', value: value });
    }
  }

  public setReadOnly(key: string, isReadOnly: boolean): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setReadOnly(isReadOnly);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: isReadOnly });
    }
  }

  public setRequired(key: string, required: boolean): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.setRequired(required);
      this.triggerEvent({ controlKey: key, prop: 'required', value: required });
    }
  }

  public hide(key: string, clearValue: boolean = true): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.hide(clearValue);
      this.disable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: true });
    }
  }

  public show(key: string): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.show();
      this.enable(key, { emitEvent: false });
      this.triggerEvent({ controlKey: key, prop: 'hidden', value: false });
    }
  }

  public disable(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.disable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: true });
    }
  }

  public enable(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.enable(options);
      this.triggerEvent({ controlKey: key, prop: 'readOnly', value: false });
    }
  }

  public markAsInvalid(key: string, validationMessage?: string): void {
    let control = this.getControl(key);
    if (control) {
      if (control && !control.restrictFieldInteractions) {
        control.markAsInvalid(validationMessage);
      }
    }
  }

  public markAsDirty(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsDirty(options);
    }
  }

  public markAsPending(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPending(options);
    }
  }

  public markAsPristine(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsPristine(options);
    }
  }

  public markAsTouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsTouched(options);
    }
  }

  public markAsUntouched(
    key: string,
    options?: {
      onlySelf?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.markAsUntouched(options);
    }
  }

  public updateValueAndValidity(
    key: string,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    },
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.updateValueAndValidity(options);
    }
  }

  public displayToast(toastConfig: {
    message: string;
    title?: string;
    hideDelay?: number;
    icon?: string;
    theme?: string;
    position?: string;
    isCloseable?: boolean;
    customClass?: string;
  }): void {
    if (this.toaster) {
      this.toaster.alert(toastConfig);
    }
  }

  public displayTip(key: string, tip: string, icon?: string, allowDismiss?: boolean): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control.tipWell = {
        tip: tip,
        icon: icon,
        button: allowDismiss,
      };
      this.triggerEvent({ controlKey: key, prop: 'tipWell', value: tip });
    }
  }

  public setTooltip(key: string, tooltip: string): void {
    let control = this.getControl(key);
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

  public confirmChanges(key: string, message?: string): Promise<boolean> {
    let history = this.getProperty(key, 'valueHistory');
    let oldValue = history[history.length - 2];
    let newValue = this.getValue(key);
    let label = this.getProperty(key, 'label');
    (document.activeElement as any).blur();
    return this.modalService.open(ControlConfirmModal, { oldValue, newValue, label, message, key }).onClosed.then((result) => {
      if (!result) {
        this.setValue(key, oldValue, { emitEvent: false });
      }
    });
  }

  public promptUser(key: string, changes: string[]): Promise<boolean> {
    let showYes: boolean = true;
    (document.activeElement as any).blur();
    return this.modalService.open(ControlPromptModal, { changes }).onClosed;
  }

  public setProperty(key: string, prop: string, value: any): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      control[prop] = value;
      this.triggerEvent({ controlKey: key, prop: prop, value: value });
    }
  }

  public getProperty(key: string, prop: string): any {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      return control[prop];
    }
    return null;
  }

  public isValueEmpty(key: string): boolean {
    let value = this.getValue(key);
    return Helpers.isEmpty(value);
  }

  public isValueBlank(key: string): boolean {
    let value = this.getValue(key);
    return Helpers.isBlank(value);
  }

  public hasField(key: string): boolean {
    return !!this.form.controls[key];
  }

  public addStaticOption(key: string, newOption: any): void {
    let control = this.getControl(key);
    let optionToAdd = newOption;
    let isUnique: boolean = true;
    if (control && !control.restrictFieldInteractions) {
      let currentOptions = this.getProperty(key, 'options');
      if (!currentOptions || !currentOptions.length) {
        let config = this.getProperty(key, 'config');
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

  public removeStaticOption(key: string, optionToRemove: string): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      let currentOptions = this.getProperty(key, 'options');
      if (!currentOptions || !currentOptions.length) {
        let config = this.getProperty(key, 'config');
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

  public modifyPickerConfig(
    key: string,
    config: { format?: string; optionsUrl?: string; optionsUrlBuilder?: Function; optionsPromise?: any; options?: any[] },
    mapper?: any,
  ): void {
    let control = this.getControl(key);
    if (control && !control.restrictFieldInteractions) {
      let newConfig: any = {
        resultsTemplate: control.config.resultsTemplate,
      };
      if (config.optionsUrl || config.optionsUrlBuilder || config.optionsPromise) {
        newConfig = Object.assign(newConfig, {
          format: config.format,
          options: (query) => {
            if (config.optionsPromise) {
              return config.optionsPromise(query, new CustomHttp(this.http));
            }
            return new Promise((resolve, reject) => {
              let url = config.optionsUrlBuilder ? config.optionsUrlBuilder(query) : `${config.optionsUrl}?filter=${query || ''}`;
              if (query && query.length) {
                this.http
                  .get(url)
                  .pipe(
                    map((results: any[]) => {
                      if (mapper) {
                        return results.map(mapper);
                      }
                      return results;
                    }),
                  )
                  .subscribe(resolve, reject);
              } else {
                resolve([]);
              }
            });
          },
        });
      } else if (config.options) {
        newConfig.options = [...config.options];
      }
      this.setProperty(key, 'config', newConfig);
      this.triggerEvent({ controlKey: key, prop: 'pickerConfig', value: config });
    }
  }

  public setLoading(key: string, loading: boolean) {
    let control = this.getControl(key);
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

  public addControl(
    key: string,
    metaForNewField: any,
    position: string = FieldInteractionApi.FIELD_POSITIONS.ABOVE_FIELD,
    initialValue?: any,
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

    let control = this.form.controls[key];
    let fieldsetIndex, controlIndex;
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
        let novoControl = this.formUtils.getControlForField(metaForNewField, this.http, {});
        novoControl.hidden = false;
        let formControl = new NovoFormControl(initialValue, novoControl);
        this.form.addControl(novoControl.key, formControl);
        this.form.fieldsets[fieldsetIndex].controls.splice(controlIndex, 0, novoControl);
        this.triggerEvent({ controlKey: key, prop: 'addControl', value: formControl });
      }
    }
  }

  public removeControl(key: string): void {
    if (!this.form.controls[key]) {
      // Field is not on the form
      return null;
    }
    let control = this.getControl(key);
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

  public debounce(func: () => void, wait = 50) {
    let h: any;
    clearTimeout(h);
    h = setTimeout(() => func(), wait);
  }

  private triggerEvent(event: IFieldInteractionEvent): void {
    if (this.form && this.form.fieldInteractionEvents) {
      this.form.fieldInteractionEvents.emit(event);
    }
  }
}
