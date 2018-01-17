// NG2
import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

/** Event object emitted by NovoOption when selected or deselected. */
export class NovoSelectionEvent {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: NovoOptionComponent,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput: boolean = false,
  ) {}
}

@Component({
  selector: 'novo-option',
  styleUrls: ['./option.component.scss'],
  template: `
        <span class="novo-option-text"><ng-content></ng-content></span>
        <i *ngIf="active" class="bhi-check"></i>
    `,
})
export class NovoOptionComponent {
  // @HostBinding('class') public _class: string = 'novo-option-group';
  @HostBinding('attr.role') public role: string = 'option';
  @HostBinding('attr.theme')
  @Input()
  public theme: string;
  @HostBinding('attr.disabled') public _disabled: boolean;

  @Input('disabled')
  public set disabled(value: boolean) {
    this._disabled = !value;
  }
  public get disabled(): boolean {
    return this._disabled;
  }

  @Input() public active: boolean = false;
  @Input() public value: any;

  @Output()
  public selection: EventEmitter<NovoSelectionEvent> = new EventEmitter<
    NovoSelectionEvent
  >();

  /** Whether or not the option is currently selected. */
  private _selected: boolean = false;
  public get selected(): boolean {
    return this._selected;
  }
  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  public get viewValue(): string {
    // TODO(kara): Add input property alternative for node envs.
    return (this._getHostElement().textContent || '').trim();
  }

  constructor(
    private _element: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  /** Selects the option. */
  public select(): void {
    this._selected = true;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  /** Deselects the option. */
  public deselect(): void {
    this._selected = false;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  /** Sets focus onto this option. */
  public focus(): void {
    const element: HTMLElement = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus();
    }
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  @HostBinding('attr.tabIndex')
  public _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }
  /** Ensures the option is selected when activated from the keyboard. */
  @HostListener('keydown', ['$event'])
  public _handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }
  /**
   * Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.
   */
  @HostListener('click')
  private _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = !this._selected; // this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput: boolean = false): void {
    this.selection.emit(new NovoSelectionEvent(this, isUserInput));
  }

  /** Gets the host DOM element. */
  private _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
