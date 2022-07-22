// NG2
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  InjectionToken,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { NovoLabel } from '../common';
import { NovoErrorElement } from './error/error';
import { NovoFieldControl } from './field-control';
import { NovoHintElement } from './hint/hint';

@Directive({ selector: '[novoPrefix]' })
export class NovoFieldPrefixDirective {}
@Directive({ selector: '[novoSuffix]' })
export class NovoFieldSuffixDirective {}

const NOVO_INPUT_UNDERLINED_TYPES = [
  'text',
  'date',
  'time',
  'datetime-local',
  'password',
  'email',
  'tel',
  'select',
  'textarea',
  'number',
  'novo-chip-list',
  'chip-list',
];
export const NOVO_FORM_FIELD = new InjectionToken<NovoFieldElement>('NovoFormField');

@Component({
  selector: 'novo-field',
  templateUrl: './field.html',
  styleUrls: ['./field.scss', './field-standard.scss', './field-fill.scss', './field-outline.scss', './field-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'novo-field',
    '[class.novo-field-layout-horizontal]': 'layout=="horizontal"',
    '[class.novo-field-layout-vertical]': 'layout=="vertical"',
    '[class.novo-field-appearance-standard]': 'appearance == "standard"',
    '[class.novo-field-appearance-fill]': 'appearance == "fill"',
    '[class.novo-field-appearance-outline]': 'appearance == "outline"',
    '[class.novo-field-appearance-list]': 'appearance == "list"',
    '[class.novo-field-appearance-underlined]': '_isUnderlinedInput()',
    '[class.novo-field-invalid]': '_control.errorState',
    '[class.novo-field-has-label]': '_hasLabel()',
    '[class.novo-field-no-label]': '!_hasLabel()',
    // '[class.novo-field-hide-placeholder]': '_hideControlPlaceholder()',
    '[class.novo-field-disabled]': '_control.disabled',
    '[class.novo-field-autofilled]': '_control.autofilled',
    '[class.novo-focused]': '_control.focused',
    // '[class.novo-accent]': 'color == "accent"',
    // '[class.novo-warn]': 'color == "warn"',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
  },
  providers: [{ provide: NOVO_FORM_FIELD, useExisting: NovoFieldElement }],
})
export class NovoFieldElement implements AfterContentInit, OnDestroy {
  private _labelClicks = Subscription.EMPTY;

  // @ViewChild('connectionContainer') _connectionContainerRef: ElementRef;
  @ViewChild('inputContainer') _inputContainerRef: ElementRef;
  // @ViewChild('label') private _label: ElementRef<HTMLElement>;

  @ContentChild(NovoLabel) _labelElement: NovoLabel;
  @ContentChildren(NovoHintElement) _hintElements: QueryList<NovoHintElement>;
  @ContentChildren(NovoErrorElement) _errorElements: QueryList<NovoErrorElement>;
  @ContentChildren(NovoFieldPrefixDirective) _prefixElements: QueryList<NovoFieldPrefixDirective>;
  @ContentChildren(NovoFieldSuffixDirective) _suffixElements: QueryList<NovoFieldSuffixDirective>;

  @ContentChild(NovoFieldControl) _control: NovoFieldControl<any>;

  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() appearance: 'standard' | 'outline' | 'fill' | 'list' = 'standard';

  @Input()
  width: string;

  private _destroyed = new Subject<void>();

  @Output() valueChanges: EventEmitter<any> = new EventEmitter();
  @Output() stateChanges: EventEmitter<any> = new EventEmitter();

  constructor(public _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}
  /**
   * Gets an ElementRef for the element that a overlay attached to the form-field should be
   * positioned relative to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._inputContainerRef || this._elementRef;
  }

  ngAfterContentInit(): any {
    this._validateControlChild();

    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`novo-field-type-${control.controlType}`);
      this._elementRef.nativeElement.setAttribute('data-control-type', control.controlType);
    }

    if (control.id) {
      this._elementRef.nativeElement.setAttribute('data-control-id', control.id);
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    // tslint:disable-next-line:deprecation
    control.stateChanges.pipe(startWith(null)).subscribe(() => {
      this.stateChanges.next();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((v) => {
        this.valueChanges.next(v);
        this._changeDetectorRef.markForCheck();
      });
    }

    if (this._hasLabel()) {
      this._labelClicks = fromEvent(this._labelElement.nativeElement, 'click').subscribe(() => this._control.focus());
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._labelClicks.unsubscribe();
  }

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw new Error('Missing Novo Control');
    }
  }

  @HostListener('click', ['$event'])
  _handleContainerClick(evt: MouseEvent) {
    this._control.onContainerClick(evt);
  }

  _isUnderlinedInput(): boolean {
    return NOVO_INPUT_UNDERLINED_TYPES.includes(this._control.controlType);
  }

  /** Determines whether to display hints or errors. */
  _getDisplayedMessages(): 'error' | 'hint' {
    return this._errorElements && this._errorElements.length > 0 && this._control.errorState ? 'error' : 'hint';
  }

  /** Determines whether a class from the NgControl should be forwarded to the host element. */
  _shouldForward(prop: keyof NgControl): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  _hasLabel() {
    return !!this._labelElement;
  }
}
