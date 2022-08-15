// NG2
import { ENTER, ESCAPE, TAB } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoLabelService } from '../../services/novo-label-service';
import { Key } from '../../utils';
import { NovoOverlayTemplateComponent } from '../common/overlay/Overlay';

// Value accessor for the component (supports ngModel)
const SEARCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoSearchBoxElement),
  multi: true,
};

@Component({
  selector: 'novo-search',
  providers: [SEARCH_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- SEARCH ICON -->
    <novo-icon (click)="showSearch($event)" [tooltip]="hint" tooltipPosition="bottom">{{ icon }}</novo-icon>
    <!-- SEARCH INPUT -->
    <input
      type="text"
      [attr.name]="name"
      [attr.value]="displayValue"
      [attr.placeholder]="placeholder"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="_handleKeydown($event)"
      (input)="_handleInput($event)"
      #input
      data-automation-id="novo-search-input"
    />
    <!-- SEARCH OVERLAY -->
    <novo-overlay-template
      [parent]="element"
      [closeOnSelect]="closeOnSelect"
      [position]="position"
      [hasBackdrop]="hasBackdrop"
      (select)="onSelect()"
      (closing)="onBlur()"
    >
      <ng-content></ng-content>
    </novo-overlay-template>
  `,
})
export class NovoSearchBoxElement implements ControlValueAccessor {
  @Input()
  public name: string;
  @Input()
  public icon: string = 'search';
  @Input()
  public position: string = 'bottom-left';
  @Input()
  public placeholder: string = 'Search...';
  @Input()
  @HostBinding('class.always-open')
  public alwaysOpen: boolean = false;
  @Input()
  public theme: string;
  @Input()
  public color: string = 'positive';
  @Input()
  public closeOnSelect: boolean = true;
  @Input()
  public displayField: string;
  @Input()
  public displayValue: string;
  @Input()
  public hint: string;
  @Input()
  public keepOpen: boolean = false;
  @Input()
  public hasBackdrop: boolean = false;
  @Input()
  public allowPropagation: boolean = false;
  @Output()
  public searchChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public applySearch: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @HostBinding('class.focused')
  focused: boolean = false;
  public value: any;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void = () => {};
  /** View -> model callback called when autocomplete has been touched */
  _onTouched = () => {};

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: any;
  @ViewChild('input', { static: true })
  input: any;

  private debounceSearchChange: any;

  constructor(
    public element: ElementRef,
    public labels: NovoLabelService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _zone: NgZone,
  ) {}

  /**
   * @name showFasterFind
   * @description This function shows the picker and adds the active class (for animation)
   */
  showSearch(event?: any, forceClose: boolean = false) {
    if (!this.panelOpen) {
      // Reset search
      // Set focus on search
      setTimeout(() => {
        const element = this.input.nativeElement;
        if (element) {
          element.focus();
        }
      }, 10);
    } else {
      this.closePanel();
    }
  }
  onFocus() {
    this._zone.run(() => {
      this.focused = true;
      this.openPanel();
    });
  }
  onBlur() {
    if (!this.keepOpen || !this.panelOpen) {
      this.focused = false;
    }
  }
  onSelect() {
    if (!this.keepOpen) {
      this.closePanel();
    }
  }
  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    this.overlay.openPanel();
  }
  closePanel(): void {
    setTimeout(() => this.overlay.closePanel());
    this.focused = false;
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  @HostBinding('class.active')
  get active(): boolean {
    return this.panelOpen || this.alwaysOpen;
  }
  /** END: Convenient Panel Methods. */

  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === Key.Escape || event.key === Key.Enter || event.key === Key.Tab) && this.panelOpen) {
      if (event.keyCode === ENTER) {
        this.applySearch.emit(event);
      }
      this.closePanel();
      if (!this.allowPropagation) {
        event.stopPropagation();
      }
    }
  }
  _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      this.value = (event.target as HTMLInputElement).value;
      this._onChange((event.target as HTMLInputElement).value);

      if (this.debounceSearchChange) {
        clearTimeout(this.debounceSearchChange);
      }
      this.debounceSearchChange = setTimeout(() => {
        this.searchChanged.emit((event.target as HTMLInputElement).value);
      }, 400);
    }
  }
  writeValue(value: any): void {
    this._setValue(value);
  }
  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }
  private _setValue(value: any): void {
    this.value = value;
    let toDisplay = value;
    if (value && this.displayField) {
      toDisplay = value.hasOwnProperty(this.displayField) ? value[this.displayField] : value;
    }
    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and shouldn't fall back to an empty string.
    this.displayValue = toDisplay ? toDisplay : '';
    this.input.nativeElement.value = this.displayValue;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    if (event && event.value) {
      this._setValue(event.value);
      this._onChange(event.value);
    }
    this.closePanel();
  }

  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  public clearValue(skip: any) {
    this.writeValue(null);
    this._onChange(null);
  }
}
