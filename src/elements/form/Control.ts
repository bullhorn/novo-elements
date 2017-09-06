// NG2
import { Component, Input, Output, ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
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

export interface IMaskOptions {
    mask: any;
    keepCharPositions: boolean;
    guide: boolean;
};

@Component({
    selector: 'novo-custom-control-container',
    template: `
        <div class="novo-control-container" [hidden]="form.controls[control.key].hidden || form.controls[control.key].type === 'hidden' || form.controls[control.key].controlType === 'hidden'">
            <!--Label (for horizontal)-->
            <label [attr.for]="control.key" *ngIf="form.layout !== 'vertical' && form.controls[control.key].label">{{ form.controls[control.key].label }}</label>
            <div class="novo-control-outer-container">
                <!--Label (for vertical)-->
                <label
                    *ngIf="form.layout === 'vertical' && form.controls[control.key].label"
                    class="novo-control-label"
                    [attr.for]="control.key"
                    [class.novo-control-always-active]="true">
                    {{ form.controls[control.key].label }}
                </label>
                <div class="novo-control-inner-container">
                    <div class="novo-control-inner-input-container">
                        <!--Required Indicator-->
                        <i [hidden]="!form.controls[control.key].required || form.controls[control.key].readOnly"
                            class="required-indicator"
                            [ngClass]="{'bhi-circle': !isValid, 'bhi-check': isValid}" *ngIf="form.controls[control.key].required">
                        </i>
                        <!--Form Controls-->
                        <div class="novo-control-input {{ form.controls[control.key].controlType }}" [attr.data-automation-id]="control.key">
                            <ng-content></ng-content>
                        </div>
                    </div>
                    <!--Error Message-->
                    <div class="field-message">
                        <div class="messages">
                            <span class="error-text" *ngIf="(form.controls[control.key].dirty || control.dirty) && form.controls[control.key].errors?.required">{{ form.controls[control.key].label | uppercase }} is required</span>
                            <span class="error-text" *ngIf="(form.controls[control.key].dirty || control.dirty) && (form.controls[control.key].errors?.custom)">{{ form.controls[control.key].errors.custom }}</span>
                            <!--Field Hint-->
                            <span class="description" *ngIf="form.controls[control.key].description">
                                {{ form.controls[control.key].description }}
                            </span>
                        </div>
                    </div>
                    <!--Tip Wel-->
                    <novo-tip-well *ngIf="form.controls[control.key].tipWell" [name]="control.key" [tip]="form.controls[control.key]?.tipWell?.tip" [icon]="form.controls[control.key]?.tipWell?.icon" [button]="form.controls[control.key]?.tipWell?.button"></novo-tip-well>
                </div>
            </div>
        </div>
    `
})
export class NovoCustomControlContainerElement {
    @Input() control;
    @Input() form: NovoFormGroup;
}

@Component({
    selector: 'novo-control',
    template: `
        <div class="novo-control-container" [formGroup]="form" [hidden]="form.controls[control.key].hidden || form.controls[control.key].type === 'hidden' || form.controls[control.key].controlType === 'hidden'">
            <!--Label (for horizontal)-->
            <label [attr.for]="control.key" *ngIf="form.layout !== 'vertical' && form.controls[control.key].label && !condensed">{{ form.controls[control.key].label }}</label>
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
                <div class="novo-control-inner-container">
                    <div class="novo-control-inner-input-container">
                        <!--Required Indicator-->
                        <i [hidden]="!form.controls[control.key].required || form.controls[control.key].readOnly"
                            class="required-indicator"
                            [ngClass]="{'bhi-circle': !isValid, 'bhi-check': isValid}" *ngIf="!condensed || form.controls[control.key].required">
                        </i>
                        <!--Form Controls-->
                        <div class="novo-control-input {{ form.controls[control.key].controlType }}" [ngSwitch]="form.controls[control.key].controlType" [attr.data-automation-id]="control.key">
                            <!--Text-based Inputs-->
                            <!--TODO prefix/suffix on the control-->
                            <div class="novo-control-input-container novo-control-input-with-label" *ngSwitchCase="'textbox'" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition">
                                <input *ngIf="form.controls[control.key].type !== 'number'" [formControlName]="control.key" [id]="control.key" [type]="form.controls[control.key].type" [placeholder]="form.controls[control.key].placeholder" (input)="emitChange($event)" [maxlength]="form.controls[control.key].maxlength" (focus)="handleFocus($event)" (blur)="handleBlur($event)">
                                <input *ngIf="form.controls[control.key].type === 'number' && form.controls[control.key].subType !== 'percentage'" [formControlName]="control.key" [id]="control.key" [type]="form.controls[control.key].type" [placeholder]="form.controls[control.key].placeholder" (keydown)="restrictKeys($event)" (input)="emitChange($event)" [maxlength]="form.controls[control.key].maxlength" (focus)="handleFocus($event)" (blur)="handleBlur($event)" step="any" (mousewheel)="numberInput.blur()" #numberInput>
                                <input *ngIf="form.controls[control.key].type === 'number' && form.controls[control.key].subType === 'percentage'" [type]="form.controls[control.key].type" [placeholder]="form.controls[control.key].placeholder" (keydown)="restrictKeys($event)" [value]="percentValue" (input)="handlePercentChange($event)" (focus)="handleFocus($event)" (blur)="handleBlur($event)" step="any" (mousewheel)="percentInput.blur()" #percentInput>
                                <label class="input-label" *ngIf="form.controls[control.key].subType === 'currency'">{{ control.currencyFormat }}</label>
                                <label class="input-label" *ngIf="form.controls[control.key].subType === 'percentage'">%</label>
                            </div>
                            <!--TextArea-->
                            <textarea *ngSwitchCase="'text-area'" [name]="control.key" [attr.id]="control.key" [placeholder]="form.controls[control.key].placeholder" [formControlName]="control.key" (input)="handleTextAreaInput($event)" (focus)="handleFocus($event)" (blur)="handleBlur($event)" [maxlength]="control.maxlength" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></textarea>
                            <!--Editor-->
                            <novo-editor *ngSwitchCase="'editor'" [name]="control.key" [formControlName]="control.key" (focus)="handleFocus($event)" (blur)="handleBlur($event)"></novo-editor>
                            <!--HTML5 Select-->
                            <select [id]="control.key" *ngSwitchCase="'native-select'" [formControlName]="control.key" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition">
                                <option *ngIf="form.controls[control.key].placeholder" value="" disabled selected hidden>{{ form.controls[control.key].placeholder }}</option>
                                <option *ngFor="let opt of form.controls[control.key].options" [value]="opt.key">{{opt.value}}</option>
                            </select>
                            <!--File-->
                            <novo-file-input *ngSwitchCase="'file'" [formControlName]="control.key" [id]="control.key" [name]="control.key" [placeholder]="form.controls[control.key].placeholder" [value]="form.controls[control.key].value" [multiple]="form.controls[control.key].multiple" [layoutOptions]="form.controls[control.key].layoutOptions" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></novo-file-input>
                            <!--Tiles-->
                            <novo-tiles *ngSwitchCase="'tiles'" [options]="control.options" [formControlName]="control.key" (onChange)="modelChange($event)" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></novo-tiles>
                            <!--Picker-->
                            <div class="novo-control-input-container" *ngSwitchCase="'picker'">
                                <novo-picker [config]="form.controls[control.key].config" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder" [appendToBody]="form.controls[control.key].appendToBody" [parentScrollSelector]="form.controls[control.key].parentScrollSelector" *ngIf="!form.controls[control.key].multiple" (select)="modelChange($event);" (typing)="handleTyping($event)" (focus)="handleFocus($event)" (blur)="handleBlur($event)" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></novo-picker>
                                <chips [source]="form.controls[control.key].config" [type]="form.controls[control.key].config.type" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder" *ngIf="control.multiple" [closeOnSelect]="form.controls[control.key].closeOnSelect" (changed)="modelChange($event)" (typing)="handleTyping($event)" (focus)="handleFocus($event)" (blur)="handleBlur($event)" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></chips>
                            </div>
                            <!--Novo Select-->
                            <novo-select *ngSwitchCase="'select'" [options]="form.controls[control.key].options" [headerConfig]="form.controls[control.key].headerConfig" [placeholder]="form.controls[control.key].placeholder" [formControlName]="control.key" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition" (onSelect)="modelChange($event)"></novo-select>
                            <!--Radio-->
                            <div class="novo-control-input-container" *ngSwitchCase="'radio'">
                                <novo-radio [vertical]="vertical" [name]="control.key" [formControlName]="control.key" *ngFor="let option of form.controls[control.key].options" [value]="option.value" [label]="option.label" [checked]="option.value === form.value[control.key]" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition" [button]="!!option.icon" [icon]="option.icon" [attr.data-automation-id]="control.key + '-' + (option?.label || option?.value)"></novo-radio>
                            </div>
                            <!--Time-->
                            <div class="novo-control-input-container" *ngSwitchCase="'time'" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition">
                                <novo-time-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder" [military]="form.controls[control.key].military"></novo-time-picker-input>
                            </div>
                            <!--Date-->
                            <div class="novo-control-input-container" *ngSwitchCase="'date'" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition">
                                <novo-date-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder"></novo-date-picker-input>
                            </div>
                            <!--Date and Time-->
                            <div class="novo-control-input-container" *ngSwitchCase="'date-time'" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition">
                                <novo-date-time-picker-input [attr.id]="control.key" [name]="control.key" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder" [military]="form.controls[control.key].military"></novo-date-time-picker-input>
                            </div>
                            <!--Address-->
                            <novo-address *ngSwitchCase="'address'" [formControlName]="control.key"></novo-address>
                            <!--Checkbox-->
                            <novo-checkbox *ngSwitchCase="'checkbox'" [formControlName]="control.key" [name]="control.key" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition" [layoutOptions]="layoutOptions"></novo-checkbox>
                            <!--Checklist-->
                            <novo-check-list *ngSwitchCase="'checklist'" [formControlName]="control.key" [name]="control.key" [options]="form.controls[control.key].options" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition" (onSelect)="modelChange($event)"></novo-check-list>
                            <!--QuickNote-->
                            <novo-quick-note *ngSwitchCase="'quick-note'" [formControlName]="control.key" [placeholder]="form.controls[control.key].placeholder" [config]="form.controls[control.key].config" (change)="modelChange($event)" [tooltip]="tooltip" [tooltipPosition]="tooltipPosition"></novo-quick-note>
                            <!--ReadOnly-->
                            <!--TODO - Handle rendering of different READONLY values-->
                            <div *ngSwitchCase="'read-only'">{{ form.value[control.key] }}</div>
                        </div>
                    </div>
                    <!--Error Message-->
                    <div class="field-message" *ngIf="!condensed" [class.has-tip]="form.controls[control.key].tipWell">
                        <div class="messages">
                            <span class="error-text" *ngIf="showFieldMessage"></span>
                            <span class="error-text" *ngIf="isDirty && errors?.required">{{ form.controls[control.key].label | uppercase }} {{ labels.isRequired }}</span>
                            <span class="error-text" *ngIf="isDirty && errors?.minlength">{{ form.controls[control.key].label | uppercase }} {{ labels.minLength }} {{ form.controls[control.key].minlength }}</span>
                            <span class="error-text" *ngIf="isDirty && maxLengthMet && focused && !errors?.maxlength">{{ labels.maxLengthMet }}({{ form.controls[control.key].maxlength }})</span>
                            <span class="error-text" *ngIf="errors?.maxlength">{{ labels.invalidMaxLength }}({{ form.controls[control.key].maxlength }})</span>
                            <span class="error-text" *ngIf="isDirty && errors?.invalidEmail">{{ form.controls[control.key].label | uppercase }} {{ labels.invalidEmail }}</span>
                            <span class="error-text" *ngIf="isDirty && errors?.invalidAddress">{{ form.controls[control.key].label | uppercase }} {{ labels.invalidAddress }}</span>
                            <span class="error-text" *ngIf="isDirty && (errors?.integerTooLarge || errors?.doubleTooLarge)">{{ form.controls[control.key].label | uppercase }} {{ labels.isTooLarge }}</span>
                            <span *ngIf="isDirty && errors?.minYear">{{ form.controls[control.key].label | uppercase }} {{ labels.notValidYear }}</span>
                            <span class="error-text" *ngIf="isDirty && (errors?.custom)">{{ errors.custom }}</span>
                            <!--Field Hint-->
                            <span class="description" *ngIf="form.controls[control.key].description">
                                {{ form.controls[control.key].description }}
                            </span>
                        </div>
                        <span class="character-count" [class.error]="errors?.maxlength" *ngIf="showCount">{{ characterCount }}/{{ form.controls[control.key].maxlength }}</span>
                    </div>
                    <!--Tip Wel-->
                    <novo-tip-well *ngIf="form.controls[control.key].tipWell" [name]="control.key" [tip]="form.controls[control.key]?.tipWell?.tip" [icon]="form.controls[control.key]?.tipWell?.icon" [button]="form.controls[control.key]?.tipWell?.button"></novo-tip-well>
                </div>
            </div>
        </div>
    `,
    host: {
        '[class]': 'form.controls[control.key].controlType',
        '[class.disabled]': 'form.controls[control.key].readOnly',
        '[class.hidden]': 'form.controls[control.key].hidden',
        '[attr.data-control-key]': 'control.key',
    }
})
export class NovoControlElement extends OutsideClick implements OnInit, OnDestroy {
    @Input() control;
    @Input() form: NovoFormGroup;
    @Input() condensed: boolean = false;
    @Output() change: EventEmitter<any> = new EventEmitter();

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

    maskOptions: IMaskOptions;

    constructor(element: ElementRef, public labels: NovoLabelService, private dateFormatService: DateFormatService, private fieldInteractionApi: FieldInteractionApi) {
        super(element);
    }

    get showFieldMessage() {
        return !this.errors && !this.maxLengthMet && Helpers.isBlank(this.control.description);
    }

    get showCount() {
        return this.form.controls[this.control.key].maxlength && this.focused && (this.form.controls[this.control.key].controlType === 'text-area' || this.form.controls[this.control.key].controlType === 'textbox');
    }

    ngOnInit() {
        // Make sure to initially format the time controls
        if (this.control && this.form.controls[this.control.key].value) {
            if (this.form.controls[this.control.key].controlType === 'textbox' || this.form.controls[this.control.key].controlType === 'text-area') {
                this.characterCount = this.form.controls[this.control.key].value.length;
            }
        }
        if (this.control) {
            // Listen to clear events
            this.forceClearSubscription = this.control.forceClear.subscribe(() => {
                this.clearValue();
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
        if (this.form.controls[this.control.key] && this.form.controls[this.control.key].subType === 'percentage') {
            if (!Helpers.isEmpty(this.form.controls[this.control.key].value)) {
                this.percentValue = Number((this.form.controls[this.control.key].value * 100).toFixed(6).replace(/\.?0*$/, ''));
            }
            this.percentChangeSubscription = this.form.controls[this.control.key].displayValueChanges.subscribe(value => {
                if (!Helpers.isEmpty(value)) {
                    this.percentValue = Number((value * 100).toFixed(6).replace(/\.?0*$/, ''));
                }
            });
        }
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

    get alwaysActive() {
        // Controls that have the label active if there is any user entered text in the field
        if (this.form.controls[this.control.key].controlType === 'picker' && this._enteredText.length) {
            return true;
        }

        // Controls that always have the label active
        return ['tiles', 'checklist', 'checkbox', 'address', 'file', 'editor', 'radio', 'text-area', 'quick-note'].indexOf(this.form.controls[this.control.key].controlType) !== -1;
    }

    get requiresExtraSpacing() {
        // Chips
        if (this.form.controls[this.control.key].controlType === 'picker' && this.form.controls[this.control.key].multiple && this.hasValue) {
            return true;
        }
        return false;
    }

    handleTyping(event: any) {
        this._focused = event && event.length;
        this._enteredText = event;
    }

    handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
    }

    clearValue() {
        this.form.controls[this.control.key].setValue(null);
        this.formattedValue = null;
    }

    resizeTextArea(event) {
        // Reset the heighte
        event.target.style.height = 'auto';
        event.target.style.height = event.target.value.length > 0 ? `${event.target.scrollHeight - 14}px` : '2rem';
    }

    handleTextAreaInput(event) {
        this.resizeTextArea(event);
        this.emitChange(event);
        this.restrictKeys(event);
    }

    checkMaxLength(event) {
        if (this.control && this.form.controls[this.control.key].maxlength) {
            this.characterCount = event.target.value.length;
            this.maxLengthMet = event.target.value.length >= this.form.controls[this.control.key].maxlength;
        }
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
        } else if (~['currency', 'float', 'percentage'].indexOf(this.form.controls[this.control.key].subType) && !(NUMBERS_WITH_DECIMAL.test(key) || UTILITY_KEYS.includes(key))) {
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
}
