// NG2
import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnInit,
  OnDestroy,
  Directive,
  HostListener,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
// Vendor
import { Observable } from 'rxjs/Observable';
// APP
import { NovoFormGroup } from './FormInterfaces';
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoTemplateService } from '../../services/template/NovoTemplateService';

export interface IMaskOptions {
  mask: any;
  keepCharPositions: boolean;
  guide: boolean;
}

@Directive({
  selector: 'textarea[autosize]',
})
export class NovoAutoSize implements AfterContentInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.adjust();
    });
  }

  adjust(): void {
    const nativeElement = this.element.nativeElement;
    nativeElement.style.height = nativeElement.style.minHeight;
    nativeElement.style.height = `${nativeElement.scrollHeight}px`;
  }
}
//undo all template context references!
@Component({
  selector: 'novo-control',
  template: `
        <novo-control-templates></novo-control-templates>
        <div class="novo-control-container" [hidden]="form.controls[control.key].hidden || form.controls[control.key].type === 'hidden' || form.controls[control.key].controlType === 'hidden'">
            <!--Encrypted Field-->
            <span [tooltip]="labels.encryptedFieldTooltip" [tooltipPosition]="'right'"><i [hidden]="!form.controls[control.key].encrypted"
            class="bhi-lock"></i></span>
            <!--Label (for horizontal)-->
            <label [attr.for]="control.key" *ngIf="form.layout !== 'vertical' && form.controls[control.key].label && !condensed" [ngClass]="{'encrypted': form.controls[control.key].encrypted }">
                {{ form.controls[control.key].label }}
            </label>
            <div class="novo-control-outer-container">
                <!--Label (for vertical)-->
                <label
                    *ngIf="form.layout === 'vertical' && form.controls[control.key].label && !condensed"
                    class="novo-control-label"
                    [attr.for]="control.key"
                    [class.novo-control-empty]="!hasValue"
                    [class.novo-control-focused]="focused"
                    [class.novo-control-filled]="hasValue"
                    [class.novo-control-always-active]="alwaysActive || form.controls[control.key].placeholder"
                    [class.novo-control-extra-spacing]="requiresExtraSpacing">
                    {{ form.controls[control.key].label }}
                </label>
                <div class="novo-control-inner-container" [class.required]="form.controls[control.key].required && !form.controls[control.key].readOnly">
                    <div class="novo-control-inner-input-container">
                      <!--Required Indicator-->
                        <i [hidden]="!form.controls[control.key].required || form.controls[control.key].readOnly"
                            class="required-indicator {{ form.controls[control.key].controlType }}"
                            [ngClass]="{'bhi-circle': !isValid, 'bhi-check': isValid}" *ngIf="!condensed || form.controls[control.key].required">
                        </i>
                        <!--Form Controls-->
                        <div class="novo-control-input {{ form.controls[control.key].controlType }}" [attr.data-automation-id]="control.key" [class.control-disabled]="form.controls[control.key].disabled">
                            <!--TODO prefix/suffix on the control-->
                            <ng-container *ngIf="templates">
                              <ng-container *ngTemplateOutlet="templates[form.controls[control.key].controlType]; context: templateContext"></ng-container>
                            </ng-container>
                        </div>
                    </div>
                    <!--Error Message-->
                    <div class="field-message {{ form.controls[control.key].controlType }}" *ngIf="!condensed" [class.has-tip]="form.controls[control.key].tipWell">
                        <div class="messages">
                            <span class="error-text" *ngIf="showFieldMessage"></span>
                            <span class="error-text" *ngIf="isDirty && errors?.required && form.controls[control.key].controlType !== 'address'">{{ form.controls[control.key].label | uppercase }} {{ labels.isRequired }}</span>
                            <span class="error-text" *ngIf="isDirty && errors?.minlength">{{ form.controls[control.key].label | uppercase }} {{ labels.minLength }} {{ form.controls[control.key].minlength }}</span>
                            <span class="error-text" *ngIf="isDirty && maxLengthMet && focused && !errors?.maxlength">{{ labels.maxlengthMet(form.controls[control.key].maxlength) }}</span>
                            <span class="error-text" *ngIf="errors?.maxlength && focused && !errors?.maxlengthFields">{{ labels.invalidMaxlength(form.controls[control.key].maxlength) }}</span>
                            <span class="error-text" *ngIf="isDirty && errors?.invalidEmail">{{ form.controls[control.key].label | uppercase }} {{ labels.invalidEmail }}</span>
                            <span class="error-text" *ngIf="isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)">{{ form.controls[control.key].label | uppercase }} {{ labels.isTooLarge }}</span>
                            <span *ngIf="isDirty && errors?.minYear">{{ form.controls[control.key].label | uppercase }} {{ labels.notValidYear }}</span>
                            <span class="error-text" *ngIf="isDirty && (errors?.custom)">{{ errors.custom }}</span>
                            <span class="error-text" *ngIf="errors?.maxlength && errors?.maxlengthFields && maxlengthErrorField && focused">
                                {{ labels.invalidMaxlengthWithField(control.config[maxlengthErrorField]?.label, control.config[maxlengthErrorField]?.maxlength) }}
                            </span>
                            <span class="error-text" *ngIf="isDirty && maxlengthMetField && focused && !errors?.maxlengthFields?.includes(maxlengthMetField)">
                              {{ labels.maxlengthMetWithField(control.config[maxlengthMetField]?.label, control.config[maxlengthMetField]?.maxlength) }}
                            </span>
                            <span *ngIf="isDirty && errors?.invalidAddress">
                                <span class="error-text" *ngFor="let invalidAddressField of errors?.invalidAddressFields">{{ invalidAddressField | uppercase }} {{ labels.isRequired }} </span>
                            </span>
                            <!--Field Hint-->
                            <span class="description" *ngIf="form.controls[control.key].description">
                                {{ form.controls[control.key].description }}
                            </span>
                        </div>
                        <span class="character-count" [class.error]="((errors?.maxlength && !errors?.maxlengthFields) || (errors?.maxlength && errors?.maxlengthFields && errors.maxlengthFields.includes(focusedField)))" *ngIf="showCount">{{ characterCount }}/{{ maxLength || form.controls[control.key].maxlength }}</span>
                    </div>
                    <!--Tip Wel-->
                    <novo-tip-well *ngIf="form.controls[control.key].tipWell" [name]="control.key" [tip]="form.controls[control.key]?.tipWell?.tip" [icon]="form.controls[control.key]?.tipWell?.icon" [button]="form.controls[control.key]?.tipWell?.button"></novo-tip-well>
                </div>
                <i *ngIf="form.controls[control.key].fieldInteractionloading" class="loading">
                    <svg version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                     x="0px" y="0px" width="18.2px" height="18.5px" viewBox="0 0 18.2 18.5" style="enable-background:new 0 0 18.2 18.5;"
                     xml:space="preserve">
                    <style type="text/css">
                        .spinner { fill:#FFFFFF; }
                    </style>
                        <path class="spinner" d="M9.2,18.5C4.1,18.5,0,14.4,0,9.2S4.1,0,9.2,0c0.9,0,1.9,0.1,2.7,0.4c0.8,0.2,1.2,1.1,1,1.9
                            c-0.2,0.8-1.1,1.2-1.9,1C10.5,3.1,9.9,3,9.2,3C5.8,3,3,5.8,3,9.2s2.8,6.2,6.2,6.2c2.8,0,5.3-1.9,6-4.7c0.2-0.8,1-1.3,1.8-1.1
                            c0.8,0.2,1.3,1,1.1,1.8C17.1,15.7,13.4,18.5,9.2,18.5z"/>
                    </svg>
                </i>
            </div>
        </div>
    `,
  host: {
    '[class]': 'form.controls[control.key].controlType',
    '[attr.data-control-type]': 'form.controls[control.key].controlType',
    '[class.disabled]': 'form.controls[control.key].readOnly',
    '[class.hidden]': 'form.controls[control.key].hidden',
    '[attr.data-control-key]': 'control.key',
  },
})
export class NovoControlElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input() control: any;
  @Input() form: any;
  @Input() condensed: boolean = false;
  @Input() autoFocus: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() upload: EventEmitter<any> = new EventEmitter();
  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }

  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focused: boolean = false;
  private _enteredText: string = '';
  formattedValue: string = '';
  percentValue: number;
  maxLengthMet: boolean = false;
  characterCount: number = 0;
  private forceClearSubscription: any;
  private percentChangeSubscription: any;
  private valueChangeSubscription: any;
  private dateChangeSubscription: any;
  private _showCount: boolean = false;
  private maxLength: number;
  private focusedField: string;
  private characterCountField: string;
  private maxLengthMetErrorfields: string[] = [];
  private statusChangeSubscription: any;

  maskOptions: IMaskOptions;
  templates: any = {};
  templateContext: any;

  constructor(
    element: ElementRef,
    public labels: NovoLabelService,
    private dateFormatService: DateFormatService,
    private fieldInteractionApi: FieldInteractionApi,
    private templateService: NovoTemplateService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super(element);
  }

  get maxlengthMetField(): string {
    if (this.maxLengthMetErrorfields && this.maxLengthMetErrorfields.length) {
      return this.maxLengthMetErrorfields.find((field: string) => field === this.focusedField) || '';
    } else {
      return '';
    }
  }

  get maxlengthErrorField(): string {
    if (this.errors && this.errors.maxlengthFields && this.errors.maxlengthFields.length) {
      return this.errors.maxlengthFields.find((field: string) => field === this.focusedField) || '';
    } else {
      return '';
    }
  }

  get showFieldMessage() {
    return !this.errors && !this.maxLengthMet && Helpers.isBlank(this.control.description);
  }

  get showCount() {
    let charCount: boolean =
      this.form.controls[this.control.key].maxlength &&
      this.focused &&
      (this.form.controls[this.control.key].controlType === 'text-area' || this.form.controls[this.control.key].controlType === 'textbox');
    return this._showCount || charCount;
  }

  set showCount(value) {
    this._showCount = value;
  }

  ngAfterViewInit() {
    const DO_NOT_FOCUS_ME: string[] = ['picker', 'time', 'date', 'date-time'];
    if (this.autoFocus && !DO_NOT_FOCUS_ME.includes(this.control.controlType)) {
      setTimeout(() => {
        let input: HTMLElement = this.element.nativeElement.querySelector('input');
        if (input) {
          input.focus();
        }
      });
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.templates = this.templateService.getAll();
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit() {
    // Make sure to initially format the time controls
    if (this.control && this.form.controls[this.control.key].value) {
      if (
        this.form.controls[this.control.key].controlType === 'textbox' ||
        this.form.controls[this.control.key].controlType === 'text-area'
      ) {
        this.characterCount = this.form.controls[this.control.key].value.length;
      }
    }
    if (this.control) {
      // Listen to clear events
      this.forceClearSubscription = this.control.forceClear.subscribe(() => {
        this.clearValue();
      });
      // For Asynchronous validations
      this.statusChangeSubscription = this.form.controls[this.control.key].statusChanges.subscribe((validity) => {
        this.form.controls[this.control.key] = this.templateContext.$implicit;
        if (validity !== 'PENDING' && this.form.updateValueAndValidity) {
          this.form.updateValueAndValidity();
        }
      });
      // Subscribe to control interactions
      if (this.control.interactions) {
        for (let interaction of this.control.interactions) {
          switch (interaction.event) {
            case 'blur':
              this.valueChangeSubscription = this.onBlur.debounceTime(300).subscribe(() => {
                this.executeInteraction(interaction);
              });
              break;
            case 'focus':
              this.valueChangeSubscription = this.onFocus.debounceTime(300).subscribe(() => {
                this.executeInteraction(interaction);
              });
              break;
            case 'change':
              this.valueChangeSubscription = this.form.controls[this.control.key].valueChanges.debounceTime(300).subscribe(() => {
                this.executeInteraction(interaction);
              });
              break;
            case 'init':
              interaction.invokeOnInit = true;
              break;
            default:
              break;
          }
          if (interaction.invokeOnInit) {
            this.executeInteraction(interaction);
          }
        }
      }
    }
    this.templateContext = {
      $implicit: this.form.controls[this.control.key],
      methods: {
        restrictKeys: this.restrictKeys.bind(this),
        emitChange: this.emitChange.bind(this),
        handleFocus: this.handleFocus.bind(this),
        handlePercentChange: this.handlePercentChange.bind(this),
        handleBlur: this.handleBlur.bind(this),
        handleTextAreaInput: this.handleTextAreaInput.bind(this),
        handleEdit: this.handleEdit.bind(this),
        handleSave: this.handleSave.bind(this),
        handleDelete: this.handleDelete.bind(this),
        handleUpload: this.handleUpload.bind(this),
        modelChange: this.modelChange.bind(this),
        modelChangeWithRaw: this.modelChangeWithRaw.bind(this),
        handleAddressChange: this.handleAddressChange.bind(this),
        handleTyping: this.handleTyping.bind(this),
        updateValidity: this.updateValidity.bind(this),
        toggleActive: this.toggleActive.bind(this),
      },
      form: this.form,
    };
    this.templateContext.$implicit.tooltipPosition = this.tooltipPosition;
    this.templateContext.$implicit.tooltip = this.tooltip;
    this.templateContext.$implicit.tooltipSize = this.tooltipSize;
    this.templateContext.$implicit.tooltipPreline = this.tooltipPreline;
    this.templateContext.$implicit.startupFocus = this.control.startupFocus;
    this.templateContext.$implicit.fileBrowserImageUploadUrl = this.control.fileBrowserImageUploadUrl;
    this.templateContext.$implicit.minimal = this.control.minimal;
    this.templateContext.$implicit.currencyFormat = this.control.currencyFormat;
    this.templateContext.$implicit.percentValue = this.control.percentValue;
    this.templateContext.$implicit.config = this.control.config;

    if (this.form.controls[this.control.key] && this.form.controls[this.control.key].subType === 'percentage') {
      if (!Helpers.isEmpty(this.form.controls[this.control.key].value)) {
        this.templateContext.$implicit.percentValue = Number(
          (this.form.controls[this.control.key].value * 100).toFixed(6).replace(/\.?0*$/, ''),
        );
      }
      this.percentChangeSubscription = this.form.controls[this.control.key].displayValueChanges.subscribe((value) => {
        if (!Helpers.isEmpty(value)) {
          this.templateContext.$implicit.percentValue = Number((value * 100).toFixed(6).replace(/\.?0*$/, ''));
        }
      });
    }
  }

  ngOnDestroy() {
    // Unsubscribe from control interactions
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
    // if (this.dateChangeSubscription) {
    //     this.dateChangeSubscription.unsubscribe();
    // }
    if (this.forceClearSubscription) {
      // Un-listen for clear events
      this.forceClearSubscription.unsubscribe();
    }
    if (this.percentChangeSubscription) {
      // Un-listen for clear events
      this.percentChangeSubscription.unsubscribe();
    }
    if (this.dateChangeSubscription) {
      this.dateChangeSubscription.unsubscribe();
    }
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  get errors() {
    return this.form.controls[this.control.key].errors;
  }

  get isValid() {
    return this.form.controls[this.control.key].valid;
  }

  get isDirty() {
    return this.form.controls[this.control.key].dirty || this.control.dirty;
  }

  get hasValue() {
    return !Helpers.isEmpty(this.form.value[this.control.key]);
  }

  get focused() {
    return this._focused;
  }

  get tooltip() {
    return this.form.controls[this.control.key].tooltip;
  }

  get tooltipPosition() {
    if (Helpers.isBlank(this.form.controls[this.control.key].tooltipPosition)) {
      return 'right';
    }
    return this.form.controls[this.control.key].tooltipPosition;
  }

  get tooltipSize() {
    if (Helpers.isBlank(this.form.controls[this.control.key].tooltipSize)) {
      return '';
    }
    return this.form.controls[this.control.key].tooltipSize;
  }

  get tooltipPreline() {
    if (Helpers.isBlank(this.form.controls[this.control.key].tooltipPreline)) {
      return false;
    }
    return this.form.controls[this.control.key].tooltipPreline;
  }

  get alwaysActive() {
    // Controls that have the label active if there is any user entered text in the field
    if (this.form.controls[this.control.key].controlType === 'picker' && this._enteredText.length) {
      return true;
    }

    // Controls that always have the label active
    return (
      [
        'tiles',
        'checklist',
        'checkbox',
        'date',
        'time',
        'date-time',
        'address',
        'file',
        'editor',
        'ace-editor',
        'radio',
        'text-area',
        'quick-note',
      ].indexOf(this.form.controls[this.control.key].controlType) !== -1
    );
  }

  get requiresExtraSpacing() {
    // Chips
    if (this.form.controls[this.control.key].controlType === 'picker' && this.form.controls[this.control.key].multiple && this.hasValue) {
      return true;
    }
    return false;
  }

  executeInteraction(interaction) {
    if (interaction.script && Helpers.isFunction(interaction.script)) {
      setTimeout(() => {
        this.fieldInteractionApi.form = this.form;
        this.fieldInteractionApi.currentKey = this.control.key;
        try {
          interaction.script(this.fieldInteractionApi, this.control.key);
        } catch (err) {
          console.info('Field Interaction Error!', this.control.key); // tslint:disable-line
          console.error(err); // tslint:disable-line
        }
      });
    }
  }

  handleTyping(event: any) {
    this._focused = event && event.length;
    this._enteredText = event;
  }

  handleFocus(event: FocusEvent, field) {
    this._focused = true;
    this.focusedField = field;
    if (!Helpers.isBlank(this.characterCountField) && this.characterCountField === field) {
      this.showCount = true;
    } else if (
      this.form.controls[this.control.key].controlType === 'address' &&
      field &&
      !Helpers.isEmpty(this.form.value[this.control.key]) &&
      !Helpers.isBlank(this.form.value[this.control.key][field])
    ) {
      this.handleAddressChange({ value: this.form.value[this.control.key][field], field });
    }
    this._focusEmitter.emit(event);
  }

  handleBlur(event: FocusEvent) {
    this._focused = false;
    this.focusedField = '';
    this.showCount = false;
    this._blurEmitter.emit(event);
  }

  clearValue() {
    this.form.controls[this.control.key].setValue(null);
    this.formattedValue = null;
  }

  handleTextAreaInput(event) {
    this.emitChange(event);
    this.restrictKeys(event);
  }

  checkMaxLength(event) {
    if (this.control && this.form.controls[this.control.key].maxlength) {
      this.characterCount = event.target.value.length;
      this.maxLengthMet = event.target.value.length >= this.form.controls[this.control.key].maxlength;
    }
  }

  modelChangeWithRaw(event) {
    if (Helpers.isEmpty(event.value)) {
      this._focused = false;
      this._enteredText = '';
    }
    this.form.controls[this.control.key].rawValue = event.rawValue;
    this.change.emit(event.value);
  }

  modelChange(value) {
    if (Helpers.isEmpty(value)) {
      this._focused = false;
      this._enteredText = '';
    }
    this.change.emit(value);
  }

  restrictKeys(event) {
    const NUMBERS_ONLY = /[0-9\-]/;
    const NUMBERS_WITH_DECIMAL = /[0-9\.\-]/;
    const UTILITY_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    let key = event.key;
    // Types
    if (this.form.controls[this.control.key].subType === 'number' && !(NUMBERS_ONLY.test(key) || UTILITY_KEYS.includes(key))) {
      event.preventDefault();
    } else if (
      ~['currency', 'float', 'percentage'].indexOf(this.form.controls[this.control.key].subType) &&
      !(NUMBERS_WITH_DECIMAL.test(key) || UTILITY_KEYS.includes(key))
    ) {
      event.preventDefault();
    }
    // Max Length
    if (this.form.controls[this.control.key].maxlength && event.target.value.length >= this.form.controls[this.control.key].maxlength) {
      event.preventDefault();
    }
  }

  handlePercentChange(event: KeyboardEvent) {
    let value = event.target['value'];
    let percent = Helpers.isEmpty(value) ? null : Number((value / 100).toFixed(6).replace(/\.?0*$/, ''));
    if (!Helpers.isEmpty(percent)) {
      this.change.emit(percent);
      this.form.controls[this.control.key].setValue(percent);
    } else {
      this.change.emit(null);
      this.form.controls[this.control.key].setValue(null);
    }
  }

  handleTabForPickers(event: any): void {
    if (this.active && event && event.keyCode) {
      if (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.TAB) {
        this.toggleActive(event, false);
      }
    }
  }

  emitChange(value) {
    this.change.emit(value);
    this.checkMaxLength(value);
  }

  handleEdit(value) {
    this.edit.emit(value);
  }

  handleSave(value) {
    this.save.emit(value);
  }

  handleDelete(value) {
    this.delete.emit(value);
  }

  handleUpload(value) {
    this.upload.emit(value);
  }

  handleAddressChange(data) {
    if (
      data &&
      !Helpers.isBlank(data.value) &&
      data.field &&
      this.control.config[data.field] &&
      !Helpers.isEmpty(this.control.config[data.field].maxlength)
    ) {
      this.characterCount = data.value.length;
      this.characterCountField = data.field;
      this.maxLength = this.control.config[data.field].maxlength;
      this.showCount = true;
      if (this.maxLength === this.characterCount) {
        this.maxLengthMetErrorfields.push(data.field);
      } else {
        this.maxLengthMetErrorfields = this.maxLengthMetErrorfields.filter((field: string) => field !== data.field);
      }
    }
  }
  updateValidity(shouldEventBeEmitted): void {
    let emitEvent: boolean = shouldEventBeEmitted ? true : false;
    this.form.controls[this.control.key].updateValueAndValidity({ emitEvent });
  }
}
