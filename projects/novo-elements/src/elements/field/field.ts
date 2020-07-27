// NG2
import {
  Component,
  Input,
  OnInit,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Directive,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelElement } from './label/label';
import { NovoHintElement } from './hint/hint';
import { NovoErrorElement } from './error/error';
import { NovoFieldControl } from './field-control';
import { takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[novoPrefix]' })
export class NovoFieldPrefixDirective {}
@Directive({ selector: '[novoSuffix]' })
export class NovoFieldSuffixDirective {}

@Component({
  selector: 'novo-field',
  templateUrl: './field.html',
  styleUrls: ['./field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'novo-field',
    '[class.novo-field-appearance-horizontal]': 'appearance=="horizontal"',
    '[class.novo-field-appearance-vertical]': 'appearance=="vertical"',
    // '[class.novo-field-appearance-standard]': 'appearance == "standard"',
    // '[class.novo-field-appearance-fill]': 'appearance == "fill"',
    // '[class.novo-field-appearance-outline]': 'appearance == "outline"',
    // '[class.novo-field-appearance-legacy]': 'appearance == "legacy"',
    '[class.novo-field-invalid]': '_control.errorState',
    '[class.novo-field-has-label]': '_hasLabel()',
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
})
export class NovoFieldElement implements AfterContentInit {
  @ViewChild('connectionContainer') _connectionContainerRef: ElementRef;
  // @ViewChild('inputContainer') _inputContainerRef: ElementRef;
  // @ViewChild('label') private _label: ElementRef<HTMLElement>;

  @ContentChild(NovoLabelElement) _labelElement: NovoLabelElement;
  @ContentChildren(NovoHintElement) _hintElements: QueryList<NovoHintElement>;
  @ContentChildren(NovoErrorElement) _errorElements: QueryList<NovoErrorElement>;
  @ContentChildren(NovoFieldPrefixDirective) _prefixElements: QueryList<NovoFieldPrefixDirective>;
  @ContentChildren(NovoFieldSuffixDirective) _suffixElements: QueryList<NovoFieldSuffixDirective>;

  @ContentChild(NovoFieldControl) _control: NovoFieldControl<any>;

  @Input() appearance: 'horizontal' | 'vertical' = 'vertical';

  private _destroyed = new Subject<void>();

  constructor(public _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}
  /**
   * Gets an ElementRef for the element that a overlay attached to the form-field should be
   * positioned relative to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._connectionContainerRef || this._elementRef;
  }
  ngAfterContentInit(): any {
    this._validateControlChild();

    const control = this._control;

    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`novo-field-type-${control.controlType}`);
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(null!)).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Throws an error if the form field's control is missing. */
  protected _validateControlChild() {
    if (!this._control) {
      throw 'Missing Novo Control';
    }
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
