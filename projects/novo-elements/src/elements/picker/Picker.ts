import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ComponentUtils } from 'novo-elements/services';
import { Helpers, Key, notify } from 'novo-elements/utils';
import { NovoOverlayTemplateComponent } from 'novo-elements/elements/common';
// import { NovoControlConfig } from '../form/FormControls';
import { PickerResults } from './extras/picker-results/PickerResults';

// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoPickerElement),
  multi: true,
};

/**
 * @description This class is the directive definition of the Picker. If you add an attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
@Component({
  selector: 'novo-picker',
  providers: [PICKER_VALUE_ACCESSOR],
  template: `
    <i class="bhi-more" *ngIf="config?.entityIcon && !_value"></i>
    <i class="bhi-{{ config?.entityIcon }} entity-icon {{ config?.entityIcon }}" *ngIf="config?.entityIcon && _value"></i>
    <input
      type="text"
      class="picker-input"
      [(ngModel)]="term"
      [class.entity-picker]="config?.entityIcon"
      [class.entity-selected]="config?.entityIcon && _value"
      (ngModelChange)="checkTerm($event)"
      [placeholder]="placeholder"
      (keydown)="onKeyDown($event)"
      (focus)="onFocus($event)"
      (click)="onFocus($event)"
      (blur)="onTouched($event)"
      [maxlength]="maxlength"
      autocomplete="off"
      #input
      [disabled]="disablePickerInput"
    />
    <i class="bhi-search" *ngIf="(!_value || clearValueOnSelect) && !disablePickerInput"></i>
    <i
      class="bhi-times"
      [class.entity-selected]="config?.entityIcon && _value"
      *ngIf="_value && !clearValueOnSelect && !disablePickerInput"
      (click)="clearValue(true)"
    ></i>
    <novo-overlay-template class="picker-results-container" [parent]="element" position="above-below" (closing)="onOverlayClosed()">
      <span #results></span>
      <ng-content></ng-content>
    </novo-overlay-template>
  `,
  styleUrls: ['./Picker.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NovoPickerElement implements OnInit {
  // Container for the results
  @ViewChild('results', { read: ViewContainerRef, static: true })
  results: ViewContainerRef;

  @Input()
  config: any;
  @Input()
  placeholder: string;
  @Input()
  clearValueOnSelect: boolean;
  @Input()
  closeOnSelect: boolean = true;
  @Input()
  selected: Array<any> = [];
  // Deprecated
  @Input()
  appendToBody: boolean = false;
  // Deprecated
  @Input()
  parentScrollSelector: string;
  // Deprecated
  @Input()
  parentScrollAction: string = 'close';
  // Custom class for the dropdown container
  @Input()
  containerClass: string;
  // Side the dropdown will open
  @Input()
  side: string = 'left';
  // Autoselects the first option in the results
  @Input()
  autoSelectFirstOption: boolean = true;
  @Input()
  overrideElement: ElementRef;
  @Input()
  maxlength: number;
  @Input()
  allowCustomValues = false;
  @Input()
  debounceTimeInMillis: number = 250;

  // Disable from typing into the picker (result template does everything)
  @Input()
  set disablePickerInput(v: boolean) {
    this._disablePickerInput = coerceBooleanProperty(v);
  }

  get disablePickerInput() {
    return this._disablePickerInput;
  }

  private _disablePickerInput: boolean = false;

  // Emitter for selects
  @Output()
  changed: EventEmitter<any> = new EventEmitter();
  @Output()
  select: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  typing: EventEmitter<any> = new EventEmitter();

  @ViewChild(NovoOverlayTemplateComponent, { static: true })
  public container: NovoOverlayTemplateComponent;
  @ViewChild('input', { static: true })
  public input: ElementRef;

  term: string = '';
  resultsComponent: any;
  popup: ComponentRef<any>;
  _value: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(public element: ElementRef, private componentUtils: ComponentUtils, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.overrideElement) {
      this.element = this.overrideElement;
    }
    if (this.appendToBody) {
      notify(`'appendToBody' has been deprecated. Please remove this attribute.`);
    }
    // Custom results template
    this.resultsComponent = this.config.resultsTemplate || PickerResults;
    // Get all distinct key up events from the input and only fire if long enough and distinct
    // let input = this.element.nativeElement.querySelector('input');
    const pasteObserver = fromEvent(this.input.nativeElement, 'paste').pipe(debounceTime(this.debounceTimeInMillis), distinctUntilChanged());
    pasteObserver.subscribe(
      (event: ClipboardEvent) => this.onDebouncedKeyup(event),
      (err) => this.hideResults(err),
    );
    const keyboardObserver = fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(this.debounceTimeInMillis), distinctUntilChanged());
    keyboardObserver.subscribe(
      (event: KeyboardEvent) => this.onDebouncedKeyup(event),
      (err) => this.hideResults(err),
    );
  }

  private onDebouncedKeyup(event: KeyboardEvent | ClipboardEvent) {
    if ([Key.Escape, Key.ArrowDown, Key.ArrowUp, Key.Enter, Key.Tab].some((key) => key === (event as KeyboardEvent).key)) {
      return;
    }
    this.show((event.target as any).value);
  }

  public openPanel(): void {
    this.container.openPanel();
  }

  public closePanel(): void {
    this.container.closePanel();
  }

  public get panelOpen(): boolean {
    return this.container && this.container.panelOpen;
  }

  private show(term?: string): void {
    this.openPanel();
    // Show the results inside
    this.showResults(term);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disablePickerInput) {
      Helpers.swallowEvent(event);
      return;
    }
    if (this.panelOpen && !this.disablePickerInput) {
      if (event.key === Key.Escape || event.key === Key.Tab) {
        this.hideResults();
        return;
      }

      if (event.key === Key.ArrowUp) {
        this.popup.instance.prevActiveMatch();
        this.ref.markForCheck();
        return;
      }

      if (event.key === Key.ArrowDown) {
        this.popup.instance.nextActiveMatch();
        this.ref.markForCheck();
        return;
      }

      if (event.key === Key.Enter) {
        const activeMatch = this.popup.instance.activeMatch;
        if (!this.selected.find((selected) => activeMatch && activeMatch.value && selected.value === activeMatch.value)) {
          this.popup.instance.selectActiveMatch();
          this.ref.markForCheck();
        }
        return;
      }

      if ((event.key === Key.Backspace || event.key === Key.Delete) && !Helpers.isEmpty(this._value) && (this._value === this.term)) {
        this.clearValue(false);
        this.closePanel();
      }
      if (event.key === Key.Delete && Helpers.isBlank(this._value)) {
        this.clearValue(true);
      }
    }
  }

  clearValue(wipeTerm) {
    this._value = null;
    this.select.emit(this._value);
    this.changed.emit({ value: this._value, rawValue: { label: '', value: this._value } });
    this.onModelChange(this._value);

    if (wipeTerm) {
      this.term = '';
      this.popup.instance.customTextValue = null;
      this.hideResults();
    }
    this.ref.markForCheck();
  }

  /**
   * @description When the input's focus event is called this method calls the debounced function that displays the
   * results.
   */
  onFocus(event) {
    if (!this.panelOpen) {
      this.show();
    }
    this.focus.emit(event);
  }

  // Creates an instance of the results (called popup) and adds all the bindings to that instance.
  showResults(term?: any) {
    // Update Matches
    if (this.popup) {
      // Update existing list or create the DOM element
      this.popup.instance.config = this.config;
      this.popup.instance.term = this.term;
      this.popup.instance.selected = this.selected;
      this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
      this.ref.markForCheck();
    } else {
      this.popup = this.componentUtils.append(this.resultsComponent, this.results);
      this.popup.instance.parent = this;
      this.popup.instance.config = this.config;
      this.popup.instance.term = this.term;
      this.popup.instance.selected = this.selected;
      this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
      this.popup.instance.overlay = this.container.overlayRef;
      this.ref.markForCheck();
    }
  }

  // Tells the overlay component to hide the picker results from the DOM without deleting the dynamically allocated popup instance created in
  // showResults. The popup instance will remain in memory from the first time the results are shown until this component is destroyed.
  hideResults(err?: any) {
    this.closePanel();
    this.ref.markForCheck();
  }

  // Cleans up listeners for the popup - will get executed no matter how the popup is closed.
  onOverlayClosed(): void {
    if (this.popup && this.popup.instance && this.popup.instance.cleanUp) {
      this.popup.instance.cleanUp();
    }
  }

  // get accessor
  get value() {
    return this._value;
  }

  // set accessor including call the onchange callback
  set value(selected) {
    if (!selected) {
      this.term = '';
      this._value = null;
      this.onModelChange(this._value);
    } else if (selected.value !== this._value) {
      this.term = this.clearValueOnSelect ? '' : selected.label;
      this._value = selected.value;
      this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: selected.value } });
      this.select.emit(selected);
      this.onModelChange(selected.value);
      if (this.popup) {
        this.popup.instance.selected = this.selected;
      }
    } else {
      this.term = this.clearValueOnSelect ? '' : selected.label;
      this.changed.emit({ value: selected.value, rawValue: { label: this.term, value: this._value } });
      this.select.emit(selected);
    }
    this.ref.markForCheck();
  }

  // Makes sure to clear the model if the user clears the text box
  checkTerm(event) {
    this.typing.emit(event);
    if (this.allowCustomValues) {
      if (this.term) {
        this.popup.instance.customTextValue = { label: this.term, value: this.term }
      } else {
        this.popup.instance.customTextValue = null;
      }
    }
    if ((!event || !event.length) && !Helpers.isEmpty(this._value)) {
      this._value = null;
      this.onModelChange(this._value);
    }
    this.ref.markForCheck();
  }

  // Set touched on blur
  onTouched(event?: Event) {
    this.onModelTouched();
    this.blur.emit(event);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.clearValueOnSelect) {
      this.term = '';
    } else {
      if (typeof value === 'string' && !this.config.useGetLabels) {
        this.term = value;
      } else if (value && value.label) {
        this.term = value.label;
      } else if (value && value.firstName) {
        this.term = `${value.firstName} ${value.lastName}`;
      } else if (value && value.name) {
        this.term = value.name;
      } else if (typeof this.config.getLabels === 'function') {
        this.config.getLabels(value).then((result) => {
          if (result) {
            this.term = result.length ? result[0].label || '' : result.label || '';
          } else {
            this.term = value;
          }
          this.ref.markForCheck();
        });
      } else if (value && value.title) {
        this.term = value.title;
      } else {
        this.term = value || '';
      }
    }
    this._value = value;
    this.ref.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disablePickerInput = disabled;
  }
}
