import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

/** An interface which allows a control to work inside of a `NovoField`. */
@Directive()
export abstract class NovoFieldControl<T> {
  /** The value of the control. */
  value: T | null;

  /** The last key pressed. */
  lastKeyValue: string | null;
  /** The last cursor position. */
  lastCaretPosition: number | null;

  /**
   * Stream that emits whenever the state of the control changes such that the parent `NovoField`
   * needs to run change detection.
   */
  readonly stateChanges: Observable<void>;

  /** The element ID for this control. */
  readonly id: string;

  /** The placeholder for this control. */
  readonly placeholder: string;

  /** Gets the NgControl for this control. */
  readonly ngControl: NgControl | null;

  /** Whether the control is focused. */
  readonly focused: boolean;

  /** Whether the control is empty. */
  readonly empty: boolean;

  /** Whether the `NovoField` label should try to float. */
  // readonly shouldLabelFloat: boolean;
  // readonly shouldFieldHaveUnderline: boolean;

  /** Whether the control is required. */
  readonly required: boolean;

  /** Whether the control is disabled. */
  readonly disabled: boolean;

  /** Whether the control is in an error state. */
  readonly errorState: boolean;

  /** Whether the control can have multiple values. */
  readonly multiple?: boolean;
  /**
   * An optional name for the control type that can be used to distinguish `novo-form-field` elements
   * based on their control type. The form field will add a class,
   * `novo-form-field-type-{{controlType}}` to its root element.
   */
  readonly controlType?: string;

  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  readonly autofilled?: boolean;

  /** Sets the list of element IDs that currently describe this control. */
  abstract setDescribedByIds(ids: string[]): void;

  /** Handles a click on the control's container. */
  abstract onContainerClick(event: MouseEvent): void;

  abstract focus(options?: FocusOptions): void;
}
