// NG2
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  forwardRef,
  ElementRef,
  HostBinding,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// APP
import { NovoOverlayTemplateComponent } from '../overlay';
// import { NovoLabelService } from '../../services/novo-label-service';

// Value accessor for the component (supports ngModel)
const NOVO_SEARCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoSearchComponent),
  multi: true,
};

@Component({
  selector: 'novo-search',
  providers: [NOVO_SEARCH_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search.component.scss'],
  template: `
        <!-- SEARCH ICON -->
        <button theme="fab" [color]="theme" [icon]="icon" (click)="showSearch()" wdata-automation-id="novo-search-fab"></button>
        <!-- SEARCH INPUT -->
        <input type="text" [attr.name]="name" [attr.value]="displayValue" [attr.placeholder]="placeholder" (focus)="onFocus()" (blur)="onBlur()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input data-automation-id="novo-search-input"/>
        <!-- SEARCH OVERLAY -->
        <novo-overlay-template [parent]="element" [closeOnSelect]="closeOnSelect" (select)="closePanel()" (closing)="onBlur()">
            <ng-content></ng-content>
        </novo-overlay-template>
    `,
})
export class NovoSearchComponent implements ControlValueAccessor {
  @Input() public name: string;
  @Input() public icon: string = 'search';
  @Input() public placeholder: string = 'Search...';
  @Input() public alwaysOpen: boolean = false;
  @Input() public theme: string = 'positive';
  @Input() public closeOnSelect: boolean = true;
  @Input() public displayField: string;
  @Input() public displayValue: string;
  @Input() public hint: string;
  @Output()
  public searchChanged: EventEmitter<string> = new EventEmitter<string>();
  @HostBinding('class.focused') public focused: boolean = false;
  public value: any;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent) public overlay: any;
  @ViewChild('input') public input: any;

  private debounceSearchChange: any;

  constructor(
    public element: ElementRef,
    // public labels: NovoLabelService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _zone: NgZone,
  ) {}

  /**
   * @name showFasterFind
   * @description This function shows the picker and adds the active class (for animation)
   */
  public showSearch(event?: any, forceClose: boolean = false): void {
    if (!this.panelOpen) {
      // Reset search
      // Set focus on search
      setTimeout(() => {
        let element: HTMLElement = this.input.nativeElement;
        if (element) {
          element.focus();
        }
      }, 10);
    }
  }
  public onFocus(): void {
    this._zone.run(() => {
      this.focused = true;
      this.openPanel();
    });
  }
  public onBlur(): void {
    this.focused = false;
  }
  /** BEGIN: Convienient Panel Methods. */
  public openPanel(): void {
    this.overlay.openPanel();
  }
  public closePanel(): void {
    this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  @HostBinding('class.active')
  get active(): boolean {
    return this.panelOpen || this.alwaysOpen;
  }
  /** END: Convienient Panel Methods. */

  public _handleKeydown(event: KeyboardEvent): void {
    if (
      (event.keyCode === ESCAPE ||
        event.keyCode === ENTER ||
        event.keyCode === TAB) &&
      this.panelOpen
    ) {
      this.closePanel();
      event.stopPropagation();
    }
  }
  public _handleInput(event: KeyboardEvent): void {
    if (document.activeElement === event.target) {
      this._onChange((event.target as HTMLInputElement).value);

      if (this.debounceSearchChange) {
        clearTimeout(this.debounceSearchChange);
      }
      this.debounceSearchChange = setTimeout(() => {
        this.searchChanged.emit((event.target as HTMLInputElement).value);
      }, 400);
    }
  }
  public writeValue(value: any): void {
    this._setValue(value);
  }
  public registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
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
  public clearValue(skip: any): void {
    this.writeValue(undefined);
    this._onChange(undefined);
  }

  /** View -> model callback called when value changes */
  public _onChange: (value: any) => void = () => {};
  /** View -> model callback called when autocomplete has been touched */
  public _onTouched = () => {};

  private _setValue(value: any): void {
    this.value = value;
    let toDisplay: any = value;
    if (value && this.displayField) {
      toDisplay = value.hasOwnProperty(this.displayField)
        ? value[this.displayField]
        : value;
    }
    // Simply falling back to an empty string if the display value is falsy does not work properly.
    // The display value can also be the number zero and shouldn't fall back to an empty string.
    this.displayValue = toDisplay ? toDisplay : '';
    this.input.nativeElement.value = this.displayValue;
    this._changeDetectorRef.markForCheck();
  }
}
