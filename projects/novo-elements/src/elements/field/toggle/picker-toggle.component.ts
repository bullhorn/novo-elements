import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NovoButtonElement } from '../../button';
import { NovoOverlayTemplateComponent } from '../../overlay';
import { NovoFieldElement, NOVO_FORM_FIELD } from '../field';

@Component({
  selector: 'novo-picker-toggle',
  templateUrl: 'picker-toggle.component.html',
  styleUrls: ['picker-toggle.component.scss'],
  host: {
    class: 'novo-picker-toggle',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '[class.novo-toggle-active]': 'picker && picker.opened',
    '[class.novo-accent]': 'picker && picker.color === "accent"',
    '[class.novo-warn]': 'picker && picker.color === "warn"',
    '(focus)': '_button.focus()',
  },
  exportAs: 'novoPickerToggle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoPickerToggleElement<T = any> implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;

  /** Datepicker instance that the button will toggle. */
  @Input('for') picker: T;

  @Input() icon: string;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.picker) {
      return (this.picker as any).disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Underlying button element. */
  @ViewChild('button') _button: NovoButtonElement;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  overlay: NovoOverlayTemplateComponent;

  element: ElementRef;

  constructor(
    private _elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string,
    @Optional() @Inject(NOVO_FORM_FIELD) private _formField: NovoFieldElement,
  ) {
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.picker) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  ngAfterViewInit() {
    this.element = this._formField.getConnectedOverlayOrigin() || this._elementRef;
  }

  togglePanel(event?: Event) {
    this.cdr.detectChanges();
    if (!this.overlay.panelOpen) {
      this.openPanel(event);
    } else {
      this.closePanel(event);
    }
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(event?: Event): void {
    if (!this.overlay.panelOpen) {
      this.overlay.openPanel();
    }
  }

  closePanel(event?: Event): void {
    this.overlay.closePanel();
  }

  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }

  private _watchStateChanges() {
    // const pickerStateChanged = this.picker ? this.picker.stateChanges : observableOf();
    // const inputStateChanged = this.picker && this.picker.pickerInput ? this.picker.pickerInput.stateChanges : observableOf();
    // const pickerToggled = this.picker ? merge(this.picker.openedStream, this.picker.closedStream) : observableOf();
    // this._stateChanges.unsubscribe();
    // this._stateChanges = merge(pickerStateChanged, inputStateChanged, pickerToggled).subscribe(() => this.cdr.markForCheck());
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
