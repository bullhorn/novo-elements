// NG
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { Helpers } from '../../utils/Helpers';
// App
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';

// Value accessor for the component (supports ngModel)
const COLOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoColorInputElement),
  multi: true,
};

@Component({
  selector: 'novo-color-input',
  providers: [COLOR_VALUE_ACCESSOR],
  template: `
    <novo-field>
      <input
        novoInput
        type="text"
        [name]="name"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [style.color]="value"
        (focus)="_handleFocus($event)"
        (keydown)="_handleKeydown($event)"
        (input)="_handleInput($event)"
        (blur)="_handleBlur($event)"
        [(ngModel)]="value"
        #input
      />
      <novo-icon *ngIf="!hasValue" (click)="openPanel()">complex</novo-icon>
      <novo-icon *ngIf="hasValue" smaller (click)="clearValue()">x</novo-icon>
    </novo-field>
    <novo-overlay-template [parent]="element" position="above-below">
      <novo-color-picker [(color)]="value" (onChange)="setValueAndClose($event)"></novo-color-picker>
    </novo-overlay-template>
  `,
})
export class NovoColorInputElement implements OnInit, ControlValueAccessor {
  @Input()
  name: string;
  @Input()
  placeholder: string = '#ffffff';
  @Output()
  blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output()
  focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  private _value: string = '';
  public lastValidValue: string = '';
  private _disabled: boolean = false;

  @Input() get value(): string {
    return this._value;
  }
  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this._setFormValue(value);
      this.onChangeCallback(this._value);
    }
  }

  // Disabled State
  @Input()
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = !!value;
  }

  constructor(public element: ElementRef, public labels: NovoLabelService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    if (!this.disabled) {
      this.panelOpen ? this.overlay.closePanel() : this.overlay.openPanel();
    }
  }
  closePanel(): void {
    this.overlay && this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === Key.Escape || event.key === Key.Enter || event.key === Key.Tab) && this.panelOpen) {
      this.closePanel();
      event.stopPropagation();
    }
  }

  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      // this._handleEvent(event, false);
    }
  }

  _handleBlur(event: FocusEvent): void {
    this.blurEvent.emit(event);
  }

  _handleFocus(event: FocusEvent): void {
    this.openPanel();
    this.focusEvent.emit(event);
  }

  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  };

  private onTouchedCallback = () => {
    // placeholder
  };

  private _setFormValue(value: string): void {
    if (this.value) {
      // hmm...
    }
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any): void {
    if (event) {
      this.value = event.color.hex;
      this.change.emit(this.value);
      this.closePanel();
    }
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue() {
    this.value = '';
    this.change.emit(this.value);
  }

  public get hasValue() {
    return !Helpers.isEmpty(this.value);
  }
}
